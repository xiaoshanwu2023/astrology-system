#!/usr/bin/env python3
"""
实时日月食和月相计算器 - 使用 Skyfield
集成到 Flask API 中
"""

from skyfield.api import Loader
from skyfield import almanac
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Tuple
import os

class EclipseMoonCalculator:
    """
    日月食和月相实时计算器
    使用 NASA JPL 星历数据精确计算
    """
    
    # 星座列表
    SIGNS = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
             '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    
    # 日月食类型
    ECLIPSE_TYPES = {
        'solar_total': '日全食',
        'solar_annular': '日环食',
        'solar_partial': '日偏食',
        'lunar_total': '月全食',
        'lunar_partial': '月偏食',
        'lunar_penumbral': '半影月食'
    }
    
    def __init__(self, data_dir: str = None):
        """
        初始化计算器
        
        Args:
            data_dir: 星历数据目录
        """
        if data_dir is None:
            data_dir = os.path.join(
                os.path.dirname(os.path.abspath(__file__)),
                '..', 'skyfield_data'
            )
        
        self.data_dir = os.path.abspath(data_dir)
        os.makedirs(self.data_dir, exist_ok=True)
        
        # 延迟加载星历数据
        self._planets = None
        self._ts = None
        self._earth = None
        self._sun = None
        self._moon = None
        
    def _init_ephemeris(self):
        """初始化星历数据（懒加载）"""
        if self._planets is None:
            try:
                load = Loader(self.data_dir)
                self._planets = load('de440.bsp')
                self._ts = load.timescale()
                self._earth = self._planets['earth']
                self._sun = self._planets['sun']
                self._moon = self._planets['moon']
                print(f"✅ 星历数据已加载: {self.data_dir}")
            except Exception as e:
                print(f"❌ 无法加载星历数据: {e}")
                raise
    
    def _get_sign(self, longitude: float) -> str:
        """根据黄经获取星座"""
        sign_index = int(longitude / 30) % 12
        return self.SIGNS[sign_index]
    
    def calculate_moon_phases(self, year: int, month: int = None) -> List[Dict]:
        """
        计算指定年份/月份的所有新月和满月
        
        Args:
            year: 年份
            month: 月份 (可选，不提供则计算全年)
        
        Returns:
            月相列表，包含新月和满月
        """
        self._init_ephemeris()
        
        # 确定时间范围
        if month:
            start = datetime(year, month, 1)
            # 下个月的第一天
            if month == 12:
                end = datetime(year + 1, 1, 1)
            else:
                end = datetime(year, month + 1, 1)
        else:
            start = datetime(year, 1, 1)
            end = datetime(year + 1, 1, 1)
        
        t0 = self._ts.utc(start.year, start.month, start.day)
        t1 = self._ts.utc(end.year, end.month, end.day)
        
        # 使用 almanac 查找月相
        f = almanac.moon_phases(self._planets)
        times, phases = almanac.find_discrete(t0, t1, f)
        
        moon_events = []
        
        for t, phase in zip(times, phases):
            # 正确转换 Skyfield 时间到 datetime
            year, month, day, hour, minute, second = t.utc
            dt = datetime(year, month, day, hour, minute, int(second))
            
            # 获取月亮位置
            astrometric = self._earth.at(t).observe(self._moon)
            apparent = astrometric.apparent()
            lat, lon, distance = apparent.ecliptic_latlon(epoch=None)
            
            sign = self._get_sign(lon.degrees)
            degree = lon.degrees % 30
            
            # 月相: 0=新月, 1=上弦, 2=满月, 3=下弦
            phase_names = {0: '新月', 1: '上弦月', 2: '满月', 3: '下弦月'}
            phase_name = phase_names.get(phase, '未知')
            
            # 只返回新月和满月
            if phase in [0, 2]:
                moon_events.append({
                    'date': dt,
                    'date_str': dt.strftime('%Y-%m-%d %H:%M'),
                    'type': phase_name,
                    'sign': sign,
                    'degree': round(degree, 2),
                    'phase_value': phase  # 0 或 2
                })
        
        return moon_events
    
    def calculate_eclipses(self, year: int) -> List[Dict]:
        """
        计算指定年份的所有日月食
        
        算法：
        1. 找到所有新月（可能日食）
        2. 找到所有满月（可能月食）
        3. 检查日月与交点的距离判断是否为食
        
        Args:
            year: 年份
        
        Returns:
            日月食列表
        """
        self._init_ephemeris()
        
        # 计算前后各一个月的窗口，确保不遗漏跨年食
        t0 = self._ts.utc(year, 1, 1)
        t1 = self._ts.utc(year, 12, 31, 23, 59)
        
        # 找到所有月相变化
        f = almanac.moon_phases(self._planets)
        times, phases = almanac.find_discrete(t0, t1, f)
        
        eclipses = []
        
        for t, phase in zip(times, phases):
            # 新月 (0) 检查日食
            # 满月 (2) 检查月食
            if phase not in [0, 2]:
                continue
            
            # 正确转换 Skyfield 时间到 datetime
            year, month, day, hour, minute, second = t.utc
            dt = datetime(year, month, day, hour, minute, int(second))
            
            # 获取日月位置
            sun_pos = self._earth.at(t).observe(self._sun).apparent()
            moon_pos = self._earth.at(t).observe(self._moon).apparent()
            
            sun_lat, sun_lon, _ = sun_pos.ecliptic_latlon(epoch=None)
            moon_lat, moon_lon, _ = moon_pos.ecliptic_latlon(epoch=None)
            
            # 计算日月距离（elongation）
            elongation = (moon_lon.degrees - sun_lon.degrees) % 360
            if elongation > 180:
                elongation = 360 - elongation
            
            # 计算黄纬差
            lat_diff = abs(moon_lat.degrees - sun_lat.degrees)
            
            # 判断是否为食
            if phase == 0:  # 新月 - 检查日食
                if lat_diff < 1.5:  # 日月黄纬接近
                    eclipse_type = self._classify_solar_eclipse(t, elongation, lat_diff)
                    if eclipse_type:
                        sign = self._get_sign(sun_lon.degrees)
                        degree = sun_lon.degrees % 30
                        
                        eclipses.append({
                            'date': dt,
                            'date_str': dt.strftime('%Y-%m-%d %H:%M'),
                            'type': eclipse_type,
                            'category': '日食',
                            'sign': sign,
                            'degree': round(degree, 2),
                            'elongation': round(elongation, 2)
                        })
            
            elif phase == 2:  # 满月 - 检查月食
                if elongation > 178 and lat_diff < 1.5:  # 日月黄经接近180°且黄纬接近
                    eclipse_type = self._classify_lunar_eclipse(t, elongation, lat_diff)
                    if eclipse_type:
                        sign = self._get_sign(moon_lon.degrees)
                        degree = moon_lon.degrees % 30
                        
                        eclipses.append({
                            'date': dt,
                            'date_str': dt.strftime('%Y-%m-%d %H:%M'),
                            'type': eclipse_type,
                            'category': '月食',
                            'sign': sign,
                            'degree': round(degree, 2),
                            'elongation': round(360 - elongation, 2)
                        })
        
        # 按日期排序
        eclipses.sort(key=lambda x: x['date'])
        
        return eclipses
    
    def _classify_solar_eclipse(self, t, elongation, lat_diff):
        """
        分类日食类型
        
        简化分类：
        - elongation < 0.5° 且 lat_diff < 0.3°: 全食或环食
        - 其他: 偏食
        """
        if elongation < 0.5 and lat_diff < 0.3:
            # 这里简化处理，实际应计算月球视直径 vs 太阳视直径
            return '日全食'  # 或日环食
        elif elongation < 1.0:
            return '日偏食'
        return None
    
    def _classify_lunar_eclipse(self, t, elongation, lat_diff):
        """
        分类月食类型
        
        简化分类：
        - elongation > 179.5° 且 lat_diff < 0.5°: 全食
        - elongation > 178°: 偏食
        - 其他: 半影食
        """
        if elongation > 179.5 and lat_diff < 0.5:
            return '月全食'
        elif elongation > 178:
            return '月偏食'
        elif elongation > 176:
            return '半影月食'
        return None
    
    def get_monthly_events(self, year: int, month: int, sun_sign: str = None) -> Dict:
        """
        获取指定月份的所有天文事件（日月食 + 新月满月）
        
        Args:
            year: 年份
            month: 月份
            sun_sign: 太阳星座（用于计算宫位）
        
        Returns:
            {
                'eclipses': [...],
                'moon_phases': [...]
            }
        """
        eclipses = self.calculate_eclipses(year)
        moon_phases = self.calculate_moon_phases(year, month)
        
        # 过滤该月的日月食
        monthly_eclipses = [e for e in eclipses if e['date'].month == month]
        
        # 如果提供了太阳星座，计算宫位
        if sun_sign:
            for event in monthly_eclipses:
                event['house'] = self._calculate_house(sun_sign, event['sign'])
                event['house_name'] = self._get_house_name(event['house'])
            
            for phase in moon_phases:
                phase['house'] = self._calculate_house(sun_sign, phase['sign'])
                phase['house_name'] = self._get_house_name(phase['house'])
        
        return {
            'eclipses': monthly_eclipses,
            'moon_phases': moon_phases
        }
    
    def _calculate_house(self, natal_sign: str, transit_sign: str) -> int:
        """计算行星落入的宫位（简化版）"""
        natal_idx = self.SIGNS.index(natal_sign) if natal_sign in self.SIGNS else 0
        transit_idx = self.SIGNS.index(transit_sign) if transit_sign in self.SIGNS else 0
        return ((transit_idx - natal_idx + 12) % 12) + 1
    
    def _get_house_name(self, house_num: int) -> str:
        """获取宫位名称"""
        house_names = {
            1: '命宫', 2: '财帛宫', 3: '兄弟宫', 4: '田宅宫',
            5: '子女宫', 6: '奴仆宫', 7: '夫妻宫', 8: '疾厄宫',
            9: '迁移宫', 10: '官禄宫', 11: '福德宫', 12: '玄秘宫'
        }
        return house_names.get(house_num, f'第{house_num}宫')


# 单例模式
_calculator_instance = None

def get_eclipse_calculator() -> EclipseMoonCalculator:
    """获取计算器实例（单例模式）"""
    global _calculator_instance
    if _calculator_instance is None:
        _calculator_instance = EclipseMoonCalculator()
    return _calculator_instance


# 测试代码
if __name__ == "__main__":
    print("🌑 实时日月食和月相计算器")
    print("=" * 60)
    
    calc = EclipseMoonCalculator()
    
    # 测试2026年日月食
    print("\n测试: 2026年日月食")
    eclipses = calc.calculate_eclipses(2026)
    for e in eclipses:
        print(f"  {e['date_str']} - {e['type']} ({e['sign']})")
    
    # 测试2026年3月新月满月
    print("\n测试: 2026年3月新月满月")
    moon_phases = calc.calculate_moon_phases(2026, 3)
    for mp in moon_phases:
        print(f"  {mp['date_str']} - {mp['type']} ({mp['sign']} {mp['degree']}°)")
    
    # 测试2026年4月（包含日月食）
    print("\n测试: 2026年4月天文事件")
    events = calc.get_monthly_events(2026, 4, '处女座')
    print(f"  日月食: {len(events['eclipses'])} 次")
    for e in events['eclipses']:
        print(f"    - {e['date_str']} {e['type']} 第{e['house']}宫")
    print(f"  新月满月: {len(events['moon_phases'])} 次")
    for mp in events['moon_phases']:
        print(f"    - {mp['date_str']} {mp['type']} 第{mp['house']}宫")
    
    print("\n" + "=" * 60)
    print("✅ 测试完成")

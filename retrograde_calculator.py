#!/usr/bin/env python3
"""
实时行星逆行计算器 - 使用 Skyfield
集成到 Flask API 中
"""

from skyfield.api import Loader
from datetime import datetime, timedelta
from typing import List, Dict, Optional
import os

class RetrogradeCalculator:
    """
    行星逆行实时计算器
    使用 NASA JPL 星历数据精确计算
    """
    
    # 星座列表
    SIGNS = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
             '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    
    # 行星名称映射
    PLANET_NAMES = {
        'mercury': 'mercury', '水星': 'mercury',
        'venus': 'venus', '金星': 'venus',
        'mars': 'mars barycenter', '火星': 'mars barycenter',
        'jupiter': 'jupiter barycenter', '木星': 'jupiter barycenter',
        'saturn': 'saturn barycenter', '土星': 'saturn barycenter',
        'uranus': 'uranus barycenter', '天王星': 'uranus barycenter',
        'neptune': 'neptune barycenter', '海王星': 'neptune barycenter',
        'pluto': 'pluto barycenter', '冥王星': 'pluto barycenter'
    }
    
    # 中文名称
    CN_NAMES = {
        'mercury': '水星', 'venus': '金星', 'mars': '火星',
        'jupiter': '木星', 'jupiter barycenter': '木星',
        'saturn': '土星', 'saturn barycenter': '土星',
        'uranus': '天王星', 'uranus barycenter': '天王星',
        'neptune': '海王星', 'neptune barycenter': '海王星',
        'pluto': '冥王星', 'pluto barycenter': '冥王星'
    }
    
    # 行星影响领域
    PLANET_AREAS = {
        'mercury': '沟通、思考、合同、交通',
        'venus': '爱情、财务、审美、人际关系',
        'mars': '行动、冲突、欲望、能量',
        'jupiter': '扩张、幸运、成长、信念',
        'saturn': '责任、结构、限制、长期规划',
        'uranus': '变革、创新、突破、意外',
        'neptune': '梦想、直觉、灵性、幻觉',
        'pluto': '转化、权力、深度、重生'
    }
    
    def __init__(self, data_dir: str = None):
        """
        初始化计算器
        
        Args:
            data_dir: 星历数据目录，默认使用项目目录
        """
        if data_dir is None:
            data_dir = os.path.join(
                os.path.dirname(os.path.abspath(__file__)),
                '..', 'skyfield_data'
            )
        
        self.data_dir = os.path.abspath(data_dir)
        os.makedirs(self.data_dir, exist_ok=True)
        
        # 延迟加载星历数据（首次使用时加载）
        self._planets = None
        self._ts = None
        self._earth = None
        
    def _init_ephemeris(self):
        """初始化星历数据（懒加载）"""
        if self._planets is None:
            try:
                load = Loader(self.data_dir)
                self._planets = load('de440.bsp')
                self._ts = load.timescale()
                self._earth = self._planets['earth']
                print(f"✅ 星历数据已加载: {self.data_dir}")
            except Exception as e:
                print(f"❌ 无法加载星历数据: {e}")
                raise
    
    def _get_planet(self, planet_name: str):
        """获取行星对象"""
        self._init_ephemeris()
        key = self.PLANET_NAMES.get(planet_name.lower(), planet_name.lower())
        return self._planets[key]
    
    def _get_sign(self, longitude: float) -> str:
        """根据黄经获取星座"""
        sign_index = int(longitude / 30) % 12
        return self.SIGNS[sign_index]
    
    def _calculate_daily_motion(self, planet, date: datetime) -> tuple:
        """
        计算指定日期的行星每日移动
        
        Returns:
            (motion_degrees, longitude, is_retrograde)
        """
        # 当前日期
        t_current = self._ts.utc(date.year, date.month, date.day)
        _, lon_current, _ = self._earth.at(t_current).observe(planet).apparent().ecliptic_latlon(epoch=None)
        
        # 前一天
        t_prev = self._ts.utc(date.year, date.month, date.day - 1)
        _, lon_prev, _ = self._earth.at(t_prev).observe(planet).apparent().ecliptic_latlon(epoch=None)
        
        # 计算差值
        motion = (lon_current.degrees - lon_prev.degrees) % 360
        if motion > 180:
            motion -= 360
        
        # 判断逆行（每日移动小于-0.001度）
        is_retrograde = motion < -0.001
        
        return motion, lon_current.degrees, is_retrograde
    
    def calculate_retrograde(self, year: int, planet_name: str) -> List[Dict]:
        """
        计算指定年份指定行星的所有逆行期
        
        Args:
            year: 年份 (例如 2026)
            planet_name: 行星名称 (例如 'saturn', 'mercury')
        
        Returns:
            逆行期列表，每个包含:
            - start: 开始日期 (datetime)
            - end: 结束日期 (datetime)
            - start_sign: 开始时的星座
            - end_sign: 结束时的星座
            - duration_days: 持续天数
            - planet: 行星中文名
            - planet_en: 行星英文名
        """
        try:
            planet = self._get_planet(planet_name)
            planet_en = planet_name.lower()
            planet_cn = self.CN_NAMES.get(planet_en, planet_name)
        except KeyError:
            return []
        
        # 遍历全年
        start_date = datetime(year, 1, 1)
        end_date = datetime(year, 12, 31)
        
        retrograde_periods = []
        in_retrograde = False
        retro_start = None
        retro_start_sign = None
        
        current = start_date
        while current <= end_date:
            try:
                motion, longitude, is_retrograde = self._calculate_daily_motion(planet, current)
                current_sign = self._get_sign(longitude)
                
                if is_retrograde and not in_retrograde:
                    # 逆行开始
                    retro_start = current
                    retro_start_sign = current_sign
                    in_retrograde = True
                elif not is_retrograde and in_retrograde:
                    # 逆行结束
                    if retro_start:
                        duration = (current - retro_start).days
                        retrograde_periods.append({
                            'start': retro_start,
                            'end': current,
                            'start_sign': retro_start_sign,
                            'end_sign': current_sign,
                            'duration_days': duration,
                            'planet': planet_cn,
                            'planet_en': planet_en,
                            'affected_areas': self.PLANET_AREAS.get(planet_en, '生活各方面')
                        })
                    in_retrograde = False
                    retro_start = None
                    retro_start_sign = None
                
                current += timedelta(days=1)
                
            except Exception as e:
                print(f"计算错误 {current}: {e}")
                current += timedelta(days=1)
                continue
        
        # 处理跨年情况
        if in_retrograde and retro_start:
            duration = (end_date - retro_start).days + 1
            retrograde_periods.append({
                'start': retro_start,
                'end': end_date,
                'start_sign': retro_start_sign,
                'end_sign': current_sign,
                'duration_days': duration,
                'planet': planet_cn,
                'planet_en': planet_en,
                'affected_areas': self.PLANET_AREAS.get(planet_en, '生活各方面'),
                'note': '逆行持续至下一年'
            })
        
        return retrograde_periods
    
    def calculate_all_planets(self, year: int) -> Dict[str, List[Dict]]:
        """
        计算指定年份所有行星的逆行
        
        Args:
            year: 年份
        
        Returns:
            字典，键为行星英文名，值为逆行期列表
        """
        planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']
        results = {}
        
        for planet in planets:
            results[planet] = self.calculate_retrograde(year, planet)
        
        return results
    
    def get_monthly_retrograde(self, year: int, month: int, sun_sign: str = None) -> List[Dict]:
        """
        获取指定月份的所有行星逆行
        
        Args:
            year: 年份
            month: 月份 (1-12)
            sun_sign: 用户的太阳星座（用于计算宫位）
        
        Returns:
            该月的逆行列表
        """
        from datetime import date
        
        all_retrogrades = self.calculate_all_planets(year)
        monthly_retro = []
        
        # 计算该月的开始和结束日期
        month_start = date(year, month, 1)
        if month == 12:
            month_end = date(year + 1, 1, 1)
        else:
            month_end = date(year, month + 1, 1)
        
        for planet, periods in all_retrogrades.items():
            for period in periods:
                retro_start = period['start'].date() if hasattr(period['start'], 'date') else period['start']
                retro_end = period['end'].date() if hasattr(period['end'], 'date') else period['end']
                
                # 检查逆行期是否与该月份有重叠
                # 条件：逆行开始 <= 该月结束 且 逆行结束 >= 该月开始
                if retro_start <= month_end and retro_end >= month_start:
                    # 计算宫位（如果提供了太阳星座）
                    if sun_sign:
                        house = self._calculate_house(sun_sign, period['start_sign'])
                        period['house'] = house
                        period['house_name'] = self._get_house_name(house)
                    
                    monthly_retro.append(period)
        
        return monthly_retro
    
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


# 单例模式，全局共享一个计算器实例
_calculator_instance = None

def get_calculator() -> RetrogradeCalculator:
    """获取计算器实例（单例模式）"""
    global _calculator_instance
    if _calculator_instance is None:
        _calculator_instance = RetrogradeCalculator()
    return _calculator_instance


# 测试代码
if __name__ == "__main__":
    print("🪐 实时行星逆行计算器")
    print("=" * 60)
    
    calc = RetrogradeCalculator()
    
    # 测试2026年土星逆行
    print("\n测试: 2026年土星逆行")
    saturn_2026 = calc.calculate_retrograde(2026, 'saturn')
    for period in saturn_2026:
        print(f"  {period['start'].strftime('%Y-%m-%d')} ~ {period['end'].strftime('%Y-%m-%d')}")
        print(f"  星座: {period['start_sign']} -> {period['end_sign']}")
        print(f"  持续: {period['duration_days']} 天")
    
    # 测试2027年土星逆行
    print("\n测试: 2027年土星逆行")
    saturn_2027 = calc.calculate_retrograde(2027, 'saturn')
    for period in saturn_2027:
        print(f"  {period['start'].strftime('%Y-%m-%d')} ~ {period['end'].strftime('%Y-%m-%d')}")
    
    print("\n" + "=" * 60)
    print("✅ 测试完成")

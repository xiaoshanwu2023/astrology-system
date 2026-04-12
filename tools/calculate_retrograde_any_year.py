#!/usr/bin/env python3
"""
通用行星逆行计算器
支持计算任意年份的行星逆行时间

使用方法:
    python3 calculate_retrograde_any_year.py --planet saturn --year 2027
    python3 calculate_retrograde_any_year.py --planet mercury --year 2026
    python3 calculate_retrograde_any_year.py --year 2025 --all
"""

from skyfield.api import Loader
from datetime import datetime, timedelta
import argparse
import os

def get_planet_name(planet_key):
    """获取行星标准名称"""
    planet_names = {
        'mercury': 'mercury', '水星': 'mercury',
        'venus': 'venus', '金星': 'venus',
        'mars': 'mars', '火星': 'mars',
        'jupiter': 'jupiter barycenter', '木星': 'jupiter barycenter',
        'saturn': 'saturn barycenter', '土星': 'saturn barycenter',
        'uranus': 'uranus barycenter', '天王星': 'uranus barycenter',
        'neptune': 'neptune barycenter', '海王星': 'neptune barycenter',
        'pluto': 'pluto barycenter', '冥王星': 'pluto barycenter'
    }
    return planet_names.get(planet_key.lower(), planet_key)

def get_planet_cn_name(planet_key):
    """获取行星中文名称"""
    cn_names = {
        'mercury': '水星', 'venus': '金星', 'mars': '火星',
        'jupiter': '木星', 'jupiter barycenter': '木星',
        'saturn': '土星', 'saturn barycenter': '土星',
        'uranus': '天王星', 'uranus barycenter': '天王星',
        'neptune': '海王星', 'neptune barycenter': '海王星',
        'pluto': '冥王星', 'pluto barycenter': '冥王星'
    }
    return cn_names.get(planet_key.lower(), planet_key)

def get_sign(longitude):
    """根据黄经获取星座"""
    signs = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
             '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    sign_index = int(longitude / 30) % 12
    return signs[sign_index]

def calculate_daily_motion(earth, planet, ts, date):
    """计算指定日期的行星每日移动（度）"""
    # 当前日期
    t_current = ts.utc(date.year, date.month, date.day)
    _, lon_current, _ = earth.at(t_current).observe(planet).apparent().ecliptic_latlon(epoch=None)
    
    # 前一天
    t_prev = ts.utc(date.year, date.month, date.day - 1)
    _, lon_prev, _ = earth.at(t_prev).observe(planet).apparent().ecliptic_latlon(epoch=None)
    
    # 计算差值
    motion = (lon_current.degrees - lon_prev.degrees) % 360
    if motion > 180:
        motion -= 360
    
    return motion, lon_current.degrees

def find_retrograde_periods(year, planet_key, data_dir=None):
    """
    查找指定年份指定行星的所有逆行期
    
    Args:
        year: 年份 (例如 2026)
        planet_key: 行星名称 (例如 'saturn', 'mercury')
        data_dir: 星历数据目录
    
    Returns:
        逆行期列表，每个包含 start, end, start_sign, end_sign, duration_days
    """
    if data_dir is None:
        data_dir = '/Users/wuxiaoshan/.openclaw/workspace/projects/astrology/skyfield_data'
    
    os.makedirs(data_dir, exist_ok=True)
    
    # 加载星历数据
    load = Loader(data_dir)
    try:
        planets = load('de440.bsp')
    except Exception as e:
        print(f"❌ 无法加载星历数据: {e}")
        return []
    
    ts = load.timescale()
    earth = planets['earth']
    
    try:
        planet_name = get_planet_name(planet_key)
        planet = planets[planet_name]
    except KeyError:
        print(f"❌ 未知行星: {planet_key}")
        return []
    
    # 遍历全年每一天
    start_date = datetime(year, 1, 1)
    end_date = datetime(year, 12, 31)
    
    retrograde_periods = []
    in_retrograde = False
    retro_start = None
    retro_start_sign = None
    
    current = start_date
    while current <= end_date:
        motion, longitude = calculate_daily_motion(earth, planet, ts, current)
        
        # 判断逆行（每日移动为负且小于-0.001度）
        is_retrograde = motion < -0.001
        current_sign = get_sign(longitude)
        
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
                    'duration_days': duration
                })
            in_retrograde = False
            retro_start = None
            retro_start_sign = None
        
        current += timedelta(days=1)
    
    # 处理跨年情况（如果年末仍在逆行中）
    if in_retrograde and retro_start:
        duration = (end_date - retro_start).days + 1
        retrograde_periods.append({
            'start': retro_start,
            'end': end_date,
            'start_sign': retro_start_sign,
            'end_sign': current_sign,
            'duration_days': duration,
            'note': '逆行持续至下一年'
        })
    
    return retrograde_periods

def print_retrograde_info(year, planet_key, periods):
    """打印逆行信息"""
    planet_cn = get_planet_cn_name(planet_key)
    
    print(f"\n{'='*60}")
    print(f"🪐 {year}年 {planet_cn} 逆行")
    print(f"{'='*60}")
    
    if not periods:
        print("该年份无逆行记录")
        return
    
    for i, period in enumerate(periods, 1):
        print(f"\n逆行期 #{i}:")
        print(f"  📅 开始: {period['start'].strftime('%Y年%m月%d日')} ({period['start_sign']})")
        print(f"  📅 结束: {period['end'].strftime('%Y年%m月%d日')} ({period['end_sign']})")
        print(f"  ⏱️  持续: {period['duration_days']} 天")
        if 'note' in period:
            print(f"  📝 备注: {period['note']}")

def main():
    parser = argparse.ArgumentParser(description='计算行星逆行时间')
    parser.add_argument('--year', type=int, default=datetime.now().year, help='年份 (默认: 今年)')
    parser.add_argument('--planet', type=str, default='saturn', help='行星名称 (例如: mercury, venus, mars, jupiter, saturn)')
    parser.add_argument('--all', action='store_true', help='计算所有主要行星')
    
    args = parser.parse_args()
    
    print("\n" + "="*60)
    print(f"🔭 行星逆行计算器")
    print(f"使用 NASA JPL DE440 星历数据")
    print("="*60)
    
    if args.all:
        # 计算所有行星
        planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']
        for planet in planets:
            periods = find_retrograde_periods(args.year, planet)
            print_retrograde_info(args.year, planet, periods)
    else:
        # 计算指定行星
        periods = find_retrograde_periods(args.year, args.planet)
        print_retrograde_info(args.year, args.planet, periods)
    
    print("\n" + "="*60)
    print("✅ 计算完成")
    print("="*60)

if __name__ == "__main__":
    main()

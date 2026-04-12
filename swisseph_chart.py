"""
Swiss Ephemeris 封装模块
通过调用 swetest CLI 实现专业级星盘计算
"""

import subprocess
import re
import os
from datetime import datetime
from typing import Dict, List, Tuple, Optional

# Swiss Ephemeris 可执行文件路径
# 首先尝试项目目录，然后是环境变量，最后是默认路径
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_SWETEST = os.path.join(BASE_DIR, 'swetest')
if os.path.exists(PROJECT_SWETEST):
    SWETEST_PATH = PROJECT_SWETEST
else:
    SWETEST_PATH = os.environ.get('SWETEST_PATH', '/tmp/swisseph/swetest')

# 星座映射
SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]

SIGNS_ZH = {
    'Aries': '白羊座', 'Taurus': '金牛座', 'Gemini': '双子座',
    'Cancer': '巨蟹座', 'Leo': '狮子座', 'Virgo': '处女座',
    'Libra': '天秤座', 'Scorpio': '天蝎座', 'Sagittarius': '射手座',
    'Capricorn': '摩羯座', 'Aquarius': '水瓶座', 'Pisces': '双鱼座'
}

PLANET_NAMES = {
    'sun': '太阳', 'moon': '月亮', 'mercury': '水星', 'venus': '金星',
    'mars': '火星', 'jupiter': '木星', 'saturn': '土星',
    'uranus': '天王星', 'neptune': '海王星', 'pluto': '冥王星',
    'ascendant': '上升星座', 'midheaven': '天顶'
}

# 主要相位
MAJOR_ASPECTS = {
    0: ('合相', 'conjunction'),
    60: ('六合相', 'sextile'),
    90: ('刑相', 'square'),
    120: ('三合相', 'trine'),
    180: ('对冲', 'opposition')
}

# 行星容许度
PLANET_ORBS = {
    'sun': 7.5, 'moon': 6.0, 'mercury': 3.5, 'venus': 4.0, 'mars': 4.0,
    'jupiter': 4.5, 'saturn': 4.5, 'uranus': 2.5, 'neptune': 2.5, 'pluto': 2.5
}


def longitude_to_sign(longitude: float) -> Tuple[str, float]:
    """将黄经转换为星座和度数"""
    sign_idx = int(longitude / 30) % 12
    degree = longitude % 30
    return SIGNS[sign_idx], round(degree, 2)


def parse_dms(dms_str: str) -> float:
    """解析度分秒字符串为度数"""
    # 格式: 275°20'20.8283 或 275°20' 0.2577
    # 也可能有前导空格
    dms_str = dms_str.strip()
    match = re.match(r'(\d+)°\s*(\d+)\'\s*([\d.]+)', dms_str)
    if match:
        deg, minute, sec = match.groups()
        return float(deg) + float(minute) / 60 + float(sec) / 3600
    return 0.0


def run_swetest(args: List[str]) -> str:
    """运行 swetest 命令并返回输出"""
    cmd = [SWETEST_PATH] + args
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
        return result.stdout
    except subprocess.TimeoutExpired:
        raise RuntimeError("Swiss Ephemeris 计算超时")
    except FileNotFoundError:
        raise RuntimeError(f"Swiss Ephemeris 未找到: {SWETEST_PATH}")
    except Exception as e:
        raise RuntimeError(f"Swiss Ephemeris 运行错误: {e}")


def calculate_natal_chart_swisseph(birth_dt: datetime, lon: float, lat: float) -> Dict:
    """
    计算本命盘
    
    Args:
        birth_dt: 出生日期时间 (UTC)
        lon: 经度
        lat: 纬度
    
    Returns:
        包含行星位置和宫位信息的字典
    """
    # 格式化日期和时间
    day = birth_dt.day
    month = birth_dt.month
    year = birth_dt.year
    hour = birth_dt.hour
    minute = birth_dt.minute
    
    # 构建命令参数
    args = [
        f'-b{day}.{month}.{year}',
        f'-ut{hour}:{minute:02d}',
        f'-geopos{lon},{lat},0',
        f'-house{lon},{lat},P',  # P = Placidus 宫位系统
        '-head'
    ]
    
    output = run_swetest(args)
    
    # 解析输出
    planets = {}
    
    for line in output.split('\n'):
        line = line.strip()
        
        # 解析行星位置 - 使用正则表达式更灵活地匹配
        if line.startswith('Sun '):
            match = re.search(r'Sun\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon)
                planets['sun'] = {'sign': sign, 'degree': degree, 'longitude': round(lon, 2), 'house': 0}
        elif line.startswith('Moon '):
            match = re.search(r'Moon\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon)
                planets['moon'] = {'sign': sign, 'degree': degree, 'longitude': round(lon, 2), 'house': 0}
        elif line.startswith('Mercury '):
            match = re.search(r'Mercury\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon)
                planets['mercury'] = {'sign': sign, 'degree': degree, 'longitude': round(lon, 2), 'house': 0}
        elif line.startswith('Venus '):
            match = re.search(r'Venus\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon)
                planets['venus'] = {'sign': sign, 'degree': degree, 'longitude': round(lon, 2), 'house': 0}
        elif line.startswith('Mars '):
            match = re.search(r'Mars\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon)
                planets['mars'] = {'sign': sign, 'degree': degree, 'longitude': round(lon, 2), 'house': 0}
        elif line.startswith('Jupiter '):
            match = re.search(r'Jupiter\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon)
                planets['jupiter'] = {'sign': sign, 'degree': degree, 'longitude': round(lon, 2), 'house': 0}
        elif line.startswith('Saturn '):
            match = re.search(r'Saturn\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon)
                planets['saturn'] = {'sign': sign, 'degree': degree, 'longitude': round(lon, 2), 'house': 0}
        elif line.startswith('Uranus '):
            match = re.search(r'Uranus\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon)
                planets['uranus'] = {'sign': sign, 'degree': degree, 'longitude': round(lon, 2), 'house': 0}
        elif line.startswith('Neptune '):
            match = re.search(r'Neptune\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon)
                planets['neptune'] = {'sign': sign, 'degree': degree, 'longitude': round(lon, 2), 'house': 0}
        elif line.startswith('Pluto '):
            match = re.search(r'Pluto\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon)
                planets['pluto'] = {'sign': sign, 'degree': degree, 'longitude': round(lon, 2), 'house': 0}
        
        # 解析宫位和上升星座
        elif line.startswith('house  1 '):
            match = re.search(r'house\s+1\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                house_1_lon = parse_dms(match.group(1))
                house_1_sign, house_1_degree = longitude_to_sign(house_1_lon)
                planets['ascendant'] = {'sign': house_1_sign, 'degree': house_1_degree, 
                                       'longitude': round(house_1_lon, 2), 'house': 1}
        elif line.startswith('house 10 '):
            match = re.search(r'house\s+10\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                house_10_lon = parse_dms(match.group(1))
                house_10_sign, house_10_degree = longitude_to_sign(house_10_lon)
                planets['midheaven'] = {'sign': house_10_sign, 'degree': house_10_degree,
                                       'longitude': round(house_10_lon, 2), 'house': 10}
        elif line.startswith('Ascendant'):
            match = re.search(r'Ascendant\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                asc_lon = parse_dms(match.group(1))
                asc_sign, asc_degree = longitude_to_sign(asc_lon)
                planets['ascendant'] = {'sign': asc_sign, 'degree': asc_degree,
                                       'longitude': round(asc_lon, 2), 'house': 1}
        elif line.startswith('MC '):
            match = re.search(r'MC\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                mc_lon = parse_dms(match.group(1))
                mc_sign, mc_degree = longitude_to_sign(mc_lon)
                planets['midheaven'] = {'sign': mc_sign, 'degree': mc_degree,
                                       'longitude': round(mc_lon, 2), 'house': 10}
    
    # 计算每个行星所在的宫位
    house_cusps = []
    for line in output.split('\n'):
        line = line.strip()
        if line.startswith('house '):
            # 使用正则表达式更灵活地匹配
            # 格式: house  1         275°20'20.8283  345°20' 0.5213
            match = re.search(r'house\s+(\d+)\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                try:
                    house_num = int(match.group(1))
                    house_lon = parse_dms(match.group(2))
                    house_cusps.append((house_num, house_lon))
                except Exception as e:
                    print(f"[WARN] 解析宫位失败: {line}, 错误: {e}")
                    pass
    
    # 确保有12个宫位
    if len(house_cusps) != 12:
        print(f"[WARN] 宫位数据不完整: {len(house_cusps)}个宫位，使用默认值")
        # 使用上升点作为第1宫，每30度一个宫（等宫制）
        asc_lon = planets.get('ascendant', {}).get('longitude', 0)
        house_cusps = [(i, (asc_lon + (i-1) * 30) % 360) for i in range(1, 13)]
    
    # 为每个行星分配宫位
    for planet_name, planet_data in planets.items():
        if planet_name in ['ascendant', 'midheaven']:
            continue
        planet_lon = planet_data['longitude']
        planet_data['house'] = get_house_for_longitude(planet_lon, house_cusps)
    
    # 将宫位信息也返回，供行运盘计算使用
    return {'planets': planets, 'house_cusps': house_cusps}


def get_house_for_longitude(longitude: float, house_cusps: List[Tuple[int, float]]) -> int:
    """根据经度确定宫位
    
    参数:
        longitude: 行星黄经 (0-360)
        house_cusps: 宫位列表 [(宫位号, 宫位起点黄经), ...]
    
    返回:
        宫位号 (1-12)
    """
    if not house_cusps:
        return 1
    
    # 确保宫位数据完整 (12个宫位)
    if len(house_cusps) < 12:
        # 如果数据不完整，使用上升点作为第1宫起点，每30度一个宫（简化）
        asc_lon = next((lon for num, lon in house_cusps if num == 1), 0)
        house_cusps = [(i, (asc_lon + (i-1) * 30) % 360) for i in range(1, 13)]
    
    # 按黄经排序宫位
    sorted_houses = sorted(house_cusps, key=lambda x: x[1])
    
    # 将经度归一化到 0-360
    lon = longitude % 360
    
    # 查找行星落入哪个宫位
    for i in range(len(sorted_houses)):
        current_house = sorted_houses[i]
        next_house = sorted_houses[(i + 1) % len(sorted_houses)]
        
        current_lon = current_house[1] % 360
        next_lon = next_house[1] % 360
        
        # 判断行星是否在当前宫位范围内
        if current_lon <= next_lon:
            # 正常情况 (不跨0度)
            if current_lon <= lon < next_lon:
                return current_house[0]
        else:
            # 跨0度情况 (如宫位7在350°, 宫位8在20°)
            if lon >= current_lon or lon < next_lon:
                return current_house[0]
    
    # 默认返回第1宫
    return 1
    
    return 1


def calculate_transit_chart_swisseph(transit_dt: datetime, natal_chart: Dict, 
                                     lon: float = 116.4, lat: float = 39.9) -> Dict:
    """
    计算行运盘
    
    Args:
        transit_dt: 行运日期时间 (UTC)
        natal_chart: 本命盘数据（用于计算宫位）
        lon: 经度
        lat: 纬度
    
    Returns:
        包含行运行星位置的字典
    """
    # 格式化日期和时间
    day = transit_dt.day
    month = transit_dt.month
    year = transit_dt.year
    hour = transit_dt.hour
    minute = transit_dt.minute
    
    # 构建命令参数
    args = [
        f'-b{day}.{month}.{year}',
        f'-ut{hour}:{minute:02d}',
        f'-geopos{lon},{lat},0',
        '-head'
    ]
    
    output = run_swetest(args)
    
    # 解析输出
    planets = {}
    
    for line in output.split('\n'):
        line = line.strip()
        
        if line.startswith('Sun '):
            match = re.search(r'Sun\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon_val = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon_val)
                planets['sun'] = {'sign': sign, 'degree': degree, 'longitude': round(lon_val, 2), 'house': 0}
        elif line.startswith('Moon '):
            match = re.search(r'Moon\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon_val = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon_val)
                planets['moon'] = {'sign': sign, 'degree': degree, 'longitude': round(lon_val, 2), 'house': 0}
        elif line.startswith('Mercury '):
            match = re.search(r'Mercury\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon_val = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon_val)
                planets['mercury'] = {'sign': sign, 'degree': degree, 'longitude': round(lon_val, 2), 'house': 0}
        elif line.startswith('Venus '):
            match = re.search(r'Venus\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon_val = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon_val)
                planets['venus'] = {'sign': sign, 'degree': degree, 'longitude': round(lon_val, 2), 'house': 0}
        elif line.startswith('Mars '):
            match = re.search(r'Mars\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon_val = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon_val)
                planets['mars'] = {'sign': sign, 'degree': degree, 'longitude': round(lon_val, 2), 'house': 0}
        elif line.startswith('Jupiter '):
            match = re.search(r'Jupiter\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon_val = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon_val)
                planets['jupiter'] = {'sign': sign, 'degree': degree, 'longitude': round(lon_val, 2), 'house': 0}
        elif line.startswith('Saturn '):
            match = re.search(r'Saturn\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon_val = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon_val)
                planets['saturn'] = {'sign': sign, 'degree': degree, 'longitude': round(lon_val, 2), 'house': 0}
        elif line.startswith('Uranus '):
            match = re.search(r'Uranus\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon_val = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon_val)
                planets['uranus'] = {'sign': sign, 'degree': degree, 'longitude': round(lon_val, 2), 'house': 0}
        elif line.startswith('Neptune '):
            match = re.search(r'Neptune\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon_val = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon_val)
                planets['neptune'] = {'sign': sign, 'degree': degree, 'longitude': round(lon_val, 2), 'house': 0}
        elif line.startswith('Pluto '):
            match = re.search(r'Pluto\s+(\d+°[\d\'\.\s]+)', line)
            if match:
                lon_val = parse_dms(match.group(1))
                sign, degree = longitude_to_sign(lon_val)
                planets['pluto'] = {'sign': sign, 'degree': degree, 'longitude': round(lon_val, 2), 'house': 0}
    
    # 计算行运行星落入本命盘的哪个宫位
    # 使用本命盘的宫位信息（house_cusps）
    natal_house_cusps = natal_chart.get('house_cusps', [])
    
    if natal_house_cusps:
        for planet_name, planet_data in planets.items():
            planet_lon = planet_data['longitude']
            planet_data['house'] = get_house_for_longitude(planet_lon, natal_house_cusps)
    else:
        # 如果没有宫位信息，默认设为1宫
        for planet_name, planet_data in planets.items():
            planet_data['house'] = 1
    
    return planets


def calculate_aspects_swisseph(natal_result: Dict, transit_result: Dict) -> List[Dict]:
    """
    计算本命盘与行运盘的相位
    
    Args:
        natal_result: 本命盘数据
        transit_result: 行运盘数据
    
    Returns:
        相位列表
    """
    aspects = []
    target_planets = ['sun', 'moon', 'mercury', 'venus', 'mars',
                      'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']
    
    natal_planets = natal_result.get('planets', {})
    
    for n_planet in target_planets:
        if n_planet not in natal_planets:
            continue
        for t_planet in target_planets:
            if n_planet == t_planet or t_planet not in transit_result:
                continue
            
            lon_n = natal_planets[n_planet]['longitude']
            lon_t = transit_result[t_planet]['longitude']
            
            diff = abs(lon_n - lon_t)
            diff = min(diff, 360 - diff)
            
            for degree, (aspect_name, aspect_type) in MAJOR_ASPECTS.items():
                orb_n = PLANET_ORBS.get(n_planet, 2.5)
                orb_t = PLANET_ORBS.get(t_planet, 2.5)
                max_orb = (orb_n + orb_t) / 2.0
                deviation = abs(diff - degree)
                
                if deviation <= max_orb:
                    aspects.append({
                        'natal_planet': n_planet,
                        'natal_planet_zh': PLANET_NAMES[n_planet],
                        'transit_planet': t_planet,
                        'transit_planet_zh': PLANET_NAMES[t_planet],
                        'aspect_degree': degree,
                        'actual_degree': round(diff, 4),
                        'aspect_name': aspect_name,
                        'aspect_type': aspect_type,
                        'deviation': round(deviation, 4),
                        'natal_sign': natal_planets[n_planet]['sign'],
                        'natal_sign_zh': SIGNS_ZH[natal_planets[n_planet]['sign']],
                        'transit_sign': transit_result[t_planet]['sign'],
                        'transit_sign_zh': SIGNS_ZH[transit_result[t_planet]['sign']],
                        'transit_house': transit_result[t_planet]['house']
                    })
    
    # 添加上升星座与行运行星的相位
    if 'ascendant' in natal_planets:
        asc_lon = natal_planets['ascendant']['longitude']
        asc_sign = natal_planets['ascendant']['sign']
        
        for t_planet in target_planets:
            if t_planet not in transit_result:
                continue
            
            lon_t = transit_result[t_planet]['longitude']
            diff = abs(asc_lon - lon_t)
            diff = min(diff, 360 - diff)
            
            for degree, (aspect_name, aspect_type) in MAJOR_ASPECTS.items():
                max_orb = PLANET_ORBS.get(t_planet, 2.5)
                deviation = abs(diff - degree)
                
                if deviation <= max_orb:
                    aspects.append({
                        'natal_planet': 'ascendant',
                        'natal_planet_zh': '上升星座',
                        'transit_planet': t_planet,
                        'transit_planet_zh': PLANET_NAMES[t_planet],
                        'aspect_degree': degree,
                        'actual_degree': round(diff, 4),
                        'aspect_name': aspect_name,
                        'aspect_type': aspect_type,
                        'deviation': round(deviation, 4),
                        'natal_sign': asc_sign,
                        'natal_sign_zh': SIGNS_ZH[asc_sign],
                        'transit_sign': transit_result[t_planet]['sign'],
                        'transit_sign_zh': SIGNS_ZH[transit_result[t_planet]['sign']],
                        'transit_house': transit_result[t_planet]['house'],
                        'is_ascendant_aspect': True  # 标记为上升星座相位
                    })
    
    # 按紧密度排序
    aspects.sort(key=lambda x: x['deviation'])
    return aspects


# 测试函数
if __name__ == '__main__':
    # 测试本命盘计算
    birth_dt = datetime(1990, 5, 15, 14, 30, 0)
    print("=" * 50)
    print("测试本命盘计算")
    print("=" * 50)
    
    natal = calculate_natal_chart_swisseph(birth_dt, 116.4, 39.9)
    print("\n【本命盘】")
    for planet, data in natal['planets'].items():
        print(f"{planet}: {data['sign']} {data['degree']}° (宫位: {data.get('house', '-')})")
    
    # 测试行运盘计算
    transit_dt = datetime(2024, 3, 27, 10, 0, 0)
    print("\n" + "=" * 50)
    print("测试行运盘计算")
    print("=" * 50)
    
    transit = calculate_transit_chart_swisseph(transit_dt, natal, 116.4, 39.9)
    print("\n【行运盘】")
    for planet, data in transit.items():
        print(f"{planet}: {data['sign']} {data['degree']}° (宫位: {data.get('house', '-')})")
    
    # 测试相位计算
    print("\n" + "=" * 50)
    print("测试相位计算")
    print("=" * 50)
    
    aspects = calculate_aspects_swisseph(natal, transit)
    print(f"\n找到 {len(aspects)} 个相位:")
    for aspect in aspects[:10]:  # 只显示前10个
        print(f"{aspect['natal_planet_zh']} {aspect['aspect_name']} {aspect['transit_planet_zh']} "
              f"(偏差: {aspect['deviation']}°)")

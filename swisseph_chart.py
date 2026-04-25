import math
import swisseph as swe
from datetime import datetime
from typing import Dict, List, Tuple

# 星座数据
SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
         'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']

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

MAJOR_ASPECTS = {
    0: ('合相', 'conjunction'),
    60: ('六合相', 'sextile'),
    90: ('刑相', 'square'),
    120: ('三合相', 'trine'),
    180: ('对冲', 'opposition')
}

PLANET_ORBS = {
    'sun': 7.5, 'moon': 6.0, 'mercury': 3.5, 'venus': 4.0, 'mars': 4.0,
    'jupiter': 4.5, 'saturn': 4.5, 'uranus': 2.5, 'neptune': 2.5, 'pluto': 2.5
}

PLANET_IDS = {
    'sun': swe.SUN,
    'moon': swe.MOON,
    'mercury': swe.MERCURY,
    'venus': swe.VENUS,
    'mars': swe.MARS,
    'jupiter': swe.JUPITER,
    'saturn': swe.SATURN,
    'uranus': swe.URANUS,
    'neptune': swe.NEPTUNE,
    'pluto': swe.PLUTO,
}


def _jd(birth_dt: datetime, timezone_offset: float = 8.0) -> float:
    """datetime -> 儒略日（本地时间转换为 UT）"""
    total_hours = birth_dt.hour + birth_dt.minute / 60.0 + birth_dt.second / 3600.0
    ut_hours = total_hours - timezone_offset

    # 处理跨天
    day_offset = 0
    while ut_hours < 0:
        ut_hours += 24
        day_offset -= 1

    ut_dt = birth_dt + timedelta(days=day_offset)

    return swe.julday(
        ut_dt.year,
        ut_dt.month,
        ut_dt.day,
        ut_hours
    )


def longitude_to_sign(longitude: float) -> Tuple[str, float]:
    """将黄经转换为星座和度数（保留首字母大写，供 app.py 统一转小写）"""
    sign_idx = int(longitude / 30) % 12
    degree = round(longitude % 30, 2)
    return (SIGNS[sign_idx], degree)


def get_house_for_longitude(longitude: float, house_cusps: List[Tuple[int, float]]) -> int:
    """根据经度查找所在宫位"""
    for i in range(len(house_cusps) - 1):
        h1, c1 = house_cusps[i]
        h2, c2 = house_cusps[i + 1]
        # 处理跨越 0° 的情况
        if c2 < c1:
            if longitude >= c1 or longitude < c2:
                return h1
        else:
            if c1 <= longitude < c2:
                return h1
    return house_cusps[-1][0] if house_cusps else 1


def calculate_natal_chart_swisseph(birth_dt: datetime, lon: float = 116.4,
                                    lat: float = 39.9, timezone_offset: float = 8.0) -> Dict:
    """
    使用 pyswisseph 计算本命盘
    """
    jd = _jd(birth_dt, timezone_offset)
    planets = {}

    # 10 大行星
    for name, pid in PLANET_IDS.items():
        res = swe.calc(jd, pid)
        longitude = res[0][0]
        sign, degree = longitude_to_sign(longitude)
        planets[name] = {
            'sign': sign,
            'degree': degree,
            'longitude': round(longitude, 2),
            'house': 0
        }

    # 宫位（Placidus 系统）
    houses = swe.houses(jd, lat, lon, b'P')
    cusps = houses[0]
    ascmc = houses[1]

    # 12 宫头 (pyswisseph: cusps[0..11] 对应 1..12宫)
    house_cusps = []
    for i in range(12):
        lon_cusp = cusps[i]
        sign_cusp, deg_cusp = longitude_to_sign(lon_cusp)
        house_cusps.append((i + 1, lon_cusp))

    # 上升点
    asc_lon = ascmc[0]
    asc_sign, asc_degree = longitude_to_sign(asc_lon)
    planets['ascendant'] = {
        'sign': asc_sign,
        'degree': asc_degree,
        'longitude': round(asc_lon, 2),
        'house': 1
    }

    # 天顶
    mc_lon = ascmc[1]
    mc_sign, mc_degree = longitude_to_sign(mc_lon)
    planets['midheaven'] = {
        'sign': mc_sign,
        'degree': mc_degree,
        'longitude': round(mc_lon, 2),
        'house': 10
    }

    # 计算每个行星所在宫位
    for name, data in planets.items():
        if name not in ('ascendant', 'midheaven'):
            data['house'] = get_house_for_longitude(data['longitude'], house_cusps)

    return {
        'planets': planets,
        'houses': house_cusps,
        'calculation_method': 'swisseph'
    }


def calculate_transit_chart_swisseph(transit_dt: datetime, natal_chart: Dict,
                                     lon: float = 116.4, lat: float = 39.9,
                                     timezone_offset: float = 8.0) -> Dict:
    """
    使用 pyswisseph 计算行运盘
    """
    jd = _jd(transit_dt, timezone_offset)
    transit = {}

    for name, pid in PLANET_IDS.items():
        res = swe.calc(jd, pid)
        longitude = res[0][0]
        sign, degree = longitude_to_sign(longitude)
        transit[name] = {
            'sign': sign,
            'degree': degree,
            'longitude': round(longitude, 2),
            'house': 0
        }

    # 行运行星所在宫位（使用本命盘宫位系统）
    house_cusps = natal_chart.get('houses', [])
    for name, data in transit.items():
        data['house'] = get_house_for_longitude(data['longitude'], house_cusps)

    return transit


def calculate_aspects_swisseph(natal_result: Dict, transit_result: Dict) -> List[Dict]:
    """
    计算本命盘与行运盘的相位
    """
    aspects = []
    target_planets = ['sun', 'moon', 'mercury', 'venus', 'mars',
                      'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']
    natal_planets = natal_result.get('planets', {})

    # 本命行星 vs 行运行星
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

            max_orb = (PLANET_ORBS.get(n_planet, 2.5) + PLANET_ORBS.get(t_planet, 2.5)) / 2.0

            for degree, (aspect_name, aspect_type) in MAJOR_ASPECTS.items():
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

    # 上升星座与行运行星的相位
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
                        'is_ascendant_aspect': True
                    })

    # 按紧密度排序
    aspects.sort(key=lambda x: x['deviation'])
    return aspects


if __name__ == '__main__':
    birth_dt = datetime(1990, 5, 15, 14, 30, 0)
    natal = calculate_natal_chart_swisseph(birth_dt, 116.4, 39.9)
    print("本命盘：")
    for p, d in natal['planets'].items():
        print(f"  {p}: {d['sign']} {d['degree']}° (宫位{d['house']})")
    print(f"宫位：{natal['houses']}")

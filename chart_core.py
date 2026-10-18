# chart_core.py - 星盘计算统一核心
# app.py 与 tencent_lighthouse.py 共用，避免双入口逻辑分叉
import itertools
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

from swisseph_chart import (
    calculate_natal_chart_swisseph,
    calculate_transit_chart_swisseph
)

# 星座数据
SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
         'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
SIGNS_ZH = {
    'aries': '白羊座', 'taurus': '金牛座', 'gemini': '双子座',
    'cancer': '巨蟹座', 'leo': '狮子座', 'virgo': '处女座',
    'libra': '天秤座', 'scorpio': '天蝎座', 'sagittarius': '射手座',
    'capricorn': '摩羯座', 'aquarius': '水瓶座', 'pisces': '双鱼座'
}
PLANET_NAMES = {
    'sun': '太阳', 'moon': '月亮', 'mercury': '水星', 'venus': '金星',
    'mars': '火星', 'jupiter': '木星', 'saturn': '土星',
    'uranus': '天王星', 'neptune': '海王星', 'pluto': '冥王星',
    'ascendant': '上升星座', 'midheaven': '天顶', 'mc': '天顶'
}

# 主要相位及容许度
ASPECTS = {
    0: ('合相', 'conjunction'),
    60: ('六分相', 'sextile'),
    90: ('四分相', 'square'),
    120: ('三分相', 'trine'),
    180: ('对分相', 'opposition')
}
PLANET_ORBS = {
    'sun': 7.5, 'moon': 6.0, 'mercury': 3.5, 'venus': 4.0, 'mars': 4.0,
    'jupiter': 4.5, 'saturn': 4.5, 'uranus': 2.5, 'neptune': 2.5, 'pluto': 2.5
}

# 参与相位计算的 10 大行星
TARGET_PLANETS = ['sun', 'moon', 'mercury', 'venus', 'mars',
                  'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']


def _add_display_fields(planets):
    """为行星数据添加中文显示字段，并将星座名转为小写以兼容前端"""
    for key, p in planets.items():
        p['sign'] = p.get('sign', '').lower()
        p['name_zh'] = PLANET_NAMES.get(key, key)
        p['sign_zh'] = SIGNS_ZH.get(p['sign'], p['sign'])


def calculate_natal_chart(birth_dt, lon=116.4, lat=39.9, timezone_offset=8.0):
    """使用 Swiss Ephemeris 计算本命盘"""
    result = calculate_natal_chart_swisseph(birth_dt, lon, lat, timezone_offset)
    _add_display_fields(result['planets'])
    return result


def calculate_transit_chart(transit_dt, natal_chart, lon=116.4, lat=39.9, timezone_offset=8.0):
    """使用 Swiss Ephemeris 计算行运盘"""
    transit = calculate_transit_chart_swisseph(transit_dt, natal_chart, lon, lat, timezone_offset)
    _add_display_fields(transit)
    return transit


def calculate_aspects(natal, transit):
    """使用精确经度计算本命盘与行运盘的相位（避免大小写兼容问题）"""
    aspects = []
    natal_planets = natal.get('planets', {})

    # 本命行星 vs 行运行星
    for n_planet in TARGET_PLANETS:
        if n_planet not in natal_planets:
            continue
        for t_planet in TARGET_PLANETS:
            if n_planet == t_planet or t_planet not in transit:
                continue

            lon_n = natal_planets[n_planet]['longitude']
            lon_t = transit[t_planet]['longitude']
            diff = abs(lon_n - lon_t)
            diff = min(diff, 360 - diff)

            max_orb = (PLANET_ORBS.get(n_planet, 2.5) + PLANET_ORBS.get(t_planet, 2.5)) / 2.0

            for degree, (aspect_name, aspect_type) in ASPECTS.items():
                deviation = abs(diff - degree)
                if deviation <= max_orb:
                    aspects.append({
                        'natal_planet': n_planet,
                        'natal_planet_zh': PLANET_NAMES.get(n_planet, n_planet),
                        'transit_planet': t_planet,
                        'transit_planet_zh': PLANET_NAMES.get(t_planet, t_planet),
                        'aspect_degree': degree,
                        'actual_degree': round(diff, 4),
                        'aspect_name': aspect_name,
                        'aspect_type': aspect_type,
                        'deviation': round(deviation, 4),
                        'natal_sign': natal_planets[n_planet]['sign'],
                        'natal_sign_zh': natal_planets[n_planet].get('sign_zh', ''),
                        'transit_sign': transit[t_planet]['sign'],
                        'transit_sign_zh': transit[t_planet].get('sign_zh', ''),
                        'transit_house': transit[t_planet]['house']
                    })

    # 上升星座与行运行星的相位
    if 'ascendant' in natal_planets:
        asc_lon = natal_planets['ascendant']['longitude']
        for t_planet in TARGET_PLANETS:
            if t_planet not in transit:
                continue
            lon_t = transit[t_planet]['longitude']
            diff = abs(asc_lon - lon_t)
            diff = min(diff, 360 - diff)
            max_orb = PLANET_ORBS.get(t_planet, 2.5)
            for degree, (aspect_name, aspect_type) in ASPECTS.items():
                deviation = abs(diff - degree)
                if deviation <= max_orb:
                    aspects.append({
                        'natal_planet': 'ascendant',
                        'natal_planet_zh': '上升星座',
                        'transit_planet': t_planet,
                        'transit_planet_zh': PLANET_NAMES.get(t_planet, t_planet),
                        'aspect_degree': degree,
                        'actual_degree': round(diff, 4),
                        'aspect_name': aspect_name,
                        'aspect_type': aspect_type,
                        'deviation': round(deviation, 4),
                        'natal_sign': natal_planets['ascendant']['sign'],
                        'natal_sign_zh': natal_planets['ascendant'].get('sign_zh', ''),
                        'transit_sign': transit[t_planet]['sign'],
                        'transit_sign_zh': transit[t_planet].get('sign_zh', ''),
                        'transit_house': transit[t_planet]['house']
                    })

    return aspects


def calculate_transit_internal_aspects(transit_chart):
    """计算行运盘内部 10 大行星两两之间的相位（按偏差升序）"""
    internal = []
    planets = [p for p in TARGET_PLANETS if p in transit_chart]

    for p_a, p_b in itertools.combinations(planets, 2):
        lon_a = transit_chart[p_a]['longitude']
        lon_b = transit_chart[p_b]['longitude']
        diff = abs(lon_a - lon_b)
        diff = min(diff, 360 - diff)

        max_orb = (PLANET_ORBS.get(p_a, 2.5) + PLANET_ORBS.get(p_b, 2.5)) / 2.0

        for degree, (aspect_name, aspect_type) in ASPECTS.items():
            deviation = abs(diff - degree)
            if deviation <= max_orb:
                internal.append({
                    'planet_a': p_a,
                    'planet_a_zh': PLANET_NAMES.get(p_a, p_a),
                    'planet_b': p_b,
                    'planet_b_zh': PLANET_NAMES.get(p_b, p_b),
                    'aspect_name': aspect_name,
                    'aspect_type': aspect_type,
                    'aspect_degree': degree,
                    'actual_degree': round(diff, 4),
                    'deviation': round(deviation, 4),
                    'sign_a': transit_chart[p_a]['sign'],
                    'sign_a_zh': transit_chart[p_a].get('sign_zh', ''),
                    'sign_b': transit_chart[p_b]['sign'],
                    'sign_b_zh': transit_chart[p_b].get('sign_zh', ''),
                    'house_a': transit_chart[p_a]['house'],
                    'house_b': transit_chart[p_b]['house'],
                    'retro_a': transit_chart[p_a].get('is_retrograde', False),
                    'retro_b': transit_chart[p_b].get('is_retrograde', False)
                })

    # 按紧密度排序
    internal.sort(key=lambda x: x['deviation'])
    return internal


def compute_all(data, fixed_beijing=False):
    """主计算函数

    fixed_beijing=True 时忽略请求中的时区/坐标，固定北京坐标与东八区
    （腾讯云生产环境的历史行为）
    """
    # 解析输入
    birth_date = datetime.strptime(data['birthDate'], '%Y-%m-%d')
    birth_time = datetime.strptime(data['birthTime'], '%H:%M').time()
    birth_dt = datetime.combine(birth_date, birth_time)

    transit_date = datetime.strptime(data['transitDate'], '%Y-%m-%d')
    transit_time = datetime.strptime(data['transitTime'], '%H:%M').time()
    transit_dt = datetime.combine(transit_date, transit_time)

    if fixed_beijing:
        # 生产环境固定北京坐标/东八区
        timezone_offset = 8.0
        lon, lat = 116.4, 39.9
    else:
        # 解析时区（默认北京时间 +8）
        timezone_offset = float(data.get('timezone', 8.0))

        # 解析坐标（默认北京）
        lon, lat = 116.4, 39.9
        coordinates = data.get('coordinates', '')
        if coordinates:
            try:
                lon_str, lat_str = coordinates.split(',')
                lon = float(lon_str.strip())
                lat = float(lat_str.strip())
            except (ValueError, IndexError):
                pass

    # 计算星盘
    natal = calculate_natal_chart(birth_dt, lon, lat, timezone_offset)
    transit = calculate_transit_chart(transit_dt, natal, lon, lat, timezone_offset)
    aspects = calculate_aspects(natal, transit)
    transit_internal_aspects = calculate_transit_internal_aspects(transit)

    # 构建用户信息
    user_info = {}
    if 'name' in data and data['name']:
        user_info['name'] = data['name']
    user_info['birth_date'] = data['birthDate']
    user_info['birth_time'] = data['birthTime']

    # 构建地点信息
    location_parts = []
    if 'province' in data and data['province']:
        location_parts.append(data['province'])
    if 'city' in data and data['city']:
        location_parts.append(data['city'])
    if location_parts:
        user_info['birth_location'] = ''.join(location_parts)
    else:
        user_info['birth_location'] = '北京'

    # 简化的事件数据
    events = {
        'sun_sign': [f"你的太阳星座是{SIGNS_ZH[natal['planets']['sun']['sign']]}，代表你的核心人格和自我表达方式。"],
        'asc_sign': [f"你的上升星座是{SIGNS_ZH[natal['planets']['ascendant']['sign']]}，代表你给他人的第一印象和外在表现。"],
        'planet_events': [],
        'aspect_events': []
    }

    # 添加行星事件
    for planet_key, planet_data in natal['planets'].items():
        if planet_key != 'ascendant':
            events['planet_events'].append({
                'planet': planet_data['name_zh'],
                'sign': planet_data['sign_zh'],
                'house': planet_data['house'],
                'events': [f"{planet_data['name_zh']}落入{planet_data['sign_zh']}第{planet_data['house']}宫，影响你生活的相关领域。"]
            })

    # 添加上升星座相位事件
    for aspect in aspects:
        if aspect['natal_planet'] == 'ascendant':
            events['aspect_events'].append({
                'planet_a_zh': '上升星座',
                'aspect_type': aspect['aspect_name'],
                'planet_b_zh': aspect['transit_planet_zh'],
                'events': [f"上升星座与行运{aspect['transit_planet_zh']}形成{aspect['aspect_name']}，影响你的外在表现和即时反应。"]
            })

    result = {
        'success': True,
        'natal_chart': natal['planets'],
        'transit_chart': transit,
        'aspects': aspects,
        'transit_internal_aspects': transit_internal_aspects,
        'events': events,
        'user_info': user_info,
        'calculation_method': 'swisseph',
        'transit_date': data['transitDate'],
        'transit_time': data['transitTime']
    }

    # 挂载知识库解读；任何异常都降级为空解读，不影响主流程
    try:
        from astro_interpreter import interpret
        result['readings'] = interpret(result)
    except Exception as e:
        logger.warning(f"知识库解读失败，降级为空解读: {e}")
        result['readings'] = {'planet_states': [], 'internal_aspects': [], 'sun_asc_aspects': []}

    return result


def slim_for_session(result):
    """生成存入 session 的瘦身副本：去掉体积较大的 readings

    Flask 默认 session 存于客户端 cookie（浏览器上限约 4KB），
    readings 含大量知识库文案会超限导致会话丢失。
    readings 为确定性结果，可在 /result 渲染时用 attach_readings 重算。
    """
    slim = dict(result)
    slim.pop('readings', None)
    return slim


def attach_readings(result):
    """为 session 中取出的结果重新挂载知识库解读（毫秒级，确定性计算）"""
    if isinstance(result, dict) and 'readings' not in result:
        try:
            from astro_interpreter import interpret
            result['readings'] = interpret(result)
        except Exception as e:
            logger.warning(f"知识库解读重算失败，降级为空解读: {e}")
            result['readings'] = {'planet_states': [], 'internal_aspects': [], 'sun_asc_aspects': []}
    return result

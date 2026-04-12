# app.py
import os
import math
import logging
from datetime import datetime
import pytz
import pandas as pd

from flask import Flask, render_template, request, jsonify, session, url_for, redirect

# 导入 Swiss Ephemeris 计算模块
try:
    from swisseph_chart import (
        calculate_natal_chart_swisseph,
        calculate_transit_chart_swisseph,
        calculate_aspects_swisseph,
        SIGNS as SWE_SIGNS,
        SIGNS_ZH as SWE_SIGNS_ZH,
        PLANET_NAMES as SWE_PLANET_NAMES
    )
    SWISSEPH_AVAILABLE = True
    print("[INFO] Swiss Ephemeris 模块加载成功")
except ImportError as e:
    SWISSEPH_AVAILABLE = False
    print(f"[WARN] Swiss Ephemeris 模块加载失败: {e}")

# 导入增强版运势API
try:
    from enhanced_api_routes import create_enhanced_routes, EnhancedFortuneAPI
    ENHANCED_API_AVAILABLE = True
    print("[INFO] 增强版运势API加载成功")
except ImportError as e:
    ENHANCED_API_AVAILABLE = False
    print(f"[WARN] 增强版运势API加载失败: {e}")

# 导入实时逆行计算器
try:
    from retrograde_calculator import RetrogradeCalculator, get_calculator
    RETROGRADE_CALC_AVAILABLE = True
    print("[INFO] 实时逆行计算器加载成功")
except ImportError as e:
    RETROGRADE_CALC_AVAILABLE = False
    print(f"[WARN] 实时逆行计算器加载失败: {e}")

# 导入日月食和月相计算器
try:
    from eclipse_moon_calculator import EclipseMoonCalculator, get_eclipse_calculator
    ECLIPSE_CALC_AVAILABLE = True
    print("[INFO] 日月食计算器加载成功")
except ImportError as e:
    ECLIPSE_CALC_AVAILABLE = False
    print(f"[WARN] 日月食计算器加载失败: {e}")

# 导入运势优先级系统
try:
    from fortune_priority_system import FortunePrioritySystem, create_priority_routes
    PRIORITY_SYSTEM_AVAILABLE = True
    print("[INFO] 运势优先级系统加载成功")
except ImportError as e:
    PRIORITY_SYSTEM_AVAILABLE = False
    print(f"[WARN] 运势优先级系统加载失败: {e}")

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app.log'), encoding='utf-8')
    ]
)
logger = logging.getLogger(__name__)

# --- Flask app init ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, template_folder='templates', static_folder='static')
app.secret_key = os.environ.get('FLASK_SECRET', 'change_this_in_prod')

# --- Paths ---
ASTRO_XLSX = os.environ.get('ASTRO_XLSX', os.path.join(BASE_DIR, 'data', 'astrology_v2.xlsx'))

# 读取 Excel 数据（用于检索代表事件）
ASTROLOGY_DATA = {}
if os.path.exists(ASTRO_XLSX):
    try:
        # 读取多个sheet
        ASTROLOGY_DATA['sign_events'] = pd.read_excel(ASTRO_XLSX, sheet_name='星座基础事件', dtype=str).fillna('')
        ASTROLOGY_DATA['planet_events'] = pd.read_excel(ASTRO_XLSX, sheet_name='行星落入事件', dtype=str).fillna('')
        ASTROLOGY_DATA['aspect_events'] = pd.read_excel(ASTRO_XLSX, sheet_name='相位事件', dtype=str).fillna('')
        
        print(f"[INFO] Loaded astrology_v2.xlsx successfully")
        print(f"[INFO] 星座基础事件: {len(ASTROLOGY_DATA['sign_events'])} rows")
        print(f"[INFO] 行星落入事件: {len(ASTROLOGY_DATA['planet_events'])} rows")
        print(f"[INFO] 相位事件: {len(ASTROLOGY_DATA['aspect_events'])} rows")
    except Exception as e:
        print(f"[ERROR] Failed to load astrology_v2.xlsx: {e}")
        ASTROLOGY_DATA = {}
else:
    print(f"[WARN] astrology_v2.xlsx not found at {ASTRO_XLSX}. Event lookup will be disabled.")

# 初始化增强版运势API
if ENHANCED_API_AVAILABLE:
    try:
        enhanced_fortune_api = EnhancedFortuneAPI()
        create_enhanced_routes(app, enhanced_fortune_api)
        print("[INFO] 增强版运势API路由已创建")
    except Exception as e:
        print(f"[ERROR] 增强版运势API初始化失败: {e}")
        ENHANCED_API_AVAILABLE = False

# 初始化运势优先级系统
if PRIORITY_SYSTEM_AVAILABLE:
    try:
        priority_system = FortunePrioritySystem()
        create_priority_routes(app, priority_system)
        print("[INFO] 运势优先级系统路由已创建")
    except Exception as e:
        print(f"[ERROR] 运势优先级系统初始化失败: {e}")
        PRIORITY_SYSTEM_AVAILABLE = False

# 常量
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

# 行星名称映射
PLANET_NAMES = {
    'sun': '太阳', 'moon': '月亮', 'mercury': '水星', 'venus': '金星',
    'mars': '火星', 'jupiter': '木星', 'saturn': '土星',
    'uranus': '天王星', 'neptune': '海王星', 'pluto': '冥王星',
    'ascendant': '上升星座', 'midheaven': '天顶'
}

# 星座日期范围（简化计算用）
SIGN_DATES = {
    'Aries': (3, 21, 4, 19),
    'Taurus': (4, 20, 5, 20),
    'Gemini': (5, 21, 6, 21),
    'Cancer': (6, 22, 7, 22),
    'Leo': (7, 23, 8, 22),
    'Virgo': (8, 23, 9, 22),
    'Libra': (9, 23, 10, 23),
    'Scorpio': (10, 24, 11, 22),
    'Sagittarius': (11, 23, 12, 21),
    'Capricorn': (12, 22, 1, 19),
    'Aquarius': (1, 20, 2, 18),
    'Pisces': (2, 19, 3, 20)
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

# ---------- 帮助函数 ----------
def get_sign_from_date(month, day):
    """根据月日获取星座"""
    for sign, (start_m, start_d, end_m, end_d) in SIGN_DATES.items():
        if start_m <= end_m:
            if (month == start_m and day >= start_d) or (month == end_m and day <= end_d) or (start_m < month < end_m):
                return sign
        else:  # 跨年（摩羯座）
            if (month == start_m and day >= start_d) or (month == end_m and day <= end_d) or (month > start_m or month < end_m):
                return sign
    return 'Aries'

def calculate_natal_chart(birth_dt, lon, lat):
    """计算本命盘 - 简化版，基于日期计算"""
    month = birth_dt.month
    day = birth_dt.day
    hour = birth_dt.hour + birth_dt.minute / 60.0
    
    # 太阳星座（基于日期）
    sun_sign = get_sign_from_date(month, day)
    
    # 简化计算：根据日期和时间推算其他行星位置
    # 实际应用中应该使用专业的星历计算库
    
    planets = {}
    
    # 太阳
    sun_degree = (month - 1) * 30 + day + hour / 24 * 1
    planets['sun'] = {
        'sign': sun_sign,
        'degree': round(sun_degree % 30, 2),
        'longitude': (SIGNS.index(sun_sign) * 30 + sun_degree % 30) % 360,
        'house': (hour / 2) % 12 + 1
    }
    
    # 月亮（约2.5天一个星座）
    moon_offset = (day + hour / 24) / 2.5
    moon_sign_idx = int((SIGNS.index(sun_sign) + moon_offset) % 12)
    moon_sign = SIGNS[moon_sign_idx]
    planets['moon'] = {
        'sign': moon_sign,
        'degree': round((moon_offset % 1) * 30, 2),
        'longitude': (moon_sign_idx * 30 + (moon_offset % 1) * 30) % 360,
        'house': ((hour + 6) / 2) % 12 + 1
    }
    
    # 水星（约1个月一个星座）
    mercury_offset = (day + hour / 24) / 30
    mercury_sign_idx = int((SIGNS.index(sun_sign) + mercury_offset) % 12)
    mercury_sign = SIGNS[mercury_sign_idx]
    planets['mercury'] = {
        'sign': mercury_sign,
        'degree': round((mercury_offset % 1) * 30, 2),
        'longitude': (mercury_sign_idx * 30 + (mercury_offset % 1) * 30) % 360,
        'house': ((hour + 2) / 2) % 12 + 1
    }
    
    # 金星（约1个月一个星座）
    venus_offset = (day + hour / 24 + 10) / 30
    venus_sign_idx = int((SIGNS.index(sun_sign) + venus_offset) % 12)
    venus_sign = SIGNS[venus_sign_idx]
    planets['venus'] = {
        'sign': venus_sign,
        'degree': round((venus_offset % 1) * 30, 2),
        'longitude': (venus_sign_idx * 30 + (venus_offset % 1) * 30) % 360,
        'house': ((hour + 4) / 2) % 12 + 1
    }
    
    # 火星（约2个月一个星座）
    mars_offset = (day + hour / 24 + 20) / 60
    mars_sign_idx = int((SIGNS.index(sun_sign) + mars_offset) % 12)
    mars_sign = SIGNS[mars_sign_idx]
    planets['mars'] = {
        'sign': mars_sign,
        'degree': round((mars_offset % 1) * 30, 2),
        'longitude': (mars_sign_idx * 30 + (mars_offset % 1) * 30) % 360,
        'house': ((hour + 8) / 2) % 12 + 1
    }
    
    # 木星（约1年一个星座）
    jupiter_offset = (month + day / 30) / 12
    jupiter_sign_idx = int((SIGNS.index(sun_sign) + jupiter_offset * 12 + 4) % 12)
    jupiter_sign = SIGNS[jupiter_sign_idx]
    planets['jupiter'] = {
        'sign': jupiter_sign,
        'degree': round((jupiter_offset * 12 % 1) * 30, 2),
        'longitude': (jupiter_sign_idx * 30 + (jupiter_offset * 12 % 1) * 30) % 360,
        'house': ((hour + 10) / 2) % 12 + 1
    }
    
    # 土星（约2.5年一个星座）
    saturn_offset = (month + day / 30) / 30
    saturn_sign_idx = int((SIGNS.index(sun_sign) + saturn_offset * 12 + 8) % 12)
    saturn_sign = SIGNS[saturn_sign_idx]
    planets['saturn'] = {
        'sign': saturn_sign,
        'degree': round((saturn_offset * 12 % 1) * 30, 2),
        'longitude': (saturn_sign_idx * 30 + (saturn_offset * 12 % 1) * 30) % 360,
        'house': ((hour + 11) / 2) % 12 + 1
    }
    
    # 天王星、海王星、冥王星（移动缓慢，基于年份）
    year = birth_dt.year
    uranus_sign_idx = (year - 2018) % 12
    uranus_sign = SIGNS[uranus_sign_idx]
    planets['uranus'] = {
        'sign': uranus_sign,
        'degree': round((year % 7) / 7 * 30, 2),
        'longitude': (uranus_sign_idx * 30 + (year % 7) / 7 * 30) % 360,
        'house': 11
    }
    
    neptune_sign_idx = (year - 2012) % 12
    neptune_sign = SIGNS[neptune_sign_idx]
    planets['neptune'] = {
        'sign': neptune_sign,
        'degree': round((year % 14) / 14 * 30, 2),
        'longitude': (neptune_sign_idx * 30 + (year % 14) / 14 * 30) % 360,
        'house': 12
    }
    
    pluto_sign_idx = (year - 2008) % 12
    pluto_sign = SIGNS[pluto_sign_idx]
    planets['pluto'] = {
        'sign': pluto_sign,
        'degree': round((year % 20) / 20 * 30, 2),
        'longitude': (pluto_sign_idx * 30 + (year % 20) / 20 * 30) % 360,
        'house': 10
    }
    
    # 上升星座（基于出生时间）
    asc_sign_idx = int(hour / 2) % 12
    asc_sign = SIGNS[asc_sign_idx]
    planets['ascendant'] = {
        'sign': asc_sign,
        'degree': round((hour % 2) / 2 * 30, 2),
        'longitude': (asc_sign_idx * 30 + (hour % 2) / 2 * 30) % 360,
        'house': 1
    }
    
    # 天顶（MC）
    mc_sign_idx = (asc_sign_idx + 9) % 12
    mc_sign = SIGNS[mc_sign_idx]
    planets['midheaven'] = {
        'sign': mc_sign,
        'degree': round((hour % 2) / 2 * 30, 2),
        'longitude': (mc_sign_idx * 30 + (hour % 2) / 2 * 30) % 360,
        'house': 10
    }
    
    return {'planets': planets}

def calculate_transit_chart(transit_dt, natal_chart):
    """计算行运盘"""
    month = transit_dt.month
    day = transit_dt.day
    hour = transit_dt.hour + transit_dt.minute / 60.0
    year = transit_dt.year
    
    planets = {}
    
    # 太阳
    sun_sign = get_sign_from_date(month, day)
    sun_degree = (month - 1) * 30 + day + hour / 24 * 1
    sun_longitude = (SIGNS.index(sun_sign) * 30 + sun_degree % 30) % 360
    planets['sun'] = {
        'sign': sun_sign,
        'degree': round(sun_degree % 30, 2),
        'longitude': sun_longitude,
        'house': get_house_for_longitude(sun_longitude, natal_chart)
    }
    
    # 月亮
    moon_offset = (day + hour / 24) / 2.5
    moon_sign_idx = int((SIGNS.index(sun_sign) + moon_offset) % 12)
    moon_sign = SIGNS[moon_sign_idx]
    moon_longitude = (moon_sign_idx * 30 + (moon_offset % 1) * 30) % 360
    planets['moon'] = {
        'sign': moon_sign,
        'degree': round((moon_offset % 1) * 30, 2),
        'longitude': moon_longitude,
        'house': get_house_for_longitude(moon_longitude, natal_chart)
    }
    
    # 水星
    mercury_offset = (day + hour / 24) / 30
    mercury_sign_idx = int((SIGNS.index(sun_sign) + mercury_offset) % 12)
    mercury_sign = SIGNS[mercury_sign_idx]
    mercury_longitude = (mercury_sign_idx * 30 + (mercury_offset % 1) * 30) % 360
    planets['mercury'] = {
        'sign': mercury_sign,
        'degree': round((mercury_offset % 1) * 30, 2),
        'longitude': mercury_longitude,
        'house': get_house_for_longitude(mercury_longitude, natal_chart)
    }
    
    # 金星
    venus_offset = (day + hour / 24 + 10) / 30
    venus_sign_idx = int((SIGNS.index(sun_sign) + venus_offset) % 12)
    venus_sign = SIGNS[venus_sign_idx]
    venus_longitude = (venus_sign_idx * 30 + (venus_offset % 1) * 30) % 360
    planets['venus'] = {
        'sign': venus_sign,
        'degree': round((venus_offset % 1) * 30, 2),
        'longitude': venus_longitude,
        'house': get_house_for_longitude(venus_longitude, natal_chart)
    }
    
    # 火星
    mars_offset = (day + hour / 24 + 20) / 60
    mars_sign_idx = int((SIGNS.index(sun_sign) + mars_offset) % 12)
    mars_sign = SIGNS[mars_sign_idx]
    mars_longitude = (mars_sign_idx * 30 + (mars_offset % 1) * 30) % 360
    planets['mars'] = {
        'sign': mars_sign,
        'degree': round((mars_offset % 1) * 30, 2),
        'longitude': mars_longitude,
        'house': get_house_for_longitude(mars_longitude, natal_chart)
    }
    
    # 木星
    jupiter_offset = (month + day / 30) / 12
    jupiter_sign_idx = int((SIGNS.index(sun_sign) + jupiter_offset * 12 + 4) % 12)
    jupiter_sign = SIGNS[jupiter_sign_idx]
    jupiter_longitude = (jupiter_sign_idx * 30 + (jupiter_offset * 12 % 1) * 30) % 360
    planets['jupiter'] = {
        'sign': jupiter_sign,
        'degree': round((jupiter_offset * 12 % 1) * 30, 2),
        'longitude': jupiter_longitude,
        'house': get_house_for_longitude(jupiter_longitude, natal_chart)
    }
    
    # 土星
    saturn_offset = (month + day / 30) / 30
    saturn_sign_idx = int((SIGNS.index(sun_sign) + saturn_offset * 12 + 8) % 12)
    saturn_sign = SIGNS[saturn_sign_idx]
    saturn_longitude = (saturn_sign_idx * 30 + (saturn_offset * 12 % 1) * 30) % 360
    planets['saturn'] = {
        'sign': saturn_sign,
        'degree': round((saturn_offset * 12 % 1) * 30, 2),
        'longitude': saturn_longitude,
        'house': get_house_for_longitude(saturn_longitude, natal_chart)
    }
    
    # 天王星
    uranus_sign_idx = (year - 2018) % 12
    uranus_sign = SIGNS[uranus_sign_idx]
    uranus_longitude = (uranus_sign_idx * 30 + (year % 7) / 7 * 30) % 360
    planets['uranus'] = {
        'sign': uranus_sign,
        'degree': round((year % 7) / 7 * 30, 2),
        'longitude': uranus_longitude,
        'house': get_house_for_longitude(uranus_longitude, natal_chart)
    }
    
    # 海王星
    neptune_sign_idx = (year - 2012) % 12
    neptune_sign = SIGNS[neptune_sign_idx]
    neptune_longitude = (neptune_sign_idx * 30 + (year % 14) / 14 * 30) % 360
    planets['neptune'] = {
        'sign': neptune_sign,
        'degree': round((year % 14) / 14 * 30, 2),
        'longitude': neptune_longitude,
        'house': get_house_for_longitude(neptune_longitude, natal_chart)
    }
    
    # 冥王星
    pluto_sign_idx = (year - 2008) % 12
    pluto_sign = SIGNS[pluto_sign_idx]
    pluto_longitude = (pluto_sign_idx * 30 + (year % 20) / 20 * 30) % 360
    planets['pluto'] = {
        'sign': pluto_sign,
        'degree': round((year % 20) / 20 * 30, 2),
        'longitude': pluto_longitude,
        'house': get_house_for_longitude(pluto_longitude, natal_chart)
    }
    
    return planets

def get_house_for_longitude(longitude, natal_chart):
    """根据经度确定宫位（简化版）"""
    # 根据上升星座计算宫位
    asc_longitude = natal_chart['planets']['ascendant']['longitude']
    house_cusps = [(asc_longitude + i * 30) % 360 for i in range(12)]
    
    for i in range(12):
        start = house_cusps[i]
        end = house_cusps[(i + 1) % 12]
        if start <= end:
            if start <= longitude < end:
                return i + 1
        else:
            if longitude >= start or longitude < end:
                return i + 1
    return 1

def calculate_aspects(natal_result, transit_result):
    """计算本命盘与行运盘的相位"""
    aspects = []
    target_planets = ['sun', 'moon', 'mercury', 'venus', 'mars', 
                      'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']
    
    for n_planet in target_planets:
        for t_planet in target_planets:
            if n_planet == t_planet:
                continue
                
            lon_n = natal_result['planets'][n_planet]['longitude']
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
                        'natal_sign': natal_result['planets'][n_planet]['sign'],
                        'natal_sign_zh': SIGNS_ZH[natal_result['planets'][n_planet]['sign']],
                        'transit_sign': transit_result[t_planet]['sign'],
                        'transit_sign_zh': SIGNS_ZH[transit_result[t_planet]['sign']],
                        'transit_house': transit_result[t_planet]['house']
                    })
    
    # 按紧密度排序
    aspects.sort(key=lambda x: x['deviation'])
    return aspects

def search_sign_events(sign_zh, category=None):
    """
    查询星座基础事件
    """
    if not ASTROLOGY_DATA or 'sign_events' not in ASTROLOGY_DATA:
        return []
    
    df = ASTROLOGY_DATA['sign_events']
    matches = df[df['sign_zh'] == sign_zh]
    
    if category:
        matches = matches[matches['event_category'] == category]
    
    return matches['event_description'].tolist()


def search_planet_events(planet_zh, sign_zh, house):
    """
    查询行星落入事件
    """
    if not ASTROLOGY_DATA or 'planet_events' not in ASTROLOGY_DATA:
        return []
    
    df = ASTROLOGY_DATA['planet_events']
    
    # 确保house是整数
    try:
        house = int(house)
    except (ValueError, TypeError):
        house = 1
    
    # 将DataFrame的house列转换为整数进行比较
    df_house_int = pd.to_numeric(df['house'], errors='coerce').fillna(1).astype(int)
    
    matches = df[(df['planet_zh'] == planet_zh) & 
                 (df['sign_zh'] == sign_zh) & 
                 (df_house_int == house)]
    
    return matches['event_description'].tolist()


def search_aspect_events(planet_a_zh, aspect_type, planet_b_zh):
    """
    查询相位事件
    """
    if not ASTROLOGY_DATA or 'aspect_events' not in ASTROLOGY_DATA:
        return []
    
    df = ASTROLOGY_DATA['aspect_events']
    matches = df[(df['planet_a_zh'] == planet_a_zh) & 
                 (df['aspect_type'] == aspect_type) & 
                 (df['planet_b_zh'] == planet_b_zh)]
    
    # 如果没找到，尝试反向查询（A和B互换）
    if len(matches) == 0:
        matches = df[(df['planet_a_zh'] == planet_b_zh) & 
                     (df['aspect_type'] == aspect_type) & 
                     (df['planet_b_zh'] == planet_a_zh)]
    
    return matches['event_description'].tolist()


def search_astrology_events(natal_sun_sign, natal_asc_sign, aspects, transit_planets=None):
    """
    基于 astrology_v2.xlsx 检索匹配事件
    """
    if not ASTROLOGY_DATA:
        print("[WARN] ASTROLOGY_DATA is not loaded")
        return {'sun_sign': [], 'asc_sign': [], 'planet_events': [], 'aspect_events': []}
    
    # 获取中文星座名
    natal_sun_zh = SIGNS_ZH.get(natal_sun_sign, '')
    natal_asc_zh = SIGNS_ZH.get(natal_asc_sign, '')
    
    print(f"[DEBUG] Searching for sun: {natal_sun_sign} ({natal_sun_zh}), asc: {natal_asc_sign} ({natal_asc_zh})")
    
    results = {
        'sun_sign': [],
        'asc_sign': [],
        'planet_events': [],
        'aspect_events': []
    }
    
    # 1. 查询太阳星座事件（性格特征）
    if natal_sun_zh:
        sun_events = search_sign_events(natal_sun_zh, '性格特征')
        results['sun_sign'] = sun_events[:3]  # 最多取3条
        print(f"[DEBUG] Sun sign events: {len(sun_events)}")
    
    # 2. 查询上升星座事件（性格特征）
    if natal_asc_zh:
        asc_events = search_sign_events(natal_asc_zh, '性格特征')
        results['asc_sign'] = asc_events[:3]  # 最多取3条
        print(f"[DEBUG] Asc sign events: {len(asc_events)}")
    
    # 3. 查询行星落入事件
    if transit_planets:
        for planet_key, planet_data in transit_planets.items():
            if planet_key in ['ascendant', 'midheaven']:
                continue
            
            planet_zh = PLANET_NAMES.get(planet_key, '')
            sign = planet_data.get('sign', '')
            sign_zh = SIGNS_ZH.get(sign, '')
            house = planet_data.get('house', 1)
            
            if planet_zh and sign_zh:
                events = search_planet_events(planet_zh, sign_zh, house)
                if events:
                    results['planet_events'].append({
                        'planet': planet_zh,
                        'sign': sign_zh,
                        'house': house,
                        'events': events[:1]  # 取第一条
                    })
    
    # 4. 查询相位事件
    if aspects:
        for aspect in aspects[:10]:  # 最多处理前10个相位
            natal_pl_zh = aspect['natal_planet_zh']
            transit_pl_zh = aspect['transit_planet_zh']
            aspect_name = aspect['aspect_name']
            
            events = search_aspect_events(natal_pl_zh, aspect_name, transit_pl_zh)
            if events:
                results['aspect_events'].append({
                    'query': f"{natal_pl_zh} {aspect_name} {transit_pl_zh}",
                    'events': events[:1]  # 取第一条
                })
    
    print(f"[DEBUG] Final results: sun={len(results['sun_sign'])}, asc={len(results['asc_sign'])}, planets={len(results['planet_events'])}, aspects={len(results['aspect_events'])}")
    return results

# ---------- 计算主流程 ----------
def compute_all(data):
    """
    data (dict) expects keys:
    birthDate (YYYY-MM-DD), birthTime (HH:MM),
    transitDate, transitTime,
    coordinates (e.g. '116.4,39.9'),
    timezone (e.g. '+8' for Beijing, '-5' for New York)
    """
    # 解析输入
    birth_date = datetime.strptime(data['birthDate'], '%Y-%m-%d')
    birth_time = datetime.strptime(data['birthTime'], '%H:%M').time()
    birth_dt_local = datetime.combine(birth_date, birth_time)

    transit_date = datetime.strptime(data['transitDate'], '%Y-%m-%d')
    transit_time = datetime.strptime(data['transitTime'], '%H:%M').time()
    transit_dt_local = datetime.combine(transit_date, transit_time)
    
    # 解析经纬度（如果有）
    lon, lat = 116.4, 39.9  # 默认北京
    if 'coordinates' in data and data['coordinates']:
        try:
            coords = data['coordinates'].split(',')
            lon = float(coords[0])
            lat = float(coords[1])
        except:
            pass
    
    # 解析时区（默认+8北京时间）
    timezone_offset = 8.0  # 默认北京时间 UTC+8
    if 'timezone' in data and data['timezone']:
        try:
            timezone_offset = float(data['timezone'])
        except:
            pass
    
    # 转换为 UTC 时间（Swiss Ephemeris 需要 UTC）
    from datetime import timedelta
    birth_dt_utc = birth_dt_local - timedelta(hours=timezone_offset)
    transit_dt_utc = transit_dt_local - timedelta(hours=timezone_offset)
    
    logger.info(f"本地时间: {birth_dt_local}, UTC: {birth_dt_utc}, 时区: UTC{timezone_offset:+.1f}")

    # 使用 Swiss Ephemeris 计算（如果可用）
    if SWISSEPH_AVAILABLE:
        logger.info("使用 Swiss Ephemeris 计算星盘")
        natal = calculate_natal_chart_swisseph(birth_dt_utc, lon, lat)
        transit = calculate_transit_chart_swisseph(transit_dt_utc, natal, lon, lat)
        aspects = calculate_aspects_swisseph(natal, transit)
        
        # 使用 Swiss Ephemeris 的常量
        signs_zh = SWE_SIGNS_ZH
        planet_names = SWE_PLANET_NAMES
    else:
        logger.info("使用简化算法计算星盘")
        natal = calculate_natal_chart(birth_dt_local, lon, lat)
        transit = calculate_transit_chart(transit_dt_local, natal)
        aspects = calculate_aspects(natal, transit)
        signs_zh = SIGNS_ZH
        planet_names = PLANET_NAMES

    # 抽取重要行星
    important_planets = ['sun', 'moon', 'mercury', 'venus', 'mars', 
                         'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'ascendant']
    natal_brief = {p: natal['planets'][p] for p in important_planets if p in natal['planets']}
    transit_brief = {p: transit[p] for p in important_planets if p in transit}

    # 添加中文名称
    for p in natal_brief:
        natal_brief[p]['name_zh'] = planet_names.get(p, p)
        natal_brief[p]['sign_zh'] = signs_zh.get(natal_brief[p]['sign'], natal_brief[p]['sign'])
    
    for p in transit_brief:
        transit_brief[p]['name_zh'] = planet_names.get(p, p)
        transit_brief[p]['sign_zh'] = signs_zh.get(transit_brief[p]['sign'], transit_brief[p]['sign'])

    # 检索事件
    natal_sun = natal_brief.get('sun', {}).get('sign')
    natal_asc = natal_brief.get('ascendant', {}).get('sign')
    events = search_astrology_events(natal_sun, natal_asc, aspects, transit_brief)

    return {
        'success': True,
        'natal_chart': natal_brief,
        'transit_chart': transit_brief,
        'transit_date': data['transitDate'],
        'transit_time': data['transitTime'],
        'aspects': aspects,
        'events': events,
        'calculation_method': 'swisseph' if SWISSEPH_AVAILABLE else 'simplified',
        # 用户输入的原始信息
        'user_info': {
            'name': data.get('name', ''),
            'birth_date': data['birthDate'],
            'birth_time': data['birthTime'],
            'birth_location': data.get('location', ''),
            'coordinates': data.get('coordinates', ''),
            'longitude': lon,
            'latitude': lat,
            'timezone': timezone_offset
        }
    }

# ---------- Flask 路由 ----------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate_route():
    try:
        data = request.get_json(force=True)
        logger.info(f"Received calculation request: {data}")
        
        # 输入验证
        required_fields = ['birthDate', 'birthTime', 'transitDate', 'transitTime']
        for field in required_fields:
            if field not in data or not data[field]:
                logger.warning(f"Missing required field: {field}")
                return jsonify({'success': False, 'error': f'缺少必填字段: {field}'}), 400
        
        result = compute_all(data)
        session['result'] = result
        logger.info("Calculation completed successfully")
        return jsonify({'success': True, 'redirect_url': url_for('result_page')})
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({'success': False, 'error': f'输入数据格式错误: {str(e)}'}), 400
    except Exception as e:
        logger.exception("Unexpected error during calculation")
        return jsonify({'success': False, 'error': '服务器内部错误，请稍后重试'}), 500

@app.route('/result')
def result_page():
    try:
        result = session.get('result')
        if not result:
            logger.warning("No result found in session, redirecting to index")
            return redirect(url_for('index'))
        
        # 确保数据格式正确
        if not isinstance(result, dict):
            logger.error(f"Invalid result format: {type(result)}")
            return redirect(url_for('index'))
        
        logger.info("Rendering result page")
        return render_template('result.html', data=result)
    except Exception as e:
        logger.exception("Error rendering result page")
        return render_template('error.html', error_message='显示结果时出错，请重试'), 500


# ---------- 实时行星逆行 API ----------
@app.route('/api/retrograde', methods=['GET'])
def get_retrograde_api():
    """
    实时计算行星逆行
    
    Query Parameters:
        year: 年份 (默认: 今年)
        planet: 行星名称 (例如: saturn, mercury, 默认: saturn)
        month: 月份 (可选，如果提供则只返回该月的逆行)
        sun_sign: 太阳星座 (可选，用于计算宫位)
    
    Returns:
        {
            "success": true,
            "data": [
                {
                    "start": "2026-07-28",
                    "end": "2026-12-11",
                    "start_sign": "白羊座",
                    "end_sign": "白羊座",
                    "duration_days": 136,
                    "planet": "土星",
                    "affected_areas": "责任、结构、限制、长期规划"
                }
            ]
        }
    """
    try:
        if not RETROGRADE_CALC_AVAILABLE:
            return jsonify({
                'success': False,
                'error': '实时逆行计算器不可用'
            }), 503
        
        # 获取参数
        year = request.args.get('year', type=int) or datetime.now().year
        planet = request.args.get('planet', 'saturn')
        month = request.args.get('month', type=int)
        sun_sign = request.args.get('sun_sign')
        
        # 获取计算器实例
        calc = get_calculator()
        
        # 计算逆行
        if month:
            # 如果指定了月份，获取该月的逆行
            periods = calc.get_monthly_retrograde(year, month, sun_sign)
        else:
            # 否则获取全年
            periods = calc.calculate_retrograde(year, planet)
        
        # 格式化日期为字符串
        formatted_periods = []
        for period in periods:
            formatted_periods.append({
                'start': period['start'].strftime('%Y-%m-%d'),
                'end': period['end'].strftime('%Y-%m-%d'),
                'start_sign': period['start_sign'],
                'end_sign': period['end_sign'],
                'duration_days': period['duration_days'],
                'planet': period['planet'],
                'planet_en': period['planet_en'],
                'affected_areas': period['affected_areas'],
                'house': period.get('house'),
                'house_name': period.get('house_name'),
                'note': period.get('note', '')
            })
        
        return jsonify({
            'success': True,
            'year': year,
            'month': month,
            'planet': planet if not month else 'all',
            'count': len(formatted_periods),
            'data': formatted_periods
        })
        
    except Exception as e:
        logger.exception("计算逆行时出错")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/retrograde/all', methods=['GET'])
def get_all_retrograde_api():
    """
    实时计算所有行星的逆行
    
    Query Parameters:
        year: 年份 (默认: 今年)
    
    Returns:
        {
            "success": true,
            "data": {
                "mercury": [...],
                "venus": [...],
                "saturn": [...]
            }
        }
    """
    try:
        if not RETROGRADE_CALC_AVAILABLE:
            return jsonify({
                'success': False,
                'error': '实时逆行计算器不可用'
            }), 503
        
        year = request.args.get('year', type=int) or datetime.now().year
        
        calc = get_calculator()
        results = calc.calculate_all_planets(year)
        
        # 格式化结果
        formatted_results = {}
        for planet, periods in results.items():
            formatted_results[planet] = [
                {
                    'start': p['start'].strftime('%Y-%m-%d'),
                    'end': p['end'].strftime('%Y-%m-%d'),
                    'start_sign': p['start_sign'],
                    'end_sign': p['end_sign'],
                    'duration_days': p['duration_days']
                }
                for p in periods
            ]
        
        return jsonify({
            'success': True,
            'year': year,
            'data': formatted_results
        })
        
    except Exception as e:
        logger.exception("计算所有行星逆行时出错")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ---------- 实时日月食和月相 API ----------
@app.route('/api/eclipses', methods=['GET'])
def get_eclipses_api():
    """
    实时计算日月食
    
    Query Parameters:
        year: 年份 (默认: 今年)
        month: 月份 (可选，只返回该月的日月食)
        sun_sign: 太阳星座 (可选，用于计算宫位)
    
    Returns:
        {
            "success": true,
            "data": [
                {
                    "date": "2026-03-03",
                    "time": "11:37",
                    "type": "月全食",
                    "category": "月食",
                    "sign": "处女座",
                    "degree": 12.53,
                    "house": 1,
                    "house_name": "命宫"
                }
            ]
        }
    """
    try:
        if not ECLIPSE_CALC_AVAILABLE:
            return jsonify({
                'success': False,
                'error': '日月食计算器不可用'
            }), 503
        
        year = request.args.get('year', type=int) or datetime.now().year
        month = request.args.get('month', type=int)
        sun_sign = request.args.get('sun_sign')
        
        calc = get_eclipse_calculator()
        
        # 计算日月食
        eclipses = calc.calculate_eclipses(year)
        
        # 如果指定了月份，过滤
        if month:
            eclipses = [e for e in eclipses if e['date'].month == month]
        
        # 格式化并计算宫位
        formatted_eclipses = []
        for e in eclipses:
            formatted_e = {
                'date': e['date'].strftime('%Y-%m-%d'),
                'time': e['date'].strftime('%H:%M'),
                'type': e['type'],
                'category': e['category'],
                'sign': e['sign'],
                'degree': e['degree']
            }
            
            if sun_sign and 'house' in e:
                formatted_e['house'] = e['house']
                formatted_e['house_name'] = e['house_name']
            
            formatted_eclipses.append(formatted_e)
        
        return jsonify({
            'success': True,
            'year': year,
            'month': month,
            'count': len(formatted_eclipses),
            'data': formatted_eclipses
        })
        
    except Exception as e:
        logger.exception("计算日月食时出错")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/moon-phases', methods=['GET'])
def get_moon_phases_api():
    """
    实时计算新月满月
    
    Query Parameters:
        year: 年份 (默认: 今年)
        month: 月份 (可选，默认计算全年)
        sun_sign: 太阳星座 (可选，用于计算宫位)
    
    Returns:
        {
            "success": true,
            "data": [
                {
                    "date": "2026-03-03",
                    "time": "11:37",
                    "type": "满月",
                    "sign": "处女座",
                    "degree": 12.53,
                    "house": 1,
                    "house_name": "命宫"
                }
            ]
        }
    """
    try:
        if not ECLIPSE_CALC_AVAILABLE:
            return jsonify({
                'success': False,
                'error': '月相计算器不可用'
            }), 503
        
        year = request.args.get('year', type=int) or datetime.now().year
        month = request.args.get('month', type=int)
        sun_sign = request.args.get('sun_sign')
        
        calc = get_eclipse_calculator()
        
        # 计算月相
        moon_phases = calc.calculate_moon_phases(year, month)
        
        # 格式化并计算宫位
        formatted_phases = []
        for mp in moon_phases:
            formatted_mp = {
                'date': mp['date'].strftime('%Y-%m-%d'),
                'time': mp['date'].strftime('%H:%M'),
                'type': mp['type'],
                'sign': mp['sign'],
                'degree': mp['degree']
            }
            
            if sun_sign and 'house' in mp:
                formatted_mp['house'] = mp['house']
                formatted_mp['house_name'] = mp['house_name']
            
            formatted_phases.append(formatted_mp)
        
        return jsonify({
            'success': True,
            'year': year,
            'month': month,
            'count': len(formatted_phases),
            'data': formatted_phases
        })
        
    except Exception as e:
        logger.exception("计算月相时出错")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/astro-events', methods=['GET'])
def get_astro_events_api():
    """
    获取指定月份的所有天文事件（日月食 + 新月满月 + 逆行）
    
    Query Parameters:
        year: 年份 (默认: 今年)
        month: 月份 (必需)
        sun_sign: 太阳星座 (可选，用于计算宫位)
    
    Returns:
        {
            "success": true,
            "data": {
                "eclipses": [...],
                "moon_phases": [...],
                "retrogrades": [...]
            }
        }
    """
    try:
        year = request.args.get('year', type=int) or datetime.now().year
        month = request.args.get('month', type=int)
        sun_sign = request.args.get('sun_sign')
        
        if not month:
            return jsonify({
                'success': False,
                'error': '缺少必要参数: month'
            }), 400
        
        result = {
            'eclipses': [],
            'moon_phases': [],
            'retrogrades': []
        }
        
        # 获取日月食和月相
        if ECLIPSE_CALC_AVAILABLE:
            calc = get_eclipse_calculator()
            events = calc.get_monthly_events(year, month, sun_sign)
            
            # 格式化日月食
            for e in events['eclipses']:
                result['eclipses'].append({
                    'date': e['date'].strftime('%Y-%m-%d'),
                    'time': e['date'].strftime('%H:%M'),
                    'type': e['type'],
                    'category': e['category'],
                    'sign': e['sign'],
                    'degree': e['degree'],
                    'house': e.get('house'),
                    'house_name': e.get('house_name')
                })
            
            # 格式化月相
            for mp in events['moon_phases']:
                result['moon_phases'].append({
                    'date': mp['date'].strftime('%Y-%m-%d'),
                    'time': mp['date'].strftime('%H:%M'),
                    'type': mp['type'],
                    'sign': mp['sign'],
                    'degree': mp['degree'],
                    'house': mp.get('house'),
                    'house_name': mp.get('house_name')
                })
        
        # 获取逆行
        if RETROGRADE_CALC_AVAILABLE:
            calc = get_calculator()
            retrogrades = calc.get_monthly_retrograde(year, month, sun_sign)
            
            for r in retrogrades:
                result['retrogrades'].append({
                    'planet': r['planet'],
                    'start': r['start'].strftime('%Y-%m-%d'),
                    'end': r['end'].strftime('%Y-%m-%d'),
                    'sign': r['start_sign'],
                    'house': r.get('house'),
                    'house_name': r.get('house_name'),
                    'affected_areas': r['affected_areas']
                })
        
        return jsonify({
            'success': True,
            'year': year,
            'month': month,
            'data': result
        })
        
    except Exception as e:
        logger.exception("获取天文事件时出错")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# Vercel 需要这个
app = app

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)

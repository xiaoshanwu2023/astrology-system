# app.py
import os
import math
from datetime import datetime
import pytz
import pandas as pd
import swisseph as swe

from flask import Flask, render_template, request, jsonify, session, url_for, redirect

# --- Flask app init ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, template_folder='templates', static_folder='static')
app.secret_key = os.environ.get('FLASK_SECRET', 'change_this_in_prod')

# --- Paths (可通过环境变量覆盖) ---
EPHE_PATH = os.environ.get('EPHE_PATH', os.path.join(BASE_DIR, 'astro'))  # 你的 swisseph 星历目录
ASTRO_XLSX = os.environ.get('ASTRO_XLSX', os.path.join(BASE_DIR, 'data', 'astrology.xlsx'))

# 尝试设置星历路径（如果没有，会打印警告）
if not os.path.isdir(EPHE_PATH):
    print(f"[WARN] EPHE_PATH not found: {EPHE_PATH}. Swiss ephemeris files required for accurate positions.")
else:
    swe.set_ephe_path(EPHE_PATH)

# 读取 Excel 数据（用于检索代表事件）
if os.path.exists(ASTRO_XLSX):
    ASTROLOGY_DATA = pd.read_excel(ASTRO_XLSX, dtype=str).fillna('')
else:
    ASTROLOGY_DATA = None
    print(f"[WARN] astrology.xlsx not found at {ASTRO_XLSX}. Event lookup will be disabled.")

# 常量
SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]
SIGNS_ZH = {
    'Aries':'白羊座','Taurus':'金牛座','Gemini':'双子座','Cancer':'巨蟹座','Leo':'狮子座',
    'Virgo':'处女座','Libra':'天秤座','Scorpio':'天蝎座','Sagittarius':'射手座',
    'Capricorn':'摩羯座','Aquarius':'水瓶座','Pisces':'双鱼座'
}

planet_id_to_name = {
    swe.SUN: 'sun', swe.MOON: 'moon', swe.MERCURY: 'mercury', swe.VENUS: 'venus',
    swe.MARS: 'mars', swe.JUPITER: 'jupiter', swe.SATURN: 'saturn',
    swe.URANUS: 'uranus', swe.NEPTUNE: 'neptune', swe.PLUTO: 'pluto'
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
def normalize_angle(a):
    a = float(a) % 360.0
    if a < 0:
        a += 360.0
    return a

def get_sign(longitude):
    idx = int(normalize_angle(longitude) // 30) % 12
    return SIGNS[idx]

def degree_in_sign(longitude):
    return normalize_angle(longitude) % 30.0

def parse_coordinate_part(s):
    s = s.strip()
    # 允许 "116:28E" 或 "116.466" 或 "116:28" 等
    direction = None
    if s[-1] in 'NSEW':
        direction = s[-1]
        s = s[:-1]
    if ':' in s:
        deg, minute = s.split(':')
        val = float(deg) + float(minute) / 60.0
    else:
        val = float(s)
    if direction in ('W', 'S'):
        val = -val
    return val

def parse_coordinates(coord_str):
    """支持 '116:28E,39:54N' 或 '116.466,39.9' 两种格式"""
    if not coord_str or ',' not in coord_str:
        raise ValueError("coordinates 格式应为 'lon,lat'，例如 '116:28E,39:54N' 或 '116.466,39.9'")
    lon_raw, lat_raw = coord_str.split(',', 1)
    lon = parse_coordinate_part(lon_raw)
    lat = parse_coordinate_part(lat_raw)
    return lon, lat

def dt_to_jd(dt_naive, tz_name='Asia/Shanghai'):
    """将本地时（无 tzinfo）或带 tz 的 datetime 转为儒略日（UTC）"""
    if dt_naive.tzinfo is None:
        tz = pytz.timezone(tz_name)
        local = tz.localize(dt_naive)
    else:
        local = dt_naive
    utc = local.astimezone(pytz.utc)
    year, month, day = utc.year, utc.month, utc.day
    hour = utc.hour + utc.minute/60.0 + utc.second/3600.0
    jd = swe.julday(year, month, day, hour)
    return jd

def normalize_cusps(cusps_raw):
    """swe.houses 返回的 cusps 可能包含 index 0 空位或直接 12 个值，标准化为 12 元素 list"""
    try:
        # 尝试 1..12 索引
        cusps = [float(cusps_raw[i]) for i in range(1,13)]
    except Exception:
        cusps = [float(cusps_raw[i]) for i in range(0,12)]
    return [normalize_angle(x) for x in cusps]

def get_house(longitude, cusps):
    """返回该 longitude 落入的宫位编号 1..12（cusps 为长度 12 的宫位起始点列表）"""
    lon = normalize_angle(longitude)
    for i in range(12):
        start = cusps[i]
        end = cusps[(i + 1) % 12]
        if start < end:
            if start <= lon < end:
                return i + 1
        else:
            # 跨 360 的区间
            if lon >= start or lon < end:
                return i + 1
    return None

# ---------- 计算函数 ----------
def calculate_natal_chart(birth_dt, lon, lat):
    """返回 {'planets': {...}, 'cusps': [...], 'asc': ...}"""
    jd = dt_to_jd(birth_dt)
    cusps_raw, ascmc = swe.houses(jd, lat, lon)  # cusps_raw 可能是长度13的数组
    cusps = normalize_cusps(cusps_raw)
    planets = {}
    for pid in planet_id_to_name.keys():
        pos = swe.calc_ut(jd, pid, 0)[0][0]  # longitude
        name = planet_id_to_name[pid]
        lon_norm = normalize_angle(pos)
        planets[name] = {
            'longitude': float(lon_norm),
            'sign': get_sign(lon_norm),
            'degree': float(round(degree_in_sign(lon_norm), 4)),
            'house': int(get_house(lon_norm, cusps))
        }
    # 上升和中天
    asc = float(normalize_angle(ascmc[0]))
    mc = float(normalize_angle(ascmc[1]))
    planets['ascendant'] = {'longitude': asc, 'sign': get_sign(asc), 'degree': float(degree_in_sign(asc)), 'house': 1}
    planets['midheaven'] = {'longitude': mc, 'sign': get_sign(mc), 'degree': float(degree_in_sign(mc)), 'house': 10}
    return {'planets': planets, 'cusps': cusps}

def calculate_transit_chart(transit_dt, lon, lat, natal_cusps):
    """计算行运行星位置，但 house 采用 natal_cusps（即把行运行星 mapping 到本命宫位）"""
    jd = dt_to_jd(transit_dt)
    planets = {}
    for pid in planet_id_to_name.keys():
        pos = swe.calc_ut(jd, pid, 0)[0][0]
        name = planet_id_to_name[pid]
        lon_norm = normalize_angle(pos)
        planets[name] = {
            'longitude': float(lon_norm),
            'sign': get_sign(lon_norm),
            'degree': float(round(degree_in_sign(lon_norm), 4)),
            'house': int(get_house(lon_norm, natal_cusps))  # map to natal cusps
        }
    return planets

def calculate_aspects(natal_result, transit_result):
    aspects = []
    target_planets = ['sun','moon','mercury','venus','mars','jupiter','saturn','uranus','neptune','pluto']
    for n in target_planets:
        for t in target_planets:
            lon_n = natal_result['planets'][n]['longitude']
            lon_t = transit_result[t]['longitude']
            diff = abs(lon_n - lon_t)
            diff = min(diff, 360 - diff)
            for degree in MAJOR_ASPECTS.keys():
                orb_n = PLANET_ORBS.get(n, 2.5)
                orb_t = PLANET_ORBS.get(t, 2.5)
                max_orb = (orb_n + orb_t) / 2.0
                deviation = abs(diff - degree)
                if deviation <= max_orb:
                    aspects.append({
                        'natal_planet': n,
                        'transit_planet': t,
                        'aspect_degree': degree,
                        'actual_degree': float(round(diff, 4)),
                        'aspect_name': MAJOR_ASPECTS[degree][0],
                        'aspect_type': MAJOR_ASPECTS[degree][1],
                        'deviation': float(round(deviation, 4)),
                        'natal_sign': natal_result['planets'][n]['sign'],
                        'transit_sign': transit_result[t]['sign']
                    })
    # 按紧密度排序
    aspects.sort(key=lambda x: x['deviation'])
    return aspects

def search_astrology_events(natal_sun_sign, natal_asc_sign, aspects):
    """基于 astrology.xlsx 做简单检索，返回匹配的代表事件列表"""
    if ASTROLOGY_DATA is None:
        return {'sun_sign': [], 'asc_sign': [], 'aspect_events': []}
    results = []
    # 按列名尝试匹配（容错：多种列名格式）
    df = ASTROLOGY_DATA.copy()
    # 精确匹配 '星座' 列
    sun_matches = []
    asc_matches = []
    if '星座' in df.columns:
        sun_matches = df[df['星座'].str.contains(natal_sun_sign, na=False)]['代表事件'].tolist()
        asc_matches = df[df['星座'].str.contains(natal_asc_sign, na=False)]['代表事件'].tolist()
    # 相位匹配（尝试构造 "sun 合相 moon" 类似的查询）
    aspect_hits = []
    for a in aspects:
        q = f"{a['natal_planet']} {a['aspect_name']} {a['transit_planet']}"
        if '行星间相位' in df.columns:
            matched = df[df['行星间相位'].str.contains(q, na=False)]
            if not matched.empty:
                aspect_hits.append({'query': q, 'events': matched['代表事件'].tolist()})
        # 同时尝试按 transit planet 落入星座/宫位检索
        tr_query = f"{a['transit_planet']}在{a['transit_sign']}({a.get('transit_house','')})"
        if '行星落入星座（宫位）' in df.columns:
            matched2 = df[df['行星落入星座（宫位）'].str.contains(tr_query, na=False)]
            if not matched2.empty:
                aspect_hits.append({'query': tr_query, 'events': matched2['代表事件'].tolist()})
    return {
        'sun_sign': sun_matches,
        'asc_sign': asc_matches,
        'aspect_events': aspect_hits
    }

# ---------- 计算主流程（封装成函数避免与路由冲突） ----------
def compute_all(data):
    """
    data (dict) expects keys:
    birthDate (YYYY-MM-DD), birthTime (HH:MM),
    transitDate, transitTime,
    coordinates (e.g. '116.4,39.9' or '116:28E,39:54N')
    """
    # 解析输入
    birth_date = datetime.strptime(data['birthDate'], '%Y-%m-%d')
    birth_time = datetime.strptime(data['birthTime'], '%H:%M').time()
    birth_dt = datetime.combine(birth_date, birth_time)

    transit_date = datetime.strptime(data['transitDate'], '%Y-%m-%d')
    transit_time = datetime.strptime(data['transitTime'], '%H:%M').time()
    transit_dt = datetime.combine(transit_date, transit_time)

    lon, lat = parse_coordinates(data['coordinates'])

    natal = calculate_natal_chart(birth_dt, lon, lat)
    transit = calculate_transit_chart(transit_dt, lon, lat, natal['cusps'])
    aspects = calculate_aspects(natal, transit)

    # 抽取用户指定的若干行星（sun moon asc 等）
    important_planets = ['sun','moon','mercury','venus','mars','jupiter','saturn','uranus','neptune','pluto','ascendant']
    natal_brief = {p: natal['planets'].get(p) for p in important_planets if p in natal['planets']}
    transit_brief = {p: transit.get(p) for p in important_planets if p in transit}

    # 检索事件
    natal_sun = natal_brief.get('sun', {}).get('sign')
    natal_asc = natal_brief.get('ascendant', {}).get('sign')
    events = search_astrology_events(natal_sun, natal_asc, aspects)

    return {
        'success': True,
        'natal_chart': natal_brief,
        'natal_cusps': natal['cusps'],
        'transit_chart': transit_brief,
        'aspects': aspects,
        'events': events
    }

# ---------- Flask 路由 ----------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate_route():
    try:
        data = request.get_json(force=True)
        print("[INFO] Received data:", data)
        result = compute_all(data)
        # 将结果存入 session（简单方案；注意 session 大小与安全）
        session['result'] = result
        return jsonify({'success': True, 'redirect_url': url_for('result_page')})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/result')
def result_page():
    result = session.get('result')
    if not result:
        return redirect(url_for('index'))
    # 可选：session.pop('result')  # 取一次后清除
    return render_template('result.html', data=result)

if __name__ == '__main__':
    # 注意：在 macOS/Windows 下可直接运行
    app.run(host='127.0.0.1', port=5001, debug=True)

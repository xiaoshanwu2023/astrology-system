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

# 宫位主题词（用于模态框兜底解读文案）
HOUSE_THEMES = {
    1: '自我、形象与新开端', 2: '财务、收入与价值观', 3: '沟通、学习与短途出行',
    4: '家庭、居所与根基', 5: '恋爱、创作与子女', 6: '工作、健康与日常事务',
    7: '伴侣、合作与重要关系', 8: '共同财务、亲密关系与转化', 9: '远行、进修与信念',
    10: '事业、名声与人生方向', 11: '朋友、社群与愿景', 12: '休息、潜意识与疗愈'
}

# 事件黄经与本命太阳/上升的相位判定容许度（沿用太阳 orb）
EVENT_ASPECT_ORB = 7.5


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

    # 构建地点信息（province + cityName 为新版字段；兼容旧字段 city 与 location）
    province = (data.get('province') or '').strip()
    city_name = (data.get('cityName') or data.get('city') or '').strip()
    if province:
        user_info['birth_location'] = province + city_name
    elif data.get('location'):
        user_info['birth_location'] = data['location']
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

    # 行运日期所在月的月度天文事件（逆行/新月满月/日月食，北京时间）
    try:
        result['month_events'] = _compute_month_events(result)
    except Exception as e:
        logger.warning(f"月度天文事件计算失败，降级为空事件: {e}")
        result['month_events'] = _empty_month_events()

    # 珊姐运势解读模态框数据（服务端渲染，本地知识库驱动）
    try:
        result['fortune_detail'] = _build_fortune_detail(result)
    except Exception as e:
        logger.warning(f"运势详情构建失败，降级为空结构: {e}")
        result['fortune_detail'] = _empty_fortune_detail()

    return result


# ==================== 月度天文事件 & 运势详情 ====================

def _empty_month_events():
    """月度天文事件空结构（降级兜底）"""
    return {'retrogrades': [], 'new_moons': [], 'full_moons': [], 'eclipses': []}


def _compute_month_events(result):
    """按行运日期所在月计算天文事件；月份信息缺失时返回空结构"""
    transit_date = result.get('transit_date', '')
    if not transit_date:
        return _empty_month_events()
    year, month = int(transit_date[:4]), int(transit_date[5:7])
    natal = result.get('natal_chart', {})
    sun_sign_zh = natal.get('sun', {}).get('sign_zh', '')
    asc_sign_zh = natal.get('ascendant', {}).get('sign_zh', '')
    from monthly_events import get_month_events
    return get_month_events(year, month, sun_sign_zh, asc_sign_zh)


def _event_aspect_to(event_lon, target_lon):
    """事件黄经与本命太阳/上升黄经的相位判定

    角距在 EVENT_ASPECT_ORB 内时返回 (相位中文名, 相位类型, 偏差)，否则 None
    """
    diff = abs(event_lon - target_lon) % 360.0
    diff = min(diff, 360.0 - diff)
    for degree, (aspect_name, aspect_type) in ASPECTS.items():
        deviation = abs(diff - degree)
        if deviation <= EVENT_ASPECT_ORB:
            return aspect_name, aspect_type, round(deviation, 2)
    return None


def _event_kb_readings(event_planet_zh, event_sign_zh, ref_sign_zh, solar_house, max_rows=2):
    """知识库查询某类天象事件（日食/月食/新月/满月）对指定星座的影响

    先按 (sign=参照星座, planet=事件类型, planet_sign=事件星座) 查，
    再按 (sign=参照星座, planet=事件类型, house=太阳宫位) 查，合并去重
    """
    try:
        from astro_interpreter import _kb_query, _dedup
        rows = []
        if ref_sign_zh and event_sign_zh:
            rows += _kb_query(sign=ref_sign_zh, planet=event_planet_zh,
                              planet_sign=event_sign_zh)
        if ref_sign_zh and solar_house:
            rows += _kb_query(sign=ref_sign_zh, planet=event_planet_zh,
                              house=solar_house)
        return [r['meaning'] for r in _dedup(rows)[:max_rows]]
    except Exception as e:
        logger.warning(f"事件知识库查询失败: {e}")
        return []


def _house_theme_text(house):
    """宫位 -> '第N宫（xx领域）' 描述"""
    if not house:
        return ''
    theme = HOUSE_THEMES.get(house, '')
    return f"第{house}宫（{theme}）" if theme else f"第{house}宫"


def _event_fallback(event_planet_zh, solar_house):
    """事件无知识库命中时的通用兜底句（即使无相位也必须输出宫位/星座影响）"""
    house_text = _house_theme_text(solar_house)
    if event_planet_zh in ('日食', '新月日食'):
        return (f"日食落入你的{house_text or '本命盘'}，这往往预示着该领域的重要新开端或转折点，"
                f"影响持续约半年。")
    if event_planet_zh in ('月食', '满月月食'):
        return (f"月食落入你的{house_text or '本命盘'}，往往带来该领域情绪与事件的高潮或了结，"
                f"是放下旧模式、迎接转变的节点。")
    if event_planet_zh == '新月':
        return (f"新月落入你的{house_text or '本命盘'}，适合在该领域设定新目标、播下种子，"
                f"未来一个月会逐步显化。")
    if event_planet_zh == '满月':
        return (f"满月落入你的{house_text or '本命盘'}，该领域的事情走向高潮或结果，"
                f"适合总结、庆祝或释放不再需要的部分。")
    return ''


def _aspect_event_item(event, event_planet_zh, natal, sun_sign_zh, asc_sign_zh):
    """组装一条日月食/新月满月条目：时间、星座宫位、与本命太阳/上升的相位、解读"""
    from astro_interpreter import _solar_house
    sign_zh = event.get('sign_zh', '')
    solar_house_sun = _solar_house(sign_zh, sun_sign_zh)
    solar_house_asc = _solar_house(sign_zh, asc_sign_zh)

    # 事件黄经 vs 本命太阳/上升黄经（orb 取太阳 7.5°）
    event_lon = event.get('longitude', 0.0)
    aspects_hit = []
    for target_key, target_name in (('sun', '本命太阳'), ('ascendant', '本命上升')):
        t_lon = natal.get(target_key, {}).get('longitude')
        if t_lon is None:
            continue
        hit = _event_aspect_to(event_lon, t_lon)
        if hit:
            aspects_hit.append(f"与{target_name}呈{hit[0]}（偏差{hit[2]}°）")

    # 知识库解读：本命太阳星座 + 本命上升星座两个参照各最多 2 条
    readings = []
    for ref_sign, s_house in ((sun_sign_zh, solar_house_sun),
                              (asc_sign_zh, solar_house_asc)):
        readings += _event_kb_readings(event_planet_zh, sign_zh, ref_sign, s_house)
    # 去重保序
    seen = set()
    readings = [r for r in readings if not (r in seen or seen.add(r))][:3]

    meta = [f"北京时间 {event.get('datetime', '')}"]
    if solar_house_sun:
        meta.append(f"相对本命太阳：{_house_theme_text(solar_house_sun)}")
    if solar_house_asc:
        meta.append(f"相对本命上升：{_house_theme_text(solar_house_asc)}")
    meta += aspects_hit

    return {
        'headline': f"{event.get('type', event_planet_zh)} · {sign_zh} {event.get('degree', '')}°",
        'meta': meta,
        'readings': readings,
        'generic': _event_fallback(event_planet_zh, solar_house_sun)
    }


def _build_eclipse_section(month_events, natal, sun_sign_zh, asc_sign_zh):
    """板块一：本月日月食（当月无食则整块不显示）"""
    items = []
    for e in month_events.get('eclipses', []):
        try:
            planet_zh = '日食' if '日食' in e.get('type', '') else '月食'
            items.append(_aspect_event_item(e, planet_zh, natal, sun_sign_zh, asc_sign_zh))
        except Exception as ex:
            logger.warning(f"日月食条目构建失败: {ex}")
    return {'key': 'eclipses', 'title': '🌑 本月日月食',
            'hide_if_empty': True, 'items': items, 'empty_text': ''}


def _build_moon_section(month_events, natal, sun_sign_zh, asc_sign_zh):
    """板块二：本月新月与满月"""
    items = []
    for label, ev_list in (('新月', month_events.get('new_moons', [])),
                           ('满月', month_events.get('full_moons', []))):
        for m in ev_list:
            try:
                event = dict(m)
                event['type'] = label
                items.append(_aspect_event_item(event, label, natal, sun_sign_zh, asc_sign_zh))
            except Exception as ex:
                logger.warning(f"{label}条目构建失败: {ex}")
    items.sort(key=lambda x: x['meta'][0] if x['meta'] else '')
    return {'key': 'moons', 'title': '🌙 本月新月与满月',
            'hide_if_empty': False, 'items': items, 'empty_text': '本月无此类星象'}


def _build_retrograde_section(month_events, result, sun_sign_zh, asc_sign_zh):
    """板块三：行运逆行行星（复用 month_events.retrogrades）"""
    from astro_interpreter import _kb_query, _dedup, _solar_house, PLANET_THEMES
    natal = result.get('natal_chart', {})
    all_aspects = result.get('aspects', [])
    items = []
    for r in month_events.get('retrogrades', []):
        try:
            planet_key = r.get('planet', '')
            planet_zh = r.get('planet_zh', '')
            sign_zh = r.get('sign_zh', '')

            # 与本命太阳/上升的相位（从 result['aspects'] 筛）
            aspect_hits = []
            for asp in all_aspects:
                if asp.get('transit_planet') == planet_key and \
                        asp.get('natal_planet') in ('sun', 'ascendant'):
                    target = '本命太阳' if asp['natal_planet'] == 'sun' else '本命上升'
                    aspect_hits.append(
                        f"与{target}呈{asp.get('aspect_name', '')}（偏差{asp.get('deviation', '')}°）")

            # 知识库：retrograde 列非空且 planet/sign 匹配（太阳/上升星座两个参照）
            rows = []
            for ref_sign in (sun_sign_zh, asc_sign_zh):
                if not ref_sign:
                    continue
                rows += [row for row in _kb_query(sign=ref_sign, planet=planet_zh)
                         if row.get('retrograde', '').strip()]
            readings = [row['meaning'] for row in _dedup(rows)[:2]]

            # 无相位时的宫位星座影响兜底
            solar_house_sun = _solar_house(sign_zh, sun_sign_zh)
            solar_house_asc = _solar_house(sign_zh, asc_sign_zh)
            theme = PLANET_THEMES.get(planet_zh, planet_zh)
            generic = (f"行运{planet_zh}（{theme}）在{sign_zh}逆行"
                       + (f"，位于你太阳星座的{_house_theme_text(solar_house_sun)}" if solar_house_sun else '')
                       + (f"、上升星座的{_house_theme_text(solar_house_asc)}" if solar_house_asc else '')
                       + "。逆行期间相关领域宜回顾复盘、修正旧有问题，不宜贸然开启新局。")

            meta = [f"逆行时间：{r.get('start_date', '')} ~ {r.get('end_date', '')}"
                    + (f"（{r['note']}）" if r.get('note') else ''),
                    f"所在星座：{sign_zh}"]
            meta += aspect_hits

            items.append({
                'headline': f"{planet_zh}逆行 · {sign_zh}",
                'meta': meta,
                'readings': readings,
                'generic': generic
            })
        except Exception as ex:
            logger.warning(f"逆行条目构建失败: {ex}")
    return {'key': 'retrogrades', 'title': '🔁 行运逆行行星',
            'hide_if_empty': False, 'items': items, 'empty_text': '本月无此类星象'}


def _build_sun_asc_section(readings, target, key, title):
    """板块四/五：行运行星 × 本命太阳/上升（复用 readings.sun_asc_aspects）"""
    items = []
    for sa in readings.get('sun_asc_aspects', []):
        if sa.get('target') != target:
            continue
        try:
            meta = [f"行运{sa.get('transit_planet_zh', '')}位于{sa.get('transit_sign_zh', '')}"
                    + (f"，落入你本命第{sa['transit_house']}宫" if sa.get('transit_house') else '')
                    + f"，偏差{sa.get('deviation', '')}°"]
            if sa.get('is_retrograde'):
                meta.append('该行运星正在逆行')
            items.append({
                'headline': f"行运{sa.get('transit_planet_zh', '')} × 本命{target} · {sa.get('aspect_name', '')}",
                'meta': meta,
                'readings': sa.get('readings', []),
                'generic': sa.get('generic', '')
            })
        except Exception as ex:
            logger.warning(f"太阳/上升相位条目构建失败: {ex}")
    return {'key': key, 'title': title,
            'hide_if_empty': False, 'items': items, 'empty_text': '本月无此类星象'}


def _build_other_planets_section(readings):
    """板块六：其他行星位置影响（未与本命太阳/上升成相位的行运行星）"""
    aspected = {sa.get('transit_planet_zh')
                for sa in readings.get('sun_asc_aspects', [])}
    items = []
    for st in readings.get('planet_states', []):
        if st.get('planet_zh') in aspected:
            continue
        try:
            meta = []
            if st.get('house'):
                meta.append(f"本命第{st['house']}宫")
            if st.get('solar_house_sun'):
                meta.append(f"太阳宫位制第{st['solar_house_sun']}宫")
            if st.get('solar_house_asc'):
                meta.append(f"上升宫位制第{st['solar_house_asc']}宫")
            if st.get('is_retrograde'):
                meta.append('逆行中')
            generic = (f"行运{st.get('planet_zh', '')}当前位于{st.get('sign_zh', '')}，"
                       + ("正在逆行，相关领域宜回顾复盘、修正旧有问题。"
                          if st.get('is_retrograde') else
                          "顺行推进，相关领域能量流通顺畅。"))
            headline = f"{st.get('planet_zh', '')} · {st.get('sign_zh', '')}"
            if st.get('is_retrograde'):
                headline += '（逆行）'
            items.append({
                'headline': headline,
                'meta': meta,
                'readings': st.get('readings', []),
                'generic': generic
            })
        except Exception as ex:
            logger.warning(f"行星状态条目构建失败: {ex}")
    return {'key': 'other_planets', 'title': '🪐 其他行星位置影响',
            'hide_if_empty': False, 'items': items, 'empty_text': '本月无此类星象'}


def _empty_fortune_detail():
    """运势详情空结构（降级兜底，板块骨架保留）"""
    return {
        'sun_sign_zh': '', 'asc_sign_zh': '', 'transit_date': '',
        'sections': [
            {'key': 'eclipses', 'title': '🌑 本月日月食', 'hide_if_empty': True,
             'items': [], 'empty_text': ''},
            {'key': 'moons', 'title': '🌙 本月新月与满月', 'hide_if_empty': False,
             'items': [], 'empty_text': '本月无此类星象'},
            {'key': 'retrogrades', 'title': '🔁 行运逆行行星', 'hide_if_empty': False,
             'items': [], 'empty_text': '本月无此类星象'},
            {'key': 'sun_aspects', 'title': '☀️ 行运行星 × 本命太阳', 'hide_if_empty': False,
             'items': [], 'empty_text': '本月无此类星象'},
            {'key': 'asc_aspects', 'title': '⬆️ 行运行星 × 本命上升', 'hide_if_empty': False,
             'items': [], 'empty_text': '本月无此类星象'},
            {'key': 'other_planets', 'title': '🪐 其他行星位置影响', 'hide_if_empty': False,
             'items': [], 'empty_text': '本月无此类星象'},
        ]
    }


def _build_fortune_detail(result):
    """构建「珊姐运势解读」模态框数据：六个板块，按优先级顺序排列

    数据源：result['month_events']（月度天文事件）、result['readings']（知识库解读）、
    result['aspects']（本命×行运相位）；所有子步骤独立 try/except，异常降级不抛错
    """
    detail = _empty_fortune_detail()
    natal = result.get('natal_chart', {})
    sun_sign_zh = natal.get('sun', {}).get('sign_zh', '')
    asc_sign_zh = natal.get('ascendant', {}).get('sign_zh', '')
    detail['sun_sign_zh'] = sun_sign_zh
    detail['asc_sign_zh'] = asc_sign_zh
    detail['transit_date'] = result.get('transit_date', '')

    month_events = result.get('month_events') or _empty_month_events()
    readings = result.get('readings') or {}

    builders = [
        lambda: _build_eclipse_section(month_events, natal, sun_sign_zh, asc_sign_zh),
        lambda: _build_moon_section(month_events, natal, sun_sign_zh, asc_sign_zh),
        lambda: _build_retrograde_section(month_events, result, sun_sign_zh, asc_sign_zh),
        lambda: _build_sun_asc_section(readings, '太阳', 'sun_aspects', '☀️ 行运行星 × 本命太阳'),
        lambda: _build_sun_asc_section(readings, '上升', 'asc_aspects', '⬆️ 行运行星 × 本命上升'),
        lambda: _build_other_planets_section(readings),
    ]
    sections = []
    for i, build in enumerate(builders):
        try:
            sections.append(build())
        except Exception as e:
            logger.warning(f"运势详情板块{i + 1}构建失败: {e}")
            sections.append(detail['sections'][i])
    detail['sections'] = sections
    return detail


def slim_for_session(result):
    """生成存入 session 的瘦身副本：去掉体积较大的派生数据

    Flask 默认 session 存于客户端 cookie（浏览器上限约 4KB），
    readings / month_events / fortune_detail 含大量文案会超限导致会话丢失。
    三者均为确定性结果，可在 /result 渲染时用 attach_readings 重算。
    """
    slim = dict(result)
    slim.pop('readings', None)
    slim.pop('month_events', None)
    slim.pop('fortune_detail', None)
    return slim


def attach_readings(result):
    """为 session 中取出的结果重新挂载派生数据（毫秒~秒级，确定性计算）

    顺序：readings -> month_events -> fortune_detail（后者依赖前两者）。
    旧 session 数据缺少这些键时同样自动补齐。
    """
    if not isinstance(result, dict):
        return result
    if 'readings' not in result:
        try:
            from astro_interpreter import interpret
            result['readings'] = interpret(result)
        except Exception as e:
            logger.warning(f"知识库解读重算失败，降级为空解读: {e}")
            result['readings'] = {'planet_states': [], 'internal_aspects': [], 'sun_asc_aspects': []}
    if 'month_events' not in result:
        try:
            result['month_events'] = _compute_month_events(result)
        except Exception as e:
            logger.warning(f"月度天文事件重算失败，降级为空事件: {e}")
            result['month_events'] = _empty_month_events()
    if 'fortune_detail' not in result:
        try:
            result['fortune_detail'] = _build_fortune_detail(result)
        except Exception as e:
            logger.warning(f"运势详情重算失败，降级为空结构: {e}")
            result['fortune_detail'] = _empty_fortune_detail()
    return result

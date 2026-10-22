# astro_interpreter.py - 星象解读引擎
# 基于苏珊米勒运势知识库（data/astro_events_kb.csv）为行运盘挂载解读文案
import logging
import os
import re
from datetime import datetime, timedelta

import swisseph as swe

logger = logging.getLogger(__name__)

# 星座中文顺序（用于太阳宫位制换算）
ZH_SIGNS = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
            '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']

# 行星主题词（用于兜底通用解读）
PLANET_THEMES = {
    '太阳': '自我意志与生命力', '月亮': '情绪与安全感', '水星': '沟通与思维',
    '金星': '感情与财务', '火星': '行动力与欲望', '木星': '扩张与幸运',
    '土星': '责任与限制', '天王星': '变革与突破', '海王星': '梦想与直觉',
    '冥王星': '转化与重生'
}

# 各相位类型的通用兜底模板（知识库未命中时使用）
GENERIC_ASPECT_TEMPLATES = {
    'conjunction': '行运{planet_a}与{planet_b}呈合相：{theme_a}与{theme_b}的能量融合叠加，相关主题被显著放大，是集中精力、主动推进的时机。',
    'sextile': '行运{planet_a}与{planet_b}呈六分相：{theme_a}与{theme_b}之间出现温和的机会窗口，主动一点便能借势而为。',
    'square': '行运{planet_a}与{planet_b}呈四分相：{theme_a}与{theme_b}相互拉扯，容易感到紧张与受阻，需要耐心调整、避免硬碰硬。',
    'trine': '行运{planet_a}与{planet_b}呈三分相：{theme_a}与{theme_b}和谐共振，事情推进顺畅自然，适合大胆施展天赋。',
    'opposition': '行运{planet_a}与{planet_b}呈对分相：{theme_a}与{theme_b}形成两极张力，需要在两者之间寻求平衡，警惕极端化。'
}

# 本命太阳/上升 × 行运行星相位的通用兜底模板
GENERIC_SUN_ASC_TEMPLATES = {
    'conjunction': '行运{planet}与本命{target}呈合相：{theme}的能量直接注入你的{target_desc}，相关主题成为当下焦点。',
    'sextile': '行运{planet}与本命{target}呈六分相：{theme}为你带来可把握的小机会，主动社交与尝试会有收获。',
    'square': '行运{planet}与本命{target}呈四分相：{theme}对你的{target_desc}构成挑战，容易有摩擦感，宜放慢节奏、修正方向。',
    'trine': '行运{planet}与本命{target}呈三分相：{theme}与你的{target_desc}自然契合，是顺风顺水的支持相位。',
    'opposition': '行运{planet}与本命{target}呈对分相：{theme}从对宫牵引你的{target_desc}，需要在自我与外界期待之间找到平衡点。'
}

# 相位性质的吉凶倾向（用于优先挑选知识库条目的 polarity）
ASPECT_POLARITY_PREF = {
    'trine': '吉', 'sextile': '吉',
    'square': '凶', 'opposition': '凶',
    'conjunction': None  # 合相不限吉凶
}

TARGET_DESC = {'太阳': '核心人格', '上升': '外在表现'}


# ==================== 日期本地化（KB 原文日期 -> 本次计算真实时间） ====================

# 精确成相日扫描用的行星编号
_PLANET_IDS = {
    'sun': swe.SUN, 'moon': swe.MOON, 'mercury': swe.MERCURY, 'venus': swe.VENUS,
    'mars': swe.MARS, 'jupiter': swe.JUPITER, 'saturn': swe.SATURN,
    'uranus': swe.URANUS, 'neptune': swe.NEPTUNE, 'pluto': swe.PLUTO,
}

# 带年份的完整日期（如"2025年3月30日"）是长期陈述，不参与替换
_YEAR_DATE_RE = re.compile(r'\d{4}年\d{1,2}月\d{1,2}日')
# 日期区间：8月4日到8月28日 / 7月7日至31日 / 6月9日-7月20日 / 9月3日～9月8日 等变体
_RANGE_RE = re.compile(
    r'\d{1,2}月\d{1,2}日\s*(?:到|至|~|～|—|–|-)\s*(?:\d{1,2}月)?\d{1,2}日')
# 单日期：6月3日
_SINGLE_DATE_RE = re.compile(r'\d{1,2}月\d{1,2}日')
# 相对月份："下个月7月"/"上个月3月" -> "下个月"/"上个月"（去掉原文具体月份数字）
_NEXT_MONTH_RE = re.compile(r'下个月\d{1,2}月')
_PREV_MONTH_RE = re.compile(r'上个月\d{1,2}月')
# 旬表述：带数字月份前缀的（6月初/6月中/6月底）与裸写的（月初/月中/月底）
_DECADE_NUM_RULES = [
    (re.compile(r'\d{1,2}月初(?:第[一二三四五\d]+周)?'), '本月上旬'),
    (re.compile(r'\d{1,2}月中(?!旬)'), '本月中旬'),
    (re.compile(r'\d{1,2}月(?:底|末)'), '本月下旬'),
]
_DECADE_BARE_RULES = [
    (re.compile(r'月初(?:第[一二三四五\d]+周)?'), '本月上旬'),
    (re.compile(r'月中(?!旬)'), '本月中旬'),
    (re.compile(r'月(?:底|末)'), '本月下旬'),
]
# 带相对月前缀的旬表述（上个月底/本月初等），须先于裸写规则处理避免误拼接
_DECADE_PREFIXES = [
    ('上个月', '上个月'), ('下个月', '下个月'), ('本月', '本月'),
    ('这个月', '本月'), ('上月', '上个月'), ('下月', '下个月'),
]


def _as_date(obj):
    """datetime / date / 'YYYY-MM-DD' 统一转 date；失败返回 None"""
    if obj is None:
        return None
    if isinstance(obj, datetime):
        return obj.date()
    if isinstance(obj, str):
        try:
            return datetime.strptime(obj[:10], '%Y-%m-%d').date()
        except ValueError:
            return None
    try:
        from datetime import date as _date_cls
        if isinstance(obj, _date_cls):
            return obj
    except Exception:
        pass
    return None


def _fmt_md(d):
    """date/datetime -> 'M月D日'"""
    d = _as_date(d)
    return f'{d.month}月{d.day}日' if d else ''


def localize_meaning_dates(text, event_date=None, period=None, transit_date=None):
    """把 KB 原文中的日期表述替换为本次计算的真实时间

    embed 模式（event_date 或 period 非空）：
      - 单日期 "X月X日" -> event_date 的 "M月D日"；与行运当天同日 -> "当天"
      - 区间 "X月X日到X月X日" -> period（如逆行区间 "10月4日到28日"），无 period 用 event_date
    neutral 模式（两者皆空，常驻描述无对应真实事件）：
      - 单日期 -> "当天"；区间 -> "该段时间内"
    通用：带年份日期不动；月初/月中/月底 -> 本月上旬/中旬/下旬；下个月X月 -> 下个月。
    函数幂等：对已替换文本重复执行不会产生二次破坏。
    """
    if not text:
        return text
    ev_d = _as_date(event_date)
    tr_d = _as_date(transit_date)
    neutral = (ev_d is None and not period)

    # embed 模式下单日期的替换文本
    if neutral:
        single_text = '当天'
    elif ev_d is not None and tr_d is not None and ev_d == tr_d:
        single_text = '当天'
    elif ev_d is not None:
        single_text = _fmt_md(ev_d)
    else:
        single_text = '当天'
    range_text = '该段时间内' if neutral else (period or single_text)

    # 1. 保护带年份的完整日期
    protected = []

    def _stash(m):
        protected.append(m.group(0))
        return f'\x00{len(protected) - 1}\x00'

    out = _YEAR_DATE_RE.sub(_stash, text)

    # 2. 相对月份（下个月X月 -> 下个月），须先于单日期处理
    out = _NEXT_MONTH_RE.sub('下个月', out)
    out = _PREV_MONTH_RE.sub('上个月', out)

    # 3. 旬表述：先带前缀（上个月底/本月初），再数字月份（6月底），最后裸写（月底）
    for prefix, norm in _DECADE_PREFIXES:
        out = out.replace(prefix + '初', norm + '上旬')
        out = out.replace(prefix + '中', norm + '中旬')
        out = out.replace(prefix + '底', norm + '下旬')
        out = out.replace(prefix + '末', norm + '下旬')
    for pat, rep in _DECADE_NUM_RULES:
        out = pat.sub(rep, out)
    for pat, rep in _DECADE_BARE_RULES:
        out = pat.sub(rep, out)

    # 4. 日期区间（先于单日期，否则区间两端会被拆开替换）
    out = _RANGE_RE.sub(range_text, out)

    # 5. 单日期
    out = _SINGLE_DATE_RE.sub(single_text, out)

    # 6. 还原带年份日期
    for i, orig in enumerate(protected):
        out = out.replace(f'\x00{i}\x00', orig)
    return out


# ==================== 精确成相日计算 ====================

def _jd_from_beijing(dt):
    """北京时间 datetime -> 儒略日（UT）"""
    hour = dt.hour + dt.minute / 60.0 + dt.second / 3600.0
    return swe.julday(dt.year, dt.month, dt.day, hour) - 8.0 / 24.0


def _jd_to_beijing_dt(jd_ut):
    """儒略日（UT）-> 北京时间 datetime（分钟精度）"""
    y, m, d, h = swe.revjul(jd_ut + 8.0 / 24.0)
    hh = int(h)
    mm = int(round((h - hh) * 60))
    base = datetime(y, m, d) + timedelta(hours=hh)
    if mm >= 60:
        return base + timedelta(hours=1)
    return base + timedelta(minutes=mm)


def _lon_at(jd, pid):
    """某儒略日的行星黄经"""
    return swe.calc(jd, pid)[0][0]


def find_exact_aspect_date(planet_a_en, planet_b_en, aspect_deg, transit_dt, window=20):
    """以行运时刻为中心 ±window 天扫描精确成相时刻（北京时间 datetime）

    planet_b_en 传浮点数时表示固定黄经（本命行星/上升，只扫行运 planet_a）；
    传行星英文名时两颗都取行运实时位置。窗口内最小偏差仍大于 1° 返回 None。
    """
    try:
        if transit_dt is None or planet_a_en not in _PLANET_IDS:
            return None
        pid_a = _PLANET_IDS[planet_a_en]
        # 固定黄经（本命）模式 or 双行运模式
        fixed_b = float(planet_b_en) if isinstance(planet_b_en, (int, float)) else None
        if fixed_b is None and planet_b_en not in _PLANET_IDS:
            return None
        pid_b = _PLANET_IDS.get(planet_b_en) if fixed_b is None else None

        def deviation(jd):
            lon_a = _lon_at(jd, pid_a)
            lon_b = fixed_b if fixed_b is not None else _lon_at(jd, pid_b)
            diff = abs(lon_a - lon_b) % 360.0
            diff = min(diff, 360.0 - diff)
            return abs(diff - aspect_deg)

        jd0 = _jd_from_beijing(transit_dt)

        # 日步长粗扫 [-window, +window]，定位偏差最小的日期
        best_day, best_dev = 0, deviation(jd0)
        for d in range(-window, window + 1):
            dev = deviation(jd0 + d)
            if dev < best_dev:
                best_day, best_dev = d, dev

        # 1 小时步长在最优日 ±1 天内细化
        best_jd = jd0 + best_day
        for h in range(-24, 25):
            jd = jd0 + best_day + h / 24.0
            dev = deviation(jd)
            if dev < best_dev:
                best_jd, best_dev = jd, dev

        if best_dev > 1.0:
            return None
        return _jd_to_beijing_dt(best_jd)
    except Exception as e:
        logger.warning(f"精确成相日计算失败({planet_a_en},{planet_b_en},{aspect_deg}): {e}")
        return None


def _load_kb():
    """启动时加载知识库；文件缺失或读取失败时优雅降级为空库"""
    kb_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                           'data', 'astro_events_kb.csv')
    if not os.path.exists(kb_path):
        logger.warning(f"知识库文件不存在，解读功能降级: {kb_path}")
        return None
    try:
        import pandas as pd
        df = pd.read_csv(kb_path, dtype=str).fillna('')
        # 宫位字段归一化：去掉“宫”字后缀，统一为纯数字字符串
        df['house_norm'] = df['house'].astype(str).str.replace('宫', '', regex=False).str.strip()
        logger.info(f"星象知识库加载成功，共 {len(df)} 条")
        return df
    except Exception as e:
        logger.warning(f"知识库加载失败，解读功能降级: {e}")
        return None


# 模块级缓存，整个进程只加载一次
KB = _load_kb()


def _sign_index(sign_zh):
    """星座中文名 -> 0-11 索引，找不到返回 None"""
    try:
        return ZH_SIGNS.index(sign_zh)
    except ValueError:
        return None


def _solar_house(planet_sign_zh, ref_sign_zh):
    """太阳宫位制：以参照星座为 1 宫，计算行星所在星座的宫位"""
    a = _sign_index(planet_sign_zh)
    b = _sign_index(ref_sign_zh)
    if a is None or b is None:
        return None
    return (a - b) % 12 + 1


def _dedup(rows):
    """按 meaning 去重，保持顺序"""
    seen = set()
    out = []
    for r in rows:
        m = r.get('meaning', '')
        if m and m not in seen:
            seen.add(m)
            out.append(r)
    return out


def _kb_query(sign=None, planet=None, house=None, planet_sign=None,
              aspect_norm=None, aspect_with=None):
    """按条件查询知识库，返回 dict 列表（仅保留有 meaning 的行）"""
    if KB is None or len(KB) == 0:
        return []
    df = KB
    if sign:
        df = df[df['sign'] == sign]
    if planet:
        df = df[df['planet'] == planet]
    if house is not None:
        df = df[df['house_norm'] == str(house)]
    if planet_sign:
        df = df[df['planet_sign'] == planet_sign]
    if aspect_norm:
        df = df[df['aspect_norm'] == aspect_norm]
    if aspect_with:
        # aspect_with 可能是“A、B”多行星，做包含匹配
        df = df[df['aspect_with'].str.contains(aspect_with, na=False, regex=False)]
    df = df[df['meaning'].str.strip() != '']
    return df.to_dict('records')


def _sort_by_polarity(rows, aspect_type):
    """按相位性质排序知识库条目：和谐相位优先吉，紧张相位优先凶，合相不限"""
    pref = ASPECT_POLARITY_PREF.get(aspect_type)
    if not pref:
        return rows
    return sorted(rows, key=lambda r: 0 if r.get('polarity') == pref else 1)


def _generic_aspect(planet_a_zh, planet_b_zh, aspect_type, retro_a=False, retro_b=False):
    """行运行星间相位的兜底解读"""
    tpl = GENERIC_ASPECT_TEMPLATES.get(aspect_type)
    if not tpl:
        return ''
    text = tpl.format(
        planet_a=planet_a_zh, planet_b=planet_b_zh,
        theme_a=PLANET_THEMES.get(planet_a_zh, planet_a_zh),
        theme_b=PLANET_THEMES.get(planet_b_zh, planet_b_zh)
    )
    retros = [p for p, r in ((planet_a_zh, retro_a), (planet_b_zh, retro_b)) if r]
    if retros:
        text += '（' + '、'.join(retros) + '正在逆行，相关能量内收，宜回顾复盘而非贸然开启新局。）'
    return text


def _generic_sun_asc(target, transit_planet_zh, aspect_type, is_retrograde=False):
    """本命太阳/上升 × 行运行星相位的兜底解读"""
    tpl = GENERIC_SUN_ASC_TEMPLATES.get(aspect_type)
    if not tpl:
        return ''
    text = tpl.format(
        planet=transit_planet_zh, target=target,
        theme=PLANET_THEMES.get(transit_planet_zh, transit_planet_zh),
        target_desc=TARGET_DESC.get(target, target)
    )
    if is_retrograde:
        text += f'（{transit_planet_zh}正在逆行，影响偏向内在调整与旧事重现。）'
    return text


def _interpret_planet_states(result, sun_sign_zh, asc_sign_zh):
    """行运盘每颗行星的状态解读（本命宫 + 太阳宫/上升宫两套参照）"""
    states = []
    transit = result.get('transit_chart', {})
    for planet_key, p in transit.items():
        if planet_key in ('ascendant', 'midheaven'):
            continue
        planet_zh = p.get('name_zh', planet_key)
        sign_zh = p.get('sign_zh', '')
        solar_house_sun = _solar_house(sign_zh, sun_sign_zh)
        solar_house_asc = _solar_house(sign_zh, asc_sign_zh)

        readings = []
        # 分别以本命太阳星座、本命上升星座为参照查询知识库
        for ref_sign, s_house in ((sun_sign_zh, solar_house_sun),
                                  (asc_sign_zh, solar_house_asc)):
            if not ref_sign:
                continue
            rows = []
            # 优先按“行星落入太阳宫位”查询
            if s_house:
                rows = _kb_query(sign=ref_sign, planet=planet_zh, house=s_house)
            # 宫位查不到再退到“行星所在星座”
            if not rows and sign_zh:
                rows = _kb_query(sign=ref_sign, planet=planet_zh, planet_sign=sign_zh)
            readings.extend(rows[:2])

        states.append({
            'planet_zh': planet_zh,
            'sign_zh': sign_zh,
            'house': p.get('house'),
            'solar_house_sun': solar_house_sun,
            'solar_house_asc': solar_house_asc,
            'is_retrograde': p.get('is_retrograde', False),
            # 落座落宫为常驻描述：原文日期无对应真实事件，走 neutral 模式
            'readings': [localize_meaning_dates(r['meaning'])
                         for r in _dedup(readings)[:3]]
        })
    return states


def _parse_transit_dt(result):
    """从 result 的 transit_date/transit_time 解析行运时刻（北京时间）"""
    try:
        d = result.get('transit_date', '')
        t = result.get('transit_time', '12:00') or '12:00'
        return datetime.strptime(f'{d} {t}', '%Y-%m-%d %H:%M')
    except (ValueError, TypeError):
        return None


def _attach_exact_date(item, exact_dt, transit_dt):
    """把精确成相日写入条目：exact_date（'M月D日' 或 None）+ 是否行运当天"""
    item['exact_date'] = _fmt_md(exact_dt) if exact_dt else None
    item['exact_is_today'] = bool(
        exact_dt and transit_dt and exact_dt.date() == transit_dt.date())
    return item


def _interpret_internal_aspects(result, transit_dt=None):
    """行运盘内部相位的解读（知识库命中优先，否则给通用兜底句）

    embed 模式：KB 原文日期替换为精确成相日（扫不到精确成相则用行运日）
    """
    out = []
    for asp in result.get('transit_internal_aspects', []):
        aspect_type = asp.get('aspect_type', '')
        a_zh = asp.get('planet_a_zh', '')
        b_zh = asp.get('planet_b_zh', '')

        rows = []
        if aspect_type:
            # (A,B) 与 (B,A) 两个方向都试；aspect_with 做包含匹配
            rows = _kb_query(planet=a_zh, aspect_norm=aspect_type, aspect_with=b_zh)
            rows += _kb_query(planet=b_zh, aspect_norm=aspect_type, aspect_with=a_zh)
        rows = _sort_by_polarity(_dedup(rows), aspect_type)

        # 精确成相日：日步长定位 + 小时细化（仅相位条目调用）
        exact_dt = find_exact_aspect_date(
            asp.get('planet_a'), asp.get('planet_b'),
            asp.get('aspect_degree', 0), transit_dt)
        embed_date = exact_dt or transit_dt

        item = dict(asp)
        _attach_exact_date(item, exact_dt, transit_dt)
        item['readings'] = [localize_meaning_dates(r['meaning'], event_date=embed_date,
                                                   transit_date=transit_dt)
                            for r in rows[:3]]
        item['generic'] = _generic_aspect(
            a_zh, b_zh, aspect_type,
            asp.get('retro_a', False), asp.get('retro_b', False)
        )
        out.append(item)
    return out


def _interpret_sun_asc_aspects(result, sun_sign_zh, asc_sign_zh, transit_dt=None):
    """本命太阳/上升 × 行运行星相位的解读

    embed 模式：本命黄经固定，只扫行运行星求精确成相日，KB 原文日期随之替换
    """
    out = []
    transit = result.get('transit_chart', {})
    natal = result.get('natal_chart', {})
    for asp in result.get('aspects', []):
        n_planet = asp.get('natal_planet')
        if n_planet not in ('sun', 'ascendant'):
            continue
        target = '太阳' if n_planet == 'sun' else '上升'
        ref_sign = sun_sign_zh if n_planet == 'sun' else asc_sign_zh
        t_planet = asp.get('transit_planet', '')
        t_planet_zh = asp.get('transit_planet_zh', '')
        aspect_type = asp.get('aspect_type', '')
        t_info = transit.get(t_planet, {})
        is_retro = t_info.get('is_retrograde', False)

        # 精确成相日：本命侧黄经固定，仅扫描行运行星
        fixed_lon = natal.get(n_planet, {}).get('longitude')
        exact_dt = find_exact_aspect_date(
            t_planet, fixed_lon, asp.get('aspect_degree', 0), transit_dt) \
            if fixed_lon is not None else None
        embed_date = exact_dt or transit_dt

        rows = []
        if aspect_type:
            # 按“星座 + 行运行星 + 相位类型”查询
            rows = _kb_query(sign=ref_sign, planet=t_planet_zh, aspect_norm=aspect_type)
            rows = _sort_by_polarity(_dedup(rows), aspect_type)
        # 与 planet_states 同规则补充：按太阳宫位/行星落座补充
        if len(rows) < 3 and ref_sign:
            s_house = _solar_house(t_info.get('sign_zh', ''), ref_sign)
            extra = _kb_query(sign=ref_sign, planet=t_planet_zh, house=s_house) if s_house else []
            if not extra:
                extra = _kb_query(sign=ref_sign, planet=t_planet_zh,
                                  planet_sign=t_info.get('sign_zh', ''))
            rows = _dedup(rows + extra)

        item = {
            'target': target,
            'transit_planet': t_planet,
            'transit_planet_zh': t_planet_zh,
            'aspect_name': asp.get('aspect_name', ''),
            'aspect_type': aspect_type,
            'aspect_degree': asp.get('aspect_degree'),
            'deviation': asp.get('deviation'),
            'transit_sign_zh': asp.get('transit_sign_zh', ''),
            'transit_house': asp.get('transit_house'),
            'is_retrograde': is_retro,
            'readings': [localize_meaning_dates(r['meaning'], event_date=embed_date,
                                                transit_date=transit_dt)
                         for r in rows[:3]],
            'generic': _generic_sun_asc(target, t_planet_zh, aspect_type, is_retro)
        }
        _attach_exact_date(item, exact_dt, transit_dt)
        out.append(item)
    return out


def interpret(result):
    """主入口：输入 compute_all 的 result，输出各类解读

    任何子步骤异常都局部降级，保证整体不抛错
    """
    readings = {'planet_states': [], 'internal_aspects': [], 'sun_asc_aspects': []}
    try:
        natal = result.get('natal_chart', {})
        sun_sign_zh = natal.get('sun', {}).get('sign_zh', '')
        asc_sign_zh = natal.get('ascendant', {}).get('sign_zh', '')
        # 行运时刻：日期本地化的参照时间
        transit_dt = _parse_transit_dt(result)

        try:
            readings['planet_states'] = _interpret_planet_states(result, sun_sign_zh, asc_sign_zh)
        except Exception as e:
            logger.warning(f"行星状态解读失败: {e}")
        try:
            readings['internal_aspects'] = _interpret_internal_aspects(result, transit_dt)
        except Exception as e:
            logger.warning(f"行运内部相位解读失败: {e}")
        try:
            readings['sun_asc_aspects'] = _interpret_sun_asc_aspects(
                result, sun_sign_zh, asc_sign_zh, transit_dt)
        except Exception as e:
            logger.warning(f"太阳/上升相位解读失败: {e}")
    except Exception as e:
        logger.warning(f"解读引擎异常，返回空解读: {e}")
    return readings

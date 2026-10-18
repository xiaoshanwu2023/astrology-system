# astro_interpreter.py - 星象解读引擎
# 基于苏珊米勒运势知识库（data/astro_events_kb.csv）为行运盘挂载解读文案
import logging
import os

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
            'readings': [r['meaning'] for r in _dedup(readings)[:3]]
        })
    return states


def _interpret_internal_aspects(result):
    """行运盘内部相位的解读（知识库命中优先，否则给通用兜底句）"""
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

        item = dict(asp)
        item['readings'] = [r['meaning'] for r in rows[:3]]
        item['generic'] = _generic_aspect(
            a_zh, b_zh, aspect_type,
            asp.get('retro_a', False), asp.get('retro_b', False)
        )
        out.append(item)
    return out


def _interpret_sun_asc_aspects(result, sun_sign_zh, asc_sign_zh):
    """本命太阳/上升 × 行运行星相位的解读"""
    out = []
    transit = result.get('transit_chart', {})
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

        out.append({
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
            'readings': [r['meaning'] for r in rows[:3]],
            'generic': _generic_sun_asc(target, t_planet_zh, aspect_type, is_retro)
        })
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

        try:
            readings['planet_states'] = _interpret_planet_states(result, sun_sign_zh, asc_sign_zh)
        except Exception as e:
            logger.warning(f"行星状态解读失败: {e}")
        try:
            readings['internal_aspects'] = _interpret_internal_aspects(result)
        except Exception as e:
            logger.warning(f"行运内部相位解读失败: {e}")
        try:
            readings['sun_asc_aspects'] = _interpret_sun_asc_aspects(result, sun_sign_zh, asc_sign_zh)
        except Exception as e:
            logger.warning(f"太阳/上升相位解读失败: {e}")
    except Exception as e:
        logger.warning(f"解读引擎异常，返回空解读: {e}")
    return readings

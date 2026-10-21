# monthly_events.py - 月度天文事件计算
# 仅依赖 pyswisseph（内置星历），禁止引入 skyfield（需联网下载星历，服务器无外网）
# 输出时间统一为北京时间（东八区）
import logging
from datetime import datetime, timedelta

import swisseph as swe

logger = logging.getLogger(__name__)

# 时区：东八区（北京时间）
TZ_BEIJING = 8.0

ZH_SIGNS = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
            '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']

# 参与逆行扫描的行星（水星~冥王星 8 颗，太阳/月亮不逆行）
RETRO_PLANETS = [
    ('mercury', swe.MERCURY, '水星'),
    ('venus', swe.VENUS, '金星'),
    ('mars', swe.MARS, '火星'),
    ('jupiter', swe.JUPITER, '木星'),
    ('saturn', swe.SATURN, '土星'),
    ('uranus', swe.URANUS, '天王星'),
    ('neptune', swe.NEPTUNE, '海王星'),
    ('pluto', swe.PLUTO, '冥王星'),
]

# 逆行粗扫步长（6 小时）
SCAN_STEP_DAYS = 0.25
# 月相日步长扫描
MOON_STEP_DAYS = 1.0
# 二分法细化精度（约 1 分钟，单位：天）
BISECT_TOL_DAYS = 1.0 / (24 * 60)


def _jd_from_beijing(dt):
    """北京时间 datetime -> 儒略日（UT）"""
    hour = dt.hour + dt.minute / 60.0 + dt.second / 3600.0
    return swe.julday(dt.year, dt.month, dt.day, hour) - TZ_BEIJING / 24.0


def _jd_to_beijing(jd_ut):
    """儒略日（UT）-> 北京时间 datetime"""
    y, m, d, h = swe.revjul(jd_ut + TZ_BEIJING / 24.0)
    hh = int(h)
    mm = int(round((h - hh) * 60))
    if mm >= 60:
        mm -= 60
        hh += 1
    base = datetime(y, m, d)
    return base + timedelta(hours=hh, minutes=mm)


def _fmt_bj(jd_ut):
    """儒略日 -> 'YYYY-MM-DD HH:MM' 北京时间字符串"""
    return _jd_to_beijing(jd_ut).strftime('%Y-%m-%d %H:%M')


def _fmt_date_bj(jd_ut):
    """儒略日 -> 'YYYY-MM-DD' 北京时间日期字符串"""
    return _jd_to_beijing(jd_ut).strftime('%Y-%m-%d')


def _sign_degree(longitude):
    """黄经 -> (星座中文, 星座内度数)"""
    idx = int(longitude % 360 / 30) % 12
    return ZH_SIGNS[idx], round(longitude % 30, 2)


def _planet_calc(jd, pid):
    """返回 (黄经, 黄纬, 黄经速度°/天)；异常时返回 None"""
    try:
        res = swe.calc(jd, pid)
        return res[0][0], res[0][1], res[0][3]
    except Exception as e:
        logger.warning(f"行星位置计算失败: {e}")
        return None


def _month_bounds_jd(year, month):
    """当月 1 日 00:00（北京）与次月 1 日 00:00（北京）对应的儒略日（UT）"""
    start = _jd_from_beijing(datetime(year, month, 1))
    if month == 12:
        end = _jd_from_beijing(datetime(year + 1, 1, 1))
    else:
        end = _jd_from_beijing(datetime(year, month + 1, 1))
    return start, end


# ==================== 行星逆行扫描 ====================

def _speed_sign(jd, pid):
    """黄经速度符号：逆行 -1 / 顺行 +1；计算失败返回 0"""
    r = _planet_calc(jd, pid)
    if r is None:
        return 0
    return -1 if r[2] < 0 else 1


def _bisect_station(jd_a, jd_b, pid):
    """在 [jd_a, jd_b] 内用二分法定位速度过零点（停滞点），精确到约 1 分钟"""
    sign_a = _speed_sign(jd_a, pid)
    while (jd_b - jd_a) > BISECT_TOL_DAYS:
        mid = (jd_a + jd_b) / 2.0
        if _speed_sign(mid, pid) == sign_a:
            jd_a = mid
        else:
            jd_b = mid
    return (jd_a + jd_b) / 2.0


def _scan_planet_retrogrades(year, month, pid):
    """扫描单颗行星当月逆行区间（裁切到当月），返回 (start_jd, end_jd) 列表或 None"""
    start_jd, end_jd = _month_bounds_jd(year, month)
    # 向前多扫一个步长，确保月首前已开始的逆行区间被正确识别
    t = start_jd - SCAN_STEP_DAYS
    signs = []
    while t <= end_jd + SCAN_STEP_DAYS:
        signs.append((t, _speed_sign(min(t, end_jd), pid)))
        t += SCAN_STEP_DAYS

    intervals = []
    cur_start = None
    for i in range(len(signs) - 1):
        t0, s0 = signs[i]
        t1, s1 = signs[i + 1]
        if s0 < 0 and cur_start is None:
            cur_start = t0  # 已进入逆行（或上月延续而来）
        if s0 != s1 and s0 != 0 and s1 != 0:
            # 速度符号翻转：二分定位停滞点
            station = _bisect_station(t0, t1, pid)
            if s0 > 0 and s1 < 0:
                cur_start = station  # 顺转逆
            elif s0 < 0 and s1 > 0:
                if cur_start is not None:
                    intervals.append((cur_start, station))
                cur_start = None
    # 月末仍在逆行：闭合到扫描末端
    if cur_start is not None and signs and signs[-1][1] < 0:
        intervals.append((cur_start, end_jd))

    # 裁切到当月
    clipped = []
    for a, b in intervals:
        lo = max(a, start_jd)
        hi = min(b, end_jd)
        if hi > lo:
            clipped.append((lo, hi))
    return clipped


def get_month_retrogrades(year, month):
    """当月有逆行发生的行星列表

    返回 [{planet_zh, sign_zh, start_date, end_date, note}]
    sign 取逆行区间中点的黄经所在星座
    """
    start_jd, end_jd = _month_bounds_jd(year, month)
    month_days = (end_jd - start_jd)
    out = []
    for key, pid, name_zh in RETRO_PLANETS:
        try:
            intervals = _scan_planet_retrogrades(year, month, pid)
        except Exception as e:
            logger.warning(f"{name_zh}逆行扫描失败: {e}")
            continue
        for a, b in (intervals or []):
            # 区间中点的星座
            mid = (a + b) / 2.0
            r = _planet_calc(mid, pid)
            sign_zh = ''
            if r is not None:
                sign_zh = _sign_degree(r[0])[0]
            # 备注：整月逆行 / 本月开始逆行 / 本月恢复顺行
            if (b - a) >= month_days - 0.02:
                note = '整月逆行'
            elif a > start_jd + 0.01 and b >= end_jd - 0.01:
                note = '本月开始逆行'
            elif a <= start_jd + 0.01 and b < end_jd - 0.01:
                note = '本月恢复顺行'
            else:
                note = '本月逆行'
            # 区间被裁切在月末时，结束日期回退 1 分钟显示为当月最后一天
            end_disp = b - (1.0 / 1440.0) if b >= end_jd - 0.001 else b
            out.append({
                'planet': key,
                'planet_zh': name_zh,
                'sign_zh': sign_zh,
                'start_date': _fmt_date_bj(a),
                'end_date': _fmt_date_bj(end_disp),
                'note': note
            })
    return out


# ==================== 新月 / 满月 ====================

def _elongation(jd):
    """(月亮黄经 - 太阳黄经) % 360"""
    rs = _planet_calc(jd, swe.SUN)
    rm = _planet_calc(jd, swe.MOON)
    if rs is None or rm is None:
        return None
    return (rm[0] - rs[0]) % 360.0


def _phase_func(jd, target):
    """月相目标函数：距目标夹角（target=0 新月 / 180 满月）的有向偏差，范围 (-180, 180]"""
    e = _elongation(jd)
    if e is None:
        return None
    return ((e - target + 180.0) % 360.0) - 180.0


def _bisect_phase(jd_a, jd_b, target):
    """二分法细化月相时刻到约 1 分钟"""
    fa = _phase_func(jd_a, target)
    while (jd_b - jd_a) > BISECT_TOL_DAYS:
        mid = (jd_a + jd_b) / 2.0
        fm = _phase_func(mid, target)
        if fm is None:
            break
        if (fa is not None and fa <= 0) == (fm <= 0):
            jd_a, fa = mid, fm
        else:
            jd_b = mid
    return (jd_a + jd_b) / 2.0


def _find_moon_phases(year, month, target):
    """日步长扫描当月月相（target=0 新月 / 180 满月），二分细化到分钟"""
    start_jd, end_jd = _month_bounds_jd(year, month)
    found = []
    t0 = start_jd
    f0 = _phase_func(t0, target)
    while t0 < end_jd:
        t1 = min(t0 + MOON_STEP_DAYS, end_jd)
        f1 = _phase_func(t1, target)
        if f0 is not None and f1 is not None and f0 <= 0 < f1:
            try:
                jd_phase = _bisect_phase(t0, t1, target)
                rs = _planet_calc(jd_phase, swe.SUN)
                lon = rs[0] if rs is not None else 0.0
                sign_zh, degree = _sign_degree(lon)
                found.append({
                    'datetime': _fmt_bj(jd_phase),
                    'sign_zh': sign_zh,
                    'degree': degree,
                    'longitude': round(lon % 360.0, 2)
                })
            except Exception as e:
                logger.warning(f"月相细化失败: {e}")
        t0, f0 = t1, f1
    return found


# ==================== 日食 / 月食 ====================

def _eclipse_type_label_solar(retflag):
    """日食类型标注"""
    if retflag & swe.ECL_ANNULAR_TOTAL:
        return '日食(全环食)'
    if retflag & swe.ECL_TOTAL:
        return '日食(日全食)'
    if retflag & swe.ECL_ANNULAR:
        return '日食(日环食)'
    return '日食'


def _eclipse_type_label_lunar(retflag):
    """月食类型标注"""
    if retflag & swe.ECL_TOTAL:
        return '月食(月全食)'
    if retflag & swe.ECL_PARTIAL:
        return '月食(月偏食)'
    return '月食'


def _eclipse_entry(jd_max, type_label):
    """组装一条日月食记录（食甚时刻的太阳黄经定星座度数）"""
    rs = _planet_calc(jd_max, swe.SUN)
    lon = rs[0] if rs is not None else 0.0
    sign_zh, degree = _sign_degree(lon)
    return {
        'type': type_label,
        'datetime': _fmt_bj(jd_max),
        'sign_zh': sign_zh,
        'degree': degree,
        'longitude': round(lon % 360.0, 2)
    }


def _find_eclipses_swe(year, month):
    """优先方案：swe.sol_eclipse_when_glob / swe.lun_eclipse_when 检索当月日月食"""
    start_jd, end_jd = _month_bounds_jd(year, month)
    found = []
    # 日食：从月初稍前开始顺序查找，收集食甚落在当月（北京时间）的条目
    try:
        t = start_jd - 1.0
        for _ in range(4):
            retflag, tret = swe.sol_eclipse_when_glob(t)
            jd_max = tret[0]
            if jd_max >= end_jd:
                break
            if start_jd - 1.0 <= jd_max < end_jd and _fmt_date_bj(jd_max) >= _fmt_date_bj(start_jd):
                if start_jd <= jd_max < end_jd:
                    found.append(_eclipse_entry(jd_max, _eclipse_type_label_solar(retflag)))
            t = jd_max + 1.0
    except Exception as e:
        logger.warning(f"swe 日食检索失败: {e}")
    # 月食
    try:
        t = start_jd - 1.0
        for _ in range(4):
            retflag, tret = swe.lun_eclipse_when(t)
            jd_max = tret[0]
            if jd_max >= end_jd:
                break
            if start_jd <= jd_max < end_jd:
                found.append(_eclipse_entry(jd_max, _eclipse_type_label_lunar(retflag)))
            t = jd_max + 1.0
    except Exception as e:
        logger.warning(f"swe 月食检索失败: {e}")
    found.sort(key=lambda x: x['datetime'])
    return found


def _node_distance_ok(jd):
    """降级判据：月亮距升/降交点角距 < 18°"""
    rm = _planet_calc(jd, swe.MOON)
    rn = _planet_calc(jd, swe.MEAN_NODE)
    if rm is None or rn is None:
        return False
    for node_lon in (rn[0], (rn[0] + 180.0) % 360.0):
        d = abs(rm[0] - node_lon) % 360.0
        d = min(d, 360.0 - d)
        if d < 18.0:
            return True
    return False


def _find_eclipses_fallback(year, month):
    """降级方案：新月/满月时月亮黄纬 |β|<1.5° 或距交点 <18° 判为食"""
    found = []
    for target, label in ((0.0, '日食'), (180.0, '月食')):
        for ph in _find_moon_phases(year, month, target):
            try:
                jd = _jd_from_beijing(datetime.strptime(ph['datetime'], '%Y-%m-%d %H:%M'))
                rm = _planet_calc(jd, swe.MOON)
                lat_ok = rm is not None and abs(rm[1]) < 1.5
                if lat_ok or _node_distance_ok(jd):
                    entry = dict(ph)
                    entry['type'] = label
                    found.append(entry)
            except Exception as e:
                logger.warning(f"降级日月食判定失败: {e}")
    found.sort(key=lambda x: x['datetime'])
    return found


def get_month_eclipses(year, month):
    """当月日月食列表（优先 swe 内置检索，失败时降级为月相+黄纬/交点判据）"""
    try:
        eclipses = _find_eclipses_swe(year, month)
        if eclipses or _swe_eclipse_available():
            return eclipses
    except Exception as e:
        logger.warning(f"日月食检索异常，启用降级算法: {e}")
    return _find_eclipses_fallback(year, month)


def _swe_eclipse_available():
    """探测 swe 日月食函数是否可用"""
    return hasattr(swe, 'sol_eclipse_when_glob') and hasattr(swe, 'lun_eclipse_when')


# ==================== 主入口 ====================

def get_month_events(year, month, natal_sun_sign_zh=None, natal_asc_sign_zh=None):
    """当月天文事件汇总

    返回 {
      'retrogrades': [{planet_zh, sign_zh, start_date, end_date, note}],
      'new_moons':   [{datetime, sign_zh, degree, longitude}],
      'full_moons':  [{datetime, sign_zh, degree, longitude}],
      'eclipses':    [{type, datetime, sign_zh, degree, longitude}]
    }
    所有时间均为北京时间；任何子步骤异常都局部降级为空列表
    """
    events = {'retrogrades': [], 'new_moons': [], 'full_moons': [], 'eclipses': []}
    try:
        events['retrogrades'] = get_month_retrogrades(year, month)
    except Exception as e:
        logger.warning(f"月度逆行计算失败: {e}")
    try:
        events['new_moons'] = _find_moon_phases(year, month, 0.0)
    except Exception as e:
        logger.warning(f"新月计算失败: {e}")
    try:
        events['full_moons'] = _find_moon_phases(year, month, 180.0)
    except Exception as e:
        logger.warning(f"满月计算失败: {e}")
    try:
        events['eclipses'] = get_month_eclipses(year, month)
    except Exception as e:
        logger.warning(f"日月食计算失败: {e}")
    return events

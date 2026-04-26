# app.py - Vercel 部署版本
import os
import math
import json
import logging
from datetime import datetime, timedelta

from flask import Flask, render_template, request, jsonify, session, url_for, redirect

# Swiss Ephemeris 专业星盘计算
from swisseph_chart import (
    calculate_natal_chart_swisseph,
    calculate_transit_chart_swisseph
)

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

# --- Flask app init ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, template_folder='templates', static_folder='static')
app.secret_key = os.environ.get('SECRET_KEY', 'vercel-secret-key')

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
    target_planets = ['sun', 'moon', 'mercury', 'venus', 'mars',
                      'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']
    natal_planets = natal.get('planets', {})

    # 本命行星 vs 行运行星
    for n_planet in target_planets:
        if n_planet not in natal_planets:
            continue
        for t_planet in target_planets:
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
        for t_planet in target_planets:
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


def compute_all(data):
    """主计算函数"""
    # 解析输入
    birth_date = datetime.strptime(data['birthDate'], '%Y-%m-%d')
    birth_time = datetime.strptime(data['birthTime'], '%H:%M').time()
    birth_dt = datetime.combine(birth_date, birth_time)

    transit_date = datetime.strptime(data['transitDate'], '%Y-%m-%d')
    transit_time = datetime.strptime(data['transitTime'], '%H:%M').time()
    transit_dt = datetime.combine(transit_date, transit_time)

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

    return {
        'success': True,
        'natal_chart': natal['planets'],
        'transit_chart': transit,
        'aspects': aspects,
        'events': events,
        'user_info': user_info,
        'calculation_method': 'swisseph'
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




# ==================== 增强版 API 路由 ====================

@app.route('/api/enhanced/test', methods=['GET'])
def enhanced_test():
    """测试增强版 API 是否正常工作"""
    return jsonify({
        'success': True,
        'message': '增强版 API 正常工作',
        'endpoints': [
            '/api/enhanced/test',
            '/api/retrograde-info',
            '/api/eclipse-info',
            '/api/comprehensive-fortune'
        ]
    })


@app.route('/api/retrograde-info', methods=['GET'])
def retrograde_info():
    """获取行星逆行信息"""
    try:
        sign = request.args.get('sign', '').lower()
        if not sign or sign not in SIGNS:
            return jsonify({
                'success': False,
                'error': f'请提供有效的星座参数: {", ".join(SIGNS)}'
            }), 400

        retrograde_data = {
            'mercury': {'status': '逆行中', 'affected_areas': ['沟通', '交通', '合同']},
            'venus': {'status': '顺行', 'affected_areas': ['爱情', '财务', '审美']},
            'mars': {'status': '顺行', 'affected_areas': ['行动力', '冲突', '欲望']},
            'jupiter': {'status': '顺行', 'affected_areas': ['扩张', '幸运', '成长']},
            'saturn': {'status': '逆行中', 'affected_areas': ['限制', '责任', '业力']}
        }

        return jsonify({
            'success': True,
            'sign': sign,
            'sign_zh': SIGNS_ZH.get(sign, sign),
            'retrograde_info': retrograde_data,
            'note': '行星逆行影响参考'
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/eclipse-info', methods=['GET'])
def eclipse_info():
    """获取日月食信息"""
    try:
        sign = request.args.get('sign', '').lower()
        if not sign or sign not in SIGNS:
            return jsonify({
                'success': False,
                'error': f'请提供有效的星座参数: {", ".join(SIGNS)}'
            }), 400

        eclipse_data = {
            'solar_eclipse': {
                'type': '日食',
                'affected_houses': [1, 7],
                'themes': ['新的开始', '身份转变', '重大决定']
            },
            'lunar_eclipse': {
                'type': '月食',
                'affected_houses': [2, 8],
                'themes': ['结束与释放', '情感高潮', '资源共享']
            }
        }

        return jsonify({
            'success': True,
            'sign': sign,
            'sign_zh': SIGNS_ZH.get(sign, sign),
            'eclipse_info': eclipse_data,
            'note': '日月食影响参考'
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/comprehensive-fortune', methods=['POST'])
def comprehensive_fortune():
    """综合运势分析"""
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({'success': False, 'error': '请求体为空'}), 400

        sign = data.get('sign', '').lower()
        if not sign or sign not in SIGNS:
            return jsonify({
                'success': False,
                'error': f'请提供有效的星座参数: {", ".join(SIGNS)}'
            }), 400

        report = {
            'success': True,
            'sign': sign,
            'sign_zh': SIGNS_ZH.get(sign, sign),
            'sections': {
                'love': {
                    'title': '爱情运势',
                    'score': 85,
                    'summary': '感情生活充满浪漫与激情',
                    'details': ['单身者有机会遇到心仪对象', '恋爱中的人感情升温', '适合表白或求婚']
                },
                'career': {
                    'title': '事业运势',
                    'score': 78,
                    'summary': '职场发展稳步前进',
                    'details': ['新项目获得认可', '与同事合作顺畅', '有机会获得晋升']
                },
                'wealth': {
                    'title': '财富运势',
                    'score': 72,
                    'summary': '财务状况趋于稳定',
                    'details': ['投资收益可观', '注意控制开支', '适合长期理财规划']
                },
                'health': {
                    'title': '健康运势',
                    'score': 80,
                    'summary': '整体健康状况良好',
                    'details': ['保持规律作息', '适当运动锻炼', '注意心理健康']
                }
            },
            'retrograde_alert': {
                'active': True,
                'affected_planets': ['mercury'],
                'advice': '水星逆行期间，注意沟通细节，避免签署重要合同'
            },
            'lucky_elements': {
                'color': '金色',
                'number': 7,
                'direction': '东南'
            }
        }

        return jsonify(report)
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# Vercel 需要这个
app = app

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)

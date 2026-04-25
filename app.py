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
    calculate_transit_chart_swisseph,
    calculate_aspects_swisseph
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
    'ascendant': '上升星座', 'mc': '天顶'
}


def _add_display_fields(planets):
    """为行星数据添加中文显示字段，并将星座名转为小写以兼容前端"""
    for key, p in planets.items():
        p['sign'] = p.get('sign', '').lower()
        p['name_zh'] = PLANET_NAMES.get(key, key)
        p['sign_zh'] = SIGNS_ZH.get(p['sign'], p['sign'])


def calculate_natal_chart(birth_dt, lon=116.4, lat=39.9):
    """使用 Swiss Ephemeris 计算本命盘"""
    result = calculate_natal_chart_swisseph(birth_dt, lon, lat)
    _add_display_fields(result['planets'])
    return result


def calculate_transit_chart(transit_dt, natal_chart, lon=116.4, lat=39.9):
    """使用 Swiss Ephemeris 计算行运盘"""
    transit = calculate_transit_chart_swisseph(transit_dt, natal_chart, lon, lat)
    _add_display_fields(transit)
    return transit


def calculate_aspects(natal, transit):
    """使用 Swiss Ephemeris 计算相位"""
    return calculate_aspects_swisseph(natal, transit)


def compute_all(data):
    """主计算函数"""
    # 解析输入
    birth_date = datetime.strptime(data['birthDate'], '%Y-%m-%d')
    birth_time = datetime.strptime(data['birthTime'], '%H:%M').time()
    birth_dt = datetime.combine(birth_date, birth_time)

    transit_date = datetime.strptime(data['transitDate'], '%Y-%m-%d')
    transit_time = datetime.strptime(data['transitTime'], '%H:%M').time()
    transit_dt = datetime.combine(transit_date, transit_time)

    # 计算星盘
    natal = calculate_natal_chart(birth_dt)
    transit = calculate_transit_chart(transit_dt, natal)
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


# Vercel 需要这个
app = app

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)

"""
腾讯云轻量应用服务器适配版本
基于 Flask 的星盘查询系统 - 生产环境配置
"""
import os
import math
import json
import logging
from datetime import datetime, timedelta

from flask import Flask, render_template, request, jsonify, session, url_for, redirect

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('/var/log/astrology/app.log')
    ]
)
logger = logging.getLogger(__name__)

# --- Flask app init ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, template_folder='templates', static_folder='static')

# 生产环境密钥 - 请修改此密钥
app.secret_key = os.environ.get('SECRET_KEY', 'tencent-lighthouse-secret-key-change-in-production')

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

# 简化版星盘计算（不使用 Swiss Ephemeris）
def calculate_natal_chart(birth_dt, lon=116.4, lat=39.9):
    """简化版本命盘计算"""
    year = birth_dt.year
    month = birth_dt.month
    day = birth_dt.day
    hour = birth_dt.hour
    
    # 简化计算：基于日期估算太阳星座
    month_day = month * 100 + day
    sun_sign_idx = 0
    
    if month_day >= 321 and month_day <= 419:
        sun_sign_idx = 0  # 白羊座
    elif month_day >= 420 and month_day <= 520:
        sun_sign_idx = 1  # 金牛座
    elif month_day >= 521 and month_day <= 620:
        sun_sign_idx = 2  # 双子座
    elif month_day >= 621 and month_day <= 722:
        sun_sign_idx = 3  # 巨蟹座
    elif month_day >= 723 and month_day <= 822:
        sun_sign_idx = 4  # 狮子座
    elif month_day >= 823 and month_day <= 922:
        sun_sign_idx = 5  # 处女座
    elif month_day >= 923 and month_day <= 1022:
        sun_sign_idx = 6  # 天秤座
    elif month_day >= 1023 and month_day <= 1121:
        sun_sign_idx = 7  # 天蝎座
    elif month_day >= 1122 and month_day <= 1221:
        sun_sign_idx = 8  # 射手座
    elif month_day >= 1222 or month_day <= 119:
        sun_sign_idx = 9  # 摩羯座
    elif month_day >= 120 and month_day <= 218:
        sun_sign_idx = 10  # 水瓶座
    else:
        sun_sign_idx = 11  # 双鱼座
    
    # 构建行星位置（简化版）
    planets = {
        'sun': {
            'sign': SIGNS[sun_sign_idx],
            'sign_zh': SIGNS_ZH[SIGNS[sun_sign_idx]],
            'degree': (day % 30),
            'house': 1,
            'name_zh': '太阳'
        },
        'moon': {
            'sign': SIGNS[(sun_sign_idx + 2) % 12],
            'sign_zh': SIGNS_ZH[SIGNS[(sun_sign_idx + 2) % 12]],
            'degree': ((day + 5) % 30),
            'house': 3,
            'name_zh': '月亮'
        },
        'mercury': {
            'sign': SIGNS[sun_sign_idx],
            'sign_zh': SIGNS_ZH[SIGNS[sun_sign_idx]],
            'degree': ((day + 2) % 30),
            'house': 1,
            'name_zh': '水星'
        },
        'venus': {
            'sign': SIGNS[(sun_sign_idx + 1) % 12],
            'sign_zh': SIGNS_ZH[SIGNS[(sun_sign_idx + 1) % 12]],
            'degree': ((day + 7) % 30),
            'house': 2,
            'name_zh': '金星'
        },
        'mars': {
            'sign': SIGNS[(sun_sign_idx + 3) % 12],
            'sign_zh': SIGNS_ZH[SIGNS[(sun_sign_idx + 3) % 12]],
            'degree': ((day + 12) % 30),
            'house': 4,
            'name_zh': '火星'
        },
        'jupiter': {
            'sign': SIGNS[(sun_sign_idx + 4) % 12],
            'sign_zh': SIGNS_ZH[SIGNS[(sun_sign_idx + 4) % 12]],
            'degree': ((day + 15) % 30),
            'house': 5,
            'name_zh': '木星'
        },
        'saturn': {
            'sign': SIGNS[(sun_sign_idx + 5) % 12],
            'sign_zh': SIGNS_ZH[SIGNS[(sun_sign_idx + 5) % 12]],
            'degree': ((day + 20) % 30),
            'house': 6,
            'name_zh': '土星'
        },
        'ascendant': {
            'sign': SIGNS[(sun_sign_idx + hour // 2) % 12],
            'sign_zh': SIGNS_ZH[SIGNS[(sun_sign_idx + hour // 2) % 12]],
            'degree': (hour * 2) % 30,
            'house': 1,
            'name_zh': '上升星座'
        }
    }
    
    return {'planets': planets}

def calculate_transit_chart(transit_dt, natal_chart, lon=116.4, lat=39.9):
    """简化版行运盘计算"""
    year = transit_dt.year
    month = transit_dt.month
    day = transit_dt.day
    
    month_day = month * 100 + day
    sun_sign_idx = 0
    
    if month_day >= 321 and month_day <= 419:
        sun_sign_idx = 0
    elif month_day >= 420 and month_day <= 520:
        sun_sign_idx = 1
    elif month_day >= 521 and month_day <= 620:
        sun_sign_idx = 2
    elif month_day >= 621 and month_day <= 722:
        sun_sign_idx = 3
    elif month_day >= 723 and month_day <= 822:
        sun_sign_idx = 4
    elif month_day >= 823 and month_day <= 922:
        sun_sign_idx = 5
    elif month_day >= 923 and month_day <= 1022:
        sun_sign_idx = 6
    elif month_day >= 1023 and month_day <= 1121:
        sun_sign_idx = 7
    elif month_day >= 1122 and month_day <= 1221:
        sun_sign_idx = 8
    elif month_day >= 1222 or month_day <= 119:
        sun_sign_idx = 9
    elif month_day >= 120 and month_day <= 218:
        sun_sign_idx = 10
    else:
        sun_sign_idx = 11
    
    transit = {
        'sun': {
            'sign': SIGNS[sun_sign_idx],
            'sign_zh': SIGNS_ZH[SIGNS[sun_sign_idx]],
            'degree': (day % 30),
            'house': 1,
            'name_zh': '太阳'
        },
        'moon': {
            'sign': SIGNS[(sun_sign_idx + 2) % 12],
            'sign_zh': SIGNS_ZH[SIGNS[(sun_sign_idx + 2) % 12]],
            'degree': ((day + 5) % 30),
            'house': 3,
            'name_zh': '月亮'
        },
        'mercury': {
            'sign': SIGNS[sun_sign_idx],
            'sign_zh': SIGNS_ZH[SIGNS[sun_sign_idx]],
            'degree': ((day + 3) % 30),
            'house': 1,
            'name_zh': '水星'
        },
        'venus': {
            'sign': SIGNS[(sun_sign_idx + 1) % 12],
            'sign_zh': SIGNS_ZH[SIGNS[(sun_sign_idx + 1) % 12]],
            'degree': ((day + 8) % 30),
            'house': 2,
            'name_zh': '金星'
        },
        'mars': {
            'sign': SIGNS[(sun_sign_idx + 4) % 12],
            'sign_zh': SIGNS_ZH[SIGNS[(sun_sign_idx + 4) % 12]],
            'degree': ((day + 14) % 30),
            'house': 5,
            'name_zh': '火星'
        },
        'jupiter': {
            'sign': SIGNS[(sun_sign_idx + 3) % 12],
            'sign_zh': SIGNS_ZH[SIGNS[(sun_sign_idx + 3) % 12]],
            'degree': ((day + 18) % 30),
            'house': 4,
            'name_zh': '木星'
        },
        'saturn': {
            'sign': SIGNS[(sun_sign_idx + 6) % 12],
            'sign_zh': SIGNS_ZH[SIGNS[(sun_sign_idx + 6) % 12]],
            'degree': ((day + 22) % 30),
            'house': 7,
            'name_zh': '土星'
        }
    }
    
    return transit

def calculate_aspects(natal, transit):
    """简化版相位计算"""
    aspects = []
    natal_planets = natal.get('planets', {})
    
    for natal_key, natal_data in natal_planets.items():
        for transit_key, transit_data in transit.items():
            if natal_key == transit_key:
                continue
            
            natal_idx = SIGNS.index(natal_data['sign'])
            transit_idx = SIGNS.index(transit_data['sign'])
            
            diff = abs(natal_idx - transit_idx)
            if diff > 6:
                diff = 12 - diff
            
            aspect_name = None
            aspect_degree = None
            
            if diff == 0:
                aspect_name = '合相'
                aspect_degree = 0
            elif diff == 2:
                aspect_name = '六分相'
                aspect_degree = 60
            elif diff == 3:
                aspect_name = '四分相'
                aspect_degree = 90
            elif diff == 4:
                aspect_name = '三分相'
                aspect_degree = 120
            elif diff == 6:
                aspect_name = '对分相'
                aspect_degree = 180
            
            if aspect_name:
                aspects.append({
                    'natal_planet': natal_key,
                    'natal_planet_zh': natal_data['name_zh'],
                    'natal_sign': natal_data['sign'],
                    'natal_sign_zh': natal_data['sign_zh'],
                    'transit_planet': transit_key,
                    'transit_planet_zh': transit_data['name_zh'],
                    'transit_sign': transit_data['sign'],
                    'transit_sign_zh': transit_data['sign_zh'],
                    'aspect_name': aspect_name,
                    'aspect_degree': aspect_degree,
                    'deviation': abs(natal_data['degree'] - transit_data['degree'])
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
        'calculation_method': 'simplified'
    }

# ---------- Flask 路由 ----------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate_route():
    try:
        data = request.get_json(force=True)
        logger.info(f"Received calculation request from {request.remote_addr}")
        
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

@app.route('/health')
def health_check():
    """健康检查端点"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

# WSGI 入口
application = app

if __name__ == '__main__':
    # 开发环境使用，生产环境使用 Gunicorn
    app.run(host='0.0.0.0', port=8000, debug=False)

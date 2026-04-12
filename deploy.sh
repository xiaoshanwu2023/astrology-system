#!/bin/bash
# 星盘系统部署脚本
# 在服务器上执行: bash deploy.sh

echo "🚀 开始部署星盘系统..."

# 1. 更新系统
echo "📦 更新系统..."
sudo apt update -y
sudo apt upgrade -y

# 2. 安装 Python 和依赖
echo "🐍 安装 Python..."
sudo apt install -y python3 python3-pip python3-venv nginx git

# 3. 创建项目目录
echo "📁 创建项目目录..."
mkdir -p ~/astrology-system
cd ~/astrology-system

# 4. 克隆代码
echo "📥 下载代码..."
git clone https://github.com/xiaoshanwu2023/astrology-system.git .

# 5. 创建虚拟环境
echo "🌐 创建虚拟环境..."
python3 -m venv venv
source venv/bin/activate

# 6. 安装依赖
echo "📦 安装依赖..."
pip install --upgrade pip
pip install flask pandas openpyxl pytz numpy python-dateutil six

# 7. 恢复原始 app.py（完整版）
echo "🔧 配置应用..."
cat > app.py << 'EOF'
# app.py - 完整版（包含 Swiss Ephemeris）
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
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')

# --- Paths ---
ASTRO_XLSX = os.path.join(BASE_DIR, 'data', 'astrology_v2.xlsx')

# 读取 Excel 数据
ASTROLOGY_DATA = {}
if os.path.exists(ASTRO_XLSX):
    try:
        ASTROLOGY_DATA['sign_events'] = pd.read_excel(ASTRO_XLSX, sheet_name='星座基础事件', dtype=str).fillna('')
        ASTROLOGY_DATA['planet_events'] = pd.read_excel(ASTRO_XLSX, sheet_name='行星落入事件', dtype=str).fillna('')
        ASTROLOGY_DATA['aspect_events'] = pd.read_excel(ASTRO_XLSX, sheet_name='相位事件', dtype=str).fillna('')
        print(f"[INFO] Loaded astrology_v2.xlsx successfully")
    except Exception as e:
        print(f"[ERROR] Failed to load astrology_v2.xlsx: {e}")
        ASTROLOGY_DATA = {}
else:
    print(f"[WARN] astrology_v2.xlsx not found")

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

# 主要相位
MAJOR_ASPECTS = {
    0: ('合相', 'conjunction'),
    60: ('六分相', 'sextile'),
    90: ('四分相', 'square'),
    120: ('三分相', 'trine'),
    180: ('对分相', 'opposition')
}

def compute_all(data):
    """主计算函数"""
    # 解析输入
    birth_date = datetime.strptime(data['birthDate'], '%Y-%m-%d')
    birth_time = datetime.strptime(data['birthTime'], '%H:%M').time()
    birth_dt_local = datetime.combine(birth_date, birth_time)

    transit_date = datetime.strptime(data['transitDate'], '%Y-%m-%d')
    transit_time = datetime.strptime(data['transitTime'], '%H:%M').time()
    transit_dt_local = datetime.combine(transit_date, transit_time)
    
    # 解析经纬度
    lon, lat = 116.4, 39.9  # 默认北京
    if 'coordinates' in data and data['coordinates']:
        try:
            coords = data['coordinates'].split(',')
            lon = float(coords[0])
            lat = float(coords[1])
        except:
            pass
    
    # 解析时区
    timezone_offset = 8.0
    if 'timezone' in data and data['timezone']:
        try:
            timezone_offset = float(data['timezone'])
        except:
            pass
    
    # 转换为 UTC
    from datetime import timedelta
    birth_dt_utc = birth_dt_local - timedelta(hours=timezone_offset)
    transit_dt_utc = transit_dt_local - timedelta(hours=timezone_offset)
    
    logger.info(f"本地时间: {birth_dt_local}, UTC: {birth_dt_utc}")

    # 使用 Swiss Ephemeris 计算
    if SWISSEPH_AVAILABLE:
        logger.info("使用 Swiss Ephemeris 计算星盘")
        natal = calculate_natal_chart_swisseph(birth_dt_utc, lon, lat)
        transit = calculate_transit_chart_swisseph(transit_dt_utc, natal, lon, lat)
        aspects = calculate_aspects_swisseph(natal, transit)
        signs_zh = SWE_SIGNS_ZH
        planet_names = SWE_PLANET_NAMES
    else:
        logger.error("Swiss Ephemeris 不可用")
        return {'success': False, 'error': 'Swiss Ephemeris 计算模块未加载'}

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

    # 构建用户信息
    user_info = {}
    if 'name' in data and data['name']:
        user_info['name'] = data['name']
    user_info['birth_date'] = data['birthDate']
    user_info['birth_time'] = data['birthTime']
    location_parts = []
    if 'province' in data and data['province']:
        location_parts.append(data['province'])
    if 'city' in data and data['city']:
        location_parts.append(data['city'])
    if location_parts:
        user_info['birth_location'] = ''.join(location_parts)
    else:
        user_info['birth_location'] = '北京'

    return {
        'success': True,
        'natal_chart': natal_brief,
        'transit_chart': transit_brief,
        'aspects': aspects,
        'events': events,
        'user_info': user_info,
        'calculation_method': 'swisseph'
    }

def search_astrology_events(natal_sun, natal_asc, aspects, transit_chart):
    """检索占星事件"""
    events = {
        'sun_sign': [],
        'asc_sign': [],
        'planet_events': [],
        'aspect_events': []
    }
    
    if not ASTROLOGY_DATA:
        return events
    
    # 太阳星座特质
    if natal_sun and 'sign_events' in ASTROLOGY_DATA:
        sun_data = ASTROLOGY_DATA['sign_events'][ASTROLOGY_DATA['sign_events']['sign'] == natal_sun]
        if not sun_data.empty:
            events['sun_sign'] = sun_data['description'].tolist()[:3]
    
    # 上升星座影响
    if natal_asc and 'sign_events' in ASTROLOGY_DATA:
        asc_data = ASTROLOGY_DATA['sign_events'][ASTROLOGY_DATA['sign_events']['sign'] == natal_asc]
        if not asc_data.empty:
            events['asc_sign'] = asc_data['description'].tolist()[:2]
    
    # 行星落入事件
    if 'planet_events' in ASTROLOGY_DATA:
        for planet, info in transit_chart.items():
            if planet == 'ascendant':
                continue
            sign = info.get('sign')
            house = info.get('house')
            if sign and house:
                pe = ASTROLOGY_DATA['planet_events'][
                    (ASTROLOGY_DATA['planet_events']['planet'] == planet) &
                    (ASTROLOGY_DATA['planet_events']['sign'] == sign)
                ]
                if not pe.empty:
                    events['planet_events'].append({
                        'planet': PLANET_NAMES.get(planet, planet),
                        'sign': SIGNS_ZH.get(sign, sign),
                        'house': house,
                        'events': pe['description'].tolist()[:2]
                    })
    
    # 相位事件
    if 'aspect_events' in ASTROLOGY_DATA and aspects:
        for aspect in aspects[:8]:
            natal_pl = aspect['natal_planet']
            transit_pl = aspect['transit_planet']
            aspect_name = aspect['aspect_name']
            
            ae = ASTROLOGY_DATA['aspect_events'][
                (ASTROLOGY_DATA['aspect_events']['planet_a'] == natal_pl) &
                (ASTROLOGY_DATA['aspect_events']['aspect_type'] == aspect_name) &
                (ASTROLOGY_DATA['aspect_events']['planet_b'] == transit_pl)
            ]
            if not ae.empty:
                events['aspect_events'].append({
                    'planet_a_zh': aspect['natal_planet_zh'],
                    'aspect_type': aspect_name,
                    'planet_b_zh': aspect['transit_planet_zh'],
                    'events': ae['description'].tolist()[:2]
                })
    
    return events

# ---------- Flask 路由 ----------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate_route():
    try:
        data = request.get_json(force=True)
        logger.info(f"Received calculation request: {data}")
        
        required_fields = ['birthDate', 'birthTime', 'transitDate', 'transitTime']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'success': False, 'error': f'缺少必填字段: {field}'}), 400
        
        result = compute_all(data)
        if result.get('success'):
            session['result'] = result
        return jsonify(result)
    except Exception as e:
        logger.exception("Error during calculation")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/result')
def result_page():
    result = session.get('result')
    if not result:
        return redirect(url_for('index'))
    return render_template('result.html', data=result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)
EOF

# 8. 配置 Nginx
echo "🌐 配置 Nginx..."
sudo tee /etc/nginx/sites-available/astrology << 'EOF'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:5001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static {
        alias /home/ubuntu/astrology-system/static;
        expires 30d;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/astrology /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# 9. 创建系统服务
echo "⚙️ 创建系统服务..."
sudo tee /etc/systemd/system/astrology.service << 'EOF'
[Unit]
Description=Astrology System
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/astrology-system
Environment="PATH=/home/ubuntu/astrology-system/venv/bin"
Environment="SECRET_KEY=your-secret-key-change-this"
ExecStart=/home/ubuntu/astrology-system/venv/bin/python app.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable astrology
sudo systemctl start astrology

# 10. 完成
echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 访问地址: http://124.222.23.22"
echo ""
echo "📋 常用命令:"
echo "  查看状态: sudo systemctl status astrology"
echo "  查看日志: sudo tail -f /home/ubuntu/astrology-system/app.log"
echo "  重启服务: sudo systemctl restart astrology"
echo ""

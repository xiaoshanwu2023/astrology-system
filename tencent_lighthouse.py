"""
腾讯云轻量应用服务器适配版本
基于 Flask 的星盘查询系统 - 生产环境配置
使用 Swiss Ephemeris 专业级星盘计算
"""
import os
import math
import json
import logging
from datetime import datetime, timedelta

from flask import Flask, render_template, request, jsonify, session, url_for, redirect

# 星盘计算统一核心（与 app.py 共用）
from chart_core import (
    calculate_natal_chart,
    calculate_transit_chart,
    calculate_aspects,
    slim_for_session,
    attach_readings,
    SIGNS,
    SIGNS_ZH,
    PLANET_NAMES
)
from chart_core import compute_all as _compute_all_core

# 配置日志 - 腾讯云生产环境
# 本地开发没有 /var/log/astrology 目录时优雅降级为仅控制台输出
_log_handlers = [logging.StreamHandler()]
try:
    _log_handlers.append(logging.FileHandler('/var/log/astrology/app.log'))
except OSError:
    pass
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=_log_handlers
)
logger = logging.getLogger(__name__)

# --- Flask app init ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, template_folder='templates', static_folder='static')

# 生产环境密钥 - 请修改此密钥
app.secret_key = os.environ.get('SECRET_KEY', 'tencent-lighthouse-secret-key-change-in-production')


def compute_all(data):
    """生产环境主计算函数：固定北京坐标/东八区（历史行为保持不变）"""
    return _compute_all_core(data, fixed_beijing=True)

# 星座数据与相位计算逻辑已统一收拢到 chart_core.py；
# 本文件的 calculate_natal_chart / calculate_transit_chart 直接复用核心版，
# 签名中的 timezone_offset 由核心函数默认 8.0 覆盖（生产环境固定东八区）。


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
        # 解读文案体积大，session 只存核心结果，渲染时再重算（见 chart_core）
        session['result'] = slim_for_session(result)
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
        # session 中未存解读文案，渲染前重算挂载（旧 session 数据也兼容）
        return render_template('result.html', data=attach_readings(result))
    except Exception as e:
        logger.exception("Error rendering result page")
        return render_template('error.html', error_message='显示结果时出错，请重试'), 500


@app.route('/health')
def health_check():
    """健康检查端点"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})


# WSGI 入口
application = app

# 注册增强 API 路由（运势解读等）
try:
    from enhanced_api_routes import create_enhanced_routes
    create_enhanced_routes(app)
    logger.info("增强 API 路由已注册")
except Exception as e:
    logger.warning(f"增强 API 路由注册失败: {e}")

try:
    from fortune_priority_system import create_priority_routes
    create_priority_routes(app)
    logger.info("优先级路由已注册")
except Exception as e:
    logger.warning(f"优先级路由注册失败: {e}")

if __name__ == '__main__':
    # 开发环境使用，生产环境使用 Gunicorn
    app.run(host='0.0.0.0', port=8000, debug=False)

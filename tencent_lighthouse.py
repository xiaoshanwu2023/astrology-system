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
    """生产环境主计算函数：使用请求中的出生地坐标/时区

    fixed_beijing=False：用户出生城市经纬度真正参与本命盘/行运盘计算；
    坐标缺失时 chart_core 内部回退北京坐标+东八区，行为安全。
    """
    return _compute_all_core(data, fixed_beijing=False)

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
        # session（cookie）上限约4KB，完整结果远超此限。
        # 只存表单输入（几百字节），/result 渲染时全量重算（确定性计算，毫秒级）。
        session['calc_input'] = data
        session.pop('result', None)  # 清掉旧版残留的大对象
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
        result = None
        # 新方式：session 只存表单输入，此处全量重算（含相位/解读/天象）
        calc_input = session.get('calc_input')
        if isinstance(calc_input, dict) and calc_input.get('birthDate'):
            try:
                result = compute_all(calc_input)
            except Exception as e:
                logger.exception(f"Recompute from calc_input failed: {e}")
                result = None
        # 兼容旧 session（存的是瘦身后的完整结果）
        if result is None:
            legacy = session.get('result')
            if legacy:
                if not isinstance(legacy, dict):
                    logger.error(f"Invalid result format: {type(legacy)}")
                    return redirect(url_for('index'))
                result = attach_readings(legacy)
        if not result:
            logger.warning("No result found in session, redirecting to index")
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

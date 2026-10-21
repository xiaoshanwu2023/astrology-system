# app.py - Vercel 部署版本
import os
import math
import json
import logging
from datetime import datetime, timedelta

from flask import Flask, render_template, request, jsonify, session, url_for, redirect

# 星盘计算统一核心（与 tencent_lighthouse.py 共用）
from chart_core import (
    calculate_natal_chart,
    calculate_transit_chart,
    calculate_aspects,
    compute_all,
    slim_for_session,
    attach_readings,
    SIGNS,
    SIGNS_ZH,
    PLANET_NAMES
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

# 星座数据与相位计算逻辑已统一收拢到 chart_core.py，
# 此处仅保留 Flask 路由与增强版 API。


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

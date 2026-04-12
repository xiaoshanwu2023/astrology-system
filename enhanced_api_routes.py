#!/usr/bin/env python3
"""
增强版运势API - Flask路由集成
支持行星逆行、日月食查询

使用方式:
    from enhanced_api_routes import create_enhanced_routes
    
    app = Flask(__name__)
    create_enhanced_routes(app)
"""

import csv
import json
from pathlib import Path
from datetime import datetime
from collections import defaultdict

# 数据文件路径
DATA_DIR = Path(__file__).parent / 'fortune_data' / 'enhanced'

class EnhancedFortuneAPI:
    """增强版运势API"""
    
    def __init__(self):
        self.planet_house_data = []
        self.aspect_data = []
        self.retrograde_data = []
        self.eclipse_data = []
        self.load_data()
    
    def load_data(self):
        """加载所有数据"""
        # 加载行星宫位数据
        house_file = DATA_DIR / 'planet_house_from_notes.csv'
        if house_file.exists():
            with open(house_file, 'r', encoding='utf-8-sig') as f:
                self.planet_house_data = list(csv.DictReader(f))
        
        # 加载相位数据
        aspect_file = DATA_DIR / 'aspect_from_notes.csv'
        if aspect_file.exists():
            with open(aspect_file, 'r', encoding='utf-8-sig') as f:
                self.aspect_data = list(csv.DictReader(f))
        
        # 加载逆行数据
        retrograde_file = DATA_DIR / 'retrograde_info.csv'
        if retrograde_file.exists():
            with open(retrograde_file, 'r', encoding='utf-8-sig') as f:
                self.retrograde_data = list(csv.DictReader(f))
        
        # 加载日月食数据
        eclipse_file = DATA_DIR / 'eclipse_info.csv'
        if eclipse_file.exists():
            with open(eclipse_file, 'r', encoding='utf-8-sig') as f:
                self.eclipse_data = list(csv.DictReader(f))
        
        print(f"✅ 增强版数据加载完成:")
        print(f"   - 行星宫位: {len(self.planet_house_data)} 条")
        print(f"   - 相位: {len(self.aspect_data)} 条")
        print(f"   - 逆行信息: {len(self.retrograde_data)} 条 ⭐")
        print(f"   - 日月食: {len(self.eclipse_data)} 条 ⭐")
    
    def get_retrograde_info(self, date=None, planet=None, sign=None):
        """查询行星逆行信息"""
        results = []
        
        for item in self.retrograde_data:
            if planet and item['planet'] != planet:
                continue
            if sign and item['source_sign'] != sign:
                continue
            
            reading = item['reading']
            is_retro = item.get('is_retrograde') == 'True'
            is_direct = item.get('is_direct') == 'True'
            
            status = "逆行中" if is_retro else "顺行"
            if is_direct:
                status = "顺行"
            
            affected_areas = self._get_planet_areas(item['planet'])
            advice = self._extract_advice_from_reading(reading)
            
            results.append({
                'planet': item['planet'],
                'status': status,
                'is_retrograde': is_retro,
                'reading': reading[:300] + '...' if len(reading) > 300 else reading,
                'affected_areas': affected_areas,
                'advice': advice,
                'source_month': item.get('source_month', ''),
                'source_sign': item.get('source_sign', '')
            })
        
        # 去重
        seen = set()
        unique_results = []
        for r in results:
            key = (r['planet'], r['source_month'])
            if key not in seen:
                seen.add(key)
                unique_results.append(r)
        
        return unique_results[:20]
    
    def get_eclipse_info(self, start_date=None, end_date=None, sign=None):
        """查询日月食信息"""
        results = []
        
        for item in self.eclipse_data:
            if sign and item.get('source_sign') != sign:
                continue
            
            eclipse_type = item.get('type', '未知')
            house = item.get('house', '')
            house_name = self._get_house_name(house)
            
            related_planets = item.get('related_planets', '').split(',') if item.get('related_planets') else []
            themes = self._extract_themes_from_reading(item['reading'])
            is_positive = self._is_positive_reading(item['reading'])
            
            results.append({
                'type': eclipse_type,
                'house': house,
                'house_name': house_name,
                'related_planets': [p for p in related_planets if p],
                'reading': item['reading'][:350] + '...' if len(item['reading']) > 350 else item['reading'],
                'themes': themes,
                'is_positive': is_positive,
                'source_month': item.get('source_month', ''),
                'source_sign': item.get('source_sign', '')
            })
        
        # 去重
        seen = set()
        unique_results = []
        for r in results:
            key = (r['type'], r['source_month'], r['house'])
            if key not in seen:
                seen.add(key)
                unique_results.append(r)
        
        return unique_results[:15]
    
    def get_comprehensive_fortune(self, sun_sign, transit_date, include_retrograde=True, include_eclipse=True):
        """获取综合运势（增强版）"""
        result = {
            'sun_sign': sun_sign,
            'transit_date': transit_date,
            'sections': [],
            'retrograde_info': [],
            'eclipse_info': [],
            'overall_sentiment': 'positive'
        }
        
        # 1. 获取行星宫位解读
        planet_readings = []
        for item in self.planet_house_data:
            if item.get('source_sign') == sun_sign:
                planet_readings.append({
                    'category': self._get_house_category(item['house']),
                    'planet': item['planet'],
                    'house': item['house'],
                    'reading': item['reading']
                })
        
        # 按类别分组
        categories = defaultdict(list)
        for reading in planet_readings[:10]:
            categories[reading['category']].append(reading)
        
        for category, readings in categories.items():
            result['sections'].append({
                'title': category,
                'readings': [r['reading'] for r in readings]
            })
        
        # 2. 获取逆行信息
        if include_retrograde:
            retro_info = self.get_retrograde_info(sign=sun_sign)
            result['retrograde_info'] = retro_info[:5]
        
        # 3. 获取日月食信息
        if include_eclipse:
            eclipse_info = self.get_eclipse_info(sign=sun_sign)
            result['eclipse_info'] = eclipse_info[:3]
        
        # 4. 计算总体情绪
        all_readings = []
        for section in result['sections']:
            all_readings.extend(section['readings'])
        
        positive_count = sum(1 for r in all_readings if self._is_positive_reading(r))
        if positive_count > len(all_readings) * 0.7:
            result['overall_sentiment'] = 'very_positive'
        elif positive_count > len(all_readings) * 0.4:
            result['overall_sentiment'] = 'positive'
        else:
            result['overall_sentiment'] = 'mixed'
        
        return result
    
    def _get_planet_areas(self, planet):
        """获取行星影响领域"""
        areas_map = {
            '水星': ['沟通', '思考', '旅行', '合同'],
            '金星': ['爱情', '美学', '财务', '人际关系'],
            '火星': ['行动', '能量', '冲突', '欲望'],
            '木星': ['扩张', '幸运', '成长', '机会'],
            '土星': ['责任', '限制', '学习', '成熟'],
            '天王星': ['变化', '创新', '突破', '意外'],
            '海王星': ['梦想', '直觉', '灵性', '幻觉'],
            '冥王星': ['转化', '权力', '深度', '重生']
        }
        return areas_map.get(planet, ['生活'])
    
    def _extract_advice_from_reading(self, reading):
        """从文本中提取建议"""
        advice_keywords = ['建议', '注意', '记得', '应该', '可以', '尝试', '考虑', '最好']
        sentences = reading.split('。')
        
        for sent in sentences:
            if any(kw in sent for kw in advice_keywords) and len(sent) > 20:
                return sent.strip()[:200]
        
        return "关注这一时期的变化，保持灵活应对。"
    
    def _get_house_name(self, house_num):
        """获取宫位名称"""
        if not house_num:
            return "未知宫位"
        
        house_names = {
            '1': '自我宫', '2': '财务宫', '3': '沟通宫', '4': '家庭宫',
            '5': '爱情宫', '6': '工作宫', '7': '关系宫', '8': '转型宫',
            '9': '迁移宫', '10': '事业宫', '11': '社交宫', '12': '精神宫'
        }
        return house_names.get(str(house_num), f"第{house_num}宫")
    
    def _get_house_category(self, house_num):
        """获取宫位类别"""
        if not house_num:
            return "其他"
        
        categories = {
            '1': '自我与形象', '2': '财务与资源', '3': '沟通与学习',
            '4': '家庭与根基', '5': '爱情与创造', '6': '工作与健康',
            '7': '关系与合作', '8': '转化与深度', '9': '探索与成长',
            '10': '事业与成就', '11': '社交与愿景', '12': '内在世界'
        }
        return categories.get(str(house_num), "其他")
    
    def _extract_themes_from_reading(self, reading):
        """提取主题"""
        themes = []
        theme_keywords = {
            '爱情': ['爱情', '感情', '恋爱', '浪漫', '伴侣'],
            '事业': ['事业', '工作', '职业', '成就'],
            '财务': ['财务', '金钱', '收入', '投资'],
            '家庭': ['家庭', '住所', '父母', '家人'],
            '健康': ['健康', '身体', '养生'],
            '社交': ['社交', '朋友', '群体']
        }
        
        for theme, keywords in theme_keywords.items():
            if any(kw in reading for kw in keywords):
                themes.append(theme)
        
        return themes[:3]
    
    def _is_positive_reading(self, reading):
        """判断解读是否为正面"""
        positive_words = ['好运', '幸运', '机会', '成功', '积极', '美好', '顺利',
                         '和谐', '理想', '完美', '支持', '帮助', '收益', '愉快']
        negative_words = ['困难', '挑战', '压力', '阻碍', '麻烦', '冲突']
        
        pos_count = sum(1 for word in positive_words if word in reading)
        neg_count = sum(1 for word in negative_words if word in reading)
        
        return pos_count >= neg_count


def create_enhanced_routes(app, fortune_api=None):
    """
    为Flask应用创建增强版运势API路由
    
    使用方式:
        from flask import Flask
        from enhanced_api_routes import create_enhanced_routes
        
        app = Flask(__name__)
        create_enhanced_routes(app)
    """
    from flask import request, jsonify
    
    if fortune_api is None:
        fortune_api = EnhancedFortuneAPI()
    
    @app.route('/api/enhanced/test', methods=['GET'])
    def enhanced_test():
        """增强版API测试端点"""
        return jsonify({
            'success': True,
            'message': 'Enhanced Fortune API is running',
            'data_stats': {
                'planet_house': len(fortune_api.planet_house_data),
                'aspects': len(fortune_api.aspect_data),
                'retrograde': len(fortune_api.retrograde_data),
                'eclipse': len(fortune_api.eclipse_data)
            }
        })
    
    @app.route('/api/retrograde-info', methods=['GET'])
    def retrograde_info():
        """查询行星逆行信息"""
        try:
            date = request.args.get('date')
            planet = request.args.get('planet')
            sign = request.args.get('sign')
            
            results = fortune_api.get_retrograde_info(
                date=date,
                planet=planet,
                sign=sign
            )
            
            return jsonify({
                'success': True,
                'count': len(results),
                'data': results
            })
            
        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e)
            }), 500
    
    @app.route('/api/eclipse-info', methods=['GET'])
    def eclipse_info():
        """查询日月食信息"""
        try:
            start_date = request.args.get('start_date')
            end_date = request.args.get('end_date')
            sign = request.args.get('sign')
            
            results = fortune_api.get_eclipse_info(
                start_date=start_date,
                end_date=end_date,
                sign=sign
            )
            
            return jsonify({
                'success': True,
                'count': len(results),
                'data': results
            })
            
        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e)
            }), 500
    
    @app.route('/api/comprehensive-fortune', methods=['POST'])
    def comprehensive_fortune():
        """获取综合运势（增强版）"""
        try:
            data = request.get_json()
            
            if not data or 'sun_sign' not in data:
                return jsonify({
                    'success': False,
                    'error': '缺少必要参数: sun_sign'
                }), 400
            
            sun_sign = data['sun_sign']
            transit_date = data.get('transit_date', datetime.now().strftime('%Y-%m-%d'))
            include_retrograde = data.get('include_retrograde', True)
            include_eclipse = data.get('include_eclipse', True)
            
            result = fortune_api.get_comprehensive_fortune(
                sun_sign=sun_sign,
                transit_date=transit_date,
                include_retrograde=include_retrograde,
                include_eclipse=include_eclipse
            )
            
            return jsonify({
                'success': True,
                'data': result
            })
            
        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e)
            }), 500
    
    print("✅ 增强版API路由已创建:")
    print("   - GET  /api/enhanced/test       - API测试")
    print("   - GET  /api/retrograde-info     - 逆行查询")
    print("   - GET  /api/eclipse-info        - 日月食查询")
    print("   - POST /api/comprehensive-fortune - 综合运势")


# 测试代码
if __name__ == "__main__":
    print("="*70)
    print("🧪 增强版API测试")
    print("="*70)
    
    api = EnhancedFortuneAPI()
    
    # 测试1: 逆行查询
    print("\n🔄 测试逆行查询 (白羊座):")
    retro_info = api.get_retrograde_info(sign='白羊座')
    for item in retro_info[:3]:
        print(f"  {item['planet']}: {item['status']}")
    
    # 测试2: 日月食查询
    print("\n🌑 测试日月食查询 (双子座):")
    eclipse_info = api.get_eclipse_info(sign='双子座')
    for item in eclipse_info[:3]:
        print(f"  {item['type']} - {item['house_name']}")
    
    # 测试3: 综合运势
    print("\n🌟 测试综合运势 (金牛座):")
    fortune = api.get_comprehensive_fortune('金牛座', '2025-01-15')
    print(f"  总体情绪: {fortune['overall_sentiment']}")
    print(f"  逆行提醒: {len(fortune['retrograde_info'])} 条")
    print(f"  日月食: {len(fortune['eclipse_info'])} 条")
    
    print("\n✅ 测试完成!")

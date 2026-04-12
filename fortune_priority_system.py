#!/usr/bin/env python3
"""
运势解读优先级系统
整合实时天文计算与CSV解读数据

优先级排序:
1. 日月食相位宫位（最高优先级）
2. 行星逆行相位宫位
3. 满月或新月相位宫位
4. 行运行星与本命太阳/上升成相位及落入宫位
5. 行运行星之间的相位宫位（最低优先级）
"""

from datetime import datetime, timedelta
from typing import List, Dict, Optional
import json

# 导入现有的天文计算器
try:
    from eclipse_moon_calculator import get_eclipse_calculator
    from retrograde_calculator import get_calculator as get_retrograde_calculator
    ECLIPSE_CALC_AVAILABLE = True
    RETROGRADE_CALC_AVAILABLE = True
except ImportError:
    ECLIPSE_CALC_AVAILABLE = False
    RETROGRADE_CALC_AVAILABLE = False
    print("[WARN] 天文计算器导入失败")

# 导入增强版运势API
try:
    from enhanced_api_routes import EnhancedFortuneAPI
    ENHANCED_API_AVAILABLE = True
except ImportError:
    ENHANCED_API_AVAILABLE = False
    print("[WARN] 增强版运势API导入失败")


class FortunePrioritySystem:
    """
    运势解读优先级系统
    整合实时天文计算与CSV解读数据
    """
    
    # 星座列表
    SIGNS = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
             '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    
    # 宫位名称
    HOUSE_NAMES = {
        1: '命宫（自我、个性）',
        2: '财帛宫（财富、价值观）',
        3: '兄弟宫（沟通、学习）',
        4: '家庭宫（家庭、根基）',
        5: '子女宫（创造、恋爱）',
        6: '奴仆宫（工作、健康）',
        7: '夫妻宫（婚姻、合作）',
        8: '疾厄宫（转化、共享资源）',
        9: '迁移宫（旅行、哲学）',
        10: '官禄宫（事业、成就）',
        11: '福德宫（社群、理想）',
        12: '玄秘宫（灵性、潜意识）'
    }
    
    # 行星意义
    PLANET_MEANINGS = {
        '太阳': '核心自我、生命力、目标',
        '月亮': '情感、需求、安全感',
        '水星': '思维、沟通、学习',
        '金星': '爱情、美感、价值观',
        '火星': '行动、欲望、冲突',
        '木星': '扩张、幸运、成长',
        '土星': '责任、限制、结构',
        '天王星': '变革、独立、突破',
        '海王星': '灵性、梦想、迷惑',
        '冥王星': '转化、力量、深度'
    }
    
    def __init__(self):
        self.eclipse_calc = get_eclipse_calculator() if ECLIPSE_CALC_AVAILABLE else None
        self.retro_calc = get_retrograde_calculator() if RETROGRADE_CALC_AVAILABLE else None
        self.enhanced_api = EnhancedFortuneAPI() if ENHANCED_API_AVAILABLE else None
        
        # 日月食数据（预计算 + 可实时更新）
        self.eclipse_data = {
            2025: [
                {'date': datetime(2025, 3, 14, 6, 54), 'type': '月全食', 'sign': '处女座', 'degree': 23.59},
                {'date': datetime(2025, 3, 29, 10, 57), 'type': '日偏食', 'sign': '白羊座', 'degree': 8.65},
                {'date': datetime(2025, 9, 7, 18, 8), 'type': '月全食', 'sign': '双鱼座', 'degree': 15.02},
                {'date': datetime(2025, 9, 21, 19, 54), 'type': '日偏食', 'sign': '处女座', 'degree': 28.73},
            ],
            2026: [
                {'date': datetime(2026, 3, 3, 11, 37), 'type': '月全食', 'sign': '处女座', 'degree': 12.53},
                {'date': datetime(2026, 8, 28, 4, 18), 'type': '月全食', 'sign': '双鱼座', 'degree': 4.53},
            ]
        }
    
    def get_fortune_priority(self, 
                            natal_sun_sign: str, 
                            transit_date: datetime,
                            natal_chart: Dict = None) -> List[Dict]:
        """
        获取运势解读优先级列表
        
        Args:
            natal_sun_sign: 本命太阳星座（如"白羊座"）
            transit_date: 行运日期
            natal_chart: 完整本命盘（可选，包含上升星座等）
        
        Returns:
            按优先级排序的运势事件列表
        """
        events = []
        year = transit_date.year
        
        # 1. 检查日月食（最高优先级）
        eclipse_events = self._check_eclipses(natal_sun_sign, transit_date)
        events.extend(eclipse_events)
        
        # 2. 检查行星逆行
        retrograde_events = self._check_retrogrades(natal_sun_sign, transit_date)
        events.extend(retrograde_events)
        
        # 3. 检查新月满月
        moon_events = self._check_moon_phases(natal_sun_sign, transit_date)
        events.extend(moon_events)
        
        # 4. 检查行运行星与本命太阳的相位
        aspect_events = self._check_transit_aspects(natal_sun_sign, transit_date)
        events.extend(aspect_events)
        
        # 按优先级排序
        events.sort(key=lambda x: x['priority'])
        
        return events
    
    def _check_eclipses(self, natal_sun_sign: str, date: datetime) -> List[Dict]:
        """检查日月食影响"""
        events = []
        year = date.year
        
        # 使用实时计算器获取日月食
        if self.eclipse_calc:
            try:
                # 使用正确方法：先获取全年日月食，再过滤
                all_eclipses = self.eclipse_calc.calculate_eclipses(date.year)
                # 过滤当前月份及前后各一个月的日月食
                eclipses = []
                for e in all_eclipses:
                    eclipse_date = e['date']
                    # 检查是否在前后30天内
                    days_diff = abs((eclipse_date - date).days)
                    if days_diff <= 30:
                        e['days_until'] = (eclipse_date - date).days
                        eclipses.append(e)
                
                for eclipse in eclipses:
                    # 计算与本命太阳的相位（日月食使用10°容许度）
                    sun_degree = self._sign_to_degree(natal_sun_sign)
                    eclipse_degree = self._sign_to_degree(eclipse['sign']) + eclipse['degree']

                    aspect = self._calculate_aspect(sun_degree, eclipse_degree, orb_type='eclipse')
                    days_until = (eclipse['date'] - date).days

                    if abs(days_until) <= 30:  # 30天内的影响
                        house = self._calculate_house(eclipse['sign'], natal_sun_sign)
                        
                        # 从CSV获取解读
                        reading = self._get_eclipse_reading(eclipse['type'], house, natal_sun_sign)
                        
                        events.append({
                            'priority': 1,
                            'type': 'eclipse',
                            'subtype': eclipse['type'],
                            'title': f"{eclipse['sign']}{eclipse['type']}",
                            'date': eclipse['date'].strftime('%Y-%m-%d %H:%M'),
                            'days_until': days_until,
                            'sign': eclipse['sign'],
                            'degree': eclipse['degree'],
                            'house': house,
                            'house_name': self.HOUSE_NAMES.get(house, ''),
                            'aspect_to_sun': aspect['name'] if aspect else None,
                            'impact': reading.get('impact', self._get_eclipse_impact(eclipse['type'], house)),
                            'advice': reading.get('advice', self._get_eclipse_advice(eclipse['type'], house)),
                            'reading': reading.get('reading', '')
                        })
            except Exception as e:
                print(f"[WARN] 实时日月食计算失败: {e}")
        
        # 使用预计算数据作为回退
        if not events and year in self.eclipse_data:
            for eclipse in self.eclipse_data[year]:
                sun_degree = self._sign_to_degree(natal_sun_sign)
                eclipse_degree = self._sign_to_degree(eclipse['sign']) + eclipse['degree']

                # 日月食使用10°容许度
                aspect = self._calculate_aspect(sun_degree, eclipse_degree, orb_type='eclipse')

                if aspect and aspect['type'] in ['conjunction', 'opposition']:
                    days_until = (eclipse['date'] - date).days
                    
                    if abs(days_until) <= 30:
                        house = self._calculate_house(eclipse['sign'], natal_sun_sign)
                        
                        events.append({
                            'priority': 1,
                            'type': 'eclipse',
                            'subtype': eclipse['type'],
                            'title': f"{eclipse['sign']}{eclipse['type']}",
                            'date': eclipse['date'].strftime('%Y-%m-%d %H:%M'),
                            'days_until': days_until,
                            'sign': eclipse['sign'],
                            'degree': eclipse['degree'],
                            'house': house,
                            'house_name': self.HOUSE_NAMES.get(house, ''),
                            'aspect_to_sun': aspect['name'],
                            'impact': self._get_eclipse_impact(eclipse['type'], house),
                            'advice': self._get_eclipse_advice(eclipse['type'], house)
                        })
        
        return events
    
    def _check_retrogrades(self, natal_sun_sign: str, date: datetime) -> List[Dict]:
        """检查行星逆行影响"""
        events = []
        
        # 使用实时逆行计算器
        if self.retro_calc:
            try:
                # 使用正确方法：获取当月的逆行列表
                monthly_retro = self.retro_calc.get_monthly_retrograde(date.year, date.month, natal_sun_sign)
                
                for retro in monthly_retro:
                    # 检查日期是否在逆行期内
                    if retro['start'] <= date <= retro['end']:
                        planet = retro['planet']
                        house = retro.get('house', 1)
                        
                        # 从CSV获取解读
                        reading = self._get_retrograde_reading(planet, natal_sun_sign)
                        
                        events.append({
                            'priority': 2,
                            'type': 'retrograde',
                            'title': f"{planet}逆行",
                            'planet': planet,
                            'sign': retro['start_sign'],
                            'house': house,
                            'house_name': retro.get('house_name', self.HOUSE_NAMES.get(house, '')),
                            'impact': reading.get('impact', self._get_retrograde_impact(planet, house)),
                            'advice': reading.get('advice', self._get_retrograde_advice(planet)),
                            'reading': reading.get('reading', ''),
                            'start_date': retro['start'].strftime('%Y-%m-%d'),
                            'end_date': retro['end'].strftime('%Y-%m-%d')
                        })
            except Exception as e:
                print(f"[WARN] 实时逆行计算失败: {e}")
        
        return events
    
    def _check_moon_phases(self, natal_sun_sign: str, date: datetime) -> List[Dict]:
        """检查新月满月影响"""
        events = []
        
        # 使用实时计算器获取新月满月
        if self.eclipse_calc:
            try:
                # 使用正确方法：calculate_moon_phases
                moon_phases = self.eclipse_calc.calculate_moon_phases(date.year, date.month)
                new_moons = [m for m in moon_phases if m['type'] == '新月']
                full_moons = [m for m in moon_phases if m['type'] == '满月']
                
                all_moons = [
                    *[{**m, 'phase_type': '新月'} for m in new_moons],
                    *[{**m, 'phase_type': '满月'} for m in full_moons]
                ]
                
                for moon in all_moons:
                    days_until = (moon['date'] - date).days

                    if -3 <= days_until <= 7:  # 前后3天到未来7天
                        sun_degree = self._sign_to_degree(natal_sun_sign)
                        moon_degree = self._sign_to_degree(moon['sign']) + moon['degree']

                        # 新月/满月使用8°容许度
                        aspect = self._calculate_aspect(sun_degree, moon_degree, orb_type='moon_phase')
                        house = self._calculate_house(moon['sign'], natal_sun_sign)
                        
                        events.append({
                            'priority': 3,
                            'type': 'moon_phase',
                            'title': f"{moon['sign']}{moon['phase_type']}",
                            'date': moon['date'].strftime('%Y-%m-%d %H:%M'),
                            'days_until': days_until,
                            'phase': moon['phase_type'],
                            'sign': moon['sign'],
                            'degree': round(moon['degree'], 2),
                            'house': house,
                            'house_name': self.HOUSE_NAMES.get(house, ''),
                            'aspect_to_sun': aspect['name'] if aspect else None,
                            'impact': self._get_moon_phase_impact(moon['phase_type'], house),
                            'advice': self._get_moon_phase_advice(moon['phase_type'], house)
                        })
            except Exception as e:
                print(f"[WARN] 实时月相计算失败: {e}")
        
        return events
    
    def _check_transit_aspects(self, natal_sun_sign: str, date: datetime) -> List[Dict]:
        """检查行运行星与本命太阳的相位"""
        events = []

        # 这里需要接入实时行星位置计算
        # 简化版本：使用预定义的重要相位

        # 行运行星与本命太阳成相使用默认8°容许度
        # 如需更精确计算，可接入实时星历数据

        # 如果有增强版API，使用其数据
        if self.enhanced_api:
            try:
                # 获取行星宫位数据
                planet_data = self.enhanced_api.planet_house_data
                for item in planet_data:
                    if item.get('source_sign') == natal_sun_sign:
                        # 解析宫位信息
                        house = int(item.get('house', 1))
                        planet = item.get('planet', '')
                        
                        events.append({
                            'priority': 4,
                            'type': 'transit_aspect',
                            'title': f"{planet} 影响 太阳",
                            'planet': planet,
                            'aspect': 'transit',
                            'sign': item.get('sign', ''),
                            'house': house,
                            'house_name': self.HOUSE_NAMES.get(house, ''),
                            'impact': f"{planet}能量影响你的{self.HOUSE_NAMES.get(house, '生活领域')}",
                            'advice': self._get_aspect_advice(planet, 'transit'),
                            'reading': item.get('reading', '')
                        })
            except Exception as e:
                print(f"[WARN] 获取行星数据失败: {e}")
        
        return events[:5]  # 限制数量
    
    def _get_eclipse_reading(self, eclipse_type: str, house: int, sign: str) -> Dict:
        """从CSV获取日月食解读"""
        if not self.enhanced_api:
            return {}
        
        try:
            eclipse_info = self.enhanced_api.get_eclipse_info(sign=sign)
            for info in eclipse_info:
                if str(info.get('house')) == str(house):
                    return {
                        'impact': info.get('reading', '')[:100] + '...',
                        'advice': self._extract_advice(info.get('reading', '')),
                        'reading': info.get('reading', '')
                    }
        except Exception as e:
            print(f"[WARN] 获取日月食解读失败: {e}")
        
        return {}
    
    def _get_retrograde_reading(self, planet: str, sign: str) -> Dict:
        """从CSV获取逆行解读"""
        if not self.enhanced_api:
            return {}
        
        try:
            retro_info = self.enhanced_api.get_retrograde_info(planet=planet, sign=sign)
            if retro_info:
                info = retro_info[0]
                return {
                    'impact': f"{planet}逆行影响{', '.join(info.get('affected_areas', ['生活']))}",
                    'advice': info.get('advice', ''),
                    'reading': info.get('reading', '')
                }
        except Exception as e:
            print(f"[WARN] 获取逆行解读失败: {e}")
        
        return {}
    
    def _extract_advice(self, reading: str) -> str:
        """从解读文本中提取建议"""
        advice_keywords = ['建议', '注意', '记得', '应该', '可以', '尝试', '考虑', '最好']
        sentences = reading.split('。')
        
        for sent in sentences:
            if any(kw in sent for kw in advice_keywords) and len(sent) > 20:
                return sent.strip()[:200]
        
        return "关注这一时期的变化，保持灵活应对。"
    
    # ========== 辅助方法 ==========
    
    def _sign_to_degree(self, sign: str) -> float:
        """星座转黄经度数"""
        sign_degrees = {
            '白羊座': 0, '金牛座': 30, '双子座': 60, '巨蟹座': 90,
            '狮子座': 120, '处女座': 150, '天秤座': 180, '天蝎座': 210,
            '射手座': 240, '摩羯座': 270, '水瓶座': 300, '双鱼座': 330
        }
        return sign_degrees.get(sign, 0)
    
    # 默认相位容许度
    DEFAULT_ORBS = {
        'conjunction': 8,
        'sextile': 6,
        'square': 8,
        'trine': 8,
        'opposition': 8
    }

    # 日月食相位容许度（更宽）
    ECLIPSE_ORBS = {
        'conjunction': 10,
        'sextile': 8,
        'square': 10,
        'trine': 10,
        'opposition': 10
    }

    # 新月/满月相位容许度
    MOON_PHASE_ORBS = {
        'conjunction': 8,
        'sextile': 6,
        'square': 8,
        'trine': 8,
        'opposition': 8
    }

    def _calculate_aspect(self, deg1: float, deg2: float, orb_type: str = 'default') -> Optional[Dict]:
        """
        计算两个度数之间的相位

        Args:
            deg1: 第一个度数
            deg2: 第二个度数
            orb_type: 容许度类型 ('default', 'eclipse', 'moon_phase')
        """
        diff = abs((deg2 - deg1) % 360)
        if diff > 180:
            diff = 360 - diff

        # 选择容许度配置
        if orb_type == 'eclipse':
            orbs = self.ECLIPSE_ORBS
        elif orb_type == 'moon_phase':
            orbs = self.MOON_PHASE_ORBS
        else:
            orbs = self.DEFAULT_ORBS

        aspects = [
            (0, 'conjunction', '合相', orbs['conjunction']),
            (60, 'sextile', '六分相', orbs['sextile']),
            (90, 'square', '四分相', orbs['square']),
            (120, 'trine', '三分相', orbs['trine']),
            (180, 'opposition', '对分相', orbs['opposition'])
        ]

        for angle, name, cn_name, orb_limit in aspects:
            orb = abs(diff - angle)
            if orb <= orb_limit:
                return {'type': name, 'name': cn_name, 'angle': angle, 'orb': orb}

        return None
    
    def _calculate_house(self, transit_sign: str, natal_sun_sign: str) -> int:
        """
        简化计算：行星落入的宫位
        假设太阳星座为1宫头
        """
        sun_degree = self._sign_to_degree(natal_sun_sign)
        transit_degree = self._sign_to_degree(transit_sign)
        
        # 计算从太阳星座开始的宫位
        diff = (transit_degree - sun_degree) % 360
        house = int(diff / 30) + 1
        
        return house if 1 <= house <= 12 else 12
    
    # ========== 解读文本 ==========
    
    def _get_eclipse_impact(self, eclipse_type: str, house: int) -> str:
        """获取日月食影响描述"""
        house_themes = {
            1: '自我形象、个人身份', 2: '财务状况、价值观', 3: '沟通学习、兄弟姐妹',
            4: '家庭生活、房产', 5: '恋爱子女、创造力', 6: '工作健康、日常事务',
            7: '婚姻合作、重要关系', 8: '深层转化、共享资源', 9: '高等教育、长途旅行',
            10: '事业发展、公众形象', 11: '社交圈子、未来理想', 12: '内心世界、灵性成长'
        }
        
        theme = house_themes.get(house, '生活领域')
        
        if '全食' in eclipse_type or '月全食' in eclipse_type:
            return f"重大转折点，{theme}将发生深刻变化"
        else:
            return f"重要调整期，{theme}需要重新审视"
    
    def _get_eclipse_advice(self, eclipse_type: str, house: int) -> str:
        """获取日月食建议"""
        advice_map = {
            1: '关注自我需求，重新定义个人目标',
            2: '审视财务状况，调整价值观',
            3: '改善沟通方式，学习新技能',
            4: '处理家庭事务，关注根基建设',
            5: '表达创造力，享受浪漫时光',
            6: '建立健康习惯，优化工作流程',
            7: '经营重要关系，寻求合作平衡',
            8: '面对深层恐惧，处理共享资源',
            9: '拓展视野，探索新哲学',
            10: '规划职业道路，承担更多责任',
            11: '参与社群活动，实现理想',
            12: '独处反思，释放旧有模式'
        }
        
        return advice_map.get(house, '保持觉察，顺应变化')
    
    def _get_retrograde_impact(self, planet: str, house: int) -> str:
        """获取逆行影响描述"""
        meanings = {
            '水星': '沟通、思考、合同事务',
            '金星': '爱情、财务、审美品味',
            '火星': '行动力、冲突、欲望表达',
            '木星': '扩张计划、信念系统',
            '土星': '责任承担、结构建立'
        }
        meaning = meanings.get(planet, f'{planet}相关领域')
        return f"{meaning}进入回顾调整期"
    
    def _get_retrograde_advice(self, planet: str) -> str:
        """获取逆行建议"""
        advice = {
            '水星': '仔细审查合同，备份重要数据，避免冲动决定',
            '金星': '重新评估关系，避免大额消费，给爱情空间',
            '火星': '控制冲动情绪，避免激烈争论，重新规划行动',
            '木星': '审视过度扩张，调整期望目标',
            '土星': '耐心面对延迟，重新建立结构'
        }
        return advice.get(planet, '放慢脚步，内省调整')
    
    def _get_moon_phase_impact(self, phase: str, house: int) -> str:
        """获取月相影响描述"""
        if phase == '新月':
            return f"新的开始，适合在{self.HOUSE_NAMES.get(house, '此领域')}启动计划"
        else:
            return f"高潮或完成，{self.HOUSE_NAMES.get(house, '此领域')}的事情达到顶点"
    
    def _get_moon_phase_advice(self, phase: str, house: int) -> str:
        """获取月相建议"""
        if phase == '新月':
            return '设定意图，播种新的目标，开始新计划'
        else:
            return '庆祝成果，释放不再需要的，准备新的周期'
    
    def _get_aspect_impact(self, planet: str, aspect: str) -> str:
        """获取相位影响描述"""
        aspect_meanings = {
            'conjunction': '强化融合，能量集中',
            'sextile': '和谐机会，轻松流动',
            'square': '挑战张力，需要努力',
            'trine': '天赋支持，自然顺畅',
            'opposition': '对立平衡，关系课题'
        }
        
        return f"{planet}能量与自我核心{aspect_meanings.get(aspect, '形成联系')}"
    
    def _get_aspect_advice(self, planet: str, aspect: str) -> str:
        """获取相位建议"""
        advice_map = {
            'conjunction': '整合新能量到核心自我',
            'sextile': '抓住机会，采取行动',
            'square': '面对挑战，突破舒适区',
            'trine': '善用天赋，顺其自然',
            'opposition': '寻求平衡，理解对立'
        }
        
        return advice_map.get(aspect, '觉察这个相位的能量')


# Flask API 路由创建函数
def create_priority_routes(app, priority_system=None):
    """
    创建运势优先级API路由
    
    使用方式:
        from flask import Flask
        from fortune_priority_system import create_priority_routes
        
        app = Flask(__name__)
        priority_system = FortunePrioritySystem()
        create_priority_routes(app, priority_system)
    """
    if priority_system is None:
        priority_system = FortunePrioritySystem()
    
    @app.route('/api/fortune-priority', methods=['POST'])
    def get_fortune_priority():
        """获取运势优先级列表"""
        try:
            data = request.get_json()
            natal_sun_sign = data.get('natal_sun_sign', '白羊座')
            date_str = data.get('date', datetime.now().strftime('%Y-%m-%d'))
            
            # 解析日期
            transit_date = datetime.strptime(date_str, '%Y-%m-%d')
            
            # 获取优先级列表
            events = priority_system.get_fortune_priority(natal_sun_sign, transit_date)
            
            return jsonify({
                'success': True,
                'data': {
                    'natal_sign': natal_sun_sign,
                    'date': date_str,
                    'events': events
                }
            })
        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e)
            }), 500
    
    @app.route('/api/fortune-priority/demo', methods=['GET'])
    def get_fortune_priority_demo():
        """演示运势优先级系统"""
        try:
            natal_sun_sign = request.args.get('sign', '白羊座')
            date_str = request.args.get('date', datetime.now().strftime('%Y-%m-%d'))
            
            transit_date = datetime.strptime(date_str, '%Y-%m-%d')
            events = priority_system.get_fortune_priority(natal_sun_sign, transit_date)
            
            return jsonify({
                'success': True,
                'data': {
                    'natal_sign': natal_sun_sign,
                    'date': date_str,
                    'events': events,
                    'total': len(events)
                }
            })
        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e)
            }), 500
    
    print("[INFO] 运势优先级API路由已创建:")
    print("       - POST /api/fortune-priority")
    print("       - GET  /api/fortune-priority/demo")


# 演示函数
def demo():
    """演示运势解读优先级系统"""
    print("=" * 70)
    print("✨ 运势解读优先级系统")
    print("=" * 70)
    
    system = FortunePrioritySystem()
    
    # 测试不同星座
    test_cases = [
        ('白羊座', datetime(2026, 3, 1)),
        ('处女座', datetime(2026, 3, 1)),
        ('天秤座', datetime(2026, 4, 6)),
    ]
    
    for sun_sign, date in test_cases:
        print(f"\n{'=' * 70}")
        print(f"🌟 {sun_sign} - {date.strftime('%Y年%m月%d日')}")
        print('=' * 70)
        
        events = system.get_fortune_priority(sun_sign, date)
        
        if not events:
            print("\n   近期无重要天象")
            continue
        
        for i, event in enumerate(events, 1):
            print(f"\n{i}. 优先级 {event['priority']}: {event['title']}")
            print(f"   📅 日期: {event.get('date', '当前')}")
            if 'days_until' in event:
                days_text = "今天" if event['days_until'] == 0 else f"{event['days_until']}天后" if event['days_until'] > 0 else f"{abs(event['days_until'])}天前"
                print(f"   ⏰ 时间: {days_text}")
            print(f"   🏠 宫位: 第{event['house']}宫 - {event['house_name']}")
            if 'aspect_to_sun' in event and event['aspect_to_sun']:
                print(f"   ⭐ 相位: {event['aspect_to_sun']}")
            print(f"   📊 影响: {event['impact']}")
            print(f"   💡 建议: {event['advice']}")
    
    print("\n" + "=" * 70)
    print("✅ 运势解读完成")
    print("=" * 70)


if __name__ == "__main__":
    demo()
else:
    # Flask 导入
    from flask import request, jsonify

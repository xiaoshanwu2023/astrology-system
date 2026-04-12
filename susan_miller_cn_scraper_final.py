#!/usr/bin/env python3
"""
Susan Miller 中文网站月运爬虫 - 智能批量版
基于已知ID模式，爬取 susanmiller.cn 的月运数据
"""

import subprocess
import re
import os
import json
from datetime import datetime
import time

class SusanMillerCNScraper:
    def __init__(self):
        self.base_url = "https://www.susanmiller.cn"
        self.data = []
        
        self.signs = {
            'aries': '白羊座', 'taurus': '金牛座', 'gemini': '双子座',
            'cancer': '巨蟹座', 'leo': '狮子座', 'virgo': '处女座',
            'libra': '天秤座', 'scorpio': '天蝎座', 'sagittarius': '射手座',
            'capricorn': '摩羯座', 'aquarius': '水瓶座', 'pisces': '双鱼座'
        }
        
        # 已知的ID映射（从样本分析）
        # 2026年3月: 14814-14825 (白羊座到双鱼座)
        # 2026年2月: 14769-14780
        # 每个月12篇文章，ID间隔约45
        self.known_mappings = {
            (2026, 3): list(range(14814, 14826)),  # 14814-14825
            (2026, 2): list(range(14769, 14781)),  # 14769-14780
        }
    
    def fetch_page(self, url):
        """使用 curl 获取页面内容"""
        try:
            cmd = [
                'curl', '-s', '-L',
                '-H', 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                '--proxy', 'http://127.0.0.1:7897',
                '--connect-timeout', '8',
                '--max-time', '20',
                url
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=25)
            return result.stdout
        except Exception as e:
            return None
    
    def extract_content(self, html):
        """从HTML中提取运势内容"""
        if not html:
            return None
        
        content_match = re.search(r'<div id="VIEW_CNT" class="view_cnt"[^>]*>(.*?)</div>\s*<div id="VIEW_MORE"', html, re.DOTALL)
        if not content_match:
            return None
        
        content_html = content_match.group(1)
        paragraphs = re.findall(r'<p>(.*?)</p>', content_html, re.DOTALL)
        
        filtered = []
        for p in paragraphs:
            p = re.sub(r'<[^>]+>', '', p)
            p = p.strip()
            if len(p) < 30:
                continue
            if any(skip in p.lower() for skip in [
                'copyright', 'all rights reserved', 'privacy policy',
                'terms of use', 'subscribe', 'advertisement', 
                'susan miller astrology zone', '分享', '微信', '微博',
                '加载全文', '相关推荐', '推荐阅读'
            ]):
                continue
            filtered.append(p)
        
        if not filtered:
            return None
        
        return '\n\n'.join(filtered)
    
    def extract_title(self, html):
        """提取标题"""
        title_match = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
        if title_match:
            title = re.sub(r'<[^>]+>', '', title_match.group(1))
            return title.strip()
        
        title_match = re.search(r'<title>([^<]+)</title>', html)
        if title_match:
            return title_match.group(1).strip()
        
        return None
    
    def extract_date_info(self, title):
        """从标题提取日期信息"""
        match = re.search(r'(\d{4})年(\d{1,2})月', title)
        if match:
            return int(match.group(1)), int(match.group(2))
        return None, None
    
    def extract_sign(self, title):
        """从标题提取星座"""
        for sign_en, sign_zh in self.signs.items():
            if sign_zh in title:
                return sign_en, sign_zh
        return None, None
    
    def scrape_article(self, url):
        """爬取单篇文章"""
        html = self.fetch_page(url)
        if not html:
            return None
        
        title = self.extract_title(html)
        content = self.extract_content(html)
        
        if not content:
            return None
        
        year, month = self.extract_date_info(title) if title else (None, None)
        sign_en, sign_zh = self.extract_sign(title) if title else (None, None)
        
        if not year or not sign_en:
            return None
        
        if year < 2011 or year > 2026:
            return None
        
        return {
            'title': title or '',
            'year': year,
            'month': month,
            'sign': sign_en,
            'sign_zh': sign_zh,
            'content': content,
            'word_count': len(content),
            'url': url,
            'scraped_at': datetime.now().isoformat()
        }
    
    def scrape_by_ids(self, ids, year_month_label):
        """根据ID列表爬取"""
        print(f"\n爬取 {year_month_label} 的数据...")
        
        sign_list = ['aries', 'taurus', 'gemini', 'cancer', 
                     'leo', 'virgo', 'libra', 'scorpio',
                     'sagittarius', 'capricorn', 'aquarius', 'pisces']
        
        success = 0
        for i, id_num in enumerate(ids):
            url = f"{self.base_url}/yueyun/{id_num}.html"
            record = self.scrape_article(url)
            
            if record:
                self.data.append(record)
                success += 1
                sign_name = sign_list[i] if i < len(sign_list) else 'unknown'
                print(f"  ✓ {self.signs.get(sign_name, sign_name)}: {record['word_count']} chars")
            else:
                print(f"  ✗ ID {id_num}: 未找到")
            
            time.sleep(0.3)
        
        return success
    
    def batch_scrape(self):
        """批量爬取主要年份的数据"""
        print("\n" + "="*80)
        print("Susan Miller 中文网站月运批量爬取")
        print("目标: 2022-2026年 (近5年完整数据)")
        print("="*80 + "\n")
        
        # 基于已知的2026年2-3月ID，推算其他月份
        # 2026年3月: 14814-14825
        # 2026年2月: 14769-14780 (间隔45)
        # 假设每个月间隔约45个ID
        
        base_id_march_2026 = 14814
        ids_per_month = 45
        
        # 生成2022-2026年的ID映射
        target_data = []
        
        for year in range(2026, 2021, -1):  # 2026, 2025, 2024, 2023, 2022
            for month in range(12, 0, -1):  # 12月到1月
                # 计算与2026年3月的月份差
                months_diff = (2026 - year) * 12 + (3 - month)
                start_id = base_id_march_2026 - (months_diff * ids_per_month)
                ids = list(range(start_id, start_id + 12))
                
                target_data.append({
                    'year': year,
                    'month': month,
                    'ids': ids,
                    'label': f"{year}年{month}月"
                })
        
        total_months = len(target_data)
        print(f"计划爬取: {total_months} 个月份 × 12 星座 = {total_months * 12} 篇文章\n")
        
        total_success = 0
        for i, item in enumerate(target_data, 1):
            print(f"\n[{i}/{total_months}] {item['label']}")
            success = self.scrape_by_ids(item['ids'], item['label'])
            total_success += success
            
            # 每3个月保存一次进度
            if i % 3 == 0:
                self.save_progress()
        
        # 最终保存
        self.save_results()
        
        # 统计
        print("\n" + "="*80)
        print("批量爬取完成")
        print("="*80)
        print(f"总计文章: {total_months * 12}")
        print(f"成功爬取: {total_success}")
        print(f"成功率: {total_success/(total_months*12)*100:.1f}%")
        
        # 按年份统计
        if self.data:
            year_counts = {}
            for record in self.data:
                year = record['year']
                year_counts[year] = year_counts.get(year, 0) + 1
            
            print("\n按年份统计:")
            for year in sorted(year_counts.keys()):
                print(f"  {year}年: {year_counts[year]} 篇")
    
    def save_progress(self):
        """保存进度"""
        output_dir = 'susan_miller_cn_data'
        os.makedirs(output_dir, exist_ok=True)
        
        json_file = f"{output_dir}/susan_miller_progress.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
        
        print(f"  [进度保存] 已保存 {len(self.data)} 篇文章")
    
    def save_results(self):
        """保存最终结果"""
        output_dir = 'susan_miller_cn_data'
        os.makedirs(output_dir, exist_ok=True)
        
        # 保存为JSON
        json_file = f"{output_dir}/susan_miller_monthly_2011_2025.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
        
        # 按年份和星座组织目录
        for record in self.data:
            if record['year'] and record['sign']:
                year_dir = f"{output_dir}/{record['year']}"
                os.makedirs(year_dir, exist_ok=True)
                
                filename = f"{year_dir}/{record['sign']}_{record['month']:02d}.txt"
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(f"Title: {record['title']}\n")
                    f.write(f"Sign: {record['sign_zh']} ({record['sign']})\n")
                    f.write(f"Date: {record['year']}年{record['month']}月\n")
                    f.write(f"URL: {record['url']}\n")
                    f.write(f"Word Count: {record['word_count']}\n")
                    f.write("="*80 + "\n\n")
                    f.write(record['content'])
        
        print(f"\n✓ 结果已保存到: {output_dir}/")
        print(f"  - JSON: {json_file}")
        print(f"  - 总文章数: {len(self.data)}")

# 主程序
if __name__ == '__main__':
    scraper = SusanMillerCNScraper()
    scraper.batch_scrape()

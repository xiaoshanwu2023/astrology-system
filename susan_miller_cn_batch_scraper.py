#!/usr/bin/env python3
"""
Susan Miller 中文网站月运爬虫 - 批量版（基于ID范围）
爬取 susanmiller.cn 的月运数据（2011-2025年）
"""

import subprocess
import re
import os
import json
from datetime import datetime
import time

class SusanMillerCNBatchScraper:
    def __init__(self):
        self.base_url = "https://www.susanmiller.cn"
        self.data = []
        self.failed_urls = []
        
        self.signs = {
            'aries': '白羊座', 'taurus': '金牛座', 'gemini': '双子座',
            'cancer': '巨蟹座', 'leo': '狮子座', 'virgo': '处女座',
            'libra': '天秤座', 'scorpio': '天蝎座', 'sagittarius': '射手座',
            'capricorn': '摩羯座', 'aquarius': '水瓶座', 'pisces': '双鱼座'
        }
    
    def fetch_page(self, url):
        """使用 curl 获取页面内容"""
        try:
            cmd = [
                'curl', '-s', '-L',
                '-H', 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                '--proxy', 'http://127.0.0.1:7897',
                '--connect-timeout', '10',
                '--max-time', '30',
                url
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=35)
            return result.stdout
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None
    
    def extract_content(self, html):
        """从HTML中提取运势内容"""
        if not html:
            return None
        
        # 找到正文内容区域 - susanmiller.cn 使用 VIEW_CNT
        content_match = re.search(r'<div id="VIEW_CNT" class="view_cnt"[^>]*>(.*?)</div>\s*<div id="VIEW_MORE"', html, re.DOTALL)
        
        if not content_match:
            return None
        
        content_html = content_match.group(1)
        
        # 提取所有段落
        paragraphs = re.findall(r'<p>(.*?)</p>', content_html, re.DOTALL)
        
        # 清理HTML标签
        filtered = []
        for p in paragraphs:
            # 移除内部HTML标签
            p = re.sub(r'<[^>]+>', '', p)
            p = p.strip()
            # 过滤掉太短的段落
            if len(p) < 30:
                continue
            # 过滤掉广告和无关内容
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
        
        # 尝试从 title 标签提取
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
        
        # 只保留有效的月运数据
        if not year or not sign_en:
            return None
        
        # 只保留2011-2025年的数据
        if year < 2011 or year > 2025:
            return None
        
        record = {
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
        
        return record
    
    def batch_scrape_by_id_range(self):
        """基于ID范围批量爬取"""
        print("\n" + "="*80)
        print("Susan Miller 中文网站月运批量爬取 (2011-2025)")
        print("="*80 + "\n")
        
        # 从样本我们知道2026年3月的ID是14814-14825（12个星座）
        # 假设每个月有12篇文章，我们需要推算其他月份的ID
        
        # 先尝试获取2025年和2026年的数据来建立ID映射
        # 2026年3月: 14814-14825
        # 2026年2月: 14769-14780 (从之前的页面看到)
        
        # 尝试ID范围：14000-14900（应该包含2025-2026年的数据）
        start_id = 14000
        end_id = 14900
        
        urls = [f"{self.base_url}/yueyun/{i}.html" for i in range(start_id, end_id + 1)]
        
        total = len(urls)
        success = 0
        failed = 0
        skipped = 0
        
        print(f"Total URLs to try: {total}")
        print(f"ID range: {start_id} - {end_id}")
        print("\nStarting batch scrape...\n")
        
        for i, url in enumerate(urls, 1):
            if i % 100 == 0:
                print(f"Progress: {i}/{total} ({i/total*100:.1f}%) - Success: {success}, Failed: {failed}")
            
            record = self.scrape_article(url)
            
            if record:
                self.data.append(record)
                success += 1
                if success % 10 == 0:
                    print(f"  ✓ Found: {record['sign_zh']} {record['year']}年{record['month']}月 ({record['word_count']} chars)")
            else:
                failed += 1
            
            # 礼貌爬取，间隔0.5秒
            time.sleep(0.5)
        
        # 保存结果
        self.save_results()
        
        # 打印统计
        print("\n" + "="*80)
        print("批量爬取完成")
        print("="*80)
        print(f"总计尝试: {total}")
        print(f"成功: {success}")
        print(f"失败/无效: {failed}")
        print(f"成功率: {success/total*100:.2f}%" if total > 0 else "N/A")
        
        # 按年份统计
        if self.data:
            year_counts = {}
            for record in self.data:
                year = record['year']
                year_counts[year] = year_counts.get(year, 0) + 1
            
            print("\n按年份统计:")
            for year in sorted(year_counts.keys()):
                print(f"  {year}年: {year_counts[year]} 篇")
    
    def save_results(self):
        """保存结果"""
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
        
        print(f"\n✓ Results saved to: {output_dir}/")
        print(f"  - JSON: {json_file}")
        print(f"  - Total articles: {len(self.data)}")

# 主程序
if __name__ == '__main__':
    scraper = SusanMillerCNBatchScraper()
    scraper.batch_scrape_by_id_range()

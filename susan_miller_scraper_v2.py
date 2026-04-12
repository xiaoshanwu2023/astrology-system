#!/usr/bin/env python3
"""
Susan Miller 月运爬虫 - 简化版
使用正则表达式直接提取内容
"""

import subprocess
import re
import pandas as pd
from datetime import datetime
import os

class SusanMillerScraper:
    def __init__(self):
        self.base_url = "https://www.astrologyzone.com/forecasts/"
        self.months = ['january', 'february', 'march', 'april',
                       'may', 'june', 'july', 'august',
                       'september', 'october', 'november', 'december']
        self.signs = {
            'aries': '白羊座', 'taurus': '金牛座', 'gemini': '双子座',
            'cancer': '巨蟹座', 'leo': '狮子座', 'virgo': '处女座',
            'libra': '天秤座', 'scorpio': '天蝎座', 'sagittarius': '射手座',
            'capricorn': '摩羯座', 'aquarius': '水瓶座', 'pisces': '双鱼座'
        }
        self.data = []
    
    def fetch_page(self, url):
        """使用 curl 获取页面内容"""
        try:
            cmd = [
                'curl', '-s', '-L',
                '-H', 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                '--proxy', 'http://127.0.0.1:7897',
                url
            ]
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
            return result.stdout
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None
    
    def extract_content(self, html):
        """从HTML中提取运势内容"""
        if not html:
            return None
        
        # 提取所有段落
        paragraphs = re.findall(r'<p>([^<]+)</p>', html)
        
        # 过滤掉广告和无关内容
        filtered = []
        for p in paragraphs:
            p = p.strip()
            # 跳过太短的段落
            if len(p) < 50:
                continue
            # 跳过广告和导航
            if any(skip in p.lower() for skip in [
                'copyright', 'all rights reserved', 'privacy policy',
                'terms of use', 'subscribe', 'advertisement', 
                'susan miller astrology zone', 'share', 'twitter', 'facebook',
                'join susan', 'newsletter', 'stay in touch'
            ]):
                continue
            filtered.append(p)
        
        if not filtered:
            return None
        
        return '\n\n'.join(filtered)
    
    def extract_title(self, html):
        """提取标题"""
        title_match = re.search(r'<title>([^<]+)</title>', html)
        if title_match:
            return title_match.group(1).strip()
        return None
    
    def scrape_horoscope(self, year, month, sign):
        """爬取单个星座月运"""
        month_name = self.months[month - 1]
        url = f"{self.base_url}{sign}-horoscope-for-{month_name}-{year}/"
        
        print(f"Fetching: {url}")
        
        html = self.fetch_page(url)
        if not html:
            print(f"✗ Failed to fetch {url}")
            return None
        
        title = self.extract_title(html)
        content = self.extract_content(html)
        
        if not content:
            print(f"✗ No content found for {url}")
            return None
        
        # 提取关键信息
        key_dates = self.extract_dates(content)
        key_planets = self.extract_planets(content)
        positive_themes = self.extract_positive_themes(content)
        
        record = {
            'year': year,
            'month': month,
            'month_name': month_name,
            'sign': sign,
            'sign_zh': self.signs[sign],
            'title': title or f"{sign} {month_name} {year}",
            'full_content': content,
            'word_count': len(content.split()),
            'key_dates': key_dates,
            'key_planets': key_planets,
            'positive_themes': positive_themes,
            'url': url,
            'scraped_at': datetime.now().isoformat()
        }
        
        print(f"✓ Success: {sign} {month_name} {year} ({len(content)} chars, {record['word_count']} words)")
        return record
    
    def extract_dates(self, text):
        """提取关键日期"""
        months_pattern = '|'.join(self.months)
        dates = re.findall(rf'({months_pattern})\s+\d{{1,2}}', text, re.IGNORECASE)
        return ', '.join(list(set(dates))[:5]) if dates else ''
    
    def extract_planets(self, text):
        """提取关键行星"""
        planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 
                   'Uranus', 'Neptune', 'Pluto', 'Sun', 'Moon']
        found = [p for p in planets if p.lower() in text.lower()]
        return ', '.join(found) if found else ''
    
    def extract_positive_themes(self, text):
        """提取积极主题"""
        positive_keywords = [
            'opportunity', 'growth', 'success', 'love', 'happiness',
            'joy', 'abundance', 'prosperity', 'breakthrough', 'blessing',
            'wonderful', 'beautiful', 'amazing', 'exciting', 'perfect',
            'lucky', 'fortunate', 'reward', 'celebrate', 'dream come true',
            'lovely', 'peacefulness', 'relaxed', 'happy'
        ]
        found = [kw for kw in positive_keywords if kw.lower() in text.lower()]
        return ', '.join(found[:8]) if found else ''
    
    def scrape_sample(self, sign='aries', year=2026, month=3):
        """爬取一个样本并保存"""
        print(f"\n{'='*80}")
        print(f"Susan Miller 月运样本爬取")
        print(f"{'='*80}\n")
        
        sample = self.scrape_horoscope(year, month, sign)
        
        if sample:
            # 保存为文本文件
            output_dir = 'susan_miller_samples'
            os.makedirs(output_dir, exist_ok=True)
            
            filename = f"{output_dir}/sample_{sign}_{year}_{month:02d}.txt"
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(f"Title: {sample['title']}\n")
                f.write(f"Sign: {sample['sign_zh']} ({sample['sign']})\n")
                f.write(f"Date: {sample['month_name'].title()} {sample['year']}\n")
                f.write(f"URL: {sample['url']}\n")
                f.write(f"Word Count: {sample['word_count']}\n")
                f.write(f"Key Dates: {sample['key_dates']}\n")
                f.write(f"Key Planets: {sample['key_planets']}\n")
                f.write(f"Positive Themes: {sample['positive_themes']}\n")
                f.write("="*80 + "\n\n")
                f.write(sample['full_content'])
            
            print(f"\n{'='*80}")
            print(f"✓ Sample saved to: {filename}")
            print(f"{'='*80}")
            
            # 打印预览
            print(f"\nPREVIEW (first 800 characters):\n")
            print(sample['full_content'][:800] + "...")
            
            return sample
        else:
            print("\n✗ Failed to scrape sample")
            return None
    
    def scrape_range(self, start_year, end_year, signs=None):
        """批量爬取"""
        if signs is None:
            signs = list(self.signs.keys())
        
        total = (end_year - start_year + 1) * 12 * len(signs)
        current = 0
        
        print(f"\nStarting batch scrape: {start_year}-{end_year}")
        print(f"Total to scrape: {total} pages\n")
        
        for year in range(start_year, end_year + 1):
            for month in range(1, 13):
                for sign in signs:
                    current += 1
                    print(f"\n[{current}/{total}] ", end='')
                    
                    result = self.scrape_horoscope(year, month, sign)
                    if result:
                        self.data.append(result)
                    
                    # 礼貌爬取
                    import time
                    time.sleep(2)
        
        print(f"\n\n{'='*80}")
        print(f"Batch scrape complete!")
        print(f"Successfully scraped: {len(self.data)}/{total} pages")
        print(f"{'='*80}")
    
    def save_to_excel(self, filename='susan_miller_data.xlsx'):
        """保存到Excel"""
        if not self.data:
            print("No data to save")
            return
        
        df = pd.DataFrame(self.data)
        
        output_dir = 'susan_miller_data'
        os.makedirs(output_dir, exist_ok=True)
        
        filepath = f"{output_dir}/{filename}"
        df.to_excel(filepath, index=False, engine='openpyxl')
        
        print(f"\n✓ Data saved to: {filepath}")
        print(f"✓ Total records: {len(df)}")

# 主程序
if __name__ == '__main__':
    scraper = SusanMillerScraper()
    
    # 测试一个样本
    print("Testing with Aries March 2026...")
    sample = scraper.scrape_sample('aries', 2026, 3)
    
    if sample:
        print("\n✓ Sample test successful!")
        print("\nThe scraper is working correctly.")
        print("You can now run batch scraping with: scraper.scrape_range(2025, 2026)")
    else:
        print("\n✗ Sample test failed.")

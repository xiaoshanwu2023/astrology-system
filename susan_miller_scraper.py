#!/usr/bin/env python3
"""
Susan Miller 月运爬虫 - 样本测试版
爬取 2025-2026年月运，保留她独特的鼓舞人心的口吻
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import re
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
        
        # 设置代理
        self.proxies = {
            'http': 'http://127.0.0.1:7897',
            'https': 'http://127.0.0.1:7897'
        }
    
    def scrape_horoscope(self, year, month, sign):
        """爬取单个星座月运"""
        month_name = self.months[month - 1]
        url = f"{self.base_url}{sign}-horoscope-for-{month_name}-{year}/"
        
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
            }
            
            print(f"Fetching: {url}")
            response = requests.get(url, headers=headers, proxies=self.proxies, timeout=20)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # 提取标题
            title = soup.find('h1')
            title_text = title.get_text().strip() if title else f"{sign} {month_name} {year}"
            
            # 提取正文内容
            content_div = soup.find('section', class_='entry-content')
            if not content_div:
                content_div = soup.find('div', class_='entry-content')
            if not content_div:
                # 尝试其他选择器
                content_div = soup.find('article') or soup.find('main')
            
            if not content_div:
                print(f"Warning: No content found for {url}")
                return None
            
            # 获取所有段落和标题
            elements = content_div.find_all(['p', 'h2', 'h3', 'h4', 'ul', 'ol'])
            
            # 过滤并清理文本
            paragraphs = []
            for elem in elements:
                text = elem.get_text().strip()
                # 过滤掉广告、导航等无关内容
                if text and len(text) > 20:
                    # 过滤掉常见的无关文本
                    if any(skip in text.lower() for skip in [
                        'copyright', 'all rights reserved', 'privacy policy',
                        'terms of use', 'subscribe', 'advertisement', 'susan miller astrology zone'
                    ]):
                        continue
                    paragraphs.append(text)
            
            full_text = '\n\n'.join(paragraphs)
            
            # 如果内容太短，可能是提取失败
            if len(full_text) < 200:
                print(f"Warning: Content too short for {url}")
                return None
            
            # 提取关键信息
            key_dates = self.extract_dates(full_text)
            key_planets = self.extract_planets(full_text)
            key_aspects = self.extract_aspects(full_text)
            positive_themes = self.extract_positive_themes(full_text)
            challenges = self.extract_challenges(full_text)
            advice = self.extract_advice(full_text)
            
            record = {
                'year': year,
                'month': month,
                'month_name': month_name,
                'sign': sign,
                'sign_zh': self.signs[sign],
                'title': title_text,
                'full_content': full_text,
                'word_count': len(full_text.split()),
                'key_dates': key_dates,
                'key_planets': key_planets,
                'key_aspects': key_aspects,
                'positive_themes': positive_themes,
                'challenges': challenges,
                'advice': advice,
                'url': url,
                'scraped_at': datetime.now().isoformat()
            }
            
            print(f"✓ Success: {sign} {month_name} {year} ({len(full_text)} chars)")
            return record
            
        except requests.exceptions.RequestException as e:
            print(f"✗ Network error for {url}: {e}")
            return None
        except Exception as e:
            print(f"✗ Error scraping {url}: {e}")
            return None
    
    def extract_dates(self, text):
        """提取关键日期"""
        date_patterns = [
            r'(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}',
            r'full moon.*?\d{1,2}',
            r'new moon.*?\d{1,2}',
            r'eclipse.*?\d{1,2}',
        ]
        dates = []
        for pattern in date_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            dates.extend(matches)
        return ', '.join(list(set(dates))[:5]) if dates else ''
    
    def extract_planets(self, text):
        """提取关键行星"""
        planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 
                   'Uranus', 'Neptune', 'Pluto', 'Sun', 'Moon']
        found = [p for p in planets if p.lower() in text.lower()]
        return ', '.join(found) if found else ''
    
    def extract_aspects(self, text):
        """提取关键相位"""
        aspects = []
        aspect_keywords = ['conjunction', 'trine', 'sextile', 'square', 'opposition',
                          'conjunct', 'trining', 'sextiling', 'squaring', 'opposing',
                          'align', 'alignment']
        for keyword in aspect_keywords:
            if keyword.lower() in text.lower():
                aspects.append(keyword)
        return ', '.join(list(set(aspects))) if aspects else ''
    
    def extract_positive_themes(self, text):
        """提取积极主题"""
        positive_keywords = [
            'opportunity', 'growth', 'success', 'love', 'happiness',
            'joy', 'abundance', 'prosperity', 'breakthrough', 'blessing',
            'wonderful', 'beautiful', 'amazing', 'exciting', 'perfect',
            'lucky', 'fortunate', 'reward', 'celebrate', 'dream come true'
        ]
        found = [kw for kw in positive_keywords if kw.lower() in text.lower()]
        return ', '.join(found[:8]) if found else ''
    
    def extract_challenges(self, text):
        """提取挑战"""
        # 寻找表示挑战的段落
        challenge_sentences = []
        sentences = re.split(r'[.!?]+', text)
        
        challenge_indicators = [
            'challenge', 'difficult', 'stress', 'pressure', 'problem',
            'obstacle', 'hurdle', 'setback', 'delay', 'frustration'
        ]
        
        for sentence in sentences:
            sentence = sentence.strip()
            if any(indicator in sentence.lower() for indicator in challenge_indicators):
                if len(sentence) > 30 and len(sentence) < 200:
                    challenge_sentences.append(sentence)
        
        return '; '.join(challenge_sentences[:3]) if challenge_sentences else ''
    
    def extract_advice(self, text):
        """提取建议"""
        advice_sentences = []
        sentences = re.split(r'[.!?]+', text)
        
        advice_indicators = [
            'you might imagine', 'you might want to', 'consider', 'think about',
            'ask yourself', 'take time', 'don\'t hesitate', 'be sure to',
            'remember to', 'try to', 'it would be wise', 'i suggest'
        ]
        
        for sentence in sentences:
            sentence = sentence.strip()
            if any(indicator in sentence.lower() for indicator in advice_indicators):
                if len(sentence) > 30 and len(sentence) < 250:
                    advice_sentences.append(sentence)
        
        return '; '.join(advice_sentences[:3]) if advice_sentences else ''
    
    def scrape_sample(self, sign='aries', year=2026, month=3):
        """爬取一个样本并保存为文本文件"""
        print(f"\n{'='*80}")
        print(f"Testing sample scrape: {sign} {self.months[month-1]} {year}")
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
                f.write(f"Date: {sample['month_name']} {sample['year']}\n")
                f.write(f"URL: {sample['url']}\n")
                f.write(f"Word Count: {sample['word_count']}\n")
                f.write(f"Key Dates: {sample['key_dates']}\n")
                f.write(f"Key Planets: {sample['key_planets']}\n")
                f.write(f"Key Aspects: {sample['key_aspects']}\n")
                f.write(f"Positive Themes: {sample['positive_themes']}\n")
                f.write(f"Challenges: {sample['challenges']}\n")
                f.write(f"Advice: {sample['advice']}\n")
                f.write("="*80 + "\n\n")
                f.write(sample['full_content'])
            
            print(f"\n✓ Sample saved to: {filename}")
            print(f"✓ Content length: {len(sample['full_content'])} characters")
            print(f"✓ Word count: {sample['word_count']} words")
            
            # 打印前500字符作为预览
            print(f"\n{'='*80}")
            print("PREVIEW (first 500 characters):")
            print(f"{'='*80}")
            print(sample['full_content'][:500] + "...")
            
            return sample
        else:
            print("\n✗ Failed to scrape sample")
            return None
    
    def scrape_range(self, start_year, end_year, signs=None):
        """批量爬取指定年份范围"""
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
                    
                    # 礼貌爬取，避免被封
                    time.sleep(2)
        
        print(f"\n\n{'='*80}")
        print(f"Batch scrape complete!")
        print(f"Successfully scraped: {len(self.data)}/{total} pages")
        print(f"{'='*80}")
    
    def save_to_excel(self, filename='susan_miller_2025_2026.xlsx'):
        """保存到Excel"""
        if not self.data:
            print("No data to save")
            return
        
        df = pd.DataFrame(self.data)
        
        # 确保输出目录存在
        output_dir = 'susan_miller_data'
        os.makedirs(output_dir, exist_ok=True)
        
        filepath = f"{output_dir}/{filename}"
        df.to_excel(filepath, index=False, engine='openpyxl')
        
        print(f"\n✓ Data saved to: {filepath}")
        print(f"✓ Total records: {len(df)}")
        print(f"✓ Columns: {list(df.columns)}")
        
        # 显示统计信息
        print(f"\n{'='*80}")
        print("DATA STATISTICS:")
        print(f"{'='*80}")
        print(f"Records per sign:")
        print(df['sign'].value_counts())
        print(f"\nRecords per year:")
        print(df['year'].value_counts().sort_index())

# 主程序
if __name__ == '__main__':
    scraper = SusanMillerScraper()
    
    # 第一步：测试一个样本
    print("STEP 1: Testing with a sample...")
    sample = scraper.scrape_sample('aries', 2026, 3)
    
    if sample:
        print("\n✓ Sample test successful!")
        
        # 询问是否继续批量爬取
        print("\n" + "="*80)
        print("Do you want to continue with batch scraping 2025-2026?")
        print("This will scrape 288 pages (12 signs × 24 months)")
        print("Estimated time: 10-15 minutes")
        print("="*80)
        
        # 这里可以添加用户输入，或者默认继续
        # 为了测试，我们先只爬取3个星座的3个月
        print("\nSTEP 2: Testing batch scrape with small sample (3 signs, 3 months)...")
        test_signs = ['aries', 'taurus', 'gemini']
        scraper.scrape_range(2026, 2026, signs=test_signs)
        scraper.save_to_excel('susan_miller_test_batch.xlsx')
        
        # 如果测试成功，再爬取完整数据
        # scraper.scrape_range(2025, 2026)
        # scraper.save_to_excel('susan_miller_2025_2026.xlsx')
    else:
        print("\n✗ Sample test failed. Please check the error messages above.")

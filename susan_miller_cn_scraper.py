#!/usr/bin/env python3
"""
Susan Miller 中文网站月运爬虫 - 样本测试版
爬取 susanmiller.cn 的月运数据
"""

import subprocess
import re
import os
from datetime import datetime

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
        
        # 找到正文内容区域 - susanmiller.cn 使用 VIEW_CNT
        content_match = re.search(r'<div id="VIEW_CNT" class="view_cnt"[^>]*>(.*?)</div>\s*<div id="VIEW_MORE"', html, re.DOTALL)
        
        if not content_match:
            # 尝试其他模式
            content_match = re.search(r'<div class="entry-content">(.*?)</div>', html, re.DOTALL)
        if not content_match:
            content_match = re.search(r'<article[^>]*>(.*?)</article>', html, re.DOTALL)
        
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
        # 匹配 "2026年3月" 或 "2026年2月"
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
        
        year, month = self.extract_date_info(title) if title else (None, None)
        sign_en, sign_zh = self.extract_sign(title) if title else (None, None)
        
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
        
        print(f"✓ Success: {sign_zh} {year}年{month}月 ({len(content)} chars)")
        return record
    
    def scrape_sample(self, url, sign_name):
        """爬取一个样本并保存"""
        print(f"\n{'='*80}")
        print(f"Susan Miller 中文网站月运样本爬取")
        print(f"{'='*80}\n")
        
        sample = self.scrape_article(url)
        
        if sample:
            # 保存为文本文件
            output_dir = 'susan_miller_cn_samples'
            os.makedirs(output_dir, exist_ok=True)
            
            filename = f"{output_dir}/sample_{sample['sign']}_{sample['year']}_{sample['month']:02d}.txt"
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(f"Title: {sample['title']}\n")
                f.write(f"Sign: {sample['sign_zh']} ({sample['sign']})\n")
                f.write(f"Date: {sample['year']}年{sample['month']}月\n")
                f.write(f"URL: {sample['url']}\n")
                f.write(f"Word Count: {sample['word_count']}\n")
                f.write("="*80 + "\n\n")
                f.write(sample['content'])
            
            print(f"\n{'='*80}")
            print(f"✓ Sample saved to: {filename}")
            print(f"{'='*80}")
            
            # 打印预览
            print(f"\nPREVIEW (first 600 characters):\n")
            print(sample['content'][:600] + "...")
            
            return sample
        else:
            print("\n✗ Failed to scrape sample")
            return None

# 主程序
if __name__ == '__main__':
    scraper = SusanMillerCNScraper()
    
    # 测试两个样本
    samples = [
        ("https://www.susanmiller.cn/yueyun/14814.html", "白羊座"),
        ("https://www.susanmiller.cn/yueyun/14815.html", "金牛座")
    ]
    
    for url, sign_name in samples:
        print(f"\n\nTesting {sign_name}...")
        sample = scraper.scrape_sample(url, sign_name)
        
        if sample:
            print(f"\n✓ {sign_name} sample test successful!")
        else:
            print(f"\n✗ {sign_name} sample test failed.")
        
        # 间隔2秒，礼貌爬取
        import time
        time.sleep(2)

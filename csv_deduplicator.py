#!/usr/bin/env python3
"""
CSV文件去重工具
删除fortune_data/enhanced/目录下CSV文件中的重复条目
"""

import csv
import os
import shutil
from pathlib import Path
from datetime import datetime

def remove_duplicates_from_csv(filepath, key_columns=None):
    """
    删除CSV文件中的重复行
    
    Args:
        filepath: CSV文件路径
        key_columns: 用于判断重复的列名列表，如果为None则使用所有列（除id外）
    
    Returns:
        (原始行数, 去重后行数, 删除行数)
    """
    filepath = Path(filepath)
    
    # 读取CSV
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        rows = list(reader)
    
    original_count = len(rows)
    
    # 去重逻辑
    seen = set()
    unique_rows = []
    
    for row in rows:
        if key_columns:
            # 使用指定列作为去重键
            key = tuple(row[col] for col in key_columns if col in row)
        else:
            # 使用所有列（除id外）作为去重键
            key = tuple(row[k] for k in sorted(row.keys()) if k != 'id')
        
        if key not in seen:
            seen.add(key)
            unique_rows.append(row)
    
    unique_count = len(unique_rows)
    removed_count = original_count - unique_count
    
    # 重新分配id
    for i, row in enumerate(unique_rows, 1):
        row['id'] = str(i)
    
    # 写入新文件
    with open(filepath, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(unique_rows)
    
    return original_count, unique_count, removed_count

def backup_file(filepath):
    """创建备份文件"""
    filepath = Path(filepath)
    backup_dir = filepath.parent / 'backup'
    backup_dir.mkdir(exist_ok=True)
    
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = backup_dir / f"{filepath.stem}_{timestamp}{filepath.suffix}"
    shutil.copy2(filepath, backup_path)
    
    return backup_path

def main():
    base_dir = Path('/Users/wuxiaoshan/Desktop/astrology-system/fortune_data/enhanced')
    
    # 定义每个文件的去重键
    file_configs = {
        'retrograde_info.csv': ['planet', 'is_retrograde', 'is_direct', 'reading', 'source_month', 'source_sign'],
        'eclipse_info.csv': None,  # 使用所有列（除id外）
        'aspect_from_notes.csv': None,
        'planet_house_from_notes.csv': None
    }
    
    print("=" * 60)
    print("CSV文件去重工具")
    print("=" * 60)
    print()
    
    total_original = 0
    total_unique = 0
    total_removed = 0
    
    for filename, key_columns in file_configs.items():
        filepath = base_dir / filename
        
        if not filepath.exists():
            print(f"⚠️  {filename} 不存在，跳过")
            continue
        
        # 备份原文件
        backup_path = backup_file(filepath)
        print(f"📦 已备份: {filename} → {backup_path.name}")
        
        # 去重
        original, unique, removed = remove_duplicates_from_csv(filepath, key_columns)
        
        print(f"📝 {filename}:")
        print(f"   原始行数: {original}")
        print(f"   去重后: {unique}")
        print(f"   删除重复: {removed}")
        print()
        
        total_original += original
        total_unique += unique
        total_removed += removed
    
    print("=" * 60)
    print("去重汇总:")
    print(f"   原始总行数: {total_original}")
    print(f"   去重后总行数: {total_unique}")
    print(f"   删除总行数: {total_removed}")
    print(f"   压缩率: {(total_removed/total_original)*100:.1f}%")
    print("=" * 60)
    print()
    print("✅ 去重完成！备份文件保存在 backup/ 目录")

if __name__ == "__main__":
    main()

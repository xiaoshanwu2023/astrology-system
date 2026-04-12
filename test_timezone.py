#!/usr/bin/env python3
"""测试时区问题"""
from swisseph_chart import calculate_natal_chart_swisseph
from datetime import datetime

# 测试北京时间
birth_dt = datetime(1990, 5, 15, 14, 30, 0)  # 这是北京时间
lon, lat = 116.4, 39.9  # 北京

print('【测试北京时间】')
print(f'输入时间: {birth_dt} (假设为北京时间 +8)')
print(f'地点: 经度{lon}, 纬度{lat}')
print()

# 当前代码直接把输入当 UTC 处理
natal = calculate_natal_chart_swisseph(birth_dt, lon, lat)
print('Swiss Ephemeris 计算结果:')
print(f"  上升星座: {natal['planets']['ascendant']['sign']} {natal['planets']['ascendant']['degree']}°")
print(f"  太阳: {natal['planets']['sun']['sign']} {natal['planets']['sun']['degree']}°")
print()

# 手动转换为 UTC (北京时间 - 8小时)
birth_dt_utc = datetime(1990, 5, 15, 6, 30, 0)  # 14:30 - 8 = 06:30 UTC
print(f'转换为UTC: {birth_dt_utc}')
print()

natal_utc = calculate_natal_chart_swisseph(birth_dt_utc, lon, lat)
print('使用UTC时间计算结果:')
print(f"  上升星座: {natal_utc['planets']['ascendant']['sign']} {natal_utc['planets']['ascendant']['degree']}°")
print(f"  太阳: {natal_utc['planets']['sun']['sign']} {natal_utc['planets']['sun']['degree']}°")

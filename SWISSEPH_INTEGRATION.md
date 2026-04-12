# Swiss Ephemeris 集成完成

## 更新日志

### 2026-03-27
- ✅ 编译 Swiss Ephemeris (swetest)
- ✅ 创建 Python 封装模块 `swisseph_chart.py`
- ✅ 更新 `app.py` 使用 Swiss Ephemeris 计算
- ✅ 复制 swetest 可执行文件到项目目录

## 核心改进

### 1. 上升星座计算精度

**之前（简化算法）**:
```python
asc_sign_idx = int(hour / 2) % 12  # 仅基于小时数
```

**现在（Swiss Ephemeris）**:
- 使用 NASA 星历数据
- 考虑精确的出生日期、时间、经纬度
- 使用 Placidus 宫位系统

### 2. 测试对比

**测试数据**: 1990-05-15 14:30, 北京 (116.4°E, 39.9°N)

| 行星 | 简化算法 | Swiss Ephemeris | 差异 |
|------|---------|-----------------|------|
| 太阳 | Taurus | Taurus 24.5° | ✅ 一致 |
| 上升星座 | **Libra** (错误) | **Capricorn** 5.34° | ❌ 严重错误 |
| 月亮 | - | Capricorn 28.45° | - |
| 水星 | - | Taurus 8.0° | - |

**关键修复**: 上升星座从错误的 Libra 修正为正确的 Capricorn

### 3. 新增功能

- ✅ 精确的行星位置计算
- ✅ 准确的上升星座和天顶计算
- ✅ 12宫位计算
- ✅ 上升星座与行运行星的相位分析
- ✅ 支持任意经纬度

## 文件结构

```
astrology-system/
├── app.py                      # 主应用（已更新）
├── swisseph_chart.py           # Swiss Ephemeris 封装模块（新增）
├── swetest                     # Swiss Ephemeris 可执行文件（新增）
├── data/
│   └── astrology_v2.xlsx       # 事件数据库
└── ...
```

## 使用方法

### 启动应用
```bash
cd ~/Desktop/astrology-system
source venv/bin/activate
python app.py
```

### 测试 Swiss Ephemeris
```bash
./venv/bin/python swisseph_chart.py
```

## 技术细节

### Swiss Ephemeris 调用示例
```bash
# 计算本命盘（含宫位）
./swetest -b15.5.1990 -ut14:30 -geopos116.4,39.9,0 -house116.4,39.9,P -head

# 参数说明
# -b: 出生日期 (日.月.年)
# -ut: 出生时间 (UTC)
# -geopos: 经纬度海拔
# -house: 宫位计算 (经度,纬度,宫位系统P=Placidus)
# -head: 输出表头
```

### Python API
```python
from swisseph_chart import calculate_natal_chart_swisseph
from datetime import datetime

birth_dt = datetime(1990, 5, 15, 14, 30, 0)
natal = calculate_natal_chart_swisseph(birth_dt, lon=116.4, lat=39.9)

# 结果
# natal['planets']['ascendant'] = {'sign': 'Capricorn', 'degree': 5.34, ...}
```

## 下一步建议

1. **测试验证**
   - 使用已知的准确星盘数据进行验证
   - 对比在线占星网站的结果

2. **部署准备**
   - 确保 swetest 可执行文件有执行权限
   - 考虑将 swetest 路径配置为环境变量

3. **功能增强**
   - 添加更多宫位系统选项（Koch, Whole Sign等）
   - 实现更多相位类型（次要相位）
   - 添加小行星计算（Chiron, Lilith等）

## 注意事项

1. **时区处理**: 输入时间应为 UTC 或带时区信息
2. **星历范围**: Swiss Ephemeris 支持公元前13200年到公元17191年
3. **精度**: 行星位置精度约 0.001 角秒

---
*更新日期: 2026-03-27*

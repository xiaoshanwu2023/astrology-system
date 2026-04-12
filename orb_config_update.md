# 星盘项目容许度配置更新记录

## 更新日期
2026-04-11

## 更新内容

根据要求，已调整行运行星与月相/日月食成相的容许度配置：

### 1. 容许度规则

| 天象类型 | 容许度 |
|---------|--------|
| 行运行星与新月/满月成相 | **8°** |
| 行运行星与日月食成相 | **10°** |
| 其他默认相位 | **8°** |

### 2. 修改的文件

**文件**: `fortune_priority_system.py`

#### 修改1: 添加容许度配置常量
```python
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
```

#### 修改2: 更新 `_calculate_aspect` 方法
- 添加 `orb_type` 参数，支持选择不同的容许度配置
- 可选值: `'default'` (默认), `'eclipse'` (日月食), `'moon_phase'` (新月/满月)

#### 修改3: 更新日月食相位计算
```python
# 日月食使用10°容许度
aspect = self._calculate_aspect(sun_degree, eclipse_degree, orb_type='eclipse')
```

#### 修改4: 更新新月/满月相位计算
```python
# 新月/满月使用8°容许度
aspect = self._calculate_aspect(sun_degree, moon_degree, orb_type='moon_phase')
```

### 3. 其他相关文件

**文件**: `swisseph_chart.py`
- 行星-行星相位容许度保持不变（使用动态容许度）
- 这是用于本命盘与行运盘之间的精确相位计算

### 4. 测试验证

已运行测试验证新配置：
- ✅ 日月食 9°偏差 → 识别为合相（10°容许度）
- ✅ 默认 9°偏差 → 无相位（8°容许度）
- ✅ 新月/满月 8°偏差 → 识别为合相（8°容许度）
- ✅ 新月/满月 9°偏差 → 无相位（8°容许度）

### 5. 注意事项

1. **日月食影响范围更广**：由于使用10°容许度，日月食的影响会比之前更宽，能捕捉到更多与本命盘成相的情况
2. **新月/满月保持原有精度**：使用8°容许度，保持适度的敏感性
3. **向后兼容**：`_calculate_aspect` 方法的 `orb_type` 参数默认为 `'default'`，不影响其他调用

## 后续建议

如需进一步调整容许度，可修改 `fortune_priority_system.py` 中的以下常量：
- `ECLIPSE_ORBS` - 日月食容许度
- `MOON_PHASE_ORBS` - 新月/满月容许度
- `DEFAULT_ORBS` - 默认容许度

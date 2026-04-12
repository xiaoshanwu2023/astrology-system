# 部署指南

## 快速启动

### 1. 进入项目目录
```bash
cd ~/Desktop/astrology-system
```

### 2. 激活虚拟环境
```bash
source venv/bin/activate
```

### 3. 启动服务
```bash
python app.py
```

### 4. 访问网站
打开浏览器访问: http://127.0.0.1:5001

---

## 完整安装（如果虚拟环境不存在）

### 1. 创建虚拟环境
```bash
cd ~/Desktop/astrology-system
python3 -m venv venv
```

### 2. 激活虚拟环境
```bash
source venv/bin/activate
```

### 3. 安装依赖
```bash
pip install flask pandas openpyxl pytz
```

### 4. 启动服务
```bash
python app.py
```

---

## 验证安装

启动后，你应该看到以下输出：

```
[INFO] Loaded astrology_v2.xlsx successfully
[INFO] 星座基础事件: 60 rows
[INFO] 行星落入事件: 1440 rows
[INFO] 相位事件: 80 rows
 * Running on http://127.0.0.1:5001
```

---

## 故障排除

### 问题1: 端口被占用

**错误信息**: `Address already in use`

**解决**: 修改 `app.py` 最后一行，更换端口:
```python
app.run(host='127.0.0.1', port=5002, debug=True)
```

### 问题2: 数据文件未找到

**错误信息**: `astrology_v2.xlsx not found`

**解决**: 检查文件是否存在:
```bash
ls -la data/astrology_v2.xlsx
```

如果不存在，从备份恢复:
```bash
cp ~/Desktop/astrology-system-backup-*/data/astrology.xlsx data/astrology_v2.xlsx
```

### 问题3: 缺少依赖包

**错误信息**: `ModuleNotFoundError`

**解决**: 重新安装依赖:
```bash
pip install flask pandas openpyxl pytz
```

---

## 生产环境部署（可选）

### 使用 Gunicorn

```bash
pip install gunicorn
gunicorn -w 4 -b 127.0.0.1:5001 app:app
```

### 使用 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://127.0.0.1:5001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 文件备份

重要文件备份位置:
- 原始备份: `~/Desktop/astrology-system-backup-20260325/`
- 数据文件: `data/astrology_v2.xlsx`
- 城市数据: `static/js/city-data.js`

---

**最后更新**: 2024-03-25

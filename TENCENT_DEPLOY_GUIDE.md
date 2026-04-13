# 腾讯云轻量应用服务器部署指南

## 项目概述
本项目是一个基于 Flask 的星盘查询系统，部署在腾讯云轻量应用服务器上。

## 服务器信息
- **实例ID**: lhins-61ymr1hg
- **地域**: ap-shanghai
- **访问地址**: https://orcaterm.cloud.tencent.com/terminal?type=lighthouse&instanceId=lhins-61ymr1hg&region=ap-shanghai

## 部署步骤

### 1. 连接服务器
通过腾讯云控制台登录服务器，或使用 SSH:
```bash
ssh ubuntu@<服务器公网IP>
```

### 2. 安装依赖
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Python 和 pip
sudo apt install -y python3 python3-pip python3-venv

# 安装 Nginx
sudo apt install -y nginx

# 安装 Git
sudo apt install -y git
```

### 3. 克隆项目
```bash
cd /var/www
sudo git clone https://github.com/xiaoshanwu2023/astrology-system.git
sudo chown -R www-data:www-data astrology-system
```

### 4. 创建虚拟环境
```bash
cd /var/www/astrology-system
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 5. 配置 Gunicorn
```bash
pip install gunicorn
```

### 6. 创建 Systemd 服务
创建服务文件 `/etc/systemd/system/astrology.service`:

```ini
[Unit]
Description=Astrology System Flask App
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/astrology-system
Environment="PATH=/var/www/astrology-system/venv/bin"
Environment="SECRET_KEY=your-secret-key-here-change-this"
Environment="FLASK_ENV=production"
ExecStart=/var/www/astrology-system/venv/bin/gunicorn -w 4 -b 127.0.0.1:8000 app:app

[Install]
WantedBy=multi-user.target
```

启动服务:
```bash
sudo systemctl daemon-reload
sudo systemctl start astrology
sudo systemctl enable astrology
```

### 7. 配置 Nginx
创建配置文件 `/etc/nginx/sites-available/astrology`:

```nginx
server {
    listen 80;
    server_name _;  # 接受所有域名

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static {
        alias /var/www/astrology-system/static;
        expires 30d;
    }
}
```

启用配置:
```bash
sudo ln -s /etc/nginx/sites-available/astrology /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # 删除默认配置
sudo nginx -t  # 测试配置
sudo systemctl restart nginx
```

### 8. 配置防火墙
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

### 9. 配置域名（可选）
如果有域名，可以在腾讯云 DNS 解析中添加 A 记录指向服务器 IP。

### 10. 配置 HTTPS（可选）
使用 Let's Encrypt 配置 SSL:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 维护命令

### 查看应用日志
```bash
sudo journalctl -u astrology -f
```

### 重启应用
```bash
sudo systemctl restart astrology
```

### 更新代码
```bash
cd /var/www/astrology-system
sudo git pull
sudo systemctl restart astrology
```

### 检查 Nginx 状态
```bash
sudo systemctl status nginx
sudo nginx -t
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `app.py` | Flask 主应用 |
| `requirements.txt` | Python 依赖 |
| `wsgi.py` | WSGI 入口文件 |
| `tencent_lighthouse.py` | 腾讯云适配版本 |
| `static/` | 静态文件 (CSS, JS, 图片) |
| `templates/` | HTML 模板 |

## 故障排查

### 应用无法启动
```bash
# 检查日志
sudo journalctl -u astrology -n 50

# 检查端口占用
sudo netstat -tlnp | grep 8000
```

### Nginx 502 错误
```bash
# 检查 Gunicorn 是否运行
sudo systemctl status astrology

# 检查端口
curl http://127.0.0.1:8000
```

### 权限问题
```bash
sudo chown -R www-data:www-data /var/www/astrology-system
sudo chmod -R 755 /var/www/astrology-system
```

## 注意事项

1. **SECRET_KEY**: 生产环境必须修改 `SECRET_KEY`
2. **防火墙**: 确保 80 端口开放
3. **日志**: 定期清理日志文件避免磁盘满
4. **备份**: 定期备份数据和配置

## 联系
如有问题，请联系项目维护者。

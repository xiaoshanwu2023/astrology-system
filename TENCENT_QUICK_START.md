# 腾讯云部署快速指南

## 服务器信息
- **实例ID**: lhins-61ymr1hg
- **地域**: ap-shanghai
- **控制台**: https://console.cloud.tencent.com/lighthouse/instance/detail?regionId=ap-shanghai&instanceId=lhins-61ymr1hg

## 部署步骤（在腾讯云服务器上执行）

### 1. 登录服务器
通过腾讯云控制台登录，或 SSH:
```bash
ssh ubuntu@<你的服务器公网IP>
```

### 2. 一键部署
```bash
# 下载部署脚本
cd /tmp
wget https://raw.githubusercontent.com/xiaoshanwu2023/astrology-system/main/deploy_tencent.sh

# 执行部署
sudo bash deploy_tencent.sh
```

### 3. 手动部署（如果脚本失败）

```bash
# 1. 安装依赖
sudo apt update
sudo apt install -y python3 python3-pip python3-venv nginx git

# 2. 克隆项目
sudo mkdir -p /var/www
sudo git clone https://github.com/xiaoshanwu2023/astrology-system.git /var/www/astrology-system
sudo chown -R www-data:www-data /var/www/astrology-system

# 3. 创建虚拟环境
cd /var/www/astrology-system
sudo python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 4. 配置服务
sudo cp astrology.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable astrology
sudo systemctl start astrology

# 5. 配置 Nginx
sudo cp astrology.nginx /etc/nginx/sites-available/astrology
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/astrology /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 6. 开放防火墙
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

## 部署后访问

部署完成后，通过以下地址访问：
```
http://<你的服务器公网IP>
```

## 常用命令

```bash
# 查看应用日志
sudo journalctl -u astrology -f

# 重启应用
sudo systemctl restart astrology

# 查看应用状态
sudo systemctl status astrology

# 重启 Nginx
sudo systemctl restart nginx

# 更新代码
sudo su - www-data
cd /var/www/astrology-system
git pull
exit
sudo systemctl restart astrology
```

## 文件说明

| 文件 | 用途 |
|------|------|
| `tencent_lighthouse.py` | 主应用（生产环境） |
| `deploy_tencent.sh` | 一键部署脚本 |
| `astrology.service` | Systemd 服务配置 |
| `astrology.nginx` | Nginx 配置 |
| `TENCENT_DEPLOY_GUIDE.md` | 详细部署文档 |

## 故障排查

### 应用无法启动
```bash
sudo journalctl -u astrology -n 50
```

### Nginx 502 错误
```bash
# 检查 Gunicorn 是否运行
curl http://127.0.0.1:8000/health

# 检查端口占用
sudo netstat -tlnp | grep 8000
```

### 权限问题
```bash
sudo chown -R www-data:www-data /var/www/astrology-system
sudo chmod -R 755 /var/www/astrology-system
```

## 注意事项

1. **修改密钥**: 部署后请修改 `astrology.service` 中的 `SECRET_KEY`
2. **配置域名**: 如有域名，在腾讯云 DNS 解析中添加 A 记录
3. **启用 HTTPS**: 使用 Let's Encrypt 配置 SSL 证书

## 需要帮助？

查看详细文档：`TENCENT_DEPLOY_GUIDE.md`

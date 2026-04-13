#!/bin/bash
# 腾讯云轻量应用服务器一键部署脚本

set -e

echo "==================================="
echo "星盘系统 - 腾讯云部署脚本"
echo "==================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否以 root 运行
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}请使用 sudo 运行此脚本${NC}"
    exit 1
fi

# 配置
APP_NAME="astrology"
APP_DIR="/var/www/astrology-system"
LOG_DIR="/var/log/astrology"
REPO_URL="https://github.com/xiaoshanwu2023/astrology-system.git"

echo -e "${YELLOW}Step 1: 更新系统...${NC}"
apt update && apt upgrade -y

echo -e "${YELLOW}Step 2: 安装依赖...${NC}"
apt install -y python3 python3-pip python3-venv nginx git

echo -e "${YELLOW}Step 3: 创建日志目录...${NC}"
mkdir -p $LOG_DIR
chown -R www-data:www-data $LOG_DIR

echo -e "${YELLOW}Step 4: 克隆项目...${NC}"
if [ -d "$APP_DIR" ]; then
    echo -e "${YELLOW}目录已存在，更新代码...${NC}"
    cd $APP_DIR
    git pull
else
    git clone $REPO_URL $APP_DIR
    chown -R www-data:www-data $APP_DIR
fi

echo -e "${YELLOW}Step 5: 创建虚拟环境并安装依赖...${NC}"
cd $APP_DIR
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn

echo -e "${YELLOW}Step 6: 配置 Systemd 服务...${NC}"
cp astrology.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable astrology

echo -e "${YELLOW}Step 7: 配置 Nginx...${NC}"
cp astrology.nginx /etc/nginx/sites-available/astrology

# 删除默认配置（如果存在）
if [ -f "/etc/nginx/sites-enabled/default" ]; then
    rm /etc/nginx/sites-enabled/default
fi

# 启用新配置
ln -sf /etc/nginx/sites-available/astrology /etc/nginx/sites-enabled/

# 测试 Nginx 配置
nginx -t

echo -e "${YELLOW}Step 8: 启动服务...${NC}"
systemctl start astrology
systemctl restart nginx

echo -e "${YELLOW}Step 9: 配置防火墙...${NC}"
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable

echo -e "${GREEN}===================================${NC}"
echo -e "${GREEN}部署完成！${NC}"
echo -e "${GREEN}===================================${NC}"
echo ""
echo "应用状态:"
systemctl status astrology --no-pager -l

echo ""
echo "Nginx 状态:"
systemctl status nginx --no-pager -l

echo ""
echo -e "${GREEN}访问地址: http://$(curl -s ifconfig.me)${NC}"
echo ""
echo "常用命令:"
echo "  查看日志: sudo journalctl -u astrology -f"
echo "  重启应用: sudo systemctl restart astrology"
echo "  重启 Nginx: sudo systemctl restart nginx"

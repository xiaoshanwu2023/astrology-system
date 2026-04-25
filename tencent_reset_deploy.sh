#!/bin/bash
# 星盘系统 - 腾讯云完全重置部署脚本
# 用法: ssh ubuntu@你的服务器IP "bash -s" < tencent_reset_deploy.sh
# 或者先 scp 到服务器再执行

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

APP_NAME="astrology"
APP_DIR="/var/www/astrology-system"
LOG_DIR="/var/log/astrology"
REPO_URL="https://github.com/xiaoshanwu2023/astrology-system.git"
NGINX_CONF="/etc/nginx/sites-available/astrology"
SYSTEMD_CONF="/etc/systemd/system/astrology.service"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  星盘系统 - 腾讯云完全重置部署${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 1. 停止并禁用旧服务
echo -e "${YELLOW}[1/12] 停止旧服务...${NC}"
sudo systemctl stop astrology 2>/dev/null || true
sudo systemctl disable astrology 2>/dev/null || true
sudo systemctl stop nginx 2>/dev/null || true

# 2. 备份旧代码（带时间戳）
echo -e "${YELLOW}[2/12] 备份旧代码...${NC}"
BACKUP_DIR="/var/www/astrology-system.backup.$(date +%Y%m%d_%H%M%S)"
if [ -d "$APP_DIR" ]; then
    sudo mv "$APP_DIR" "$BACKUP_DIR"
    echo -e "${GREEN}  已备份到: $BACKUP_DIR${NC}"
fi

# 3. 更新系统
echo -e "${YELLOW}[3/12] 更新系统...${NC}"
sudo apt update -y
sudo apt upgrade -y 2>/dev/null || true

# 4. 安装依赖
echo -e "${YELLOW}[4/12] 安装系统依赖...${NC}"
sudo apt install -y python3 python3-pip python3-venv nginx git curl

# 5. 创建日志目录
echo -e "${YELLOW}[5/12] 创建日志目录...${NC}"
sudo mkdir -p "$LOG_DIR"
sudo chown -R www-data:www-data "$LOG_DIR"

# 6. 克隆仓库
echo -e "${YELLOW}[6/12] 克隆最新代码...${NC}"
sudo git clone "$REPO_URL" "$APP_DIR"
cd "$APP_DIR"
sudo chown -R www-data:www-data .

# 7. 创建虚拟环境并安装依赖
echo -e "${YELLOW}[7/12] 安装 Python 依赖...${NC}"
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# 8. 验证 swetest
echo -e "${YELLOW}[8/12] 验证 Swiss Ephemeris (swetest)...${NC}"
sudo chmod +x swetest
SWETEST_OUTPUT=$(./swetest -b15.5.1990 -ut12:00 -head 2>&1)
if echo "$SWETEST_OUTPUT" | grep -q "Sun"; then
    echo -e "${GREEN}  swetest 运行正常${NC}"
else
    echo -e "${RED}  ⚠️ swetest 可能有问题，但继续部署...${NC}"
fi

# 9. 配置 Systemd 服务
echo -e "${YELLOW}[9/12] 配置 Systemd 服务...${NC}"
sudo cp astrology.service "$SYSTEMD_CONF"
sudo sed -i "s|ExecStart=.*|ExecStart=$APP_DIR/venv/bin/gunicorn -w 4 -b 127.0.0.1:8000 tencent_lighthouse:application|" "$SYSTEMD_CONF"
sudo sed -i "s|WorkingDirectory=.*|WorkingDirectory=$APP_DIR|" "$SYSTEMD_CONF"
sudo sed -i "s|Environment=\"PATH=.*|Environment=\"PATH=$APP_DIR/venv/bin\"|" "$SYSTEMD_CONF"
sudo systemctl daemon-reload

# 10. 配置 Nginx
echo -e "${YELLOW}[10/12] 配置 Nginx...${NC}"
sudo cp astrology.nginx "$NGINX_CONF"
sudo sed -i "s|/var/www/astrology-system|$APP_DIR|g" "$NGINX_CONF"

# 删除默认配置并启用新配置
if [ -f "/etc/nginx/sites-enabled/default" ]; then
    sudo rm /etc/nginx/sites-enabled/default
fi
if [ -f "/etc/nginx/sites-enabled/astrology" ]; then
    sudo rm /etc/nginx/sites-enabled/astrology
fi
sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/astrology

# 测试 Nginx 配置
if sudo nginx -t; then
    echo -e "${GREEN}  Nginx 配置正确${NC}"
else
    echo -e "${RED}  Nginx 配置有误，请检查${NC}"
    exit 1
fi

# 11. 启动服务
echo -e "${YELLOW}[11/12] 启动服务...${NC}"
sudo systemctl enable astrology
sudo systemctl start astrology
sudo systemctl restart nginx

# 12. 验证
echo -e "${YELLOW}[12/12] 验证部署...${NC}"
sleep 3

HEALTH=$(curl -s http://127.0.0.1:8000/health || echo "{}")
if echo "$HEALTH" | grep -q "healthy"; then
    echo -e "${GREEN}  ✅ 健康检查通过${NC}"
else
    echo -e "${RED}  ⚠️ 健康检查未通过，查看日志...${NC}"
    sudo journalctl -u astrology -n 20 --no-pager
fi

# 测试计算
echo -e "${BLUE}  测试星盘计算...${NC}"
CALC_RESULT=$(curl -s -X POST http://127.0.0.1:8000/calculate \
  -H "Content-Type: application/json" \
  -d '{"birthDate":"1990-05-15","birthTime":"14:30","transitDate":"2026-04-25","transitTime":"12:00"}' 2>/dev/null || echo "{}")

if echo "$CALC_RESULT" | grep -q "swisseph"; then
    echo -e "${GREEN}  ✅ Swiss Ephemeris 计算正常${NC}"
else
    echo -e "${RED}  ⚠️ 计算测试异常${NC}"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  部署完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "访问地址: ${BLUE}http://$(curl -s ifconfig.me 2>/dev/null || echo '你的服务器IP')${NC}"
echo ""
echo "常用命令:"
echo "  查看日志: sudo journalctl -u astrology -f"
echo "  重启应用: sudo systemctl restart astrology"
echo "  重启 Nginx: sudo systemctl restart nginx"
echo "  查看状态: sudo systemctl status astrology"
echo ""
echo -e "备份位置: ${YELLOW}$BACKUP_DIR${NC}"
echo ""
echo -e "${GREEN}验证计算精度:${NC}"
echo "  curl -X POST http://127.0.0.1:8000/calculate \\"
echo "    -H \"Content-Type: application/json\" \\"
echo '    -d' "'{\"birthDate\":\"1990-05-15\",\"birthTime\":\"14:30\",\"transitDate\":\"2026-04-25\",\"transitTime\":\"12:00\"}'"

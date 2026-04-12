# Astrology System Deployment Guide

## 方案一：Vercel 部署（推荐，免费）

### 1. 准备工作（你需要做）
- [ ] 注册 GitHub 账号
- [ ] 注册 Vercel 账号（用 GitHub 登录）
- [ ] 将代码推送到 GitHub 仓库

### 2. 部署步骤（我可以指导你）
```bash
# 1. 初始化 Git（在项目目录）
git init
git add .
git commit -m "Initial commit"

# 2. 创建 GitHub 仓库并推送
git remote add origin https://github.com/YOUR_USERNAME/astrology-system.git
git push -u origin main
```

### 3. Vercel 自动部署
- 登录 Vercel
- Import GitHub 仓库
- 自动部署完成

---

## 方案二：PythonAnywhere（免费，适合 Python）

### 1. 注册账号（你需要做）
- [ ] 访问 https://www.pythonanywhere.com
- [ ] 注册免费账号

### 2. 上传代码（我可以写脚本）
```bash
# 在 PythonAnywhere Bash console 中
git clone https://github.com/YOUR_USERNAME/astrology-system.git
cd astrology-system
pip install -r requirements.txt
```

### 3. 配置 Web 应用（我可以指导你）
- 进入 Web 标签
- 创建新应用
- 选择 Flask + Python 3.10
- 修改 WSGI 配置文件

---

## 方案三：阿里云/腾讯云（付费，性能好）

### 1. 购买服务器（你需要做）
- [ ] 注册阿里云/腾讯云账号
- [ ] 购买轻量应用服务器（约 50-100元/月）
- [ ] 选择 Ubuntu 22.04 系统

### 2. 服务器配置（我可以写脚本）
```bash
# 安装依赖
sudo apt update
sudo apt install python3-pip python3-venv nginx

# 部署应用
# ...（我可以提供完整脚本）
```

---

## 当前已完成的工作

✅ 1. 创建了生产环境配置文件 `config.py`
✅ 2. 更新了依赖文件 `requirements.txt`
✅ 3. 创建了 Vercel 部署配置 `vercel.json`
✅ 4. 创建了 WSGI 配置文件 `wsgi.py`

---

## 下一步需要你决定

**请选择你想要的部署方案：**

1. **Vercel** - 免费、最简单、推荐
2. **PythonAnywhere** - 免费、专为 Python 设计
3. **阿里云/腾讯云** - 付费、性能好、完全控制
4. **其他** - 请告诉我

选择后，我会提供详细的部署步骤。

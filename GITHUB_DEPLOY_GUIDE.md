# GitHub 部署指南

## 方法：使用 Personal Access Token

由于需要身份验证，请按以下步骤操作：

### 步骤 1：创建 Personal Access Token

1. 登录 GitHub：https://github.com
2. 点击右上角头像 → Settings
3. 左侧菜单最下方 → Developer settings
4. 左侧菜单 → Personal access tokens → Tokens (classic)
5. 点击 Generate new token (classic)
6. 填写信息：
   - Note: `Astrology System Deploy`
   - Expiration: 7 days (或你想要的时间)
   - 勾选以下权限：
     - ✅ repo (完整仓库访问)
7. 点击 Generate token
8. **复制生成的 token**（只显示一次！）

### 步骤 2：提供 Token 给我

将 token 发给我，格式如下：
```
ghp_xxxxxxxxxxxxxxxxxxxx
```

我会用这个 token 完成推送。

### 步骤 3：删除 Token（部署完成后）

部署完成后，你可以删除这个 token 以保证安全。

---

## 替代方法：你自己推送

如果你不想提供 token，可以自己执行：

```bash
cd ~/Desktop/astrology-system

# 1. 配置 Git 用户名和邮箱
git config user.name "xiaoshanwu2023"
git config user.email "xiaoshanwu2023@gmail.com"

# 2. 在 GitHub 网页上创建空仓库
# 访问: https://github.com/new
# 仓库名: astrology-system
# 选择 Public

# 3. 推送代码
git remote add origin https://github.com/xiaoshanwu2023/astrology-system.git
git push -u origin main
```

---

## 部署到 Vercel（推送完成后）

### 1. 登录 Vercel
- 访问 https://vercel.com
- 用 GitHub 账号登录

### 2. 导入项目
- 点击 "Add New Project"
- 选择 `astrology-system` 仓库
- 点击 Import

### 3. 配置部署
- Framework Preset: 选择 "Other"
- Build Command: 留空
- Output Directory: 留空
- 点击 Deploy

### 4. 等待部署完成
- 大约 2-3 分钟
- 完成后会获得一个网址，如：`https://astrology-system-xxxx.vercel.app`

---

## 需要帮助？

请告诉我：
1. 你想用哪种方法？（提供 token / 自己推送）
2. 如果选择提供 token，请发给我

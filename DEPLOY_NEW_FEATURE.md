# 部署指南：行运盘星象解读新功能上线

## 一、当前状态

代码已在本地仓库完成提交（commit 在 `/Users/wuxiaoshan/Documents/kimi/tasks/2026-10-03/19-23-53-d45fc3ae/astrology-system`），
但**尚未推送到 GitHub**——本机钥匙串没有 github.com 的登录凭证，需要您操作一次推送。

## 二、推送到 GitHub（二选一）

### 方式 A：在本机终端手动推送（推荐）
```bash
cd "/Users/wuxiaoshan/Documents/kimi/tasks/2026-10-03/19-23-53-d45fc3ae/astrology-system"
git push origin master   # 会弹出 GitHub 登录，用 xiaoshanwu2023@gmail.com 账号授权即可
```
（GitHub 已不支持密码推送，弹窗里用浏览器授权或 Personal Access Token。）

### 方式 B：如果分支名不是 master
先 `git branch` 看一下当前分支名（可能是 main），然后 `git push origin <分支名>`。

## 三、腾讯云服务器部署

推送完成后，登录腾讯云 Lighthouse 服务器（就是您给的 OrcaTerm 终端链接），执行：

```bash
# 1. 进入代码目录（deploy_tencent.sh 使用的路径）
cd /var/www/astrology-system
# 如果提示不存在，则代码在 ~/astrology-system（旧版 deploy.sh 的路径），先进那个

# 2. 拉取最新代码
git pull origin master    # 或对应分支名

# 3. 安装新增依赖（pyswisseph 服务器上应该已有，保险起见再装一次）
pip3 install pyswisseph pandas openpyxl
# 如果服务器用的是 venv，先激活虚拟环境再装

# 4. 重启服务
sudo systemctl restart astrology

# 5. 检查状态与日志
sudo systemctl status astrology
tail -50 /var/log/astrology/app.log
```

## 四、上线后验证

1. 打开 https://astro-lucky.com ，填写出生信息和一个行运日期，生成星盘报告。
2. 结果页应能看到以下新内容：
   - **行运盘表格**多了「状态」列：逆行的行星显示 🔁 逆行（红色）
   - **🪐 行运盘行星间相位**卡片：行运时刻行星彼此之间的相位 + 解读
   - **💫 行运行星状态详解**卡片：每颗行运行星的星座/宫位（本命宫、太阳宫、上升宫三套）+ 知识库解读
   - 上升/太阳相位每条下面多了「📖 星象参考：」的具体解读
3. 如果页面还是旧版，强刷浏览器缓存（Cmd+Shift+R）。

## 五、回滚方法（万一出问题）

```bash
cd /var/www/astrology-system
git log --oneline -5                    # 找到上线前的 commit
git reset --hard 74ed05c                # 74ed05c 是本次改动前的最后一个提交
sudo systemctl restart astrology
```

## 六、本次改动文件清单

| 文件 | 类型 | 说明 |
|---|---|---|
| chart_core.py | 新增 | 统一计算核心（原 app.py / tencent_lighthouse.py 里重复的计算逻辑收拢到这里），新增行运盘内部相位计算 |
| astro_interpreter.py | 新增 | 知识库解读引擎（启动时加载 data/astro_events_kb.csv） |
| data/astro_events_kb.csv | 新增 | 星象解读知识库，9012 条（苏珊米勒 2019-2024 全部 67 期运势提取 + 星历核算） |
| swisseph_chart.py | 修改 | 修复 timedelta 导入 bug；行星数据增加速度和逆行字段 |
| app.py / tencent_lighthouse.py | 修改 | 改为引用 chart_core.py，路由行为不变 |
| templates/result.html | 修改 | 新增 3 个展示板块 + 行运盘状态列 |
| requirements.txt | 修改 | 补 pyswisseph、pandas、openpyxl |
| test_integration.py | 新增 | 集成测试（服务器上也可以跑：`python3 test_integration.py`） |

注意：知识库文件 data/astro_events_kb.csv 约 2MB，解读引擎在 gunicorn 每个 worker 启动时加载一次（约 1 秒），不影响请求速度。

# test_integration.py - 端到端集成测试
# 启动 app.py（端口 5001），POST /calculate（带 province/cityName/coordinates）
# 后 GET /result，断言页面包含新功能区块与备案信息
import os
import signal
import subprocess
import sys
import time

import requests

BASE_URL = 'http://127.0.0.1:5001'
PAYLOAD = {
    'name': 'wd',
    'birthDate': '1984-01-18',
    'birthTime': '14:55',
    'province': '福建',
    'cityName': '厦门',
    'coordinates': '118.08,24.48',
    'transitDate': '2024-06-15',
    'transitTime': '12:00',
    'timezone': '8.0'
}


def wait_for_server(timeout=30):
    """轮询等待开发服务器就绪"""
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            r = requests.get(BASE_URL + '/', timeout=2)
            if r.status_code == 200:
                return True
        except requests.RequestException:
            pass
        time.sleep(0.5)
    return False


def main():
    repo_dir = os.path.dirname(os.path.abspath(__file__))
    # 独立进程组启动，测试结束后整组杀掉（debug 模式会派生 reloader 子进程）
    proc = subprocess.Popen(
        [sys.executable, 'app.py'],
        cwd=repo_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        start_new_session=True
    )
    try:
        if not wait_for_server():
            raise RuntimeError('服务器启动超时')

        s = requests.Session()

        # 0. 首页应包含备案信息
        r0 = s.get(BASE_URL + '/', timeout=10)
        assert r0.status_code == 200, f'/ 状态码异常: {r0.status_code}'
        assert '闽ICP备2026021003号' in r0.text, '首页缺少 ICP 备案号'
        assert '闽公网安备35040002000270号' in r0.text, '首页缺少公网安备号'
        print('GET / OK，首页包含备案信息')

        # 1. POST /calculate
        r = s.post(BASE_URL + '/calculate', json=PAYLOAD, timeout=30)
        assert r.status_code == 200, f'/calculate 状态码异常: {r.status_code}'
        body = r.json()
        assert body.get('success') is True, f'/calculate 返回失败: {body}'
        assert body.get('redirect_url') == '/result', f'redirect_url 异常: {body}'
        print('POST /calculate OK ->', body)

        # 2. GET /result（带 session cookie）
        r = s.get(BASE_URL + '/result', timeout=30)
        assert r.status_code == 200, f'/result 状态码异常: {r.status_code}'
        html = r.text

        # 出生地点与既有板块
        assert '福建厦门' in html, '缺少出生地点“福建厦门”'
        assert '行运盘行星间相位' in html, '缺少“行运盘行星间相位”卡片'
        assert ('逆行' in html) or ('顺行' in html), '缺少逆行/顺行状态'
        assert '星象参考' in html, '缺少“星象参考”解读'
        assert '行运行星状态详解' in html, '缺少“行运行星状态详解”卡片'

        # 新增：本月天象卡片（服务端渲染）
        assert '本月天象' in html, '缺少“本月天象”卡片'
        assert '当月行星逆行' in html, '缺少“当月行星逆行”小节'

        # 备案信息
        assert '闽ICP备2026021003号' in html, '结果页缺少 ICP 备案号'
        assert '闽公网安备35040002000270号' in html, '结果页缺少公网安备号'

        # 模态框：服务端渲染的六板块
        assert ('本月日月食' in html) or ('本月新月与满月' in html), '模态框缺少月度天象板块'
        assert '行运行星 × 本命太阳' in html, '模态框缺少“行运行星 × 本命太阳”板块'
        assert '行运行星 × 本命上升' in html, '模态框缺少“行运行星 × 本命上升”板块'
        assert '其他行星位置影响' in html, '模态框缺少“其他行星位置影响”板块'

        # 日期本地化：相位条目应显示精确成相日；KB 原文日期不应残留
        assert '精确成相' in html, '缺少“精确成相”标注'
        import re as _re
        # 抽查：2024-06-15 行运下，太阳×水星合相原文的“4月2日”应被替换为“当天”
        assert '太阳与水星4月2日合相' not in html, 'KB 原文日期残留（4月2日）'
        assert '太阳与水星当天合相' in html, 'embed 替换未生效'
        # 模态框板块3：土星逆行原文“9月18日恢复顺行”不应原样残留
        assert '9月18日恢复顺行' not in html, '逆行 KB 原文日期残留（9月18日）'
        # 带年份的长期陈述不应被破坏
        assert not _re.search(r'\x00\d+\x00', html), '占位符泄漏到页面'

        # 已删除板块不应出现
        assert '📖 星象解读' not in html, '“星象解读”卡片应已删除'
        assert '按重要性排序' not in html, '“运势解读（按重要性排序）”板块应已删除'
        assert '/api/fortune-priority' not in html, '前端不应再调用 /api/fortune-priority'
        assert '/api/astro-events' not in html, '前端不应再调用 /api/astro-events'
        assert '500' not in r.headers.get('X-Error', ''), '出现 500 错误'
        print('GET /result OK，页面断言全部通过：')
        print('  含：福建厦门 / 本月天象 / 当月行星逆行 / 备案号×2 / 模态框板块')
        print('  不含：星象解读卡片 / 按重要性排序 / /api/fortune-priority / /api/astro-events')

        # 3. 无 session 时 /result 应重定向回首页（行为兼容检查）
        r2 = requests.get(BASE_URL + '/result', timeout=10, allow_redirects=False)
        assert r2.status_code == 302, f'无 session 时应 302 重定向，实际: {r2.status_code}'
        print('无 session 重定向行为 OK')

        print('\n✅ 集成测试全部通过')
        return 0
    finally:
        try:
            os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
        except ProcessLookupError:
            pass
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            os.killpg(os.getpgid(proc.pid), signal.SIGKILL)


if __name__ == '__main__':
    sys.exit(main())

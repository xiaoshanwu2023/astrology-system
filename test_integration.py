# test_integration.py - 端到端集成测试
# 启动 app.py（端口 5001），POST /calculate 后 GET /result，断言页面包含新功能区块
import os
import signal
import subprocess
import sys
import time

import requests

BASE_URL = 'http://127.0.0.1:5001'
PAYLOAD = {
    'birthDate': '1990-05-15',
    'birthTime': '14:30',
    'transitDate': '2024-06-15',
    'transitTime': '12:00',
    'timezone': '8.0',
    'coordinates': '116.4,39.9'
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
        assert '行运盘行星间相位' in html, '缺少“行运盘行星间相位”卡片'
        assert ('逆行' in html) or ('顺行' in html), '缺少逆行/顺行状态'
        assert '星象参考' in html, '缺少“星象参考”解读'
        assert '行运行星状态详解' in html, '缺少“行运行星状态详解”卡片'
        assert '500' not in r.headers.get('X-Error', ''), '出现 500 错误'
        print('GET /result OK，页面包含：行运盘行星间相位 / 逆行·顺行 / 星象参考 / 行运行星状态详解')

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

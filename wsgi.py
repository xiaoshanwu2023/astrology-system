# 部署到 PythonAnywhere 的 WSGI 配置文件
# 将此文件内容复制到 PythonAnywhere 的 WSGI 配置中

import sys
import os

# 添加项目路径
path = '/home/yourusername/astrology-system'
if path not in sys.path:
    sys.path.insert(0, path)

# 设置环境变量
os.environ['FLASK_ENV'] = 'production'
os.environ['SECRET_KEY'] = 'your-secret-key-here'

# 导入 Flask 应用
from app import app as application

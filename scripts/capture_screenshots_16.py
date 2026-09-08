#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务16 视觉2.0与WebGL性能集中验收 自动化截图套件
捕获 7 大核心页面 + 5 大视口 + WebGL/Fallback 对比真实截图并归档至:
Walkthroughes/screenshots/20260908_任务16_视觉2.0与WebGL性能集中验收/
"""

import http.server
import json
import os
import socketserver
import subprocess
import sys
import threading
import time
from pathlib import Path

WORKSPACE = Path(__file__).resolve().parent.parent
OUTPUT_DIR = WORKSPACE / "Walkthroughes" / "screenshots" / "20260908_任务16_视觉2.0与WebGL性能集中验收"

BROWSER_CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
]

def find_browser():
    for b in BROWSER_CANDIDATES:
        if os.path.exists(b):
            return b
    return None

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(WORKSPACE), **kwargs)

    def log_message(self, format, *args):
        pass

def main():
    print("=" * 60)
    print("开始执行 任务16 视觉2.0与WebGL性能集中验收真实运行截图捕获...")
    print("=" * 60)

    browser = find_browser()
    if not browser:
        print("[ERROR] 未找到 Chrome / Edge 浏览器，无法自动截图")
        sys.exit(1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    PORT = 8170
    for p in range(8170, 8195):
        try:
            httpd = socketserver.TCPServer(("127.0.0.1", p), QuietHandler)
            PORT = p
            break
        except OSError:
            continue

    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"本地测试服务器运行于 http://127.0.0.1:{PORT}")

    shots = [
        # 1. 7 大核心页面验收 (390x844 标准机型)
        ("01_视觉集中验收_首页_首屏舞台化.png", "index.html?view=home", 390, 844, 1500),
        ("02_视觉集中验收_东坡人生实验_七星轨道微游戏.png", "index.html?view=quiz", 390, 844, 1500),
        ("03_视觉集中验收_黄州结果页_第二视觉高潮.png", "index.html?view=result&station_id=station_huangzhou&mood_id=mood_anxious", 390, 844, 1500),
        ("04_视觉集中验收_人生星河_九站漫游长河长卷.png", "index.html?view=universe", 390, 844, 1500),
        ("05_视觉集中验收_人生星河_视口居中详情抽屉.png", "index.html?view=universe&open_station_id=station_huangzhou", 390, 844, 1500),
        ("06_视觉集中验收_黄州站点四章_精神星核与诗词星群.png", "index.html?view=station&station_id=station_huangzhou", 390, 844, 1500),
        ("07_视觉集中验收_作品详情页_沉浸阅读纸笺.png", "index.html?view=work&work_id=work_dingfengbo", 390, 844, 1500),
        ("08_视觉集中验收_今日东坡_3比4纯净收藏卡.png", "index.html?view=daily", 390, 844, 1500),
        ("09_视觉集中验收_分享卡全屏舞台_顶部三Tab与双微按钮.png", "index.html?view=share-card&type=station&station_id=station_huangzhou", 390, 844, 1500),
        ("10_视觉集中验收_分享卡_今日东坡签真机预览.png", "index.html?view=share-card&type=daily", 390, 844, 1500),
        ("11_视觉集中验收_分享卡_人生节点卡真机预览.png", "index.html?view=share-card&type=node&station_id=station_huangzhou&quote_id=quote_dingfengbo_01", 390, 844, 1500),

        # 2. WebGL 档位与 Fallback 验收
        ("12_WebGL性能档位_Fallback纯水墨兜底模式.png", "index.html?view=home&quality=fallback", 390, 844, 1500),
        ("13_WebGL性能档位_Low轻量省电档位.png", "index.html?view=universe&quality=low", 390, 844, 1500),
        ("14_WebGL性能档位_ContextLost安全接管状态.png", "index.html?view=result&station_id=station_huangzhou&simulate_lost=1", 390, 844, 1500),

        # 3. 5 大移动端典型视口适配集中验收
        ("15_移动端视口适配_320px极窄屏_首页.png", "index.html?view=home", 320, 568, 1500),
        ("16_移动端视口适配_375px经典屏_黄州结果页.png", "index.html?view=result&station_id=station_huangzhou&mood_id=mood_anxious", 375, 667, 1500),
        ("17_移动端视口适配_390px现代主流屏_人生星河.png", "index.html?view=universe", 390, 844, 1500),
        ("18_移动端视口适配_430px大屏旗舰_分享卡全屏.png", "index.html?view=share-card&type=station&station_id=station_huangzhou", 430, 932, 1500),
        ("19_移动端视口适配_480px容器边界_今日东坡.png", "index.html?view=daily", 480, 854, 1500),

        # 4. 动效与安全区细节
        ("20_动效与安全区_全站统一返程星轨与底部Dock.png", "index.html?view=station&station_id=station_huangzhou", 390, 844, 1500),
    ]

    success_count = 0
    for filename, url_path, w, h, wait_ms in shots:
        target_file = OUTPUT_DIR / filename
        full_url = f"http://127.0.0.1:{PORT}/{url_path}"

        cmd = [
            browser,
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            f"--screenshot={str(target_file)}",
            f"--window-size={w},{h}",
            f"--virtual-time-budget={wait_ms}",
            full_url
        ]

        try:
            res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=20)
            if target_file.is_file() and target_file.stat().st_size > 0:
                print(f"  [OK] 成功捕获 ({w}x{h}): {filename} ({target_file.stat().st_size / 1024:.1f} KB)")
                success_count += 1
            else:
                print(f"  [FAIL] 截图未生成或为空: {filename}")
        except Exception as e:
            print(f"  [ERROR] 执行失败: {filename}, 错误: {e}")

    print("=" * 60)
    print(f"截图捕获完成: {success_count} / {len(shots)} 张成功落盘")
    print(f"保存目录: {OUTPUT_DIR}")
    print("=" * 60)

    try:
        httpd.shutdown()
    except Exception:
        pass

if __name__ == "__main__":
    main()

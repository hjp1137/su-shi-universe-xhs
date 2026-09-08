#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15.5.1 Canvas站点卡运行时修复与分享卡动态渲染门禁
使用真实无头浏览器 (Headless Chrome/Edge) 动态执行 CardCanvas 真实渲染，
验证三类分享卡与图片失败 Fallback 的真实执行、DataURL 合法性及预览/保存/发布一致性。
"""

import base64
import http.server
import json
import os
import re
import socketserver
import subprocess
import sys
import threading
import time
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
SCREENSHOT_DIR = PROJECT_ROOT / "Walkthroughes" / "screenshots" / "20260908_任务15.5.1_Canvas站点卡运行时修复与分享卡动态渲染门禁"

BROWSER_CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
]


def find_browser():
    for p in BROWSER_CANDIDATES:
        if os.path.exists(p):
            return p
    return None


class CanvasTestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

    def do_GET(self):
        if self.path == "/canvas_test_harness.html":
            harness_path = PROJECT_ROOT / "scripts" / "canvas_test_harness.html"
            content = harness_path.read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)
            return
        return super().do_GET()

    def do_POST(self):
        if self.path == "/api/test-result":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            try:
                data = json.loads(body.decode("utf-8"))
                self.server.test_results = data
            except Exception as e:
                self.server.test_results = {"error": str(e)}
            finally:
                self.server.event_done.set()

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"status":"ok"}')
            return
        self.send_response(404)
        self.end_headers()

    def log_message(self, format, *args):
        # 静默常规静态文件请求日志
        pass


def run_dynamic_canvas_test():
    print("=" * 60)
    print("开始执行 任务15.5.1 Canvas 动态渲染门禁测试...")
    print("=" * 60)

    browser_exe = find_browser()
    assert browser_exe is not None, "未找到 Chrome 或 Edge 浏览器执行文件！"
    print(f"  [INFO] 使用无头浏览器: {browser_exe}")

    PORT = 8098
    # 动态寻找可用端口
    for p in range(8098, 8120):
        try:
            httpd = socketserver.TCPServer(("127.0.0.1", p), CanvasTestHandler)
            PORT = p
            break
        except OSError:
            continue

    httpd.test_results = None
    httpd.event_done = threading.Event()

    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"  [INFO] 离线测试服务器已启动: http://127.0.0.1:{PORT}")

    target_url = f"http://127.0.0.1:{PORT}/canvas_test_harness.html"
    cmd = [
        browser_exe,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-web-security",
        "--disable-extensions",
        f"--user-data-dir={PROJECT_ROOT / 'temp_chrome_profile'}",
        target_url,
    ]

    print("  [INFO] 正在启动无头浏览器并加载 Canvas 渲染环境...")
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    try:
        # 等待前端测试执行完成
        finished = httpd.event_done.wait(timeout=25)
        if not finished:
            print("  [FAIL] 门禁执行超时 (25s)！浏览器未能按时返回渲染结果。")
            proc.terminate()
            httpd.shutdown()
            sys.exit(1)
    finally:
        try:
            proc.terminate()
            proc.wait(timeout=3)
        except Exception:
            pass
        httpd.shutdown()

    results = httpd.test_results
    assert results is not None, "未收到测试结果！"

    print("\n--- 动态渲染门禁详细断言 ---")
    tests = results.get("tests", {})

    # 1. 人生站点卡 (station_result)
    t1 = tests.get("station_result", {})
    assert t1.get("passed") is True, f"station_result 渲染失败: {t1.get('error')}"
    assert t1.get("length", 0) > 5000, "station_result DataURL 长度过短，可能为空白图"
    print(f"  [PASS] 1. station_result 真实渲染成功: 耗时 {t1.get('elapsedMs')}ms, DataURL 长度 {t1.get('length')} 字符 (已修复 assets 签名缺陷)")

    # 2. 今日东坡签 (daily_sign)
    t2 = tests.get("daily_sign", {})
    assert t2.get("passed") is True, f"daily_sign 渲染失败: {t2.get('error')}"
    assert t2.get("length", 0) > 5000, "daily_sign DataURL 长度过短"
    print(f"  [PASS] 2. daily_sign 真实渲染成功: 耗时 {t2.get('elapsedMs')}ms, DataURL 长度 {t2.get('length')} 字符")

    # 3. 人生节点卡 (station_node)
    t3 = tests.get("station_node", {})
    assert t3.get("passed") is True, f"station_node 渲染失败: {t3.get('error')}"
    assert t3.get("length", 0) > 5000, "station_node DataURL 长度过短"
    print(f"  [PASS] 3. station_node 真实渲染成功: 耗时 {t3.get('elapsedMs')}ms, DataURL 长度 {t3.get('length')} 字符")

    # 4. 图片加载失败 Fallback
    t4 = tests.get("image_error_fallback", {})
    assert t4.get("passed") is True, f"图片加载失败 Fallback 异常: {t4.get('error')}"
    assert t4.get("length", 0) > 3000, "Fallback DataURL 长度过短"
    print(f"  [PASS] 4. 图片失败平滑水墨 Fallback 真实通过: 耗时 {t4.get('elapsedMs')}ms, 不白屏, 正常导出合法 PNG")

    # 5. 所见即所得 DataURL 一致性
    t5 = tests.get("dataurl_consistency", {})
    assert t5.get("passed") is True, "预览、保存与发布所用 DataURL 不一致！"
    assert t5.get("previewMatch") is True, "页面预览图 src 未对齐 Canvas DataURL"
    assert t5.get("saveMatch") is True, "Bridge.saveImage 未对齐 Canvas DataURL"
    assert t5.get("postMatch") is True, "Bridge.postNote 未对齐 Canvas DataURL"
    print("  [PASS] 5. 所见即所得闭环达成: 页面预览 / Bridge保存 / Bridge发布 100% 使用同一个 DataURL")

    # 保存 4 张高保真 PNG 图像供视觉验收留证
    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
    images = results.get("images", {})

    image_mappings = [
        ("station_result", "01_分享卡_人生站点卡_黄州_真机渲染.png"),
        ("daily_sign", "02_分享卡_今日东坡签_真机渲染.png"),
        ("station_node", "03_分享卡_人生节点卡_真机渲染.png"),
        ("fallback", "04_分享卡_素材加载失败水墨Fallback_真机渲染.png"),
    ]

    print("\n--- 保存真机渲染 PNG 证据附件 ---")
    for key, filename in image_mappings:
        data_url = images.get(key)
        if data_url and "," in data_url:
            b64_data = data_url.split(",", 1)[1]
            raw_png = base64.b64decode(b64_data)
            out_file = SCREENSHOT_DIR / filename
            out_file.write_bytes(raw_png)
            print(f"  [SAVED] {filename} ({len(raw_png)} bytes) -> {out_file.relative_to(PROJECT_ROOT)}")

    # 清理临时 profile 目录
    temp_profile = PROJECT_ROOT / "temp_chrome_profile"
    if temp_profile.exists():
        try:
            import shutil
            shutil.rmtree(temp_profile, ignore_errors=True)
        except Exception:
            pass

    print("\n" + "=" * 60)
    print("【SUCCESS】任务15.5.1 Canvas 动态渲染门禁全部通过 (100% PASS)！")
    print("=" * 60)


if __name__ == "__main__":
    run_dynamic_canvas_test()

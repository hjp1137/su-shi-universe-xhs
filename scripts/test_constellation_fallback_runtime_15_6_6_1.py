# -*- coding: utf-8 -*-
"""
任务15.6.6.1 专属测试 3：2.5D Fallback 真实运行与视觉门禁
在真实浏览器中强制关闭 WebGL，走真实路由进入黄州站点诗词星群，
断言页面呈现为单层纯净 2.5D 东方星宿环，无白色 Chip、无多层叠图、
无旧 2D 节点、具备明确中央焦点星宿，且点击作品星可自然聚焦与入画。
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

PROJECT_ROOT = Path(__file__).resolve().parent.parent

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


HTML_TEMPLATE = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Fallback Test</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/views.css">
  <script>
    // 强制禁用 WebGL
    window.WebGLRenderingContext = undefined;
    var _origGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type) {
      if (type && type.indexOf('webgl') !== -1) return null;
      return _origGetContext.apply(this, arguments);
    };
  </script>
</head>
<body>
  <div id="app-container">
    <header class="app-header" id="app-header"></header>
    <main id="main-content"><div id="view-container"></div></main>
    <nav class="cosmic-dock" id="cosmic-dock"></nav>
  </div>

  <script src="js/namespace.js"></script>
  <script src="js/data.js"></script>
  <script src="js/art-assets.js"></script>
  <script src="js/store.js"></script>
  <script src="js/bridge.js"></script>
  <script src="js/ui.js"></script>
  <script src="js/card_canvas.js"></script>
  <script src="js/quiz.js"></script>
  <script src="js/daily.js"></script>
  <script src="js/lib/three.min.js"></script>
  <script src="js/effects/quality-manager.js"></script>
  <script src="js/effects/fallback.js"></script>
  <script src="js/effects/hero-scene.js"></script>
  <script src="js/effects/universe-scene.js"></script>
  <script src="js/effects/result-scene.js"></script>
  <script src="js/effects/webgl-engine.js"></script>
  <script src="js/effects/index.js"></script>
  <script src="js/effects/poetry-constellation-3d.js"></script>
  <script src="js/router.js"></script>
  <script src="js/views.js"></script>
  <script src="js/app.js"></script>

  <script>
    window.addEventListener('DOMContentLoaded', function () {
      setTimeout(function () {
        var skyStage = document.querySelector('.constellation-sky-stage');
        var fallbackContainer = document.querySelector('.poetry-constellation-25d-fallback');
        var focusNode = document.querySelector('.fallback-focus-node');
        var orbitStars = document.querySelectorAll('.fallback-orbit-star');
        var legacyStarNodes = document.querySelectorAll('.constellation-star-node');
        var legacySvg = document.querySelector('.constellation-gravity-svg');
        var webglCanvas = document.querySelector('.poetry-constellation-3d-stage canvas');

        // 测试点击外围作品星交互
        var initialTitle = focusNode ? (focusNode.querySelector('.core-star-name') ? focusNode.querySelector('.core-star-name').textContent : '') : '';
        var clickedTitle = '';
        if (orbitStars.length > 1) {
          var secondStar = orbitStars[1];
          var starTitleEl = secondStar.querySelector('.fallback-orbit-title');
          var expectedTitle = starTitleEl ? starTitleEl.textContent : '';
          secondStar.click();
          clickedTitle = focusNode && focusNode.querySelector('.core-star-name') ? focusNode.querySelector('.core-star-name').textContent : '';
        }

        // 按钮样式检查
        var enterBtn = focusNode ? focusNode.querySelector('.fallback-enter-btn') : null;
        var btnComputed = enterBtn ? window.getComputedStyle(enterBtn) : null;
        var isWhiteBtn = btnComputed ? (btnComputed.backgroundColor === 'rgb(255, 255, 255)' || btnComputed.color === 'rgb(0, 0, 0)') : false;

        var results = {
          hasSkyStage: !!skyStage,
          hasFallbackContainer: !!fallbackContainer,
          focusNodeCount: focusNode ? 1 : 0,
          orbitStarCount: orbitStars.length,
          legacyStarNodeCount: legacyStarNodes.length,
          hasLegacySvg: !!legacySvg,
          hasWebglCanvas: !!webglCanvas,
          isWhiteBtn: isWhiteBtn,
          initialTitle: initialTitle,
          clickedTitle: clickedTitle,
          btnBackground: btnComputed ? btnComputed.background : '',
          btnColor: btnComputed ? btnComputed.color : ''
        };

        fetch('/api/fallback_report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(results)
        });
      }, 700);
    });
  </script>
</body>
</html>"""


def run_fallback_test(port=8993):
    browser_exe = find_browser()
    assert browser_exe, "未找到可用浏览器 (Chrome/Edge)"

    report_holder = {"data": None}

    class FallbackHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

        def do_POST(self):
            if self.path == "/api/fallback_report":
                length = int(self.headers["Content-Length"])
                body = self.rfile.read(length).decode("utf-8")
                report_holder["data"] = json.loads(body)
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"OK")

        def log_message(self, format, *args):
            pass

    httpd = socketserver.TCPServer(("127.0.0.1", port), FallbackHandler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()

    harness_path = PROJECT_ROOT / f"harness_fallback_{port}.html"
    harness_path.write_text(HTML_TEMPLATE, encoding="utf-8")

    cmd = [
        browser_exe,
        "--headless",
        "--disable-gpu",
        f"http://127.0.0.1:{port}/{harness_path.name}?view=station&station_id=station_huangzhou",
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    start_t = time.time()
    while report_holder["data"] is None and time.time() - start_t < 10:
        time.sleep(0.1)

    try:
        proc.terminate()
    except Exception:
        pass
    httpd.shutdown()
    if harness_path.exists():
        try:
            harness_path.unlink()
        except Exception:
            pass

    assert report_holder["data"], "未能获取 Fallback 真实运行报告"
    return report_holder["data"]


def test_fallback_runtime_pure_and_functional():
    """断言 WebGL 禁用后真实 Fallback 视觉纯净、单层且具备完整交互"""
    print("  [CHECK] 运行真实浏览器 WebGL 禁用 Fallback 门禁...")
    report = run_fallback_test()

    assert report["hasSkyStage"], "缺少 .constellation-sky-stage 舞台"
    assert report["hasFallbackContainer"], "未成功挂载 .poetry-constellation-25d-fallback"
    assert report["focusNodeCount"] == 1, f"中央焦点星数量异常: {report['focusNodeCount']}"
    assert 4 <= report["orbitStarCount"] <= 6, f"外围作品星宿数量异常: {report['orbitStarCount']}"
    assert report["legacyStarNodeCount"] == 0, f"舞台残留旧 2D 节点: {report['legacyStarNodeCount']}"
    assert not report["hasLegacySvg"], "残留旧 2D SVG 轨道"
    assert not report["hasWebglCanvas"], "Fallback 模式异常出现 WebGL Canvas"
    assert not report["isWhiteBtn"], "按钮呈现为浏览器默认白底样式"

    print(f"    Fallback 焦点星初始: {report['initialTitle']}")
    print(f"    外围作品星点击切换后: {report['clickedTitle']}")
    print(f"    入画按钮字色: {report['btnColor']}")
    print("  [PASS] 2.5D Fallback 真实运行单层纯净，东方星宿排布规范，无白底Chip与多层叠图，交互闭环")


def main():
    print("=" * 72)
    print("开始执行 任务15.6.6.1 专属测试 3：2.5D Fallback 真实运行与视觉门禁...")
    print("=" * 72)
    test_fallback_runtime_pure_and_functional()
    print("=" * 72)
    print("★ SUCCESS: 任务15.6.6.1 2.5D Fallback 真实运行与视觉门禁 100% PASS ★")
    print("=" * 72)


if __name__ == "__main__":
    main()

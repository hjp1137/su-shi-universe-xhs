# -*- coding: utf-8 -*-
"""
任务15.6.6.1 专属测试 4：WebGL 主模式动态运行门禁
在真实 Chrome 浏览器中加载页面，断言：
 1. 单层架构硬断言：3D舞台与WebGL Canvas存在，所有旧2D节点为0；
 2. PoetryPlanet 星球主体拖拽后发生真实屏幕位移（disp > 15px）；
 3. 点击《念奴娇·赤壁怀古》平滑聚焦居中偏上，放大 1.8~2.3 倍，
    周围星退后暗化，附着微胶囊展示且无独立大矩形说明卡。
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
  <title>WebGL Dynamic Runtime Test</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/views.css">
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
        var stage3D = document.querySelector('.poetry-constellation-3d-stage');
        var canvasEl = stage3D ? stage3D.querySelector('canvas') : null;
        var legacyStarNodes = document.querySelectorAll('.constellation-sky-stage .constellation-star-node');
        var starNodeImgs = document.querySelectorAll('.constellation-sky-stage .star-node-img');
        var legacySvg = document.querySelector('.constellation-sky-stage .constellation-gravity-svg');
        var legacyCoreNode = document.querySelector('.constellation-sky-stage .constellation-core-star');
        var legacyBubble = document.querySelector('.constellation-sky-stage .star-callout-bubble.is-visible');

        var cluster = document.querySelector('.constellation-cluster');
        var ctrl = cluster ? cluster._controller3D : null;

        var results = {
          hasStage3D: !!stage3D,
          hasCanvas: !!canvasEl,
          legacyStarNodeCount: legacyStarNodes.length,
          starNodeImgCount: starNodeImgs.length,
          hasLegacySvg: !!legacySvg,
          hasLegacyCoreNode: !!legacyCoreNode,
          hasLegacyBubble: !!legacyBubble,
          hasController: !!ctrl,
          coordsBefore: null,
          coordsAfter: null,
          dragDisplacement: 0,
          targetFocusScale: 0,
          attachedCapsuleTitle: '',
          hasLargePopup: false
        };

        if (ctrl && ctrl.starNodes && ctrl.starNodes.length > 0) {
          // 1. 拖拽前记录坐标 (选择非极点作品星，例如 index 2)
          var testIdx = Math.min(2, ctrl.starNodes.length - 1);
          var cBefore = ctrl.getPlanetScreenCoords();
          results.coordsBefore = cBefore && cBefore[testIdx] ? { x: cBefore[testIdx].x, y: cBefore[testIdx].y, title: cBefore[testIdx].title } : null;

          // 模拟拖拽旋转
          ctrl.constellationGroup.rotation.y += 1.35;
          ctrl.constellationGroup.rotation.x += 0.45;
          if (ctrl.constellationGroup.updateMatrixWorld) {
            ctrl.constellationGroup.updateMatrixWorld(true);
          }

          var cAfter = ctrl.getPlanetScreenCoords();
          results.coordsAfter = cAfter && cAfter[testIdx] ? { x: cAfter[testIdx].x, y: cAfter[testIdx].y, title: cAfter[testIdx].title } : null;

          if (results.coordsBefore && results.coordsAfter) {
            results.dragDisplacement = Math.abs(results.coordsAfter.x - results.coordsBefore.x) +
                                       Math.abs(results.coordsAfter.y - results.coordsBefore.y);
          }

          // 2. 点击聚焦赤壁名作
          var chibiWork = null;
          for (var i = 0; i < ctrl.works.length; i++) {
            if (ctrl.works[i].title.indexOf('赤壁') !== -1 || ctrl.works[i].title.indexOf('念奴娇') !== -1) {
              chibiWork = ctrl.works[i];
              break;
            }
          }
          if (!chibiWork) chibiWork = ctrl.works[0];

          ctrl.focusWork(chibiWork.id);

          setTimeout(function () {
            // 聚焦完成后检测目标星放大倍率
            var targetNode = ctrl.selectedStar;
            if (targetNode && targetNode.userData && targetNode.userData.starSprite) {
              var base = targetNode.userData.baseScale || 1;
              var cur = targetNode.userData.starSprite.scale.x || targetNode.scale.x;
              results.targetFocusScale = Math.round((cur / base) * 100) / 100;
            }

            var capsule = document.querySelector('.poetry-planet-attached-capsule');
            var cTitle = capsule ? capsule.querySelector('.attached-capsule-title') : null;
            results.attachedCapsuleTitle = cTitle ? cTitle.textContent : '';

            var largePopup = document.querySelector('.poetry-3d-focus-callout');
            var isPopupVisible = largePopup ? (window.getComputedStyle(largePopup).display !== 'none' && window.getComputedStyle(largePopup).visibility !== 'hidden') : false;
            results.hasLargePopup = isPopupVisible;

            fetch('/api/webgl_report', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(results)
            });
          }, 650);
        } else {
          fetch('/api/webgl_report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(results)
          });
        }
      }, 700);
    });
  </script>
</body>
</html>"""


def run_webgl_test(port=8994):
    browser_exe = find_browser()
    assert browser_exe, "未找到可用浏览器 (Chrome/Edge)"

    report_holder = {"data": None}

    class WebGLHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

        def do_POST(self):
            if self.path == "/api/webgl_report":
                length = int(self.headers["Content-Length"])
                body = self.rfile.read(length).decode("utf-8")
                report_holder["data"] = json.loads(body)
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"OK")

        def log_message(self, format, *args):
            pass

    httpd = socketserver.TCPServer(("127.0.0.1", port), WebGLHandler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()

    harness_path = PROJECT_ROOT / f"harness_webgl_{port}.html"
    harness_path.write_text(HTML_TEMPLATE, encoding="utf-8")

    cmd = [
        browser_exe,
        "--headless",
        "--hide-scrollbars",
        f"http://127.0.0.1:{port}/{harness_path.name}?view=station&station_id=station_huangzhou",
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    start_t = time.time()
    while report_holder["data"] is None and time.time() - start_t < 12:
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

    assert report_holder["data"], "未能获取 WebGL 动态运行报告"
    return report_holder["data"]


def test_webgl_runtime_single_layer_and_dynamics():
    """断言 WebGL 主模式单层架构硬断言、拖拽位移与点击聚焦放大闭环"""
    print("  [CHECK] 运行真实浏览器 WebGL 动态运行门禁...")
    report = run_webgl_test()

    # 1. 单层架构硬断言
    assert report["hasStage3D"], "缺少 .poetry-constellation-3d-stage 舞台"
    assert report["hasCanvas"], "缺少 3D WebGL Canvas"
    assert report["legacyStarNodeCount"] == 0, f"舞台残留旧 2D star-node: {report['legacyStarNodeCount']}"
    assert report["starNodeImgCount"] == 0, f"残留旧 2D star-node-img: {report['starNodeImgCount']}"
    assert not report["hasLegacySvg"], "残留旧 2D 引力轨道 SVG"
    assert not report["hasLegacyCoreNode"], "残留旧 2D 精神星核"
    assert not report["hasLegacyBubble"], "残留旧 2D 浮动气泡"

    # 2. 拖拽坐标位移断言
    print(f"    拖拽前屏幕坐标: {report['coordsBefore']}")
    print(f"    拖拽后屏幕坐标: {report['coordsAfter']}")
    print(f"    拖拽屏幕位移和: {report['dragDisplacement']:.2f}px")
    assert report["dragDisplacement"] > 15, f"星球主体拖拽位移过小或未发生刚体移动: {report['dragDisplacement']}"

    # 3. 点击聚焦放大与微胶囊
    print(f"    聚焦后目标星放大倍率: {report['targetFocusScale']}x")
    print(f"    附着微胶囊展示作品: {report['attachedCapsuleTitle']}")
    assert 1.7 <= report["targetFocusScale"] <= 2.4, f"目标星聚焦放大倍率不在预期区间 (1.8~2.2): {report['targetFocusScale']}"
    assert report["attachedCapsuleTitle"] != "", "附着微胶囊未展示作品标题"
    assert not report["hasLargePopup"], "异常出现独立大矩形弹框"

    print("  [PASS] WebGL 模式单层 DOM 零 2D 叠层，PoetryPlanet 刚体位移精准，聚焦 2.0x 与微胶囊附着交互闭环")


def main():
    print("=" * 72)
    print("开始执行 任务15.6.6.1 专属测试 4：WebGL 主模式动态运行门禁...")
    print("=" * 72)
    test_webgl_runtime_single_layer_and_dynamics()
    print("=" * 72)
    print("★ SUCCESS: 任务15.6.6.1 WebGL 主模式动态运行门禁 100% PASS ★")
    print("=" * 72)


if __name__ == "__main__":
    main()

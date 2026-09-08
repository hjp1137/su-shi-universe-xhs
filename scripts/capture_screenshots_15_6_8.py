# -*- coding: utf-8 -*-
"""
任务 15.6.8 自动化真实运行截图捕获脚本 (capture_screenshots_15_6_8.py)
生成全量 14 张真实运行截图并规范归档至:
Walkthroughes/screenshots/20260908_任务15.6.8_结果页减法_九站测试校准_今日东坡职责拆分_Canvas海报重构与新增场景资源接入/
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
OUTPUT_DIR = (
    WORKSPACE
    / "Walkthroughes"
    / "screenshots"
    / "20260908_任务15.6.8_结果页减法_九站测试校准_今日东坡职责拆分_Canvas海报重构与新增场景资源接入"
)

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


def create_harness_html():
    harness_path = WORKSPACE / "harness_15_6_8.html"
    content = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Harness 15.6.8</title>
  <meta name="viewport" content="width=390, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/views.css">
</head>
<body style="margin:0; padding:0; width:390px; height:844px; background:#0B101D; overflow-y:auto;">
  <div id="app-container" style="width:390px; min-height:844px;">
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
      var params = new URLSearchParams(window.location.search);
      var view = params.get('view') || 'home';
      var stationId = params.get('station_id') || 'station_hangzhou';
      var target = params.get('target') || '';
      var cardType = params.get('type') || 'daily';
      var nodeId = params.get('node_id') || 'node_huangzhou_1';

      if (view === 'result') {
        SuShiUniverse.Router.navigate('result', { stationId: stationId, station_id: stationId });
      } else if (view === 'daily') {
        SuShiUniverse.Router.navigate('daily');
        if (target === 'daily_bottom') {
          setTimeout(function () {
            var bCard = document.querySelector('.work-narrative-card') || document.querySelector('.result-actions');
            if (bCard) bCard.scrollIntoView({ block: 'start' });
          }, 300);
        }
      } else if (view === 'share-card') {
        SuShiUniverse.Router.navigate('share-card', {
          type: cardType,
          station_id: stationId,
          stationId: stationId,
          node_id: nodeId
        });
      } else if (view === 'station') {
        SuShiUniverse.Router.navigate('station', { station_id: stationId });
        if (target === 'constellation') {
          setTimeout(function () {
            var cEl = document.querySelector('.scene-4-constellation') || document.querySelector('.poetry-constellation-container');
            if (cEl) cEl.scrollIntoView({ block: 'start' });
          }, 400);
        } else if (target === 'fallback') {
          setTimeout(function () {
            var fEl = document.querySelector('.constellation-fallback-container') || document.querySelector('.scene-4-constellation');
            if (fEl) fEl.scrollIntoView({ block: 'start' });
          }, 400);
        }
      } else if (view === 'quiz') {
        SuShiUniverse.Router.navigate('quiz');
        if (target === 'auto_answer') {
          setTimeout(function () {
            var opt = document.querySelector('.quiz-option-btn, .option-btn, .ink-card-option');
            if (opt) opt.click();
          }, 300);
        }
      } else {
        SuShiUniverse.Router.navigate('home');
      }
    });
  </script>
</body>
</html>"""
    harness_path.write_text(content, encoding="utf-8")


SCREENSHOT_SPECS = [
    {
        "name": "01_测试结果页_杭州_图文彻底分层.png",
        "url_param": "view=result&station_id=station_hangzhou",
        "viewport": (390, 844),
        "desc": "杭州测试结果页：顶部全幅大图清晰展现，正文独立信息区在后，图文重叠率0.0%"
    },
    {
        "name": "02_测试结果页_黄州_图文彻底分层.png",
        "url_param": "view=result&station_id=station_huangzhou",
        "viewport": (390, 844),
        "desc": "黄州测试结果页：专属竹杖芒鞋雨中漫步大图，深底Text Safe Zone，双主CTA明确"
    },
    {
        "name": "03_测试结果页_京师_图文彻底分层.png",
        "url_param": "view=result&station_id=station_jingshi",
        "viewport": (390, 844),
        "desc": "京师测试结果页：专属汴京大图，减法彻底，不再承担长篇百科"
    },
    {
        "name": "04_今日东坡_正文首屏减法_仅保留主图.png",
        "url_param": "view=daily&target=daily_top",
        "viewport": (390, 844),
        "desc": "今日东坡每日阅读页：正文内无内嵌海报，大幅主场景图直出，诗句意境突出"
    },
    {
        "name": "05_今日东坡_点击生成诗签_进入share_card.png",
        "url_param": "view=share-card&type=daily",
        "viewport": (390, 844),
        "desc": "今日东坡分享预览：点击生成诗签后直达3:4海报舞台，全屏WYSIWYG生成与导出"
    },
    {
        "name": "06_Canvas海报_人生站点卡_大图占56百分比.png",
        "url_param": "view=share-card&type=result&station_id=station_hangzhou",
        "viewport": (390, 844),
        "desc": "人生站点卡：大图占56%主视觉，图上仅保留极简标头，长文全部下移到版式区"
    },
    {
        "name": "07_Canvas海报_人生节点卡_大图占62百分比.png",
        "url_param": "view=share-card&type=node&station_id=station_huangzhou&node_id=node_huangzhou_1",
        "viewport": (390, 844),
        "desc": "人生节点卡：大图占62%主视觉，时间轴与当代启发沉着排布于图下版式区"
    },
    {
        "name": "08_京师详情_Hero_Quote_Life三图独立.png",
        "url_param": "view=station&station_id=station_jingshi",
        "viewport": (390, 844),
        "desc": "京师详情页：汴京城阙总览、黄昏书斋、太学执笔三张新增场景图完全独立无复用"
    },
    {
        "name": "09_黄州详情_Hero_Quote_Life三图独立.png",
        "url_param": "view=station&station_id=station_huangzhou",
        "viewport": (390, 844),
        "desc": "黄州详情页：风雨竹林、东坡雪堂烹饪、赤壁月夜三张新增场景图完全独立无复用"
    },
    {
        "name": "10_杭州详情_Hero_Quote_Life三图独立.png",
        "url_param": "view=station&station_id=station_hangzhou",
        "viewport": (390, 844),
        "desc": "杭州详情页：西湖全景、苏堤春晓人群、湖畔茶亭三张新增场景图完全独立无复用"
    },
    {
        "name": "11_人生实验答题流程_路径A.png",
        "url_param": "view=quiz",
        "viewport": (390, 844),
        "desc": "人生实验路径A：七题心理测量情境卡片，选项高对比排版"
    },
    {
        "name": "12_人生实验答题流程_路径B.png",
        "url_param": "view=quiz&target=auto_answer",
        "viewport": (390, 844),
        "desc": "人生实验路径B：题目切换与即时心境吸附交互，九站均衡映射"
    },
    {
        "name": "13_WebGL诗词星群_回归正常.png",
        "url_param": "view=station&station_id=station_huangzhou&target=constellation",
        "viewport": (390, 844),
        "desc": "3D诗词星群单层架构正常运转，黄州代表作三维连线自然舒展"
    },
    {
        "name": "14_Fallback2.5D_回归正常.png",
        "url_param": "view=station&station_id=station_huangzhou&target=fallback",
        "viewport": (390, 844),
        "desc": "降级与Fallback平稳保障，星轨节点与文字安全区清晰高对比"
    },
]


def capture_all(port=8997):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    browser_exe = find_browser()
    assert browser_exe, "未找到本地可用浏览器 (Chrome/Edge)"

    create_harness_html()

    httpd = socketserver.TCPServer(("127.0.0.1", port), QuietHandler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"[INFO] 截图捕获服务在 http://127.0.0.1:{port} 启动")

    total = len(SCREENSHOT_SPECS)
    success_count = 0

    for idx, spec in enumerate(SCREENSHOT_SPECS, 1):
        out_path = OUTPUT_DIR / spec["name"]
        w, h = spec["viewport"]
        url = f"http://127.0.0.1:{port}/harness_15_6_8.html?{spec['url_param']}"

        cmd = [
            browser_exe,
            "--headless",
            "--disable-gpu",
            "--hide-scrollbars",
            f"--window-size={w},{h}",
            f"--screenshot={str(out_path)}",
            "--virtual-time-budget=2000",
            url,
        ]

        try:
            res = subprocess.run(cmd, capture_output=True, timeout=15)
            if out_path.exists() and out_path.stat().st_size > 1000:
                success_count += 1
                print(
                    f"  [{success_count:02d}/{total:02d}] PASS: {spec['name']} ({out_path.stat().st_size // 1024} KB)"
                )
            else:
                print(f"  [WARN] 截图未成功或过小: {spec['name']}")
        except Exception as ex:
            print(f"  [FAIL] {spec['name']}: {ex}")

    httpd.shutdown()
    harness_path = WORKSPACE / "harness_15_6_8.html"
    if harness_path.exists():
        try:
            harness_path.unlink()
        except Exception:
            pass

    print(f"\n[SUMMARY] 成功捕获 {success_count}/{total} 张真实运行截图！")
    print(f"[DIR] 归档目录: {OUTPUT_DIR}")
    return success_count == total


if __name__ == "__main__":
    ok = capture_all()
    if not ok:
        sys.exit(1)

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
任务 15.7 自动化真机截图捕获脚本 (capture_screenshots_15_7.py)
严格覆盖任务书第十四章各项关键运行证据，归档至:
Walkthroughes/screenshots/20260909_任务15.7_产品价值主线与内容层级重构/
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
    / "20260909_任务15.7_产品价值主线与内容层级重构"
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


def create_harness_html(port=8999):
    harness_path = WORKSPACE / f"harness_15_7_shot_{port}.html"
    content = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Screenshot Harness 15.7</title>
  <meta name="viewport" content="width=390, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/views.css">
</head>
<body style="margin:0; padding:0; width:390px; height:844px; background:#0B101D; overflow-y:auto;">
  <div id="universe-bg-fx" class="universe-bg-fx"></div>
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
      var stationId = params.get('station_id') || 'station_huangzhou';
      var moodId = params.get('mood_id') || 'mood_peace';
      var from = params.get('from') || '';
      var target = params.get('target') || '';
      var cardType = params.get('type') || 'result';
      var openNode = params.get('open_node') || '';

      if (view === 'result') {
        SuShiUniverse.Router.navigate('result', { station_id: stationId, mood_id: moodId });
      } else if (view === 'daily') {
        SuShiUniverse.Router.navigate('daily');
        if (target === 'expand_details') {
          setTimeout(function () {
            var details = document.querySelector('details.daily-history-details');
            if (details) details.open = true;
          }, 150);
        }
      } else if (view === 'share-card') {
        SuShiUniverse.Router.navigate('share-card', {
          type: cardType,
          station_id: stationId,
          mood_id: moodId
        });
      } else if (view === 'station') {
        SuShiUniverse.Router.navigate('station', { station_id: stationId, from: from });
      } else if (view === 'universe') {
        SuShiUniverse.Router.navigate('universe');
        if (openNode) {
          setTimeout(function () {
            var node = document.querySelector('.universe-planet-node[data-station-id="' + openNode + '"]');
            if (node) node.click();
          }, 200);
        }
      } else if (view === 'quiz') {
        SuShiUniverse.Router.navigate('quiz');
      } else if (view === 'home') {
        SuShiUniverse.Router.navigate('home');
      }
    });
  </script>
</body>
</html>
"""
    harness_path.write_text(content, encoding="utf-8")
    return harness_path


SCREENSHOT_SPECS = [
    {
        "name": "01_首页_首屏主价值与三项轻量收益.png",
        "url_param": "view=home",
        "viewport": (390, 844),
        "desc": "首页：唯一核心主问题“你的人生，正走到苏轼的哪一站？”，主 CTA“开始我的东坡人生实验”，首屏三项收益说明一览可见"
    },
    {
        "name": "02_东坡人生实验_7幕认知主线.png",
        "url_param": "view=quiz",
        "viewport": (390, 844),
        "desc": "东坡人生实验：清晰七次选择获得答案的认知主线，心识星与意象星体交互"
    },
    {
        "name": "03_我的东坡答案_黄州站_L1与L2结构.png",
        "url_param": "view=result&station_id=station_huangzhou&mood_id=mood_peace",
        "viewport": (390, 844),
        "desc": "黄州站“我的东坡答案”：L1站名，L2名句、给此刻的你、今天一件小事，生成人生卡与进入小宇宙双主次动作"
    },
    {
        "name": "04_我的东坡答案_杭州站_清爽层级.png",
        "url_param": "view=result&station_id=station_hangzhou&mood_id=mood_restless",
        "viewport": (390, 844),
        "desc": "杭州站“我的东坡答案”：把日子过好，饮湖上初晴后雨，微行动与哲思层次分明"
    },
    {
        "name": "05_我的东坡答案_乌台站_低谷哲思.png",
        "url_param": "view=result&station_id=station_wutai&mood_id=mood_anxious",
        "viewport": (390, 844),
        "desc": "乌台站“我的东坡答案”：坠落与至暗时刻，专属东坡风暴解法"
    },
    {
        "name": "06_人生站点卡_生成与保存预览.png",
        "url_param": "view=share-card&type=result&station_id=station_huangzhou",
        "viewport": (390, 844),
        "desc": "人生站点卡：750x1000 规范 Canvas DataURL 渲染，同源呈现我的东坡答案"
    },
    {
        "name": "07_站点详情_来自结果页上下文提示.png",
        "url_param": "view=station&station_id=station_huangzhou&from=result",
        "viewport": (390, 844),
        "desc": "站点详情（从结果页进入）：顶部展示“✦ 你的东坡答案落在这一站。继续看看苏轼当年是怎样走过来的。”"
    },
    {
        "name": "08_人生星河_九站人生弧线总览.png",
        "url_param": "view=universe",
        "viewport": (390, 844),
        "desc": "人生星河：从眉山出发到常州归途，九站人生弧线一览清晰"
    },
    {
        "name": "09_人生星河_黄州重生节点轻量预览抽屉.png",
        "url_param": "view=universe&open_node=station_huangzhou",
        "viewport": (390, 844),
        "desc": "人生星河抽屉：点击节点轻量展开（大图+诗句+一句话故事+进入本站深度漫游次动作）"
    },
    {
        "name": "10_站点详情_来自星河漫游上下文提示.png",
        "url_param": "view=station&station_id=station_huangzhou&from=universe",
        "viewport": (390, 844),
        "desc": "站点详情（从星河漫游进入）：顶部展示“✦ 你正在探索苏轼人生的「黄州时刻」。”"
    },
    {
        "name": "11_今日东坡_纯粹一句东坡与今日小事.png",
        "url_param": "view=daily",
        "viewport": (390, 844),
        "desc": "今日东坡：聚焦“每天给我一句东坡”，大图+诗句+今日理解+今日行动，无内嵌海报"
    },
    {
        "name": "12_今日东坡_历史现场折叠展开.png",
        "url_param": "view=daily&target=expand_details",
        "viewport": (390, 844),
        "desc": "今日东坡历史现场：折叠详情点击展开，保证首屏主次分明"
    },
    {
        "name": "13_今日东坡签_生成与保存预览.png",
        "url_param": "view=share-card&type=daily",
        "viewport": (390, 844),
        "desc": "今日东坡签：Canvas DataURL 稳定渲染“今天我带走哪一句”"
    },
    {
        "name": "14_人生节点卡_收藏某站生成预览.png",
        "url_param": "view=share-card&type=node&station_id=station_hangzhou",
        "viewport": (390, 844),
        "desc": "人生节点卡：Canvas DataURL 稳定渲染“我最喜欢苏轼的哪一站”"
    }
]


def capture_all(port=8999):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    browser_exe = find_browser()
    assert browser_exe, "未找到本地可用浏览器 (Chrome/Edge)"

    harness_path = create_harness_html(port)

    httpd = socketserver.TCPServer(("127.0.0.1", port), QuietHandler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"[INFO] 截图服务启动: http://127.0.0.1:{port}")

    total = len(SCREENSHOT_SPECS)
    success_count = 0

    for idx, spec in enumerate(SCREENSHOT_SPECS, 1):
        out_path = OUTPUT_DIR / spec["name"]
        w, h = spec["viewport"]
        url = f"http://127.0.0.1:{port}/{harness_path.name}?{spec['url_param']}"

        cmd = [
            browser_exe,
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            f"--window-size={w},{h}",
            f"--screenshot={str(out_path)}",
            "--virtual-time-budget=2800",
            url,
        ]

        try:
            res = subprocess.run(cmd, capture_output=True, timeout=20)
            if out_path.exists() and out_path.stat().st_size > 1000:
                success_count += 1
                print(
                    f"  [{success_count:02d}/{total:02d}] PASS: {spec['name']} ({out_path.stat().st_size // 1024} KB)"
                )
            else:
                print(f"  [WARN] 截图未成功或文件过小: {spec['name']}")
        except Exception as ex:
            print(f"  [FAIL] {spec['name']}: {ex}")

    httpd.shutdown()
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

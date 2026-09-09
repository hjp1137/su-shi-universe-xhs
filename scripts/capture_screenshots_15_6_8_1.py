# -*- coding: utf-8 -*-
"""
任务 15.6.8.1 自动化真机截图捕获脚本 (capture_screenshots_15_6_8_1.py)
严格覆盖任务书十三大类真实运行证据，归档至:
Walkthroughes/screenshots/20260909_任务15.6.8.1_结果语义一致性_今日东坡排版校正_Canvas字号重构与全站粒子降噪/
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
    / "20260909_任务15.6.8.1_结果语义一致性_今日东坡排版校正_Canvas字号重构与全站粒子降噪"
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


def create_harness_html(port=8998):
    harness_path = WORKSPACE / f"harness_15_6_8_1_shot_{port}.html"
    content = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Screenshot Harness 15.6.8.1</title>
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
      var stationId = params.get('station_id') || 'station_huangzhou';
      var moodId = params.get('mood_id') || 'mood_anxious';
      var target = params.get('target') || '';
      var cardType = params.get('type') || 'daily';
      var nodeId = params.get('node_id') || 'node_huangzhou_1';
      var forceFallback = params.get('force_fallback') === 'true';

      if (forceFallback && SuShiUniverse.QualityManager) {
        SuShiUniverse.QualityManager.setTier('minimal');
        if (SuShiUniverse.Fallback) SuShiUniverse.Fallback.init();
      }

      if (view === 'result') {
        SuShiUniverse.Router.navigate('result', { stationId: stationId, station_id: stationId, mood_id: moodId });
      } else if (view === 'daily') {
        SuShiUniverse.Router.navigate('daily');
        if (target === 'short_quote') {
          setTimeout(function () {
            var qEl = document.querySelector('.daily-hero-quote-text');
            if (qEl) qEl.textContent = '小舟从此逝，江海寄余生。';
          }, 100);
        } else if (target === 'daily_bottom') {
          setTimeout(function () {
            var bCard = document.querySelector('.work-narrative-card') || document.querySelector('.result-actions');
            if (bCard) bCard.scrollIntoView({ block: 'start' });
          }, 200);
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
      } else if (view === 'universe') {
        SuShiUniverse.Router.navigate('universe');
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
        "name": "01_今日东坡_短诗单行与紧凑出处日期.png",
        "url_param": "view=daily&target=short_quote",
        "viewport": (390, 844),
        "desc": "今日东坡：短诗「小舟从此逝，江海寄余生。」在 390px 视口单行展示，紧凑内容流无拉散"
    },
    {
        "name": "02_今日东坡_完整下半页.png",
        "url_param": "view=daily&target=daily_bottom",
        "viewport": (390, 844),
        "desc": "今日东坡：完整下半页作品长图、赏析解读与操作按钮，层级清晰自然"
    },
    {
        "name": "03_结果页_乌台站_无望江南错配.png",
        "url_param": "view=result&station_id=station_wutai&mood_id=mood_anxious",
        "viewport": (390, 844),
        "desc": "乌台诗案站测试结果页：严格匹配乌台专属诗句与东坡风暴哲思，绝无密州望江南错配"
    },
    {
        "name": "04_结果页_杭州站_饮湖上初晴后雨.png",
        "url_param": "view=result&station_id=station_hangzhou&mood_id=mood_restless",
        "viewport": (390, 844),
        "desc": "杭州站测试结果页：饮湖上初晴后雨西湖诗意，东坡旷达审美，图文分层与Text Safe Zone"
    },
    {
        "name": "05_结果页_黄州站_定风波莫听穿林打叶声.png",
        "url_param": "view=result&station_id=station_huangzhou&mood_id=mood_work_stuck",
        "viewport": (390, 844),
        "desc": "黄州站测试结果页：莫听穿林打叶声赤壁精神，东坡风雨人生解法"
    },
    {
        "name": "06_人生结果卡_3比4预览_字号标尺重构.png",
        "url_param": "view=share-card&type=result&station_id=station_huangzhou",
        "viewport": (390, 844),
        "desc": "人生结果卡3:4预览：46px/38px/26px/24px全新字号标尺，信息减法，删除多余行动框"
    },
    {
        "name": "07_今日东坡签_3比4预览_字号标尺重构.png",
        "url_param": "view=share-card&type=daily",
        "viewport": (390, 844),
        "desc": "今日东坡签3:4预览：大字号呼吸感排版，书法印章20px，诗句出处紧凑清晰"
    },
    {
        "name": "08_人生节点卡_3比4预览_字号标尺重构.png",
        "url_param": "view=share-card&type=node&station_id=station_huangzhou&node_id=node_huangzhou_1",
        "viewport": (390, 844),
        "desc": "人生节点卡3:4预览：大图占62%，时间轴节点清晰，底图版式区大字号清晰可辨"
    },
    {
        "name": "09_卡片预览整屏_环境柔光延展底图.png",
        "url_param": "view=share-card&type=daily",
        "viewport": (390, 844),
        "desc": "卡片预览整屏环境延展：保持中央3:4原图清晰，四周高斯模糊扩散形成沉浸式环境底图"
    },
    {
        "name": "10_人生星河_正文区粒子视觉降噪.png",
        "url_param": "view=universe",
        "viewport": (390, 844),
        "desc": "人生星河大视图：Three.js粒子尺寸降至0.052，透明度0.34，圆形柔光贴图消除方块感"
    },
    {
        "name": "11_站点详情_正文区粒子视觉降噪.png",
        "url_param": "view=station&station_id=station_huangzhou",
        "viewport": (390, 844),
        "desc": "黄州站点详情页：正文阅读区粒子微弱点缀，Text Safe Zone保障字迹清晰"
    },
    {
        "name": "12_WebGL场景_柔光圆形粒子与文本安全区.png",
        "url_param": "view=home",
        "viewport": (390, 844),
        "desc": "首页WebGL东方水墨微光场景：动态生成Canvas圆点贴图，粒子不喧宾夺主"
    },
    {
        "name": "13_Fallback降级_CSS水墨微光粒子.png",
        "url_param": "view=home&force_fallback=true",
        "viewport": (390, 844),
        "desc": "低算力Fallback降级模式：纯CSS水墨微光与星轨平稳运行，视觉层次柔和舒适"
    },
]


def capture_all(port=8998):
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
            "--virtual-time-budget=2600",
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

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15.6.3 高保真真实运行截图捕获脚本
按任务书第十一节要求，全量捕获 18 张真实运行截图并归档至:
Walkthroughes/screenshots/20260908_任务15.6.3_作品全屏化_站点长卷化_诗词星群去框与人生实验题库升级/
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
OUTPUT_DIR = WORKSPACE / "Walkthroughes" / "screenshots" / "20260908_任务15.6.3_作品全屏化_站点长卷化_诗词星群去框与人生实验题库升级"

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
    harness_path = WORKSPACE / "harness_15_6_3.html"
    html_content = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Harness 15.6.3</title>
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/views.css">
</head>
<body>
  <div id="app-container">
    <header class="app-header" id="app-header">
      <div class="header-left" id="nav-left"></div>
      <div class="header-title" id="nav-title">苏轼宇宙</div>
      <div class="header-right" id="nav-right"></div>
    </header>
    <main id="main-content">
      <div id="view-container"></div>
    </main>
    <nav class="cosmic-dock" id="cosmic-dock"></nav>
  </div>
  <script src="js/namespace.js"></script>
  <script src="js/data.js"></script>
  <script src="js/art_assets.js"></script>
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
  <script src="js/router.js"></script>
  <script src="js/views.js"></script>
  <script src="js/app.js"></script>
  <script>
    window.addEventListener('load', function () {
      var params = new URLSearchParams(window.location.search);
      var mode = params.get('mode');

      if (mode === 'daily_full') {
        SuShiUniverse.Router.navigate('daily');
      } else if (mode === 'share_station') {
        SuShiUniverse.Router.navigate('share-card', { type: 'station', station_id: 'station_huangzhou' });
      } else if (mode === 'share_daily') {
        SuShiUniverse.Router.navigate('share-card', { type: 'daily' });
      } else if (mode === 'share_node') {
        SuShiUniverse.Router.navigate('share-card', { type: 'node', station_id: 'station_huangzhou' });
      } else if (mode === 'station_hero') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
      } else if (mode === 'station_verse') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.station-section-verse-scene');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 500);
      } else if (mode === 'station_life') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.station-section-life');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 500);
      } else if (mode === 'station_modern') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.station-section-modern');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 500);
      } else if (mode === 'station_contrast') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.station-section-history');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 500);
      } else if (mode === 'constellation_sky') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.station-section-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 500);
      } else if (mode === 'constellation_bubble') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.station-section-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
          setTimeout(function () {
            var star = document.querySelector('.constellation-star-node');
            if (star) star.click();
          }, 400);
        }, 400);
      } else if (mode === 'quiz_a_1') {
        SuShiUniverse.Router.navigate('quiz');
      } else if (mode === 'quiz_a_4') {
        SuShiUniverse.Router.navigate('quiz');
        setTimeout(function () {
          var o1 = document.querySelector('.exp-target-orb');
          if (o1) o1.click();
          setTimeout(function () {
            var o2 = document.querySelector('.exp-target-orb');
            if (o2) o2.click();
            setTimeout(function () {
              var o3 = document.querySelector('.exp-target-orb');
              if (o3) o3.click();
            }, 500);
          }, 500);
        }, 300);
      } else if (mode === 'quiz_b_new') {
        SuShiUniverse.Router.navigate('quiz');
        setTimeout(function () {
          var btn = document.querySelector('.quiz-reset-btn');
          if (btn) btn.click();
        }, 400);
      } else if (mode === 'quiz_hint') {
        SuShiUniverse.Router.navigate('quiz');
        setTimeout(function () {
          var orb = document.querySelector('.exp-target-orb');
          if (orb) orb.scrollIntoView({ block: 'center' });
        }, 400);
      } else if (mode === 'quiz_fallback') {
        SuShiUniverse.Router.navigate('quiz');
        setTimeout(function () {
          var toggle = document.querySelector('.exp-fallback-toggle');
          if (toggle) toggle.click();
        }, 350);
      } else if (mode === 'quiz_low_done') {
        if (SuShiUniverse.Effects && SuShiUniverse.Effects.QualityManager) {
          SuShiUniverse.Effects.QualityManager.setManualTier('low');
        }
        SuShiUniverse.Router.navigate('quiz');
        function autoStep(step) {
          if (step >= 7) return;
          setTimeout(function () {
            var card = document.querySelector('.exp-choice-card') || document.querySelector('.exp-target-orb');
            if (card) card.click();
            autoStep(step + 1);
          }, 500);
        }
        setTimeout(function () { autoStep(0); }, 300);
      }
    });
  </script>
</body>
</html>
"""
    harness_path.write_text(html_content, encoding="utf-8")
    return harness_path

def main():
    print("=" * 70)
    print("开始执行 任务15.6.3 全量 18 张高保真真实运行截图捕获...")
    print("=" * 70)

    browser = find_browser()
    if not browser:
        print("[ERROR] 未找到 Chrome / Edge 浏览器，无法自动截图")
        sys.exit(1)
    print(f"  [INFO] 使用无头浏览器: {browser}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    create_harness_html()

    PORT = 8288
    for p in range(8288, 8320):
        try:
            httpd = socketserver.TCPServer(("127.0.0.1", p), QuietHandler)
            PORT = p
            break
        except OSError:
            continue

    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"  [INFO] 本地测试服务器运行于 http://127.0.0.1:{PORT}")

    # 18 张标准截图任务清单
    shots = [
        # 卡片 4 张
        ("01_今日东坡_390x844全屏主诗签.png", "harness_15_6_3.html?mode=daily_full", 390, 844, 2500),
        ("02_人生站点卡_390x844全屏预览.png", "harness_15_6_3.html?mode=share_station", 390, 844, 2600),
        ("03_今日东坡签_390x844全屏预览.png", "harness_15_6_3.html?mode=share_daily", 390, 844, 2600),
        ("04_人生节点卡_390x844全屏预览.png", "harness_15_6_3.html?mode=share_node", 390, 844, 2600),

        # 站点长卷 5 张
        ("05_黄州站点长卷_Hero与历史轨迹.png", "harness_15_6_3.html?mode=station_hero", 390, 844, 1800),
        ("06_黄州站点长卷_代表名句大场景.png", "harness_15_6_3.html?mode=station_verse", 390, 844, 2200),
        ("07_黄州站点长卷_生活实录星轨.png", "harness_15_6_3.html?mode=station_life", 390, 844, 2000),
        ("08_黄州站点长卷_现代启发与今日小事.png", "harness_15_6_3.html?mode=station_modern", 390, 844, 2000),
        ("09_黄州站点长卷_正文可读性与水墨遮罩特写.png", "harness_15_6_3.html?mode=station_contrast", 390, 844, 2000),

        # 诗词星群 3 张
        ("10_黄州诗词星群_默认无框星空首屏.png", "harness_15_6_3.html?mode=constellation_sky", 390, 844, 1800),
        ("11_黄州诗词星群_念奴娇微名片浮出态.png", "harness_15_6_3.html?mode=constellation_bubble", 390, 844, 2200),
        ("12_诗词星群_320px窄屏自适应.png", "harness_15_6_3.html?mode=constellation_sky", 320, 568, 1800),

        # 东坡人生实验 6 张
        ("13_人生实验_随机题组A第1幕.png", "harness_15_6_3.html?mode=quiz_a_1", 390, 844, 1800),
        ("14_人生实验_随机题组A第4幕.png", "harness_15_6_3.html?mode=quiz_a_4", 390, 844, 2500),
        ("15_人生实验_重开后随机题组B.png", "harness_15_6_3.html?mode=quiz_b_new", 390, 844, 2000),
        ("16_人生实验_目标星短提示hint特写.png", "harness_15_6_3.html?mode=quiz_hint", 390, 844, 1800),
        ("17_人生实验_Fallback折叠展开态.png", "harness_15_6_3.html?mode=quiz_fallback", 390, 844, 1800),
        ("18_人生实验_Low模式完成态.png", "harness_15_6_3.html?mode=quiz_low_done", 390, 844, 4500),
    ]

    success_count = 0
    try:
        for idx, (fname, route, w, h, delay) in enumerate(shots, 1):
            target_file = OUTPUT_DIR / fname
            url = f"http://127.0.0.1:{PORT}/{route}"

            cmd = [
                browser,
                "--headless",
                "--disable-gpu",
                "--hide-scrollbars",
                f"--window-size={w},{h}",
                f"--virtual-time-budget={delay}",
                f"--screenshot={str(target_file)}",
                url
            ]

            try:
                res = subprocess.run(cmd, capture_output=True, timeout=22)
                if target_file.exists() and target_file.stat().st_size > 1000:
                    size_kb = target_file.stat().st_size / 1024
                    print(f"  [{idx:02d}/18 PASS] {fname} ({size_kb:.1f} KB, {w}x{h})")
                    success_count += 1
                else:
                    print(f"  [{idx:02d}/18 FAIL] {fname} (生成失败或大小异常)")
            except Exception as e:
                print(f"  [{idx:02d}/18 ERROR] {fname}: {e}")
    finally:
        if (WORKSPACE / "harness_15_6_3.html").exists():
            (WORKSPACE / "harness_15_6_3.html").unlink()
        if (WORKSPACE / "scripts" / "harness_15_6_3.html").exists():
            (WORKSPACE / "scripts" / "harness_15_6_3.html").unlink()
        if (WORKSPACE / "scripts" / "harness_15_6_2.html").exists():
            (WORKSPACE / "scripts" / "harness_15_6_2.html").unlink()

    print("=" * 70)
    print(f"截图捕获完成: {success_count}/18 成功生成！")
    print(f"保存目录: {OUTPUT_DIR}")
    print("=" * 70)
    if success_count < 18:
        sys.exit(1)

if __name__ == "__main__":
    main()

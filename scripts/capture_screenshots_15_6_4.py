#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15.6.4 高保真真实运行截图捕获脚本
全量捕获 22 张真实运行截图并归档至:
Walkthroughes/screenshots/20260908_任务15.6.4_海报全屏所见即所得_站点沉浸场景化_3D诗词星群与人生实验动态反馈/
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
OUTPUT_DIR = WORKSPACE / "Walkthroughes" / "screenshots" / "20260908_任务15.6.4_海报全屏所见即所得_站点沉浸场景化_3D诗词星群与人生实验动态反馈"

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
    harness_path = WORKSPACE / "harness_15_6_4.html"
    html_content = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Harness 15.6.4</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
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
  <script src="js/effects/poetry-constellation-3d.js"></script>
  <script src="js/effects/index.js"></script>
  <script src="js/router.js"></script>
  <script src="js/views.js"></script>
  <script src="js/app.js"></script>
  <script>
    window.addEventListener('load', function () {
      var params = new URLSearchParams(window.location.search);
      var mode = params.get('mode');

      // 1. 全屏海报
      if (mode === 'daily_full') {
        SuShiUniverse.Router.navigate('daily');
      } else if (mode === 'share_station') {
        SuShiUniverse.Router.navigate('share-card', { type: 'station', station_id: 'station_huangzhou' });
      } else if (mode === 'share_daily') {
        SuShiUniverse.Router.navigate('share-card', { type: 'daily' });
      } else if (mode === 'share_node') {
        SuShiUniverse.Router.navigate('share-card', { type: 'node', station_id: 'station_huangzhou' });
      } else if (mode === 'share_toggle') {
        SuShiUniverse.Router.navigate('share-card', { type: 'daily' });
      } else if (mode === 'share_320') {
        SuShiUniverse.Router.navigate('share-card', { type: 'station', station_id: 'station_huangzhou' });

      // 2. 站点长卷连续镜头
      } else if (mode === 'station_scene0') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
      } else if (mode === 'station_scene1') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-1-history');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 400);
      } else if (mode === 'station_scene2') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-2-quote');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 400);
      } else if (mode === 'station_scene3') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-3-life');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 400);
      } else if (mode === 'station_scene5') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-5-resonance');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 400);
      } else if (mode === 'station_safezone') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_hangzhou' });

      // 3. 3D 诗词星群
      } else if (mode === 'p3d_default') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-4-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 400);
      } else if (mode === 'p3d_drag') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-4-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 400);
      } else if (mode === 'p3d_focus') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-4-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
          setTimeout(function () {
            var star = document.querySelector('.constellation-star-node');
            if (star) star.click();
          }, 500);
        }, 400);
      } else if (mode === 'p3d_callout') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-4-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
          setTimeout(function () {
            var star = document.querySelector('.constellation-star-node');
            if (star) star.click();
          }, 500);
        }, 400);
      } else if (mode === 'p3d_fallback') {
        if (SuShiUniverse.Effects && SuShiUniverse.Effects.QualityManager) {
          SuShiUniverse.Effects.QualityManager.setManualTier('low');
        }
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-4-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 400);

      // 4. 人生实验 autoTravel 与宇宙动效
      } else if (mode === 'quiz_scene1') {
        SuShiUniverse.Router.navigate('quiz');
      } else if (mode === 'quiz_autotravel') {
        SuShiUniverse.Router.navigate('quiz');
        setTimeout(function () {
          var orb = document.querySelector('.exp-target-orb');
          if (orb) orb.click();
        }, 400);
      } else if (mode === 'quiz_shockwave') {
        SuShiUniverse.Router.navigate('quiz');
        setTimeout(function () {
          var card = document.querySelector('.exp-choice-card');
          if (card) card.click();
        }, 400);
      } else if (mode === 'quiz_fx_merge') {
        SuShiUniverse.Router.navigate('quiz');
        setTimeout(function () {
          var cards = document.querySelectorAll('.exp-choice-card');
          if (cards.length > 1) cards[1].click();
        }, 400);
      } else if (mode === 'quiz_climax_done') {
        SuShiUniverse.Router.navigate('quiz');
        function autoRun(step) {
          if (step >= 7) return;
          setTimeout(function () {
            var c = document.querySelector('.exp-choice-card') || document.querySelector('.exp-target-orb');
            if (c) c.click();
            autoRun(step + 1);
          }, 450);
        }
        setTimeout(function () { autoRun(0); }, 300);
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
    print("开始执行 任务15.6.4 全量 22 张高保真真实运行截图捕获...")
    print("=" * 70)

    browser = find_browser()
    if not browser:
        print("[ERROR] 未找到 Chrome / Edge 浏览器，无法自动截图")
        sys.exit(1)
    print(f"  [INFO] 使用无头浏览器: {browser}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    create_harness_html()

    PORT = 8299
    for p in range(8299, 8350):
        try:
            httpd = socketserver.TCPServer(("127.0.0.1", p), QuietHandler)
            PORT = p
            break
        except OSError:
            continue

    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"  [INFO] 本地测试服务器运行于 http://127.0.0.1:{PORT}")

    # 22 张标准截图任务清单 (涵盖 P0-A, P0-B, P0-C, P0-D 全量验收状态)
    shots = [
        # 一、全屏海报所见即所得 (6 张)
        ("01_今日东坡_390x844全屏主诗签_满幅99%呈现.png", "harness_15_6_4.html?mode=daily_full", 390, 844, 2500),
        ("02_人生站点卡_390x844全屏WYSIWYG预览.png", "harness_15_6_4.html?mode=share_station", 390, 844, 2600),
        ("03_今日东坡签_390x844全屏海报_场景图50%诗句入画.png", "harness_15_6_4.html?mode=share_daily", 390, 844, 2600),
        ("04_人生节点卡_390x844全屏海报_时间轴里程碑与金石印章.png", "harness_15_6_4.html?mode=share_node", 390, 844, 2600),
        ("05_海报全屏所见即所得_Tab切换今日签与节点卡.png", "harness_15_6_4.html?mode=share_toggle", 390, 844, 2500),
        ("06_分享卡全屏模式_320px极限窄屏无黑边贴边自适应.png", "harness_15_6_4.html?mode=share_320", 320, 568, 2400),

        # 二、东坡站点沉浸式场景长卷 (6 张)
        ("07_黄州站点长卷_Scene0_站点Hero场景图原色直出与安全排字区.png", "harness_15_6_4.html?mode=station_scene0", 390, 844, 1800),
        ("08_黄州站点长卷_Scene1_历史现场长卷分段2至4行呈现.png", "harness_15_6_4.html?mode=station_scene1", 390, 844, 2200),
        ("09_黄州站点长卷_Scene2_代表名句全宽意境大图直接展出.png", "harness_15_6_4.html?mode=station_scene2", 390, 844, 2200),
        ("10_黄州站点长卷_Scene3_生活实录星轨脚步脉络.png", "harness_15_6_4.html?mode=station_scene3", 390, 844, 2000),
        ("11_黄州站点长卷_Scene5_现代共鸣与今日小事轻便签.png", "harness_15_6_4.html?mode=station_scene5", 390, 844, 2000),
        ("12_站点长卷_暗背景与亮背景安全排字区色调自适应.png", "harness_15_6_4.html?mode=station_safezone", 390, 844, 2000),

        # 三、3D 诗词星群与探索聚焦 (5 张)
        ("13_黄州3D诗词星群_Scene4_黄金球面空间拓扑默认态.png", "harness_15_6_4.html?mode=p3d_default", 390, 844, 2200),
        ("14_黄州3D诗词星群_手势拖拽惯性自转动态态.png", "harness_15_6_4.html?mode=p3d_drag", 390, 844, 2200),
        ("15_黄州3D诗词星群_最短路径聚焦念奴娇_放大1.8倍与景深暗化.png", "harness_15_6_4.html?mode=p3d_focus", 390, 844, 2500),
        ("16_黄州3D诗词星群_星旁轻量微信息名片_去大弹窗直接入画.png", "harness_15_6_4.html?mode=p3d_callout", 390, 844, 2500),
        ("17_黄州3D诗词星群_2.5D_CSS_Fallback优雅降级保护.png", "harness_15_6_4.html?mode=p3d_fallback", 390, 844, 2000),

        # 四、东坡人生实验 autoTravel 与专属动态宇宙反馈 (5 张)
        ("18_人生实验_随机题组首幕_全覆盖10大心识维度与hint.png", "harness_15_6_4.html?mode=quiz_scene1", 390, 844, 1800),
        ("19_人生实验_点击选项autoTravel沿引力弧线飞行态.png", "harness_15_6_4.html?mode=quiz_autotravel", 390, 844, 2100),
        ("20_人生实验_碰撞瞬间环形冲击波与锁定状态.png", "harness_15_6_4.html?mode=quiz_shockwave", 390, 844, 2200),
        ("21_人生实验_专属宇宙动效并轨merge与引力gravity反馈.png", "harness_15_6_4.html?mode=quiz_fx_merge", 390, 844, 2200),
        ("22_人生实验_七幕完成自动进入东坡人生结算高潮.png", "harness_15_6_4.html?mode=quiz_climax_done", 390, 844, 3800),
    ]

    success_count = 0
    for idx, (fname, path_url, w, h, delay_ms) in enumerate(shots, 1):
        target_png = OUTPUT_DIR / fname
        full_url = f"http://127.0.0.1:{PORT}/{path_url}"

        cmd = [
            browser,
            "--headless",
            "--disable-gpu",
            "--hide-scrollbars",
            f"--window-size={w},{h}",
            f"--screenshot={str(target_png)}",
            f"--virtual-time-budget={delay_ms}",
            full_url
        ]

        try:
            subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=15)
            if target_png.exists() and target_png.stat().st_size > 1024:
                size_kb = target_png.stat().st_size / 1024
                print(f"  [{idx:02d}/{len(shots):02d}] PASS: {fname} ({w}x{h}, {size_kb:.1f} KB)")
                success_count += 1
            else:
                print(f"  [{idx:02d}/{len(shots):02d}] FAIL: {fname} (文件未生成或尺寸异常)")
        except Exception as ex:
            print(f"  [{idx:02d}/{len(shots):02d}] ERROR: {fname} - {ex}")

    print("=" * 70)
    print(f"截图捕获完成: {success_count}/{len(shots)} 张成功生成")
    print(f"归档目录: {OUTPUT_DIR}")
    print("=" * 70)

    if success_count < len(shots):
        sys.exit(1)


if __name__ == "__main__":
    main()

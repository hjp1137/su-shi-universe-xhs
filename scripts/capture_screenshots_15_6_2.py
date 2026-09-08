#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15.6.2 高保真真实运行截图自动捕获脚本
按任务书第九节要求，全量捕获 16 张真实运行截图并归档至:
Walkthroughes/screenshots/20260908_任务15.6.2_东坡人生实验去问卷化_诗词星群空间化与收藏卡构图精修/
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
OUTPUT_DIR = WORKSPACE / "Walkthroughes" / "screenshots" / "20260908_任务15.6.2_东坡人生实验去问卷化_诗词星群空间化与收藏卡构图精修"

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
    harness_path = WORKSPACE / "scripts" / "harness_15_6_2.html"
    html_content = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Harness 15.6.2</title>
  <link rel="stylesheet" href="../css/tokens.css">
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/components.css">
  <link rel="stylesheet" href="../css/views.css">
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
  <script src="../js/namespace.js"></script>
  <script src="../js/data.js"></script>
  <script src="../js/art_assets.js"></script>
  <script src="../js/store.js"></script>
  <script src="../js/bridge.js"></script>
  <script src="../js/ui.js"></script>
  <script src="../js/card_canvas.js"></script>
  <script src="../js/quiz.js"></script>
  <script src="../js/daily.js"></script>
  <script src="../js/lib/three.min.js"></script>
  <script src="../js/effects/quality-manager.js"></script>
  <script src="../js/effects/fallback.js"></script>
  <script src="../js/effects/hero-scene.js"></script>
  <script src="../js/effects/universe-scene.js"></script>
  <script src="../js/effects/result-scene.js"></script>
  <script src="../js/effects/webgl-engine.js"></script>
  <script src="../js/effects/index.js"></script>
  <script src="../js/router.js"></script>
  <script src="../js/views.js"></script>
  <script src="../js/app.js"></script>
  <script>
    window.addEventListener('load', function () {
      var params = new URLSearchParams(window.location.search);
      var mode = params.get('mode');

      if (mode === 'quiz_s1') {
        SuShiUniverse.Router.navigate('quiz');
      } else if (mode === 'quiz_s2') {
        SuShiUniverse.Router.navigate('quiz');
        setTimeout(function () {
          var target = document.querySelector('.exp-target-orb');
          if (target) target.click();
        }, 300);
      } else if (mode === 'quiz_s3') {
        SuShiUniverse.Router.navigate('quiz');
        setTimeout(function () {
          var target1 = document.querySelector('.exp-target-orb');
          if (target1) target1.click();
          setTimeout(function () {
            var target2 = document.querySelector('.exp-target-orb');
            if (target2) target2.click();
          }, 500);
        }, 300);
      } else if (mode === 'quiz_s4') {
        SuShiUniverse.Router.navigate('quiz');
        setTimeout(function () {
          var t = document.querySelector('.exp-target-orb');
          if (t) t.click();
          setTimeout(function () {
            var t2 = document.querySelector('.exp-target-orb');
            if (t2) t2.click();
            setTimeout(function () {
              var t3 = document.querySelector('.exp-target-orb');
              if (t3) t3.click();
            }, 500);
          }, 500);
        }, 300);
      } else if (mode === 'quiz_fallback') {
        SuShiUniverse.Router.navigate('quiz');
        setTimeout(function () {
          var toggle = document.querySelector('.exp-fallback-toggle');
          if (toggle) toggle.click();
        }, 300);
      } else if (mode === 'station_constellation') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var ch3 = document.querySelector('.station-chapter-constellation');
          if (ch3) ch3.scrollIntoView({ block: 'start' });
        }, 300);
      } else if (mode === 'constellation_bubble') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var ch3 = document.querySelector('.station-chapter-constellation');
          if (ch3) ch3.scrollIntoView({ block: 'start' });
          setTimeout(function () {
            var star = document.querySelector('.constellation-star-node.is-prime') || document.querySelector('.constellation-star-node.is-spatial');
            if (star) star.click();
          }, 400);
        }, 300);
      } else if (mode === 'daily_full') {
        SuShiUniverse.Router.navigate('daily');
      } else if (mode === 'daily_date_detail') {
        SuShiUniverse.Router.navigate('daily');
        setTimeout(function () {
          var slip = document.querySelector('.daily-sign-poster-wrap');
          if (slip) slip.scrollIntoView({ block: 'center' });
        }, 400);
      } else if (mode === 'share_station') {
        SuShiUniverse.Router.navigate('share-card', { type: 'station', station_id: 'station_huangzhou' });
      } else if (mode === 'share_daily') {
        SuShiUniverse.Router.navigate('share-card', { type: 'daily' });
      } else if (mode === 'share_node') {
        SuShiUniverse.Router.navigate('share-card', { type: 'node', station_id: 'station_huangzhou' });
      } else if (mode === 'quiz_low') {
        if (SuShiUniverse.Effects && SuShiUniverse.Effects.QualityManager) {
          SuShiUniverse.Effects.QualityManager.setManualTier('low');
        }
        SuShiUniverse.Router.navigate('quiz');
      }
    });
  </script>
</body>
</html>
"""
    harness_path.write_text(html_content, encoding="utf-8")
    return harness_path

def main():
    print("=" * 65)
    print("开始执行 任务15.6.2 全量 16 张真实运行截图自动捕获...")
    print("=" * 65)

    browser = find_browser()
    if not browser:
        print("[ERROR] 未找到 Chrome / Edge 浏览器，无法自动截图")
        sys.exit(1)
    print(f"  [INFO] 使用无头浏览器: {browser}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    create_harness_html()

    PORT = 8188
    for p in range(8188, 8220):
        try:
            httpd = socketserver.TCPServer(("127.0.0.1", p), QuietHandler)
            PORT = p
            break
        except OSError:
            continue

    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"  [INFO] 本地测试服务器运行于 http://127.0.0.1:{PORT}")

    # 16 张任务书标准截图
    shots = [
        # 1. 首页 390x844 首屏（确认未回归）
        ("01_首页390x844首屏_确认未回归.png", "index.html?view=home", 390, 844, 1500),
        # 2. 东坡人生实验第1幕正常游戏态（默认首屏只展示互动微游戏，不展开答案大卡）
        ("02_东坡人生实验第1幕_正常游戏态.png", "scripts/harness_15_6_2.html?mode=quiz_s1", 390, 844, 1500),
        # 3. 第2幕碰撞成功态
        ("03_东坡人生实验第2幕_碰撞反馈态.png", "scripts/harness_15_6_2.html?mode=quiz_s2", 390, 844, 1800),
        # 4. 第3幕聚合态
        ("04_东坡人生实验第3幕_聚合态.png", "scripts/harness_15_6_2.html?mode=quiz_s3", 390, 844, 2000),
        # 5. 第4幕分裂态
        ("05_东坡人生实验第4幕_分裂态.png", "scripts/harness_15_6_2.html?mode=quiz_s4", 390, 844, 2200),
        # 6. 点击 Fallback 展开态（轻触选择折叠面板展开）
        ("06_东坡人生实验_轻触选择展开态.png", "scripts/harness_15_6_2.html?mode=quiz_fallback", 390, 844, 1500),
        # 7. 黄州诗词星群完整首屏（2D 空间拓扑星图：精神星核 + 引力轨道 + 周围环绕作品星）
        ("07_黄州诗词星群_完整空间首屏.png", "scripts/harness_15_6_2.html?mode=station_constellation", 390, 844, 1500),
        # 8. 点击《念奴娇·赤壁怀古》星点后的激活气泡态
        ("08_黄州诗词星群_念奴娇激活气泡态.png", "scripts/harness_15_6_2.html?mode=constellation_bubble", 390, 844, 1800),
        # 9. 320 宽极窄屏诗词星群
        ("09_黄州诗词星群_320小屏自适应.png", "scripts/harness_15_6_2.html?mode=station_constellation", 320, 568, 1500),
        # 10. 今日东坡 390x844 主诗签（去外层米白装裱框，3:4 水墨诗签居中）
        ("10_今日东坡390x844_主诗签首屏.png", "scripts/harness_15_6_2.html?mode=daily_full", 390, 844, 2500),
        # 11. 今日东坡日期区特写（确认无灰色块重影与叠字异常）
        ("11_今日东坡_日期与印记特写.png", "scripts/harness_15_6_2.html?mode=daily_date_detail", 390, 844, 2500),
        # 12. 人生站点卡全屏预览（构图饱满，大字 32px，微行动背衬卡，无底部深蓝大空白）
        ("12_人生站点卡_全屏预览.png", "scripts/harness_15_6_2.html?mode=share_station", 390, 844, 2600),
        # 13. 今日东坡签全屏预览（构图充实收藏级）
        ("13_今日东坡签_全屏预览.png", "scripts/harness_15_6_2.html?mode=share_daily", 390, 844, 2600),
        # 14. 人生节点卡全屏预览（历史现场 + 当代启发 + 生活践行）
        ("14_人生节点卡_全屏预览.png", "scripts/harness_15_6_2.html?mode=share_node", 390, 844, 2600),
        # 15. 430 宽大屏分享卡
        ("15_分享卡430宽_大屏自适应.png", "scripts/harness_15_6_2.html?mode=share_station", 430, 932, 2600),
        # 16. Low/Fallback 降级态下东坡人生实验
        ("16_Low降级态_东坡人生实验可完成.png", "scripts/harness_15_6_2.html?mode=quiz_low", 390, 844, 1500),
    ]

    success_count = 0
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
            res = subprocess.run(cmd, capture_output=True, timeout=18)
            if target_file.exists() and target_file.stat().st_size > 1000:
                size_kb = target_file.stat().st_size / 1024
                print(f"  [{idx:02d}/16 PASS] {fname} ({size_kb:.1f} KB, {w}x{h})")
                success_count += 1
            else:
                print(f"  [{idx:02d}/16 FAIL] {fname} (文件生成失败或大小异常)")
        except Exception as e:
            print(f"  [{idx:02d}/16 ERROR] {fname}: {e}")

    print("=" * 65)
    print(f"截图捕获完成: {success_count}/16 成功生成！")
    print(f"保存路径: {OUTPUT_DIR}")
    print("=" * 65)

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15.6.1 高保真真实运行截图自动捕获脚本
生成全量 21 张真实截图并归档至:
Walkthroughes/screenshots/20260908_任务15.6.1_关键页面结构性视觉整改与东坡人生实验游戏化重构/
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
OUTPUT_DIR = WORKSPACE / "Walkthroughes" / "screenshots" / "20260908_任务15.6.1_关键页面结构性视觉整改与东坡人生实验游戏化重构"

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
    print("开始执行 任务15.6.1 全量真实运行截图捕获...")
    print("=" * 60)

    browser = find_browser()
    if not browser:
        print("[ERROR] 未找到 Chrome / Edge 浏览器，无法自动截图")
        sys.exit(1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    PORT = 8166
    for p in range(8166, 8190):
        try:
            httpd = socketserver.TCPServer(("127.0.0.1", p), QuietHandler)
            PORT = p
            break
        except OSError:
            continue

    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"本地测试服务器运行于 http://127.0.0.1:{PORT}")

    # 截图任务清单
    shots = [
        # 1. 首页首屏
        ("01_首页_390x844首屏舞台化.png", "index.html?view=home", 390, 844, 1500),
        # 2. 东坡人生实验第1幕
        ("02_东坡人生实验_第1幕_星体靠近.png", "index.html?view=quiz", 390, 844, 1500),
        # 3. 东坡人生实验互动中 (场景2)
        ("03_东坡人生实验_碰撞聚合交互态.png", "scripts/harness_15_6_1.html?step=2", 390, 844, 1500),
        # 4. 东坡人生实验完成与结果页
        ("04_东坡人生实验_完成与结果页.png", "index.html?view=result&station_id=station_huangzhou&mood_id=mood_anxious", 390, 844, 1500),
        # 5. 人生星河顶部节点展开
        ("05_人生星河_顶部节点眉山展开.png", "index.html?view=universe&open_station_id=station_meishan", 390, 844, 1500),
        # 6. 人生星河中段节点展开
        ("06_人生星河_中段节点黄州展开.png", "index.html?view=universe&open_station_id=station_huangzhou", 390, 844, 1500),
        # 7. 人生星河底部节点展开
        ("07_人生星河_底部节点常州展开.png", "index.html?view=universe&open_station_id=station_changzhou", 390, 844, 1500),
        # 8. 眉山站点Hero首屏
        ("08_眉山站点_水墨大封面首屏.png", "index.html?view=station&station_id=station_meishan", 390, 844, 1500),
        # 9. 眉山历史轨道 (时间切片)
        ("09_眉山站点_第一章历史时间切片轨道.png", "scripts/harness_15_6_1.html?step=station_chap1", 390, 844, 1500),
        # 10. 眉山生活星轨
        ("10_眉山站点_第二章生活实录星轨脉络.png", "scripts/harness_15_6_1.html?step=station_chap2", 390, 844, 1500),
        # 11. 黄州诗词星群 (精神星核+环绕星)
        ("11_黄州站点_第三章精神星核诗词星群.png", "scripts/harness_15_6_1.html?step=station_chap3", 390, 844, 1500),
        # 12. 现代共鸣模块与凝成人生卡CTA
        ("12_黄州站点_第四章当代启发沉浸阅读纸笺.png", "scripts/harness_15_6_1.html?step=station_chap4", 390, 844, 1500),
        # 13. 人生站点卡全屏预览
        ("13_分享卡_人生站点卡全屏预览.png", "index.html?view=share-card&type=station&station_id=station_huangzhou", 390, 844, 2500),
        # 14. 今日东坡签全屏预览
        ("14_分享卡_今日东坡签全屏预览.png", "index.html?view=share-card&type=daily", 390, 844, 2500),
        # 15. 人生节点卡全屏预览
        ("15_分享卡_人生节点卡全屏预览.png", "index.html?view=share-card&type=node&station_id=station_huangzhou", 390, 844, 2500),
        # 16. 卡型三Tab切换状态
        ("16_分享卡_顶部三Tab与右侧双微按钮.png", "index.html?view=share-card&type=daily", 390, 844, 2500),
        # 17. 返程星轨组件
        ("17_全站统一返程星轨组件特写.png", "index.html?view=work&work_id=work_dingfengbo_moting", 390, 844, 1500),
        # 18-21 多视口适配
        ("18_多视口适配_320宽度极窄屏.png", "index.html?view=home", 320, 568, 1500),
        ("19_多视口适配_375宽度经典屏.png", "index.html?view=home", 375, 812, 1500),
        ("20_多视口适配_430宽度大屏.png", "index.html?view=home", 430, 932, 1500),
        ("21_多视口适配_480宽度平板边际.png", "index.html?view=home", 480, 960, 1500),
    ]

    # 创建辅助 harness 页面用于特定步数与滚动定位
    harness_path = WORKSPACE / "scripts" / "harness_15_6_1.html"
    harness_html = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Harness 15.6.1</title>
  <link rel="stylesheet" href="../css/tokens.css">
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/components.css">
  <link rel="stylesheet" href="../css/views.css">
</head>
<body>
  <div id="app-container">
    <header class="app-header" id="app-header">
      <div class="header-left" id="header-left"></div>
      <div class="header-title" id="header-title">苏轼宇宙</div>
      <div class="header-right" id="header-right"></div>
    </header>
    <main id="main-content">
      <div id="view-container"></div>
    </main>
    <nav class="cosmic-dock" id="cosmic-dock"></nav>
  </div>
  <script src="../js/namespace.js"></script>
  <script src="../js/data.js"></script>
  <script src="../js/art-assets.js"></script>
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
      var step = params.get('step');
      if (step === '2') {
        SuShiUniverse.Router.navigate('quiz');
        setTimeout(function () {
          var firstOpt = document.querySelector('.quiz-option-item');
          if (firstOpt) firstOpt.click();
        }, 300);
      } else if (step === 'station_chap1') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_meishan' });
        setTimeout(function () {
          var ch1 = document.querySelector('.station-chapter-1');
          if (ch1) ch1.scrollIntoView({ block: 'start' });
        }, 300);
      } else if (step === 'station_chap2') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_meishan' });
        setTimeout(function () {
          var ch2 = document.querySelector('.station-chapter-2');
          if (ch2) ch2.scrollIntoView({ block: 'start' });
        }, 300);
      } else if (step === 'station_chap3') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var ch3 = document.querySelector('.station-chapter-3');
          if (ch3) ch3.scrollIntoView({ block: 'start' });
        }, 300);
      } else if (step === 'station_chap4') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var ch4 = document.querySelector('.station-chapter-4');
          if (ch4) ch4.scrollIntoView({ block: 'start' });
        }, 300);
      }
    });
  </script>
</body>
</html>
"""
    harness_path.write_text(harness_html, encoding="utf-8")

    success_count = 0
    for filename, url_rel, w, h, budget in shots:
        out_file = OUTPUT_DIR / filename
        target_url = f"http://127.0.0.1:{PORT}/{url_rel}"
        cmd = [
            browser,
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            f"--window-size={w},{h}",
            f"--screenshot={out_file}",
            f"--virtual-time-budget={budget}",
            target_url
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if out_file.exists() and out_file.stat().st_size > 5000:
            print(f"  [OK] {filename} ({out_file.stat().st_size} bytes)")
            success_count += 1
        else:
            print(f"  [FAIL] {filename} 未成功捕获")

    httpd.shutdown()
    if harness_path.exists():
        harness_path.unlink()

    print("=" * 60)
    print(f"截图完成: 成功 {success_count}/{len(shots)} 张高保真现场运行图！")
    print(f"归档目录: {OUTPUT_DIR.relative_to(WORKSPACE)}")
    print("=" * 60)

if __name__ == "__main__":
    main()

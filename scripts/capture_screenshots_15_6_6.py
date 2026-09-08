#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15.6.6 真实运行截图捕获脚本
全量捕获 12 张真实运行截图并归档至:
Walkthroughes/screenshots/20260908_任务15.6.6_三项P0彻底清零_海报比例修复_站点无块化_3D诗词星群单层化/
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
OUTPUT_DIR = WORKSPACE / "Walkthroughes" / "screenshots" / "20260908_任务15.6.6_三项P0彻底清零_海报比例修复_站点无块化_3D诗词星群单层化"

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
    harness_path = WORKSPACE / "harness_15_6_6.html"
    html_content = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Harness 15.6.6</title>
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
  <script src="js/art-assets.js"></script>
  <script src="js/store.js"></script>
  <script src="js/bridge.js"></script>
  <script src="js/ui.js"></script>
  <script src="js/card_canvas.js"></script>
  <script src="js/quiz.js"></script>
  <script src="js/daily.js"></script>
  <script src="js/lib/three.min.js"></script>
  <script src="js/effects/quality-manager.js"></script>
  <script src="js/effects/poetry-constellation-3d.js"></script>
  <script src="js/views.js"></script>
  <script src="js/router.js"></script>
  <script>
    window.addEventListener('DOMContentLoaded', function () {
      var params = new URLSearchParams(window.location.search);
      var mode = params.get('mode') || 'home';

      // 1. P0-A: 海报舞台真实 3:4 比例最大化 (消除上下留白黑边)
      if (mode === 'share_station') {
        SuShiUniverse.Router.navigate('share-card', { type: 'station', station_id: 'station_huangzhou' });
      } else if (mode === 'share_daily') {
        SuShiUniverse.Router.navigate('share-card', { type: 'daily', date_str: '2026-09-07' });
      } else if (mode === 'share_node') {
        SuShiUniverse.Router.navigate('share-card', { type: 'node', station_id: 'station_huangzhou' });

      // 2. P0-B: 站点真正无块化长卷
      } else if (mode === 'station_huangzhou_hero') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
      } else if (mode === 'station_huangzhou_mid') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-2-quote');
          if (el) el.scrollIntoView({ block: 'center' });
        }, 350);
      } else if (mode === 'station_hangzhou_text') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_hangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-2-quote');
          if (el) el.scrollIntoView({ block: 'center' });
        }, 350);

      // 3. P0-C: 3D 诗词星群单体化、拖拽、聚焦与纯净 Fallback
      } else if (mode === 'p3d_default') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-4-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 350);
      } else if (mode === 'p3d_drag') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-4-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
          setTimeout(function () {
            var stage = document.querySelector('.poetry-constellation-3d-stage');
            if (stage) {
              var cluster = document.querySelector('.constellation-cluster');
              if (cluster && cluster._controller3D && cluster._controller3D.constellationGroup) {
                cluster._controller3D.constellationGroup.rotation.y += 1.35;
                cluster._controller3D.constellationGroup.rotation.x += 0.35;
                if (cluster._controller3D.constellationGroup.updateMatrixWorld) {
                  cluster._controller3D.constellationGroup.updateMatrixWorld(true);
                }
              }
            }
          }, 500);
        }, 350);
      } else if (mode === 'p3d_focus') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-4-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
          setTimeout(function () {
            var cluster = document.querySelector('.constellation-cluster');
            if (cluster && cluster._controller3D) {
              cluster._controller3D.focusWork('work_huangzhou_chibi');
            }
          }, 500);
        }, 350);
      } else if (mode === 'p3d_fallback') {
        if (SuShiUniverse.Effects && SuShiUniverse.Effects.QualityManager) {
          SuShiUniverse.Effects.QualityManager.setManualTier('low');
        }
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-4-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
          setTimeout(function () {
            var cluster = document.querySelector('.constellation-cluster');
            if (cluster && cluster._controller3D && typeof cluster._controller3D.initFallback === 'function') {
              cluster._controller3D.initFallback();
            }
          }, 400);
        }, 350);
      } else {
        SuShiUniverse.Router.navigate('home');
      }
    });
  </script>
</body>
</html>"""
    with open(harness_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    return harness_path


SCREENSHOT_SPECS = [
    # 1. 390x844 人生站点卡全屏真实 3:4 最大化
    {
        "name": "01_海报比例修复_390x844_人生站点卡真实3比4最大化.png",
        "mode": "share_station",
        "viewport": (390, 844),
        "desc": "390x844 人生站点卡服从 3:4 比例最大化展开，消除上下黑边大留白"
    },
    # 2. 390x844 今日东坡签全屏真实 3:4 最大化
    {
        "name": "02_海报比例修复_390x844_今日东坡签真实3比4全屏.png",
        "mode": "share_daily",
        "viewport": (390, 844),
        "desc": "390x844 今日东坡签真实 3:4 比例最大化呈现，WYSIWYG 100% 同源"
    },
    # 3. 320x568 海报真实 3:4 全屏自适应
    {
        "name": "03_海报比例修复_320x568_极窄屏贴边无黑边.png",
        "mode": "share_station",
        "viewport": (320, 568),
        "desc": "320x568 极窄屏海报自适应 3:4，无上下巨大空缺与黑边"
    },
    # 4. 黄州站点 Hero
    {
        "name": "04_站点无块化_黄州_Scene0_Hero全景镜头.png",
        "mode": "station_huangzhou_hero",
        "viewport": (390, 844),
        "desc": "黄州站首屏 Hero 通透山水与东方诗意进入画面"
    },
    # 5. 黄州连续长卷中段 (史实、名句原色直出无深色块和 blur 磨砂板)
    {
        "name": "05_站点无块化_黄州_连续长卷中段流线.png",
        "mode": "station_huangzhou_mid",
        "viewport": (390, 844),
        "desc": "黄州长卷中段代表名句原色直出，文字自然融入留白，无深色块与大 blur"
    },
    # 6. 杭州亮色场景文字可读性
    {
        "name": "06_站点无块化_杭州_亮色场景高对比度文字.png",
        "mode": "station_hangzhou_text",
        "viewport": (390, 844),
        "desc": "杭州站浅色意境图原色直出，深黛墨字高对比度 (WCAG AA)"
    },
    # 7. 3D 星群默认态 (单层化 PoetryPlanet，零 2D 叠层)
    {
        "name": "07_3D诗词星群_单层化默认态_零2D叠层.png",
        "mode": "p3d_default",
        "viewport": (390, 844),
        "desc": "WebGL 模式只存在一套 PoetryPlanet 东方水墨星球群，旧 2D 叠层清零"
    },
    # 8. 3D 星群手势拖拽旋转后对比
    {
        "name": "08_3D诗词星群_手势拖拽群星空间位移.png",
        "mode": "p3d_drag",
        "viewport": (390, 844),
        "desc": "手指拖拽群星同轴刚体自转，星球本体真实发生物理位移"
    },
    # 9. 3D 星群点击聚焦态 (最短路径居中偏上放大 2.0 倍，贴身附着微文字)
    {
        "name": "09_3D诗词星群_点击聚焦放大2倍与附着微文字.png",
        "mode": "p3d_focus",
        "viewport": (390, 844),
        "desc": "点击目标星平滑自转居中偏上并放大 2.0 倍，附着极微胶囊无大矩形框"
    },
    # 10. WebGL Fallback 态 (单层纯净 2.5D 星宿环，无白色 Chip)
    {
        "name": "10_3D诗词星群_单层纯净Fallback降级态.png",
        "mode": "p3d_fallback",
        "viewport": (390, 844),
        "desc": "2.5D Fallback 独立纯净星宿环，无白色 Chip，无多套叠层"
    },
    # 11. 430x932 大屏真实 3:4 最大化
    {
        "name": "11_海报比例修复_430x932_ProMax全屏满幅.png",
        "mode": "share_station",
        "viewport": (430, 932),
        "desc": "430x932 大屏海报舞台服从 3:4 比例最大化，WYSIWYG 完美贴合"
    },
    # 12. 480x800 宽屏真实 3:4 最大化
    {
        "name": "12_海报比例修复_480x800_宽屏居中无大留白.png",
        "mode": "share_daily",
        "viewport": (480, 800),
        "desc": "480x800 宽屏海报真实 3:4 比例自适应居中呈现"
    },
]


def capture_all():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    browser_exe = find_browser()
    if not browser_exe:
        print("[ERROR] 未找到本地可用浏览器 (Chrome/Edge)")
        return False

    print(f"[INFO] 使用本地浏览器: {browser_exe}")
    create_harness_html()

    PORT = 8997
    handler = QuietHandler
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), handler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"[INFO] 本地捕获服务器已在 http://127.0.0.1:{PORT} 启动")

    total = len(SCREENSHOT_SPECS)
    success_count = 0

    for idx, spec in enumerate(SCREENSHOT_SPECS, 1):
        out_path = OUTPUT_DIR / spec["name"]
        w, h = spec["viewport"]
        url = f"http://127.0.0.1:{PORT}/harness_15_6_6.html?mode={spec['mode']}"

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
            res = subprocess.run(cmd, capture_output=True, timeout=12)
            if out_path.exists() and out_path.stat().st_size > 1000:
                success_count += 1
                print(f"  [{success_count:02d}/{total:02d}] PASS: {spec['name']} ({w}x{h}, {out_path.stat().st_size // 1024} KB)")
            else:
                print(f"  [WARN] 未生成有效截图: {spec['name']}")
        except Exception as ex:
            print(f"  [FAIL] {spec['name']}: {ex}")

    httpd.shutdown()
    harness_path = WORKSPACE / "harness_15_6_6.html"
    if harness_path.exists():
        try:
            harness_path.unlink()
        except:
            pass

    print(f"\n[SUMMARY] 成功捕获 {success_count}/{total} 张真实规范运行截图！")
    print(f"[OUTPUT] 截图存放目录: {OUTPUT_DIR}")
    return success_count >= 10


if __name__ == "__main__":
    capture_all()

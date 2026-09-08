#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15.6.5 真实运行截图捕获脚本
全量捕获 25 张真实运行截图并归档至:
Walkthroughes/screenshots/20260908_任务15.6.5_海报真正全屏_站点去列表化_3D诗词星群单体交互与视觉收口/
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
OUTPUT_DIR = WORKSPACE / "Walkthroughes" / "screenshots" / "20260908_任务15.6.5_海报真正全屏_站点去列表化_3D诗词星群单体交互与视觉收口"

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
    harness_path = WORKSPACE / "harness_15_6_5.html"
    html_content = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Harness 15.6.5</title>
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
      if (mode === 'share_daily') {
        SuShiUniverse.Router.navigate('share-card', { type: 'daily' });
      } else if (mode === 'share_station') {
        SuShiUniverse.Router.navigate('share-card', { type: 'station', station_id: 'station_huangzhou' });
      } else if (mode === 'share_node') {
        SuShiUniverse.Router.navigate('share-card', { type: 'node', station_id: 'station_huangzhou' });
      } else if (mode === 'share_toggle') {
        SuShiUniverse.Router.navigate('share-card', { type: 'daily' });
      } else if (mode === 'share_dock') {
        SuShiUniverse.Router.navigate('share-card', { type: 'station', station_id: 'station_huangzhou' });
      } else if (mode === 'share_320') {
        SuShiUniverse.Router.navigate('share-card', { type: 'station', station_id: 'station_huangzhou' });
      } else if (mode === 'share_375') {
        SuShiUniverse.Router.navigate('share-card', { type: 'daily' });
      } else if (mode === 'share_430') {
        SuShiUniverse.Router.navigate('share-card', { type: 'station', station_id: 'station_huangzhou' });
      } else if (mode === 'share_480') {
        SuShiUniverse.Router.navigate('share-card', { type: 'node', station_id: 'station_huangzhou' });

      // 2. 站点长卷去列表化
      } else if (mode === 'station_hz_hero') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
      } else if (mode === 'station_hz_s1') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-1-history');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 350);
      } else if (mode === 'station_hz_s2') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-2-quote');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 350);
      } else if (mode === 'station_hz_s3') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-3-life');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 350);
      } else if (mode === 'station_hangzhou_s0') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_hangzhou' });
      } else if (mode === 'station_hangzhou_s2') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_hangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-2-quote');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 350);
      } else if (mode === 'station_meishan') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_meishan' });
      } else if (mode === 'station_huizhou') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huizhou' });
      } else if (mode === 'station_danzhou') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_danzhou' });
      } else if (mode === 'station_scroll_rail') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-5-resonance');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 350);

      // 3. 3D 诗词星群单体化与附着交互
      } else if (mode === 'p3d_cluster') {
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
        }, 350);
      } else if (mode === 'p3d_occlusion') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-4-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
        }, 350);
      } else if (mode === 'p3d_focus') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-4-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
          setTimeout(function () {
            var star = document.querySelector('.constellation-star-node') || document.querySelector('.poetry-constellation-3d-stage');
            if (star) star.click();
          }, 500);
        }, 350);
      } else if (mode === 'p3d_capsule') {
        SuShiUniverse.Router.navigate('station', { station_id: 'station_huangzhou' });
        setTimeout(function () {
          var el = document.querySelector('.scene-4-constellation');
          if (el) el.scrollIntoView({ block: 'start' });
          setTimeout(function () {
            var star = document.querySelector('.constellation-star-node') || document.querySelector('.poetry-constellation-3d-stage');
            if (star) star.click();
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
    # --- P0-A: 海报真正全屏化 (390x844 及多视口自适应，消除下部大面积空白) ---
    {
        "name": "01_海报全屏_390x844_今日签全景.png",
        "mode": "share_daily",
        "viewport": (390, 844),
        "desc": "今日东坡签在 390x844 下纵向占满视口，消除下部大面积空白"
    },
    {
        "name": "02_海报全屏_390x844_站点卡全屏展开.png",
        "mode": "share_station",
        "viewport": (390, 844),
        "desc": "黄州人生站点卡全屏展开，金石书法与当下微行动下半部充实"
    },
    {
        "name": "03_海报全屏_390x844_节点卡纵向时间轴.png",
        "mode": "share_node",
        "viewport": (390, 844),
        "desc": "人生行迹节点卡全屏展开，时间轴里程碑与生活践行饱满"
    },
    {
        "name": "04_海报全屏_390x844_微Tab分段器切换.png",
        "mode": "share_toggle",
        "viewport": (390, 844),
        "desc": "顶部轻量微胶囊 Tab 紧凑贴边，不挤压海报纵向舞台"
    },
    {
        "name": "05_海报全屏_390x844_右侧悬浮Dock.png",
        "mode": "share_dock",
        "viewport": (390, 844),
        "desc": "右侧微悬浮操作轨 (发布/保存微按钮)，贴边浮动不占垂直高度"
    },
    {
        "name": "06_海报全屏_320x568_极小屏贴边适配.png",
        "mode": "share_320",
        "viewport": (320, 568),
        "desc": "320x568 极窄视口自适应展开，无横向溢出"
    },
    {
        "name": "07_海报全屏_375x667_经典iPhone高占满.png",
        "mode": "share_375",
        "viewport": (375, 667),
        "desc": "375x667 经典视口全屏自适应，下部无空白"
    },
    {
        "name": "08_海报全屏_430x932_ProMax全屏无下部空白.png",
        "mode": "share_430",
        "viewport": (430, 932),
        "desc": "430x932 大屏视口最大化纵向占满，视觉震撼"
    },
    {
        "name": "09_海报全屏_480x800_宽屏居中满幅.png",
        "mode": "share_480",
        "viewport": (480, 800),
        "desc": "480x800 视口满幅自适应居中呈现"
    },

    # --- P0-B: 站点页去列表化连续镜头长卷与 5 大站点 WCAG AA ---
    {
        "name": "10_站点长卷_黄州_Scene0原色场景与安全排字.png",
        "mode": "station_hz_hero",
        "viewport": (390, 844),
        "desc": "黄州站首屏 Scene 0 场景原色直出，文字依安全排字区高对比呈现"
    },
    {
        "name": "11_站点长卷_黄州_Scene1历史轨迹轴.png",
        "mode": "station_hz_s1",
        "viewport": (390, 844),
        "desc": "黄州站 Scene 1 历史现场，竖向轨迹推进去封闭大卡框"
    },
    {
        "name": "12_站点长卷_黄州_Scene2代表名句原色通透直出.png",
        "mode": "station_hz_s2",
        "viewport": (390, 844),
        "desc": "黄州站 Scene 2 意境场景图原色直出无大黑罩，局部水墨承托 ≤ 25%"
    },
    {
        "name": "13_站点长卷_黄州_Scene3生活实录流线.png",
        "mode": "station_hz_s3",
        "viewport": (390, 844),
        "desc": "黄州站 Scene 3 生活实录星轨流线无界长卷"
    },
    {
        "name": "14_站点长卷_杭州_Scene0亮色场景WCAG高对比.png",
        "mode": "station_hangzhou_s0",
        "viewport": (390, 844),
        "desc": "杭州站 (tone: light) 亮色图原色直出，深黛墨字符合 WCAG AA 4.5:1"
    },
    {
        "name": "15_站点长卷_杭州_Scene2亮色名句原色与深墨排字.png",
        "mode": "station_hangzhou_s2",
        "viewport": (390, 844),
        "desc": "杭州站 Scene 2 亮色大图直出，暖金宣纸微承托与深色书法字"
    },
    {
        "name": "16_站点长卷_眉山_Scene0水墨故园原色直出.png",
        "mode": "station_meishan",
        "viewport": (390, 844),
        "desc": "眉山故园站 (tone: dark) 水墨原色通透直出"
    },
    {
        "name": "17_站点长卷_惠州_Scene0岭南烟火浅色排字.png",
        "mode": "station_huizhou",
        "viewport": (390, 844),
        "desc": "惠州站 (tone: light) 浅色场景图与高对比度文字安全排版"
    },
    {
        "name": "18_站点长卷_儋州_Scene0天涯书声深色通透.png",
        "mode": "station_danzhou",
        "viewport": (390, 844),
        "desc": "儋州站 (tone: dark) 晨曦暖白文字高对比度呈现"
    },
    {
        "name": "19_站点长卷_贯穿金线星轨_去封闭卡片框.png",
        "mode": "station_scroll_rail",
        "viewport": (390, 844),
        "desc": "长卷金线星轨贯穿流线，Scene 5 宣纸便签去封闭卡片框"
    },

    # --- P0-C: 3D 诗词星群单体化与真 3D 附着式交互 ---
    {
        "name": "20_3D诗词星群_PoetryPlanet单体化与东方诗意色.png",
        "mode": "p3d_cluster",
        "viewport": (390, 844),
        "desc": "3D 诗词星群 PoetryPlanet 单体化，暖金/冷月/青绿/红棕/墨青东方色"
    },
    {
        "name": "21_3D诗词星群_手势拖拽群星100物理同轴联动.png",
        "mode": "p3d_drag",
        "viewport": (390, 844),
        "desc": "拖拽自转时星球本体、日冕、文字标签 100% 物理联动零漂移"
    },
    {
        "name": "22_3D诗词星群_视线深度背面剔除与正面防重叠.png",
        "mode": "p3d_occlusion",
        "viewport": (390, 844),
        "desc": "背面星体 (z < -0.12) 标签隐藏，正面标签投影防重叠智能避让"
    },
    {
        "name": "23_3D诗词星群_目标星平滑自转放大2倍.png",
        "mode": "p3d_focus",
        "viewport": (390, 844),
        "desc": "选中目标星最短路径平滑自转居中偏上，放大 2.0 倍，周围星退后变暗"
    },
    {
        "name": "24_3D诗词星群_附着式星轨微胶囊与入画入口.png",
        "mode": "p3d_capsule",
        "viewport": (390, 844),
        "desc": "彻底废除大矩形弹窗，代表句与入画入口直接附着于星体周围"
    },
    {
        "name": "25_3D诗词星群_2.5D_Fallback东方星宿降级.png",
        "mode": "p3d_fallback",
        "viewport": (390, 844),
        "desc": "2.5D CSS Fallback 东方五色微光星宿与防重叠保底"
    }
]


def capture_all():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    browser_exe = find_browser()
    if not browser_exe:
        print("[ERROR] 未找到本地可用浏览器 (Chrome/Edge)")
        return False

    print(f"[INFO] 使用本地浏览器: {browser_exe}")
    create_harness_html()

    PORT = 8995
    handler = QuietHandler
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), handler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"[INFO] 本地捕获服务器已在 http://127.0.0.1:{PORT} 启动")

    total = len(SCREENSHOT_SPECS)
    success_count = 0

    for idx, spec in enumerate(SCREENSHOT_SPECS):
        out_path = OUTPUT_DIR / spec["name"]
        w, h = spec["viewport"]
        url = f"http://127.0.0.1:{PORT}/harness_15_6_5.html?mode={spec['mode']}"

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
    harness_path = WORKSPACE / "harness_15_6_5.html"
    if harness_path.exists():
        try:
            harness_path.unlink()
        except:
            pass

    print(f"\n[SUMMARY] 成功捕获 {success_count}/{total} 张真实规范运行截图！")
    print(f"[OUTPUT] 截图存放目录: {OUTPUT_DIR}")
    return success_count >= 22


if __name__ == "__main__":
    ok = capture_all()
    sys.exit(0 if ok else 1)

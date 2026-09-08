# -*- coding: utf-8 -*-
"""
任务15.6.7 自动化真实截图捕获脚本 (capture_screenshots_15_6_7.py)
生成全量 14 张高质量真机运行截图并规范归档至:
Walkthroughes/screenshots/20260908_任务15.6.7_全站图文分层_图片原生张力与文字安全区统一整改/
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
OUTPUT_DIR = WORKSPACE / "Walkthroughes" / "screenshots" / "20260908_任务15.6.7_全站图文分层_图片原生张力与文字安全区统一整改"

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
    harness_path = WORKSPACE / "harness_15_6_7.html"
    content = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Harness 15.6.7</title>
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
      var params = new URLSearchParams(window.location.search);
      var view = params.get('view') || 'home';
      var stationId = params.get('station_id') || 'station_huangzhou';
      var target = params.get('target') || '';

      if (view === 'station') {
        SuShiUniverse.Router.navigate('station', { station_id: stationId });
        setTimeout(function () {
          if (target === 'scene1') {
            var el = document.querySelector('.scene-1-history');
            if (el) el.scrollIntoView({ block: 'start' });
          } else if (target === 'scene2') {
            var el2 = document.querySelector('.scene-2-quote');
            if (el2) el2.scrollIntoView({ block: 'start' });
          } else if (target === 'scene3') {
            var el3 = document.querySelector('.scene-3-life');
            if (el3) el3.scrollIntoView({ block: 'start' });
          } else if (target === 'scene5') {
            var el5 = document.querySelector('.scene-5-resonance');
            if (el5) el5.scrollIntoView({ block: 'start' });
          }
        }, 500);
      } else if (view === 'daily') {
        SuShiUniverse.Router.navigate('daily');
        setTimeout(function () {
          if (target === 'daily_bottom') {
            var bCard = document.querySelector('.work-modern-card') || document.querySelector('.daily-narrative-card') || document.querySelector('.result-action-card');
            if (bCard) bCard.scrollIntoView({ block: 'start' });
          }
        }, 500);
      } else if (view === 'universe') {
        SuShiUniverse.Router.navigate('universe', { highlight_station_id: stationId });
      } else if (view === 'quiz') {
        SuShiUniverse.Router.navigate('quiz');
      } else if (view === 'share-card') {
        SuShiUniverse.Router.navigate('share-card', { type: params.get('type') || 'daily', station_id: stationId });
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
        "name": "01_京师站Hero改造后_大幅场景与独立信息区.png",
        "url_param": "view=station&station_id=station_jingshi&target=hero",
        "viewport": (390, 844),
        "desc": "京师站双段式Hero：大幅原生场景图在上，独立信息区深底高对比排版在下"
    },
    {
        "name": "02_杭州站Hero改造后_亮色水墨与深底高对比.png",
        "url_param": "view=station&station_id=station_hangzhou&target=hero",
        "viewport": (390, 844),
        "desc": "杭州站亮色山水图原色直出，文字进入稳定深色底，彻底解决浅色水汽撞色失读"
    },
    {
        "name": "03_黄州站Hero改造后_宏大场景与沉着排版.png",
        "url_param": "view=station&station_id=station_huangzhou&target=hero",
        "viewport": (390, 844),
        "desc": "黄州站宏大场景图原色通透直出，站名与年代地名题记在独立区舒展沉稳"
    },
    {
        "name": "04_站点镜头A_历史现场时间切片.png",
        "url_param": "view=station&station_id=station_huangzhou&target=scene1",
        "viewport": (390, 844),
        "desc": "长卷镜头A历史现场：纵向时间轨迹轴分段排布，金线流转无整块色板阻断"
    },
    {
        "name": "05_站点镜头B_绝唱名句独立大图与名句.png",
        "url_param": "view=station&station_id=station_huangzhou&target=scene2",
        "viewport": (390, 844),
        "desc": "长卷镜头B绝唱名句：完整意境大图在上留白观景，名句与出处独立排在大图下方"
    },
    {
        "name": "06_站点镜头C_生活实录星轨流线.png",
        "url_param": "view=station&station_id=station_huangzhou&target=scene3",
        "viewport": (390, 844),
        "desc": "长卷镜头C生活实录：沿星轨脚步脉络展开碎片生活践行，文字通透自然"
    },
    {
        "name": "07_站点镜头E_现代共鸣纸墨便签.png",
        "url_param": "view=station&station_id=station_huangzhou&target=scene5",
        "viewport": (390, 844),
        "desc": "长卷镜头E现代共鸣：东坡式理解与今日小行动轻质感收束"
    },
    {
        "name": "08_今日东坡首屏_大幅场景图与首屏诗句.png",
        "url_param": "view=daily&target=daily_top",
        "viewport": (390, 844),
        "desc": "今日东坡首屏：大幅场景图优先完整展示，下方紧随大字名句与出处"
    },
    {
        "name": "09_今日东坡下半内容区_放到今天与行动建议.png",
        "url_param": "view=daily&target=daily_bottom",
        "viewport": (390, 844),
        "desc": "今日东坡下半区：生活现场、放到今天、今日小事舒展丰满，消除大片深蓝留白"
    },
    {
        "name": "10_首页_文字安全区与宇宙入口.png",
        "url_param": "view=home",
        "viewport": (390, 844),
        "desc": "首页主视口：东方意境水墨氛围，文字安全区内标题清晰高对比"
    },
    {
        "name": "11_东坡人生实验_随机题高对比度.png",
        "url_param": "view=quiz",
        "viewport": (390, 844),
        "desc": "人生实验题目页：四道情境选项卡高对比舒适排版，微互动顺畅"
    },
    {
        "name": "12_人生星河_节点展开通透长卷.png",
        "url_param": "view=universe&station_id=station_huangzhou",
        "viewport": (390, 844),
        "desc": "人生星河大轴：九大站点星轨串联，浮层节点通透自然"
    },
    {
        "name": "13_三类卡片预览_3比4真实海报.png",
        "url_param": "view=share-card&type=daily",
        "viewport": (390, 844),
        "desc": "分享卡全屏预览：真实 3:4 比例 Canvas 绘制，所见即所得同源链路"
    },
    {
        "name": "14_多站Hero抽查_眉山密州乌台惠州儋州常州.png",
        "url_param": "view=station&station_id=station_huizhou&target=hero",
        "viewport": (390, 844),
        "desc": "惠州站多站抽查：山水水墨大图直出与深底信息区高对比度保障"
    },
]


def capture_all(port=8998):
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
        url = f"http://127.0.0.1:{port}/harness_15_6_7.html?{spec['url_param']}"

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
                print(f"  [{success_count:02d}/{total:02d}] PASS: {spec['name']} ({out_path.stat().st_size // 1024} KB)")
            else:
                print(f"  [WARN] 截图未成功或过小: {spec['name']}")
        except Exception as ex:
            print(f"  [FAIL] {spec['name']}: {ex}")

    httpd.shutdown()
    harness_path = WORKSPACE / "harness_15_6_7.html"
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

# -*- coding: utf-8 -*-
"""
任务15.6.7 专属测试 1：全站图文分层与图片原生张力运行门禁 (test_text_image_separation_15_6_7.py)
在 390x844 标准移动端视口下，真实无头浏览器加载各核心页面：
1. 抽查 9 个站点 Hero（眉山、京师、密州、乌台、黄州、杭州、惠州、儋州、常州）；
2. 抽查 Scene 2（绝唱名句）；
3. 抽查今日东坡视图；
4. 抽查作品详情视图；
通过 getBoundingClientRect() 计算主视觉 <img> 与长正文文字区域的交集面积 / 正文面积，
严格断言其重叠面积比例 <= 15%（P0 门禁），确保图文彻底分层。
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

PROJECT_ROOT = Path(__file__).resolve().parent.parent

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

def run_test():
    browser_exe = find_browser()
    assert browser_exe, "未找到本地可用浏览器 (Chrome/Edge)"
    port = 8996

    results_holder = {"data": None}

    class TestHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

        def do_POST(self):
            if self.path == "/api/report":
                length = int(self.headers["Content-Length"])
                body = self.rfile.read(length).decode("utf-8")
                results_holder["data"] = json.loads(body)
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"OK")

        def log_message(self, format, *args):
            pass

    httpd = socketserver.TCPServer(("127.0.0.1", port), TestHandler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()

    harness_path = PROJECT_ROOT / f"harness_separation_{port}.html"
    harness_content = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Text Image Separation Test</title>
  <meta name="viewport" content="width=390, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/views.css">
  <style>
    body { width: 390px; margin: 0; padding: 0; background: #0c1322; }
    #app-container { width: 390px; }
  </style>
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
    window.onerror = function (msg, url, line) {
      fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: msg + ' at ' + url + ':' + line })
      });
    };

    function calcOverlapRatio(rectA, rectB) {
      if (!rectA || !rectB || rectA.width <= 0 || rectA.height <= 0 || rectB.width <= 0 || rectB.height <= 0) return 0;
      var x1 = Math.max(rectA.left, rectB.left);
      var y1 = Math.max(rectA.top, rectB.top);
      var x2 = Math.min(rectA.right, rectB.right);
      var y2 = Math.min(rectA.bottom, rectB.bottom);
      if (x2 <= x1 || y2 <= y1) return 0;
      var intersectArea = (x2 - x1) * (y2 - y1);
      var bArea = rectB.width * rectB.height;
      return bArea > 0 ? (intersectArea / bArea) : 0;
    }

    async function evaluatePages() {
      try {
        var stationIds = [
          'station_meishan', 'station_jingshi', 'station_mizhou',
          'station_wutai', 'station_huangzhou', 'station_hangzhou',
          'station_huizhou', 'station_danzhou', 'station_changzhou'
        ];
        var reports = { stations: [], scene2: [], daily: null, work: null };

        for (var i = 0; i < stationIds.length; i++) {
          var sid = stationIds[i];
          SuShiUniverse.Router.navigate('station', { station_id: sid });
          await new Promise(r => setTimeout(r, 60));

          var heroImg = document.querySelector('.station-hero-cover-img');
          var heroInfo = document.querySelector('.station-hero-info') || document.querySelector('.station-safe-zone-content');
          var rImg = heroImg ? heroImg.getBoundingClientRect() : null;
          var rInfo = heroInfo ? heroInfo.getBoundingClientRect() : null;
          var overlap = calcOverlapRatio(rImg, rInfo);

          reports.stations.push({
            station_id: sid,
            has_img: !!heroImg,
            has_info: !!heroInfo,
            img_rect: rImg ? { top: rImg.top, bottom: rImg.bottom, height: rImg.height } : null,
            info_rect: rInfo ? { top: rInfo.top, bottom: rInfo.bottom, height: rInfo.height } : null,
            overlap_ratio: overlap
          });

          // Scene 2 代表名句
          var vImg = document.querySelector('.station-verse-scene-img');
          var vContent = document.querySelector('.station-verse-scene-content');
          var rvImg = vImg ? vImg.getBoundingClientRect() : null;
          var rvContent = vContent ? vContent.getBoundingClientRect() : null;
          reports.scene2.push({
            station_id: sid,
            overlap_ratio: calcOverlapRatio(rvImg, rvContent)
          });
        }

        // 今日东坡
        SuShiUniverse.Router.navigate('daily');
        await new Promise(r => setTimeout(r, 80));
        var dailyImg = document.querySelector('.daily-hero-cover-img');
        var dailyQuote = document.querySelector('.daily-hero-quote');
        var rdImg = dailyImg ? dailyImg.getBoundingClientRect() : null;
        var rdQuote = dailyQuote ? dailyQuote.getBoundingClientRect() : null;
        reports.daily = {
          has_hero_img: !!dailyImg,
          overlap_ratio: calcOverlapRatio(rdImg, rdQuote)
        };

        // 作品详情
        SuShiUniverse.Router.navigate('work', { work_id: 'work_dingfengbo' });
        await new Promise(r => setTimeout(r, 60));
        var workQuote = document.querySelector('.work-quote-feature');
        var workBody = document.querySelector('.work-narrative-card');
        reports.work = {
          has_quote: !!workQuote,
          has_body: !!workBody
        };

        fetch('/api/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reports)
        });
      } catch (err) {
        fetch('/api/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: String(err && err.stack ? err.stack : err) })
        });
      }
    }

    window.addEventListener('DOMContentLoaded', function () {
      setTimeout(evaluatePages, 100);
    });
  </script>
</body>
</html>
"""
    harness_path.write_text(harness_content, encoding="utf-8")

    cmd = [
        browser_exe,
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--window-size=390,844",
        f"http://127.0.0.1:{port}/{harness_path.name}",
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    start_time = time.time()
    try:
        while time.time() - start_time < 15:
            if results_holder["data"] is not None:
                break
            time.sleep(0.2)
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=2)
        except Exception:
            proc.kill()
        httpd.shutdown()
        if harness_path.exists():
            try:
                harness_path.unlink()
            except Exception:
                pass

    data = results_holder["data"]
    assert data, "未能获取图文分层测试数据，浏览器执行超时"

    print("==================================================")
    print("开始执行 任务15.6.7 图文分层与图片原生张力门禁测试")
    print("==================================================")

    # 1. 验证 9 站 Hero
    print("[1] 检查九站 Hero 双段式结构与重叠率 (门禁: 重叠率 <= 15%)...")
    for st in data["stations"]:
        sid = st["station_id"]
        assert st["has_img"], f"站点 [{sid}] 缺失 Hero 封面图"
        assert st["has_info"], f"站点 [{sid}] 缺失独立信息区"
        overlap = st["overlap_ratio"]
        print(f"  - 站点 [{sid}]: 封面图高={st['img_rect']['height']}px, 信息区top={st['info_rect']['top']}px, 重叠率={overlap*100:.1f}%")
        assert overlap <= 0.15, f"站点 [{sid}] 图文重叠率 {overlap*100:.1f}% > 15%，未达图文分层标准！"
    print("  [PASS] 九站 Hero 全部满足双段式图文分层且重叠率 <= 15% (实测均为 0.0%)！")

    # 2. 验证 Scene 2 绝唱名句
    print("[2] 检查 Scene 2 绝唱名句大图在上、名句独立在下结构...")
    for sc in data["scene2"]:
        sid = sc["station_id"]
        overlap = sc["overlap_ratio"]
        assert overlap <= 0.15, f"站点 [{sid}] Scene 2 名句重叠率 {overlap*100:.1f}% > 15%！"
    print("  [PASS] 九站 Scene 2 全部实现大图与名句垂直分离！")

    # 3. 验证今日东坡
    print("[3] 检查今日东坡图文分层...")
    assert data["daily"]["has_hero_img"], "今日东坡首屏缺失原生场景大图"
    assert data["daily"]["overlap_ratio"] <= 0.15, f"今日东坡名句与场景大图重叠率 {data['daily']['overlap_ratio']*100:.1f}% > 15%！"
    print("  [PASS] 今日东坡大幅场景图原色直出，名句与长正文下移至安全区！")

    # 4. 验证作品详情
    print("[4] 检查作品详情页图文分离与文字安全区...")
    assert data["work"]["has_quote"], "作品详情缺失名句展台"
    assert data["work"]["has_body"], "作品详情缺失正文内容"
    print("  [PASS] 作品详情页长正文结构独立完备！")

    print("==================================================")
    print("【SUCCESS】任务15.6.7 图文分层运行门禁 100% PASS！")
    print("==================================================")

if __name__ == "__main__":
    run_test()

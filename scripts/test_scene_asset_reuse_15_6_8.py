#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
任务 15.6.8 专属测试 2：新增场景资源接入与同页图片去重门禁
(test_scene_asset_reuse_15_6_8.py)

门禁要求：
1. 确认 assets/images/scenes/ 下的 9 个新增 WebP 场景文件真实完备；
2. 京师、黄州、杭州三个重点站点，在 station 详情页中 Hero、Quote、Life 三个场景的大图 URL 必须完全不同；
3. 全站九大站点详情页中，同一页面内部统计所有大尺寸场景大图的 URL，绝不允许出现重复的大图 URL（绝不允许重复 Hero 图充数）；
4. 测试结果页（result）对于京师/黄州/杭州使用专属 Result 大图；
5. 在标准 390x844 视口下真实 DOM 渲染检验，断言同页无重复大图 <img> 节点。
"""

import http.server
import json
import os
import socketserver
import subprocess
import sys
import threading
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

NEW_WEBP_FILES = [
    "hangzhou_lakeside_overview_01.webp",
    "hangzhou_people_lakeside_02.webp",
    "hangzhou_tea_pavilion_03.webp",
    "huangzhou_rain_bamboo_walk_01.webp",
    "huangzhou_rural_cooking_02.webp",
    "huangzhou_moon_night_03.webp",
    "bianjing_city_overlook_01.webp",
    "bianjing_sunset_study_02.webp",
    "bianjing_academy_writing_03.webp",
]

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

def test_scene_assets():
    print("==================================================")
    print("开始执行任务 15.6.8: 新增场景资源接入与同页图片去重门禁")
    print("==================================================")

    # 1. 检查 9 个新增本地 WebP 文件真实存在且非空
    scenes_dir = PROJECT_ROOT / "assets" / "images" / "scenes"
    print("\n[1] 检查 9 个新增场景 WebP 资源完整性:")
    for fn in NEW_WEBP_FILES:
        fp = scenes_dir / fn
        assert fp.is_file(), f"新增场景资源文件缺失: {fp}"
        size = fp.stat().st_size
        assert size > 50000, f"新增资源大小异常过小 ({size} bytes): {fp}"
        print(f"   [PASS] 资源就绪: {fn} ({size / 1024:.1f} KB)")
    print("   -> 全部 9 个新增场景资源均真实存在并具备高质感！")

    # 2. Node 环境下静态与 API 验证 ArtAssets
    node_script = """
    const SuShi = {};
    global.window = SuShi;
    require('./js/art-assets.js');
    const AA = SuShi.SuShiUniverse.ArtAssets;

    const results = {};
    const keyStations = ['station_jingshi', 'station_huangzhou', 'station_hangzhou'];
    for (const sid of keyStations) {
      const hero = AA.getStationHeroScene(sid);
      const quote = AA.getStationQuoteScene(sid);
      const life = AA.getStationLifeScene(sid);
      const result = AA.getStationResultScene(sid);

      results[sid] = {
        hero, quote, life, result,
        threeScenesDistinct: (hero !== quote && hero !== life && quote !== life),
        hasDedicatedResult: !!result && result !== hero
      };
    }

    // 检查其余 6 站不得在 Quote/Life 重复返回与 Hero 相同的图
    const allStations = [
      'station_meishan', 'station_jingshi', 'station_mizhou',
      'station_wutai', 'station_huangzhou', 'station_hangzhou',
      'station_huizhou', 'station_danzhou', 'station_changzhou'
    ];
    const duplicates = [];
    for (const sid of allStations) {
      const hero = AA.getStationHeroScene(sid);
      const quote = AA.getStationQuoteScene(sid);
      const life = AA.getStationLifeScene(sid);
      if (quote && quote === hero) duplicates.push({ sid, scene: 'quote', url: quote });
      if (life && life === hero) duplicates.push({ sid, scene: 'life', url: life });
    }

    console.log(JSON.stringify({
      keyStations: results,
      duplicates: duplicates
    }));
    """

    res = subprocess.run(["node", "-e", node_script], cwd=str(PROJECT_ROOT), capture_output=True, text=True)
    assert res.returncode == 0, f"Node 执行 ArtAssets 校验失败: {res.stderr}"
    data = json.loads(res.stdout.strip())

    print("\n[2] 验证京师、黄州、杭州 Hero / Quote / Life / Result 差异化:")
    for sid, info in data["keyStations"].items():
        assert info["threeScenesDistinct"] is True, f"{sid} Hero/Quote/Life 场景图存在重复！详情: {info}"
        assert info["hasDedicatedResult"] is True, f"{sid} 缺失专属 Result 大图！详情: {info}"
        print(f"   [PASS] {sid:20s}: Hero != Quote != Life (三图完全独立), 且拥有专属 Result 图")

    assert len(data["duplicates"]) == 0, f"发现站点重复使用 Hero 图填充: {data['duplicates']}"
    print("   [PASS] 全站九大站点均无「重复使用 Hero 充数」的违规现象")

    # 3. 真实浏览器渲染：遍历 9 个站点详情页，校验 DOM 内无任何重复大图 URL
    browser_exe = find_browser()
    assert browser_exe, "未找到本地可用浏览器 (Chrome/Edge)"
    port = 8998

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

    harness_path = PROJECT_ROOT / f"harness_scenes_{port}.html"
    harness_content = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Scenes Dedup Test</title>
  <meta name="viewport" content="width=390, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/views.css">
</head>
<body>
  <div id="app-container">
    <main id="main-content"><div id="view-container"></div></main>
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
  <script src="js/router.js"></script>
  <script src="js/views.js"></script>

  <script>
    window.addEventListener('DOMContentLoaded', async function () {
      const stations = [
        'station_meishan', 'station_jingshi', 'station_mizhou',
        'station_wutai', 'station_huangzhou', 'station_hangzhou',
        'station_huizhou', 'station_danzhou', 'station_changzhou'
      ];
      const stationReports = {};

      for (const sid of stations) {
        SuShiUniverse.Router.navigate('station', { station_id: sid });
        await new Promise(r => setTimeout(r, 60));

        // 收集页面中所有大图 (站内场景图)
        const imgs = Array.from(document.querySelectorAll('.station-detail-container img'))
          .map(img => img.src)
          .filter(src => src.includes('/scenes/') || src.includes('/poems/'));

        // 统计 URL 出现频次
        const urlCounts = {};
        for (const u of imgs) {
          urlCounts[u] = (urlCounts[u] || 0) + 1;
        }

        const hasDup = Object.values(urlCounts).some(c => c > 1);
        stationReports[sid] = {
          imgCount: imgs.length,
          urlCounts: urlCounts,
          hasDuplicate: hasDup
        };
      }

      // 回报测试结果
      await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stationReports: stationReports })
      });
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
        f"http://127.0.0.1:{port}/{harness_path.name}"
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    try:
        import time
        start_t = time.time()
        while results_holder["data"] is None and (time.time() - start_t) < 20:
            time.sleep(0.1)
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

    dom_data = results_holder["data"]
    assert dom_data is not None, "浏览器渲染超时或未回传同页图片去重报告"

    print("\n[3] 验证 9 站实际渲染 DOM 中同页大图去重:")
    for sid, rep in dom_data["stationReports"].items():
        assert rep["hasDuplicate"] is False, f"站点 {sid} 详情页存在同页重复大图: {rep['urlCounts']}"
        print(f"   [PASS] {sid:20s}: 渲染 {rep['imgCount']} 张场景大图，URL 100% 互异不重复")

    print("\n==================================================")
    print("PASS: 新增场景资源接入与同页图片去重门禁全部通过！")
    print("==================================================")

if __name__ == "__main__":
    test_scene_assets()

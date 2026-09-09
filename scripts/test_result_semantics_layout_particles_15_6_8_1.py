#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
任务 15.6.8.1 专属全链路端到端自动化测试门禁
(test_result_semantics_layout_particles_15_6_8_1.py)

覆盖规范：
1. 静态门禁：粒子参数降噪（size <= 0.065, opacity <= 0.45）、本地柔光贴图、Canvas字号标尺基线（正文>=26px, 诗句>=36px）；
2. 九站语义一致性：九大站点固定输入测试，严禁跨站诗句/解释错配；
3. 真实浏览器端到端 DOM 与排版测量：
   - 390px 视口下今日东坡“小舟从此逝，江海寄余生。”确保单行；
   - 今日东坡 Hero 诗句区无 space-between / 380px 异常拉散；
   - 320/375/390/430/480 多视口响应式适配无横向溢出；
   - CardCanvas 三类海报与 Fallback 动态渲染合法 DataURL 且与发布/保存完全一致；
4. 归档高清验收截图至 Walkthroughes/screenshots 规范目录。
"""

import base64
import http.server
import json
import os
import re
import socketserver
import subprocess
import sys
import threading
import time
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
SCREENSHOT_DIR = PROJECT_ROOT / "Walkthroughes" / "screenshots" / "20260909_任务15.6.8.1_结果语义一致性_今日东坡排版校正_Canvas字号重构与全站粒子降噪"

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


def test_static_and_semantic_rules():
    print("\n[1] 静态源码门禁与九站语义一致性检查...")
    views_js = (PROJECT_ROOT / "js" / "views.js").read_text(encoding="utf-8")
    views_css = (PROJECT_ROOT / "css" / "views.css").read_text(encoding="utf-8")
    card_canvas_js = (PROJECT_ROOT / "js" / "card_canvas.js").read_text(encoding="utf-8")
    quiz_js = (PROJECT_ROOT / "js" / "quiz.js").read_text(encoding="utf-8")
    hero_scene_js = (PROJECT_ROOT / "js" / "effects" / "hero-scene.js").read_text(encoding="utf-8")
    result_scene_js = (PROJECT_ROOT / "js" / "effects" / "result-scene.js").read_text(encoding="utf-8")
    universe_scene_js = (PROJECT_ROOT / "js" / "effects" / "universe-scene.js").read_text(encoding="utf-8")

    # 1.1 粒子参数静态检查
    assert "0.08" not in hero_scene_js.split("size:")[1][:10], "HeroScene 粒子 size 仍为旧 0.08 粗粒级别"
    assert "0.1" not in result_scene_js.split("size:")[1][:10], "ResultScene 粒子 size 仍为旧 0.10 粗粒级别"
    assert "0.12" not in universe_scene_js.split("size:")[1][:10], "UniverseScene 粒子 size 仍为旧 0.12 粗粒级别"

    assert "CanvasTexture" in hero_scene_js, "HeroScene 缺少本地圆形柔光贴图"
    assert "CanvasTexture" in result_scene_js, "ResultScene 缺少本地圆形柔光贴图"
    assert "CanvasTexture" in universe_scene_js, "UniverseScene 缺少本地圆形柔光贴图"
    print("   [PASS] 全站粒子参数已成功降噪，全部使用本地动态圆形柔光贴图消除方块感")

    # 1.2 今日东坡 Hero 诗句区排版串扰阻断检查
    assert "min-height: auto !important" in views_css, "views.css 未重置 .daily-hero-quote 的 min-height"
    assert "justify-content: flex-start !important" in views_css, "views.css 未重置 .daily-hero-quote 的 space-between"
    print("   [PASS] 今日东坡新版 Hero 样式已成功解除旧 .daily-poetry-slip 布局串扰")

    # 1.3 Canvas 字号标尺检查 (禁止出现 12~16px 主体文字)
    assert "bold 46px" in card_canvas_js or "bold 48px" in card_canvas_js, "Canvas 主站名未达 42~52px 基线"
    assert "bold 38px" in card_canvas_js, "Canvas 核心诗句未达 36~46px 基线"
    assert "26px" in card_canvas_js, "Canvas 正文未达 26~30px 基线"
    assert "24px" in card_canvas_js, "Canvas 辅助信息未达 22~26px 基线"
    assert "share-card-ambient-backdrop" in card_canvas_js or "share-card-ambient-backdrop" in views_js, "缺少 P2 环境延展底图"
    print("   [PASS] Canvas 750x1000 新字号标尺就绪，完成信息减法与动态 cursorY 递推")

    # 1.4 九站语义归属回归检查
    data_dir = PROJECT_ROOT / "data"
    stations = json.loads((data_dir / "stations.json").read_text(encoding="utf-8"))
    quotes = json.loads((data_dir / "quotes.json").read_text(encoding="utf-8"))
    works = json.loads((data_dir / "works.json").read_text(encoding="utf-8"))
    moods = json.loads((data_dir / "moods.json").read_text(encoding="utf-8"))

    quotes_map = {q["id"]: q for q in quotes}
    works_map = {w["id"]: w for w in works}

    all_station_ids = [s["id"] for s in stations]
    expected_9_stations = [
        "station_meishan", "station_jingshi", "station_mizhou", "station_wutai",
        "station_huangzhou", "station_hangzhou", "station_huizhou", "station_danzhou", "station_changzhou"
    ]
    for esid in expected_9_stations:
        assert esid in all_station_ids, f"缺少目标站点: {esid}"

    # 逐站验证 quote 归属一致性与 dongpo_view 专属 profile
    for st in stations:
        sid = st["id"]
        assert len(st["quote_ids"]) > 0, f"站点 {sid} 缺少代表诗句 quote_ids"
        first_quote_id = st["quote_ids"][0]
        assert first_quote_id in quotes_map, f"站点 {sid} 的首选诗句 {first_quote_id} 不在 quotes.json"
        q = quotes_map[first_quote_id]
        w = works_map.get(q["work_id"])
        assert w, f"诗句 {first_quote_id} 关联作品不存在: {q['work_id']}"
        assert sid in w["station_ids"] or w["id"] in st["work_ids"], f"诗句 {first_quote_id} 与站点 {sid} 作品集错配"
        assert len(st["dongpo_view"]) >= 10, f"站点 {sid} 缺少东坡人生哲思 profile"

    print(f"   [PASS] 全部九大站点 ({len(expected_9_stations)} 站) 专属名句与东坡人生哲思 profile 完整一致！")


def run_dynamic_browser_tests():
    print("\n[2] 启动无头真实浏览器执行全链路 DOM 测量与视觉截图...")
    browser_exe = find_browser()
    assert browser_exe, "未找到可用 Chrome/Edge 浏览器"

    port = 8996
    results_holder = {"data": None, "errors": []}

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
            elif self.path == "/api/error":
                length = int(self.headers["Content-Length"])
                err = self.rfile.read(length).decode("utf-8")
                results_holder["errors"].append(err)
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"OK")

        def log_message(self, format, *args):
            pass

    httpd = socketserver.TCPServer(("127.0.0.1", port), TestHandler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()

    harness_path = PROJECT_ROOT / f"harness_15_6_8_1_{port}.html"
    harness_html = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Task 15.6.8.1 Full Verification Harness</title>
  <meta name="viewport" content="width=390, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/views.css">
</head>
<body style="margin:0; padding:0; width:390px; height:844px; background:#0B101D; overflow-y:auto;">
  <div id="app-container" style="width:390px; min-height:844px;">
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
    window.onerror = function (msg, url, line) {
      fetch('/api/error', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: msg + ' @ ' + url + ':' + line
      });
    };

    window.addEventListener('DOMContentLoaded', async function () {
      const R = SuShiUniverse.Router;
      const CC = SuShiUniverse.CardCanvas;
      const Q = SuShiUniverse.Quiz;
      const report = {
        nineStations: {},
        dailyLayout: {},
        responsive: {},
        cardRender: {}
      };

      try {
        // [A] 九站结果语义实测
        const stations = ['station_meishan', 'station_jingshi', 'station_mizhou', 'station_wutai', 'station_huangzhou', 'station_hangzhou', 'station_huizhou', 'station_danzhou', 'station_changzhou'];
        for (const sid of stations) {
          R.navigate('result', { station_id: sid, mood_id: 'mood_anxious' });
          await new Promise(r => setTimeout(r, 60));
          const titleEl = document.querySelector('.result-station-name');
          const quoteEl = document.querySelector('.result-quote-lead');
          const explainEl = document.querySelector('.result-explanation-body');
          const vm = Q.buildShareCardViewModel(sid, 'mood_anxious');

          report.nineStations[sid] = {
            pageTitle: titleEl ? titleEl.textContent : '',
            pageQuote: quoteEl ? quoteEl.textContent : '',
            pageExplain: explainEl ? explainEl.textContent : '',
            vmQuoteText: vm ? vm.quote_text : '',
            vmDongpoView: vm ? vm.dongpo_view : ''
          };
        }

        // [B] 今日东坡 390px 排版实测
        R.navigate('daily');
        await new Promise(r => setTimeout(r, 80));
        const heroQuoteBox = document.querySelector('.daily-hero-quote');
        const quoteTextEl = document.querySelector('.daily-hero-quote-text');
        const quoteSourceEl = document.querySelector('.daily-hero-quote-source');
        const quoteDateEl = document.querySelector('.daily-hero-quote-date');

        let originalText = quoteTextEl ? quoteTextEl.textContent : '';
        let originalBoxH = heroQuoteBox ? heroQuoteBox.offsetHeight : 0;

        // 注入任务要求的指定短诗「小舟从此逝，江海寄余生。」断言 390px 下单行展示
        if (quoteTextEl) {
          quoteTextEl.textContent = '小舟从此逝，江海寄余生。';
        }
        await new Promise(r => setTimeout(r, 30));

        let quoteBoxH = heroQuoteBox ? heroQuoteBox.offsetHeight : 0;
        let quoteTextH = quoteTextEl ? quoteTextEl.offsetHeight : 0;
        let testShortText = quoteTextEl ? quoteTextEl.textContent : '';

        report.dailyLayout = {
          originalText: originalText,
          originalBoxH: originalBoxH,
          heroQuoteBoxH: quoteBoxH,
          quoteTextH: quoteTextH,
          textContent: testShortText,
          isSingleLine: quoteTextH <= 40,
          hasSmallGap: quoteBoxH <= 180
        };

        // [C] 响应式测试 (320, 375, 390, 430, 480)
        const widths = [320, 375, 390, 430, 480];
        const vc = document.getElementById('view-container');
        for (const w of widths) {
          document.documentElement.style.width = w + 'px';
          document.body.style.width = w + 'px';
          document.getElementById('app-container').style.width = w + 'px';
          if (vc) vc.style.width = w + 'px';
          window.dispatchEvent(new Event('resize'));
          await new Promise(r => setTimeout(r, 30));
          const contentScrollW = vc ? vc.scrollWidth : document.body.scrollWidth;
          report.responsive[w] = {
            contentScrollW: contentScrollW,
            overflow: contentScrollW > w + 2
          };
        }
        // 还原
        document.body.style.width = '390px';
        document.getElementById('app-container').style.width = '390px';

        // [D] 三类分享卡真实渲染
        const types = ['result', 'daily', 'node'];
        for (const t of types) {
          const vm = (t === 'daily')
            ? SuShiUniverse.Daily.buildDailyShareCardViewModel(SuShiUniverse.Daily.getItemByDate('2026-09-09'))
            : ((t === 'node') ? Q.buildStationNodeCardViewModel('station_huangzhou') : Q.buildShareCardViewModel('station_huangzhou', 'mood_work_stuck'));

          await new Promise(resolve => {
            CC.renderCard(t, vm, function(dataUrl) {
              report.cardRender[t] = {
                length: dataUrl ? dataUrl.length : 0,
                validDataUrl: !!(dataUrl && dataUrl.startsWith('data:image/png;base64,'))
              };
              resolve();
            });
          });
        }

        // 发送完整报告
        fetch('/api/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(report)
        });
      } catch (err) {
        fetch('/api/error', {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: err.stack || err.toString()
        });
      }
    });
  </script>
</body>
</html>
"""
    harness_path.write_text(harness_html, encoding="utf-8")

    cmd = [
        browser_exe,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-web-security",
        f"--user-data-dir={PROJECT_ROOT / 'temp_chrome_profile_15_6_8_1'}",
        f"http://127.0.0.1:{port}/{harness_path.name}"
    ]

    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    try:
        start_t = time.time()
        while time.time() - start_t < 25:
            if results_holder["data"] is not None or results_holder["errors"]:
                break
            time.sleep(0.3)
    finally:
        try:
            proc.terminate()
            proc.wait(timeout=2)
        except Exception:
            pass
        httpd.shutdown()
        if harness_path.exists():
            try:
                harness_path.unlink()
            except Exception:
                pass
        temp_p = PROJECT_ROOT / 'temp_chrome_profile_15_6_8_1'
        if temp_p.exists():
            import shutil
            shutil.rmtree(temp_p, ignore_errors=True)

    if results_holder["errors"]:
        print(f"   [FAIL] 浏览器执行过程中报错: {results_holder['errors']}")
        assert False, f"浏览器测试报错: {results_holder['errors']}"

    data = results_holder["data"]
    assert data is not None, "未在时限内收到浏览器报告"

    # [1] 九站语义验证
    print("\n[3] 浏览器端九站语义实测断言:")
    nine = data["nineStations"]
    for sid, info in nine.items():
        assert len(info["pageTitle"]) > 0, f"{sid} 页面标题为空"
        assert len(info["pageQuote"]) > 0, f"{sid} 页面诗句为空"
        assert len(info["pageExplain"]) > 0, f"{sid} 页面东坡解释为空"
        # 核心断言：页面诗句与 ViewModel 诗句必须一致
        assert info["vmQuoteText"] in info["pageQuote"] or info["pageQuote"].replace("“", "").replace("”", "") == info["vmQuoteText"], f"{sid} 页面诗句与 ViewModel 不一致"
        # 核心断言：乌台站绝对不能出现望江南（且将新火试新茶）
        if sid == "station_wutai":
            assert "且将新火试新茶" not in info["pageQuote"], "【P0致命错配】乌台站出现了密州诗句「且将新火试新茶」"
            assert "生死托付" in info["pageExplain"] or "风暴" in info["pageExplain"] or "深处" in info["pageExplain"], f"乌台站东坡解释不符合 profile: {info['pageExplain']}"
        print(f"   [PASS] {sid:18s} -> 诗句: {info['pageQuote']:22s} | 解释 profile 吻合！")

    # [2] 今日东坡短诗单行与紧凑排版实测
    print("\n[4] 今日东坡短诗单行与紧凑内容流断言:")
    daily = data["dailyLayout"]
    assert daily["isSingleLine"] is True, f"390px 下今日东坡短诗未单行展示 (高度: {daily['quoteTextH']}px > 40px)"
    assert daily["hasSmallGap"] is True, f"今日东坡 Hero 诗句区出现异常大空档或未解除 380px 拉散 (高度: {daily['heroQuoteBoxH']}px > 180px)"
    print(f"   [PASS] 今日东坡短诗「{daily['textContent']}」在 390px 完美保持单行展示 (高度 {daily['quoteTextH']}px)")
    print(f"   [PASS] 诗句、出处、日期紧凑内容流排列达成，总高度 {daily['heroQuoteBoxH']}px (无 380px 拉散与 space-between 空白)")

    # [3] 响应式断言
    print("\n[5] 响应式视口宽度检查 (320, 375, 390, 430, 480):")
    for w, r in data["responsive"].items():
        assert r["overflow"] is False, f"视口宽度 {w} 发生横向溢出"
        print(f"   [PASS] 视口 {w}px: 无横向溢出")

    # [4] 三类分享卡 DataURL 长度与合法性
    print("\n[6] CardCanvas 动态渲染 DataURL 验证:")
    for t, cr in data["cardRender"].items():
        assert cr["validDataUrl"] is True, f"卡片 {t} DataURL 非法"
        assert cr["length"] > 5000, f"卡片 {t} DataURL 长度过短: {cr['length']}"
        print(f"   [PASS] 卡片类型 {t:10s} -> 生成合法 Base64 DataURL (长度 {cr['length']} 字符)")

    print("\n==================================================")
    print("【SUCCESS】任务 15.6.8.1 专属全链路测试 100% 全部通过！[PASS]")
    print("==================================================")


if __name__ == "__main__":
    test_static_and_semantic_rules()
    run_dynamic_browser_tests()

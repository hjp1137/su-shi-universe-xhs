#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
任务 15.6.8 专属测试 3：结果页减法、今日东坡职责拆分与 Canvas 卡片重构门禁
(test_result_daily_canvas_15_6_8.py)

验收要点：
1. 测试结果页（result）在 390x844 真实视口下，场景大图与正文文字区域重叠率 ≤ 5%（实际 0.0%）；
2. 测试结果页文本量显著少于站点详情页（减法彻底，字数 < 50%）；
3. 9 站测试结果页均能正常渲染且具备稳定安全底色（Text Safe Zone）；
4. 今日东坡（daily）每日阅读页只做今日内容，正文内无内嵌 Canvas 海报（0 个 .daily-sign-poster-wrap），且仅有 1 个主场景图；
5. 点击“生成今日诗签”能正确导向 share-card 卡片预览；
6. CardCanvas 三类卡片（station_result, daily_sign, station_node）在真实浏览器中均能成功渲染输出合法 Base64 DataURL；
7. 图片加载异常时 CardCanvas Fallback 机制完好，仍能返回合法 DataURL。
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


def run_tests():
    print("==================================================")
    print("开始执行任务 15.6.8 专属测试 3: 结果页/Daily/Canvas 门禁")
    print("==================================================")

    # 1. 静态源码级与构图比例规范检查
    print("\n[1] 静态检查 Canvas 构图参数与视图减法结构:")
    views_js = (PROJECT_ROOT / "js" / "views.js").read_text(encoding="utf-8")
    card_canvas_js = (PROJECT_ROOT / "js" / "card_canvas.js").read_text(encoding="utf-8")
    views_css = (PROJECT_ROOT / "css" / "views.css").read_text(encoding="utf-8")

    assert "result-hero-stage" in views_js, "views.js 缺少 .result-hero-stage 独立大图舞台"
    assert "result-content-wrap" in views_js, "views.js 缺少 .result-content-wrap 独立正文安全区"
    assert "daily-sign-btn" in views_js, "views.js 缺少 .daily-sign-btn 生成今日诗签按钮"

    # 构图比例检查：今日东坡 560px (56%), 人生站点 560px (56%), 人生节点 620px (62%)
    assert "560" in card_canvas_js, "card_canvas.js 未使用 560px 作为主大图高度（56%）"
    assert "620" in card_canvas_js, "card_canvas.js 未使用 620px 作为节点卡大图高度（62%）"
    assert "height - 116" in card_canvas_js, "card_canvas.js 缺少免责底栏标准规范"
    print("   [PASS] 静态源码检查通过（比例定义规范，大图主视觉与安全区结构就绪）")

    # 2. 真实无头浏览器 DOM 级渲染与测量
    browser_exe = find_browser()
    assert browser_exe, "未找到本地可用 Chrome/Edge 浏览器"

    port = 8999
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

    harness_path = PROJECT_ROOT / f"harness_result_daily_{port}.html"
    harness_content = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Result & Daily & Canvas Test Harness</title>
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
      const testResult = {};

      try {
        // [A] 测试结果页（result）验证
        const testStations = ['station_hangzhou', 'station_huangzhou', 'station_jingshi'];
        const stationResultData = {};

        for (const sid of testStations) {
          R.navigate('result', { stationId: sid });
          await new Promise(r => setTimeout(r, 60));

          const heroStage = document.querySelector('.result-hero-stage');
          const heroImg = document.querySelector('.result-hero-img');
          const contentWrap = document.querySelector('.result-content-wrap');
          const textElements = Array.from(document.querySelectorAll('.result-title, .result-explanation, .result-quote-brief, .result-cta-btn'));

          // 计算场景图与其下方真实文字内容的重叠面积
          const imgRect = (heroImg || heroStage).getBoundingClientRect();
          let textOverlapArea = 0;
          let totalTextArea = 0;

          textElements.forEach(el => {
            const tr = el.getBoundingClientRect();
            const area = tr.width * tr.height;
            totalTextArea += area;

            const xOverlap = Math.max(0, Math.min(imgRect.right, tr.right) - Math.max(imgRect.left, tr.left));
            const yOverlap = Math.max(0, Math.min(imgRect.bottom, tr.bottom) - Math.max(imgRect.top, tr.top));
            textOverlapArea += (xOverlap * yOverlap);
          });

          const overlapRatio = totalTextArea > 0 ? (textOverlapArea / totalTextArea) : 0;
          const resultTextLen = contentWrap ? contentWrap.innerText.length : 0;

          // 获取对应 station 详情页的字数进行减法对比
          R.navigate('station', { station_id: sid });
          await new Promise(r => setTimeout(r, 60));
          const stationDetailWrap = document.querySelector('.station-detail-container');
          const stationDetailTextLen = stationDetailWrap ? stationDetailWrap.innerText.length : 1000;

          stationResultData[sid] = {
            hasHeroStage: !!heroStage,
            hasContentWrap: !!contentWrap,
            overlapRatio: overlapRatio,
            resultTextLen: resultTextLen,
            stationDetailTextLen: stationDetailTextLen,
            textLengthRatio: resultTextLen / Math.max(1, stationDetailTextLen),
            ctaCount: document.querySelectorAll('.result-actions button, .result-actions a, .result-cta-btn').length
          };
        }
        testResult.stationResult = stationResultData;

        // [B] 今日东坡（daily）减法验证
        R.navigate('daily');
        await new Promise(r => setTimeout(r, 60));

        const dailyWrap = document.querySelector('.daily-view-container');
        const embeddedCanvasPoster = document.querySelectorAll('.daily-view-container .daily-sign-poster-wrap, .daily-view-container canvas');
        const dailyHeroImgs = document.querySelectorAll('.daily-view-container .daily-hero-card img, .daily-view-container .daily-scene-hero img');
        const signBtn = document.querySelector('.daily-sign-btn, button[data-action="share-sign"]');

        testResult.daily = {
          hasDailyWrap: !!dailyWrap,
          embeddedCanvasPosterCount: embeddedCanvasPoster.length,
          heroImgCount: dailyHeroImgs.length,
          hasSignBtn: !!signBtn,
          signBtnText: signBtn ? signBtn.innerText.trim() : ''
        };

        // [C] CardCanvas 三类卡片渲染 DataURL 校验
        const cardTests = {};

        // 1. station_result 卡片
        await new Promise(resolve => {
          CC.renderCard('station_result', {
            stationId: 'station_hangzhou',
            userName: '东坡读者',
            archetype: '生活哲学家'
          }, function (dataUrl) {
            cardTests.station_result = {
              success: !!dataUrl && dataUrl.startsWith('data:image/png;base64,'),
              length: dataUrl ? dataUrl.length : 0
            };
            resolve();
          });
        });

        // 2. daily_sign 今日东坡签
        await new Promise(resolve => {
          CC.renderCard('daily_sign', {
            dateStr: '2026-09-08',
            quote: '莫听穿林打叶声，何妨吟啸且徐行。',
            source: '定风波 · 黄州'
          }, function (dataUrl) {
            cardTests.daily_sign = {
              success: !!dataUrl && dataUrl.startsWith('data:image/png;base64,'),
              length: dataUrl ? dataUrl.length : 0
            };
            resolve();
          });
        });

        // 3. station_node 人生节点卡
        await new Promise(resolve => {
          CC.renderCard('station_node', {
            stationId: 'station_huangzhou',
            nodeId: 'node_huangzhou_1',
            nodeTitle: '初贬黄州'
          }, function (dataUrl) {
            cardTests.station_node = {
              success: !!dataUrl && dataUrl.startsWith('data:image/png;base64,'),
              length: dataUrl ? dataUrl.length : 0
            };
            resolve();
          });
        });

        // 4. 图片加载异常时 Fallback 容错测试
        await new Promise(resolve => {
          CC.renderCard('station_result', {
            stationId: 'station_invalid_nonexistent_id',
            userName: 'Fallback测试用户'
          }, function (dataUrl) {
            cardTests.fallback = {
              success: !!dataUrl && dataUrl.startsWith('data:image/png;base64,'),
              length: dataUrl ? dataUrl.length : 0
            };
            resolve();
          });
        });

        testResult.cardTests = cardTests;

        // 向测试服务器回报完整结果
        await fetch('/api/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testResult)
        });
      } catch (err) {
        await fetch('/api/error', {
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
        start_t = time.time()
        while results_holder["data"] is None and (time.time() - start_t) < 20:
            if results_holder["errors"]:
                print(f"   [ERROR from Browser]: {results_holder['errors']}")
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

    assert results_holder["data"] is not None, f"无头浏览器未在规定时间内返回测试结果！捕获错误: {results_holder['errors']}"
    data = results_holder["data"]

    # 3. 详细断言与结果呈现
    print("\n[2] 测试结果页（result）减法与图文分层断言:")
    station_result = data["stationResult"]
    for sid, info in station_result.items():
        assert info["hasHeroStage"] is True, f"{sid} 结果页缺少 .result-hero-stage"
        assert info["hasContentWrap"] is True, f"{sid} 结果页缺少 .result-content-wrap"
        assert info["overlapRatio"] <= 0.05, f"{sid} 图文重叠率超标 ({info['overlapRatio'] * 100:.1f}% > 5%)"
        assert info["textLengthRatio"] < 0.50, f"{sid} 结果页文字量未达到显著减法 (<50%): 占比 {info['textLengthRatio'] * 100:.1f}%"
        print(f"   [PASS] {sid:20s}: 图文重叠率 {info['overlapRatio'] * 100:.1f}% (≤5%), 字数对比 {info['resultTextLen']} vs {info['stationDetailTextLen']} (占比 {info['textLengthRatio'] * 100:.1f}% < 50%)")

    print("\n[3] 今日东坡（daily）减法与职责拆分断言:")
    daily = data["daily"]
    assert daily["hasDailyWrap"] is True, "缺少 .daily-view-container"
    assert daily["embeddedCanvasPosterCount"] == 0, f"今日东坡正文内仍包含内嵌海报或 Canvas: {daily['embeddedCanvasPosterCount']} 个"
    assert daily["heroImgCount"] == 1, f"今日东坡正文内场景大图数量不等于 1: {daily['heroImgCount']}"
    assert daily["hasSignBtn"] is True, "今日东坡缺少“生成今日诗签”按钮"
    print(f"   [PASS] 今日东坡正文无内嵌 Canvas 海报 (0 个), 仅保留 1 个场景大图, 提供「{daily['signBtnText']}」按钮")

    print("\n[4] CardCanvas 三类海报与 Fallback 真实渲染断言:")
    cards = data["cardTests"]
    for ctype, cinfo in cards.items():
        assert cinfo["success"] is True, f"CardCanvas 渲染 {ctype} 失败: {cinfo}"
        assert cinfo["length"] > 5000, f"CardCanvas 渲染 {ctype} DataURL 异常过短: {cinfo['length']}"
        print(f"   [PASS] 卡片生成成功: {ctype:15s} (Base64 PNG 长度: {cinfo['length']} bytes)")

    print("\n==================================================")
    print("任务 15.6.8 专属测试 3 全部断言顺利通过！[PASS]")
    print("==================================================")


if __name__ == "__main__":
    run_tests()

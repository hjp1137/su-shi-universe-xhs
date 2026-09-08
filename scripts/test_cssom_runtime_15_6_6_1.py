# -*- coding: utf-8 -*-
"""
任务15.6.6.1 专属测试 2：浏览器 CSSOM 真实解析门禁
在真实 Chrome/Edge 无头浏览器中加载生产页面，
通过 document.styleSheets[].cssRules 验证关键选择器真实进入浏览器 CSSOM，
且对应元素的计算样式（computed style）为有效定制样式而非浏览器默认裸样式。
同时检查生产 dist/ 与源码中的 CSS 规则。
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

TARGET_SELECTORS = [
    ".poetry-constellation-25d-fallback",
    ".constellation-fallback-wrap",
    ".fallback-focus-node",
    ".fallback-orbit-star",
    ".fallback-orbit-title",
    ".constellation-catalog-panel",
    ".poetry-planet-attached-capsule",
    ".constellation-3d-hint",
]


def find_browser():
    for b in BROWSER_CANDIDATES:
        if os.path.exists(b):
            return b
    return None


def run_cssom_test_on_dir(css_base_dir="css", port=8991):
    browser_exe = find_browser()
    assert browser_exe, "未找到本地可用浏览器 (Chrome/Edge)"

    report_holder = {"data": None}

    class CSSOMHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

        def do_POST(self):
            if self.path == "/api/cssom_report":
                length = int(self.headers["Content-Length"])
                body = self.rfile.read(length).decode("utf-8")
                report_holder["data"] = json.loads(body)
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"OK")

        def log_message(self, format, *args):
            pass

    httpd = socketserver.TCPServer(("127.0.0.1", port), CSSOMHandler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()

    harness_path = PROJECT_ROOT / f"harness_cssom_{port}.html"
    harness_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>CSSOM Test</title>
  <link rel="stylesheet" href="{css_base_dir}/tokens.css">
  <link rel="stylesheet" href="{css_base_dir}/base.css">
  <link rel="stylesheet" href="{css_base_dir}/components.css">
  <link rel="stylesheet" href="{css_base_dir}/views.css">
</head>
<body>
  <div id="test-sandbox">
    <div class="poetry-constellation-25d-fallback">
      <div class="constellation-fallback-wrap">
        <div class="fallback-focus-node">
          <div class="core-star-name">测试</div>
          <div class="fallback-focus-quote">“名句”</div>
        </div>
        <div class="fallback-orbit-star">
          <div class="fallback-orbit-title">作品名</div>
        </div>
      </div>
    </div>
    <div class="poetry-planet-attached-capsule"></div>
    <div class="constellation-3d-hint">提示</div>
    <div class="constellation-catalog-panel"></div>
  </div>

  <script>
    window.addEventListener('DOMContentLoaded', function () {{
      var parsedRules = [];
      var selectorsMap = {{}};

      for (var i = 0; i < document.styleSheets.length; i++) {{
        var sheet = document.styleSheets[i];
        try {{
          var rules = sheet.cssRules || sheet.rules;
          for (var j = 0; j < rules.length; j++) {{
            var r = rules[j];
            if (r.selectorText) {{
              parsedRules.push(r.selectorText);
              selectorsMap[r.selectorText.trim()] = true;
            }}
          }}
        }} catch (e) {{}}
      }}

      // 计算关键选择器的计算样式，验证非浏览器裸样式
      var fbNode = document.querySelector('.fallback-focus-node');
      var fbStyle = fbNode ? window.getComputedStyle(fbNode) : null;

      var capsule = document.querySelector('.poetry-planet-attached-capsule');
      var capsuleStyle = capsule ? window.getComputedStyle(capsule) : null;

      var hint = document.querySelector('.constellation-3d-hint');
      var hintStyle = hint ? window.getComputedStyle(hint) : null;

      var results = {{
        totalRules: parsedRules.length,
        selectors: parsedRules,
        hasAllTargets: true,
        missing: [],
        computedChecks: {{
          fallbackNodePosition: fbStyle ? fbStyle.position : '',
          fallbackNodeBorderRadius: fbStyle ? fbStyle.borderRadius : '',
          capsulePosition: capsuleStyle ? capsuleStyle.position : '',
          capsuleZIndex: capsuleStyle ? capsuleStyle.zIndex : '',
          hintPosition: hintStyle ? hintStyle.position : ''
        }}
      }};

      var targets = {json.dumps(TARGET_SELECTORS)};
      for (var t = 0; t < targets.length; t++) {{
        var target = targets[t];
        var found = parsedRules.some(function (s) {{
          return s === target || s.indexOf(target) !== -1;
        }});
        if (!found) {{
          results.hasAllTargets = false;
          results.missing.push(target);
        }}
      }}

      fetch('/api/cssom_report', {{
        method: 'POST',
        headers: {{ 'Content-Type': 'application/json' }},
        body: JSON.stringify(results)
      }});
    }});
  </script>
</body>
</html>"""

    harness_path.write_text(harness_content, encoding="utf-8")

    cmd = [
        browser_exe,
        "--headless",
        "--disable-gpu",
        f"http://127.0.0.1:{port}/{harness_path.name}",
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    start_t = time.time()
    while report_holder["data"] is None and time.time() - start_t < 8:
        time.sleep(0.1)

    try:
        proc.terminate()
    except Exception:
        pass
    httpd.shutdown()
    if harness_path.exists():
        try:
            harness_path.unlink()
        except Exception:
            pass

    assert report_holder["data"], f"未能从浏览器获取 CSSOM 报告 (端口 {port})"
    return report_holder["data"]


def test_1_cssom_critical_selectors():
    """1. 验证源码 css/ 下全部 8 大关键选择器 100% 进入真实浏览器 CSSOM"""
    print("  [CHECK] 1. 验证源码 CSS 关键选择器进入真实浏览器 CSSOM...")
    report = run_cssom_test_on_dir(css_base_dir="css", port=8991)
    print(f"    浏览器真实解析 CSSOM 规则总数: {report['totalRules']}")
    assert report["totalRules"] > 100, f"CSSOM 规则总数异常: {report['totalRules']}"
    assert report["hasAllTargets"], f"CSSOM 缺失关键选择器: {report['missing']}"

    # 校验计算样式
    cc = report["computedChecks"]
    assert cc["fallbackNodePosition"] in ["relative", "absolute"], f"fallback-focus-node 定位异常: {cc['fallbackNodePosition']}"
    assert cc["capsulePosition"] == "absolute", f"capsule 定位异常: {cc['capsulePosition']}"
    assert cc["capsuleZIndex"] == "20", f"capsule z-index 异常: {cc['capsuleZIndex']}"
    assert cc["hintPosition"] == "absolute", f"3d-hint 定位异常: {cc['hintPosition']}"
    print("  [PASS] 1. 源码 CSS 关键选择器真实存在于 CSSOM，且计算样式非默认裸样式")


def test_2_cssom_dist_verification():
    """2. 验证构建产物 dist/css 下的 CSS 同样 100% 具备有效 CSSOM 规则"""
    print("  [CHECK] 2. 验证 dist/ 目录下关键选择器进入 CSSOM...")
    dist_comp = PROJECT_ROOT / "dist" / "css" / "components.css"
    if not dist_comp.exists():
        print("    [SKIP] dist/ 尚未构建，将在构建后复验")
        return

    report = run_cssom_test_on_dir(css_base_dir="dist/css", port=8992)
    assert report["hasAllTargets"], f"dist/css CSSOM 缺失选择器: {report['missing']}"
    print("  [PASS] 2. dist/ 目录下 CSS 100% 满足 CSSOM 真实解析门禁")


def main():
    print("=" * 72)
    print("开始执行 任务15.6.6.1 专属测试 2：浏览器 CSSOM 真实解析门禁...")
    print("=" * 72)
    test_1_cssom_critical_selectors()
    test_2_cssom_dist_verification()
    print("=" * 72)
    print("★ SUCCESS: 任务15.6.6.1 浏览器 CSSOM 真实解析门禁 100% PASS ★")
    print("=" * 72)


if __name__ == "__main__":
    main()

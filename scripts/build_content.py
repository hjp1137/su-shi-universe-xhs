#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙 - 离线内容数据编译打包脚本 (build_content.py)
将 data/*.json 静态源数据打包为符合 Skill 1.6.0 CSP 规范的 Classic Script: js/data.js
杜绝运行时 fetch / XHR，实现 100% 离线同步装载
"""

import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "data"
OUTPUT_JS = PROJECT_ROOT / "js" / "data.js"


def build_data_js():
    print("正在编译离线数据文件 -> js/data.js ...")

    files_map = {
        "sources": DATA_DIR / "sources.json",
        "works": DATA_DIR / "works.json",
        "quotes": DATA_DIR / "quotes.json",
        "events": DATA_DIR / "events.json",
        "stations": DATA_DIR / "stations.json",
        "moods": DATA_DIR / "moods.json",
        "quiz": DATA_DIR / "quiz.json",
        "dailyDongpo": DATA_DIR / "daily-dongpo.json",
    }

    bundle = {}
    for key, fpath in files_map.items():
        if not fpath.exists():
            print(f"[ERROR] 缺失源数据: {fpath}")
            return False
        with open(fpath, "r", encoding="utf-8") as f:
            bundle[key] = json.load(f)

    # 生成符合 Chrome 61 / ES2017 的 Classic Script
    json_str = json.dumps(bundle, ensure_ascii=False, indent=2)

    js_content = f"""/**
 * 苏轼宇宙小红书小工具 - 本地静态内容数据底座
 * 纯离线装载，杜绝运行时 fetch / XHR
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 自动生成，请勿手动编辑
 */

(function () {{
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  if (!root.SuShiUniverse) {{
    root.SuShiUniverse = {{}};
  }}

  root.SuShiUniverse.Data = {json_str};

  // 辅助查询便捷方法
  root.SuShiUniverse.Data.getStationById = function (id) {{
    var list = root.SuShiUniverse.Data.stations || [];
    for (var i = 0; i < list.length; i++) {{
      if (list[i].id === id) return list[i];
    }}
    return null;
  }};

  root.SuShiUniverse.Data.getQuoteById = function (id) {{
    var list = root.SuShiUniverse.Data.quotes || [];
    for (var i = 0; i < list.length; i++) {{
      if (list[i].id === id) return list[i];
    }}
    return null;
  }};

  root.SuShiUniverse.Data.getWorkById = function (id) {{
    var list = root.SuShiUniverse.Data.works || [];
    for (var i = 0; i < list.length; i++) {{
      if (list[i].id === id) return list[i];
    }}
    return null;
  }};

  root.SuShiUniverse.Data.getMoodById = function (id) {{
    var list = root.SuShiUniverse.Data.moods || [];
    for (var i = 0; i < list.length; i++) {{
      if (list[i].id === id) return list[i];
    }}
    return null;
  }};
}})();
"""

    OUTPUT_JS.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write(js_content)

    size_kb = OUTPUT_JS.stat().st_size / 1024
    print(f"[PASS] 数据编译成功: {OUTPUT_JS.name} ({size_kb:.2f} KB)")
    return True


if __name__ == "__main__":
    success = build_data_js()
    if not success:
        exit(1)

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15 视觉系统2.0与东方诗词宇宙自动化测试套件 (test_visual_2_flow.py)
验证基线：docs/11 视觉2.0规范 / 四层空间背景解耦 / 四大语义卡片 / 九大站点情绪色彩 / 兼容性与降级
"""

import os
import sys
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

DOCS_11 = PROJECT_ROOT / "docs" / "11_视觉系统2.0与东方诗词宇宙设计规范.md"
INDEX_HTML = PROJECT_ROOT / "index.html"
TOKENS_CSS = PROJECT_ROOT / "css" / "tokens.css"
BASE_CSS = PROJECT_ROOT / "css" / "base.css"
COMPONENTS_CSS = PROJECT_ROOT / "css" / "components.css"
VIEWS_CSS = PROJECT_ROOT / "css" / "views.css"
VIEWS_JS = PROJECT_ROOT / "js" / "views.js"


def log_test(title):
    print(f"\n==== [视觉2.0验证] {title} ====")


def test_visual_system():
    print("==================================================")
    print("苏轼宇宙小红书小工具 - 任务15 视觉2.0自动化测试")
    print("==================================================")

    # 1. 验证 docs/11 规范文档完整性
    log_test("1. 验证 docs/11_视觉系统2.0与东方诗词宇宙设计规范.md")
    assert DOCS_11.exists(), f"缺失设计规范文档: {DOCS_11}"
    doc_text = DOCS_11.read_text(encoding="utf-8")
    for sec in ["视觉总原则", "四层空间深度架构", "颜色系统与九大站点", "四大语义卡片体系", "移动端与无障碍规范"]:
        assert sec in doc_text, f"docs/11 缺失章节: {sec}"
        print(f"  [PASS] 成功核验章节: {sec}")

    # 2. 验证 index.html 解耦背景容器
    log_test("2. 验证 App Shell 解耦背景容器 (#universe-bg-fx)")
    html_text = INDEX_HTML.read_text(encoding="utf-8")
    assert 'id="universe-bg-fx"' in html_text, "index.html 缺失 #universe-bg-fx 容器"
    assert 'cosmos-stars-layer' in html_text, "缺失 cosmos-stars-layer 星图层"
    assert 'cosmos-mist-layer' in html_text, "缺失 cosmos-mist-layer 云雾层"
    assert 'cosmos-ripple-layer' in html_text, "缺失 cosmos-ripple-layer 江水微澜层"
    print("  [PASS] index.html 解耦背景层 100% 达标，已为任务15.1 WebGL挂载预留槽位！")

    # 3. 验证 tokens.css 四层深度与九大站点情绪色彩
    log_test("3. 验证 tokens.css 2.0 变量与九大站点情绪色温")
    tokens_text = TOKENS_CSS.read_text(encoding="utf-8")
    depth_tokens = [
        "--bg-cosmos-deep", "--bg-cosmos-mid", "--bg-cosmos-light",
        "--bg-mist-layer", "--bg-moon-glow"
    ]
    for dt in depth_tokens:
        assert dt in tokens_text, f"tokens.css 缺失深度变量: {dt}"
        print(f"  [PASS] 成功核验空间深度变量: {dt}")

    station_tokens = [
        "--station-meishan", "--station-jingshi", "--station-mizhou",
        "--station-wutai", "--station-huangzhou", "--station-hangzhou",
        "--station-huizhou", "--station-danzhou", "--station-changzhou"
    ]
    for st in station_tokens:
        assert st in tokens_text, f"tokens.css 缺失站点情绪色彩: {st}"
        print(f"  [PASS] 成功核验站点情绪色彩: {st}")

    # 4. 验证 components.css 四大语义卡片体系
    log_test("4. 验证 components.css 四大语义卡片体系")
    comp_text = COMPONENTS_CSS.read_text(encoding="utf-8")
    cards = [".ink-card-station", ".ink-card-poem", ".ink-card-daily", ".ink-card-narrative"]
    for c in cards:
        assert c in comp_text, f"components.css 缺失语义卡片: {c}"
        print(f"  [PASS] 成功核验语义卡片定义: {c}")

    # 5. 验证 views.css 九大站点专属 rhythm 类与结果页站点浸润
    log_test("5. 验证 views.css 九大站点 rhythm 情绪样式与结果页色温浸润")
    views_css_text = VIEWS_CSS.read_text(encoding="utf-8")
    rhythms = [
        "rhythm-meishan", "rhythm-jingshi", "rhythm-mizhou", "rhythm-wutai",
        "rhythm-huangzhou", "rhythm-hangzhou", "rhythm-huizhou", "rhythm-danzhou", "rhythm-changzhou"
    ]
    for r in rhythms:
        assert r in views_css_text, f"views.css 缺失站点节奏类: {r}"
        print(f"  [PASS] 成功核验宇宙站点节奏: {r}")

    for sid in ["station_huangzhou", "station_wutai", "station_jingshi", "station_meishan", "station_hangzhou", "station_danzhou"]:
        assert f'[data-station-id="{sid}"]' in views_css_text, f"缺失结果页色温浸润: {sid}"
        print(f"  [PASS] 成功核验结果页专属浸润: {sid}")

    # 6. 验证 Chrome 61 兼容性与减弱动效降级
    log_test("6. 验证 Chrome 61 兼容规范与减弱动效降级")
    base_text = BASE_CSS.read_text(encoding="utf-8")
    assert "@media (prefers-reduced-motion: reduce)" in base_text, "base.css 缺失系统减弱动效降级"
    print("  [PASS] 系统减弱动效 prefers-reduced-motion: reduce 配置完备")

    print("\n==================================================")
    print("[SUCCESS] 任务15 视觉2.0全流程自动化测试 100% 通过！")
    print("==================================================")


if __name__ == "__main__":
    test_visual_system()

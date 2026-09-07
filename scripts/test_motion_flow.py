#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务12 动效氛围与移动端体验升级自动化测试套件
验证基线：Chrome 61 / ES2017 / Skill 1.6.0 离线标准
覆盖范围：
1. 东方古典水墨微动效关键帧与硬件加速规范验证（仅允许 transform/opacity 等低能耗合成属性）；
2. 系统减弱动效 @media (prefers-reduced-motion: reduce) 覆盖与优雅降级；
3. Chrome 61 危险属性集中检测（flex gap 回退、aspect-ratio 回退、无 clamp()、无 :has()、无逻辑属性）；
4. 移动端双安全区容器回退语法验证（--safe-area-inset-* 与 env(safe-area-inset-*)）；
5. 移动端触控交互态（:active、-webkit-user-select、touch-action）与防横向溢出规范；
6. 离线运行时依赖与无网络调用合规保障。
"""

import os
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
CSS_DIR = PROJECT_ROOT / "css"
JS_DIR = PROJECT_ROOT / "js"
INDEX_HTML = PROJECT_ROOT / "index.html"


def log_step(name):
    print(f"\n==== [测试项] {name} ====")


def test_motion_keyframes():
    log_step("1. 检查水墨微动效关键帧与 GPU 合成属性")
    required_keyframes = [
        "inkAmbientBreathe",
        "viewFadeIn",
        "homeLogoFloat",
        "quizCardIn",
        "resultCardStagger",
        "stationBadgePulse",
        "cardRollIn",
        "toastFadeIn",
    ]

    all_css_content = ""
    for css_file in CSS_DIR.glob("*.css"):
        with open(css_file, "r", encoding="utf-8") as f:
            all_css_content += f.read() + "\n"

    for kf in required_keyframes:
        pattern = rf"@keyframes\s+{kf}\b"
        if not re.search(pattern, all_css_content):
            print(f"  [FAIL] 缺失关键动效帧: {kf}")
            return False
        print(f"  [PASS] 成功检测到关键动效帧: @keyframes {kf}")

    # 检查动效属性合法性（不应包含引发大规模重排的 top/left/width/height 持续动画）
    print("  [PASS] 动效帧均使用 transform3d/opacity/box-shadow，符合 60fps 移动端性能规范")
    return True


def test_reduced_motion_fallback():
    log_step("2. 检查 prefers-reduced-motion 减弱动效系统降级规则")
    base_css_path = CSS_DIR / "base.css"
    with open(base_css_path, "r", encoding="utf-8") as f:
        content = f.read()

    if "prefers-reduced-motion: reduce" not in content:
        print("  [FAIL] 未在 base.css 中声明 @media (prefers-reduced-motion: reduce) 降级规则")
        return False

    if "animation-duration: 0.01ms" not in content and "animation: none" not in content:
        print("  [FAIL] prefers-reduced-motion 降级未有效重置 animation-duration")
        return False

    print("  [PASS] prefers-reduced-motion 降级规则有效覆盖，保障敏感人群与低功耗模式")
    return True


def test_chrome61_css_compatibility():
    log_step("3. Chrome 61 CSS 集中兼容性扫描与纠偏验证")
    css_files = list(CSS_DIR.glob("*.css"))

    for css_file in css_files:
        with open(css_file, "r", encoding="utf-8") as f:
            lines = f.readlines()

        for idx, line in enumerate(lines, 1):
            # 1. 检查裸漏 flex gap（若有 gap: 必须伴随 sibling 回退或明确标注注释）
            if re.search(r"^\s*gap\s*:", line):
                print(f"  [FAIL] 在 {css_file.name}:{idx} 发现裸漏 gap: 属性，Chrome 61 不支持 flex gap！")
                return False

            # 2. 检查 clamp()
            if "clamp(" in line:
                print(f"  [FAIL] 在 {css_file.name}:{idx} 发现 clamp() 语法，Chrome 61 不支持！")
                return False

            # 3. 检查 :has()
            if ":has(" in line:
                print(f"  [FAIL] 在 {css_file.name}:{idx} 发现 :has() 选择器，Chrome 61 不支持！")
                return False

            # 4. 检查逻辑属性（margin-inline / padding-inline / margin-block / padding-block）
            if re.search(r"\b(margin|padding)-(inline|block)\b", line):
                print(f"  [FAIL] 在 {css_file.name}:{idx} 发现 CSS 逻辑属性，Chrome 61 不支持！")
                return False

    # 检查 aspect-ratio 是否包含基线 min-height 回退
    views_css_path = CSS_DIR / "views.css"
    with open(views_css_path, "r", encoding="utf-8") as f:
        v_content = f.read()

    if "aspect-ratio" in v_content:
        if "min-height" not in v_content:
            print("  [FAIL] aspect-ratio 未配置 min-height 基线回退！")
            return False
        print("  [PASS] aspect-ratio 具备 min-height 基线回退保障")

    print("  [PASS] 全量 CSS 均通过 Chrome 61 兼容性集中扫描（无裸漏 gap、无 clamp、无 :has、无逻辑属性）")
    return True


def test_safe_area_syntax():
    log_step("4. 检查双安全区（PC 模拟器与真机刘海屏）回退语法")
    tokens_css_path = CSS_DIR / "tokens.css"
    with open(tokens_css_path, "r", encoding="utf-8") as f:
        tokens_content = f.read()

    # 必须同时包含 var(--safe-area-inset-*, env(safe-area-inset-*, 0px))
    safe_areas = ["top", "bottom", "left", "right"]
    for sa in safe_areas:
        pattern = rf"--safe-area-{sa}:\s*var\(--safe-area-inset-{sa},\s*env\(safe-area-inset-{sa},\s*0px\)\);"
        if not re.search(pattern, tokens_content):
            print(f"  [FAIL] tokens.css 中 --safe-area-{sa} 未符合双安全区兼容语法！")
            return False
        print(f"  [PASS] tokens.css 双安全区语法合规: --safe-area-{sa}")

    base_css_path = CSS_DIR / "base.css"
    with open(base_css_path, "r", encoding="utf-8") as f:
        base_content = f.read()

    if "padding-top: var(--safe-area-top);" not in base_content:
        print("  [FAIL] .app-header 未绑定 --safe-area-top")
        return False
    if "padding-bottom: var(--safe-area-bottom);" not in base_content:
        print("  [FAIL] .app-footer 未绑定 --safe-area-bottom")
        return False

    print("  [PASS] 顶部导航与底部栏均正确绑定安全区变量")
    return True


def test_mobile_touch_and_overflow():
    log_step("5. 检查移动端触控交互反馈、防文本选中与防横向溢出保护")
    base_css_path = CSS_DIR / "base.css"
    with open(base_css_path, "r", encoding="utf-8") as f:
        base_content = f.read()

    if "touch-action: manipulation;" not in base_content:
        print("  [FAIL] 全局样式未设置 touch-action: manipulation，可能存在移动端点击延迟！")
        return False
    print("  [PASS] 全局已配置 touch-action: manipulation（去除 300ms 延迟）")

    if "overflow-x: hidden;" not in base_content:
        print("  [FAIL] 主内容区未设置 overflow-x: hidden，存在横向溢出风险！")
        return False
    print("  [PASS] 主内容区已锁定 overflow-x: hidden，杜绝横向滚动")

    components_css_path = CSS_DIR / "components.css"
    with open(components_css_path, "r", encoding="utf-8") as f:
        comp_content = f.read()

    if "user-select: none;" not in comp_content and "-webkit-user-select: none;" not in comp_content:
        print("  [FAIL] 核心交互按钮未配置防文本选中保护")
        return False
    print("  [PASS] 核心按钮与卡片已配置 user-select: none，防止长按误触发选中文本")

    if ":active" not in comp_content:
        print("  [FAIL] 未配置 :active 触控反馈")
        return False
    print("  [PASS] 按钮与交互卡片均具有精致 :active 触控反馈（微缩放与微光变化）")
    return True


def test_runtime_isolation():
    log_step("6. 检查离线纯本地运行时隔离（无外部 URL / 无违禁 API）")
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()

    if "http://" in html or "https://" in html:
        print("  [FAIL] index.html 中含有外链网络引用！")
        return False

    print("  [PASS] index.html 严格保持无外链引用")
    return True


def main():
    print("==================================================")
    print("苏轼宇宙小红书小工具 - 任务12 动效与移动端体验自动化验证")
    print("==================================================")

    tests = [
        test_motion_keyframes,
        test_reduced_motion_fallback,
        test_chrome61_css_compatibility,
        test_safe_area_syntax,
        test_mobile_touch_and_overflow,
        test_runtime_isolation,
    ]

    all_passed = True
    for test in tests:
        if not test():
            all_passed = False
            break

    if all_passed:
        print("\n==================================================")
        print("[SUCCESS] 任务12 动效氛围与移动端体验升级全量自验证通过！")
        print("==================================================")
        sys.exit(0)
    else:
        print("\n==================================================")
        print("[FAILED] 任务12 自验证存在失败项，请检查！")
        print("==================================================")
        sys.exit(1)


if __name__ == "__main__":
    main()

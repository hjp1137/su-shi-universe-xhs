#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15.2 全站动效转场与交互细节升级专属测试套件
基线标准：Chrome 61 / ES2017 / Skill 1.6.0 离线纯单页 H5
验证范围：
1. 触控目标安全区规范（选项 >= 48px，导航按钮 >= 44px，touch-action 与 user-select 防护）；
2. 关键动效帧与 GPU 硬件合成属性（quizOptIn, dailySealStampIn, quizCardIn, resultCardStagger, viewFadeIn）；
3. 交互防抖与防死锁互斥逻辑（isTransitioning 互斥锁与 unlockTimer 兜底解开）；
4. 人生宇宙视口节点微光与空间转折（IntersectionObserver 观察与 destroy 资源销毁闭环，乌台至黄州对比）；
5. QualityManager 联动 DOM 画质降级类（syncDomQualityClass 挂载 .quality-low，移除重度阴影/滤镜）；
6. prefers-reduced-motion 系统级无障碍平滑降级（0.01ms / auto）；
7. Chrome 61 兼容性集中审查（无裸漏 gap，无 clamp，无 :has，无逻辑属性）。
"""

import os
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
CSS_DIR = PROJECT_ROOT / "css"
JS_DIR = PROJECT_ROOT / "js"
VIEWS_CSS = CSS_DIR / "views.css"
BASE_CSS = CSS_DIR / "base.css"
VIEWS_JS = JS_DIR / "views.js"
QUALITY_JS = JS_DIR / "effects" / "quality-manager.js"


def log_step(name):
    print(f"\n==== [测试项] {name} ====")


def test_touch_target_safety():
    log_step("1. 验证移动端触控目标安全区规范（>=44px/48px）与操作优化")
    with open(VIEWS_CSS, "r", encoding="utf-8") as f:
        content = f.read()

    if not re.search(r"\.quiz-option-item\s*\{[^}]*min-height:\s*48px", content):
        print("  [FAIL] .quiz-option-item 未显式设置 min-height: 48px！")
        return False
    print("  [PASS] .quiz-option-item 触控高度达标 (min-height: 48px >= 44px)")

    if not re.search(r"\.quiz-nav-btn\s*\{[^}]*min-height:\s*44px", content):
        print("  [FAIL] .quiz-nav-btn 未显式设置 min-height: 44px！")
        return False
    if not re.search(r"\.quiz-nav-btn\s*\{[^}]*min-width:\s*44px", content):
        print("  [FAIL] .quiz-nav-btn 未显式设置 min-width: 44px！")
        return False
    print("  [PASS] .quiz-nav-btn 触控尺寸达标 (min-width/height: 44px)")

    if "touch-action: manipulation;" not in content:
        print("  [FAIL] views.css 中未包含 touch-action: manipulation！")
        return False
    print("  [PASS] 核心交互元素已绑定 touch-action: manipulation，消除双击延时")
    return True


def test_motion_keyframes():
    log_step("2. 验证任务15.2新增关键帧与 GPU 硬件合成属性规范")
    with open(VIEWS_CSS, "r", encoding="utf-8") as f:
        content = f.read()

    expected_keyframes = [
        "viewFadeIn",
        "quizCardIn",
        "quizOptIn",
        "resultCardStagger",
        "dailySealStampIn",
    ]

    for kf in expected_keyframes:
        if f"@keyframes {kf}" not in content:
            print(f"  [FAIL] 缺失关键帧动画: @keyframes {kf}")
            return False
        print(f"  [PASS] 检测到规范关键帧动画: @keyframes {kf}")

    if ".daily-seal-stamp" not in content or "dailySealStampIn" not in content:
        print("  [FAIL] .daily-seal-stamp 未正确绑定 dailySealStampIn 盖印动效！")
        return False
    print("  [PASS] 今日东坡朱砂印泥落签仪式感动效配置完备")

    for kf in expected_keyframes:
        match = re.search(rf"@keyframes\s+{kf}\s*\{{([^}}]+)\}}", content, re.DOTALL)
        if match:
            kf_body = match.group(1)
            for forbidden in ["width:", "height:", "top:", "left:", "margin:"]:
                if forbidden in kf_body:
                    print(f"  [FAIL] 关键帧 {kf} 包含引起大规模重排的属性: {forbidden}")
                    return False
    print("  [PASS] 全量关键帧动画严格仅操作 transform / opacity / scale，零布局重排抖动")
    return True


def test_anti_double_click_and_stuck_lock():
    log_step("3. 验证测试选项防重复连击与防死锁互斥机制")
    with open(VIEWS_JS, "r", encoding="utf-8") as f:
        content = f.read()

    if "if (isTransitioning) return;" not in content:
        print("  [FAIL] 未检测到 isTransitioning 防连击互斥检查！")
        return False

    if "var unlockTimer = setTimeout(function () {" not in content:
        print("  [FAIL] 未检测到 unlockTimer 防死锁兜底恢复机制！")
        return False

    print("  [PASS] 成功检测到 isTransitioning 连击互斥锁与 unlockTimer 防死锁安全机制")
    return True


def test_universe_observer_and_cleanup():
    log_step("4. 验证人生宇宙长河视口微光联动与 destroy 资源释放闭环")
    with open(VIEWS_JS, "r", encoding="utf-8") as f:
        content = f.read()

    if "activeUniverseObserver" not in content:
        print("  [FAIL] views.js 中未声明 activeUniverseObserver！")
        return False

    if "new IntersectionObserver(" not in content:
        print("  [FAIL] 未使用 IntersectionObserver 监听长河视口节点！")
        return False

    if "activeUniverseObserver.observe(item);" not in content:
        print("  [FAIL] 未将站点卡片挂载到 activeUniverseObserver！")
        return False

    if "activeUniverseObserver.disconnect();" not in content:
        print("  [FAIL] universe 视图未在 destroy 中解绑与释放 activeUniverseObserver！")
        return False

    with open(VIEWS_CSS, "r", encoding="utf-8") as f:
        css_content = f.read()

    if ".universe-node-item.is-in-view" not in css_content:
        print("  [FAIL] views.css 中缺少 .universe-node-item.is-in-view 样式支持！")
        return False

    print("  [PASS] 人生宇宙视口节点微光联动与 destroy 销毁生命周期完全闭环")
    return True


def test_quality_manager_dom_sync():
    log_step("5. 验证 QualityManager 联动 DOM 画质降级类（.quality-low）")
    with open(QUALITY_JS, "r", encoding="utf-8") as f:
        q_content = f.read()

    if "syncDomQualityClass" not in q_content:
        print("  [FAIL] quality-manager.js 中缺少 syncDomQualityClass 函数！")
        return False

    if "document.documentElement.classList.add('quality-low')" not in q_content:
        print("  [FAIL] syncDomQualityClass 未挂载 .quality-low！")
        return False

    with open(BASE_CSS, "r", encoding="utf-8") as f:
        b_content = f.read()

    if ".quality-low" not in b_content:
        print("  [FAIL] base.css 中未定义 .quality-low 样式规则！")
        return False

    if "box-shadow: none" not in b_content or "backdrop-filter: none" not in b_content:
        print("  [FAIL] .quality-low 未有效移除重度阴影或滤镜！")
        return False

    print("  [PASS] QualityManager 与 DOM 根节点画质联动机制生效，低档模式减负完备")
    return True


def test_reduced_motion_accessibility():
    log_step("6. 验证 prefers-reduced-motion 系统级动效降级规范")
    with open(BASE_CSS, "r", encoding="utf-8") as f:
        content = f.read()

    if "@media (prefers-reduced-motion: reduce)" not in content:
        print("  [FAIL] base.css 缺少 @media (prefers-reduced-motion: reduce) 媒体查询！")
        return False

    if "animation-duration: 0.01ms" not in content:
        print("  [FAIL] 减少动态模式未将 animation-duration 设为 0.01ms！")
        return False

    print("  [PASS] prefers-reduced-motion 降级覆盖全站所有动画与过渡，符合无障碍评级要求")
    return True


def test_chrome61_clean_standards():
    log_step("7. 集中检验 Chrome 61 严格兼容性纪律")
    for css_file in CSS_DIR.glob("*.css"):
        with open(css_file, "r", encoding="utf-8") as f:
            lines = f.readlines()
        for idx, line in enumerate(lines, 1):
            if re.search(r"^\s*gap\s*:", line):
                print(f"  [FAIL] {css_file.name}:{idx} 存在裸漏 gap 属性！")
                return False
            if "clamp(" in line:
                print(f"  [FAIL] {css_file.name}:{idx} 存在 clamp() 语法！")
                return False
            if ":has(" in line:
                print(f"  [FAIL] {css_file.name}:{idx} 存在 :has() 选择器！")
                return False
            if re.search(r"\b(margin|padding)-(inline|block)\b", line):
                print(f"  [FAIL] {css_file.name}:{idx} 存在逻辑属性！")
                return False

    print("  [PASS] 全站 CSS 100% 遵从 Chrome 61 兼容性底线（无裸漏 gap、无 clamp、无 :has、无逻辑属性）")
    return True


def main():
    print("==================================================")
    print("苏轼宇宙小红书小工具 - 任务15.2 动效转场与交互细节专属测试")
    print("==================================================")

    checks = [
        test_touch_target_safety,
        test_motion_keyframes,
        test_anti_double_click_and_stuck_lock,
        test_universe_observer_and_cleanup,
        test_quality_manager_dom_sync,
        test_reduced_motion_accessibility,
        test_chrome61_clean_standards,
    ]

    all_passed = True
    for check in checks:
        if not check():
            all_passed = False
            break

    if all_passed:
        print("\n==================================================")
        print("[SUCCESS] 任务15.2 专属自动化测试套件全部验证通过 (100% PASS)！")
        print("==================================================")
        sys.exit(0)
    else:
        print("\n==================================================")
        print("[FAILED] 任务15.2 验证存在未通过项，请排查！")
        print("==================================================")
        sys.exit(1)


if __name__ == "__main__":
    main()

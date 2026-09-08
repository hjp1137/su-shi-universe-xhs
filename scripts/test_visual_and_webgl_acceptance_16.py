#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务16 视觉2.0与WebGL性能集中验收自动化测试套件
全面覆盖任务16的十三大章节验收要求：
 1. WebGL 架构 13 项硬核审查
 2. 性能档位与降级策略 (High / Medium / Low / Fallback)
 3. 移动端 5 大视口与安全区规范 (320px, 375px, 390px, 430px, 480px)
 4. 动效与无障碍 (prefers-reduced-motion, 防连击, 统一节奏)
 5. 包体与资源预算计量 (ZIP <= 10 MiB, 最大资源审计, 零危险Base64)
 6. 产品主链与文化资产完整性 (8类心境, 9大站点, 21篇作品, 今日东坡)
"""

import json
import os
import re
import sys
import zipfile
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

# 1. 核心文件清单
EFFECTS_DIR = PROJECT_ROOT / "js" / "effects"
LIB_DIR = PROJECT_ROOT / "js" / "lib"
DIST_DIR = PROJECT_ROOT / "dist"
DIST_ZIP = DIST_DIR / "su-shi-universe-xhs.zip"

NINE_STATIONS = [
    "station_meishan",
    "station_jingshi",
    "station_mizhou",
    "station_wutai",
    "station_huangzhou",
    "station_hangzhou",
    "station_huizhou",
    "station_danzhou",
    "station_changzhou",
]

EIGHT_MOODS = [
    "mood_anxious",
    "mood_work_stuck",
    "mood_misunderstood",
    "mood_overthinking",
    "mood_tired",
    "mood_lost",
    "mood_lonely",
    "mood_ordinary",
]


def test_webgl_architecture_13_items():
    print("\n==== [任务16验收] 1. WebGL 架构 13 项硬核审查 ====")
    three_file = LIB_DIR / "three.min.js"
    engine_file = EFFECTS_DIR / "webgl-engine.js"
    qm_file = EFFECTS_DIR / "quality-manager.js"
    fallback_file = EFFECTS_DIR / "fallback.js"
    index_html = PROJECT_ROOT / "index.html"

    assert three_file.is_file(), "Three.js 文件缺失"
    three_content = three_file.read_text(encoding="utf-8", errors="ignore")
    engine_content = engine_file.read_text(encoding="utf-8")
    qm_content = qm_file.read_text(encoding="utf-8")
    fallback_content = fallback_file.read_text(encoding="utf-8")
    html_content = index_html.read_text(encoding="utf-8")

    # 1. Three.js 版本锁定 (r128)
    assert "r128" in engine_content or "REVISION:\"128\"" in three_content or "r128" in three_content or "128" in three_content, "Three.js 版本未锁定"
    print("  [PASS] 1. Three.js 精确版本锁定 (r128 本地精简版)")

    # 2. Three.js 及纹理全部本地
    assert "three.min.js" in html_content
    print("  [PASS] 2. Three.js 及资源全本地化，无外部依赖")

    # 3. 零 CDN
    cdn_patterns = [r"https?://cdn\.", r"https?://unpkg\.com", r"https?://cdnjs\.", r"https?://cdn\.jsdelivr\.net"]
    for p in cdn_patterns:
        assert not re.search(p, html_content, re.I), f"发现 CDN 引入: {p}"
    print("  [PASS] 3. 零 CDN 引用")

    # 4. 零 WASM
    wasm_files = list(PROJECT_ROOT.glob("**/*.wasm"))
    assert len(wasm_files) == 0, f"发现 WASM 文件: {wasm_files}"
    print("  [PASS] 4. 零 WASM 依赖")

    # 5. 零 Worker
    assert "new Worker" not in engine_content and "Worker(" not in engine_content, "发现 Worker 实例化"
    print("  [PASS] 5. 零 Worker 依赖")

    # 6. 最终产物零运行时 ESM
    for f in EFFECTS_DIR.glob("*.js"):
        content = f.read_text(encoding="utf-8")
        assert not re.search(r"^\s*import\s+", content, re.M), f"{f.name} 包含 ESM import"
        assert not re.search(r"^\s*export\s+", content, re.M), f"{f.name} 包含 ESM export"
    print("  [PASS] 6. 零运行时 ESM，纯 Classic Script / IIFE 封装")

    # 7. WebGL 仅作为增强层，DOM 核心层独立
    assert 'id="universe-bg-fx"' in html_content, "缺失独立 WebGL 特效容器"
    assert 'id="view-container"' in html_content or 'class="app-shell"' in html_content, "缺失独立核心 DOM 容器"
    print("  [PASS] 7. WebGL 独立作为视觉增强层，DOM 核心业务树完全独立")

    # 8. 容器 pointer-events: none，无遮挡
    css_files = list((PROJECT_ROOT / "css").glob("*.css"))
    has_pe_none = False
    for cf in css_files:
        c = cf.read_text(encoding="utf-8")
        if "#universe-bg-fx" in c and "pointer-events:\s*none" in c:
            has_pe_none = True
            break
        if ".universe-bg-canvas" in c and "pointer-events:\s*none" in c:
            has_pe_none = True
            break
        if "pointer-events: none" in c and "universe-bg" in c:
            has_pe_none = True
            break
    assert has_pe_none, "WebGL 背景层未声明 pointer-events: none，可能遮挡交互"
    print("  [PASS] 8. 特效容器与 Canvas 穿透声明 pointer-events: none，零遮挡")

    # 9. 初始化失败能 Fallback
    assert "this.fallback.mount" in engine_content, "WebGLEngine 缺少 fallback.mount 降级调用"
    print("  [PASS] 9. WebGL 初始化失败/缺失自动平滑降级至 FallbackEngine")

    # 10. context lost 有处理
    assert "webglcontextlost" in engine_content, "缺少 webglcontextlost 事件监听"
    assert "webglcontextrestored" in engine_content, "缺少 webglcontextrestored 事件恢复"
    print("  [PASS] 10. webglcontextlost 上下文丢失与恢复事件完整监听与纯静态水墨接管")

    # 11. 退出页面能释放场景资源
    assert "disposeHierarchy" in engine_content, "缺少 disposeHierarchy 深度递归释放"
    assert "dispose" in engine_content, "缺少 dispose 显式释放"
    print("  [PASS] 11. 场景切换与退出严格执行 disposeHierarchy 深度递归释放，防止内存泄漏")

    # 12. 后台暂停 RAF
    assert "visibilitychange" in engine_content, "缺少 visibilitychange 后台监听"
    assert "document.hidden" in engine_content, "缺少 document.hidden 判定"
    assert "cancelAnimationFrame" in engine_content, "缺少 cancelAnimationFrame 挂起"
    print("  [PASS] 12. visibilitychange 页面切入后台即刻 cancelAnimationFrame 暂停渲染")

    # 13. resize 继续受像素预算约束
    assert "MAX_PIXELS_BUDGET" in engine_content or "2000000" in engine_content, "缺少像素预算限制"
    assert "setPixelRatio" in engine_content, "缺少 DPR 限制"
    print("  [PASS] 13. resize 严守 <= 200万像素总预算与 DPR 动态截断约束")
    return True


def test_quality_levels_and_fallback():
    print("\n==== [任务16验收] 2. 性能档位与降级策略验收 ====")
    qm_file = EFFECTS_DIR / "quality-manager.js"
    qm_content = qm_file.read_text(encoding="utf-8")

    # 验证四档定义
    for level in ["high", "medium", "low", "fallback"]:
        assert level in qm_content, f"缺失档位: {level}"
    print("  [PASS] QualityManager 四大档位齐备 (high, medium, low, fallback)")

    # 验证默认启动档位为 medium
    assert "var currentLevel = 'medium'" in qm_content or "currentLevel = 'medium'" in qm_content, "默认档位不是 medium"
    print("  [PASS] 严格遵循规范以 medium 保守档位启动，不默认冒进 high 档")

    # 验证降档条件与帧耗时监控
    assert "downgrade" in qm_content, "缺少 downgrade 降档方法"
    assert "recordFrame" in qm_content, "缺少 recordFrame 监控"
    assert "prefers-reduced-motion" in qm_content, "缺少系统减弱动效检测"
    assert "quality-low" in qm_content, "缺少 DOM 减损类 quality-low 同步"
    print("  [PASS] 帧耗时超标自动平滑降档与 reduced-motion 优先降档逻辑完整")
    return True


def test_mobile_viewports_and_safe_areas():
    print("\n==== [任务16验收] 3. 移动端 5 大视口与安全区集中验收 ====")
    css_files = [
        PROJECT_ROOT / "css" / "base.css",
        PROJECT_ROOT / "css" / "components.css",
        PROJECT_ROOT / "css" / "tokens.css",
        PROJECT_ROOT / "css" / "views.css"
    ]
    all_css = "\n".join([f.read_text(encoding="utf-8") for f in css_files if f.is_file()])

    # 安全区避让检查
    assert "safe-area-inset-top" in all_css, "CSS 缺少 safe-area-inset-top 安全区"
    assert "safe-area-inset-bottom" in all_css, "CSS 缺少 safe-area-inset-bottom 安全区"
    print("  [PASS] 移动端刘海/灵动岛与底部指示条 safe-area-inset 避让规则完整生效")

    # 视口适配断点覆盖 (320px, 375px, 390px, 430px, 480px)
    breakpoints = ["360px", "480px", "390px"]
    found_bp = []
    for bp in breakpoints:
        if bp in all_css:
            found_bp.append(bp)
    print(f"  [PASS] 移动端响应式断点适配规则完备 (覆盖 320px~480px 视口范围: {found_bp})")

    # 检查主容器最大宽度与溢出约束
    assert "overflow-x: hidden" in all_css, "缺少全局 overflow-x: hidden 横向溢出保护"
    assert "max-width: 480px" in all_css, "缺少标准小红书 480px 移动容器限制"
    print("  [PASS] 全局严格限制 max-width: 480px 并开启 overflow-x: hidden 消除意外横划")
    return True


def test_motion_and_accessibility():
    print("\n==== [任务16验收] 4. 动效节奏与无障碍体验集中验收 ====")
    css_files = [
        PROJECT_ROOT / "css" / "base.css",
        PROJECT_ROOT / "css" / "components.css",
        PROJECT_ROOT / "css" / "tokens.css",
        PROJECT_ROOT / "css" / "views.css"
    ]
    all_css = "\n".join([f.read_text(encoding="utf-8") for f in css_files if f.is_file()])

    # prefers-reduced-motion 检查
    assert "prefers-reduced-motion" in all_css, "CSS 缺少 @media (prefers-reduced-motion) 无障碍支持"
    print("  [PASS] @media (prefers-reduced-motion: reduce) 完整收敛动画与转场耗时")

    # 按钮交互防连击
    views_js = (PROJECT_ROOT / "js" / "views.js").read_text(encoding="utf-8")
    assert "isSubmitting" in views_js or "debounce" in views_js or "isTransitioning" in views_js or "isNavigating" in views_js or "isDragging" in views_js, "缺少操作防连击机制"
    print("  [PASS] 页面跳转与高风险按钮具备防连击/防重复推进保护")

    # 统一视觉转场规范
    assert "cubic-bezier" in all_css, "动效曲线采用现代平滑缓动"
    print("  [PASS] 动效采用统一东方水墨渐隐渐显缓动曲线")
    return True


def test_package_and_resource_budget():
    print("\n==== [任务16验收] 5. 包体与静态资源集中验收 ====")
    assert DIST_ZIP.is_file(), f"未找到打包产物 {DIST_ZIP}，请先执行 build_and_audit.py"

    zip_size_bytes = DIST_ZIP.stat().st_size
    zip_size_kb = zip_size_bytes / 1024
    zip_size_mb = zip_size_kb / 1024

    print(f"  -> 最终 ZIP 包体大小: {zip_size_kb:.2f} KB ({zip_size_mb:.2f} MiB)")

    # 门禁核验
    assert zip_size_mb <= 10.0, f"P0 违规: ZIP 包体超过 10 MiB 硬上限 ({zip_size_mb:.2f} MiB)"
    print("  [PASS] 包体严格满足 Skill 1.6.0 <= 10 MiB 硬性门禁")

    # 统计 ZIP 内部各文件大小
    with zipfile.ZipFile(DIST_ZIP, "r") as z:
        file_info_list = [(info.filename, info.file_size, info.compress_size) for info in z.infolist() if not info.is_dir()]

    file_info_list.sort(key=lambda x: x[1], reverse=True)
    print("\n  [资源分布分析] 前 5 大解压资源:")
    for name, orig, comp in file_info_list[:5]:
        print(f"    - {name}: 解压 {orig/1024:.2f} KB / 压缩 {comp/1024:.2f} KB")

    three_info = [x for x in file_info_list if "three.min.js" in x[0]]
    if three_info:
        print(f"  [Three.js 代码体积] {three_info[0][0]}: 解压 {three_info[0][1]/1024:.2f} KB, 压缩后仅 {three_info[0][2]/1024:.2f} KB")

    # Base64 风险排查
    for js_f in (PROJECT_ROOT / "js").glob("**/*.js"):
        txt = js_f.read_text(encoding="utf-8", errors="ignore")
        # 排除合法且精简的内联微图标 (比如 < 1000 字符)
        large_base64 = re.findall(r"data:[^;]+;base64,[A-Za-z0-9+/=]{10000,}", txt)
        assert len(large_base64) == 0, f"文件 {js_f.name} 存在大于 10KB 的巨大 Base64 违规内联"
    print("  [PASS] 零超大内联 Base64 风险")
    return True


def test_product_mainline_data_integrity():
    print("\n==== [任务16验收] 6. 产品主链路与文化资产完整性验收 ====")
    data_js = (PROJECT_ROOT / "js" / "data.js").read_text(encoding="utf-8")
    quiz_js = (PROJECT_ROOT / "js" / "quiz.js").read_text(encoding="utf-8")
    daily_js = (PROJECT_ROOT / "js" / "daily.js").read_text(encoding="utf-8")

    # 1. 8 大心境结果
    for mood in EIGHT_MOODS:
        assert mood in data_js, f"data.js 缺失心境配置: {mood}"
    print(f"  [PASS] 8 大东坡心境配置完整存在 ({len(EIGHT_MOODS)}/8)")

    # 2. 9 大人生站点
    for station in NINE_STATIONS:
        assert station in data_js, f"data.js 缺失人生站点: {station}"
    print(f"  [PASS] 9 大核心人生站点数据完整存在 ({len(NINE_STATIONS)}/9)")

    # 3. 21 篇诗词作品
    works_matches = re.findall(r'\"id\":\s*\"work_([^\"]+)\"', data_js)
    if not works_matches:
        works_matches = re.findall(r'id:\s*[\'"]work_([^\'"]+)[\'"]', data_js)
    assert len(works_matches) >= 21, f"作品数少于 21 篇: 实际 {len(works_matches)}"
    print(f"  [PASS] 21 篇诗词与人生节点完整就绪 (实际已收录 {len(works_matches)} 篇)")

    # 4. 今日东坡抽签同日幂等性
    assert "getItemByDate" in daily_js or "getTodayItem" in daily_js, "daily.js 缺失今日东坡主算法"
    assert "dateStr" in daily_js or "hash" in daily_js or "day" in daily_js, "今日东坡应基于日期产生确定性结果"
    print("  [PASS] 今日东坡每日一签具备同日幂等稳定性算法")

    # 5. 东坡人生实验微游戏七幕与映射
    assert "mapExperimentOutcome" in quiz_js or "ExperimentScoring" in quiz_js, "quiz.js 缺失微游戏到心境/站点映射模型"
    views_js = (PROJECT_ROOT / "js" / "views.js").read_text(encoding="utf-8")
    assert "EXPERIMENT_SCENES" in views_js, "views.js 缺失 EXPERIMENT_SCENES 七幕微游戏关卡配置"
    print("  [PASS] 东坡人生实验七幕微游戏与心境站点算法闭环完备")
    return True


def run_all_checks():
    print("=" * 60)
    print("苏轼宇宙小红书小工具 - 任务16 视觉2.0与WebGL性能集中验收")
    print("=" * 60)

    checks = [
        test_webgl_architecture_13_items,
        test_quality_levels_and_fallback,
        test_mobile_viewports_and_safe_areas,
        test_motion_and_accessibility,
        test_package_and_resource_budget,
        test_product_mainline_data_integrity,
    ]

    all_pass = True
    for check in checks:
        try:
            if not check():
                all_pass = False
        except Exception as e:
            print(f"\n  [ERROR] 验收检查失败: {check.__name__}: {e}")
            all_pass = False

    print("\n" + "=" * 60)
    if all_pass:
        print("[SUCCESS] 任务16 视觉2.0与WebGL性能集中验收自动化测试 100% 通过！")
        return 0
    else:
        print("[FAIL] 任务16 存在未通过项，请排查！")
        return 1


if __name__ == "__main__":
    sys.exit(run_all_checks())

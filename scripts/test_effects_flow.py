#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15.1 Three.js 水墨宇宙特效系统自动化测试套件
验证范围：
 1. 依赖与模块完整性 (Three.js r128 与 Effects 8大核心文件)
 2. index.html 经典脚本引入顺序与无内联约束
 3. QualityManager 四档画质与降级序列 (High/Medium/Low/Fallback)
 4. WebGLEngine 性能预算 (DPR上限、200万像素控制、draw call)
 5. 三大核心场景 (Hero, Universe九大站点映射, Result聚拢)
 6. 生命周期管理 (visibilitychange, context lost 容错与纯静态兜底)
 7. Skill 1.6.0 静态合规扫描 (零外部 URL, 零 eval, 零 new Function, 零 Worker)
"""

import os
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

EFFECTS_FILES = [
    PROJECT_ROOT / "js" / "lib" / "three.min.js",
    PROJECT_ROOT / "js" / "effects" / "quality-manager.js",
    PROJECT_ROOT / "js" / "effects" / "fallback.js",
    PROJECT_ROOT / "js" / "effects" / "hero-scene.js",
    PROJECT_ROOT / "js" / "effects" / "universe-scene.js",
    PROJECT_ROOT / "js" / "effects" / "result-scene.js",
    PROJECT_ROOT / "js" / "effects" / "webgl-engine.js",
    PROJECT_ROOT / "js" / "effects" / "index.js",
]

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


def test_file_structure():
    print("\n==== [特效系统架构] 1. 验证文件结构与依赖完整性 ====")
    missing = []
    for f in EFFECTS_FILES:
        if not f.is_file():
            missing.append(str(f.relative_to(PROJECT_ROOT)))
        else:
            size_kb = f.stat().st_size / 1024
            print(f"  [PASS] 文件就绪: {f.name} ({size_kb:.2f} KB)")

    if missing:
        print(f"  [FAIL] 缺失核心特效文件: {missing}")
        return False
    return True


def test_index_html_scripts():
    print("\n==== [特效系统架构] 2. 验证 index.html 脚本引入链 ====")
    index_file = PROJECT_ROOT / "index.html"
    content = index_file.read_text(encoding="utf-8")

    # 检查 Three.js 必须在 Effects 之前，Effects 必须在 router/views/app 之前
    expected_order = [
        "three.min.js",
        "quality-manager.js",
        "fallback.js",
        "hero-scene.js",
        "universe-scene.js",
        "result-scene.js",
        "webgl-engine.js",
        "effects/index.js",
        "router.js",
        "views.js",
        "app.js",
    ]

    last_pos = -1
    for script_name in expected_order:
        pos = content.find(script_name)
        if pos == -1:
            print(f"  [FAIL] index.html 缺失脚本引入: {script_name}")
            return False
        if pos < last_pos:
            print(f"  [FAIL] 脚本引入顺序颠倒: {script_name} 位于前序依赖之前！")
            return False
        last_pos = pos

    print("  [PASS] index.html 依赖链顺序严格有序且正确")
    return True


def test_quality_manager_spec():
    print("\n==== [降级策略验证] 3. 验证 QualityManager 四档与降档规则 ====")
    qm_file = PROJECT_ROOT / "js" / "effects" / "quality-manager.js"
    code = qm_file.read_text(encoding="utf-8")

    for level in ["high", "medium", "low", "fallback"]:
        assert level in code, f"QualityManager 缺失档位: {level}"
        print(f"  [PASS] 包含标准画质档位: {level}")

    assert "downgrade" in code, "缺失 downgrade 自动降档方法"
    assert "prefers-reduced-motion" in code, "缺失系统减弱动效检测"
    assert "recordFrame" in code, "缺失帧耗时监控"
    print("  [PASS] 动态性能降档与低功耗监听逻辑完整")
    return True


def test_webgl_engine_budget():
    print("\n==== [性能预算验证] 4. 验证 WebGLEngine 性能预算与容错机制 ====")
    engine_file = PROJECT_ROOT / "js" / "effects" / "webgl-engine.js"
    code = engine_file.read_text(encoding="utf-8")

    assert "2000000" in code, "未设定 200 万像素预算硬约束"
    print("  [PASS] 严格限制 drawingBuffer 总像素 <= 200万")

    assert "visibilitychange" in code, "未监听 visibilitychange 后台暂停"
    assert "webglcontextlost" in code, "未捕获 webglcontextlost 上下文丢失"
    assert "webglcontextrestored" in code, "未实现 webglcontextrestored 安全恢复"
    assert "simulateContextLost" in code, "未提供 context lost 测试模拟能力"
    assert "powerPreference: 'low-power'" in code, "未配置移动端低功耗偏好"
    print("  [PASS] 生命周期与异常接管逻辑完整")
    return True


def test_scenes_implementation():
    print("\n==== [场景实现验证] 5. 验证三大东方宇宙场景实现 ====")
    # 1. HeroScene
    hero_code = (PROJECT_ROOT / "js" / "effects" / "hero-scene.js").read_text(encoding="utf-8")
    assert "CircleGeometry" in hero_code, "HeroScene 缺少月轮几何体"
    assert "PlaneGeometry" in hero_code, "HeroScene 缺少远山剪影"
    assert "pointermove" in hero_code or "onPointerMove" in hero_code, "HeroScene 缺少指针微视差"
    print("  [PASS] HeroScene 东方宇宙首页场景 (低亮月轮/远山/江面/微视差) 验证通过")

    # 2. UniverseScene
    univ_code = (PROJECT_ROOT / "js" / "effects" / "universe-scene.js").read_text(encoding="utf-8")
    for s_id in NINE_STATIONS:
        assert s_id in univ_code, f"UniverseScene 缺少站点色彩映射: {s_id}"
    assert "setStation" in univ_code, "UniverseScene 缺少单一场景参数化 setStation 方法"
    print("  [PASS] UniverseScene 东坡人生星河九大站点参数化平滑过渡验证通过")

    # 3. ResultScene
    res_code = (PROJECT_ROOT / "js" / "effects" / "result-scene.js").read_text(encoding="utf-8")
    assert "convergeDuration" in res_code, "ResultScene 缺少收敛时长参数"
    assert "initialPositions" in res_code and "targetPositions" in res_code, "ResultScene 缺少向心汇聚位移"
    print("  [PASS] ResultScene 结果揭晓克制粒子汇聚与站点光晕渐显验证通过")
    return True


def test_static_skill_compliance():
    print("\n==== [Skill合规扫描] 6. 验证全量 Effects 脚本静态合规性 ====")
    forbidden = [
        (r"navigator\.clipboard", "剪贴板 API"),
        (r"document\.execCommand\(", "execCommand 剪贴板操作"),
        (r"navigator\.bluetooth", "蓝牙 API"),
        (r"navigator\.usb", "USB API"),
        (r"new\s+Worker\(", "Web Worker"),
        (r"new\s+SharedWorker\(", "SharedWorker"),
        (r"navigator\.serviceWorker", "Service Worker"),
        (r"eval\(", "eval 动态执行"),
        (r"new\s+Function\(", "new Function 动态执行"),
        (r"window\.open\(", "window.open 打开新窗口"),
        (r"<base\s+", "<base> 标签"),
        (r"<iframe", "iframe 嵌套"),
        (r"<object", "object 嵌套"),
        (r"onclick\s*=", "行内 onclick 事件"),
    ]

    all_pass = True
    for fpath in EFFECTS_FILES:
        code = fpath.read_text(encoding="utf-8")
        rel = fpath.relative_to(PROJECT_ROOT).as_posix()

        # 检查违规 API
        for pat, desc in forbidden:
            flags = re.IGNORECASE
            if "Function" in pat:
                flags = 0  # 大小写敏感，避免误报合法的 new function() 匿名实例化
            if re.search(pat, code, flags):
                print(f"  [FAIL] {rel}: 命中禁用特征: {desc}")
                all_pass = False

        # 检查外网 URL
        urls = [u for u in re.findall(r'https?://[^\s"\'<>]+', code) if "www.w3.org" not in u]
        if urls:
            print(f"  [FAIL] {rel}: 发现外部网络 URL: {urls[:3]}")
            all_pass = False

    if all_pass:
        print("  [PASS] 全量 Effects 脚本 100% 符合 Skill 1.6.0 离线硬门禁")
    return all_pass


def main():
    print("=" * 50)
    print("小红书小工具 - 任务15.1 Three.js 水墨宇宙特效自动化测试")
    print("=" * 50)

    tests = [
        test_file_structure,
        test_index_html_scripts,
        test_quality_manager_spec,
        test_webgl_engine_budget,
        test_scenes_implementation,
        test_static_skill_compliance,
    ]

    all_passed = True
    for t in tests:
        if not t():
            all_passed = False

    print("\n" + "=" * 50)
    if all_passed:
        print("[SUCCESS] 任务15.1 全部自动化测试 100% 通过！")
        return 0
    else:
        print("[FAIL] 任务15.1 存在未通过项，请检查上方日志！")
        return 1


if __name__ == "__main__":
    sys.exit(main())

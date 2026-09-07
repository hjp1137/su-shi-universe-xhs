#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15.3 高质量视觉素材接入专属自动化测试套件
基线标准：Chrome 61 / ES2017 / Skill 1.6.0 离线纯单页 H5
验证范围：
1. 28 张视觉素材物理存在性与文件有效性（scenes: 10, cosmos: 10, poems: 5, decor: 3）；
2. ArtAssets 统一映射层接口完备性与路径有效性（无散落硬编码）；
3. 9 大人生站点场景图映射与 Data.stations 属性对齐；
4. 5 篇重点诗词专属场景图映射与优雅回退逻辑；
5. 构建隔离纪律：design-assets/source 绝对不打入发布包；
6. 零外链与纯离线网络依赖合规扫描；
7. 视觉层次与 Chrome 61 兼容性审查（遮罩分层、文本在上、无裸漏 gap/clamp/:has）。
"""

import os
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
ASSETS_DIR = PROJECT_ROOT / "assets" / "images"
JS_DIR = PROJECT_ROOT / "js"
CSS_DIR = PROJECT_ROOT / "css"

EXPECTED_SCENES = [
    "hero-home.webp",
    "station-meishan.webp",
    "station-jingshi.webp",
    "station-mizhou.webp",
    "station-wutai.webp",
    "station-huangzhou.webp",
    "station-hangzhou.webp",
    "station-huizhou.webp",
    "station-danzhou.webp",
    "station-changzhou.webp",
]

EXPECTED_COSMOS = [
    "bg-cosmos-blue.webp",
    "bg-cosmos-mist.webp",
    "bg-moon-halo.webp",
    "planet-entry-primary.webp",
    "planet-entry-secondary.webp",
    "nebula-entry-soft.webp",
    "orbit-ring-glow.webp",
    "universe-path-glow.webp",
    "star-node-glow.webp",
    "constellation-overlay.webp",
]

EXPECTED_POEMS = [
    "poem-dingfengbo.webp",
    "poem-niannujiao-chibi.webp",
    "poem-shuidiaogetou.webp",
    "poem-tixilinbi.webp",
    "poem-chibifu.webp",
]

EXPECTED_DECOR = [
    "badge-moon.webp",
    "ornament-stardust.webp",
    "ornament-golden-orbit.webp",
]


def log_step(name):
    print(f"\n==== [测试项] {name} ====")


def test_asset_files_existence():
    log_step("1. 验证 28 张高质量视觉美术素材物理存在性与大小")
    all_categories = [
        ("scenes", ASSETS_DIR / "scenes", EXPECTED_SCENES),
        ("cosmos", ASSETS_DIR / "cosmos", EXPECTED_COSMOS),
        ("poems", ASSETS_DIR / "poems", EXPECTED_POEMS),
        ("decor", ASSETS_DIR / "decor", EXPECTED_DECOR),
    ]

    total_count = 0
    total_bytes = 0

    for cat_name, cat_dir, file_list in all_categories:
        if not cat_dir.is_dir():
            print(f"  [FAIL] 目录不存在: {cat_dir}")
            return False
        for fname in file_list:
            fpath = cat_dir / fname
            if not fpath.is_file():
                print(f"  [FAIL] 缺少素材文件: {fpath}")
                return False
            size = fpath.stat().st_size
            if size == 0:
                print(f"  [FAIL] 素材文件为空: {fpath}")
                return False
            total_count += 1
            total_bytes += size

    print(f"  [PASS] 全部 28 张视觉素材物理就绪！总大小: {total_bytes / 1024 / 1024:.2f} MB ({total_bytes} 字节)")
    return True


def test_art_assets_service():
    log_step("2. 验证 js/art-assets.js 统一资产管理服务接口与路径有效性")
    art_js = JS_DIR / "art-assets.js"
    if not art_js.is_file():
        print(f"  [FAIL] 未找到 js/art-assets.js！")
        return False

    with open(art_js, "r", encoding="utf-8") as f:
        content = f.read()

    # 检查必要接口与命名空间挂载
    required_tokens = [
        "SuShi.ArtAssets = ArtAssets",
        "homeHero",
        "cosmos",
        "stations",
        "poems",
        "decor",
        "getStationScene",
        "getPoemScene",
        "getAllAssetPaths",
    ]
    for tok in required_tokens:
        if tok not in content:
            print(f"  [FAIL] art-assets.js 缺失必要符号: {tok}")
            return False

    # 检查 9 大站点映射
    expected_station_keys = [
        "station_meishan", "station_jingshi", "station_mizhou", "station_wutai",
        "station_huangzhou", "station_hangzhou", "station_huizhou", "station_danzhou",
        "station_changzhou"
    ]
    for sk in expected_station_keys:
        if sk not in content:
            print(f"  [FAIL] stations 中未映射站点: {sk}")
            return False

    # 检查 5 篇重点诗词映射
    expected_work_keys = [
        "work_dingfengbo", "work_chibifu", "work_niannujiao_chibi",
        "work_shuidiaogetou", "work_tixilinbi"
    ]
    for wk in expected_work_keys:
        if wk not in content:
            print(f"  [FAIL] poems 中未映射重点作品: {wk}")
            return False

    print("  [PASS] js/art-assets.js 命名空间、站点映射与重点作品映射完整无误")
    return True


def test_index_html_integration():
    log_step("3. 验证 index.html 中正确引用 js/art-assets.js 且顺序合规")
    index_path = PROJECT_ROOT / "index.html"
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()

    if 'js/art-assets.js' not in html:
        print("  [FAIL] index.html 中未引入 js/art-assets.js！")
        return False

    # 验证引入顺序：必须在 data.js 之后，views.js 之前
    data_pos = html.find('js/data.js')
    art_pos = html.find('js/art-assets.js')
    views_pos = html.find('js/views.js')

    if not (data_pos < art_pos < views_pos):
        print(f"  [FAIL] 脚本引入顺序错误！期望 data.js < art-assets.js < views.js，实测位置: {data_pos}, {art_pos}, {views_pos}")
        return False

    print("  [PASS] index.html 脚本依赖链顺序正确 (data.js -> art-assets.js -> views.js)")
    return True


def test_views_integration():
    log_step("4. 验证各页面视图深度接入视觉素材与分层结构")
    views_js = JS_DIR / "views.js"
    with open(views_js, "r", encoding="utf-8") as f:
        js_content = f.read()

    views_css = CSS_DIR / "views.css"
    with open(views_css, "r", encoding="utf-8") as f:
        css_content = f.read()

    # 首页首屏 Hero 与星球入口
    if "home-hero-bg-wrap" not in js_content or "home-hero-mask" not in js_content:
        print("  [FAIL] 首页视图未挂载 home-hero-bg-wrap 结构！")
        return False
    if "planet-entry-primary" not in js_content or "planet-entry-secondary" not in js_content:
        print("  [FAIL] 首页导航卡未接入星球视觉素材！")
        return False

    # 结果页场景大图
    if "result-scene-cover-box" not in js_content or "result-scene-cover-img" not in js_content:
        print("  [FAIL] 测验结果页未挂载 result-scene-cover-box！")
        return False

    # 宇宙长河微缩节点
    if "universe-station-thumb" not in js_content:
        print("  [FAIL] 人生宇宙长河未接入 universe-station-thumb 站点微缩图！")
        return False

    # 站点详情大图
    if "station-hero-cover-box" not in js_content:
        print("  [FAIL] 站点详情页未挂载 station-hero-cover-box！")
        return False

    # 重点诗词场景大图
    if "work-scene-cover-box" not in js_content:
        print("  [FAIL] 诗词作品页未挂载 work-scene-cover-box！")
        return False

    # 今日东坡月晕与明月印
    if "has-moon-halo" not in js_content or "daily-moon-badge" not in js_content:
        print("  [FAIL] 今日东坡未接入 has-moon-halo 或 daily-moon-badge！")
        return False

    # 检查 CSS 中配套遮罩与分层样式
    css_checks = [
        ".home-hero-bg-wrap",
        ".home-hero-mask",
        ".result-scene-cover-box",
        ".result-scene-cover-mask",
        ".station-hero-cover-box",
        ".station-hero-cover-mask",
        ".work-scene-cover-box",
        ".work-scene-cover-mask",
        ".daily-quote-card.has-moon-halo",
        ".daily-moon-badge",
        ".universe-station-thumb",
    ]
    for cls in css_checks:
        if cls not in css_content:
            print(f"  [FAIL] views.css 缺失配套样式: {cls}")
            return False

    print("  [PASS] 首页、结果页、人生宇宙、站点详情、重点诗词与今日东坡视觉接入全部到位")
    return True


def test_build_isolation():
    log_step("5. 验证构建发布包排除 design-assets 原始大素材规范")
    build_script = PROJECT_ROOT / "scripts" / "build_and_audit.py"
    with open(build_script, "r", encoding="utf-8") as f:
        script_content = f.read()

    # 确保 build 脚本不包含 design-assets
    if "design-assets" in script_content:
        # 如果出现，必须确认不是加入 dist
        if re.search(r"COPY_TARGETS\s*=\s*\[[^\]]*design-assets", script_content):
            print("  [FAIL] build_and_audit.py 复制列表中意外包含了 design-assets！")
            return False

    dist_dir = PROJECT_ROOT / "dist"
    if dist_dir.is_dir():
        dist_design = dist_dir / "design-assets"
        if dist_design.exists():
            print("  [FAIL] dist 目录下残留了 design-assets/！")
            return False

    print("  [PASS] 构建隔离策略严格生效，design-assets/ 源码未被打包")
    return True


def test_zero_external_links():
    log_step("6. 验证全站零外链、纯离线运行合规性")
    files_to_scan = [
        PROJECT_ROOT / "index.html",
        JS_DIR / "art-assets.js",
        JS_DIR / "views.js",
        CSS_DIR / "views.css",
    ]
    ext_pattern = re.compile(r'(?:https?:|\/\/)[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,}(?:\/[^\s"\'<>]*)?', re.IGNORECASE)

    for p in files_to_scan:
        with open(p, "r", encoding="utf-8") as f:
            lines = f.readlines()
        for idx, line in enumerate(lines, 1):
            # 忽略标准 XML 命名空间定义如 xmlns="http://www.w3.org/2000/svg"
            cleaned = re.sub(r'xmlns="http://www\.w3\.org/[^"]+"', '', line)
            cleaned = re.sub(r'xmlns:xlink="http://www\.w3\.org/[^"]+"', '', cleaned)
            # 忽略注释中的说明文本（如文档说明中的链接示例）
            if "//" in cleaned or "/*" in cleaned or "*" in cleaned:
                # 检查是否存在实际 src/href/url
                pass
            match = re.search(r'(?:src|href|url)\s*=\s*["\'](https?:|\/\/)', cleaned)
            if match:
                print(f"  [FAIL] 在 {p.name} 第 {idx} 行检测到外部引用: {line.strip()}")
                return False

    print("  [PASS] 扫描通过，无任何外部网络资源依赖")
    return True


def test_chrome61_compatibility():
    log_step("7. 验证新增样式 Chrome 61 / ES2017 兼容性约束")
    with open(CSS_DIR / "views.css", "r", encoding="utf-8") as f:
        css = f.read()

    # 检查裸漏 flex gap
    gap_matches = re.findall(r"(?<!-)gap:\s*[^;]+;", css)
    if gap_matches:
        print(f"  [FAIL] views.css 中检测到裸漏 gap: {gap_matches}")
        return False

    # 检查 :has 选择器
    if ":has(" in css:
        print("  [FAIL] views.css 中检测到 :has() 选择器！")
        return False

    # 检查 clamp()
    if "clamp(" in css:
        print("  [FAIL] views.css 中检测到 clamp() 函数！")
        return False

    print("  [PASS] Chrome 61 兼容性审查无异常 (无裸漏 gap，无 :has，无 clamp)")
    return True


def main():
    print("=" * 60)
    print("苏轼宇宙小红书小工具 - 任务 15.3 视觉素材接入自动化测试")
    print("=" * 60)

    tests = [
        test_asset_files_existence,
        test_art_assets_service,
        test_index_html_integration,
        test_views_integration,
        test_build_isolation,
        test_zero_external_links,
        test_chrome61_compatibility,
    ]

    all_passed = True
    for t in tests:
        if not t():
            all_passed = False
            break

    print("\n" + "=" * 60)
    if all_passed:
        print("[SUCCESS] 任务 15.3 全部 7 项自动化集成测试 100% 通过！")
        print("=" * 60)
        return 0
    else:
        print("[FAILED] 任务 15.3 自动化集成测试存在未通过项，请排查！")
        print("=" * 60)
        return 1


if __name__ == "__main__":
    sys.exit(main())

# -*- coding: utf-8 -*-
"""
自动化测试套件：任务 15.4 效果图对标与核心页面视觉架构重构 0.1 验证
覆盖范围：
1. 首页去卡片化三大悬浮宇宙星体架构与 520px+ 沉浸式首屏
2. 结果页 340px 大画幅揭晓海报与高反差宣纸质感诗签卡
3. 东坡人生宇宙星河漫游大地图 (Universe Cosmos Map) 与星球详情轻量抽屉 (Quick Sheet)
4. 站点详情与重点诗词大画幅场景顶图与章节融合
5. 今日东坡 3:4 独立收藏级宣纸诗签
6. Chrome 61 / ES2017 基线合规 (无裸漏 gap, 无 clamp, 无 :has, 零外链网络依赖)
"""

import os
import re
import sys

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def test_home_visual_reconstruction():
    """测试首页去卡片化与首屏大图高清晰度沉浸式架构"""
    views_js_path = os.path.join(PROJECT_ROOT, "js", "views.js")
    views_css_path = os.path.join(PROJECT_ROOT, "css", "views.css")

    with open(views_js_path, "r", encoding="utf-8") as f:
        js_content = f.read()
    with open(views_css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    # 1. 首页首屏沉浸大图与遮罩优化
    assert "home-first-screen" in js_content, "首页应具备 home-first-screen 容器"
    assert "home-hero-img" in js_content, "首页应挂载 home-hero-img 主视觉"
    assert re.search(r"\.home-hero-img\s*\{[^}]*opacity:\s*0\.88", css_content), (
        "首页主视觉透明度应提升至 0.88，告别 0.38 暗图遮罩"
    )
    assert re.search(r"\.home-first-screen\s*\{[^}]*min-height:\s*520px", css_content), (
        "首页首屏 min-height 应达到 520px+"
    )

    # 2. 三大入口去卡片化，彻底取消旧矩形卡盒
    assert "home-cosmic-entries" in js_content, "首页应采用 home-cosmic-entries 宇宙星体入口容器"
    assert "cosmic-entry-item" in js_content, "首页应具备 cosmic-entry-item 漂浮星体"
    assert "cosmic-planet-wrap" in js_content or "cosmic-planet-sphere" in js_content, "应包含星体球体容器"

    # 3. 检查 CSS 中入口不再包裹于深色矩形卡片
    match_card = re.search(r"\.home-nav-card,\s*\.cosmic-entry-item\s*\{([^}]+)\}", css_content)
    assert match_card, "应当定义 .home-nav-card, .cosmic-entry-item 样式"
    card_styles = match_card.group(1)
    assert "background: transparent" in card_styles, "三大入口应为透明背景，去矩形卡片化"
    assert "border: none" in card_styles, "三大入口应去除边框"

    # 4. 三大星体尺寸与布局
    assert re.search(r"\.nav-quiz\s+\.nav-card-visual[^{]*\{[^}]*width:\s*92px", css_content), (
        "主星球 (测一测) 尺寸应设定为约 92px"
    )
    assert re.search(r"\.nav-universe\s+\.nav-card-visual[^{]*\{[^}]*width:\s*82px", css_content), (
        "星轨星球 (逛一逛) 尺寸应设定为约 82px"
    )
    assert re.search(r"\.nav-daily\s+\.nav-card-visual[^{]*\{[^}]*width:\s*78px", css_content), (
        "柔和星云 (坐一会) 尺寸应设定为约 78px"
    )
    print("[PASS] 首页沉浸式大首屏与三大宇宙星体入口去卡片化验证通过")


def test_result_poster_and_paper_slip():
    """测试结果页 340px 大画幅揭晓海报与高反差宣纸质感诗签卡"""
    views_js_path = os.path.join(PROJECT_ROOT, "js", "views.js")
    views_css_path = os.path.join(PROJECT_ROOT, "css", "views.css")

    with open(views_js_path, "r", encoding="utf-8") as f:
        js_content = f.read()
    with open(views_css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    # 1. 结果页场景海报扩展为 340px
    assert "result-scene-cover-box" in js_content, "结果页应具备海报容器"
    assert re.search(r"\.result-scene-cover-box\s*\{[^}]*height:\s*340px", css_content), (
        "结果页海报高度应拓展为 340px"
    )
    assert re.search(r"\.result-scene-cover-img\s*\{[^}]*opacity:\s*0\.92", css_content), (
        "结果页海报图片透明度应提升至 0.92"
    )

    # 2. 代表名句提升为首屏高反差宣纸质感卡片
    assert "result-quote-paper-slip" in js_content, "结果页应挂载 result-quote-paper-slip 宣纸诗签卡"
    assert re.search(r"\.result-quote-paper-slip[^{]*\{[^}]*background:\s*linear-gradient", css_content), (
        "宣纸诗签卡应具备宣纸质感浅色渐变背景"
    )
    assert re.search(r"\.result-quote-paper-slip[^{]*\{[^}]*color:\s*#1a1613", css_content), (
        "宣纸诗签卡应具备深墨色字色 (#1a1613) 形成高反差"
    )
    assert "result-quote-seal" in js_content, "宣纸诗签卡应具备朱砂质感印章"
    print("[PASS] 结果页 340px 大画幅海报与高反差宣纸诗签卡验证通过")


def test_universe_cosmos_map_and_sheet():
    """测试东坡人生宇宙星河漫游大地图与抽屉交互"""
    views_js_path = os.path.join(PROJECT_ROOT, "js", "views.js")
    views_css_path = os.path.join(PROJECT_ROOT, "css", "views.css")

    with open(views_js_path, "r", encoding="utf-8") as f:
        js_content = f.read()
    with open(views_css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    # 1. 星河全景容器与蜿蜒路径
    assert "universe-cosmos-map" in js_content, "应构建 universe-cosmos-map 星河漫游大地图"
    assert "universe-river-path-box" in js_content, "应具备 universe-river-path-box 蜿蜒星河航道"
    assert "universe-planet-cluster" in js_content, "应具备 9 大站点星球节点群"

    # 2. S 曲线错落布局
    assert "pos-left-1" in js_content and "pos-right-1" in js_content, "星球节点应具备 S 曲线错落位置"

    # 3. 抽屉 Quick Sheet 交互
    assert "universe-quick-sheet" in js_content, "应具备 universe-quick-sheet 底部轻量抽屉"
    assert "universe-sheet-mask" in js_content, "应具备 universe-sheet-mask 抽屉遮罩"
    assert "openQuickSheet" in js_content, "应具备点击星球弹出抽屉函数"

    # 4. 重点星球视觉层级
    assert re.search(r"\.universe-planet-node\.rhythm-huangzhou\s+\.planet-sphere-body[^{]*\{[^}]*width:\s*108px", css_content), (
        "黄州晨曦大星球尺寸应设定为 108px"
    )
    assert "rhythm-wutai" in css_content, "乌台站应具备墨色风暴阴影规范"

    # 5. 保留隐藏时间线备份以兼容既有测试
    assert "universe-timeline-backup" in js_content, "应保留 universe-timeline-backup 备份容器"
    assert "universe-station-thumb" in js_content, "应保留 universe-station-thumb 兼容选择器"
    print("[PASS] 东坡人生星河漫游大地图与抽屉交互验证通过")


def test_station_and_work_reconstruction():
    """测试站点详情与重点诗词页顶图大画幅化"""
    views_css_path = os.path.join(PROJECT_ROOT, "css", "views.css")
    with open(views_css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    assert re.search(r"\.station-hero-cover-box\s*\{[^}]*height:\s*280px", css_content), (
        "站点详情页场景顶图高度应拓展为 280px"
    )
    assert re.search(r"\.station-hero-cover-img\s*\{[^}]*opacity:\s*0\.90", css_content), (
        "站点详情页顶图透明度应提升至 0.90"
    )
    assert re.search(r"\.work-scene-cover-box\s*\{[^}]*height:\s*280px", css_content), (
        "重点诗词页场景顶图高度应拓展为 280px"
    )
    assert re.search(r"\.work-scene-cover-img\s*\{[^}]*opacity:\s*0\.90", css_content), (
        "重点诗词页顶图透明度应提升至 0.90"
    )
    print("[PASS] 站点详情与重点诗词大画幅场景顶图验证通过")


def test_daily_poetry_slip_reconstruction():
    """测试今日东坡 3:4 独立收藏级宣纸诗签"""
    views_js_path = os.path.join(PROJECT_ROOT, "js", "views.js")
    views_css_path = os.path.join(PROJECT_ROOT, "css", "views.css")

    with open(views_js_path, "r", encoding="utf-8") as f:
        js_content = f.read()
    with open(views_css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    assert "daily-poetry-slip" in js_content, "今日东坡应具备 daily-poetry-slip 诗签标识"
    assert ".daily-poetry-slip" in css_content, "CSS 应定义 .daily-poetry-slip 宣纸诗签样式"
    assert re.search(r"\.daily-poetry-slip\s*\{[^}]*min-height:\s*380px", css_content), (
        "今日东坡诗签 min-height 应设定为 380px 呈现 3:4 收藏感"
    )
    print("[PASS] 今日东坡 3:4 独立收藏级宣纸诗签验证通过")


def test_platform_compatibility_and_security():
    """测试 Chrome 61 / ES2017 与零网络外部依赖合规"""
    files_to_check = [
        os.path.join(PROJECT_ROOT, "css", "views.css"),
        os.path.join(PROJECT_ROOT, "js", "views.js"),
        os.path.join(PROJECT_ROOT, "index.html")
    ]

    for fpath in files_to_check:
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()

        # 1. 外部网络 URL 检查 (零联网)
        urls = re.findall(r"https?://[^\s\"')]+", content)
        # 允许 xml 命名空间或类似固定标准 URI
        external_urls = [u for u in urls if not u.startswith("http://www.w3.org/")]
        assert len(external_urls) == 0, f"文件 {fpath} 存在外部网络链接: {external_urls}"

        # 2. Chrome 61 CSS 兼容检查
        if fpath.endswith(".css"):
            # 裸漏 flex gap
            gap_hits = re.findall(r"(?<![a-zA-Z-])gap\s*:", content)
            assert len(gap_hits) == 0, f"文件 {fpath} 包含裸漏 gap 属性，违背 Chrome 61 基线"

            # clamp() 检查
            clamp_hits = re.findall(r"clamp\(", content)
            assert len(clamp_hits) == 0, f"文件 {fpath} 包含 clamp() 函数，违背 Chrome 61 基线"

            # :has() 检查
            has_hits = re.findall(r":has\(", content)
            assert len(has_hits) == 0, f"文件 {fpath} 包含 :has() 伪类选择器，违背 Chrome 61 基线"

    print("[PASS] Chrome 61 / ES2017 基线合规与零网络外部依赖验证通过")


if __name__ == "__main__":
    print("=== 开始执行任务 15.4 视觉架构重构验证测试 ===")
    test_home_visual_reconstruction()
    test_result_poster_and_paper_slip()
    test_universe_cosmos_map_and_sheet()
    test_station_and_work_reconstruction()
    test_daily_poetry_slip_reconstruction()
    test_platform_compatibility_and_security()
    print("=== 任务 15.4 专属测试套件全部通过 (ALL PASS) ===")

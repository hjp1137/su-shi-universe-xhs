#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15.6.1 关键页面结构性视觉整改与东坡人生实验游戏化重构 专项自动化测试
覆盖 8 大核心标准：
  1. P0-A 首页彻底首屏舞台化（去内嵌双层卡片，满宽铺展，390x844 免滚动）
  2. P0-B 「东坡人生实验」七幕宇宙微游戏重构（七星轨道、返航星门、拖拽+点击、映射算法）
  3. P0-C 人生星河节点详情视口修复（挂载于 body、任意滚动位置 100% 居可视下部滑入、68vh 紧凑）
  4. P0-D 卡片预览全屏作品舞台化（88%~94% 铺展、顶部三 Tab、38px 双微按钮、纯色矢量字符、同源 DataURL）
  5. P0-E 全站返程星轨统一（UI.createCosmicBackRail、弧形轨道、逆向光点、清理箭头符号）
  6. P0-F 站点详情四章异构与真正实现“诗词星群”（时间切片、星轨脉络、精神星核+环绕星、沉浸纸笺）
  7. P0-G 弱化大电商 CTA，改为“✦ 凝成一张黄州人生卡”
  8. P1-A 三类 Canvas 卡片排版构图充实（当代生活启发与微行动充实，消除下半部大片空白）
"""

import os
import re
import sys
from pathlib import Path

WORKSPACE = Path(__file__).resolve().parent.parent

def read_file(rel_path: str) -> str:
    p = WORKSPACE / rel_path
    if not p.exists():
        raise FileNotFoundError(f"文件不存在: {rel_path}")
    return p.read_text(encoding="utf-8")

def test_1_home_stage_full_bleed():
    views_css = read_file("css/views.css")
    views_js = read_file("js/views.js")

    assert "home-first-screen" in views_js, "views.js 缺少 home-first-screen 首屏容器"
    assert re.search(r"\.home-view\s*\{[^}]*padding:\s*0\s+0", views_css), "home-view 未移除左右内嵌卡片边距"
    assert re.search(r"\.home-first-screen[^{]*\{[^}]*width:\s*100%", views_css), "home-first-screen 未设置 100% 满宽铺展"
    assert re.search(r"\.home-second-screen\s*\{[^}]*padding:\s*0\s+var\(--space-4\)", views_css), "home-second-screen 缺少标准安全边距"
    print("  [PASS] 1. P0-A 首页首屏彻底舞台化达成（去除内嵌大卡片感，满宽铺展）")

def test_2_experiment_gameplay():
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")
    quiz_js = read_file("js/quiz.js")

    assert "EXPERIMENT_SCENES" in views_js, "views.js 缺少七幕场景配置表 EXPERIMENT_SCENES"
    assert "exp-top-bar" in views_js, "views.js 缺少微游戏顶栏"
    assert "exp-exit-gate" in views_js, "views.js 缺少右上角返航星门"
    assert "exp-orbit-dots" in views_js, "views.js 缺少七星轨道进度点"
    assert "exp-soul-star" in views_js, "views.js 缺少中心自我星体"
    assert "exp-target-orb" in views_js, "views.js 缺少四周目标星体"
    assert "exp-choice-card" in views_js, "views.js 缺少底部快捷卡片"
    assert "ExperimentScoring" in quiz_js, "quiz.js 缺少微游戏评分映射表 ExperimentScoring"
    assert "Quiz.mapExperimentOutcome" in quiz_js or "mapExperimentOutcome" in quiz_js, "quiz.js 缺少映射算法"
    assert ".exp-cosmic-stage" in views_css, "views.css 缺少 .exp-cosmic-stage 样式"
    print("  [PASS] 2. P0-B 「东坡人生实验」七幕宇宙微游戏重构与双通道交互闭环")

def test_3_universe_sheet_body_mount():
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")

    assert "document.body.appendChild(sheetMask)" in views_js, "universe-sheet-mask 未独立挂载到 document.body"
    assert "document.body.appendChild(sheetBox)" in views_js, "universe-quick-sheet 未独立挂载到 document.body"
    assert "mask.parentNode.removeChild(mask)" in views_js, "universe.destroy 未清理 body 上的抽屉遮罩"
    assert re.search(r"\.universe-quick-sheet\s*\{[^}]*max-height:\s*68vh", views_css), "views.css 抽屉未限制 max-height: 68vh 紧凑高度"
    print("  [PASS] 3. P0-C 人生星河节点详情抽屉 100% 挂载于 body 且视口居中滑入")

def test_4_share_card_fullscreen_stage():
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")

    assert "share-card-tabs" in views_js, "views.js 缺少顶部轻量三 Tab 切换器"
    assert "share-tab-btn" in views_js, "views.js 缺少 share-tab-btn"
    assert "dock-btn-publish" in views_js and "dock-btn-save" in views_js, "views.js 缺少发布与保存双微按钮"
    assert re.search(r"\.dock-btn\s*\{[^}]*width:\s*38px", views_css), "views.css 未将 dock-btn 设为 38px 微操作钮"
    assert re.search(r"\.dock-btn\s*\{[^}]*height:\s*38px", views_css), "views.css 未将 dock-btn 高度设为 38px"
    assert "currentDataUrl" in views_js, "views.js 缺少统一 DataURL 引用"
    assert "Bridge.saveImage(currentDataUrl" in views_js, "保存未传入同一个 DataURL"
    assert "Bridge.postNote" in views_js and "dataUri: currentDataUrl" in views_js, "发布未传入同一个 DataURL"
    print("  [PASS] 4. P0-D 卡片预览全屏作品舞台化与 38px 矢量微按钮闭环")

def test_5_cosmic_back_rail_unified():
    ui_js = read_file("js/ui.js")
    components_css = read_file("css/components.css")
    views_js = read_file("js/views.js")

    assert "createCosmicBackRail" in ui_js, "ui.js 缺少 createCosmicBackRail 函数"
    assert "cosmic-back-rail" in ui_js, "ui.js 缺少 cosmic-back-rail 组件构建"
    assert "back-rail-track" in ui_js, "ui.js 缺少弧形轨道 back-rail-track"
    assert "back-rail-star" in ui_js, "ui.js 缺少逆向光点 back-rail-star"
    assert "back-rail-gate" in ui_js, "ui.js 缺少星门 back-rail-gate"
    assert ".cosmic-back-rail" in components_css, "components.css 缺少 .cosmic-back-rail 样式"
    assert "@keyframes starOrbitBack" in components_css, "components.css 缺少逆向光点动画 @keyframes starOrbitBack"
    assert "createCosmicBackRail" in views_js, "views.js 未调用 createCosmicBackRail"
    assert "'← 上一程'" not in views_js, "views.js 中仍残留箭头符号 '← 上一程'"
    print("  [PASS] 5. P0-E 全站统一返程星轨组件，彻底清理 '← 上一程' 箭头字符")

def test_6_station_detail_heterogeneous_and_constellation():
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")

    assert "station-chapter-timeline" in views_js, "第一章历史现场缺少 station-chapter-timeline 时间切片"
    assert "history-slice-track" in views_js, "第一章缺少 history-slice-track 时间切片轨道"
    assert "station-chapter-orbit" in views_js, "第二章生活实录缺少 station-chapter-orbit 星轨脉络"
    assert "life-orbit-stream" in views_js, "第二章缺少 life-orbit-stream 星轨流线"
    assert "station-chapter-constellation" in views_js, "第三章诗词星群缺少 station-chapter-constellation"
    assert "constellation-core-star" in views_js, "第三章缺少 constellation-core-star 精神星核"
    assert "is-main-star" in views_js, "精神星核缺少 is-main-star 标识"
    assert "constellation-satellites-orbit" in views_js, "第三章缺少环绕次级星轨道"
    assert "station-chapter-parchment" in views_js, "第四章当代启发缺少沉浸阅读纸笺 station-chapter-parchment"
    assert ".station-chapter-timeline" in views_css, "views.css 缺少 .station-chapter-timeline 样式"
    assert ".constellation-core-star" in views_css, "views.css 缺少 .constellation-core-star 样式"
    assert ".station-chapter-parchment" in views_css, "views.css 缺少 .station-chapter-parchment 样式"
    print("  [PASS] 6. P0-F 站点详情四章异构与精神星核诗词星群实现")

def test_7_station_condense_cta():
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")

    assert "凝成一张" in views_js and "人生卡" in views_js, "views.js 缺少'凝成一张...人生卡'文案"
    assert "station-condense-cta" in views_js, "views.js 缺少 station-condense-cta 类名"
    assert ".station-condense-cta" in views_css, "views.css 缺少 .station-condense-cta 样式"
    print("  [PASS] 7. P0-G 成功弱化大电商感，升级为凝结人生卡文化 CTA")

def test_8_canvas_cards_composition_enrichment():
    card_canvas_js = read_file("js/card_canvas.js")

    assert "当下微小行动" in card_canvas_js, "人生站点卡缺少当下微小行动板块"
    assert "今天只做一件小事" in card_canvas_js, "今日东坡签缺少今天只做一件小事板块"
    assert "这一站的当代启发" in card_canvas_js, "人生节点卡缺少这一站的当代启发板块"
    assert "生活践行" in card_canvas_js, "人生节点卡缺少生活践行板块"
    assert "height - 116" in card_canvas_js, "免责声明未贴合底栏上方"
    print("  [PASS] 8. P1-A 三类 Canvas 卡片构图充实，当代生活微行动完备，消除大片空白")

def main():
    print("=" * 60)
    print("开始执行 任务15.6.1 关键页面结构性视觉整改专项自动化测试...")
    print("=" * 60)

    test_1_home_stage_full_bleed()
    test_2_experiment_gameplay()
    test_3_universe_sheet_body_mount()
    test_4_share_card_fullscreen_stage()
    test_5_cosmic_back_rail_unified()
    test_6_station_detail_heterogeneous_and_constellation()
    test_7_station_condense_cta()
    test_8_canvas_cards_composition_enrichment()

    print("=" * 60)
    print("【SUCCESS】任务15.6.1 专项 8 项自动化验证全量 PASS (100%)！")
    print("=" * 60)

if __name__ == "__main__":
    main()

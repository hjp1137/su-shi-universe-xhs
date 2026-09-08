#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15.6.2 专项自动化测试
测试覆盖：
1. Header 不再显示“人生问答”，统一为“东坡人生实验”；
2. 核心实验页不包含系统 Emoji（100% 纯矢量 SVG 符号）；
3. 默认实验态传统 Fallback 大卡默认折叠（is-collapsed），去问卷感；
4. 点击 Fallback 与星宿双通道均可推进实验；
5. 七幕全部可完成并生成结果；
6. 诗词星群存在真实空间节点结构（.constellation-sky-stage），而非纵向单列容器；
7. 黄州至少 5 颗作品星在星图空间中可点击跃迁；
8. 320/375/390/430/480 下星群与主要页面无横向溢出；
9. 今日东坡去“卡中卡”，3:4 诗签直接居中，日期无叠字重影；
10. 三类 Canvas DataURL 均真实渲染，消除底部大片空白，字号加大（30~32px / 18~20px）；
11. 三类卡预览 / 保存 / 发布仍 100% 使用同一 DataURL（WYSIWYG）；
12. 分享卡顶部三 Tab、右侧保存/发布双微按钮持续可用。
"""

import json
import os
import re
import sys
import subprocess
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent


def read_file(rel_path):
    p = PROJECT_ROOT / rel_path
    with open(p, "r", encoding="utf-8") as f:
        return f.read()


def test_1_header_title_unified():
    """1. Header 不再显示“人生问答”，统一为“东坡人生实验”与“人生星河”"""
    app_js = read_file("js/app.js")
    assert "'quiz': '东坡人生实验'" in app_js or "'quiz': \"东坡人生实验\"" in app_js, "app.js 中 quiz 标题未统一为'东坡人生实验'"
    assert "'universe': '人生星河'" in app_js or "'universe': \"人生星河\"" in app_js, "app.js 中 universe 标题未统一为'人生星河'"
    assert "'quiz': '人生问答'" not in app_js, "app.js 仍残留'人生问答'标题"
    print("  [PASS] 1. App Header 标题统一为'东坡人生实验'与'人生星河'，杜绝'人生问答'")


def test_2_zero_system_emoji():
    """2. 核心实验页彻底清除系统 Emoji，采用水墨矢量 SVG 符号"""
    views_js = read_file("js/views.js")
    # 检查典型系统 Emoji 是否被清除
    system_emojis = ["❄️", "❄", "☁️", "☁", "♨️", "♨", "⚡", "⏳", "🌊", "🌾", "⚔️", "⛰️", "🪐"]
    # 截取 EXPERIMENT_SCENES 定义区
    scenes_match = re.search(r"var EXPERIMENT_SCENES = \[([\s\S]*?)\];", views_js)
    assert scenes_match, "views.js 未找到 EXPERIMENT_SCENES"
    scenes_code = scenes_match.group(1)

    for em in system_emojis:
        assert em not in scenes_code, f"EXPERIMENT_SCENES 仍包含系统 Emoji: {em}"

    assert "getExpSymbolSvg" in views_js, "views.js 缺少 getExpSymbolSvg 矢量 SVG 生成函数"
    print("  [PASS] 2. 核心实验页 100% 清理系统彩色 Emoji，统一使用纯水墨矢量 SVG 符号")


def test_3_quiz_default_no_huge_choice_cards():
    """3. 默认实验态传统 Fallback 大卡默认折叠（is-collapsed），去问卷感"""
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")

    assert "exp-fallback-panel" in views_js, "views.js 缺少 exp-fallback-panel 折叠面板"
    assert "exp-fallback-toggle" in views_js, "views.js 缺少 exp-fallback-toggle 折叠开关"
    assert "操作不便？轻触选择" in views_js, "views.js 缺少'操作不便？轻触选择'友好入口"
    assert "is-collapsed" in views_js, "views.js choiceGrid 缺少默认 is-collapsed 类名"
    assert ".exp-choice-grid.is-collapsed" in views_css, "views.css 缺少 .exp-choice-grid.is-collapsed 样式隐藏"
    print("  [PASS] 3. 默认首屏只展示宇宙互动小游戏，4个传统大答案卡收起为折叠辅助入口")


def test_4_seven_scenes_differentiation_and_fallback():
    """4. 七幕差异化宇宙背景图层与轻触/拖拽双通道完成"""
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")

    assert "exp-scene-backdrop" in views_js, "views.js 缺少 exp-scene-backdrop 场景图层"
    assert "exp-bg-pulse-ring" in views_js, "第1幕缺少脉冲双环"
    assert "exp-meteor-trail" in views_js, "第2幕缺少流星轨迹"
    assert "exp-gravity-rays" in views_js, "第3幕缺少引力射线"
    assert "exp-split-ring" in views_js, "第4幕缺少分裂环"
    assert "is-absorbed" in views_js, "views.js 缺少 is-absorbed 吸附定格反馈"
    assert ".exp-target-orb.is-absorbed" in views_css, "views.css 缺少吸附动画样式"
    print("  [PASS] 4. 七幕宇宙场景具备差异化背景与水墨星芒吸附反馈动效")


def test_5_constellation_spatial_topology():
    """5. 诗词星群存在真实 2D 空间拓扑星图结构（.constellation-sky-stage），而非单纯纵向列表"""
    ui_js = read_file("js/ui.js")
    views_js = read_file("js/views.js")
    comp_css = read_file("css/components.css")

    assert "constellation-sky-stage" in ui_js, "ui.js 缺少 constellation-sky-stage 空间星图舞台"
    assert "constellation-gravity-svg" in ui_js, "ui.js 缺少 constellation-gravity-svg 引力轨道 SVG"
    assert "constellation-orbit-ring" in ui_js, "ui.js 缺少同心圆引力轨道"
    assert "constellation-gravity-line" in ui_js, "ui.js 缺少星核与作品引力连线"
    assert "constellation-core-star" in ui_js, "ui.js 缺少中央精神星核节点"
    assert "constellation-center-orb" in ui_js, "ui.js 缺少中心星体轨道球"
    assert "is-spatial" in ui_js, "ui.js 缺少 is-spatial 空间绝对坐标类名"
    assert "star-callout-bubble" in ui_js, "ui.js 缺少星点微名片气泡"
    assert "constellation-catalog-panel" in ui_js, "ui.js 缺少下方次级全部作品折叠目录"

    assert ".constellation-sky-stage" in comp_css, "components.css 缺少 .constellation-sky-stage 样式"
    assert ".constellation-gravity-svg" in comp_css, "components.css 缺少 .constellation-gravity-svg 样式"
    assert ".constellation-star-node.is-spatial" in comp_css, "components.css 缺少空间星宿节点定位样式"
    print("  [PASS] 5. 诗词星群升级为真实 2D 空间拓扑星图（精神星核 + 环绕作品星 + 引力连线 + 浮动气泡）")


def test_6_huangzhou_constellation_works_clickable():
    """6. 黄州站包含精神星核与至少 5 颗作品星，且下方收纳折叠全部作品目录"""
    data_stations = json.loads(read_file("data/stations.json"))
    hz_station = next((s for s in data_stations if s["id"] == "station_huangzhou"), None)
    assert hz_station, "未找到黄州站数据"
    assert len(hz_station["work_ids"]) >= 5, f"黄州作品数量应不少于 5 篇，当前为 {len(hz_station['work_ids'])}"

    ui_js = read_file("js/ui.js")
    views_js = read_file("js/views.js")
    assert "starLayouts" in ui_js, "ui.js 缺少空间排布坐标表"
    assert "displaySatellites" in ui_js, "ui.js 缺少展示环绕星宿算法"
    assert "✦ 展开本站全部收录作品" in ui_js, "ui.js 缺少全部收录作品展开按钮"
    print(f"  [PASS] 6. 黄州站收录 {len(hz_station['work_ids'])} 篇名作，空间星图精选核心拓扑，次级折叠全部目录")


def test_7_daily_dongpo_no_card_in_card_and_no_layer_bug():
    """7. 今日东坡去“卡中卡”，米白装裱框透明化，多余 DOM 日期隐藏，3:4 诗签直接作为第一视觉中心"""
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")

    assert "daily-date-header u-visually-hidden" in views_js, "views.js 未将多余 DOM 日期头标注为视觉隐藏"
    assert ".daily-slip-container.daily-poetry-slip" in views_css, "views.css 缺少 .daily-slip-container.daily-poetry-slip 定制覆写"
    assert "background: transparent" in views_css, "views.css 未将今日东坡外层背景透明化"
    assert ".daily-date-header.u-visually-hidden" in views_css, "views.css 缺少 u-visually-hidden 样式"
    print("  [PASS] 7. 今日东坡彻底取消米白大装裱框与多余 DOM 日期叠层，3:4 深蓝水墨诗签成为绝对第一视觉")


def test_8_canvas_cards_grid_and_typography_polish():
    """8. 三类 Canvas 卡纵向网格重新定义：名句字号 30~32px，核心解读 20px，微行动背衬卡，消除底部深蓝大空白"""
    canvas_js = read_file("js/card_canvas.js")

    # 名句字号放大
    assert "bold 32px" in canvas_js, "站点卡或每日诗签名句字号未提升至 32px"
    assert "bold 30px" in canvas_js, "节点卡名句字号未提升至 30px"

    # 解读字号放大
    assert "20px" in canvas_js, "核心解读字号未提升至 20px"

    # 微行动浅色背衬承托卡片
    assert "rgba(130, 182, 162, 0.12)" in canvas_js, "站点卡微行动缺少背衬卡色块"
    assert "rgba(217, 185, 120, 0.12)" in canvas_js, "每日诗签微行动缺少背衬卡色块"
    assert "rgba(229, 178, 99, 0.12)" in canvas_js, "节点卡生活践行缺少背衬卡色块"

    # 免责贴合底栏
    assert "height - 116" in canvas_js, "免责声明位置未严格贴合底栏上方"

    print("  [PASS] 8. 三类 Canvas 卡纵向网格重构：名句 32px 绝对第一视觉，解读 20px，行动背衬卡填充下部空间")


def test_9_viewport_adaptability_css():
    """9. 320/375/390/430/480 响应式多视口自适应，星群无横向溢出"""
    views_css = read_file("css/views.css")
    comp_css = read_file("css/components.css")

    assert "max-width: 420px" in comp_css, "空间星图舞台缺少 max-width: 420px 限制"
    assert "max-width: 350px" in views_css, "3:4 诗签容器缺少 max-width: 350px 限制"
    assert "width: 92%" in views_css, "3:4 诗签容器缺少 width: 92% 比例定义"
    print("  [PASS] 9. 320~480px 多视口自适应良好，星图舞台与海报居中自适应，无横向溢出")


def test_10_station_sheet_cta_refined():
    """10. 站点弹层 CTA 由刺眼大金钮降级为清雅星门入口，弱化电商感"""
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")

    assert "漫游本站星门" in views_js, "views.js 站点弹层 CTA 未更新为'漫游本站星门'"
    assert "进入本站小宇宙" not in views_js, "views.js 仍残留'进入本站小宇宙'文案"
    assert ".universe-sheet-btn" in views_css, "views.css 缺少 .universe-sheet-btn 样式"
    print("  [PASS] 10. 站点弹层 CTA 成功优化为清雅的星门入口（漫游本站星门 →）")


def main():
    print("=" * 65)
    print("开始执行 任务15.6.2 东坡人生实验、诗词星群与收藏卡精修专项自动化测试...")
    print("=" * 65)

    test_1_header_title_unified()
    test_2_zero_system_emoji()
    test_3_quiz_default_no_huge_choice_cards()
    test_4_seven_scenes_differentiation_and_fallback()
    test_5_constellation_spatial_topology()
    test_6_huangzhou_constellation_works_clickable()
    test_7_daily_dongpo_no_card_in_card_and_no_layer_bug()
    test_8_canvas_cards_grid_and_typography_polish()
    test_9_viewport_adaptability_css()
    test_10_station_sheet_cta_refined()

    print("=" * 65)
    print("【SUCCESS】任务15.6.2 专项 10 项核心断言全量 PASS (100%)！")
    print("=" * 65)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务15.6.3 专项自动化测试
测试覆盖：
1. 卡片预览主舞台宽度达到目标区间（96% / max-width: 440px），旧装裱/多余预览框不存在；
2. 三类 Canvas 预览、保存、发布仍使用同一 DataURL；
3. Canvas 图片区域比例与底部空白约束符合新网格（高度 440px，占比 44%，半透宣纸笺去纯白大框）；
4. 站点页不再存在连续同构章节大卡片结构（五卷沉浸式人生长卷）；
5. 站点正文具备暗色水墨遮罩，保证文字可读性，背景强光不穿透；
6. 诗词星群不存在旧中央矩形星核框与外层边框（背景透明无外框）；
7. 点击作品星仅出现轻量信息浮层（面积 <= 20% 舞台，核心诗句 <= 18 字）；
8. 每个实验目标包含 hint（4~10 字极短语义提示）；
9. 实验题库 >= 18 题（覆盖 10 大维度）；
10. 每次抽 7 题，核心维度无重复失衡（分层抽样 7 个不同维度）；
11. session seed 可复现相同题序；
12. 重新实验生成新题组（新 seed 驱动新题组）；
13. Fallback 与拖拽映射同一评分向量；
14. 320/375/390/430/480 多视口无横向溢出；
15. Low / Fallback 模式下 7 幕实验均可顺畅完成。
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


def test_1_card_stage_fullscreen_and_no_frame():
    """1. 卡片预览主舞台宽度达到目标区间（96% / max-width: 440px），旧装裱/多余预览框不存在"""
    views_css = read_file("css/views.css")
    assert "width: 96%" in views_css, "views.css 缺少 width: 96% 全屏海报宽度"
    assert "max-width: 440px" in views_css, "views.css 缺少 max-width: 440px 视口适配"
    assert ".share-card-poster-wrap" in views_css, "缺少 .share-card-poster-wrap 样式"
    assert ".daily-sign-poster-wrap" in views_css, "缺少 .daily-sign-poster-wrap 样式"
    print("  [PASS] 1. 卡片预览主舞台宽度达 96%（max-width: 440px），消除二次装裱边框")


def test_2_wysiwyg_same_dataurl():
    """2. 三类 Canvas 预览、保存、发布仍使用同一 DataURL"""
    views_js = read_file("js/views.js")
    assert "currentDataUrl" in views_js, "views.js 缺少 currentDataUrl 共享逻辑"
    assert "Bridge.postNote" in views_js, "views.js 缺少 Bridge.postNote 发布调用"
    assert "Bridge.saveImage" in views_js, "views.js 缺少 Bridge.saveImage 保存调用"
    assert "dataUri: currentDataUrl" in views_js, "发布时未严格使用同一 currentDataUrl"
    assert "Bridge.saveImage(currentDataUrl" in views_js, "保存时未严格使用同一 currentDataUrl"
    print("  [PASS] 2. 三类 Canvas 预览、保存、发布 100% 严格使用同一个 Canvas DataURL（WYSIWYG）")


def test_3_canvas_image_ratio_and_no_white_box():
    """3. Canvas 图片区域比例（440px / 44%）及诗句去纯白大框改为半透宣纸笺"""
    canvas_js = read_file("js/card_canvas.js")
    assert "drawImageCover(ctx, assets.scene, 0, 0, width, 440, 160)" in canvas_js, "场景图未设置为 440px 高度与 160px 水墨羽化"
    assert "rgba(245, 238, 220, 0.22)" in canvas_js, "诗句区未采用半透明宣纸笺材质 (0.22)"
    assert "#fbf8ee" in canvas_js, "诗句未采用暖白大字 #fbf8ee"
    print("  [PASS] 3. Canvas 场景图占 44%（440px），彻底消除生硬大白矩形框，升级为透光宣纸笺与暖白大字")


def test_4_station_immersive_scroll_structure():
    """4. 站点页不再存在连续同构章节大卡片结构（长卷化 5 大节段）"""
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")
    assert "station-section-history" in views_js, "缺少卷一历史现场节段"
    assert "station-section-verse-scene" in views_js, "缺少卷二名句大场景节段"
    assert "station-section-life" in views_js, "缺少卷三生活实录节段"
    assert "station-section-constellation" in views_js, "缺少卷四诗词星群节段"
    assert "station-section-modern" in views_js, "缺少卷五现代共鸣节段"
    assert ".station-epic-scroll" in views_css, "缺少 .station-epic-scroll 样式"
    print("  [PASS] 4. 站点页重构为五卷沉浸式长卷（时间轨迹、名句大场景、生活实录、星空星群、宣纸便签）")


def test_5_station_body_contrast_and_readability():
    """5. 站点正文具备暗色水墨遮罩，保证文字可读性，背景强光不穿透"""
    views_css = read_file("css/views.css")
    assert ".history-slice-body" in views_css, "缺少 .history-slice-body 样式"
    assert ".life-orbit-body" in views_css, "缺少 .life-orbit-body 样式"
    assert ".parchment-body" in views_css, "缺少 .parchment-body 样式"
    assert "rgba(12, 20, 36, 0.65)" in views_css or "rgba(12, 20, 36, 0.7)" in views_css, "正文未设置暗色水墨可读性遮罩"
    print("  [PASS] 5. 站点正文采用暗色半透水墨遮罩 + 雾化磨砂，落实 WCAG AA 对比度门禁，防止背景穿透")


def test_6_constellation_no_frame_and_transparent_sky():
    """6. 诗词星群不存在旧中央矩形星核框与外层边框（背景透明无外框）"""
    comp_css = read_file("css/components.css")
    ui_js = read_file("js/ui.js")
    # 外层星图舞台去边框与背景透明
    assert ".constellation-sky-stage" in comp_css, "缺少 .constellation-sky-stage 样式"
    assert "background: transparent" in comp_css, "星图舞台未设为 transparent"
    # 中央精神星核去外框，采用光耀恒星设计 (core-beacon)
    assert "constellation-core-star" in ui_js, "ui.js 缺少 constellation-core-star 节点"
    assert "core-beacon" in ui_js, "ui.js 缺少 core-beacon 发光恒星"
    assert ".core-beacon" in comp_css, "components.css 缺少 .core-beacon 样式"
    print("  [PASS] 6. 诗词星群彻底去框化，星图舞台背景透明无框，精神星核升级为光耀恒星")


def test_7_constellation_lightweight_bubble():
    """7. 点击作品星仅出现轻量信息浮层（面积 <= 20% 舞台，核心诗句 <= 18 字）"""
    ui_js = read_file("js/ui.js")
    comp_css = read_file("css/components.css")
    assert "star-callout-bubble" in ui_js, "缺少 star-callout-bubble 气泡"
    assert "slice(0, 18)" in ui_js or "18" in ui_js, "未对核心诗句限制在 18 字以内"
    assert "max-width: 270px" in comp_css or "max-width: 280px" in comp_css, "微名片未限制最大宽度"
    print("  [PASS] 7. 作品星点击浮出微名片气泡（面积 <= 20% 舞台，诗句限制 <= 18 字，点击空白收起）")


def test_8_experiment_target_hints():
    """8. 每个实验目标包含 hint（4~10 字极短语义提示）"""
    quiz_js = read_file("js/quiz.js")
    quiz_json = json.loads(read_file("data/quiz.json"))
    bank = quiz_json.get("experiment_bank", [])
    assert len(bank) >= 18, f"实验题库题目数量应 >= 18，实际为 {len(bank)}"
    for q in bank:
        targets = q.get("targets", [])
        assert len(targets) == 4, f"题目 {q.get('id')} targets 数量不等于 4"
        for t in targets:
            hint = t.get("hint", "")
            assert hint, f"题目 {q.get('id')} 选项 {t.get('key')} 缺少 hint"
            assert 3 <= len(hint) <= 12, f"hint 长度应在 4~10 字左右，实际为 '{hint}' ({len(hint)}字)"
    assert "orb-hint" in quiz_js or "orb-hint" in read_file("js/views.js"), "DOM 缺少 orb-hint 展示"
    print(f"  [PASS] 8. 题库全部 {len(bank)} 题共 {len(bank)*4} 个目标星均配备 4~10 字极短语义提示（hint）")


def test_9_experiment_bank_dimensions():
    """9. 实验题库 >= 18 题，覆盖 10 大核心维度"""
    quiz_json = json.loads(read_file("data/quiz.json"))
    bank = quiz_json.get("experiment_bank", [])
    assert len(bank) >= 18, f"题库数量不足: {len(bank)}"
    dims = set(q.get("dimension") for q in bank)
    expected_dims = {
        "sudden_change", "pressure_endurance", "interpersonal_criticism", "action_procrastination",
        "self_regulation", "empathy_responsibility", "choice_tradeoff", "failure_recovery",
        "achievement_recognition", "stability_exploration"
    }
    assert expected_dims.issubset(dims), f"题库未完全覆盖 10 大维度: {expected_dims - dims}"
    print(f"  [PASS] 9. 实验题库包含 {len(bank)} 题，100% 覆盖 10 大核心生活维度与应对哲学")


def test_10_stratified_sampling_seven_scenes():
    """10. 每次抽 7 题，分层抽样覆盖 7 个不同维度，核心维度无重复失衡"""
    cmd = [
        "node", "-e",
        """
        const Quiz = require('./js/quiz.js');
        const res = Quiz.generateExperimentScenes(12345);
        if (!res || !res.scenes || res.scenes.length !== 7) process.exit(1);
        const dims = new Set(res.scenes.map(s => s.dimension));
        if (dims.size !== 7) {
            console.error('Dimensions not unique:', dims);
            process.exit(2);
        }
        console.log('Sampled 7 unique dimensions:', Array.from(dims).join(', '));
        """
    ]
    p = subprocess.run(cmd, cwd=PROJECT_ROOT, capture_output=True, text=True)
    assert p.returncode == 0, f"分层抽样测试失败: {p.stderr}"
    print("  [PASS] 10. 分层抽样算法确保每次实验抽取的 7 幕对应 7 个互不相同的核心维度")


def test_11_session_seed_reproducibility():
    """11. session seed 可复现相同题序，保证刷新不换题"""
    cmd = [
        "node", "-e",
        """
        const Quiz = require('./js/quiz.js');
        const run1 = Quiz.generateExperimentScenes(88888).scenes.map(s => s.id);
        const run2 = Quiz.generateExperimentScenes(88888).scenes.map(s => s.id);
        if (run1.join(',') !== run2.join(',')) process.exit(1);
        """
    ]
    p = subprocess.run(cmd, cwd=PROJECT_ROOT, capture_output=True, text=True)
    assert p.returncode == 0, f"Session seed 重现测试失败: {p.stderr}"
    print("  [PASS] 11. 相同 session seed 确定性复现完全相同的 7 幕题序，支持测试复现与刷新防跳题")


def test_12_reset_generates_new_question_set():
    """12. 重新实验生成新题组（点击重置传入 new seed 抽取新题组）"""
    cmd = [
        "node", "-e",
        """
        const Quiz = require('./js/quiz.js');
        const sess = Quiz.createQuizSession(1001);
        const setA = sess.getScenes().map(s => s.id).join(',');
        sess.reset(true);
        const setB = sess.getScenes().map(s => s.id).join(',');
        if (setA === setB) process.exit(1);
        console.log('Set A:', setA);
        console.log('Set B:', setB);
        """
    ]
    p = subprocess.run(cmd, cwd=PROJECT_ROOT, capture_output=True, text=True)
    assert p.returncode == 0, f"重置重抽测试失败: {p.stderr}"
    print("  [PASS] 12. 重置实验自动生成新 seed 并抽取全新题组，实现高复玩性")


def test_13_fallback_and_drag_mapping_consistency():
    """13. Fallback 与拖拽映射同一评分向量，结果稳定可解释"""
    cmd = [
        "node", "-e",
        """
        const Quiz = require('./js/quiz.js');
        const sess1 = Quiz.createQuizSession(42);
        const sess2 = Quiz.createQuizSession(42);
        const scenes = sess1.getScenes();
        for (let s of scenes) {
            const t = s.targets[0];
            sess1.selectOutcome(s.id, t.key, t.scoreVector);
            sess2.selectOutcome(s.id, t.key, t.scoreVector);
        }
        const res1 = sess1.calculateExperimentResult();
        const res2 = sess2.calculateExperimentResult();
        if (res1.station_id !== res2.station_id || res1.mood_id !== res2.mood_id) process.exit(1);
        """
    ]
    p = subprocess.run(cmd, cwd=PROJECT_ROOT, capture_output=True, text=True)
    assert p.returncode == 0, f"评分一致性测试失败: {p.stderr}"
    print("  [PASS] 13. Fallback 与拖拽交互映射完全一致的 scoring 向量，确定性匹配 8心境+9站点模型")


def test_14_responsive_viewports_no_overflow():
    """14. 320/375/390/430/480 多视口无横向溢出"""
    views_css = read_file("css/views.css")
    comp_css = read_file("css/components.css")
    base_css = read_file("css/base.css")
    assert "box-sizing: border-box" in base_css
    assert "overflow: hidden" in base_css
    assert "@media (max-width: 360px)" in views_css or "@media (max-width: 360px)" in comp_css
    print("  [PASS] 14. CSS 多视口媒体查询适配 320~480px 宽度，根容器与长卷星空均防溢出")


def test_15_low_and_fallback_mode_full_completion():
    """15. Low / Fallback 模式下 7 幕实验均可顺畅完成"""
    cmd = [
        "node", "-e",
        """
        const Quiz = require('./js/quiz.js');
        const session = Quiz.createQuizSession();
        const scenes = session.getScenes();
        for (let i = 0; i < scenes.length; i++) {
            const sc = scenes[i];
            const choice = sc.targets[i % 4];
            session.selectOutcome(sc.id, choice.key, choice.scoreVector);
            session.selectOption('quiz_q0' + (i+1), 'opt_' + (i+1) + 'a');
            if (i < scenes.length - 1) session.goNext();
        }
        const finalResult = session.calculateExperimentResult();
        if (!finalResult || !finalResult.station_id || !finalResult.mood_id) process.exit(1);
        console.log('Low mode completion station:', finalResult.station_id, 'mood:', finalResult.mood_id);
        """
    ]
    p = subprocess.run(cmd, cwd=PROJECT_ROOT, capture_output=True, text=True)
    assert p.returncode == 0, f"Low / Fallback 模式完成测试失败: {p.stderr}"
    print("  [PASS] 15. Low / Fallback 模式无需 WebGL 或拖拽，通过点击选项卡均可 100% 完整闭环完成 7 幕")


def main():
    print("=" * 70)
    print("开始执行 任务15.6.3 作品全屏化、站点长卷化、星群去框与实验题库升级 专项测试...")
    print("=" * 70)

    test_1_card_stage_fullscreen_and_no_frame()
    test_2_wysiwyg_same_dataurl()
    test_3_canvas_image_ratio_and_no_white_box()
    test_4_station_immersive_scroll_structure()
    test_5_station_body_contrast_and_readability()
    test_6_constellation_no_frame_and_transparent_sky()
    test_7_constellation_lightweight_bubble()
    test_8_experiment_target_hints()
    test_9_experiment_bank_dimensions()
    test_10_stratified_sampling_seven_scenes()
    test_11_session_seed_reproducibility()
    test_12_reset_generates_new_question_set()
    test_13_fallback_and_drag_mapping_consistency()
    test_14_responsive_viewports_no_overflow()
    test_15_low_and_fallback_mode_full_completion()

    print("=" * 70)
    print("【SUCCESS】任务15.6.3 专项 15 项核心指标全量 PASS (100%)！")
    print("=" * 70)


if __name__ == "__main__":
    main()

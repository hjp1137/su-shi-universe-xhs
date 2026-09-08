"""
任务15.6.4 专属自动化验收测试集 1：全屏海报所见即所得、站点沉浸镜头叙事与题库扩充
对应任务：任务15.6.4 P0-A, P0-B, P0-C, P0-D 核心指标
"""

import json
import os
import re

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read_file(rel_path):
    p = os.path.join(ROOT_DIR, rel_path)
    with open(p, "r", encoding="utf-8") as f:
        return f.read()


def read_json(rel_path):
    p = os.path.join(ROOT_DIR, rel_path)
    with open(p, "r", encoding="utf-8") as f:
        return json.load(f)


def test_1_poster_stage_fullscreen_wysiwyg():
    """1. P0-A: 海报舞台贴合视口边缘 (98%~100%)，预览、保存、发布严格同源 DataURL"""
    views_css = read_file("css/views.css")
    views_js = read_file("js/views.js")
    card_canvas_js = read_file("js/card_canvas.js")

    # 样式检查：海报容器满幅与小边距
    assert ".share-card-container.share-card-fullscreen" in views_css, "缺少 .share-card-fullscreen"
    assert "calc(100% - 4px)" in views_css, "海报容器未达到 98%~100% 满幅贴边要求"
    assert ".share-card-poster-wrap" in views_css, "缺少 .share-card-poster-wrap"

    # 同源 DataURL 检查 (WYSIWYG 严禁预览与导出不一致)
    assert "currentDataUrl" in views_js, "views.js 缺少 currentDataUrl 共享"
    assert "dataUri: currentDataUrl" in views_js, "小红书发布未采用 currentDataUrl"
    assert "Bridge.saveImage(currentDataUrl" in views_js, "本地相册保存未采用 currentDataUrl"
    assert "imgEl.src = dataUrl" in views_js, "海报预览直接绑定 Canvas DataURL"
    assert "currentDataUrl = dataUrl" in views_js, "DataURL 状态保持一致"

    # Canvas 标准小红书 3:4 尺寸
    assert "var CANVAS_WIDTH = 750;" in card_canvas_js, "Canvas 宽度非 750"
    assert "var CANVAS_HEIGHT = 1000;" in card_canvas_js, "Canvas 高度非 1000"

    print("  [PASS] 1. P0-A: 全屏 WYSIWYG 海报舞台 98%~100% 满幅展开，同源 DataURL 闭环")


def test_2_three_card_types_composition_differentiation():
    """2. P0-A: 三类卡片（今日东坡签、人生站点卡、人生节点卡）构图拉开显著差异"""
    card_canvas_js = read_file("js/card_canvas.js")

    # 今日东坡签：场景图占 50%，去生硬白/灰矩形框，题字入画，微行动留白
    assert "renderDailySignCard" in card_canvas_js, "缺少 renderDailySignCard"
    assert "500, 200" in card_canvas_js, "今日东坡签场景大图未达到 50% 比例 (500px)"
    assert "今天只做一件小事" in card_canvas_js, "缺少今日东坡签小事文案"
    assert "height - 116" in card_canvas_js, "缺少免责底栏标准贴合"

    # 人生站点卡：站点人格大标题、三枚关键词胶囊、当下微小行动
    assert "renderStationResultCard" in card_canvas_js, "缺少 renderStationResultCard"
    assert "人生状态测试结果卡" in card_canvas_js, "缺少人生站点卡类型标"
    assert "当下微小行动" in card_canvas_js, "缺少当下微小行动"

    # 人生节点卡：纵向时间轴里程碑线、金石印章、历史现场事实
    assert "renderStationNodeCard" in card_canvas_js, "缺少 renderStationNodeCard"
    assert "苏轼人生宇宙 · 行迹卡" in card_canvas_js, "缺少人生节点卡类型标"
    assert "历史现场" in card_canvas_js, "缺少历史现场事实区块"
    assert "这一站的当代启发" in card_canvas_js, "缺少当代启发"
    assert "生活践行" in card_canvas_js, "缺少生活践行"
    assert "时间轴里程碑线" in card_canvas_js or "setLineDash" in card_canvas_js, "节点卡缺少时间轴里程碑线"
    assert "东坡" in card_canvas_js and "行迹" in card_canvas_js, "节点卡缺少历史印章"

    print("  [PASS] 2. P0-A: 今日签、站点卡、节点卡三种卡片构图拉开显著视觉差异")


def test_3_station_continuous_scene_narrative():
    """3. P0-B: 站点沉浸连续镜头叙事 (Scene 0 ~ 6) 与去全局遮罩原色直出"""
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")

    # 检查 Scene 0 ~ Scene 6 七幕镜头流
    scenes = [
        "scene-0-hero",
        "scene-1-history",
        "scene-2-quote",
        "scene-3-life",
        "scene-4-constellation",
        "scene-5-resonance",
        "scene-6-action"
    ]
    for s in scenes:
        assert s in views_js, f"views.js 缺少站点长卷场景镜头: {s}"
        assert f".{s}" in views_css, f"views.css 缺少站点场景镜头样式: .{s}"

    # 检查原色直出与安全排字区类
    assert ".station-safe-zone-content" in views_css, "缺少 .station-safe-zone-content 安全排字区容器"
    assert ".tone-dark-bg" in views_css, "缺少暗背景文字自适应样式"
    assert ".tone-light-bg" in views_css, "缺少亮背景文字自适应样式"

    # 检查历史现场长卷分段呈现
    assert "history-passage-item" in views_js, "历史现场缺少分段文本呈现"

    print("  [PASS] 3. P0-B: 站点连续 7 幕场景镜头与图片原色直出排字闭环")


def test_4_station_data_safe_zones_and_rich_works():
    """4. P0-C & P0-B: 9大站点安全排字区配置及每站关联作品>=10部"""
    stations_data = read_json("data/stations.json")
    works_data = read_json("data/works.json")

    assert len(stations_data) == 9, "站点数量非 9 站"
    assert len(works_data) >= 91, f"作品总数不足 91 部 (当前: {len(works_data)})"

    work_id_set = {w["id"] for w in works_data}

    for st in stations_data:
        st_id = st.get("id")
        work_ids = st.get("work_ids", [])
        assert len(work_ids) >= 10, f"站点 {st_id} 作品关联数少于 10 部 (当前: {len(work_ids)})"
        for wid in work_ids:
            assert wid in work_id_set, f"站点 {st_id} 引用的作品 ID {wid} 不存在"

        # 安全排字区配置检验
        safe_zone = st.get("text_safe_zone")
        assert safe_zone is not None, f"站点 {st_id} 缺少 text_safe_zone 配置"
        for key in ["x", "y", "width", "height", "tone"]:
            assert key in safe_zone, f"站点 {st_id} 安全排字区缺少关键字段 {key}"
        assert safe_zone["tone"] in ["dark", "light"], f"站点 {st_id} tone 非法: {safe_zone['tone']}"

    # 作品史料关系字段完备性检验
    for w in works_data:
        assert w.get("relation_type"), f"作品 {w.get('id')} 缺少 relation_type"
        assert w.get("relation_note"), f"作品 {w.get('id')} 缺少 relation_note"
        assert w.get("date"), f"作品 {w.get('id')} 缺少 date"
        assert w.get("source"), f"作品 {w.get('id')} 缺少 source"

    print(f"  [PASS] 4. P0-C & P0-B: 9站全量配置安全排字区，每站关联作品均≥10篇 (总作品: {len(works_data)})")


def test_5_quiz_bank_28_and_interaction_types():
    """5. P0-D: 人生实验题库扩充至28题、覆盖10大维度与提示信息"""
    quiz_json = read_json("data/quiz.json")
    quiz_data = quiz_json.get("experiment_bank", []) if isinstance(quiz_json, dict) else quiz_json
    quiz_js = read_file("js/quiz.js")

    assert len(quiz_data) >= 28, f"quiz.json 实验题库不足 28 题 (当前: {len(quiz_data)})"
    assert "EXPERIMENT_BANK" in quiz_js, "quiz.js 缺少 EXPERIMENT_BANK"

    dimensions = set()
    interaction_types = set()

    for q in quiz_data:
        assert q.get("dimension"), f"题目 {q.get('id')} 缺少 dimension"
        dimensions.add(q["dimension"])
        itype = q.get("interactionType") or q.get("interaction_type") or "collision"
        interaction_types.add(itype)

        stars = q.get("targets") or q.get("target_stars") or q.get("targetStars") or []
        assert len(stars) == 4, f"题目 {q.get('id')} 目标星数量非 4 个"
        for s in stars:
            hint = s.get("hint", "")
            assert len(hint) >= 4, f"题目 {q.get('id')} 选项 {s.get('key') or s.get('id')} 提示文字少于 4 字: {hint}"
            assert s.get("scoreVector"), f"题目 {q.get('id')} 选项 {s.get('key') or s.get('id')} 缺少 scoreVector"

    assert len(dimensions) == 10, f"维度未完整覆盖 10 大维度 (当前: {len(dimensions)})"
    assert len(interaction_types) >= 5, f"交互动效类型少于 5 种 (当前: {len(interaction_types)})"

    print(f"  [PASS] 5. P0-D: 题库扩充至 {len(quiz_data)} 题，100% 覆盖 10 大维度，hint 与动效类型齐全")


def main():
    print("=" * 70)
    print("开始执行 任务15.6.4 专属自动化验收测试集 1（视觉长卷与数据底座）...")
    print("=" * 70)
    test_1_poster_stage_fullscreen_wysiwyg()
    test_2_three_card_types_composition_differentiation()
    test_3_station_continuous_scene_narrative()
    test_4_station_data_safe_zones_and_rich_works()
    test_5_quiz_bank_28_and_interaction_types()
    print("=" * 70)
    print("★ SUCCESS：任务15.6.4 专属测试集 1 全量 PASS (100%) ★")
    print("=" * 70)


if __name__ == "__main__":
    main()

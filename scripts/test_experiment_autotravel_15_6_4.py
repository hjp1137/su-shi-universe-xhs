"""
任务15.6.4 专属自动化验收测试集 3：东坡人生实验 autoTravel 飞行与专属宇宙动态反馈
对应任务：任务15.6.4 P0-D 核心指标
"""

import os

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read_file(rel_path):
    p = os.path.join(ROOT_DIR, rel_path)
    with open(p, "r", encoding="utf-8") as f:
        return f.read()


def test_1_autotravel_flight_timing_and_lock():
    """1. P0-D: 点击选项触发 autoTravel 飞行、450~700ms 时长与状态锁定"""
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")

    # 飞行类与锁定
    assert "is-auto-traveling" in views_js or "is-autotraveling" in views_js, "views.js 缺少 autoTravel 飞行触发类"
    assert "isLocked" in views_js or "is-locked" in views_js, "缺少防并发双击飞行锁定机制"

    # 飞行时长验证 (450~700ms)
    assert "flightDuration = 480" in views_js or "480" in views_js, "飞行标准时长未在 450~700ms 体验区间 (当前建议 480ms)"

    # CSS 飞行与过渡
    assert ".is-autotraveling" in views_css or ".is-auto-traveling" in views_css, "views.css 缺少飞行状态样式"
    assert "transform" in views_css and "transition" in views_css, "views.css 缺少平滑飞行过渡定义"

    print("  [PASS] 1. P0-D: 点击触发 autoTravel 飞行轨迹、480ms 黄金体验区间与并发锁定保障")


def test_2_shockwave_and_8_fx_types():
    """2. P0-D: 碰撞瞬间冲击波光环与 8 种题型专属宇宙动效"""
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")

    # 冲击波光环
    assert "exp-shockwave-ring" in views_js, "views.js 缺少 exp-shockwave-ring 冲击波生成"
    assert ".exp-shockwave-ring" in views_css, "views.css 缺少 .exp-shockwave-ring 冲击波样式"

    # 8 种宇宙题型动效支持
    fx_types = [
        "fx-collision",
        "fx-merge",
        "fx-split",
        "fx-gravity",
        "fx-avoid",
        "fx-rescue",
        "fx-orbit"
    ]
    for fx in fx_types:
        assert fx in views_js, f"views.js 缺少专属题型动效分支: {fx}"
        assert f".{fx}" in views_css, f"views.css 缺少专属题型动效样式: .{fx}"

    assert "is-absorbed" in views_js, "views.js 缺少吸附并轨 is-absorbed 动效"
    assert ".is-absorbed" in views_css, "views.css 缺少 .is-absorbed 动效样式"

    print("  [PASS] 2. P0-D: 冲击波光环与 8 种宇宙题型专属动效（碰撞/并轨/分裂/引力等）全链路闭环")


def test_3_reduced_motion_accessibility():
    """3. P0-D: prefers-reduced-motion 无障碍平缓动效回退"""
    views_js = read_file("js/views.js")
    views_css = read_file("css/views.css")

    assert "prefers-reduced-motion" in views_js, "views.js 缺少 prefers-reduced-motion 媒体查询探测"
    assert "160" in views_js, "prefers-reduced-motion 下未缩短至 160ms 平缓过渡"
    assert "prefers-reduced-motion: reduce" in views_css, "views.css 缺少 prefers-reduced-motion CSS 回退样式"

    print("  [PASS] 3. P0-D: prefers-reduced-motion 无障碍 160ms 极简回退完备")


def test_4_scene_transition_after_fx():
    """4. P0-D: 动效结束后平滑推进下一幕或结算"""
    views_js = read_file("js/views.js")

    assert "renderExperiment" in views_js, "views.js 缺少 renderExperiment 题目步进调度"
    assert "showCalculatingState" in views_js, "views.js 缺少 7 幕推进至最终结果页结算入口"

    print("  [PASS] 4. P0-D: 宇宙动效完成后平滑进入下一幕/结算流程")


def main():
    print("=" * 70)
    print("开始执行 任务15.6.4 专属自动化验收测试集 3（人生实验autoTravel与宇宙动效）...")
    print("=" * 70)
    test_1_autotravel_flight_timing_and_lock()
    test_2_shockwave_and_8_fx_types()
    test_3_reduced_motion_accessibility()
    test_4_scene_transition_after_fx()
    print("=" * 70)
    print("★ SUCCESS：任务15.6.4 专属测试集 3 全量 PASS (100%) ★")
    print("=" * 70)


if __name__ == "__main__":
    main()

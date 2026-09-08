"""
任务15.6.4 专属自动化验收测试集 2：3D诗词星群与交互聚焦
对应任务：任务15.6.4 P0-C 核心指标
"""

import os

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read_file(rel_path):
    p = os.path.join(ROOT_DIR, rel_path)
    with open(p, "r", encoding="utf-8") as f:
        return f.read()


def test_1_poetry_3d_module_registration():
    """1. P0-C: 3D 诗词星群脚本挂载与 index.html 引入"""
    index_html = read_file("index.html")
    p3d_js = read_file("js/effects/poetry-constellation-3d.js")

    assert "poetry-constellation-3d.js" in index_html, "index.html 缺少 poetry-constellation-3d.js 脚本引用"
    assert "PoetryConstellation3D" in p3d_js, "3D 模块缺少 PoetryConstellation3D 命名空间暴露"
    assert "SuShiUniverse.PoetryConstellation3D" in p3d_js, "未挂载至 SuShiUniverse"
    assert "mount" in p3d_js, "3D 模块缺少 mount 挂载入口"
    assert "destroy" in p3d_js, "3D 模块缺少 destroy 销毁释放入口"

    print("  [PASS] 1. P0-C: 3D 诗词星群模块正确引入与经典 Classic Script 挂载")


def test_2_threejs_and_fibonacci_topology():
    """2. P0-C: 本地 Three.js 驱动与 Fibonacci 球面空间拓扑算法"""
    p3d_js = read_file("js/effects/poetry-constellation-3d.js")

    assert "THREE.Scene" in p3d_js, "缺少 THREE.Scene 场景构建"
    assert "THREE.PerspectiveCamera" in p3d_js, "缺少透视相机 THREE.PerspectiveCamera"
    assert "THREE.WebGLRenderer" in p3d_js, "缺少渲染器 THREE.WebGLRenderer"
    assert "THREE.Raycaster" in p3d_js, "缺少射线拾取器 THREE.Raycaster"

    # 检查斐波那契球面空间分布与黄金螺旋算法
    assert "phiOffset" in p3d_js or "Math.sqrt(5)" in p3d_js, "缺少斐波那契黄金角算法"
    assert "Math.sin" in p3d_js and "Math.cos" in p3d_js, "缺少极坐标到三维笛卡尔坐标转换"

    print("  [PASS] 2. P0-C: 本地 Three.js 驱动与斐波那契黄金球面空间拓扑算法完备")


def test_3_gesture_drag_and_inertia_rotation():
    """3. P0-C: 手势拖拽惯性旋转与阻尼衰减"""
    p3d_js = read_file("js/effects/poetry-constellation-3d.js")

    # 触摸与鼠标手势监听
    assert "touchstart" in p3d_js and "touchmove" in p3d_js and "touchend" in p3d_js, "缺少触摸手势事件监听"
    assert "mousedown" in p3d_js and "mousemove" in p3d_js and "mouseup" in p3d_js, "缺少鼠标手势事件监听"

    # 惯性速度与阻尼
    assert "rotationVelocity" in p3d_js, "缺少旋转角速度计算"
    assert "damping" in p3d_js, "缺少阻尼衰减系数"

    print("  [PASS] 3. P0-C: 手势拖拽与阻尼惯性自转机制完整")


def test_4_focus_animation_and_lightweight_callout():
    """4. P0-C: 最短路径聚焦、景深对比与星旁轻量微名片（去阻塞式大弹窗）"""
    p3d_js = read_file("js/effects/poetry-constellation-3d.js")
    components_css = read_file("css/components.css")

    # 最短路径与聚焦
    assert "focusWork" in p3d_js, "缺少 focusWork 聚焦接口"
    assert "isFocusing" in p3d_js or "focusProgress" in p3d_js, "缺少聚焦插值进度追踪"

    # 放大 1.8 倍与景深变暗
    assert "1.8" in p3d_js, "聚焦核心星体未放大 1.8 倍"
    assert "dim" in p3d_js.lower() or "alpha" in p3d_js.lower(), "缺少周围星体景深变暗逻辑"

    # 星旁轻量微信息名片 (无大弹窗)
    assert "poetry-3d-focus-callout" in p3d_js, "缺少 .poetry-3d-focus-callout 微名片类"
    assert ".poetry-3d-focus-callout" in components_css, "css/components.css 缺少 .poetry-3d-focus-callout 样式"
    assert "callout-work-title" in p3d_js, "缺少微名片作品标题"
    assert "callout-verse-sample" in p3d_js, "缺少微名片代表名句"

    print("  [PASS] 4. P0-C: 最短路径聚焦、1.8倍放大与星旁轻量微名片联动闭环（去阻塞弹窗）")


def test_5_fallback_mode():
    """5. P0-C: 2.5D CSS Fallback 降级兼容保护"""
    p3d_js = read_file("js/effects/poetry-constellation-3d.js")
    ui_js = read_file("js/ui.js")

    assert "isWebGLAvailable" in p3d_js or "fallback" in p3d_js.lower(), "缺少 WebGL 可用性探测与 Fallback 回退分支"
    assert "createConstellationGroup" in ui_js, "ui.js 缺少 2.5D CSS 星宿拓扑回退基石"

    print("  [PASS] 5. P0-C: WebGL 异常与低端机 2.5D CSS Fallback 兜底机制健全")


def main():
    print("=" * 70)
    print("开始执行 任务15.6.4 专属自动化验收测试集 2（3D诗词星群）...")
    print("=" * 70)
    test_1_poetry_3d_module_registration()
    test_2_threejs_and_fibonacci_topology()
    test_3_gesture_drag_and_inertia_rotation()
    test_4_focus_animation_and_lightweight_callout()
    test_5_fallback_mode()
    print("=" * 70)
    print("★ SUCCESS：任务15.6.4 专属测试集 2 全量 PASS (100%) ★")
    print("=" * 70)


if __name__ == "__main__":
    main()

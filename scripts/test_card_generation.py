#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务10东坡人生分享卡生成自动化单测
验证三类卡片 ViewModel 构建、标点避头尾换行规则、ES2017/Classic Script 合规性、离线安全与无外链
"""

import json
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

AVOID_START_PUNCTUATION = set(['，', '。', '！', '？', '；', '：', '、', '”', '’', '》', '）', '……', '—'])


def simulate_wrapped_text(text: str, max_chars_per_line: int = 16, max_lines: int = 10):
    """Python 模拟 CardCanvas 中的 drawWrappedText 换行与避头尾逻辑"""
    lines = []
    cur_line = ""

    for char in text:
        if char == '\n':
            lines.append(cur_line)
            cur_line = ""
            continue

        if len(cur_line) >= max_chars_per_line and len(cur_line) > 0:
            if char in AVOID_START_PUNCTUATION:
                cur_line += char
                lines.append(cur_line)
                cur_line = ""
                continue
            lines.append(cur_line)
            cur_line = char
        else:
            cur_line += char

    if cur_line:
        lines.append(cur_line)

    if len(lines) > max_lines:
        lines = lines[:max_lines]
        last = lines[-1]
        if len(last) > 2:
            lines[-1] = last[:-2] + '……'

    return lines


def test_card_canvas_compliance():
    print("[1] 检查 js/card_canvas.js 语法与基线合规性 (ES2017 / Classic Script / 离线安全)...")
    card_canvas_path = PROJECT_ROOT / "js" / "card_canvas.js"
    assert card_canvas_path.exists(), "js/card_canvas.js 不存在"

    content = card_canvas_path.read_text(encoding="utf-8")

    # 去除注释后检查代码合规性
    code_without_comments = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    code_without_comments = re.sub(r'//.*', '', code_without_comments)

    # 1.1 严禁 const / let
    assert not re.search(r'\bconst\s+', code_without_comments), "js/card_canvas.js 包含 const 声明"
    assert not re.search(r'\blet\s+', code_without_comments), "js/card_canvas.js 包含 let 声明"

    # 1.2 严禁 <a download> 或 .download 赋值行为
    assert not re.search(r'<\s*a[^>]*download', code_without_comments, re.IGNORECASE), "js/card_canvas.js 包含 <a download> 标签"
    assert not re.search(r'\.download\s*=', code_without_comments), "js/card_canvas.js 包含 .download 赋值行为"

    # 1.3 严禁 WebGL
    assert "webgl" not in code_without_comments.lower(), "js/card_canvas.js 不得引入 WebGL"

    # 1.4 严禁外部网络请求 (fetch, XMLHttpRequest, http:, https:)
    assert not re.search(r'\b(fetch|XMLHttpRequest)\b', code_without_comments), "js/card_canvas.js 不得发起网络请求"
    assert not re.search(r'https?://', code_without_comments), "js/card_canvas.js 不得包含外链 URL"

    # 1.5 验证命名空间挂载
    assert "SuShiUniverse.CardCanvas" in content, "未正确挂载 CardCanvas 到 SuShiUniverse 命名空间"

    # 1.6 验证三类卡片渲染函数存在
    assert "renderStationResultCard" in content, "缺失 renderStationResultCard"
    assert "renderDailySignCard" in content, "缺失 renderDailySignCard"
    assert "renderStationNodeCard" in content, "缺失 renderStationNodeCard"

    # 1.7 验证内存释放
    assert "canvas.width = 1" in content and "canvas.height = 1" in content, "缺失 canvas 内存释放逻辑"

    print("    -> js/card_canvas.js 基线合规性检查全部通过！")


def test_view_models_generation():
    print("[2] 验证三类卡片纯数据 ViewModel 规范与数据完整性...")

    data_dir = PROJECT_ROOT / "data"
    stations = json.loads((data_dir / "stations.json").read_text(encoding="utf-8"))
    moods = json.loads((data_dir / "moods.json").read_text(encoding="utf-8"))
    daily_items = json.loads((data_dir / "daily-dongpo.json").read_text(encoding="utf-8"))
    quotes = json.loads((data_dir / "quotes.json").read_text(encoding="utf-8"))
    works = json.loads((data_dir / "works.json").read_text(encoding="utf-8"))

    quotes_map = {q["id"]: q for q in quotes}
    works_map = {w["id"]: w for w in works}
    stations_map = {s["id"]: s for s in stations}

    # 2.1 验证 8 种测试结果状态下，人生站点卡数据有效
    print(f"    -> 验证 8 类测试心境结果卡 ViewModel (共 {len(moods)} 种)...")
    for m in moods:
        st_id = m.get("primary_station_id")
        station = stations_map.get(st_id)
        assert station, f"心境 {m['id']} 关联的站点不存在: {st_id}"
        q_id = m.get("recommended_quote_id") or station["quote_ids"][0]
        quote = quotes_map.get(q_id)
        assert quote, f"诗句不存在: {q_id}"
        work = works_map.get(quote["work_id"])
        assert work, f"作品不存在: {quote['work_id']}"

        # 模拟生成出的 ViewModel 字段
        vm = {
            "type": "station",
            "station_id": station["id"],
            "station_name": station["name"],
            "keywords": station["keywords"],
            "quote_text": quote["text"],
            "work_title": work["title"],
            "dongpo_view": station["dongpo_view"]
        }
        assert vm["station_name"] and len(vm["keywords"]) >= 2
        assert len(vm["quote_text"]) >= 6
        assert len(vm["dongpo_view"]) >= 10

    # 2.2 验证 30 条今日东坡签 ViewModel
    print(f"    -> 验证 30 条今日东坡签 ViewModel (共 {len(daily_items)} 条)...")
    for d in daily_items:
        quote = quotes_map.get(d["quote_id"])
        assert quote, f"今日东坡签 {d['id']} 诗句不存在: {d['quote_id']}"
        work = works_map.get(quote["work_id"])
        station = stations_map.get(d["station_id"])

        vm = {
            "type": "daily",
            "id": d["id"],
            "quote_text": quote["text"],
            "source_text": f"《{work['title']}》" if work else "苏轼",
            "dongpo_view": d["dongpo_view"],
            "today_action": d["today_action"],
            "station_name": station["name"] if station else ""
        }
        assert len(vm["quote_text"]) >= 5
        assert len(vm["dongpo_view"]) >= 10
        assert len(vm["today_action"]) >= 5

    # 2.3 验证 9 大人生站点行迹卡 ViewModel
    print(f"    -> 验证 9 大人生站点行迹卡 ViewModel (共 {len(stations)} 站)...")
    for st in stations:
        q_ids = st.get("quote_ids", [])
        q_id = q_ids[0] if q_ids else "quote_dingfengbo_01"
        quote = quotes_map.get(q_id)
        work = works_map.get(quote["work_id"]) if quote else None

        vm = {
            "type": "node",
            "station_id": st["id"],
            "station_name": st["name"],
            "station_time_label": st["time_label"],
            "station_place": st["place"],
            "quote_text": quote["text"] if quote else "",
            "work_title": work["title"] if work else "",
            "summary_fact": st["summary_fact"],
            "dongpo_view": st["dongpo_view"]
        }
        assert vm["station_name"] and vm["station_place"]
        assert len(vm["summary_fact"]) >= 10
        assert len(vm["dongpo_view"]) >= 10

    print("    -> 三类卡片 ViewModel 字段与外键引用校验全部通过！")


def test_punctuation_avoidance():
    print("[3] 验证中文标点避头尾算法...")
    # 测试用例：在行首恰好出现逗号、句号、感叹号、双引号等
    sample_text = "莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。"
    lines = simulate_wrapped_text(sample_text, max_chars_per_line=8, max_lines=6)

    for i, line in enumerate(lines):
        assert len(line) > 0
        first_char = line[0]
        assert first_char not in AVOID_START_PUNCTUATION, f"第 {i+1} 行行首出现避头标点: '{first_char}' (整行: '{line}')"

    print(f"    -> 模拟文本换行 ({len(lines)} 行) 成功，无任何违规行首标点！")


def test_index_html_integration():
    print("[4] 验证 index.html 中 card_canvas.js 依赖注入与位置...")
    index_html = (PROJECT_ROOT / "index.html").read_text(encoding="utf-8")
    assert '<script src="./js/card_canvas.js"></script>' in index_html, "index.html 未引入 js/card_canvas.js"

    # 验证引入顺序：必须在 namespace.js 和 ui.js 之后
    idx_ns = index_html.find('./js/namespace.js')
    idx_ui = index_html.find('./js/ui.js')
    idx_canvas = index_html.find('./js/card_canvas.js')
    idx_views = index_html.find('./js/views.js')

    assert idx_ns < idx_canvas, "card_canvas.js 必须在 namespace.js 之后"
    assert idx_ui < idx_canvas, "card_canvas.js 必须在 ui.js 之后"
    assert idx_canvas < idx_views, "card_canvas.js 必须在 views.js 之前"
    print("    -> index.html 脚本引入顺序完全合规！")


def main():
    print("==================================================")
    print("东坡人生分享卡自动化单元测试")
    print("==================================================")

    test_card_canvas_compliance()
    test_view_models_generation()
    test_punctuation_avoidance()
    test_index_html_integration()

    print("==================================================")
    print("全部单测用例执行完毕，100% 通过！")
    print("==================================================")


if __name__ == "__main__":
    main()

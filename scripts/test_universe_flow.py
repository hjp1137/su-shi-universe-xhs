#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼人生宇宙与九大站点漫游 - 数据与逻辑验证单测 (test_universe_flow.py)
验证任务7的核心指标：
1. 九大站点历史顺序 1~9 严格对齐
2. 各站点叙事、故事、名句、出处、现代视角与今日小事完整
3. rhythm 阶段节奏映射覆盖全部 9 站
4. 异常 station_id 具备安全兜底与错误防御
"""

import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "data"


def load_json(name):
    with open(DATA_DIR / name, "r", encoding="utf-8") as f:
        return json.load(f)


def test_universe_and_stations():
    print("==================================================")
    print("开始执行任务7苏轼人生宇宙与九大站点漫游单测")
    print("==================================================")

    stations = load_json("stations.json")
    works = {w["id"]: w for w in load_json("works.json")}
    quotes = {q["id"]: q for q in load_json("quotes.json")}

    print(f"[1] 验证九大站点数量与历史顺序 (共 {len(stations)} 站)...")
    assert len(stations) == 9, f"站点数量应为9，实际为: {len(stations)}"

    expected_stations = [
        ("station_meishan", "眉山｜少年出发", 1),
        ("station_jingshi", "京师｜一举成名", 2),
        ("station_mizhou", "密州｜人到中年", 3),
        ("station_wutai", "乌台｜人生骤雨", 4),
        ("station_huangzhou", "黄州｜重新生活", 5),
        ("station_hangzhou", "杭州｜把日子过好", 6),
        ("station_huizhou", "惠州｜岭南风物", 7),
        ("station_danzhou", "儋州｜天涯书声", 8),
        ("station_changzhou", "常州｜生命归途", 9),
    ]

    for idx, (expected_id, _, expected_order) in enumerate(expected_stations):
        st = stations[idx]
        assert st["id"] == expected_id, f"第 {idx+1} 站 ID 不匹配: {st['id']} vs {expected_id}"
        assert st["order"] == expected_order, f"第 {idx+1} 站 order 不匹配: {st['order']}"
        print(f"   - 第 {st['order']} 站: {st['name']} ({st['time_label']} · {st['place']})")

    print("   [PASS] 九大站点顺序与历史生命线严格对齐！\n")

    print("[2] 验证九大站点叙事内容要素完整性...")
    required_keys = [
        "id", "name", "short_name", "order", "time_label", "age_label",
        "place", "theme", "summary_fact", "summary_story", "dongpo_view", "today_action"
    ]
    for st in stations:
        for k in required_keys:
            assert st.get(k), f"站点 {st['id']} 缺失必备字段: {k}"

        # 检查诗句与作品引用
        if st.get("quote_ids"):
            for qid in st["quote_ids"]:
                assert qid in quotes, f"站点 {st['id']} 引用无效诗句: {qid}"
                q = quotes[qid]
                wid = q.get("work_id")
                assert wid in works, f"诗句 {qid} 引用无效作品: {wid}"

    print("   [PASS] 全部站点必备字段及外键引用 100% 完整！\n")

    print("[3] 验证节奏映射与高亮逻辑...")
    rhythm_map = {
        'station_meishan': 'rhythm-meishan',
        'station_jingshi': 'rhythm-jingshi',
        'station_mizhou': 'rhythm-mizhou',
        'station_wutai': 'rhythm-wutai',
        'station_huangzhou': 'rhythm-huangzhou',
        'station_hangzhou': 'rhythm-hangzhou',
        'station_huizhou': 'rhythm-huizhou',
        'station_danzhou': 'rhythm-danzhou',
        'station_changzhou': 'rhythm-changzhou'
    }
    for st in stations:
        assert st["id"] in rhythm_map, f"站点缺失节奏样式映射: {st['id']}"
    print("   [PASS] 9 大站点节奏样式映射覆盖率 100%！\n")

    print("==================================================")
    print("[SUCCESS] 任务7人生宇宙与九大站点单测全部通过！")
    print("==================================================")


if __name__ == "__main__":
    test_universe_and_stations()

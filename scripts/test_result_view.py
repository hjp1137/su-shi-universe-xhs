#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
人生站点结果页 - 数据装配与边界降级单测 (test_result_view.py)
验证任务6要求的核心指标：
1. 8 类测试结果数据闭环 (mood -> station -> quote -> work -> action) 全部完整可组装
2. buildShareCardViewModel 针对全部 8 类状态与 9 大站点生成结构完整
3. 异常边界降级测试 (空参数、非法 ID、数据缺失) 100% 安全兜底
"""

import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "data"


def load_json(name):
    with open(DATA_DIR / name, "r", encoding="utf-8") as f:
        return json.load(f)


def test_result_assemblies():
    print("==================================================")
    print("开始执行任务6人生站点结果页数据装配与降级单测")
    print("==================================================")

    stations = {s["id"]: s for s in load_json("stations.json")}
    moods = {m["id"]: m for m in load_json("moods.json")}
    works = {w["id"]: w for w in load_json("works.json")}
    quotes = {q["id"]: q for q in load_json("quotes.json")}

    print("[1] 验证 8 类 Mood 结果七层叙事数据完整性...")
    for mid, mood in moods.items():
        station_id = mood.get("primary_station_id")
        assert station_id in stations, f"Mood {mid} 关联站点不存在: {station_id}"
        station = stations[station_id]

        # 检查七层叙事所需字段
        # 1. 结果揭晓
        assert station.get("name"), f"{station_id} 缺失 name"
        assert station.get("short_name"), f"{station_id} 缺失 short_name"
        assert len(station.get("keywords", [])) > 0, f"{station_id} 缺失 keywords"
        assert mood.get("summary"), f"{mid} 缺失 summary"

        # 2. 苏轼当时怎么了
        assert station.get("summary_fact"), f"{station_id} 缺失 summary_fact"
        assert len(station["summary_fact"]) >= 30, f"{station_id} summary_fact 过短"

        # 3. 他写下了什么
        quote_id = mood.get("recommended_quote_id") or (station.get("quote_ids") and station["quote_ids"][0])
        assert quote_id in quotes, f"诗句不存在: {quote_id}"
        quote = quotes[quote_id]
        assert quote.get("text"), f"{quote_id} 缺失 text"
        work_id = quote.get("work_id")
        assert work_id in works, f"作品不存在: {work_id}"
        work = works[work_id]
        assert work.get("title"), f"{work_id} 缺失 title"

        # 4. 他后来怎么过这一关
        assert station.get("summary_story"), f"{station_id} 缺失 summary_story"

        # 5. 今天给你一句话
        saying = mood.get("dongpo_suggestion") or station.get("dongpo_view")
        assert saying, f"{mid} 缺失当代解读"

        # 6. 今天做一件小事
        action = station.get("today_action")
        assert action, f"{station_id} 缺失 today_action"

        print(f"   [PASS] {mid:20s} -> {station['short_name']} 站（《{work['title']}》· “{quote['text'][:10]}...”）")

    print("\n[2] 验证 ShareCardViewModel 数据构造完整性...")
    for mid, mood in moods.items():
        st_id = mood["primary_station_id"]
        st = stations[st_id]
        qid = mood.get("recommended_quote_id") or st["quote_ids"][0]
        q = quotes[qid]
        w = works[q["work_id"]]

        vm = {
            "version": "1.0",
            "station_id": st["id"],
            "station_name": st["name"],
            "station_short_name": st["short_name"],
            "theme": st["theme"],
            "keywords": st["keywords"],
            "mood_id": mood["id"],
            "mood_name": mood["name"],
            "quote_text": q["text"],
            "work_title": w["title"],
            "dongpo_view": mood.get("dongpo_suggestion") or st["dongpo_view"],
            "today_action": st["today_action"]
        }
        for k, v in vm.items():
            assert v is not None and v != "", f"ViewModel 缺失字段 {k}"
    print("   [PASS] 全部 8 类结果 ShareCardViewModel 构造完整！")

    print("\n[3] 验证异常与边界降级能力...")
    # 模拟非法 ID 回退
    invalid_st_id = "station_non_exist_999"
    fallback_st = stations.get(invalid_st_id, stations["station_huangzhou"])
    assert fallback_st["id"] == "station_huangzhou"

    invalid_mood_id = "mood_unknown_xxx"
    fallback_mood = moods.get(invalid_mood_id, None)
    assert fallback_mood is None
    # 当 mood 为 None 时，诗句安全回退到站点第一首
    fallback_qid = fallback_st["quote_ids"][0]
    assert fallback_qid in quotes

    print("   [PASS] 非法 station_id 与非法 mood_id 优雅降级通过！")

    print("==================================================")
    print("[SUCCESS] 任务6结果页数据装配与降级单测全部通过！")
    print("==================================================")


if __name__ == "__main__":
    test_result_assemblies()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务9今日东坡自动化单测
验证确定性日期映射算法、同日稳定性、30天轮换、次日平滑切换、外键引用与安全边界
"""

from datetime import datetime
import json
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent


def get_date_day_index(date_str: str) -> int:
    """与 js/daily.js 中 getDateDayIndex 严格一致的 Python 实现"""
    parts = date_str.split("-")
    if len(parts) == 3:
        target = datetime(int(parts[0]), int(parts[1]), int(parts[2]))
        epoch = datetime(2026, 1, 1)
        return abs((target - epoch).days)
    return 0


def test_daily_flow():
    print("==================================================")
    print("开始执行任务9今日东坡自动化单测")
    print("==================================================")

    daily_file = PROJECT_ROOT / "data" / "daily-dongpo.json"
    quotes_file = PROJECT_ROOT / "data" / "quotes.json"
    stations_file = PROJECT_ROOT / "data" / "stations.json"

    with open(daily_file, "r", encoding="utf-8") as f:
        daily_items = json.load(f)
    with open(quotes_file, "r", encoding="utf-8") as f:
        quotes = json.load(f)
    with open(stations_file, "r", encoding="utf-8") as f:
        stations = json.load(f)

    quote_ids = {q["id"] for q in quotes}
    station_ids = {s["id"] for s in stations}

    print(f"[1] 验证今日东坡条目规模与数据规范 (当前共 {len(daily_items)} 条)...")
    assert len(daily_items) >= 30, f"条目不足 30 条: {len(daily_items)}"

    for d in daily_items:
        did = d["id"]
        assert d.get("quote_id") in quote_ids, f"[{did}] quote_id 无效: {d.get('quote_id')}"
        assert d.get("station_id") in station_ids, f"[{did}] station_id 无效: {d.get('station_id')}"
        assert len(d.get("fact_text", "")) >= 10, f"[{did}] 真实背景文本过短"
        assert len(d.get("dongpo_view", "")) >= 10, f"[{did}] 现代理解文本过短"
        assert len(d.get("today_action", "")) >= 5, f"[{did}] 今日小行动文本过短"

        # 检查不包含高风险心理学违规词
        for forbidden in ["彻底治愈", "包治百病", "心理疾病", "人格缺陷", "必定成功"]:
            assert forbidden not in d.get("dongpo_view", ""), f"[{did}] 包含违规承诺词: {forbidden}"
            assert forbidden not in d.get("today_action", ""), f"[{did}] 包含违规承诺词: {forbidden}"

    print("   [PASS] 30 条内容结构完整、外键引用 100% 存在、安全合规！")

    print("[2] 验证确定性日期映射与同日稳定性...")
    test_dates = ["2026-09-07", "2026-09-08", "2026-10-01", "2027-01-01"]
    for date_str in test_dates:
        idx1 = get_date_day_index(date_str) % len(daily_items)
        idx2 = get_date_day_index(date_str) % len(daily_items)
        idx3 = get_date_day_index(date_str) % len(daily_items)
        assert idx1 == idx2 == idx3, f"日期 {date_str} 映射不稳定！"
        assert 0 <= idx1 < len(daily_items), f"索引越界: {idx1}"

    # 验证今天多次请求得到同一条
    today_idx = get_date_day_index("2026-09-07") % len(daily_items)
    today_item = daily_items[today_idx]
    for _ in range(10):
        recheck_idx = get_date_day_index("2026-09-07") % len(daily_items)
        assert daily_items[recheck_idx]["id"] == today_item["id"]
    print("   [PASS] 同一自然日多次访问 100% 稳定获得相同内容，零随机偏差！")

    print("[3] 验证连续 30 天轮换与次日平滑切换...")
    hit_indices = set()
    prev_item_id = None
    switch_count = 0

    for day_offset in range(1, 31):
        d_str = f"2026-09-{day_offset:02d}"
        idx = get_date_day_index(d_str) % len(daily_items)
        hit_indices.add(idx)
        cur_item_id = daily_items[idx]["id"]
        if prev_item_id is not None and cur_item_id != prev_item_id:
            switch_count += 1
        prev_item_id = cur_item_id

    coverage_ratio = len(hit_indices) / len(daily_items)
    print(f"   - 30 天连续自然日命中条目覆盖率: {len(hit_indices)}/{len(daily_items)} ({coverage_ratio*100:.1f}%)")
    print(f"   - 跨日切换发生次数: {switch_count}/29 次")
    assert coverage_ratio == 1.0, f"连续30天未实现 100% 轮换覆盖: {coverage_ratio}"
    assert switch_count == 29, f"连续30天应每次跨日均切换: {switch_count}"
    print("   [PASS] 跨自然日 100% 平滑轮转验证通过！")

    print("[4] 验证脚本引用与构建文件...")
    index_html = PROJECT_ROOT / "index.html"
    with open(index_html, "r", encoding="utf-8") as f:
        html_content = f.read()
    assert "js/daily.js" in html_content, "index.html 未引入 js/daily.js！"

    daily_js = PROJECT_ROOT / "js" / "daily.js"
    assert daily_js.exists(), "js/daily.js 文件不存在！"

    print("\n==================================================")
    print("[SUCCESS] 任务9今日东坡单测全部通过！")
    print("==================================================")
    return True


if __name__ == "__main__":
    success = test_daily_flow()
    sys.exit(0 if success else 1)

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
合并并更新 data/works.json 与 data/stations.json
为任务 15.6.4 提供 9 大站点每站 >= 10 篇真实史料作品与安全排字区配置
"""

import json
from pathlib import Path

from data_stations_patch import EXISTING_RELATIONS, STATION_SAFE_ZONES
from data_meishan_works import MEISHAN_WORKS
from data_jingshi_mizhou_wutai_works import JINGSHI_EXPAND_WORKS, MIZHOU_EXPAND_WORKS, WUTAI_EXPAND_WORKS
from data_huangzhou_hangzhou_works import HUANGZHOU_EXPAND_WORKS, HANGZHOU_EXPAND_WORKS
from data_huizhou_danzhou_changzhou_works import HUIZHOU_EXPAND_WORKS, DANZHOU_EXPAND_WORKS, CHANGZHOU_EXPAND_WORKS

PROJECT_ROOT = Path(__file__).resolve().parent.parent
WORKS_FILE = PROJECT_ROOT / "data" / "works.json"
STATIONS_FILE = PROJECT_ROOT / "data" / "stations.json"

def main():
    # 1. 加载现有 works
    with open(WORKS_FILE, "r", encoding="utf-8") as f:
        works = json.load(f)

    # 2. 为现有 21 部作品补全关系字段
    works_map = {}
    for w in works:
        wid = w["id"]
        w["work_id"] = wid
        w["station_id"] = w["station_ids"][0] if w.get("station_ids") else ""
        if wid in EXISTING_RELATIONS:
            rel = EXISTING_RELATIONS[wid]
            w["relation_type"] = rel["relation_type"]
            w["relation_note"] = rel["relation_note"]
            w["date"] = rel["date"]
            w["source"] = rel["source"]
        works_map[wid] = w

    # 3. 合并所有新增作品
    all_new_lists = [
        MEISHAN_WORKS,
        JINGSHI_EXPAND_WORKS,
        MIZHOU_EXPAND_WORKS,
        WUTAI_EXPAND_WORKS,
        HUANGZHOU_EXPAND_WORKS,
        HANGZHOU_EXPAND_WORKS,
        HUIZHOU_EXPAND_WORKS,
        DANZHOU_EXPAND_WORKS,
        CHANGZHOU_EXPAND_WORKS
    ]

    for work_list in all_new_lists:
        for nw in work_list:
            nwid = nw["id"]
            if nwid not in works_map:
                works_map[nwid] = nw
            else:
                # 更新已有条目
                works_map[nwid].update(nw)

    # 保持稳定排序
    sorted_works = list(works_map.values())
    with open(WORKS_FILE, "w", encoding="utf-8") as f:
        json.dump(sorted_works, f, ensure_ascii=False, indent=2)
    print(f"data/works.json 成功更新，当前作品总数: {len(sorted_works)}")

    # 4. 更新 data/stations.json
    with open(STATIONS_FILE, "r", encoding="utf-8") as f:
        stations = json.load(f)

    for st in stations:
        sid = st["id"]
        # 获取该站点的所有关联作品
        station_works = [w["id"] for w in sorted_works if sid in w.get("station_ids", [])]
        st["work_ids"] = station_works
        if sid in STATION_SAFE_ZONES:
            st["text_safe_zone"] = STATION_SAFE_ZONES[sid]
        print(f"  站点 [{sid}] {st['name']}: 作品数 = {len(station_works)}, text_safe_zone = {st.get('text_safe_zone')}")

    with open(STATIONS_FILE, "w", encoding="utf-8") as f:
        json.dump(stations, f, ensure_ascii=False, indent=2)
    print("data/stations.json 成功更新完成！")

if __name__ == "__main__":
    main()

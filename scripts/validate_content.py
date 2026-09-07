#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙 - 内容数据校验脚本 (validate_content.py)
严格遵循 docs/02、docs/06 及 tasks/任务2 校验门禁
"""

import sys
import json
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "data"

MAX_FILE_SIZE = 2 * 1024 * 1024       # 2 MiB 告警
MAX_TOTAL_SIZE = 5 * 1024 * 1024      # 5 MiB 告警

RISK_WORDS = ["治愈", "治疗", "诊断", "抑郁症", "焦虑症", "保证", "一定会", "名医", "药到病除"]

REQUIRED_FILES = [
    "sources.json",
    "works.json",
    "quotes.json",
    "events.json",
    "stations.json",
    "moods.json",
    "quiz.json",
    "daily-dongpo.json"
]


def load_json(filepath: Path):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f), None
    except Exception as e:
        return None, str(e)


def validate():
    errors = []
    warnings = []

    print("[1/4] 检查数据文件完整性与体积预算...")
    total_size = 0
    loaded_data = {}

    for fname in REQUIRED_FILES:
        fpath = DATA_DIR / fname
        if not fpath.exists():
            errors.append(f"缺失必要数据文件: data/{fname}")
            continue

        fsize = fpath.stat().st_size
        total_size += fsize
        if fsize > MAX_FILE_SIZE:
            warnings.append(f"文件 data/{fname} 体积超过 2 MiB ({fsize / 1024 / 1024:.2f} MiB)")

        data, err = load_json(fpath)
        if err:
            errors.append(f"文件 data/{fname} JSON 解析失败: {err}")
        else:
            loaded_data[fname] = data

    if total_size > MAX_TOTAL_SIZE:
        warnings.append(f"生产数据总文本体积接近/超过 5 MiB ({total_size / 1024 / 1024:.2f} MiB)")

    print(f"  已装载 {len(loaded_data)} 个数据文件，总大小: {total_size / 1024:.2f} KB")

    if errors:
        for e in errors:
            print(f"  [ERROR] {e}")
        return False, errors, warnings

    # 提取各实体集合
    sources = {item["id"]: item for item in loaded_data.get("sources.json", [])}
    works = {item["id"]: item for item in loaded_data.get("works.json", [])}
    quotes = {item["id"]: item for item in loaded_data.get("quotes.json", [])}
    events = {item["id"]: item for item in loaded_data.get("events.json", [])}
    stations = {item["id"]: item for item in loaded_data.get("stations.json", [])}
    moods = {item["id"]: item for item in loaded_data.get("moods.json", [])}
    quiz_data = loaded_data.get("quiz.json", {})
    daily_items = loaded_data.get("daily-dongpo.json", [])

    print("[2/4] 检查全局 ID 唯一性与审核状态...")
    all_ids = {}

    def register_id(item_id, entity_type):
        if not item_id or not isinstance(item_id, str):
            errors.append(f"{entity_type} 存在非法空 ID")
            return
        if item_id in all_ids:
            errors.append(f"ID 冲突重复: {item_id} (已存在于 {all_ids[item_id]}, 当前为 {entity_type})")
        else:
            all_ids[item_id] = entity_type

    for sid in sources: register_id(sid, "sources")
    for wid in works: register_id(wid, "works")
    for qid in quotes: register_id(qid, "quotes")
    for eid in events: register_id(eid, "events")
    for stid in stations: register_id(stid, "stations")
    for mid in moods: register_id(mid, "moods")
    for q in quiz_data.get("questions", []): register_id(q["id"], "quiz_questions")
    for d in daily_items: register_id(d["id"], "daily-dongpo")

    # 检查 review_status
    def check_review_status(entity_dict, entity_name):
        for item_id, item in entity_dict.items():
            status = item.get("review_status")
            if status not in ["approved", "published"]:
                errors.append(f"{entity_name} [{item_id}] 审核状态不合格 ({status})，禁止进入生产包")

    check_review_status(sources, "sources")
    check_review_status(works, "works")
    check_review_status(quotes, "quotes")
    check_review_status(events, "events")
    check_review_status(stations, "stations")
    check_review_status(moods, "moods")
    for d in daily_items:
        if d.get("review_status") not in ["approved", "published"]:
            errors.append(f"daily-dongpo [{d.get('id')}] 审核状态不合格 ({d.get('review_status')})")

    print("[3/4] 检查跨实体外键引用完整性...")
    # 1. 检查 works
    for wid, w in works.items():
        for stid in w.get("station_ids", []):
            if stid not in stations:
                errors.append(f"work [{wid}] 引用了不存在的 station_id: {stid}")
        for s_id in w.get("source_ids", []):
            if s_id not in sources:
                errors.append(f"work [{wid}] 引用了不存在的 source_id: {s_id}")

    # 2. 检查 quotes
    for qid, q in quotes.items():
        w_id = q.get("work_id")
        if w_id and w_id not in works:
            errors.append(f"quote [{qid}] 引用了不存在的 work_id: {w_id}")
        for s_id in q.get("source_ids", []):
            if s_id not in sources:
                errors.append(f"quote [{qid}] 引用了不存在的 source_id: {s_id}")

    # 3. 检查 events
    for eid, ev in events.items():
        for stid in ev.get("station_ids", []):
            if stid not in stations:
                errors.append(f"event [{eid}] 引用了不存在的 station_id: {stid}")
        for wid in ev.get("related_work_ids", []):
            if wid not in works:
                errors.append(f"event [{eid}] 引用了不存在的 work_id: {wid}")
        for s_id in ev.get("source_ids", []):
            if s_id not in sources:
                errors.append(f"event [{eid}] 引用了不存在的 source_id: {s_id}")

    # 4. 检查 stations
    if len(stations) != 9:
        errors.append(f"人生站点数量不正确，必须为 9 个，当前为 {len(stations)} 个")

    for stid, st in stations.items():
        for wid in st.get("work_ids", []):
            if wid not in works:
                errors.append(f"station [{stid}] 引用了不存在的 work_id: {wid}")
        for qid in st.get("quote_ids", []):
            if qid not in quotes:
                errors.append(f"station [{stid}] 引用了不存在的 quote_id: {qid}")
        for eid in st.get("event_ids", []):
            if eid not in events:
                errors.append(f"station [{stid}] 引用了不存在的 event_id: {eid}")
        for s_id in st.get("source_ids", []):
            if s_id not in sources:
                errors.append(f"station [{stid}] 引用了不存在的 source_id: {s_id}")

    # 5. 检查 moods
    if len(moods) != 8:
        errors.append(f"用户生活状态数量必须为 8 类，当前为 {len(moods)} 类")
    for mid, m in moods.items():
        pst = m.get("primary_station_id")
        if pst and pst not in stations:
            errors.append(f"mood [{mid}] primary_station_id 悬空: {pst}")
        for stid in m.get("candidate_station_ids", []):
            if stid not in stations:
                errors.append(f"mood [{mid}] 候选站点悬空: {stid}")
        rec_q = m.get("recommended_quote_id")
        if rec_q and rec_q not in quotes:
            errors.append(f"mood [{mid}] 推荐诗句悬空: {rec_q}")

    # 6. 检查 daily-dongpo
    if len(daily_items) < 30:
        errors.append(f"今日东坡条目数量不足 30 条，当前为 {len(daily_items)} 条")
    for d in daily_items:
        did = d.get("id")
        qid = d.get("quote_id")
        stid = d.get("station_id")
        if not qid or qid not in quotes:
            errors.append(f"daily-dongpo [{did}] quote_id 悬空或无效: {qid}")
        if not stid or stid not in stations:
            errors.append(f"daily-dongpo [{did}] station_id 悬空或无效: {stid}")

    # 7. 检查 quiz 权重与可达性
    quiz_questions = quiz_data.get("questions", [])
    if len(quiz_questions) < 5 or len(quiz_questions) > 8:
        warnings.append(f"测试题目建议在 5-8 题，当前为 {len(quiz_questions)} 题")

    reachable_moods = set()
    for q in quiz_questions:
        for opt in q.get("options", []):
            scores = opt.get("scores", {})
            for m_key, score_val in scores.items():
                if m_key not in moods:
                    errors.append(f"quiz [{q['id']}] 选项 [{opt['id']}] 引用了不存在的 mood_id: {m_key}")
                if score_val > 0:
                    reachable_moods.add(m_key)

    unreachable_moods = set(moods.keys()) - reachable_moods
    if unreachable_moods:
        errors.append(f"测试题库中存在不可达状态 (无任何选项能给该状态加分): {unreachable_moods}")

    print("[4/4] 敏感词与风险用语扫描...")
    def scan_risk_words(text, location):
        if not isinstance(text, str):
            return
        for rw in RISK_WORDS:
            if rw in text:
                warnings.append(f"{location} 包含高风险/敏感词: '{rw}'，请人工复核是否构成违规疗效承诺")

    for mid, m in moods.items():
        scan_risk_words(m.get("summary", ""), f"mood [{mid}].summary")
        scan_risk_words(m.get("dongpo_suggestion", ""), f"mood [{mid}].dongpo_suggestion")

    for d in daily_items:
        scan_risk_words(d.get("dongpo_view", ""), f"daily [{d['id']}].dongpo_view")
        scan_risk_words(d.get("today_action", ""), f"daily [{d['id']}].today_action")

    # 输出结果
    print("\n================ 校验结果汇总 ================")
    if errors:
        print(f"FAILED: 发现 {len(errors)} 项严重错误，{len(warnings)} 项警告：")
        for err in errors:
            print(f"  [ERROR] {err}")
        for w in warnings:
            print(f"  [WARN] {w}")
        return False, errors, warnings

    print(f"PASS: 全部数据合规，发现 0 项错误，{len(warnings)} 项警告。")
    for w in warnings:
        print(f"  [WARN] {w}")
    return True, errors, warnings


if __name__ == "__main__":
    success, _, _ = validate()
    sys.exit(0 if success else 1)

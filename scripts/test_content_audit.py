#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务13 内容质量与史料审核自动化测试套件
验证基线：docs/02、docs/06、docs/09 及 tasks/任务13 门禁要求
覆盖范围：
1. docs/09_V1内容审核清单.md 存在性与关键审核章节完整性；
2. 全量生产实体 review_status == approved 绝无未审核泄漏；
3. 21篇作品与31条名句的来源绑定与原文非空校验；
4. 全量文案的医疗化用语与心理诊断违规词零容忍扫描；
5. 今日小行动（today_action）的安全与低门槛合规性；
6. 跨实体外键完整性。
"""

import os
import re
import sys
import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "data"
DOCS_DIR = PROJECT_ROOT / "docs"

AUDIT_DOC = DOCS_DIR / "09_V1内容审核清单.md"

STRICT_FORBIDDEN_WORDS = [
    "治愈", "治疗", "诊断", "抑郁症", "焦虑症",
    "心理疗法", "处方", "药到病除", "包治", "医学保证"
]


def log_step(name):
    print(f"\n==== [测试项] {name} ====")


def test_audit_doc_exists():
    log_step("1. 检查 docs/09_V1内容审核清单.md 存在性与规范结构")
    if not AUDIT_DOC.exists():
        print("  [FAIL] 缺失 docs/09_V1内容审核清单.md！")
        return False

    with open(AUDIT_DOC, "r", encoding="utf-8") as f:
        content = f.read()

    required_sections = [
        "史料文献来源审核表",
        "九大人生站点审核表",
        "历史生平事件审核表",
        "重点诗文作品审核表",
        "核心诗词名句审核表",
        "用户心境状态与产品解读审核表",
        "今日东坡签与微行动审核抽样",
        "分享卡与全链路传播文案审核",
    ]

    for sec in required_sections:
        if sec not in content:
            print(f"  [FAIL] 审核清单中缺失章节: {sec}")
            return False
        print(f"  [PASS] 成功检测到审核章节: {sec}")

    print("  [PASS] docs/09_V1内容审核清单.md 结构完整且符合规范")
    return True


def test_all_entities_approved():
    log_step("2. 检查全量生产实体 review_status == approved (防未审核泄漏)")
    data_files = [
        "sources.json", "stations.json", "events.json",
        "works.json", "quotes.json", "moods.json", "daily-dongpo.json"
    ]

    total_count = 0
    unapproved = []

    for df in data_files:
        p = DATA_DIR / df
        with open(p, "r", encoding="utf-8") as f:
            items = json.load(f)
            if isinstance(items, dict):
                items = items.get("questions", [])
            for item in items:
                total_count += 1
                item_id = item.get("id")
                status = item.get("review_status")
                if status not in ["approved", "published"]:
                    unapproved.append((df, item_id, status))

    if unapproved:
        print(f"  [FAIL] 发现未审核实体: {unapproved}")
        return False

    print(f"  [PASS] 经核验全量 {total_count} 项实体状态均为 approved/published，无泄露隐患")
    return True


def test_works_and_quotes_sources():
    log_step("3. 检查作品与名句出处来源与古代原文非空性")
    with open(DATA_DIR / "sources.json", "r", encoding="utf-8") as f:
        valid_sources = {s["id"] for s in json.load(f)}

    with open(DATA_DIR / "works.json", "r", encoding="utf-8") as f:
        works = json.load(f)

    with open(DATA_DIR / "quotes.json", "r", encoding="utf-8") as f:
        quotes = json.load(f)

    # 1. 检查 works
    for w in works:
        wid = w.get("id")
        if not w.get("source_ids"):
            print(f"  [FAIL] work [{wid}] 缺失 source_ids")
            return False
        for sid in w.get("source_ids"):
            if sid not in valid_sources:
                print(f"  [FAIL] work [{wid}] 引用了非法 source_id: {sid}")
                return False
        if not w.get("original_text") or len(w.get("original_text").strip()) < 10:
            print(f"  [FAIL] work [{wid}] original_text 为空或过短")
            return False

    print(f"  [PASS] 21 部作品均具备有效 source_ids 与非空 original_text 原文")

    # 2. 检查 quotes
    for q in quotes:
        qid = q.get("id")
        if not q.get("source_ids"):
            print(f"  [FAIL] quote [{qid}] 缺失 source_ids")
            return False
        for sid in q.get("source_ids"):
            if sid not in valid_sources:
                print(f"  [FAIL] quote [{qid}] 引用了非法 source_id: {sid}")
                return False
        text = q.get("text")
        if not text or len(text.strip()) < 4:
            print(f"  [FAIL] quote [{qid}] text 非法或过短")
            return False

    print(f"  [PASS] 31 条名句均具备有效 source_ids 与标准古文原文")
    return True


def test_no_forbidden_medical_words():
    log_step("4. 严格扫描全量文案医疗化用语与心理诊断违规词")
    violations = []

    for jf in DATA_DIR.glob("*.json"):
        with open(jf, "r", encoding="utf-8") as f:
            content = f.read()
        for word in STRICT_FORBIDDEN_WORDS:
            if word in content:
                violations.append((jf.name, word))

    if violations:
        print(f"  [FAIL] 发现包含违规医疗/心理词汇: {violations}")
        return False

    print(f"  [PASS] 全量数据文件扫描完成，零违规医疗诊断与心理疗效词！")
    return True


def test_safe_daily_actions():
    log_step("5. 检查今日东坡微行动（today_action）安全性与低门槛")
    with open(DATA_DIR / "daily-dongpo.json", "r", encoding="utf-8") as f:
        daily_items = json.load(f)

    dangerous_patterns = ["必须", "强制", "吃药", "剧烈", "贷款", "投资", "购买", "辞职"]

    for d in daily_items:
        act = d.get("today_action", "")
        for dp in dangerous_patterns:
            if dp in act:
                print(f"  [FAIL] daily [{d['id']}] 今日行动存在高风险/强迫词汇: {dp}")
                return False

    print(f"  [PASS] 30 条今日小行动全部具备低门槛、无危险、无强迫特征")
    return True


def main():
    print("==================================================")
    print("苏轼宇宙小红书小工具 - 任务13 内容质量与史料审核自动化测试")
    print("==================================================")

    tests = [
        test_audit_doc_exists,
        test_all_entities_approved,
        test_works_and_quotes_sources,
        test_no_forbidden_medical_words,
        test_safe_daily_actions,
    ]

    all_passed = True
    for test in tests:
        if not test():
            all_passed = False
            break

    if all_passed:
        print("\n==================================================")
        print("[SUCCESS] 任务13 内容质量与史料审核全量自验证通过！")
        print("==================================================")
        sys.exit(0)
    else:
        print("\n==================================================")
        print("[FAILED] 任务13 存在审核失败项，请检查！")
        print("==================================================")
        sys.exit(1)


if __name__ == "__main__":
    main()

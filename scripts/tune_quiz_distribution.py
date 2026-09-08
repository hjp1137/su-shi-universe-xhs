#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
tune_quiz_distribution.py: 测试均衡度优化
"""

import json
import random
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
quiz_js = (PROJECT_ROOT / "js" / "quiz.js").read_text(encoding="utf-8")
bank_match = re.search(r"var EXPERIMENT_BANK = (\[.*?\]);\s*\n\s*/\*\*", quiz_js, re.DOTALL)
if not bank_match:
    bank_match = re.search(r"var EXPERIMENT_BANK = (\[.*?\]);", quiz_js, re.DOTALL)

raw_bank_str = bank_match.group(1)
cleaned_js = re.sub(r"//.*?\n", "\n", raw_bank_str)
cleaned_js = re.sub(r"([{,]\s*)([a-zA-Z0-9_]+)\s*:", r'\1"\2":', cleaned_js)
cleaned_js = cleaned_js.replace("'", '"')
cleaned_js = re.sub(r",\s*([\]}])", r"\1", cleaned_js)
EXPERIMENT_BANK = json.loads(cleaned_js)

dim_map = {}
for q in EXPERIMENT_BANK:
    dim = q["dimension"]
    dim_map.setdefault(dim, []).append(q)

MOOD_IDS = [
    'mood_anxious',
    'mood_overthinking',
    'mood_work_stuck',
    'mood_lost',
    'mood_misunderstood',
    'mood_tired',
    'mood_lonely',
    'mood_ordinary'
]

STATIONS = [
    'station_meishan',
    'station_jingshi',
    'station_mizhou',
    'station_wutai',
    'station_huangzhou',
    'station_hangzhou',
    'station_huizhou',
    'station_danzhou',
    'station_changzhou'
]

BASE_WEIGHTS = {
    'mood_anxious': 2.50,
    'mood_overthinking': 1.81,
    'mood_work_stuck': 3.69,
    'mood_lost': 2.19,
    'mood_misunderstood': 1.88,
    'mood_tired': 4.00,
    'mood_lonely': 2.69,
    'mood_ordinary': 11.94
}

STATION_ARCHETYPES = {
    'station_meishan': {
        'mood_lost': 2.0,
        'mood_anxious': 1.3,
        'mood_work_stuck': 1.1,
        'mood_overthinking': 0.9,
        'mood_ordinary': 0.9,
        'mood_tired': 0.8,
        'mood_lonely': 0.7,
        'mood_misunderstood': 0.7
    },
    'station_jingshi': {
        'mood_overthinking': 1.8,
        'mood_work_stuck': 1.5,
        'mood_anxious': 1.2,
        'mood_misunderstood': 1.1,
        'mood_lost': 0.8,
        'mood_tired': 0.8,
        'mood_ordinary': 0.8,
        'mood_lonely': 0.6
    },
    'station_mizhou': {
        'mood_work_stuck': 1.7,
        'mood_anxious': 1.4,
        'mood_lonely': 1.3,
        'mood_tired': 1.0,
        'mood_overthinking': 0.9,
        'mood_misunderstood': 0.8,
        'mood_lost': 0.8,
        'mood_ordinary': 0.8
    },
    'station_wutai': {
        'mood_misunderstood': 2.0,
        'mood_lonely': 1.5,
        'mood_overthinking': 1.2,
        'mood_anxious': 1.1,
        'mood_tired': 0.9,
        'mood_lost': 0.8,
        'mood_work_stuck': 0.7,
        'mood_ordinary': 0.6
    },
    'station_huangzhou': {
        'mood_tired': 1.6,
        'mood_work_stuck': 1.3,
        'mood_ordinary': 1.3,
        'mood_misunderstood': 1.1,
        'mood_lonely': 1.0,
        'mood_lost': 0.9,
        'mood_overthinking': 0.8,
        'mood_anxious': 0.7
    },
    'station_hangzhou': {
        # 杭州：湖山清欢、日常安顿、西湖治水、消解焦虑
        'mood_ordinary': 1.7,
        'mood_anxious': 1.3,
        'mood_tired': 1.2,
        'mood_work_stuck': 1.1,
        'mood_lost': 0.9,
        'mood_overthinking': 0.8,
        'mood_lonely': 0.7,
        'mood_misunderstood': 0.7
    },
    'station_huizhou': {
        'mood_lost': 1.6,
        'mood_ordinary': 1.5,
        'mood_tired': 1.2,
        'mood_misunderstood': 1.0,
        'mood_lonely': 0.9,
        'mood_work_stuck': 0.8,
        'mood_overthinking': 0.7,
        'mood_anxious': 0.6
    },
    'station_danzhou': {
        'mood_lonely': 1.9,
        'mood_lost': 1.4,
        'mood_work_stuck': 1.1,
        'mood_tired': 1.0,
        'mood_misunderstood': 0.9,
        'mood_ordinary': 0.8,
        'mood_overthinking': 0.7,
        'mood_anxious': 0.6
    },
    'station_changzhou': {
        'mood_tired': 1.7,
        'mood_ordinary': 1.4,
        'mood_overthinking': 1.1,
        'mood_lonely': 1.1,
        'mood_lost': 0.9,
        'mood_work_stuck': 0.7,
        'mood_misunderstood': 0.6,
        'mood_anxious': 0.5
    }
}

def norm_dict(d):
    s = sum(d.values())
    return {k: v / s for k, v in d.items()}

NORM_STATION_PROFILES = {sid: norm_dict(STATION_ARCHETYPES[sid]) for sid in STATIONS}

def match_station(accumulated_scores):
    std_vector = {}
    for m in MOOD_IDS:
        std_vector[m] = accumulated_scores.get(m, 0.0) / BASE_WEIGHTS[m]
    norm_user = norm_dict(std_vector)
    
    best_station = None
    best_score = -float('inf')
    
    for sid in STATIONS:
        prof = NORM_STATION_PROFILES[sid]
        dot = sum(norm_user[m] * prof[m] for m in MOOD_IDS)
        mag_u = (sum(norm_user[m] ** 2 for m in MOOD_IDS)) ** 0.5
        mag_p = (sum(prof[m] ** 2 for m in MOOD_IDS)) ** 0.5
        sim = dot / (mag_u * mag_p) if (mag_u > 0 and mag_p > 0) else 0.0
        
        if sim > best_score:
            best_score = sim
            best_station = sid
            
    return best_station

ARCHETYPE_TEST_VECTORS = {
    'station_meishan': {
        'mood_lost': 12, 'mood_anxious': 6, 'mood_work_stuck': 4, 'mood_ordinary': 6
    },
    'station_jingshi': {
        'mood_overthinking': 12, 'mood_work_stuck': 10, 'mood_anxious': 5, 'mood_misunderstood': 4
    },
    'station_mizhou': {
        'mood_work_stuck': 14, 'mood_anxious': 8, 'mood_lonely': 6, 'mood_ordinary': 4
    },
    'station_wutai': {
        'mood_misunderstood': 16, 'mood_lonely': 8, 'mood_overthinking': 6, 'mood_anxious': 4
    },
    'station_huangzhou': {
        'mood_tired': 15, 'mood_work_stuck': 8, 'mood_ordinary': 12, 'mood_misunderstood': 5
    },
    'station_hangzhou': {
        'mood_ordinary': 28, 'mood_anxious': 8, 'mood_tired': 8
    },
    'station_huizhou': {
        'mood_lost': 10, 'mood_ordinary': 22, 'mood_tired': 8
    },
    'station_danzhou': {
        'mood_lonely': 16, 'mood_lost': 8, 'mood_work_stuck': 6, 'mood_tired': 5
    },
    'station_changzhou': {
        'mood_tired': 18, 'mood_ordinary': 18, 'mood_lonely': 6, 'mood_overthinking': 4
    }
}

print("验证 9 组典型路径命中情况:")
all_passed = True
for target_sid, tvec in ARCHETYPE_TEST_VECTORS.items():
    winner = match_station(tvec)
    status = "PASS" if winner == target_sid else "FAIL"
    if winner != target_sid:
        all_passed = False
    print(f"  [{status}] 预期: {target_sid:20s} -> 实际匹配: {winner:20s}")

assert all_passed, "存在未命中的典型路径！"
print("全部 9 组典型路径 100% 命中预期站点！\n")

def simulate(n=50000):
    counts = {sid: 0 for sid in STATIONS}
    dims = list(dim_map.keys())
    for _ in range(n):
        selected_dims = random.sample(dims, 7)
        user_scores = {m: 0.0 for m in MOOD_IDS}
        for d in selected_dims:
            q = random.choice(dim_map[d])
            target = random.choice(q["targets"])
            for m, val in target.get("scoreVector", {}).items():
                user_scores[m] += val
        winner = match_station(user_scores)
        counts[winner] += 1
    return counts

counts = simulate(50000)
print("50,000 次蒙特卡洛模拟频率统计:")
for sid in STATIONS:
    pct = (counts[sid] / 50000) * 100
    print(f"  {sid:20s}: {counts[sid]:5d} ({pct:5.2f}%)")
    assert pct >= 2.0, f"{sid} 频率过低 ({pct:.2f}% < 2.0%)"
    assert pct <= 30.0, f"{sid} 频率过高 ({pct:.2f}% > 30.0%)"

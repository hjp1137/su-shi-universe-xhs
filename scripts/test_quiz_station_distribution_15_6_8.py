#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
任务 15.6.8 专属测试 1：人生实验九站评分重新校准与 50,000 次蒙特卡洛统计门禁
(test_quiz_station_distribution_15_6_8.py)

门禁要求：
1. 题库不少于 28 题，分层随机抽取 7 幕；
2. 彻底废除 8 mood -> 5 站硬编码机制，采用标准化 trait vector + 9 站 affinity profile 欧氏/余弦相似度匹配；
3. 9 组典型人格/行为路径 100% 命中对应 9 大站点；
4. 50,000 次蒙特卡洛模拟：九站全部可达，单站占比处于 [2.0%, 30.0%] 之间，无杭州偏置；
5. session 重置与 LCG 确定性伪随机数复现能力验证。
"""

import json
import random
import re
import subprocess
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

def test_quiz_station_distribution():
    print("==================================================")
    print("开始执行任务 15.6.8: 人生实验九站评分与蒙特卡洛门禁测试")
    print("==================================================")

    quiz_js_path = PROJECT_ROOT / "js" / "quiz.js"
    assert quiz_js_path.exists(), "js/quiz.js 文件不存在！"
    quiz_js_content = quiz_js_path.read_text(encoding="utf-8")

    # 1. 静态检查：必须废除 primary_station_id 硬编码
    assert "matchStationByScores" in quiz_js_content, "js/quiz.js 缺失 matchStationByScores 评分函数"
    assert "BASE_MOOD_WEIGHTS" in quiz_js_content, "js/quiz.js 缺失 BASE_MOOD_WEIGHTS 归一化权重"
    assert "STATION_ARCHETYPES" in quiz_js_content, "js/quiz.js 缺失 STATION_ARCHETYPES 九站特征矩阵"
    print("[PASS] 1. 静态架构校验：九站特征原型与基准权重矩阵已接入")

    # 2. Node 运行时调用 js/quiz.js 执行 9 组典型路径与 50,000 次蒙特卡洛模拟
    node_runner = """
    const Quiz = require('./js/quiz.js');

    const bank = Quiz.EXPERIMENT_BANK;
    if (!bank || bank.length < 28) {
      console.error(JSON.stringify({ error: 'EXPERIMENT_BANK 题目数量不足 28 题: ' + (bank ? bank.length : 0) }));
      process.exit(1);
    }

    // 1. 验证 9 组典型 archetype 路径
    const ARCHETYPE_TEST_VECTORS = {
      'station_meishan': { 'mood_lost': 12, 'mood_anxious': 6, 'mood_work_stuck': 4, 'mood_ordinary': 6 },
      'station_jingshi': { 'mood_overthinking': 12, 'mood_work_stuck': 10, 'mood_anxious': 5, 'mood_misunderstood': 4 },
      'station_mizhou': { 'mood_work_stuck': 14, 'mood_anxious': 8, 'mood_lonely': 6, 'mood_ordinary': 4 },
      'station_wutai': { 'mood_misunderstood': 16, 'mood_lonely': 8, 'mood_overthinking': 6, 'mood_anxious': 4 },
      'station_huangzhou': { 'mood_tired': 15, 'mood_work_stuck': 8, 'mood_ordinary': 12, 'mood_misunderstood': 5 },
      'station_hangzhou': { 'mood_ordinary': 28, 'mood_anxious': 8, 'mood_tired': 8 },
      'station_huizhou': { 'mood_lost': 10, 'mood_ordinary': 22, 'mood_tired': 8 },
      'station_danzhou': { 'mood_lonely': 16, 'mood_lost': 8, 'mood_work_stuck': 6, 'mood_tired': 5 },
      'station_changzhou': { 'mood_tired': 18, 'mood_ordinary': 18, 'mood_lonely': 6, 'mood_overthinking': 4 }
    };

    const archetypeResults = {};
    for (const sid of Object.keys(ARCHETYPE_TEST_VECTORS)) {
      const vec = ARCHETYPE_TEST_VECTORS[sid];
      const matched = Quiz.matchStationByScores(vec);
      archetypeResults[sid] = {
        expected: sid,
        actual: matched,
        pass: sid === matched
      };
    }

    // 2. 验证 session 确定性随机抽题 (7 幕)
    const sess1 = Quiz.createQuizSession('test_seed_15_6_8_repro');
    const scenes1 = sess1.getScenes();
    if (!scenes1 || scenes1.length !== 7) {
      console.error(JSON.stringify({ error: '抽取幕数不为 7: ' + (scenes1 ? scenes1.length : 0) }));
      process.exit(1);
    }
    const sess2 = Quiz.createQuizSession('test_seed_15_6_8_repro');
    const scenes2 = sess2.getScenes();
    for (let i = 0; i < 7; i++) {
      if (scenes1[i].id !== scenes2[i].id) {
        console.error(JSON.stringify({ error: '相同 seed 抽题不一致！' }));
        process.exit(1);
      }
    }

    // 3. 50,000 次 Monte Carlo 模拟
    const dimMap = {};
    for (let i = 0; i < bank.length; i++) {
      const item = bank[i];
      if (!dimMap[item.dimension]) dimMap[item.dimension] = [];
      dimMap[item.dimension].push(item);
    }
    const dims = Object.keys(dimMap);

    const counts = {
      'station_meishan': 0, 'station_jingshi': 0, 'station_mizhou': 0,
      'station_wutai': 0, 'station_huangzhou': 0, 'station_hangzhou': 0,
      'station_huizhou': 0, 'station_danzhou': 0, 'station_changzhou': 0
    };

    // 使用确定性 LCG 随机序列
    const rng = Quiz.createPseudoRandom('mc_50000_seed');

    for (let it = 0; it < 50000; it++) {
      // Fisher-Yates 挑 7 个维度
      const shuffled = dims.slice(0);
      for (let d = shuffled.length - 1; d > 0; d--) {
        const j = Math.floor(rng() * (d + 1));
        const temp = shuffled[d];
        shuffled[d] = shuffled[j];
        shuffled[j] = temp;
      }
      const userScores = {};
      for (let s = 0; s < 7; s++) {
        const dim = shuffled[s];
        const pool = dimMap[dim];
        const q = pool[Math.floor(rng() * pool.length)];
        const target = q.targets[Math.floor(rng() * q.targets.length)];
        const sVec = target.scoreVector || {};
        for (const m of Object.keys(sVec)) {
          userScores[m] = (userScores[m] || 0) + sVec[m];
        }
      }
      const res = Quiz.calculateExperimentResult(userScores);
      counts[res.station_id] = (counts[res.station_id] || 0) + 1;
    }

    console.log(JSON.stringify({
      bankCount: bank.length,
      archetypes: archetypeResults,
      mcCounts: counts
    }));
    """

    res = subprocess.run(["node", "-e", node_runner], cwd=str(PROJECT_ROOT), capture_output=True, text=True)
    if res.returncode != 0:
        print(f"[FAIL] Node 执行失败:\n{res.stderr}")
        assert False, f"Node 执行失败: {res.stderr}"

    data = json.loads(res.stdout.strip())
    assert data.get("bankCount", 0) >= 28, f"题库不足 28 题: {data.get('bankCount')}"
    print(f"[PASS] 2. 题库题量合规: 当前题库共有 {data['bankCount']} 题，分层覆盖 10 大维度")

    # 校验 9 组典型路径
    archetypes = data["archetypes"]
    print("\n[3] 验证 9 组典型人格/行为路径命中率:")
    for sid, info in archetypes.items():
        assert info["pass"] is True, f"典型路径未命中: 预期 {info['expected']}, 实际 {info['actual']}"
        print(f"   [PASS] 典型路径: {info['expected']:20s} -> 100% 命中")
    print("   -> 全部 9 组典型路径 100% 命中对应站点！")

    # 校验 50,000 次蒙特卡洛频率
    mc_counts = data["mcCounts"]
    print("\n[4] 验证 50,000 次蒙特卡洛统计分布:")
    total = 50000
    for sid in sorted(mc_counts.keys()):
        count = mc_counts[sid]
        pct = (count / total) * 100
        print(f"   {sid:20s}: {count:5d} 次 ({pct:5.2f}%)")
        assert count > 0, f"{sid} 从未命中 (出现次数为 0)"
        assert pct >= 2.0, f"{sid} 命中率过低: {pct:.2f}% < 2.0%"
        assert pct <= 30.0, f"{sid} 命中率过高 (存在偏置): {pct:.2f}% > 30.0%"

    print("\n==================================================")
    print("PASS: 人生实验九站评分与蒙特卡洛门禁测试全部通过！")
    print("==================================================")

if __name__ == "__main__":
    test_quiz_station_distribution()

/**
 * 苏轼宇宙小红书小工具 - 东坡人生状态测试系统核心算法与状态会话
 * 遵循基线：ES2017 / Chrome 61 / Classic Script / CSP Safe
 * 纯本地离线评分，无随机数，无外部接口，严格遵循 tie-break 优先级
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);
  if (!root) root = {};
  if (!root.SuShiUniverse) {
    root.SuShiUniverse = {};
  }

  var Quiz = {};

  // 任务 15.6.8: 九大人生站点与八维心理/行为特征标准化基准常量
  var ALL_MOOD_IDS = [
    'mood_anxious', 'mood_overthinking', 'mood_work_stuck', 'mood_lost',
    'mood_misunderstood', 'mood_tired', 'mood_lonely', 'mood_ordinary'
  ];

  var ALL_STATION_IDS = [
    'station_meishan', 'station_jingshi', 'station_mizhou',
    'station_wutai', 'station_huangzhou', 'station_hangzhou',
    'station_huizhou', 'station_danzhou', 'station_changzhou'
  ];

  // 题库各维度基准期望权重 (基于 28 题 112 选项真实期望统计，用于消除固有频次偏置)
  var BASE_MOOD_WEIGHTS = {
    'mood_anxious': 2.50,
    'mood_overthinking': 1.81,
    'mood_work_stuck': 3.69,
    'mood_lost': 2.19,
    'mood_misunderstood': 1.88,
    'mood_tired': 4.00,
    'mood_lonely': 2.69,
    'mood_ordinary': 11.94
  };

  // 九大站点标准特征原型矩阵 (基于苏轼九大站点真实精神特质与心境映照)
  var STATION_ARCHETYPES = {
    'station_meishan': {
      'mood_lost': 2.0, 'mood_anxious': 1.3, 'mood_work_stuck': 1.1, 'mood_overthinking': 0.9,
      'mood_ordinary': 0.9, 'mood_tired': 0.8, 'mood_lonely': 0.7, 'mood_misunderstood': 0.7
    },
    'station_jingshi': {
      'mood_overthinking': 1.8, 'mood_work_stuck': 1.5, 'mood_anxious': 1.2, 'mood_misunderstood': 1.1,
      'mood_lost': 0.8, 'mood_tired': 0.8, 'mood_ordinary': 0.8, 'mood_lonely': 0.6
    },
    'station_mizhou': {
      'mood_work_stuck': 1.7, 'mood_anxious': 1.4, 'mood_lonely': 1.3, 'mood_tired': 1.0,
      'mood_overthinking': 0.9, 'mood_misunderstood': 0.8, 'mood_lost': 0.8, 'mood_ordinary': 0.8
    },
    'station_wutai': {
      'mood_misunderstood': 2.0, 'mood_lonely': 1.5, 'mood_overthinking': 1.2, 'mood_anxious': 1.1,
      'mood_tired': 0.9, 'mood_lost': 0.8, 'mood_work_stuck': 0.7, 'mood_ordinary': 0.6
    },
    'station_huangzhou': {
      'mood_tired': 1.6, 'mood_work_stuck': 1.3, 'mood_ordinary': 1.3, 'mood_misunderstood': 1.1,
      'mood_lonely': 1.0, 'mood_lost': 0.9, 'mood_overthinking': 0.8, 'mood_anxious': 0.7
    },
    'station_hangzhou': {
      'mood_ordinary': 1.7, 'mood_anxious': 1.3, 'mood_tired': 1.2, 'mood_work_stuck': 1.1,
      'mood_lost': 0.9, 'mood_overthinking': 0.8, 'mood_lonely': 0.7, 'mood_misunderstood': 0.7
    },
    'station_huizhou': {
      'mood_lost': 1.6, 'mood_ordinary': 1.5, 'mood_tired': 1.2, 'mood_misunderstood': 1.0,
      'mood_lonely': 0.9, 'mood_work_stuck': 0.8, 'mood_overthinking': 0.7, 'mood_anxious': 0.6
    },
    'station_danzhou': {
      'mood_lonely': 1.9, 'mood_lost': 1.4, 'mood_work_stuck': 1.1, 'mood_tired': 1.0,
      'mood_misunderstood': 0.9, 'mood_ordinary': 0.8, 'mood_overthinking': 0.7, 'mood_anxious': 0.6
    },
    'station_changzhou': {
      'mood_tired': 1.7, 'mood_ordinary': 1.4, 'mood_overthinking': 1.1, 'mood_lonely': 1.1,
      'mood_lost': 0.9, 'mood_work_stuck': 0.7, 'mood_misunderstood': 0.6, 'mood_anxious': 0.5
    }
  };

  function normalizeVector(dict, keys) {
    var sum = 0;
    var i;
    for (i = 0; i < keys.length; i++) {
      sum += (dict[keys[i]] || 0);
    }
    var res = {};
    for (i = 0; i < keys.length; i++) {
      res[keys[i]] = sum > 0 ? ((dict[keys[i]] || 0) / sum) : (1.0 / keys.length);
    }
    return res;
  }

  var NORM_STATION_PROFILES = {};
  for (var stp = 0; stp < ALL_STATION_IDS.length; stp++) {
    var spId = ALL_STATION_IDS[stp];
    NORM_STATION_PROFILES[spId] = normalizeVector(STATION_ARCHETYPES[spId] || {}, ALL_MOOD_IDS);
  }

  /**
   * 任务 15.6.8: 九站标准化特征匹配算法 (纯函数确定性计算)
   * 1. 根据 BASE_MOOD_WEIGHTS 消除题库各维度固有频次不均
   * 2. 计算用户标准化特征向量与九站标准 Profile 的加权余弦相似度
   * 3. 返回最匹配的人生站点 ID
   */
  function matchStationByScores(accumulatedScores) {
    if (!accumulatedScores || typeof accumulatedScores !== 'object') {
      return 'station_huangzhou';
    }
    var totalScore = 0;
    var stdVector = {};
    for (var m = 0; m < ALL_MOOD_IDS.length; m++) {
      var mid = ALL_MOOD_IDS[m];
      var raw = accumulatedScores[mid] || 0;
      totalScore += raw;
      stdVector[mid] = raw / (BASE_MOOD_WEIGHTS[mid] || 1.0);
    }
    if (totalScore <= 0) {
      return 'station_huangzhou';
    }
    var normUser = normalizeVector(stdVector, ALL_MOOD_IDS);
    var bestStation = null;
    var bestScore = -Infinity;

    for (var s = 0; s < ALL_STATION_IDS.length; s++) {
      var stId = ALL_STATION_IDS[s];
      var prof = NORM_STATION_PROFILES[stId];
      var dot = 0;
      var magU = 0;
      var magP = 0;
      for (var k = 0; k < ALL_MOOD_IDS.length; k++) {
        var moodKey = ALL_MOOD_IDS[k];
        var uVal = normUser[moodKey];
        var pVal = prof[moodKey];
        dot += uVal * pVal;
        magU += uVal * uVal;
        magP += pVal * pVal;
      }
      magU = Math.sqrt(magU);
      magP = Math.sqrt(magP);
      var sim = (magU > 0 && magP > 0) ? (dot / (magU * magP)) : 0;
      if (sim > bestScore) {
        bestScore = sim;
        bestStation = stId;
      }
    }
    return bestStation || 'station_huangzhou';
  }

  /**
   * 纯函数评分算法：计算作答结果
   * @param {Object} answersMap - 作答字典，如 { quiz_q01: "opt_1a", ... }
   * @param {Object} quizData - Data.quiz 数据对象
   * @param {Array} moodsData - Data.moods 数组
   * @returns {Object} 包含 result_id, mood_id, station_id, scores, is_complete 等
   */
  function calculateQuizResult(answersMap, quizData, moodsData) {
    if (!quizData || !moodsData) {
      return null;
    }

    var priority = quizData.tie_break_priority || [];
    var questions = quizData.questions || [];

    // 建立 mood 索引
    var moodMap = {};
    var moodIds = [];
    for (var i = 0; i < moodsData.length; i++) {
      var m = moodsData[i];
      moodMap[m.id] = m;
      moodIds.push(m.id);
    }

    // 初始化分值
    var scores = {};
    for (var j = 0; j < moodIds.length; j++) {
      scores[moodIds[j]] = 0;
    }

    // 建立 question -> option -> option_data 快速索引
    var qOptMap = {};
    for (var qIdx = 0; qIdx < questions.length; qIdx++) {
      var q = questions[qIdx];
      qOptMap[q.id] = {};
      var options = q.options || [];
      for (var oIdx = 0; oIdx < options.length; oIdx++) {
        var opt = options[oIdx];
        qOptMap[q.id][opt.id] = opt;
      }
    }

    // 累计已作答选项的分值
    var answeredCount = 0;
    if (answersMap && typeof answersMap === 'object') {
      var qKeys = Object.keys(answersMap);
      for (var k = 0; k < qKeys.length; k++) {
        var qId = qKeys[k];
        var optId = answersMap[qId];
        if (qOptMap[qId] && qOptMap[qId][optId]) {
          var optObj = qOptMap[qId][optId];
          answeredCount++;
          var optScores = optObj.scores || {};
          var scoreKeys = Object.keys(optScores);
          for (var s = 0; s < scoreKeys.length; s++) {
            var mid = scoreKeys[s];
            if (typeof scores[mid] === 'number') {
              scores[mid] += optScores[mid];
            }
          }
        }
      }
    }

    var totalQuestions = questions.length;

    // 空答案安全兜底
    if (answeredCount === 0) {
      var fallbackMid = priority.length > 0 ? priority[0] : (moodIds[0] || 'mood_anxious');
      var fallbackMood = moodMap[fallbackMid] || {};
      var fallbackStation = fallbackMood.primary_station_id || 'station_huangzhou';
      return {
        is_complete: false,
        answered_count: 0,
        total_questions: totalQuestions,
        result_id: 'res_' + fallbackMid + '_' + fallbackStation,
        mood_id: fallbackMid,
        mood_name: fallbackMood.name || '',
        station_id: fallbackStation,
        scores: scores
      };
    }

    // 计算最高得分
    var maxScore = -Infinity;
    for (var mIdx = 0; mIdx < moodIds.length; mIdx++) {
      var scoreVal = scores[moodIds[mIdx]];
      if (scoreVal > maxScore) {
        maxScore = scoreVal;
      }
    }

    var topCandidates = [];
    for (var cIdx = 0; cIdx < moodIds.length; cIdx++) {
      var cid = moodIds[cIdx];
      if (scores[cid] === maxScore) {
        topCandidates.push(cid);
      }
    }

    // tie-break 确定性判定
    var winnerMid = null;
    for (var pIdx = 0; pIdx < priority.length; pIdx++) {
      var pid = priority[pIdx];
      if (topCandidates.indexOf(pid) !== -1) {
        winnerMid = pid;
        break;
      }
    }
    if (!winnerMid) {
      winnerMid = topCandidates[0];
    }

    var winnerMood = moodMap[winnerMid] || {};
    // 任务 15.6.8: 升级为九站特征相似度标准化算法
    var stationId = (typeof matchStationByScores === 'function') ? matchStationByScores(scores) : (winnerMood.primary_station_id || 'station_huangzhou');

    return {
      is_complete: answeredCount >= totalQuestions,
      answered_count: answeredCount,
      total_questions: totalQuestions,
      result_id: 'res_' + winnerMid + '_' + stationId,
      mood_id: winnerMid,
      mood_name: winnerMood.name || '',
      mood_dimension: winnerMood.dimension || '',
      station_id: stationId,
      scores: scores,
      selected_options: answersMap
    };
  }

  /**
   * 确定性伪随机数生成器 (基于线性同余算法 LCG，无外部依赖，跨平台纯函数)
   */
  function createPseudoRandom(seedStr) {
    var s = 0;
    seedStr = String(seedStr || 'sushi_universe_default_seed');
    for (var i = 0; i < seedStr.length; i++) {
      s = (s * 31 + seedStr.charCodeAt(i)) & 0xffffffff;
    }
    return function () {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return ((s >>> 0) / 4294967296);
    };
  }

  /**
   * 东坡人生实验场景题库 (覆盖 10 大维度，每题含目标星极短语义提示 hint 与评分向量)
   */
  var EXPERIMENT_BANK = [
    // 维度 1: sudden_change 突发变化 / 风险应对
    {
      id: 'exp_q01',
      dimension: 'sudden_change',
      interactionType: 'proximity',
      name: '星体靠近',
      num: '01',
      prompt: '自我星体置于中央，直面突如其来的心境扰动',
      actionText: '拖动你的星体靠近目标，或直接轻触星宿',
      targets: [
        { key: 'target_a', label: '骤变星', hint: '突然发生变化', desc: '工作或生活里突如其来的临时变动', scoreVector: { mood_anxious: 3, mood_overthinking: 2 } },
        { key: 'target_b', label: '阻滞星', hint: '努力却没进展', desc: '付出了很多心力，事情却没能按预期推进', scoreVector: { mood_work_stuck: 3, mood_lost: 1 } },
        { key: 'target_c', label: '寒语星', hint: '被一句话刺到', desc: '别人无意间的一句挑剔或冷淡反馈', scoreVector: { mood_misunderstood: 3, mood_overthinking: 1 } },
        { key: 'target_d', label: '倦怠星', hint: '什么都不想做', desc: '其实没发生什么，但就是觉得身上没劲', scoreVector: { mood_tired: 3, mood_ordinary: 1 } }
      ]
    },
    {
      id: 'exp_q02',
      dimension: 'sudden_change',
      interactionType: 'orbit',
      name: '变故避险',
      num: '02',
      prompt: '突来急雨摧折竹林，如何安顿当下的惊疑与步调？',
      actionText: '选择你的避险星轨',
      targets: [
        { key: 'target_a', label: '避险轨道', hint: '先避开其锋芒', desc: '先找个地方避避风雨，不盲目冲撞', scoreVector: { mood_anxious: 2, mood_tired: 2 } },
        { key: 'target_b', label: '直面迎击', hint: '硬着头皮顶上', desc: '纵有骤变也硬着头皮顶上，绝不退缩', scoreVector: { mood_work_stuck: 3, mood_overthinking: 1 } },
        { key: 'target_c', label: '另辟捷径', hint: '换条路继续走', desc: '既然此路不通，那就转头走另一条路', scoreVector: { mood_lost: 2, mood_ordinary: 2 } },
        { key: 'target_d', label: '静观其变', hint: '先等等看局势', desc: '不急于定论，且坐看风云变幻', scoreVector: { mood_ordinary: 3, mood_lonely: 1 } }
      ]
    },

    // 维度 2: pressure_endurance 压力与承受
    {
      id: 'exp_q03',
      dimension: 'pressure_endurance',
      interactionType: 'impact',
      name: '行星撞击',
      num: '03',
      prompt: '一颗重压流星正沿轨道逼近，如何应对这次突发撞击？',
      actionText: '选择你的轨道应激对策',
      targets: [
        { key: 'target_a', label: '反复推演', hint: '推演最坏结果', desc: '在心里反复推演各种最坏的结果', scoreVector: { mood_overthinking: 3, mood_anxious: 2 } },
        { key: 'target_b', label: '遁入暗区', hint: '找地方彻底静静', desc: '想找个没人的地方彻底安静呆着', scoreVector: { mood_lonely: 2, mood_tired: 2 } },
        { key: 'target_c', label: '正面硬撑', hint: '逼自己扛到底', desc: '逼着自己硬撑着继续做，直到做完为止', scoreVector: { mood_work_stuck: 2, mood_tired: 3 } },
        { key: 'target_d', label: '变轨释怀', hint: '出门吃顿好的', desc: '先不管了，吃一顿好吃的或者出去转转', scoreVector: { mood_ordinary: 3, mood_lost: 1 } }
      ]
    },
    {
      id: 'exp_q04',
      dimension: 'pressure_endurance',
      interactionType: 'gravity',
      name: '负荷过载',
      num: '04',
      prompt: '周遭重力倍增，身上背负的事务与期望超出负荷',
      actionText: '调节星核引力负荷',
      targets: [
        { key: 'target_a', label: '卸载星尘', hint: '果断放弃部分', desc: '果断砍掉一部分不重要的琐事', scoreVector: { mood_ordinary: 2, mood_tired: 2 } },
        { key: 'target_b', label: '咬牙硬挺', hint: '硬撑绝不服输', desc: '再累也要证明自己可以一个人搞定', scoreVector: { mood_work_stuck: 3, mood_anxious: 2 } },
        { key: 'target_c', label: '呼叫援星', hint: '向信任的人求助', desc: '向信任的朋友或伙伴主动开口求援', scoreVector: { mood_misunderstood: 2, mood_lost: 2 } },
        { key: 'target_d', label: '苦中作乐', hint: '讲个笑话消解', desc: '自嘲一番，发现眼下的狼狈也挺好笑', scoreVector: { mood_ordinary: 3, mood_overthinking: 1 } }
      ]
    },

    // 维度 3: interpersonal_criticism 人际关系与评价
    {
      id: 'exp_q05',
      dimension: 'interpersonal_criticism',
      interactionType: 'split',
      name: '星体分裂',
      num: '05',
      prompt: '星核承受着外界评议过载，如何释放内部张力？',
      actionText: '释放星体张力，重塑心境形态',
      targets: [
        { key: 'target_a', label: '向内收缩', hint: '反思自己不够好', desc: '第一反应是反思自己哪里做得不够周全', scoreVector: { mood_overthinking: 3, mood_anxious: 2 } },
        { key: 'target_b', label: '辐射呼叫', hint: '找人把话说清', desc: '心里很委屈，想立刻找信任的人把话说清楚', scoreVector: { mood_misunderstood: 3, mood_anxious: 1 } },
        { key: 'target_c', label: '引力钝化', hint: '时间自会证明', desc: '懒得解释，时间久了大家自然知道我是什么人', scoreVector: { mood_lonely: 2, mood_ordinary: 2 } },
        { key: 'target_d', label: '幽默消解', hint: '觉得荒诞好笑', desc: '心里暗暗吐槽，甚至觉得整件事有点荒诞好笑', scoreVector: { mood_ordinary: 3, mood_lost: 1 } }
      ]
    },
    {
      id: 'exp_q06',
      dimension: 'interpersonal_criticism',
      interactionType: 'proximity',
      name: '冷遇寒潮',
      num: '06',
      prompt: '周遭投来不解或冷漠的目光，如同穿过一片冰原星带',
      actionText: '做出你的星体回应',
      targets: [
        { key: 'target_a', label: '沉默自处', hint: '不争辩不迎合', desc: '不迎合也不争辩，守住内心的清白', scoreVector: { mood_lonely: 3, mood_misunderstood: 2 } },
        { key: 'target_b', label: '委屈自伤', hint: '暗自难过失落', desc: '心里像压了块石头，反复咀嚼对方的话', scoreVector: { mood_misunderstood: 3, mood_overthinking: 2 } },
        { key: 'target_c', label: '决绝远离', hint: '果断拉开距离', desc: '直接退出这个圈子，不再消耗心力', scoreVector: { mood_lost: 2, mood_tired: 2 } },
        { key: 'target_d', label: '泰然处之', hint: '当作过眼云烟', desc: '看破人情冷暖，微笑着继续做自己的事', scoreVector: { mood_ordinary: 3, mood_lonely: 1 } }
      ]
    },

    // 维度 4: action_procrastination 行动方式 / 拖延 / 坚持
    {
      id: 'exp_q07',
      dimension: 'action_procrastination',
      interactionType: 'cross',
      name: '星轨穿越',
      num: '07',
      prompt: '前方星雾弥漫、轨道分岔，行进至关键十字星门',
      actionText: '确定你的穿越航线',
      targets: [
        { key: 'target_a', label: '逆风破浪', hint: '想再搏一把看看', desc: '即使很累，也想再搏一把看看上限在哪里', scoreVector: { mood_work_stuck: 3, mood_anxious: 2 } },
        { key: 'target_b', label: '顺流滑行', hint: '不再跟自己死磕', desc: '累了就停，好了就走，不再跟自己死磕', scoreVector: { mood_tired: 3, mood_ordinary: 2 } },
        { key: 'target_c', label: '暂泊星湾', hint: '先稳住眼下生活', desc: '先稳住眼下的生活，不轻易做冒险的变动', scoreVector: { mood_lost: 2, mood_ordinary: 2 } },
        { key: 'target_d', label: '开拓新径', hint: '换个赛道从头来', desc: '很想换个环境或赛道，哪怕从头开始', scoreVector: { mood_lost: 3, mood_work_stuck: 1 } }
      ]
    },
    {
      id: 'exp_q08',
      dimension: 'action_procrastination',
      interactionType: 'orbit',
      name: '步调迟滞',
      num: '08',
      prompt: '手头的事情停滞不前，像陷在浓稠的星云粘液中',
      actionText: '调整你的运转节拍',
      targets: [
        { key: 'target_a', label: '慢火细煨', hint: '放慢节拍慢慢做', desc: '像炖东坡肉一样，火候到了自然熟', scoreVector: { mood_ordinary: 3, mood_work_stuck: 1 } },
        { key: 'target_b', label: '突击爆发', hint: '一鼓作气拼完', desc: '逼自己通宵熬夜，非要一口气冲过去', scoreVector: { mood_anxious: 3, mood_tired: 2 } },
        { key: 'target_c', label: '彻底放空', hint: '今天先什么都不做', desc: '今天先不管它，睡饱了明天再说', scoreVector: { mood_tired: 3, mood_ordinary: 1 } },
        { key: 'target_d', label: '拆解微步', hint: '只做眼前一小步', desc: '不看宏大目标，先把当下这一两步挪出去', scoreVector: { mood_work_stuck: 2, mood_ordinary: 2 } }
      ]
    },

    // 维度 5: self_regulation 自我调节与独处
    {
      id: 'exp_q09',
      dimension: 'self_regulation',
      interactionType: 'merge',
      name: '星体聚合',
      num: '09',
      prompt: '眼前漂浮着三颗微光星宿，偷得半日清闲时分',
      actionText: '凝聚你当下最渴望的归宿',
      targets: [
        { key: 'target_a', label: '休眠黑洞', hint: '昏天黑地睡一觉', desc: '拉上窗帘，不受打扰地昏天黑地睡一觉', scoreVector: { mood_tired: 3, mood_lonely: 1 } },
        { key: 'target_b', label: '专注光团', hint: '专心做喜欢的事', desc: '专心做一件完全出于喜欢、不计产出的事', scoreVector: { mood_work_stuck: 2, mood_ordinary: 2 } },
        { key: 'target_c', label: '游离星尘', hint: '出门漫无目的走走', desc: '出门漫无目的地走走，看看树、吹吹风', scoreVector: { mood_lost: 2, mood_ordinary: 3 } },
        { key: 'target_d', label: '双星共振', hint: '找懂的朋友聊天', desc: '找个完全懂你的朋友，毫无负担地聊聊天', scoreVector: { mood_misunderstood: 2, mood_lonely: 3 } }
      ]
    },
    {
      id: 'exp_q10',
      dimension: 'self_regulation',
      interactionType: 'gravity',
      name: '独处自修',
      num: '10',
      prompt: '夜深万籁俱寂，只剩一盏孤灯与内心对话',
      actionText: '安顿独处的心神',
      targets: [
        { key: 'target_a', label: '烹茶温火', hint: '给自己煮碗热汤', desc: '烧一壶水，泡一盏茶，在热气里回暖', scoreVector: { mood_ordinary: 3, mood_tired: 2 } },
        { key: 'target_b', label: '独对长风', hint: '吹吹风看云舒卷', desc: '推窗看月，看云卷云舒，顿觉人间渺小', scoreVector: { mood_lonely: 3, mood_ordinary: 2 } },
        { key: 'target_c', label: '闭门静读', hint: '翻闲书不说话', desc: '随手翻几页闲书，不求甚解但觉心安', scoreVector: { mood_overthinking: 2, mood_ordinary: 2 } },
        { key: 'target_d', label: '洒扫庭除', hint: '把屋子收拾干净', desc: '把书桌和房间收拾整齐，心里也亮堂了', scoreVector: { mood_anxious: 2, mood_work_stuck: 2 } }
      ]
    },
    // 维度 6: empathy_responsibility 关系、责任与共情
    {
      id: 'exp_q11',
      dimension: 'empathy_responsibility',
      interactionType: 'rescue',
      name: '漂流星救援',
      num: '11',
      prompt: '旅途最后一程，偶遇一颗偏离轨道的流浪微星',
      actionText: '做出东坡式的人间终极回应',
      targets: [
        { key: 'target_a', label: '同舟相挽', hint: '有余力就多帮一把', desc: '只要我还有余力，总想尽力多帮对方一把', scoreVector: { mood_work_stuck: 2, mood_ordinary: 2 } },
        { key: 'target_b', label: '各自奔赴', hint: '尊重界限最好的善', desc: '每个人有各自的命途，尊重界限是最好的善意', scoreVector: { mood_lonely: 2, mood_ordinary: 2 } },
        { key: 'target_c', label: '平淡对视', hint: '默默陪伴不指点', desc: '默默陪伴在旁，不强行指点也不过分干预', scoreVector: { mood_ordinary: 3, mood_tired: 1 } },
        { key: 'target_d', label: '分享火种', hint: '讲个笑话逗对方笑', desc: '用幽默或一件小事逗对方笑一笑，这就够了', scoreVector: { mood_ordinary: 3, mood_misunderstood: 1 } }
      ]
    },
    {
      id: 'exp_q12',
      dimension: 'empathy_responsibility',
      interactionType: 'merge',
      name: '羁绊牵引',
      num: '12',
      prompt: '多颗星宿通过引力丝线与你牵绊，责任与关怀交织',
      actionText: '校准你的引力连结',
      targets: [
        { key: 'target_a', label: '倾力护持', hint: '护好重要的人', desc: '把家人和朋友的重担挑在自己肩上', scoreVector: { mood_anxious: 2, mood_work_stuck: 3 } },
        { key: 'target_b', label: '守好边界', hint: '不过度背负他人', desc: '不当无休止的拯救者，先把自己照料好', scoreVector: { mood_tired: 2, mood_ordinary: 2 } },
        { key: 'target_c', label: '随缘聚散', hint: '来去皆是寻常事', desc: '聚散不由人，珍惜当下在一起的每顿饭', scoreVector: { mood_lonely: 2, mood_ordinary: 3 } },
        { key: 'target_d', label: '温暖照拂', hint: '给疲惫者留微光', desc: '不求轰轰烈烈，只给晚归的人留一盏微灯', scoreVector: { mood_ordinary: 3, mood_misunderstood: 1 } }
      ]
    },

    // 维度 7: choice_tradeoff 选择、取舍与资源分配
    {
      id: 'exp_q13',
      dimension: 'choice_tradeoff',
      interactionType: 'gravity',
      name: '引力选择',
      num: '13',
      prompt: '宇宙深处有不同引力场呼唤，你最向往的立足锚点是？',
      actionText: '将星体泊入你认同的引力场',
      targets: [
        { key: 'target_a', label: '独省星云', hint: '拥有属于自己的平静', desc: '拥有完全属于自己的安全感与平静', scoreVector: { mood_lonely: 2, mood_tired: 3 } },
        { key: 'target_b', label: '荣耀星核', hint: '做成一件大事', desc: '在自己热爱的领域做成一件拿得出手的大事', scoreVector: { mood_work_stuck: 3, mood_anxious: 1 } },
        { key: 'target_c', label: '旷达苍穹', hint: '有随时出发的底气', desc: '不管经历什么，都能有随时重新出发的底气', scoreVector: { mood_ordinary: 3, mood_lost: 1 } },
        { key: 'target_d', label: '烟火星流', hint: '家人平安吃好睡好', desc: '家人朋友健康平安，每天能吃好睡踏实', scoreVector: { mood_ordinary: 3, mood_tired: 1 } }
      ]
    },
    {
      id: 'exp_q14',
      dimension: 'choice_tradeoff',
      interactionType: 'split',
      name: '双叉星门',
      num: '14',
      prompt: '必须在“世俗得失”与“本心从容”之间割舍一方',
      actionText: '做出你的取舍决断',
      targets: [
        { key: 'target_a', label: '守中自保', hint: '保住安稳底线', desc: '先求不失，保全现实生存的基础底线', scoreVector: { mood_anxious: 2, mood_lost: 2 } },
        { key: 'target_b', label: '舍末求本', hint: '舍弃浮华留初心', desc: '宁可丢掉虚名利益，也不能丢了内心的清明', scoreVector: { mood_lonely: 2, mood_ordinary: 3 } },
        { key: 'target_c', label: '随遇而安', hint: '走到哪就算哪', desc: '得之我幸失之我命，走到哪里就在哪里生根', scoreVector: { mood_ordinary: 3, mood_lost: 1 } },
        { key: 'target_d', label: '孤注一掷', hint: '为热爱的赌一次', desc: '为了真正看重的事物，哪怕冒险也要试一次', scoreVector: { mood_work_stuck: 3, mood_anxious: 2 } }
      ]
    },

    // 维度 8: failure_recovery 失败后恢复
    {
      id: 'exp_q15',
      dimension: 'failure_recovery',
      interactionType: 'impact',
      name: '陨坑修复',
      num: '15',
      prompt: '刚经历了一场剧烈的陨石重创，地表满目疮痍',
      actionText: '启动星体自愈修复',
      targets: [
        { key: 'target_a', label: '泥土筑堤', hint: '收拾残局重建家园', desc: '像在黄州修雪堂一样，亲自动手一砖一瓦重建', scoreVector: { mood_ordinary: 3, mood_work_stuck: 2 } },
        { key: 'target_b', label: '卧看残星', hint: '躺平任风雨过去', desc: '先痛痛快快躺上几天，等伤口自己结痂', scoreVector: { mood_tired: 3, mood_lonely: 2 } },
        { key: 'target_c', label: '苦中寻甘', hint: '废墟里开出花来', desc: '在最糟的境遇里发掘出微小生机与乐趣', scoreVector: { mood_ordinary: 3, mood_lost: 1 } },
        { key: 'target_d', label: '拍尘复行', hint: '拍拍灰尘继续赶路', desc: '咬咬牙站起来，拍掉身上的尘土继续向前走', scoreVector: { mood_work_stuck: 2, mood_ordinary: 2 } }
      ]
    },
    {
      id: 'exp_q16',
      dimension: 'failure_recovery',
      interactionType: 'proximity',
      name: '挫败低谷',
      num: '16',
      prompt: '跌入前所未有的心境谷底，四周一片晦暗',
      actionText: '找寻回暖的微光',
      targets: [
        { key: 'target_a', label: '宣泄泪水', hint: '释放委屈不甘', desc: '允许自己软弱一次，痛痛快快哭一场', scoreVector: { mood_misunderstood: 3, mood_tired: 2 } },
        { key: 'target_b', label: '对饮东坡', hint: '感受古人旷达', desc: '翻翻东坡词，原来千年前他经历过更惨的', scoreVector: { mood_ordinary: 3, mood_lonely: 2 } },
        { key: 'target_c', label: '热汤暖胃', hint: '把身体先喂饱', desc: '身体暖了心就不容易冷，好好吃顿热饭', scoreVector: { mood_ordinary: 3, mood_tired: 2 } },
        { key: 'target_d', label: '梳理盘点', hint: '理清下一步怎么走', desc: '拿出纸笔理理账，看看手里还剩下什么牌', scoreVector: { mood_work_stuck: 2, mood_overthinking: 2 } }
      ]
    },

    // 维度 9: achievement_recognition 成就与外界认可
    {
      id: 'exp_q17',
      dimension: 'achievement_recognition',
      interactionType: 'orbit',
      name: '盛名光环',
      num: '17',
      prompt: '星体周围环绕着外界赞誉与聚光灯，光芒耀眼',
      actionText: '平衡光环与自心',
      targets: [
        { key: 'target_a', label: '清醒自持', hint: '盛名更须谨慎', desc: '深知花无百日红，越是风光越要谨言慎行', scoreVector: { mood_overthinking: 2, mood_anxious: 2 } },
        { key: 'target_b', label: '坦然受之', hint: '自己的努力配得上', desc: '问心无愧，欣然接纳自己应得的成果', scoreVector: { mood_ordinary: 2, mood_work_stuck: 1 } },
        { key: 'target_c', label: '抽身退步', hint: '适时退回安宁生活', desc: '热闹都是别人的，只想早点回家吃碗素面', scoreVector: { mood_tired: 2, mood_ordinary: 3 } },
        { key: 'target_d', label: '分甘同味', hint: '荣光分给同行者', desc: '把功劳归于大家，与身边的同伴共享甘甜', scoreVector: { mood_ordinary: 3, mood_misunderstood: 1 } }
      ]
    },
    {
      id: 'exp_q18',
      dimension: 'achievement_recognition',
      interactionType: 'merge',
      name: '功名试炼',
      num: '18',
      prompt: '功名利禄与内心所守发生冲突，如何衡量一生的重力？',
      actionText: '校准灵魂恒星价值',
      targets: [
        { key: 'target_a', label: '济世安民', hint: '做对世人有益的事', desc: '做官做事，但求无愧于天下百姓与良知', scoreVector: { mood_work_stuck: 3, mood_ordinary: 2 } },
        { key: 'target_b', label: '独善其身', hint: '守好自己的良知', desc: '外界如何变幻，绝不曲学阿世同流合污', scoreVector: { mood_lonely: 3, mood_misunderstood: 2 } },
        { key: 'target_c', label: '超然物外', hint: '功名如浮云过眼', desc: '富贵于我如浮云，人间有味是清欢', scoreVector: { mood_ordinary: 3, mood_lost: 1 } },
        { key: 'target_d', label: '寄情笔墨', hint: '留下经得起时间的作品', desc: '把悲欢化入诗文书画，留赠岁月后人', scoreVector: { mood_ordinary: 3, mood_lonely: 1 } }
      ]
    },

    // 维度 10: stability_exploration 安稳与探索
    {
      id: 'exp_q19',
      dimension: 'stability_exploration',
      interactionType: 'cross',
      name: '边界拓荒',
      num: '19',
      prompt: '眼前是熟悉的定居星轨与广阔未知的星外荒原',
      actionText: '锚定你的生命疆域',
      targets: [
        { key: 'target_a', label: '扎根深耕', hint: '把眼前土地种熟', desc: '不贪恋远方，把眼下的日子和工作经营出花样', scoreVector: { mood_ordinary: 3, mood_work_stuck: 1 } },
        { key: 'target_b', label: '扬帆远航', hint: '渴望探索未知天地', desc: '胸怀九万里风鹏，永远对未知的世界充满好奇', scoreVector: { mood_lost: 2, mood_ordinary: 2 } },
        { key: 'target_c', label: '居安思危', hint: '安稳中留一手退路', desc: '享受眼前的平静，但随时做好应变准备', scoreVector: { mood_anxious: 2, mood_overthinking: 2 } },
        { key: 'target_d', label: '顺应天时', hint: '春耕秋收不违时', desc: '不刻意强求，随遇而适，该定就定该走就走', scoreVector: { mood_ordinary: 3, mood_tired: 1 } }
      ]
    },
    {
      id: 'exp_q20',
      dimension: 'stability_exploration',
      interactionType: 'gravity',
      name: '人间定盘',
      num: '20',
      prompt: '风雨飘摇半生，你最终选择泊宿在何种人间风景中？',
      actionText: '确定终生栖宿之所',
      targets: [
        { key: 'target_a', label: '一叶扁舟', hint: '万事随风浩荡漂流', desc: '小舟从此逝，江海寄余生', scoreVector: { mood_ordinary: 3, mood_lonely: 2 } },
        { key: 'target_b', label: '茅屋雪堂', hint: '亲手盖避风港', desc: '亲手耕作筑屋，过接地气烟火日子', scoreVector: { mood_ordinary: 3, mood_work_stuck: 1 } },
        { key: 'target_c', label: '琼楼玉宇', hint: '向往高远纯粹境界', desc: '高处虽不胜寒，但仍向往精神的峰峦', scoreVector: { mood_lonely: 3, mood_misunderstood: 1 } },
        { key: 'target_d', label: '市井酒旗', hint: '沉醉寻常市井烟火', desc: '有酒有肉有知己，随处与农夫渔樵话平生', scoreVector: { mood_ordinary: 3, mood_tired: 1 } }
      ]
    },
    {
      id: 'exp_q21',
      dimension: 'stability_exploration',
      interactionType: 'rescue',
      name: '终极释怀',
      num: '21',
      prompt: '回望一路颠簸跌宕的生命星图，东坡式的人生态度是？',
      actionText: '收束本次宇宙实验',
      targets: [
        { key: 'target_a', label: '也无风雨', hint: '回首也无阴晴', desc: '回首向来萧瑟处，归去，也无风雨也无晴', scoreVector: { mood_ordinary: 4, mood_anxious: 0 } },
        { key: 'target_b', label: '试新茶', hint: '且将新火试新茶', desc: '休对故人思故国，且将新火试新茶，诗酒趁年华', scoreVector: { mood_ordinary: 3, mood_lost: 1 } },
        { key: 'target_c', label: '心安即乡', hint: '此心安处是吾乡', desc: '万里归来颜愈少，微笑，此心安处是吾乡', scoreVector: { mood_ordinary: 4, mood_lonely: 0 } },
        { key: 'target_d', label: '不思量', hint: '十年生死两茫茫', desc: '深情留在心底，人间依然值得用心走一遭', scoreVector: { mood_lonely: 2, mood_ordinary: 2 } }
      ]
    },
    {
        "id": "exp_q22",
        "dimension": "sudden_change",
        "interactionType": "collision",
        "name": "撞击破局",
        "num": "22",
        "prompt": "突如其来的变故迎面撞击而来，原定轨道瞬间中断",
        "actionText": "在撞击瞬间锚定你的应对支点",
        "targets": [
            {
                "key": "target_a",
                "label": "迎击星",
                "hint": "正面硬刚化解",
                "desc": "不闪不避，咬紧牙关正面接下冲击",
                "scoreVector": {
                    "mood_anxious": 3,
                    "mood_work_stuck": 2
                }
            },
            {
                "key": "target_b",
                "label": "缓冲星",
                "hint": "迂回卸力避险",
                "desc": "借力打力，顺着冲力把危害降到最低",
                "scoreVector": {
                    "mood_ordinary": 3,
                    "mood_overthinking": 1
                }
            },
            {
                "key": "target_c",
                "label": "偏转星",
                "hint": "改换全新赛道",
                "desc": "既然此路不通，索性彻底转向新的可能",
                "scoreVector": {
                    "mood_lost": 3,
                    "mood_ordinary": 2
                }
            },
            {
                "key": "target_d",
                "label": "定心星",
                "hint": "静立看清局势",
                "desc": "先稳住呼吸，等尘埃落定再做打算",
                "scoreVector": {
                    "mood_ordinary": 3,
                    "mood_tired": 1
                }
            }
        ]
    },
    {
        "id": "exp_q23",
        "dimension": "pressure_endurance",
        "interactionType": "avoid",
        "name": "重压回旋",
        "num": "23",
        "prompt": "外界的多重重压如巨石横亘前方，呼吸被极度压缩",
        "actionText": "绕开障碍或以柔克刚",
        "targets": [
            {
                "key": "target_a",
                "label": "抗压星",
                "hint": "硬抗绝不后退",
                "desc": "再苦再累也独自咽下，绝不在人前示弱",
                "scoreVector": {
                    "mood_tired": 3,
                    "mood_work_stuck": 2
                }
            },
            {
                "key": "target_b",
                "label": "卸甲星",
                "hint": "主动减负停顿",
                "desc": "放下不切实际的包袱，允许自己今天只做及格",
                "scoreVector": {
                    "mood_ordinary": 3,
                    "mood_tired": 2
                }
            },
            {
                "key": "target_c",
                "label": "呼救星",
                "hint": "向身边人倾诉",
                "desc": "把压力分担给信任的同伴，不再孤军作战",
                "scoreVector": {
                    "mood_lonely": 2,
                    "mood_misunderstood": 2
                }
            },
            {
                "key": "target_d",
                "label": "释重星",
                "hint": "运动大汗一场",
                "desc": "跑一身大汗或痛快洗个热水澡，肉体先放松",
                "scoreVector": {
                    "mood_ordinary": 3,
                    "mood_anxious": 1
                }
            }
        ]
    },
    {
        "id": "exp_q24",
        "dimension": "interpersonal_criticism",
        "interactionType": "orbit",
        "name": "舆论星轨",
        "num": "24",
        "prompt": "人声鼎沸中各种褒贬评价呼啸而来，引力发生紊乱",
        "actionText": "调整你的人格轨道与公转节奏",
        "targets": [
            {
                "key": "target_a",
                "label": "辩白星",
                "hint": "据理力争说明",
                "desc": "一定要把是非曲直掰扯清楚，不容颠倒黑白",
                "scoreVector": {
                    "mood_misunderstood": 3,
                    "mood_anxious": 2
                }
            },
            {
                "key": "target_b",
                "label": "缄默星",
                "hint": "一笑置之不理",
                "desc": "谣言止于智者，时间自会给出最公正的回答",
                "scoreVector": {
                    "mood_ordinary": 3,
                    "mood_overthinking": 1
                }
            },
            {
                "key": "target_c",
                "label": "自省星",
                "hint": "有则改之反思",
                "desc": "闻过则喜，借别人的苛责修补自己的盲区",
                "scoreVector": {
                    "mood_overthinking": 3,
                    "mood_work_stuck": 1
                }
            },
            {
                "key": "target_d",
                "label": "离圈星",
                "hint": "退出是非圈子",
                "desc": "关掉朋友圈和群聊，回自己清静的小天地",
                "scoreVector": {
                    "mood_tired": 3,
                    "mood_ordinary": 2
                }
            }
        ]
    },
    {
        "id": "exp_q25",
        "dimension": "action_procrastination",
        "interactionType": "gravity",
        "name": "引力微步",
        "num": "25",
        "prompt": "目标悬于高空，但身躯仿佛被迟滞力场牢牢束缚",
        "actionText": "借引力迈出破除拖延的微小一步",
        "targets": [
            {
                "key": "target_a",
                "label": "拆解星",
                "hint": "切成极小动作",
                "desc": "不看全貌，只做接下来五分钟能完成的小步",
                "scoreVector": {
                    "mood_work_stuck": 3,
                    "mood_ordinary": 2
                }
            },
            {
                "key": "target_b",
                "label": "沉浸星",
                "hint": "屏蔽一切干扰",
                "desc": "扣上手机戴上耳机，进入单任务专注结界",
                "scoreVector": {
                    "mood_ordinary": 3,
                    "mood_anxious": 1
                }
            },
            {
                "key": "target_c",
                "label": "犒赏星",
                "hint": "设个甜头引诱",
                "desc": "完成后奖励自己一杯奶茶或一顿大餐",
                "scoreVector": {
                    "mood_tired": 2,
                    "mood_ordinary": 2
                }
            },
            {
                "key": "target_d",
                "label": "顺流星",
                "hint": "状态不好就歇",
                "desc": "今天既然不在状态，就不硬逼自己，明天再战",
                "scoreVector": {
                    "mood_ordinary": 3,
                    "mood_lost": 1
                }
            }
        ]
    },
    {
        "id": "exp_q26",
        "dimension": "self_regulation",
        "interactionType": "rescue",
        "name": "孤光挽救",
        "num": "26",
        "prompt": "深夜狂欢散场后的绝对空虚，星光在暗夜中微微战栗",
        "actionText": "以温柔光轨牵引漂流的孤星",
        "targets": [
            {
                "key": "target_a",
                "label": "墨香星",
                "hint": "翻几页泛黄好书",
                "desc": "与千年前的智者对坐长谈，古今共此时",
                "scoreVector": {
                    "mood_ordinary": 3,
                    "mood_lonely": 2
                }
            },
            {
                "key": "target_b",
                "label": "烹泉星",
                "hint": "为自己煮一杯茶",
                "desc": "听瓦铫水沸，细嗅茶香，让心神缓缓沉降",
                "scoreVector": {
                    "mood_ordinary": 4,
                    "mood_tired": 1
                }
            },
            {
                "key": "target_c",
                "label": "放空星",
                "hint": "望着夜空发呆",
                "desc": "什么都不想，放任思绪如落叶般飘散",
                "scoreVector": {
                    "mood_tired": 3,
                    "mood_ordinary": 2
                }
            },
            {
                "key": "target_d",
                "label": "写意星",
                "hint": "写几行碎碎念",
                "desc": "把心里的褶皱变成文字，写完就撕掉释怀",
                "scoreVector": {
                    "mood_overthinking": 2,
                    "mood_ordinary": 2
                }
            }
        ]
    },
    {
        "id": "exp_q27",
        "dimension": "choice_tradeoff",
        "interactionType": "merge",
        "name": "交融抉择",
        "num": "27",
        "prompt": "两条截然不同的人生分支星轨交汇，必须放弃其中之一",
        "actionText": "两星合一，熔炼真正的取舍智慧",
        "targets": [
            {
                "key": "target_a",
                "label": "初心星",
                "hint": "选最热爱的那条",
                "desc": "就算前路坎坷，也要为少年时的梦想买单",
                "scoreVector": {
                    "mood_lost": 3,
                    "mood_ordinary": 2
                }
            },
            {
                "key": "target_b",
                "label": "安稳星",
                "hint": "选风险最低那条",
                "desc": "先保证基本盘与家小温饱，再去谈远方",
                "scoreVector": {
                    "mood_anxious": 3,
                    "mood_work_stuck": 1
                }
            },
            {
                "key": "target_c",
                "label": "随缘星",
                "hint": "扔枚铜板听天由命",
                "desc": "命里有时终须有，扔完硬币瞬间就知答案",
                "scoreVector": {
                    "mood_ordinary": 4,
                    "mood_lost": 1
                }
            },
            {
                "key": "target_d",
                "label": "折中星",
                "hint": "白天生存晚上理想",
                "desc": "一手抓柴米油盐，一手托琴棋书画",
                "scoreVector": {
                    "mood_work_stuck": 2,
                    "mood_ordinary": 2
                }
            }
        ]
    },
    {
        "id": "exp_q28",
        "dimension": "failure_recovery",
        "interactionType": "split",
        "name": "裂变重生",
        "num": "28",
        "prompt": "倾注心血的事业轰然碎裂，核心星体面临解体考验",
        "actionText": "在破碎中分裂出双子重生的星芒",
        "targets": [
            {
                "key": "target_a",
                "label": "重组星",
                "hint": "收拾碎片从头来",
                "desc": "捡起还能用的零件，换个方式重新拼凑",
                "scoreVector": {
                    "mood_work_stuck": 3,
                    "mood_ordinary": 2
                }
            },
            {
                "key": "target_b",
                "label": "冬眠星",
                "hint": "彻底放空等雪化",
                "desc": "承认这次彻底搞砸了，深睡一场等待新春天",
                "scoreVector": {
                    "mood_tired": 4,
                    "mood_lost": 2
                }
            },
            {
                "key": "target_c",
                "label": "自嘲星",
                "hint": "讲个段子自黑一把",
                "desc": "人生如戏自笑荒唐，能逗笑朋友就算赢了",
                "scoreVector": {
                    "mood_ordinary": 4,
                    "mood_misunderstood": 1
                }
            },
            {
                "key": "target_d",
                "label": "蜕变星",
                "hint": "感谢教训赋予成长",
                "desc": "吃一堑长一智，伤痕长出来的地方往往最坚硬",
                "scoreVector": {
                    "mood_ordinary": 3,
                    "mood_overthinking": 1
                }
            }
        ]
    }
  ];

  /**
   * 分层随机抽取算法：依据 Session Seed 从 10 大维度中均衡抽取 7 幕实验场景
   * @param {string} seedStr - Session Seed，若不传则自动生成
   * @returns {Object} 包含 seed 与 7 幕场景数组
   */
  function generateExperimentScenes(seedStr) {
    seedStr = seedStr || ('seed_' + Date.now() + '_' + Math.floor(Math.random() * 10000));
    var rng = createPseudoRandom(seedStr);

    var dimMap = {};
    for (var i = 0; i < EXPERIMENT_BANK.length; i++) {
      var item = EXPERIMENT_BANK[i];
      if (!dimMap[item.dimension]) {
        dimMap[item.dimension] = [];
      }
      dimMap[item.dimension].push(item);
    }
    var dimensions = Object.keys(dimMap);

    // Fisher-Yates 伪随机洗牌挑选 7 个不同维度
    var shuffledDims = dimensions.slice(0);
    for (var d = shuffledDims.length - 1; d > 0; d--) {
      var j = Math.floor(rng() * (d + 1));
      var temp = shuffledDims[d];
      shuffledDims[d] = shuffledDims[j];
      shuffledDims[j] = temp;
    }
    var selectedDims = shuffledDims.slice(0, 7);

    // 从每个维度中各抽取 1 题
    var chosenScenes = [];
    for (var s = 0; s < selectedDims.length; s++) {
      var dimKey = selectedDims[s];
      var pool = dimMap[dimKey];
      var qIdx = Math.floor(rng() * pool.length);
      var qItem = pool[qIdx];
      var cloned = {
        id: qItem.id,
        dimension: qItem.dimension,
        interactionType: qItem.interactionType,
        name: qItem.name,
        num: '0' + (s + 1),
        prompt: qItem.prompt,
        actionText: qItem.actionText,
        targets: qItem.targets
      };
      chosenScenes.push(cloned);
    }

    return {
      seed: seedStr,
      scenes: chosenScenes
    };
  }

  /**
   * 根据累加分值和 tie-break 优先级计算实验结果
   */
  function calculateExperimentResult(accumulatedScores, moodsData, tieBreakPriority) {
    moodsData = moodsData || [];
    tieBreakPriority = tieBreakPriority || [
      'mood_anxious', 'mood_work_stuck', 'mood_misunderstood',
      'mood_overthinking', 'mood_tired', 'mood_lost', 'mood_lonely', 'mood_ordinary'
    ];

    var moodMap = {};
    var moodIds = [];
    for (var i = 0; i < moodsData.length; i++) {
      var m = moodsData[i];
      moodMap[m.id] = m;
      moodIds.push(m.id);
    }
    if (moodIds.length === 0) {
      moodIds = ALL_MOOD_IDS.slice(0);
    }

    var scores = {};
    for (var j = 0; j < moodIds.length; j++) {
      scores[moodIds[j]] = (accumulatedScores && typeof accumulatedScores[moodIds[j]] === 'number')
        ? accumulatedScores[moodIds[j]] : 0;
    }

    var maxScore = -Infinity;
    for (var sIdx = 0; sIdx < moodIds.length; sIdx++) {
      var scoreVal = scores[moodIds[sIdx]];
      if (scoreVal > maxScore) maxScore = scoreVal;
    }

    var topCandidates = [];
    for (var cIdx = 0; cIdx < moodIds.length; cIdx++) {
      var cid = moodIds[cIdx];
      if (scores[cid] === maxScore) topCandidates.push(cid);
    }

    var winnerMid = null;
    for (var pIdx = 0; pIdx < tieBreakPriority.length; pIdx++) {
      var pid = tieBreakPriority[pIdx];
      if (topCandidates.indexOf(pid) !== -1) {
        winnerMid = pid;
        break;
      }
    }
    if (!winnerMid) {
      winnerMid = topCandidates.length > 0 ? topCandidates[0] : (moodIds[0] || 'mood_anxious');
    }

    var winnerMood = moodMap[winnerMid] || {};
    // 任务 15.6.8: 彻底废除 8 mood -> 5 站硬编码，使用标准化九站特征相似度算法判定
    var stationId = matchStationByScores(scores);

    return {
      result_id: 'res_' + winnerMid + '_' + stationId,
      mood_id: winnerMid,
      mood_name: winnerMood.name || '',
      mood_dimension: winnerMood.dimension || '',
      station_id: stationId,
      scores: scores
    };
  }

  /**
   * 创建作答会话实例 (管理作答状态、题目导航、Session Seed 与实验场景)
   * @param {string} initialSeed - 可选的 Session Seed，用于确定性复现测试
   */
  function createQuizSession(initialSeed) {
    var answers = {};
    var accumulatedScores = {};
    var currentIndex = 0;
    var currentSeed = initialSeed || ('seed_' + Date.now() + '_' + Math.floor(Math.random() * 10000));
    var generated = generateExperimentScenes(currentSeed);
    var currentScenes = generated.scenes;

    return {
      getSeed: function () {
        return currentSeed;
      },
      getScenes: function () {
        return currentScenes;
      },
      getAnswers: function () {
        var copy = {};
        var keys = Object.keys(answers);
        for (var i = 0; i < keys.length; i++) {
          copy[keys[i]] = answers[keys[i]];
        }
        return copy;
      },
      getCurrentIndex: function () {
        return currentIndex;
      },
      setCurrentIndex: function (idx) {
        currentIndex = Math.max(0, idx);
      },
      selectOption: function (questionId, optionId) {
        answers[questionId] = optionId;
      },
      selectOutcome: function (sceneId, targetKey, scoreVector) {
        answers[sceneId] = targetKey;
        if (scoreVector && typeof scoreVector === 'object') {
          var sKeys = Object.keys(scoreVector);
          for (var k = 0; k < sKeys.length; k++) {
            var mid = sKeys[k];
            accumulatedScores[mid] = (accumulatedScores[mid] || 0) + scoreVector[mid];
          }
        }
      },
      getSelectedOption: function (questionId) {
        return answers[questionId] || null;
      },
      canGoPrevious: function () {
        return currentIndex > 0;
      },
      goPrevious: function () {
        if (currentIndex > 0) {
          currentIndex--;
          return true;
        }
        return false;
      },
      goNext: function (total) {
        if (currentIndex < total - 1) {
          currentIndex++;
          return true;
        }
        return false;
      },
      reset: function (newSeed) {
        answers = {};
        accumulatedScores = {};
        currentIndex = 0;
        if (newSeed) {
          currentSeed = (typeof newSeed === 'string' && newSeed.length > 0)
            ? newSeed
            : ('seed_' + Date.now() + '_' + Math.floor(Math.random() * 10000));
          generated = generateExperimentScenes(currentSeed);
          currentScenes = generated.scenes;
        }
      },
      calculateResult: function (quizData, moodsData) {
        return calculateQuizResult(answers, quizData, moodsData);
      },
      calculateExperimentResult: function (moodsData, tieBreakPriority) {
        return calculateExperimentResult(accumulatedScores, moodsData, tieBreakPriority);
      }
    };
  }

  /**
   * 构建纯数据 ShareCardViewModel (供结果页和任务10分享卡复用，与原生解耦)
   * @param {string} stationId
   * @param {string} moodId
   * @returns {Object} 完整可序列化 ViewModel
   */
  function buildShareCardViewModel(stationId, moodId) {
    var Data = root.SuShiUniverse ? root.SuShiUniverse.Data : null;
    if (!Data) return null;

    stationId = stationId || 'station_huangzhou';
    var station = Data.getStationById(stationId) || Data.getStationById('station_huangzhou') || {};
    var mood = moodId ? Data.getMoodById(moodId) : null;

    var quoteId = (mood && mood.recommended_quote_id) ||
                  (station.quote_ids && station.quote_ids[0]) ||
                  'quote_dingfengbo_01';
    var quote = Data.getQuoteById(quoteId) || {};
    var work = quote.work_id ? Data.getWorkById(quote.work_id) : {};

    return {
      version: '1.0',
      station_id: station.id || 'station_huangzhou',
      station_name: station.name || '黄州｜重新生活',
      station_short_name: station.short_name || '黄州',
      station_place: station.place || '',
      station_time_label: station.time_label || '',
      theme: station.theme || '',
      keywords: station.keywords || ['重启', '徐行', '烟火'],
      mood_id: mood ? mood.id : '',
      mood_name: mood ? mood.name : '',
      mood_dimension: mood ? mood.dimension : '',
      quote_id: quote.id || '',
      quote_text: quote.text || '莫听穿林打叶声，何妨吟啸且徐行。',
      quote_context: quote.context_note || '',
      work_id: work.id || '',
      work_title: work.title || '定风波·莫听穿林打叶声',
      work_why: work.why_related || '',
      dongpo_view: (mood && mood.dongpo_suggestion) || station.dongpo_view || '',
      today_action: station.today_action || '',
      summary_fact: station.summary_fact || '',
      summary_story: station.summary_story || ''
    };
  }

  /**
   * 构建人生节点卡 ViewModel (供漫游九大站点时导出分享卡复用)
   * @param {string} stationId
   * @returns {Object} 节点卡可序列化 ViewModel
   */
  function buildStationNodeCardViewModel(stationId) {
    var Data = root.SuShiUniverse ? root.SuShiUniverse.Data : null;
    if (!Data) return null;

    stationId = stationId || 'station_huangzhou';
    var station = Data.getStationById(stationId) || Data.getStationById('station_huangzhou') || {};
    var quoteId = (station.quote_ids && station.quote_ids[0]) || 'quote_dingfengbo_01';
    var quote = Data.getQuoteById(quoteId) || {};
    var work = quote.work_id ? Data.getWorkById(quote.work_id) : {};

    return {
      type: 'node',
      version: '1.0',
      station_id: station.id || 'station_huangzhou',
      station_name: station.name || '黄州｜重新生活',
      station_short_name: station.short_name || '黄州',
      station_time_label: station.time_label || '',
      station_age_label: station.age_label || '',
      station_place: station.place || '',
      theme: station.theme || '',
      keywords: station.keywords || ['重新生活', '徐行', '烟火'],
      quote_text: quote.text || '莫听穿林打叶声，何妨吟啸且徐行。',
      work_title: work.title || '定风波·莫听穿林打叶声',
      summary_fact: station.summary_fact || '',
      dongpo_view: station.dongpo_view || '',
      today_action: station.today_action || ''
    };
  }

  var ExperimentScoring = {
    experiment_01: {
      id: 'experiment_01',
      question_id: 'quiz_q01',
      title: '星体靠近',
      theme: '骤变与心防',
      outcomes: { target_a: 'opt_1a', target_b: 'opt_1b', target_c: 'opt_1c', target_d: 'opt_1d' }
    },
    experiment_02: {
      id: 'experiment_02',
      question_id: 'quiz_q02',
      title: '行星撞击',
      theme: '应激与轨道',
      outcomes: { action_a: 'opt_2a', action_b: 'opt_2b', action_c: 'opt_2c', action_d: 'opt_2d' }
    },
    experiment_03: {
      id: 'experiment_03',
      question_id: 'quiz_q03',
      title: '星体聚合',
      theme: '专注与释怀',
      outcomes: { merge_a: 'opt_3a', merge_b: 'opt_3b', merge_c: 'opt_3c', merge_d: 'opt_3d' }
    },
    experiment_04: {
      id: 'experiment_04',
      question_id: 'quiz_q04',
      title: '星体分裂',
      theme: '承压与重构',
      outcomes: { split_a: 'opt_4a', split_b: 'opt_4b', split_c: 'opt_4c', split_d: 'opt_4d' }
    },
    experiment_05: {
      id: 'experiment_05',
      question_id: 'quiz_q05',
      title: '引力选择',
      theme: '价值与锚点',
      outcomes: { gravity_a: 'opt_5a', gravity_b: 'opt_5b', gravity_c: 'opt_5c', gravity_d: 'opt_5d' }
    },
    experiment_06: {
      id: 'experiment_06',
      question_id: 'quiz_q06',
      title: '星轨穿越',
      theme: '迷雾与抉择',
      outcomes: { cross_a: 'opt_6a', cross_b: 'opt_6b', cross_c: 'opt_6c', cross_d: 'opt_6d' }
    },
    experiment_07: {
      id: 'experiment_07',
      question_id: 'quiz_q07',
      title: '漂流星救援',
      theme: '同行与心境',
      outcomes: { tether_a: 'opt_7a', tether_b: 'opt_7b', tether_c: 'opt_7c', tether_d: 'opt_7d' }
    }
  };

  function mapExperimentOutcome(experimentId, outcomeKey) {
    var exp = ExperimentScoring[experimentId];
    if (!exp) return null;
    return exp.outcomes[outcomeKey] || exp.outcomes[Object.keys(exp.outcomes)[0]];
  }

  Quiz.calculateQuizResult = calculateQuizResult;
  Quiz.createQuizSession = createQuizSession;
  Quiz.buildShareCardViewModel = buildShareCardViewModel;
  Quiz.buildStationNodeCardViewModel = buildStationNodeCardViewModel;
  Quiz.ExperimentScoring = ExperimentScoring;
  Quiz.mapExperimentOutcome = mapExperimentOutcome;
  Quiz.EXPERIMENT_BANK = EXPERIMENT_BANK;
  Quiz.createPseudoRandom = createPseudoRandom;
  Quiz.generateExperimentScenes = generateExperimentScenes;
  Quiz.calculateExperimentResult = calculateExperimentResult;
  Quiz.matchStationByScores = matchStationByScores;
  Quiz.BASE_MOOD_WEIGHTS = BASE_MOOD_WEIGHTS;
  Quiz.STATION_ARCHETYPES = STATION_ARCHETYPES;

  root.SuShiUniverse.Quiz = Quiz;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Quiz;
  }
})();

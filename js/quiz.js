/**
 * 苏轼宇宙小红书小工具 - 东坡人生状态测试系统核心算法与状态会话
 * 遵循基线：ES2017 / Chrome 61 / Classic Script / CSP Safe
 * 纯本地离线评分，无随机数，无外部接口，严格遵循 tie-break 优先级
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  if (!root.SuShiUniverse) {
    root.SuShiUniverse = {};
  }

  var Quiz = {};

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
    var stationId = winnerMood.primary_station_id || 'station_huangzhou';

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
   * 创建作答会话实例 (管理作答状态、题目导航与暂存)
   */
  function createQuizSession() {
    var answers = {};
    var currentIndex = 0;

    return {
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
      reset: function () {
        answers = {};
        currentIndex = 0;
      },
      calculateResult: function (quizData, moodsData) {
        return calculateQuizResult(answers, quizData, moodsData);
      }
    };
  }

  Quiz.calculateQuizResult = calculateQuizResult;
  Quiz.createQuizSession = createQuizSession;

  root.SuShiUniverse.Quiz = Quiz;
})();

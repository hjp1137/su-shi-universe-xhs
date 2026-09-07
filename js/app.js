/**
 * 苏轼宇宙小红书小工具 - 主业务逻辑入口
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 依赖关系：须在 namespace.js, data.js, bridge.js 之后加载
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || {};

  var currentIndex = 0;
  var btnExplore = null;
  var feedbackText = null;

  // 默认备选文案（数据未加载时的兜底）
  var fallbackQuotes = [
    '莫听穿林打叶声，何妨吟啸且徐行。',
    '人间有味是清欢。',
    '万里归来颜愈少，微笑，笑时犹带岭梅香。',
    '小舟从此逝，江海寄余生。',
    '且将新火试新茶，诗酒趁年华。'
  ];

  function getDailyList() {
    if (SuShi.Data && Array.isArray(SuShi.Data.dailyDongpo) && SuShi.Data.dailyDongpo.length > 0) {
      return SuShi.Data.dailyDongpo;
    }
    return null;
  }

  function init() {
    btnExplore = document.getElementById('btn-explore');
    feedbackText = document.getElementById('feedback-text');

    if (btnExplore) {
      btnExplore.addEventListener('click', handleExploreClick);
    }

    // 检查并确认本地数据底座装载状态
    if (SuShi.Data && SuShi.Data.stations) {
      console.log('[SuShiUniverse] 本地数据底座装载成功：' +
                  SuShi.Data.stations.length + ' 个站点，' +
                  SuShi.Data.works.length + ' 部作品，' +
                  SuShi.Data.quotes.length + ' 条诗句。');
    } else {
      console.warn('[SuShiUniverse] 未检测到离线数据底座，使用兜底逻辑');
    }

    // 探测官方容器环境
    var bridge = SuShi.Bridge;
    if (bridge && bridge.isAvailable()) {
      console.log('[SuShiUniverse] 运行在小红书官方 Native 容器内');
    } else {
      console.log('[SuShiUniverse] 运行在离线 H5 本地预览环境中');
    }
  }

  function handleExploreClick() {
    var dailyList = getDailyList();
    var displayText = '';

    if (dailyList) {
      var item = dailyList[currentIndex % dailyList.length];
      currentIndex += 1;
      // 联动查询 quote 原文
      var quoteObj = SuShi.Data.getQuoteById(item.quote_id);
      var quoteText = quoteObj ? quoteObj.text : item.quote_id;
      displayText = '“' + quoteText + '” —— ' + item.dongpo_view;
    } else {
      displayText = fallbackQuotes[currentIndex % fallbackQuotes.length];
      currentIndex += 1;
    }

    if (feedbackText) {
      feedbackText.textContent = displayText;
    }
  }

  // 挂载至应用命名空间
  SuShi.App.init = init;
  SuShi.App.handleExploreClick = handleExploreClick;

  // 页面加载启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

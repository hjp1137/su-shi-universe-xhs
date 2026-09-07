/**
 * 苏轼宇宙小红书小工具 - 主业务逻辑入口
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 依赖关系：须在 namespace.js, bridge.js 之后加载
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || {};

  var quotes = [
    '莫听穿林打叶声，何妨吟啸且徐行。',
    '人间有味是清欢。',
    '万里归来颜愈少，微笑，笑时犹带岭梅香。',
    '小舟从此逝，江海寄余生。',
    '且将新火试新茶，诗酒趁年华。'
  ];

  var currentIndex = 0;
  var btnExplore = null;
  var feedbackText = null;

  function init() {
    btnExplore = document.getElementById('btn-explore');
    feedbackText = document.getElementById('feedback-text');

    if (btnExplore) {
      // 优先使用 click 兼容 PC 与移动端
      btnExplore.addEventListener('click', handleExploreClick);
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
    var quote = quotes[currentIndex % quotes.length];
    currentIndex += 1;

    if (feedbackText) {
      feedbackText.textContent = quote;
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

/**
 * 苏轼宇宙小红书小工具 - 主入口脚本
 * 兼容基线：ES2017 / Chrome 61
 * 遵循规范：经典脚本模式（非 ES Module），无行内事件，纯外置脚本
 */

(function () {
  'use strict';

  // 状态与配置
  var quotes = [
    '莫听穿林打叶声，何妨吟啸且徐行。',
    '人间有味是清欢。',
    '万里归来颜愈少，微笑，笑时犹带岭梅香。',
    '小舟 caller 逝，江海寄余生。',
    '且将新火试新茶，诗酒趁年华。'
  ];

  var currentIndex = 0;

  // DOM 元素引用
  var btnExplore = null;
  var feedbackText = null;

  // 初始化交互逻辑
  function init() {
    btnExplore = document.getElementById('btn-explore');
    feedbackText = document.getElementById('feedback-text');

    if (btnExplore) {
      btnExplore.addEventListener('click', handleExploreClick);
    }

    checkPlatformBridge();
  }

  // 按钮交互处理
  function handleExploreClick() {
    var quote = quotes[currentIndex % quotes.length];
    currentIndex += 1;

    if (feedbackText) {
      feedbackText.textContent = quote;
    }
  }

  // 平台 JSBridge 探测（预留适配）
  function checkPlatformBridge() {
    var isXhsContainer = false;
    try {
      if (window.xhs && window.xhs.miniTool) {
        isXhsContainer = true;
      }
    } catch (e) {
      // 容错处理
    }

    if (isXhsContainer) {
      // 运行在官方容器内
      console.log('Running inside XHS miniTool container.');
    } else {
      // 运行在本地调试或预览环境中
      console.log('Running in standard preview environment.');
    }
  }

  // 页面加载完成后启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

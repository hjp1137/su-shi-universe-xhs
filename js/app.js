/**
 * 苏轼宇宙小红书小工具 - 主业务入口与 App Shell 协同器
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || {};
  var Router = SuShi.Router;
  var UI = SuShi.UI;

  var viewTitles = {
    'home': '苏轼宇宙',
    'quiz': '人生问答',
    'result': '东坡站点',
    'universe': '宇宙生命线',
    'station': '站点详情',
    'work': '作品赏析',
    'daily': '今日东坡',
    'share-card': '卡片预览',
    'error-demo': '系统状态'
  };

  var navTitleEl = null;
  var navLeftEl = null;

  function handleViewChange(info) {
    if (!navTitleEl || !navLeftEl) {
      navTitleEl = document.getElementById('nav-title');
      navLeftEl = document.getElementById('nav-left');
    }

    // 1. 动态更新顶部标题
    if (navTitleEl) {
      var titleText = viewTitles[info.name] || '苏轼宇宙';
      navTitleEl.textContent = titleText;
    }

    // 2. 动态管理返回按钮
    if (navLeftEl) {
      while (navLeftEl.firstChild) {
        navLeftEl.removeChild(navLeftEl.firstChild);
      }

      if (info.canBack && info.name !== 'home') {
        var backBtn = UI.createBackButton(function () {
          Router.back();
        });
        navLeftEl.appendChild(backBtn);
      }
    }
  }

  function init() {
    navTitleEl = document.getElementById('nav-title');
    navLeftEl = document.getElementById('nav-left');

    // 监听逻辑路由变化
    if (Router && typeof Router.onViewChange === 'function') {
      Router.onViewChange(handleViewChange);
    }

    // 校验离线数据底座装载状态
    if (SuShi.Data && SuShi.Data.stations) {
      console.log('[SuShiUniverse] 离线数据底座就绪：' +
                  SuShi.Data.stations.length + ' 站点，' +
                  SuShi.Data.works.length + ' 作品，' +
                  SuShi.Data.quotes.length + ' 诗句');
    } else {
      console.warn('[SuShiUniverse] 离线数据底座未就绪');
    }

    // 探测小红书官方 Native Bridge
    if (SuShi.Bridge && SuShi.Bridge.isAvailable()) {
      console.log('[SuShiUniverse] 官方容器 Native Bridge 已连接');
    } else {
      console.log('[SuShiUniverse] 运行于离线 H5 预览环境');
    }

    // 初始导航至首页视图
    if (Router && typeof Router.navigate === 'function') {
      Router.navigate('home', {}, true);
    }
  }

  // 挂载至命名空间
  SuShi.App.init = init;

  // DOM 就绪后启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

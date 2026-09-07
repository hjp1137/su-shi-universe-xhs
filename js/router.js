/**
 * 苏轼宇宙小红书小工具 - 离线轻量视图路由器
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 支持 8 个核心逻辑视图：home, quiz, result, universe, station, work, daily, share-card
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || {};
  var Router = SuShi.Router || {};

  var views = {};
  var historyStack = [];
  var currentViewName = 'home';
  var currentParams = {};
  var changeListeners = [];

  // 1. 注册视图处理器
  function register(name, handler) {
    if (typeof name !== 'string' || !name) return;
    views[name] = handler;
  }

  // 2. 导航切换到指定视图
  function navigate(name, params, replace) {
    if (!views[name]) {
      console.warn('[Router] 未注册的视图:', name);
      name = 'home';
    }

    params = params || {};

    if (currentViewName && !replace) {
      historyStack.push({ name: currentViewName, params: currentParams });
    }

    var prevView = currentViewName;
    currentViewName = name;
    currentParams = params;

    // 执行旧视图销毁与新视图渲染
    if (prevView && views[prevView] && typeof views[prevView].destroy === 'function') {
      try {
        views[prevView].destroy();
      } catch (e) {
        console.error('[Router] 视图销毁异常:', e);
      }
    }

    var targetView = views[name];
    var container = document.getElementById('view-container');
    if (container && targetView && typeof targetView.render === 'function') {
      try {
        // 清理旧视图 DOM
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        // 渲染新视图 DOM
        var viewNode = targetView.render(params);
        if (viewNode instanceof HTMLElement) {
          container.appendChild(viewNode);
        }
        // 重置滚动条至顶部
        container.scrollTop = 0;
      } catch (err) {
        console.error('[Router] 视图渲染异常:', err);
      }
    }

    // 触发监听器通知 App Shell 更新标题和返回键状态
    notifyChange(name, params);
  }

  // 3. 返回上一逻辑视图
  function back() {
    if (historyStack.length > 0) {
      var prev = historyStack.pop();
      navigate(prev.name, prev.params, true);
    } else {
      if (currentViewName !== 'home') {
        navigate('home', {}, true);
      }
    }
  }

  // 4. 获取当前视图信息
  function getCurrentView() {
    return currentViewName;
  }

  function getParams() {
    return currentParams;
  }

  function canGoBack() {
    return historyStack.length > 0 || currentViewName !== 'home';
  }

  // 5. 监听视图变更
  function onViewChange(cb) {
    if (typeof cb === 'function') {
      changeListeners.push(cb);
    }
  }

  function notifyChange(name, params) {
    for (var i = 0; i < changeListeners.length; i++) {
      try {
        changeListeners[i]({
          name: name,
          params: params,
          canBack: canGoBack()
        });
      } catch (e) {
        console.error('[Router] 监听回调异常:', e);
      }
    }
  }

  // 挂载至 SuShiUniverse.Router
  Router.register = register;
  Router.navigate = navigate;
  Router.back = back;
  Router.getCurrentView = getCurrentView;
  Router.getParams = getParams;
  Router.canGoBack = canGoBack;
  Router.onViewChange = onViewChange;

  SuShi.Router = Router;
})();

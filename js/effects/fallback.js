/**
 * 苏轼宇宙小红书小工具 - 非 WebGL 兜底系统 (Fallback Engine)
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 核心保证：当 WebGL 初始化失败、运行时 Context 丢失或性能降至最低档时，
 * 纯 CSS + Canvas 2D 水墨背景平滑接管，全工具核心业务依赖度为 0。
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || (root.SuShiUniverse = {});
  var Effects = SuShi.Effects || (SuShi.Effects = {});

  var activeFallbackContainer = null;

  function FallbackEngine() {}

  FallbackEngine.prototype.mount = function (container, sceneName, params) {
    activeFallbackContainer = container || document.getElementById('universe-bg-fx');
    var bgFx = activeFallbackContainer;
    if (!bgFx) return;

    bgFx.style.display = 'block';
    bgFx.classList.add('fallback-active');

    // 根据场景定制静态/微动效水墨氛围
    if (sceneName === 'universe' || sceneName === 'result') {
      var stationId = (params && params.station_id) || 'station_huangzhou';
      this.setStation(stationId);
    }
  };

  FallbackEngine.prototype.setStation = function (stationId) {
    var bgFx = document.getElementById('universe-bg-fx');
    if (!bgFx) return;

    // 清理旧的站点专属类
    var classes = bgFx.className.split(' ');
    var newClasses = [];
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].indexOf('fx-station-') !== 0) {
        newClasses.push(classes[i]);
      }
    }
    if (stationId) {
      var cleanId = stationId.replace('station_', '');
      newClasses.push('fx-station-' + cleanId);
    }
    bgFx.className = newClasses.join(' ');
  };

  FallbackEngine.prototype.unmount = function () {
    var bgFx = document.getElementById('universe-bg-fx');
    if (bgFx) {
      bgFx.classList.remove('fallback-active');
    }
    activeFallbackContainer = null;
  };

  Effects.FallbackEngine = FallbackEngine;
})();

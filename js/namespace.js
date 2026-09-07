/**
 * 苏轼宇宙小红书小工具 - 全局命名空间
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 */

(function () {
  'use strict';

  // 统一挂载到 window.SuShiUniverse
  var root = typeof window !== 'undefined' ? window : this;
  root.SuShiUniverse = root.SuShiUniverse || {};

  // 初始化核心子模块命名空间
  root.SuShiUniverse.version = '0.1.1';
  root.SuShiUniverse.Bridge = root.SuShiUniverse.Bridge || {};
  root.SuShiUniverse.Data = root.SuShiUniverse.Data || {};
  root.SuShiUniverse.Store = root.SuShiUniverse.Store || {};
  root.SuShiUniverse.App = root.SuShiUniverse.App || {};
})();

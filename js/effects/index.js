/**
 * 苏轼宇宙小红书小工具 - 特效系统统一门面出口 (SuShiUniverse.Effects)
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 整合 QualityManager, FallbackEngine, WebGLEngine 及各类 Scene
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || (root.SuShiUniverse = {});
  var Effects = SuShi.Effects || (SuShi.Effects = {});

  var qm = null;
  var fallbackEngine = null;
  var engine = null;
  var isInitialized = false;

  function init(container) {
    if (isInitialized) return true;

    qm = new Effects.QualityManager();
    fallbackEngine = new Effects.FallbackEngine();
    engine = new Effects.WebGLEngine(qm, fallbackEngine);

    var success = engine.init(container);
    isInitialized = true;
    return success;
  }

  function mount(sceneName, params) {
    if (!isInitialized) {
      init();
    }
    if (engine) {
      engine.mountScene(sceneName, params);
    } else if (fallbackEngine) {
      fallbackEngine.mount(null, sceneName, params);
    }
  }

  function setQuality(level) {
    if (qm) {
      qm.setLevel(level);
      if (level === 'fallback') {
        fallback();
      }
    }
  }

  function getQuality() {
    return qm ? qm.getCurrentLevel() : 'fallback';
  }

  function pause() {
    if (engine) {
      engine.pause();
    }
  }

  function resume() {
    if (engine) {
      engine.resume();
    }
  }

  function fallback() {
    if (engine) {
      engine.pause();
    }
    if (fallbackEngine) {
      fallbackEngine.mount(null, engine ? engine.currentSceneName : 'hero');
    }
  }

  function simulateContextLost() {
    if (engine && typeof engine.simulateContextLost === 'function') {
      return engine.simulateContextLost();
    }
    return false;
  }

  function destroy() {
    if (engine) {
      engine.destroy();
      engine = null;
    }
    if (fallbackEngine) {
      fallbackEngine.unmount();
      fallbackEngine = null;
    }
    qm = null;
    isInitialized = false;
  }

  // 暴露公共接口
  Effects.init = init;
  Effects.mount = mount;
  Effects.setQuality = setQuality;
  Effects.getQuality = getQuality;
  Effects.pause = pause;
  Effects.resume = resume;
  Effects.fallback = fallback;
  Effects.simulateContextLost = simulateContextLost;
  Effects.destroy = destroy;
})();

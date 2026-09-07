/**
 * 苏轼宇宙小红书小工具 - 特效品质与动态降级管理器
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 档位定义：High / Medium / Low / Fallback
 * 严格遵循 Skill 1.6.0 性能预算规范，从 Medium 档保守启动
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || (root.SuShiUniverse = {});
  var Effects = SuShi.Effects || (SuShi.Effects = {});

  var LEVELS = ['high', 'medium', 'low', 'fallback'];

  var CONFIGS = {
    high: {
      name: 'high',
      maxDpr: 1.5,
      particles: 120,
      mistLayers: 3,
      waterShimmer: true,
      animateFreq: 1.0,
      antialias: true
    },
    medium: {
      name: 'medium',
      maxDpr: 1.25,
      particles: 60,
      mistLayers: 2,
      waterShimmer: true,
      animateFreq: 1.0,
      antialias: false
    },
    low: {
      name: 'low',
      maxDpr: 1.0,
      particles: 30,
      mistLayers: 1,
      waterShimmer: false,
      animateFreq: 0.8,
      antialias: false
    },
    fallback: {
      name: 'fallback',
      maxDpr: 1.0,
      particles: 0,
      mistLayers: 0,
      waterShimmer: false,
      animateFreq: 0.0,
      antialias: false
    }
  };

  var currentLevel = 'medium';
  var slowFrameCount = 0;
  var changeCallbacks = [];

  function getEffectiveDpr(maxDpr) {
    var dpr = (typeof window !== 'undefined' && window.devicePixelRatio) ? window.devicePixelRatio : 1;
    return Math.min(dpr, maxDpr);
  }

  function checkReducedMotion() {
    try {
      if (typeof window !== 'undefined' && window.matchMedia) {
        var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        return mq && mq.matches;
      }
    } catch (e) {
      // 兼容老旧内核异常
    }
    return false;
  }

  function QualityManager() {
    if (checkReducedMotion()) {
      currentLevel = 'low';
    }
  }

  QualityManager.prototype.getCurrentLevel = function () {
    return currentLevel;
  };

  QualityManager.prototype.getConfig = function () {
    var cfg = CONFIGS[currentLevel] || CONFIGS.fallback;
    return {
      name: cfg.name,
      dpr: getEffectiveDpr(cfg.maxDpr),
      particles: cfg.particles,
      mistLayers: cfg.mistLayers,
      waterShimmer: cfg.waterShimmer,
      animateFreq: cfg.animateFreq,
      antialias: cfg.antialias
    };
  };

  QualityManager.prototype.setLevel = function (level) {
    if (LEVELS.indexOf(level) === -1) {
      console.warn('[QualityManager] 未知画质档位:', level);
      return false;
    }
    if (currentLevel !== level) {
      var prev = currentLevel;
      currentLevel = level;
      slowFrameCount = 0;
      this._notifyChange(currentLevel, prev);
    }
    return true;
  };

  QualityManager.prototype.downgrade = function () {
    var idx = LEVELS.indexOf(currentLevel);
    if (idx < LEVELS.length - 1) {
      var nextLevel = LEVELS[idx + 1];
      console.warn('[QualityManager] 性能告警，自动降档:', currentLevel, '->', nextLevel);
      this.setLevel(nextLevel);
      return true;
    }
    return false;
  };

  QualityManager.prototype.recordFrame = function (deltaMs) {
    if (currentLevel === 'fallback') return;
    // 若单帧渲染耗时持续超过 33.3ms (帧率低于 30FPS)
    if (deltaMs > 34) {
      slowFrameCount++;
      if (slowFrameCount >= 60) {
        this.downgrade();
      }
    } else {
      if (slowFrameCount > 0) {
        slowFrameCount--;
      }
    }
  };

  QualityManager.prototype.onChange = function (cb) {
    if (typeof cb === 'function') {
      changeCallbacks.push(cb);
    }
  };

  QualityManager.prototype._notifyChange = function (newLevel, oldLevel) {
    for (var i = 0; i < changeCallbacks.length; i++) {
      try {
        changeCallbacks[i](newLevel, oldLevel);
      } catch (e) {
        console.error('[QualityManager] 回调异常:', e);
      }
    }
  };

  Effects.QualityManager = QualityManager;
})();

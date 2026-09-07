/**
 * 苏轼宇宙小红书小工具 - WebGL 核心渲染引擎 (WebGLEngine)
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 依赖：THREE (r128), QualityManager, FallbackEngine
 * 严格遵循 Skill 1.6.0 性能预算：
 *  - drawingBuffer DPR: min(devicePixelRatio, 1.5)
 *  - 总像素约 <= 200 万 (超预算自动压制 DPR)
 *  - draw call <= 25/帧，几何顶点/三角形精简
 *  - visibilitychange 自动挂起 RAF
 *  - webglcontextlost 安全接管，绝不白屏
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || (root.SuShiUniverse = {});
  var Effects = SuShi.Effects || (SuShi.Effects = {});

  var MAX_PIXELS_BUDGET = 2000000; // 200万像素硬约束

  function isWebGLAvailable() {
    try {
      var canvas = document.createElement('canvas');
      var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!(gl && gl.getExtension);
    } catch (e) {
      return false;
    }
  }

  function WebGLEngine(qualityManager, fallbackEngine) {
    this.qm = qualityManager;
    this.fallback = fallbackEngine;

    this.container = null;
    this.canvas = null;
    this.renderer = null;
    this.camera = null;
    this.scene = null;

    this.currentSceneInstance = null;
    this.currentSceneName = '';

    this.isPaused = false;
    this.isContextLost = false;
    this.rafId = null;
    this.lastTime = 0;

    // 绑定上下文
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
    this._onContextLost = this._onContextLost.bind(this);
    this._onContextRestored = this._onContextRestored.bind(this);
    this._onResize = this._onResize.bind(this);
    this._renderLoop = this._renderLoop.bind(this);
  }

  WebGLEngine.prototype.init = function (container) {
    this.container = container || document.getElementById('universe-bg-fx');
    if (!this.container) {
      console.warn('[WebGLEngine] 容器缺失，进入兜底');
      this.fallback.mount(null, 'hero');
      return false;
    }

    if (!isWebGLAvailable() || typeof THREE === 'undefined') {
      console.warn('[WebGLEngine] WebGL 不可用或 THREE 缺失，转为兜底');
      this.qm.setLevel('fallback');
      this.fallback.mount(this.container, 'hero');
      return false;
    }

    try {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'universe-bg-canvas';
      this.canvas.className = 'universe-bg-canvas';
      this.canvas.setAttribute('aria-hidden', 'true');
      this.container.appendChild(this.canvas);

      var cfg = this.qm.getConfig();
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: cfg.antialias,
        powerPreference: 'low-power',
        stencil: false,
        depth: true
      });

      this.renderer.setClearColor(0x000000, 0); // 完全透明背景，透显下方水墨底色

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      this.camera.position.set(0, 0, 10);

      this._setupViewport();

      // 事件监听注册
      document.addEventListener('visibilitychange', this._onVisibilityChange, false);
      this.canvas.addEventListener('webglcontextlost', this._onContextLost, false);
      this.canvas.addEventListener('webglcontextrestored', this._onContextRestored, false);
      window.addEventListener('resize', this._onResize, false);

      return true;
    } catch (err) {
      console.error('[WebGLEngine] 初始化异常:', err);
      this.qm.setLevel('fallback');
      this.fallback.mount(this.container, 'hero');
      return false;
    }
  };

  WebGLEngine.prototype._setupViewport = function () {
    if (!this.renderer || !this.canvas || !this.container) return;

    var width = this.container.clientWidth || window.innerWidth || 390;
    var height = this.container.clientHeight || window.innerHeight || 844;
    var cfg = this.qm.getConfig();

    var dpr = cfg.dpr;
    // 预算截断校验
    if (width * height * dpr * dpr > MAX_PIXELS_BUDGET) {
      dpr = Math.max(1, Math.sqrt(MAX_PIXELS_BUDGET / (width * height)));
    }

    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);

    if (this.camera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }

    if (this.currentSceneInstance && typeof this.currentSceneInstance.onResize === 'function') {
      this.currentSceneInstance.onResize(width, height);
    }
  };

  WebGLEngine.prototype.mountScene = function (sceneName, params) {
    if (this.qm.getCurrentLevel() === 'fallback' || !this.renderer) {
      this.fallback.mount(this.container, sceneName, params);
      return;
    }

    // 相同场景复用参数
    if (this.currentSceneName === sceneName && this.currentSceneInstance) {
      if (typeof this.currentSceneInstance.updateParams === 'function') {
        this.currentSceneInstance.updateParams(params);
      }
      return;
    }

    // 清理卸载旧场景
    this._unmountCurrentScene();

    this.currentSceneName = sceneName;
    var SceneConstructor = null;

    if (sceneName === 'hero') {
      SceneConstructor = Effects.HeroScene;
    } else if (sceneName === 'universe') {
      SceneConstructor = Effects.UniverseScene;
    } else if (sceneName === 'result') {
      SceneConstructor = Effects.ResultScene;
    }

    if (!SceneConstructor) {
      console.warn('[WebGLEngine] 未知场景名称:', sceneName);
      this.pause();
      return;
    }

    try {
      this.currentSceneInstance = new SceneConstructor(this.scene, this.camera, this.qm);
      this.currentSceneInstance.init(params);
      this.resume();
    } catch (e) {
      console.error('[WebGLEngine] 挂载场景失败:', e);
      this.fallback.mount(this.container, sceneName, params);
    }
  };

  WebGLEngine.prototype._unmountCurrentScene = function () {
    if (this.currentSceneInstance) {
      try {
        if (typeof this.currentSceneInstance.destroy === 'function') {
          this.currentSceneInstance.destroy();
        }
      } catch (e) {
        console.error('[WebGLEngine] 销毁场景异常:', e);
      }
      this.currentSceneInstance = null;
    }

    // 清理场景中残留的 Mesh/Points
    if (this.scene) {
      while (this.scene.children.length > 0) {
        var obj = this.scene.children[0];
        this.scene.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            for (var i = 0; i < obj.material.length; i++) {
              obj.material[i].dispose();
            }
          } else {
            obj.material.dispose();
          }
        }
      }
    }
  };

  WebGLEngine.prototype._renderLoop = function (timestamp) {
    if (this.isPaused || this.isContextLost) return;

    this.rafId = requestAnimationFrame(this._renderLoop);

    var deltaMs = 16.6;
    if (this.lastTime > 0) {
      deltaMs = Math.min(100, timestamp - this.lastTime);
    }
    this.lastTime = timestamp;

    this.qm.recordFrame(deltaMs);

    if (this.currentSceneInstance && typeof this.currentSceneInstance.update === 'function') {
      this.currentSceneInstance.update(deltaMs / 1000, timestamp / 1000);
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  WebGLEngine.prototype.pause = function () {
    this.isPaused = true;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.lastTime = 0;
  };

  WebGLEngine.prototype.resume = function () {
    if (!this.isPaused && this.rafId) return;
    this.isPaused = false;
    this.lastTime = 0;
    this.rafId = requestAnimationFrame(this._renderLoop);
  };

  WebGLEngine.prototype._onVisibilityChange = function () {
    if (document.hidden) {
      this.pause();
    } else {
      // 页面恢复时，重置时间戳平滑过渡
      this.lastTime = 0;
      if (this.currentSceneInstance) {
        this.resume();
      }
    }
  };

  WebGLEngine.prototype._onContextLost = function (e) {
    e.preventDefault();
    console.warn('[WebGLEngine] 捕获 webglcontextlost，暂停渲染并降级');
    this.isContextLost = true;
    this.pause();
    this.fallback.mount(this.container, this.currentSceneName);
  };

  WebGLEngine.prototype._onContextRestored = function () {
    console.warn('[WebGLEngine] 捕获 webglcontextrestored，尝试平滑恢复');
    this.isContextLost = false;
    this.init(this.container);
    if (this.currentSceneName) {
      this.mountScene(this.currentSceneName);
    }
  };

  WebGLEngine.prototype._onResize = function () {
    this._setupViewport();
  };

  WebGLEngine.prototype.simulateContextLost = function () {
    if (this.renderer) {
      var gl = this.renderer.getContext();
      var ext = gl ? gl.getExtension('WEBGL_lose_context') : null;
      if (ext) {
        ext.loseContext();
        return true;
      }
    }
    return false;
  };

  WebGLEngine.prototype.destroy = function () {
    this.pause();
    this._unmountCurrentScene();

    document.removeEventListener('visibilitychange', this._onVisibilityChange, false);
    window.removeEventListener('resize', this._onResize, false);

    if (this.canvas) {
      this.canvas.removeEventListener('webglcontextlost', this._onContextLost, false);
      this.canvas.removeEventListener('webglcontextrestored', this._onContextRestored, false);
      if (this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
      this.canvas = null;
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
  };

  Effects.WebGLEngine = WebGLEngine;
})();

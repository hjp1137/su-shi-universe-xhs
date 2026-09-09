/**
 * 苏轼宇宙小红书小工具 - 首页东方宇宙 Hero 特效场景 (HeroScene)
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 视觉元素：
 *  - 皎洁而克制的低亮月轮 (顶右)
 *  - 三层起伏层峦水墨远山剪影
 *  - 江面水光微澜平面
 *  - 稀疏水墨星点粒子微漂移 (30-60 点)
 *  - 轻量指针/触控微视差与低频呼吸缓动
 * 性能特征：
 *  - Draw call <= 6，三角形 <= 80，内存极小，支持高质量/中质量/低质量按需缩减
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || (root.SuShiUniverse = {});
  var Effects = SuShi.Effects || (SuShi.Effects = {});

  function HeroScene(scene, camera, qualityManager) {
    this.scene = scene;
    this.camera = camera;
    this.qm = qualityManager;

    this.group = null;
    this.moonMesh = null;
    this.mountains = [];
    this.waterMesh = null;
    this.particles = null;

    this.pointerX = 0;
    this.pointerY = 0;
    this.targetTiltX = 0;
    this.targetTiltY = 0;

    this.isDodging = false;
    this.currentParticleOpacity = 0.32;

    this._onPointerMove = this._onPointerMove.bind(this);
  }

  HeroScene.prototype.setDodgeText = function (isDodging) {
    this.isDodging = !!isDodging;
  };

  HeroScene.prototype.init = function () {
    var cfg = this.qm.getConfig();
    this.group = new THREE.Group();
    this.scene.add(this.group);

    // 1. 低亮度月轮 (缩小29%退居背景，微透柔和月白，不抢夺中心交互焦点)
    var moonGeo = new THREE.CircleGeometry(0.85, 32);
    var moonMat = new THREE.MeshBasicMaterial({
      color: 0xf6f1e8,
      transparent: true,
      opacity: 0.52,
      depthWrite: false
    });
    this.moonMesh = new THREE.Mesh(moonGeo, moonMat);
    this.moonMesh.position.set(2.6, 2.7, -5.5);
    this.group.add(this.moonMesh);

    // 月晕光环 (同步缩小30%并降低亮度)
    var haloGeo = new THREE.CircleGeometry(1.4, 32);
    var haloMat = new THREE.MeshBasicMaterial({
      color: 0xc8a26e,
      transparent: true,
      opacity: 0.08,
      depthWrite: false
    });
    var haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.set(2.6, 2.7, -5.6);
    this.group.add(haloMesh);

    // 2. 三层远山剪影 (由浅入深，墨色渐浓)
    var mountainColors = [0x131e36, 0x0f182c, 0x0a101f];
    var mountainHeights = [2.2, 1.8, 1.4];
    var mountainZ = [-4, -3, -2];
    var count = cfg.mistLayers || 2;

    for (var i = 0; i < count; i++) {
      var mGeo = new THREE.PlaneGeometry(16, mountainHeights[i], 1, 1);
      var mMat = new THREE.MeshBasicMaterial({
        color: mountainColors[i],
        transparent: true,
        opacity: 0.85 - i * 0.15,
        depthWrite: false
      });
      var mMesh = new THREE.Mesh(mGeo, mMat);
      mMesh.position.set(i % 2 === 0 ? -1 : 1, -1.8 + i * 0.4, mountainZ[i]);
      this.mountains.push(mMesh);
      this.group.add(mMesh);
    }

    // 3. 江面水光平面 (底部水平镜面)
    if (cfg.waterShimmer) {
      var waterGeo = new THREE.PlaneGeometry(18, 4, 1, 1);
      var waterMat = new THREE.MeshBasicMaterial({
        color: 0x081120,
        transparent: true,
        opacity: 0.65,
        depthWrite: false
      });
      this.waterMesh = new THREE.Mesh(waterGeo, waterMat);
      this.waterMesh.position.set(0, -3.2, -1.5);
      this.group.add(this.waterMesh);
    }

    // 4. 稀疏漂浮水墨微星点 (任务 15.6.8.1 P1-D: 降噪、缩小、柔化)
    var pCount = cfg.particles || 32;
    if (pCount > 0) {
      var pGeo = new THREE.BufferGeometry();
      var positions = new Float32Array(pCount * 3);
      for (var p = 0; p < pCount; p++) {
        positions[p * 3] = (Math.random() - 0.5) * 12;
        positions[p * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[p * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      var softTex = null;
      if (typeof document !== 'undefined') {
        try {
          var c = document.createElement('canvas');
          c.width = 32;
          c.height = 32;
          var gCtx = c.getContext('2d');
          if (gCtx) {
            var rad = gCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
            rad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
            rad.addColorStop(0.35, 'rgba(255, 255, 255, 0.55)');
            rad.addColorStop(0.7, 'rgba(255, 255, 255, 0.12)');
            rad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            gCtx.fillStyle = rad;
            gCtx.fillRect(0, 0, 32, 32);
            softTex = new THREE.CanvasTexture(c);
          }
        } catch (e) {}
      }

      var pMat = new THREE.PointsMaterial({
        color: 0xd8c8b4,
        size: 0.048,
        map: softTex,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      this.particles = new THREE.Points(pGeo, pMat);
      this.group.add(this.particles);
    }

    // 5. 监听微视差交互
    window.addEventListener('pointermove', this._onPointerMove, { passive: true });
    window.addEventListener('touchmove', this._onPointerMove, { passive: true });
  };

  HeroScene.prototype._onPointerMove = function (e) {
    var clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    var clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    var w = window.innerWidth || 390;
    var h = window.innerHeight || 844;

    this.pointerX = (clientX / w - 0.5) * 2; // -1 ~ 1
    this.pointerY = (clientY / h - 0.5) * 2;
  };

  HeroScene.prototype.update = function (delta, time) {
    if (!this.group) return;

    // 缓动平滑跟随
    this.targetTiltX += (this.pointerX * 0.08 - this.targetTiltX) * 0.05;
    this.targetTiltY += (this.pointerY * 0.06 - this.targetTiltY) * 0.05;

    this.group.rotation.y = this.targetTiltX;
    this.group.rotation.x = -this.targetTiltY;

    // 低频月光与远山微呼吸
    if (this.moonMesh) {
      this.moonMesh.position.y = 2.6 + Math.sin(time * 0.8) * 0.05;
    }

    for (var i = 0; i < this.mountains.length; i++) {
      var speed = 0.5 + i * 0.2;
      this.mountains[i].position.x += Math.sin(time * speed) * 0.0008;
    }

    // 微星点缓慢浮动并避让
    if (this.particles && this.particles.material) {
      var targetParticleOpacity = this.isDodging ? 0.06 : 0.32;
      this.currentParticleOpacity += (targetParticleOpacity - this.currentParticleOpacity) * 0.1;
      this.particles.material.opacity = this.currentParticleOpacity;
      this.particles.rotation.y = time * 0.02;
      this.particles.rotation.x = Math.sin(time * 0.015) * 0.05;
    }
  };

  HeroScene.prototype.onResize = function () {};

  HeroScene.prototype.destroy = function () {
    window.removeEventListener('pointermove', this._onPointerMove, false);
    window.removeEventListener('touchmove', this._onPointerMove, false);

    if (this.group && this.scene) {
      this.scene.remove(this.group);
      this.group = null;
    }
  };

  Effects.HeroScene = HeroScene;
})();

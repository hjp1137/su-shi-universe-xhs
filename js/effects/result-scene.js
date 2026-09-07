/**
 * 苏轼宇宙小红书小工具 - 测试结果揭晓特效场景 (ResultScene)
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 视觉特征：
 *  - 0.8~1.2 秒粒子向核心节点汇聚与光晕点亮
 *  - 随后定格在宁静的站点色温呼吸光环中
 *  - 完全不阻断 DOM 卡片阅读与触控交互
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || (root.SuShiUniverse = {});
  var Effects = SuShi.Effects || (SuShi.Effects = {});

  var RESULT_COLORS = {
    station_meishan: 0x1f4a3b,
    station_jingshi: 0x1e3352,
    station_mizhou: 0x38424d,
    station_wutai: 0x141923,
    station_huangzhou: 0x4a2d18,
    station_hangzhou: 0x224b42,
    station_huizhou: 0x42262d,
    station_danzhou: 0x1b3547,
    station_changzhou: 0x45331e
  };

  function ResultScene(scene, camera, qualityManager) {
    this.scene = scene;
    this.camera = camera;
    this.qm = qualityManager;

    this.group = null;
    this.convergePoints = null;
    this.initialPositions = null;
    this.targetPositions = null;
    this.centerHalo = null;

    this.convergeDuration = 1.0; // 1.0秒收敛动画
    this.elapsedTime = 0;
    this.isSettled = false;
  }

  ResultScene.prototype.init = function (params) {
    var cfg = this.qm.getConfig();
    this.group = new THREE.Group();
    this.scene.add(this.group);

    var stationId = (params && params.station_id) || 'station_huangzhou';
    var themeColor = RESULT_COLORS[stationId] || 0x4a2d18;

    // 1. 中心站点光晕
    var haloGeo = new THREE.CircleGeometry(2.2, 32);
    var haloMat = new THREE.MeshBasicMaterial({
      color: themeColor,
      transparent: true,
      opacity: 0.05,
      depthWrite: false
    });
    this.centerHalo = new THREE.Mesh(haloGeo, haloMat);
    this.centerHalo.position.set(0, 1.2, -3);
    this.group.add(this.centerHalo);

    // 2. 汇聚粒子群
    var count = cfg.particles || 40;
    var geo = new THREE.BufferGeometry();
    this.initialPositions = new Float32Array(count * 3);
    this.targetPositions = new Float32Array(count * 3);
    var currentPos = new Float32Array(count * 3);

    for (var i = 0; i < count; i++) {
      // 初始：散布在四周
      var angle = Math.random() * Math.PI * 2;
      var radius = 3.5 + Math.random() * 2.5;
      this.initialPositions[i * 3] = Math.cos(angle) * radius;
      this.initialPositions[i * 3 + 1] = 1.2 + Math.sin(angle) * radius;
      this.initialPositions[i * 3 + 2] = (Math.random() - 0.5) * 2;

      // 目标：汇聚在中心微小范围
      var tAngle = Math.random() * Math.PI * 2;
      var tRadius = 0.3 + Math.random() * 0.8;
      this.targetPositions[i * 3] = Math.cos(tAngle) * tRadius;
      this.targetPositions[i * 3 + 1] = 1.2 + Math.sin(tAngle) * tRadius;
      this.targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

      currentPos[i * 3] = this.initialPositions[i * 3];
      currentPos[i * 3 + 1] = this.initialPositions[i * 3 + 1];
      currentPos[i * 3 + 2] = this.initialPositions[i * 3 + 2];
    }

    geo.setAttribute('position', new THREE.BufferAttribute(currentPos, 3));

    var mat = new THREE.PointsMaterial({
      color: 0xf5dfb8,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      depthWrite: false
    });

    this.convergePoints = new THREE.Points(geo, mat);
    this.group.add(this.convergePoints);
  };

  ResultScene.prototype.update = function (delta, time) {
    if (!this.group) return;

    this.elapsedTime += delta;
    var progress = Math.min(1, this.elapsedTime / this.convergeDuration);

    // 三次缓出过渡：1 - Math.pow(1 - progress, 3)
    var ease = 1 - Math.pow(1 - progress, 3);

    if (this.convergePoints && this.initialPositions && this.targetPositions) {
      var attr = this.convergePoints.geometry.getAttribute('position');
      var pos = attr.array;
      var count = pos.length / 3;

      for (var i = 0; i < count; i++) {
        if (!this.isSettled) {
          pos[i * 3] = this.initialPositions[i * 3] + (this.targetPositions[i * 3] - this.initialPositions[i * 3]) * ease;
          pos[i * 3 + 1] = this.initialPositions[i * 3 + 1] + (this.targetPositions[i * 3 + 1] - this.initialPositions[i * 3 + 1]) * ease;
          pos[i * 3 + 2] = this.initialPositions[i * 3 + 2] + (this.targetPositions[i * 3 + 2] - this.initialPositions[i * 3 + 2]) * ease;
        } else {
          // 定格后：极其微弱的微漂浮
          pos[i * 3 + 1] += Math.sin(time + i) * 0.0005;
        }
      }
      attr.needsUpdate = true;

      if (progress >= 1 && !this.isSettled) {
        this.isSettled = true;
      }
    }

    // 光晕随汇聚扩散至目标通透度
    if (this.centerHalo && this.centerHalo.material) {
      this.centerHalo.material.opacity = 0.05 + ease * 0.18 + Math.sin(time * 1.5) * 0.03;
      this.centerHalo.scale.setScalar(0.8 + ease * 0.4);
    }
  };

  ResultScene.prototype.onResize = function () {};

  ResultScene.prototype.destroy = function () {
    if (this.group && this.scene) {
      this.scene.remove(this.group);
      this.group = null;
    }
  };

  Effects.ResultScene = ResultScene;
})();

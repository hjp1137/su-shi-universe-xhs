/**
 * 苏轼宇宙小红书小工具 - 东坡人生星河特效场景 (UniverseScene)
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 核心架构：
 *  - 单一场景架构复用：生命长河粒子星轨 + 核心站点意象光晕
 *  - 九大人生站点参数化平滑插值演化 (色调/水光/粒子流动/光晕)
 *  - 零重复场景创建与销毁开销
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || (root.SuShiUniverse = {});
  var Effects = SuShi.Effects || (SuShi.Effects = {});

  // 九大站点色温与视觉参数映射表
  var STATION_PARAMS = {
    station_meishan: {
      color: 0x1f4a3b, // 青山晨雾
      haloColor: 0x4a7c6a,
      particleSpeed: 0.4,
      pointColor: 0x93d0b8,
      waterOpacity: 0.5
    },
    station_jingshi: {
      color: 0x1e3352, // 京师曙蓝
      haloColor: 0xc8a26e, // 少年得志金
      particleSpeed: 0.6,
      pointColor: 0xf5dca8,
      waterOpacity: 0.55
    },
    station_mizhou: {
      color: 0x38424d, // 密州苍灰
      haloColor: 0x7c8a99,
      particleSpeed: 0.5,
      pointColor: 0xdde3ea,
      waterOpacity: 0.4
    },
    station_wutai: {
      color: 0x141923, // 乌台至暗墨雨
      haloColor: 0x222b3b,
      particleSpeed: 0.3,
      pointColor: 0x778294,
      waterOpacity: 0.25
    },
    station_huangzhou: {
      color: 0x4a2d18, // 黄州由暗转明
      haloColor: 0xd98a4e, // 破晓赤壁红金
      particleSpeed: 0.7,
      pointColor: 0xf6dfba,
      waterOpacity: 0.7
    },
    station_hangzhou: {
      color: 0x224b42, // 杭州暖湖绿水
      haloColor: 0x5fa18f,
      particleSpeed: 0.5,
      pointColor: 0xb5edd9,
      waterOpacity: 0.65
    },
    station_huizhou: {
      color: 0x42262d, // 惠州荔红暖光
      haloColor: 0xb35a68,
      particleSpeed: 0.55,
      pointColor: 0xf5bcc4,
      waterOpacity: 0.5
    },
    station_danzhou: {
      color: 0x1b3547, // 儋州海天沧溟
      haloColor: 0x3d7094,
      particleSpeed: 0.45,
      pointColor: 0x9ec7e6,
      waterOpacity: 0.6
    },
    station_changzhou: {
      color: 0x45331e, // 常州返璞归真
      haloColor: 0x9c7f55,
      particleSpeed: 0.3,
      pointColor: 0xe6d4b8,
      waterOpacity: 0.45
    }
  };

  function UniverseScene(scene, camera, qualityManager) {
    this.scene = scene;
    this.camera = camera;
    this.qm = qualityManager;

    this.group = null;
    this.riverPoints = null;
    this.haloMesh = null;
    this.ambientWater = null;

    this.currentColor = new THREE.Color(0x1f4a3b);
    this.targetColor = new THREE.Color(0x1f4a3b);
    this.currentHaloColor = new THREE.Color(0x4a7c6a);
    this.targetHaloColor = new THREE.Color(0x4a7c6a);

    this.flowSpeed = 0.5;
    this.targetSpeed = 0.5;
  }

  UniverseScene.prototype.init = function (params) {
    var cfg = this.qm.getConfig();
    this.group = new THREE.Group();
    this.scene.add(this.group);

    // 1. 生命长河星轨粒子流
    var count = cfg.particles ? Math.min(cfg.particles * 2, 100) : 60;
    var geo = new THREE.BufferGeometry();
    var pos = new Float32Array(count * 3);

    for (var i = 0; i < count; i++) {
      var t = (i / count) * Math.PI * 3;
      // 沿 S 型长河曲线蜿蜒
      pos[i * 3] = Math.sin(t) * 2.2 + (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 1] = 4.0 - (i / count) * 8.0; // 从上到下流淌
      pos[i * 3 + 2] = Math.cos(t) * 1.5 + (Math.random() - 0.5) * 0.5;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    var mat = new THREE.PointsMaterial({
      color: 0xf6dfba,
      size: 0.12,
      transparent: true,
      opacity: 0.75,
      depthWrite: false
    });

    this.riverPoints = new THREE.Points(geo, mat);
    this.group.add(this.riverPoints);

    // 2. 站点核心微光气晕 (柔和光圈)
    var haloGeo = new THREE.CircleGeometry(2.5, 32);
    var haloMat = new THREE.MeshBasicMaterial({
      color: 0x4a7c6a,
      transparent: true,
      opacity: 0.18,
      depthWrite: false
    });
    this.haloMesh = new THREE.Mesh(haloGeo, haloMat);
    this.haloMesh.position.set(0, 0, -2);
    this.group.add(this.haloMesh);

    // 3. 底部水光暗流平面
    if (cfg.waterShimmer) {
      var waterGeo = new THREE.PlaneGeometry(16, 12, 1, 1);
      var waterMat = new THREE.MeshBasicMaterial({
        color: 0x1f4a3b,
        transparent: true,
        opacity: 0.25,
        depthWrite: false
      });
      this.ambientWater = new THREE.Mesh(waterGeo, waterMat);
      this.ambientWater.position.set(0, 0, -4);
      this.group.add(this.ambientWater);
    }

    // 初始化指定站点氛围
    var stationId = (params && params.station_id) || 'station_meishan';
    this.setStation(stationId);
  };

  UniverseScene.prototype.setStation = function (stationId) {
    var p = STATION_PARAMS[stationId] || STATION_PARAMS.station_huangzhou;
    this.targetColor.setHex(p.color);
    this.targetHaloColor.setHex(p.haloColor);
    this.targetSpeed = p.particleSpeed;

    if (this.riverPoints && this.riverPoints.material) {
      this.riverPoints.material.color.setHex(p.pointColor);
    }
  };

  UniverseScene.prototype.updateParams = function (params) {
    if (params && params.station_id) {
      this.setStation(params.station_id);
    }
  };

  UniverseScene.prototype.update = function (delta, time) {
    if (!this.group) return;

    // 平滑插值演化色温与流动速率
    this.currentColor.lerp(this.targetColor, 0.05);
    this.currentHaloColor.lerp(this.targetHaloColor, 0.05);
    this.flowSpeed += (this.targetSpeed - this.flowSpeed) * 0.05;

    if (this.haloMesh && this.haloMesh.material) {
      this.haloMesh.material.color.copy(this.currentHaloColor);
      this.haloMesh.scale.setScalar(1 + Math.sin(time * 1.2) * 0.08);
    }

    if (this.ambientWater && this.ambientWater.material) {
      this.ambientWater.material.color.copy(this.currentColor);
    }

    // 长河星轨粒子缓缓绕流
    if (this.riverPoints) {
      this.riverPoints.rotation.y = time * 0.08 * this.flowSpeed;
      this.riverPoints.position.y = Math.sin(time * 0.5) * 0.15;
    }
  };

  UniverseScene.prototype.onResize = function () {};

  UniverseScene.prototype.destroy = function () {
    if (this.group && this.scene) {
      this.scene.remove(this.group);
      this.group = null;
    }
  };

  Effects.UniverseScene = UniverseScene;
})();

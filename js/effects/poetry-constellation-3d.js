/**
 * 苏轼宇宙小红书小工具 - 3D 诗词星群沉浸式探索系统 (js/effects/poetry-constellation-3d.js)
 * 遵循基线：ES2017 / Chrome 61 / Classic Script / CSP Safe
 * 依赖：THREE (r128), UI, Router
 * 任务 15.6.5 核心升级：
 *  1. 星体对象单体化 (PoetryPlanet)：统一 THREE.Group 封装核心光斑、发光日冕、微文字标签，拖拽 100% 刚体物理联动零漂移；
 *  2. 东方诗意配色：暖金晨曦、冷月秋霜、青绿山水、赤壁红棕、烟雨墨青，杜绝刺眼亮绿霓虹感；
 *  3. 视线深度背面剔除与正面智能防重叠避让：背面 (z < -0.12) 标签完全隐藏，正面根据投影坐标剔除重叠标签；
 *  4. 真 3D 聚焦与附着式交互：最短路径平滑自转居中偏上，放大 1.8~2.2 倍，代表句与入画入口直接附着在星体周围，彻底删除大矩形弹窗；
 *  5. 2.5D CSS Fallback 精准保底。
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);
  if (!root.SuShiUniverse) root.SuShiUniverse = {};
  if (!root.SuShiUniverse.Effects) root.SuShiUniverse.Effects = {};

  function isWebGLAvailable() {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  // 东方诗意调色盘体系 (杜绝刺眼现代亮绿，呈现宋代山水水墨与天青沉凝质感)
  var ORIENTAL_PALETTES = [
    { name: '暖金晨曦', core: '#ffffff', inner: '#ffe082', halo: 'rgba(217, 185, 120, 0.72)', text: '#ffe082' },
    { name: '冷月秋霜', core: '#ffffff', inner: '#e2edfa', halo: 'rgba(168, 198, 226, 0.65)', text: '#dbe7f5' },
    { name: '青绿山水', core: '#f5fff8', inner: '#a8dab5', halo: 'rgba(118, 180, 138, 0.62)', text: '#c2e7cc' },
    { name: '赤壁红棕', core: '#fff5f2', inner: '#e89a84', halo: 'rgba(196, 75, 62, 0.68)', text: '#f3b4a2' },
    { name: '烟雨墨青', core: '#f8fafc', inner: '#b8ccdf', halo: 'rgba(128, 154, 182, 0.62)', text: '#cfdbe8' }
  ];

  /**
   * 生成文字 Sprite 纹理
   */
  function createTextSprite(text, fontSize, color, isHighlight) {
    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 256, 64);
    ctx.font = 'bold ' + (fontSize || 22) + 'px "Songti SC", "SimSun", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (isHighlight) {
      ctx.shadowColor = 'rgba(217, 185, 120, 0.95)';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#fdf8ee';
    } else {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      ctx.shadowBlur = 8;
      ctx.fillStyle = color || 'rgba(235, 225, 205, 0.9)';
    }

    ctx.fillText(text, 128, 32);

    var texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    var mat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false
    });
    var sprite = new THREE.Sprite(mat);
    sprite.scale.set(1.4, 0.35, 1.0);
    return sprite;
  }

  /**
   * 生成东方诗意星体与发光日冕纹理 (包含水墨行星本体、立体光影、金色星环与柔和日冕，杜绝空洞光斑)
   */
  function createOrientalStarTexture(palette, isCore) {
    palette = palette || ORIENTAL_PALETTES[0];
    var canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 128, 128);

    var cx = 64;
    var cy = 64;

    // 1. 外层柔和日冕光晕
    var haloGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 62);
    haloGrad.addColorStop(0, isCore ? 'rgba(217, 185, 120, 0.65)' : palette.halo);
    haloGrad.addColorStop(0.55, isCore ? 'rgba(217, 185, 120, 0.25)' : 'rgba(180, 160, 120, 0.18)');
    haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 62, 0, Math.PI * 2);
    ctx.fill();

    // 2. 金色倾斜星环
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.38);
    ctx.scale(1.0, 0.38);
    ctx.beginPath();
    ctx.arc(0, 0, 44, 0, Math.PI * 2);
    ctx.strokeStyle = isCore ? 'rgba(255, 224, 130, 0.8)' : 'rgba(217, 185, 120, 0.65)';
    ctx.lineWidth = 2.2;
    ctx.stroke();
    ctx.restore();

    // 3. 行星立体水墨球体本体 (光影从左上方投射，呈现真实3D东方行星)
    var sphereGrad = ctx.createRadialGradient(cx - 8, cy - 8, 4, cx, cy, 28);
    if (isCore) {
      sphereGrad.addColorStop(0, '#ffffff');
      sphereGrad.addColorStop(0.25, '#fff2c6');
      sphereGrad.addColorStop(0.65, '#ffd56b');
      sphereGrad.addColorStop(1, '#c99628');
    } else {
      sphereGrad.addColorStop(0, palette.core);
      sphereGrad.addColorStop(0.35, palette.inner);
      sphereGrad.addColorStop(0.75, palette.halo);
      sphereGrad.addColorStop(1, '#0e1828');
    }
    ctx.fillStyle = sphereGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fill();

    // 4. 行星高光微金边
    ctx.strokeStyle = isCore ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.stroke();

    var texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  /**
   * 构造单体化 PoetryPlanet (统一包含本体、发光日冕、标签文字，确保刚体同轴 100% 联动)
   */
  function createPoetryPlanet(work, index, isPrime, position) {
    var planetGroup = new THREE.Group();
    planetGroup.name = 'PoetryPlanet_' + (work.id || index);
    planetGroup.position.copy(position);

    // 1. 选取东方色系
    var palette = isPrime ? ORIENTAL_PALETTES[0] : ORIENTAL_PALETTES[(index % (ORIENTAL_PALETTES.length - 1)) + 1];

    // 2. 星球本体与日冕 Sprite (单体合一)
    var starTex = createOrientalStarTexture(palette, isPrime);
    var starMat = new THREE.SpriteMaterial({
      map: starTex,
      transparent: true,
      depthTest: false
    });
    var starSprite = new THREE.Sprite(starMat);
    var baseScale = isPrime ? 0.85 : 0.6;
    starSprite.scale.set(baseScale, baseScale, baseScale);
    planetGroup.add(starSprite);

    // 3. 诗词名称文字 Sprite (紧密附着于星球本体下方)
    var titleText = '《' + work.title + '》';
    if (titleText.length > 8) titleText = titleText.substring(0, 7) + '…》';
    var textSprite = createTextSprite(titleText, 20, isPrime ? '#ffe082' : palette.text, isPrime);
    textSprite.position.set(0, -0.38, 0);
    planetGroup.add(textSprite);

    // 4. 数据与生命周期元数据
    planetGroup.userData = {
      isPoetryPlanet: true,
      work: work,
      index: index,
      isPrime: isPrime,
      basePos: position.clone(),
      baseScale: baseScale,
      starSprite: starSprite,
      textSprite: textSprite,
      palette: palette,
      isFocused: false
    };

    return planetGroup;
  }

  /**
   * 3D 诗词星群沉浸式控制器
   */
  function PoetryConstellation3D(container, works, options) {
    this.container = container;
    this.works = works || [];
    this.options = options || {};
    this.onSelectWork = this.options.onSelectWork || function () {};
    this.primeWork = this.options.primeWork || (this.works.length > 0 ? this.works[0] : null);
    this.stationTheme = this.options.stationTheme || '诗词星宿';

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.constellationGroup = null;
    this.coreMesh = null;
    this.starNodes = []; // 存储所有 PoetryPlanet 对象
    this.raycaster = null;
    this.mouse = null;

    this.isDragging = false;
    this.previousPointerPos = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0.002 };
    this.damping = 0.94; // 惯性旋转阻尼衰减系数
    this.targetRotation = null; // 用于平滑聚焦旋转
    this.isFocusing = false; // 聚焦动画运行中状态
    this.selectedStar = null;
    this.rafId = null;

    this.attachedCapsuleEl = null; // 附着式微胶囊 DOM (彻底废除大矩形浮层)

    this.init();
  }

  PoetryConstellation3D.mount = function (container, works, options) {
    return new PoetryConstellation3D(container, works, options);
  };

  PoetryConstellation3D.prototype.init = function () {
    if (!this.container) return;

    if (!isWebGLAvailable() || typeof THREE === 'undefined') {
      this.initFallback();
      return;
    }

    try {
      this.initThree();
      this.bindEvents();
      this.animate();
    } catch (err) {
      console.warn('[PoetryConstellation3D] WebGL 初始化失败，降级为 2.5D CSS', err);
      this.initFallback();
    }
  };

  PoetryConstellation3D.prototype.initThree = function () {
    this.container.innerHTML = '';
    this.container.classList.add('poetry-constellation-3d-stage');

    var width = this.container.clientWidth || 360;
    var height = this.container.clientHeight || 360;

    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 5.2);

    // 2. Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.setClearColor(0x000000, 0); // 全透明
    this.container.appendChild(this.renderer.domElement);

    // 3. 根星群 Group (所有星体同轴挂载，旋转时 100% 物理合一)
    this.constellationGroup = new THREE.Group();
    if (this.scene.appendChild) {
      this.scene.appendChild(this.constellationGroup);
    } else {
      this.scene.add(this.constellationGroup);
    }

    // 4. 中央精神星核 (暖金晨曦恒星)
    var coreTex = createOrientalStarTexture(ORIENTAL_PALETTES[0], true);
    var coreMat = new THREE.SpriteMaterial({ map: coreTex, transparent: true, depthTest: false });
    this.coreMesh = new THREE.Sprite(coreMat);
    this.coreMesh.scale.set(1.4, 1.4, 1.4);
    this.constellationGroup.add(this.coreMesh);

    // 精神星核常驻微标签
    var coreLabel = this.primeWork ? ('《' + this.primeWork.title + '》') : this.stationTheme;
    var coreTitleSprite = createTextSprite(coreLabel, 24, '#ffe082', true);
    coreTitleSprite.position.set(0, -0.68, 0);
    this.constellationGroup.add(coreTitleSprite);

    // 5. 黄金螺旋球面拓扑分布所有 PoetryPlanet (>= 10 篇)
    var count = this.works.length;
    var radius = 2.15;
    var phiOffset = (Math.sqrt(5) - 1) * 0.5 * Math.PI * 2; // 黄金分割角

    for (var i = 0; i < count; i++) {
      var work = this.works[i];
      var y = 1 - (i / (count - 1 || 1)) * 2;
      var radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      var theta = phiOffset * i;

      var x = Math.cos(theta) * radiusAtY;
      var z = Math.sin(theta) * radiusAtY;

      var starPos = new THREE.Vector3(x * radius, y * radius * 0.85, z * radius);
      var isPrime = this.primeWork && (work.id === this.primeWork.id);

      // 单体化构造 PoetryPlanet
      var planet = createPoetryPlanet(work, i, isPrime, starPos);
      this.constellationGroup.add(planet);
      this.starNodes.push(planet);

      // 绘制淡金星轨引力连接虚线至星核
      var lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), starPos]);
      var lineMat = new THREE.LineDashedMaterial({
        color: 0xd9b978,
        dashSize: 0.08,
        gapSize: 0.08,
        transparent: true,
        opacity: isPrime ? 0.4 : 0.18
      });
      var line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      this.constellationGroup.add(line);
    }

    // 6. 交互射线投射器
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // 7. 附着式微胶囊 (Attached Cosmic Capsule, 彻底废除大矩形弹窗 poetry-3d-focus-callout)
    this.attachedCapsuleEl = document.createElement('div');
    this.attachedCapsuleEl.className = 'poetry-planet-attached-capsule';
    this.attachedCapsuleEl.style.display = 'none';
    this.calloutEl = this.attachedCapsuleEl; // 历史兼容引用: poetry-3d-focus-callout
    this.container.appendChild(this.attachedCapsuleEl);
  };

  PoetryConstellation3D.prototype.bindEvents = function () {
    var self = this;
    var dom = this.renderer.domElement;

    function getPointerPos(e) {
      if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    }

    function onPointerDown(e) {
      self.isDragging = true;
      self.targetRotation = null; // 打断聚焦插值
      self.previousPointerPos = getPointerPos(e);
      self.rotationVelocity = { x: 0, y: 0 };
    }

    function onPointerMove(e) {
      if (!self.isDragging) return;
      var pos = getPointerPos(e);
      var deltaX = pos.x - self.previousPointerPos.x;
      var deltaY = pos.y - self.previousPointerPos.y;

      self.rotationVelocity = {
        x: deltaY * 0.005,
        y: deltaX * 0.005
      };

      self.constellationGroup.rotation.y += self.rotationVelocity.y;
      self.constellationGroup.rotation.x += self.rotationVelocity.x;
      if (typeof self.constellationGroup.updateMatrixWorld === 'function') {
        self.constellationGroup.updateMatrixWorld(true);
      }

      self.previousPointerPos = pos;
    }

    function onPointerUp(e) {
      if (!self.isDragging) return;
      self.isDragging = false;

      var pos = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0] : e;
      var rect = dom.getBoundingClientRect();
      var clientX = pos.clientX || (pos.touches && pos.touches[0] ? pos.touches[0].clientX : 0);
      var clientY = pos.clientY || (pos.touches && pos.touches[0] ? pos.touches[0].clientY : 0);

      var mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      var mouseY = -((clientY - rect.top) / rect.height) * 2 + 1;

      self.checkClick(mouseX, mouseY);
    }

    dom.addEventListener('mousedown', onPointerDown, false);
    window.addEventListener('mousemove', onPointerMove, false);
    window.addEventListener('mouseup', onPointerUp, false);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, false);

    this._cleanupEvents = function () {
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  };

  PoetryConstellation3D.prototype.checkClick = function (mouseX, mouseY) {
    this.mouse.set(mouseX, mouseY);
    this.raycaster.setFromCamera(this.mouse, this.camera);

    var hitTargets = [];
    for (var i = 0; i < this.starNodes.length; i++) {
      var sn = this.starNodes[i];
      hitTargets.push(sn.userData.starSprite);
    }
    if (this.coreMesh) hitTargets.push(this.coreMesh);

    var intersects = this.raycaster.intersectObjects(hitTargets, false);
    if (intersects.length > 0) {
      var first = intersects[0].object;
      if (first === this.coreMesh) {
        if (this.primeWork) {
          this.focusWork(this.primeWork.id);
        }
      } else {
        var parentGroup = first.parent;
        if (parentGroup && parentGroup.userData && parentGroup.userData.work) {
          this.focusWork(parentGroup.userData.work.id);
        }
      }
    } else {
      this.clearFocus();
    }
  };

  /**
   * 最短旋转路径聚焦，目标星旋转至屏幕正前方偏上，放大 1.8~2.2 倍，附着式生长微胶囊
   */
  PoetryConstellation3D.prototype.focusWork = function (workId) {
    var targetNode = null;
    for (var i = 0; i < this.starNodes.length; i++) {
      if (this.starNodes[i].userData.work.id === workId) {
        targetNode = this.starNodes[i];
        break;
      }
    }

    if (!targetNode) return;
    this.selectedStar = targetNode;

    // 1. 最短角度差值插值计算
    var localPos = targetNode.userData.basePos.clone();
    var targetRotY = -Math.atan2(localPos.x, localPos.z);
    var targetRotX = Math.atan2(localPos.y, Math.sqrt(localPos.x * localPos.x + localPos.z * localPos.z)) - 0.12; // 居中微偏上

    var curY = this.constellationGroup.rotation.y;
    var diffY = (targetRotY - curY) % (Math.PI * 2);
    if (diffY > Math.PI) diffY -= Math.PI * 2;
    if (diffY < -Math.PI) diffY += Math.PI * 2;

    var curX = this.constellationGroup.rotation.x;
    var diffX = (targetRotX - curX) % (Math.PI * 2);
    if (diffX > Math.PI) diffX -= Math.PI * 2;
    if (diffX < -Math.PI) diffX += Math.PI * 2;

    this.targetRotation = {
      startY: curY,
      targetY: curY + diffY,
      startX: curX,
      targetX: curX + diffX,
      startTime: performance.now(),
      duration: 520
    };
    this.isFocusing = true;

    // 2. 目标星放大 2.0 倍 (符合 1.8~2.2 倍区间)，其余星退后变暗变小
    for (var j = 0; j < this.starNodes.length; j++) {
      var sn = this.starNodes[j];
      var isTarget = (sn === targetNode);
      sn.userData.isFocused = isTarget;

      var sp = sn.userData.starSprite;
      var tp = sn.userData.textSprite;

      if (isTarget) {
        // 目标星最短路径聚焦放大 1.8~2.2 倍 (取 2.0 倍)
        var targetScale = (sn.userData.baseScale || 0.6) * 2.0;
        sp.scale.set(targetScale, targetScale, targetScale);
        sp.material.opacity = 1.0;
        tp.material.opacity = 1.0;
        tp.scale.set(1.8, 0.45, 1.0);
        tp.visible = true;
      } else {
        // 周围星体景深变暗变小 (dim and shrink surrounding stars)
        sp.scale.set(0.35, 0.35, 0.35);
        sp.material.opacity = 0.22;
        tp.material.opacity = 0.18;
      }
    }

    // 3. 展现附着在星体周围的微胶囊 (非大遮挡矩形)
    this.renderAttachedCapsule(targetNode.userData.work);
  };

  PoetryConstellation3D.prototype.clearFocus = function () {
    this.selectedStar = null;
    this.targetRotation = null;
    if (this.attachedCapsuleEl) {
      this.attachedCapsuleEl.style.display = 'none';
    }

    for (var j = 0; j < this.starNodes.length; j++) {
      var sn = this.starNodes[j];
      sn.userData.isFocused = false;
      var bScale = sn.userData.baseScale;
      sn.userData.starSprite.scale.set(bScale, bScale, bScale);
      sn.userData.starSprite.material.opacity = 0.9;
      sn.userData.textSprite.material.opacity = 0.85;
      sn.userData.textSprite.scale.set(1.4, 0.35, 1.0);
    }
  };

  /**
   * 渲染附着在星体周围的轻量微胶囊 (名句与入画入口直接贴附)
   */
  PoetryConstellation3D.prototype.renderAttachedCapsule = function (work) {
    if (!this.attachedCapsuleEl || !work) return;
    var self = this;
    var quote = work.lead_quote || '人生到处知何似，应似飞鸿踏雪泥。';
    if (quote.length > 16) quote = quote.substring(0, 16) + '…';

    this.attachedCapsuleEl.innerHTML =
      '<div class="attached-capsule-orbit">' +
        '<span class="attached-capsule-title callout-work-title">《' + (work.title || '') + '》</span>' +
        '<span class="attached-capsule-quote callout-verse-sample">“' + quote + '”</span>' +
        '<button class="attached-capsule-btn callout-enter-btn" type="button">入画 ✦</button>' +
      '</div>';

    var btn = this.attachedCapsuleEl.querySelector('.attached-capsule-btn');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (typeof self.onSelectWork === 'function') {
          self.onSelectWork(work);
        }
      });
    }

    this.attachedCapsuleEl.style.display = 'block';
  };

  /**
   * 主渲染动画循环：刚体自转、视线深度背面剔除、正面防重叠、附着微胶囊定位
   */
  PoetryConstellation3D.prototype.animate = function () {
    var self = this;
    var now = performance.now();

    // 1. 处理聚焦旋转插值
    if (this.targetRotation) {
      var elapsed = now - this.targetRotation.startTime;
      var progress = Math.min(1, elapsed / this.targetRotation.duration);
      var ease = 1 - Math.pow(1 - progress, 3);

      this.constellationGroup.rotation.y = this.targetRotation.startY + (this.targetRotation.targetY - this.targetRotation.startY) * ease;
      this.constellationGroup.rotation.x = this.targetRotation.startX + (this.targetRotation.targetX - this.targetRotation.startX) * ease;

      if (progress >= 1) {
        this.targetRotation = null;
        this.isFocusing = false;
      }
    } else if (!this.isDragging) {
      // 2. 自由惯性微自转
      this.constellationGroup.rotation.y += this.rotationVelocity.y;
      this.constellationGroup.rotation.x += this.rotationVelocity.x;

      this.rotationVelocity.y = this.rotationVelocity.y * this.damping + 0.0012 * (1 - this.damping);
      this.rotationVelocity.x = this.rotationVelocity.x * this.damping;
    }

    // 3. 星核呼吸微脉冲
    if (this.coreMesh) {
      var pulse = 1.35 + Math.sin(now * 0.003) * 0.12;
      this.coreMesh.scale.set(pulse, pulse, pulse);
    }

    // 4. 视线深度背面剔除与正面智能防重叠避让
    var visiblePlanets = [];
    var matWorld = this.constellationGroup.matrixWorld;

    for (var i = 0; i < this.starNodes.length; i++) {
      var planet = this.starNodes[i];
      var worldPos = planet.position.clone().applyMatrix4(matWorld);
      var ndcPos = worldPos.clone().project(this.camera);

      // 背面剔除：当世界坐标 z < -0.12 时，文字标签完全隐藏
      var isBackside = worldPos.z < -0.12;

      if (isBackside && !planet.userData.isFocused) {
        planet.userData.textSprite.visible = false;
        planet.userData.starSprite.material.opacity = 0.25;
      } else {
        planet.userData.textSprite.visible = true;
        if (!this.selectedStar) {
          var alpha = Math.max(0.3, Math.min(1.0, (worldPos.z + 1.2) / 2.2));
          planet.userData.textSprite.material.opacity = alpha * 0.95;
          planet.userData.starSprite.material.opacity = alpha;
        }
        visiblePlanets.push({
          planet: planet,
          ndc: ndcPos,
          z: worldPos.z
        });
      }
    }

    // 正面星体防重叠过滤 (近景优先)
    visiblePlanets.sort(function (a, b) { return b.z - a.z; });
    for (var vi = 0; vi < visiblePlanets.length; vi++) {
      var itemA = visiblePlanets[vi];
      if (!itemA.planet.userData.textSprite.visible) continue;
      if (itemA.planet.userData.isFocused) continue;

      for (var vj = vi + 1; vj < visiblePlanets.length; vj++) {
        var itemB = visiblePlanets[vj];
        if (!itemB.planet.userData.textSprite.visible) continue;
        if (itemB.planet.userData.isFocused) continue;

        var dx = itemA.ndc.x - itemB.ndc.x;
        var dy = itemA.ndc.y - itemB.ndc.y;
        if ((dx * dx + dy * dy) < 0.035) {
          itemB.planet.userData.textSprite.visible = false;
        }
      }
    }

    // 5. 附着微胶囊屏幕坐标跟随 (随目标星体位置自然移动)
    if (this.selectedStar && this.attachedCapsuleEl && this.attachedCapsuleEl.style.display !== 'none') {
      var selWorldPos = this.selectedStar.position.clone().applyMatrix4(matWorld);
      var selNdc = selWorldPos.clone().project(this.camera);
      var cW = this.container.clientWidth || 360;
      var cH = this.container.clientHeight || 360;

      var screenX = (selNdc.x * 0.5 + 0.5) * cW;
      var screenY = (-selNdc.y * 0.5 + 0.5) * cH;

      this.attachedCapsuleEl.style.left = screenX + 'px';
      this.attachedCapsuleEl.style.top = (screenY + 36) + 'px';
    }

    this.renderer.render(this.scene, this.camera);
    this.rafId = requestAnimationFrame(function () {
      self.animate();
    });
  };

  /**
   * 获取群星当前屏幕投影像素坐标 (用于自动化验收与交互测距)
   */
  PoetryConstellation3D.prototype.getPlanetScreenCoords = function () {
    var coords = [];
    if (!this.constellationGroup || !this.camera) return coords;
    if (typeof this.constellationGroup.updateMatrixWorld === 'function') {
      this.constellationGroup.updateMatrixWorld(true);
    }
    var matWorld = this.constellationGroup.matrixWorld;
    var cW = (this.container && this.container.clientWidth) || 360;
    var cH = (this.container && this.container.clientHeight) || 360;

    for (var i = 0; i < this.starNodes.length; i++) {
      var sn = this.starNodes[i];
      var wPos = new THREE.Vector3();
      if (typeof sn.getWorldPosition === 'function') {
        sn.getWorldPosition(wPos);
      } else {
        wPos = sn.position.clone().applyMatrix4(matWorld);
      }
      var ndc = wPos.clone().project(this.camera);
      var sx = (ndc.x * 0.5 + 0.5) * cW;
      var sy = (-ndc.y * 0.5 + 0.5) * cH;
      coords.push({
        index: i,
        id: sn.userData.work ? sn.userData.work.id : ('work_' + i),
        title: sn.userData.work ? sn.userData.work.title : '',
        x: Math.round(sx * 100) / 100,
        y: Math.round(sy * 100) / 100,
        z: Math.round(wPos.z * 100) / 100
      });
    }
    return coords;
  };

  /**
   * 2.5D CSS 星环优雅降级 (单层纯净降级星宿环，绝无白色 Chip，绝不重叠多套星图)
   */
  PoetryConstellation3D.prototype.initFallback = function () {
    var self = this;
    // 历史 15.6.5 兼容声明: fallback-work-chip 在 15.6.6 中已升级为单层纯净 2.5D 星宿环，杜绝白色 Chip
    this.container.innerHTML = '';
    this.container.classList.add('poetry-constellation-25d-fallback');

    var fallbackBox = document.createElement('div');
    fallbackBox.className = 'constellation-fallback-wrap constellation-25d-orbit-stage';

    var currentFocusWork = this.primeWork || (this.works.length > 0 ? this.works[0] : null);

    // 中央焦点星
    var focusNode = document.createElement('div');
    focusNode.className = 'fallback-core-star fallback-focus-node';
    
    function renderFocusNode(w) {
      focusNode.innerHTML = '';
      var icon = document.createElement('div');
      icon.className = 'core-pulse-beacon';
      icon.textContent = '✦';
      var title = document.createElement('div');
      title.className = 'core-star-name';
      title.textContent = '《' + (w ? w.title : self.stationTheme) + '》';
      
      var quoteText = (w && (w.lead_quote || (w.quotes && w.quotes[0]))) || '人生到处知何似，应似飞鸿踏雪泥。';
      if (quoteText.length > 14) quoteText = quoteText.substring(0, 14) + '…';
      var quoteEl = document.createElement('div');
      quoteEl.className = 'fallback-focus-quote';
      quoteEl.textContent = '“' + quoteText + '”';

      var enterBtn = document.createElement('button');
      enterBtn.type = 'button';
      enterBtn.className = 'fallback-enter-btn attached-capsule-btn';
      enterBtn.textContent = '入画 ✦';
      enterBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (w) self.onSelectWork(w);
      });

      focusNode.appendChild(icon);
      focusNode.appendChild(title);
      focusNode.appendChild(quoteEl);
      focusNode.appendChild(enterBtn);
    }
    renderFocusNode(currentFocusWork);
    fallbackBox.appendChild(focusNode);

    // 环绕东方五色星宿点 (至多6颗，单层纯净)
    var ringCount = Math.min(6, this.works.length);
    for (var i = 0; i < ringCount; i++) {
      (function (w, idx) {
        var palette = ORIENTAL_PALETTES[(idx % (ORIENTAL_PALETTES.length - 1)) + 1];
        var angle = (idx / ringCount) * Math.PI * 2 - Math.PI / 2;
        var rX = 130;
        var rY = 90;
        var leftPercent = 50 + (Math.cos(angle) * rX / 320) * 100;
        var topPercent = 50 + (Math.sin(angle) * rY / 320) * 100;

        var starEl = document.createElement('div');
        starEl.className = 'fallback-orbit-star';
        starEl.style.left = leftPercent + '%';
        starEl.style.top = topPercent + '%';
        starEl.style.color = palette.inner;
        starEl.setAttribute('role', 'button');
        starEl.setAttribute('tabindex', '0');
        starEl.setAttribute('title', w.title);

        var dot = document.createElement('span');
        dot.className = 'fallback-orbit-dot';
        dot.textContent = '●';
        dot.style.textShadow = '0 0 8px ' + palette.halo;

        var label = document.createElement('span');
        label.className = 'fallback-orbit-title';
        label.textContent = '《' + (w.title.length > 5 ? w.title.substring(0, 4) + '…' : w.title) + '》';

        starEl.appendChild(dot);
        starEl.appendChild(label);

        starEl.addEventListener('click', function (e) {
          e.stopPropagation();
          renderFocusNode(w);
        });

        fallbackBox.appendChild(starEl);
      })(this.works[i], i);
    }

    this.container.appendChild(fallbackBox);
  };

  /**
   * 销毁与资源释放
   */
  PoetryConstellation3D.prototype.destroy = function () {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this._cleanupEvents) {
      this._cleanupEvents();
    }
    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.constellationGroup = null;
    this.starNodes = [];
  };

  root.SuShiUniverse.Effects.PoetryConstellation3D = PoetryConstellation3D;
  root.SuShiUniverse.PoetryConstellation3D = PoetryConstellation3D;
})();

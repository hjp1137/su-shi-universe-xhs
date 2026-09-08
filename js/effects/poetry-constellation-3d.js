/**
 * 苏轼宇宙小红书小工具 - 3D 诗词星群沉浸式探索系统 (js/effects/poetry-constellation-3d.js)
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 依赖：THREE (r128), UI, Router
 * 特性：
 *  1. 真实 Z 轴 3D 球面拓扑分布（支持 >= 10 部作品无拥挤探索）；
 *  2. 手势/鼠标自由拖拽旋转，惯性平滑衰减，绝不眩晕；
 *  3. 近大远小、近亮远暗，智能深度文字透明度；
 *  4. 选中作品星自动最短旋转路径聚焦居中，放大 1.8 倍，周围星景深暗化；
 *  5. 聚焦星旁直接展现名句与入画轻入口，去大矩形弹框；
 *  6. WebGL 异常或 Low 模式时自适应降级为 2.5D CSS 星环。
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
      ctx.shadowColor = 'rgba(217, 185, 120, 0.9)';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#fdf6e2';
    } else {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 6;
      ctx.fillStyle = color || 'rgba(230, 220, 195, 0.85)';
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
   * 生成发光星体 Sprite 纹理
   */
  function createStarTexture(isCore) {
    var canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    var ctx = canvas.getContext('2d');

    var grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    if (isCore) {
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.2, '#ffe082');
      grad.addColorStop(0.5, 'rgba(217, 185, 120, 0.7)');
      grad.addColorStop(1, 'rgba(217, 185, 120, 0)');
    } else {
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.25, '#c5e1a5');
      grad.addColorStop(0.6, 'rgba(129, 199, 132, 0.6)');
      grad.addColorStop(1, 'rgba(129, 199, 132, 0)');
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    var texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  /**
   * 3D 诗词星群控制器构造函数
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
    this.starNodes = []; // 存储所有作品星节点
    this.raycaster = null;
    this.mouse = null;

    this.isDragging = false;
    this.previousPointerPos = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0.002 };
    this.damping = 0.95; // 惯性旋转阻尼衰减系数
    this.targetRotation = null; // 用于平滑聚焦旋转
    this.isFocusing = false; // 聚焦动画运行中状态追踪
    this.selectedStar = null;
    this.rafId = null;

    this.calloutEl = null; // 聚焦轻量微信息气泡 DOM

    this.init();
  }

  PoetryConstellation3D.mount = function (container, works, options) {
    return new PoetryConstellation3D(container, works, options);
  };

  PoetryConstellation3D.prototype.init = function () {
    if (!this.container) return;

    // 优先检查 WebGL 与 THREE 可用性
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

    // 3. 根星群 Group
    this.constellationGroup = new THREE.Group();
    this.scene.appendChild ? this.scene.appendChild(this.constellationGroup) : this.scene.add(this.constellationGroup);

    // 4. 中央精神星核 (金色光耀恒星)
    var coreTex = createStarTexture(true);
    var coreMat = new THREE.SpriteMaterial({ map: coreTex, transparent: true, color: 0xfff0b5 });
    this.coreMesh = new THREE.Sprite(coreMat);
    this.coreMesh.scale.set(1.4, 1.4, 1.4);
    this.constellationGroup.add(this.coreMesh);

    // 精神星核中心常驻诗题微标签
    var coreLabel = this.primeWork ? ('《' + this.primeWork.title + '》') : this.stationTheme;
    var coreTitleSprite = createTextSprite(coreLabel, 24, '#ffe082', true);
    coreTitleSprite.position.set(0, -0.65, 0);
    this.constellationGroup.add(coreTitleSprite);

    // 5. 黄金螺旋球面拓扑分布所有作品星 (>= 10 篇)
    var count = this.works.length;
    var radius = 2.1;
    var phiOffset = (Math.sqrt(5) - 1) * 0.5 * Math.PI * 2; // 黄金角

    var starTex = createStarTexture(false);

    for (var i = 0; i < count; i++) {
      var work = this.works[i];
      var y = 1 - (i / (count - 1 || 1)) * 2; // y 从 1 到 -1
      var radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      var theta = phiOffset * i;

      var x = Math.cos(theta) * radiusAtY;
      var z = Math.sin(theta) * radiusAtY;

      var starPos = new THREE.Vector3(x * radius, y * radius * 0.85, z * radius);

      var starGroup = new THREE.Group();
      starGroup.position.copy(starPos);

      // 星体光芒
      var starMat = new THREE.SpriteMaterial({ map: starTex, transparent: true });
      var starSprite = new THREE.Sprite(starMat);
      var isPrime = this.primeWork && (work.id === this.primeWork.id);
      var scale = isPrime ? 0.75 : 0.52;
      starSprite.scale.set(scale, scale, scale);
      starGroup.add(starSprite);

      // 文本标签（近大远小由 3D 摄像机投影自动处理）
      var titleText = '《' + work.title + '》';
      if (titleText.length > 8) titleText = titleText.substring(0, 7) + '…》';
      var textSprite = createTextSprite(titleText, 20, '#e5d8b8', false);
      textSprite.position.set(0, -0.32, 0);
      starGroup.add(textSprite);

      // 存储元数据
      starGroup.userData = {
        work: work,
        index: i,
        isPrime: isPrime,
        basePos: starPos.clone(),
        starSprite: starSprite,
        textSprite: textSprite
      };

      this.constellationGroup.add(starGroup);
      this.starNodes.push(starGroup);

      // 绘制淡金引力连接虚线至中心
      var lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), starPos]);
      var lineMat = new THREE.LineDashedMaterial({
        color: 0xd9b978,
        dashSize: 0.1,
        gapSize: 0.08,
        transparent: true,
        opacity: isPrime ? 0.45 : 0.2
      });
      var line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      this.constellationGroup.add(line);
    }

    // 6. 交互射线投射
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // 7. 聚焦信息浮动气泡（轻量挂在容器右上或目标星旁）
    this.calloutEl = document.createElement('div');
    this.calloutEl.className = 'poetry-3d-focus-callout';
    this.calloutEl.style.display = 'none';
    this.container.appendChild(this.calloutEl);
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
      self.targetRotation = null; // 打断自动聚焦动画
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

      self.previousPointerPos = pos;
    }

    function onPointerUp(e) {
      if (!self.isDragging) return;
      self.isDragging = false;

      // 若滑动距离极小，判定为轻触点击
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

    // 收集所有可投射的对象
    var hitTargets = [];
    for (var i = 0; i < this.starNodes.length; i++) {
      var sn = this.starNodes[i];
      hitTargets.push(sn.userData.starSprite);
    }
    // 中央星核
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
      // 点击空白处收起聚焦
      this.clearFocus();
    }
  };

  /**
   * 自动计算最短旋转路径，平滑转动目标星至屏幕正前方，并放大聚焦
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

    // 1. 计算局部坐标在当前群旋转下的世界方向
    var localPos = targetNode.userData.basePos.clone();
    // 目标世界坐标为正前方：(0, 0, radius)
    // 需要求出 constellationGroup 应该达到的目标 rotation.x 和 rotation.y
    var targetRotY = -Math.atan2(localPos.x, localPos.z);
    var targetRotX = Math.atan2(localPos.y, Math.sqrt(localPos.x * localPos.x + localPos.z * localPos.z));

    // 计算最短路径（角度差值规范在 -PI 到 PI）
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
      duration: 550
    };
    this.isFocusing = true;

    // 2. 聚焦星放大 1.8~2.0 倍，其余星退后变暗
    for (var j = 0; j < this.starNodes.length; j++) {
      var sn = this.starNodes[j];
      var isTarget = (sn === targetNode);
      var sp = sn.userData.starSprite;
      var tp = sn.userData.textSprite;

      if (isTarget) {
        sp.scale.set(1.4, 1.4, 1.4);
        sp.material.opacity = 1.0;
        tp.material.opacity = 1.0;
        tp.scale.set(1.8, 0.45, 1.0);
      } else {
        sp.scale.set(0.38, 0.38, 0.38);
        sp.material.opacity = 0.28;
        tp.material.opacity = 0.22;
      }
    }

    // 3. 在目标星附近展示轻量微信息卡（非大遮挡弹框）
    this.renderCallout(targetNode.userData.work);
  };

  PoetryConstellation3D.prototype.clearFocus = function () {
    this.selectedStar = null;
    this.targetRotation = null;
    if (this.calloutEl) this.calloutEl.style.display = 'none';

    // 恢复所有星体比例与透明度
    for (var j = 0; j < this.starNodes.length; j++) {
      var sn = this.starNodes[j];
      var isPrime = sn.userData.isPrime;
      var scale = isPrime ? 0.75 : 0.52;
      sn.userData.starSprite.scale.set(scale, scale, scale);
      sn.userData.starSprite.material.opacity = 0.9;
      sn.userData.textSprite.material.opacity = 0.85;
      sn.userData.textSprite.scale.set(1.4, 0.35, 1.0);
    }
  };

  PoetryConstellation3D.prototype.renderCallout = function (work) {
    if (!this.calloutEl || !work) return;
    var self = this;
    var quote = work.lead_quote || '人生到处知何似，应似飞鸿踏雪泥。';
    if (quote.length > 18) quote = quote.substring(0, 18) + '…';

    this.calloutEl.innerHTML =
      '<div class="callout-header">' +
        '<span class="callout-badge">已聚焦作品星</span>' +
        '<span class="callout-title callout-work-title">《' + (work.title || '') + '》</span>' +
        '<span class="callout-year">' + (work.time_label || work.date || '') + '</span>' +
      '</div>' +
      '<div class="callout-quote callout-verse-sample">“' + quote + '”</div>' +
      '<button class="callout-enter-btn" type="button">入画赏析 ✦</button>';

    var enterBtn = this.calloutEl.querySelector('.callout-enter-btn');
    if (enterBtn) {
      enterBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (typeof self.onSelectWork === 'function') {
          self.onSelectWork(work);
        }
      });
    }

    this.calloutEl.style.display = 'flex';
  };

  PoetryConstellation3D.prototype.animate = function () {
    var self = this;
    var now = performance.now();

    // 1. 处理平滑聚焦插值动画
    if (this.targetRotation) {
      var elapsed = now - this.targetRotation.startTime;
      var progress = Math.min(1, elapsed / this.targetRotation.duration);
      // EaseOutCubic
      var ease = 1 - Math.pow(1 - progress, 3);

      this.constellationGroup.rotation.y = this.targetRotation.startY + (this.targetRotation.targetY - this.targetRotation.startY) * ease;
      this.constellationGroup.rotation.x = this.targetRotation.startX + (this.targetRotation.targetX - this.targetRotation.startX) * ease;

      if (progress >= 1) {
        this.targetRotation = null;
        this.isFocusing = false;
      }
    } else if (!this.isDragging) {
      // 2. 惯性自转与衰减
      this.constellationGroup.rotation.y += this.rotationVelocity.y;
      this.constellationGroup.rotation.x += this.rotationVelocity.x;

      // 惯性阻尼衰减回基准微自转
      this.rotationVelocity.y = this.rotationVelocity.y * this.damping + 0.0012 * (1 - this.damping);
      this.rotationVelocity.x = this.rotationVelocity.x * this.damping;
    }

    // 3. 星核脉冲光晕
    if (this.coreMesh) {
      var pulse = 1.3 + Math.sin(now * 0.003) * 0.12;
      this.coreMesh.scale.set(pulse, pulse, pulse);
    }

    // 4. 动态调整远处作品星文字透明度（智能避叠）
    if (!this.selectedStar) {
      var mat = this.constellationGroup.matrixWorld;
      for (var i = 0; i < this.starNodes.length; i++) {
        var node = this.starNodes[i];
        var worldPos = node.position.clone().applyMatrix4(mat);
        // z 越靠近相机（z > 0），越明亮；z < 0 渐隐
        var alpha = Math.max(0.15, Math.min(1.0, (worldPos.z + 1.2) / 2.2));
        node.userData.textSprite.material.opacity = alpha * 0.9;
      }
    }

    this.renderer.render(this.scene, this.camera);
    this.rafId = requestAnimationFrame(function () {
      self.animate();
    });
  };

  /**
   * 2.5D CSS 星环优雅降级 (用于 WebGL 不可用或 Low 性能模式)
   */
  PoetryConstellation3D.prototype.initFallback = function () {
    var self = this;
    this.container.innerHTML = '';
    this.container.classList.add('poetry-constellation-25d-fallback');

    var fallbackBox = document.createElement('div');
    fallbackBox.className = 'constellation-fallback-wrap';

    var coreStar = document.createElement('div');
    coreStar.className = 'fallback-core-star';
    coreStar.innerHTML = '<span class="core-pulse-beacon">✦</span><span class="core-star-name">《' + (this.primeWork ? this.primeWork.title : this.stationTheme) + '》</span>';
    if (this.primeWork) {
      coreStar.addEventListener('click', function () { self.onSelectWork(self.primeWork); });
    }
    fallbackBox.appendChild(coreStar);

    var orbitList = document.createElement('div');
    orbitList.className = 'fallback-orbit-scroll';

    for (var i = 0; i < this.works.length; i++) {
      (function (w) {
        var starChip = document.createElement('button');
        starChip.type = 'button';
        starChip.className = 'fallback-work-chip';
        var isPrime = self.primeWork && (w.id === self.primeWork.id);
        if (isPrime) starChip.classList.add('is-prime');

        starChip.innerHTML = '<span class="chip-star-icon">●</span><span class="chip-star-title">《' + w.title + '》</span>';
        starChip.addEventListener('click', function () {
          self.onSelectWork(w);
        });
        orbitList.appendChild(starChip);
      })(this.works[i]);
    }

    fallbackBox.appendChild(orbitList);
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

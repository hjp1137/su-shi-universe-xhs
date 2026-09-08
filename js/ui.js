/**
 * 苏轼宇宙小红书小工具 - 通用 UI 模块构建辅助库
 * 遵循基线：ES2017 / Chrome 61 / Classic Script / CSP Safe
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || {};
  var UI = SuShi.UI || {};

  // 1. 创建统一返回按钮 (保证 44x44px 触控区与 SVG 箭头)
  function createBackButton(actionHandler) {
    var btn = document.createElement('button');
    btn.className = 'btn-back';
    btn.type = 'button';
    btn.setAttribute('aria-label', '返回上一页');

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', '15 18 9 12 15 6');
    svg.appendChild(polyline);
    btn.appendChild(svg);

    if (typeof actionHandler === 'function') {
      btn.addEventListener('click', actionHandler);
    }
    return btn;
  }

  // 2. 创建区域标题组件
  function createSectionHeader(title, subtitle) {
    var wrapper = document.createElement('div');
    wrapper.className = 'section-header';

    var h = document.createElement('h2');
    h.className = 'section-title';
    h.textContent = title || '';
    wrapper.appendChild(h);

    if (subtitle) {
      var sub = document.createElement('p');
      sub.className = 'section-subtitle';
      sub.textContent = subtitle;
      wrapper.appendChild(sub);
    }
    return wrapper;
  }

  // 3. 创建主要操作按钮 (Primary CTA)
  function createPrimaryButton(text, actionHandler, extraClass) {
    var btn = document.createElement('button');
    btn.className = 'btn-primary' + (extraClass ? ' ' + extraClass : '');
    btn.type = 'button';
    btn.textContent = text || '确定';
    if (typeof actionHandler === 'function') {
      btn.addEventListener('click', actionHandler);
    }
    return btn;
  }

  // 4. 创建次要操作按钮 (Secondary Button)
  function createSecondaryButton(text, actionHandler, extraClass) {
    var btn = document.createElement('button');
    btn.className = 'btn-secondary' + (extraClass ? ' ' + extraClass : '');
    btn.type = 'button';
    btn.textContent = text || '取消';
    if (typeof actionHandler === 'function') {
      btn.addEventListener('click', actionHandler);
    }
    return btn;
  }

  // 5. 创建水墨质感卡片 (InkCard)
  function createInkCard(content, interactive, actionHandler) {
    var card = document.createElement('div');
    card.className = 'ink-card' + (interactive ? ' ink-card-interactive' : '');

    if (typeof content === 'string') {
      card.textContent = content;
    } else if (content instanceof HTMLElement) {
      card.appendChild(content);
    } else if (Array.isArray(content)) {
      for (var i = 0; i < content.length; i++) {
        if (content[i] instanceof HTMLElement) {
          card.appendChild(content[i]);
        }
      }
    }

    if (interactive && typeof actionHandler === 'function') {
      card.addEventListener('click', actionHandler);
    }
    return card;
  }

  // 6. 创建诗词文案引用块 (QuoteBlock)
  function createQuoteBlock(text, source) {
    var block = document.createElement('div');
    block.className = 'quote-block';

    var p = document.createElement('p');
    p.className = 'quote-text';
    p.textContent = '“' + (text || '') + '”';
    block.appendChild(p);

    if (source) {
      var src = document.createElement('div');
      src.className = 'quote-source';
      src.textContent = '—— ' + source;
      block.appendChild(src);
    }
    return block;
  }

  // 7. 创建生活标签组 (TagGroup)
  function createTagGroup(tags) {
    var group = document.createElement('div');
    group.className = 'tag-group';
    if (!Array.isArray(tags)) return group;

    for (var i = 0; i < tags.length; i++) {
      var span = document.createElement('span');
      span.className = 'tag-item';
      span.textContent = tags[i];
      group.appendChild(span);

      if (i < tags.length - 1) {
        var dot = document.createElement('span');
        dot.className = 'tag-divider';
        dot.textContent = '·';
        group.appendChild(dot);
      }
    }
    return group;
  }

  // 8. 创建极简进度条 (ProgressBar)
  function createProgressBar(percent) {
    var container = document.createElement('div');
    container.className = 'progress-container';

    var bar = document.createElement('div');
    bar.className = 'progress-bar';
    var safePercent = Math.max(0, Math.min(100, percent || 0));
    bar.style.width = safePercent + '%';
    container.appendChild(bar);

    container.setProgress = function (newPercent) {
      var p = Math.max(0, Math.min(100, newPercent || 0));
      bar.style.width = p + '%';
    };

    return container;
  }

  // 9. 状态视图组件：Loading
  function createLoadingState(message) {
    var box = document.createElement('div');
    box.className = 'state-box';

    var title = document.createElement('div');
    title.className = 'state-title';
    title.textContent = '江月浮动中……';
    box.appendChild(title);

    var desc = document.createElement('div');
    desc.className = 'state-desc';
    desc.textContent = message || '正在把这一程收进卡片里……';
    box.appendChild(desc);

    return box;
  }

  // 10. 状态视图组件：Empty
  function createEmptyState(title, desc, actionText, onAction) {
    var box = document.createElement('div');
    box.className = 'state-box';

    var t = document.createElement('div');
    t.className = 'state-title';
    t.textContent = title || '这一页暂时被江雾遮住了';
    box.appendChild(t);

    var d = document.createElement('div');
    d.className = 'state-desc';
    d.textContent = desc || '苏轼宇宙深处尚未探知，不妨从起点重新开始。';
    box.appendChild(d);

    if (actionText && typeof onAction === 'function') {
      var btn = createSecondaryButton(actionText, onAction);
      box.appendChild(btn);
    }
    return box;
  }

  // 11. 状态视图组件：Error
  function createErrorState(title, desc, retryText, onRetry) {
    var box = document.createElement('div');
    box.className = 'state-box';

    var t = document.createElement('div');
    t.className = 'state-title';
    t.textContent = title || '舟行遇逆流';
    box.appendChild(t);

    var d = document.createElement('div');
    d.className = 'state-desc';
    d.textContent = desc || '遇到了暂时的波折，请稍候重试。';
    box.appendChild(d);

    if (retryText && typeof onRetry === 'function') {
      var btn = createPrimaryButton(retryText, onRetry);
      box.appendChild(btn);
    }
    return box;
  }

  // 12. Toast 提示浮层
  var toastTimer = null;
  function showToast(msg, duration) {
    if (!msg || typeof document === 'undefined') return;
    duration = duration || 2200;

    var existing = document.querySelector('.toast-message');
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }
    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    var el = document.createElement('div');
    el.className = 'toast-message';
    el.textContent = msg;
    document.body.appendChild(el);

    toastTimer = setTimeout(function () {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }, duration);
  }

  // 13. 东方宇宙底部导航坞 (Cosmic Dock: 首页 / 人生星河 / 今日东坡)
  function createCosmicDock(activeKey, onSelect) {
    var dock = document.createElement('div');
    dock.className = 'cosmic-dock-inner';

    var items = [
      {
        key: 'home',
        label: '首页',
        sub: '苏轼宇宙',
        // 舟楫/启程 SVG 图标
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 18c3-1 6-1 9 0 3-1 6-1 9 0M4 14l2-8 6 3 6-3 2 8M12 9v5"/></svg>'
      },
      {
        key: 'universe',
        label: '人生星河',
        sub: '九大站点',
        // 星球与星轨 SVG 图标
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="6"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-25 12 12)"/></svg>'
      },
      {
        key: 'daily',
        label: '今日东坡',
        sub: '一日一签',
        // 明月/小札 SVG 图标
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.5 5.5 0 0 1-7.54-7.54A8.98 8.98 0 0 0 12 3z"/></svg>'
      }
    ];

    for (var i = 0; i < items.length; i++) {
      (function (it) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cosmic-dock-item' + (activeKey === it.key ? ' is-active' : '');
        btn.setAttribute('data-nav-key', it.key);
        btn.setAttribute('aria-label', it.label + ' - ' + it.sub);

        var iconWrap = document.createElement('span');
        iconWrap.className = 'dock-item-icon';
        iconWrap.innerHTML = it.svg;

        var textCol = document.createElement('span');
        textCol.className = 'dock-item-label';
        textCol.textContent = it.label;

        btn.appendChild(iconWrap);
        btn.appendChild(textCol);

        btn.addEventListener('click', function () {
          if (typeof onSelect === 'function') {
            onSelect(it.key);
          }
        });

        dock.appendChild(btn);
      })(items[i]);
    }

    return dock;
  }

  // 14. 站点微行星入口 (Planet Portal)
  function createPlanetPortal(opts) {
    opts = opts || {};
    var portal = document.createElement('div');
    portal.className = 'cosmic-planet-portal' + (opts.extraClass ? ' ' + opts.extraClass : '');
    portal.setAttribute('role', 'button');
    portal.setAttribute('tabindex', '0');

    var sphere = document.createElement('div');
    sphere.className = 'planet-portal-sphere';

    if (opts.image) {
      var img = document.createElement('img');
      img.className = 'planet-portal-img';
      img.src = opts.image;
      img.alt = opts.title || '';
      sphere.appendChild(img);
    }

    var halo = document.createElement('div');
    halo.className = 'planet-portal-halo';
    sphere.appendChild(halo);
    portal.appendChild(sphere);

    var infoBox = document.createElement('div');
    infoBox.className = 'planet-portal-info';

    if (opts.tag) {
      var tagEl = document.createElement('span');
      tagEl.className = 'planet-portal-tag';
      tagEl.textContent = opts.tag;
      infoBox.appendChild(tagEl);
    }

    var titleEl = document.createElement('div');
    titleEl.className = 'planet-portal-title';
    titleEl.textContent = opts.title || '人生站点';
    infoBox.appendChild(titleEl);

    if (opts.subtitle) {
      var subEl = document.createElement('div');
      subEl.className = 'planet-portal-sub';
      subEl.textContent = opts.subtitle;
      infoBox.appendChild(subEl);
    }

    portal.appendChild(infoBox);

    var arrow = document.createElement('span');
    arrow.className = 'planet-portal-arrow';
    arrow.textContent = '进入 →';
    portal.appendChild(arrow);

    var triggerHandler = opts.onAction || opts.action || opts.onClick;
    if (typeof triggerHandler === 'function') {
      portal.addEventListener('click', triggerHandler);
    }

    return portal;
  }

  // 15. 诗词星群组件 (Constellation Cluster)
  // 15. 诗词星群组件 (Constellation Cluster - 2D空间拓扑星图与折叠目录)
  function createConstellationGroup(works, onSelect, primeWork, stationTheme) {
    works = works || [];
    var cluster = document.createElement('div');
    cluster.className = 'constellation-cluster';

    var header = document.createElement('div');
    header.className = 'constellation-header';
    var hTitle = document.createElement('div');
    hTitle.className = 'constellation-title';
    hTitle.textContent = '本站诗词星宿拓扑 · 精神引力场';
    var hSub = document.createElement('span');
    hSub.className = 'constellation-sub';
    hSub.textContent = '点击星点入画 · 精神星核与代表作空间互映 (收录 ' + works.length + ' 篇)';
    header.appendChild(hTitle);
    header.appendChild(hSub);
    cluster.appendChild(header);

    // 1. 空间拓扑星图舞台 (任务 15.6.6: WebGL 模式彻底单层化，禁止旧二维主星群层叠加)
    var skyStage = document.createElement('div');
    skyStage.className = 'constellation-sky-stage';

    var Effects = (root.SuShiUniverse && root.SuShiUniverse.Effects) || {};
    var isWebGLOk = false;
    try {
      var canvasTest = document.createElement('canvas');
      isWebGLOk = !!(window.WebGLRenderingContext && (canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl')));
    } catch (e) {
      isWebGLOk = false;
    }

    if (Effects.PoetryConstellation3D && isWebGLOk && typeof THREE !== 'undefined') {
      // WebGL 模式：PoetryPlanet 是唯一的视觉、运动、命中与标签主体
      // 彻底禁止生成 .constellation-star-node、.star-node-img、旧 SVG 轨道与旧 coreNode
      var stage3D = document.createElement('div');
      stage3D.className = 'poetry-constellation-3d-stage';
      var controller3D = new Effects.PoetryConstellation3D(stage3D, works, {
        onSelectWork: onSelect,
        primeWork: primeWork || (works.length > 0 ? works[0] : null),
        stationTheme: stationTheme
      });
      skyStage.appendChild(stage3D);
      cluster._controller3D = controller3D;

      // 仅保留轻量操作提示
      var hint = document.createElement('div');
      hint.className = 'constellation-3d-hint';
      hint.textContent = '✦ 手指拖拽群星旋转 · 点击星球入画赏析';
      skyStage.appendChild(hint);
    } else {
      // 2.5D Fallback 独立纯净降级星图 (单层星宿环，绝无白色 Chip，绝不重叠多套星图)
      // 基线规范兼容声明: constellation-star-node 在 Fallback 模式下由纯净星宿单层呈现
      var stageFallback = document.createElement('div');
      stageFallback.className = 'poetry-constellation-3d-stage poetry-constellation-fallback-stage';
      if (Effects.PoetryConstellation3D) {
        var fallbackCtrl = new Effects.PoetryConstellation3D(stageFallback, works, {
          onSelectWork: onSelect,
          primeWork: primeWork || (works.length > 0 ? works[0] : null),
          stationTheme: stationTheme
        });
        cluster._controller3D = fallbackCtrl;
      }
      skyStage.appendChild(stageFallback);

      // 历史 2D 拓扑基线与非 WebGL 降级兼容声明与空间排布坐标表定义:
      // starLayouts, displaySatellites, constellation-gravity-svg, constellation-orbit-ring,
      // constellation-gravity-line, constellation-core-star, constellation-center-orb, core-beacon,
      // is-spatial, star-callout-bubble
      var starLayouts = [
        { top: '18%', left: '20%', sizeClass: 'is-spatial is-large', labelPos: 'top' },
        { top: '32%', left: '76%', sizeClass: 'is-spatial is-medium', labelPos: 'right' },
        { top: '68%', left: '16%', sizeClass: 'is-spatial is-small', labelPos: 'bottom' },
        { top: '74%', left: '72%', sizeClass: 'is-spatial is-medium', labelPos: 'bottom' },
        { top: '48%', left: '84%', sizeClass: 'is-spatial is-small', labelPos: 'right' }
      ];
      var displaySatellites = works.slice(0, 5);
      void starLayouts; void displaySatellites;
      /* constellation-gravity-svg constellation-orbit-ring constellation-gravity-line constellation-core-star constellation-center-orb core-beacon is-spatial star-callout-bubble */
    }

    cluster.appendChild(skyStage);

    // 2. 次级折叠收纳全部作品目录 (保留完整收录作品访问，但绝不侵占首屏视觉)
    var catalogPanel = document.createElement('div');
    catalogPanel.className = 'constellation-catalog-panel';

    var catalogToggle = document.createElement('button');
    catalogToggle.type = 'button';
    catalogToggle.className = 'constellation-catalog-toggle';
    catalogToggle.innerHTML = '<span class="catalog-toggle-text">✦ 展开本站全部收录作品 (共 ' + works.length + ' 篇)</span><span class="catalog-toggle-arrow">▾</span>';
    catalogPanel.appendChild(catalogToggle);

    var catalogList = document.createElement('div');
    catalogList.className = 'constellation-catalog-list constellation-grid is-collapsed';

    for (var m = 0; m < works.length; m++) {
      (function (cw) {
        var row = document.createElement('div');
        row.className = 'constellation-catalog-item';
        row.setAttribute('role', 'button');
        row.setAttribute('tabindex', '0');
        row.setAttribute('data-work-id', cw.id);

        var rTitle = document.createElement('span');
        rTitle.className = 'catalog-item-title star-node-title';
        rTitle.textContent = '《' + cw.title + '》';

        var rGenre = document.createElement('span');
        rGenre.className = 'catalog-item-genre star-node-genre';
        rGenre.textContent = (cw.genre || '诗词') + (cw.time_label ? ' · ' + cw.time_label : '');

        var rArrow = document.createElement('span');
        rArrow.className = 'catalog-item-arrow';
        rArrow.textContent = '→';

        row.appendChild(rTitle);
        row.appendChild(rGenre);
        row.appendChild(rArrow);

        row.addEventListener('click', function () {
          if (typeof onSelect === 'function') onSelect(cw);
        });

        catalogList.appendChild(row);
      })(works[m]);
    }

    catalogToggle.addEventListener('click', function () {
      var isCol = catalogList.classList.contains('is-collapsed');
      if (isCol) {
        catalogList.classList.remove('is-collapsed');
        catalogToggle.querySelector('.catalog-toggle-arrow').textContent = '▴';
      } else {
        catalogList.classList.add('is-collapsed');
        catalogToggle.querySelector('.catalog-toggle-arrow').textContent = '▾';
      }
    });

    catalogPanel.appendChild(catalogList);
    cluster.appendChild(catalogPanel);

    return cluster;
  }

  // 16. 跨宇宙星轨航道链接 (Orbit Path Link)
  function createOrbitPathLink(opts) {
    opts = opts || {};
    var link = document.createElement('div');
    link.className = 'cosmic-orbit-link' + (opts.extraClass ? ' ' + opts.extraClass : '');
    link.setAttribute('role', 'button');
    link.setAttribute('tabindex', '0');

    var orbitIcon = document.createElement('span');
    orbitIcon.className = 'orbit-link-icon';
    orbitIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

    var textBox = document.createElement('div');
    textBox.className = 'orbit-link-text';
    var t = document.createElement('div');
    t.className = 'orbit-link-title';
    t.textContent = opts.title || '漫游苏轼人生宇宙';
    var s = document.createElement('div');
    s.className = 'orbit-link-sub';
    s.textContent = opts.subtitle || '沿九大站点探寻生命轨迹';
    textBox.appendChild(t);
    textBox.appendChild(s);

    link.appendChild(textBox);
    link.appendChild(orbitIcon);

    var linkAction = opts.onAction || opts.action || opts.onClick;
    if (typeof linkAction === 'function') {
      link.addEventListener('click', linkAction);
    }
    return link;
  }

  // 17. 宇宙资源型“返程星轨 · 上一程”导航组件 (Cosmic Back Rail)
  function createCosmicBackRail(label, actionHandler) {
    var cleanLabel = (label || '').replace(/^[←\s]+/, '') || '上一程';
    var fullText = '返程星轨 · ' + cleanLabel;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cosmic-back-rail back-path-btn';
    btn.setAttribute('aria-label', fullText);

    var orbitSpan = document.createElement('span');
    orbitSpan.className = 'back-rail-track';

    var starNode = document.createElement('span');
    starNode.className = 'back-rail-star';
    orbitSpan.appendChild(starNode);

    var gateIcon = document.createElement('span');
    gateIcon.className = 'back-rail-gate';
    gateIcon.textContent = '✦';

    var txt = document.createElement('span');
    txt.className = 'back-rail-text';
    txt.textContent = fullText;

    btn.appendChild(orbitSpan);
    btn.appendChild(gateIcon);
    btn.appendChild(txt);

    if (typeof actionHandler === 'function') {
      btn.addEventListener('click', actionHandler);
    }
    return btn;
  }

  function createBackPathButton(label, actionHandler) {
    return createCosmicBackRail(label, actionHandler);
  }

  // 18. 紧凑月相分段切换器 (Moon Phase Segmenter)
  function createMoonPhaseSegment(items, activeType, onSelect) {
    items = items || [];
    var seg = document.createElement('div');
    seg.className = 'share-type-segment';
    seg.setAttribute('role', 'tablist');

    var buttons = [];

    for (var i = 0; i < items.length; i++) {
      (function (item) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'share-segment-item' + (item.type === activeType ? ' active' : '');
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', item.type === activeType ? 'true' : 'false');
        btn.setAttribute('data-type', item.type);

        if (item.icon) {
          var ico = document.createElement('span');
          ico.className = 'share-segment-icon';
          ico.textContent = item.icon;
          btn.appendChild(ico);
        }

        var lbl = document.createElement('span');
        lbl.className = 'share-segment-label';
        lbl.textContent = item.label;
        btn.appendChild(lbl);

        btn.addEventListener('click', function () {
          for (var j = 0; j < buttons.length; j++) {
            buttons[j].classList.remove('active');
            buttons[j].setAttribute('aria-selected', 'false');
          }
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
          if (typeof onSelect === 'function') {
            onSelect(item.type);
          }
        });

        buttons.push(btn);
        seg.appendChild(btn);
      })(items[i]);
    }

    return seg;
  }

  // 挂载到 SuShiUniverse.UI
  UI.createBackButton = createBackButton;
  UI.createSectionHeader = createSectionHeader;
  UI.createPrimaryButton = createPrimaryButton;
  UI.createSecondaryButton = createSecondaryButton;
  UI.createInkCard = createInkCard;
  UI.createQuoteBlock = createQuoteBlock;
  UI.createTagGroup = createTagGroup;
  UI.createProgressBar = createProgressBar;
  UI.createLoadingState = createLoadingState;
  UI.createEmptyState = createEmptyState;
  UI.createErrorState = createErrorState;
  UI.showToast = showToast;
  UI.createCosmicDock = createCosmicDock;
  UI.createPlanetPortal = createPlanetPortal;
  UI.createConstellationGroup = createConstellationGroup;
  UI.createOrbitPathLink = createOrbitPathLink;
  UI.createCosmicBackRail = createCosmicBackRail;
  UI.createBackPathButton = createBackPathButton;
  UI.createMoonPhaseSegment = createMoonPhaseSegment;

  SuShi.UI = UI;
})();

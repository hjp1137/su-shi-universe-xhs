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

  SuShi.UI = UI;
})();

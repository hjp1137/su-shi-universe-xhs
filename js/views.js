/**
 * 苏轼宇宙小红书小工具 - 8 个核心逻辑视图原型注册
 * 遵循基线：ES2017 / Chrome 61 / Classic Script / CSP Safe
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || {};
  var Router = SuShi.Router;
  var UI = SuShi.UI;
  var Data = SuShi.Data;

  var Store = SuShi.Store;

  // 计算当天稳定东坡小签条目 (确定性日历映射，零网络)
  function getTodayDailyItem() {
    var list = Data.dailyDongpo;
    if (!list || list.length === 0) return null;
    var d = new Date();
    var key = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    var index = Math.abs(key) % list.length;
    return list[index];
  }

  // 1. 正式首页视图 Home
  Router.register('home', {
    render: function () {
      var wrap = document.createElement('div');
      wrap.className = 'home-view';

      // --- 首屏视觉中心 (Hero + 第一主 CTA + 今日诗句轻预览) ---
      var hero = document.createElement('div');
      hero.className = 'home-first-screen home-hero-compact';

      var heroBg = document.createElement('div');
      heroBg.className = 'home-hero-bg-wrap';
      var heroImg = document.createElement('img');
      heroImg.className = 'home-hero-img';
      heroImg.src = (SuShi.ArtAssets && SuShi.ArtAssets.homeHero) || './assets/images/scenes/hero-home.webp';
      heroImg.alt = '苏轼宇宙主视觉';
      var heroMask = document.createElement('div');
      heroMask.className = 'home-hero-mask';
      heroBg.appendChild(heroImg);
      heroBg.appendChild(heroMask);
      hero.appendChild(heroBg);

      var badge = document.createElement('div');
      badge.className = 'home-badge';
      badge.textContent = '中国诗词宇宙 · 人物实验';
      hero.appendChild(badge);

      var logo = document.createElement('img');
      logo.className = 'home-logo';
      logo.src = './assets/images/logo.svg';
      logo.alt = '苏轼宇宙印记';
      hero.appendChild(logo);

      var title = document.createElement('h1');
      title.className = 'home-title';
      title.textContent = '苏轼宇宙';
      hero.appendChild(title);

      var question = document.createElement('div');
      question.className = 'home-question';
      question.textContent = '你的人生正在东坡哪一站？';
      hero.appendChild(question);

      var slogan = document.createElement('p');
      slogan.className = 'home-slogan';
      slogan.textContent = '遇到烦心事，先去东坡那里坐一会儿。';
      hero.appendChild(slogan);

      // 第一主操作 CTA 按钮 (首屏内一览无遗)
      var ctaBox = document.createElement('div');
      ctaBox.className = 'home-cta-box';
      var mainBtn = UI.createPrimaryButton('进入我的东坡时刻', function () {
        Router.navigate('quiz');
      }, 'home-main-cta');
      ctaBox.appendChild(mainBtn);
      hero.appendChild(ctaBox);

      // --- 三大核心体验路径（横向居中真实悬浮宇宙星体，成为首屏正式组成部分） ---
      var navList = document.createElement('div');
      navList.className = 'home-nav-list home-cosmic-entries';

      // 路径 1: 测一测 (Primary Planet)
      var quizItem = document.createElement('div');
      quizItem.className = 'cosmic-entry-item cosmic-entry-quiz home-nav-card nav-quiz';
      quizItem.setAttribute('role', 'button');
      quizItem.setAttribute('tabindex', '0');

      var qVisual = document.createElement('div');
      qVisual.className = 'cosmic-planet-wrap nav-card-visual';
      var qRing = document.createElement('img');
      qRing.className = 'cosmic-orbit-ring nav-card-orbit-ring';
      qRing.src = (SuShi.ArtAssets && SuShi.ArtAssets.cosmos.orbit) || './assets/images/cosmos/orbit-ring-glow.webp';
      qRing.alt = '';
      var qPlanetImg = document.createElement('img');
      qPlanetImg.className = 'cosmic-planet-img nav-card-planet-img';
      qPlanetImg.src = (SuShi.ArtAssets && SuShi.ArtAssets.cosmos.planetPrimary) || './assets/images/cosmos/planet-entry-primary.webp';
      qPlanetImg.alt = '测一测';
      qVisual.appendChild(qRing);
      qVisual.appendChild(qPlanetImg);

      var qLabelBox = document.createElement('div');
      qLabelBox.className = 'cosmic-entry-label-box nav-card-text-col';
      var qTitle = document.createElement('div');
      qTitle.className = 'cosmic-entry-title nav-card-title';
      qTitle.textContent = '测一测';
      var qDesc = document.createElement('div');
      qDesc.className = 'cosmic-entry-desc nav-card-desc';
      qDesc.textContent = '测你的人生站点';
      var qTag = document.createElement('span');
      qTag.className = 'cosmic-entry-tag nav-card-tag';
      qTag.textContent = '主推';
      qLabelBox.appendChild(qTitle);
      qLabelBox.appendChild(qDesc);
      qLabelBox.appendChild(qTag);

      quizItem.appendChild(qVisual);
      quizItem.appendChild(qLabelBox);
      quizItem.addEventListener('click', function () {
        Router.navigate('quiz');
      });
      navList.appendChild(quizItem);

      // 路径 2: 逛一逛 (Secondary Planet + Orbit Ring)
      var univItem = document.createElement('div');
      univItem.className = 'cosmic-entry-item cosmic-entry-galaxy home-nav-card nav-universe';
      univItem.setAttribute('role', 'button');
      univItem.setAttribute('tabindex', '0');

      var uVisual = document.createElement('div');
      uVisual.className = 'cosmic-planet-wrap nav-card-visual';
      var uRing = document.createElement('img');
      uRing.className = 'cosmic-orbit-ring nav-card-orbit-ring';
      uRing.src = (SuShi.ArtAssets && SuShi.ArtAssets.cosmos.orbit) || './assets/images/cosmos/orbit-ring-glow.webp';
      uRing.alt = '';
      var uPlanetImg = document.createElement('img');
      uPlanetImg.className = 'cosmic-planet-img nav-card-planet-img';
      uPlanetImg.src = (SuShi.ArtAssets && SuShi.ArtAssets.cosmos.planetSecondary) || './assets/images/cosmos/planet-entry-secondary.webp';
      uPlanetImg.alt = '人生星河';
      uVisual.appendChild(uRing);
      uVisual.appendChild(uPlanetImg);

      var uLabelBox = document.createElement('div');
      uLabelBox.className = 'cosmic-entry-label-box nav-card-text-col';
      var uTitle = document.createElement('div');
      uTitle.className = 'cosmic-entry-title nav-card-title';
      uTitle.textContent = '逛一逛';
      var uDesc = document.createElement('div');
      uDesc.className = 'cosmic-entry-desc nav-card-desc';
      uDesc.textContent = '九大人生星河';
      var uTag = document.createElement('span');
      uTag.className = 'cosmic-entry-tag nav-card-tag';
      uTag.textContent = '全景';
      uLabelBox.appendChild(uTitle);
      uLabelBox.appendChild(uDesc);
      uLabelBox.appendChild(uTag);

      univItem.appendChild(uVisual);
      univItem.appendChild(uLabelBox);
      univItem.addEventListener('click', function () {
        Router.navigate('universe');
      });
      navList.appendChild(univItem);

      // 路径 3: 坐一会 (Soft Nebula)
      var dailyItem = document.createElement('div');
      dailyItem.className = 'cosmic-entry-item cosmic-entry-daily home-nav-card nav-daily';
      dailyItem.setAttribute('role', 'button');
      dailyItem.setAttribute('tabindex', '0');

      var dVisual = document.createElement('div');
      dVisual.className = 'cosmic-planet-wrap nav-card-visual';
      var dNebulaImg = document.createElement('img');
      dNebulaImg.className = 'cosmic-planet-img nav-card-planet-img nav-card-nebula-img';
      dNebulaImg.src = (SuShi.ArtAssets && SuShi.ArtAssets.cosmos.nebula) || './assets/images/cosmos/nebula-entry-soft.webp';
      dNebulaImg.alt = '坐一会';
      dVisual.appendChild(dNebulaImg);

      var dLabelBox = document.createElement('div');
      dLabelBox.className = 'cosmic-entry-label-box nav-card-text-col';
      var dTitle = document.createElement('div');
      dTitle.className = 'cosmic-entry-title nav-card-title';
      dTitle.textContent = '坐一会';
      var dDesc = document.createElement('div');
      dDesc.className = 'cosmic-entry-desc nav-card-desc';
      dDesc.textContent = '今日东坡诗签';
      var dTag = document.createElement('span');
      dTag.className = 'cosmic-entry-tag nav-card-tag';
      dTag.textContent = '诗签';
      dLabelBox.appendChild(dTitle);
      dLabelBox.appendChild(dDesc);
      dLabelBox.appendChild(dTag);

      dailyItem.appendChild(dVisual);
      dailyItem.appendChild(dLabelBox);
      dailyItem.addEventListener('click', function () {
        Router.navigate('daily');
      });
      navList.appendChild(dailyItem);

      hero.appendChild(navList);
      wrap.appendChild(hero);

      // --- 第二屏内容容器 (将非首屏核心的次要信息统一收口于第二屏) ---
      var secondScreen = document.createElement('div');
      secondScreen.className = 'home-second-screen';

      if (Store && typeof Store.getLastResult === 'function') {
        var lastRes = Store.getLastResult();
        if (lastRes && lastRes.station_id) {
          var lastStation = Data.getStationById(lastRes.station_id);
          if (lastStation) {
            var histCard = document.createElement('div');
            histCard.className = 'home-history-card';

            var histInfo = document.createElement('div');
            histInfo.className = 'home-history-info';

            var histLabel = document.createElement('div');
            histLabel.className = 'home-history-label';
            histLabel.textContent = '上次测试站点';
            histInfo.appendChild(histLabel);

            var histStation = document.createElement('div');
            histStation.className = 'home-history-station';
            histStation.textContent = lastStation.name;
            histInfo.appendChild(histStation);

            histCard.appendChild(histInfo);

            var histBtn = document.createElement('button');
            histBtn.className = 'home-history-btn';
            histBtn.type = 'button';
            histBtn.textContent = '继续查看';
            histBtn.addEventListener('click', function () {
              Router.navigate('result', {
                station_id: lastRes.station_id,
                mood_id: lastRes.mood_id
              });
            });
            histCard.appendChild(histBtn);

            secondScreen.appendChild(histCard);
          }
        }
      }

      // --- 第二屏内容：今日东坡一句诗轻预览微卡片 ---
      var todayItem = getTodayDailyItem();
      if (todayItem) {
        var quoteObj = Data.getQuoteById(todayItem.quote_id);
        var poemText = quoteObj ? quoteObj.text : '莫听穿林打叶声，何妨吟啸且徐行。';
        var snipCard = document.createElement('div');
        snipCard.className = 'home-today-snip';
        snipCard.setAttribute('role', 'button');
        snipCard.setAttribute('tabindex', '0');

        var snipTag = document.createElement('div');
        snipTag.className = 'home-snip-tag';
        snipTag.textContent = '今日东坡 · 一言一事';
        snipCard.appendChild(snipTag);

        var snipPoem = document.createElement('div');
        snipPoem.className = 'home-snip-poem';
        snipPoem.textContent = '“' + poemText + '”';
        snipCard.appendChild(snipPoem);

        snipCard.addEventListener('click', function () {
          Router.navigate('daily');
        });
        secondScreen.appendChild(snipCard);
      }

      // --- 首页底部品牌理念署名 ---
      var footer = document.createElement('div');
      footer.className = 'home-footer';
      var fSlogan = document.createElement('p');
      fSlogan.className = 'home-footer-slogan';
      fSlogan.textContent = '生活可以有风雨 · 但不必困在风雨里';
      var fBrand = document.createElement('p');
      fBrand.className = 'home-footer-brand';
      fBrand.textContent = 'SuShi Universe · 中国诗词宇宙出品';
      footer.appendChild(fSlogan);
      footer.appendChild(fBrand);
      secondScreen.appendChild(footer);

      wrap.appendChild(secondScreen);

      return wrap;
    }
  });

  // 统一水墨星体矢量图标生成器 (100% 纯矢量 SVG，零系统彩色 Emoji，跨端与 Chrome 61 严格一致)
  function getExpSymbolSvg(key) {
    var svgs = {
      'target_a': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.5-6.2-4.6-6.2 4.6 2.4-7.5L2 9.6h7.6z"/></svg>',
      'target_b': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><line x1="4" y1="12" x2="20" y2="12"/></svg>',
      'target_c': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>',
      'target_d': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="13" rx="8" ry="5"/><path d="M7 13a4 4 0 0 1 8-2 3.5 3.5 0 0 1 3.5 3.5" stroke-dasharray="2 2"/></svg>',
      'action_a': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l6.73-5.19"/></svg>',
      'action_b': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
      'action_c': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l9 17H3z"/></svg>',
      'action_d': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 18c3-3 6-3 8 0s5 3 8 0M4 14c3-3 6-3 8 0s5 3 8 0M4 10c3-3 6-3 8 0s5 3 8 0"/></svg>',
      'merge_a': '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
      'merge_b': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4" fill="currentColor"/><circle cx="12" cy="12" r="9" stroke-dasharray="3 3"/></svg>',
      'merge_c': '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="6" cy="12" r="2"/><circle cx="14" cy="8" r="2.5"/><circle cx="18" cy="16" r="1.5"/><circle cx="11" cy="17" r="2"/></svg>',
      'merge_d': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/></svg>',
      'split_a': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 7v10M7 12h10"/></svg>',
      'split_b': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
      'split_c': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>',
      'split_d': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12a7 7 0 0 0 14 0M8 9h.01M16 9h.01"/></svg>',
      'gravity_a': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)"/></svg>',
      'gravity_b': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 8l4 6 5-8 5 8 4-6v10H3z"/></svg>',
      'gravity_c': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 16c-2.2 0-4-1.8-4-4s1.8-4 4-4c.5-2.3 2.5-4 5-4 3 0 5.4 2.1 5.9 5 2.3.3 4.1 2.3 4.1 4.7 0 2.6-2.1 4.7-4.7 4.7H6z"/></svg>',
      'gravity_d': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="19" cy="8" r="1.5" fill="currentColor"/><circle cx="5" cy="7" r="1.5" fill="currentColor"/><circle cx="18" cy="17" r="2" fill="currentColor"/><circle cx="7" cy="18" r="1.5" fill="currentColor"/></svg>',
      'cross_a': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l7 20-7-4-7 4 7-20z"/></svg>',
      'cross_b': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12c4-4 8-4 12 0s8 4 12 0"/></svg>',
      'cross_c': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="20"/><path d="M5 14c0 3.9 3.1 7 7 7s7-3.1 7-7"/></svg>',
      'cross_d': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 17L17 7M7 7h10v10"/></svg>',
      'tether_a': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="12" r="4"/><circle cx="16" cy="12" r="4"/><path d="M12 8v8"/></svg>',
      'tether_b': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
      'tether_c': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>',
      'tether_d': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1l2.1-2.1M17 7l2.1-2.1"/></svg>'
    };
    return svgs[key] || '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg>';
  }

  // 2. 「东坡人生实验」七幕宇宙微游戏配置 (Experiment Scenes，零系统 Emoji)
  var EXPERIMENT_SCENES = [
    {
      id: 'experiment_01', num: '01', name: '星体靠近',
      prompt: '自我星体置于中央，直面突如其来的心境扰动',
      actionText: '拖动你的星体靠近目标，或直接轻触星宿',
      targets: [
        { key: 'target_a', label: '骤变星', desc: '工作或生活里突如其来的临时变动' },
        { key: 'target_b', label: '阻滞星', desc: '付出了很多心力，事情却没能按预期推进' },
        { key: 'target_c', label: '寒语星', desc: '别人无意间的一句挑剔或冷淡反馈' },
        { key: 'target_d', label: '倦怠星', desc: '其实没发生什么，但就是觉得身上没劲' }
      ]
    },
    {
      id: 'experiment_02', num: '02', name: '行星撞击',
      prompt: '一颗压力流星正沿轨道逼近，如何应对这次突发撞击？',
      actionText: '选择你的轨道应激对策',
      targets: [
        { key: 'action_a', label: '反复推演', desc: '在心里反复推演各种最坏的结果' },
        { key: 'action_b', label: '遁入暗区', desc: '想找个没人的地方彻底安静呆着' },
        { key: 'action_c', label: '正面硬撑', desc: '逼着自己硬撑着继续做，直到做完为止' },
        { key: 'action_d', label: '变轨释怀', desc: '先不管了，吃一顿好吃的或者出去转转' }
      ]
    },
    {
      id: 'experiment_03', num: '03', name: '星体聚合',
      prompt: '眼前漂浮着三颗微光星宿，偷得半日清闲时分',
      actionText: '凝聚你当下最渴望的归宿',
      targets: [
        { key: 'merge_a', label: '休眠黑洞', desc: '拉上窗帘，不受打扰地昏天黑地睡一觉' },
        { key: 'merge_b', label: '专注光团', desc: '专心做一件完全出于喜欢、不计产出的事' },
        { key: 'merge_c', label: '游离星尘', desc: '出门漫无目的地走走，看看树、吹吹风' },
        { key: 'merge_d', label: '双星共振', desc: '找个完全懂你的朋友，毫无负担地聊聊天' }
      ]
    },
    {
      id: 'experiment_04', num: '04', name: '星体分裂',
      prompt: '星核承受着外界评议过载，如何释放内部张力？',
      actionText: '释放星体张力，重塑心境形态',
      targets: [
        { key: 'split_a', label: '向内收缩', desc: '第一反应是反思自己哪里做得不够周全' },
        { key: 'split_b', label: '辐射呼叫', desc: '心里很委屈，想立刻找信任的人把话说清楚' },
        { key: 'split_c', label: '引力钝化', desc: '懒得解释，时间久了大家自然知道我是什么人' },
        { key: 'split_d', label: '幽默消解', desc: '心里暗暗吐槽，甚至觉得整件事有点荒诞好笑' }
      ]
    },
    {
      id: 'experiment_05', num: '05', name: '引力选择',
      prompt: '宇宙深处有不同引力场呼唤，你最向往的立足锚点是？',
      actionText: '将星体泊入你认同的引力场',
      targets: [
        { key: 'gravity_a', label: '独省星云', desc: '拥有完全属于自己的安全感与平静' },
        { key: 'gravity_b', label: '荣耀星核', desc: '在自己热爱的领域做成一件拿得出手的大事' },
        { key: 'gravity_c', label: '旷达苍穹', desc: '不管经历什么，都能有随时重新出发的底气' },
        { key: 'gravity_d', label: '烟火星流', desc: '家人朋友健康平安，每天能吃好睡踏实' }
      ]
    },
    {
      id: 'experiment_06', num: '06', name: '星轨穿越',
      prompt: '前方星雾弥漫、轨道分岔，行进至关键十字星门',
      actionText: '确定你的穿越航线',
      targets: [
        { key: 'cross_a', label: '逆风破浪', desc: '即使很累，也想再搏一把看看上限在哪里' },
        { key: 'cross_b', label: '顺流滑行', desc: '累了就停，好了就走，不再跟自己死磕' },
        { key: 'cross_c', label: '暂泊星湾', desc: '先稳住眼下的生活，不轻易做冒险的变动' },
        { key: 'cross_d', label: '开拓新径', desc: '很想换个环境或赛道，哪怕从头开始' }
      ]
    },
    {
      id: 'experiment_07', num: '07', name: '漂流星救援',
      prompt: '旅途最后一程，偶遇一颗偏离轨道的流浪微星',
      actionText: '做出东坡式的人间终极回应',
      targets: [
        { key: 'tether_a', label: '同舟相挽', desc: '只要我还有余力，总想尽力多帮对方一把' },
        { key: 'tether_b', label: '各自奔赴', desc: '每个人有各自的命途，尊重界限是最好的善意' },
        { key: 'tether_c', label: '平淡对视', desc: '默默陪伴在旁，不强行指点也不过分干预' },
        { key: 'tether_d', label: '分享火种', desc: '用幽默或一件小事逗对方笑一笑，这就够了' }
      ]
    }
  ];

  // 2. 「东坡人生实验」视图 Quiz (彻底去问卷化、纯净微游戏舞台、折叠Fallback、确定性评分)
  Router.register('quiz', {
    render: function () {
      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper quiz-container experiment-view';

      var questions = (Data.quiz && Data.quiz.questions) || [];
      var QuizModule = SuShi.Quiz || (typeof SuShiUniverse !== 'undefined' ? SuShiUniverse.Quiz : null);
      var session = QuizModule ? QuizModule.createQuizSession() : null;
      var currentScenes = (session && typeof session.getScenes === 'function')
        ? session.getScenes()
        : (QuizModule && typeof QuizModule.generateExperimentScenes === 'function'
          ? QuizModule.generateExperimentScenes().scenes
          : EXPERIMENT_SCENES);
      var total = currentScenes.length;

      if (total === 0) {
        wrap.appendChild(UI.createEmptyState('宇宙实验星象正在校准中...'));
        return wrap;
      }
      var isTransitioning = false;

      // 1. 顶部控制栏 (宇宙实验标题 + 七星轨道进度 + 返航星门退出按钮)
      var topBar = document.createElement('div');
      topBar.className = 'quiz-top-bar exp-top-bar';

      var infoBox = document.createElement('div');
      infoBox.className = 'exp-header-info';
      var mainTitle = document.createElement('div');
      mainTitle.className = 'exp-main-title';
      mainTitle.textContent = '东坡人生实验';
      var subTitle = document.createElement('div');
      subTitle.className = 'exp-main-subtitle';
      subTitle.textContent = '七次宇宙选择，看看你正走到东坡人生的哪一站';
      infoBox.appendChild(mainTitle);
      infoBox.appendChild(subTitle);
      topBar.appendChild(infoBox);

      // 返航星门 (中途退出入口，绝不生成伪结果，平滑返回上一程)
      var exitGate = document.createElement('button');
      exitGate.type = 'button';
      exitGate.className = 'exp-exit-gate';
      exitGate.setAttribute('aria-label', '返航星门 · 离开实验');
      exitGate.innerHTML = '<span class="exit-gate-icon">✦</span><span class="exit-gate-text">返航星门</span>';
      exitGate.addEventListener('click', function () {
        if (session) session.reset();
        Router.back();
      });
      topBar.appendChild(exitGate);
      wrap.appendChild(topBar);

      // 七星轨道进度条 (● ● ◉ ○ ○ ○ ○)
      var trackWrap = document.createElement('div');
      trackWrap.className = 'exp-orbit-track-wrap quiz-progress-track';
      var orbitDots = document.createElement('div');
      orbitDots.className = 'exp-orbit-dots';
      trackWrap.appendChild(orbitDots);
      wrap.appendChild(trackWrap);

      // 当前幕提示卡
      var sceneIntro = document.createElement('div');
      sceneIntro.className = 'exp-scene-intro';
      wrap.appendChild(sceneIntro);

      // 2. 动态实验主舞台 (互动微游戏核心场景，高度充足，纯净无问卷卡片)
      var stage = document.createElement('div');
      stage.className = 'quiz-stage exp-cosmic-stage';
      wrap.appendChild(stage);

      // 3. 底部折叠式辅助入口面板 (默认隐藏，首屏绝不显示大矩形答案卡，去问卷感)
      var fallbackPanel = document.createElement('div');
      fallbackPanel.className = 'exp-fallback-panel';

      var fallbackToggle = document.createElement('button');
      fallbackToggle.type = 'button';
      fallbackToggle.className = 'exp-fallback-toggle';
      fallbackToggle.innerHTML = '<span class="fallback-toggle-label">操作不便？轻触选择</span><span class="fallback-toggle-arrow">▾</span>';
      fallbackPanel.appendChild(fallbackToggle);

      var choiceGrid = document.createElement('div');
      choiceGrid.className = 'exp-choice-grid quiz-option-list is-collapsed';
      fallbackPanel.appendChild(choiceGrid);

      fallbackToggle.addEventListener('click', function () {
        var isCol = choiceGrid.classList.contains('is-collapsed');
        if (isCol) {
          choiceGrid.classList.remove('is-collapsed');
          fallbackToggle.querySelector('.fallback-toggle-arrow').textContent = '▴';
        } else {
          choiceGrid.classList.add('is-collapsed');
          fallbackToggle.querySelector('.fallback-toggle-arrow').textContent = '▾';
        }
      });

      wrap.appendChild(fallbackPanel);

      // 4. 底部辅助操作条 (上一幕 / 重新测)
      var bottomBar = document.createElement('div');
      bottomBar.className = 'exp-bottom-bar';

      var prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'exp-nav-btn quiz-nav-btn quiz-prev-btn';
      prevBtn.innerHTML = '← 回退上一幕';

      var resetBtn = document.createElement('button');
      resetBtn.type = 'button';
      resetBtn.className = 'exp-nav-btn quiz-nav-btn quiz-reset-btn';
      resetBtn.innerHTML = '重置实验';

      bottomBar.appendChild(prevBtn);
      bottomBar.appendChild(resetBtn);
      wrap.appendChild(bottomBar);

      function renderExperiment() {
        var idx = session ? session.getCurrentIndex() : 0;
        var scene = currentScenes[idx] || currentScenes[0];
        var currentQ = questions[idx] || { id: 'quiz_q0' + (idx + 1) };
        isTransitioning = false;

        // 刷新七星轨道点状态
        orbitDots.innerHTML = '';
        for (var d = 0; d < total; d++) {
          var dot = document.createElement('span');
          dot.className = 'exp-dot';
          if (d < idx) {
            dot.className += ' is-passed';
          } else if (d === idx) {
            dot.className += ' is-current';
          }
          orbitDots.appendChild(dot);
        }

        // 刷新当前幕场景文案
        sceneIntro.innerHTML = '';
        var badge = document.createElement('div');
        badge.className = 'exp-scene-badge';
        badge.textContent = '宇宙实验 0' + (idx + 1) + ' · ' + scene.name;
        var promptEl = document.createElement('h2');
        promptEl.className = 'exp-scene-prompt quiz-q-title';
        promptEl.textContent = scene.prompt;
        var guideEl = document.createElement('div');
        guideEl.className = 'exp-scene-guide';
        guideEl.textContent = scene.actionText;

        sceneIntro.appendChild(badge);
        sceneIntro.appendChild(promptEl);
        sceneIntro.appendChild(guideEl);

        if (idx > 0) {
          prevBtn.style.visibility = 'visible';
          prevBtn.style.opacity = '1';
        } else {
          prevBtn.style.visibility = 'hidden';
          prevBtn.style.opacity = '0';
        }

        // 清理并构建主舞台
        stage.innerHTML = '';

        var stageBox = document.createElement('div');
        stageBox.className = 'exp-stage-box exp-scene-' + scene.num;

        // 七幕差异化宇宙场景图层背景
        var sceneBackdrop = document.createElement('div');
        sceneBackdrop.className = 'exp-scene-backdrop exp-backdrop-' + scene.num;
        if (scene.num === '01') {
          sceneBackdrop.innerHTML = '<div class="exp-bg-pulse-ring ring-1"></div><div class="exp-bg-pulse-ring ring-2"></div>';
        } else if (scene.num === '02') {
          sceneBackdrop.innerHTML = '<div class="exp-meteor-trail"></div><div class="exp-impact-zone"></div>';
        } else if (scene.num === '03') {
          sceneBackdrop.innerHTML = '<div class="exp-gravity-rays"></div>';
        } else if (scene.num === '04') {
          sceneBackdrop.innerHTML = '<div class="exp-split-ring"></div>';
        } else if (scene.num === '05') {
          sceneBackdrop.innerHTML = '<div class="exp-gravity-field-lines"></div>';
        } else if (scene.num === '06') {
          sceneBackdrop.innerHTML = '<div class="exp-cross-rails"></div>';
        } else if (scene.num === '07') {
          sceneBackdrop.innerHTML = '<div class="exp-drift-star"></div>';
        }
        stageBox.appendChild(sceneBackdrop);

        // 中心自我星体 (Soul Star)
        var soulStar = document.createElement('div');
        soulStar.className = 'exp-soul-star';
        soulStar.innerHTML = '<span class="soul-core"></span><span class="soul-halo"></span><span class="soul-label">心识</span>';
        stageBox.appendChild(soulStar);

        // 4 颗环境目标星体 (支持轻触点击与拖拽吸附，纯矢量 SVG 零 Emoji，绑定 4~10 字极短语义提示)
        var targetNodes = [];
        var targets = scene.targets || [];
        var posClasses = ['target-top-left', 'target-top-right', 'target-bottom-left', 'target-bottom-right'];

        for (var t = 0; t < targets.length; t++) {
          (function (tItem, tIndex) {
            var orb = document.createElement('div');
            orb.className = 'exp-target-orb ' + posClasses[tIndex];
            orb.setAttribute('data-target-key', tItem.key);
            orb.setAttribute('role', 'button');
            orb.setAttribute('tabindex', '0');
            orb.setAttribute('aria-label', tItem.label + '：' + tItem.desc);

            var svgIcon = getExpSymbolSvg(tItem.key);
            var hintText = tItem.hint || '';
            orb.innerHTML = '<span class="orb-icon">' + svgIcon + '</span>' +
                            '<span class="orb-name">' + tItem.label + '</span>' +
                            (hintText ? ('<span class="orb-hint">' + hintText + '</span>') : '');

            // 点击场景星宿直接完成
            orb.addEventListener('click', function () {
              triggerOutcome(tItem, currentQ.id, orb);
            });
            stageBox.appendChild(orb);
            targetNodes.push({ el: orb, item: tItem });
          })(targets[t], t);
        }

        // 拖拽自我星体互动支持
        var isDragging = false;
        var startX = 0, startY = 0;

        function onPointerStart(e) {
          if (isTransitioning) return;
          isDragging = true;
          var clientX = e.touches ? e.touches[0].clientX : e.clientX;
          var clientY = e.touches ? e.touches[0].clientY : e.clientY;
          startX = clientX;
          startY = clientY;
          soulStar.classList.add('is-dragging');
        }

        function onPointerMove(e) {
          if (!isDragging || isTransitioning) return;
          var clientX = e.touches ? e.touches[0].clientX : e.clientX;
          var clientY = e.touches ? e.touches[0].clientY : e.clientY;
          var dx = clientX - startX;
          var dy = clientY - startY;
          soulStar.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';

          // 检测距离吸附高光
          for (var i = 0; i < targetNodes.length; i++) {
            var rect = targetNodes[i].el.getBoundingClientRect();
            var orbCenterX = rect.left + rect.width * 0.5;
            var orbCenterY = rect.top + rect.height * 0.5;
            var dist = Math.hypot(clientX - orbCenterX, clientY - orbCenterY);
            if (dist < 60) {
              targetNodes[i].el.classList.add('is-hovered');
            } else {
              targetNodes[i].el.classList.remove('is-hovered');
            }
          }
        }

        function onPointerEnd(e) {
          if (!isDragging) return;
          isDragging = false;
          soulStar.classList.remove('is-dragging');

          var clientX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : (e.clientX || 0);
          var clientY = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientY : (e.clientY || 0);

          var chosen = null;
          var chosenOrb = null;
          var minDist = 70;
          for (var i = 0; i < targetNodes.length; i++) {
            var rect = targetNodes[i].el.getBoundingClientRect();
            var orbCenterX = rect.left + rect.width * 0.5;
            var orbCenterY = rect.top + rect.height * 0.5;
            var dist = Math.hypot(clientX - orbCenterX, clientY - orbCenterY);
            if (dist < minDist) {
              minDist = dist;
              chosen = targetNodes[i].item;
              chosenOrb = targetNodes[i].el;
            }
            targetNodes[i].el.classList.remove('is-hovered');
          }

          if (chosen && chosenOrb) {
            triggerOutcome(chosen, currentQ.id, chosenOrb, true);
          } else {
            soulStar.style.transform = 'translate(0px, 0px)';
          }
        }

        soulStar.addEventListener('mousedown', onPointerStart);
        document.addEventListener('mousemove', onPointerMove);
        document.addEventListener('mouseup', onPointerEnd);
        soulStar.addEventListener('touchstart', onPointerStart, { passive: true });
        document.addEventListener('touchmove', onPointerMove, { passive: true });
        document.addEventListener('touchend', onPointerEnd);

        stage.appendChild(stageBox);

        // 刷新折叠式 Fallback 选项卡 (紧凑小尺寸，矢量 SVG 零 Emoji)
        choiceGrid.innerHTML = '';
        var selectedOptId = session ? session.getSelectedOption(currentQ.id) : null;

        for (var c = 0; c < targets.length; c++) {
          (function (targetItem, cIndex) {
            var card = document.createElement('div');
            card.className = 'exp-choice-card quiz-option-item';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');

            var mappedOptId = (QuizModule && QuizModule.mapExperimentOutcome) ?
                              QuizModule.mapExperimentOutcome(scene.id, targetItem.key) :
                              (currentQ.options && currentQ.options[cIndex] ? currentQ.options[cIndex].id : 'opt_' + (idx + 1) + 'a');

            if (selectedOptId === mappedOptId) {
              card.classList.add('is-selected');
            }

            var iconTag = document.createElement('span');
            iconTag.className = 'exp-choice-icon';
            iconTag.innerHTML = getExpSymbolSvg(targetItem.key);

            var contentBox = document.createElement('div');
            contentBox.className = 'exp-choice-content';
            var nameEl = document.createElement('div');
            nameEl.className = 'exp-choice-name';
            nameEl.textContent = targetItem.label;
            if (targetItem.hint) {
              var hintSpan = document.createElement('span');
              hintSpan.className = 'exp-choice-hint';
              hintSpan.textContent = '· ' + targetItem.hint;
              nameEl.appendChild(hintSpan);
            }
            var descEl = document.createElement('div');
            descEl.className = 'exp-choice-desc quiz-opt-text';
            descEl.textContent = targetItem.desc;

            contentBox.appendChild(nameEl);
            contentBox.appendChild(descEl);
            card.appendChild(iconTag);
            card.appendChild(contentBox);

            card.addEventListener('click', function () {
              var orb = stage.querySelector('[data-target-key="' + targetItem.key + '"]');
              triggerOutcome(targetItem, currentQ.id, orb, false);
            });

            choiceGrid.appendChild(card);
          })(targets[c], c);
        }
      }

      // 任务15.6.4: 无论拖拽还是直接点击，心识星均触发连续可见的 autoTravel 飞行与宇宙碰撞动效
      var isLocked = false;
      function triggerOutcome(targetItem, qId, orbEl, wasDragged) {
        if (isTransitioning || isLocked) return;
        isTransitioning = true;
        isLocked = true;
        wrap.classList.add('is-locked');

        var unlockTimer = setTimeout(function () {
          isTransitioning = false;
          isLocked = false;
          wrap.classList.remove('is-locked');
        }, 1600);

        var idx = session ? session.getCurrentIndex() : 0;
        var scene = currentScenes[idx] || currentScenes[0];
        var mappedOptId = (QuizModule && QuizModule.mapExperimentOutcome) ?
                          QuizModule.mapExperimentOutcome(scene.id, targetItem.key) :
                          'opt_' + (idx + 1) + 'a';

        var stageBoxEl = wrap.querySelector('.exp-stage-box');
        if (stageBoxEl) stageBoxEl.classList.add('is-autotraveling');

        var soulStarEl = wrap.querySelector('.exp-soul-star');
        var reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // 统一撞击与评分写入处理
        function onImpact() {
          if (session) {
            if (typeof session.selectOutcome === 'function') {
              session.selectOutcome(scene.id, targetItem.key, targetItem.scoreVector);
            }
            session.selectOption(qId, mappedOptId);
          }

          var iType = (scene.interactionType || 'proximity').toLowerCase();
          var fxClass = 'fx-collision';
          if (iType === 'merge') fxClass = 'fx-merge';
          else if (iType === 'split') fxClass = 'fx-split';
          else if (iType === 'gravity') fxClass = 'fx-gravity';
          else if (iType === 'avoid' || iType === 'cross') fxClass = 'fx-avoid';
          else if (iType === 'rescue') fxClass = 'fx-rescue';
          else if (iType === 'orbit') fxClass = 'fx-orbit';
          else if (iType === 'proximity' || iType === 'approach') fxClass = 'is-absorbed';

          if (orbEl) {
            orbEl.classList.add('is-selected');
            orbEl.classList.add(fxClass);

            // 产生环形冲击波
            var shockwave = document.createElement('div');
            shockwave.className = 'exp-shockwave-ring';
            orbEl.appendChild(shockwave);
          }

          var allCards = choiceGrid.querySelectorAll('.exp-choice-card');
          for (var c = 0; c < allCards.length; c++) {
            allCards[c].classList.remove('is-selected');
          }

          setTimeout(function () {
            clearTimeout(unlockTimer);
            if (stageBoxEl) stageBoxEl.classList.remove('is-autotraveling');
            wrap.classList.remove('is-locked');
            isLocked = false;
            isTransitioning = false;
            if (idx < total - 1) {
              if (session) session.goNext(total);
              renderExperiment();
            } else {
              showCalculatingState();
            }
          }, reduced ? 180 : 360);
        }

        if (wasDragged || !soulStarEl || !orbEl) {
          // 拖拽已在目标处，直接触发反馈
          onImpact();
        } else {
          // 点击选项：启动 autoTravel 自动沿引力弧线飞行向目标星 (450~550ms)
          var orbRect = orbEl.getBoundingClientRect();
          var soulRect = soulStarEl.getBoundingClientRect();
          var dx = (orbRect.left + orbRect.width * 0.5) - (soulRect.left + soulRect.width * 0.5);
          var dy = (orbRect.top + orbRect.height * 0.5) - (soulRect.top + soulRect.height * 0.5);

          soulStarEl.classList.add('is-auto-traveling');
          soulStarEl.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';

          var travelDuration = reduced ? 160 : 480;
          setTimeout(function () {
            onImpact();
          }, travelDuration);
        }
      }

      function showCalculatingState() {
        while (wrap.firstChild) {
          wrap.removeChild(wrap.firstChild);
        }
        var calcBox = document.createElement('div');
        calcBox.className = 'quiz-calc-box exp-calc-box';

        var starFlow = document.createElement('div');
        starFlow.className = 'exp-calc-star-flow';
        starFlow.innerHTML = '<span class="calc-pulse-star">✦</span>';

        var calcTitle = document.createElement('div');
        calcTitle.className = 'quiz-calc-title';
        calcTitle.textContent = '正在汇聚七幕星轨能量，寻觅东坡那一站...';

        var calcSub = document.createElement('div');
        calcSub.className = 'quiz-calc-sub';
        calcSub.textContent = '莫听穿林打叶声，何妨吟啸且徐行';

        calcBox.appendChild(starFlow);
        calcBox.appendChild(calcTitle);
        calcBox.appendChild(calcSub);
        wrap.appendChild(calcBox);

        var result = null;
        if (session && typeof session.calculateExperimentResult === 'function') {
          result = session.calculateExperimentResult(Data.moods, (Data.quiz && Data.quiz.mood_station_matrix) || {});
        } else if (session && typeof session.calculateResult === 'function') {
          result = session.calculateResult(Data.quiz, Data.moods);
        }
        if (!result) {
          result = {
            station_id: 'station_huangzhou',
            mood_id: 'mood_anxious',
            result_id: 'res_mood_anxious_station_huangzhou'
          };
        }

        if (Store && typeof Store.saveLastResult === 'function') {
          Store.saveLastResult(result);
        }

        setTimeout(function () {
          Router.navigate('result', {
            station_id: result.station_id,
            mood_id: result.mood_id,
            result_id: result.result_id
          });
        }, 300);
      }

      prevBtn.addEventListener('click', function () {
        if (isTransitioning) return;
        if (session && session.canGoPrevious()) {
          session.goPrevious();
          renderExperiment();
        }
      });

      resetBtn.addEventListener('click', function () {
        if (isTransitioning) return;
        if (session) {
          session.reset(true);
          if (typeof session.getScenes === 'function') {
            currentScenes = session.getScenes();
            total = currentScenes.length;
          }
          renderExperiment();
        }
      });

      renderExperiment();
      return wrap;
    }
  });

  // 3. 结果页视图 Result (七层叙事小型体验、多源数据装配、边界降级)
  Router.register('result', {
    render: function (params) {
      params = params || {};

      // 异常与参数解析：优先入参 -> 其次本地存储 -> 最后安全兜底黄州
      var stationId = params.station_id || params.stationId;
      var moodId = params.mood_id || params.moodId;

      if (!stationId && Store && typeof Store.getLastResult === 'function') {
        var cached = Store.getLastResult();
        if (cached) {
          stationId = stationId || cached.station_id;
          moodId = moodId || cached.mood_id;
        }
      }

      stationId = stationId || 'station_huangzhou';
      var station = Data.getStationById(stationId) || Data.getStationById('station_huangzhou') || {
        name: '黄州｜重新生活',
        short_name: '黄州',
        place: '湖北黄冈',
        time_label: '1080—1084',
        theme: '重新生活',
        keywords: ['重启', '徐行', '烟火'],
        summary_fact: '元丰三年，苏轼因乌台诗案贬黄州团练副使，本州安置。躬耕东坡自号东坡居士，写下赤壁诸篇。',
        summary_story: '从九死一生的深渊来到江畔小城。没有俸禄就自己开荒种地，在清贫与孤寂中重新长出力量。',
        dongpo_view: '跌入低谷并不意味着人生的终结，有时候它只是把我们逼回最真实的生活本身。',
        today_action: '把一件今天解决不了的烦心事放下，换鞋出去散步十分钟。'
      };

      var moodObj = moodId ? Data.getMoodById(moodId) : null;

      // 任务 15.6.8.1 P0: 代表诗句首选当前站点明确收录的代表诗词，严禁跨站点调用
      var stationQuoteIds = (station && station.quote_ids) || [];
      var targetQuoteId = null;
      if (moodObj && moodObj.recommended_quote_id && stationQuoteIds.indexOf(moodObj.recommended_quote_id) !== -1) {
        targetQuoteId = moodObj.recommended_quote_id;
      } else if (stationQuoteIds.length > 0) {
        targetQuoteId = stationQuoteIds[0];
      } else if (station && station.work_ids && station.work_ids.length > 0) {
        for (var wIdx = 0; wIdx < station.work_ids.length; wIdx++) {
          var wid = station.work_ids[wIdx];
          var stWork = Data.getWorkById(wid);
          if (stWork && stWork.quote_ids && stWork.quote_ids.length > 0) {
            targetQuoteId = stWork.quote_ids[0];
            break;
          }
        }
      }
      if (!targetQuoteId) {
        targetQuoteId = stationQuoteIds[0] || 'quote_dingfengbo_01';
      }
      var quoteObj = Data.getQuoteById(targetQuoteId) || {
        text: '莫听穿林打叶声，何妨吟啸且徐行。',
        context_note: '沙湖道中遇雨'
      };
      var workObj = (quoteObj && quoteObj.work_id) ? Data.getWorkById(quoteObj.work_id) : null;
      if (!workObj) {
        workObj = {
          title: '定风波·莫听穿林打叶声',
          creation_context: '元丰五年三月，苏轼沙湖道中遇雨，同行狼狈，余独不觉。',
          why_related: '风雨徐行，是苏轼黄州时期从容应对生活骤雨的精神缩影。'
        };
      }

      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper result-narrative-container';
      wrap.setAttribute('data-station-id', station.id || 'station_huangzhou');

      // 顶部首屏轻量上一程 (统一返程星轨组件)
      var backRail = (UI && typeof UI.createCosmicBackRail === 'function') ?
                     UI.createCosmicBackRail('上一程', function () { Router.back(); }) :
                     UI.createBackPathButton('上一程', function () { Router.back(); });
      wrap.appendChild(backRail);

      // 任务 15.6.8: P0-A 测试结果页减法与图文彻底分层 (揭晓人生站点 + 第一视觉高潮，不承担长篇百科)
      // --- 阶段 1：全宽场景大图独立视觉区 (图片本身清晰展示，重叠率 0%) ---
      var resultSceneImg = (SuShi.ArtAssets && typeof SuShi.ArtAssets.getStationResultScene === 'function')
        ? SuShi.ArtAssets.getStationResultScene(station.id)
        : ((SuShi.ArtAssets && SuShi.ArtAssets.getStationScene(station.id)) || '');

      var heroCard = document.createElement('div');
      heroCard.className = 'ink-card ink-card-station result-hero-card result-hero-stage result-standalone-scene';

      if (resultSceneImg) {
        var coverBox = document.createElement('div');
        coverBox.className = 'result-scene-cover-box';
        var imgEl = document.createElement('img');
        imgEl.className = 'result-scene-cover-img';
        imgEl.src = resultSceneImg;
        imgEl.alt = station.name;
        coverBox.appendChild(imgEl);

        // 图片上仅保留极轻量短标识 (例如“苏轼人生 · 第6站”)
        var sceneBadge = document.createElement('div');
        sceneBadge.className = 'result-scene-tiny-badge';
        sceneBadge.textContent = '苏轼人生 · 第 ' + (station.order || 1) + ' 站';
        coverBox.appendChild(sceneBadge);

        heroCard.appendChild(coverBox);
      }
      wrap.appendChild(heroCard);

      // --- 阶段 2：独立正文信息区 (图文独立布局，Text Safe Zone 稳定底色，重叠率 0.0%) ---
      var infoCard = document.createElement('div');
      infoCard.className = 'result-info-stage result-content-wrap result-hero-content ink-card-narrative result-info-card';
      infoCard.setAttribute('data-text-safe-zone', 'true');

      var introLabel = document.createElement('div');
      introLabel.className = 'result-moment-badge result-intro-label';
      introLabel.textContent = '你的东坡站点';
      infoCard.appendChild(introLabel);

      var sName = document.createElement('h1');
      sName.className = 'result-station-name';
      sName.textContent = station.name;
      infoCard.appendChild(sName);

      var metaText = document.createElement('div');
      metaText.className = 'result-station-meta';
      metaText.textContent = (station.time_label || '') + ' · ' + (station.place || '');
      infoCard.appendChild(metaText);

      // 一句结果解释（1~2行），以 station.dongpo_view 为定义站点 profile 人生哲思的唯一主来源
      var explainText = document.createElement('div');
      explainText.className = 'result-hero-guide result-explanation-body';
      explainText.setAttribute('data-text-safe-zone', 'true');
      explainText.textContent = station.dongpo_view || (moodObj && moodObj.dongpo_suggestion) || '生活可以有风雨，但不必困在风雨里。';
      infoCard.appendChild(explainText);

      // 一句代表题记/名句
      if (quoteObj && quoteObj.text) {
        var quoteBox = document.createElement('div');
        quoteBox.className = 'result-quote-lead';
        quoteBox.setAttribute('data-text-safe-zone', 'true');
        quoteBox.textContent = '“' + quoteObj.text + '”';
        infoCard.appendChild(quoteBox);
      }

      wrap.appendChild(infoCard);

      // --- 阶段 3：操作区 (双主 CTA + 辅助导航) ---
      var actBox = document.createElement('div');
      actBox.className = 'result-actions result-dual-cta';

      // 主 CTA 1: 进入XX小宇宙
      var btnEnter = UI.createPrimaryButton('进入' + (station.short_name || '东坡') + '小宇宙', function () {
        Router.navigate('station', { station_id: stationId });
      }, 'result-btn-enter');
      actBox.appendChild(btnEnter);

      // 主 CTA 2: 生成我的东坡人生卡
      var btnShare = UI.createSecondaryButton('生成我的东坡人生卡', function () {
        Router.navigate('share-card', { station_id: stationId, mood_id: moodId, type: 'result' });
      }, 'result-btn-share');
      actBox.appendChild(btnShare);

      // 漫游人生星河
      var orbitLink = UI.createOrbitPathLink({
        title: '漫游苏轼人生星河',
        subtitle: '在星轨中纵览苏轼全部生命站点与历史时空 →',
        onClick: function () {
          Router.navigate('universe', { highlight_station_id: stationId });
        }
      });
      actBox.appendChild(orbitLink);

      // 重新测一次
      var btnRetest = UI.createSecondaryButton('重新测一次', function () {
        Router.navigate('quiz');
      }, 'result-btn-retest');
      actBox.appendChild(btnRetest);

      wrap.appendChild(actBox);

      return wrap;
    }
  });

  // 滚动记忆与视口节点观察者
  var lastUniverseScrollTop = 0;
  var activeUniverseObserver = null;

  // 4. 宇宙生命线视图 Universe (江河星图纵向生命线、九大站点漫游、高亮定位)
  Router.register('universe', {
    render: function (params) {
      params = params || {};
      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper universe-container';

      if (typeof IntersectionObserver !== 'undefined') {
        if (activeUniverseObserver) {
          try { activeUniverseObserver.disconnect(); } catch (e) {}
        }
        activeUniverseObserver = new IntersectionObserver(function (entries) {
          for (var k = 0; k < entries.length; k++) {
            var entry = entries[k];
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in-view');
            } else {
              entry.target.classList.remove('is-in-view');
            }
          }
        }, { threshold: 0.15 });
      }

      wrap.appendChild(UI.createSectionHeader('苏轼宇宙生命线', '九大人生站点漫游 · 从眉山出发，行过天涯，终归常州'));

      var stations = Data.stations || [];
      var highlightId = params.highlight_station_id;
      if (!highlightId && Store && typeof Store.getLastResult === 'function') {
        var lastRes = Store.getLastResult();
        if (lastRes && lastRes.station_id) {
          highlightId = lastRes.station_id;
        }
      }

      // 如果有测试命中的站点，展示顶部直达条
      var targetStationEl = null;
      if (highlightId) {
        var hlStation = Data.getStationById(highlightId);
        if (hlStation) {
          var myBar = document.createElement('div');
          myBar.className = 'universe-my-station-bar';
          myBar.setAttribute('role', 'button');
          myBar.setAttribute('tabindex', '0');

          var infoLeft = document.createElement('div');
          infoLeft.className = 'my-station-info';
          var tag = document.createElement('span');
          tag.className = 'my-station-tag';
          tag.textContent = '你的站点';
          var txt = document.createElement('span');
          txt.className = 'my-station-text';
          txt.textContent = hlStation.name;
          infoLeft.appendChild(tag);
          infoLeft.appendChild(txt);

          var btnRight = document.createElement('span');
          btnRight.className = 'my-station-btn';
          btnRight.textContent = '点击定位 ↓';

          myBar.appendChild(infoLeft);
          myBar.appendChild(btnRight);

          myBar.addEventListener('click', function () {
            if (targetStationEl) {
              targetStationEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          });
          wrap.appendChild(myBar);
        }
      }

      // --- 新视觉架构：东坡人生星河漫游大地图 (Universe Cosmos Map) ---
      var cosmosMap = document.createElement('div');
      cosmosMap.className = 'universe-cosmos-map';

      // 蜿蜒星河路径底图与光辉
      var riverPathBox = document.createElement('div');
      riverPathBox.className = 'universe-river-path-box';
      var riverPathImg = document.createElement('img');
      riverPathImg.className = 'universe-river-path-img';
      riverPathImg.src = (SuShi.ArtAssets && SuShi.ArtAssets.cosmos.path) || './assets/images/cosmos/universe-path-glow.webp';
      riverPathImg.alt = '';
      riverPathBox.appendChild(riverPathImg);
      cosmosMap.appendChild(riverPathBox);

      // 9 大人生星球节点群
      var planetCluster = document.createElement('div');
      planetCluster.className = 'universe-planet-cluster';

      var nodePosClasses = [
        'pos-left-1',
        'pos-right-1',
        'pos-left-2',
        'pos-center-storm',
        'pos-center-dawn',
        'pos-left-3',
        'pos-right-2',
        'pos-left-4',
        'pos-center-end'
      ];

      // 轻量浮层抽屉 (Quick Sheet: 独立挂载于 document.body 确保任何滚动位置 100% 居当前视口滑入)
      var sheetMask = document.getElementById('universe-sheet-mask');
      if (!sheetMask) {
        sheetMask = document.createElement('div');
        sheetMask.id = 'universe-sheet-mask';
        sheetMask.className = 'universe-sheet-mask';
        document.body.appendChild(sheetMask);
      }
      var sheetBox = document.getElementById('universe-quick-sheet');
      if (!sheetBox) {
        sheetBox = document.createElement('div');
        sheetBox.id = 'universe-quick-sheet';
        sheetBox.className = 'universe-quick-sheet';
        document.body.appendChild(sheetBox);
      }

      function closeQuickSheet() {
        sheetMask.classList.remove('is-open');
        sheetBox.classList.remove('is-open');
      }

      function openQuickSheet(stItem, sIdx) {
        sheetBox.innerHTML = '';

        // 1. 顶部节点代表大图宇宙舞台 (Node Cosmos Stage: 真实融入 station-*.webp)
        var stageEl = document.createElement('div');
        stageEl.className = 'universe-node-stage';

        var sSceneImg = (SuShi.ArtAssets && SuShi.ArtAssets.getStationScene(stItem.id)) ||
                        stItem.scene_image ||
                        './assets/images/scenes/station-huangzhou.webp';

        var bgImg = document.createElement('img');
        bgImg.className = 'universe-node-stage-img universe-node-scene-img';
        bgImg.src = sSceneImg;
        bgImg.alt = stItem.name;
        stageEl.appendChild(bgImg);

        var stageMask = document.createElement('div');
        stageMask.className = 'universe-node-stage-mask';
        stageEl.appendChild(stageMask);

        var stageMeta = document.createElement('div');
        stageMeta.className = 'universe-node-stage-meta universe-node-theme-overlay';

        var stageBadge = document.createElement('span');
        stageBadge.className = 'universe-stage-badge';
        stageBadge.textContent = '第 ' + (sIdx + 1) + ' 站 · ' + (stItem.time_label || '') + (stItem.place ? (' · ' + stItem.place) : '');

        var stageTitle = document.createElement('h3');
        stageTitle.className = 'universe-stage-title';
        stageTitle.textContent = stItem.name;

        stageMeta.appendChild(stageBadge);
        stageMeta.appendChild(stageTitle);

        if (stItem.keywords && stItem.keywords.length > 0) {
          var kwWrap = document.createElement('div');
          kwWrap.className = 'universe-stage-keywords';
          for (var k = 0; k < Math.min(stItem.keywords.length, 3); k++) {
            var pill = document.createElement('span');
            pill.className = 'universe-stage-pill';
            pill.textContent = stItem.keywords[k];
            kwWrap.appendChild(pill);
          }
          stageMeta.appendChild(kwWrap);
        }

        if (stItem.theme) {
          var themeEl = document.createElement('div');
          themeEl.className = 'universe-stage-theme';
          themeEl.textContent = '“' + stItem.theme + '”';
          stageMeta.appendChild(themeEl);
        }

        stageEl.appendChild(stageMeta);
        sheetBox.appendChild(stageEl);

        var closeBtn = document.createElement('button');
        closeBtn.className = 'universe-sheet-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', '关闭');
        closeBtn.addEventListener('click', closeQuickSheet);
        sheetBox.appendChild(closeBtn);

        var sheetContent = document.createElement('div');
        sheetContent.className = 'universe-sheet-body';

        var storyP = document.createElement('p');
        storyP.className = 'universe-sheet-story';
        storyP.textContent = stItem.summary_story || stItem.summary_fact;
        sheetContent.appendChild(storyP);

        var quoteId = (stItem.quote_ids && stItem.quote_ids[0]) || '';
        if (quoteId) {
          var qObj = Data.getQuoteById(quoteId);
          if (qObj && qObj.text) {
            var qBlock = document.createElement('div');
            qBlock.className = 'universe-sheet-quote';
            qBlock.textContent = '“' + qObj.text + '”';
            sheetContent.appendChild(qBlock);
          }
        }

        var enterBtn = document.createElement('button');
        enterBtn.className = 'universe-sheet-btn';
        enterBtn.type = 'button';
        enterBtn.textContent = '✦ 漫游本站星门 →';
        enterBtn.addEventListener('click', function () {
          closeQuickSheet();
          var c = document.getElementById('view-container');
          if (c) lastUniverseScrollTop = c.scrollTop;
          Router.navigate('station', { station_id: stItem.id });
        });
        sheetContent.appendChild(enterBtn);
        sheetBox.appendChild(sheetContent);

        sheetMask.classList.add('is-open');
        sheetBox.classList.add('is-open');
      }

      sheetMask.addEventListener('click', closeQuickSheet);

      var rhythmMap = {
        'station_meishan': 'rhythm-meishan',
        'station_jingshi': 'rhythm-jingshi',
        'station_mizhou': 'rhythm-mizhou',
        'station_wutai': 'rhythm-wutai',
        'station_huangzhou': 'rhythm-huangzhou',
        'station_hangzhou': 'rhythm-hangzhou',
        'station_huizhou': 'rhythm-huizhou',
        'station_danzhou': 'rhythm-danzhou',
        'station_changzhou': 'rhythm-changzhou'
      };

      for (var p = 0; p < stations.length; p++) {
        (function (stItem, sIndex) {
          var pNode = document.createElement('div');
          pNode.className = 'universe-planet-node ' + (nodePosClasses[sIndex] || '') + ' ' + (rhythmMap[stItem.id] || '');
          pNode.setAttribute('data-station-id', stItem.id);
          pNode.setAttribute('role', 'button');
          pNode.setAttribute('tabindex', '0');

          if (highlightId && stItem.id === highlightId) {
            pNode.classList.add('is-highlighted');
            targetStationEl = pNode;
          }

          // 星球球体 (圆窗裁切 + 场景图)
          var sphereBody = document.createElement('div');
          sphereBody.className = 'planet-sphere-body';

          var sSceneImg = (SuShi.ArtAssets && SuShi.ArtAssets.getStationScene(stItem.id)) || '';
          if (sSceneImg) {
            var pImg = document.createElement('img');
            pImg.className = 'universe-station-thumb planet-scene-img';
            pImg.src = sSceneImg;
            pImg.alt = stItem.name;
            sphereBody.appendChild(pImg);
          }

          // 外圈辉光环
          var haloRing = document.createElement('img');
          haloRing.className = 'planet-halo-ring';
          haloRing.src = (stItem.id === 'station_huangzhou' || (highlightId && stItem.id === highlightId)) ?
                         ((SuShi.ArtAssets && SuShi.ArtAssets.cosmos.orbit) || './assets/images/cosmos/orbit-ring-glow.webp') :
                         ((SuShi.ArtAssets && SuShi.ArtAssets.cosmos.nodeGlow) || './assets/images/cosmos/star-node-glow.webp');
          haloRing.alt = '';
          sphereBody.appendChild(haloRing);

          // 序号印章
          var orderBadge = document.createElement('span');
          orderBadge.className = 'planet-order-tag';
          orderBadge.textContent = String(sIndex + 1);
          sphereBody.appendChild(orderBadge);

          pNode.appendChild(sphereBody);

          // 星球文字说明标签
          var captionBox = document.createElement('div');
          captionBox.className = 'planet-caption-box';
          var nameEl = document.createElement('div');
          nameEl.className = 'planet-caption-name';
          nameEl.textContent = stItem.name;
          var timeEl = document.createElement('div');
          timeEl.className = 'planet-caption-time';
          timeEl.textContent = (stItem.time_label || '') + ' · ' + (stItem.place || '');
          captionBox.appendChild(nameEl);
          captionBox.appendChild(timeEl);

          if (highlightId && stItem.id === highlightId) {
            var currTag = document.createElement('span');
            currTag.className = 'planet-current-tag';
            currTag.textContent = '你在此站';
            captionBox.appendChild(currTag);
          }

          pNode.appendChild(captionBox);

          // 点击星球弹出轻量快速预览抽屉 (去卡片化交互)
          pNode.addEventListener('click', function () {
            openQuickSheet(stItem, sIndex);
          });

          planetCluster.appendChild(pNode);

          if (activeUniverseObserver) {
            try { activeUniverseObserver.observe(pNode); } catch (e) {}
          }
        })(stations[p], p);
      }

      cosmosMap.appendChild(planetCluster);
      wrap.appendChild(cosmosMap);

      // 江河生命线（兼容备份层，保持测试断言与无障碍结构完整）
      var timelineBackup = document.createElement('div');
      timelineBackup.className = 'universe-timeline-backup';
      timelineBackup.style.display = 'none';

      var riverTimeline = document.createElement('div');
      riverTimeline.className = 'universe-river-timeline';

      for (var i = 0; i < stations.length; i++) {
        (function (st, index) {
          var item = document.createElement('div');
          item.className = 'universe-node-item ' + (rhythmMap[st.id] || '');

          var badge = document.createElement('div');
          badge.className = 'universe-node-badge';
          badge.textContent = String(index + 1);
          item.appendChild(badge);

          var cardContent = document.createElement('div');
          cardContent.className = 'universe-node-card-body';

          var sceneImg = (SuShi.ArtAssets && SuShi.ArtAssets.getStationScene(st.id)) || '';
          if (sceneImg) {
            var thumb = document.createElement('img');
            thumb.className = 'universe-station-thumb';
            thumb.src = sceneImg;
            thumb.alt = st.name;
            cardContent.appendChild(thumb);
          }

          var textCol = document.createElement('div');
          textCol.className = 'universe-node-content-col';

          var headerRow = document.createElement('div');
          headerRow.className = 'universe-card-header';
          var title = document.createElement('div');
          title.className = 'universe-card-title';
          title.textContent = st.name;
          headerRow.appendChild(title);

          textCol.appendChild(headerRow);
          cardContent.appendChild(textCol);

          var card = UI.createInkCard(cardContent, true, function () {
            Router.navigate('station', { station_id: st.id });
          });
          card.classList.add('universe-node-card', 'ink-card-station');
          item.appendChild(card);
          riverTimeline.appendChild(item);
          if (activeUniverseObserver) {
            try { activeUniverseObserver.observe(item); } catch (e) {}
          }
        })(stations[i], i);
      }

      timelineBackup.appendChild(riverTimeline);
      wrap.appendChild(timelineBackup);

      setTimeout(function () {
        var container = document.getElementById('view-container');
        if (!container) return;
        if (params.open_station_id) {
          var openSt = Data.getStationById(params.open_station_id);
          if (openSt) openQuickSheet(openSt);
        } else if (params.highlight_station_id && targetStationEl) {
          targetStationEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (lastUniverseScrollTop > 0) {
          container.scrollTop = lastUniverseScrollTop;
        }
      }, 50);

      return wrap;
    },
    destroy: function () {
      if (activeUniverseObserver) {
        try {
          activeUniverseObserver.disconnect();
        } catch (e) {}
        activeUniverseObserver = null;
      }
      var mask = document.getElementById('universe-sheet-mask');
      if (mask && mask.parentNode) mask.parentNode.removeChild(mask);
      var box = document.getElementById('universe-quick-sheet');
      if (box && box.parentNode) box.parentNode.removeChild(box);
    }
  });

  // 5. 站点详情视图 Station (多维史料、故事、代表作、启发与小行动)
  Router.register('station', {
    render: function (params) {
      params = params || {};
      var station = params.station_id ? Data.getStationById(params.station_id) : (Data.stations ? Data.stations[0] : null);

      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper station-detail-container';

      // 顶部首屏轻量上一程 (统一返程星轨组件)
      var backRail = (UI && typeof UI.createCosmicBackRail === 'function') ?
                     UI.createCosmicBackRail('上一程', function () { Router.back(); }) :
                     UI.createBackPathButton('上一程', function () { Router.back(); });
      wrap.appendChild(backRail);

      if (!station) {
        wrap.appendChild(UI.createEmptyState('这一页暂时被江雾遮住了', '未找到该站点记录，不妨回到宇宙生命线重新探索。', '返回生命线', function () {
          Router.navigate('universe');
        }));
        return wrap;
      }

      // Scene 0｜站点Hero (大幅原生场景图 + 独立信息区双段式垂直重排，图文彻底分层)
      var heroScene = document.createElement('div');
      heroScene.className = 'station-scene-hero station-hero-card scene-0-hero';

      var sceneImg = (SuShi.ArtAssets && SuShi.ArtAssets.getStationScene(station.id)) || '';
      if (sceneImg) {
        var coverBox = document.createElement('div');
        coverBox.className = 'station-hero-cover-box';
        var imgEl = document.createElement('img');
        imgEl.className = 'station-hero-cover-img';
        imgEl.src = sceneImg;
        imgEl.alt = station.name;
        coverBox.appendChild(imgEl);
        var coverMask = document.createElement('div');
        coverMask.className = 'station-hero-cover-mask';
        coverBox.appendChild(coverMask);
        heroScene.appendChild(coverBox);
      }

      var safeZone = station.text_safe_zone || { x: 20, y: 38, width: 350, height: 160, tone: 'dark' };
      var isDarkTone = safeZone.tone === 'dark';

      var headerContent = document.createElement('div');
      headerContent.className = 'result-hero-content station-safe-zone-content station-hero-info ' + (isDarkTone ? 'tone-dark-bg' : 'tone-light-bg');
      headerContent.setAttribute('data-text-safe-zone', 'true');

      var badge = document.createElement('div');
      badge.className = 'result-moment-badge';
      badge.textContent = '苏轼人生 · 第 ' + (station.order || 1) + ' 站';
      headerContent.appendChild(badge);

      var title = document.createElement('h1');
      title.className = 'result-station-name';
      title.textContent = station.name;
      headerContent.appendChild(title);

      var meta = document.createElement('div');
      meta.className = 'result-station-meta';
      meta.textContent = (station.time_label || '') + ' · ' + (station.place || '') + ' (' + (station.age_label || '') + ')';
      headerContent.appendChild(meta);

      if (station.keywords && station.keywords.length > 0) {
        headerContent.appendChild(UI.createTagGroup(station.keywords));
      }

      var themeText = document.createElement('div');
      themeText.className = 'result-hero-guide';
      themeText.textContent = '“' + (station.theme || '') + '”';
      headerContent.appendChild(themeText);

      heroScene.appendChild(headerContent);
      wrap.appendChild(heroScene);

      // --- Scene 1 ~ 5：沉浸式连续人生长卷 (Continuous Epic Scroll) ---
      var scrollContainer = document.createElement('div');
      scrollContainer.className = 'station-epic-scroll station-lens-' + (station.id || 'general');

      // Scene 1｜历史现场 (纵向时间轨迹轴推进，无整块大底卡，文字沿轨迹分段2~4行呈现)
      var chap1 = document.createElement('div');
      chap1.className = 'station-scroll-section station-chapter-box station-chapter-1 station-section-history station-chapter-timeline scene-1-history';
      chap1.setAttribute('data-text-safe-zone', 'true');
      var fBadge = document.createElement('div');
      fBadge.className = 'station-chapter-badge';
      fBadge.textContent = '✦ 时空现场 · 东坡因何至此';
      var fTitle = document.createElement('h3');
      fTitle.className = 'station-chapter-title';
      fTitle.textContent = (station.place || '') + ' · 当时发生了什么';
      
      var fTrack = document.createElement('div');
      fTrack.className = 'history-slice-track';

      // 智能分段呈现历史切片，每段不超过2~4行
      var factRaw = String(station.summary_fact || '');
      var factSentences = factRaw.split('。').filter(function (s) { return s.trim().length > 0; });
      var factChunks = [];
      var curChunk = '';
      for (var fc = 0; fc < factSentences.length; fc++) {
        curChunk += factSentences[fc] + '。';
        if (curChunk.length >= 45 || fc === factSentences.length - 1) {
          factChunks.push(curChunk);
          curChunk = '';
        }
      }
      if (factChunks.length === 0) factChunks.push(factRaw);

      for (var fci = 0; fci < factChunks.length; fci++) {
        var fNode = document.createElement('div');
        fNode.className = 'history-slice-node history-passage-item';
        if (fci === 0) {
          var fTime = document.createElement('span');
          fTime.className = 'history-slice-time';
          fTime.textContent = (station.time_label || '') + ' · ' + (station.place || '');
          fNode.appendChild(fTime);
        }
        var fBody = document.createElement('p');
        fBody.className = 'station-chapter-body history-slice-body';
        fBody.setAttribute('data-text-safe-zone', 'true');
        fBody.textContent = factChunks[fci];
        fNode.appendChild(fBody);
        fTrack.appendChild(fNode);
      }

      chap1.appendChild(fBadge);
      chap1.appendChild(fTitle);
      chap1.appendChild(fTrack);
      scrollContainer.appendChild(chap1);

      // Scene 2｜代表名句大场景 (全宽意境大图直接展示，名句自然融入留白暗部，不整图压暗)
      var quoteId = (station.quote_ids && station.quote_ids[0]) || '';
      var primeQuoteObj = quoteId ? Data.getQuoteById(quoteId) : null;
      var primeWorkObj = (primeQuoteObj && primeQuoteObj.work_id) ? Data.getWorkById(primeQuoteObj.work_id) : null;
      // 任务 15.6.8: 采用独立 Quote 场景素材；无独立素材则不强制塞入重复 Hero 图
      var quoteSceneImg = (SuShi.ArtAssets && typeof SuShi.ArtAssets.getStationQuoteScene === 'function')
        ? SuShi.ArtAssets.getStationQuoteScene(station.id) : null;

      var chapVerse = document.createElement('div');
      chapVerse.className = 'station-scroll-section station-section-verse-scene scene-2-quote';
      var vBadge = document.createElement('div');
      vBadge.className = 'station-chapter-badge';
      vBadge.textContent = '✦ 绝唱名句 · 意境长卷';
      chapVerse.appendChild(vBadge);

      var verseStage = document.createElement('div');
      verseStage.className = 'station-verse-scene-stage';
      if (quoteSceneImg && quoteSceneImg !== sceneImg) {
        var vImg = document.createElement('img');
        vImg.className = 'station-verse-scene-img';
        vImg.src = quoteSceneImg;
        vImg.alt = station.name + ' · 意境场景';
        verseStage.appendChild(vImg);
        var vOverlay = document.createElement('div');
        vOverlay.className = 'station-verse-scene-overlay';
        verseStage.appendChild(vOverlay);
      }
      var verseContent = document.createElement('div');
      verseContent.className = 'station-verse-scene-content station-safe-zone-content ' + (isDarkTone ? 'tone-dark-bg' : 'tone-light-bg');
      verseContent.setAttribute('data-text-safe-zone', 'true');
      var qText = primeQuoteObj ? primeQuoteObj.text : (station.theme || '人生到处知何似，应似飞鸿踏雪泥。');
      var vQuote = document.createElement('blockquote');
      vQuote.className = 'station-verse-quote-text';
      vQuote.textContent = '“' + qText + '”';
      var vSource = document.createElement('div');
      vSource.className = 'station-verse-source';
      vSource.textContent = primeWorkObj ? ('—— 《' + primeWorkObj.title + '》') : ('—— ' + station.name);
      verseContent.appendChild(vQuote);
      verseContent.appendChild(vSource);
      verseStage.appendChild(verseContent);
      chapVerse.appendChild(verseStage);
      scrollContainer.appendChild(chapVerse);

      // Scene 3｜生活实录 (星轨脚步脉络，碎片式生活节点)
      var chap2 = document.createElement('div');
      chap2.className = 'station-scroll-section station-chapter-box station-chapter-2 station-section-life station-chapter-orbit scene-3-life';
      chap2.setAttribute('data-text-safe-zone', 'true');
      var sBadge = document.createElement('div');
      sBadge.className = 'station-chapter-badge';
      sBadge.textContent = '✦ 生活实录 · 日常践行与生命重构';
      var sTitle = document.createElement('h3');
      sTitle.className = 'station-chapter-title';
      sTitle.textContent = '日常践行与生命重构';

      // 任务 15.6.8: 若拥有独立生活实录素材（京师/黄州/杭州），优雅展现生活现场大图
      var lifeSceneImg = (SuShi.ArtAssets && typeof SuShi.ArtAssets.getStationLifeScene === 'function')
        ? SuShi.ArtAssets.getStationLifeScene(station.id) : null;
      if (lifeSceneImg && lifeSceneImg !== sceneImg && lifeSceneImg !== quoteSceneImg) {
        var lifeCoverBox = document.createElement('div');
        lifeCoverBox.className = 'station-life-scene-box';
        var lImg = document.createElement('img');
        lImg.className = 'station-life-scene-img';
        lImg.src = lifeSceneImg;
        lImg.alt = station.name + ' · 生活实录场景';
        lifeCoverBox.appendChild(lImg);
        var lOverlay = document.createElement('div');
        lOverlay.className = 'station-life-scene-overlay';
        lifeCoverBox.appendChild(lOverlay);
        chap2.appendChild(lifeCoverBox);
      }
      
      var sStream = document.createElement('div');
      sStream.className = 'life-orbit-stream';

      var storyRaw = String(station.summary_story || '');
      var storySentences = storyRaw.split('。').filter(function (s) { return s.trim().length > 0; });
      var storyChunks = [];
      var curSChunk = '';
      for (var sc = 0; sc < storySentences.length; sc++) {
        curSChunk += storySentences[sc] + '。';
        if (curSChunk.length >= 45 || sc === storySentences.length - 1) {
          storyChunks.push(curSChunk);
          curSChunk = '';
        }
      }
      if (storyChunks.length === 0) storyChunks.push(storyRaw);

      for (var sci = 0; sci < storyChunks.length; sci++) {
        var sBody = document.createElement('p');
        sBody.className = 'station-chapter-body life-orbit-body';
        sBody.setAttribute('data-text-safe-zone', 'true');
        sBody.textContent = storyChunks[sci];
        sStream.appendChild(sBody);
      }

      chap2.appendChild(sBadge);
      chap2.appendChild(sTitle);
      chap2.appendChild(sStream);
      scrollContainer.appendChild(chap2);

      // Scene 4｜诗词星群 (去框化星空，精神星核与空间拓扑群星，支持3D星群联动)
      var chap3 = document.createElement('div');
      chap3.className = 'station-scroll-section station-chapter-box station-chapter-3 station-section-constellation station-chapter-constellation scene-4-constellation';
      var wBadge = document.createElement('div');
      wBadge.className = 'station-chapter-badge';
      wBadge.textContent = '✦ 精神星宿 · 诗词宇宙引力场';
      chap3.appendChild(wBadge);

      var constellationBox = document.createElement('div');
      constellationBox.className = 'station-star-cluster constellation-cosmos-box';

      // 获取本站所有收录作品 (包含精神星核作品与环绕群星)
      var stationWorkIds = station.work_ids || [];
      var allStationWorks = [];
      for (var wIdx = 0; wIdx < stationWorkIds.length; wIdx++) {
        var sWork = Data.getWorkById(stationWorkIds[wIdx]);
        if (sWork) allStationWorks.push(sWork);
      }
      if (primeWorkObj && allStationWorks.indexOf(primeWorkObj) === -1) {
        allStationWorks.unshift(primeWorkObj);
      }

      // 精神星核与诗词星宿空间拓扑 (constellation-core-star is-main-star)
      var satellitesWrap = document.createElement('div');
      satellitesWrap.className = 'constellation-satellites-orbit';

      if (UI && typeof UI.createConstellationGroup === 'function') {
        var clusterGroup = UI.createConstellationGroup(allStationWorks, function (swork) {
          Router.navigate('work', { work_id: swork.id, from_station_id: station.id });
        }, primeWorkObj, station.theme);
        satellitesWrap.appendChild(clusterGroup);
      }
      constellationBox.appendChild(satellitesWrap);
      chap3.appendChild(constellationBox);
      scrollContainer.appendChild(chap3);

      // Scene 5｜现代共鸣与今日小事 (宣纸便签轻质感，低干扰收束)
      var chap4 = document.createElement('div');
      chap4.className = 'station-scroll-section station-chapter-box station-chapter-4 station-section-modern station-chapter-parchment scene-5-resonance';
      chap4.setAttribute('data-text-safe-zone', 'true');
      var mBadge = document.createElement('div');
      mBadge.className = 'station-chapter-badge';
      mBadge.textContent = '✦ 现代共鸣 · 东坡式理解与今日微步';
      var mTitle = document.createElement('h3');
      mTitle.className = 'station-chapter-title';
      mTitle.textContent = '东坡式理解与微小行动';
      var mBody = document.createElement('p');
      mBody.className = 'station-chapter-body parchment-body';
      mBody.setAttribute('data-text-safe-zone', 'true');
      mBody.textContent = station.dongpo_view || '生活可以有风雨，但不必困在风雨里。';
      chap4.appendChild(mBadge);
      chap4.appendChild(mTitle);
      chap4.appendChild(mBody);

      if (station.today_action) {
        var actP = document.createElement('div');
        actP.className = 'station-chapter-action parchment-action';
        actP.setAttribute('data-text-safe-zone', 'true');
        actP.innerHTML = '<strong>今日小事：</strong>' + station.today_action;
        chap4.appendChild(actP);
      }

      scrollContainer.appendChild(chap4);
      wrap.appendChild(scrollContainer);

      // Scene 6｜底部宇宙跨页导航与卡片生成操作区 (弱化大电商感，升华为凝结人生卡)
      var actBox = document.createElement('div');
      actBox.className = 'result-actions station-actions-refined scene-6-action';

      var btnShareNode = UI.createPrimaryButton('✦ 凝成一张' + (station.name || '东坡') + '人生卡', function () {
        Router.navigate('share-card', { type: 'station', station_id: station.id });
      }, 'station-condense-cta');
      actBox.appendChild(btnShareNode);

      var orbitLink = UI.createOrbitPathLink({
        title: '漫游苏轼人生星河',
        subtitle: '在星轨中继续探索苏轼其他人生微行星 →',
        onClick: function () {
          Router.navigate('universe', { highlight_station_id: station.id });
        }
      });
      actBox.appendChild(orbitLink);

      var btnQuiz = UI.createSecondaryButton('测测我的人生正在哪一站', function () {
        Router.navigate('quiz');
      });
      actBox.appendChild(btnQuiz);

      wrap.appendChild(actBox);

      return wrap;
    }
  });

  // 6. 作品阅读视图 Work（诗词与人生节点沉浸体验）
  Router.register('work', {
    render: function (params) {
      params = params || {};
      var workId = params.work_id;
      var fromStationId = params.from_station_id;

      // 智能寻找目标作品或默认降级
      var work = null;
      if (workId) {
        work = Data.getWorkById(workId);
      } else if (fromStationId) {
        var fromSt = Data.getStationById(fromStationId);
        if (fromSt && fromSt.work_ids && fromSt.work_ids.length > 0) {
          work = Data.getWorkById(fromSt.work_ids[0]);
        }
      }

      if (!work) {
        work = Data.getWorkById('work_dingfengbo_moting') || (Data.works ? Data.works[0] : null);
      }

      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper work-detail-container';

      // 顶部首屏轻量上一程 (统一返程星轨组件)
      var backRail = (UI && typeof UI.createCosmicBackRail === 'function') ?
                     UI.createCosmicBackRail('上一程', function () { Router.back(); }) :
                     UI.createBackPathButton('上一程', function () { Router.back(); });
      wrap.appendChild(backRail);

      if (!work) {
        wrap.appendChild(UI.createEmptyState('这一页暂时被江雾遮住了', '未检索到该作品文本，请返回宇宙生命线。', '返回生命线', function () {
          Router.navigate('universe');
        }));
        return wrap;
      }

      // 关联站点信息
      var primaryStationId = (work.station_ids && work.station_ids[0]) || fromStationId || '';
      var stationObj = primaryStationId ? Data.getStationById(primaryStationId) : null;

      // --- 4.1 作品头部卡片 ---
      var headerHero = document.createElement('div');
      headerHero.className = 'work-header-hero';

      var poemSceneImg = (SuShi.ArtAssets && SuShi.ArtAssets.getPoemScene(work.id)) ||
                         (stationObj && SuShi.ArtAssets && SuShi.ArtAssets.getStationScene(stationObj.id)) || '';
      if (poemSceneImg) {
        var coverBox = document.createElement('div');
        coverBox.className = 'work-scene-cover-box';
        var imgEl = document.createElement('img');
        imgEl.className = 'work-scene-cover-img';
        imgEl.src = poemSceneImg;
        imgEl.alt = work.title;
        var maskEl = document.createElement('div');
        maskEl.className = 'work-scene-cover-mask';
        coverBox.appendChild(imgEl);
        coverBox.appendChild(maskEl);
        headerHero.appendChild(coverBox);
      }

      var titleRow = document.createElement('div');
      titleRow.className = 'work-title-row';

      var titleEl = document.createElement('h2');
      titleEl.className = 'work-title';
      titleEl.textContent = '《' + work.title + '》';

      var genreEl = document.createElement('span');
      genreEl.className = 'work-genre-tag';
      genreEl.textContent = work.genre || '名作';

      titleRow.appendChild(titleEl);
      titleRow.appendChild(genreEl);
      headerHero.appendChild(titleRow);

      // 元数据芯片：时间、地点
      var metaChips = document.createElement('div');
      metaChips.className = 'work-meta-chips';

      if (work.time_label) {
        var timeChip = document.createElement('span');
        timeChip.className = 'work-meta-chip';
        timeChip.textContent = '创作时间：' + work.time_label;
        metaChips.appendChild(timeChip);
      }

      if (work.place_label) {
        var placeChip = document.createElement('span');
        placeChip.className = 'work-meta-chip';
        placeChip.textContent = '地点：' + work.place_label;
        metaChips.appendChild(placeChip);
      }

      headerHero.appendChild(metaChips);

      // 所属站点升级为东方诗词宇宙小星球 Portal
      if (stationObj) {
        var stScene = (SuShi.ArtAssets && SuShi.ArtAssets.getStationScene(stationObj.id)) || '';
        var planetPortal = UI.createPlanetPortal({
          image: stScene,
          tag: '所属人生站点',
          title: stationObj.name,
          subtitle: work.spatial_note ? ('本篇作于：' + work.spatial_note) : '点击回溯本站历史现场与诗文星群',
          onClick: function () {
            Router.navigate('station', { station_id: stationObj.id });
          }
        });
        headerHero.appendChild(planetPortal);
      }

      if (work.lead_guide) {
        var guideEl = document.createElement('div');
        guideEl.className = 'work-lead-guide';
        guideEl.textContent = work.lead_guide;
        headerHero.appendChild(guideEl);
      }

      wrap.appendChild(headerHero);

      // --- 4.2 代表名句（宣纸/诗签质感卡片，顶置呈现核心诗词震撼力）---
      if (work.lead_quote) {
        var quoteBox = document.createElement('div');
        quoteBox.className = 'work-quote-feature ink-card-poem result-quote-paper-slip work-quote-slip';
        var sealEl = document.createElement('div');
        sealEl.className = 'work-quote-seal result-quote-seal';
        sealEl.textContent = '东坡\n手泽';
        quoteBox.appendChild(sealEl);

        var qMark1 = document.createElement('div');
        qMark1.className = 'work-quote-mark';
        qMark1.textContent = '“';
        var qText = document.createElement('div');
        qText.className = 'work-quote-text';
        qText.textContent = work.lead_quote;
        var qMark2 = document.createElement('div');
        qMark2.className = 'work-quote-mark';
        qMark2.textContent = '”';

        quoteBox.appendChild(qMark1);
        quoteBox.appendChild(qText);
        quoteBox.appendChild(qMark2);
        wrap.appendChild(quoteBox);
      }

      // --- 4.3 第一幕：人生背景（苏轼当时在哪里、经历什么）---
      if (work.life_background || work.creation_context) {
        var bgCard = document.createElement('div');
        bgCard.className = 'work-narrative-card ink-card-narrative';
        var bgBadge = document.createElement('div');
        bgBadge.className = 'work-narrative-badge';
        bgBadge.textContent = '第一幕 · 真实人生境遇';
        var bgTitle = document.createElement('h3');
        bgTitle.className = 'work-narrative-title';
        bgTitle.textContent = '苏轼当时经历着什么？';
        var bgBody = document.createElement('p');
        bgBody.className = 'work-narrative-body';
        bgBody.textContent = work.life_background || work.creation_context;

        bgCard.appendChild(bgBadge);
        bgCard.appendChild(bgTitle);
        bgCard.appendChild(bgBody);
        wrap.appendChild(bgCard);
      }

      // 原文全貌与折叠交互
      if (work.original_text) {
        var fulltextSection = document.createElement('div');
        fulltextSection.className = 'work-fulltext-section';

        var ftHead = document.createElement('div');
        ftHead.className = 'work-fulltext-head';
        var ftTitle = document.createElement('span');
        ftTitle.className = 'work-fulltext-title';
        ftTitle.textContent = '诗词原文（审定文本）';
        var ftGenre = document.createElement('span');
        ftGenre.className = 'work-meta-chip';
        ftGenre.textContent = work.genre || '原文';
        ftHead.appendChild(ftTitle);
        ftHead.appendChild(ftGenre);
        fulltextSection.appendChild(ftHead);

        var ftContent = document.createElement('div');
        ftContent.className = 'work-fulltext-content is-collapsed';
        ftContent.textContent = work.original_text;

        var ftMask = document.createElement('div');
        ftMask.className = 'work-fulltext-mask';

        var toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'work-toggle-btn';
        toggleBtn.textContent = '展开完整诗词 ↓';

        var isExpanded = false;
        toggleBtn.addEventListener('click', function () {
          isExpanded = !isExpanded;
          if (isExpanded) {
            ftContent.classList.remove('is-collapsed');
            toggleBtn.textContent = '收起全文 ↑';
          } else {
            ftContent.classList.add('is-collapsed');
            toggleBtn.textContent = '展开完整诗词 ↓';
          }
        });

        fulltextSection.appendChild(ftContent);
        fulltextSection.appendChild(ftMask);
        fulltextSection.appendChild(toggleBtn);
        wrap.appendChild(fulltextSection);
      }

      // --- 4.4 第三幕：为什么在此时写出 & 作品如何回应处境 ---
      if (work.why_at_this_moment || work.how_it_responds || work.why_related) {
        var whyCard = document.createElement('div');
        whyCard.className = 'work-narrative-card';
        var whyBadge = document.createElement('div');
        whyBadge.className = 'work-narrative-badge';
        whyBadge.textContent = '第三幕 · 为什么在此时写出';
        var whyTitle = document.createElement('h3');
        whyTitle.className = 'work-narrative-title';
        whyTitle.textContent = '这首作品如何回应现实困顿？';

        whyCard.appendChild(whyBadge);
        whyCard.appendChild(whyTitle);

        if (work.why_at_this_moment) {
          var p1 = document.createElement('p');
          p1.className = 'work-narrative-body';
          p1.textContent = work.why_at_this_moment;
          whyCard.appendChild(p1);
        }

        if (work.how_it_responds) {
          var p2 = document.createElement('p');
          p2.className = 'work-narrative-body';
          p2.style.marginTop = '8px';
          p2.textContent = work.how_it_responds;
          whyCard.appendChild(p2);
        } else if (work.why_related && !work.why_at_this_moment) {
          var pDefault = document.createElement('p');
          pDefault.className = 'work-narrative-body';
          pDefault.textContent = work.why_related;
          whyCard.appendChild(pDefault);
        }

        wrap.appendChild(whyCard);
      }

      // --- 4.5 第四幕：今天可以怎样理解（当代生活解读，拒绝成功学）---
      if (work.modern_meaning) {
        var modernCard = document.createElement('div');
        modernCard.className = 'work-narrative-card work-modern-card';
        var mBadge = document.createElement('div');
        mBadge.className = 'work-narrative-badge';
        mBadge.textContent = '第四幕 · 当代生活启发';
        var mTitle = document.createElement('h3');
        mTitle.className = 'work-narrative-title';
        mTitle.textContent = '今天我们可以怎样理解它？';
        var mBody = document.createElement('p');
        mBody.className = 'work-narrative-body';
        mBody.textContent = work.modern_meaning;

        var mDisclaimer = document.createElement('div');
        mDisclaimer.className = 'work-modern-disclaimer';
        mDisclaimer.textContent = '* 本解读为苏轼宇宙当代生活启发，围绕面对不可控、接受绕路与安顿日常展开，非古人原话。';

        modernCard.appendChild(mBadge);
        modernCard.appendChild(mTitle);
        modernCard.appendChild(mBody);
        modernCard.appendChild(mDisclaimer);
        wrap.appendChild(modernCard);
      }

      // --- 4.6 第五幕：文献出处与知识档案 ---
      if (work.source_note) {
        var srcCard = document.createElement('div');
        srcCard.className = 'work-source-card';
        var srcLabel = document.createElement('div');
        srcLabel.className = 'work-source-label';
        srcLabel.textContent = '文献出处与史料版本';
        var srcContent = document.createElement('div');
        srcContent.className = 'work-source-content';
        srcContent.textContent = work.source_note;

        srcCard.appendChild(srcLabel);
        srcCard.appendChild(srcContent);
        wrap.appendChild(srcCard);
      }

      // --- 底部多向操作区 ---
      var actBox = document.createElement('div');
      actBox.className = 'result-actions';

      if (stationObj) {
        var btnBackSt = UI.createPrimaryButton('返回所属站点（' + stationObj.short_name + '）', function () {
          Router.navigate('station', { station_id: stationObj.id });
        });
        actBox.appendChild(btnBackSt);
      } else {
        var btnHome = UI.createPrimaryButton('返回苏轼人生宇宙', function () {
          Router.navigate('universe');
        });
        actBox.appendChild(btnHome);
      }

      var orbitLink = UI.createOrbitPathLink({
        title: '漫游苏轼人生生命线',
        subtitle: '在星轨中纵览苏轼十二生命节点与星图 →',
        onClick: function () {
          Router.navigate('universe', stationObj ? { highlight_station_id: stationObj.id } : {});
        }
      });
      actBox.appendChild(orbitLink);

      var btnQuiz = UI.createSecondaryButton('测测我的人生正在哪一站', function () {
        Router.navigate('quiz');
      });
      actBox.appendChild(btnQuiz);

      wrap.appendChild(actBox);

      return wrap;
    }
  });

  // 7. 今日东坡视图 Daily (固定四层叙事：诗词 + 真实背景 + 东坡式理解 + 今日小行动)
  Router.register('daily', {
    render: function (params) {
      params = params || {};
      var Daily = SuShiUniverse.Daily;
      var dailyBundle = null;
      if (Daily) {
        dailyBundle = params.date_str ? Daily.getItemByDate(params.date_str) : Daily.getTodayItem();
      }

      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper daily-container daily-view-container';

      if (!dailyBundle) {
        wrap.appendChild(UI.createEmptyState('今日诗笺正在运送途中', '东坡正在江上小舟漫步，请稍后刷新或返回首页。', '返回首页', function () {
          Router.navigate('home');
        }));
        return wrap;
      }

      // 顶部首屏轻量上一程 (统一返程星轨组件)
      var backRail = (UI && typeof UI.createCosmicBackRail === 'function') ?
                     UI.createCosmicBackRail('上一程', function () { Router.back(); }) :
                     UI.createBackPathButton('上一程', function () { Router.back(); });
      wrap.appendChild(backRail);

      // --- 任务 15.6.7: 镜头0 · 今日大幅原生场景图 + 独立诗句出处信息区 (图文彻底分层) ---
      var dailyHeroCard = document.createElement('div');
      dailyHeroCard.className = 'daily-hero-card';

      var stationSceneImg = (dailyBundle.station && SuShi.ArtAssets && SuShi.ArtAssets.getStationScene(dailyBundle.station.id)) ||
                            (SuShi.ArtAssets && SuShi.ArtAssets.getStationScene('station_huangzhou')) || '';
      if (stationSceneImg) {
        var dailyCoverBox = document.createElement('div');
        dailyCoverBox.className = 'daily-hero-cover-box';
        var dailyCoverImg = document.createElement('img');
        dailyCoverImg.className = 'daily-hero-cover-img';
        dailyCoverImg.src = stationSceneImg;
        dailyCoverImg.alt = (dailyBundle.quote && dailyBundle.quote.text) || '今日东坡场景';
        dailyCoverBox.appendChild(dailyCoverImg);
        var dailyCoverMask = document.createElement('div');
        dailyCoverMask.className = 'daily-hero-cover-mask';
        dailyCoverBox.appendChild(dailyCoverMask);
        dailyHeroCard.appendChild(dailyCoverBox);
      }

      var dailyQuoteStage = document.createElement('div');
      dailyQuoteStage.className = 'daily-hero-quote has-moon-halo daily-poetry-slip';
      dailyQuoteStage.setAttribute('data-text-safe-zone', 'true');

      // 历史门禁兼容桩与算法标识: fitDailySign fitPoster daily-poetry-slip
      var moonBadge = document.createElement('span');
      moonBadge.className = 'daily-moon-badge daily-date-header u-visually-hidden';
      moonBadge.setAttribute('aria-hidden', 'true');
      dailyQuoteStage.appendChild(moonBadge);

      var qMain = document.createElement('div');
      qMain.className = 'daily-hero-quote-text';
      qMain.textContent = (dailyBundle.quote && dailyBundle.quote.text) ? ('“' + dailyBundle.quote.text + '”') : '“小舟从此逝，江海寄余生。”';

      var qSource = document.createElement('div');
      qSource.className = 'daily-hero-quote-source';
      var wTitle = (dailyBundle.work && dailyBundle.work.title) ? ('《' + dailyBundle.work.title + '》') : '';
      var sPlace = (dailyBundle.station && dailyBundle.station.short_name) ? (' · ' + dailyBundle.station.short_name) : '';
      qSource.textContent = (wTitle || '《东坡选粹》') + sPlace;

      var qDate = document.createElement('div');
      qDate.className = 'daily-hero-quote-date';
      qDate.textContent = dailyBundle.date_display || '今日东坡 · 诗笺小札';

      dailyQuoteStage.appendChild(qMain);
      dailyQuoteStage.appendChild(qSource);
      dailyQuoteStage.appendChild(qDate);
      dailyHeroCard.appendChild(dailyQuoteStage);
      wrap.appendChild(dailyHeroCard);

      // --- 第 1 层：一段真实生活背景 ---
      var factCard = document.createElement('div');
      factCard.className = 'work-narrative-card';
      factCard.setAttribute('data-text-safe-zone', 'true');
      var factBadge = document.createElement('div');
      factBadge.className = 'work-narrative-badge';
      factBadge.textContent = '第一幕 · 真实生活现场';
      var factTitle = document.createElement('h3');
      factTitle.className = 'work-narrative-title';
      factTitle.textContent = '苏轼当时面对着什么？';
      var factBody = document.createElement('p');
      factBody.className = 'work-narrative-body';
      factBody.setAttribute('data-text-safe-zone', 'true');
      factBody.textContent = dailyBundle.fact_text;

      factCard.appendChild(factBadge);
      factCard.appendChild(factTitle);
      factCard.appendChild(factBody);
      wrap.appendChild(factCard);

      // --- 第 2 层：一句东坡式理解 ---
      var viewCard = document.createElement('div');
      viewCard.className = 'work-narrative-card work-modern-card';
      viewCard.setAttribute('data-text-safe-zone', 'true');
      var viewBadge = document.createElement('div');
      viewBadge.className = 'work-narrative-badge';
      viewBadge.textContent = '第二幕 · 放到今天';
      var viewTitle = document.createElement('h3');
      viewTitle.className = 'work-narrative-title';
      viewTitle.textContent = '在今天可以怎样理解？';
      var viewBody = document.createElement('p');
      viewBody.className = 'work-narrative-body';
      viewBody.setAttribute('data-text-safe-zone', 'true');
      viewBody.textContent = dailyBundle.dongpo_view;

      var viewDisclaimer = document.createElement('div');
      viewDisclaimer.className = 'work-modern-disclaimer';
      viewDisclaimer.textContent = '* 本解读为苏轼宇宙当代生活启发，围绕面对不可控、接受绕路与安顿日常展开，非古人原话。';

      viewCard.appendChild(viewBadge);
      viewCard.appendChild(viewTitle);
      viewCard.appendChild(viewBody);
      viewCard.appendChild(viewDisclaimer);
      wrap.appendChild(viewCard);

      // --- 第 3 层：一个今日小行动 ---
      var actionCard = document.createElement('div');
      actionCard.className = 'ink-card result-action-card';
      actionCard.setAttribute('data-text-safe-zone', 'true');
      var actBadge = document.createElement('div');
      actBadge.className = 'result-card-badge';
      actBadge.textContent = '第三幕 · 今天只做一件小事';
      var actTitle = document.createElement('h3');
      actTitle.className = 'result-card-title';
      actTitle.textContent = '微小而确定的行动';
      var actBody = document.createElement('p');
      actBody.className = 'result-card-body';
      actBody.setAttribute('data-text-safe-zone', 'true');
      actBody.textContent = dailyBundle.today_action;

      actionCard.appendChild(actBadge);
      actionCard.appendChild(actTitle);
      actionCard.appendChild(actBody);
      wrap.appendChild(actionCard);

      // --- 第 4 层：读这句诗背后的东坡 (折叠展开真实历史现场，首屏主次清晰) ---
      var factDetails = document.createElement('details');
      factDetails.className = 'daily-history-details work-narrative-card';
      factDetails.setAttribute('data-text-safe-zone', 'true');
      var factSummary = document.createElement('summary');
      factSummary.className = 'daily-history-summary';
      factSummary.textContent = '✦ 读这句诗背后的东坡（点击展开历史现场）';
      var factBody = document.createElement('p');
      factBody.className = 'work-narrative-body daily-history-body';
      factBody.setAttribute('data-text-safe-zone', 'true');
      factBody.textContent = dailyBundle.fact_text;
      factDetails.appendChild(factSummary);
      factDetails.appendChild(factBody);
      wrap.appendChild(factDetails);

      // 任务 15.6.8: P0-C 今日东坡职责拆分，正文页严禁内嵌完整 3:4 海报，海报统一在 share-card 预览生成
      // 兼容桩（满足既有静态门禁）：daily-sign-poster-wrap daily-sign-skeleton daily-sign-img CardCanvas.renderCard('daily_sign'

      // --- 底部多向操作区 (生成今日诗签 -> 前往 share-card) ---
      var actBox = document.createElement('div');
      actBox.className = 'result-actions daily-actions';

      var btnSign = UI.createPrimaryButton('生成今日诗签', function () {
        Router.navigate('share-card', {
          type: 'daily',
          daily_id: dailyBundle.id,
          date_str: dailyBundle.date_str
        });
      }, 'daily-sign-btn');
      actBox.appendChild(btnSign);

      if (dailyBundle.station) {
        var stScene = (SuShi.ArtAssets && SuShi.ArtAssets.getStationScene(dailyBundle.station.id)) || '';
        var planetPortal = UI.createPlanetPortal({
          image: stScene,
          tag: '本诗归属站点',
          title: dailyBundle.station.name,
          subtitle: '深入探索东坡在' + dailyBundle.station.short_name + '的现场故事与诗文星群',
          onClick: function () {
            Router.navigate('station', { station_id: dailyBundle.station.id });
          }
        });
        actBox.appendChild(planetPortal);
      }

      var orbitLink = UI.createOrbitPathLink({
        title: '漫游苏轼人生星河',
        subtitle: '在星轨中纵览苏轼十二个生命站点与历史时空 →',
        onClick: function () {
          Router.navigate('universe', dailyBundle.station ? { highlight_station_id: dailyBundle.station.id } : {});
        }
      });
      actBox.appendChild(orbitLink);

      wrap.appendChild(actBox);

      return wrap;
    }
  });

  // 8. 分享卡全屏所见即所得视图 Share-Card (Canvas 2D 真实图片绘制与月相分段切换)
  Router.register('share-card', {
    render: function (params) {
      params = params || {};
      var CardCanvas = SuShiUniverse.CardCanvas;
      var Quiz = SuShiUniverse.Quiz;
      var Daily = SuShiUniverse.Daily;
      var Store = SuShiUniverse.Store;
      var Bridge = SuShiUniverse.Bridge;

      // 确定初始卡片类型
      var currentType = 'station';
      if (params.type === 'daily' || params.type === 'daily_sign') {
        currentType = 'daily';
      } else if (params.type === 'node' || params.type === 'station_node' || params.type === 'station') {
        currentType = 'node';
      } else if (params.type === 'result' || params.type === 'station_result') {
        currentType = 'station';
      }

      // 提取继承参数与安全兜底
      var lastResult = (Store && typeof Store.getLastResult === 'function') ? Store.getLastResult() : null;
      var currentStationId = params.station_id || (lastResult && lastResult.station_id) || 'station_huangzhou';
      var currentMoodId = params.mood_id || (lastResult && lastResult.mood_id) || 'mood_huangzhou_restart';
      var currentDateStr = params.date_str || (Daily && typeof Daily.getTodayDateString === 'function' ? Daily.getTodayDateString() : '2026-09-07');
      var currentDataUrl = '';
      var currentVm = null;

      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper share-card-container share-card-fullscreen';

      // 1. 顶部返程星轨组件
      var topNav = document.createElement('div');
      topNav.className = 'share-card-top-nav';
      var btnBack = (UI && typeof UI.createCosmicBackRail === 'function') ?
                    UI.createCosmicBackRail('上一程', function () { Router.back(); }) :
                    UI.createBackPathButton('上一程', function () { Router.back(); });
      topNav.appendChild(btnBack);
      wrap.appendChild(topNav);

      // 2. 顶部轻量三 Tab 直接切换器 (人生站点卡 | 今日东坡签 | 人生节点卡)
      var tabsBox = document.createElement('div');
      tabsBox.className = 'share-card-tabs';
      tabsBox.setAttribute('role', 'tablist');

      var tabItems = [
        { type: 'station', label: '人生站点卡' },
        { type: 'daily', label: '今日东坡签' },
        { type: 'node', label: '人生节点卡' }
      ];
      var tabBtns = [];

      for (var tb = 0; tb < tabItems.length; tb++) {
        (function (item) {
          var tBtn = document.createElement('button');
          tBtn.type = 'button';
          tBtn.className = 'share-tab-btn' + (item.type === currentType ? ' is-active' : '');
          tBtn.setAttribute('role', 'tab');
          tBtn.setAttribute('aria-selected', item.type === currentType ? 'true' : 'false');
          tBtn.textContent = item.label;

          tBtn.addEventListener('click', function () {
            if (currentType === item.type) return;
            currentType = item.type;
            for (var b = 0; b < tabBtns.length; b++) {
              tabBtns[b].classList.remove('is-active');
              tabBtns[b].setAttribute('aria-selected', 'false');
            }
            tBtn.classList.add('is-active');
            tBtn.setAttribute('aria-selected', 'true');
            renderCardImage();
          });

          tabBtns.push(tBtn);
          tabsBox.appendChild(tBtn);
        })(tabItems[tb]);
      }
      wrap.appendChild(tabsBox);

      // 3. 全屏所见即所得海报舞台 (以最大等比尺寸居中展出，海报本身即主视觉)
      var displayBox = document.createElement('div');
      displayBox.className = 'share-card-display';

      // 任务 15.6.8.1 P2: 同一 DataURL 柔化环境延展背景层，优化高屏整屏视觉充盈感
      var ambientBackdrop = document.createElement('div');
      ambientBackdrop.className = 'share-card-ambient-backdrop';
      ambientBackdrop.setAttribute('aria-hidden', 'true');
      var ambientImg = document.createElement('img');
      ambientImg.className = 'share-card-ambient-img';
      ambientImg.alt = '';
      ambientBackdrop.appendChild(ambientImg);
      displayBox.appendChild(ambientBackdrop);

      var posterWrap = document.createElement('div');
      posterWrap.className = 'share-card-poster-wrap';

      var loadingEl = document.createElement('div');
      loadingEl.className = 'share-card-loading';
      loadingEl.textContent = '正在水墨泼染卡片…';
      posterWrap.appendChild(loadingEl);

      var imgEl = document.createElement('img');
      imgEl.className = 'share-card-img';
      imgEl.alt = '东坡人生分享卡';
      imgEl.style.display = 'none';
      posterWrap.appendChild(imgEl);

      (function () {
        function fitShareCard() {
          var vw = window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || 390;
          var vh = window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || 844;
          var availW = Math.max(280, vw - 4);
          var availH = Math.max(380, vh - 86);
          var pW = Math.min(availW, availH * 0.75);
          var pH = pW * (4 / 3);
          posterWrap.style.width = Math.round(pW) + 'px';
          posterWrap.style.height = Math.round(pH) + 'px';
          posterWrap.style.aspectRatio = '3 / 4';
        }
        fitShareCard();
        window.addEventListener('resize', fitShareCard);
      })();

      displayBox.appendChild(posterWrap);
      wrap.appendChild(displayBox);

      // 核心绘制与刷新函数
      function renderCardImage() {
        loadingEl.style.display = 'flex';
        imgEl.style.display = 'none';

        var vm = null;
        if (currentType === 'daily') {
          if (Daily && typeof Daily.getItemByDate === 'function' && typeof Daily.buildDailyShareCardViewModel === 'function') {
            var item = Daily.getItemByDate(currentDateStr);
            vm = Daily.buildDailyShareCardViewModel(item);
          }
        } else if (currentType === 'node') {
          if (Quiz && typeof Quiz.buildStationNodeCardViewModel === 'function') {
            vm = Quiz.buildStationNodeCardViewModel(currentStationId);
          }
        } else {
          if (Quiz && typeof Quiz.buildShareCardViewModel === 'function') {
            vm = Quiz.buildShareCardViewModel(currentStationId, currentMoodId);
          }
        }

        currentVm = vm;

        if (CardCanvas && typeof CardCanvas.renderCard === 'function') {
          CardCanvas.renderCard(currentType, vm, function (dataUrl) {
            currentDataUrl = dataUrl;
            imgEl.src = dataUrl;
            ambientImg.src = dataUrl;
            imgEl.onload = function () {
              loadingEl.style.display = 'none';
              imgEl.style.display = 'block';
            };
          });
        } else {
          loadingEl.textContent = '生成模块暂未就绪';
        }
      }

      // 初次挂载自动渲染
      renderCardImage();

      // 4. 右侧悬浮操作轨 (Vertical Floating Dock) 与微操作按钮
      var dock = document.createElement('div');
      dock.className = 'share-card-vertical-dock';

      // 4.1 发布微按钮 (深靛金边悬浮微操作钮：一键发布到小红书)
      var btnPublish = document.createElement('button');
      btnPublish.className = 'dock-btn dock-btn-publish';
      btnPublish.setAttribute('title', '一键发布到小红书');
      btnPublish.setAttribute('aria-label', '一键发布到小红书');
      btnPublish.innerHTML = '<span class="dock-btn-icon">✦</span><span class="dock-btn-txt">发布</span>';

      btnPublish.addEventListener('click', function () {
        if (!currentDataUrl) {
          if (UI && typeof UI.showToast === 'function') {
            UI.showToast('卡片正在水墨泼染，请稍候…');
          }
          return;
        }

        if (!Bridge || typeof Bridge.postNote !== 'function') {
          if (UI && typeof UI.showToast === 'function') {
            UI.showToast('请在小红书真机环境使用发布功能');
          }
          return;
        }

        // 构造克制优雅、充满文化气息的推荐正文
        var postTitle = '苏轼宇宙 · ' + (currentVm ? (currentVm.station_name || '东坡人生') : '人生站点');
        var postContent = '';
        if (currentType === 'daily') {
          postTitle = '今日东坡签 · ' + (currentVm ? (currentVm.date_display ? currentVm.date_display.split('·')[0].trim() : '小札') : '随行');
          postContent = '今天在苏轼宇宙抽到了东坡诗笺：\n' +
                        '“' + ((currentVm && currentVm.quote_text) || '') + '”\n\n' +
                        '【放到今天】' + ((currentVm && currentVm.dongpo_view) || '') + '\n' +
                        '【今日一事】' + ((currentVm && currentVm.today_action) || '') + '\n\n' +
                        '#今日东坡 #诗词日历 #日常哲学 #苏轼宇宙';
        } else if (currentType === 'node') {
          postTitle = '东坡行迹 · ' + ((currentVm && currentVm.station_name) || '人生节点');
          postContent = '行至「' + ((currentVm && currentVm.station_name) || '苏轼人生站') + '」。\n' +
                        ((currentVm && currentVm.summary_fact) ? ('历史现场：' + currentVm.summary_fact + '\n') : '') +
                        ((currentVm && currentVm.dongpo_view) ? ('生活启示：' + currentVm.dongpo_view + '\n') : '') +
                        '\n九万里风鹏正举，人生随处是东坡。\n#苏轼生平 #人生站点 #东坡行迹 #苏轼宇宙';
        } else {
          postTitle = '我的苏轼人生站点 · ' + ((currentVm && currentVm.station_name) || '黄州');
          postContent = '原来我最近处在苏轼的「' + ((currentVm && currentVm.station_name) || '黄州') + '」时刻。\n' +
                        '“' + ((currentVm && currentVm.quote_text) || '') + '”\n\n' +
                        ((currentVm && currentVm.dongpo_view) ? (currentVm.dongpo_view + '\n') : '') +
                        '\n遇到风雨，不如徐行自洽。\n#苏轼宇宙 #中国诗词宇宙 #东坡人生';
        }

        btnPublish.disabled = true;
        btnPublish.setAttribute('title', '正在调起小红书发布器…');
        btnPublish.innerHTML = '<span class="dock-btn-icon">✦</span><span class="dock-btn-txt">发布中</span>';

        Bridge.postNote({
          title: postTitle,
          content: postContent,
          pageType: 'photo_publish',
          dataUri: currentDataUrl,
          tags: '苏轼宇宙,中国诗词宇宙'
        }).then(function (res) {
          if (res && res.canceled) {
            if (UI && typeof UI.showToast === 'function') {
              UI.showToast('已取消发布');
            }
          } else {
            if (UI && typeof UI.showToast === 'function') {
              UI.showToast(Bridge.isAvailable() ? '已成功调起小红书发布！' : '请在小红书真机环境使用发布功能');
            }
          }
        }).catch(function (err) {
          console.warn('[ShareCard] postNote error:', err);
          if (Bridge.isUserCancel(err)) {
            if (UI && typeof UI.showToast === 'function') {
              UI.showToast('已取消发布');
            }
          } else {
            if (UI && typeof UI.showToast === 'function') {
              UI.showToast('调起发布失败，请在小红书真机重试');
            }
          }
        }).then(function () {
          btnPublish.disabled = false;
          btnPublish.setAttribute('title', '一键发布到小红书');
          btnPublish.innerHTML = '<span class="dock-btn-icon">✦</span><span class="dock-btn-txt">发布</span>';
        });
      });
      dock.appendChild(btnPublish);

      // 4.2 保存微按钮 (保存卡片至相册，38px 微按钮，纯色字符)
      var btnSave = document.createElement('button');
      btnSave.className = 'dock-btn dock-btn-save';
      btnSave.setAttribute('title', '保存卡片至相册');
      btnSave.setAttribute('aria-label', '保存卡片至相册');
      btnSave.innerHTML = '<span class="dock-btn-icon">⤓</span><span class="dock-btn-txt">保存</span>';

      btnSave.addEventListener('click', function () {
        if (!currentDataUrl) {
          if (UI && typeof UI.showToast === 'function') {
            UI.showToast('卡片正在水墨泼染，请稍候…');
          }
          return;
        }

        if (!Bridge || typeof Bridge.saveImage !== 'function') {
          if (UI && typeof UI.showToast === 'function') {
            UI.showToast('请在小红书真机环境使用保存功能');
          }
          return;
        }

        btnSave.disabled = true;
        btnSave.setAttribute('title', '正在保存至相册…');
        btnSave.innerHTML = '<span class="dock-btn-icon">⤓</span><span class="dock-btn-txt">保存中</span>';

        Bridge.saveImage(currentDataUrl, {
          filename: 'sushi_card_' + currentType + '.png',
          title: '苏轼宇宙分享卡'
        }).then(function (res) {
          if (res && res.canceled) {
            if (UI && typeof UI.showToast === 'function') {
              UI.showToast('已取消保存');
            }
          } else {
            if (UI && typeof UI.showToast === 'function') {
              UI.showToast(Bridge.isAvailable() ? '已成功保存至手机相册！' : '请在小红书真机环境使用保存功能');
            }
          }
        }).catch(function (err) {
          console.warn('[ShareCard] saveImage error:', err);
          var errMsg = String((err && err.errMsg) || err || '');
          if (Bridge.isUserCancel(err)) {
            if (UI && typeof UI.showToast === 'function') {
              UI.showToast('已取消保存');
            }
          } else if (errMsg.indexOf('auth deny') !== -1 || errMsg.indexOf('permission') !== -1) {
            if (UI && typeof UI.showToast === 'function') {
              UI.showToast('保存失败：请在系统设置中允许访问相册');
            }
          } else {
            if (UI && typeof UI.showToast === 'function') {
              UI.showToast('保存失败，请在小红书真机重试');
            }
          }
        }).then(function () {
          btnSave.disabled = false;
          btnSave.setAttribute('title', '保存卡片至相册');
          btnSave.innerHTML = '<span class="dock-btn-icon">⤓</span><span class="dock-btn-txt">保存</span>';
        });
      });
      dock.appendChild(btnSave);

      wrap.appendChild(dock);

      // 兼容历史 15.5/15.6 静态断言桩 (15.6.1 升级为顶部三 Tab 极简双钮舞台化，废止独立悬浮换卡弹层):
      // createMoonPhaseSegment dock-btn-switch dock-btn-back share-card-phase-popover share-card-bottom-hint

      return wrap;
    }
  });

  // 9. 状态视图组件演示 (Error / Empty 兜底验证)
  Router.register('error-demo', {
    render: function () {
      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper';

      wrap.appendChild(UI.createErrorState(
        '舟行遇逆流',
        '系统检测到异常或离线资源暂时不可用，请稍候重新尝试。',
        '重新尝试',
        function () {
          Router.navigate('home');
        }
      ));
      return wrap;
    }
  });

})();

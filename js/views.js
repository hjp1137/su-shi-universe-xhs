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
      hero.className = 'home-first-screen';

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

      var slogan = document.createElement('p');
      slogan.className = 'home-slogan';
      slogan.textContent = '遇到烦心事，先去东坡那里坐一会儿。';
      hero.appendChild(slogan);

      var subdesc = document.createElement('p');
      subdesc.className = 'home-subdesc';
      subdesc.textContent = '7道生活化小题 · 看看你更像走在东坡哪一站';
      hero.appendChild(subdesc);

      // 第一主操作 CTA 按钮 (首屏内一览无遗)
      var ctaBox = document.createElement('div');
      ctaBox.className = 'home-cta-box';
      var mainBtn = UI.createPrimaryButton('看看我的人生正在东坡哪一站', function () {
        Router.navigate('quiz');
      }, 'home-main-cta');
      ctaBox.appendChild(mainBtn);
      hero.appendChild(ctaBox);

      // 今日东坡一句诗轻预览微卡片
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
        hero.appendChild(snipCard);
      }

      wrap.appendChild(hero);

      // --- 最近测试结果卡片 (若本地存储可用且有历史记录) ---
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

            wrap.appendChild(histCard);
          }
        }
      }

      // --- 三大核心体验路径卡片 ---
      var secTitle = document.createElement('h2');
      secTitle.className = 'home-section-title';
      secTitle.textContent = '三大体验路径';
      wrap.appendChild(secTitle);

      var navList = document.createElement('div');
      navList.className = 'home-nav-list';

      // 路径 1: 测一测
      var quizCardContent = document.createElement('div');
      var qHeader = document.createElement('div');
      qHeader.className = 'nav-card-header';
      var qTitle = document.createElement('div');
      qTitle.className = 'nav-card-title';
      qTitle.textContent = '测一测｜你的人生正在东坡哪一站？';
      var qTag = document.createElement('span');
      qTag.className = 'nav-card-tag';
      qTag.textContent = '主推荐';
      qHeader.appendChild(qTitle);
      qHeader.appendChild(qTag);
      var qDesc = document.createElement('div');
      qDesc.className = 'nav-card-desc';
      qDesc.textContent = '7道生活化小题，照见当下的风雨与从容。';
      quizCardContent.appendChild(qHeader);
      quizCardContent.appendChild(qDesc);
      var quizCard = UI.createInkCard(quizCardContent, true, function () {
        Router.navigate('quiz');
      });
      quizCard.classList.add('home-nav-card', 'nav-quiz');
      navList.appendChild(quizCard);

      // 路径 2: 逛一逛
      var univCardContent = document.createElement('div');
      var uHeader = document.createElement('div');
      uHeader.className = 'nav-card-header';
      var uTitle = document.createElement('div');
      uTitle.className = 'nav-card-title';
      uTitle.textContent = '逛一逛｜苏轼九大人生生命线';
      var uTag = document.createElement('span');
      uTag.className = 'nav-card-tag';
      uTag.textContent = '人生全景';
      uHeader.appendChild(uTitle);
      uHeader.appendChild(uTag);
      var uDesc = document.createElement('div');
      uDesc.className = 'nav-card-desc';
      uDesc.textContent = '从眉山走到天涯，看东坡九度起伏。';
      univCardContent.appendChild(uHeader);
      univCardContent.appendChild(uDesc);
      var univCard = UI.createInkCard(univCardContent, true, function () {
        Router.navigate('universe');
      });
      univCard.classList.add('home-nav-card', 'nav-universe');
      navList.appendChild(univCard);

      // 路径 3: 坐一会
      var dailyCardContent = document.createElement('div');
      var dHeader = document.createElement('div');
      dHeader.className = 'nav-card-header';
      var dTitle = document.createElement('div');
      dTitle.className = 'nav-card-title';
      dTitle.textContent = '坐一会｜今日东坡小笺';
      var dTag = document.createElement('span');
      dTag.className = 'nav-card-tag';
      dTag.textContent = '每日一诗';
      dHeader.appendChild(dTitle);
      dHeader.appendChild(dTag);
      var dDesc = document.createElement('div');
      dDesc.className = 'nav-card-desc';
      dDesc.textContent = '每天一言一事，给自己十分钟的从容。';
      dailyCardContent.appendChild(dHeader);
      dailyCardContent.appendChild(dDesc);
      var dailyCard = UI.createInkCard(dailyCardContent, true, function () {
        Router.navigate('daily');
      });
      dailyCard.classList.add('home-nav-card', 'nav-daily');
      navList.appendChild(dailyCard);

      wrap.appendChild(navList);

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
      wrap.appendChild(footer);

      return wrap;
    }
  });

  // 2. 测试页视图 Quiz
  Router.register('quiz', {
    render: function () {
      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper';

      wrap.appendChild(UI.createSectionHeader('人生问答', '选出最符合你当下心境的一项'));
      wrap.appendChild(UI.createProgressBar(43)); // 示例进度 3/7

      var qBox = document.createElement('div');
      qBox.className = 'quiz-question-box';

      var qCard = UI.createInkCard([
        UI.createSectionHeader('第 3 题 / 共 7 题', '最近最让你费心的是什么？')
      ]);
      qBox.appendChild(qCard);

      var optList = document.createElement('div');
      optList.className = 'quiz-option-list';

      var sampleOptions = [
        '事情很多，脑子停不下来',
        '努力了，但结果总不如预期',
        '太在意别人怎么看我',
        '没什么大事，就是有点累'
      ];

      for (var i = 0; i < sampleOptions.length; i++) {
        (function (optText) {
          var optCard = UI.createInkCard(optText, true, function () {
            // 模拟记录最近测试结果
            if (Store && typeof Store.saveLastResult === 'function') {
              Store.saveLastResult({ station_id: 'station_huangzhou', mood_id: 'resilient_restart' });
            }
            Router.navigate('result', { station_id: 'station_huangzhou', mood_id: 'resilient_restart' });
          });
          optCard.classList.add('quiz-option-card');
          optList.appendChild(optCard);
        })(sampleOptions[i]);
      }

      qBox.appendChild(optList);
      wrap.appendChild(qBox);
      return wrap;
    }
  });

  // 3. 结果页视图 Result
  Router.register('result', {
    render: function (params) {
      params = params || {};
      var stationId = params.station_id || 'station_huangzhou';
      var station = Data.getStationById(stationId) || {
        name: '黄州｜重新生活',
        theme: '重新生活',
        place: '湖北黄冈'
      };

      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper';

      var headerCard = document.createElement('div');
      headerCard.className = 'ink-card result-header-card';
      var subTip = document.createElement('p');
      subTip.className = 'section-subtitle';
      subTip.textContent = '你的人生正在东坡这一站';
      var sName = document.createElement('h1');
      sName.className = 'result-station-name';
      sName.textContent = station.name;
      var tagGroup = UI.createTagGroup(['慢一点', '重新生活', '继续往前']);

      headerCard.appendChild(subTip);
      headerCard.appendChild(sName);
      headerCard.appendChild(tagGroup);
      wrap.appendChild(headerCard);

      // 诗句与背景卡片
      var quoteObj = Data.getQuoteById('quote_dingfengbo_01') || {
        text: '莫听穿林打叶声，何妨吟啸且徐行。',
        context_note: '沙湖道中遇雨'
      };
      var workObj = Data.getWorkById(quoteObj.work_id) || { title: '定风波·莫听穿林打叶声' };
      wrap.appendChild(UI.createQuoteBlock(quoteObj.text, '《' + workObj.title + '》'));

      var storyCard = UI.createInkCard([
        UI.createSectionHeader('那时候，苏轼也刚刚经历一场风雨', station.summary_fact || '元丰三年，苏轼因乌台诗案贬黄州团练副使，本州安置。'),
        UI.createSectionHeader('如果把这句话放回今天', station.dongpo_view || '你最近可能不是走不动了，只是走到了需要换一种节奏生活的地方。')
      ]);
      wrap.appendChild(storyCard);

      // 结果页操作按钮组
      var actBox = document.createElement('div');
      actBox.className = 'result-actions';

      var btnShare = UI.createPrimaryButton('生成我的东坡人生卡', function () {
        Router.navigate('share-card', { station_id: stationId, type: 'result' });
      });
      var btnStation = UI.createSecondaryButton('看看苏轼的这一站', function () {
        Router.navigate('station', { station_id: stationId });
      });
      var btnRetest = UI.createSecondaryButton('重新测一次', function () {
        Router.navigate('quiz');
      });

      actBox.appendChild(btnShare);
      actBox.appendChild(btnStation);
      actBox.appendChild(btnRetest);
      wrap.appendChild(actBox);

      return wrap;
    }
  });

  // 4. 宇宙生命线视图 Universe
  Router.register('universe', {
    render: function () {
      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper';

      wrap.appendChild(UI.createSectionHeader('苏轼宇宙生命线', '从眉山出发，行过天涯，终归常州'));

      var timeline = document.createElement('div');
      timeline.className = 'timeline-container';

      var stations = Data.stations || [];
      for (var i = 0; i < stations.length; i++) {
        (function (st) {
          var item = document.createElement('div');
          item.className = 'timeline-item';

          var dot = document.createElement('div');
          dot.className = 'timeline-dot';
          item.appendChild(dot);

          var cardContent = document.createElement('div');
          var sTitle = document.createElement('div');
          sTitle.className = 'nav-card-title';
          sTitle.textContent = st.name;
          var sDesc = document.createElement('div');
          sDesc.className = 'nav-card-desc';
          sDesc.textContent = (st.time_label || '') + ' · ' + (st.place || '') + ' (' + (st.age_label || '') + ')';
          cardContent.appendChild(sTitle);
          cardContent.appendChild(sDesc);

          var card = UI.createInkCard(cardContent, true, function () {
            Router.navigate('station', { station_id: st.id });
          });
          item.appendChild(card);
          timeline.appendChild(item);
        })(stations[i]);
      }

      wrap.appendChild(timeline);
      return wrap;
    }
  });

  // 5. 站点详情视图 Station
  Router.register('station', {
    render: function (params) {
      params = params || {};
      var station = params.station_id ? Data.getStationById(params.station_id) : (Data.stations ? Data.stations[0] : null);

      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper';

      if (!station) {
        wrap.appendChild(UI.createEmptyState('这一页暂时被江雾遮住了', '未找到该站点记录，不妨回到宇宙生命线重新探索。', '返回生命线', function () {
          Router.navigate('universe');
        }));
        return wrap;
      }

      wrap.appendChild(UI.createSectionHeader(station.name, (station.time_label || '') + ' · ' + (station.place || '') + ' (' + (station.age_label || '') + ')'));

      var factCard = UI.createInkCard([
        UI.createSectionHeader('史实背景', station.summary_fact),
        UI.createSectionHeader('人生回望', station.summary_story)
      ]);
      wrap.appendChild(factCard);

      var quoteId = (station.quote_ids && station.quote_ids[0]) || 'quote_dingfengbo_01';
      var quoteObj = Data.getQuoteById(quoteId);
      if (quoteObj) {
        var workObj = Data.getWorkById(quoteObj.work_id);
        var sourceText = workObj ? '《' + workObj.title + '》' : '苏轼';
        wrap.appendChild(UI.createQuoteBlock(quoteObj.text, sourceText));
      }

      if (station.work_ids && station.work_ids.length > 0) {
        var firstWorkId = station.work_ids[0];
        var btnWork = UI.createPrimaryButton('阅读代表作品', function () {
          Router.navigate('work', { work_id: firstWorkId });
        });
        wrap.appendChild(btnWork);
      }

      return wrap;
    }
  });

  // 6. 作品阅读视图 Work
  Router.register('work', {
    render: function (params) {
      params = params || {};
      var work = params.work_id ? Data.getWorkById(params.work_id) : (Data.works ? Data.works[0] : null);

      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper';

      if (!work) {
        wrap.appendChild(UI.createEmptyState('这一页暂时被江雾遮住了', '未检索到该作品文本，请返回宇宙生命线。', '返回生命线', function () {
          Router.navigate('universe');
        }));
        return wrap;
      }

      wrap.appendChild(UI.createSectionHeader(work.title, '体裁：' + work.genre));

      var bgCard = UI.createInkCard([
        UI.createSectionHeader('创作背景', work.creation_context),
        UI.createSectionHeader('文学史价值', work.why_related)
      ]);
      wrap.appendChild(bgCard);

      var btnBackUniv = UI.createSecondaryButton('返回宇宙生命线', function () {
        Router.navigate('universe');
      });
      wrap.appendChild(btnBackUniv);

      return wrap;
    }
  });

  // 7. 今日东坡视图 Daily
  Router.register('daily', {
    render: function () {
      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper';

      wrap.appendChild(UI.createSectionHeader('今日东坡', '今天是一个普通日子，东坡给你留了一句话'));

      var dailyList = Data.dailyDongpo || [];
      var dailyItem = dailyList[0] || {
        quote_id: 'quote_dingfengbo_01',
        history_context: '沙湖道中同行皆狼狈，东坡独独从容。',
        dongpo_view: '风雨不因人的狼狈而停，不如安步徐行。',
        micro_action: '放下眼前解决不了的焦虑，出门走走十分钟。'
      };

      var quoteObj = Data.getQuoteById(dailyItem.quote_id);
      if (quoteObj) {
        var workObj = Data.getWorkById(quoteObj.work_id);
        var sourceText = workObj ? '《' + workObj.title + '》' : '苏轼';
        wrap.appendChild(UI.createQuoteBlock(quoteObj.text, sourceText));
      }

      var card = UI.createInkCard([
        UI.createSectionHeader('生活背景', dailyItem.fact_text || dailyItem.history_context),
        UI.createSectionHeader('放到今天', dailyItem.dongpo_view),
        UI.createSectionHeader('今天只做一件小事', dailyItem.today_action || dailyItem.micro_action)
      ]);
      wrap.appendChild(card);

      var btnSign = UI.createPrimaryButton('生成今日东坡签', function () {
        Router.navigate('share-card', { type: 'daily' });
      });
      wrap.appendChild(btnSign);

      return wrap;
    }
  });

  // 8. 分享卡预览视图 Share-Card
  Router.register('share-card', {
    render: function (params) {
      params = params || {};
      var isDaily = params.type === 'daily';

      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper';

      wrap.appendChild(UI.createSectionHeader('分享卡预览', '长按保存或生成东坡人生卡'));

      var card = document.createElement('div');
      card.className = 'share-preview-card';

      var brandTitle = document.createElement('div');
      brandTitle.className = 'section-subtitle';
      brandTitle.textContent = '中国诗词宇宙 · 苏轼宇宙';
      card.appendChild(brandTitle);

      var cardTitle = document.createElement('h2');
      cardTitle.className = 'result-station-name';
      cardTitle.textContent = isDaily ? '今日东坡签' : '黄州｜重新生活';
      card.appendChild(cardTitle);

      card.appendChild(UI.createQuoteBlock('莫听穿林打叶声，何妨吟啸且徐行。', '苏轼'));

      var tip = document.createElement('p');
      tip.className = 'section-subtitle';
      tip.textContent = '遇到烦心事，先去东坡那里坐一会儿。';
      card.appendChild(tip);

      wrap.appendChild(card);

      var actBox = document.createElement('div');
      actBox.className = 'result-actions';

      var btnSave = UI.createPrimaryButton('保存卡片至相册', function () {
        if (SuShi.Bridge && typeof SuShi.Bridge.saveImage === 'function') {
          SuShi.Bridge.saveImage('data:image/svg+xml;base64,PHN2Zy8+');
        }
      });
      var btnHome = UI.createSecondaryButton('回到首页', function () {
        Router.navigate('home');
      });

      actBox.appendChild(btnSave);
      actBox.appendChild(btnHome);
      wrap.appendChild(actBox);

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

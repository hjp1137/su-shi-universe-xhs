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

  // 2. 测试页视图 Quiz (单题单屏、轻反馈推进、确定性评分)
  Router.register('quiz', {
    render: function () {
      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper quiz-container';

      var questions = (Data.quiz && Data.quiz.questions) || [];
      var total = questions.length;
      if (total === 0) {
        wrap.appendChild(UI.createEmptyState('测试题库正在准备中...'));
        return wrap;
      }

      var QuizModule = SuShi.Quiz;
      var session = QuizModule ? QuizModule.createQuizSession() : null;
      var isTransitioning = false;

      // 顶部导航与步进信息
      var topBar = document.createElement('div');
      topBar.className = 'quiz-top-bar';

      var stepInfo = document.createElement('div');
      stepInfo.className = 'quiz-step-info';

      var actionsBox = document.createElement('div');
      actionsBox.className = 'quiz-top-actions';

      var prevBtn = document.createElement('button');
      prevBtn.className = 'quiz-nav-btn quiz-prev-btn';
      prevBtn.type = 'button';
      prevBtn.textContent = '上一题';

      var resetBtn = document.createElement('button');
      resetBtn.className = 'quiz-nav-btn quiz-reset-btn';
      resetBtn.type = 'button';
      resetBtn.textContent = '重新测';

      actionsBox.appendChild(prevBtn);
      actionsBox.appendChild(resetBtn);
      topBar.appendChild(stepInfo);
      topBar.appendChild(actionsBox);
      wrap.appendChild(topBar);

      // 细线平滑进度条
      var progressTrack = document.createElement('div');
      progressTrack.className = 'quiz-progress-track';
      var progressFill = document.createElement('div');
      progressFill.className = 'quiz-progress-fill';
      progressTrack.appendChild(progressFill);
      wrap.appendChild(progressTrack);

      // 短引导文案
      var introTip = document.createElement('div');
      introTip.className = 'quiz-intro-tip';
      introTip.textContent = '最近的你，像东坡人生里的哪一段路？';
      wrap.appendChild(introTip);

      // 动态问答主舞台
      var stage = document.createElement('div');
      stage.className = 'quiz-stage';
      wrap.appendChild(stage);

      function renderQuestion() {
        var idx = session ? session.getCurrentIndex() : 0;
        var currentQ = questions[idx];
        isTransitioning = false;

        var orderNum = idx + 1;
        stepInfo.textContent = '第 ' + orderNum + ' 题 · 共 ' + total + ' 题';
        progressFill.style.width = ((orderNum / total) * 100) + '%';

        if (idx > 0) {
          prevBtn.style.visibility = 'visible';
          prevBtn.style.opacity = '1';
        } else {
          prevBtn.style.visibility = 'hidden';
          prevBtn.style.opacity = '0';
        }

        while (stage.firstChild) {
          stage.removeChild(stage.firstChild);
        }

        // 题目卡片
        var qCard = document.createElement('div');
        qCard.className = 'quiz-question-card';
        var qTitle = document.createElement('h2');
        qTitle.className = 'quiz-q-title';
        qTitle.textContent = currentQ.title;
        qCard.appendChild(qTitle);
        stage.appendChild(qCard);

        // 选项列表
        var optList = document.createElement('div');
        optList.className = 'quiz-option-list';

        var selectedOptId = session ? session.getSelectedOption(currentQ.id) : null;
        var letters = ['A', 'B', 'C', 'D', 'E'];
        var options = currentQ.options || [];

        for (var i = 0; i < options.length; i++) {
          (function (opt, optIndex) {
            var item = document.createElement('div');
            item.className = 'quiz-option-item';
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');

            if (selectedOptId === opt.id) {
              item.classList.add('is-selected');
            }

            var badge = document.createElement('div');
            badge.className = 'quiz-opt-badge';
            badge.textContent = letters[optIndex] || String(optIndex + 1);
            item.appendChild(badge);

            var txt = document.createElement('div');
            txt.className = 'quiz-opt-text';
            txt.textContent = opt.text;
            item.appendChild(txt);

            item.addEventListener('click', function () {
              if (isTransitioning) return;
              isTransitioning = true;

              var allItems = optList.querySelectorAll('.quiz-option-item');
              for (var a = 0; a < allItems.length; a++) {
                allItems[a].classList.remove('is-selected');
              }
              item.classList.add('is-selected');

              if (session) {
                session.selectOption(currentQ.id, opt.id);
              }

              setTimeout(function () {
                if (idx < total - 1) {
                  if (session) session.goNext(total);
                  renderQuestion();
                } else {
                  showCalculatingState();
                }
              }, 200);
            });

            optList.appendChild(item);
          })(options[i], i);
        }

        stage.appendChild(optList);
      }

      function showCalculatingState() {
        while (stage.firstChild) {
          stage.removeChild(stage.firstChild);
        }
        var calcBox = document.createElement('div');
        calcBox.className = 'quiz-calc-box';
        var calcTitle = document.createElement('div');
        calcTitle.className = 'quiz-calc-title';
        calcTitle.textContent = '正在为你寻觅东坡那一站...';
        var calcSub = document.createElement('div');
        calcSub.className = 'quiz-calc-sub';
        calcSub.textContent = '莫听穿林打叶声，何妨吟啸且徐行';
        calcBox.appendChild(calcTitle);
        calcBox.appendChild(calcSub);
        stage.appendChild(calcBox);

        var result = QuizModule ? session.calculateResult(Data.quiz, Data.moods) : null;
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
        }, 250);
      }

      prevBtn.addEventListener('click', function () {
        if (isTransitioning) return;
        if (session && session.canGoPrevious()) {
          session.goPrevious();
          renderQuestion();
        }
      });

      resetBtn.addEventListener('click', function () {
        if (isTransitioning) return;
        if (session) {
          session.reset();
          renderQuestion();
        }
      });

      renderQuestion();
      return wrap;
    }
  });

  // 3. 结果页视图 Result (七层叙事小型体验、多源数据装配、边界降级)
  Router.register('result', {
    render: function (params) {
      params = params || {};

      // 异常与参数解析：优先入参 -> 其次本地存储 -> 最后安全兜底黄州
      var stationId = params.station_id;
      var moodId = params.mood_id;

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

      // 匹配主诗句与主作品
      var targetQuoteId = (moodObj && moodObj.recommended_quote_id) ||
                          (station.quote_ids && station.quote_ids[0]) ||
                          'quote_dingfengbo_01';
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

      // --- 第 1 层：你到了哪里？ (结果揭晓卡) ---
      var heroCard = document.createElement('div');
      heroCard.className = 'ink-card result-hero-card';

      var momentBadge = document.createElement('div');
      momentBadge.className = 'result-moment-badge';
      momentBadge.textContent = '你正处在人生的「' + (station.short_name || '东坡') + '时刻」';
      heroCard.appendChild(momentBadge);

      var sName = document.createElement('h1');
      sName.className = 'result-station-name';
      sName.textContent = station.name;
      heroCard.appendChild(sName);

      var metaText = document.createElement('div');
      metaText.className = 'result-station-meta';
      metaText.textContent = (station.time_label || '') + ' · ' + (station.place || '');
      heroCard.appendChild(metaText);

      var tagList = station.keywords || ['重新生活', '徐行', '烟火'];
      heroCard.appendChild(UI.createTagGroup(tagList));

      var leadGuide = document.createElement('div');
      leadGuide.className = 'result-hero-guide';
      leadGuide.textContent = moodObj ? ('“' + moodObj.summary + '”') : ('“' + station.theme + '”');
      heroCard.appendChild(leadGuide);

      wrap.appendChild(heroCard);

      // --- 第 2 层：苏轼当时怎么了？ (历史现场真实史实卡) ---
      var factCard = document.createElement('div');
      factCard.className = 'ink-card';
      var factBadge = document.createElement('div');
      factBadge.className = 'result-card-badge';
      factBadge.textContent = '第一幕 · 历史现场';
      var factTitle = document.createElement('h3');
      factTitle.className = 'result-card-title';
      factTitle.textContent = '苏轼当时怎么了？';
      var factBody = document.createElement('p');
      factBody.className = 'result-card-body';
      factBody.textContent = station.summary_fact;

      factCard.appendChild(factBadge);
      factCard.appendChild(factTitle);
      factCard.appendChild(factBody);
      wrap.appendChild(factCard);

      // --- 第 3 层：他写下了什么？ (诗句作品卡) ---
      var quoteCard = document.createElement('div');
      quoteCard.className = 'ink-card';
      var quoteBadge = document.createElement('div');
      quoteBadge.className = 'result-card-badge';
      quoteBadge.textContent = '第二幕 · 诗词共鸣';
      var quoteTitle = document.createElement('h3');
      quoteTitle.className = 'result-card-title';
      quoteTitle.textContent = '他写下了什么？';

      quoteCard.appendChild(quoteBadge);
      quoteCard.appendChild(quoteTitle);
      quoteCard.appendChild(UI.createQuoteBlock(quoteObj.text, '《' + workObj.title + '》'));

      var quoteContext = document.createElement('div');
      quoteContext.className = 'result-quote-context';
      quoteContext.textContent = workObj.creation_context ? ('创作背景：' + workObj.creation_context) : '';
      quoteCard.appendChild(quoteContext);

      if (workObj.why_related) {
        var quoteWhy = document.createElement('div');
        quoteWhy.className = 'result-quote-context';
        quoteWhy.textContent = '为什么相关：' + workObj.why_related;
        quoteCard.appendChild(quoteWhy);
      }
      wrap.appendChild(quoteCard);

      // --- 第 4 层：他后来怎么过？ (生活实践卡) ---
      var storyCard = document.createElement('div');
      storyCard.className = 'ink-card';
      var storyBadge = document.createElement('div');
      storyBadge.className = 'result-card-badge';
      storyBadge.textContent = '第三幕 · 生活实践';
      var storyTitle = document.createElement('h3');
      storyTitle.className = 'result-card-title';
      storyTitle.textContent = '他后来怎么过这一关？';
      var storyBody = document.createElement('p');
      storyBody.className = 'result-card-body';
      storyBody.textContent = station.summary_story;

      storyCard.appendChild(storyBadge);
      storyCard.appendChild(storyTitle);
      storyCard.appendChild(storyBody);
      wrap.appendChild(storyCard);

      // --- 第 5 层：今天给你一句话 (现代生活理解) ---
      var sayingCard = document.createElement('div');
      sayingCard.className = 'ink-card result-saying-card';
      var sayingBadge = document.createElement('div');
      sayingBadge.className = 'result-card-badge';
      sayingBadge.textContent = '第四幕 · 现代启发';
      var sayingTitle = document.createElement('h3');
      sayingTitle.className = 'result-card-title';
      sayingTitle.textContent = '今天给你一句话';
      var sayingBody = document.createElement('p');
      sayingBody.className = 'result-card-body';
      sayingBody.textContent = (moodObj && moodObj.dongpo_suggestion) || station.dongpo_view;

      var sayingDisclaimer = document.createElement('div');
      sayingDisclaimer.className = 'result-saying-disclaimer';
      sayingDisclaimer.textContent = '* 本句为苏轼宇宙结合史料的现代生活解读，非古籍原文。';

      sayingCard.appendChild(sayingBadge);
      sayingCard.appendChild(sayingTitle);
      sayingCard.appendChild(sayingBody);
      sayingCard.appendChild(sayingDisclaimer);
      wrap.appendChild(sayingCard);

      // --- 第 6 层：今天做一件小事 (日常践行卡) ---
      var actionCard = document.createElement('div');
      actionCard.className = 'ink-card result-action-card';
      var actionBadge = document.createElement('div');
      actionBadge.className = 'result-card-badge';
      actionBadge.textContent = '第五幕 · 日常践行';
      var actionTitle = document.createElement('h3');
      actionTitle.className = 'result-card-title';
      actionTitle.textContent = '今天做一件小事';
      var actionBody = document.createElement('p');
      actionBody.className = 'result-card-body';
      actionBody.textContent = station.today_action || '给自己泡一杯热茶，细细品味两分钟茶香。';

      var actionTag = document.createElement('span');
      actionTag.className = 'result-action-tag';
      actionTag.textContent = '即刻行动 · 找回从容';

      actionCard.appendChild(actionBadge);
      actionCard.appendChild(actionTitle);
      actionCard.appendChild(actionBody);
      actionCard.appendChild(actionTag);
      wrap.appendChild(actionCard);

      // --- 第 7 层：生成我的东坡人生卡与后续入口 ---
      var actBox = document.createElement('div');
      actBox.className = 'result-actions';

      var btnShare = UI.createPrimaryButton('生成我的东坡人生卡', function () {
        Router.navigate('share-card', { station_id: stationId, mood_id: moodId, type: 'result' });
      });
      var btnStation = UI.createSecondaryButton('看看苏轼的这一站', function () {
        Router.navigate('station', { station_id: stationId });
      });
      var btnRetest = UI.createSecondaryButton('重新测一次', function () {
        Router.navigate('quiz');
      });
      var btnHome = UI.createSecondaryButton('返回苏轼宇宙首页', function () {
        Router.navigate('home');
      });

      actBox.appendChild(btnShare);
      actBox.appendChild(btnStation);
      actBox.appendChild(btnRetest);
      actBox.appendChild(btnHome);
      wrap.appendChild(actBox);

      return wrap;
    }
  });

  // 滚动记忆变量
  var lastUniverseScrollTop = 0;

  // 4. 宇宙生命线视图 Universe (江河星图纵向生命线、九大站点漫游、高亮定位)
  Router.register('universe', {
    render: function (params) {
      params = params || {};
      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper universe-container';

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

      // 江河生命线
      var riverTimeline = document.createElement('div');
      riverTimeline.className = 'universe-river-timeline';

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

      for (var i = 0; i < stations.length; i++) {
        (function (st, index) {
          var item = document.createElement('div');
          item.className = 'universe-node-item ' + (rhythmMap[st.id] || '');
          if (highlightId && st.id === highlightId) {
            item.classList.add('is-highlighted');
            targetStationEl = item;
          }

          var badge = document.createElement('div');
          badge.className = 'universe-node-badge';
          badge.textContent = String(index + 1);
          item.appendChild(badge);

          var cardContent = document.createElement('div');

          var headerRow = document.createElement('div');
          headerRow.className = 'universe-card-header';
          var title = document.createElement('div');
          title.className = 'universe-card-title';
          title.textContent = st.name;
          headerRow.appendChild(title);

          if (highlightId && st.id === highlightId) {
            var currPill = document.createElement('span');
            currPill.className = 'universe-current-pill';
            currPill.textContent = '你在此站';
            headerRow.appendChild(currPill);
          }
          cardContent.appendChild(headerRow);

          var meta = document.createElement('div');
          meta.className = 'universe-card-meta';
          meta.textContent = (st.time_label || '') + ' · ' + (st.place || '') + ' (' + (st.age_label || '') + ')';
          cardContent.appendChild(meta);

          if (st.theme) {
            var theme = document.createElement('div');
            theme.className = 'universe-card-theme';
            theme.textContent = st.theme;
            cardContent.appendChild(theme);
          }

          var quoteId = (st.quote_ids && st.quote_ids[0]) || '';
          if (quoteId) {
            var qObj = Data.getQuoteById(quoteId);
            if (qObj && qObj.text) {
              var qEl = document.createElement('div');
              qEl.className = 'universe-card-quote';
              qEl.textContent = '“' + qObj.text + '”';
              cardContent.appendChild(qEl);
            }
          }

          var arrow = document.createElement('div');
          arrow.className = 'universe-card-arrow';
          arrow.textContent = '查看站点详情 →';
          cardContent.appendChild(arrow);

          var card = UI.createInkCard(cardContent, true, function () {
            var c = document.getElementById('view-container');
            if (c) lastUniverseScrollTop = c.scrollTop;
            Router.navigate('station', { station_id: st.id });
          });
          card.classList.add('universe-node-card');
          item.appendChild(card);
          riverTimeline.appendChild(item);
        })(stations[i], i);
      }

      wrap.appendChild(riverTimeline);

      setTimeout(function () {
        var container = document.getElementById('view-container');
        if (!container) return;
        if (params.highlight_station_id && targetStationEl) {
          targetStationEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (lastUniverseScrollTop > 0) {
          container.scrollTop = lastUniverseScrollTop;
        }
      }, 50);

      return wrap;
    }
  });

  // 5. 站点详情视图 Station (多维史料、故事、代表作、启发与小行动)
  Router.register('station', {
    render: function (params) {
      params = params || {};
      var station = params.station_id ? Data.getStationById(params.station_id) : (Data.stations ? Data.stations[0] : null);

      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper station-detail-container';

      if (!station) {
        wrap.appendChild(UI.createEmptyState('这一页暂时被江雾遮住了', '未找到该站点记录，不妨回到宇宙生命线重新探索。', '返回生命线', function () {
          Router.navigate('universe');
        }));
        return wrap;
      }

      // 站点头部卡片
      var headerCard = document.createElement('div');
      headerCard.className = 'ink-card result-hero-card';

      var badge = document.createElement('div');
      badge.className = 'result-moment-badge';
      badge.textContent = '苏轼人生 · 第 ' + (station.order || 1) + ' 站';
      headerCard.appendChild(badge);

      var title = document.createElement('h1');
      title.className = 'result-station-name';
      title.textContent = station.name;
      headerCard.appendChild(title);

      var meta = document.createElement('div');
      meta.className = 'result-station-meta';
      meta.textContent = (station.time_label || '') + ' · ' + (station.place || '') + ' (' + (station.age_label || '') + ')';
      headerCard.appendChild(meta);

      if (station.keywords && station.keywords.length > 0) {
        headerCard.appendChild(UI.createTagGroup(station.keywords));
      }

      var themeText = document.createElement('div');
      themeText.className = 'result-hero-guide';
      themeText.textContent = '“' + (station.theme || '') + '”';
      headerCard.appendChild(themeText);
      wrap.appendChild(headerCard);

      // 史实背景卡片
      var factCard = document.createElement('div');
      factCard.className = 'ink-card';
      var fBadge = document.createElement('div');
      fBadge.className = 'result-card-badge';
      fBadge.textContent = '真实史实 · 当时发生了什么';
      var fTitle = document.createElement('h3');
      fTitle.className = 'result-card-title';
      fTitle.textContent = '历史现场';
      var fBody = document.createElement('p');
      fBody.className = 'result-card-body';
      fBody.textContent = station.summary_fact;
      factCard.appendChild(fBadge);
      factCard.appendChild(fTitle);
      factCard.appendChild(fBody);
      wrap.appendChild(factCard);

      // 生活实录卡片
      var storyCard = document.createElement('div');
      storyCard.className = 'ink-card';
      var sBadge = document.createElement('div');
      sBadge.className = 'result-card-badge';
      sBadge.textContent = '生活实录 · 他如何度过';
      var sTitle = document.createElement('h3');
      sTitle.className = 'result-card-title';
      sTitle.textContent = '日常践行';
      var sBody = document.createElement('p');
      sBody.className = 'result-card-body';
      sBody.textContent = station.summary_story;
      storyCard.appendChild(sBadge);
      storyCard.appendChild(sTitle);
      storyCard.appendChild(sBody);
      wrap.appendChild(storyCard);

      // 代表诗词与名作卡片
      var quoteId = (station.quote_ids && station.quote_ids[0]) || '';
      if (quoteId) {
        var quoteObj = Data.getQuoteById(quoteId);
        if (quoteObj) {
          var workObj = quoteObj.work_id ? Data.getWorkById(quoteObj.work_id) : null;
          var wTitle = workObj ? ('《' + workObj.title + '》') : '《东坡诗选》';
          var qCard = document.createElement('div');
          qCard.className = 'ink-card';
          var qBadge = document.createElement('div');
          qBadge.className = 'result-card-badge';
          qBadge.textContent = '代表名作与诗句';
          qCard.appendChild(qBadge);
          qCard.appendChild(UI.createQuoteBlock(quoteObj.text, wTitle));
          if (workObj && workObj.creation_context) {
            var qContext = document.createElement('div');
            qContext.className = 'result-quote-context';
            qContext.textContent = '背景：' + workObj.creation_context;
            qCard.appendChild(qContext);
          }
          wrap.appendChild(qCard);
        }
      }

      // 东坡生活视角
      if (station.dongpo_view) {
        var sayingCard = document.createElement('div');
        sayingCard.className = 'ink-card result-saying-card';
        var sayBadge = document.createElement('div');
        sayBadge.className = 'result-card-badge';
        sayBadge.textContent = '现代启发';
        var sayTitle = document.createElement('h3');
        sayTitle.className = 'result-card-title';
        sayTitle.textContent = '东坡式理解';
        var sayBody = document.createElement('p');
        sayBody.className = 'result-card-body';
        sayBody.textContent = station.dongpo_view;
        sayingCard.appendChild(sayBadge);
        sayingCard.appendChild(sayTitle);
        sayingCard.appendChild(sayBody);
        wrap.appendChild(sayingCard);
      }

      // 今日小行动
      if (station.today_action) {
        var actCard = document.createElement('div');
        actCard.className = 'ink-card result-action-card';
        var actBadge = document.createElement('div');
        actBadge.className = 'result-card-badge';
        actBadge.textContent = '日常践行';
        var actTitle = document.createElement('h3');
        actTitle.className = 'result-card-title';
        actTitle.textContent = '今天做一件小事';
        var actBody = document.createElement('p');
        actBody.className = 'result-card-body';
        actBody.textContent = station.today_action;
        actCard.appendChild(actBadge);
        actCard.appendChild(actTitle);
        actCard.appendChild(actBody);
        wrap.appendChild(actCard);
      }

      // 底部多向操作区
      var actions = document.createElement('div');
      actions.className = 'result-actions';

      var btnCard = UI.createPrimaryButton('生成本站东坡人生卡', function () {
        Router.navigate('share-card', { station_id: station.id, type: 'station' });
      });
      var btnUniv = UI.createSecondaryButton('返回人生宇宙漫游', function () {
        Router.navigate('universe', { highlight_station_id: station.id });
      });
      var btnQuiz = UI.createSecondaryButton('测测我的人生正在哪一站', function () {
        Router.navigate('quiz');
      });

      actions.appendChild(btnCard);
      actions.appendChild(btnUniv);
      actions.appendChild(btnQuiz);
      wrap.appendChild(actions);

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

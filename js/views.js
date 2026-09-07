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
      quizCard.classList.add('home-nav-card', 'nav-quiz', 'ink-card-station');
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
      univCard.classList.add('home-nav-card', 'nav-universe', 'ink-card-narrative');
      navList.appendChild(univCard);

      // 路径 3: 坐一会 (消费统一 Daily 稳定映射结果)
      var todayDaily = SuShiUniverse.Daily ? SuShiUniverse.Daily.getTodayItem() : null;
      var todayQuoteText = (todayDaily && todayDaily.quote && todayDaily.quote.text) || '莫听穿林打叶声，何妨吟啸且徐行。';
      var todayDongpoView = (todayDaily && todayDaily.dongpo_view) || '每天一言一事，给自己十分钟的从容。';

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

      var dQuote = document.createElement('div');
      dQuote.className = 'home-daily-quote';
      dQuote.textContent = '「' + todayQuoteText + '」';

      var dGuide = document.createElement('div');
      dGuide.className = 'home-daily-guide';
      dGuide.textContent = todayDongpoView;

      var dHint = document.createElement('div');
      dHint.className = 'home-daily-action-hint';
      dHint.textContent = '坐一会儿 →';

      dailyCardContent.appendChild(dHeader);
      dailyCardContent.appendChild(dQuote);
      dailyCardContent.appendChild(dGuide);
      dailyCardContent.appendChild(dHint);

      var dailyCard = UI.createInkCard(dailyCardContent, true, function () {
        Router.navigate('daily');
      });
      dailyCard.classList.add('home-nav-card', 'nav-daily', 'ink-card-daily');
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

        // 题目卡片 (四大语义卡片：叙事解读卡)
        var qCard = document.createElement('div');
        qCard.className = 'quiz-question-card ink-card-narrative';
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
      wrap.setAttribute('data-station-id', station.id || 'station_huangzhou');

      // --- 第 1 层：你到了哪里？ (结果揭晓卡) ---
      var heroCard = document.createElement('div');
      heroCard.className = 'ink-card ink-card-station result-hero-card';

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
      factCard.className = 'ink-card ink-card-narrative';
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
      quoteCard.className = 'ink-card ink-card-poem';
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
      storyCard.className = 'ink-card ink-card-narrative';
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
      sayingCard.className = 'ink-card ink-card-narrative result-saying-card';
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
      actionCard.className = 'ink-card ink-card-daily result-action-card';
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
          card.classList.add('universe-node-card', 'ink-card-station');
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

      // 代表诗词与名作卡片（支持点击穿透进入作品体验）
      var quoteId = (station.quote_ids && station.quote_ids[0]) || '';
      if (quoteId) {
        var quoteObj = Data.getQuoteById(quoteId);
        if (quoteObj) {
          var workObj = quoteObj.work_id ? Data.getWorkById(quoteObj.work_id) : null;
          var wTitle = workObj ? ('《' + workObj.title + '》') : '《东坡诗选》';
          var qCard = document.createElement('div');
          qCard.className = workObj ? 'ink-card station-work-clickable' : 'ink-card';
          var qBadge = document.createElement('div');
          qBadge.className = 'result-card-badge';
          qBadge.textContent = '代表名作与诗句';
          qCard.appendChild(qBadge);
          qCard.appendChild(UI.createQuoteBlock(quoteObj.text, wTitle));
          if (workObj && (workObj.lead_guide || workObj.creation_context)) {
            var qContext = document.createElement('div');
            qContext.className = 'result-quote-context';
            qContext.textContent = '背景导语：' + (workObj.lead_guide || workObj.creation_context);
            qCard.appendChild(qContext);
          }
          if (workObj) {
            var hint = document.createElement('div');
            hint.className = 'station-work-more-hint';
            hint.textContent = '进入阅读诗词全文与人生现场 →';
            qCard.appendChild(hint);
            (function (targetWorkId, currentStationId) {
              qCard.addEventListener('click', function () {
                Router.navigate('work', { work_id: targetWorkId, from_station_id: currentStationId });
              });
            })(workObj.id, station.id);
          }
          wrap.appendChild(qCard);
        }
      }

      // 如果本站还有其他收录作品，展示作品导航流
      var stationWorkIds = station.work_ids || [];
      if (stationWorkIds.length > 1) {
        var otherWorksCard = document.createElement('div');
        otherWorksCard.className = 'ink-card';
        var owBadge = document.createElement('div');
        owBadge.className = 'result-card-badge';
        owBadge.textContent = '本站收录诗文 (' + stationWorkIds.length + '篇)';
        otherWorksCard.appendChild(owBadge);

        var owList = document.createElement('div');
        owList.style.display = 'flex';
        owList.style.flexWrap = 'wrap';
        owList.style.marginTop = '8px';

        for (var wIdx = 0; wIdx < stationWorkIds.length; wIdx++) {
          var otherWork = Data.getWorkById(stationWorkIds[wIdx]);
          if (otherWork) {
            var wChip = document.createElement('div');
            wChip.className = 'work-station-badge';
            wChip.style.marginRight = '8px';
            wChip.style.marginBottom = '8px';
            if (otherWork.spatial_note) {
              wChip.textContent = '《' + otherWork.title + '》 (' + otherWork.spatial_note + ')';
            } else {
              wChip.textContent = '《' + otherWork.title + '》';
            }
            (function (owId, currentStationId) {
              wChip.addEventListener('click', function () {
                Router.navigate('work', { work_id: owId, from_station_id: currentStationId });
              });
            })(otherWork.id, station.id);
            owList.appendChild(wChip);
          }
        }
        otherWorksCard.appendChild(owList);
        wrap.appendChild(otherWorksCard);
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

      // 元数据芯片：时间、地点、站点
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

      if (stationObj) {
        var stBadge = document.createElement('span');
        stBadge.className = 'work-station-badge';
        var stationLabel = '所属站点：' + stationObj.name;
        if (work.spatial_note) {
          stationLabel += ' (' + work.spatial_note + ')';
        }
        stBadge.textContent = stationLabel + ' →';
        (function (sid) {
          stBadge.addEventListener('click', function () {
            Router.navigate('station', { station_id: sid });
          });
        })(stationObj.id);
        metaChips.appendChild(stBadge);
      }

      headerHero.appendChild(metaChips);

      if (work.lead_guide) {
        var guideEl = document.createElement('div');
        guideEl.className = 'work-lead-guide';
        guideEl.textContent = work.lead_guide;
        headerHero.appendChild(guideEl);
      }

      wrap.appendChild(headerHero);

      // --- 4.2 第一幕：人生背景（苏轼当时在哪里、经历什么）---
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

      // --- 4.3 第二幕：代表名句与诗词全文（带展开/折叠）---
      if (work.lead_quote) {
        var quoteBox = document.createElement('div');
        quoteBox.className = 'work-quote-feature ink-card-poem';
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

      var btnUniv = UI.createSecondaryButton('漫游苏轼人生生命线', function () {
        Router.navigate('universe', stationObj ? { highlight_station_id: stationObj.id } : {});
      });
      var btnQuiz = UI.createSecondaryButton('测测我的人生正在哪一站', function () {
        Router.navigate('quiz');
      });

      actBox.appendChild(btnUniv);
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
      wrap.className = 'view-wrapper daily-container';

      if (!dailyBundle) {
        wrap.appendChild(UI.createEmptyState('今日诗笺正在运送途中', '东坡正在江上小舟漫步，请稍后刷新或返回首页。', '返回首页', function () {
          Router.navigate('home');
        }));
        return wrap;
      }

      // --- 第 1 层：日期印章标头与核心名句书法卡片 ---
      var dateHeader = document.createElement('div');
      dateHeader.className = 'daily-date-header';

      var dateText = document.createElement('div');
      dateText.className = 'daily-date-text';
      dateText.textContent = dailyBundle.date_display;

      var stampBadge = document.createElement('div');
      stampBadge.className = 'daily-stamp';
      stampBadge.textContent = '东坡诗签';

      dateHeader.appendChild(dateText);
      dateHeader.appendChild(stampBadge);
      wrap.appendChild(dateHeader);

      // 书法名句卡片 (四大语义卡片：今日东坡每日签)
      var quoteCard = document.createElement('div');
      quoteCard.className = 'daily-quote-card ink-card-daily';

      var sealStamp = document.createElement('div');
      sealStamp.className = 'daily-seal-stamp';
      sealStamp.textContent = '东坡\n小笺';
      quoteCard.appendChild(sealStamp);

      var qMark1 = document.createElement('div');
      qMark1.className = 'work-quote-mark';
      qMark1.textContent = '“';

      var qText = document.createElement('div');
      qText.className = 'daily-quote-text';
      qText.textContent = (dailyBundle.quote && dailyBundle.quote.text) || '莫听穿林打叶声，何妨吟啸且徐行。';

      var qMark2 = document.createElement('div');
      qMark2.className = 'work-quote-mark';
      qMark2.textContent = '”';

      quoteCard.appendChild(qMark1);
      quoteCard.appendChild(qText);
      quoteCard.appendChild(qMark2);

      // 作品出处与站点归属芯片
      var srcRow = document.createElement('div');
      srcRow.className = 'daily-source-row';

      if (dailyBundle.work) {
        var wChip = document.createElement('span');
        wChip.className = 'daily-work-chip';
        wChip.textContent = '《' + dailyBundle.work.title + '》 →';
        (function (wid, sid) {
          wChip.addEventListener('click', function () {
            Router.navigate('work', { work_id: wid, from_station_id: sid });
          });
        })(dailyBundle.work.id, dailyBundle.station ? dailyBundle.station.id : '');
        srcRow.appendChild(wChip);
      }

      if (dailyBundle.station) {
        var stChip = document.createElement('span');
        stChip.className = 'daily-station-chip';
        stChip.textContent = dailyBundle.station.name + ' →';
        (function (sid) {
          stChip.addEventListener('click', function () {
            Router.navigate('station', { station_id: sid });
          });
        })(dailyBundle.station.id);
        srcRow.appendChild(stChip);
      }

      quoteCard.appendChild(srcRow);

      // 标签流
      if (dailyBundle.tags && dailyBundle.tags.length > 0) {
        var tagBox = document.createElement('div');
        tagBox.className = 'daily-tag-list';
        for (var t = 0; t < dailyBundle.tags.length; t++) {
          var tEl = document.createElement('span');
          tEl.className = 'daily-tag';
          tEl.textContent = '#' + dailyBundle.tags[t];
          tagBox.appendChild(tEl);
        }
        quoteCard.appendChild(tagBox);
      }

      wrap.appendChild(quoteCard);

      // --- 第 2 层：一段真实生活背景 ---
      var factCard = document.createElement('div');
      factCard.className = 'work-narrative-card';
      var factBadge = document.createElement('div');
      factBadge.className = 'work-narrative-badge';
      factBadge.textContent = '第一幕 · 真实生活现场';
      var factTitle = document.createElement('h3');
      factTitle.className = 'work-narrative-title';
      factTitle.textContent = '苏轼当时面对着什么？';
      var factBody = document.createElement('p');
      factBody.className = 'work-narrative-body';
      factBody.textContent = dailyBundle.fact_text;

      factCard.appendChild(factBadge);
      factCard.appendChild(factTitle);
      factCard.appendChild(factBody);
      wrap.appendChild(factCard);

      // --- 第 3 层：一句东坡式理解 ---
      var viewCard = document.createElement('div');
      viewCard.className = 'work-narrative-card work-modern-card';
      var viewBadge = document.createElement('div');
      viewBadge.className = 'work-narrative-badge';
      viewBadge.textContent = '第二幕 · 放到今天';
      var viewTitle = document.createElement('h3');
      viewTitle.className = 'work-narrative-title';
      viewTitle.textContent = '在今天可以怎样理解？';
      var viewBody = document.createElement('p');
      viewBody.className = 'work-narrative-body';
      viewBody.textContent = dailyBundle.dongpo_view;

      var viewDisclaimer = document.createElement('div');
      viewDisclaimer.className = 'work-modern-disclaimer';
      viewDisclaimer.textContent = '* 本解读为苏轼宇宙当代生活启发，围绕面对不可控、接受绕路与安顿日常展开，非古人原话。';

      viewCard.appendChild(viewBadge);
      viewCard.appendChild(viewTitle);
      viewCard.appendChild(viewBody);
      viewCard.appendChild(viewDisclaimer);
      wrap.appendChild(viewCard);

      // --- 第 4 层：一个今日小行动 ---
      var actionCard = document.createElement('div');
      actionCard.className = 'ink-card result-action-card';
      var actBadge = document.createElement('div');
      actBadge.className = 'result-card-badge';
      actBadge.textContent = '第三幕 · 今天只做一件小事';
      var actTitle = document.createElement('h3');
      actTitle.className = 'result-card-title';
      actTitle.textContent = '微小而确定的行动';
      var actBody = document.createElement('p');
      actBody.className = 'result-card-body';
      actBody.textContent = dailyBundle.today_action;

      actionCard.appendChild(actBadge);
      actionCard.appendChild(actTitle);
      actionCard.appendChild(actBody);
      wrap.appendChild(actionCard);

      // --- 底部多向操作区 ---
      var actBox = document.createElement('div');
      actBox.className = 'result-actions';

      var btnSign = UI.createPrimaryButton('生成今日东坡签', function () {
        Router.navigate('share-card', {
          type: 'daily',
          daily_id: dailyBundle.id,
          date_str: dailyBundle.date_str
        });
      });
      actBox.appendChild(btnSign);

      if (dailyBundle.station) {
        var btnStation = UI.createSecondaryButton('前往本诗所在站点（' + dailyBundle.station.short_name + '）', function () {
          Router.navigate('station', { station_id: dailyBundle.station.id });
        });
        actBox.appendChild(btnStation);
      }

      var btnUniv = UI.createSecondaryButton('漫游苏轼人生宇宙', function () {
        Router.navigate('universe', dailyBundle.station ? { highlight_station_id: dailyBundle.station.id } : {});
      });
      var btnHome = UI.createSecondaryButton('返回首页', function () {
        Router.navigate('home');
      });

      actBox.appendChild(btnUniv);
      actBox.appendChild(btnHome);
      wrap.appendChild(actBox);

      return wrap;
    }
  });

  // 8. 分享卡预览视图 Share-Card (Canvas 2D 动态生成与三类卡片切换)
  Router.register('share-card', {
    render: function (params) {
      params = params || {};
      var CardCanvas = SuShiUniverse.CardCanvas;
      var Quiz = SuShiUniverse.Quiz;
      var Daily = SuShiUniverse.Daily;
      var Store = SuShiUniverse.Store;

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

      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper share-card-container';

      wrap.appendChild(UI.createSectionHeader('东坡人生分享卡', '纯本地 Canvas 2D 高清绘制 · 随行诗意安顿日常'));

      // --- Tab 切换条 ---
      var tabNav = document.createElement('div');
      tabNav.className = 'share-tabs-nav';

      var tabsConfig = [
        { type: 'station', label: '人生站点卡' },
        { type: 'daily', label: '今日东坡签' },
        { type: 'node', label: '人生节点卡' }
      ];

      var tabButtons = {};

      tabsConfig.forEach(function (tab) {
        var btn = document.createElement('button');
        btn.className = 'share-tab-btn' + (tab.type === currentType ? ' active' : '');
        btn.textContent = tab.label;
        btn.setAttribute('type', 'button');
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', tab.type === currentType ? 'true' : 'false');

        btn.addEventListener('click', function () {
          if (currentType === tab.type) return;
          currentType = tab.type;

          // 更新 Tab 样式
          tabsConfig.forEach(function (t) {
            if (tabButtons[t.type]) {
              if (t.type === currentType) {
                tabButtons[t.type].classList.add('active');
                tabButtons[t.type].setAttribute('aria-selected', 'true');
              } else {
                tabButtons[t.type].classList.remove('active');
                tabButtons[t.type].setAttribute('aria-selected', 'false');
              }
            }
          });

          renderCardImage();
        });

        tabButtons[tab.type] = btn;
        tabNav.appendChild(btn);
      });

      wrap.appendChild(tabNav);

      // --- 卡片预览展示区 ---
      var displayBox = document.createElement('div');
      displayBox.className = 'share-card-display';

      var imgWrap = document.createElement('div');
      imgWrap.className = 'share-card-img-wrap';

      var loadingEl = document.createElement('div');
      loadingEl.className = 'share-card-loading';
      loadingEl.textContent = '正在水墨泼染卡片…';
      imgWrap.appendChild(loadingEl);

      var imgEl = document.createElement('img');
      imgEl.className = 'share-card-img';
      imgEl.alt = '东坡人生分享卡';
      imgEl.style.display = 'none';
      imgWrap.appendChild(imgEl);

      displayBox.appendChild(imgWrap);

      var hintEl = document.createElement('p');
      hintEl.className = 'share-card-hint';
      hintEl.textContent = '长按图片可直接保存到相册，或使用下方操作按钮';
      displayBox.appendChild(hintEl);

      wrap.appendChild(displayBox);

      // --- 核心绘制与刷新函数 ---
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
            imgEl.onload = function () {
              loadingEl.style.display = 'none';
              imgEl.style.display = 'block';
            };
          });
        } else {
          loadingEl.textContent = '生成模块暂未就绪';
        }
      }

      var currentVm = null;

      // 初次挂载自动渲染
      renderCardImage();

      // --- 底部操作按钮群 (传播闭环双主链) ---
      var actBox = document.createElement('div');
      actBox.className = 'share-card-actions';

      // 1. 一键发布到小红书 (核心主按钮)
      var btnPublish = UI.createPrimaryButton('一键发布到小红书', function () {
        if (!currentDataUrl) {
          if (UI && typeof UI.showToast === 'function') {
            UI.showToast('卡片正在水墨泼染，请稍候…');
          }
          return;
        }

        var Bridge = SuShiUniverse.Bridge;
        if (!Bridge || typeof Bridge.postNote !== 'function') {
          if (UI && typeof UI.showToast === 'function') {
            UI.showToast('发布能力暂未就绪');
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
        btnPublish.textContent = '正在调起小红书发布器…';

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
              UI.showToast('已成功调起小红书发布！');
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
              UI.showToast('调起发布异常，请长按图片手动发布');
            }
          }
        }).then(function () {
          // 无论成功或失败，必定恢复按钮状态
          btnPublish.disabled = false;
          btnPublish.textContent = '一键发布到小红书';
        });
      });
      actBox.appendChild(btnPublish);

      // 2. 保存卡片至相册 (次主按钮)
      var btnSave = UI.createSecondaryButton('保存卡片至相册', function () {
        if (!currentDataUrl) {
          if (UI && typeof UI.showToast === 'function') {
            UI.showToast('卡片正在生成，请稍候…');
          }
          return;
        }

        var Bridge = SuShiUniverse.Bridge;
        if (!Bridge || typeof Bridge.saveImage !== 'function') {
          if (UI && typeof UI.showToast === 'function') {
            UI.showToast('长按图片即可直接保存至手机相册');
          }
          return;
        }

        btnSave.disabled = true;
        btnSave.textContent = '正在保存至相册…';

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
              UI.showToast('已成功保存至手机相册！');
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
              UI.showToast('保存失败，您可长按图片直接存储');
            }
          }
        }).then(function () {
          btnSave.disabled = false;
          btnSave.textContent = '保存卡片至相册';
        });
      });
      actBox.appendChild(btnSave);

      // 3. 辅助跳转按钮组
      var btnUniv = UI.createSecondaryButton('漫游苏轼人生宇宙', function () {
        Router.navigate('universe', { highlight_station_id: currentStationId });
      });
      actBox.appendChild(btnUniv);

      var btnQuiz = UI.createSecondaryButton('测测我的人生状态', function () {
        Router.navigate('quiz');
      });
      actBox.appendChild(btnQuiz);

      var btnHome = UI.createSecondaryButton('返回首页', function () {
        Router.navigate('home');
      });
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

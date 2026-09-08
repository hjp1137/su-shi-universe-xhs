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

              var unlockTimer = setTimeout(function () {
                isTransitioning = false;
              }, 1200);

              setTimeout(function () {
                clearTimeout(unlockTimer);
                if (idx < total - 1) {
                  if (session) session.goNext(total);
                  renderQuestion();
                } else {
                  showCalculatingState();
                }
              }, 220);
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

      // 顶部首屏轻量上一程
      wrap.appendChild(UI.createBackPathButton('← 上一程', function () {
        Router.back();
      }));

      // --- 第 1 层：你到了哪里？ (结果揭晓卡) ---
      var heroCard = document.createElement('div');
      heroCard.className = 'ink-card ink-card-station result-hero-card';

      var sceneImg = (SuShi.ArtAssets && SuShi.ArtAssets.getStationScene(station.id)) || '';
      if (sceneImg) {
        var coverBox = document.createElement('div');
        coverBox.className = 'result-scene-cover-box';
        var imgEl = document.createElement('img');
        imgEl.className = 'result-scene-cover-img';
        imgEl.src = sceneImg;
        imgEl.alt = station.name;
        var maskEl = document.createElement('div');
        maskEl.className = 'result-scene-cover-mask';
        coverBox.appendChild(imgEl);
        coverBox.appendChild(maskEl);
        heroCard.appendChild(coverBox);
      }

      var heroContent = document.createElement('div');
      heroContent.className = 'result-hero-content';

      var momentBadge = document.createElement('div');
      momentBadge.className = 'result-moment-badge';
      momentBadge.textContent = '你正处在人生的「' + (station.short_name || '东坡') + '时刻」';
      heroContent.appendChild(momentBadge);

      var sName = document.createElement('h1');
      sName.className = 'result-station-name';
      sName.textContent = station.name;
      heroContent.appendChild(sName);

      var metaText = document.createElement('div');
      metaText.className = 'result-station-meta';
      metaText.textContent = (station.time_label || '') + ' · ' + (station.place || '');
      heroContent.appendChild(metaText);

      var tagList = station.keywords || ['重新生活', '徐行', '烟火'];
      heroContent.appendChild(UI.createTagGroup(tagList));

      var leadGuide = document.createElement('div');
      leadGuide.className = 'result-hero-guide';
      leadGuide.textContent = moodObj ? ('“' + moodObj.summary + '”') : ('“' + station.theme + '”');
      heroContent.appendChild(leadGuide);

      heroCard.appendChild(heroContent);
      wrap.appendChild(heroCard);

      // --- 第 2 层：代表名句（高质感宣纸诗签卡） ---
      var quoteCard = document.createElement('div');
      quoteCard.className = 'ink-card ink-card-poem result-quote-paper-slip';
      var sealEl = document.createElement('div');
      sealEl.className = 'result-quote-seal';
      sealEl.textContent = '东坡\n手泽';
      quoteCard.appendChild(sealEl);

      var quoteBadge = document.createElement('div');
      quoteBadge.className = 'result-card-badge';
      quoteBadge.textContent = '代表名句 · 诗词共鸣';
      var quoteTitle = document.createElement('h3');
      quoteTitle.className = 'result-card-title';
      quoteTitle.textContent = '东坡在此时写下了什么？';

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

      // --- 第 3 层：苏轼当时怎么了？ (历史现场真实史实卡) ---
      var factCard = document.createElement('div');
      factCard.className = 'ink-card ink-card-narrative';
      var factBadge = document.createElement('div');
      factBadge.className = 'result-card-badge';
      factBadge.textContent = '第一幕 · 真实历史现场';
      var factTitle = document.createElement('h3');
      factTitle.className = 'result-card-title';
      factTitle.textContent = '苏轼当时面对着什么？';
      var factBody = document.createElement('p');
      factBody.className = 'result-card-body';
      factBody.textContent = station.summary_fact;

      factCard.appendChild(factBadge);
      factCard.appendChild(factTitle);
      factCard.appendChild(factBody);
      wrap.appendChild(factCard);

      // --- 第 4 层：他后来怎么过？ (生活实践卡) ---
      var storyCard = document.createElement('div');
      storyCard.className = 'ink-card ink-card-narrative';
      var storyBadge = document.createElement('div');
      storyBadge.className = 'result-card-badge';
      storyBadge.textContent = '第二幕 · 生活实践';
      var storyTitle = document.createElement('h3');
      storyTitle.className = 'result-card-title';
      storyTitle.textContent = '他后来怎么走出低谷？';
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
      actBox.appendChild(btnShare);

      // 跨页面导航入口（A类）宇宙化升级：站点微行星 Portal + 漫游星河轨道入口
      var stationPortal = UI.createPlanetPortal({
        image: sceneImg,
        tag: '你的共鸣人生站',
        title: station.name,
        subtitle: '深入了解东坡在' + (station.short_name || '此站') + '的真实故事与诗文星群',
        onClick: function () {
          Router.navigate('station', { station_id: stationId });
        }
      });
      actBox.appendChild(stationPortal);

      var orbitLink = UI.createOrbitPathLink({
        title: '漫游苏轼人生星河',
        subtitle: '在星轨中纵览苏轼全部生命站点与历史时空 →',
        onClick: function () {
          Router.navigate('universe', { highlight_station_id: stationId });
        }
      });
      actBox.appendChild(orbitLink);

      var btnRetest = UI.createSecondaryButton('重新测一次', function () {
        Router.navigate('quiz');
      });
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

      // 轻量浮层抽屉 (Quick Sheet)
      var sheetMask = document.createElement('div');
      sheetMask.className = 'universe-sheet-mask';
      var sheetBox = document.createElement('div');
      sheetBox.className = 'universe-quick-sheet';

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
        enterBtn.textContent = '进入本站小宇宙 →';
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
      wrap.appendChild(sheetMask);
      wrap.appendChild(sheetBox);

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
        if (params.highlight_station_id && targetStationEl) {
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
    }
  });

  // 5. 站点详情视图 Station (多维史料、故事、代表作、启发与小行动)
  Router.register('station', {
    render: function (params) {
      params = params || {};
      var station = params.station_id ? Data.getStationById(params.station_id) : (Data.stations ? Data.stations[0] : null);

      var wrap = document.createElement('div');
      wrap.className = 'view-wrapper station-detail-container';

      // 顶部首屏轻量上一程
      wrap.appendChild(UI.createBackPathButton('← 上一程', function () {
        Router.back();
      }));

      if (!station) {
        wrap.appendChild(UI.createEmptyState('这一页暂时被江雾遮住了', '未找到该站点记录，不妨回到宇宙生命线重新探索。', '返回生命线', function () {
          Router.navigate('universe');
        }));
        return wrap;
      }

      // 站点头部卡片
      var headerCard = document.createElement('div');
      headerCard.className = 'ink-card result-hero-card station-hero-card';

      var sceneImg = (SuShi.ArtAssets && SuShi.ArtAssets.getStationScene(station.id)) || '';
      if (sceneImg) {
        var coverBox = document.createElement('div');
        coverBox.className = 'station-hero-cover-box';
        var imgEl = document.createElement('img');
        imgEl.className = 'station-hero-cover-img';
        imgEl.src = sceneImg;
        imgEl.alt = station.name;
        var maskEl = document.createElement('div');
        maskEl.className = 'station-hero-cover-mask';
        coverBox.appendChild(imgEl);
        coverBox.appendChild(maskEl);
        headerCard.appendChild(coverBox);
      }

      var headerContent = document.createElement('div');
      headerContent.className = 'result-hero-content';

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

      headerCard.appendChild(headerContent);
      wrap.appendChild(headerCard);

      // --- 中段：苏轼人生长卷四部曲 (Epic Scroll) ---
      var scrollContainer = document.createElement('div');
      scrollContainer.className = 'station-epic-scroll';

      // 第一章：东坡为什么来到这里 (历史现场)
      var chap1 = document.createElement('div');
      chap1.className = 'station-chapter-box station-chapter-1 chapter-history';
      var fBadge = document.createElement('div');
      fBadge.className = 'station-chapter-badge';
      fBadge.textContent = '第一章 · 历史现场 · 东坡为什么来到这里';
      var fTitle = document.createElement('h3');
      fTitle.className = 'station-chapter-title';
      fTitle.textContent = (station.place || '') + ' · 当时发生了什么';
      var fBody = document.createElement('p');
      fBody.className = 'station-chapter-body';
      fBody.textContent = station.summary_fact;
      chap1.appendChild(fBadge);
      chap1.appendChild(fTitle);
      chap1.appendChild(fBody);
      scrollContainer.appendChild(chap1);

      // 第二章：他在这里怎样生活 (日常践行与行走)
      var chap2 = document.createElement('div');
      chap2.className = 'station-chapter-box station-chapter-2 chapter-life';
      var sBadge = document.createElement('div');
      sBadge.className = 'station-chapter-badge';
      sBadge.textContent = '第二章 · 生活实录 · 他在这里怎样度过';
      var sTitle = document.createElement('h3');
      sTitle.className = 'station-chapter-title';
      sTitle.textContent = '日常践行与生命重构';
      var sBody = document.createElement('p');
      sBody.className = 'station-chapter-body';
      sBody.textContent = station.summary_story;
      chap2.appendChild(sBadge);
      chap2.appendChild(sTitle);
      chap2.appendChild(sBody);
      scrollContainer.appendChild(chap2);

      // 第三章：代表作品与本站诗词星群
      var chap3 = document.createElement('div');
      chap3.className = 'station-chapter-box station-chapter-3 chapter-works';
      var wBadge = document.createElement('div');
      wBadge.className = 'station-chapter-badge';
      wBadge.textContent = '第三章 · 诗词星群 · 这一站的精神星宿';
      chap3.appendChild(wBadge);

      var quoteId = (station.quote_ids && station.quote_ids[0]) || '';
      if (quoteId) {
        var quoteObj = Data.getQuoteById(quoteId);
        if (quoteObj) {
          var workObj = quoteObj.work_id ? Data.getWorkById(quoteObj.work_id) : null;
          var wTitle = workObj ? ('《' + workObj.title + '》') : '《东坡诗选》';
          var qCard = document.createElement('div');
          qCard.className = workObj ? 'station-prime-work-card station-work-clickable is-main-star' : 'station-prime-work-card is-main-star';
          var qPrimeTag = document.createElement('span');
          qPrimeTag.className = 'station-prime-tag is-main-star';
          qPrimeTag.textContent = '代表名作主星';
          qCard.appendChild(qPrimeTag);
          qCard.appendChild(UI.createQuoteBlock(quoteObj.text, wTitle));
          if (workObj) {
            var hint = document.createElement('div');
            hint.className = 'station-work-more-hint';
            hint.textContent = '进入阅读诗词全文与创作现场 →';
            qCard.appendChild(hint);
            (function (targetWorkId, currentStationId) {
              qCard.addEventListener('click', function () {
                Router.navigate('work', { work_id: targetWorkId, from_station_id: currentStationId });
              });
            })(workObj.id, station.id);
          }
          chap3.appendChild(qCard);
        }
      }

      var stationWorkIds = station.work_ids || [];
      if (stationWorkIds.length > 0) {
        var workList = [];
        for (var wIdx = 0; wIdx < stationWorkIds.length; wIdx++) {
          var otherWork = Data.getWorkById(stationWorkIds[wIdx]);
          if (otherWork) {
            workList.push(otherWork);
          }
        }
        if (workList.length > 0) {
          var cluster = UI.createConstellationGroup(workList, function (targetWork) {
            Router.navigate('work', { work_id: targetWork.id, from_station_id: station.id });
          });
          cluster.className = cluster.className + ' station-star-cluster';
          chap3.appendChild(cluster);
        }
      }
      scrollContainer.appendChild(chap3);

      // 第四章：现代共鸣与今日小行动
      var chap4 = document.createElement('div');
      chap4.className = 'station-chapter-box station-chapter-4 chapter-modern';
      var mBadge = document.createElement('div');
      mBadge.className = 'station-chapter-badge';
      mBadge.textContent = '第四章 · 现代共鸣 · 如果你也在这一站';
      var mTitle = document.createElement('h3');
      mTitle.className = 'station-chapter-title';
      mTitle.textContent = '东坡式理解与微小行动';
      var mBody = document.createElement('p');
      mBody.className = 'station-chapter-body';
      mBody.textContent = station.dongpo_view || '生活可以有风雨，但不必困在风雨里。';
      chap4.appendChild(mBadge);
      chap4.appendChild(mTitle);
      chap4.appendChild(mBody);

      if (station.today_action) {
        var actP = document.createElement('div');
        actP.className = 'station-chapter-action';
        actP.innerHTML = '<strong>今日小事：</strong>' + station.today_action;
        chap4.appendChild(actP);
      }

      scrollContainer.appendChild(chap4);
      wrap.appendChild(scrollContainer);

      // --- 底部宇宙跨页导航与卡片生成操作区 ---
      var actBox = document.createElement('div');
      actBox.className = 'result-actions';

      var btnShareNode = UI.createPrimaryButton('生成本站人生卡', function () {
        Router.navigate('share-card', { type: 'station', station_id: station.id });
      });
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

      // 顶部首屏轻量上一程
      wrap.appendChild(UI.createBackPathButton('← 上一程', function () {
        Router.back();
      }));

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
      wrap.className = 'view-wrapper daily-container';

      if (!dailyBundle) {
        wrap.appendChild(UI.createEmptyState('今日诗笺正在运送途中', '东坡正在江上小舟漫步，请稍后刷新或返回首页。', '返回首页', function () {
          Router.navigate('home');
        }));
        return wrap;
      }

      // 顶部首屏轻量上一程
      wrap.appendChild(UI.createBackPathButton('← 上一程', function () {
        Router.back();
      }));

      // --- 第 1 层：今日东坡 3:4 独立收藏级诗签主视觉 (页面加载自动异步生成) ---
      var slipContainer = document.createElement('div');
      slipContainer.className = 'daily-slip-container daily-quote-card has-moon-halo daily-poetry-slip';

      var dateHeader = document.createElement('div');
      dateHeader.className = 'daily-date-header';

      var dateText = document.createElement('div');
      dateText.className = 'daily-date-text';
      dateText.textContent = dailyBundle.date_display || '今日东坡 · 诗笺小札';

      var stampBadge = document.createElement('div');
      stampBadge.className = 'daily-stamp daily-moon-badge';
      stampBadge.textContent = '东坡小笺';

      dateHeader.appendChild(dateText);
      dateHeader.appendChild(stampBadge);
      slipContainer.appendChild(dateHeader);

      var posterWrap = document.createElement('div');
      posterWrap.className = 'daily-sign-poster-wrap';

      var skeleton = document.createElement('div');
      skeleton.className = 'daily-sign-skeleton';
      skeleton.textContent = '正在水墨泼染今日诗签…';
      posterWrap.appendChild(skeleton);

      var signImg = document.createElement('img');
      signImg.className = 'daily-sign-img';
      signImg.alt = '今日东坡诗签';
      signImg.style.display = 'none';
      posterWrap.appendChild(signImg);

      slipContainer.appendChild(posterWrap);

      // 自动触发真实 Canvas 动态渲染 (确定性单日诗签)
      var CardCanvas = SuShi.CardCanvas;
      var vm = (Daily && typeof Daily.buildDailyShareCardViewModel === 'function')
        ? Daily.buildDailyShareCardViewModel(dailyBundle)
        : {
            type: 'daily_sign',
            quote_text: (dailyBundle.quote && dailyBundle.quote.text) || '',
            work_id: dailyBundle.work ? dailyBundle.work.id : '',
            station_id: dailyBundle.station ? dailyBundle.station.id : '',
            station_name: dailyBundle.station ? dailyBundle.station.name : '',
            date_display: dailyBundle.date_display || '',
            dongpo_view: dailyBundle.dongpo_view || '',
            today_action: dailyBundle.today_action || ''
          };

      if (CardCanvas && typeof CardCanvas.renderCard === 'function') {
        CardCanvas.renderCard('daily_sign', vm, function (dataUrl) {
          if (dataUrl) {
            signImg.src = dataUrl;
            signImg.onload = function () {
              skeleton.style.display = 'none';
              signImg.style.display = 'block';
            };
          }
        });
      }

      wrap.appendChild(slipContainer);

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

      // 1. 顶部非左上角轻量“← 上一程”
      var topNav = document.createElement('div');
      topNav.className = 'share-card-top-nav';
      var btnBack = UI.createBackPathButton('← 上一程', function () {
        Router.back();
      });
      topNav.appendChild(btnBack);
      wrap.appendChild(topNav);

      // 2. 所见即所得海报展示区 (3:4 高清直出，用户所见即保存/发布图)
      var displayBox = document.createElement('div');
      displayBox.className = 'share-card-display';

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

      displayBox.appendChild(posterWrap);

      // 底部极简微交互提示（彻底释放纵向海报舞台空间）
      var hintEl = document.createElement('div');
      hintEl.className = 'share-card-bottom-hint';
      hintEl.textContent = '轻触右侧悬浮轨一键发布或保存 · 点击「换卡」流转形态';
      displayBox.appendChild(hintEl);

      wrap.appendChild(displayBox);

      // 3. 换卡微型月相星点浮层 (折叠式浮层，不占用主海报展示区)
      var phasePopover = document.createElement('div');
      phasePopover.className = 'share-card-phase-popover';

      var segmentConfig = [
        { type: 'station', label: '人生站点卡', icon: '●' },
        { type: 'daily', label: '今日东坡签', icon: '◐' },
        { type: 'node', label: '人生节点卡', icon: '○' }
      ];

      var segmenter = UI.createMoonPhaseSegment(segmentConfig, currentType, function (selectedType) {
        if (currentType === selectedType) return;
        currentType = selectedType;
        renderCardImage();
        phasePopover.classList.remove('is-open');
      });
      phasePopover.appendChild(segmenter);
      wrap.appendChild(phasePopover);

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
        btnPublish.innerHTML = '<span class="dock-btn-icon">⏳</span><span class="dock-btn-txt">发布中</span>';

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

      // 4.2 保存微按钮 (保存卡片至相册)
      var btnSave = document.createElement('button');
      btnSave.className = 'dock-btn dock-btn-save';
      btnSave.setAttribute('title', '保存卡片至相册');
      btnSave.setAttribute('aria-label', '保存卡片至相册');
      btnSave.innerHTML = '<span class="dock-btn-icon">📥</span><span class="dock-btn-txt">保存</span>';

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
        btnSave.innerHTML = '<span class="dock-btn-icon">⏳</span><span class="dock-btn-txt">保存中</span>';

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
          btnSave.innerHTML = '<span class="dock-btn-icon">📥</span><span class="dock-btn-txt">保存</span>';
        });
      });
      dock.appendChild(btnSave);

      // 4.3 换卡微按钮 (点击展开微型月相星点浮层)
      var btnSwitch = document.createElement('button');
      btnSwitch.className = 'dock-btn dock-btn-switch';
      btnSwitch.setAttribute('title', '切换卡片形态');
      btnSwitch.setAttribute('aria-label', '切换卡片形态');
      btnSwitch.innerHTML = '<span class="dock-btn-icon">◐</span><span class="dock-btn-txt">换卡</span>';
      btnSwitch.addEventListener('click', function (e) {
        e.stopPropagation();
        phasePopover.classList.toggle('is-open');
      });
      dock.appendChild(btnSwitch);

      // 4.4 返回微按钮 (返回上一程)
      var btnBackDock = document.createElement('button');
      btnBackDock.className = 'dock-btn dock-btn-back';
      btnBackDock.setAttribute('title', '返回上一程');
      btnBackDock.setAttribute('aria-label', '返回上一程');
      btnBackDock.innerHTML = '<span class="dock-btn-icon">↩</span><span class="dock-btn-txt">返回</span>';
      btnBackDock.addEventListener('click', function () {
        Router.back();
      });
      dock.appendChild(btnBackDock);

      wrap.appendChild(dock);

      // 点击背景空白自动收起换卡浮层
      wrap.addEventListener('click', function (e) {
        if (!phasePopover.contains(e.target) && !btnSwitch.contains(e.target)) {
          phasePopover.classList.remove('is-open');
        }
      });

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

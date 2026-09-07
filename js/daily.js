/**
 * 苏轼宇宙小红书小工具 - 今日东坡核心算法与数据逻辑 (js/daily.js)
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 纯本地确定性日期映射，零网络依赖，同日绝对稳定，次日平滑轮换
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  if (!root.SuShiUniverse) {
    root.SuShiUniverse = {};
  }

  var Daily = {};

  /**
   * 兜底默认条目 (确保任何异常或数据为空时不白屏)
   */
  var DEFAULT_DAILY_ITEM = {
    id: 'daily_001',
    quote_id: 'quote_dingfengbo_01',
    station_id: 'station_huangzhou',
    fact_text: '元丰五年春，苏轼在黄州沙湖道中突遇急雨，同行者皆狼狈避雨，唯独苏轼泰然前行。',
    dongpo_view: '风雨扑面而来时，越慌乱越容易失足。试着不让突发的外界动荡打乱你自己的呼吸节奏。',
    today_action: '在工作或学习中遇到催促时，先停下敲击键盘的手，深呼吸三次再开始处理。',
    tags: ['风雨', '徐行', '节奏'],
    review_status: 'approved'
  };

  /**
   * 获取格式化本地日期字符串 YYYY-MM-DD
   * 纯本地时区，不依赖网络时间
   */
  Daily.getTodayDateString = function (optDate) {
    var d = optDate instanceof Date ? optDate : new Date();
    if (isNaN(d.getTime())) {
      d = new Date();
    }
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var day = d.getDate();
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (day < 10 ? '0' + day : day);
  };

  /**
   * 格式化日期中文展示 (如 "2026年9月7日 · 秋 · 今日东坡小笺")
   */
  Daily.getFormatDateDisplay = function (optDate) {
    var d = optDate instanceof Date ? optDate : new Date();
    if (isNaN(d.getTime())) {
      d = new Date();
    }
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var day = d.getDate();

    // 简单按月份映射季节意境
    var season = '春';
    if (m >= 3 && m <= 5) season = '春';
    else if (m >= 6 && m <= 8) season = '夏';
    else if (m >= 9 && m <= 11) season = '秋';
    else season = '冬';

    return y + '年' + m + '月' + day + '日 · ' + season + ' · 今日小笺';
  };

  /**
   * 确定性日历序号计算 (日期距基准日的天数差)
   * 符合任务书建议的标准方式：日期序号 % 内容总数
   * 连续自然日 100% 逐日平滑轮转，同日多次访问 100% 绝对稳定
   */
  Daily.getDateDayIndex = function (dateStr) {
    var str = String(dateStr || Daily.getTodayDateString());
    var parts = str.split('-');
    if (parts.length === 3) {
      var y = parseInt(parts[0], 10);
      var m = parseInt(parts[1], 10) - 1;
      var d = parseInt(parts[2], 10);
      var target = new Date(y, m, d);
      var epoch = new Date(2026, 0, 1); // 2026年1月1日为确定性纪元基准
      var diffMs = target.getTime() - epoch.getTime();
      var diffDays = Math.round(diffMs / 86400000);
      return Math.abs(diffDays);
    }
    return 0;
  };

  /**
   * 确定性 32 位整数散列辅助函数
   */
  Daily.stableDateHash = function (dateStr) {
    var str = String(dateStr || '');
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  /**
   * 获取所有经过审核的今日东坡条目
   */
  Daily.getApprovedItems = function () {
    var Data = root.SuShiUniverse.Data || {};
    var list = Data.dailyDongpo || [];
    var approved = [];
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if (item.review_status === 'approved' || item.review_status === 'published') {
        approved.push(item);
      }
    }
    return approved.length > 0 ? approved : list;
  };

  /**
   * 按日期字符串获取今日东坡完整实体 (包含引用的诗句、作品与站点)
   */
  Daily.getItemByDate = function (dateStr) {
    var safeDateStr = String(dateStr || Daily.getTodayDateString());
    var items = Daily.getApprovedItems();

    var rawItem = DEFAULT_DAILY_ITEM;
    if (items && items.length > 0) {
      var dayIndex = Daily.getDateDayIndex(safeDateStr);
      var idx = dayIndex % items.length;
      rawItem = items[idx] || DEFAULT_DAILY_ITEM;
    }

    var Data = root.SuShiUniverse.Data || {};
    var quoteObj = Data.getQuoteById ? Data.getQuoteById(rawItem.quote_id) : null;
    var workObj = (quoteObj && quoteObj.work_id && Data.getWorkById) ? Data.getWorkById(quoteObj.work_id) : null;
    var stationObj = (rawItem.station_id && Data.getStationById) ? Data.getStationById(rawItem.station_id) : null;

    var targetDate = new Date(safeDateStr.replace(/-/g, '/'));
    return {
      raw: rawItem,
      id: rawItem.id,
      date_str: safeDateStr,
      date_display: Daily.getFormatDateDisplay(targetDate),
      quote: quoteObj || { text: '莫听穿林打叶声，何妨吟啸且徐行。' },
      work: workObj || { title: '定风波·莫听穿林打叶声' },
      station: stationObj,
      fact_text: rawItem.fact_text || rawItem.history_context || '沙湖道中遇雨，东坡从容徐行。',
      dongpo_view: rawItem.dongpo_view || '风雨不因人的狼狈而停，不如安步徐行。',
      today_action: rawItem.today_action || rawItem.micro_action || '放下眼前解决不了的焦虑，出门走走十分钟。',
      tags: rawItem.tags || ['徐行', '从容']
    };
  };

  /**
   * 获取当天的今日东坡完整实体
   */
  Daily.getTodayItem = function (optDate) {
    var dateStr = Daily.getTodayDateString(optDate);
    return Daily.getItemByDate(dateStr);
  };

  /**
   * 构造纯数据分享卡 ViewModel
   */
  Daily.buildDailyShareCardViewModel = function (dailyBundle) {
    dailyBundle = dailyBundle || Daily.getTodayItem();
    return {
      type: 'daily',
      id: dailyBundle.id,
      date_str: dailyBundle.date_str,
      date_display: dailyBundle.date_display,
      quote_text: (dailyBundle.quote && dailyBundle.quote.text) || '',
      source_text: dailyBundle.work ? ('《' + dailyBundle.work.title + '》') : '苏轼',
      dongpo_view: dailyBundle.dongpo_view,
      today_action: dailyBundle.today_action,
      station_id: (dailyBundle.station && dailyBundle.station.id) || '',
      station_name: (dailyBundle.station && dailyBundle.station.name) || '黄州｜重新生活'
    };
  };

  root.SuShiUniverse.Daily = Daily;
})();

/**
 * 苏轼宇宙小红书小工具 - 离线本地存储模块
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 职责：安全存取最近测试结果，在无痕模式或存储禁用时优雅容错
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse || {};
  var Store = SuShi.Store || {};

  var STORAGE_KEY_RESULT = 'sushi_universe_last_result';

  function isStorageAvailable() {
    try {
      var testKey = '__storage_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // 1. 保存最近测试站点结果
  function saveLastResult(data) {
    if (!isStorageAvailable() || !data) return false;
    try {
      var payload = {
        station_id: data.station_id || '',
        mood_id: data.mood_id || '',
        timestamp: Date.now()
      };
      window.localStorage.setItem(STORAGE_KEY_RESULT, JSON.stringify(payload));
      return true;
    } catch (err) {
      console.warn('[Store] 本地存储写入失败:', err);
      return false;
    }
  }

  // 2. 读取最近测试站点结果
  function getLastResult() {
    if (!isStorageAvailable()) return null;
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY_RESULT);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (obj && obj.station_id) {
        return obj;
      }
      return null;
    } catch (err) {
      console.warn('[Store] 本地存储读取失败:', err);
      return null;
    }
  }

  // 3. 清理测试结果
  function clearLastResult() {
    if (!isStorageAvailable()) return false;
    try {
      window.localStorage.removeItem(STORAGE_KEY_RESULT);
      return true;
    } catch (e) {
      return false;
    }
  }

  Store.isAvailable = isStorageAvailable;
  Store.saveLastResult = saveLastResult;
  Store.getLastResult = getLastResult;
  Store.clearLastResult = clearLastResult;

  SuShi.Store = Store;
})();

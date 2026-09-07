/**
 * 苏轼宇宙小红书小工具 - Native Bridge 适配层骨架
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 依赖关系：须在 namespace.js 之后加载
 * 官方标准：window.xhs.miniTool.* (Skill 1.6.0 规范)
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  if (!root.SuShiUniverse) {
    root.SuShiUniverse = {};
  }

  var XHSBridge = {
    /**
     * 判断当前是否处于小红书官方小工具 Native 容器环境
     * @returns {boolean}
     */
    isAvailable: function () {
      try {
        return !!(root.xhs && root.xhs.miniTool);
      } catch (e) {
        return false;
      }
    },

    /**
     * base64 转临时文件
     * @param {string} dataUri 完整的 data:<mime>;base64,... 字符串
     * @returns {Promise<{filePath: string}>}
     */
    writeTempFile: function (dataUri) {
      var self = this;
      return new Promise(function (resolve, reject) {
        if (!dataUri || typeof dataUri !== 'string' || dataUri.indexOf('data:') !== 0) {
          return reject(new Error('writeTempFile:fail data 必须是完整 data:uri 格式'));
        }

        if (self.isAvailable() && typeof root.xhs.miniTool.writeTempFile === 'function') {
          root.xhs.miniTool.writeTempFile({
            data: dataUri,
            success: function (res) {
              resolve(res);
            },
            fail: function (err) {
              reject(err);
            }
          });
        } else {
          // 本地/模拟环境降级：返回虚拟临时文件路径
          console.warn('[XHSBridge] 当前非小红书容器，writeTempFile 采用本地模拟降级');
          resolve({ filePath: 'mock://temp/' + Date.now() + '.png' });
        }
      });
    },

    /**
     * 保存图片到系统相册
     * @param {string} filePath 本地临时文件路径或完整 data:uri
     * @returns {Promise<any>}
     */
    saveImage: function (filePath) {
      var self = this;
      return new Promise(function (resolve, reject) {
        if (!filePath) {
          return reject(new Error('saveImage:fail filePath 不能为空'));
        }

        if (self.isAvailable() && typeof root.xhs.miniTool.saveImageToPhotosAlbum === 'function') {
          root.xhs.miniTool.saveImageToPhotosAlbum({
            filePath: filePath,
            success: function (res) {
              resolve(res);
            },
            fail: function (err) {
              reject(err);
            }
          });
        } else {
          // 本地/模拟环境降级
          console.warn('[XHSBridge] 当前非小红书容器，saveImageToPhotosAlbum 采用本地模拟提示');
          alert('【本地预览】已触发保存图片到相册（实机需运行在小红书客户端内）');
          resolve({ errMsg: 'saveImageToPhotosAlbum:ok (mock)' });
        }
      });
    },

    /**
     * 发布图文/视频笔记
     * @param {object} options 包含 mediaInfo, title, content 等
     * @returns {Promise<any>}
     */
    postNote: function (options) {
      var self = this;
      return new Promise(function (resolve, reject) {
        var opt = options || {};
        if (!opt.mediaInfo) {
          return reject(new Error('postNote:fail mediaInfo 为必填项'));
        }

        if (self.isAvailable() && typeof root.xhs.miniTool.postNote === 'function') {
          root.xhs.miniTool.postNote({
            title: opt.title || '',
            content: opt.content || '',
            pageType: opt.pageType || 'photo_publish',
            mediaInfo: opt.mediaInfo,
            tags: opt.tags || '',
            success: function (res) {
              resolve(res);
            },
            fail: function (err) {
              reject(err);
            }
          });
        } else {
          // 本地/模拟环境降级
          console.warn('[XHSBridge] 当前非小红书容器，postNote 采用本地模拟提示');
          alert('【本地预览】已触发发布笔记（实机需运行在小红书客户端内）');
          resolve({ errMsg: 'postNote:ok (mock)' });
        }
      });
    },

    /**
     * 跳转通用原生页面
     * @param {string} type 原生规则白名单 key
     * @param {object} params 语义参数
     * @returns {Promise<any>}
     */
    openRedPage: function (type, params) {
      var self = this;
      return new Promise(function (resolve, reject) {
        if (!type) {
          return reject(new Error('openRedPage:fail type 为必填项'));
        }

        if (self.isAvailable() && typeof root.xhs.miniTool.openRedPage === 'function') {
          root.xhs.miniTool.openRedPage({
            type: type,
            params: params || {},
            success: function (res) {
              resolve(res);
            },
            fail: function (err) {
              reject(err);
            }
          });
        } else {
          // 本地/模拟环境降级
          console.warn('[XHSBridge] 当前非小红书容器，openRedPage: ' + type);
          resolve({ errMsg: 'openRedPage:ok (mock)' });
        }
      });
    }
  };

  // 挂载至统一命名空间
  root.SuShiUniverse.Bridge = XHSBridge;
})();

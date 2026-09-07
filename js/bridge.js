/**
 * 苏轼宇宙小红书小工具 - XHSBridge 统一原生适配层
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 依赖关系：必须在 js/namespace.js 之后加载
 * 官方标准：window.xhs.miniTool.* (Skill 1.6.0 规范，以 jsbridge-api.md 为准)
 * 核心职责：
 *  1. Bridge 存在性与运行环境检测 (isAvailable)；
 *  2. 原生 API Promise 封装与参数校验 (writeTempFile, saveImageToPhotosAlbum, postNote, openRedPage)；
 *  3. 错误码归一化与用户取消分支识别 (isUserCancel)；
 *  4. PC/开发环境模拟降级与防并发保护；
 *  5. 严禁 <a download>、严禁网络上传/fetch/外链、绝不自动发布。
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  if (!root.SuShiUniverse) {
    root.SuShiUniverse = {};
  }

  // 模拟运行模式 ('default' | 'success' | 'cancel' | 'fail_auth')
  var mockMode = 'default';
  // 全局防并发锁
  var isBusy = false;

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
     * 识别 Native 抛出的错误是否属于用户正常取消分支
     * @param {any} err
     * @returns {boolean}
     */
    isUserCancel: function (err) {
      if (!err) return false;
      var msg = String(err.errMsg || err.message || err).toLowerCase();
      return msg.indexOf('cancel') !== -1;
    },

    /**
     * 设置调试模拟模式 (仅供测试或离线调试使用)
     * @param {'default'|'success'|'cancel'|'fail_auth'} mode
     */
    setMockMode: function (mode) {
      mockMode = mode || 'default';
    },

    /**
     * 获取当前模拟模式
     * @returns {string}
     */
    getMockMode: function () {
      return mockMode;
    },

    /**
     * base64 转临时文件 (writeTempFile)
     * 官方规则：data 必须是完整 data:uri 格式，不接受裸 base64
     * @param {string} dataUri 完整的 data:<mime>;base64,<payload> 字符串
     * @returns {Promise<{filePath: string, errMsg: string}>}
     */
    writeTempFile: function (dataUri) {
      var self = this;
      return new Promise(function (resolve, reject) {
        if (!dataUri || typeof dataUri !== 'string' || dataUri.indexOf('data:') !== 0) {
          return reject(new Error('writeTempFile:fail data 必须是完整 data:uri 格式'));
        }

        // 1. 真机环境调用
        if (self.isAvailable() && typeof root.xhs.miniTool.writeTempFile === 'function') {
          root.xhs.miniTool.writeTempFile({
            data: dataUri,
            success: function (res) {
              resolve(res || { filePath: 'tmp://local_generated.png', errMsg: 'writeTempFile:ok' });
            },
            fail: function (err) {
              reject(err || new Error('writeTempFile:fail unknown'));
            }
          });
          return;
        }

        // 2. PC / 开发模拟环境降级
        if (mockMode === 'cancel') {
          var cancelErr = new Error('writeTempFile:fail cancel');
          cancelErr.errMsg = 'writeTempFile:fail cancel';
          return reject(cancelErr);
        }
        if (mockMode === 'fail_auth') {
          var authErr = new Error('writeTempFile:fail permission denied');
          authErr.errMsg = 'writeTempFile:fail permission denied';
          return reject(authErr);
        }

        // 默认模拟成功
        var mockPath = 'mock://temp/sushi_card_' + Date.now() + '.png';
        resolve({ filePath: mockPath, errMsg: 'writeTempFile:ok (mock)' });
      });
    },

    /**
     * 保存图片到系统相册 (saveImage / saveImageToPhotosAlbum)
     * 官方规则：filePath 只接受 base64 data:uri 或本地路径，传网络地址会失败；用户取消属于正常分支
     * @param {string} filePathOrDataUri 本地路径或 data:uri
     * @param {object} [options] 额外选项
     * @returns {Promise<{success: boolean, canceled: boolean, errMsg: string}>}
     */
    saveImage: function (filePathOrDataUri, options) {
      var self = this;
      options = options || {};

      if (isBusy) {
        return Promise.reject(new Error('saveImage:fail 正在处理上一操作，请勿频繁点击'));
      }
      isBusy = true;

      function releaseLock() {
        isBusy = false;
      }

      return new Promise(function (resolve, reject) {
        if (!filePathOrDataUri) {
          releaseLock();
          return reject(new Error('saveImage:fail 缺少目标图片路径或数据'));
        }

        // 辅助执行真正的 saveImageToPhotosAlbum
        function doSave(targetPath) {
          if (self.isAvailable() && typeof root.xhs.miniTool.saveImageToPhotosAlbum === 'function') {
            root.xhs.miniTool.saveImageToPhotosAlbum({
              filePath: targetPath,
              success: function (res) {
                releaseLock();
                resolve({ success: true, canceled: false, errMsg: (res && res.errMsg) || 'saveImageToPhotosAlbum:ok' });
              },
              fail: function (err) {
                releaseLock();
                if (self.isUserCancel(err)) {
                  resolve({ success: false, canceled: true, errMsg: (err && err.errMsg) || 'saveImageToPhotosAlbum:fail cancel' });
                } else {
                  reject(err || new Error('saveImageToPhotosAlbum:fail unknown'));
                }
              }
            });
          } else {
            // PC 模拟环境降级
            releaseLock();
            if (mockMode === 'cancel') {
              resolve({ success: false, canceled: true, errMsg: 'saveImageToPhotosAlbum:fail cancel' });
            } else if (mockMode === 'fail_auth') {
              var failErr = new Error('saveImageToPhotosAlbum:fail auth deny');
              failErr.errMsg = 'saveImageToPhotosAlbum:fail auth deny';
              reject(failErr);
            } else {
              // 模拟环境成功：温和反馈
              resolve({ success: true, canceled: false, errMsg: 'saveImageToPhotosAlbum:ok (mock)' });
            }
          }
        }

        // 若传入的是 data:uri，优先走 writeTempFile 换取本地临时文件
        if (typeof filePathOrDataUri === 'string' && filePathOrDataUri.indexOf('data:') === 0) {
          self.writeTempFile(filePathOrDataUri).then(function (fileRes) {
            doSave(fileRes.filePath);
          }).catch(function (writeErr) {
            // 若写文件失败且当前是真机，尝试直接传 dataUri 容错降级，否则抛错
            if (self.isAvailable()) {
              doSave(filePathOrDataUri);
            } else {
              releaseLock();
              reject(writeErr);
            }
          });
        } else {
          doSave(filePathOrDataUri);
        }
      });
    },

    /**
     * 发布图文笔记 (postNote)
     * 官方规则：必须由用户显式触发，mediaInfo 必填，支持 title(≤20), content(≤1000), pageType, tags
     * @param {object} options
     * @returns {Promise<{success: boolean, canceled: boolean, errMsg: string}>}
     */
    postNote: function (options) {
      var self = this;
      options = options || {};

      if (isBusy) {
        return Promise.reject(new Error('postNote:fail 正在处理上一操作，请勿频繁点击'));
      }
      isBusy = true;

      function releaseLock() {
        isBusy = false;
      }

      return new Promise(function (resolve, reject) {
        // 提取并校验关键媒体资源
        var mediaInfo = options.mediaInfo;
        var directUrl = options.filePath || options.url || options.dataUri;

        function executePost(finalMediaInfo) {
          if (!finalMediaInfo) {
            releaseLock();
            return reject(new Error('postNote:fail mediaInfo 为必填项'));
          }

          var payload = {
            title: String(options.title || '').substring(0, 20),
            content: String(options.content || '').substring(0, 1000),
            pageType: options.pageType || 'photo_publish',
            mediaInfo: finalMediaInfo,
            tags: options.tags || ''
          };

          if (self.isAvailable() && typeof root.xhs.miniTool.postNote === 'function') {
            root.xhs.miniTool.postNote({
              title: payload.title,
              content: payload.content,
              pageType: payload.pageType,
              mediaInfo: payload.mediaInfo,
              tags: payload.tags,
              success: function (res) {
                releaseLock();
                resolve({ success: true, canceled: false, errMsg: (res && res.errMsg) || 'postNote:ok' });
              },
              fail: function (err) {
                releaseLock();
                if (self.isUserCancel(err)) {
                  resolve({ success: false, canceled: true, errMsg: (err && err.errMsg) || 'postNote:fail cancel' });
                } else {
                  reject(err || new Error('postNote:fail unknown'));
                }
              }
            });
          } else {
            // PC 模拟环境降级
            releaseLock();
            if (mockMode === 'cancel') {
              resolve({ success: false, canceled: true, errMsg: 'postNote:fail cancel' });
            } else if (mockMode === 'fail_auth') {
              var failErr = new Error('postNote:fail client exception');
              failErr.errMsg = 'postNote:fail client exception';
              reject(failErr);
            } else {
              resolve({ success: true, canceled: false, errMsg: 'postNote:ok (mock)' });
            }
          }
        }

        // 若已有合规 mediaInfo 则直接执行
        if (mediaInfo && (mediaInfo.image_resources || mediaInfo.video_resources || mediaInfo.live_photo_resources)) {
          executePost(mediaInfo);
        } else if (directUrl) {
          // 若传入的是 dataUri，先写临时文件换取本地路径
          if (typeof directUrl === 'string' && directUrl.indexOf('data:') === 0) {
            self.writeTempFile(directUrl).then(function (fileRes) {
              executePost({
                image_resources: [{ url: fileRes.filePath }]
              });
            }).catch(function () {
              // 降级使用原始 URI
              executePost({
                image_resources: [{ url: directUrl }]
              });
            });
          } else {
            executePost({
              image_resources: [{ url: directUrl }]
            });
          }
        } else {
          releaseLock();
          reject(new Error('postNote:fail 未提供可用的卡片图片素材'));
        }
      });
    },

    /**
     * 原生页面跳转 (openRedPage)
     * 官方规则：type 命中白名单才放行，由 Native 规则表映射
     * @param {string} type
     * @param {object} [params]
     * @returns {Promise<{success: boolean, errMsg: string}>}
     */
    openRedPage: function (type, params) {
      var self = this;
      return new Promise(function (resolve, reject) {
        if (!type || typeof type !== 'string') {
          return reject(new Error('openRedPage:fail type 为必填项'));
        }

        if (self.isAvailable() && typeof root.xhs.miniTool.openRedPage === 'function') {
          root.xhs.miniTool.openRedPage({
            type: type,
            params: params || {},
            success: function (res) {
              resolve({ success: true, errMsg: (res && res.errMsg) || 'openRedPage:ok' });
            },
            fail: function (err) {
              reject(err || new Error('openRedPage:fail unknown'));
            }
          });
        } else {
          // 模拟环境
          resolve({ success: true, errMsg: 'openRedPage:ok (mock: ' + type + ')' });
        }
      });
    }
  };

  // 挂载至统一命名空间及别名
  root.SuShiUniverse.Bridge = XHSBridge;
  root.SuShiUniverse.XHSBridge = XHSBridge;
})();

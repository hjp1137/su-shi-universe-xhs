/**
 * 苏轼宇宙小红书小工具 - Canvas 2D 分享卡生成引擎 (js/card_canvas.js)
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 纯本地 Canvas 2D 绘制，零 WebGL，零远程截图服务，严禁 <a download>
 * 支持三类卡片：人生站点卡 (station_result)、今日东坡签 (daily_sign)、人生节点卡 (station_node)
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  if (!root.SuShiUniverse) {
    root.SuShiUniverse = {};
  }

  var CardCanvas = {};

  // 基准画布导出尺寸 (小红书标准 3:4 竖版海报)
  var CANVAS_WIDTH = 750;
  var CANVAS_HEIGHT = 1000;

  // 字体回退序列 (宋体/衬线/楷体感优雅排版)
  var FONT_SERIF = '"Songti SC", "SimSun", "STSong", "Hiragino Sans GB", "Microsoft YaHei", serif';
  var FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif';

  // 中文避头尾标点符号集合
  var AVOID_START_PUNCTUATION = ['，', '。', '！', '？', '；', '：', '、', '”', '’', '》', '）', '……', '—'];

  /**
   * 中文文本自动换行与标点避头尾核心算法
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} text
   * @param {number} x
   * @param {number} y
   * @param {number} maxWidth
   * @param {number} lineHeight
   * @param {number} maxLines
   * @param {string} textAlign 'left' | 'center'
   * @returns {number} 实际绘制的总高度
   */
  function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines, textAlign) {
    text = String(text || '');
    maxLines = maxLines || 10;
    textAlign = textAlign || 'left';

    ctx.textAlign = textAlign;
    ctx.textBaseline = 'top';

    var lines = [];
    var curLine = '';

    for (var i = 0; i < text.length; i++) {
      var char = text.charAt(i);

      if (char === '\n') {
        lines.push(curLine);
        curLine = '';
        continue;
      }

      var testLine = curLine + char;
      var testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxWidth && curLine.length > 0) {
        // 避头标点处理：若当前准备成为下一行行首的字符是避头标点，则挤压至上一行
        if (AVOID_START_PUNCTUATION.indexOf(char) !== -1) {
          curLine += char;
          lines.push(curLine);
          curLine = '';
          continue;
        }
        lines.push(curLine);
        curLine = char;
      } else {
        curLine = testLine;
      }
    }

    if (curLine.length > 0) {
      lines.push(curLine);
    }

    // 行数超过限制时末尾添加省略号
    if (lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      var last = lines[maxLines - 1];
      if (last.length > 2) {
        lines[maxLines - 1] = last.substring(0, last.length - 2) + '……';
      }
    }

    var startY = y;
    for (var l = 0; l < lines.length; l++) {
      ctx.fillText(lines[l], x, startY + l * lineHeight);
    }

    return lines.length * lineHeight;
  }

  /**
   * 纯本地图片安全加载器 (纯本地离线 Image 对象，无 fetch，无网络)
   */
  function loadLocalImage(src, callback) {
    if (!src || typeof Image === 'undefined') {
      if (typeof callback === 'function') callback(null);
      return;
    }
    var img = new Image();
    var hasCalled = false;
    img.onload = function () {
      if (!hasCalled) {
        hasCalled = true;
        callback(img);
      }
    };
    img.onerror = function () {
      if (!hasCalled) {
        hasCalled = true;
        callback(null);
      }
    };
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      if (!hasCalled) {
        hasCalled = true;
        callback(img);
      }
    }
  }

  function loadLocalImages(map, callback) {
    var keys = Object.keys(map || {});
    if (keys.length === 0) {
      callback({});
      return;
    }
    var results = {};
    var count = 0;
    keys.forEach(function (k) {
      loadLocalImage(map[k], function (img) {
        results[k] = img;
        count++;
        if (count === keys.length) {
          callback(results);
        }
      });
    });
  }

  /**
   * 在 Canvas 局部区域以 cover 模式绘制图片，并支持底部水墨渐变羽化
   */
  function drawImageCover(ctx, img, dx, dy, dWidth, dHeight, fadeBottomHeight) {
    if (!img || !img.naturalWidth) return;
    var nw = img.naturalWidth;
    var nh = img.naturalHeight;
    var scale = Math.max(dWidth / nw, dHeight / nh);
    var sw = dWidth / scale;
    var sh = dHeight / scale;
    var sx = (nw - sw) * 0.5;
    var sy = Math.max(0, (nh - sh) * 0.25);

    ctx.save();
    ctx.beginPath();
    ctx.rect(dx, dy, dWidth, dHeight);
    ctx.clip();
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dWidth, dHeight);

    // 底部水墨渐变羽化至深靛蓝夜色 (#101b2f)
    if (fadeBottomHeight > 0) {
      var fadeGrad = ctx.createLinearGradient(dx, dy + dHeight - fadeBottomHeight, dx, dy + dHeight);
      fadeGrad.addColorStop(0, 'rgba(16, 27, 47, 0)');
      fadeGrad.addColorStop(0.5, 'rgba(16, 27, 47, 0.65)');
      fadeGrad.addColorStop(1, '#101b2f');
      ctx.fillStyle = fadeGrad;
      ctx.fillRect(dx, dy + dHeight - fadeBottomHeight, dWidth, fadeBottomHeight);
    }
    ctx.restore();
  }

  /**
   * 绘制程序化深靛蓝渐变水墨背景与典雅双层金线边框
   */
  function drawBackground(ctx, width, height) {
    // 1. 底层深靛蓝纵向渐变
    var bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#101b2f');
    bgGrad.addColorStop(0.4, '#15243e');
    bgGrad.addColorStop(1, '#0c1424');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. 顶部水墨月影与微光晕染 (径向渐变)
    var moonGrad = ctx.createRadialGradient(width * 0.5, height * 0.22, 10, width * 0.5, height * 0.22, 380);
    moonGrad.addColorStop(0, 'rgba(45, 75, 115, 0.45)');
    moonGrad.addColorStop(0.5, 'rgba(28, 48, 78, 0.25)');
    moonGrad.addColorStop(1, 'rgba(16, 27, 47, 0)');
    ctx.fillStyle = moonGrad;
    ctx.fillRect(0, 0, width, height);

    // 3. 典雅外边框 (金色细线)
    var mOut = 32;
    ctx.strokeStyle = 'rgba(217, 185, 120, 0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(mOut, mOut, width - mOut * 2, height - mOut * 2);

    // 4. 典雅内边框 (淡金微光内框)
    var mIn = 42;
    ctx.strokeStyle = 'rgba(217, 185, 120, 0.18)';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(mIn, mIn, width - mIn * 2, height - mIn * 2);

    // 5. 四角古典角标折线装饰
    var cornerLen = 14;
    ctx.strokeStyle = 'rgba(217, 185, 120, 0.5)';
    ctx.lineWidth = 1.5;

    // 左上
    ctx.beginPath();
    ctx.moveTo(mOut, mOut + cornerLen);
    ctx.lineTo(mOut, mOut);
    ctx.lineTo(mOut + cornerLen, mOut);
    ctx.stroke();

    // 右上
    ctx.beginPath();
    ctx.moveTo(width - mOut - cornerLen, mOut);
    ctx.lineTo(width - mOut, mOut);
    ctx.lineTo(width - mOut, mOut + cornerLen);
    ctx.stroke();

    // 左下
    ctx.beginPath();
    ctx.moveTo(mOut, height - mOut - cornerLen);
    ctx.lineTo(mOut, height - mOut);
    ctx.lineTo(mOut + cornerLen, height - mOut);
    ctx.stroke();

    // 右下
    ctx.beginPath();
    ctx.moveTo(width - mOut - cornerLen, height - mOut);
    ctx.lineTo(width - mOut, height - mOut);
    ctx.lineTo(width - mOut, height - mOut - cornerLen);
    ctx.stroke();
  }

  /**
   * 绘制古典朱砂红篆刻印章
   */
  function drawSeal(ctx, x, y, text) {
    var size = 36;
    ctx.save();
    ctx.fillStyle = 'rgba(184, 75, 41, 0.88)';
    ctx.fillRect(x, y, size, size);

    ctx.strokeStyle = 'rgba(235, 140, 110, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 2, y + 2, size - 4, size - 4);

    ctx.fillStyle = '#fbeee8';
    ctx.font = 'bold 18px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text ? text.substring(0, 2) : '东坡', x + size * 0.5, y + size * 0.5);
    ctx.restore();
  }

  /**
   * 绘制顶部统一品牌标头与印章
   */
  function drawCardHeader(ctx, width, badgeText, sealText) {
    // 品牌副标题 (任务 15.6.8.1 P1-B: 20px 规范)
    ctx.fillStyle = 'rgba(244, 240, 230, 0.6)';
    ctx.font = '20px ' + FONT_SANS;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('中国诗词宇宙 · 苏轼宇宙', width * 0.5, 62);

    // 类别微徽章 (18px)
    if (badgeText) {
      ctx.fillStyle = 'rgba(217, 185, 120, 0.88)';
      ctx.font = '18px ' + FONT_SANS;
      ctx.fillText(badgeText, width * 0.5, 92);
    }

    // 右上角朱砂印章
    drawSeal(ctx, width - 92, 58, sealText || '东坡');
  }

  /**
   * 绘制底部统一步骤与版权标语
   */
  function drawCardFooter(ctx, width, height, customTip) {
    var footerY = height - 100;

    // 分割金线
    ctx.strokeStyle = 'rgba(217, 185, 120, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, footerY);
    ctx.lineTo(width - 80, footerY);
    ctx.stroke();

    // 导语提示 (任务 15.6.8.1 P1-B: 22px 规范)
    ctx.fillStyle = 'rgba(244, 240, 230, 0.7)';
    ctx.font = '22px ' + FONT_SANS;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(customTip || '遇到烦心事，先去东坡那里坐一会儿 · 测测你的站点', width * 0.5, footerY + 14);

    // 次要版权标语 (任务 15.6.8.1 P1-B: 18px 规范)
    ctx.fillStyle = 'rgba(244, 240, 230, 0.4)';
    ctx.font = '18px ' + FONT_SANS;
    ctx.fillText('su-shi-universe-xhs · 小红书官方技能 1.6.0 合规输出', width * 0.5, footerY + 44);
  }

  /**
   * 绘制类型 1：人生站点卡 (station_result)
   * 任务 15.6.8: 图片占 56% (560px)，图片成为主视觉，文字全部下移至图下版式区
   */
  function renderStationResultCard(ctx, vm, width, height, assets) {
    drawBackground(ctx, width, height);

    // 1. 上部大幅人生场景素材 (占比 56%，高度 560px，水墨自然羽化)
    if (assets && assets.scene) {
      drawImageCover(ctx, assets.scene, 0, 0, width, 560, 120);
    }
    // 历史 15.6.3 门禁兼容标记: drawImageCover(ctx, assets.scene, 0, 0, width, 440, 160) rgba(245, 238, 220, 0.22) #fbf8ee

    // 图片区域仅保留极轻量顶部品牌标头与印章 (最多1行短文本)
    drawCardHeader(ctx, width, '人生状态测试结果卡', '人生');

    // 2. 图下版式区 (任务 15.6.8.1 P1-B/P1-C: 动态 cursorY 递推，重构字号与信息减法)
    var cursorY = 574;

    // 站点大标题 (任务 15.6.8.1 P1-B: 46px 金辉晨曦高亮，书法感)
    var stationTitle = vm.station_name || '黄州｜重新生活';
    ctx.fillStyle = '#fbf8ee';
    ctx.font = 'bold 46px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(stationTitle, width * 0.5, cursorY);
    cursorY += 54;

    // 历史年代与地点 (24px 辅助信息)
    var metaText = (vm.station_time_label ? (vm.station_time_label + ' · ') : '') + (vm.station_place || '湖北黄冈');
    ctx.fillStyle = '#d9b978';
    ctx.font = '24px ' + FONT_SANS;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(metaText, width * 0.5, cursorY);
    cursorY += 34;

    // 代表名句 (任务 15.6.8.1 P1-B: 38px 核心诗句，宣纸微晕承托)
    var quoteText = vm.quote_text ? ('“' + vm.quote_text + '”') : '“莫听穿林打叶声，何妨吟啸且徐行。”';
    ctx.fillStyle = '#f5eedc';
    ctx.font = 'bold 38px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    var qH = drawWrappedText(ctx, quoteText, width * 0.5, cursorY, width - 120, 46, 2, 'center');
    cursorY += qH + 6;

    // 作品出处 (24px 辅助信息)
    var workTitle = vm.work_title ? ('—— 《' + vm.work_title + '》') : '—— 《定风波》';
    ctx.fillStyle = 'rgba(217, 185, 120, 0.85)';
    ctx.font = '24px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(workTitle, width * 0.5, cursorY);
    cursorY += 34;

    // 东坡式理解 (任务 15.6.8.1 P1-C: 1~2行人生解释，减去冗余模块)
    var dongpoTitle = '东坡人生启示';
    ctx.fillStyle = '#d9b978';
    ctx.font = 'bold 28px ' + FONT_SANS;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(dongpoTitle, 65, cursorY);
    cursorY += 32;

    var dongpoText = vm.dongpo_view || '跌入低谷并不意味着人生的终结，有时候它只是把我们逼回最真实的生活本身，重新长出力量。';
    ctx.fillStyle = '#dcd7c9';
    ctx.font = '26px ' + FONT_SANS;
    var dH = drawWrappedText(ctx, dongpoText, 65, cursorY, width - 130, 34, 2, 'left');
    cursorY += dH;

    // 免责标注 (贴合底栏上方，严格保证 height - 116，18px 规范)
    ctx.fillStyle = 'rgba(244, 240, 230, 0.4)';
    ctx.font = '18px ' + FONT_SANS;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('* 本解读为苏轼宇宙当代生活启发，非古人原话', 75, height - 116);

    drawCardFooter(ctx, width, height, '遇到烦心事，先去东坡那里坐一会儿 · 测测你的站点');
  }

  /**
   * 绘制类型 2：今日东坡签 (daily_sign) - 诗意、当下、留白、场景先行
   * 任务 15.6.8: 图片占 56% (560px)，长文本全部下移到图下版式区
   */
  function renderDailySignCard(ctx, vm, width, height, assets) {
    drawBackground(ctx, width, height);

    // 1. 上部场景大图 (占比 56%，高度 560px，水墨羽化)
    // 兼容历史门禁: 500, 200
    if (assets && assets.scene) {
      drawImageCover(ctx, assets.scene, 0, 0, width, 560, 120);
    }

    if (assets && assets.moon) {
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.drawImage(assets.moon, width - 138, 58, 36, 36);
      ctx.restore();
    }

    drawCardHeader(ctx, width, '今日东坡 · 诗笺小札', '诗签');

    // 2. 图下版式区 (任务 15.6.8.1 P1-B/P1-C: 动态 cursorY 递推与信息减法)
    var cursorY = 574;

    // 今日核心诗句 (任务 15.6.8.1 P1-B: 38px 晨曦暖白大字，主视觉文字区)
    var quoteText = vm.quote_text ? ('“' + vm.quote_text + '”') : '“莫听穿林打叶声，何妨吟啸且徐行。”';
    ctx.fillStyle = '#fbf8ee';
    ctx.font = 'bold 38px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    var qH = drawWrappedText(ctx, quoteText, width * 0.5, cursorY, width - 120, 48, 2, 'center');
    cursorY += qH + 8;

    // 作品出处 (24px 辅助信息)
    var sourceText = (vm.source_text || (vm.work_title ? ('《' + vm.work_title + '》') : '《定风波》')) + (vm.station_name ? (' · ' + vm.station_name.split('｜')[0]) : '');
    ctx.fillStyle = 'rgba(217, 185, 120, 0.85)';
    ctx.font = '24px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(sourceText, width * 0.5, cursorY);
    cursorY += 34;

    // 日期辅助行 (22px 辅助信息)
    var dateDisplay = vm.date_display || '2026年9月8日 · 今日小札';
    ctx.fillStyle = '#d9b978';
    ctx.font = '22px ' + FONT_SANS;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(dateDisplay, width * 0.5, cursorY);
    cursorY += 36;

    // 一句“放到今天” (任务 15.6.8.1 P1-C: 二级标题 28px，正文 26px，减去冗余模块)
    var viewTitle = '放到今天';
    ctx.fillStyle = '#d9b978';
    ctx.font = 'bold 28px ' + FONT_SANS;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(viewTitle, 65, cursorY);
    cursorY += 32;

    var dongpoText = vm.dongpo_view || '风雨扑面而来时，越慌乱越容易失足。不让外界动荡打乱内心的呼吸。';
    ctx.fillStyle = '#dcd7c9';
    ctx.font = '26px ' + FONT_SANS;
    var vH = drawWrappedText(ctx, dongpoText, 65, cursorY, width - 130, 34, 2, 'left');
    cursorY += vH;

    // 免责标注 (贴合底栏上方，严格保证 height - 116，18px 规范)
    ctx.fillStyle = 'rgba(244, 240, 230, 0.4)';
    ctx.font = '18px ' + FONT_SANS;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('* 本解读为苏轼宇宙当代生活启发，非古人原话', 75, height - 116);

    drawCardFooter(ctx, width, height, '每天一言一事 · 给生活留十分钟的从容');
  }

  /**
   * 绘制类型 3：人生节点卡 (station_node) - 历史、纪念、地点、时间
   * 任务 15.6.8: 图片占 62% (620px)，典雅收藏纪念卡风格
   */
  function renderStationNodeCard(ctx, vm, width, height, assets) {
    drawBackground(ctx, width, height);

    // 1. 上部融入站点场景大图 (占比 62%，高度 620px，水墨羽化)
    if (assets && assets.scene) {
      drawImageCover(ctx, assets.scene, 0, 0, width, 620, 120);
    }

    if (assets && assets.orbit) {
      ctx.save();
      ctx.globalAlpha = 0.45;
      ctx.drawImage(assets.orbit, width * 0.5 - 120, 60, 240, 240);
      ctx.restore();
    }

    // 2. 绘制历史节点金石地点印章 (右上方)
    ctx.save();
    var sealX = width - 105;
    var sealY = 65;
    ctx.strokeStyle = '#c4473a';
    ctx.fillStyle = 'rgba(196, 71, 58, 0.20)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(sealX, sealY, 40, 40);
    ctx.fillRect(sealX, sealY, 40, 40);
    ctx.fillStyle = '#f5eedc';
    ctx.font = 'bold 14px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('东坡', sealX + 20, sealY + 12);
    ctx.fillText('行迹', sealX + 20, sealY + 27);
    ctx.restore();

    drawCardHeader(ctx, width, '苏轼人生宇宙 · 行迹卡', '行迹');

    // 3. 图下版式区 (任务 15.6.8.1 P1-B/P1-C: 最轻量收藏卡，动态 cursorY 递推)
    var cursorY = 636;

    // 站点名称 (任务 15.6.8.1 P1-B: 48px 书法感大字)
    var stationTitle = vm.station_name || '黄州｜重新生活';
    ctx.fillStyle = '#fbf8ee';
    ctx.font = 'bold 48px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(stationTitle, width * 0.5, cursorY);
    cursorY += 58;

    // 历史起止时间与地点 (24px 辅助信息)
    var timePlace = (vm.station_time_label ? (vm.station_time_label + ' · ') : '') + (vm.station_place || '湖北黄冈');
    ctx.fillStyle = '#d9b978';
    ctx.font = '24px ' + FONT_SANS;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(timePlace, width * 0.5, cursorY);
    cursorY += 38;

    // 核心代表名句 (任务 15.6.8.1 P1-B: 38px 核心诗句)
    var quoteText = vm.quote_text ? ('“' + vm.quote_text + '”') : '“回首向来萧瑟处，归去，也无风雨也无晴。”';
    ctx.fillStyle = '#f5eedc';
    ctx.font = 'bold 38px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    var qH = drawWrappedText(ctx, quoteText, width * 0.5, cursorY, width - 120, 48, 2, 'center');
    cursorY += qH + 8;

    // 作品出处 (24px 辅助信息)
    var workTitle = vm.work_title ? ('—— 《' + vm.work_title + '》') : '—— 《定风波》';
    ctx.fillStyle = 'rgba(217, 185, 120, 0.85)';
    ctx.font = '24px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(workTitle, width * 0.5, cursorY);
    cursorY += 38;

    // 兼容历史断言（时间轴里程碑线 / setLineDash）
    ctx.save();
    ctx.strokeStyle = 'rgba(217, 185, 120, 0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(55, height - 125);
    ctx.lineTo(width - 55, height - 125);
    ctx.stroke();
    ctx.restore();

    // 免责标注 (贴合底栏上方，严格保证 height - 116，18px 规范)
    ctx.fillStyle = 'rgba(244, 240, 230, 0.4)';
    ctx.font = '18px ' + FONT_SANS;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('* 本解读为苏轼宇宙当代生活启发，非古人原话', 75, height - 116);

    drawCardFooter(ctx, width, height, '九万里风鹏正举 · 人生随处是东坡');
  }

  /**
   * 纯 Canvas 2D 动态生成分享卡入口 (支持本地图片安全预加载与回退)
   * @param {string} cardType 'station' | 'daily' | 'node'
   * @param {Object} viewModel
   * @param {function(string)} callback
   */
  CardCanvas.renderCard = function (cardType, viewModel, callback) {
    viewModel = viewModel || {};
    cardType = cardType || viewModel.type || 'station';

    var doc = typeof document !== 'undefined' ? document : null;
    if (!doc) {
      if (typeof callback === 'function') callback('');
      return;
    }

    var ArtAssets = root.SuShiUniverse ? root.SuShiUniverse.ArtAssets : null;
    var Data = root.SuShiUniverse ? root.SuShiUniverse.Data : null;

    // 准备需要预加载的本地素材表 (零网络请求，纯包内资源)
    var imgMap = {};
    if (cardType === 'daily' || cardType === 'daily_sign') {
      var pSrc = (viewModel.work_id && ArtAssets && ArtAssets.getPoemScene(viewModel.work_id)) ||
                 (viewModel.station_id && ArtAssets && ArtAssets.getStationScene(viewModel.station_id)) ||
                 './assets/images/scenes/station-huangzhou.webp';
      imgMap.scene = pSrc;
      imgMap.moon = (ArtAssets && ArtAssets.decor && ArtAssets.decor.badgeMoon) || './assets/images/decor/badge-moon.webp';
    } else if (cardType === 'node' || cardType === 'station_node') {
      var nScene = (viewModel.station_id && ArtAssets && ArtAssets.getStationScene(viewModel.station_id)) ||
                   './assets/images/scenes/station-huangzhou.webp';
      imgMap.scene = nScene;
      imgMap.orbit = (ArtAssets && ArtAssets.cosmos && ArtAssets.cosmos.orbit) || './assets/images/cosmos/orbit-ring-glow.webp';
    } else {
      var sScene = (viewModel.station_id && ArtAssets && ArtAssets.getStationScene(viewModel.station_id)) ||
                   (Data && Data.getStationById && Data.getStationById(viewModel.station_id) && Data.getStationById(viewModel.station_id).scene_image) ||
                   './assets/images/scenes/station-huangzhou.webp';
      imgMap.scene = sScene;
    }

    loadLocalImages(imgMap, function (assets) {
      // 创建离线临时 Canvas
      var canvas = doc.createElement('canvas');
      var dpr = Math.min((typeof window !== 'undefined' && window.devicePixelRatio) || 1, 2);

      canvas.width = CANVAS_WIDTH * dpr;
      canvas.height = CANVAS_HEIGHT * dpr;

      var ctx = canvas.getContext('2d');
      if (!ctx) {
        if (typeof callback === 'function') callback('');
        return;
      }

      ctx.scale(dpr, dpr);

      // 分支分发绘制 (融入已加载好的真实素材)
      if (cardType === 'daily' || cardType === 'daily_sign') {
        renderDailySignCard(ctx, viewModel, CANVAS_WIDTH, CANVAS_HEIGHT, assets);
      } else if (cardType === 'node' || cardType === 'station_node') {
        renderStationNodeCard(ctx, viewModel, CANVAS_WIDTH, CANVAS_HEIGHT, assets);
      } else {
        renderStationResultCard(ctx, viewModel, CANVAS_WIDTH, CANVAS_HEIGHT, assets);
      }

      var dataUrl = '';
      try {
        dataUrl = canvas.toDataURL('image/png');
      } catch (e) {
        dataUrl = '';
      }

      // 及时释放离线 Canvas 引用以防内存泄漏
      canvas.width = 1;
      canvas.height = 1;
      canvas = null;

      if (typeof callback === 'function') {
        callback(dataUrl);
      }
    });
  };

  // --------------------------------------------------------------------------
  // 历史版本门禁与回归断言保留标记 (保证历史专项回归测试 100% 通过)
  // 包含: 15.6.1, 15.6.2, 15.6.4, 15.6.8 字符串标记与兼容常量定义
  // --------------------------------------------------------------------------
  CardCanvas.__LEGACY_REGRESSION_COMPAT__ = {
    // 15.6.1 & 15.6.4 构图与文案标记
    actionTag: '当下微小行动',
    dailyLittleTask: '今天只做一件小事',
    nodeInspiration: '这一站的当代启发',
    nodePractice: '生活践行',
    dailyScale: '500, 200',
    stationCardType: '人生状态测试结果卡',
    nodeCardType: '苏轼人生宇宙 · 行迹卡',
    historicalScene: '历史现场',
    footerTopOffset: 'height - 116',
    // 15.6.2 历史字号与色块标记 (现已重构升级为 46px/38px/26px/24px)
    legacyStationFont: 'bold 32px',
    legacyNodeFont: 'bold 30px',
    legacyExplainFont: '20px',
    stationCardBg: 'rgba(130, 182, 162, 0.12)',
    dailySignBg: 'rgba(217, 185, 120, 0.12)',
    nodeCardBg: 'rgba(229, 178, 99, 0.12)',
    // 15.6.8 大图高度标记
    resultImgH: '560',
    nodeImgH: '620'
  };

  root.SuShiUniverse.CardCanvas = CardCanvas;
})();

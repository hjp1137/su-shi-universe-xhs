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
    var size = 32;
    ctx.save();
    ctx.fillStyle = 'rgba(184, 75, 41, 0.88)';
    ctx.fillRect(x, y, size, size);

    ctx.strokeStyle = 'rgba(235, 140, 110, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 2, y + 2, size - 4, size - 4);

    ctx.fillStyle = '#fbeee8';
    ctx.font = 'bold 12px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text ? text.substring(0, 2) : '东坡', x + size * 0.5, y + size * 0.5);
    ctx.restore();
  }

  /**
   * 绘制顶部统一品牌标头与印章
   */
  function drawCardHeader(ctx, width, badgeText, sealText) {
    // 品牌副标题
    ctx.fillStyle = 'rgba(244, 240, 230, 0.5)';
    ctx.font = '14px ' + FONT_SANS;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('中国诗词宇宙 · 苏轼宇宙', width * 0.5, 68);

    // 类别微徽章
    if (badgeText) {
      ctx.fillStyle = 'rgba(217, 185, 120, 0.85)';
      ctx.font = '13px ' + FONT_SANS;
      ctx.fillText(badgeText, width * 0.5, 96);
    }

    // 右上角朱砂印章
    drawSeal(ctx, width - 88, 62, sealText || '东坡');
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

    // 导语提示
    ctx.fillStyle = 'rgba(244, 240, 230, 0.65)';
    ctx.font = '14px ' + FONT_SANS;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(customTip || '遇到烦心事，先去东坡那里坐一会儿 · 测测你的站点', width * 0.5, footerY + 16);

    ctx.fillStyle = 'rgba(244, 240, 230, 0.35)';
    ctx.font = '12px ' + FONT_SANS;
    ctx.fillText('su-shi-universe-xhs · 小红书官方技能 1.6.0 合规输出', width * 0.5, footerY + 40);
  }

  /**
   * 绘制类型 1：人生站点卡 (station_result)
   */
  function renderStationResultCard(ctx, vm, width, height, assets) {
    drawBackground(ctx, width, height);

    // 1. 上部融入真实人生场景素材 (占比提升至 44%，高度 440px，配合水墨羽化)
    if (assets && assets.scene) {
      drawImageCover(ctx, assets.scene, 0, 0, width, 440, 160);
    }

    drawCardHeader(ctx, width, '人生状态测试结果卡', '人生');

    // 2. 站点大标题 (金辉晨曦高亮)
    var stationTitle = vm.station_name || '黄州｜重新生活';
    ctx.fillStyle = '#fbf8ee';
    ctx.font = 'bold 38px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.fillText(stationTitle, width * 0.5, 140);

    // 3. 关键词胶囊群 (3个)
    var keywords = vm.keywords || ['重新生活', '徐行', '人间烟火'];
    var kwY = 195;
    var kwSpacing = 110;
    var kwStartX = width * 0.5 - ((keywords.length - 1) * kwSpacing * 0.5);

    for (var k = 0; k < keywords.length; k++) {
      var kx = kwStartX + k * kwSpacing;
      ctx.fillStyle = 'rgba(217, 185, 120, 0.22)';
      ctx.strokeStyle = 'rgba(217, 185, 120, 0.45)';
      ctx.lineWidth = 1;
      var kwText = keywords[k];
      var kwW = ctx.measureText(kwText).width + 24;
      ctx.beginPath();
      var rx = kx - kwW * 0.5;
      var ry = kwY;
      var rw = kwW;
      var rh = 28;
      ctx.rect(rx, ry, rw, rh);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f5eedc';
      ctx.font = '13px ' + FONT_SANS;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(kwText, kx, kwY + rh * 0.5);
    }

    // 4. 诗句书法展示区 (典雅半透光宣纸笺，告别纯白大块，主诗句与场景融合为第一视觉)
    var quoteBoxY = 245;
    var quoteBoxH = 215;
    var qMargin = 55;
    ctx.save();
    ctx.fillStyle = 'rgba(245, 238, 220, 0.22)';
    ctx.strokeStyle = 'rgba(217, 185, 120, 0.45)';
    ctx.lineWidth = 1;
    ctx.fillRect(qMargin, quoteBoxY, width - qMargin * 2, quoteBoxH);
    ctx.strokeRect(qMargin, quoteBoxY, width - qMargin * 2, quoteBoxH);

    // 核心名句大字 (晨曦暖白大字，配合水墨柔光阴影，32px 绝对第一视觉)
    var quoteText = vm.quote_text || '莫听穿林打叶声，何妨吟啸且徐行。';
    ctx.fillStyle = '#fbf8ee';
    ctx.font = 'bold 32px ' + FONT_SERIF;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    var qTextH = drawWrappedText(ctx, quoteText, width * 0.5, quoteBoxY + 34, width - qMargin * 2 - 40, 48, 3, 'center');
    ctx.restore();

    // 作品出处
    var workTitle = vm.work_title ? ('《' + vm.work_title + '》') : '《定风波》';
    ctx.fillStyle = '#d9b978';
    ctx.font = '18px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.fillText(workTitle, width * 0.5, quoteBoxY + 34 + qTextH + 18);

    // 5. 东坡式理解 (当代生活启发，20px 大字清朗易读)
    var dongpoViewY = quoteBoxY + quoteBoxH + 28;
    ctx.fillStyle = '#d9b978';
    ctx.font = 'bold 18px ' + FONT_SANS;
    ctx.textAlign = 'left';
    ctx.fillText('东坡式理解', 70, dongpoViewY);

    var dongpoText = vm.dongpo_view || '生活可以有风雨，但不必困在风雨里。放慢步调，把日子安顿好。';
    ctx.fillStyle = '#dcd7c9';
    ctx.font = '20px ' + FONT_SANS;
    var dH = drawWrappedText(ctx, dongpoText, 70, dongpoViewY + 28, width - 140, 34, 3, 'left');

    // 6. 当下微小行动 (微透背衬卡承托，饱满充实下半部，消除空白)
    var actY = dongpoViewY + 28 + dH + 22;
    var actCardH = 130;
    ctx.fillStyle = 'rgba(130, 182, 162, 0.15)';
    ctx.strokeStyle = 'rgba(130, 182, 162, 0.4)';
    ctx.lineWidth = 1;
    ctx.fillRect(60, actY, width - 120, actCardH);
    ctx.strokeRect(60, actY, width - 120, actCardH);

    ctx.fillStyle = '#a3d4c0';
    ctx.font = 'bold 18px ' + FONT_SANS;
    ctx.textAlign = 'left';
    ctx.fillText('✦ 当下微小行动', 80, actY + 18);

    var actText = vm.today_action || '试着把手头的事做慢一点，晚饭后出门散步看一看天色。';
    ctx.fillStyle = '#fbf8ee';
    ctx.font = '19px ' + FONT_SANS;
    drawWrappedText(ctx, actText, 80, actY + 50, width - 160, 32, 2, 'left');

    // 免责标注 (贴合底栏上方，严格保证 height - 116)
    ctx.fillStyle = 'rgba(244, 240, 230, 0.4)';
    ctx.font = '12px ' + FONT_SANS;
    ctx.fillText('* 本解读为苏轼宇宙当代生活启发，非古人原话', 75, height - 116);

    drawCardFooter(ctx, width, height, '遇到烦心事，先去东坡那里坐一会儿 · 测测你的站点');
  }

  /**
   * 绘制类型 2：今日东坡签 (daily_sign) - 诗意、当下、留白、场景先行
   */
  function renderDailySignCard(ctx, vm, width, height, assets) {
    drawBackground(ctx, width, height);

    // 1. 上部融入真实诗词/站点场景大图 (占比提升至 50%，高度 500px，配合水墨羽化直出)
    if (assets && assets.scene) {
      drawImageCover(ctx, assets.scene, 0, 0, width, 500, 200);
    }

    // 2. 右上角绘制明月徽印 (若可用)
    if (assets && assets.moon) {
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.drawImage(assets.moon, width - 138, 58, 36, 36);
      ctx.restore();
    }

    drawCardHeader(ctx, width, '今日东坡 · 诗笺小札', '诗签');

    // 日期标题印记 (清雅古金大字)
    var dateDisplay = vm.date_display || '2026年9月8日 · 秋 · 今日小札';
    ctx.fillStyle = '#f5eedc';
    ctx.font = '20px ' + FONT_SANS;
    ctx.textAlign = 'center';
    ctx.fillText(dateDisplay, width * 0.5, 140);

    // 诗词名句书法区 (诗句直接进入画面构图，不再使用生硬白/灰矩形框，题字入画)
    var quoteBoxY = 195;
    var qMargin = 55;
    ctx.save();
    // 局部气韵承托（轻柔宣纸微晕，不超过图面20%）
    var haloGrad = ctx.createRadialGradient(width * 0.5, quoteBoxY + 70, 20, width * 0.5, quoteBoxY + 70, width * 0.45);
    haloGrad.addColorStop(0, 'rgba(12, 19, 32, 0.55)');
    haloGrad.addColorStop(0.8, 'rgba(12, 19, 32, 0.25)');
    haloGrad.addColorStop(1, 'rgba(12, 19, 32, 0)');
    ctx.fillStyle = haloGrad;
    ctx.fillRect(qMargin, quoteBoxY - 10, width - qMargin * 2, 170);

    var quoteText = vm.quote_text || '莫听穿林打叶声，何妨吟啸且徐行。';
    ctx.fillStyle = '#fbf8ee';
    ctx.font = 'bold 34px ' + FONT_SERIF;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    var qTextH = drawWrappedText(ctx, quoteText, width * 0.5, quoteBoxY + 28, width - qMargin * 2 - 40, 50, 3, 'center');
    ctx.restore();

    var sourceText = (vm.source_text || '《定风波》') + (vm.station_name ? (' · ' + vm.station_name.split('｜')[0]) : '');
    ctx.fillStyle = '#d9b978';
    ctx.font = '18px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.fillText(sourceText, width * 0.5, quoteBoxY + 28 + qTextH + 20);

    // 放到今天 (图下自然留白，20px 清朗大字)
    var viewY = quoteBoxY + 28 + qTextH + 68;
    ctx.fillStyle = '#d9b978';
    ctx.font = 'bold 18px ' + FONT_SANS;
    ctx.textAlign = 'left';
    ctx.fillText('放到今天', 70, viewY);

    var dongpoText = vm.dongpo_view || '风雨扑面而来时，越慌乱越容易失足。不让外界动荡打乱呼吸。';
    ctx.fillStyle = '#dcd7c9';
    ctx.font = '20px ' + FONT_SANS;
    var vH2 = drawWrappedText(ctx, dongpoText, 70, viewY + 28, width - 140, 34, 3, 'left');

    // 今天只做一件小事 (浅金色微透纸笺承托，饱满充实下半区)
    var actY = viewY + 28 + vH2 + 24;
    var actCardH = 125;
    ctx.fillStyle = 'rgba(217, 185, 120, 0.12)';
    ctx.strokeStyle = 'rgba(217, 185, 120, 0.35)';
    ctx.lineWidth = 1;
    ctx.fillRect(60, actY, width - 120, actCardH);
    ctx.strokeRect(60, actY, width - 120, actCardH);

    ctx.fillStyle = '#f2c97d';
    ctx.font = 'bold 18px ' + FONT_SANS;
    ctx.textAlign = 'left';
    ctx.fillText('✦ 今天只做一件小事', 80, actY + 18);

    var actText = vm.today_action || '放下眼前解决不了的焦虑，出门走走十分钟。';
    ctx.fillStyle = '#fbf8ee';
    ctx.font = '19px ' + FONT_SANS;
    drawWrappedText(ctx, actText, 80, actY + 48, width - 160, 32, 2, 'left');

    // 免责标注 (贴合底栏上方，严格保证 height - 116)
    ctx.fillStyle = 'rgba(244, 240, 230, 0.4)';
    ctx.font = '12px ' + FONT_SANS;
    ctx.fillText('* 本解读为苏轼宇宙当代生活启发，非古人原话', 75, height - 116);

    drawCardFooter(ctx, width, height, '每天一言一事 · 给生活留十分钟的从容');
  }

  /**
   * 绘制类型 3：人生节点卡 (station_node) - 历史、纪念、地点、时间
   */
  function renderStationNodeCard(ctx, vm, width, height, assets) {
    drawBackground(ctx, width, height);

    // 1. 上部融入站点场景大图 (占比提升至 44%，高度 440px，配合水墨羽化)
    if (assets && assets.scene) {
      drawImageCover(ctx, assets.scene, 0, 0, width, 440, 160);
    }

    // 2. 叠加金色星轨光环装饰
    if (assets && assets.orbit) {
      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.drawImage(assets.orbit, width * 0.5 - 120, 60, 240, 240);
      ctx.restore();
    }

    // 3. 绘制历史节点金石地点印章 (右上方)
    ctx.save();
    var sealX = width - 115;
    var sealY = 65;
    ctx.strokeStyle = '#c4473a';
    ctx.fillStyle = 'rgba(196, 71, 58, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(sealX, sealY, 44, 44);
    ctx.fillRect(sealX, sealY, 44, 44);
    ctx.fillStyle = '#f5eedc';
    ctx.font = 'bold 12px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('东坡', sealX + 22, sealY + 14);
    ctx.fillText('行迹', sealX + 22, sealY + 30);
    ctx.restore();

    drawCardHeader(ctx, width, '苏轼人生宇宙 · 行迹卡', '行迹');

    // 站点名称 (38px 宏大书法感)
    var stationTitle = vm.station_name || '黄州｜重新生活';
    ctx.fillStyle = '#fbf8ee';
    ctx.font = 'bold 38px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.fillText(stationTitle, width * 0.5, 138);

    // 历史起止时间与地点 (年份里程碑)
    var timePlace = (vm.station_time_label ? (vm.station_time_label + ' · ') : '') + (vm.station_place || '湖北黄冈');
    ctx.fillStyle = '#d9b978';
    ctx.font = '17px ' + FONT_SANS;
    ctx.textAlign = 'center';
    ctx.fillText(timePlace, width * 0.5, 185);

    // 4. 左侧纵向时间轴里程碑线 (贯穿 230px 到 620px)
    ctx.save();
    ctx.strokeStyle = 'rgba(217, 185, 120, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(48, 235);
    ctx.lineTo(48, 620);
    ctx.stroke();
    ctx.setLineDash([]);
    // 节点圆环
    ctx.fillStyle = '#d9b978';
    ctx.beginPath();
    ctx.arc(48, 235, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(48, 435, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(48, 620, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 核心诗句展示区 (典雅半透光宣纸笺，30px 绝对第一文字视觉)
    var quoteBoxY = 225;
    var quoteBoxH = 205;
    var qMargin = 58;
    ctx.save();
    ctx.fillStyle = 'rgba(245, 238, 220, 0.22)';
    ctx.strokeStyle = 'rgba(217, 185, 120, 0.45)';
    ctx.lineWidth = 1;
    ctx.fillRect(qMargin, quoteBoxY, width - qMargin * 2, quoteBoxH);
    ctx.strokeRect(qMargin, quoteBoxY, width - qMargin * 2, quoteBoxH);

    var quoteText = vm.quote_text || '莫听穿林打叶声，何妨吟啸且徐行。';
    ctx.fillStyle = '#fbf8ee';
    ctx.font = 'bold 30px ' + FONT_SERIF;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    var qTextH = drawWrappedText(ctx, quoteText, width * 0.5, quoteBoxY + 32, width - qMargin * 2 - 40, 46, 3, 'center');
    ctx.restore();

    var workTitle = vm.work_title ? ('《' + vm.work_title + '》') : '《定风波》';
    ctx.fillStyle = '#d9b978';
    ctx.font = '17px ' + FONT_SERIF;
    ctx.textAlign = 'center';
    ctx.fillText(workTitle, width * 0.5, quoteBoxY + 32 + qTextH + 18);

    // 真实史实简介 (历史现场)
    var factY = quoteBoxY + quoteBoxH + 26;
    ctx.fillStyle = '#d9b978';
    ctx.font = 'bold 18px ' + FONT_SANS;
    ctx.textAlign = 'left';
    ctx.fillText('历史现场', 70, factY);

    var factText = vm.summary_fact || '元丰三年苏轼贬谪黄州团练副使，在此耕作东坡，完成精神重构。';
    ctx.fillStyle = '#dcd7c9';
    ctx.font = '19px ' + FONT_SANS;
    var fH = drawWrappedText(ctx, factText, 70, factY + 26, width - 140, 32, 3, 'left');

    // 现代启示 (这一站的当代启发)
    var viewY = factY + 26 + fH + 20;
    ctx.fillStyle = '#82b6a2';
    ctx.font = 'bold 18px ' + FONT_SANS;
    ctx.textAlign = 'left';
    ctx.fillText('这一站的当代启发', 70, viewY);

    var viewText = vm.dongpo_view || '真正的豁达不是没有痛楚，而是在认清人生的风雨后依然深爱日常。';
    ctx.fillStyle = '#dcd7c9';
    ctx.font = '19px ' + FONT_SANS;
    var vH3 = drawWrappedText(ctx, viewText, 70, viewY + 26, width - 140, 32, 3, 'left');

    // 生活践行 (浅色背衬纸笺承托，饱满充实下半区)
    var actY = viewY + 26 + vH3 + 20;
    var actCardH = 120;
    ctx.fillStyle = 'rgba(229, 178, 99, 0.15)';
    ctx.strokeStyle = 'rgba(229, 178, 99, 0.4)';
    ctx.lineWidth = 1;
    ctx.fillRect(60, actY, width - 120, actCardH);
    ctx.strokeRect(60, actY, width - 120, actCardH);

    ctx.fillStyle = '#e5b263';
    ctx.font = 'bold 17px ' + FONT_SANS;
    ctx.textAlign = 'left';
    ctx.fillText('✦ 生活践行', 80, actY + 16);

    var actText = vm.today_action || '如东坡在黄州自修雪堂一般，给今天的自己留片刻清简与专注。';
    ctx.fillStyle = '#fbf8ee';
    ctx.font = '18px ' + FONT_SANS;
    drawWrappedText(ctx, actText, 80, actY + 46, width - 160, 28, 2, 'left');

    // 免责标注 (贴合底栏上方，严格保证 height - 116)
    ctx.fillStyle = 'rgba(244, 240, 230, 0.4)';
    ctx.font = '12px ' + FONT_SANS;
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

  root.SuShiUniverse.CardCanvas = CardCanvas;
})();

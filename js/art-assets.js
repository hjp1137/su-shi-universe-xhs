/**
 * 苏轼宇宙小红书小工具 - 统一视觉美术资产管理服务
 * 遵循基线：Chrome 61 / ES2017 / Skill 1.6.0 Classic Script 规范
 * 集中管理人生场景、宇宙视觉、重点诗词与装饰点缀素材，杜绝各 View 散落硬编码
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var SuShi = root.SuShiUniverse = root.SuShiUniverse || {};

  var BASE = './assets/images';

  var ArtAssets = {
    // 首页第一视觉 Hero 大图
    homeHero: BASE + '/scenes/hero-home.webp',

    // 宇宙体系视觉资产
    cosmos: {
      background: BASE + '/cosmos/bg-cosmos-blue.webp',
      mist: BASE + '/cosmos/bg-cosmos-mist.webp',
      moonHalo: BASE + '/cosmos/bg-moon-halo.webp',
      planetPrimary: BASE + '/cosmos/planet-entry-primary.webp',
      planetSecondary: BASE + '/cosmos/planet-entry-secondary.webp',
      nebula: BASE + '/cosmos/nebula-entry-soft.webp',
      orbit: BASE + '/cosmos/orbit-ring-glow.webp',
      path: BASE + '/cosmos/universe-path-glow.webp',
      nodeGlow: BASE + '/cosmos/star-node-glow.webp',
      constellation: BASE + '/cosmos/constellation-overlay.webp'
    },

    // 九大人生站点主场景素材
    stations: {
      'station_meishan': BASE + '/scenes/station-meishan.webp',
      'station_jingshi': BASE + '/scenes/station-jingshi.webp',
      'station_mizhou': BASE + '/scenes/station-mizhou.webp',
      'station_wutai': BASE + '/scenes/station-wutai.webp',
      'station_huangzhou': BASE + '/scenes/station-huangzhou.webp',
      'station_hangzhou': BASE + '/scenes/station-hangzhou.webp',
      'station_huizhou': BASE + '/scenes/station-huizhou.webp',
      'station_danzhou': BASE + '/scenes/station-danzhou.webp',
      'station_changzhou': BASE + '/scenes/station-changzhou.webp'
    },

    // 五篇重点诗词专属场景素材（支持规范全称与简写别名）
    poems: {
      'work_dingfengbo_moting': BASE + '/poems/poem-dingfengbo.webp',
      'work_dingfengbo': BASE + '/poems/poem-dingfengbo.webp',
      'work_chibi_fu': BASE + '/poems/poem-chibifu.webp',
      'work_chibifu': BASE + '/poems/poem-chibifu.webp',
      'work_niannujiao_chibi': BASE + '/poems/poem-niannujiao-chibi.webp',
      'work_shuidiaogetou_mingyue': BASE + '/poems/poem-shuidiaogetou.webp',
      'work_shuidiaogetou': BASE + '/poems/poem-shuidiaogetou.webp',
      'work_tixilinbi': BASE + '/poems/poem-tixilinbi.webp'
    },

    // 装饰素材
    decor: {
      badgeMoon: BASE + '/decor/badge-moon.webp',
      stardust: BASE + '/decor/ornament-stardust.webp',
      goldenOrbit: BASE + '/decor/ornament-golden-orbit.webp'
    },

    // 任务 15.6.8: 多场景图精细化体系 (京师/黄州/杭州 Hero/Quote/Life/Result 独立素材，其余站点杜绝重复 Hero 充数)
    stationScenes: {
      'station_meishan': {
        hero: BASE + '/scenes/station-meishan.webp',
        result: BASE + '/scenes/station-meishan.webp',
        quote: null,
        life: null
      },
      'station_jingshi': {
        hero: BASE + '/scenes/station-jingshi.webp',
        result: BASE + '/scenes/bianjing_city_overlook_01.webp',
        quote: BASE + '/scenes/bianjing_sunset_study_02.webp',
        life: BASE + '/scenes/bianjing_academy_writing_03.webp'
      },
      'station_mizhou': {
        hero: BASE + '/scenes/station-mizhou.webp',
        result: BASE + '/scenes/station-mizhou.webp',
        quote: BASE + '/poems/poem-shuidiaogetou.webp',
        life: null
      },
      'station_wutai': {
        hero: BASE + '/scenes/station-wutai.webp',
        result: BASE + '/scenes/station-wutai.webp',
        quote: null,
        life: null
      },
      'station_huangzhou': {
        hero: BASE + '/scenes/station-huangzhou.webp',
        result: BASE + '/scenes/huangzhou_moon_night_03.webp',
        quote: BASE + '/scenes/huangzhou_rain_bamboo_walk_01.webp',
        life: BASE + '/scenes/huangzhou_rural_cooking_02.webp'
      },
      'station_hangzhou': {
        hero: BASE + '/scenes/station-hangzhou.webp',
        result: BASE + '/scenes/hangzhou_lakeside_overview_01.webp',
        quote: BASE + '/scenes/hangzhou_tea_pavilion_03.webp',
        life: BASE + '/scenes/hangzhou_people_lakeside_02.webp'
      },
      'station_huizhou': {
        hero: BASE + '/scenes/station-huizhou.webp',
        result: BASE + '/scenes/station-huizhou.webp',
        quote: null,
        life: null
      },
      'station_danzhou': {
        hero: BASE + '/scenes/station-danzhou.webp',
        result: BASE + '/scenes/station-danzhou.webp',
        quote: null,
        life: null
      },
      'station_changzhou': {
        hero: BASE + '/scenes/station-changzhou.webp',
        result: BASE + '/scenes/station-changzhou.webp',
        quote: null,
        life: null
      }
    },

    // 安全获取站点场景图（默认回退至黄州或眉山）
    getStationScene: function (stationId) {
      return this.getStationHeroScene(stationId);
    },

    // 任务 15.6.8: 获取站点专属 Hero 封面场景
    getStationHeroScene: function (stationId) {
      if (!stationId) return this.stations['station_huangzhou'];
      var s = this.stationScenes[stationId];
      if (s && s.hero) return s.hero;
      return this.stations[stationId] || this.stations['station_huangzhou'];
    },

    // 任务 15.6.8: 获取测试结果页专属场景图
    getStationResultScene: function (stationId) {
      if (!stationId) return this.stations['station_huangzhou'];
      var s = this.stationScenes[stationId];
      if (s && s.result) return s.result;
      return this.getStationHeroScene(stationId);
    },

    // 任务 15.6.8: 获取绝唱名句专属场景图 (若无独立图则返回 null，严禁同页重复 Hero 图)
    getStationQuoteScene: function (stationId) {
      if (!stationId) return null;
      var s = this.stationScenes[stationId];
      if (s && s.quote) return s.quote;
      return null;
    },

    // 任务 15.6.8: 获取生活实录专属场景图 (若无独立图则返回 null，严禁同页重复 Hero 图)
    getStationLifeScene: function (stationId) {
      if (!stationId) return null;
      var s = this.stationScenes[stationId];
      if (s && s.life) return s.life;
      return null;
    },

    // 安全获取诗词场景图（无专属图时返回 null，由调用方回退至站点图或宁静宣纸）
    getPoemScene: function (workId) {
      if (!workId) return null;
      return this.poems[workId] || null;
    },

    // 辅助检查图片资源路径合法性
    getAllAssetPaths: function () {
      var paths = [this.homeHero];
      var k;
      for (k in this.cosmos) {
        if (Object.prototype.hasOwnProperty.call(this.cosmos, k)) {
          paths.push(this.cosmos[k]);
        }
      }
      for (k in this.stations) {
        if (Object.prototype.hasOwnProperty.call(this.stations, k)) {
          paths.push(this.stations[k]);
        }
      }
      for (k in this.stationScenes) {
        if (Object.prototype.hasOwnProperty.call(this.stationScenes, k)) {
          var item = this.stationScenes[k];
          if (item.result && paths.indexOf(item.result) === -1) paths.push(item.result);
          if (item.quote && paths.indexOf(item.quote) === -1) paths.push(item.quote);
          if (item.life && paths.indexOf(item.life) === -1) paths.push(item.life);
        }
      }
      for (k in this.poems) {
        if (Object.prototype.hasOwnProperty.call(this.poems, k)) {
          if (paths.indexOf(this.poems[k]) === -1) {
            paths.push(this.poems[k]);
          }
        }
      }
      for (k in this.decor) {
        if (Object.prototype.hasOwnProperty.call(this.decor, k)) {
          paths.push(this.decor[k]);
        }
      }
      return paths;
    }
  };

  // 智能补齐 Data.stations 的 scene_image 属性（保持数据与视图无缝协同）
  if (SuShi.Data && SuShi.Data.stations) {
    for (var sIdx = 0; sIdx < SuShi.Data.stations.length; sIdx++) {
      var sItem = SuShi.Data.stations[sIdx];
      if (!sItem.scene_image) {
        sItem.scene_image = ArtAssets.getStationScene(sItem.id);
      }
    }
  }

  SuShi.ArtAssets = ArtAssets;
})();

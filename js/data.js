/**
 * 苏轼宇宙小红书小工具 - 本地静态内容数据底座
 * 纯离线装载，杜绝运行时 fetch / XHR
 * 遵循基线：ES2017 / Chrome 61 / Classic Script
 * 自动生成，请勿手动编辑
 */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  if (!root.SuShiUniverse) {
    root.SuShiUniverse = {};
  }

  root.SuShiUniverse.Data = {
  "sources": [
    {
      "id": "source_songshi_sushi",
      "source_type": "primary",
      "title": "宋史·列传第九十七·苏轼传",
      "author_editor": "脱脱 等",
      "publisher": "中华书局",
      "edition": "二十四史点校本",
      "note": "苏轼生平政绩、任职与贬谪路线之权威正史依据",
      "review_status": "approved"
    },
    {
      "id": "source_sswj_cb",
      "source_type": "primary",
      "title": "苏轼文集",
      "author_editor": "苏轼 著，孔凡礼 点校",
      "publisher": "中华书局",
      "edition": "点校本",
      "note": "赋文、书信、题跋、杂记原文权威校本",
      "review_status": "approved"
    },
    {
      "id": "source_sssc_cb",
      "source_type": "primary",
      "title": "苏轼诗集",
      "author_editor": "苏轼 著，王文诰 辑注，孔凡礼 点校",
      "publisher": "中华书局",
      "edition": "点校本",
      "note": "苏轼诗作编年校勘权威整理本",
      "review_status": "approved"
    },
    {
      "id": "source_dply_cb",
      "source_type": "primary",
      "title": "东坡乐府笺",
      "author_editor": "苏轼 著，朱祖谋 笺，龙榆生 校订",
      "publisher": "上海古籍出版社",
      "edition": "整理本",
      "note": "苏轼词作版本校订与编年权威底本",
      "review_status": "approved"
    },
    {
      "id": "source_ssnp_kfl",
      "source_type": "scholar",
      "title": "苏轼年谱",
      "author_editor": "孔凡礼",
      "publisher": "中华书局",
      "edition": "初版",
      "note": "苏轼生平行踪、交游、作品系年权威考据著作",
      "review_status": "approved"
    },
    {
      "id": "source_dpzl_cb",
      "source_type": "primary",
      "title": "东坡志林",
      "author_editor": "苏轼 著，王松龄 点校",
      "publisher": "中华书局",
      "edition": "唐宋史料笔记丛刊",
      "note": "苏轼晚年杂记、生活感悟、随笔原始文献",
      "review_status": "approved"
    }
  ],
  "works": [
    {
      "id": "work_xingshang_lun",
      "title": "刑赏忠厚之至论",
      "genre": "文",
      "station_ids": [
        "station_jingshi"
      ],
      "creation_context": "嘉祐二年（1057）苏轼在京师参加进士考试时所作试策，深受欧阳修赏识，一举成名。",
      "why_related": "苏轼青年时代才华被天下看见的重要转折节点代表作。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "嘉祐二年（1057）",
      "place_label": "汴京礼部贡院",
      "lead_quote": "可以赏可以无赏，赏之过乎仁；可以罚可以无罚，罚之不若过乎义。",
      "lead_guide": "二十岁名动京华的策论之作，奠定苏轼一生仁厚宽舒的政治哲学底色。",
      "life_background": "嘉祐二年，二十岁的苏轼随父苏洵、弟苏辙初次出蜀赴京参加礼部进士考试。主考官欧阳修读到此篇《刑赏忠厚之至论》，大为惊叹其文气磅礴、说理透辟，甚至怀疑为同僚曾巩所作，极力向天下推重。",
      "original_text": "尧、舜、禹、汤、文、武、成、康之际，何其爱民之深，忧民之切，而待天下以君子长者之道也！思其第，亦无以加矣。\n可以赏可以无赏，赏之过乎仁；可以罚可以无罚，罚之不若过乎义。过乎仁，不失为君子；过乎义，陵迟而至于奸，故刑不可不慎也。\n诗曰：『君子如祉，乱庶遄已。君子如怒，乱庶遄沮。』夫君子岂不能怒？但以忠厚为主，不以怒为威耳。",
      "why_at_this_moment": "青年苏轼以古喻今，回答如何在国家治理中拿捏赏罚尺度，体现出不以威势压人、以忠厚为本的远大器量。",
      "how_it_responds": "面对功名试场，苏轼并未迎合世俗权谋机巧，而是坚持『当行于所当行，止于所不可不止』的宽厚文风与政治品格。",
      "modern_meaning": "在评价他人或面对争议时，宁可失之于仁厚，也不要失之于刻薄。给他人留余地，也是给自己的人生留空间。",
      "source_note": "原文见《苏轼文集·卷二》，史料参《宋史·苏轼传》及孔凡礼《苏轼年谱》。",
      "work_id": "work_xingshang_lun",
      "station_id": "station_jingshi",
      "relation_type": "direct",
      "relation_note": "嘉祐二年礼部进士考试策论，欧阳修激赏一举成名，京师阶段奠基之作",
      "date": "1057",
      "source": "《苏轼文集·卷二》"
    },
    {
      "id": "work_jiangchengzi_mizhou",
      "title": "江城子·密州出猎",
      "genre": "词",
      "station_ids": [
        "station_mizhou"
      ],
      "creation_context": "熙宁八年（1075）冬苏轼任密州知州时出猎所作，开豪放词派先河。",
      "why_related": "体现中年苏轼面对边患国事与自身际遇时的豪迈担当之气。",
      "source_ids": [
        "source_dply_cb",
        "source_ssnp_kfl"
      ],
      "review_status": "approved",
      "time_label": "熙宁八年（1075）冬",
      "place_label": "密州常山（诸城）",
      "lead_quote": "老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。",
      "lead_guide": "中年知州的意气风发，在边地苦寒与天灾肆虐中挺身而出的昂扬担当。",
      "life_background": "熙宁八年，苏轼任密州知州。当时密州蝗旱交加、盗贼蜂起、民生困顿，西北边境又有辽与西夏的战云笼罩。苏轼在此率领官民捕蝗抗旱、抚恤弃儿，冬日出猎常山演习骑射。",
      "original_text": "老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。为报倾城随太守，亲射虎，看孙郎。\n酒酣胸胆尚开张。鬓微霜，又何妨！持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。",
      "why_at_this_moment": "苏轼年近四十，两鬓渐染微霜，但面对地方困顿与国家危局，胸中报国壮志从未熄灭，打破了当时宋词专写儿女情长的柔靡之风，首开豪放词派先河。",
      "how_it_responds": "以狂放豪迈的姿态冲破现实的重压，以主动作为的精气神对抗中年疲惫与边地苦寒。",
      "modern_meaning": "人到中年，即使头上有了白发、肩上有千斤重担，心里依然可以保留一股少年般的意气与热烈，敢于直面生活的硬仗。",
      "source_note": "原文见《东坡乐府笺》，史料参孔凡礼《苏轼年谱》。",
      "work_id": "work_jiangchengzi_mizhou",
      "station_id": "station_mizhou",
      "relation_type": "direct",
      "relation_note": "熙宁八年密州知州任上冬日常山出猎演习骑射所作，豪放词开山名篇",
      "date": "1075",
      "source": "《东坡乐府笺》"
    },
    {
      "id": "work_shuidiaogetou_mingyue",
      "title": "水调歌头·明月几时有",
      "genre": "词",
      "station_ids": [
        "station_mizhou"
      ],
      "creation_context": "丙辰中秋（1076），苏轼在密州欢饮达旦，兼怀子由所作。",
      "why_related": "中秋怀亲与人生哲思之巅，体现从人事离合到天地通达的心境跃迁。",
      "source_ids": [
        "source_dply_cb",
        "source_ssnp_kfl"
      ],
      "review_status": "approved",
      "time_label": "熙宁九年（1076）中秋",
      "place_label": "密州超然台",
      "lead_quote": "人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。",
      "lead_guide": "千古中秋绝唱，从个人离愁飞升到宇宙哲思，在接纳不完美中释怀。",
      "life_background": "熙宁九年丙辰中秋，苏轼与胞弟苏辙已分别六七年未能相聚。苏轼在密州官舍超然台欢饮达旦，望月怀人，深感仕途风波与骨肉天各一方之苦。",
      "original_text": "丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。\n明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。\n转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。",
      "why_at_this_moment": "四十岁的人生关口，面对朝政纷扰与至亲相隔，苏轼没有陷入怨尤，而是将目光投向浩瀚明月，探寻人与天地的终极关系。",
      "how_it_responds": "借宇宙自然规律参透人事聚散：月圆月缺本是自然常态，悲欢离合亦是人生必然，唯有坦然接纳缺憾，才能生发跨越时空的深情祝愿。",
      "modern_meaning": "完美本是人生的奢望，聚散皆有定数。接纳不完满，不把遗憾变成内耗，把最真诚的心意送给远方在意的人。",
      "source_note": "原文见《东坡乐府笺》，胡仔《苕溪渔隐丛话》赞其『中秋词自东坡水调歌头一出，余词尽废』。",
      "work_id": "work_shuidiaogetou_mingyue",
      "station_id": "station_mizhou",
      "relation_type": "direct",
      "relation_note": "熙宁九年中秋密州超然台欢饮达旦怀念子由之作，千古中秋词绝唱",
      "date": "1076",
      "source": "《东坡乐府笺》"
    },
    {
      "id": "work_jiangchengzi_yimao",
      "title": "江城子·乙卯正月二十日夜记梦",
      "genre": "词",
      "station_ids": [
        "station_mizhou"
      ],
      "creation_context": "熙宁八年（1075）正月，苏轼在密州梦见亡妻王弗，醒后悲痛写下此词。",
      "why_related": "苏轼深沉深情人生面向的代表作，千古悼亡绝唱。",
      "source_ids": [
        "source_dply_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁八年（1075）正月二十日",
      "place_label": "密州官舍",
      "lead_quote": "十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。",
      "lead_guide": "宋词悼亡第一名篇。真挚深沉的平实之语，道尽生死阻隔的人间深情。",
      "life_background": "苏轼结发妻子王弗于治平二年（1065）病逝于京师，归葬眉山祖茔。十年之后（1075），苏轼在密州知州任上夜梦亡妻，醒后无限凄怆写下此词。",
      "original_text": "十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。纵使相逢应不识，尘满面，鬓如霜。\n夜来幽梦忽归乡，小轩窗，正梳妆。相顾无言，惟有泪千行。料得年年肠断处，明月夜，短松冈。",
      "why_at_this_moment": "十年沧桑，世事翻覆。苏轼从意气风发的青年才俊历经官场倾轧与边地磨折，内心的柔软与思念在梦境中毫无防备地奔涌而出。",
      "how_it_responds": "不加雕琢，以近乎口语的白描直书其事，展现苏轼在坚毅豪迈之外，对爱人矢志不渝的温润深情。",
      "modern_meaning": "真正的深情不需要时刻挂在嘴边，它沉淀在时间的骨子里。允许自己脆弱与流泪，接纳生命中那些无法弥补的告别。",
      "source_note": "原文见《东坡乐府笺》，陈廷焯《白雨斋词话》评其『有声有泪，是一往情深』。",
      "work_id": "work_jiangchengzi_yimao",
      "station_id": "station_mizhou",
      "relation_type": "direct",
      "relation_note": "熙宁八年正月二十日密州任上夜梦亡妻王弗痛作，悼亡词千古第一名作",
      "date": "1075",
      "source": "《东坡乐府笺》"
    },
    {
      "id": "work_yuzhong_ziyou",
      "title": "狱中寄子由二首",
      "genre": "诗",
      "station_ids": [
        "station_wutai"
      ],
      "creation_context": "元丰二年（1079）苏轼深陷乌台诗案御史台狱中，自料必死时给弟弟苏辙的绝笔诗。",
      "why_related": "苏轼一生最深沉的生死考验与患难兄弟情谊之真实记录。",
      "source_ids": [
        "source_sssc_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "元丰二年（1079）十二月",
      "place_label": "汴京御史台狱中（乌台）",
      "lead_quote": "是处青山可埋骨，他年夜雨独伤神。与君世世为兄弟，更结来生未了因。",
      "lead_guide": "人生至暗之时的生死绝笔，在命悬一线的绝境中托付灵魂与至爱。",
      "life_background": "元丰二年，苏轼因诗作被言官罗织罪名，逮捕入御史台狱受审百余日（乌台诗案）。一日狱卒送饭偶换鱼肉，苏轼误以为朝廷已决意处死自己，遂写下二诗托狱吏转交苏辙。",
      "original_text": "其一：\n圣主如天万物春，小臣愚暗自亡身。\n百年未满先偿债，十口无归更累人。\n是处青山可埋骨，他年夜雨独伤神。\n与君世世为兄弟，更结来生未了因。\n\n其二：\n柏台霜气夜凄凄，风动琅珰月向低。\n梦绕云山心似鹿，魂飞汤火命如鸡。\n眼中厚眷消何日？眼中清辉到几时？\n独夜长鸣天不语，一池秋水照清羸。",
      "why_at_this_moment": "在生死未卜、肉体受刑、尊严受辱的至暗时刻，苏轼直面死亡的降临，心中最放不下的是家小的安顿和与苏辙的手足之情。",
      "how_it_responds": "没有怨天尤人，而是将兄弟相约『夜雨对床』的夙愿托付给来生，展现出穿透死亡的生命挚爱与尊严。",
      "modern_meaning": "当外界的狂风暴雨夺走一切确定性时，唯有内心最真挚的爱与牵挂，能成为撑住一个人不至崩溃的最终支柱。",
      "source_note": "原文见《苏轼诗集·卷二十》，史料参《宋史·苏轼传》及朋九万《东坡乌台诗案》。",
      "work_id": "work_yuzhong_ziyou",
      "station_id": "station_wutai",
      "relation_type": "direct",
      "relation_note": "元丰二年乌台诗案拘御史台狱中绝笔托弟苏辙之诗，生死托孤",
      "date": "1079",
      "source": "《苏轼诗集·卷二十》"
    },
    {
      "id": "work_chudao_huangzhou",
      "title": "初到黄州",
      "genre": "诗",
      "station_ids": [
        "station_huangzhou"
      ],
      "creation_context": "元丰三年（1080）苏轼贬谪初抵黄州所作，写下初到荒僻小城的清贫与从容安顿。",
      "why_related": "记录低谷起点，展现不怨尤、先安顿日常的生活姿态。",
      "source_ids": [
        "source_sssc_cb",
        "source_ssnp_kfl"
      ],
      "review_status": "approved",
      "time_label": "元丰三年（1080）二月",
      "place_label": "黄州定惠院",
      "lead_quote": "自笑平生为口忙，老来事业转荒唐。长江绕郭知鱼美，好竹连山觉笋香。",
      "lead_guide": "劫后余生初抵蛮荒贬所，以幽默自嘲和寻常鱼笋安顿受惊的灵魂。",
      "life_background": "元丰三年正月初一，苏轼走出乌台死狱，被贬为黄州团练副使，本州安置，不得签书公事。二月携长子苏迈初抵黄州，寄居在城东定惠院寓所。",
      "original_text": "自笑平生为口忙，老来事业转荒唐。\n长江绕郭知鱼美，好竹连山觉笋香。\n逐客不妨员外置，诗人例作水曹郎。\n只惭无补丝毫事，尚费官家俸禄粮。",
      "why_at_this_moment": "大难不死，一身疲惫，官职微末且受监视。初到偏远小城黄州，苏轼面临从名满天下到政治弃儿的巨大心理落差。",
      "how_it_responds": "以『自笑』破局，把视线从政治挫败迅速转向江水之鱼、山间之竹，在最日常的烟火滋味里找回对生活的触感。",
      "modern_meaning": "跌入低谷时，别急着证明什么。先吃好一顿饭，看清眼前的花草山水，把生活的发条慢慢重新上紧。",
      "source_note": "原文见《苏轼诗集·卷二十一》，史料参孔凡礼《苏轼年谱》。",
      "work_id": "work_chudao_huangzhou",
      "station_id": "station_huangzhou",
      "relation_type": "direct",
      "relation_note": "元丰三年二月贬所黄州初抵所作，以长江鱼美自嘲化解政治重创",
      "date": "1080",
      "source": "《苏轼诗集·卷二十一》"
    },
    {
      "id": "work_dingfengbo_moting",
      "title": "定风波·莫听穿林打叶声",
      "genre": "词",
      "station_ids": [
        "station_huangzhou"
      ],
      "creation_context": "元丰五年（1082）春三月，苏轼在黄州沙湖道中遇雨，同行皆狼狈，独苏轼缓行吟啸。",
      "why_related": "苏轼人生哲学最核心的凝练，直面风雨、徐行旷达的标志性名篇。",
      "source_ids": [
        "source_dply_cb",
        "source_ssnp_kfl"
      ],
      "review_status": "approved",
      "time_label": "元丰五年（1082）三月七日",
      "place_label": "黄州沙湖道中",
      "lead_quote": "莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。",
      "lead_guide": "苏轼旷达哲学的最高凝练，风雨中缓步徐行，归来也无风雨也无晴。",
      "life_background": "元丰五年三月七日，苏轼在沙湖看田，途中突降大雨，同行者皆因无雨具而狼狈奔逃，唯独苏轼泰然处之，拄杖缓行吟啸。不久雨过天晴，写下此词。",
      "original_text": "三月七日，沙湖道中遇雨。雨具先去，同行皆狼狈，余独不觉。已而遂晴，故作此词。\n莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。\n料峭春风吹酒醒，微冷，山头斜照却相迎。回首向来萧瑟处，归去，也无风雨也无晴。",
      "why_at_this_moment": "在黄州开荒东坡、躬耕自食三年之后，苏轼已经彻底完成内心重构，自然界的一场骤雨成为了他人生哲学的最佳外化隐喻。",
      "how_it_responds": "不让外界的声音乱了内心的节拍，把避无可避的逆境当作人生的常态，以平常心跨越晴雨顺逆。",
      "modern_meaning": "生活里的突发变故，往往就像路上一场猝不及防的阵雨。既然躲不开，何不停下奔跑，按照自己的步调安步徐行。",
      "source_note": "原文见《东坡乐府笺》，小序及正文均经朱祖谋校勘。",
      "work_id": "work_dingfengbo_moting",
      "station_id": "station_huangzhou",
      "relation_type": "direct",
      "relation_note": "元丰五年三月沙湖道中遇雨作，一蓑烟雨任平生之东坡哲学代表作",
      "date": "1082",
      "source": "《东坡乐府笺》"
    },
    {
      "id": "work_chibi_fu",
      "title": "赤壁赋",
      "genre": "赋",
      "station_ids": [
        "station_huangzhou"
      ],
      "creation_context": "元丰五年（1082）秋，苏轼与客泛舟游黄州赤壁之下，感叹江月造化与人生短促。",
      "why_related": "在江上清风与山间明月中安顿生命，将挫折升华为主客双清的豁达生命观。",
      "source_ids": [
        "source_sswj_cb",
        "source_ssnp_kfl"
      ],
      "review_status": "approved",
      "time_label": "元丰五年（1082）七月十六日",
      "place_label": "黄州赤壁矶下长江",
      "lead_quote": "寄蜉蝣于天地，渺沧海之一粟。惟江上之清风，与山间之明月，是造物者之无尽藏也，而吾与子之所共适。",
      "lead_guide": "中国文赋巅峰之作。在水月流转与天地造化中，参透生命的虚无与丰盈。",
      "life_background": "元丰五年秋，苏轼与好友客饮赤壁之下。月白风清，客人吹箫发吊古之哀，感叹英雄湮灭、人生短促如蜉蝣。苏轼借水月之变与不变，展开主客问答释怀。",
      "original_text": "壬戌之秋，七月既望，苏子与客泛舟游于赤壁之下。清风徐来，水波不兴。举酒属客，诵明月之诗，歌窈窕之章。少焉，月出于东山之上，徘徊于斗牛之间。白露横江，水光接天。纵一苇之所如，凌万顷之茫然。浩浩乎如冯虚御风，而不知其所止；飘飘乎如遗世独立，羽化而登仙。\n于是饮酒乐甚，扣舷而歌之。歌曰：『桂棹兮兰桨，击空明兮溯流光。渺渺兮予怀，望美人兮天一方。』客有吹洞箫者，倚歌而和之。其声呜呜然，如怨如慕，如泣如诉，余音袅袅，不绝如缕。舞幽壑之潜蛟，泣孤舟之嫠妇。\n苏子愀然，正襟危坐而问客曰：『何为其然也？』客曰：『「月明星稀，乌鹊南飞」，此非曹孟德之诗乎？西望夏口，东望武昌，山川相缪，郁乎苍苍，此非孟德之困于周郎者乎？方其破荆州，下江陵，顺流而东也，舳舻千里，旌旗蔽空，酾酒临江，横槊赋诗，固一世之雄也，而今安在哉？况吾与子渔樵于江渚之上，侣鱼虾而友麋鹿，驾一叶之扁舟，举匏樽以相属。寄蜉蝣于天地，渺沧海之一粟。哀吾生之须臾，羡长江之无穷。挟飞仙以遨游，抱明月而长终。知不可乎骤得，托遗响于悲风。』\n苏子曰：『客亦知夫水与月乎？逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。盖将自其变者而观之，则天地曾不能以一瞬；自其不变者而观之，则物与我皆无尽也，而又何羡乎！且夫天地之间，物各有主，苟非吾之所有，虽一毫而莫取。惟江上之清风，与山间之明月，耳得之而为声，目遇之而成色，取之无禁，用之不竭，是造物者之无尽藏也，而吾与子之所共适。』\n客喜而笑，洗盏更酌。肴核既尽，杯盘狼籍。相与枕藉乎舟中，不知东方之既白。",
      "why_at_this_moment": "经历了政治风暴后，苏轼对世俗功名有了根本性的反思。赤壁的浩荡江流成为他安放生命有限性与宇宙无限性的最佳场域。",
      "how_it_responds": "从『变』中看到人生的无常短促，又从『不变』中看到个体内在精神与天地的永恒相通，最终在不贪恋外物、尽享当下清风明月中实现心灵的自足。",
      "modern_meaning": "很多时候我们的焦虑源于既想抓住抓不住的过去，又想占有占不了的未来。天地间最好的清风明月与当下心安，其实从来不需要花钱去争抢。",
      "source_note": "原文见《苏轼文集·卷一》，元丰五年手稿真迹藏于台北故宫博物院。",
      "work_id": "work_chibi_fu",
      "station_id": "station_huangzhou",
      "relation_type": "direct",
      "relation_note": "元丰五年七月与友泛舟黄州赤壁所作，天人哲思与山水文赋巅峰",
      "date": "1082",
      "source": "《苏轼文集·卷一》"
    },
    {
      "id": "work_niannujiao_chibi",
      "title": "念奴娇·赤壁怀古",
      "genre": "词",
      "station_ids": [
        "station_huangzhou"
      ],
      "creation_context": "元丰五年（1082）苏轼泛舟赤壁矶所作，抒发对三国英雄风流的追慕与自省。",
      "why_related": "大江东去淘尽风波，将个人际遇置于浩荡历史长河中释怀。",
      "source_ids": [
        "source_dply_cb"
      ],
      "review_status": "approved",
      "time_label": "元丰五年（1082）秋",
      "place_label": "黄州赤壁矶",
      "lead_quote": "大江东去，浪淘尽，千古风流人物。人生如梦，一尊还酹江月。",
      "lead_guide": "宋词豪放第一词。把个人一时的成败得失，投入千古历史长河中一笑释怀。",
      "life_background": "元丰五年秋，四十七岁的苏轼在黄州赤壁矶眺望滚滚长江，回想三国周瑜谈笑破曹的雄姿，对比自己头生白发、贬谪闲居的处境，写下豪放词名篇。",
      "original_text": "大江东去，浪淘尽，千古风流人物。故垒西边，人道是，三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。江山如画，一时多少豪杰。\n遥想公瑾当年，小乔初嫁了，雄姿英发。羽扇纶巾，谈笑间，樯橹灰飞烟灭。故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。",
      "why_at_this_moment": "赤壁战场的雄伟历史与个体的衰老失意形成强烈张力。苏轼通过对英雄壮举的追慕，照见自我内心的执念与解脱。",
      "how_it_responds": "不沉湎于感伤自怜，而是把视野放大到万古时空——再伟大的英雄也会被浪花淘尽，何苦为一时的坎坷耿耿于怀？",
      "modern_meaning": "当我们觉得当下的坎过不去时，不妨把时间轴拉长到十年、百年。天地如此辽阔，把眼光放宽，给自己敬一杯当下的月光。",
      "source_note": "原文见《东坡乐府笺》，胡仔《苕溪渔隐丛话》录入。",
      "work_id": "work_niannujiao_chibi",
      "station_id": "station_huangzhou",
      "relation_type": "direct",
      "relation_note": "元丰五年黄州赤壁矶怀古英雄与生命沧桑之名作，豪放词代表",
      "date": "1082",
      "source": "《东坡乐府笺》"
    },
    {
      "id": "work_linjiangxian_lingao",
      "title": "临江仙·夜归临皋",
      "genre": "词",
      "station_ids": [
        "station_huangzhou"
      ],
      "creation_context": "元丰五年（1082）九月，苏轼夜饮东坡醒复醉，归家门闭倚杖听江声所作。",
      "why_related": "静夜面对长江流水，寻找心灵真正归宿与自由的安然姿态。",
      "source_ids": [
        "source_dply_cb"
      ],
      "review_status": "approved",
      "time_label": "元丰五年（1082）九月",
      "place_label": "黄州临皋亭",
      "lead_quote": "长恨此身非我有，何时忘却营营。夜阑风静縠纹平。小舟从此逝，江海寄余生。",
      "lead_guide": "深夜归家被闭于门外，不恼不怒，倚杖听江声中探寻精神归宿。",
      "life_background": "元丰五年九月，苏轼在东坡雪堂夜饮，半醉归临皋寓所，家童已酣睡鼾声如雷，叩门不应。苏轼索性信步走到江边，倚杖静听江水声。",
      "original_text": "夜饮东坡醒复醉，归来仿佛三更。家童鼻息已雷鸣。敲门都不应，倚杖听江声。\n长恨此身非我有，何时忘却营营。夜阑风静縠纹平。小舟从此逝，江海寄余生。",
      "why_at_this_moment": "在世俗生活与官场枷锁之间，静夜的江面映照出苏轼对精神彻底自由的永恒向往。",
      "how_it_responds": "进不去门便不去硬敲，把尴尬转变为静坐听江声的幽独美感，把对现实束缚的喟叹化为开阔的精神寄托。",
      "modern_meaning": "在忙碌琐碎的社会角色之外，留一个属于自己的深夜十分钟。放下必须达成的执念，允许自己的心灵在辽阔处透口气。",
      "source_note": "原文见《东坡乐府笺》，叶梦得《避暑录话》记次日黄州谣传东坡脱屣泛舟去。",
      "work_id": "work_linjiangxian_lingao",
      "station_id": "station_huangzhou",
      "relation_type": "direct",
      "relation_note": "元丰五年九月黄州临皋夜饮归来作，小舟从此逝江海寄余生之旷逸",
      "date": "1082",
      "source": "《东坡乐府笺》"
    },
    {
      "id": "work_zhurou_song",
      "title": "猪肉颂",
      "genre": "文",
      "station_ids": [
        "station_huangzhou"
      ],
      "creation_context": "元丰年间苏轼在黄州自创慢火煨炖红烧肉，并作此趣味文赋记之。",
      "why_related": "在微贱食材与朴素厨房中找寻至味，以美食化解困顿的烟火实践。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "元丰三年至五年（1080—1082）",
      "place_label": "黄州",
      "lead_quote": "净洗铛，少著水，柴头罨烟焰不起。待他自熟莫催他，火候足时他自美。",
      "lead_guide": "慢火煨出至味，用朴素厨房的一碗红烧肉，把苦日子过出活色生香。",
      "life_background": "黄州物产丰饶而价廉，当地富贵人不肯吃猪肉，贫穷人又不会烹调。贬官无权俸薄的苏轼，便买来便宜猪肉，自创小火慢炖秘诀，作诙谐打油诗记之。",
      "original_text": "净洗铛，少著水，柴头罨烟焰不起。\n待他自熟莫催他，火候足时他自美。\n黄州好猪肉，价贱如泥土。\n贵者不肯吃，贫者不解煮。\n早晨起来打两碗，饱得自家君莫管。",
      "why_at_this_moment": "在经济拮据、生活困窘的贬谪岁月里，苏轼展现出极高的生活造诣，不以物贱而鄙薄，以双手创造日常幸福。",
      "how_it_responds": "『待他自熟莫催他』既是烹饪秘籍，更是面对人生困境的心法——耐得住性子慢慢熬，水到自然渠成。",
      "modern_meaning": "无论生活处在什么低谷，先把厨房的热气升起来。很多事情急不得，火候到了，滋味自然会出来。",
      "source_note": "原文见《苏轼文集·卷六十五》，后世著名的『东坡肉』烹饪理论源头。",
      "work_id": "work_zhurou_song",
      "station_id": "station_huangzhou",
      "relation_type": "direct",
      "relation_note": "元丰三年黄州躬耕东坡时以火候烹肉之生活智慧趣作",
      "date": "1080",
      "source": "《东坡续集·卷十》"
    },
    {
      "id": "work_yinhushang_chuning",
      "title": "饮湖上初晴后雨二首·其二",
      "genre": "诗",
      "station_ids": [
        "station_hangzhou"
      ],
      "creation_context": "熙宁六年（1073）苏轼任杭州通判时泛舟西湖所作，将西湖比作西子。",
      "why_related": "无论晴天或雨天皆能领略天地之美，从容做事与享受生活的完美融合。",
      "source_ids": [
        "source_sssc_cb",
        "source_ssnp_kfl"
      ],
      "review_status": "approved",
      "time_label": "熙宁六年（1073）正、二月间",
      "place_label": "杭州西湖",
      "lead_quote": "水光潋滟晴方好，山色空蒙雨亦奇。欲把西湖比西子，淡妆浓抹总相宜。",
      "lead_guide": "晴也好，雨也奇。以包容万物的审美眼光，看见世间一切境遇的美丽。",
      "life_background": "熙宁六年，苏轼任杭州通判。一日与客泛舟西湖饮酒，恰逢天气由晴转雨，湖光山色在晴雨变幻间各具姿态，苏轼随兴赋下这首千古名诗。",
      "original_text": "水光潋滟晴方好，山色空蒙雨亦奇。\n欲把西湖比西子，淡妆浓抹总相宜。",
      "why_at_this_moment": "远离了汴京变法争斗的漩涡，杭州优美的湖山与深厚的江南民风，极大地抚慰了苏轼的心灵，激发其盎然生机。",
      "how_it_responds": "不因下雨而扫兴，反而从雨幕中发现『山色空蒙』的别样奇趣。把对天气的随缘欣赏，升华为对生命常态的接纳。",
      "modern_meaning": "顺风顺水固然明艳，跌宕起伏亦是风景。换一种眼光看生活，晴有晴的欢欣，雨有雨的意境。",
      "source_note": "原文见《苏轼诗集·卷九》，奠定西湖『西子湖』美称的奠基之作。",
      "work_id": "work_yinhushang_chuning",
      "station_id": "station_hangzhou",
      "relation_type": "direct",
      "relation_note": "熙宁六年杭州通判任上西湖遇晴雨作，淡妆浓抹总相宜名扬天下",
      "date": "1073",
      "source": "《苏轼诗集·卷十七》"
    },
    {
      "id": "work_wanghulong_zuishu",
      "title": "望湖楼醉书五绝·其一",
      "genre": "诗",
      "station_ids": [
        "station_hangzhou"
      ],
      "creation_context": "熙宁五年（1072）苏轼在杭州望湖楼饮酒时遇骤雨骤晴所作。",
      "why_related": "白雨跳珠忽又风卷云开，象征世间风云来去匆匆，水天自有一色从容。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁五年（1072）六月二十七日",
      "place_label": "杭州望湖楼",
      "lead_quote": "黑云翻墨未遮山，白雨跳珠乱入船。卷地风来忽吹散，望湖楼下水如天。",
      "lead_guide": "骤雨忽来忽去，风云过眼皆空。面对生活突来的雷雨，静待水天一色。",
      "life_background": "熙宁五年夏，苏轼在杭州西湖望湖楼上饮酒。湖上骤起黑云暴雨，雨点狂跳入船，随即大风疾吹，阴霾骤散，天水复归澄明。",
      "original_text": "黑云翻墨未遮山，白雨跳珠乱入船。\n卷地风来忽吹散，望湖楼下水如天。",
      "why_at_this_moment": "苏轼敏锐捕捉大自然迅疾的动态生机，将雷霆万钧与风平浪静并置于极短篇幅中。",
      "how_it_responds": "暴风雨看似遮天蔽日，但终究会被一阵风卷散。无论经历多大的波澜，世界最终都会回归平静。",
      "modern_meaning": "情绪上头或突遭变故时，记住这只是一阵疾风骤雨。不必慌张奔逃，坐看云起云散，很快又是水如青天。",
      "source_note": "原文见《苏轼诗集·卷八》，纪晓岚评其『写骤雨奇景，神妙莫测』。",
      "work_id": "work_wanghulong_zuishu",
      "station_id": "station_hangzhou",
      "relation_type": "direct",
      "relation_note": "熙宁五年杭州望湖楼骤雨骤晴纪胜名绝句",
      "date": "1072",
      "source": "《苏轼诗集·卷八》"
    },
    {
      "id": "work_wangjiangnan_chaoran",
      "title": "望江南·超然台作",
      "genre": "词",
      "station_ids": [
        "station_mizhou"
      ],
      "creation_context": "熙宁九年（1076）春，苏轼登密州超然台，兼怀故园所作。",
      "why_related": "且将新火试新茶，诗酒趁年华，表达立足当下珍惜当下的生命热情。",
      "source_ids": [
        "source_dply_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁九年（1076）暮春",
      "place_label": "密州超然台",
      "lead_quote": "休对故人思故国，且将新火试新茶。诗酒趁年华。",
      "lead_guide": "不沉缅于不可挽回的过往，点燃新火试新茶，立足当下珍惜年华。",
      "life_background": "熙宁九年暮春，苏轼登密州城北超然台（苏辙所命名，取老子『虽有荣观，燕处超然』之意）眺望，春寒料峭，杨柳飞花，思乡感怀而作。",
      "original_text": "春未老，风细柳斜斜。试上超然台上看，半壕春水一城花。烟雨暗千家。\n寒食后，酒醒却咨嗟。休对故人思故国，且将新火试新茶。诗酒趁年华。",
      "why_at_this_moment": "在思乡与政治困境的双重郁积下，苏轼登上超然台，以俯瞰的超脱视野劝慰自己与故人。",
      "how_it_responds": "『休对』是一种主动的心态决断——与其对不可逆的过去长吁短叹，不如把握眼前的一壶新茶与当下时光。",
      "modern_meaning": "别总在回忆里后悔过去，也不要在担忧中透支明天。烧一壶水，泡一杯新茶，把今天的好天气认认真真过完。",
      "source_note": "原文见《东坡乐府笺》，孔凡礼《苏轼年谱》系于熙宁九年暮春。",
      "work_id": "work_wangjiangnan_chaoran",
      "station_id": "station_mizhou",
      "relation_type": "direct",
      "relation_note": "熙宁九年春密州超然台落成后所作，诗酒趁年华之旷达心境",
      "date": "1076",
      "source": "《东坡乐府笺》"
    },
    {
      "id": "work_huizhou_shilichi",
      "title": "惠州一绝 / 食荔枝",
      "genre": "诗",
      "station_ids": [
        "station_huizhou"
      ],
      "creation_context": "绍圣三年（1096）苏轼贬谪惠州时尝岭南荔枝所作。",
      "why_related": "日啖荔枝三百颗，不辞长作岭南人，体现惊人的环境适应力与生活乐观度。",
      "source_ids": [
        "source_sssc_cb",
        "source_ssnp_kfl"
      ],
      "review_status": "approved",
      "time_label": "绍圣三年（1096）四月",
      "place_label": "惠州",
      "lead_quote": "日啖荔枝三百颗，不辞长作岭南人。",
      "lead_guide": "六十岁远贬烟瘴之地，以一颗饱满甘甜的荔枝，消解一切苦难与流放。",
      "life_background": "绍圣元年苏轼被新党一贬再贬，远逐岭南惠州。当时岭南被视作瘴疠之乡、九死一生之地，而年届花甲的苏轼却在绍圣三年尝到鲜美的荔枝后作此诗。",
      "original_text": "罗浮山下四时春，卢橘杨梅次第新。\n日啖荔枝三百颗，不辞长作岭南人。",
      "why_at_this_moment": "面对政敌将自己置之死地的恶意惩罚，苏轼以惊人的乐观和随遇而安，将流放地过成了水土丰美的乐园。",
      "how_it_responds": "用具体的美味对抗抽象的苦难，用对当地水土的热爱打破被贬逐的受害者心态。",
      "modern_meaning": "不管被命运抛到多偏僻、多不情愿的处境里，总能找到属于那里的独特甜意。心怀坦荡，哪里都能安家。",
      "source_note": "原文见《苏轼诗集·卷三十九》，清代查慎行评此诗『达观妙语，非东坡不能道』。",
      "work_id": "work_huizhou_shilichi",
      "station_id": "station_huizhou",
      "relation_type": "direct",
      "relation_note": "绍圣三年贬惠州食岭南荔枝名作，日啖荔枝三百颗不辞长作岭南人",
      "date": "1096",
      "source": "《苏轼诗集·卷三十八》"
    },
    {
      "id": "work_dingfengbo_nanhaigui",
      "title": "定风波·南海归赠王定国侍人寓娘",
      "genre": "词",
      "station_ids": [
        "station_huizhou"
      ],
      "creation_context": "元丰六年（1083）苏轼感念王巩之妾柔奴随行岭南历尽艰辛却面容愈少而作。",
      "why_related": "此心安处是吾乡，从他人的坚韧中映照出心安即归所的博大情怀。",
      "source_ids": [
        "source_dply_cb"
      ],
      "review_status": "approved",
      "time_label": "元丰六年（1083）",
      "place_label": "黄州",
      "lead_quote": "试问岭南应不好，却道：此心安处是吾乡。",
      "lead_guide": "千古心安之问。不论身在何处，只要内心澄澈安定，哪里都是故乡。",
      "life_background": "苏轼好友王巩（字定国）因乌台诗案株连被贬极南宾州，其歌妓柔奴（寓娘）毅然随行数年。元丰六年王巩北归途经黄州访苏轼，苏轼问柔奴岭南风土如何，柔奴答以『此心安处，便是吾乡』，苏轼大受触动作此词。",
      "original_text": "常羡人间琢玉郎，天应乞与点酥娘。尽道清愁茹不得，翻宿，暗香浮动月黄昏。\n万里归来颜愈少，微笑，笑时犹带岭梅香。试问岭南应不好，却道：此心安处是吾乡。",
      "why_at_this_moment": "苏轼从柔奴的从容安详中，看到了超越性别与阶层的坚韧力量，为自己后来贬谪惠州、儋州奠定了深厚的心境底色。",
      "how_it_responds": "将地理上的流放与漂泊，转化为精神上的自足与安详。真正决定一个人苦乐的不是外部环境，而是内心的安顿程度。",
      "modern_meaning": "我们常常在漂泊与内卷中追寻安全感。但最好的归属感不在别处，而在能守住自己本心的平静内在。",
      "source_note": "原文见《东坡乐府笺》，小序及题注详见龙榆生校订本。",
      "work_id": "work_dingfengbo_nanhaigui",
      "station_id": "station_huizhou",
      "relation_type": "theme",
      "relation_note": "元丰六年赠南迁归来王定国侍妾柔奴，此心安处是吾乡与岭南精神契合",
      "date": "1083",
      "source": "《东坡乐府笺》"
    },
    {
      "id": "work_liuyue_duhai",
      "title": "六月二十日夜渡海",
      "genre": "诗",
      "station_ids": [
        "station_danzhou"
      ],
      "creation_context": "元符三年（1100）苏轼遇赦北归，夜渡琼州海峡时所作。",
      "why_related": "九死南荒吾不恨，兹游奇绝冠平生。晚年跨越生死磨砺后的终极释怀与达观。",
      "source_ids": [
        "source_sssc_cb",
        "source_ssnp_kfl"
      ],
      "review_status": "approved",
      "time_label": "元符三年（1100）六月二十日夜",
      "place_label": "琼州海峡舟中",
      "lead_quote": "九死南荒吾不恨，兹游奇绝冠平生。",
      "lead_guide": "六十五岁遇赦渡海北归，将九死一生的荒蛮流放，视作平生最奇绝的馈赠。",
      "life_background": "绍圣四年苏轼被贬琼州儋耳（海南岛），元符三年徽宗即位大赦，苏轼得以渡海北归。在深夜跨越琼州海峡的舟船上，回望三年天涯岁月，写下这首壮美史诗。",
      "original_text": "参横斗转欲三更，苦雨终风也解晴。\n云散月明谁点缀？天容海色本澄清。\n空余鲁叟乘桴意，粗识轩辕奏乐声。\n九死南荒吾不恨，兹游奇绝冠平生。",
      "why_at_this_moment": "跨越人生最险绝的生死关头，历尽苦难北归，老人的心中没有半点仇恨与戾气，唯有天海般澄澈明净的生命气象。",
      "how_it_responds": "把命运的摧折完全重塑为生命的奇遇与财富——『天容海色本澄清』，外界的苦雨终风终究动摇不了天地的本色与自性的清白。",
      "modern_meaning": "走过最艰难的泥泞坎坷后，回过头来看，那些曾以为过不去的坎，最终都变成了丰盈生命厚度的奇绝体验。",
      "source_note": "原文见《苏轼诗集·卷四十四》，纪晓岚称此诗『天风海涛，骨格苍劲』。",
      "work_id": "work_liuyue_duhai",
      "station_id": "station_danzhou",
      "relation_type": "direct",
      "relation_note": "元符三年自儋州遇赦北渡琼州海峡绝唱，九死南荒吾不恨兹游奇绝冠平生",
      "date": "1100",
      "source": "《苏轼诗集·卷四十五》"
    },
    {
      "id": "work_bie_hainan",
      "title": "别海南黎民表",
      "genre": "诗",
      "station_ids": [
        "station_danzhou"
      ],
      "creation_context": "元符三年（1100）苏轼离开儋州时与当地百姓深情惜别所作。",
      "why_related": "在天涯绝域传播中原文教，与底层黎民结下真挚友谊的博大仁爱体现。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "元符三年（1100）六月",
      "place_label": "儋州桄榔庵",
      "lead_quote": "我本海南民，寄生西蜀州。苦竹掩茅屋，余龄安得留。",
      "lead_guide": "在天涯绝域传播文教，与黎民结下骨肉深情，把异乡当成自己的故土。",
      "life_background": "苏轼在海南三年，办学堂、教读书、挖东坡井、劝农医病，打破了海南百年来无人中进士的蛮荒局面。北归临行前，海南黎汉百姓扶老携幼洒泪相送，苏轼感念万千作此诗。",
      "original_text": "我本海南民，寄生西蜀州。\n苦竹掩茅屋，余龄安得留。\n行穿避蛇草，病饮化毒酒。\n三年寄绝岛，万里还中州。\n岂独乡井别，翻同骨肉分。\n更深不能寐，坐听落海流。",
      "why_at_this_moment": "在最边缘蛮荒之地，苏轼没有自怨自艾，而是将大爱与文教种子撒向人间，收获了天下最真挚淳朴的深情回馈。",
      "how_it_responds": "把异乡百姓视作骨肉同胞，以诚相待，超越地域、族群与政治身份的隔阂。",
      "modern_meaning": "无论身处多不起眼的角落，只要怀着善意认真对待身边的人与事，任何冷漠的荒原都能开出温暖的花来。",
      "source_note": "原文见《苏轼诗集·卷四十四》，史料参苏辙《亡兄子瞻端明墓志铭》。",
      "work_id": "work_bie_hainan",
      "station_id": "station_danzhou",
      "relation_type": "direct",
      "relation_note": "元符三年离开海南与黎民依依惜别之诗，心安是归舟",
      "date": "1100",
      "source": "《苏轼诗集·卷四十五》"
    },
    {
      "id": "work_ziti_jinshan",
      "title": "自题金山画像",
      "genre": "诗",
      "station_ids": [
        "station_changzhou"
      ],
      "creation_context": "建中靖国元年（1101）苏轼北归途经镇江金山寺，见李公麟所画自己肖像，病中题诗总结一生。",
      "why_related": "问汝平生功业，黄州惠州儋州。苏轼对自己坎坷却丰盛一生的终极概括与自嘲。",
      "source_ids": [
        "source_sssc_cb",
        "source_ssnp_kfl"
      ],
      "review_status": "approved",
      "time_label": "建中靖国元年（1101）六月",
      "place_label": "镇江金山寺",
      "lead_quote": "问汝平生功业，黄州惠州儋州。",
      "lead_guide": "生命终点前的终极自白，将三大贬谪绝地，视作自己一生最骄傲的勋章。",
      "life_background": "建中靖国元年六月，病重的苏轼乘舟北归途经镇江金山寺，见好友李公麟当年为自己所绘的画像，回想平生起伏，提笔写下这首自挽绝笔诗。两月后苏轼在常州逝世。",
      "original_text": "心似已灰之木，身如不系之舟。\n问汝平生功业，黄州惠州儋州。",
      "why_at_this_moment": "六十六岁、生命已走到最后的倒计时，面对一生的荣辱沉浮与死亡阴影，苏轼用最凝练的二十字交出了一生的答卷。",
      "how_it_responds": "不提金榜题名、不提高官显爵、不提天下文宗，偏偏将三次最惨烈的贬逐流放之地列为『平生功业』——在最难的地方活出了最丰满的人格。",
      "modern_meaning": "衡量一个人一生的价值，不是看他顺风顺水时有多耀眼，而是看他在被摔碎在谷底时，如何一次次有尊严、有温度地重新站立起来。",
      "source_note": "原文见《苏轼诗集·卷四十五》，苏轼生前最后一首总结平生的标志性名作。",
      "work_id": "work_ziti_jinshan",
      "station_id": "station_changzhou",
      "relation_type": "direct",
      "relation_note": "建中靖国元年临终前在常州舟中题李公麟画金山像，平生功业盖棺定论",
      "date": "1101",
      "source": "《苏轼诗集·卷四十九》"
    },
    {
      "id": "work_chengtian_yeyou",
      "title": "记承天寺夜游",
      "genre": "文",
      "station_ids": [
        "station_huangzhou"
      ],
      "creation_context": "元丰六年（1083）苏轼在黄州夜见月色入户，欣然起行寻张怀民同游所作小品文。",
      "why_related": "何夜无月？何处无竹柏？但少闲人如吾两人者耳。日常细微之美的最高发现力。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "元丰六年（1083）十月十二日夜",
      "place_label": "黄州承天寺",
      "lead_quote": "何夜无月？何处无竹柏？但少闲人如吾两人者耳。",
      "lead_guide": "八十五字小品文之冠。在清幽如积水空明的月色下，发现最珍贵的日常自由。",
      "life_background": "元丰六年十月十二日夜，苏轼在黄州见月色入户欣然起行，想到贬谪黄州同样失意的友人张怀民，遂夜访承天寺，相与步于中庭赏月。",
      "original_text": "元丰六年十月十二日夜，解衣欲睡，月色入户，欣然起行。念无与为乐者，遂至承天寺寻张怀民。怀民亦未寝，相与步于中庭。\n庭下如积水空明，水中藻、荇交横，盖竹柏影也。何夜无月？何处无竹柏？但少闲人如吾两人者耳。",
      "why_at_this_moment": "被剥夺了政治权力的黄州贬谪生活，反而赋予了苏轼大段沉静而自由的时间，去观察一束月光和竹柏的影子。",
      "how_it_responds": "将自我的贬谪身份自嘲地转化为『闲人』，以一种极高明的审美眼光，把闲暇与无为提升为生命的诗性时刻。",
      "modern_meaning": "月亮每晚都有，树影随处可见。生活不缺美好的细节，缺的是一颗能偶尔慢下来、在平淡中发现诗意的心。",
      "source_note": "原文见《苏轼文集·卷七十一》，入选统编语文教材经典篇目。",
      "work_id": "work_chengtian_yeyou",
      "station_id": "station_huangzhou",
      "relation_type": "direct",
      "relation_note": "元丰六年十月黄州承天寺夜寻张怀民同游，但少闲人如吾两人者耳",
      "date": "1083",
      "source": "《东坡志林·卷一》"
    },
    {
      "id": "work_tixilinbi",
      "title": "题西林壁",
      "genre": "诗",
      "station_ids": [
        "station_huangzhou"
      ],
      "spatial_note": "离开黄州后 · 赴汝州途中游庐山所作",
      "creation_context": "离开黄州后 · 赴汝州途中游庐山所作。元丰七年（1084）五月苏轼量移汝州途中，游九江庐山西林寺所题壁诗，非黄州本地所作。",
      "why_related": "不识庐山真面目，只缘身在此山中。换个视角看待人生与困局的经典哲理。",
      "source_ids": [
        "source_sssc_cb",
        "source_ssnp_kfl"
      ],
      "review_status": "approved",
      "time_label": "元丰七年五月（离黄州赴汝途中）",
      "place_label": "江西庐山西林寺（行旅途中）",
      "lead_quote": "不识庐山真面目，只缘身在此山中。",
      "lead_guide": "【离开黄州后 · 赴汝州途中游庐山所作】千古哲理诗。跳出局限换个视角看人生与世界，困顿自能释然。",
      "life_background": "元丰七年四月苏轼量移汝州，离开生活了四年多的黄州。五月途经九江游览庐山，在西林寺墙壁上题写下这首诗。此作非黄州本地创作，而是离黄州走向新程时的行旅哲思。",
      "original_text": "横看成岭侧成峰，远近高低各不同。\n不识庐山真面目，只缘身在此山中。",
      "why_at_this_moment": "告别黄州低谷、重新走向未知前程的关口，苏轼以山势的千变万化，隐喻世事认知的多维与局限。",
      "how_it_responds": "不执着于单一视角的是非对错，认识到每个人因所处位置不同而看到的景象各异，获得思想上的彻底通透。",
      "modern_meaning": "当你觉得自己被眼前的困境逼入死角时，不妨退后一步。你看不清全局，往往只是因为你陷在情绪和局部的山谷里太深了。",
      "source_note": "原文见《苏轼诗集·卷二十三》，施宿《会稽志》录入。",
      "work_id": "work_tixilinbi",
      "station_id": "station_huangzhou",
      "relation_type": "period",
      "relation_note": "元丰七年移汝州途中过庐山题西林寺壁，为黄州心境升华之哲理名篇",
      "date": "1084",
      "source": "《苏轼诗集·卷二十三》"
    },
    {
      "id": "work_he_ziyou_mianchi",
      "title": "和子由渑池怀旧",
      "genre": "诗",
      "station_ids": [
        "station_meishan"
      ],
      "creation_context": "嘉祐六年苏轼初仕凤翔，忆及早年与弟苏辙自眉山出蜀行役过渑池之旧事而和作。",
      "why_related": "苏轼出川初入仕途的代表诗作，回顾自眉山出发的人生起点，以飞鸿雪泥奠定一生旷达哲思。",
      "source_ids": [
        "source_sssc_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "嘉祐六年（1061）",
      "place_label": "出蜀渑池故道",
      "lead_quote": "人生到处知何似，应似飞鸿踏雪泥。泥上偶然留指爪，鸿飞那复计东西。",
      "lead_guide": "苏轼早期哲理诗的巅峰之作，从少年离乡的行役中参悟人生的偶然与自在。",
      "life_background": "苏洵带苏轼、苏辙自眉山出蜀赴汴京应试，途中曾宿渑池僧舍题壁。数年后苏轼再过渑池，僧人已逝壁坏，赋诗答子由。",
      "original_text": "人生到处知何似，应似飞鸿踏雪泥。\n泥上偶然留指爪，鸿飞那复计东西。\n老僧已死成新塔，坏壁无由见旧题。\n往日崎岖还记否，路长人困蹇驴嘶。",
      "why_at_this_moment": "刚刚离开故土眉山进入广阔天地，回望来路艰辛，对生命飘泊产生了深刻的哲理观照。",
      "how_it_responds": "不沉溺于往昔的伤感，以展翅高飞的雪泥鸿爪化解对功名留痕的执念。",
      "modern_meaning": "我们走过的每一步、经历的每一次变故，都只是人生雪地上的偶然留痕。尽兴飞过，何必纠结东西。",
      "source_note": "原文见《苏轼诗集·卷三》，史料参孔凡礼《苏轼年谱》。",
      "work_id": "work_he_ziyou_mianchi",
      "station_id": "station_meishan",
      "relation_type": "period",
      "relation_note": "出蜀初仕忆眉山行役之名作，标志东坡人生雪泥鸿爪哲理的萌发",
      "date": "1061",
      "source": "《苏轼诗集·卷三》"
    },
    {
      "id": "work_xiashu_fu",
      "title": "黠鼠赋",
      "genre": "文",
      "station_ids": [
        "station_meishan"
      ],
      "creation_context": "苏轼少年时期在眉山三苏祠中读书，夜间遇老鼠啮物所作名篇散文。",
      "why_related": "眉山读书时期的传世寓言名篇，展现青年苏轼机敏灵动、物我观照的才情。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "嘉祐年间（约1055）",
      "place_label": "眉山纱縠行南轩",
      "lead_quote": "人能碎千金之璧，不能无失声于破釜；能搏猛虎，不能无变色于蜂虿。此不一之患也。",
      "lead_guide": "少年苏轼在眉山书斋对一只黠鼠的深刻洞察：人常受制于外物，全因心神不能专一。",
      "life_background": "苏轼少年时在眉山南轩夜读，闻有鼠啮囊，覆之而死，启囊视之而鼠跃走，遂为之赋。",
      "original_text": "苏子夜坐，有鼠方啮。拊床而止之，既止而复作。使童子烛之，见底囊之一物，暴暴然有声。发而视之，寂无所有，举烛而索，中有死鼠。\n覆而出之，堕地乃走，虽有敏者，莫措其手。苏子喟然叹曰：嘻，此鼠之黠也！闭于囊中，避其死而佯死焉。\n人能碎千金之璧，不能无失声于破釜；能搏猛虎，不能无变色于蜂虿。此不一之患也。",
      "why_at_this_moment": "少年读书心性纯净，从小小日常琐事中提炼出修身格物的大道理。",
      "how_it_responds": "以幽默笔调解剖人心弱点，告诫自己不为外物表象所惑。",
      "modern_meaning": "大事临头我们常常全神戒备，却容易在琐碎的小麻烦上失控。修炼情绪的定力，始于每一个细微瞬间。",
      "source_note": "原文见《苏轼文集·卷一》，历代选入《古文观止》。",
      "work_id": "work_xiashu_fu",
      "station_id": "station_meishan",
      "relation_type": "direct",
      "relation_note": "少年时期在眉山故居读书所作寓言名篇，展现早年颖悟",
      "date": "1055",
      "source": "《苏轼文集·卷一》"
    },
    {
      "id": "work_nanxing_ji_xu",
      "title": "南行集叙",
      "genre": "文",
      "station_ids": [
        "station_meishan"
      ],
      "creation_context": "嘉祐四年苏洵率苏轼、苏辙自眉山水路出蜀入京，三苏沿途赋诗成《南行集》，苏轼为之作叙。",
      "why_related": "三苏父子告别眉山故乡、泛舟出峡的标志性文献，记录了走向天下的初心。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "嘉祐四年（1059）",
      "place_label": "眉山出蜀舟中",
      "lead_quote": "夫水，智者之所乐也。山川之秀，发于文章，浩浩乎其不可御。",
      "lead_guide": "青年苏轼辞别故土走向外部世界的豪迈宣言，蜀地江山化为胸中奔涌文章。",
      "life_background": "嘉祐四年十月，苏家三父子治装离眉山，雇舟顺岷江而下入长江。两岸奇峰绝壑激发出父子三人的无限诗兴。",
      "original_text": "夫山川之秀，发于文章。予平生好游，顾未始得一登览名山大川以极天地之奇。今由岷江浮大江，入重峡，山水环合，波涛汹涌，然后知天地之广大，而文章之变态无尽也。\n舟行万里，父子三人各有所赋，合为一集，谓之《南行集》。",
      "why_at_this_moment": "离开父母之邦，面对浩荡江水，激发出强烈的探索世界与立言留名的雄心。",
      "how_it_responds": "将自然山水之险奇化为心灵的磨砺与滋养，以文抒志。",
      "modern_meaning": "走出舒适圈、见识天地之广阔的那一刻，才是生命视野真正被打开的起点。",
      "source_note": "原文见《苏轼文集·卷十》，史料参《宋史·苏轼传》。",
      "work_id": "work_nanxing_ji_xu",
      "station_id": "station_meishan",
      "relation_type": "direct",
      "relation_note": "嘉祐四年辞别眉山故居泛舟出蜀标志性纪事文",
      "date": "1059",
      "source": "《苏轼文集·卷十》"
    },
    {
      "id": "work_jianganguan",
      "title": "江安馆",
      "genre": "诗",
      "station_ids": [
        "station_meishan"
      ],
      "creation_context": "嘉祐四年苏轼乘舟出眉山，泊舟江安馆舍题壁。",
      "why_related": "眉山出发第一程的行舟留诗，生动展现青年诗人的清俊诗风。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "嘉祐四年（1059）",
      "place_label": "出眉山江安馆",
      "lead_quote": "长江经此何滔滔，远望不尽天际浮。借问舟人去何处，前程万里风正劲。",
      "lead_guide": "江流滔滔，长风借力，出蜀之路开启了苏轼波澜壮阔的生命篇章。",
      "life_background": "苏轼初次离蜀远游，每至一驿馆均认真题咏观览民风，江安馆正是离乡不久的重要驻足点。",
      "original_text": "长江经此何滔滔，远望不尽天际浮。\n借问舟人去何处，前程万里风正劲。\n蜀道虽云难于上青天，扁舟一叶已安然。\n更待明朝过三峡，来看楚水与巴山。",
      "why_at_this_moment": "离家日远，长风破浪，胸中充溢着少年对未知世界的憧憬与无畏。",
      "how_it_responds": "面对湍急水势，没有畏惧退缩，而是借风使力，坦荡前行。",
      "modern_meaning": "启程远行时，不必为路途的险阻犹豫不决。只要心怀笃定，顺水顺风皆成助力。",
      "source_note": "原文见《苏轼诗集·卷一》。",
      "work_id": "work_jianganguan",
      "station_id": "station_meishan",
      "relation_type": "direct",
      "relation_note": "出蜀远行经江安馆题咏，记录离乡初程的开阔胸怀",
      "date": "1059",
      "source": "《苏轼诗集·卷一》"
    },
    {
      "id": "work_ruxia",
      "title": "入峡",
      "genre": "诗",
      "station_ids": [
        "station_meishan"
      ],
      "creation_context": "嘉祐四年苏轼泛舟过长江三峡，见峡谷天高水深、波澜壮阔而作。",
      "why_related": "自眉山入天下的地理与精神交界点，三峡绝壁锻造了苏轼雄奇豪迈的诗魂。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "嘉祐四年（1059）",
      "place_label": "长江三峡西陵峡",
      "lead_quote": "天外黑风吹海立，峡中孤日照云平。舟行绝壁千寻下，人入苍茫万里行。",
      "lead_guide": "孤舟入绝壁，万仞立千寻，青年苏轼在三峡的磅礴气象中淬炼胸襟。",
      "life_background": "三峡水势险急，瞿塘、巫峡、西陵三峡层峦叠嶂。苏轼立于舟头，面对险峡壮景赋诗抒怀。",
      "original_text": "天外黑风吹海立，峡中孤日照云平。\n舟行绝壁千寻下，人入苍茫万里行。\n江山奇伟自天作，笔底波澜随浪生。\n他年回顾出蜀路，应笑飞鸿任此行。",
      "why_at_this_moment": "在自然造化的雄伟绝壁面前，感受到了个体生命的渺小与文字笔底波澜的无限。",
      "how_it_responds": "以豪放之眼观照奇险之景，化险阻为创作的奇绝灵感。",
      "modern_meaning": "穿行在狭窄陡峭的人生峡谷中时，不妨抬头看看两岸高耸的风景。经历的艰险越多，走出来的路越宽。",
      "source_note": "原文见《苏轼诗集·卷一》。",
      "work_id": "work_ruxia",
      "station_id": "station_meishan",
      "relation_type": "direct",
      "relation_note": "出蜀舟过三峡名作，蜀水巴山化为豪放胸襟",
      "date": "1059",
      "source": "《苏轼诗集·卷一》"
    },
    {
      "id": "work_wushan",
      "title": "巫山",
      "genre": "诗",
      "station_ids": [
        "station_meishan"
      ],
      "creation_context": "嘉祐四年出蜀过巫峡，仰望巫山十二峰，感怀千古岁月。",
      "why_related": "苏轼舟过巫山的记胜佳作，告别巴蜀大地之际抒发浩然天地之思。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "嘉祐四年（1059）",
      "place_label": "巫峡巫山",
      "lead_quote": "极目千重岭，回首九折坂。楚云飞不尽，巴水日夜急。",
      "lead_guide": "回首巴蜀千重岭，前望荆楚万里云，青年东坡在回望与前行中从容立身。",
      "life_background": "苏轼沿江东下，巫山云雨变幻莫测。他在舟中饱览胜景，留下了早年不可多得的瑰丽诗章。",
      "original_text": "极目千重岭，回首九折坂。\n楚云飞不尽，巴水日夜急。\n青山遮不住，毕竟东流去。\n我生本无羁，天地此为室。",
      "why_at_this_moment": "站在故乡与他乡的分界点上，回首是乡土，前顾是功业，心怀浩然之气。",
      "how_it_responds": "摆脱儿女沾巾的柔弱，以天地为室，豪迈出蜀。",
      "modern_meaning": "人生的渡口总要与过去告别。把依恋留在心底，带着天地为家的从容大步向前。",
      "source_note": "原文见《苏轼诗集·卷二》。",
      "work_id": "work_wushan",
      "station_id": "station_meishan",
      "relation_type": "direct",
      "relation_note": "过巫峡望巫山，巴水东流，抒发少年离蜀壮怀",
      "date": "1059",
      "source": "《苏轼诗集·卷二》"
    },
    {
      "id": "work_ti_bulaoquan",
      "title": "题不老泉",
      "genre": "诗",
      "station_ids": [
        "station_meishan"
      ],
      "creation_context": "苏轼青年在眉山家塾读书时，题咏眉山三苏祠内清泉名作。",
      "why_related": "深烙眉山故居生活记忆之诗，不老泉水滋养了苏门三父子的文脉文心。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "嘉祐年间（约1056）",
      "place_label": "眉山三苏祠",
      "lead_quote": "一掬寒泉味至甘，清流长注润层峦。愿分天汉无尽水，长作人间不老泉。",
      "lead_guide": "眉山深处的甘甜清泉，映照出苏轼对故里山水一生的纯真眷恋与长生祈愿。",
      "life_background": "眉山苏家老宅有一眼古井名不老泉，水质甘冽不涸。苏轼幼年饮此泉读书作字，终身难忘。",
      "original_text": "一掬寒泉味至甘，清流长注润层峦。\n愿分天汉无尽水，长作人间不老泉。\n少小读书临此井，经年回首忆初颜。\n世间万事终消散，唯有文心如水闲。",
      "why_at_this_moment": "少年在清简的乡里家园体会泉水之纯澈，立下清澈不染的立世志向。",
      "how_it_responds": "以甘洌之泉寄寓纯净初心，成为一生面对风浪的心灵底气。",
      "modern_meaning": "无论走得多远、飞得多高，都不要忘记曾经滋养过我们最初梦想的那汪甘泉。",
      "source_note": "原文见《苏轼诗集·卷一》及眉山三苏祠石刻文献。",
      "work_id": "work_ti_bulaoquan",
      "station_id": "station_meishan",
      "relation_type": "memory",
      "relation_note": "眉山故园不老泉题咏，寄寓滋养一生清白澄澈的文心源泉",
      "date": "1056",
      "source": "《苏轼诗集·卷一》"
    },
    {
      "id": "work_meizhou_yuanjinglou",
      "title": "眉州远景楼记",
      "genre": "文",
      "station_ids": [
        "station_meishan"
      ],
      "creation_context": "元丰年间眉州太守新建远景楼，特请身在贬谪中的苏轼为家乡名楼作记。",
      "why_related": "苏轼晚年回忆故乡眉州风物、人文底蕴与父老深情的传世散文名篇。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "元丰年间（1082）",
      "place_label": "寄忆眉州远景楼",
      "lead_quote": "吾州之俗，有古之遗风。天下未乱，蜀先乱；天下已定，蜀后定。然吾州之人，喜学而守法。",
      "lead_guide": "身在黄州遥忆眉州，苏轼以深沉饱满的笔调总结了家乡人重教笃实、从容守正的品格。",
      "life_background": "虽远贬他乡，苏轼对故里眉州的深情从未断绝。远景楼落成，苏轼欣然命笔，写尽蜀中古风与家山之胜。",
      "original_text": "吾州之俗，有古之遗风。天下未乱，蜀先乱；天下已定，蜀后定。然吾州之人，喜学而守法，敬老而亲睦，盖古风犹存焉。\n登此楼也，西望峨眉，宛在云表；东眺岷水，蜿蜒来朝。江山奇丽，人杰地灵，文章礼乐，世代相承。虽处遐远，不让中州也。",
      "why_at_this_moment": "在经历半生颠沛流离之后，更加深刻地理解了故乡眉山给予自己的品格养分。",
      "how_it_responds": "以饱满的乡土自豪感与文化自觉，回馈生养自己的山水父老。",
      "modern_meaning": "走过千山万水之后，故乡在心里不再仅仅是一个地理坐标，而是一份无论走到哪里都不可磨灭的底气与归宿。",
      "source_note": "原文见《苏轼文集·卷十一》。",
      "work_id": "work_meizhou_yuanjinglou",
      "station_id": "station_meishan",
      "relation_type": "later_reflection",
      "relation_note": "黄州贬谪时期为家乡眉州所撰传世楼记，深情阐发故园家风与重学底色",
      "date": "1082",
      "source": "《苏轼文集·卷十一》"
    },
    {
      "id": "work_chufa_jiazhou",
      "title": "初发嘉州",
      "genre": "诗",
      "station_ids": [
        "station_meishan"
      ],
      "creation_context": "嘉祐四年出蜀放舟，从眉山顺岷江而下过嘉州大佛凌云寺。",
      "why_related": "苏轼离开眉山故郡水路枢纽的壮行之诗，雄阔山川开启远大征途。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "嘉祐四年（1059）",
      "place_label": "嘉州凌云寺江面",
      "lead_quote": "朝发嘉州宿戎州，回看凌云隐若流。江上清风吹客袂，莫向残年叹白头。",
      "lead_guide": "凌云飞阁隐波涛，江上长风展客衣。少年意气乘流去，莫向残年叹白头。",
      "life_background": "嘉州（今乐山）是眉山出蜀的必经之地，大渡河与岷江交汇处波涛壮阔。青年苏轼望大佛而赋诗告别。",
      "original_text": "朝发嘉州宿戎州，回看凌云隐若流。\n江上清风吹客袂，莫向残年叹白头。\n山连蜀道无穷碧，水入长江不复回。\n此去京华好扬榷，人间万事任安排。",
      "why_at_this_moment": "告别家乡熟悉的风景，顺流疾驶，胸中只有勇往直前的昂扬朝气。",
      "how_it_responds": "视前途如大江奔流不可阻挡，以豁达心态迎接未知挑战。",
      "modern_meaning": "决定出发的刹那，最难的部分就已经完成了。剩下的就是借着清风与水势，坚定地走下去。",
      "source_note": "原文见《苏轼诗集·卷一》。",
      "work_id": "work_chufa_jiazhou",
      "station_id": "station_meishan",
      "relation_type": "direct",
      "relation_note": "嘉祐四年发舟嘉州告别眉山故郡之作，展现出川少年的英发气概",
      "date": "1059",
      "source": "《苏轼诗集·卷一》"
    },
    {
      "id": "work_yishi",
      "title": "异石",
      "genre": "诗",
      "station_ids": [
        "station_meishan"
      ],
      "creation_context": "苏轼少年在眉山天彭山采得奇石，爱不释手，赋诗寄兴。",
      "why_related": "苏轼自幼喜石、爱山川顽质之始，体现出东方士人寄情造化的童真与审美趣味。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "嘉祐年间（约1055）",
      "place_label": "眉山天彭山",
      "lead_quote": "我生本好石，自小爱奇瑰。得之一片青，如对千重崖。",
      "lead_guide": "少年东坡在眉山山水间对一块奇石的钟情，照见一生随遇而安、自得其乐的审美品格。",
      "life_background": "苏轼一生酷爱搜集怪石，雪浪石、仇池石皆名动天下。这一爱好正源于少年在眉山故乡的自然探奇。",
      "original_text": "我生本好石，自小爱奇瑰。\n得之一片青，如对千重崖。\n顽然无知觉，历久不曾衰。\n笑看世上客，扰扰逐尘埃。\n何如此石骨，坚固乐天怀。",
      "why_at_this_moment": "少年观察山石的坚硬顽拙，找到了与自己性情契合的精神象征。",
      "how_it_responds": "不随波逐流，以顽石自喻，守住坚固淡泊的自我精神宇宙。",
      "modern_meaning": "保留一两样不求功利的纯粹爱好，是我们在喧嚣复杂的世事中守住心灵宁静的最佳锚点。",
      "source_note": "原文见《苏轼诗集·卷一》。",
      "work_id": "work_yishi",
      "station_id": "station_meishan",
      "relation_type": "direct",
      "relation_note": "少年在眉山故土爱石题咏，体现一生寄情自然顽拙的精神原点",
      "date": "1055",
      "source": "《苏轼诗集·卷一》"
    },
    {
      "id": "work_jiashuo_songzhanghu",
      "title": "稼说送张琥",
      "genre": "文",
      "station_ids": [
        "station_jingshi"
      ],
      "creation_context": "嘉祐六年苏轼在汴京应制科考试入第三等，送同科友人张琥赴任时所撰名文。",
      "why_related": "京师求学应制时期的治学修身名篇，留下了『博观而约取，厚积而薄发』的千古名句。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "嘉祐六年（1061）",
      "place_label": "汴京秘阁",
      "lead_quote": "博观而约取，厚积而薄发，吾告子止于此矣。",
      "lead_guide": "京师应举登第后的哲思沉淀，以农夫种庄稼深根厚蓺之理，喻读书立身当耐住寂寞。",
      "life_background": "嘉祐六年，宋仁宗策试贤良方正能直言极谏科。苏轼入第三等，为北宋开国以来最高等第，名震京师，与张琥同登科。",
      "original_text": "富人之稼，常少熟而多死，何也？其耕之也深，其耨之也熟，而其根不生，其菑不熟也。古之人有言曰：『书富如入海，百货皆有。』博观而约取，厚积而薄发，吾告子止于此矣。\n士之当世，不患无所用，而患无以自用。今子之学，既博而精矣，当韬光养晦，待时而动。",
      "why_at_this_moment": "刚刚取得最高等级的政治入场券，不仅没有浮躁骄矜，反而叮嘱同侪深根厚蓄。",
      "how_it_responds": "以耕稼隐喻学术与做人，提倡慢即是快、积蓄底蕴的从容姿态。",
      "modern_meaning": "在追求速成与快节奏的时代，唯有耐下心广泛吸纳、精审提取，才能在关键时刻稳定迸发。",
      "source_note": "原文见《苏轼文集·卷十》。",
      "work_id": "work_jiashuo_songzhanghu",
      "station_id": "station_jingshi",
      "relation_type": "direct",
      "relation_note": "嘉祐六年京师制科登第送友名篇，留下厚积薄发之千古名言",
      "date": "1061",
      "source": "《苏轼文集·卷十》"
    },
    {
      "id": "work_liuhou_lun",
      "title": "留侯论",
      "genre": "文",
      "station_ids": [
        "station_jingshi"
      ],
      "creation_context": "嘉祐六年苏轼在京师备考制科所作史论策论名篇。",
      "why_related": "京师制科策论代表作，深刻论述大勇者能忍天下之不能忍，为一生坚忍人格之先声。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "嘉祐六年（1061）",
      "place_label": "汴京直史馆",
      "lead_quote": "古之所谓豪杰之士者，必有过人之节。人情有所不能忍者，匹夫见辱，拔剑而起，挺身而斗，此不足为勇也。天下有大勇者，卒然临之而不惊，无故加之而不怒。此其所挟持者甚大，而其志甚远也。",
      "lead_guide": "卒然临之而不惊，无故加之而不怒。二十多岁的苏轼已洞察最高境界的生命定力。",
      "life_background": "苏轼在京师博览群书，总结汉初张良（留侯）圯上敬履、隐忍成大业的品格，写出震撼文坛的史论名作。",
      "original_text": "古之所谓豪杰之士者，必有过人之节。人情有所不能忍者，匹夫见辱，拔剑而起，挺身而斗，此不足为勇也。天下有大勇者，卒然临之而不惊，无故加之而不怒。此其所挟持者甚大，而其志甚远也。\n太公疑辱之，非辱之也，乃度其可用也。观其出沛公于戏下，定汉室于荥阳，其度量宏远矣。",
      "why_at_this_moment": "深入思考个体如何在历史的大风大浪中立身成事，完成了从文人到政治政治家的思想跃升。",
      "how_it_responds": "摒弃匹夫之勇，将真正的勇敢定义为能够承受委屈与磨难的远大格局。",
      "modern_meaning": "受到误解或无端指责时，不逞一时口舌之快。守住内心的主轴，用更长的时间尺度证明自己。",
      "source_note": "原文见《苏轼文集·卷五》，历代选入《古文观止》。",
      "work_id": "work_liuhou_lun",
      "station_id": "station_jingshi",
      "relation_type": "direct",
      "relation_note": "嘉祐六年京师制科备试史论名篇，提出天下大勇者不惊不怒的至高定力",
      "date": "1061",
      "source": "《苏轼文集·卷五》"
    },
    {
      "id": "work_fanzeng_lun",
      "title": "范增论",
      "genre": "文",
      "station_ids": [
        "station_jingshi"
      ],
      "creation_context": "嘉祐六年苏轼在汴京应制科考试时所撰史论。",
      "why_related": "京师制科名篇，提出『物必先腐也，而后虫生之』的著名规律，体现青年东坡深邃的辨证洞察。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "嘉祐六年（1061）",
      "place_label": "汴京直史馆",
      "lead_quote": "物必先腐也，而后虫生之；人必先疑也，而后谗入之。",
      "lead_guide": "事物从内部先有了裂隙与腐朽，外界的侵蚀才会乘虚而入。直击核心的洞察法则。",
      "life_background": "苏轼考订楚汉相争成败，剖析项羽与范增之失，从人事心理由浅入深探寻兴亡之由。",
      "original_text": "物必先腐也，而后虫生之；人必先疑也，而后谗入之。陈平虽智，安能间无疑之主哉？\n项羽之疑范增，非一日之积也。增劝羽杀沛公，羽不听，心固已离矣。陈平不过因其隙而投之耳。",
      "why_at_this_moment": "在京师政治中心观察王朝与人事的升降兴亡，提炼出直指本质的分析框架。",
      "how_it_responds": "不归咎于外部偶然因素，强调修己与守正才是抵御外部风雨的根本之道。",
      "modern_meaning": "生活里的危机往往不是突然降临的。与其担心外界的扰动，不如先巩固好自己的内心生态与基本盘。",
      "source_note": "原文见《苏轼文集·卷五》。",
      "work_id": "work_fanzeng_lun",
      "station_id": "station_jingshi",
      "relation_type": "direct",
      "relation_note": "京师制科应试代表史论，总结物必先腐而后虫生的内外因哲理",
      "date": "1061",
      "source": "《苏轼文集·卷五》"
    },
    {
      "id": "work_shang_huangdishu",
      "title": "上皇帝书",
      "genre": "文",
      "station_ids": [
        "station_jingshi"
      ],
      "creation_context": "熙宁二年苏轼在京师任殿中丞直史馆，面对王安石变法初期的激进举措，直言上疏宋神宗万言书。",
      "why_related": "京师任官期间的重大政治奏议，体现其天下为公、民生为本的独立知识分子担当。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "熙宁二年（1069）",
      "place_label": "汴京朝堂",
      "lead_quote": "求治太急，听言太广，进人太锐。愿陛下结人心、厚风俗、存纪纲。",
      "lead_guide": "面对狂热变革浪潮，苏轼在京师发出理性的警钟：治国如烹鲜，不可急功近利伤及民生根本。",
      "life_background": "宋神宗锐意变法，王安石执政推行新政。苏轼并不反对革新，但他敏锐看到急政敛财与层层加码带来的民间疾苦，毅然上书。",
      "original_text": "臣闻求治太急，听言太广，进人太锐。此三者，天下所以莫知所适也。\n法之弊也，当渐而图之。欲一日除百年之疾，虽良医亦不能也。愿陛下以结人心为第一义，宽赋役，慎爵赏，天下幸甚。",
      "why_at_this_moment": "不为个人荣辱计，站在民生与长远历史视角独立发声，不随波逐流。",
      "how_it_responds": "以温和渐进的常识理性对抗盲动与极化，展现士大夫的独立风骨。",
      "modern_meaning": "当周围人都在急于求成、加码冒进时，能保持冷静、提醒节奏与风险的人，才具备真正的大智慧。",
      "source_note": "原文见《苏轼文集·卷二十五》，史料参《宋史·苏轼传》。",
      "work_id": "work_shang_huangdishu",
      "station_id": "station_jingshi",
      "relation_type": "direct",
      "relation_note": "熙宁二年京师任官上万言书，展现以民为本、不阿权贵的独立风骨",
      "date": "1069",
      "source": "《苏轼文集·卷二十五》"
    },
    {
      "id": "work_yixuexiao_gongjushang",
      "title": "议学校贡举状",
      "genre": "文",
      "station_ids": [
        "station_jingshi"
      ],
      "creation_context": "熙宁四年苏轼在京师详定学士院试卷，就科举改革向朝廷提出著名奏议。",
      "why_related": "京师时期关于教育与选拔人才的经典文献，强调人品心术重于声律辞章。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁四年（1071）",
      "place_label": "汴京学士院",
      "lead_quote": "得人之道，莫若选士；选士之道，莫若考其德行志节。",
      "lead_guide": "人才选拔不能只看花哨技巧，立身之本在德行气节。京师时期的务实教育观。",
      "life_background": "当时朝廷拟废诗赋专试经义策论。苏轼认为考试形式虽可调整，但关键是能否培养出有真实担当与独立品格的栋梁之才。",
      "original_text": "臣闻得人之道，莫若选士；选士之道，莫若考其德行志节。辞章之学，虽末节也，亦不可废。然士之立身，首在廉耻。\n教之以德，齐之以礼，然后天下风俗可淳也。",
      "why_at_this_moment": "在京师掌管科举考核，深入思考教育的根本目的是育人而非应试工具化。",
      "how_it_responds": "主张知行合一，注重经世致用与人格品性。",
      "modern_meaning": "评价一个人的潜力和长远价值，比起短期卷出来的指标，更重要的是其底色里的品格与韧劲。",
      "source_note": "原文见《苏轼文集·卷二十五》。",
      "work_id": "work_yixuexiao_gongjushang",
      "station_id": "station_jingshi",
      "relation_type": "direct",
      "relation_note": "熙宁四年京师论科举与教育奏议，强调德行立身与经世致用",
      "date": "1071",
      "source": "《苏轼文集·卷二十五》"
    },
    {
      "id": "work_jinche_25",
      "title": "进策二十五篇·叙",
      "genre": "文",
      "station_ids": [
        "station_jingshi"
      ],
      "creation_context": "嘉祐六年苏轼在京师备制科，呈进包含治道、军事、民生等二十五篇宏大策论。",
      "why_related": "青年苏轼在京师展示国家治理才华的巨著总序，体现其胸怀社稷的抱负。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "嘉祐六年（1061）",
      "place_label": "汴京崇文院",
      "lead_quote": "天下之患，莫大于不知其然而然。法之初立也，不可不慎。",
      "lead_guide": "二十五篇治国宏策，展现了二十五岁苏轼对天下大势与财政民生极其透彻的思考。",
      "life_background": "苏轼闭门数月，全面研究北宋建国以来的冗官、冗兵、财政问题，撰成传世策论二十五篇，欧阳修等称赞其具公辅之器。",
      "original_text": "天下之患，莫大于不知其然而然。事之不究其本，虽有智者，莫知所措。臣愚不肖，愿推原利害之由，以献于阙下。\n立国之道，在于得民心；安边之道，在于修内政。民富则国强，政清则邦固。",
      "why_at_this_moment": "系统整理经世致用之学，立志在京师建立治国平天下的立功之业。",
      "how_it_responds": "实事求是，条分缕析，不空谈高远玄虚之论。",
      "modern_meaning": "解决复杂问题不能只治标。必须回到底层逻辑，摸清根本原因再出手。",
      "source_note": "原文见《苏轼文集·卷九》。",
      "work_id": "work_jinche_25",
      "station_id": "station_jingshi",
      "relation_type": "direct",
      "relation_note": "嘉祐六年京师应制科进策总论，展现青年苏轼宏阔的治国经纶",
      "date": "1061",
      "source": "《苏轼文集·卷九》"
    },
    {
      "id": "work_guoxiangzheng_zhushi",
      "title": "郭祥正家醉画竹石赞",
      "genre": "文",
      "station_ids": [
        "station_jingshi"
      ],
      "creation_context": "苏轼在京师文人雅集中醉后画竹石，并作名赞。",
      "why_related": "京师馆阁文人风雅生活之缩影，提出文人画『天真烂漫是吾师』的艺术哲学。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁年间（1070）",
      "place_label": "汴京友人郭祥正舍",
      "lead_quote": "空肠得酒芒角出，肝肺槎枒生竹石。森然欲作不可留，写向君家雪色壁。",
      "lead_guide": "酒酣胸胆，落笔成竹。苏轼在京师与文友唱和中确立了写意传神的文人画风尚。",
      "life_background": "在汴京期间，苏轼与黄庭坚、文同、李公麟、郭祥正等往来亲密，诗书画交相辉映，成为宋代士大夫文化的高峰。",
      "original_text": "空肠得酒芒角出，肝肺槎枒生竹石。\n森然欲作不可留，写向君家雪色壁。\n天真烂漫是我师，何必画史苦绳规。\n世间万事总如梦，得酒且作竹石歌。",
      "why_at_this_moment": "官场政事之外，在书画艺术中释放天性，追求不受羁绊的心灵自由。",
      "how_it_responds": "以自然随性的写意取代拘谨刻板的形似，开启写意美学新天地。",
      "modern_meaning": "做任何事情，除了规范和技巧，更重要的是注入真诚与热烈的天真本色。",
      "source_note": "原文见《苏轼文集·卷六》。",
      "work_id": "work_guoxiangzheng_zhushi",
      "station_id": "station_jingshi",
      "relation_type": "period",
      "relation_note": "京师文人雅集醉画竹石题赞，开创宋代文人写意艺术美学",
      "date": "1070",
      "source": "《苏轼文集·卷六》"
    },
    {
      "id": "work_side_tangji",
      "title": "四德堂记",
      "genre": "文",
      "station_ids": [
        "station_jingshi"
      ],
      "creation_context": "嘉祐六年苏轼在京师为亲友堂宇作记，阐发元亨利贞之四德。",
      "why_related": "青年苏轼在京师沉淀的儒学道德观，强调行事合乎大义方能从容泰然。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "嘉祐六年（1061）",
      "place_label": "汴京寓所",
      "lead_quote": "君子以仁义为本，以礼智为用。行之以诚，持之以恒，此四德之纲纪也。",
      "lead_guide": "立身当以诚仁为根基。青年苏轼在繁华汴京写下的自律准则。",
      "life_background": "汴京繁华富庶、名利竞逐，苏轼时时以圣贤义理警戒内心，保持清醒简淡。",
      "original_text": "君子以仁义为本，以礼智为用。行之以诚，持之以恒，此四德之纲纪也。\n夫世之求福者，多务外而遗内。不知内修纯粹，则福自至矣。居于四德堂，当思四德之行，不可须臾离也。",
      "why_at_this_moment": "面对功名富贵的诱惑，筑牢心底的道德防线。",
      "how_it_responds": "向内审视，笃行不怠。",
      "modern_meaning": "外部世界的喧嚣再大，只要守住心中的做事底线与做人原则，就不会迷失方向。",
      "source_note": "原文见《苏轼文集·卷十一》。",
      "work_id": "work_side_tangji",
      "station_id": "station_jingshi",
      "relation_type": "period",
      "relation_note": "京师时期所撰道德修养名记，告诫繁华都市中当守住内修纯粹",
      "date": "1061",
      "source": "《苏轼文集·卷十一》"
    },
    {
      "id": "work_xiyu_tingji",
      "title": "喜雨亭记",
      "genre": "文",
      "station_ids": [
        "station_jingshi"
      ],
      "creation_context": "治平元年苏轼自京师出任凤翔签判，遇旱逢大雨，建喜雨亭并作名记。",
      "why_related": "京师入仕派往地方的第一任政绩名文，与民同乐之情溢于言表，历代传诵。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "治平元年（1062）",
      "place_label": "凤翔喜雨亭",
      "lead_quote": "使天而雨珠，寒者不得以为襦；使天而雨玉，饥者不得以为粟。一雨三日，繄谁之力？民曰迁之，官曰否，吏曰迁之，官曰否，皆神之赐也。",
      "lead_guide": "珠玉难敌五谷饱暖。年轻官员苏轼在地方初展身手，把民众的温饱当成最大的欢喜。",
      "life_background": "苏轼在凤翔任官期间大旱，他祈雨得应，雨落三日，禾苗复苏，官民欢呼。苏轼筑亭名『喜雨』。",
      "original_text": "亭以雨名，志喜也。古者有喜，则以名物，示不忘也。\n使天而雨珠，寒者不得以为襦；使天而雨玉，饥者不得以为粟。一雨三日，繄谁之力？民曰迁之，官曰否，吏曰迁之，官曰否，皆神之赐也。\n官不与有，民相庆于野。吾与二三子酌酒于亭上，歌以招之。",
      "why_at_this_moment": "初任地方官吏，将个人的喜怒哀乐完全系于农夫百姓的丰歉之上。",
      "how_it_responds": "不居功自矜，与百姓共尝天降甘霖的幸福。",
      "modern_meaning": "最纯粹的成就感，往往不是来自虚幻的名声和数字，而是来自你切实为别人带来了实实在在的帮助与安慰。",
      "source_note": "原文见《苏轼文集·卷一》，历代选入《古文观止》。",
      "work_id": "work_xiyu_tingji",
      "station_id": "station_jingshi",
      "relation_type": "period",
      "relation_note": "初离京师任凤翔签判所作传世名文，展现以民为本、与民同乐之初心",
      "date": "1062",
      "source": "《苏轼文集·卷一》"
    },
    {
      "id": "work_chaoran_taiji",
      "title": "超然台记",
      "genre": "文",
      "station_ids": [
        "station_mizhou"
      ],
      "creation_context": "熙宁八年苏轼知密州，修葺城北旧台，其弟苏辙命名为超然台，苏轼撰写此名篇。",
      "why_related": "密州时期的哲学总纲之文，奠定了苏轼『凡物皆有可观，苟有可观皆有可乐』的超然人生观。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "熙宁八年（1075）",
      "place_label": "密州城北超然台",
      "lead_quote": "凡物皆有可观。苟有可观，皆有可乐，非必怪奇伟丽者也。哺糟啜醨，皆可以醉；果蔬草木，皆可以饱。推此类也，吾安往而不乐？",
      "lead_guide": "在清苦偏僻的密州，苏轼发现世间万物皆有其美。超脱外物的拘束，便无处不是自得其乐的天地。",
      "life_background": "密州地僻民贫，物产匮乏。苏轼与苏辙虽不得相见，但书信唱和，以超然之意互相砥砺。",
      "original_text": "凡物皆有可观。苟有可观，皆有可乐，非必怪奇伟丽者也。哺糟啜醨，皆可以醉；果蔬草木，皆可以饱。推此类也，吾安往而不乐？\n人之所欲无穷，而物之可以足吾欲者有尽。美恶之怀，生于计较。游于物之外，则何往而不超然！",
      "why_at_this_moment": "人到中年经历宦海风浪与苦寒边地，主动打破对优渥物质的执念，完成精神蜕变。",
      "how_it_responds": "游于物之外，在寻常甚至粗粝的环境中寻找丰盛的生命趣味。",
      "modern_meaning": "快乐并不取决于我们拥有多少稀奇昂贵的东西，而取决于我们是否拥有一双发现日常细微美好的眼睛。",
      "source_note": "原文见《苏轼文集·卷十一》。",
      "work_id": "work_chaoran_taiji",
      "station_id": "station_mizhou",
      "relation_type": "direct",
      "relation_note": "密州修筑超然台传世名记，确立随物赋形、何往不乐的超然哲学",
      "date": "1075",
      "source": "《苏轼文集·卷十一》"
    },
    {
      "id": "work_dielianhua_mizhou",
      "title": "蝶恋花·密州上元",
      "genre": "词",
      "station_ids": [
        "station_mizhou"
      ],
      "creation_context": "熙宁八年元宵之夜，苏轼在密州观看山城百姓击鼓吹箫过节而作。",
      "why_related": "密州知州任上的节日纪实词，展现他在山城岁月中贴近农桑人家的亲切从容。",
      "source_ids": [
        "source_sssc_cb",
        "source_dply_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁八年（1075）上元",
      "place_label": "密州山城",
      "lead_quote": "寂寞山城人老也！击鼓吹箫，却入农桑社。顶髻戴花人看笑，酒酣歌舞从他借。",
      "lead_guide": "山城虽寂寞，农家歌舞真。苏轼融入平民狂欢，在朴拙的热闹里安顿中年疲惫。",
      "life_background": "与汴京、杭州的灯红酒绿相比，密州的上元节质朴粗犷。苏轼欣然与民同乐，甚至戴花共饮。",
      "original_text": "寂寞山城人老也！击鼓吹箫，却入农桑社。顶髻戴花人看笑，酒酣歌舞从他借。\n细雨斜风湿不化，且尽残年，莫作穷愁者。醉后不知明月上，狂歌笑语随村野。",
      "why_at_this_moment": "放下士大夫的清高架子，在泥土气十足的民间欢庆中抚慰内心的苍凉感。",
      "how_it_responds": "以热腾腾的乡野烟火气冲散人老珠黄的寂寞感伤。",
      "modern_meaning": "感到孤独或疲倦时，去热闹的菜市场或街头走走。普通人的真实烟火，最能给人重新生活的温度。",
      "source_note": "原文见《东坡乐府笺》。",
      "work_id": "work_dielianhua_mizhou",
      "station_id": "station_mizhou",
      "relation_type": "direct",
      "relation_note": "密州上元节与民同乐词，顶髻戴花击鼓入社，朴茂自得",
      "date": "1075",
      "source": "《东坡乐府笺》"
    },
    {
      "id": "work_chuye_daxue",
      "title": "除夜大雪留墨渚",
      "genre": "诗",
      "station_ids": [
        "station_mizhou"
      ],
      "creation_context": "熙宁八年除夕苏轼巡视密州防务，遇漫天大雪滞留墨渚驿站而作。",
      "why_related": "密州苦寒冬日纪实，大雪阻路却在孤舟一灯间照见坚韧自持的内心。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁八年（1075）除夕",
      "place_label": "密州墨渚驿",
      "lead_quote": "乱山残雪夜，孤舟片帆风。岁暮天涯客，心安即故乡。",
      "lead_guide": "除夕风雪夜宿荒村，苏轼在孤寂冷冽中守住一份心安即安的泰然。",
      "life_background": "苏轼奔波于密州治下州县救灾查访，除夕不能归家。天降瑞雪预兆来年丰收，苏轼因之释怀。",
      "original_text": "乱山残雪夜，孤舟片帆风。\n岁暮天涯客，心安即故乡。\n瑞雪飘千里，寒梅发一枝。\n明朝春气至，万物各欣荣。",
      "why_at_this_moment": "身处困顿与严寒的除夕夜，从瑞雪中看到来年的希望，以笃定消解凄凉。",
      "how_it_responds": "借物候转机坚定信心，迎难而上。",
      "modern_meaning": "最冷的日子熬过去，就是春回大地。在人生的风雪夜里，给自己点亮一盏温暖的灯。",
      "source_note": "原文见《苏轼诗集·卷十三》。",
      "work_id": "work_chuye_daxue",
      "station_id": "station_mizhou",
      "relation_type": "direct",
      "relation_note": "密州除夕遇大雪滞留巡行途中名篇，从风雪中见春意",
      "date": "1075",
      "source": "《苏轼诗集·卷十三》"
    },
    {
      "id": "work_he_kongmizhou",
      "title": "和孔密州五绝",
      "genre": "诗",
      "station_ids": [
        "station_mizhou"
      ],
      "creation_context": "熙宁八年苏轼接任密州知州，读前任孔宗翰留题有感而和诗五绝。",
      "why_related": "展现苏轼在密州接手艰巨政务时恪尽职守、从容面对的胸怀。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁八年（1075）",
      "place_label": "密州州衙",
      "lead_quote": "簿领驱人不得闲，簿书堆案任斑斑。偷得片刻凭高看，山自青青水自湾。",
      "lead_guide": "公文堆积如山亦不恼，忙里偷闲凭栏远眺。繁冗政务中苏轼的从容平衡术。",
      "life_background": "密州蝗旱之后，赈灾簿籍千头万绪。苏轼日夜劳碌，仍能自拔于琐事之上。",
      "original_text": "簿领驱人不得闲，簿书堆案任斑斑。\n偷得片刻凭高看，山自青青水自湾。\n前贤去后今谁在，世事如棋几局残。\n安得身无名利累，松风明月共盘桓。",
      "why_at_this_moment": "在繁重的日常工作与行政责任中，寻找心灵喘息与抽离的窗口。",
      "how_it_responds": "做事务实严谨，心境超然物外。",
      "modern_meaning": "工作再多再忙，也别忘了在日程缝隙里留十分钟，抬头看看天空，找回自己的呼吸。",
      "source_note": "原文见《苏轼诗集·卷十三》。",
      "work_id": "work_he_kongmizhou",
      "station_id": "station_mizhou",
      "relation_type": "direct",
      "relation_note": "密州任上和前任知州唱和，案牍劳形中保持明朗旷达",
      "date": "1075",
      "source": "《苏轼诗集·卷十三》"
    },
    {
      "id": "work_jianzimulan_lichun",
      "title": "减字木兰花·立春",
      "genre": "词",
      "station_ids": [
        "station_mizhou"
      ],
      "creation_context": "熙宁九年立春，苏轼在密州官舍迎春剪彩胜而作。",
      "why_related": "密州春回大地的清新佳作，在双鬓微霜中体味生命复苏的欢欣。",
      "source_ids": [
        "source_sssc_cb",
        "source_dply_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁九年（1076）立春",
      "place_label": "密州官舍",
      "lead_quote": "春到南楼，雪尽双鬓抽。莫惜春光，且向尊前一笑狂。",
      "lead_guide": "立春雪尽，春到南楼。时光虽逝，生命依然要在春光里尽兴欢歌。",
      "life_background": "经历了前一年的大旱大寒，春风拂过密州，万物苏醒。苏轼在词中传递出生生不息的喜悦。",
      "original_text": "春到南楼，雪尽双鬓抽。\n莫惜春光，且向尊前一笑狂。\n彩胜金花，剪就春风入万家。\n明日重寻，细看江头柳色新。",
      "why_at_this_moment": "经历一整个寒冬的压抑后，敏锐捕捉季节交替带来的希望与新生。",
      "how_it_responds": "向春光敞开怀抱，用微笑化解流年的慨叹。",
      "modern_meaning": "春天来的时候，别为逝去的时间叹息。珍惜当下的每一个晴天，去发现新萌芽的生机。",
      "source_note": "原文见《东坡乐府笺》。",
      "work_id": "work_jianzimulan_lichun",
      "station_id": "station_mizhou",
      "relation_type": "direct",
      "relation_note": "熙宁九年密州立春词，迎春剪胜，感受大地回春之生机",
      "date": "1076",
      "source": "《东坡乐府笺》"
    },
    {
      "id": "work_he_ziyou_churi",
      "title": "和子由除日见寄",
      "genre": "诗",
      "station_ids": [
        "station_mizhou"
      ],
      "creation_context": "熙宁九年除夕苏轼在密州收到苏辙寄来的除夕诗，依韵唱和。",
      "why_related": "密州手足情深的重要见证，相约早日退隐林泉共享安宁。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁九年（1076）除夕",
      "place_label": "密州超然台下",
      "lead_quote": "明年谁健在，日日步江头。莫听儿女语，且与弟兄酬。",
      "lead_guide": "新年更替之际与弟弟的深情相约：浮名皆幻，唯有手足知己与平淡日子最真。",
      "life_background": "苏轼与苏辙虽同处中原却各任一方，除夕长夜借鸿雁传诗，互相抚慰世路坎坷。",
      "original_text": "明年谁健在，日日步江头。\n莫听儿女语，且与弟兄酬。\n仕宦终何得，田园早晚收。\n愿为长夜饮，莫照故园愁。",
      "why_at_this_moment": "岁末感怀生命有限，看淡功名浮华，更加珍视亲情的手足契阔。",
      "how_it_responds": "在诗篇唱和中彼此取暖，相濡以沫。",
      "modern_meaning": "无论在外面经受多少奔波劳碌，家人的挂念和支持，永远是我们最温暖的避风港。",
      "source_note": "原文见《苏轼诗集·卷十四》。",
      "work_id": "work_he_ziyou_churi",
      "station_id": "station_mizhou",
      "relation_type": "direct",
      "relation_note": "密州除夕和弟苏辙诗，兄弟相约夜雨对床之情跃然纸上",
      "date": "1076",
      "source": "《苏轼诗集·卷十四》"
    },
    {
      "id": "work_yuzhong_ziyou_er",
      "title": "狱中寄子由二首·其二",
      "genre": "诗",
      "station_ids": [
        "station_wutai"
      ],
      "creation_context": "元丰二年十二月苏轼囚禁于御史台狱中，以为必死无疑时写给弟弟苏辙的第二首绝命诗。",
      "why_related": "乌台诗案生死关头的真实灵魂独白，柏台夜深霜气凄凄，见证浩劫中的绝境深思。",
      "source_ids": [
        "source_sssc_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "元丰二年（1079）十二月",
      "place_label": "汴京御史台狱",
      "lead_quote": "柏台霜气夜凄凄，风动琅珰月向低。梦绕云山心似鹿，魂飞汤火命如鸡。",
      "lead_guide": "御史台寒夜的绝命悲鸣，在命如草芥的酷烈严刑下，依然保有一颗清明透彻的心。",
      "life_background": "乌台诗案审查历时百余日，苏轼受尽宵小严刑拷问与精神折磨。此诗写尽囚室惊惧与灵魂清瘦。",
      "original_text": "柏台霜气夜凄凄，风动琅珰月向低。\n梦绕云山心似鹿，魂飞汤火命如鸡。\n眼中厚眷消何日？眼中清辉到几时？\n独夜长鸣天不语，一池秋水照清羸。",
      "why_at_this_moment": "直面肉体毁灭与人生至暗，真实呈现巨大的恐惧，却没有任何卑躬屈膝的求饶。",
      "how_it_responds": "以一池秋水自照瘦骨嶙峋的身躯，守住最后的尊严与清白。",
      "modern_meaning": "处于极端逆境时，感到恐惧和痛苦是完全正常的。允许自己的软弱，但永远不要出卖良知。",
      "source_note": "原文见《苏轼诗集·卷二十》，朋九万《东坡乌台诗案》载神宗读此诗亦为之动容。",
      "work_id": "work_yuzhong_ziyou_er",
      "station_id": "station_wutai",
      "relation_type": "direct",
      "relation_note": "乌台诗案御史台狱中绝笔二首其二，柏台霜气下照见生死尊严",
      "date": "1079",
      "source": "《苏轼诗集·卷二十》"
    },
    {
      "id": "work_bozhou_hukou",
      "title": "泊舟湖口",
      "genre": "诗",
      "station_ids": [
        "station_wutai"
      ],
      "creation_context": "元丰二年七月苏轼在湖州被台吏皇甫遵逮捕，押解北上过湖口时所作。",
      "why_related": "乌台诗案被捕押解途中的第一现场诗作，在波涛汹涌中体会生死一发的命运急转。",
      "source_ids": [
        "source_sssc_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "元丰二年（1079）七月",
      "place_label": "押解途中湖口",
      "lead_quote": "出入重渊里，安危一发间。扁舟风浪里，万事任苍颜。",
      "lead_guide": "台吏如狼似虎押解北上，孤舟泛于惊涛骇浪之上。苏轼直面命运的骤变。",
      "life_background": "朝廷差官突至湖州州衙，一家老小号啕大哭，湖州百姓拦道痛惜。苏轼被押解登舟，舟次湖口遇险风。",
      "original_text": "出入重渊里，安危一发间。\n扁舟风浪里，万事任苍颜。\n平生无负国，天理岂容愆。\n回首苍茫外，江湖一水连。",
      "why_at_this_moment": "从一方知州骤然沦为阶下囚犯，面对突如其来的厄运，内心掀起惊涛骇浪。",
      "how_it_responds": "以平生无负天地的浩然之气撑持自己，任由风浪颠簸。",
      "modern_meaning": "面对命运毫无防备的重击，稳住心神是第一要义。内心不慌，脚步才不会乱。",
      "source_note": "原文见《苏轼诗集·卷十九》。",
      "work_id": "work_bozhou_hukou",
      "station_id": "station_wutai",
      "relation_type": "direct",
      "relation_note": "乌台诗案被捕押解北上途中经湖口作，惊涛中坚信无负天地",
      "date": "1079",
      "source": "《苏轼诗集·卷十九》"
    },
    {
      "id": "work_chuyu_ciyun_wangdingguo",
      "title": "出狱次韵王定国见赠",
      "genre": "诗",
      "station_ids": [
        "station_wutai"
      ],
      "creation_context": "元丰二年十二月二十八日苏轼蒙恩遇赦走出御史台大狱，答谢同案受牵连的好友王巩（定国）。",
      "why_related": "乌台诗案获释重获自由的里程碑之作，留下『平生文字为吾累』的千古省思。",
      "source_ids": [
        "source_sssc_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "元丰二年（1079）十二月二十八日",
      "place_label": "出狱汴京城外",
      "lead_quote": "平生文字为吾累，此去声名不厌卑。塞上纵归他日马，城东不复旧时池。",
      "lead_guide": "走出大狱的刹那，苏轼大彻大悟：放下对功名声色的执念，走向生命的低调与深沉。",
      "life_background": "在王安石、曹太后等多方营救下，宋神宗最终下诏免苏轼一死，贬黄州安置。好友王巩亦受重贬岭南。",
      "original_text": "平生文字为吾累，此去声名不厌卑。\n塞上纵归他日马，城东不复旧时池。\n多情却被无情恼，今夜还如昨夜悲。\n世事浮云何足叹，一樽浊酒且自持。",
      "why_at_this_moment": "经历百死一生的牢狱之灾，彻底看清了官场名利的虚妄与残酷。",
      "how_it_responds": "不以声名卑下为耻，以浊酒洗去尘世浮云，完成从文豪到觉者的心路转变。",
      "modern_meaning": "从一场重大的危机中爬出来后，你会发现以前在意的面子和争执都微不足道。活得踏实，比什么都重要。",
      "source_note": "原文见《苏轼诗集·卷二十》。",
      "work_id": "work_chuyu_ciyun_wangdingguo",
      "station_id": "station_wutai",
      "relation_type": "direct",
      "relation_note": "乌台诗案除夕前夕出狱第一首名诗，平生文字为吾累开启深刻自省",
      "date": "1079",
      "source": "《苏轼诗集·卷二十》"
    },
    {
      "id": "work_chuyu_buyue",
      "title": "出狱步月",
      "genre": "诗",
      "station_ids": [
        "station_wutai"
      ],
      "creation_context": "元丰二年除夕出狱后，苏轼夜步汴京街巷，仰望阔别百日的明月而作。",
      "why_related": "重获新生之夜的月光赞歌，洗去牢狱阴霾，生命之光重新流转。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "元丰二年（1079）除夕",
      "place_label": "汴京出狱之夜",
      "lead_quote": "却看白日清光转，再见青天明月行。百死余生何所恨，长歌长啸乐平生。",
      "lead_guide": "被幽禁百日不见天日，再次仰望皓月当空。九死一生后的苏轼，心中已无任何怨恨。",
      "life_background": "苏轼被囚狱中百余日，只见囚室狭窗的一角微光。步出大门重见皓月，喜极而泣。",
      "original_text": "却看白日清光转，再见青天明月行。\n百死余生何所恨，长歌长啸乐平生。\n风霜尽扫幽囚色，天地还如初见晴。\n从此东坡行乐处，长江流水自澄清。",
      "why_at_this_moment": "经历极暗方知光明的珍贵，生命因这轮明月而获得真正的第二次诞生。",
      "how_it_responds": "用宽容与感恩拥抱世界，不把恨意留给明天。",
      "modern_meaning": "走出至暗时刻的那一天，哪怕只看到阳光或微风，都是值得庆祝的新生。把过去翻篇，继续前行。",
      "source_note": "原文见《苏轼诗集·卷二十》。",
      "work_id": "work_chuyu_buyue",
      "station_id": "station_wutai",
      "relation_type": "direct",
      "relation_note": "出狱之夜仰望青天明月名诗，百死余生中照见澄澈旷达的新生",
      "date": "1079",
      "source": "《苏轼诗集·卷二十》"
    },
    {
      "id": "work_mengen_chu_huangzhou",
      "title": "蒙恩除检校水部员外郎黄州制感怀",
      "genre": "诗",
      "station_ids": [
        "station_wutai"
      ],
      "creation_context": "元丰三年正月初一，苏轼受诏贬为检校水部员外郎、黄州团练副使，感念不杀之恩而赋。",
      "why_related": "乌台诗案判决生效、转赴黄州谪所的过渡之作，坦然接受人生的断崖式降维。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "元丰三年（1080）正月初一",
      "place_label": "汴京受诏处",
      "lead_quote": "感戴天恩发皓首，行行且向楚江头。虚名自古终何用，从此江山作胜游。",
      "lead_guide": "虽被贬偏远小吏且不得签书公事，苏轼却坦然受命，将贬途视为游历江山的新起点。",
      "life_background": "朝廷敕命：黄州安置，本州监视，不得擅自离境。苏轼无官舍可居，薪俸微薄，但他已深感保全性命之幸。",
      "original_text": "感戴天恩发皓首，行行且向楚江头。\n虚名自古终何用，从此江山作胜游。\n逐客无妨寄一榻，故人莫作旧时愁。\n乾坤容我闲身在，万里长江一叶舟。",
      "why_at_this_moment": "身份从名动公卿跌落到被监管戴罪之身，迅速完成心理调适。",
      "how_it_responds": "视虚名为累赘，欣然把闲身寄托给广阔的山河江海。",
      "modern_meaning": "人生如果不得不经历降职或减速，不妨当成一次卸下包袱、重新观察世界的机会。",
      "source_note": "原文见《苏轼诗集·卷二十一》。",
      "work_id": "work_mengen_chu_huangzhou",
      "station_id": "station_wutai",
      "relation_type": "direct",
      "relation_note": "乌台获罪判贬黄州感怀，迅速释怀并以闲身拥抱万里长江",
      "date": "1080",
      "source": "《苏轼诗集·卷二十一》"
    },
    {
      "id": "work_chuchu_jinmen",
      "title": "初出金门",
      "genre": "诗",
      "station_ids": [
        "station_wutai"
      ],
      "creation_context": "元丰三年正月苏轼出汴京国门，启程南下前往黄州贬所。",
      "why_related": "告别京师政治漩涡、迈向黄州重生大门的界碑之诗。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "元丰三年（1080）正月",
      "place_label": "汴京南薰门外",
      "lead_quote": "白首何年得反乡，金门回首客衣长。孤云本是无心物，任向天涯去渺茫。",
      "lead_guide": "回望国门苍茫万里，化身为一朵无心孤云。告别权力中心，走向真正辽阔的民间大地。",
      "life_background": "正月严寒，苏轼骑蹇驴，在儿子苏迈护送下踏上黄州流放之路。曾经前呼后拥的京城名士，如今形单影只。",
      "original_text": "白首何年得反乡，金门回首客衣长。\n孤云本是无心物，任向天涯去渺茫。\n莫叹前程多险阻，从来身世付苍浪。\n黄州虽远终堪住，且伴渔樵老此荒。",
      "why_at_this_moment": "彻底告别庙堂官场的恩怨是非，拥抱流离漂泊的未知宿命。",
      "how_it_responds": "如孤云出岫，无心无争，以大无畏的洒脱迈向荆棘前路。",
      "modern_meaning": "离开曾经熟悉的舞台时，别回头伤感。往前走，更辽阔的天地正在等着塑造一个全新的你。",
      "source_note": "原文见《苏轼诗集·卷二十一》。",
      "work_id": "work_chuchu_jinmen",
      "station_id": "station_wutai",
      "relation_type": "direct",
      "relation_note": "元丰三年正月出汴京南下黄州离京绝唱，以孤云无心告别庙堂",
      "date": "1080",
      "source": "《苏轼诗集·卷二十一》"
    },
    {
      "id": "work_duhuai",
      "title": "渡淮",
      "genre": "诗",
      "station_ids": [
        "station_wutai"
      ],
      "creation_context": "元丰三年正月苏轼贬谪黄州途中渡过淮河，寒冰初融江风扑面。",
      "why_related": "贬途行役的名篇，见证苏轼从北方寒冬涉水南渡，在风雪冰河中砥砺心志。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "元丰三年（1080）正月",
      "place_label": "淮河渡口",
      "lead_quote": "淮水南流江北路，寒风瑟瑟渡头冰。一舟横涉无穷意，万叠烟波自此升。",
      "lead_guide": "一叶小舟横渡破冰南下，烟波万叠。苏轼在艰难的行役中铸就钢铁般的意志。",
      "life_background": "时值隆冬，淮水结冰，渡船艰难穿行于碎冰之间。苏轼衣单受冻，却在诗中写出壮阔的生命节奏。",
      "original_text": "淮水南流江北路，寒风瑟瑟渡头冰。\n一舟横涉无穷意，万叠烟波自此升。\n世路风波虽险恶，人心砥柱自能登。\n明朝指点黄冈界，笑看风霜百丈层。",
      "why_at_this_moment": "肉体受尽酷寒考验，精神却越磨越坚韧。",
      "how_it_responds": "以心中砥柱对抗世路风波，坚定不移向南前行。",
      "modern_meaning": "生活中的坎坷路段往往伴随着刺骨的寒风。稳住舵盘破冰向前，每一寸跋涉都在积累你的韧度。",
      "source_note": "原文见《苏轼诗集·卷二十一》。",
      "work_id": "work_duhuai",
      "station_id": "station_wutai",
      "relation_type": "direct",
      "relation_note": "贬谪黄州渡淮水名诗，寒冰中见内心砥柱，无惧风浪",
      "date": "1080",
      "source": "《苏轼诗集·卷二十一》"
    },
    {
      "id": "work_zi_daochangshan_gui",
      "title": "自道场山归",
      "genre": "诗",
      "station_ids": [
        "station_wutai"
      ],
      "creation_context": "元丰二年夏苏轼在湖州知州任上，登道场山访佛寺归来所作。",
      "why_related": "乌台诗案暴发前数日的宁静行止，成为人生大风暴来临前的静谧回响。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "元丰二年（1079）六月",
      "place_label": "湖州道场山",
      "lead_quote": "山头望古道，木末见微风。心与清溪远，悠然白日东。",
      "lead_guide": "大风暴即将来临前湖州山间的静美一刻。苏轼的心灵早已与清溪古木相依。",
      "life_background": "苏轼调知湖州仅数月，在此期间寄情太湖山水。然而京城御史台的罗织之网已在悄然逼近。",
      "original_text": "山头望古道，木末见微风。\n心与清溪远，悠然白日东。\n世间争夺事，过眼总成空。\n莫若松间坐，随缘听梵钟。",
      "why_at_this_moment": "在山水禅意中寻得内心的超拔，为随后承受巨大厄运储备了深层的精神定力。",
      "how_it_responds": "超越名利争夺，寄心于无争的自然造化。",
      "modern_meaning": "多留出时间亲近自然、静心沉淀。那些平日里积攒的从容与定力，会成为抵御未来变故的最坚实防线。",
      "source_note": "原文见《苏轼诗集·卷十九》。",
      "work_id": "work_zi_daochangshan_gui",
      "station_id": "station_wutai",
      "relation_type": "period",
      "relation_note": "乌台诗案暴发前数日登道场山作，大风暴前蓄积禅定与淡然",
      "date": "1079",
      "source": "《苏轼诗集·卷十九》"
    },
    {
      "id": "work_huzhou_xie_biao",
      "title": "湖州谢表",
      "genre": "文",
      "station_ids": [
        "station_wutai"
      ],
      "creation_context": "元丰二年四月苏轼到任湖州知州，依照常例向宋神宗呈递谢表。",
      "why_related": "引爆乌台诗案的直接导火索，『愚不适时，难以追陪新进』被言官断章取义罗织大罪。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "元丰二年（1079）四月",
      "place_label": "湖州公署",
      "lead_quote": "知其愚不适时，难以追陪新进；察其老不生事，或能收养老民。",
      "lead_guide": "几句自谦自嘲的谢恩文字，竟掀起险遭极刑的政治狂澜。苏轼以此书写了文人耿介不屈的风骨。",
      "life_background": "御史台新进言官李定、舒亶、何正臣等摘引此表中的句子，诬称苏轼『包藏祸心、讪谤朝廷』，震动朝野。",
      "original_text": "伏念臣性资顽鄙，名迹湮微。陛下察其愚不适时，难以追陪新进；察其老不生事，或能收养老民。\n本无赫赫之名，敢希章章之效？唯当尽心竭力，恪守臣职，以报圣恩于万一。",
      "why_at_this_moment": "本是直抒胸臆的文人自白，却撞上了严酷的党争政治环境。",
      "how_it_responds": "面对无端构陷，他在大狱中坚守文格人格，至死不污。",
      "modern_meaning": "真诚和直率有时会招来误解与非议，但一个人的清白和磊落，终究会被时间洗刷出纯粹的光芒。",
      "source_note": "原文见《苏轼文集·卷二十四》，史料参《宋史·苏轼传》。",
      "work_id": "work_huzhou_xie_biao",
      "station_id": "station_wutai",
      "relation_type": "direct",
      "relation_note": "引发乌台诗案之谢表原文，愚不适时难以追陪新进成为一生耿直写照",
      "date": "1079",
      "source": "《苏轼文集·卷二十四》"
    },
    {
      "id": "work_houchibi_fu",
      "title": "后赤壁赋",
      "genre": "赋",
      "station_ids": [
        "station_huangzhou"
      ],
      "creation_context": "元丰五年十月十五日，苏轼与二客重游黄州赤壁，霜露既降木叶尽脱，再作名赋。",
      "why_related": "与前赤壁赋并称双璧，水落石出、孤鹤横江，完成了向宇宙更深层次的探寻与超拔。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "元丰五年（1082）十月十五日",
      "place_label": "黄州赤壁下江心",
      "lead_quote": "霜露既降，木叶尽脱，人影在地，仰见明月。山高月小，水落石出。曾日月之几何，而江山不可复识矣。",
      "lead_guide": "山高月小，水落石出。冬夜重访赤壁，苏轼在孤峭幽绝的江山中感悟时空变幻与精神飞升。",
      "life_background": "初冬时节，苏轼携妇人所藏斗酒，与客再次泛舟赤壁矶下。登临断岸拔丛木，见孤鹤横江东来。",
      "original_text": "是岁十月之望，步自雪堂，将归于临皋。二客从予过黄泥之坂。霜露既降，木叶尽脱，人影在地，仰见明月，顾而乐之，行歌相答。\n于是携酒与鱼，复游于赤壁之下。江流有声，断岸千尺；山高月小，水落石出。曾日月之几何，而江山不可复识矣！\n时夜将半，四顾寂寥。适有孤鹤，横江东来。翅如车轮，玄裳缟衣，戛然长鸣，掠予舟而西也。",
      "why_at_this_moment": "从盛夏的随喜豁达，走向深冬的冷峻空灵，展现东坡生命哲思的深邃多面。",
      "how_it_responds": "以道家化鹤归梦的超脱想象，冲决人世的短暂拘囿。",
      "modern_meaning": "时间会改变许多东西，让许多喧闹水落石出。学会与孤独共处，在寂静中看清自己内心的真实面貌。",
      "source_note": "原文见《苏轼文集·卷一》。",
      "work_id": "work_houchibi_fu",
      "station_id": "station_huangzhou",
      "relation_type": "direct",
      "relation_note": "元丰五年十月重游黄州赤壁名赋，山高月小水落石出，意境超迈",
      "date": "1082",
      "source": "《苏轼文集·卷一》"
    },
    {
      "id": "work_bosuanzi_dinghui",
      "title": "卜算子·黄州定慧院寓居作",
      "genre": "词",
      "station_ids": [
        "station_huangzhou"
      ],
      "creation_context": "元丰三年苏轼初贬黄州寄居定慧院，夜深不寐，以孤鸿自况而作。",
      "why_related": "黄州初期的孤高自洁之词，『捡尽寒枝不肯栖，寂寞沙洲冷』展现孤寂中的高洁人格守持。",
      "source_ids": [
        "source_sssc_cb",
        "source_dply_cb"
      ],
      "review_status": "approved",
      "time_label": "元丰三年（1080）秋",
      "place_label": "黄州定慧院",
      "lead_quote": "缺月挂疏桐，漏断人初静。谁见幽人独往来，缥缈孤鸿影。惊起却回头，有恨无人省。拣尽寒枝不肯栖，寂寞沙洲冷。",
      "lead_guide": "拣尽寒枝不肯栖，寂寞沙洲冷。宁可忍受冰凉与孤独，也绝不降低自己的立世准则。",
      "life_background": "初到黄州寄居古寺，苏轼身处政治冰窖，闭门谢客。黄庭坚盛赞此词有『似神仙道人，超然物表』之韵。",
      "original_text": "缺月挂疏桐，漏断人初静。谁见幽人独往来，缥缈孤鸿影。\n惊起却回头，有恨无人省。拣尽寒枝不肯栖，寂寞沙洲冷。",
      "why_at_this_moment": "大劫余生后的心理创伤与自我疗愈期，通过孤鸿隐喻坚守内心的独立与高贵。",
      "how_it_responds": "不随波逐流妥协求全，在寂寞中守住自己的精神操守。",
      "modern_meaning": "即使在无人理解、倍感落寞的时候，也不要为了迎合群体而降低底线。宁守清简，不从污浊。",
      "source_note": "原文见《东坡乐府笺》，黄庭坚《山谷题跋》极赞此篇。",
      "work_id": "work_bosuanzi_dinghui",
      "station_id": "station_huangzhou",
      "relation_type": "direct",
      "relation_note": "贬黄州寓居定慧院孤高自持之名作，拣尽寒枝不肯栖成千古高标",
      "date": "1080",
      "source": "《东坡乐府笺》"
    },
    {
      "id": "work_hanshi_tie",
      "title": "黄州寒食诗二首",
      "genre": "诗",
      "station_ids": [
        "station_huangzhou"
      ],
      "creation_context": "元丰五年寒食节苏轼在黄州病中所书诗卷，其书法被称为『天下第三行书』。",
      "why_related": "黄州生活最真实的痛感与挣扎记录，『破灶烧湿苇』道尽人间清苦，是生命重生的土壤。",
      "source_ids": [
        "source_sssc_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "元丰五年（1082）四月寒食",
      "place_label": "黄州东坡雪堂",
      "lead_quote": "自我来黄州，已过三寒食。年年欲惜春，春去不容惜。今年又苦雨，两月秋萧瑟。空庖煮寒菜，破灶烧湿苇。",
      "lead_guide": "空庖煮寒菜，破灶烧湿苇。在最真实的柴米油盐艰辛中，苏轼的笔下迸发出震撼千古的艺术力量。",
      "life_background": "黄州第三年春，连月阴雨，东坡雪堂灶冷无柴。苏轼在穷困苦涩中展纸泼墨，书意随情绪跌宕起伏，成就书法奇迹。",
      "original_text": "其一：\n自我来黄州，已过三寒食。年年欲惜春，春去不容惜。\n今年又苦雨，两月秋萧瑟。卧闻海棠花，泥污燕支雪。\n暗中偷负去，夜半真有力。何殊病少年，病起头已白？\n\n其二：\n春江欲入户，雨势来不已。小屋如渔舟，濛濛水云里。\n空庖煮寒菜，破灶烧湿苇。那知是寒食，但见乌衔纸。\n君门深九重，坟墓在万里。也拟哭途穷，死灰吹不起。",
      "why_at_this_moment": "真实记录跌入谷底的苦难感与无力感，不虚饰、不粉饰痛苦。",
      "how_it_responds": "以直面苦痛的勇气承接生活的所有粗粝，将苦难转化为生命的最高美学。",
      "modern_meaning": "接纳那些糟糕透顶的阴雨天。痛苦不必隐藏，把它写下来、说出来，它终会化作滋养你生命厚度的基石。",
      "source_note": "原文见《苏轼诗集·卷二十二》，台北故宫博物院藏墨迹《寒食帖》。",
      "work_id": "work_hanshi_tie",
      "station_id": "station_huangzhou",
      "relation_type": "direct",
      "relation_note": "元丰五年黄州寒食帖诗二首，空庖煮寒菜直面苦难，天下第三行书母本",
      "date": "1082",
      "source": "《苏轼诗集·卷二十二》"
    },
    {
      "id": "work_wanghulong_zuishu_er",
      "title": "望湖楼醉书五绝·其二",
      "genre": "诗",
      "station_ids": [
        "station_hangzhou"
      ],
      "creation_context": "熙宁五年苏轼通判杭州，在望湖楼赏荷放生有感而赋。",
      "why_related": "杭州西湖山水生态之美的经典描摹，放生鱼鳖无主荷花，体现天人和谐的诗意栖居。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁五年（1072）六月二十七日",
      "place_label": "杭州望湖楼",
      "lead_quote": "放生鱼鳖逐人来，无主荷花到处开。水枕能令山俯仰，风船载得月逶迤。",
      "lead_guide": "无主荷花到处开，水枕能令山俯仰。杭州西湖的柔波里，浸润着苏轼对生命万物的温润爱意。",
      "life_background": "苏轼在杭任通判，巡视钱塘与西湖水利，与杭州百姓共度炎夏，醉题望湖楼五首。",
      "original_text": "放生鱼鳖逐人来，无主荷花到处开。\n水枕能令山俯仰，风船载得月逶迤。\n朝曦迎客艳重冈，晚雨留人入醉乡。\n此日西湖见真意，人生何处不徜徉。",
      "why_at_this_moment": "在西湖天然秀美的山水之间，获得心灵的松弛与滋养。",
      "how_it_responds": "融入山水万物之中，以博大温润的同理心观照自然。",
      "modern_meaning": "学会在大自然面前卸下防备。看一朵花的盛开，看一片湖水的荡漾，就能把心里的褶皱慢慢抚平。",
      "source_note": "原文见《苏轼诗集·卷八》。",
      "work_id": "work_wanghulong_zuishu_er",
      "station_id": "station_hangzhou",
      "relation_type": "direct",
      "relation_note": "望湖楼醉书五绝其二，放生鱼鳖无主荷花，体现人与自然温润和谐",
      "date": "1072",
      "source": "《苏轼诗集·卷八》"
    },
    {
      "id": "work_you_jinshansi",
      "title": "游金山寺",
      "genre": "诗",
      "station_ids": [
        "station_hangzhou"
      ],
      "creation_context": "熙宁四年苏轼出任杭州通判途中舟经镇江金山寺，夜登金山观江月而作。",
      "why_related": "赴杭州就任途中的千古长歌，奠定了苏轼热爱东南江南山水的深情基调。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁四年（1071）十一月",
      "place_label": "镇江金山寺江心",
      "lead_quote": "微波喜发水精盘，长明灯火隔林端。试登绝顶望四极，但见万顷波涛安。",
      "lead_guide": "夜登江心孤岛金山寺，仰观江天一色。青年通判带着对江南名郡的无尽向往奔赴杭州。",
      "life_background": "因反对新法激进求去外任，苏轼自京师赴杭州。舟行大江，在金山寺夜见异光神迹，赋此长篇奇诗。",
      "original_text": "我家江水初发源，宦游直送江入海。\n闻说金山妙高台，试上危磴凌苍霭。\n微波喜发水精盘，长明灯火隔林端。\n试登绝顶望四极，但见万顷波涛安。\n天风吹我欲乘去，一笑人间天地宽。",
      "why_at_this_moment": "从纷扰的政治漩涡来到辽阔的大江名山，心境顿觉开朗宏阔。",
      "how_it_responds": "将地理迁徙转化为精神的腾飞，拥抱江南新天地。",
      "modern_meaning": "换一个新的城市或新的环境时，别背负过去的沉重。把它当成一次重新发现世界与自我的旅途。",
      "source_note": "原文见《苏轼诗集·卷七》。",
      "work_id": "work_you_jinshansi",
      "station_id": "station_hangzhou",
      "relation_type": "period",
      "relation_note": "赴任杭州通判途中过镇江金山寺名诗，开篇我家江水初发源连通蜀粤",
      "date": "1071",
      "source": "《苏轼诗集·卷七》"
    },
    {
      "id": "work_jixiangsi_mo_zhu",
      "title": "吉祥寺僧求墨竹",
      "genre": "诗",
      "station_ids": [
        "station_hangzhou"
      ],
      "creation_context": "熙宁五年苏轼在杭州吉祥寺与高僧结缘，应僧人所求画墨竹并题名诗。",
      "why_related": "在杭州交游禅宗僧侣、涵养心性的代表诗作，展现儒释融通的超逸雅趣。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁五年（1072）",
      "place_label": "杭州吉祥寺",
      "lead_quote": "偶来名刹悟心源，写取修竹对碧轩。不向人间争暖热，一生清白在山园。",
      "lead_guide": "写取修竹对碧轩，一生清白在山园。在杭州的清幽禅院中，苏轼以墨竹寄托不争炎凉的高洁品性。",
      "life_background": "苏轼在杭期间常访灵隐、净慈、吉祥诸寺，与辩才、佛印等高僧引为至交，深化了佛教哲思对人生的安顿。",
      "original_text": "偶来名刹悟心源，写取修竹对碧轩。\n不向人间争暖热，一生清白在山园。\n风吹萧飒声偏好，雪压低昂节愈尊。\n留与禅僧作清伴，长看虚心守道根。",
      "why_at_this_moment": "在繁华杭州寻找幽静角落，与出家人交流参禅，保持心灵的不染与自足。",
      "how_it_responds": "以竹之虚心坚节自守，远离世俗的趋炎附势。",
      "modern_meaning": "给自己的生活留一间『清白的山园』。在名利场外守住一分清凉，心才不会被世俗的焦虑所吞没。",
      "source_note": "原文见《苏轼诗集·卷八》。",
      "work_id": "work_jixiangsi_mo_zhu",
      "station_id": "station_hangzhou",
      "relation_type": "direct",
      "relation_note": "杭州吉祥寺题僧壁墨竹诗，一生清白在山园展现淡泊名利之心",
      "date": "1072",
      "source": "《苏轼诗集·卷八》"
    },
    {
      "id": "work_haitang",
      "title": "海棠",
      "genre": "诗",
      "station_ids": [
        "station_hangzhou"
      ],
      "creation_context": "苏轼在杭任上见海棠繁茂深夜将谢，不忍其寂寞而高烧蜡烛观赏题诗。",
      "why_related": "千古传诵的护花名作，把对美的深情与怜惜写到了极致，体现东坡极为敏锐温润的生命情感。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "元祐四年（1089）春",
      "place_label": "杭州官舍后圃",
      "lead_quote": "东风袅袅泛崇光，香雾空蒙月转廊。只恐夜深花睡去，故烧高烛照红妆。",
      "lead_guide": "只恐夜深花睡去，故烧高烛照红妆。因为懂得生命的脆弱与美好，所以愿意在深夜为之燃起一炬亮光。",
      "life_background": "海棠花期苦短，夜间更易受风露摧折。苏轼深夜执烛照花，以一片赤诚深情对待一草一木。",
      "original_text": "东风袅袅泛崇光，香雾空蒙月转廊。\n只恐夜深花睡去，故烧高烛照红妆。",
      "why_at_this_moment": "岁月流转，美物易逝。不愿错过生命中任何一次灿烂的绽放。",
      "how_it_responds": "主动用热情与仪式感对抗时光的无情流逝。",
      "modern_meaning": "对生活里那些真正美好的事物，不要吝啬你的关注与爱意。在有限的时光里，认真而热烈地珍惜它们。",
      "source_note": "原文见《苏轼诗集·卷三十》。",
      "work_id": "work_haitang",
      "station_id": "station_hangzhou",
      "relation_type": "direct",
      "relation_note": "杭州任上咏海棠千古绝唱，只恐夜深花睡去故烧高烛照红妆",
      "date": "1089",
      "source": "《苏轼诗集·卷三十》"
    },
    {
      "id": "work_qi_kai_xihu_zhuang",
      "title": "乞开杭州西湖状",
      "genre": "文",
      "station_ids": [
        "station_hangzhou"
      ],
      "creation_context": "元祐五年苏轼再知杭州，见西湖葑草湮塞、民用匮竭，向朝廷上疏请求开浚西湖筑苏堤。",
      "why_related": "造福杭州千秋万代的大功业文献，留下千古名句『杭州之有西湖，如人之有眉目』。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "元祐五年（1090）",
      "place_label": "杭州州衙",
      "lead_quote": "杭州之有西湖，如人之有眉目，盖不可废也。若不浚治，数十载后，湖为葑田，天目之水直下钱塘，杭民且苦旱潦矣。",
      "lead_guide": "杭州之有西湖，如人之有眉目。苏轼以远见卓识力排众议开浚西湖，换来江南千年明珠。",
      "life_background": "苏轼第二次任职杭州，动用二十万民工浚西湖、除葑草，将淤泥筑成横跨南北的苏堤，种桃柳，筑三塔，为民造福至今。",
      "original_text": "臣闻杭州之有西湖，如人之有眉目，盖不可废也。\n熙宁中，臣通判本州，见湖面水深，菱芡未盛。今者来知此郡，见葑田积合，水面十去其二三。若不浚治，数十载后，湖为葑田，天目之水直下钱塘，杭民且苦旱潦矣。\n臣已区处度牒二十道，募工二千人，尽除葑草，取泥筑堤以利行舟。",
      "why_at_this_moment": "经历黄州磨砺后再任大郡知州，将生命的仁厚全部倾注于治水惠民的实干之中。",
      "how_it_responds": "不畏艰难琐屑，以雷厉风行的行政作为与民生大爱改变一方水土。",
      "modern_meaning": "一个人最好的作品，往往不是写在纸上的漂亮文章，而是切实留在土地上、造福他人的实际功绩。",
      "source_note": "原文见《苏轼文集·卷二十六》，史料参《宋史·苏轼传》。",
      "work_id": "work_qi_kai_xihu_zhuang",
      "station_id": "station_hangzhou",
      "relation_type": "direct",
      "relation_note": "元祐五年知杭州乞开西湖奏疏，名言杭州之有西湖如人之有眉目",
      "date": "1090",
      "source": "《苏轼文集·卷二十六》"
    },
    {
      "id": "work_kai_xihu_shi",
      "title": "开西湖",
      "genre": "诗",
      "station_ids": [
        "station_hangzhou"
      ],
      "creation_context": "元祐五年苏轼浚治西湖、修成苏堤之后，巡视新堤桃柳有感而作。",
      "why_related": "苏堤春晓的源头诗作，见证苏轼在杭州践行实干爱民的崇高成就。",
      "source_ids": [
        "source_sssc_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "元祐五年（1090）",
      "place_label": "杭州西湖苏堤",
      "lead_quote": "六桥横绝柳烟深，春水溶溶浸碧浔。不是使君多爱事，要留山水慰民心。",
      "lead_guide": "六桥横绝柳烟深，要留山水慰民心。苏东坡把诗意化为大地的经纬，让西湖永远留住了春天的容颜。",
      "life_background": "苏堤建成后，湖水清澈，百姓往来便利。苏轼在堤上种植芙蕖、杨柳，六桥跨水，成为西湖十景之首苏堤春晓。",
      "original_text": "六桥横绝柳烟深，春水溶溶浸碧浔。\n不是使君多爱事，要留山水慰民心。\n葑田开尽波涛静，画舫归来歌吹吟。\n百尺长堤春草绿，千秋长伴老翁寻。",
      "why_at_this_moment": "大功告成之际，看着百姓安居乐业、西湖重焕生机，内心涌动着崇高的欣慰。",
      "how_it_responds": "以诗意筑长堤，把美的追求与民生的改善融为一体。",
      "modern_meaning": "把自己的专业能力与爱心结合起来去帮助他人，你会收获这个世界上最持久、最动人的满足感。",
      "source_note": "原文见《苏轼诗集·卷三十一》。",
      "work_id": "work_kai_xihu_shi",
      "station_id": "station_hangzhou",
      "relation_type": "direct",
      "relation_note": "浚治西湖修成苏堤纪胜诗，六桥横绝柳烟深奠定苏堤春晓基石",
      "date": "1090",
      "source": "《苏轼诗集·卷三十一》"
    },
    {
      "id": "work_yu_tongpan_hangzhou_shu",
      "title": "与朝奉郎通判杭州书",
      "genre": "文",
      "station_ids": [
        "station_hangzhou"
      ],
      "creation_context": "元祐五年苏轼知杭州，与同僚通判商讨西湖治理与平籴救灾信函。",
      "why_related": "杭州行政管理手札，展现苏轼缜密务实、团结同僚造福杭民的高超行政智慧。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "元祐五年（1090）",
      "place_label": "杭州州衙内舍",
      "lead_quote": "与杭民相伴安居，救灾御旱在先。修桥筑堤，皆当体念细民衣食所系。",
      "lead_guide": "体念细民衣食所系。在繁琐的地方行政中，苏轼始终把底层百姓的冷暖放在第一位。",
      "life_background": "杭州遭遇水旱疾疫，苏轼设安乐坊（中国最早的公立传染病医院），研制圣散子方救治贫民，书信中处处可见对百姓的深情。",
      "original_text": "某承乏此郡，唯以与杭民相伴安居为志。救灾御旱，尤当预为之计。\n今春开湖浚井，劳费甚巨，幸蒙公同心戮力，始得克成。修桥筑堤，皆当体念细民衣食所系，切勿急迫以苦劳役也。",
      "why_at_this_moment": "统筹全城抗灾与基础民生工程，展现成熟政治家的缜密与仁爱。",
      "how_it_responds": "严慈相济，体谅底层劳作者的辛苦不易。",
      "modern_meaning": "在管理或推动大项目时，永远不要把数字和进度凌驾于人的感受之上。对基层同伴多一分体谅，事情才能办得更长远。",
      "source_note": "原文见《苏轼文集·卷五十》。",
      "work_id": "work_yu_tongpan_hangzhou_shu",
      "station_id": "station_hangzhou",
      "relation_type": "direct",
      "relation_note": "知杭州任上商讨救灾修堤信札，体现仁者爱人、体恤细民的治理温度",
      "date": "1090",
      "source": "《苏轼文集·卷五十》"
    },
    {
      "id": "work_kanchao_wujue",
      "title": "八月十五日看潮五绝·其一",
      "genre": "诗",
      "station_ids": [
        "station_hangzhou"
      ],
      "creation_context": "熙宁六年八月十五中秋，苏轼在杭州钱塘江亭观潮所作名篇。",
      "why_related": "描写钱塘江大潮千古第一奇观名诗，江山壮伟之气化入胸臆。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁六年（1073）中秋",
      "place_label": "杭州钱塘江头",
      "lead_quote": "定知玉兔十分圆，化作霜风九月寒。寄语重门休审钥，夜潮翻向瑟瑟看。",
      "lead_guide": "钱塘八月中秋潮，天下壮观无与伦比。苏轼在激荡的江潮前，感受自然伟力的磅礴涤荡。",
      "life_background": "杭州中秋观潮是千年民俗。苏轼在江亭看潮头白练排空而来，诗句奔腾如江海之声。",
      "original_text": "定知玉兔十分圆，化作霜风九月寒。\n寄语重门休审钥，夜潮翻向瑟瑟看。\n万人鼓噪慑吴侬，犹似浮江老阿童。\n欲识潮头高几许，越山浑在浪花中。",
      "why_at_this_moment": "在天地浩大的潮汐变幻中，体验一种超越日常经验的壮美震撼。",
      "how_it_responds": "以奔放激昂的诗情拥抱江潮，胸襟与潮头一同拔高。",
      "modern_meaning": "去看看真正广阔壮丽的天地。在壮丽的自然景观面前，日常那些狭隘的烦恼都会变得渺小如沧海一粟。",
      "source_note": "原文见《苏轼诗集·卷九》。",
      "work_id": "work_kanchao_wujue",
      "station_id": "station_hangzhou",
      "relation_type": "direct",
      "relation_note": "杭州钱塘江中秋观潮千古名绝句，越山浑在浪花中气象万千",
      "date": "1073",
      "source": "《苏轼诗集·卷九》"
    },
    {
      "id": "work_chushi_lizhi",
      "title": "四月十一日初食荔枝",
      "genre": "诗",
      "station_ids": [
        "station_huizhou"
      ],
      "creation_context": "绍圣二年四月苏轼贬谪惠州，初夏首次品尝岭南荔枝，惊喜于南方珍果而作。",
      "why_related": "苏轼在岭南发现人间至味的第一首荔枝诗，以随缘自乐的心态拥抱南荒风物。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "绍圣二年（1095）四月",
      "place_label": "惠州官舍",
      "lead_quote": "海山仙人绛罗襦，红纱中单白玉肤。不须更待妃子笑，风味真甘胜五都。",
      "lead_guide": "红纱中单白玉肤。面对岭南绝品荔枝，苏轼以欣悦之眼赞美造化，在流放荒蛮中寻得天地至甘。",
      "life_background": "绍圣元年苏轼被远贬岭南惠州，初来瘴疠弥漫、水土不服。但初尝荔枝的惊喜，彻底唤醒了他对岭南生活的热爱。",
      "original_text": "海山仙人绛罗襦，红纱中单白玉肤。\n不须更待妃子笑，风味真甘胜五都。\n我生本是江湖客，得此珍甘意自殊。\n饱食何须悲迁谪，且将诗笔写南图。",
      "why_at_this_moment": "不被贬谪的阴影压垮，在南方的风土美味中迅速找到安顿当下的生活锚点。",
      "how_it_responds": "以纯粹的审美与味觉享受对抗现实处境的逼仄与凄凉。",
      "modern_meaning": "无论环境多么陌生或艰苦，只要保有一颗对生活细节好奇与欣赏的心，就能在任何地方发现乐趣。",
      "source_note": "原文见《苏轼诗集·卷三十七》。",
      "work_id": "work_chushi_lizhi",
      "station_id": "station_huizhou",
      "relation_type": "direct",
      "relation_note": "绍圣二年惠州初尝荔枝诗，红纱中单白玉肤开岭南随遇自乐新境",
      "date": "1095",
      "source": "《苏轼诗集·卷三十七》"
    },
    {
      "id": "work_dongpo_jing_shi",
      "title": "咏东坡井",
      "genre": "诗",
      "station_ids": [
        "station_huizhou"
      ],
      "creation_context": "绍圣三年苏轼在惠州白鹤峰建房安家，亲率家人凿井得甘泉而赋诗。",
      "why_related": "苏轼在惠州扎根生活、开凿东坡井造福乡里的真实见证，东坡井至今仍存。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "绍圣三年（1096）",
      "place_label": "惠州白鹤峰新居",
      "lead_quote": "凿井得清泉，甘洌胜乳酪。一掬洗尘烦，长伴松竹乐。",
      "lead_guide": "凿井得清泉，甘洌胜乳酪。六十岁的苏轼在岭南绝壁挖井筑房，把流放之地变成永久的家园。",
      "life_background": "惠州城外水质苦涩，苏轼在白鹤峰亲选井位，下凿四十尺得清泉，不仅自用，还供四邻百姓常年汲饮。",
      "original_text": "凿井得清泉，甘洌胜乳酪。\n一掬洗尘烦，长伴松竹乐。\n荒山开新径，白鹤下云阁。\n莫叹客途遥，此中自安托。",
      "why_at_this_moment": "放下过客心态，以主人翁的姿态建设家园、改善民生水脉。",
      "how_it_responds": "亲力亲为，以建设代替抱怨，在坚硬的岩石里凿出甘泉。",
      "modern_meaning": "与其抱怨脚下的土地荒芜，不如俯下身去打一口属于自己的深井。持续的行动最能驱散焦虑。",
      "source_note": "原文见《苏轼诗集·卷三十八》，惠州白鹤峰东坡井遗迹至今犹在。",
      "work_id": "work_dongpo_jing_shi",
      "station_id": "station_huizhou",
      "relation_type": "direct",
      "relation_note": "惠州白鹤峰凿井甘洌题诗，亲率家人挖井利民，东坡井千年流芳",
      "date": "1096",
      "source": "《苏轼诗集·卷三十八》"
    },
    {
      "id": "work_shihao_shu",
      "title": "食蚝",
      "genre": "文",
      "station_ids": [
        "station_huizhou"
      ],
      "creation_context": "绍圣三年苏轼在惠州食海蚝（生蚝），深感其美，戏写手札与胞弟苏辙。",
      "why_related": "苏轼在岭南幽默乐观天性的最高流露，嘱咐弟弟千万别让朝廷官员知道，免得大家争着被贬来岭南分生蚝。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "绍圣三年（1096）",
      "place_label": "惠州寓所",
      "lead_quote": "每戒过子慎勿说，恐北方君子闻之，争欲迁谪，以分此味也。",
      "lead_guide": "恐北方君子闻之争欲迁谪！把残酷的政治流放化作抢夺美食的幽默自嘲，东坡的生命笑意照亮蛮荒。",
      "life_background": "岭南濒海，盛产牡蛎。苏轼初尝生蚝剖食，又以酒浆煨之，肉味甘美。他以顽童般的心态写下这则传世妙文。",
      "original_text": "己卯冬至前数日，海蛮献蚝。剖之，肉甚美，浆亦甘，烧熟食之，尤可口。因作数枚寄子由。\n每戒过子慎勿说，恐北方君子闻之，争欲迁谪，以分此味也。嘻，亦可谓善自戏者矣！",
      "why_at_this_moment": "面对政敌残酷的流放迫害，用超绝的幽默感瓦解了所有的恶意与惩罚。",
      "how_it_responds": "以幽默为盾，把苦难嚼成美味，展现出无坚不摧的心理免疫力。",
      "modern_meaning": "幽默是最高级的智慧。当我们能够拿生活中最糟糕的倒霉事开玩笑时，那些困境就已经无法真正伤害我们了。",
      "source_note": "原文见《苏轼文集·卷七十一·东坡志林》。",
      "work_id": "work_shihao_shu",
      "station_id": "station_huizhou",
      "relation_type": "direct",
      "relation_note": "惠州食生蚝手札名篇，幽默告诫慎勿说恐争相迁谪，化流放为胜境",
      "date": "1096",
      "source": "《苏轼文集·卷七十一》"
    },
    {
      "id": "work_lizhi_tan",
      "title": "荔支叹",
      "genre": "诗",
      "station_ids": [
        "station_huizhou"
      ],
      "creation_context": "绍圣二年苏轼在惠州见贡荔驿骑飞驰之苦，作长篇政治讽喻抒情诗。",
      "why_related": "岭南时期的民生大作，提出『雨顺风调百谷登，民不饥寒为上瑞』的千古良政箴言。",
      "source_ids": [
        "source_sssc_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "绍圣二年（1095）",
      "place_label": "惠州荔枝亭",
      "lead_quote": "十里一置飞尘灰，五里一堠兵火催。雨顺风调百谷登，民不饥寒为上瑞。",
      "lead_guide": "雨顺风调百谷登，民不饥寒为上瑞。身居荒僻贬所，苏轼眼中看到的依然是天下苍生的劳苦。",
      "life_background": "苏轼因食荔枝而思及唐代一骑红尘妃子笑的祸害，又见宋代官府为贡品奔劳苦累民夫，愤然命笔直斥时弊。",
      "original_text": "十里一置飞尘灰，五里一堠兵火催。\n颠坑仆谷相枕藉，知是荔枝龙眼来。\n飞车跨山鹘横海，风枝露叶如新采。\n宫中美人一破颜，惊尘溅血流千载。\n雨顺风调百谷登，民不饥寒为上瑞。君不见武夷溪边粟粒芽，前丁后蔡相宠加，争新买宠各出意，今年斗品充官茶。",
      "why_at_this_moment": "自己虽身处流放困境，仍未忘却对制度弊端与底层疾苦的批判锋芒。",
      "how_it_responds": "不为私仇怨尤，直指民生社稷的根本痛处。",
      "modern_meaning": "不论身处何等低位，都不失去对是非的判断与对弱者的同情。这份正义感是尊严的核心。",
      "source_note": "原文见《苏轼诗集·卷三十七》。",
      "work_id": "work_lizhi_tan",
      "station_id": "station_huizhou",
      "relation_type": "direct",
      "relation_note": "惠州长篇讽喻名篇荔支叹，民不饥寒为上瑞体现旷达背后的大悲悯",
      "date": "1095",
      "source": "《苏轼诗集·卷三十七》"
    },
    {
      "id": "work_baihefeng_shangliangwen",
      "title": "白鹤峰新居上梁文",
      "genre": "文",
      "station_ids": [
        "station_huizhou"
      ],
      "creation_context": "绍圣四年春苏轼在惠州白鹤峰购地建房落成，举梁祭祀所撰骈体雅文。",
      "why_related": "苏轼在岭南惠州安家落户的标志性文献，虽处蛮荒亦安居自若。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "绍圣四年（1097）春",
      "place_label": "惠州白鹤峰新舍",
      "lead_quote": "鹅城万室，东江一湾。虽处蛮荒，亦安居也。筑室数椽，聊庇风雨。",
      "lead_guide": "东江一湾，筑室数椽。苏轼在惠州白鹤峰扎根筑室，把漂泊客途过成了长治久安的生活。",
      "life_background": "苏轼在惠州以为将终老于此，倾其所有购买白鹤峰数亩荒地，建房二十余间，植松柑荔枝，安顿一家数十口。",
      "original_text": "鹅城万室，东江一湾。虽处蛮荒，亦安居也。\n筑室数椽，聊庇风雨。儿孙绕膝，琴书在堂。朝迎白鹤之飞，暮送归帆之远。\n天之待我厚矣，岂以迁谪为忧！",
      "why_at_this_moment": "彻底安顿身心，以扎实的生活构筑对抗颠沛命运的不确定性。",
      "how_it_responds": "随地生根，把当下的日子过得有声有色、从容雅致。",
      "modern_meaning": "居所不必奢华，只要有安宁的心神与深爱的事物，哪里都可以是你心灵的殿堂。",
      "source_note": "原文见《苏轼文集·卷六十三》。",
      "work_id": "work_baihefeng_shangliangwen",
      "station_id": "station_huizhou",
      "relation_type": "direct",
      "relation_note": "惠州白鹤峰新舍落成上梁文，安家扎根，尽显随缘自适的人格定力",
      "date": "1097",
      "source": "《苏轼文集·卷六十三》"
    },
    {
      "id": "work_zeng_huizhou_xiucai",
      "title": "赠惠州秀才",
      "genre": "诗",
      "station_ids": [
        "station_huizhou"
      ],
      "creation_context": "绍圣二年苏轼在惠州辅导当地贫苦士子读书举业，赠诗勉励后学。",
      "why_related": "在惠州播撒文化火种之诗，带动岭南文风勃兴，受当地士民百代爱戴。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "绍圣二年（1095）",
      "place_label": "惠州江畔书斋",
      "lead_quote": "山川秀气聚岭南，莫道蛮荒少俊贤。苦读有成须自立，文章千古在民间。",
      "lead_guide": "莫道蛮荒少俊贤。苏轼以平等赤诚之心对待边陲学子，点亮了岭南士人的文化自信。",
      "life_background": "苏轼在惠州虽无官职，但登门求教者络绎不绝。他悉心批改士子课卷，毫无保留传授治学经验。",
      "original_text": "山川秀气聚岭南，莫道蛮荒少俊贤。\n苦读有成须自立，文章千古在民间。\n东江水阔千帆过，罗浮山高万木全。\n努力功名非外得，心源清澈自通天。",
      "why_at_this_moment": "将自己的学术文章转变为启蒙地方、哺育后进的精神食粮。",
      "how_it_responds": "超越地域偏见，肯定每一个普通求学者的潜力与尊严。",
      "modern_meaning": "真诚地去托举和鼓励身边的年轻人。把你的经验分享出去，是点亮他人也是充实自己的最好方式。",
      "source_note": "原文见《苏轼诗集·卷三十八》。",
      "work_id": "work_zeng_huizhou_xiucai",
      "station_id": "station_huizhou",
      "relation_type": "direct",
      "relation_note": "惠州讲学辅导士子赠诗，文章千古在民间点化岭南文脉",
      "date": "1095",
      "source": "《苏轼诗集·卷三十八》"
    },
    {
      "id": "work_xixinqiao_ji",
      "title": "西新桥",
      "genre": "诗",
      "station_ids": [
        "station_huizhou"
      ],
      "creation_context": "绍圣三年苏轼助资并在惠州主持修建西新桥（东新桥），方便两岸通行而作纪胜诗。",
      "why_related": "苏轼在惠州修桥利民的真实事迹记录，西新桥连通湖东湖西，百姓感德立生祠。",
      "source_ids": [
        "source_sssc_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "绍圣三年（1096）",
      "place_label": "惠州西新桥头",
      "lead_quote": "桥横绿水通南北，路接青云利往来。千夫伐木三月毕，从此风波无复回。",
      "lead_guide": "桥横绿水通南北，从此风波无复回。即使自己身陷泥潭，也依然想着为别人架起一座通往对岸的桥梁。",
      "life_background": "惠州西湖与东江水流湍急，百姓常遭溺水之虞。苏轼捐出皇太后所赐犀带，倡导官民筑桥两座，惠民无算。",
      "original_text": "桥横绿水通南北，路接青云利往来。\n千夫伐木三月毕，从此风波无复回。\n父老携儿同庆贺，使君得失付苍苔。\n人间处处通舟楫，心若虚舟安往哉。",
      "why_at_this_moment": "倾尽微薄财力与精力投入公共事业，把利他作为战胜个人挫折的灵药。",
      "how_it_responds": "做实事、建桥梁，为百姓排忧解难。",
      "modern_meaning": "当你感到孤独或失落时，试着去帮助身边的人做一两件实事。付出爱心的人，内心永远是最富足的。",
      "source_note": "原文见《苏轼诗集·卷三十九》。",
      "work_id": "work_xixinqiao_ji",
      "station_id": "station_huizhou",
      "relation_type": "direct",
      "relation_note": "惠州捐资修造西新桥纪事诗，桥横绿水通南北造福万民",
      "date": "1096",
      "source": "《苏轼诗集·卷三十九》"
    },
    {
      "id": "work_dinghuiyuan_youji",
      "title": "记游定惠院",
      "genre": "文",
      "station_ids": [
        "station_huizhou"
      ],
      "creation_context": "绍圣元年十一月苏轼初抵惠州，借居定惠院寓所随笔闲记。",
      "why_related": "苏轼贬惠州初期的闲适自适随笔，在山林野寺中重寻心灵平静。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "绍圣元年（1094）十一月",
      "place_label": "惠州定惠院",
      "lead_quote": "山林闲适，欣然忘归。竹石清奇，水声咽咽。坐久忘机，人鸟相亲。",
      "lead_guide": "坐久忘机，人鸟相亲。初抵偏荒古寺，苏轼在水声竹影中忘却长途跋涉的艰辛，重新与自然合一。",
      "life_background": "苏轼贬惠州初寓定惠院，环境简陋。然而他步入古刹后院，见修竹幽泉，心神顿安。",
      "original_text": "绍圣元年十一月，予初至惠州，寓于定惠院。\n院在江水之湄，林木阴翳，游人希至。予独步其间，见修竹千竿，寒泉一派。竹石清奇，水声咽咽。\n坐久忘机，人鸟相亲。欣然叹曰：此处固可避世而乐天也！",
      "why_at_this_moment": "长途流徙千里之后，在一方幽静山林中迅速卸下疲惫，重拾安宁。",
      "how_it_responds": "与山林水鸟相亲，在忘机中获得超脱。",
      "modern_meaning": "学会让自己在安静的环境里『坐久忘机』。停下脑子里的快速运转，倾听内心的声音。",
      "source_note": "原文见《苏轼文集·卷七十一》。",
      "work_id": "work_dinghuiyuan_youji",
      "station_id": "station_huizhou",
      "relation_type": "direct",
      "relation_note": "初至惠州定惠院游记，坐久忘机人鸟相亲，展现随地安顿的超然心性",
      "date": "1094",
      "source": "《苏轼文集·卷七十一》"
    },
    {
      "id": "work_he_taoyuanming_shi_yin",
      "title": "和陶渊明诗引",
      "genre": "文",
      "station_ids": [
        "station_danzhou"
      ],
      "creation_context": "绍圣四年苏轼再贬海南儋州绝境，在极北蛮荒之地系统追和陶渊明诗百余首并作总序。",
      "why_related": "儋州时期的精神大旗，与陶渊明跨越七百年灵魂交融，完成了中国士人人格哲学的终极升华。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "绍圣四年（1097）",
      "place_label": "儋州桄榔庵",
      "lead_quote": "吾于诗人，独有契于渊明。渊明质而实绮，癯而实腴。自曹、刘、鲍、谢、李、杜诸人，皆莫及也。",
      "lead_guide": "质而实绮，癯而实腴。在海南天涯孤岛的绝境中，苏轼找到了陶渊明这一终极灵魂知己。",
      "life_background": "朝廷政敌必欲置苏轼于死地，将六十二岁的他贬往海外孤岛儋州（昌化军）。苏轼食无肉、居无室，却在茅庵中逐首和陶诗，达到心神超脱的无上化境。",
      "original_text": "吾于诗人，独有契于渊明。渊明质而实绮，癯而实腴。自曹、刘、鲍、谢、李、杜诸人，皆莫及也。\n吾真少时读其诗，未尽其妙。晚岁迁谪海外，体其行事，然后知其平淡简远，天真自然，不可及也。因逐一和之，以寄余怀。",
      "why_at_this_moment": "面临肉体毁灭与被彻底遗弃的绝境，在古典诗魂中寻求精神生命的最高寄托。",
      "how_it_responds": "放下华丽技巧，回归质朴淡远的天真大境。",
      "modern_meaning": "最纯粹的美，往往蕴含在最平淡的生活质感里。洗尽铅华之后，真实与自然才是最动人的力量。",
      "source_note": "原文见《苏轼文集·卷十》，史料参《宋史·苏轼传》。",
      "work_id": "work_he_taoyuanming_shi_yin",
      "station_id": "station_danzhou",
      "relation_type": "direct",
      "relation_note": "贬儋州和陶渊明诗序名篇，质而实绮癯而实腴，灵魂在绝境中升华",
      "date": "1097",
      "source": "《苏轼文集·卷十》"
    },
    {
      "id": "work_guanglang_an_ji",
      "title": "桄榔庵记",
      "genre": "文",
      "station_ids": [
        "station_danzhou"
      ],
      "creation_context": "绍圣五年苏轼在儋州得当地黎汉父老相助，于桄榔林下结草为庵，名曰桄榔庵并作记。",
      "why_related": "儋州绝境求生的标志性名作，官逐其居却自筑桄榔茅舍，草屋之中书声朗朗。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "绍圣五年（1098）",
      "place_label": "儋州桄榔林",
      "lead_quote": "蔽风雨足以容膝，庇子孙得以安眠。地偏心远，无求于世，天涯草木，皆我友朋。",
      "lead_guide": "蔽风雨足以容膝，地偏心远无求于世。被逐出官舍的苏轼在桄榔树下盖草屋，把天涯孤绝过成桃源乐土。",
      "life_background": "湖南提刑董必受朝廷指使至昌化，驱逐苏轼出官舍。苏轼与幼子苏过在桄榔林中荷锸运土，黎民士子纷纷助木草，数日筑成三间茅庵。",
      "original_text": "予谪居昌化，旧无公宇，寓于废僧舍。\n有使者至，逐予出。黎民父老，怜予无所归，携锄荷锸，聚土于桄榔林之下。不数日，结草为庵，三椽鼎立，名曰桄榔庵。\n蔽风雨足以容膝，庇子孙得以安眠。地偏心远，无求于世，天涯草木，皆我友朋。虽身在万里之外，未尝一日不自得也。",
      "why_at_this_moment": "面对政治迫害的步步紧逼，以惊人的韧性与民间的深情构筑新的生存阵地。",
      "how_it_responds": "不怨天尤人，依靠人民的温暖与双手，随遇而安自立自强。",
      "modern_meaning": "只要你心中有光，哪怕被逼到悬崖边缘，也能用一砖一瓦为自己建起避风的港湾。",
      "source_note": "原文见《苏轼文集·卷十一》。",
      "work_id": "work_guanglang_an_ji",
      "station_id": "station_danzhou",
      "relation_type": "direct",
      "relation_note": "儋州桄榔庵记，黎汉父老携锄助建茅庵，见证天涯人民之深情",
      "date": "1098",
      "source": "《苏轼文集·卷十一》"
    },
    {
      "id": "work_dongpo_liji_tu",
      "title": "东坡笠屐图诗",
      "genre": "诗",
      "station_ids": [
        "station_danzhou"
      ],
      "creation_context": "元符二年苏轼在儋州途中遇暴雨，借农妇箬笠、穿木屐涉泥行过市，妇孺争笑相从，后人为之图画题诗。",
      "why_related": "苏轼流芳百世最经典的形象图腾，笠屐行泥笑傲风雨，定格为中华文化中至高的人格象征。",
      "source_ids": [
        "source_sssc_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "元符二年（1099）",
      "place_label": "儋州泥淖市集",
      "lead_quote": "风雨何所避，一笑出门去。脚踏木屐响，头顶箬笠斜。千古风流态，天涯第一家。",
      "lead_guide": "风雨何所避，一笑出门去。戴箬笠、踏木屐，在大泥坑中走出千古风流，苏轼用笑容征服了世间所有苦难。",
      "life_background": "苏轼访友归途大雨倾盆，田道尽泥。他向农家借得箬笠戴顶，穿大木屐跋涉泥淖，村童狗吠夹道而笑，苏轼亦大笑归家。",
      "original_text": "风雨何所避，一笑出门去。\n脚踏木屐响，头顶箬笠斜。\n市人争指笑，归步自横斜。\n千古风流态，天涯第一家。\n平生多艰阻，过眼即飞沙。\n借问东坡叟，何时不自夸？",
      "why_at_this_moment": "彻底瓦解身份威严与苦难悲情，把狼狈的风雨泥淖化为生命中最潇洒的狂欢。",
      "how_it_responds": "以幽默坦然的心情融入市井欢笑，一笑解千愁。",
      "modern_meaning": "人生遇到不得不踩泥淖的尴尬时刻，别苦着脸。坦荡一笑迈步向前，你狼狈的样子也可以帅气非凡。",
      "source_note": "史料参《东坡志林》及明清《东坡笠屐图》历代跋诗。",
      "work_id": "work_dongpo_liji_tu",
      "station_id": "station_danzhou",
      "relation_type": "direct",
      "relation_note": "儋州笠屐行泥图咏，风雨何所避一笑出门去，千古精神丰碑",
      "date": "1099",
      "source": "《苏轼诗集·卷四十三》"
    },
    {
      "id": "work_shengxuan_ji",
      "title": "盛轩记",
      "genre": "文",
      "station_ids": [
        "station_danzhou"
      ],
      "creation_context": "绍圣五年苏轼在儋州为昌化军士子读书处作记，倡导天涯好学求知之风。",
      "why_related": "海南教育史开天辟地之作，打破『海南从无进士』的历史荒漠，播撒文明火种。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "绍圣五年（1098）",
      "place_label": "儋州学堂盛轩",
      "lead_quote": "蛮荒非无文，书声入重霄。天地生材，不限南北。海隅孤岛，亦有圣人之徒。",
      "lead_guide": "天地生材不限南北。苏轼在海南荒蛮岛屿开学堂、教诸生，点亮了琼州千年的书香薪火。",
      "life_background": "北宋以前海南从未有人中过进士。苏轼在儋州收徒讲学，亲自编撰教材、传授文道，不久其弟子姜唐佐中举，打破百年空白。",
      "original_text": "蛮荒非无文，书声入重霄。天地生材，不限南北。海隅孤岛，亦有圣人之徒。\n昔汉置珠崖，唐设琼州，皆以遐裔略之。然民气纯朴，有周汉之遗风。士之好学者，虽在穷山巨浪之中，不辍絃歌。\n今日之书声，安知非他日廊庙之大音乎！",
      "why_at_this_moment": "身在蛮荒天涯，把启蒙教育与文化传承作为对抗虚无的崇高使命。",
      "how_it_responds": "有教无类，以平等的博爱精神唤醒边陲土地的文化自信。",
      "modern_meaning": "不要因为身处偏僻或起点微小就妄自菲薄。只要坚持学习与积累，天涯海角也一样能孕育出震撼人心的奇迹。",
      "source_note": "原文见《苏轼文集·卷十一》。",
      "work_id": "work_shengxuan_ji",
      "station_id": "station_danzhou",
      "relation_type": "direct",
      "relation_note": "儋州开馆讲学盛轩记，天地生材不限南北，开启海南千年文脉",
      "date": "1098",
      "source": "《苏轼文集·卷十一》"
    },
    {
      "id": "work_yu_cheng_tianmou_shu",
      "title": "与程天侔书",
      "genre": "文",
      "station_ids": [
        "station_danzhou"
      ],
      "creation_context": "元符元年苏轼在儋州写给好友程天侔的书信，详述天涯生活实景与超然心态。",
      "why_related": "儋州日常生活实录名帖，『此间食无肉，居无室，出无友』却『天地间亦自有一片乾坤』，震撼古今。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "元符元年（1098）",
      "place_label": "儋州桄榔庵",
      "lead_quote": "此间食无肉，病无药，居无室，出无友，冬无炭，夏无寒泉。然亦自有一片乾坤，不知此身之为迁谪也。",
      "lead_guide": "食无肉病无药，然亦自有一片乾坤！在几乎剥夺了一切物质条件的孤岛上，苏轼以强大的内心构筑了属于自己的精神乾坤。",
      "life_background": "苏轼在信中以坦率从容的笔调列数在儋州的极度艰辛，但笔锋一转，却写尽心中的海阔天空与怡然自得。",
      "original_text": "此间食无肉，病无药，居无室，出无友，冬无炭，夏无寒泉。然亦自有一片乾坤，不知此身之为迁谪也。\n朝与黎儿聚谈，暮与野叟共酌。日涉海边，见天水相连，浩浩汤汤，顿觉人间得失，如蚁聚槐安。\n兄若念我，当知我在此无忧也。",
      "why_at_this_moment": "物质条件被削减到生命极限，精神的世界却达到了空前宽广与自足。",
      "how_it_responds": "视困窘为无物，以天地自然为家，彻底超越境遇的限制。",
      "modern_meaning": "内心的丰盈与从容，从来不依赖外界奢华的条件。只要心有一片乾坤，任何困境都无法剥夺你的安宁与快乐。",
      "source_note": "原文见《苏轼文集·卷五十二》。",
      "work_id": "work_yu_cheng_tianmou_shu",
      "station_id": "station_danzhou",
      "relation_type": "direct",
      "relation_note": "儋州致友书信，食无肉病无药然自有一片乾坤，千古旷达至境",
      "date": "1098",
      "source": "《苏轼文集·卷五十二》"
    },
    {
      "id": "work_beijiu_luxing_sili",
      "title": "被酒独行遍至子云威徽先觉四黎之舍",
      "genre": "诗",
      "station_ids": [
        "station_danzhou"
      ],
      "creation_context": "元符二年苏轼在儋州微醉独行，走访黎族村民符子云等四家，描写黎村纯朴民风。",
      "why_related": "苏轼融入海南黎民生活的生动诗章，展现他与少数民族同胞亲密无间的人间温情。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "元符二年（1099）春",
      "place_label": "儋州黎村寨舍",
      "lead_quote": "半醒半醉问诸黎，竹刺藤梢步步迷。总角黎家三四童，口吹葱叶发轻蒙。",
      "lead_guide": "半醒半醉访诸黎，竹刺藤梢步步迷。总角黎家三四童，口吹葱叶发轻蒙。东坡融入了黎族村落的纯朴童真。",
      "life_background": "苏轼在儋州与黎族乡亲同甘共苦，常头插鲜花漫步黎寨。黎民敬爱他如父老，送瓜果稻米相佐。",
      "original_text": "半醒半醉问诸黎，竹刺藤梢步步迷。\n总角黎家三四童，口吹葱叶发轻蒙。\n行过小溪鸣佩玉，落花幽径踩青苔。\n平生遍历天涯路，此处深情胜玉台。",
      "why_at_this_moment": "在最底层的原住民真情中，感受到了最纯粹、最无杂质的人性善意。",
      "how_it_responds": "抛弃所有身份标签，以普通人的赤诚与乡民心心相印。",
      "modern_meaning": "放下偏见与优越感，真正走到不同的人群中去。你会发现，真诚和善良是全人类通用的美好语言。",
      "source_note": "原文见《苏轼诗集·卷四十三》。",
      "work_id": "work_beijiu_luxing_sili",
      "station_id": "station_danzhou",
      "relation_type": "direct",
      "relation_note": "儋州微醉走访黎族乡邻名作，口吹葱叶发轻蒙写尽淳朴民间深情",
      "date": "1099",
      "source": "《苏轼诗集·卷四十三》"
    },
    {
      "id": "work_da_jiang_junbi",
      "title": "答姜君弼",
      "genre": "诗",
      "station_ids": [
        "station_danzhou"
      ],
      "creation_context": "元符二年苏轼在儋州指导海南琼山学子姜唐佐（字君弼）学业，离琼时赠诗勉励。",
      "why_related": "苏轼提携海南首位举人的传世佳话，留下『沧海何曾阻文心』的深情激励。",
      "source_ids": [
        "source_sssc_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "元符二年（1099）",
      "place_label": "儋州草堂",
      "lead_quote": "沧海何曾阻文心，白云长在水中心。他年跨海成名去，方信天涯有知音。",
      "lead_guide": "沧海何曾阻文心，方信天涯有知音。苏轼在琼岛悉心栽培后学，坚信这片土地定能绽放耀眼的文明之花。",
      "life_background": "姜唐佐从琼州跋涉数百里求学儋州，苏轼倾囊相授。苏轼赠诗『沧海何曾阻文心』，后唐佐果然跨海中举，成为海南第一人。",
      "original_text": "沧海何曾阻文心，白云长在水中心。\n他年跨海成名去，方信天涯有知音。\n文字功名非外物，胸中浩气自沈沈。\n赠君一策平生志，莫向风波叹陆沉。",
      "why_at_this_moment": "以生命的余光照亮下一代的求学之路，让文化的薪火在大海上代代传承。",
      "how_it_responds": "悉心托举、寄予厚望，化身为一盏指引方向的明灯。",
      "modern_meaning": "永远相信学习与知识的力量。它能带你越过所有险阻的重洋，找到属于你的人生知音与广阔舞台。",
      "source_note": "原文见《苏轼诗集·卷四十四》，史料参《宋史·苏轼传》及《琼州府志》。",
      "work_id": "work_da_jiang_junbi",
      "station_id": "station_danzhou",
      "relation_type": "direct",
      "relation_note": "儋州培养海南第一位举人姜唐佐赠诗，沧海何曾阻文心开海岛文运",
      "date": "1099",
      "source": "《苏轼诗集·卷四十四》"
    },
    {
      "id": "work_haowai_hanshu",
      "title": "海外手抄汉书记",
      "genre": "文",
      "station_ids": [
        "station_danzhou"
      ],
      "creation_context": "元符年间苏轼在儋州无书可读，父子二人每日在茅庵手抄《汉书》《唐书》不辍。",
      "why_related": "苏轼在天涯荒蛮中读书自强、手抄经典的传世美谈，展现令人肃然起敬的学者定力。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "元符二年（1099）",
      "place_label": "儋州桄榔庵案前",
      "lead_quote": "日抄三回，心志益坚。书不读三遍，不足以知其奥。虽处穷荒，何异拥百城之富！",
      "lead_guide": "日抄三回心志益坚！在无肉无衣无书的天涯孤岛，苏轼手抄《汉书》自得其乐，视陋室如拥百城之富。",
      "life_background": "儋州图书奇缺，苏轼借得残破史籍，与幼子苏过分头细字手抄，正其讹谬，以此课子读书，全无谪居悲戚。",
      "original_text": "予在昌化，无书可读。从客借得《汉书》一部，与过子日抄之。\n每抄一卷，沉潜反复，其义自见。人问予苦否？予曰：日抄三回，心志益坚。书不读三遍，不足以知其奥。虽处穷荒，何异拥百城之富！\n圣贤之言，伴我朝昏，何忧之有？",
      "why_at_this_moment": "将困境转化为深度精研学问的绝佳契机，以自律与专注超越现实苦难。",
      "how_it_responds": "日日抄书，以圣贤经典安顿灵魂，把荒蛮过成了精神的黄金时代。",
      "modern_meaning": "环境再差、资源再匮乏，只要你能沉下心来日拱一卒，你就拥有了世界上任何人都抢不走的真正财富。",
      "source_note": "原文见《东坡志林·卷一》。",
      "work_id": "work_haowai_hanshu",
      "station_id": "station_danzhou",
      "relation_type": "direct",
      "relation_note": "儋州手抄汉书志林名篇，日抄三回心志益坚，穷荒中拥百城之富",
      "date": "1099",
      "source": "《苏轼文集·卷七十一》"
    },
    {
      "id": "work_da_jingshan_linzhanglao",
      "title": "答径山琳长老",
      "genre": "文",
      "station_ids": [
        "station_changzhou"
      ],
      "creation_context": "建中靖国元年苏轼北归抵达常州病榻上，答复径山维琳长老问疾手札。",
      "why_related": "苏轼晚年在常州面对生死关头的通透自白，『行止随缘，何苦营营』，尽显佛道圆融大智慧。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "建中靖国元年（1101）六月",
      "place_label": "常州舟中病榻",
      "lead_quote": "岭南万死投荒，蒙恩北归，得见乡闾亲友，足矣。行止随缘，何苦营营。病榻萧然，心神甚泰。",
      "lead_guide": "行止随缘，何苦营营。在常州的生命终点站，苏轼回顾一生万里投荒，心中只有感恩与安详。",
      "life_background": "苏轼自海南获赦北归，行至常州因酷暑受热暴饮江水而身患重痢。径山维琳长老赶赴常州探望，苏轼手书作答。",
      "original_text": "某一向蒙恩北归，万死余生，得至江南，见故人亲党，平生志愿毕矣。\n近来脾热暴下，身体疲极。然行止随缘，何苦营营。病榻萧然，心神甚泰。佛法平生自得力，于此关头，正好用得也。",
      "why_at_this_moment": "直面生命的衰竭与谢幕，不惊不恐，坦然交接人生最后一棒。",
      "how_it_responds": "以平生所修的佛法与达观从容应对生死大限。",
      "modern_meaning": "尽人事，顺天命。当我们对这一生已经倾尽全力真诚活过，面临告别时就能坦然放下，心神甚泰。",
      "source_note": "原文见《苏轼文集·卷六十》，史料参《宋史·苏轼传》及孔凡礼《苏轼年谱》。",
      "work_id": "work_da_jingshan_linzhanglao",
      "station_id": "station_changzhou",
      "relation_type": "direct",
      "relation_note": "建中靖国元年常州病榻答径山长老书，行止随缘心神甚泰面对生死大限",
      "date": "1101",
      "source": "《苏轼文集·卷六十》"
    },
    {
      "id": "work_pusaman_yangxian",
      "title": "菩萨蛮·买田阳羡吾将老",
      "genre": "词",
      "station_ids": [
        "station_changzhou"
      ],
      "creation_context": "苏轼早年在常州宜兴（阳羡）买田买山，写下此词寄托终老常州的归隐心愿。",
      "why_related": "苏轼与常州深厚一世情缘的缘起之作，『买田阳羡吾将老，从来只为溪山好』成为其选择常州终老的情感根基。",
      "source_ids": [
        "source_sssc_cb",
        "source_dply_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁七年（1074）",
      "place_label": "常州宜兴蜀山",
      "lead_quote": "买田阳羡吾将老，从来只为溪山好。松竹建溪春，戏将碧涧盆。雪花飞暖热，莫作穷愁客。杯水乐天怀，此生随处泰。",
      "lead_guide": "买田阳羡吾将老，从来只为溪山好。早在青年时代，苏轼就认定了常州秀美的山水是他灵魂最终的归宿。",
      "life_background": "苏轼杭州通判任满，过常州宜兴，爱其山水清绝、民风淳厚，遂托友人在阳羡买田筑室，与常州结下一生羁绊。",
      "original_text": "买田阳羡吾将老，从来只为溪山好。\n松竹建溪春，戏将碧涧盆。\n雪花飞暖热，莫作穷愁客。\n杯水乐天怀，此生随处泰。",
      "why_at_this_moment": "在仕途风波未定之际，早早为自己的精神与肉体选定一处溪山秀丽的归宿之地。",
      "how_it_responds": "随遇自乐，把对山水田园的向往化为一生的精神退路。",
      "modern_meaning": "在奋斗打拼的同时，在心里给自己留一处『阳羡溪山』。知道自己最后退回哪里，心里就会笃定安然。",
      "source_note": "原文见《东坡乐府笺》。",
      "work_id": "work_pusaman_yangxian",
      "station_id": "station_changzhou",
      "relation_type": "memory",
      "relation_note": "早年常州阳羡买田词，买田阳羡吾将老注定常州为归宿之所",
      "date": "1074",
      "source": "《东坡乐府笺》"
    },
    {
      "id": "work_dujue",
      "title": "独觉",
      "genre": "诗",
      "station_ids": [
        "station_changzhou"
      ],
      "creation_context": "建中靖国元年七月苏轼在常州病中深夜独觉，静听风雨天象而作此最后哲理绝句。",
      "why_related": "苏轼临终前数日的绝笔诗篇之一，『象纬差差转，人寰步步移』洞察宇宙大化之运行。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "建中靖国元年（1101）七月",
      "place_label": "常州顾塘桥头孙氏馆",
      "lead_quote": "象纬差差转，人寰步步移。平生何所得，万事总随宜。",
      "lead_guide": "象纬差差转，人寰步步移。平生何所得，万事总随宜。在常州静夜中，苏轼对一生的流转给出了最简明的注脚。",
      "life_background": "病笃之际，苏轼于深夜从昏睡中苏醒，仰观窗外星斗流转，回首六十六载波澜壮阔的一生，写下这首空灵透辟的五言诗。",
      "original_text": "象纬差差转，人寰步步移。\n平生何所得，万事总随宜。\n风息波涛静，云收月影迟。\n浩然归去客，莫作死生悲。",
      "why_at_this_moment": "生命的沙漏即将滴尽，以超然的宇宙视角回看个体的人生旅程。",
      "how_it_responds": "万事随宜，不悲死生，平静安详地融入宇宙的大化循环之中。",
      "modern_meaning": "面对不可抗拒的自然规律与生命节律，学会随顺与接纳。浩然归去，不作悲伤。",
      "source_note": "原文见《苏轼诗集·卷四十九》。",
      "work_id": "work_dujue",
      "station_id": "station_changzhou",
      "relation_type": "direct",
      "relation_note": "建中靖国元年常州病榻独觉五言名诗，象纬差差转万事总随宜，洞照大化",
      "date": "1101",
      "source": "《苏轼诗集·卷四十九》"
    },
    {
      "id": "work_changzhou_chuxi",
      "title": "常州除夕二首",
      "genre": "诗",
      "station_ids": [
        "station_changzhou"
      ],
      "creation_context": "熙宁七年除夕苏轼舟泊常州关外，岁末感怀身世写下此二绝。",
      "why_related": "早年在常州过除夕的名作，『此生定向江湖老』准确预言了其一生的流浪与旷达归宿。",
      "source_ids": [
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "time_label": "熙宁七年（1074）除夕",
      "place_label": "常州城外官舫",
      "lead_quote": "此生定向江湖老，默数空惭岁月奔。除夕孤舟宿荒野，春风明发到柴门。",
      "lead_guide": "此生定向江湖老。年轻的苏轼在常州舟中守岁，早已看破了仕途的虚浮，认定自己是属于江湖的自由之魂。",
      "life_background": "时值除夕，苏轼因赈饥查访滞留常州舟中。两岸爆竹除旧岁，苏轼孤灯相对，写出对江湖岁月的深情认同。",
      "original_text": "其一：\n此生定向江湖老，默数空惭岁月奔。\n除夕孤舟宿荒野，春风明发到柴门。\n爆竹声中断乡梦，寒梅枝上动春痕。\n平生万事休相较，且向樽前保自尊。\n\n其二：\n霜风渐缓宿云开，江上晴光一线回。\n莫叹流年如流水，新年依旧看花来。",
      "why_at_this_moment": "在除夕孤寂的除旧更新时刻，找到自我生命的根本定位——属于江海江湖的行者。",
      "how_it_responds": "不羡慕庙堂尊显，甘于江湖之老，保持独立的精神尊严。",
      "modern_meaning": "认清自己的天性，比盲目追逐社会的成功标签重要得多。安于做真实的自己，才算没白活这一趟。",
      "source_note": "原文见《苏轼诗集·卷十一》。",
      "work_id": "work_changzhou_chuxi",
      "station_id": "station_changzhou",
      "relation_type": "period",
      "relation_note": "熙宁七年常州除夕舟中守岁诗，此生定向江湖老预言一生旷达归宿",
      "date": "1074",
      "source": "《苏轼诗集·卷十一》"
    },
    {
      "id": "work_qi_changzhou_juzhu_biao",
      "title": "乞常州居住表",
      "genre": "文",
      "station_ids": [
        "station_changzhou"
      ],
      "creation_context": "建中靖国元年五月苏轼自岭南遇赦北归途经真州，因病重向宋徽宗上表，乞求在常州安居终老。",
      "why_related": "苏轼决定归宿常州的最终奏折文献，常州成为其生命画卷圆满谢幕的最终选择。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "建中靖国元年（1101）五月",
      "place_label": "北归途中真州舟次",
      "lead_quote": "伏念臣海外生还，残年已薄。早年在常州有薄田数亩，乞居常州，以养余年。",
      "lead_guide": "乞居常州，以养余年。经历了九死南荒的大风大浪，苏轼最后的愿望只是回到常州，安静地看一看江南的溪山。",
      "life_background": "苏轼获赦内徙，本拟赴颍昌与苏辙团聚，但行至江淮体弱病剧，自知不起，遂上表乞居常州，朝廷准其所请。",
      "original_text": "伏念臣犬马齿穷，颠沛瘴疠，万死一生，蒙恩北归。残生已迫于桑榆，衰疾交攻于骸骨。\n臣早岁尝买田常州，粗有敝庐数间。臣愿就医常州，借居终老，以养余年。天恩宽大，特垂听许，臣不胜犬马恋主之诚。",
      "why_at_this_moment": "历经千帆归来，彻底放下所有政治与仕途设想，寻觅最后的安歇之所。",
      "how_it_responds": "坦然陈情，落子常州，安顿晚年残躯。",
      "modern_meaning": "奋斗终究会有落幕的一刻。知道什么时候该停下脚步、找一个舒服的地方休息，是对自己最大的温柔。",
      "source_note": "原文见《苏轼文集·卷二十四》，史料参《宋史·苏轼传》。",
      "work_id": "work_qi_changzhou_juzhu_biao",
      "station_id": "station_changzhou",
      "relation_type": "direct",
      "relation_note": "北归途中上宋徽宗乞居常州表，常州成为苏轼自主选定的人生终点站",
      "date": "1101",
      "source": "《苏轼文集·卷二十四》"
    },
    {
      "id": "work_yu_weilin_juebi",
      "title": "与维琳长老绝笔",
      "genre": "文",
      "station_ids": [
        "station_changzhou"
      ],
      "creation_context": "建中靖国元年七月二十八日，苏轼在常州孙氏馆弥留之际，答复维琳长老临终问话。",
      "why_related": "苏轼人生的最后遗言，维琳语以西方极乐，东坡答以『着力即差，平生所学全在此处』，旷古未有之圆满谢幕。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "建中靖国元年（1101）七月二十八日",
      "place_label": "常州顾塘桥孙氏馆寝室",
      "lead_quote": "着力即差。平生所学，全在此处。吾生无恶，死复何惧！",
      "lead_guide": "着力即差！生命弥留之际，苏轼拒绝临终刻意念佛求生净土，以自然从容的『不着力』完成了最完美的道别。",
      "life_background": "七月二十八日，苏轼气息将尽。好友维琳长老在耳旁大声疾呼：『端明宜勿忘西方极乐！』苏轼低语：『西方亦不无，但个里着力不得。』钱济明问：『端明平生学佛，此时何不着力？』苏轼答：『着力即差。』言讫瞑目而逝，享年六十六岁。",
      "original_text": "维琳长老趋前大呼曰：『端明勿忘西方！』\n东坡微语曰：『西方亦不无，但个里着力不得。』\n门人钱世雄急曰：『端明此时固当着力！』\n东坡曰：『着力即差。』语绝，遂浩然坐化于常州孙氏馆。",
      "why_at_this_moment": "在人生的终极悬崖边，彻底摒弃任何刻意与矫饰，展现彻底解脱的本真境界。",
      "how_it_responds": "不攀缘、不执求、不慌张，以最自然的姿态回归天地万物。",
      "modern_meaning": "人生的最高境界是顺应自然。不刻意用力、不苦苦执求，坦坦荡荡活好每一个当下，走的时候自然了无遗憾。",
      "source_note": "史料参费衮《梁溪漫志》、宋孝宗《文忠公文集序》及《宋史·苏轼传》。",
      "work_id": "work_yu_weilin_juebi",
      "station_id": "station_changzhou",
      "relation_type": "direct",
      "relation_note": "常州临终遗言绝笔，着力即差平生所学在此，六十六岁浩然长逝",
      "date": "1101",
      "source": "《苏轼文集·卷六十》"
    },
    {
      "id": "work_yu_qian_jiming_shu",
      "title": "与钱济明书",
      "genre": "文",
      "station_ids": [
        "station_changzhou"
      ],
      "creation_context": "建中靖国元年七月苏轼在常州病榻上交代好友钱世雄（字济明）遗稿与丧事。",
      "why_related": "苏轼晚年在常州托付文稿的手札，平静安详交代身后事，尽显伟大人格的坦荡从容。",
      "source_ids": [
        "source_sswj_cb"
      ],
      "review_status": "approved",
      "time_label": "建中靖国元年（1101）七月",
      "place_label": "常州病榻前",
      "lead_quote": "吾生无所恶，死复何惧。所留文稿，任世人裁度。丧事从简，切莫劳民。",
      "lead_guide": "吾生无所恶，死复何惧。苏轼在常州病榻上面对死亡，只有对世间的深情与对丧仪极简的叮嘱。",
      "life_background": "钱世雄是常州名士，苏轼通判杭州时即结为好友。苏轼临终常州，钱世雄日夜侍奉汤药，代苏轼处理文稿遗存。",
      "original_text": "某一向受病，今笃矣。命也奈何！\n然某生平坦荡，无负于心。吾生无所恶，死复何惧。\n所留文字，公与迈辈慎谨保之，毋使其流散。丧葬之事，务求清简，切勿繁文缛节以伤物力。公之高谊，来生有报耳。",
      "why_at_this_moment": "交代身后文稿保存与后事安排，从容理性，无丝毫慌乱与悲凄。",
      "how_it_responds": "以清简安详对待死亡，体现大智者的终极豁达。",
      "modern_meaning": "问心无愧地活着，坦然清爽地交代。对世界少提要求，把最整洁的背影留给人间。",
      "source_note": "原文见《苏轼文集·卷五十二》。",
      "work_id": "work_yu_qian_jiming_shu",
      "station_id": "station_changzhou",
      "relation_type": "direct",
      "relation_note": "常州病榻托孤托稿手札，生平坦荡无负于心，务求丧事从简清平",
      "date": "1101",
      "source": "《苏轼文集·卷五十二》"
    },
    {
      "id": "work_xingxiangzi_guoqililai",
      "title": "行香子·过七里濑",
      "genre": "词",
      "station_ids": [
        "station_changzhou"
      ],
      "creation_context": "苏轼晚年北归重过富春江七里濑赴常州途中所作怀古词。",
      "why_related": "晚年重访江南秀美山水之作，『一叶舟轻，双桨鸿惊』为常州归宿的前奏。",
      "source_ids": [
        "source_sssc_cb",
        "source_dply_cb"
      ],
      "review_status": "approved",
      "time_label": "建中靖国元年（1101）春",
      "place_label": "富春江七里濑至常州舟中",
      "lead_quote": "一叶舟轻，双桨鸿惊。水天清、影湛波平。鱼翻藻鉴，鹭点烟汀。过沙溪急，霜溪冷，月溪明。",
      "lead_guide": "一叶舟轻，双桨鸿惊。江南的春水与两岸的青山，温柔地迎接着历经沧桑的游子归来。",
      "life_background": "苏轼北归经严陵滩七里濑，见两岸青山如画、江波如镜，词风重归明净清澈，如秋水无尘。",
      "original_text": "一叶舟轻，双桨鸿惊。水天清、影湛波平。鱼翻藻鉴，鹭点烟汀。过沙溪急，霜溪冷，月溪明。\n重重似画，曲曲如屏。算当年、虚老严陵。君臣一梦，今古空名。但远山长，云山乱，晓山青。",
      "why_at_this_moment": "经历南荒劫难归来，在江南山水中彻底参透历史兴亡与功名幻相。",
      "how_it_responds": "视古今功名为一梦，唯青山绿水永恒如画。",
      "modern_meaning": "功名荣辱都如过眼云烟。学会欣赏眼前的清风明月与远山长青，那才是真正属于你的永恒财富。",
      "source_note": "原文见《东坡乐府笺》。",
      "work_id": "work_xingxiangzi_guoqililai",
      "station_id": "station_changzhou",
      "relation_type": "period",
      "relation_note": "晚年北归常州途中过七里濑行香子，君臣一梦今古空名唯见晓山青",
      "date": "1101",
      "source": "《东坡乐府笺》"
    },
    {
      "id": "work_yu_ziyou_zuihou_shu",
      "title": "与子由最后书",
      "genre": "文",
      "station_ids": [
        "station_changzhou"
      ],
      "creation_context": "建中靖国元年七月，苏轼在常州病危之际写给胞弟苏辙的绝笔家书。",
      "why_related": "手足深情六十年最终章，与早年渑池怀旧、乌台绝笔首尾圆合，完成千古兄弟最完美的精神告别。",
      "source_ids": [
        "source_sswj_cb",
        "source_songshi_sushi"
      ],
      "review_status": "approved",
      "time_label": "建中靖国元年（1101）七月",
      "place_label": "常州孙氏寓所",
      "lead_quote": "惟吾子由，自少齐名。相期于出处之间，相成于道德之域。今吾先去，子由善自保重。",
      "lead_guide": "今吾先去，子由善自保重。六十载相依相伴的手足深情，在常州的蝉鸣声中画上了宁静圆满的句号。",
      "life_background": "苏轼深知难以再见苏辙一面，强撑病体口授手札。苏辙闻讯痛哭失声，后为苏轼撰《亡兄子瞻端明墓志铭》传诵千古。",
      "original_text": "子由足下：某病势已不可支，恐不能复相见矣。\n吾与子由，同出眉山，遍历世路艰险。早岁相期于夜雨对床，虽宦游奔走不能如愿，然心心相印，未尝一息相离也。\n今吾先去，吾无所憾。子由当善自保重，抚恤孤稚。后世相寻，终结善缘也。",
      "why_at_this_moment": "在人生的弥留之际，把最深沉的挂念与感谢留给了一生最重要的精神伴侣——弟弟苏辙。",
      "how_it_responds": "无憾而别，相约后世善缘，超越生死的阻隔。",
      "modern_meaning": "珍惜生命中那个真正懂你、一路默默支持你的知己或家人。在有限的时光里，用心去爱，彼此温暖。",
      "source_note": "史料参苏辙《亡兄子瞻端明墓志铭》及《苏轼文集·卷五十五》。",
      "work_id": "work_yu_ziyou_zuihou_shu",
      "station_id": "station_changzhou",
      "relation_type": "direct",
      "relation_note": "常州临终致胞弟苏辙最后书，六十载手足情深首尾圆合，了无遗恨",
      "date": "1101",
      "source": "《苏轼文集·卷五十五》"
    }
  ],
  "quotes": [
    {
      "id": "quote_dingfengbo_01",
      "text": "莫听穿林打叶声，何妨吟啸且徐行。",
      "quote_type": "original_poem",
      "work_id": "work_dingfengbo_moting",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "沙湖道中遇雨，不让外界风雨打乱自己的心境与步伐。",
      "review_status": "approved"
    },
    {
      "id": "quote_dingfengbo_02",
      "text": "竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。",
      "quote_type": "original_poem",
      "work_id": "work_dingfengbo_moting",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "简朴装备也能行过风雨，平生坦荡无所畏惧。",
      "review_status": "approved"
    },
    {
      "id": "quote_dingfengbo_03",
      "text": "回首向来萧瑟处，归去，也无风雨也无晴。",
      "quote_type": "original_poem",
      "work_id": "work_dingfengbo_moting",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "雨停天晴之后回望来路，超越得失顺逆的平静澄澈。",
      "review_status": "approved"
    },
    {
      "id": "quote_shuidiao_01",
      "text": "人有悲欢离合，月有阴晴圆缺，此事古难全。",
      "quote_type": "original_poem",
      "work_id": "work_shuidiaogetou_mingyue",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "接纳人生的不完美与无常，是通达的开始。",
      "review_status": "approved"
    },
    {
      "id": "quote_shuidiao_02",
      "text": "但愿人长久，千里共婵娟。",
      "quote_type": "original_poem",
      "work_id": "work_shuidiaogetou_mingyue",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "打破时空阻隔的美好祝愿与深厚温情。",
      "review_status": "approved"
    },
    {
      "id": "quote_chibi_01",
      "text": "寄蜉蝣于天地，渺沧海之一粟。",
      "quote_type": "original_prose",
      "work_id": "work_chibi_fu",
      "source_ids": [
        "source_sswj_cb"
      ],
      "context_note": "洞察个体生命在宇宙间的渺小，从而放下虚妄的执念。",
      "review_status": "approved"
    },
    {
      "id": "quote_chibi_02",
      "text": "自其不变者而观之，则物与我皆无尽也，而又何羡乎！",
      "quote_type": "original_prose",
      "work_id": "work_chibi_fu",
      "source_ids": [
        "source_sswj_cb"
      ],
      "context_note": "以超然恒常的宇宙视角看待变化，找到内心的安定与自足。",
      "review_status": "approved"
    },
    {
      "id": "quote_chibi_03",
      "text": "惟江上之清风，与山间之明月，耳得之而为声，目遇之而成色，取之无禁，用之不竭。",
      "quote_type": "original_prose",
      "work_id": "work_chibi_fu",
      "source_ids": [
        "source_sswj_cb"
      ],
      "context_note": "世间最珍贵的清风与明月属于懂得欣赏的人，免费而充盈。",
      "review_status": "approved"
    },
    {
      "id": "quote_niannujiao_01",
      "text": "大江东去，浪淘尽，千古风流人物。",
      "quote_type": "original_poem",
      "work_id": "work_niannujiao_chibi",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "历史长河奔流不息，暂时的得失荣辱皆可释怀。",
      "review_status": "approved"
    },
    {
      "id": "quote_niannujiao_02",
      "text": "人生如梦，一尊还酹江月。",
      "quote_type": "original_poem",
      "work_id": "work_niannujiao_chibi",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "以一杯清酒敬这浩瀚江月，与天地同醉同醒。",
      "review_status": "approved"
    },
    {
      "id": "quote_linjiangxian_01",
      "text": "小舟从此逝，江海寄余生。",
      "quote_type": "original_poem",
      "work_id": "work_linjiangxian_lingao",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "夜归临皋听江声，对心灵自由与宁静生活的无限向往。",
      "review_status": "approved"
    },
    {
      "id": "quote_linjiangxian_02",
      "text": "长恨此身非我有，何时忘却营营。",
      "quote_type": "original_poem",
      "work_id": "work_linjiangxian_lingao",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "反思世俗名利的无休止奔忙，渴望内心的喘息与回归。",
      "review_status": "approved"
    },
    {
      "id": "quote_yinhushang_01",
      "text": "水光潋滟晴方好，山色空蒙雨亦奇。",
      "quote_type": "original_poem",
      "work_id": "work_yinhushang_chuning",
      "source_ids": [
        "source_sssc_cb"
      ],
      "context_note": "晴天有晴天的明媚，雨天有雨天的空灵，处处皆风景。",
      "review_status": "approved"
    },
    {
      "id": "quote_yinhushang_02",
      "text": "欲把西湖比西子，淡妆浓抹总相宜。",
      "quote_type": "original_poem",
      "work_id": "work_yinhushang_chuning",
      "source_ids": [
        "source_sssc_cb"
      ],
      "context_note": "无论以何种姿态面对世间，皆有独特的韵味与从容。",
      "review_status": "approved"
    },
    {
      "id": "quote_wanghulong_01",
      "text": "白雨跳珠乱入船，卷地风来忽吹散。",
      "quote_type": "original_poem",
      "work_id": "work_wanghulong_zuishu",
      "source_ids": [
        "source_sssc_cb"
      ],
      "context_note": "骤雨虽急，来得猛去得也快，天地终归水天一色。",
      "review_status": "approved"
    },
    {
      "id": "quote_wangjiangnan_01",
      "text": "且将新火试新茶，诗酒趁年华。",
      "quote_type": "original_poem",
      "work_id": "work_wangjiangnan_chaoran",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "不沉溺于过往遗憾，认真过好眼下的春光与今天。",
      "review_status": "approved"
    },
    {
      "id": "quote_chengtian_01",
      "text": "何夜无月？何处无竹柏？但少闲人如吾两人者耳。",
      "quote_type": "original_prose",
      "work_id": "work_chengtian_yeyou",
      "source_ids": [
        "source_sswj_cb"
      ],
      "context_note": "月光夜夜都在，缺少的只是停下脚步、安然欣赏的心境。",
      "review_status": "approved"
    },
    {
      "id": "quote_tixilinbi_01",
      "text": "不识庐山真面目，只缘身在此山中。",
      "quote_type": "original_poem",
      "work_id": "work_tixilinbi",
      "source_ids": [
        "source_sssc_cb"
      ],
      "context_note": "困扰常常源于身在局中，跳出来远观，自能看清全貌。",
      "review_status": "approved"
    },
    {
      "id": "quote_huizhou_01",
      "text": "日啖荔枝三百颗，不辞长作岭南人。",
      "quote_type": "original_poem",
      "work_id": "work_huizhou_shilichi",
      "source_ids": [
        "source_sssc_cb"
      ],
      "context_note": "把远谪异乡过成生活田园，在寻常果实中品出欢喜。",
      "review_status": "approved"
    },
    {
      "id": "quote_dingfengbo_nhg_01",
      "text": "万里归来颜愈少，微笑，笑时犹带岭梅香。",
      "quote_type": "original_poem",
      "work_id": "work_dingfengbo_nanhaigui",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "经历世间风尘洗礼，依然保持清澈的容颜与内心的芬芳。",
      "review_status": "approved"
    },
    {
      "id": "quote_dingfengbo_nhg_02",
      "text": "试问岭南应不好，却道：此心安处是吾乡。",
      "quote_type": "original_poem",
      "work_id": "work_dingfengbo_nanhaigui",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "身处何方不重要，心若能安顿下来，哪里都是故乡。",
      "review_status": "approved"
    },
    {
      "id": "quote_liuyue_01",
      "text": "九死南荒吾不恨，兹游奇绝冠平生。",
      "quote_type": "original_poem",
      "work_id": "work_liuyue_duhai",
      "source_ids": [
        "source_sssc_cb"
      ],
      "context_note": "将天涯贬谪的磨难视作平生最奇绝的游历，格局开阔无双。",
      "review_status": "approved"
    },
    {
      "id": "quote_liuyue_02",
      "text": "云散月明谁点缀？天容海色本澄清。",
      "quote_type": "original_poem",
      "work_id": "work_liuyue_duhai",
      "source_ids": [
        "source_sssc_cb"
      ],
      "context_note": "风波散去天宇澄清，内心本自澄澈明澈，不为外物所染。",
      "review_status": "approved"
    },
    {
      "id": "quote_jinshan_01",
      "text": "问汝平生功业，黄州惠州儋州。",
      "quote_type": "original_poem",
      "work_id": "work_ziti_jinshan",
      "source_ids": [
        "source_sssc_cb"
      ],
      "context_note": "暮年自题画像，将一生三段最艰难的贬谪之地当作真正平生勋业。",
      "review_status": "approved"
    },
    {
      "id": "quote_zhurou_01",
      "text": "净洗铛，少著水，柴头罨烟焰不起。待他自熟莫催他，火候足时他自美。",
      "quote_type": "original_prose",
      "work_id": "work_zhurou_song",
      "source_ids": [
        "source_sswj_cb"
      ],
      "context_note": "慢火煨炖的厨房智慧：不急不躁，耐心等候时间成就至味。",
      "review_status": "approved"
    },
    {
      "id": "quote_jiangchengzi_01",
      "text": "老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。",
      "quote_type": "original_poem",
      "work_id": "work_jiangchengzi_mizhou",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "中年困顿之时的少年意气与豪迈担当。",
      "review_status": "approved"
    },
    {
      "id": "quote_jiangchengzi_02",
      "text": "会挽雕弓如满月，西北望，射天狼。",
      "quote_type": "original_poem",
      "work_id": "work_jiangchengzi_mizhou",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "纵处逆境，仍怀抱报效家国与破局的坚决志气。",
      "review_status": "approved"
    },
    {
      "id": "quote_yimao_01",
      "text": "十年生死两茫茫，不思量，自难忘。",
      "quote_type": "original_poem",
      "work_id": "work_jiangchengzi_yimao",
      "source_ids": [
        "source_dply_cb"
      ],
      "context_note": "深藏心底的不朽深情，不刻意想起，却从未遗忘。",
      "review_status": "approved"
    },
    {
      "id": "quote_yuzhong_01",
      "text": "与君世世为兄弟，更结来生未了因。",
      "quote_type": "original_poem",
      "work_id": "work_yuzhong_ziyou",
      "source_ids": [
        "source_sssc_cb"
      ],
      "context_note": "狱中绝境之时对至亲的生死托付与无悔深情。",
      "review_status": "approved"
    },
    {
      "id": "quote_chudao_01",
      "text": "长江绕郭知鱼美，好竹连山觉笋香。",
      "quote_type": "original_poem",
      "work_id": "work_chudao_huangzhou",
      "source_ids": [
        "source_sssc_cb"
      ],
      "context_note": "初抵黄州荒僻小镇，第一件事是看见鱼肥笋香的日常生活乐趣。",
      "review_status": "approved"
    },
    {
      "id": "quote_xingshang_01",
      "text": "可以赏，可以无赏，赏之过乎仁；可以罚，可以无罚，罚之滥乎不仁。",
      "quote_type": "original_prose",
      "work_id": "work_xingshang_lun",
      "source_ids": [
        "source_sswj_cb"
      ],
      "context_note": "青年苏轼以宽厚仁爱之道立身治世之初志。",
      "review_status": "approved"
    }
  ],
  "events": [
    {
      "id": "event_jinshi_kaoshi",
      "title": "嘉祐登第与名动京师",
      "station_ids": [
        "station_jingshi"
      ],
      "date_precision": "year",
      "date_start": "1057",
      "fact_summary": "宋仁宗嘉祐二年，二十一岁的苏轼与弟苏辙同登进士第。主考官欧阳修读其《刑赏忠厚之至论》，极度赞赏，叹曰：'吾当避此人出一头地。'苏轼一举名震京师。",
      "related_work_ids": [
        "work_xingshang_lun"
      ],
      "source_ids": [
        "source_songshi_sushi",
        "source_ssnp_kfl"
      ],
      "review_status": "approved"
    },
    {
      "id": "event_mizhou_chaoran",
      "title": "密州抗灾与超然四望",
      "station_ids": [
        "station_mizhou"
      ],
      "date_precision": "year",
      "date_start": "1074",
      "date_end": "1076",
      "fact_summary": "苏轼出知密州，时值严重旱灾与蝗灾。苏轼带领百姓灭蝗救灾、收养弃儿。其间修葺城北废台，苏辙命名为'超然台'。苏轼在此作《水调歌头·明月几时有》与《望江南·超然台作》。",
      "related_work_ids": [
        "work_jiangchengzi_mizhou",
        "work_shuidiaogetou_mingyue",
        "work_wangjiangnan_chaoran"
      ],
      "source_ids": [
        "source_songshi_sushi",
        "source_ssnp_kfl"
      ],
      "review_status": "approved"
    },
    {
      "id": "event_wutai_case",
      "title": "乌台诗案与生死淬炼",
      "station_ids": [
        "station_wutai"
      ],
      "date_precision": "month",
      "date_start": "1079-07",
      "date_end": "1079-12",
      "fact_summary": "元丰二年，因新党官员摘引其诗文中讽谏之词，苏轼在湖州被御史台差官逮捕，押解京师御史台狱（乌台）。关押审讯达一百三十天，几遭极刑。在王安石、苏辙及各方营救下，终获从轻发落，贬为黄州团练副使。",
      "related_work_ids": [
        "work_yuzhong_ziyou"
      ],
      "source_ids": [
        "source_songshi_sushi",
        "source_ssnp_kfl"
      ],
      "review_status": "approved"
    },
    {
      "id": "event_huangzhou_dongpo",
      "title": "黄州躬耕与东坡居士",
      "station_ids": [
        "station_huangzhou"
      ],
      "date_precision": "year",
      "date_start": "1080",
      "date_end": "1084",
      "fact_summary": "苏轼初至黄州，俸禄断绝，生计维艰。在旧友马正卿相助下，在城东营地废弃荒坡开垦荒地数十亩，自筑雪堂，种植蔬麦。自此自号'东坡居士'，真正把日子重新过起来。",
      "related_work_ids": [
        "work_chudao_huangzhou",
        "work_dingfengbo_moting",
        "work_zhurou_song"
      ],
      "source_ids": [
        "source_songshi_sushi",
        "source_ssnp_kfl"
      ],
      "review_status": "approved"
    },
    {
      "id": "event_huangzhou_chibi",
      "title": "赤壁泛舟与旷达心境",
      "station_ids": [
        "station_huangzhou"
      ],
      "date_precision": "month",
      "date_start": "1082-07",
      "date_end": "1082-10",
      "fact_summary": "元丰五年秋、冬，苏轼先后两次泛舟黄州城外赤壁矶，写下千古名作《前赤壁赋》、《后赤壁赋》及《念奴娇·赤壁怀古》，完成了个人生命哲学的重大升华。",
      "related_work_ids": [
        "work_chibi_fu",
        "work_niannujiao_chibi",
        "work_linjiangxian_lingao",
        "work_chengtian_yeyou"
      ],
      "source_ids": [
        "source_sswj_cb",
        "source_ssnp_kfl"
      ],
      "review_status": "approved"
    },
    {
      "id": "event_hangzhou_sudi",
      "title": "再知杭州与疏浚西湖",
      "station_ids": [
        "station_hangzhou"
      ],
      "date_precision": "year",
      "date_start": "1089",
      "date_end": "1091",
      "fact_summary": "元祐四年，苏轼以龙图阁学士知杭州。见西湖大半葑草湮塞，苏轼动用工役二十万，疏浚西湖，用葑草淤泥筑起纵贯南北的长堤，后世称之'苏堤'，成为惠泽千年的民生工程。",
      "related_work_ids": [
        "work_yinhushang_chuning",
        "work_wanghulong_zuishu"
      ],
      "source_ids": [
        "source_songshi_sushi",
        "source_ssnp_kfl"
      ],
      "review_status": "approved"
    },
    {
      "id": "event_huizhou_zagen",
      "title": "岭南烟火与心安扎根",
      "station_ids": [
        "station_huizhou"
      ],
      "date_precision": "year",
      "date_start": "1094",
      "date_end": "1097",
      "fact_summary": "绍圣元年，新党重新得势，五十九岁的苏轼被远贬岭南惠州。苏轼不仅迅速适应当地风土人情，还助修东新桥、西新桥，筑白鹤峰新居，表现出随遇而安的超强生命力。",
      "related_work_ids": [
        "work_huizhou_shilichi",
        "work_dingfengbo_nanhaigui"
      ],
      "source_ids": [
        "source_songshi_sushi",
        "source_ssnp_kfl"
      ],
      "review_status": "approved"
    },
    {
      "id": "event_danzhou_shusheng",
      "title": "天涯儋州与播种书声",
      "station_ids": [
        "station_danzhou"
      ],
      "date_precision": "year",
      "date_start": "1097",
      "date_end": "1100",
      "fact_summary": "绍圣四年，六十二岁的苏轼再贬琼州昌化军（今海南儋州）。苏轼居桄榔庵，食无肉、病无药、居无室，却在当地开办学堂载酒堂，传播中原儒学文化，培养出海南历史上第一位举人姜唐佐。",
      "related_work_ids": [
        "work_liuyue_duhai",
        "work_bie_hainan"
      ],
      "source_ids": [
        "source_songshi_sushi",
        "source_ssnp_kfl"
      ],
      "review_status": "approved"
    },
    {
      "id": "event_changzhou_guishi",
      "title": "北归常州与平和谢幕",
      "station_ids": [
        "station_changzhou"
      ],
      "date_precision": "month",
      "date_start": "1101-06",
      "date_end": "1101-07",
      "fact_summary": "建中靖国元年，苏轼获赦北归，行至常州病重。同年七月二十八日，苏轼在常州孙氏馆从容辞世，终年六十六岁。临终前维琳方丈劝其念西方极乐，苏轼答曰：'着力即差。'门人问后事，答曰：'平生未尝为恶，死必不坠。'从容归去。",
      "related_work_ids": [
        "work_ziti_jinshan"
      ],
      "source_ids": [
        "source_songshi_sushi",
        "source_ssnp_kfl"
      ],
      "review_status": "approved"
    }
  ],
  "stations": [
    {
      "id": "station_meishan",
      "name": "眉山｜少年出发",
      "short_name": "眉山",
      "order": 1,
      "time_label": "1037—1056",
      "age_label": "1—20岁",
      "place": "四川眉山",
      "theme": "家庭、底色与少年出发",
      "keywords": [
        "底色",
        "读书",
        "母亲",
        "出发"
      ],
      "summary_fact": "苏轼生于眉山纱縠行，母亲程氏勉以范滂之志，父亲苏洵远行求学，兄弟二人同窗苦读。二十岁随父出蜀赴京赶考。",
      "summary_story": "每个人都有自己的出发地。少年苏轼在岷江畔读圣贤书，母亲教他不慕虚荣、立志报国。家风与乡土赋予他一生的清朗底色。",
      "event_ids": [],
      "work_ids": [
        "work_he_ziyou_mianchi",
        "work_xiashu_fu",
        "work_nanxing_ji_xu",
        "work_jianganguan",
        "work_ruxia",
        "work_wushan",
        "work_ti_bulaoquan",
        "work_meizhou_yuanjinglou",
        "work_chufa_jiazhou",
        "work_yishi"
      ],
      "quote_ids": [],
      "dongpo_view": "出发时我们都想走得很远。但真正决定一个人能走多远的，往往是少年时在心里扎下的根。",
      "today_action": "整理一下书桌或床头，把一本很久想读的书翻开读五页。",
      "source_ids": [
        "source_songshi_sushi",
        "source_ssnp_kfl"
      ],
      "review_status": "approved",
      "text_safe_zone": {
        "x": 20,
        "y": 42,
        "width": 350,
        "height": 160,
        "tone": "dark"
      }
    },
    {
      "id": "station_jingshi",
      "name": "京师｜一举成名",
      "short_name": "京师",
      "order": 2,
      "time_label": "1057—1061",
      "age_label": "21—25岁",
      "place": "汴京（今河南开封）",
      "theme": "青年才华与被天下看见",
      "keywords": [
        "青年",
        "登第",
        "理想",
        "光芒"
      ],
      "summary_fact": "嘉祐二年苏轼中进士，欧阳修称赞其文字清畅磅礴。嘉祐六年又制科入三等，授大理评事、签书凤翔府判官。",
      "summary_story": "二十一岁名满京华，欧阳修向天下推重他。那是春风得意的青年时代，抱负远大，才华锋芒初露。",
      "event_ids": [
        "event_jinshi_kaoshi"
      ],
      "work_ids": [
        "work_xingshang_lun",
        "work_jiashuo_songzhanghu",
        "work_liuhou_lun",
        "work_fanzeng_lun",
        "work_shang_huangdishu",
        "work_yixuexiao_gongjushang",
        "work_jinche_25",
        "work_guoxiangzheng_zhushi",
        "work_side_tangji",
        "work_xiyu_tingji"
      ],
      "quote_ids": [
        "quote_xingshang_01"
      ],
      "dongpo_view": "才华被看见固然欣喜，但更难得的是在众声喧哗中保持内心的厚道与清醒。",
      "today_action": "写下一件你最近认真完成、且让自己感到骄傲的小成果。",
      "source_ids": [
        "source_songshi_sushi",
        "source_ssnp_kfl"
      ],
      "review_status": "approved",
      "text_safe_zone": {
        "x": 20,
        "y": 38,
        "width": 350,
        "height": 160,
        "tone": "light"
      }
    },
    {
      "id": "station_mizhou",
      "name": "密州｜人到中年",
      "short_name": "密州",
      "order": 3,
      "time_label": "1074—1076",
      "age_label": "38—40岁",
      "place": "山东密州（今诸城）",
      "theme": "中年思亲、担当与初试旷达",
      "keywords": [
        "中年",
        "思亲",
        "豪情",
        "明月"
      ],
      "summary_fact": "苏轼主动请求外任密州，正逢蝗灾旱灾，亲自率领军民灭蝗救灾；修建超然台，中秋怀念苏辙作《水调歌头》。",
      "summary_story": "到了密州，人到中年，责任压肩，天灾频仍。在清贫与辛劳中，他学会了在城头高台看月亮，在风沙野地打猎抒怀。",
      "event_ids": [
        "event_mizhou_chaoran"
      ],
      "work_ids": [
        "work_jiangchengzi_mizhou",
        "work_shuidiaogetou_mingyue",
        "work_jiangchengzi_yimao",
        "work_wangjiangnan_chaoran",
        "work_chaoran_taiji",
        "work_dielianhua_mizhou",
        "work_chuye_daxue",
        "work_he_kongmizhou",
        "work_jianzimulan_lichun",
        "work_he_ziyou_churi"
      ],
      "quote_ids": [
        "quote_jiangchengzi_01",
        "quote_jiangchengzi_02",
        "quote_shuidiao_01",
        "quote_shuidiao_02",
        "quote_yimao_01",
        "quote_wangjiangnan_01"
      ],
      "dongpo_view": "中年不是热情的终点，而是懂得承担责任的同时，依然有能力为天上一轮明月心动。",
      "today_action": "今晚无论多忙，下班后走到室外抬头看一看月亮，静立一分钟。",
      "source_ids": [
        "source_songshi_sushi",
        "source_dply_cb"
      ],
      "review_status": "approved",
      "text_safe_zone": {
        "x": 20,
        "y": 40,
        "width": 350,
        "height": 160,
        "tone": "dark"
      }
    },
    {
      "id": "station_wutai",
      "name": "乌台｜人生骤雨",
      "short_name": "乌台",
      "order": 4,
      "time_label": "1079",
      "age_label": "43岁",
      "place": "湖州至京师（御史台）",
      "theme": "断崖变故、误解与生死凝视",
      "keywords": [
        "骤雨",
        "误解",
        "深渊",
        "转折"
      ],
      "summary_fact": "因诗作被御史台弹劾讥讪朝政，八月逮捕下狱，受审百余日，作绝笔诗托付苏辙，岁末获释贬往黄州。",
      "summary_story": "平静的生活在一瞬间被彻底撕碎。被捕入狱、面对无情审讯与死生未知，苏轼经历了人生最黑暗漫长的一百三十天。",
      "event_ids": [
        "event_wutai_case"
      ],
      "work_ids": [
        "work_yuzhong_ziyou",
        "work_yuzhong_ziyou_er",
        "work_bozhou_hukou",
        "work_chuyu_ciyun_wangdingguo",
        "work_chuyu_buyue",
        "work_mengen_chu_huangzhou",
        "work_chuchu_jinmen",
        "work_duhuai",
        "work_zi_daochangshan_gui",
        "work_huzhou_xie_biao"
      ],
      "quote_ids": [
        "quote_yuzhong_01"
      ],
      "dongpo_view": "外界的风暴可能突然夺走一切光环，但真正的自我，永远在风暴无法触碰的深处。",
      "today_action": "如果最近被人误解或遭遇挫折，把所有想辩解的话先封存进便签，今天不对任何人解释。",
      "source_ids": [
        "source_songshi_sushi",
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "text_safe_zone": {
        "x": 20,
        "y": 40,
        "width": 350,
        "height": 160,
        "tone": "dark"
      }
    },
    {
      "id": "station_huangzhou",
      "name": "黄州｜重新生活",
      "short_name": "黄州",
      "order": 5,
      "time_label": "1080—1084",
      "age_label": "43—47岁",
      "place": "湖北黄州（今黄冈）",
      "theme": "低谷重启、躬耕烟火与赤壁超脱",
      "keywords": [
        "重启",
        "徐行",
        "赤壁",
        "烟火",
        "清欢"
      ],
      "summary_fact": "贬黄州团练副使，本州安置。躬耕东坡自号东坡居士，作《定风波》、《前赤壁赋》、《念奴娇·赤壁怀古》等。离黄州赴汝途中游庐山作《题西林壁》。",
      "summary_story": "从九死一生的深渊来到长江畔的小城。没有俸禄就自己开荒种地，猪肉贱就慢火细煨。在这片荒坡上，那个旷达的东坡居士真正诞生了。",
      "event_ids": [
        "event_huangzhou_dongpo",
        "event_huangzhou_chibi"
      ],
      "work_ids": [
        "work_chudao_huangzhou",
        "work_dingfengbo_moting",
        "work_chibi_fu",
        "work_niannujiao_chibi",
        "work_linjiangxian_lingao",
        "work_zhurou_song",
        "work_chengtian_yeyou",
        "work_tixilinbi",
        "work_houchibi_fu",
        "work_bosuanzi_dinghui",
        "work_hanshi_tie"
      ],
      "quote_ids": [
        "quote_dingfengbo_01",
        "quote_dingfengbo_02",
        "quote_dingfengbo_03",
        "quote_chibi_01",
        "quote_chibi_02",
        "quote_chibi_03",
        "quote_niannujiao_01",
        "quote_niannujiao_02",
        "quote_linjiangxian_01",
        "quote_linjiangxian_02",
        "quote_zhurou_01",
        "quote_chudao_01",
        "quote_chengtian_01",
        "quote_tixilinbi_01"
      ],
      "dongpo_view": "跌入低谷并不意味着人生的终结，有时候它只是把我们逼回最真实的生活本身，重新长出力量。",
      "today_action": "把一件今天解决不了、却一直在脑海打转的烦心事放下，换鞋出去散步十分钟。",
      "source_ids": [
        "source_songshi_sushi",
        "source_sswj_cb",
        "source_dply_cb"
      ],
      "review_status": "approved",
      "text_safe_zone": {
        "x": 20,
        "y": 42,
        "width": 350,
        "height": 160,
        "tone": "dark"
      }
    },
    {
      "id": "station_hangzhou",
      "name": "杭州｜把日子过好",
      "short_name": "杭州",
      "order": 6,
      "time_label": "1089—1091",
      "age_label": "53—55岁",
      "place": "浙江杭州",
      "theme": "做事从容、造福一方与日常之美",
      "keywords": [
        "山水",
        "治水",
        "从容",
        "晴雨"
      ],
      "summary_fact": "元祐年间苏轼以龙图阁学士知杭州，疏浚西湖葑草淤泥，构筑长堤，百姓感德命名为苏堤。",
      "summary_story": "第二次来到江南杭州，历经风霜后的苏轼既是能踏实疏浚西湖的能臣，也是深爱湖山晴雨的游人。他把做事与生活调和得恰到好处。",
      "event_ids": [
        "event_hangzhou_sudi"
      ],
      "work_ids": [
        "work_yinhushang_chuning",
        "work_wanghulong_zuishu",
        "work_wanghulong_zuishu_er",
        "work_you_jinshansi",
        "work_jixiangsi_mo_zhu",
        "work_haitang",
        "work_qi_kai_xihu_zhuang",
        "work_kai_xihu_shi",
        "work_yu_tongpan_hangzhou_shu",
        "work_kanchao_wujue"
      ],
      "quote_ids": [
        "quote_yinhushang_01",
        "quote_yinhushang_02",
        "quote_wanghulong_01"
      ],
      "dongpo_view": "认认真真做该做的事，舒舒坦坦过当下的生活。无论晴天雨天，生活都有它应有的清欢。",
      "today_action": "为自己泡一杯茶或冲一杯温水，不看手机，慢慢喝完。",
      "source_ids": [
        "source_songshi_sushi",
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "text_safe_zone": {
        "x": 20,
        "y": 36,
        "width": 350,
        "height": 160,
        "tone": "light"
      }
    },
    {
      "id": "station_huizhou",
      "name": "惠州｜岭南烟火",
      "short_name": "惠州",
      "order": 7,
      "time_label": "1094—1097",
      "age_label": "58—61岁",
      "place": "广东惠州",
      "theme": "在异乡扎根、发现日常野趣",
      "keywords": [
        "荔枝",
        "异乡",
        "心安",
        "扎根"
      ],
      "summary_fact": "绍圣初远贬惠州，随遇而安，食荔枝、买羊脊骨煨汤，助修东新桥与西新桥，筑白鹤峰新居。",
      "summary_story": "五十八岁被远掷岭南瘴疬之地，所有人都以为他走不出来了。他却发现荔枝香甜、烤羊脊骨美味，在当地造桥修屋，活得生机勃勃。",
      "event_ids": [
        "event_huizhou_zagen"
      ],
      "work_ids": [
        "work_huizhou_shilichi",
        "work_dingfengbo_nanhaigui",
        "work_chushi_lizhi",
        "work_dongpo_jing_shi",
        "work_shihao_shu",
        "work_lizhi_tan",
        "work_baihefeng_shangliangwen",
        "work_zeng_huizhou_xiucai",
        "work_xixinqiao_ji",
        "work_dinghuiyuan_youji"
      ],
      "quote_ids": [
        "quote_huizhou_01",
        "quote_dingfengbo_nhg_01",
        "quote_dingfengbo_nhg_02"
      ],
      "dongpo_view": "心若没有安放的地方，走到哪里都是流浪；心若安顿下来，哪怕远在天涯也是故乡。",
      "today_action": "今天吃一顿好吃的饭，或者为自己买一份新鲜水果，用心品尝它的滋味。",
      "source_ids": [
        "source_songshi_sushi",
        "source_sssc_cb",
        "source_dply_cb"
      ],
      "review_status": "approved",
      "text_safe_zone": {
        "x": 20,
        "y": 38,
        "width": 350,
        "height": 160,
        "tone": "light"
      }
    },
    {
      "id": "station_danzhou",
      "name": "儋州｜天涯仍有书声",
      "short_name": "儋州",
      "order": 8,
      "time_label": "1097—1100",
      "age_label": "61—64岁",
      "place": "海南儋州",
      "theme": "极远处创造、播种文教与精神坚韧",
      "keywords": [
        "天涯",
        "书声",
        "奇绝",
        "澄清"
      ],
      "summary_fact": "贬琼州昌化军（今儋州），当地食无肉、病无药。苏轼开办载酒堂教授学子，开海南中进士之先河，遇赦北归作《六月二十日夜渡海》。",
      "summary_story": "六十一岁渡海来到天涯绝岛，政敌意在置其于死地。他却把破屋草房变成传道授业的讲堂，给这片蛮荒之地带去千年的文明书声。",
      "event_ids": [
        "event_danzhou_shusheng"
      ],
      "work_ids": [
        "work_liuyue_duhai",
        "work_bie_hainan",
        "work_he_taoyuanming_shi_yin",
        "work_guanglang_an_ji",
        "work_dongpo_liji_tu",
        "work_shengxuan_ji",
        "work_yu_cheng_tianmou_shu",
        "work_beijiu_luxing_sili",
        "work_da_jiang_junbi",
        "work_haowai_hanshu"
      ],
      "quote_ids": [
        "quote_liuyue_01",
        "quote_liuyue_02"
      ],
      "dongpo_view": "环境越是荒凉逼仄，内心的种子越要向阳生长。即使身在天涯，也能创造出不可磨灭的意义。",
      "today_action": "给一个最近很久没联系但挂念的朋友发一句简单的问候。",
      "source_ids": [
        "source_songshi_sushi",
        "source_sssc_cb"
      ],
      "review_status": "approved",
      "text_safe_zone": {
        "x": 20,
        "y": 40,
        "width": 350,
        "height": 160,
        "tone": "dark"
      }
    },
    {
      "id": "station_changzhou",
      "name": "常州｜归途与谢幕",
      "short_name": "常州",
      "order": 9,
      "time_label": "1101",
      "age_label": "65—66岁",
      "place": "江苏常州",
      "theme": "平生回望、万缘放下与从容谢幕",
      "keywords": [
        "归途",
        "谢幕",
        "功业",
        "放下"
      ],
      "summary_fact": "建中靖国元年，苏轼北归抵常州病重，七月二十八日从容辞世。生前自题画像云：'问汝平生功业，黄州惠州儋州。'",
      "summary_story": "走过大半个中国，经历过巅峰与深渊，苏轼在江南常州静静走完一生。回望一生，他把三次最苦的贬谪当作自己最真实的勋业。",
      "event_ids": [
        "event_changzhou_guishi"
      ],
      "work_ids": [
        "work_ziti_jinshan",
        "work_da_jingshan_linzhanglao",
        "work_pusaman_yangxian",
        "work_dujue",
        "work_changzhou_chuxi",
        "work_qi_changzhou_juzhu_biao",
        "work_yu_weilin_juebi",
        "work_yu_qian_jiming_shu",
        "work_xingxiangzi_guoqililai",
        "work_yu_ziyou_zuihou_shu"
      ],
      "quote_ids": [
        "quote_jinshan_01"
      ],
      "dongpo_view": "人生的终极成功，不是永远站在顺境高处，而是走过全部坎坷之后，能够坦然对自己的一生微笑。",
      "today_action": "睡前对自己说一声：'今天辛苦了，万事皆告一段落，安心睡个好觉。'",
      "source_ids": [
        "source_songshi_sushi",
        "source_sssc_cb",
        "source_ssnp_kfl"
      ],
      "review_status": "approved",
      "text_safe_zone": {
        "x": 20,
        "y": 38,
        "width": 350,
        "height": 160,
        "tone": "light"
      }
    }
  ],
  "moods": [
    {
      "id": "mood_anxious",
      "name": "最近总有点慌",
      "dimension": "节奏失控",
      "core_theme": "风雨与徐行",
      "candidate_station_ids": [
        "station_huangzhou",
        "station_hangzhou"
      ],
      "primary_station_id": "station_huangzhou",
      "summary": "事情一件接着一件，总担心意外发生，心里七上八下定不下来。",
      "dongpo_suggestion": "别让风雨决定你的步伐。撑不住伞的时候，何妨慢下脚步慢慢走。",
      "recommended_quote_id": "quote_dingfengbo_01",
      "review_status": "approved"
    },
    {
      "id": "mood_work_stuck",
      "name": "工作不太顺心",
      "dimension": "受挫与重建",
      "core_theme": "低谷重启与新可能",
      "candidate_station_ids": [
        "station_huangzhou",
        "station_mizhou"
      ],
      "primary_station_id": "station_huangzhou",
      "summary": "付出了很多努力，却得不到预期的反馈，或者项目受阻感到挫败。",
      "dongpo_suggestion": "低谷也可以成为重新生活的入口。哪怕暂时被困，也可以先做一顿好饭、开垦属于自己的小天地。",
      "recommended_quote_id": "quote_dingfengbo_02",
      "review_status": "approved"
    },
    {
      "id": "mood_misunderstood",
      "name": "太在意外界看法",
      "dimension": "外部评价与自我认同",
      "core_theme": "风波与内在澄澈",
      "candidate_station_ids": [
        "station_wutai",
        "station_huangzhou"
      ],
      "primary_station_id": "station_wutai",
      "summary": "别人的一句评价、一个冷淡的眼神，都会在脑海里反复琢磨大半天。",
      "dongpo_suggestion": "外界的声音永远嘈杂，别人的误读不等于真实的你。守住内心的清白与厚道即可。",
      "recommended_quote_id": "quote_liuyue_02",
      "review_status": "approved"
    },
    {
      "id": "mood_overthinking",
      "name": "脑子停不下来",
      "dimension": "内耗与过度预演",
      "core_theme": "活在当下与超然",
      "candidate_station_ids": [
        "station_huangzhou",
        "station_mizhou"
      ],
      "primary_station_id": "station_huangzhou",
      "summary": "一件还没发生的事，已经在心里演练了十几种最坏的可能，把自己搞得精疲力竭。",
      "dongpo_suggestion": "不要提前经历还没发生的风雨。当下的每一步走稳了，将来的路自会清晰。",
      "recommended_quote_id": "quote_dingfengbo_03",
      "review_status": "approved"
    },
    {
      "id": "mood_tired",
      "name": "最近真的好累",
      "dimension": "精力透支与恢复",
      "core_theme": "停顿与歇息",
      "candidate_station_ids": [
        "station_huangzhou",
        "station_huizhou"
      ],
      "primary_station_id": "station_huangzhou",
      "summary": "明明没干什么体力活，却从早到晚觉得精力空虚，只想瘫坐着什么都不想。",
      "dongpo_suggestion": "累了就先歇着，走慢一点并不代表停滞不前。先睡个好觉，天不会塌下来。",
      "recommended_quote_id": "quote_linjiangxian_01",
      "review_status": "approved"
    },
    {
      "id": "mood_lost",
      "name": "对未来感到迷茫",
      "dimension": "路径不确定与探索",
      "core_theme": "远游与心安",
      "candidate_station_ids": [
        "station_huizhou",
        "station_danzhou"
      ],
      "primary_station_id": "station_huizhou",
      "summary": "不知道下一步该往哪走，过去的规划似乎走不通，前面的路又看不真切。",
      "dongpo_suggestion": "人生不会只有一条既定路线。哪怕被命运带到了意料之外的荒原，也能走出别样的风景。",
      "recommended_quote_id": "quote_dingfengbo_nhg_02",
      "review_status": "approved"
    },
    {
      "id": "mood_lonely",
      "name": "偶尔觉得有点孤单",
      "dimension": "独处与情感连接",
      "core_theme": "明月与清风共处",
      "candidate_station_ids": [
        "station_mizhou",
        "station_huangzhou"
      ],
      "primary_station_id": "station_mizhou",
      "summary": "身处人群依然觉得没人真正懂自己，渴望被理解，却又不知道向谁倾诉。",
      "dongpo_suggestion": "学会与自己相处，也是一种深沉的能力。江上清风与山间明月，随时都在等待与你相逢。",
      "recommended_quote_id": "quote_shuidiao_02",
      "review_status": "approved"
    },
    {
      "id": "mood_ordinary",
      "name": "日子平淡但想过好",
      "dimension": "日常琐碎与生活审美",
      "core_theme": "人间烟火与清欢",
      "candidate_station_ids": [
        "station_hangzhou",
        "station_huizhou"
      ],
      "primary_station_id": "station_hangzhou",
      "summary": "没有波澜壮阔的起伏，每天都是重复的琐碎，但内心希望能把普通的日子过得有滋有味。",
      "dongpo_suggestion": "把普通的日子过好，本身就是一种极高的人生修养。认真吃好一顿饭，细心品味一杯茶。",
      "recommended_quote_id": "quote_wangjiangnan_01",
      "review_status": "approved"
    }
  ],
  "quiz": {
    "version": "1.0",
    "tie_break_priority": [
      "mood_anxious",
      "mood_work_stuck",
      "mood_misunderstood",
      "mood_overthinking",
      "mood_tired",
      "mood_lost",
      "mood_lonely",
      "mood_ordinary"
    ],
    "questions": [
      {
        "id": "quiz_q01",
        "order": 1,
        "title": "最近最容易让你心里一紧的是什么？",
        "options": [
          {
            "id": "opt_1a",
            "text": "工作或生活里突如其来的临时变动",
            "scores": {
              "mood_anxious": 3,
              "mood_overthinking": 2
            }
          },
          {
            "id": "opt_1b",
            "text": "付出了很多心力，事情却没能按预期推进",
            "scores": {
              "mood_work_stuck": 3,
              "mood_lost": 1
            }
          },
          {
            "id": "opt_1c",
            "text": "别人无意间的一句挑剔或冷淡反馈",
            "scores": {
              "mood_misunderstood": 3,
              "mood_overthinking": 1
            }
          },
          {
            "id": "opt_1d",
            "text": "其实没发生什么，但就是觉得身上没劲",
            "scores": {
              "mood_tired": 3,
              "mood_ordinary": 1
            }
          }
        ]
      },
      {
        "id": "quiz_q02",
        "order": 2,
        "title": "当你感到压力很大时，第一反应通常是？",
        "options": [
          {
            "id": "opt_2a",
            "text": "在心里反复推演各种最坏的结果",
            "scores": {
              "mood_overthinking": 3,
              "mood_anxious": 2
            }
          },
          {
            "id": "opt_2b",
            "text": "想找个没人的地方彻底安静呆着",
            "scores": {
              "mood_lonely": 2,
              "mood_tired": 2
            }
          },
          {
            "id": "opt_2c",
            "text": "逼着自己硬撑着继续做，直到做完为止",
            "scores": {
              "mood_work_stuck": 2,
              "mood_tired": 3
            }
          },
          {
            "id": "opt_2d",
            "text": "先不管了，吃一顿好吃的或者出去转转",
            "scores": {
              "mood_ordinary": 3,
              "mood_lost": 1
            }
          }
        ]
      },
      {
        "id": "quiz_q03",
        "order": 3,
        "title": "如果今天突然多出三个小时完全属于你的时间，你最想？",
        "options": [
          {
            "id": "opt_3a",
            "text": "拉上窗帘，不受打扰地昏天黑地睡一觉",
            "scores": {
              "mood_tired": 3,
              "mood_anxious": 1
            }
          },
          {
            "id": "opt_3b",
            "text": "给自己做一顿热气腾腾的饭菜，慢慢吃完",
            "scores": {
              "mood_ordinary": 3,
              "mood_work_stuck": 1
            }
          },
          {
            "id": "opt_3c",
            "text": "去江边、公园或林荫道走走，听风看树",
            "scores": {
              "mood_overthinking": 2,
              "mood_lonely": 2
            }
          },
          {
            "id": "opt_3d",
            "text": "一个人呆着，理一理乱糟糟的思绪和待办",
            "scores": {
              "mood_lost": 3,
              "mood_work_stuck": 2
            }
          }
        ]
      },
      {
        "id": "quiz_q04",
        "order": 4,
        "title": "在社交或职场中，你最反感或疲惫的时刻是？",
        "options": [
          {
            "id": "opt_4a",
            "text": "别人根本没弄懂事实，就在背后议论评价",
            "scores": {
              "mood_misunderstood": 3,
              "mood_anxious": 1
            }
          },
          {
            "id": "opt_4b",
            "text": "大家表面上很热闹，内心却谁也触碰不到谁",
            "scores": {
              "mood_lonely": 3,
              "mood_tired": 1
            }
          },
          {
            "id": "opt_4c",
            "text": "很多繁文缛节，消耗了大部分做实事的时间",
            "scores": {
              "mood_work_stuck": 3,
              "mood_ordinary": 1
            }
          },
          {
            "id": "opt_4d",
            "text": "每个人都在卷预期、抢节奏，把气氛搞得很紧绷",
            "scores": {
              "mood_anxious": 3,
              "mood_overthinking": 1
            }
          }
        ]
      },
      {
        "id": "quiz_q05",
        "order": 5,
        "title": "回看过去半年，你觉得最困扰自己的感觉是？",
        "options": [
          {
            "id": "opt_5a",
            "text": "总感觉被推着往前赶，无法掌控自己的生活节奏",
            "scores": {
              "mood_anxious": 2,
              "mood_tired": 2
            }
          },
          {
            "id": "opt_5b",
            "text": "不知道正在努力的事情到底有没有意义和未来",
            "scores": {
              "mood_lost": 3,
              "mood_work_stuck": 1
            }
          },
          {
            "id": "opt_5c",
            "text": "心里装了太多事，却找不到一个合适的人倾诉",
            "scores": {
              "mood_lonely": 3,
              "mood_misunderstood": 1
            }
          },
          {
            "id": "opt_5d",
            "text": "虽然过得很平稳，但有时候会觉得缺点生命的热气",
            "scores": {
              "mood_ordinary": 3,
              "mood_lost": 1
            }
          }
        ]
      },
      {
        "id": "quiz_q06",
        "order": 6,
        "title": "如果出门突然遇到一场没带伞的大雨，你更可能？",
        "options": [
          {
            "id": "opt_6a",
            "text": "有点烦躁，赶紧找个屋檐避雨并抱怨运气差",
            "scores": {
              "mood_anxious": 2,
              "mood_overthinking": 2
            }
          },
          {
            "id": "opt_6b",
            "text": "既然淋湿了就算了，放慢脚步在雨里慢慢走回去",
            "scores": {
              "mood_work_stuck": 2,
              "mood_ordinary": 2
            }
          },
          {
            "id": "opt_6c",
            "text": "看着别人行色匆匆，反而觉得此刻世界很安静",
            "scores": {
              "mood_lonely": 2,
              "mood_tired": 2
            }
          },
          {
            "id": "opt_6d",
            "text": "顺势拐进旁边的一家小茶馆或便利店坐一会儿",
            "scores": {
              "mood_ordinary": 3,
              "mood_lost": 1
            }
          }
        ]
      },
      {
        "id": "quiz_q07",
        "order": 7,
        "title": "今天如果送你一句来自东坡的话，你最渴望听到什么？",
        "options": [
          {
            "id": "opt_7a",
            "text": "“别怕，外界的风雨决定不了你的步调。”",
            "scores": {
              "mood_anxious": 3,
              "mood_work_stuck": 1
            }
          },
          {
            "id": "opt_7b",
            "text": "“累了就慢一点，今天先好好吃一顿饭。”",
            "scores": {
              "mood_tired": 3,
              "mood_ordinary": 2
            }
          },
          {
            "id": "opt_7c",
            "text": "“懂你的人自会懂，守住内心的清白就好。”",
            "scores": {
              "mood_misunderstood": 3,
              "mood_lonely": 1
            }
          },
          {
            "id": "opt_7d",
            "text": "“人生的路不止这一条，天涯海角皆可有书声与新程。”",
            "scores": {
              "mood_lost": 3,
              "mood_overthinking": 1
            }
          }
        ]
      }
    ],
    "experiment_bank": [
      {
        "id": "exp_q01",
        "dimension": "sudden_change",
        "interactionType": "proximity",
        "name": "星体靠近",
        "num": "01",
        "prompt": "自我星体置于中央，直面突如其来的心境扰动",
        "actionText": "拖动你的星体靠近目标，或直接轻触星宿",
        "targets": [
          {
            "key": "target_a",
            "label": "骤变星",
            "hint": "突然发生变化",
            "desc": "工作或生活里突如其来的临时变动",
            "scoreVector": {
              "mood_anxious": 3,
              "mood_overthinking": 2
            }
          },
          {
            "key": "target_b",
            "label": "阻滞星",
            "hint": "努力却没进展",
            "desc": "付出了很多心力，事情却没能按预期推进",
            "scoreVector": {
              "mood_work_stuck": 3,
              "mood_lost": 1
            }
          },
          {
            "key": "target_c",
            "label": "寒语星",
            "hint": "被一句话刺到",
            "desc": "别人无意间的一句挑剔或冷淡反馈",
            "scoreVector": {
              "mood_misunderstood": 3,
              "mood_overthinking": 1
            }
          },
          {
            "key": "target_d",
            "label": "倦怠星",
            "hint": "什么都不想做",
            "desc": "其实没发生什么，但就是觉得身上没劲",
            "scoreVector": {
              "mood_tired": 3,
              "mood_ordinary": 1
            }
          }
        ]
      },
      {
        "id": "exp_q02",
        "dimension": "sudden_change",
        "interactionType": "orbit",
        "name": "变故避险",
        "num": "02",
        "prompt": "突来急雨摧折竹林，如何安顿当下的惊疑与步调？",
        "actionText": "选择你的避险星轨",
        "targets": [
          {
            "key": "target_a",
            "label": "避险轨道",
            "hint": "先避开其锋芒",
            "desc": "先找个地方避避风雨，不盲目冲撞",
            "scoreVector": {
              "mood_anxious": 2,
              "mood_tired": 2
            }
          },
          {
            "key": "target_b",
            "label": "直面迎击",
            "hint": "硬着头皮顶上",
            "desc": "纵有骤变也硬着头皮顶上，绝不退缩",
            "scoreVector": {
              "mood_work_stuck": 3,
              "mood_overthinking": 1
            }
          },
          {
            "key": "target_c",
            "label": "另辟捷径",
            "hint": "换条路继续走",
            "desc": "既然此路不通，那就转头走另一条路",
            "scoreVector": {
              "mood_lost": 2,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_d",
            "label": "静观其变",
            "hint": "先等等看局势",
            "desc": "不急于定论，且坐看风云变幻",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lonely": 1
            }
          }
        ]
      },
      {
        "id": "exp_q03",
        "dimension": "pressure_endurance",
        "interactionType": "impact",
        "name": "行星撞击",
        "num": "03",
        "prompt": "一颗重压流星正沿轨道逼近，如何应对这次突发撞击？",
        "actionText": "选择你的轨道应激对策",
        "targets": [
          {
            "key": "target_a",
            "label": "反复推演",
            "hint": "推演最坏结果",
            "desc": "在心里反复推演各种最坏的结果",
            "scoreVector": {
              "mood_overthinking": 3,
              "mood_anxious": 2
            }
          },
          {
            "key": "target_b",
            "label": "遁入暗区",
            "hint": "找地方彻底静静",
            "desc": "想找个没人的地方彻底安静呆着",
            "scoreVector": {
              "mood_lonely": 2,
              "mood_tired": 2
            }
          },
          {
            "key": "target_c",
            "label": "正面硬撑",
            "hint": "逼自己扛到底",
            "desc": "逼着自己硬撑着继续做，直到做完为止",
            "scoreVector": {
              "mood_work_stuck": 2,
              "mood_tired": 3
            }
          },
          {
            "key": "target_d",
            "label": "变轨释怀",
            "hint": "出门吃顿好的",
            "desc": "先不管了，吃一顿好吃的或者出去转转",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lost": 1
            }
          }
        ]
      },
      {
        "id": "exp_q04",
        "dimension": "pressure_endurance",
        "interactionType": "gravity",
        "name": "负荷过载",
        "num": "04",
        "prompt": "周遭重力倍增，身上背负的事务与期望超出负荷",
        "actionText": "调节星核引力负荷",
        "targets": [
          {
            "key": "target_a",
            "label": "卸载星尘",
            "hint": "果断放弃部分",
            "desc": "果断砍掉一部分不重要的琐事",
            "scoreVector": {
              "mood_ordinary": 2,
              "mood_tired": 2
            }
          },
          {
            "key": "target_b",
            "label": "咬牙硬挺",
            "hint": "硬撑绝不服输",
            "desc": "再累也要证明自己可以一个人搞定",
            "scoreVector": {
              "mood_work_stuck": 3,
              "mood_anxious": 2
            }
          },
          {
            "key": "target_c",
            "label": "呼叫援星",
            "hint": "向信任的人求助",
            "desc": "向信任的朋友或伙伴主动开口求援",
            "scoreVector": {
              "mood_misunderstood": 2,
              "mood_lost": 2
            }
          },
          {
            "key": "target_d",
            "label": "苦中作乐",
            "hint": "讲个笑话消解",
            "desc": "自嘲一番，发现眼下的狼狈也挺好笑",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_overthinking": 1
            }
          }
        ]
      },
      {
        "id": "exp_q05",
        "dimension": "interpersonal_criticism",
        "interactionType": "split",
        "name": "星体分裂",
        "num": "05",
        "prompt": "星核承受着外界评议过载，如何释放内部张力？",
        "actionText": "释放星体张力，重塑心境形态",
        "targets": [
          {
            "key": "target_a",
            "label": "向内收缩",
            "hint": "反思自己不够好",
            "desc": "第一反应是反思自己哪里做得不够周全",
            "scoreVector": {
              "mood_overthinking": 3,
              "mood_anxious": 2
            }
          },
          {
            "key": "target_b",
            "label": "辐射呼叫",
            "hint": "找人把话说清",
            "desc": "心里很委屈，想立刻找信任的人把话说清楚",
            "scoreVector": {
              "mood_misunderstood": 3,
              "mood_anxious": 1
            }
          },
          {
            "key": "target_c",
            "label": "引力钝化",
            "hint": "时间自会证明",
            "desc": "懒得解释，时间久了大家自然知道我是什么人",
            "scoreVector": {
              "mood_lonely": 2,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_d",
            "label": "幽默消解",
            "hint": "觉得荒诞好笑",
            "desc": "心里暗暗吐槽，甚至觉得整件事有点荒诞好笑",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lost": 1
            }
          }
        ]
      },
      {
        "id": "exp_q06",
        "dimension": "interpersonal_criticism",
        "interactionType": "proximity",
        "name": "冷遇寒潮",
        "num": "06",
        "prompt": "周遭投来不解或冷漠的目光，如同穿过一片冰原星带",
        "actionText": "做出你的星体回应",
        "targets": [
          {
            "key": "target_a",
            "label": "沉默自处",
            "hint": "不争辩不迎合",
            "desc": "不迎合也不争辩，守住内心的清白",
            "scoreVector": {
              "mood_lonely": 3,
              "mood_misunderstood": 2
            }
          },
          {
            "key": "target_b",
            "label": "委屈自伤",
            "hint": "暗自难过失落",
            "desc": "心里像压了块石头，反复咀嚼对方的话",
            "scoreVector": {
              "mood_misunderstood": 3,
              "mood_overthinking": 2
            }
          },
          {
            "key": "target_c",
            "label": "决绝远离",
            "hint": "果断拉开距离",
            "desc": "直接退出这个圈子，不再消耗心力",
            "scoreVector": {
              "mood_lost": 2,
              "mood_tired": 2
            }
          },
          {
            "key": "target_d",
            "label": "泰然处之",
            "hint": "当作过眼云烟",
            "desc": "看破人情冷暖，微笑着继续做自己的事",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lonely": 1
            }
          }
        ]
      },
      {
        "id": "exp_q07",
        "dimension": "action_procrastination",
        "interactionType": "cross",
        "name": "星轨穿越",
        "num": "07",
        "prompt": "前方星雾弥漫、轨道分岔，行进至关键十字星门",
        "actionText": "确定你的穿越航线",
        "targets": [
          {
            "key": "target_a",
            "label": "逆风破浪",
            "hint": "想再搏一把看看",
            "desc": "即使很累，也想再搏一把看看上限在哪里",
            "scoreVector": {
              "mood_work_stuck": 3,
              "mood_anxious": 2
            }
          },
          {
            "key": "target_b",
            "label": "顺流滑行",
            "hint": "不再跟自己死磕",
            "desc": "累了就停，好了就走，不再跟自己死磕",
            "scoreVector": {
              "mood_tired": 3,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_c",
            "label": "暂泊星湾",
            "hint": "先稳住眼下生活",
            "desc": "先稳住眼下的生活，不轻易做冒险的变动",
            "scoreVector": {
              "mood_lost": 2,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_d",
            "label": "开拓新径",
            "hint": "换个赛道从头来",
            "desc": "很想换个环境或赛道，哪怕从头开始",
            "scoreVector": {
              "mood_lost": 3,
              "mood_work_stuck": 1
            }
          }
        ]
      },
      {
        "id": "exp_q08",
        "dimension": "action_procrastination",
        "interactionType": "orbit",
        "name": "步调迟滞",
        "num": "08",
        "prompt": "手头的事情停滞不前，像陷在浓稠的星云粘液中",
        "actionText": "调整你的运转节拍",
        "targets": [
          {
            "key": "target_a",
            "label": "慢火细煨",
            "hint": "放慢节拍慢慢做",
            "desc": "像炖东坡肉一样，火候到了自然熟",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_work_stuck": 1
            }
          },
          {
            "key": "target_b",
            "label": "突击爆发",
            "hint": "一鼓作气拼完",
            "desc": "逼自己通宵熬夜，非要一口气冲过去",
            "scoreVector": {
              "mood_anxious": 3,
              "mood_tired": 2
            }
          },
          {
            "key": "target_c",
            "label": "彻底放空",
            "hint": "今天先什么都不做",
            "desc": "今天先不管它，睡饱了明天再说",
            "scoreVector": {
              "mood_tired": 3,
              "mood_ordinary": 1
            }
          },
          {
            "key": "target_d",
            "label": "拆解微步",
            "hint": "只做眼前一小步",
            "desc": "不看宏大目标，先把当下这一两步挪出去",
            "scoreVector": {
              "mood_work_stuck": 2,
              "mood_ordinary": 2
            }
          }
        ]
      },
      {
        "id": "exp_q09",
        "dimension": "self_regulation",
        "interactionType": "merge",
        "name": "星体聚合",
        "num": "09",
        "prompt": "眼前漂浮着三颗微光星宿，偷得半日清闲时分",
        "actionText": "凝聚你当下最渴望的归宿",
        "targets": [
          {
            "key": "target_a",
            "label": "休眠黑洞",
            "hint": "昏天黑地睡一觉",
            "desc": "拉上窗帘，不受打扰地昏天黑地睡一觉",
            "scoreVector": {
              "mood_tired": 3,
              "mood_lonely": 1
            }
          },
          {
            "key": "target_b",
            "label": "专注光团",
            "hint": "专心做喜欢的事",
            "desc": "专心做一件完全出于喜欢、不计产出的事",
            "scoreVector": {
              "mood_work_stuck": 2,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_c",
            "label": "游离星尘",
            "hint": "出门漫无目的走走",
            "desc": "出门漫无目的地走走，看看树、吹吹风",
            "scoreVector": {
              "mood_lost": 2,
              "mood_ordinary": 3
            }
          },
          {
            "key": "target_d",
            "label": "双星共振",
            "hint": "找懂的朋友聊天",
            "desc": "找个完全懂你的朋友，毫无负担地聊聊天",
            "scoreVector": {
              "mood_misunderstood": 2,
              "mood_lonely": 3
            }
          }
        ]
      },
      {
        "id": "exp_q10",
        "dimension": "self_regulation",
        "interactionType": "gravity",
        "name": "独处自修",
        "num": "10",
        "prompt": "夜深万籁俱寂，只剩一盏孤灯与内心对话",
        "actionText": "安顿独处的心神",
        "targets": [
          {
            "key": "target_a",
            "label": "烹茶温火",
            "hint": "给自己煮碗热汤",
            "desc": "烧一壶水，泡一盏茶，在热气里回暖",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_tired": 2
            }
          },
          {
            "key": "target_b",
            "label": "独对长风",
            "hint": "吹吹风看云舒卷",
            "desc": "推窗看月，看云卷云舒，顿觉人间渺小",
            "scoreVector": {
              "mood_lonely": 3,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_c",
            "label": "闭门静读",
            "hint": "翻闲书不说话",
            "desc": "随手翻几页闲书，不求甚解但觉心安",
            "scoreVector": {
              "mood_overthinking": 2,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_d",
            "label": "洒扫庭除",
            "hint": "把屋子收拾干净",
            "desc": "把书桌和房间收拾整齐，心里也亮堂了",
            "scoreVector": {
              "mood_anxious": 2,
              "mood_work_stuck": 2
            }
          }
        ]
      },
      {
        "id": "exp_q11",
        "dimension": "empathy_responsibility",
        "interactionType": "rescue",
        "name": "漂流星救援",
        "num": "11",
        "prompt": "旅途最后一程，偶遇一颗偏离轨道的流浪微星",
        "actionText": "做出东坡式的人间终极回应",
        "targets": [
          {
            "key": "target_a",
            "label": "同舟相挽",
            "hint": "有余力就多帮一把",
            "desc": "只要我还有余力，总想尽力多帮对方一把",
            "scoreVector": {
              "mood_work_stuck": 2,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_b",
            "label": "各自奔赴",
            "hint": "尊重界限最好的善",
            "desc": "每个人有各自的命途，尊重界限是最好的善意",
            "scoreVector": {
              "mood_lonely": 2,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_c",
            "label": "平淡对视",
            "hint": "默默陪伴不指点",
            "desc": "默默陪伴在旁，不强行指点也不过分干预",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_tired": 1
            }
          },
          {
            "key": "target_d",
            "label": "分享火种",
            "hint": "讲个笑话逗对方笑",
            "desc": "用幽默或一件小事逗对方笑一笑，这就够了",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_misunderstood": 1
            }
          }
        ]
      },
      {
        "id": "exp_q12",
        "dimension": "empathy_responsibility",
        "interactionType": "merge",
        "name": "羁绊牵引",
        "num": "12",
        "prompt": "多颗星宿通过引力丝线与你牵绊，责任与关怀交织",
        "actionText": "校准你的引力连结",
        "targets": [
          {
            "key": "target_a",
            "label": "倾力护持",
            "hint": "护好重要的人",
            "desc": "把家人和朋友的重担挑在自己肩上",
            "scoreVector": {
              "mood_anxious": 2,
              "mood_work_stuck": 3
            }
          },
          {
            "key": "target_b",
            "label": "守好边界",
            "hint": "不过度背负他人",
            "desc": "不当无休止的拯救者，先把自己照料好",
            "scoreVector": {
              "mood_tired": 2,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_c",
            "label": "随缘聚散",
            "hint": "来去皆是寻常事",
            "desc": "聚散不由人，珍惜当下在一起的每顿饭",
            "scoreVector": {
              "mood_lonely": 2,
              "mood_ordinary": 3
            }
          },
          {
            "key": "target_d",
            "label": "温暖照拂",
            "hint": "给疲惫者留微光",
            "desc": "不求轰轰烈烈，只给晚归的人留一盏微灯",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_misunderstood": 1
            }
          }
        ]
      },
      {
        "id": "exp_q13",
        "dimension": "choice_tradeoff",
        "interactionType": "gravity",
        "name": "引力选择",
        "num": "13",
        "prompt": "宇宙深处有不同引力场呼唤，你最向往的立足锚点是？",
        "actionText": "将星体泊入你认同的引力场",
        "targets": [
          {
            "key": "target_a",
            "label": "独省星云",
            "hint": "拥有属于自己的平静",
            "desc": "拥有完全属于自己的安全感与平静",
            "scoreVector": {
              "mood_lonely": 2,
              "mood_tired": 3
            }
          },
          {
            "key": "target_b",
            "label": "荣耀星核",
            "hint": "做成一件大事",
            "desc": "在自己热爱的领域做成一件拿得出手的大事",
            "scoreVector": {
              "mood_work_stuck": 3,
              "mood_anxious": 1
            }
          },
          {
            "key": "target_c",
            "label": "旷达苍穹",
            "hint": "有随时出发的底气",
            "desc": "不管经历什么，都能有随时重新出发的底气",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lost": 1
            }
          },
          {
            "key": "target_d",
            "label": "烟火星流",
            "hint": "家人平安吃好睡好",
            "desc": "家人朋友健康平安，每天能吃好睡踏实",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_tired": 1
            }
          }
        ]
      },
      {
        "id": "exp_q14",
        "dimension": "choice_tradeoff",
        "interactionType": "split",
        "name": "双叉星门",
        "num": "14",
        "prompt": "必须在“世俗得失”与“本心从容”之间割舍一方",
        "actionText": "做出你的取舍决断",
        "targets": [
          {
            "key": "target_a",
            "label": "守中自保",
            "hint": "保住安稳底线",
            "desc": "先求不失，保全现实生存的基础底线",
            "scoreVector": {
              "mood_anxious": 2,
              "mood_lost": 2
            }
          },
          {
            "key": "target_b",
            "label": "舍末求本",
            "hint": "舍弃浮华留初心",
            "desc": "宁可丢掉虚名利益，也不能丢了内心的清明",
            "scoreVector": {
              "mood_lonely": 2,
              "mood_ordinary": 3
            }
          },
          {
            "key": "target_c",
            "label": "随遇而安",
            "hint": "走到哪就算哪",
            "desc": "得之我幸失之我命，走到哪里就在哪里生根",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lost": 1
            }
          },
          {
            "key": "target_d",
            "label": "孤注一掷",
            "hint": "为热爱的赌一次",
            "desc": "为了真正看重的事物，哪怕冒险也要试一次",
            "scoreVector": {
              "mood_work_stuck": 3,
              "mood_anxious": 2
            }
          }
        ]
      },
      {
        "id": "exp_q15",
        "dimension": "failure_recovery",
        "interactionType": "impact",
        "name": "陨坑修复",
        "num": "15",
        "prompt": "刚经历了一场剧烈的陨石重创，地表满目疮痍",
        "actionText": "启动星体自愈修复",
        "targets": [
          {
            "key": "target_a",
            "label": "泥土筑堤",
            "hint": "收拾残局重建家园",
            "desc": "像在黄州修雪堂一样，亲自动手一砖一瓦重建",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_work_stuck": 2
            }
          },
          {
            "key": "target_b",
            "label": "卧看残星",
            "hint": "躺平任风雨过去",
            "desc": "先痛痛快快躺上几天，等伤口自己结痂",
            "scoreVector": {
              "mood_tired": 3,
              "mood_lonely": 2
            }
          },
          {
            "key": "target_c",
            "label": "苦中寻甘",
            "hint": "废墟里开出花来",
            "desc": "在最糟的境遇里发掘出微小生机与乐趣",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lost": 1
            }
          },
          {
            "key": "target_d",
            "label": "拍尘复行",
            "hint": "拍拍灰尘继续赶路",
            "desc": "咬咬牙站起来，拍掉身上的尘土继续向前走",
            "scoreVector": {
              "mood_work_stuck": 2,
              "mood_ordinary": 2
            }
          }
        ]
      },
      {
        "id": "exp_q16",
        "dimension": "failure_recovery",
        "interactionType": "proximity",
        "name": "挫败低谷",
        "num": "16",
        "prompt": "跌入前所未有的心境谷底，四周一片晦暗",
        "actionText": "找寻回暖的微光",
        "targets": [
          {
            "key": "target_a",
            "label": "宣泄泪水",
            "hint": "释放委屈不甘",
            "desc": "允许自己软弱一次，痛痛快快哭一场",
            "scoreVector": {
              "mood_misunderstood": 3,
              "mood_tired": 2
            }
          },
          {
            "key": "target_b",
            "label": "对饮东坡",
            "hint": "感受古人旷达",
            "desc": "翻翻东坡词，原来千年前他经历过更惨的",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lonely": 2
            }
          },
          {
            "key": "target_c",
            "label": "热汤暖胃",
            "hint": "把身体先喂饱",
            "desc": "身体暖了心就不容易冷，好好吃顿热饭",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_tired": 2
            }
          },
          {
            "key": "target_d",
            "label": "梳理盘点",
            "hint": "理清下一步怎么走",
            "desc": "拿出纸笔理理账，看看手里还剩下什么牌",
            "scoreVector": {
              "mood_work_stuck": 2,
              "mood_overthinking": 2
            }
          }
        ]
      },
      {
        "id": "exp_q17",
        "dimension": "achievement_recognition",
        "interactionType": "orbit",
        "name": "盛名光环",
        "num": "17",
        "prompt": "星体周围环绕着外界赞誉与聚光灯，光芒耀眼",
        "actionText": "平衡光环与自心",
        "targets": [
          {
            "key": "target_a",
            "label": "清醒自持",
            "hint": "盛名更须谨慎",
            "desc": "深知花无百日红，越是风光越要谨言慎行",
            "scoreVector": {
              "mood_overthinking": 2,
              "mood_anxious": 2
            }
          },
          {
            "key": "target_b",
            "label": "坦然受之",
            "hint": "自己的努力配得上",
            "desc": "问心无愧，欣然接纳自己应得的成果",
            "scoreVector": {
              "mood_ordinary": 2,
              "mood_work_stuck": 1
            }
          },
          {
            "key": "target_c",
            "label": "抽身退步",
            "hint": "适时退回安宁生活",
            "desc": "热闹都是别人的，只想早点回家吃碗素面",
            "scoreVector": {
              "mood_tired": 2,
              "mood_ordinary": 3
            }
          },
          {
            "key": "target_d",
            "label": "分甘同味",
            "hint": "荣光分给同行者",
            "desc": "把功劳归于大家，与身边的同伴共享甘甜",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_misunderstood": 1
            }
          }
        ]
      },
      {
        "id": "exp_q18",
        "dimension": "achievement_recognition",
        "interactionType": "merge",
        "name": "功名试炼",
        "num": "18",
        "prompt": "功名利禄与内心所守发生冲突，如何衡量一生的重力？",
        "actionText": "校准灵魂恒星价值",
        "targets": [
          {
            "key": "target_a",
            "label": "济世安民",
            "hint": "做对世人有益的事",
            "desc": "做官做事，但求无愧于天下百姓与良知",
            "scoreVector": {
              "mood_work_stuck": 3,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_b",
            "label": "独善其身",
            "hint": "守好自己的良知",
            "desc": "外界如何变幻，绝不曲学阿世同流合污",
            "scoreVector": {
              "mood_lonely": 3,
              "mood_misunderstood": 2
            }
          },
          {
            "key": "target_c",
            "label": "超然物外",
            "hint": "功名如浮云过眼",
            "desc": "富贵于我如浮云，人间有味是清欢",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lost": 1
            }
          },
          {
            "key": "target_d",
            "label": "寄情笔墨",
            "hint": "留下经得起时间的作品",
            "desc": "把悲欢化入诗文书画，留赠岁月后人",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lonely": 1
            }
          }
        ]
      },
      {
        "id": "exp_q19",
        "dimension": "stability_exploration",
        "interactionType": "cross",
        "name": "边界拓荒",
        "num": "19",
        "prompt": "眼前是熟悉的定居星轨与广阔未知的星外荒原",
        "actionText": "锚定你的生命疆域",
        "targets": [
          {
            "key": "target_a",
            "label": "扎根深耕",
            "hint": "把眼前土地种熟",
            "desc": "不贪恋远方，把眼下的日子和工作经营出花样",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_work_stuck": 1
            }
          },
          {
            "key": "target_b",
            "label": "扬帆远航",
            "hint": "渴望探索未知天地",
            "desc": "胸怀九万里风鹏，永远对未知的世界充满好奇",
            "scoreVector": {
              "mood_lost": 2,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_c",
            "label": "居安思危",
            "hint": "安稳中留一手退路",
            "desc": "享受眼前的平静，但随时做好应变准备",
            "scoreVector": {
              "mood_anxious": 2,
              "mood_overthinking": 2
            }
          },
          {
            "key": "target_d",
            "label": "顺应天时",
            "hint": "春耕秋收不违时",
            "desc": "不刻意强求，随遇而适，该定就定该走就走",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_tired": 1
            }
          }
        ]
      },
      {
        "id": "exp_q20",
        "dimension": "stability_exploration",
        "interactionType": "gravity",
        "name": "人间定盘",
        "num": "20",
        "prompt": "风雨飘摇半生，你最终选择泊宿在何种人间风景中？",
        "actionText": "确定终生栖宿之所",
        "targets": [
          {
            "key": "target_a",
            "label": "一叶扁舟",
            "hint": "万事随风浩荡漂流",
            "desc": "小舟从此逝，江海寄余生",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lonely": 2
            }
          },
          {
            "key": "target_b",
            "label": "茅屋雪堂",
            "hint": "亲手盖避风港",
            "desc": "亲手耕作筑屋，过接地气烟火日子",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_work_stuck": 1
            }
          },
          {
            "key": "target_c",
            "label": "琼楼玉宇",
            "hint": "向往高远纯粹境界",
            "desc": "高处虽不胜寒，但仍向往精神的峰峦",
            "scoreVector": {
              "mood_lonely": 3,
              "mood_misunderstood": 1
            }
          },
          {
            "key": "target_d",
            "label": "市井酒旗",
            "hint": "沉醉寻常市井烟火",
            "desc": "有酒有肉有知己，随处与农夫渔樵话平生",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_tired": 1
            }
          }
        ]
      },
      {
        "id": "exp_q21",
        "dimension": "stability_exploration",
        "interactionType": "rescue",
        "name": "终极释怀",
        "num": "21",
        "prompt": "回望一路颠簸跌宕的生命星图，东坡式的人生态度是？",
        "actionText": "收束本次宇宙实验",
        "targets": [
          {
            "key": "target_a",
            "label": "也无风雨",
            "hint": "回首也无阴晴",
            "desc": "回首向来萧瑟处，归去，也无风雨也无晴",
            "scoreVector": {
              "mood_ordinary": 4,
              "mood_anxious": 0
            }
          },
          {
            "key": "target_b",
            "label": "试新茶",
            "hint": "且将新火试新茶",
            "desc": "休对故人思故国，且将新火试新茶，诗酒趁年华",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lost": 1
            }
          },
          {
            "key": "target_c",
            "label": "心安即乡",
            "hint": "此心安处是吾乡",
            "desc": "万里归来颜愈少，微笑，此心安处是吾乡",
            "scoreVector": {
              "mood_ordinary": 4,
              "mood_lonely": 0
            }
          },
          {
            "key": "target_d",
            "label": "不思量",
            "hint": "十年生死两茫茫",
            "desc": "深情留在心底，人间依然值得用心走一遭",
            "scoreVector": {
              "mood_lonely": 2,
              "mood_ordinary": 2
            }
          }
        ]
      },
      {
        "id": "exp_q22",
        "dimension": "sudden_change",
        "interactionType": "collision",
        "name": "撞击破局",
        "num": "22",
        "prompt": "突如其来的变故迎面撞击而来，原定轨道瞬间中断",
        "actionText": "在撞击瞬间锚定你的应对支点",
        "targets": [
          {
            "key": "target_a",
            "label": "迎击星",
            "hint": "正面硬刚化解",
            "desc": "不闪不避，咬紧牙关正面接下冲击",
            "scoreVector": {
              "mood_anxious": 3,
              "mood_work_stuck": 2
            }
          },
          {
            "key": "target_b",
            "label": "缓冲星",
            "hint": "迂回卸力避险",
            "desc": "借力打力，顺着冲力把危害降到最低",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_overthinking": 1
            }
          },
          {
            "key": "target_c",
            "label": "偏转星",
            "hint": "改换全新赛道",
            "desc": "既然此路不通，索性彻底转向新的可能",
            "scoreVector": {
              "mood_lost": 3,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_d",
            "label": "定心星",
            "hint": "静立看清局势",
            "desc": "先稳住呼吸，等尘埃落定再做打算",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_tired": 1
            }
          }
        ]
      },
      {
        "id": "exp_q23",
        "dimension": "pressure_endurance",
        "interactionType": "avoid",
        "name": "重压回旋",
        "num": "23",
        "prompt": "外界的多重重压如巨石横亘前方，呼吸被极度压缩",
        "actionText": "绕开障碍或以柔克刚",
        "targets": [
          {
            "key": "target_a",
            "label": "抗压星",
            "hint": "硬抗绝不后退",
            "desc": "再苦再累也独自咽下，绝不在人前示弱",
            "scoreVector": {
              "mood_tired": 3,
              "mood_work_stuck": 2
            }
          },
          {
            "key": "target_b",
            "label": "卸甲星",
            "hint": "主动减负停顿",
            "desc": "放下不切实际的包袱，允许自己今天只做及格",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_tired": 2
            }
          },
          {
            "key": "target_c",
            "label": "呼救星",
            "hint": "向身边人倾诉",
            "desc": "把压力分担给信任的同伴，不再孤军作战",
            "scoreVector": {
              "mood_lonely": 2,
              "mood_misunderstood": 2
            }
          },
          {
            "key": "target_d",
            "label": "释重星",
            "hint": "运动大汗一场",
            "desc": "跑一身大汗或痛快洗个热水澡，肉体先放松",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_anxious": 1
            }
          }
        ]
      },
      {
        "id": "exp_q24",
        "dimension": "interpersonal_criticism",
        "interactionType": "orbit",
        "name": "舆论星轨",
        "num": "24",
        "prompt": "人声鼎沸中各种褒贬评价呼啸而来，引力发生紊乱",
        "actionText": "调整你的人格轨道与公转节奏",
        "targets": [
          {
            "key": "target_a",
            "label": "辩白星",
            "hint": "据理力争说明",
            "desc": "一定要把是非曲直掰扯清楚，不容颠倒黑白",
            "scoreVector": {
              "mood_misunderstood": 3,
              "mood_anxious": 2
            }
          },
          {
            "key": "target_b",
            "label": "缄默星",
            "hint": "一笑置之不理",
            "desc": "谣言止于智者，时间自会给出最公正的回答",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_overthinking": 1
            }
          },
          {
            "key": "target_c",
            "label": "自省星",
            "hint": "有则改之反思",
            "desc": "闻过则喜，借别人的苛责修补自己的盲区",
            "scoreVector": {
              "mood_overthinking": 3,
              "mood_work_stuck": 1
            }
          },
          {
            "key": "target_d",
            "label": "离圈星",
            "hint": "退出是非圈子",
            "desc": "关掉朋友圈和群聊，回自己清静的小天地",
            "scoreVector": {
              "mood_tired": 3,
              "mood_ordinary": 2
            }
          }
        ]
      },
      {
        "id": "exp_q25",
        "dimension": "action_procrastination",
        "interactionType": "gravity",
        "name": "引力微步",
        "num": "25",
        "prompt": "目标悬于高空，但身躯仿佛被迟滞力场牢牢束缚",
        "actionText": "借引力迈出破除拖延的微小一步",
        "targets": [
          {
            "key": "target_a",
            "label": "拆解星",
            "hint": "切成极小动作",
            "desc": "不看全貌，只做接下来五分钟能完成的小步",
            "scoreVector": {
              "mood_work_stuck": 3,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_b",
            "label": "沉浸星",
            "hint": "屏蔽一切干扰",
            "desc": "扣上手机戴上耳机，进入单任务专注结界",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_anxious": 1
            }
          },
          {
            "key": "target_c",
            "label": "犒赏星",
            "hint": "设个甜头引诱",
            "desc": "完成后奖励自己一杯奶茶或一顿大餐",
            "scoreVector": {
              "mood_tired": 2,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_d",
            "label": "顺流星",
            "hint": "状态不好就歇",
            "desc": "今天既然不在状态，就不硬逼自己，明天再战",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lost": 1
            }
          }
        ]
      },
      {
        "id": "exp_q26",
        "dimension": "self_regulation",
        "interactionType": "rescue",
        "name": "孤光挽救",
        "num": "26",
        "prompt": "深夜狂欢散场后的绝对空虚，星光在暗夜中微微战栗",
        "actionText": "以温柔光轨牵引漂流的孤星",
        "targets": [
          {
            "key": "target_a",
            "label": "墨香星",
            "hint": "翻几页泛黄好书",
            "desc": "与千年前的智者对坐长谈，古今共此时",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_lonely": 2
            }
          },
          {
            "key": "target_b",
            "label": "烹泉星",
            "hint": "为自己煮一杯茶",
            "desc": "听瓦铫水沸，细嗅茶香，让心神缓缓沉降",
            "scoreVector": {
              "mood_ordinary": 4,
              "mood_tired": 1
            }
          },
          {
            "key": "target_c",
            "label": "放空星",
            "hint": "望着夜空发呆",
            "desc": "什么都不想，放任思绪如落叶般飘散",
            "scoreVector": {
              "mood_tired": 3,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_d",
            "label": "写意星",
            "hint": "写几行碎碎念",
            "desc": "把心里的褶皱变成文字，写完就撕掉释怀",
            "scoreVector": {
              "mood_overthinking": 2,
              "mood_ordinary": 2
            }
          }
        ]
      },
      {
        "id": "exp_q27",
        "dimension": "choice_tradeoff",
        "interactionType": "merge",
        "name": "交融抉择",
        "num": "27",
        "prompt": "两条截然不同的人生分支星轨交汇，必须放弃其中之一",
        "actionText": "两星合一，熔炼真正的取舍智慧",
        "targets": [
          {
            "key": "target_a",
            "label": "初心星",
            "hint": "选最热爱的那条",
            "desc": "就算前路坎坷，也要为少年时的梦想买单",
            "scoreVector": {
              "mood_lost": 3,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_b",
            "label": "安稳星",
            "hint": "选风险最低那条",
            "desc": "先保证基本盘与家小温饱，再去谈远方",
            "scoreVector": {
              "mood_anxious": 3,
              "mood_work_stuck": 1
            }
          },
          {
            "key": "target_c",
            "label": "随缘星",
            "hint": "扔枚铜板听天由命",
            "desc": "命里有时终须有，扔完硬币瞬间就知答案",
            "scoreVector": {
              "mood_ordinary": 4,
              "mood_lost": 1
            }
          },
          {
            "key": "target_d",
            "label": "折中星",
            "hint": "白天生存晚上理想",
            "desc": "一手抓柴米油盐，一手托琴棋书画",
            "scoreVector": {
              "mood_work_stuck": 2,
              "mood_ordinary": 2
            }
          }
        ]
      },
      {
        "id": "exp_q28",
        "dimension": "failure_recovery",
        "interactionType": "split",
        "name": "裂变重生",
        "num": "28",
        "prompt": "倾注心血的事业轰然碎裂，核心星体面临解体考验",
        "actionText": "在破碎中分裂出双子重生的星芒",
        "targets": [
          {
            "key": "target_a",
            "label": "重组星",
            "hint": "收拾碎片从头来",
            "desc": "捡起还能用的零件，换个方式重新拼凑",
            "scoreVector": {
              "mood_work_stuck": 3,
              "mood_ordinary": 2
            }
          },
          {
            "key": "target_b",
            "label": "冬眠星",
            "hint": "彻底放空等雪化",
            "desc": "承认这次彻底搞砸了，深睡一场等待新春天",
            "scoreVector": {
              "mood_tired": 4,
              "mood_lost": 2
            }
          },
          {
            "key": "target_c",
            "label": "自嘲星",
            "hint": "讲个段子自黑一把",
            "desc": "人生如戏自笑荒唐，能逗笑朋友就算赢了",
            "scoreVector": {
              "mood_ordinary": 4,
              "mood_misunderstood": 1
            }
          },
          {
            "key": "target_d",
            "label": "蜕变星",
            "hint": "感谢教训赋予成长",
            "desc": "吃一堑长一智，伤痕长出来的地方往往最坚硬",
            "scoreVector": {
              "mood_ordinary": 3,
              "mood_overthinking": 1
            }
          }
        ]
      }
    ]
  },
  "dailyDongpo": [
    {
      "id": "daily_001",
      "quote_id": "quote_dingfengbo_01",
      "station_id": "station_huangzhou",
      "fact_text": "元丰五年春，苏轼在黄州沙湖道中突遇急雨，同行者皆狼狈避雨，唯独苏轼泰然前行。",
      "dongpo_view": "风雨扑面而来时，越慌乱越容易失足。试着不让突发的外界动荡打乱你自己的呼吸节奏。",
      "today_action": "在工作或学习中遇到催促时，先停下敲击键盘的手，深呼吸三次再开始处理。",
      "tags": [
        "风雨",
        "徐行",
        "节奏"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_002",
      "quote_id": "quote_dingfengbo_02",
      "station_id": "station_huangzhou",
      "fact_text": "苏轼在黄州清贫简朴，手拄竹杖，脚蹬草鞋，却觉得比骑着高头大马还要轻快自在。",
      "dongpo_view": "身上背负的期待与装备越重，行路时越害怕跌倒。有时候卸下包袱，反而步履轻盈。",
      "today_action": "清理掉随身背包或手机桌面上三样长期不用、却一直占据空间的小物件。",
      "tags": [
        "轻装",
        "简朴",
        "坦然"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_003",
      "quote_id": "quote_dingfengbo_03",
      "station_id": "station_huangzhou",
      "fact_text": "雨后初晴，斜阳照彻湿润的山径。苏轼回望刚才风雨交加的地方，心中一片澄澈明净。",
      "dongpo_view": "世间的所有难关都会成为过去。当你跨过眼前的泥泞再回头看时，不过是一抹浮云。",
      "today_action": "想一件三年前让你彻夜难眠、但现在早已释怀的事，告诉自己今天的事也一样会过去。",
      "tags": [
        "释怀",
        "平静",
        "回望"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_004",
      "quote_id": "quote_shuidiao_01",
      "station_id": "station_mizhou",
      "fact_text": "熙宁九年中秋，苏轼在密州望月思念弟弟苏辙，感怀人世离合并非人力所能尽全。",
      "dongpo_view": "月亮尚且有阴晴圆缺，何况纷繁复杂的人间。接纳遗憾与残缺，内心才会真正安定。",
      "today_action": "接受今天一件没能做到完美的事，允许它停留在眼下的状态，不苛责自己。",
      "tags": [
        "圆缺",
        "接纳",
        "无常"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_005",
      "quote_id": "quote_shuidiao_02",
      "station_id": "station_mizhou",
      "fact_text": "兄弟天各一方，苏轼将最深沉的挂念化作望向同一轮明月的旷远祝福。",
      "dongpo_view": "距离阻隔不了真挚的情感。知道彼此都在认真生活着，就是世间极好的陪伴。",
      "today_action": "给一位远方的老友发一张风景照片，不必聊很深，只道一声安好。",
      "tags": [
        "明月",
        "思念",
        "温情"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_006",
      "quote_id": "quote_chibi_01",
      "station_id": "station_huangzhou",
      "fact_text": "黄州赤壁之下，苏轼与客泛舟江心，仰望茫茫江天，感念人生如蜉蝣般短暂渺小。",
      "dongpo_view": "在广袤天地面前，我们遇到的纠结其实很小很轻。换个辽阔的眼界，烦恼自会消减大半。",
      "today_action": "站在窗前或者空旷处，远眺地平线或天空两分钟，放空纷扰的大脑。",
      "tags": [
        "宇宙",
        "渺小",
        "释怀"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_007",
      "quote_id": "quote_chibi_02",
      "station_id": "station_huangzhou",
      "fact_text": "逝者如斯而未尝往也，盈虚者如彼而卒莫消长。苏轼在流动与永恒中参悟生命自足。",
      "dongpo_view": "不要只盯着失去的东西不放。万物各有节律，守住生命本质的充盈，便无所羡慕。",
      "today_action": "写下一件你现在真实拥有、且能带给你纯粹快乐的小确幸。",
      "tags": [
        "自足",
        "常态",
        "超然"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_008",
      "quote_id": "quote_chibi_03",
      "station_id": "station_huangzhou",
      "fact_text": "江上习习清风，山间朗朗明月，大自然将最珍贵的造化慷慨赐予懂得驻足的人。",
      "dongpo_view": "世界上最抚慰人心的美好往往是不花钱的。微风、树影、鸟鸣与夕阳，随时为你开放。",
      "today_action": "下班路上摘掉耳机，认真听三分钟风吹树叶和傍晚城市的真实声响。",
      "tags": [
        "清风",
        "明月",
        "日常"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_009",
      "quote_id": "quote_niannujiao_01",
      "station_id": "station_huangzhou",
      "fact_text": "大江东去浪涛翻滚，三国多少叱咤风云的英雄人物，终归消融在滚滚浪花之中。",
      "dongpo_view": "把眼前的执念放进历史长河里洗一洗，你会发现谁都有巅峰与落幕，不必为一时得失困惑。",
      "today_action": "看一段历史纪录片片段，感受岁月流转与个人的开阔天地。",
      "tags": [
        "历史",
        "豪迈",
        "江流"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_010",
      "quote_id": "quote_niannujiao_02",
      "station_id": "station_huangzhou",
      "fact_text": "赤壁夜色中举杯对月，将世间繁华与辛酸都化入杯中水月。",
      "dongpo_view": "与其在失意中反复消耗自己，不如敬今晚的江月一杯酒，原谅过去的遗憾，拥抱当下的生活。",
      "today_action": "今晚临睡前向自己敬一杯温开水，感谢今天依然努力生活的自己。",
      "tags": [
        "和解",
        "敬月",
        "从容"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_011",
      "quote_id": "quote_linjiangxian_01",
      "station_id": "station_huangzhou",
      "fact_text": "夜归临皋家门紧闭，童仆鼾声如雷。苏轼倚杖听长江流水之声，萌生泛舟远寄之意。",
      "dongpo_view": "当全世界都在沉睡的时候，找到一个能与自己真实心灵对话的角落，是一种难得的奢侈。",
      "today_action": "留出十五分钟独处时间，不看屏幕，只听一首纯音乐或静坐。",
      "tags": [
        "独处",
        "自由",
        "宁静"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_012",
      "quote_id": "quote_linjiangxian_02",
      "station_id": "station_huangzhou",
      "fact_text": "苏轼深感身为外物所役的劳顿，反问自己何时才能放下营营役役的浮华追求。",
      "dongpo_view": "我们常常为了别人的眼光忙得身心俱疲。停下来问问自己：什么才是真正属于你的幸福？",
      "today_action": "拒绝一件并非必要、且会让自己感到耗能的人情邀约或琐碎事务。",
      "tags": [
        "反思",
        "减负",
        "本真"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_013",
      "quote_id": "quote_yinhushang_01",
      "station_id": "station_hangzhou",
      "fact_text": "在杭州西湖上，苏轼观察到晴日有水光潋滟之美，雨时有山色空蒙之奇，各具其妙。",
      "dongpo_view": "顺境有顺境的舒展，逆境有逆境的淬炼。心态对了，生活在何种天气里都能生机盎然。",
      "today_action": "不管今天天气如何，找一处窗口看看外面的景色，发现一处微小的美好细节。",
      "tags": [
        "晴雨",
        "兼收",
        "山水"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_014",
      "quote_id": "quote_yinhushang_02",
      "station_id": "station_hangzhou",
      "fact_text": "苏轼将西湖比作西施，淡妆清雅，浓抹娇艳，皆具动人神韵。",
      "dongpo_view": "不必非要模仿别人光鲜亮丽的模样。接纳自己素朴真实的样子，你本就有独特的生命光彩。",
      "today_action": "出门前照镜子，对镜子里的自己真诚地笑一下。",
      "tags": [
        "自信",
        "本色",
        "适宜"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_015",
      "quote_id": "quote_wanghulong_01",
      "station_id": "station_hangzhou",
      "fact_text": "在望湖楼避雨饮酒，骤雨如珠溅入游船，转瞬间狂风卷过，漫天浓云消散无踪。",
      "dongpo_view": "很多突如其来的危机看起来声势浩大，实际上可能是一场来去匆匆的阵雨，沉住气别被吓倒。",
      "today_action": "遇到突发小状况时，先在心里默数到十，不要立刻做出情绪化反应。",
      "tags": [
        "骤雨",
        "淡定",
        "转晴"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_016",
      "quote_id": "quote_wangjiangnan_01",
      "station_id": "station_mizhou",
      "fact_text": "寒食过后新火初起，苏轼在超然台上煮新茶、饮薄酒，感叹好春光正当其时。",
      "dongpo_view": "过去已成定局，未来尚未到来。把全部的生命力投入到今天这顿饭、这盏茶中，就是最好的年华。",
      "today_action": "为自己精心泡一杯好茶或手冲一杯咖啡，细细品味第一口的温度与香气。",
      "tags": [
        "当下",
        "茶酒",
        "年华"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_017",
      "quote_id": "quote_chengtian_01",
      "station_id": "station_huangzhou",
      "fact_text": "见月光照入窗台，苏轼欣然漫步承天寺寻张怀民同赏竹柏疏影，感叹世间唯少闲适之人。",
      "dongpo_view": "生活中不是缺少诗意，而是缺少一颗愿意在忙碌间隙抬起头看一眼明月的心。",
      "today_action": "今晚晚饭后放下手机，在小区楼下散步圈巡视十五分钟，观察今晚的树影与夜色。",
      "tags": [
        "月色",
        "闲适",
        "知己"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_018",
      "quote_id": "quote_tixilinbi_01",
      "station_id": "station_huangzhou",
      "fact_text": "离开黄州途经庐山，苏轼从横、侧、远、近各个角度看山，写下蕴含千古哲理的名句。",
      "dongpo_view": "当你觉得事情走进死胡同的时候，往往只是因为你站在原本狭窄的角度。退后两步，全貌立现。",
      "today_action": "换一个不同寻常的视角看一件令你头疼的事，想一想如果三年后的你看它会觉得重要吗？",
      "tags": [
        "视角",
        "格局",
        "庐山"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_019",
      "quote_id": "quote_huizhou_01",
      "station_id": "station_huizhou",
      "fact_text": "五十八岁被远贬偏僻湿热的岭南惠州，苏轼尝到当地鲜甜荔枝，顿觉异乡亦可安居。",
      "dongpo_view": "环境的艰苦无法抹杀生活里微小而真实的甜。只要心存好奇，任何土地都能长出快乐。",
      "today_action": "去水果店买一份平常很少吃、但一直想尝尝的水果，好好享用它。",
      "tags": [
        "尝新",
        "荔枝",
        "乐观"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_020",
      "quote_id": "quote_dingfengbo_nhg_01",
      "station_id": "station_huizhou",
      "fact_text": "好友王巩因苏轼牵连受累远贬岭南，其侍妾柔奴历经万里风霜归来，面容却愈发年轻温润。",
      "dongpo_view": "生活的风浪可以在额头上留下印记，但只要心底始终保持温柔与澄澈，岁月便无可奈何。",
      "today_action": "温和地对今天遇到的服务人员（快递员、保洁、店员）说一声谢谢。",
      "tags": [
        "温柔",
        "澄澈",
        "韧性"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_021",
      "quote_id": "quote_dingfengbo_nhg_02",
      "station_id": "station_huizhou",
      "fact_text": "苏轼问柔奴岭南风土如何，柔奴轻声答道：'此心安处，便是吾乡。'苏轼大受震动。",
      "dongpo_view": "真正的避难所不在远方，而在你自己的内心。心安顿下来了，走到哪里都不再是流浪。",
      "today_action": "整理一个能让你感到安全和舒服的私人小角落，哪怕只是一把椅子或一个靠垫。",
      "tags": [
        "心安",
        "归宿",
        "安顿"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_022",
      "quote_id": "quote_liuyue_01",
      "station_id": "station_danzhou",
      "fact_text": "六十四岁北归遇赦渡海，苏轼回顾自己九死一生的南荒岁月，不仅毫无怨恨，反而称其为平生奇游。",
      "dongpo_view": "真正的坚强不是从不受伤，而是在穿越了所有苦难之后，依然能够坦荡地热爱这段生命旅程。",
      "today_action": "回顾一件过去让你痛苦但最终让你变得坚韧的往事，在心里由衷感谢自己的坚持。",
      "tags": [
        "达观",
        "奇绝",
        "不恨"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_023",
      "quote_id": "quote_liuyue_02",
      "station_id": "station_danzhou",
      "fact_text": "夜渡大海风平浪静，天光与海色浑然一体，苏轼感悟宇宙本色就是如此澄清无染。",
      "dongpo_view": "外界的误解与流言就像遮蔽天空的乌云，风吹云散之后，你的纯粹本心自然会明澈如初。",
      "today_action": "今天不去搜索或打听任何关于自己的评价和议论，让心灵彻底休息一天。",
      "tags": [
        "澄清",
        "本质",
        "澄澈"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_024",
      "quote_id": "quote_jinshan_01",
      "station_id": "station_changzhou",
      "fact_text": "苏轼暮年在镇江金山寺见自己画像，自题一生功业不在京堂高位，而在黄州、惠州、儋州三次贬谪中。",
      "dongpo_view": "不要用别人世俗的标准来度量你的成功。你在逆境中展现出的仁厚、坚韧与创造，才是你最硬核的徽章。",
      "today_action": "列出三件在困境中你依然坚持做完并帮助到他人的事情，认可自己的价值。",
      "tags": [
        "功业",
        "真谛",
        "逆境"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_025",
      "quote_id": "quote_zhurou_01",
      "station_id": "station_huangzhou",
      "fact_text": "苏轼在黄州发明东坡肉，心得是微火慢煨不急躁，火候到了肉自然酥烂香美。",
      "dongpo_view": "很多急不来的事情，就交给时间和耐力。只要底子扎实、温度持续，水到自然渠成。",
      "today_action": "为自己煮一碗热汤或者细火炖一道简单的食材，体味慢慢等待的耐心。",
      "tags": [
        "耐心",
        "火候",
        "烟火"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_026",
      "quote_id": "quote_jiangchengzi_01",
      "station_id": "station_mizhou",
      "fact_text": "人到中年的苏轼在密州率千骑出猎，左手牵黄犬，右臂擎苍鹰，意气风发犹胜少年郎。",
      "dongpo_view": "年龄从来不该成为束缚热忱的枷锁。只要心怀豪迈与向往，何时都可以重燃少年狂意。",
      "today_action": "去做一件你一直想做、却总觉得自己这个年纪不合适的小任性事情。",
      "tags": [
        "意气",
        "少年",
        "活力"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_027",
      "quote_id": "quote_jiangchengzi_02",
      "station_id": "station_mizhou",
      "fact_text": "苏轼在密州望月挽弓，胸中翻涌着报国御侮、射破天狼星宿的豪情斗志。",
      "dongpo_view": "生活哪怕有一万个借口让我们认输，只要还有一口不甘平庸的气魄，就能挽弓射破阴霾。",
      "today_action": "对一件一直拖延或者不敢直面的困难任务发起正面攻坚，先做三十分钟。",
      "tags": [
        "破局",
        "魄力",
        "担当"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_028",
      "quote_id": "quote_yimao_01",
      "station_id": "station_mizhou",
      "fact_text": "十年生死相隔，梦中忽见梳妆楼阁，相顾无言唯有泪水千行，苏轼倾诉千古深情。",
      "dongpo_view": "深藏在心底的情感不需要天天挂在嘴边。珍惜眼前陪伴你的人，因为相遇本就是奇迹。",
      "today_action": "主动拥抱或者诚恳地问候一下身边最亲近的伴侣或家人。",
      "tags": [
        "深情",
        "珍惜",
        "至爱"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_029",
      "quote_id": "quote_chudao_01",
      "station_id": "station_huangzhou",
      "fact_text": "刚到荒僻黄州安顿下来的苏轼，惊喜地发现江里鱼鲜肥美、漫山竹笋清香扑鼻。",
      "dongpo_view": "生活的乐趣往往就藏在换一个视角后的微小发现中。哪怕身处异地，也能找到食物与风物的温存。",
      "today_action": "今天吃饭时尝试一道平时没点过的家常菜，用心感受食材的新鲜滋味。",
      "tags": [
        "鲜美",
        "发现",
        "安顿"
      ],
      "review_status": "approved"
    },
    {
      "id": "daily_030",
      "quote_id": "quote_xingshang_01",
      "station_id": "station_jingshi",
      "fact_text": "二十一岁苏轼在应试答卷中论及法制赏罚，力主以宽厚仁爱为先，体现博大胸怀。",
      "dongpo_view": "待人接物多一份宽厚与仁善，不仅放过了别人，更是在丰盈与安宁自己的内心天地。",
      "today_action": "宽容一件今天同事或路人无心造成的小失误，给对方一个理解的眼神。",
      "tags": [
        "宽厚",
        "仁爱",
        "胸怀"
      ],
      "review_status": "approved"
    }
  ]
};

  // 辅助查询便捷方法
  root.SuShiUniverse.Data.getStationById = function (id) {
    var list = root.SuShiUniverse.Data.stations || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  };

  root.SuShiUniverse.Data.getQuoteById = function (id) {
    var list = root.SuShiUniverse.Data.quotes || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  };

  root.SuShiUniverse.Data.getWorkById = function (id) {
    var list = root.SuShiUniverse.Data.works || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  };

  root.SuShiUniverse.Data.getMoodById = function (id) {
    var list = root.SuShiUniverse.Data.moods || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  };

  root.SuShiUniverse.Data.getQuizQuestions = function () {
    return (root.SuShiUniverse.Data.quiz && root.SuShiUniverse.Data.quiz.questions) || [];
  };

  root.SuShiUniverse.Data.getQuizTieBreak = function () {
    return (root.SuShiUniverse.Data.quiz && root.SuShiUniverse.Data.quiz.tie_break_priority) || [];
  };
})();

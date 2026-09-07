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
      "source_note": "原文见《苏轼文集·卷二》，史料参《宋史·苏轼传》及孔凡礼《苏轼年谱》。"
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
      "source_note": "原文见《东坡乐府笺》，史料参孔凡礼《苏轼年谱》。"
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
      "source_note": "原文见《东坡乐府笺》，胡仔《苕溪渔隐丛话》赞其『中秋词自东坡水调歌头一出，余词尽废』。"
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
      "source_note": "原文见《东坡乐府笺》，陈廷焯《白雨斋词话》评其『有声有泪，是一往情深』。"
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
      "source_note": "原文见《苏轼诗集·卷二十》，史料参《宋史·苏轼传》及朋九万《东坡乌台诗案》。"
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
      "source_note": "原文见《苏轼诗集·卷二十一》，史料参孔凡礼《苏轼年谱》。"
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
      "source_note": "原文见《东坡乐府笺》，小序及正文均经朱祖谋校勘。"
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
      "source_note": "原文见《苏轼文集·卷一》，元丰五年手稿真迹藏于台北故宫博物院。"
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
      "source_note": "原文见《东坡乐府笺》，胡仔《苕溪渔隐丛话》录入。"
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
      "source_note": "原文见《东坡乐府笺》，叶梦得《避暑录话》记次日黄州谣传东坡脱屣泛舟去。"
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
      "source_note": "原文见《苏轼文集·卷六十五》，后世著名的『东坡肉』烹饪理论源头。"
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
      "source_note": "原文见《苏轼诗集·卷九》，奠定西湖『西子湖』美称的奠基之作。"
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
      "source_note": "原文见《苏轼诗集·卷八》，纪晓岚评其『写骤雨奇景，神妙莫测』。"
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
      "source_note": "原文见《东坡乐府笺》，孔凡礼《苏轼年谱》系于熙宁九年暮春。"
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
      "source_note": "原文见《苏轼诗集·卷三十九》，清代查慎行评此诗『达观妙语，非东坡不能道』。"
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
      "source_note": "原文见《东坡乐府笺》，小序及题注详见龙榆生校订本。"
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
      "source_note": "原文见《苏轼诗集·卷四十四》，纪晓岚称此诗『天风海涛，骨格苍劲』。"
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
      "source_note": "原文见《苏轼诗集·卷四十四》，史料参苏辙《亡兄子瞻端明墓志铭》。"
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
      "source_note": "原文见《苏轼诗集·卷四十五》，苏轼生前最后一首总结平生的标志性名作。"
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
      "source_note": "原文见《苏轼文集·卷七十一》，入选统编语文教材经典篇目。"
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
      "source_note": "原文见《苏轼诗集·卷二十三》，施宿《会稽志》录入。"
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
      "work_ids": [],
      "quote_ids": [],
      "dongpo_view": "出发时我们都想走得很远。但真正决定一个人能走多远的，往往是少年时在心里扎下的根。",
      "today_action": "整理一下书桌或床头，把一本很久想读的书翻开读五页。",
      "source_ids": [
        "source_songshi_sushi",
        "source_ssnp_kfl"
      ],
      "review_status": "approved"
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
        "work_xingshang_lun"
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
      "review_status": "approved"
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
        "work_wangjiangnan_chaoran"
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
      "review_status": "approved"
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
        "work_yuzhong_ziyou"
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
      "review_status": "approved"
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
        "work_tixilinbi"
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
      "review_status": "approved"
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
        "work_wanghulong_zuishu"
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
      "review_status": "approved"
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
        "work_dingfengbo_nanhaigui"
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
      "review_status": "approved"
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
        "work_bie_hainan"
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
      "review_status": "approved"
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
        "work_ziti_jinshan"
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
      "review_status": "approved"
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

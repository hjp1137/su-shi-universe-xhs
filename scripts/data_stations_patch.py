#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
补全现有21部作品的关系字段并为9大站点配置text_safe_zone
"""

EXISTING_RELATIONS = {
    "work_xingshang_lun": {
        "relation_type": "direct",
        "relation_note": "嘉祐二年礼部进士考试策论，欧阳修激赏一举成名，京师阶段奠基之作",
        "date": "1057",
        "source": "《苏轼文集·卷二》"
    },
    "work_jiangchengzi_mizhou": {
        "relation_type": "direct",
        "relation_note": "熙宁八年密州知州任上冬日常山出猎演习骑射所作，豪放词开山名篇",
        "date": "1075",
        "source": "《东坡乐府笺》"
    },
    "work_shuidiaogetou_mingyue": {
        "relation_type": "direct",
        "relation_note": "熙宁九年中秋密州超然台欢饮达旦怀念子由之作，千古中秋词绝唱",
        "date": "1076",
        "source": "《东坡乐府笺》"
    },
    "work_jiangchengzi_yimao": {
        "relation_type": "direct",
        "relation_note": "熙宁八年正月二十日密州任上夜梦亡妻王弗痛作，悼亡词千古第一名作",
        "date": "1075",
        "source": "《东坡乐府笺》"
    },
    "work_wangjiangnan_chaoran": {
        "relation_type": "direct",
        "relation_note": "熙宁九年春密州超然台落成后所作，诗酒趁年华之旷达心境",
        "date": "1076",
        "source": "《东坡乐府笺》"
    },
    "work_yuzhong_ziyou": {
        "relation_type": "direct",
        "relation_note": "元丰二年乌台诗案拘御史台狱中绝笔托弟苏辙之诗，生死托孤",
        "date": "1079",
        "source": "《苏轼诗集·卷二十》"
    },
    "work_chudao_huangzhou": {
        "relation_type": "direct",
        "relation_note": "元丰三年二月贬所黄州初抵所作，以长江鱼美自嘲化解政治重创",
        "date": "1080",
        "source": "《苏轼诗集·卷二十一》"
    },
    "work_dingfengbo_moting": {
        "relation_type": "direct",
        "relation_note": "元丰五年三月沙湖道中遇雨作，一蓑烟雨任平生之东坡哲学代表作",
        "date": "1082",
        "source": "《东坡乐府笺》"
    },
    "work_chibi_fu": {
        "relation_type": "direct",
        "relation_note": "元丰五年七月与友泛舟黄州赤壁所作，天人哲思与山水文赋巅峰",
        "date": "1082",
        "source": "《苏轼文集·卷一》"
    },
    "work_niannujiao_chibi": {
        "relation_type": "direct",
        "relation_note": "元丰五年黄州赤壁矶怀古英雄与生命沧桑之名作，豪放词代表",
        "date": "1082",
        "source": "《东坡乐府笺》"
    },
    "work_linjiangxian_lingao": {
        "relation_type": "direct",
        "relation_note": "元丰五年九月黄州临皋夜饮归来作，小舟从此逝江海寄余生之旷逸",
        "date": "1082",
        "source": "《东坡乐府笺》"
    },
    "work_zhurou_song": {
        "relation_type": "direct",
        "relation_note": "元丰三年黄州躬耕东坡时以火候烹肉之生活智慧趣作",
        "date": "1080",
        "source": "《东坡续集·卷十》"
    },
    "work_chengtian_yeyou": {
        "relation_type": "direct",
        "relation_note": "元丰六年十月黄州承天寺夜寻张怀民同游，但少闲人如吾两人者耳",
        "date": "1083",
        "source": "《东坡志林·卷一》"
    },
    "work_tixilinbi": {
        "relation_type": "period",
        "relation_note": "元丰七年移汝州途中过庐山题西林寺壁，为黄州心境升华之哲理名篇",
        "date": "1084",
        "source": "《苏轼诗集·卷二十三》"
    },
    "work_yinhushang_chuning": {
        "relation_type": "direct",
        "relation_note": "熙宁六年杭州通判任上西湖遇晴雨作，淡妆浓抹总相宜名扬天下",
        "date": "1073",
        "source": "《苏轼诗集·卷十七》"
    },
    "work_wanghulong_zuishu": {
        "relation_type": "direct",
        "relation_note": "熙宁五年杭州望湖楼骤雨骤晴纪胜名绝句",
        "date": "1072",
        "source": "《苏轼诗集·卷八》"
    },
    "work_huizhou_shilichi": {
        "relation_type": "direct",
        "relation_note": "绍圣三年贬惠州食岭南荔枝名作，日啖荔枝三百颗不辞长作岭南人",
        "date": "1096",
        "source": "《苏轼诗集·卷三十八》"
    },
    "work_dingfengbo_nanhaigui": {
        "relation_type": "theme",
        "relation_note": "元丰六年赠南迁归来王定国侍妾柔奴，此心安处是吾乡与岭南精神契合",
        "date": "1083",
        "source": "《东坡乐府笺》"
    },
    "work_liuyue_duhai": {
        "relation_type": "direct",
        "relation_note": "元符三年自儋州遇赦北渡琼州海峡绝唱，九死南荒吾不恨兹游奇绝冠平生",
        "date": "1100",
        "source": "《苏轼诗集·卷四十五》"
    },
    "work_bie_hainan": {
        "relation_type": "direct",
        "relation_note": "元符三年离开海南与黎民依依惜别之诗，心安是归舟",
        "date": "1100",
        "source": "《苏轼诗集·卷四十五》"
    },
    "work_ziti_jinshan": {
        "relation_type": "direct",
        "relation_note": "建中靖国元年临终前在常州舟中题李公麟画金山像，平生功业盖棺定论",
        "date": "1101",
        "source": "《苏轼诗集·卷四十九》"
    }
}

STATION_SAFE_ZONES = {
    "station_meishan": {"x": 20, "y": 42, "width": 350, "height": 160, "tone": "dark"},
    "station_jingshi": {"x": 20, "y": 38, "width": 350, "height": 160, "tone": "light"},
    "station_mizhou": {"x": 20, "y": 40, "width": 350, "height": 160, "tone": "dark"},
    "station_wutai": {"x": 20, "y": 40, "width": 350, "height": 160, "tone": "dark"},
    "station_huangzhou": {"x": 20, "y": 42, "width": 350, "height": 160, "tone": "dark"},
    "station_hangzhou": {"x": 20, "y": 36, "width": 350, "height": 160, "tone": "light"},
    "station_huizhou": {"x": 20, "y": 38, "width": 350, "height": 160, "tone": "light"},
    "station_danzhou": {"x": 20, "y": 40, "width": 350, "height": 160, "tone": "dark"},
    "station_changzhou": {"x": 20, "y": 38, "width": 350, "height": 160, "tone": "light"}
}

# 任务17 真机回归、Skill终审与比赛最终交付 0.1

> 项目：苏轼宇宙小红书小工具  
> 阶段：Final Competition Delivery  
> 前置任务：任务14.1、任务15、15.1、15.2、任务16  
> 优先级：P0  
> 核心目标：在视觉2.0与Three.js系统完成后，重新做一次真正面向比赛提交的最终真机回归、Skill 1.6.0终审、正式打包与交付归档。

## 一、任务目标

本任务是新的最终门禁，覆盖并取代任务14“旧视觉版本”的最终交付结论。

必须确保：

> **最终提交的是视觉2.0真实HEAD源码对应的ZIP，而不是任务14时期的旧包。**

任务17完成后，才能重新标记：

> **Milestone C｜Competition Ready（Visual 2.0 Final）**

---

## 二、必须先阅读

1. 当前 `.skill/minitool-zip-builder/SKILL.md`
2. `.skill/minitool-zip-builder/references/zip-artifact-spec.md`
3. `device-capabilities.md`
4. `jsbridge-api.md`
5. `js-compatibility.md`
6. `css-compatibility.md`
7. `cross-platform-h5.md`
8. `performance-budget.md`
9. `docs/05_小红书小工具技术架构与工程规范.md`
10. `docs/07_小红书MiniTool_Skill1.6.0工程硬约束摘要.md`
11. `docs/10_V1官方校验与比赛交付报告.md`
12. `docs/11_视觉系统2.0与东方诗词宇宙设计规范.md`
13. 任务14.1、15、15.1、15.2、16成果说明
14. `tasks/00_Skill1.6.0任务执行统一基线.md`

如当前安装Skill版本已变化，必须先记录差异并以当前实际版本为准。

---

## 三、冻结最终提交HEAD

开始最终回归前：

1. 确认所有P0/P1已关闭或有正式豁免；
2. 记录当前Git commit SHA；
3. 清理无关临时修改；
4. 从该HEAD构建正式产物；
5. 此后如修任何代码，必须重新记录新SHA并重新构建/审计。

不得出现：

> 报告记录commit A，但ZIP实际上来自commit B。

---

## 四、全量功能回归

按真实用户顺序逐项执行：

```text
首页打开
→ 主CTA
→ 完成测试
→ 结果揭晓
→ 查看苏轼人生节点
→ 漫游九站
→ 打开作品
→ 返回
→ 今日东坡
→ 生成分享卡
→ writeTempFile
→ saveImageToPhotosAlbum / postNote
→ 取消/返回
→ 再次进入核心功能
```

必须确认Three.js开启和Fallback两种状态都能走通核心主链。

---

## 五、结果与内容覆盖

### 8类测试结果

全部必须：

- 可达；
- 数据完整；
- 结果视觉正确；
- 诗句与站点正确；
- 可继续进入站点；
- 可生成分享卡。

### 9大站点

全部必须：

- 节点出现；
- 点击可达；
- 视觉状态与站点主题相符；
- 文字可读；
- 无draft/占位数据。

### 21篇作品

至少自动验证全部可达，并人工抽查重点作品：

- 《定风波·莫听穿林打叶声》
- 《念奴娇·赤壁怀古》
- 《前赤壁赋》
- 《水调歌头·明月几时有》
- 《江城子·密州出猎》
- 《题西林壁》

《题西林壁》必须保持任务14.1修正后的时空说明。

---

## 六、Three.js / WebGL最终回归

### 6.1 正常模式

确认：

- 首页场景正常；
- 人生宇宙正常；
- 结果揭晓正常；
- DOM不被canvas遮挡；
- Pointer操作不抢占按钮；
- 页面切换后资源释放。

### 6.2 Low模式

确认低档依然具有基本氛围且可交互。

### 6.3 Fallback

强制关闭/失败WebGL：

- 首页不白屏；
- 背景有静态/CSS/Canvas兜底；
- 测试完整；
- 结果完整；
- 九站完整；
- 今日东坡完整；
- 分享完整。

### 6.4 生命周期

验证：

- 后台/前台；
- resize；
- 连续进入退出10次；
- context lost（可模拟则执行）；
- 连续切站；
- 连续生成海报。

---

## 七、真机最终回归

至少完成一轮真实小红书客户端回归。

### 记录信息

- 设备型号；
- OS版本；
- 小红书版本；
- MiniTool环境；
- WebGL实际可用情况；
- 默认质量档位；
- 是否触发降级；
- 是否出现黑屏/明显卡顿。

### Native Bridge真机链路

必须真实测试：

1. `writeTempFile`；
2. `postNote`调起；
3. 用户取消；
4. 返回工具；
5. `saveImageToPhotosAlbum`；
6. 保存结果。

截图/录屏必须为真实不同状态。

如果平台环境阻塞，必须写明“阻塞”，不得伪造PASS。

---

## 八、静态Skill硬门禁

最终产物必须再次检查：

### Script/CSP

- 无内联脚本；
- 无行内事件；
- 无`javascript:`；
- 无运行时`type=module`；
- 无`import/export`；
- 无`eval`；
- 无`new Function`；
- 无WASM；
- 无iframe/object。

### 网络/API

- 无fetch；
- 无XHR；
- 无WebSocket/EventSource/WebRTC；
- 无远程图片/纹理；
- 无CDN；
- 无在线字体；
- 无Worker；
- 无定位/剪贴板等禁用API。

### WebGL额外检查

- Three.js完全本地；
- 纹理完全本地；
- 不依赖WASM解码；
- 不依赖Worker；
- DPR/像素/资源预算存在；
- Fallback存在。

---

## 九、Chrome61 / ES2017终检

扫描最终ZIP中的JS/CSS，而不是只扫源码。

JS不得残留不可解析的新语法。

CSS关键布局必须有旧内核回退。

必须确认视觉2.0引入的代码没有破坏原任务1.1建立的兼容基线。

---

## 十、正式构建和官方双审计

推荐流程：

```text
清理dist
↓
从冻结HEAD正式构建
↓
项目静态扫描
↓
官方 audit_artifact.py dist/
↓
官方 audit_artifact.mjs dist/（环境可用时）
↓
打ZIP
↓
确认ZIP根 index.html
↓
官方 audit_artifact.py final.zip
↓
官方 audit_artifact.mjs final.zip（环境可用时）
↓
verify_final_package.py
↓
真机最终回归
↓
如有修改则全部重跑
↓
最终ZIP冻结
```

不得只跑任务14时期旧结果。

---

## 十一、包体与资源报告

记录：

- ZIP精确字节数；
- ZIP MiB；
- SHA-256；
- 文件数量；
- Three.js代码大小；
- 最大5个资源；
- 图片/纹理总大小；
- 是否超过2MiB推荐值。

>10MiB直接FAIL。

>2MiB但≤10MiB时必须说明主要资源与保留理由。

---

## 十二、最终视觉截图/录屏

最终交付归档至少包含：

1. 首页；
2. 测试；
3. 黄州结果；
4. 人生宇宙；
5. 赤壁/定风波作品页；
6. 今日东坡；
7. 分享卡；
8. postNote真机；
9. 保存相册真机；
10. WebGL Fallback。

建议额外保存一段完整30—60秒体验录屏，用于比赛展示与内部验收。

---

## 十三、最终问题等级

### P0

- 官方audit失败；
- ZIP>10MiB；
- ZIP根无index.html；
- 白屏；
- 真实联网依赖；
- CSP/ESM违规；
- Chrome61解析失败；
- Fallback不可用；
- 核心主链中断。

不得提交。

### P1

- 真机明显卡顿；
- 某结果/站点不可达；
- 分享/Native回退错误；
- 小屏关键遮挡；
- Three.js持续内存异常；
- 重要史料错配。

原则上修复后提交。

### P2

轻微视觉瑕疵，可记录。

---

## 十四、正式交付文档

新增：

`docs/12_视觉2.0最终校验与比赛交付报告.md`

该文档取代`docs/10`作为视觉2.0版本的最终交付依据。

至少包含：

1. Skill版本；
2. 最终commit SHA；
3. 视觉2.0摘要；
4. Three.js版本；
5. WebGL质量档；
6. Fallback结果；
7. Chrome61结果；
8. 全功能回归；
9. 真机环境；
10. Native Bridge结果；
11. 官方目录/ZIP审计；
12. 包体；
13. SHA-256；
14. 最终ZIP路径；
15. 已知P2；
16. 最终结论。

---

## 十五、最终结论

只有同时满足：

```text
视觉2.0验收PASS
+ WebGL正常且Fallback完整
+ 真机主链无P0/P1
+ Native Bridge真实闭环或明确平台阻塞
+ Skill审计PASS
+ Chrome61/ES2017 PASS
+ ZIP根结构正确
+ ZIP≤10MiB
+ 内容审核PASS
+ 最终ZIP与commit一致
```

才允许写：

> **Milestone C｜Competition Ready（Visual 2.0 Final）**

---

## 十六、成果说明

生成：

`tasks/results/20260907_任务17_真机回归Skill终审与比赛最终交付01成果说明.md`

成果说明不得只写“全部通过”，必须附真实命令结果、真机证据、最终commit、包体、SHA与明确产物路径。

# 任务14 小红书官方 Skill 最终校验、修复与打包 0.1

> 项目：苏轼宇宙小红书小工具  
> 阶段：Competition Ready  
> 前置任务：任务1、任务1.1、任务2—13  
> 任务优先级：P0

## 一、任务目标

严格按照当前工作区实际安装的 `minitool-zip-builder-1.6.0.skill`，对完整比赛产物执行最终：

> **静态合规扫描 → 目录审计 → ZIP 审计 → 功能回归 → 修复 → 再审计 → 正式打包 → 交付报告。**

本任务是 **Milestone C｜Competition Ready** 最终门禁。

---

## 二、必须先阅读

1. 当前官方 `SKILL.md`；
2. `references/zip-artifact-spec.md`；
3. `references/device-capabilities.md`；
4. `references/jsbridge-api.md`；
5. `references/js-compatibility.md`；
6. `references/css-compatibility.md`；
7. `references/cross-platform-h5.md`；
8. `references/performance-budget.md`；
9. `docs/05_小红书小工具技术架构与工程规范.md`；
10. `docs/07_小红书MiniTool_Skill1.6.0工程硬约束摘要.md`；
11. `docs/08_Skill1.6.0集中修订记录与冲突处理说明.md`；
12. `docs/09_V1内容审核清单.md`；
13. `tasks/00_Skill1.6.0任务执行统一基线.md`；
14. 任务1.1及任务2—13成果说明。

若官方 Skill 内容自本轮文档修订后变化，以实际安装版本为准，并先更新 `docs/07`。

---

## 三、最终校验流程

必须按以下顺序真实执行：

```text
确认当前 Skill 版本
↓
构建正式产物目录
↓
静态扫描 CSP / ESM / 禁止 API / 远程依赖
↓
audit_artifact 对产物目录审计
↓
修复
↓
生成阶段 ZIP
↓
验证 ZIP 根 index.html
↓
audit_artifact 对 ZIP 审计
↓
修复并重建
↓
PC 模拟器 + 真机核心回归
↓
再次审计目录 + ZIP
↓
生成最终比赛 ZIP
↓
记录大小、路径、哈希（如方便）
↓
输出 docs/10_V1官方校验与比赛交付报告.md
```

禁止省略修复后的复检。

---

## 四、静态硬门禁扫描

### 4.1 CSP / Script

正式产物不得存在真实运行用途的：

```text
内联 <script>...</script>
onclick/onchange/oninput 等行内事件
javascript: URI
<script type="module">
import/export runtime
eval()
new Function()
WebAssembly
iframe
object
```

### 4.2 禁止网络/API

不得存在实际运行调用：

```text
fetch
XMLHttpRequest
WebSocket
EventSource
RTCPeerConnection
Geolocation
Clipboard
Worker/SharedWorker/ServiceWorker
DeviceMotion/DeviceOrientation
window.open
window.prompt
Fullscreen API
<a download>
```

### 4.3 外部资源

不得依赖：

- CDN；
- Google Fonts / 在线字体；
- 远程图片；
- 远程 JS/CSS；
- 在线 API；
- 第三方在线埋点。

---

## 五、Chrome 61 / ES2017 门禁

必须检查最终 JS，不只检查源码：

- 不残留未转译 `?.`；
- 不残留 `??`；
- 不存在目标内核无法解析的现代语法；
- 不依赖未经兼容处理的新 API。

CSS 检查：

- Flex gap 不作为唯一关键布局；
- `aspect-ratio` 有回退；
- `clamp()` 有回退；
- `:has()` 不作为关键逻辑；
- 逻辑属性不作为唯一实现。

---

## 六、ZIP 结构与文件门禁

### 6.1 根入口

正确：

```text
final.zip
├── index.html
├── css/
├── js/
├── data/
└── assets/
```

错误：

```text
final.zip
└── dist/
    └── index.html
```

### 6.2 不应进入正式 ZIP

包括：

```text
node_modules
.git
*.map
测试缓存
开发日志
无关 docs/tasks
无关构建配置
未使用素材
```

具体允许清单以 Skill 当前 `zip-artifact-spec.md` 为准。

---

## 七、官方 audit_artifact 双审计

必须真实执行 Skill 自带脚本之一：

```text
python3 <skill>/scripts/audit_artifact.py <dist>
python3 <skill>/scripts/audit_artifact.py <final.zip>
```

或：

```text
node <skill>/scripts/audit_artifact.mjs <dist>
node <skill>/scripts/audit_artifact.mjs <final.zip>
```

必须同时保存：

- 目录首次审计结果；
- ZIP 首次审计结果；
- 修复项；
- 最终目录审计结果；
- 最终 ZIP 审计结果。

不得只跑一个目标。

---

## 八、性能与包体门禁

### 8.1 ZIP

```text
>10 MiB → P0，禁止提交
≤10 MiB → 满足硬门禁
≤2 MiB → 项目/官方强推荐目标
```

最终报告必须写明准确 ZIP 大小。

如果最终 >2 MiB 但 ≤10 MiB，必须列出前三大资源及无法继续压缩的原因。

### 8.2 文本

关注：

- 单个 html/css/js/json >2 MiB 警告；
- 解压后文本总计 >5 MiB 警告。

### 8.3 Base64

- 单条 Base64 解码 >100 KiB：审查；
- >1 MiB：不得作为长期静态内嵌资源。

---

## 九、Native Bridge 最终检查

平台原生调用必须全部集中在 XHSBridge/平台适配层。

确认真实使用的 API 属于：

```text
window.xhs.miniTool.writeTempFile
window.xhs.miniTool.saveImageToPhotosAlbum
window.xhs.miniTool.postNote
window.xhs.miniTool.openRedPage
```

并逐项检查：

- Bridge 不存在；
- Promise/callback；
- 用户取消；
- 权限失败；
- 文件不存在；
- 连续点击；
- 成功返回工具。

---

## 十、核心产品回归

逐条真实操作：

1. 打开首页；
2. 进入测试；
3. 完成测试；
4. 查看结果；
5. 查看对应人生站点；
6. 浏览人生宇宙；
7. 打开作品；
8. 打开今日东坡；
9. 生成分享卡；
10. 写临时文件；
11. 保存图片或调起发笔记；
12. 取消后正常返回；
13. 再次进入仍正常。

### 10.1 八类结果

全部结果必须可达、数据完整、可生成卡片。

### 10.2 九大站点

全部节点：可显示、可点击、可进入、无 draft 泄漏。

### 10.3 今日东坡

同日稳定、首页/详情一致、可生成今日签。

---

## 十一、设备与兼容回归

至少覆盖：

- PC 官方模拟环境；
- 真机；
- 小屏；
- 常见中等屏；
- 高 DPR；
- 安全区；
- 长文本；
- 多次切换；
- 连续生成分享卡。

检查 Pointer Events 主链和安全区双兼容。

---

## 十二、问题等级

### P0

- Skill/audit 失败；
- ZIP >10 MiB；
- index.html 不在 ZIP 根；
- 白屏/核心链中断；
- 真实网络依赖；
- ESM/CSP 违规；
- 禁止 API；
- 分享卡/Native 主链不可用且无合规降级。

必须修复。

### P1

- 某结果/站点不可达；
- Chrome 61 布局破坏；
- 小屏关键按钮不可用；
- 诗句裁切；
- 返回链断裂；
- 连续使用明显内存恶化。

原则上修复后提交。

### P2

轻微视觉差异，可记录，不得把 P0/P1 降级为 P2。

---

## 十三、正式交付报告

由于 `docs/07`、`08`、`09` 已占用，本任务正式报告为：

`docs/10_V1官方校验与比赛交付报告.md`

至少包括：

1. Skill 名称、版本；
2. 执行环境；
3. 最终提交 commit；
4. 正式产物文件树；
5. 静态扫描结果；
6. 目录 audit 首轮/最终结果；
7. ZIP audit 首轮/最终结果；
8. 修复记录；
9. Chrome 61 / CSS 兼容结果；
10. Native Bridge 回归；
11. 核心功能回归；
12. 内容审核状态；
13. ZIP 准确大小；
14. >2 MiB 时前三大资源；
15. 最终 ZIP 明确路径；
16. 已知非阻塞问题；
17. 最终提交建议。

---

## 十四、Milestone C｜Competition Ready

只有同时满足：

```text
官方 Skill 1.6.0 最终审计通过
+ ZIP 根 index.html 正确
+ ZIP ≤10 MiB
+ 无网络依赖
+ CSP / Classic Script 合规
+ Chrome 61 / ES2017 合规
+ 核心产品链通过
+ 8类结果可达
+ 九大站点可用
+ 今日东坡可用
+ 分享卡可生成
+ Native Bridge 主链可用或有明确合规降级
+ 内容审核完成
+ 真机无阻塞问题
+ 正式 ZIP 已生成
+ docs/10 已写明产物路径
```

才允许标记 Competition Ready。

---

## 十五、成果说明

建议：

`tasks/results/20260907_任务14_小红书官方Skill最终校验修复与打包01成果说明.md`

并同时提交：

`docs/10_V1官方校验与比赛交付报告.md`

---

## 十六、硬性约束

1. 必须真实执行官方 audit，不得根据代码阅读推测通过。
2. 必须审计目录和 ZIP 两个对象。
3. 必须修复后再次审计。
4. 必须验证 ZIP 根 `index.html`。
5. 必须真实生成最终 ZIP。
6. 必须给出准确大小与明确产物路径。
7. 不得伪造命令、审计输出或成功状态。
8. 外部平台环境如阻塞某项 Native 测试，必须准确记录阻塞位置，不得假称通过。
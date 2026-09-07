# 小红书 MiniTool Skill 1.6.0 工程硬约束摘要

> 项目：`su-shi-universe-xhs`  
> 文档编号：07  
> 版本：V1.1  
> 日期：2026-09-07  
> 依据：`minitool-zip-builder-1.6.0.skill` 解包后的 `SKILL.md`、`references/` 与 `scripts/`  
> 性质：**比赛工程最高技术约束摘要**

---

## 一、适用范围与优先级

本项目比赛版按小红书 MiniTool 离线 H5 静态包规范开发，不按传统小红书小程序/XHSML 工程，也不按普通在线 Web 站点交付。

工程约束优先级固定为：

```text
1. 当前实际安装的 minitool-zip-builder Skill / SKILL.md / references
2. 本文档 07
3. docs/05_小红书小工具技术架构与工程规范.md
4. docs/01—04、06 中的产品/视觉/内容要求
5. tasks/ 中的任务书
```

如低优先级文档与 Skill 1.6.0 冲突，以高优先级约束为准，并通过新任务修复已经实施的冲突，不追溯改写已完成任务的历史事实。

---

## 二、运行模型

V1 是：

> **纯本地、离线运行、受限沙箱中的 H5 静态 ZIP 包。**

核心体验必须断网可运行：

```text
打开工具
→ 本地内容加载
→ 本地测试计算
→ 结果展示
→ 苏轼人生宇宙浏览
→ 今日东坡
→ Canvas 2D 分享卡生成
```

禁止将核心体验建立在任何外网请求、CDN、远程 API、远程字体、远程图片或在线数据库上。

---

## 三、ZIP 与目录硬约束

1. `index.html` 必须位于最终 ZIP 根目录。
2. 解压 ZIP 后应直接看到 `index.html`，不得多包一层父目录。
3. 正式包仅包含运行所需静态文件与资源。
4. 不得把 `node_modules`、`.git`、source map、开发配置、测试缓存等无关开发文件打入正式 ZIP。
5. 允许的静态内容以 Skill 当前 `zip-artifact-spec.md` 为准，包括 HTML/CSS/JS/JSON、图片、字体、音视频等被明确允许的类型。

推荐产物逻辑：

```text
zip root/
├── index.html
├── css/
├── js/
├── data/
└── assets/
```

源码工程可另有开发目录，但最终 ZIP 必须满足上述离线产物要求。

---

## 四、CSP 与 JavaScript 硬门禁

### 4.1 禁止内联脚本

禁止：

```html
<script>...</script>
<button onclick="...">...</button>
<a href="javascript:...">...</a>
```

必须：

```html
<script src="./js/app.js"></script>
```

并通过 `addEventListener` 绑定事件。

### 4.2 Classic Script

正式产物必须使用经典脚本：

- 禁止 `<script type="module">`；
- 禁止在运行时代码中保留 `import` / `export`；
- 多文件通过多个 classic `<script src>` 引入；
- 模块协作建议通过 `window.SuShiUniverse` 等单一命名空间完成。

### 4.3 禁止动态执行

禁止：

- `eval()`；
- `new Function()`；
- WebAssembly；
- `<iframe>`；
- `<object>`。

---

## 五、网络与设备能力边界

### 5.1 禁止网络能力

正式运行代码中禁止：

- `fetch`；
- `XMLHttpRequest`；
- `WebSocket`；
- `EventSource`；
- `RTCPeerConnection`。

### 5.2 禁止或不可依赖的系统能力

包括但不限于：

- Geolocation；
- Clipboard 读写；
- Bluetooth / USB / HID / Serial；
- Battery / 网络状态；
- Worker / SharedWorker / ServiceWorker；
- DeviceMotion / DeviceOrientation / 传感器；
- `window.open`；
- `window.prompt`；
- Fullscreen API；
- `<a download>` 直接下载。

### 5.3 可用基础能力

可使用：

- DOM / CSS；
- Canvas 2D；
- 基础 WebGL（但本项目 V1 默认不使用）；
- `localStorage` / `sessionStorage` / IndexedDB 等 Skill 允许的本地能力；
- `<input type="file">` 的受限本地媒体选择；
- Skill 明确允许的摄像头/麦克风能力（本项目 V1 不需要）。

---

## 六、Native Bridge 唯一入口

小红书原生能力必须通过：

```text
window.xhs.miniTool.*
```

V1 重点接口：

- `postNote(options)`：调起发笔记流程；
- `saveImageToPhotosAlbum(options)`：保存本地/base64 图片到相册；
- `openRedPage(options)`：进入允许的小红书原生页面；
- `writeTempFile(options)`：将完整 data URI 写成本地临时文件并获得 `filePath`。

业务页面不得散落直接调用 Bridge，必须统一封装平台适配层，例如：

```text
XHSBridge.isAvailable()
XHSBridge.writeTempFile()
XHSBridge.saveImage()
XHSBridge.postNote()
XHSBridge.openRedPage()
```

必须处理 Bridge 不存在、用户取消、授权失败、API 失败和 PC 模拟器降级。

---

## 七、JavaScript 兼容基线

硬性兼容目标：

> **Android 8.1 出厂 WebView / Chrome 61，ES2017。**

直接运行的 JS 不得依赖未转译的 ES2018+ 语法。

尤其避免直接使用：

- 可选链 `?.`；
- 空值合并 `??`；
- 以及其他超出目标基线的语法/内建能力。

如引入构建链，最终产物必须转译到至少：

```text
ES2017 + Chrome 61
```

原则上不引入全局大体积 polyfill；仅对确需能力做局部、可审计降级。

---

## 八、CSS 兼容基线

不得把 Chrome 61 不可靠或不支持的现代 CSS 作为唯一实现，包括但不限于：

- Flex `gap`；
- `aspect-ratio`；
- `clamp()`；
- 逻辑属性；
- `:has()`。

采用：

> **基线样式 + 能力检测增强 + 明确回退。**

Flex gap 不能只依赖 `@supports (gap: 1px)` 判断；如确需使用，应按 Skill 建议用临时 DOM 做实际布局测量后再增强。

---

## 九、跨端与安全区

交互优先使用 Pointer Events：

```text
pointerdown / pointermove / pointerup
```

安全区使用 PC 模拟器变量与真机 `env()` 双重兼容：

```css
padding-top: var(--safe-area-inset-top, env(safe-area-inset-top, 0px));
padding-bottom: var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px));
```

不得只在桌面 Chrome 验证通过就宣布移动端完成。

---

## 十、性能与包体门禁

### 10.1 ZIP

```text
最终 ZIP > 10 MiB  → 阻塞交付
最终 ZIP ≤ 2 MiB   → 官方强烈建议目标，本项目正式预算目标
```

因此本项目内部目标固定为：

> **尽量 ≤ 2 MiB，任何情况下不得超过 10 MiB。**

### 10.2 文本

- 单个 HTML/CSS/JS/JSON 超过 2 MiB：警告；
- 解压后文本总计超过 5 MiB：警告。

不得把大规模内容以巨型 JS 数组或单文件 JSON 粗暴塞入包内。

### 10.3 Base64

- 单条 Base64 解码后 > 100 KiB：警告；
- > 1 MiB：必须拆为独立资源文件。

Base64 主要用于临时生成与 Native Bridge 交接，不用于长期存放大图素材。

### 10.4 图形

V1 默认：

> **CSS + SVG + Canvas 2D 优先，WebGL 不作为正式基础依赖。**

如未来使用 WebGL，必须遵守 Skill 的 DPR、像素、纹理、draw call、掉帧降级和 context lost 恢复预算。

---

## 十一、视觉资源策略

为了在 ≤2 MiB 推荐目标内保持完成度：

优先：

```text
CSS 渐变
SVG
Canvas 2D
程序化星点/水纹/雾层
少量高价值 WebP
系统字体
```

避免：

- 大量高清 PNG；
- 大字体包；
- 多套重复背景；
- 视频/音频作为 V1 核心背景；
- 页面效果依赖远程图。

---

## 十二、分享卡正式技术链

推荐固定为：

```text
结构化结果数据
→ Canvas 2D 绘制
→ data URI / 本地图片
→ writeTempFile（需要时）
→ filePath
→ saveImageToPhotosAlbum / postNote
```

禁止：

- 使用远程截图服务；
- `<a download>`；
- 网络上传换取图片 URL；
- 自动发布。

---

## 十三、官方审计

Skill 自带零外部依赖审计脚本：

```text
scripts/audit_artifact.py
scripts/audit_artifact.mjs
```

正式阶段必须真实执行对产物目录和 ZIP 的审计。至少保留：

- 执行命令；
- 首轮结果；
- 修复项；
- 复检结果；
- ZIP 大小；
- 最终产物路径。

---

## 十四、项目级禁止清单

V1 正式产物默认禁止：

```text
React/Vue 等大型运行时（除非实际证明必要且完全通过 Skill 门禁）
ES Module runtime
远程请求
CDN
在线字体
远程图片
Web Worker / Service Worker
WASM
复杂 WebGL 宇宙
第三方埋点 SDK
<a download>
内联 JS
onclick 等 HTML 行内事件
```

工程推荐采用：

> **Vanilla HTML + CSS + ES2017 Classic JavaScript + JSON + SVG/Canvas 2D。**

该推荐不是为了“技术复古”，而是为了最小包体、最低 CSP 风险、Chrome 61 兼容性和可审计性。

---

## 十五、执行门禁

任何后续任务开始前必须确认：

```text
[ ] 已读取本文档 07
[ ] 已读取 docs/05 最新版本
[ ] 未重新引入联网依赖
[ ] 未重新引入 ES Module runtime
[ ] 代码目标仍为 Chrome 61 / ES2017
[ ] 关键资源本地化
[ ] Native 能力仅经 window.xhs.miniTool 适配层调用
[ ] ZIP 推荐预算仍以 ≤2 MiB 为目标
```

任务14最终交付时再以当前实际安装的 Skill 内容为最终事实源。
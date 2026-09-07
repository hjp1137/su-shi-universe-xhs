# 小红书官方 Skill 工程约束摘要

> 文档编号：07  
> 版本：V1.0 (基于官方 `minitool-zip-builder-1.6.0.skill`)  
> 日期：2026-09-07  
> 依据来源：官方 Skill `SKILL.md` 及全部关联 reference（`zip-artifact-spec.md`、`device-capabilities.md`、`jsbridge-api.md`、`js-compatibility.md`、`css-compatibility.md`、`cross-platform-h5.md`、`performance-budget.md`）

---

## 一、工程入口与目录规范

1. **唯一硬性入口**：
   - `index.html` **必须位于 zip 根目录**作为唯一入口文件。
   - 不可改名、不可放进任何子目录（例如 `src/index.html` 或 `app/index.html` 为非法结构）。
   - 单页应用架构：整个工具只有一个 `index.html`，页面/视图切换由前端 JS 控制 DOM 实现。
2. **目录与文件组织**：
   - 除根目录 `index.html` 外，其余文件/文件夹可自由组织（如 `assets/`、`css/`、`js/`、`images/`、`data/` 等），引用一律使用相对路径（如 `./assets/...`）。
   - **禁止出现在 zip 内的文件与目录**：
     - `node_modules`、`.git`、`.DS_Store`；
     - `*.map`（source map 文件）；
     - 构建配置文件（`vite.config.*`、`webpack.config.*`、`tsconfig.json` 等）；
     - 多余的外层包装目录。

---

## 二、允许与禁止的文件类型

小工具 zip 包内仅允许以下 12 种文件后缀：

| 分类 | 允许的文件后缀 | 约束与说明 |
| --- | --- | --- |
| 页面入口 | `.html` | 有且仅有一个 `index.html` 位于根目录 |
| 样式文件 | `.css` | 本地样式表 |
| 脚本文件 | `.js` | 经典脚本文件，必须外置引入 |
| 图片资源 | `.png`、`.jpg`、`.jpeg`、`.gif`、`.webp`、`.svg` | 本地图片资源，优先 WebP |
| 字体文件 | `.woff`、`.woff2` | 本地字体文件，非必要优先使用系统字体栈 |
| 数据配置 | `.json` | 小型静态配置/数据，不得作为大型内置数据库 |

**禁止**：任何其他未经允许的文件类型（如 `.wasm`、`.ts`、`.md` 等均不得直接打包进最终 zip）。

---

## 三、资源加载规则（容器 CSP 约束）

运行环境是离线沙箱容器，强制执行严格的 CSP：

1. **脚本约束**：
   - **禁止内联脚本**：`<script>...</script>` 不可用（CSP 未开启 `unsafe-inline`）。
   - **禁止行内事件**：如 `<button onclick="...">` 均被拦截报错。
   - **禁止动态代码执行**：禁止 `eval()`、`new Function()`、`javascript:` 伪协议、WebAssembly。
   - **禁止 ES Module 语法**：**不得使用 `<script type="module">`**，JS 脚本内不得包含 `import` / `export`，不要使用 top-level `await`。zip 离线加载无目录服务，module 的相对解析不可靠。
   - **正确做法**：脚本必须全部外置为本地 `.js` 文件，通过 `<script src="./assets/...js"></script>` 经典方式按依赖顺序引入，事件一律在 JS 中使用 `addEventListener` 绑定。
2. **样式约束**：
   - 允许使用 `<link rel="stylesheet" href="./assets/...css">` 引入本地样式表。
   - 允许内联 `<style>` 和行内 `style="..."`。
   - 禁止引用任何外部域名样式表（如 `https://...`）。
3. **媒体与图片约束**：
   - 允许包内本地图片引用（`<img src="./assets/...png">`、CSS `url(./assets/...jpg)`）。
   - 允许 `data:` URI（Base64，但受体积预算约束，单条解码后不得超 1 MiB，大于 100 KiB 优先改用包内文件）。
   - 允许 `blob:`（如 `URL.createObjectURL` 选图预览），大图需及时 `URL.revokeObjectURL()`。
   - 音视频（`<video>`/`<audio>`）仅支持包内本地文件，禁止外部域名和 `data:`/`blob:` 媒体源。
   - 禁止 `<iframe>` 和 `<object>`，全部禁止。
   - 不得自建 CSP `<meta>` 标签（容器统一管理）。

---

## 四、网络请求限制与离线要求

1. **纯本地、完全不联网**：
   - 容器禁止任何外部网络请求。
   - 被禁用的 Web API 包括：`fetch`、`XMLHttpRequest`、`WebSocket`、`EventSource`、`RTCPeerConnection`。
   - 外部 CDN 资源一律无法加载，所有脚本、样式、图片、字体必须随包离线打包。
2. **无外链跳转**：
   - 禁止使用 `window.open`、`location.href = 'https://...'`、`location.assign`、`target="_blank"`、`<a download>`、表单直接跳转提交。
   - 页面切换均在单页内由 JS 切换 DOM。

---

## 五、代码兼容性基线（Chrome 61）

1. **JavaScript 最低基线**：
   - 目标内核基线为 **Android 8.1 出场 Chrome / WebView 61**。
   - 直接交付的 JS 代码不得超出 **ES2017**（支持 async/await、`Object.entries`、`Array.prototype.includes`、`padStart` 等）。
   - ES2018+ 语法（可选链 `?.`、空值合并 `??`、对象展开 `...obj`、类私有字段等）必须经由构建链转译为面向 Chrome 61 的产物。
   - 较新 Web API（如 `replaceAll`、`Array.prototype.at`、`structuredClone` 等）不得作为唯一实现，须做能力检测并提供局部 fallback。
2. **CSS 最低基线与渐进增强**：
   - 采用“Chrome 61 基线层 + 能力检测增强层”，不维护两套完整样式表。
   - Chrome 61 不支持 Flexbox `gap`（属性解析可能被识别但实际无布局效果，若使用必须做 JS 动态测量检测或使用子项 `margin` 作为基线）。
   - `aspect-ratio`、`min()`/`max()`/`clamp()`、逻辑属性（`margin-inline` 等）、`backdrop-filter` 等新特性必须提供 Chrome 61 兼容写法，并通过层叠或 `@supports` 进行增强。
   - 页面宽度使用 `%`、`flex` 自适应，切忌写死 `375px` 等固定尺寸。

---

## 六、跨端适配与移动端交互

1. **Viewport 设置**：
   - 必须包含：`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />`。
2. **安全区适配**：
   - 结合容器变量与 `env()`：
     `padding-top: var(--safe-area-inset-top, env(safe-area-inset-top, 0px));`
     `padding-bottom: var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px));`
   - PC 模拟器注入 `--safe-area-inset-*`，真机提供 `env()`，该组合两端均可生效。
3. **触摸与手势**：
   - 禁止依赖 `:hover` 作为关键操作入口。
   - 交互优先使用 Pointer Events（`pointerdown/move/up`）或 Touch Events（`touchstart/move/end`）。
   - 移动端点击高亮清除：`-webkit-tap-highlight-color: transparent;`。

---

## 七、端能力与 Native JSBridge API 规范

容器通过 `window.xhs.miniTool.*` 注入能力，仅允许调用官方白名单 API，禁止自行 `postMessage`：

1. **`postNote(options)`**：
   - 发布笔记，必填 `mediaInfo`（包含 `image_resources`、`video_resources` 或 `live_photo_resources`）。
   - 图片地址支持 base64 data:uri。
2. **`saveImageToPhotosAlbum(options)`**：
   - 保存图片到系统相册，必填 `filePath`。
   - `filePath` 仅支持 base64 data:uri 或本地临时文件路径，**不支持网络 URL**。
3. **`writeTempFile(options)`**：
   - 将 base64 转为临时文件，返回临时 `filePath`。
   - **参数 `data` 必须是完整 data:uri**（如 `data:image/png;base64,...`，`canvas.toDataURL()` 原样传入即可，切勿截去前缀），裸 base64 会执行失败。
4. **`openRedPage(options)`**：
   - 跳转通用小红书原生页（`type` 必须命中客户端白名单，`params` 为语义参数）。

**被禁用的端能力**：
- 定位（`geolocation`）、剪贴板自动读写（`clipboard` / `execCommand`，复制应引导用户手动选中长按）、蓝牙/USB/串口、传感器（加速度计/陀螺仪/设备方向）、Web Worker / Service Worker、屏幕共享与 Element 全屏 API。

---

## 八、包体性能预算与限制门禁

| 指标 | 门禁标准 | 说明与要求 |
| --- | --- | --- |
| **最终 zip 包体积** | **硬上限 10 MiB** | 超过 10 MiB 官方校验报错，推荐控制在 **2 MiB 以内** |
| **单个文本文件** | 建议不超过 2 MiB | 超出 2 MiB 审计提示 WARN（避免内嵌超大生成代码或数据） |
| **解压后文本总和** | 建议不超过 5 MiB | `.html` + `.css` + `.js` + `.json` 合计超过 5 MiB 审计提示 WARN |
| **单条 Base64** | 解码后不超过 1 MiB | 超过 100 KiB 优先改为包内文件，超过 1 MiB 严禁内嵌 |

---

## 九、校验命令与打包方式

### 1. 官方审计脚本
官方提供纯标准库实现的审计脚本，可直接执行：
```bash
# Python 版本审计（支持检查产物目录或 zip 包）
python .skill/minitool-zip-builder/scripts/audit_artifact.py <dist目录或zip文件路径>

# Node.js 版本审计
node .skill/minitool-zip-builder/scripts/audit_artifact.mjs <dist目录或zip文件路径>
```

### 2. 打包要求（至关重要）
- **必须进入产物目录压缩目录“内容”，而不是压缩目录“本身”**。
- 正确操作：进入目录后，使解压后第一级直接呈现 `index.html`，绝不能出现 `dist/index.html` 这样的多层嵌套。
- 示例：
  ```bash
  # 进入构建输出目录并打包
  cd dist && python -c "import zipfile, glob; ..."
  ```

---

## 十、常见错误与阻塞项速查表

1. **入口层级错误**：`index.html` 不在 zip 顶层根目录，导致容器白屏无法识别。
2. **使用模块脚本**：使用了 `<script type="module">` 或在 JS 中使用 `import/export`，导致脚本静默不执行。
3. **使用了内联脚本/行内事件**：如 `<script>console.log(1)</script>` 或 `<button onclick="doSomething()">`，被容器 CSP 阻断拦截。
4. **外链资源未打包**：引入了 `https://fonts.googleapis.com/...` 或外链图片/脚本，导致离线环境下 404 或 CSP 阻断。
5. **Base64 格式错误**：调用 `writeTempFile` 时剥离了 `data:image/png;base64,` 前缀，导致接口解析失败。
6. **语法超出基线**：在未配置转译工具的情况下直接编写 ES2020+ 可选链等语法，导致旧版本 Android 61 内核语法解析崩溃。

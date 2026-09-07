# Skill 1.6.0 集中修订记录与冲突处理说明

> 项目：`su-shi-universe-xhs`  
> 文档编号：08  
> 版本：V1.1  
> 日期：2026-09-07  
> 作用：记录本轮基于 `minitool-zip-builder-1.6.0.skill` 对既有 docs/tasks 的集中校正结果。

---

## 一、本轮修订结论

Skill 1.6.0 已明确：本次比赛 MiniTool 的交付形态是**离线 H5 静态 ZIP 包**，运行在受限 WebView 沙箱中。

因此项目技术基线统一修订为：

> **Offline H5 + index.html ZIP 根入口 + CSP Safe + Classic Script + ES2017 / Chrome 61 + Local Assets/Data + Canvas 2D + window.xhs.miniTool Native Bridge。**

这一定义覆盖此前因公开小红书通用“小组件”资料而产生的 XHSML/单 Page/2 MiB 硬上限等假设。

---

## 二、已确认的关键纠正

| 原先可能存在的理解 | Skill 1.6.0 正式基线 | 处理 |
|---|---|---|
| 按传统 XHSML 小组件工程理解 | 离线 H5 静态 ZIP | 以 Skill 1.6.0 为准 |
| “只能一个小组件 Page” | H5 内可采用 SPA/逻辑视图切换 | 交互文档中的“页面”统一理解为逻辑视图 |
| 2 MiB 为绝对上限 | 10 MiB 为硬上限，2 MiB 为强烈推荐目标 | 内部预算仍以 ≤2 MiB 为目标 |
| 可按普通在线 Web 方式引用资源 | 禁止联网，所有关键资源必须入 ZIP | 全部离线化 |
| 可自由使用现代 JS | Chrome 61 / ES2017 基线 | 禁止未转译 ES2018+ 语法 |
| 可使用 ES Modules | 正式产物 Classic Script | 禁止 `type=module`、运行时 import/export |
| 可直接使用任意浏览器 API | Skill 明确禁用网络、Worker、定位、剪贴板等多类 API | 建立静态扫描与人工审计 |
| 可用下载链接导出卡片 | `<a download>` 禁止 | 改为 Native Bridge 保存/发布 |
| 平台 API 名称待定 | `window.xhs.miniTool.*` | 统一封装 XHSBridge |
| “宇宙”可考虑 WebGL | WebGL 有额外严格预算与恢复义务 | V1 默认不使用 WebGL |

---

## 三、docs 修订策略

### 01 总体设计方案

产品定位、用户价值、正向引导、核心闭环保持不变。

其中所有技术描述如与 Skill 1.6.0 冲突，统一由 `docs/07` 和新版 `docs/05` 覆盖。

### 02 内容数据规范

无原则性冲突。

补充执行原则：数据必须本地静态可读取，正式包避免巨型单文件；所有生产内容应在构建前完成审核。

### 03 产品信息架构与页面交互设计

产品信息架构保持不变。

从本轮起，文档中的“首页、测试页、结果页、宇宙页、站点详情页、今日东坡、分享卡页”均解释为：

> **同一离线 H5 应用中的逻辑视图/状态，而非传统小程序 Page 文件。**

允许使用轻量 hash/state router，但不得因此引入需要联网或大型运行时的路由依赖。

### 04 视觉设计规范

视觉风格保持不变。

新增实现边界：

- CSS / SVG / Canvas 2D 优先；
- V1 不使用 WebGL 作为正式视觉依赖；
- 系统字体优先；
- 少量高价值 WebP；
- Chrome 61 CSS 基线；
- Flex gap、aspect-ratio、clamp 等现代 CSS 必须有兼容回退；
- 整个 ZIP 推荐控制 ≤2 MiB。

### 05 技术架构与工程规范

需要升级为 V1.1，删除“待 Skill 确认”的占位性表达，正式固化 Offline H5 / Classic Script / Chrome 61 / Native Bridge / 审计脚本等规则。

### 06 内容审核与史料引用规范

无工程性冲突，保持有效。

### 07 Skill 1.6.0 工程硬约束摘要

本轮新增，作为当前比赛工程最高内部摘要。

---

## 四、tasks 修订策略

### 已执行任务1

不回写成“未执行”，不篡改历史。

由于任务1原本的目标就是读取 Skill 并建立工程，但其执行发生在这次集中修订之前，所以新增：

> **任务1.1 Skill 1.6.0 工程基线纠偏与首次产物审计 0.1**

任务1.1 必须检查已经实施的任务1产物是否存在：

- 错误工程类型；
- ES Module；
- 内联 JS；
- 网络请求；
- 不兼容 Chrome 61 的 JS/CSS；
- 非法 Bridge 调用；
- ZIP 根目录错误；
- 包体超预算；
- 不应进入正式包的开发文件。

如发现冲突，任务1.1 负责真实修改工程，而不是只写报告。

### 任务2

内容数据路线本身与 Skill 高度一致，不改核心目标。执行时继承 `docs/07`，避免巨型 JSON/JS 数据文件。

### 任务3

需要明确：应用框架按 Vanilla H5/ES2017 组件化思想实现，页面为逻辑视图；安全区采用 Skill 指定双兼容写法；不得默认使用框架路由或现代 CSS 特性。

### 任务4—9

产品目标保持不变；全部执行时继承 `docs/07` 的离线、ES2017、Classic Script、Chrome 61 和本地资源约束。

### 任务10

明确 Canvas 2D 为正式分享卡路线；限制 DPR/内存；Base64 仅作临时交接；禁止远程截图与 `<a download>`。

### 任务11

正式固化 `window.xhs.miniTool.*`，Bridge 统一封装；保存/发布链路使用 `writeTempFile`、`saveImageToPhotosAlbum`、`postNote` 等实际 Skill API。

### 任务12

新增 Chrome 61 CSS 兼容、Pointer Events、安全区双兼容、资源体积和 Canvas 清理门禁；V1 不新增 WebGL。

### 任务13

内容审核目标不变。

### 任务14

升级最终门禁：必须执行 Skill 自带 `audit_artifact.py` 或 `audit_artifact.mjs` 对 dist 与 ZIP 审计，并核查 ZIP 根 `index.html`、CSP、禁用 API、Classic Script、10 MiB 硬上限及 2 MiB 推荐目标。

---

## 五、统一版本控制规则

从本轮开始：

1. 已完成任务不因规范更新而改写为“未完成”；
2. 已执行产物与新规则冲突时，新建 `.1` 纠偏任务；
3. 未执行任务可以直接按最新基线执行；
4. 任务书旧表述如与 `docs/07` 冲突，以 `docs/07` 为准；
5. 后续如 Skill 升级到 1.6.1/1.7.0 等，再新增集中修订记录，不静默覆盖历史。

---

## 六、本轮新的 Foundation 顺序

```text
任务1（已执行）
↓
任务1.1｜Skill 1.6.0 工程纠偏与首次审计
↓
任务2｜内容数据底座
↓
任务3｜应用基础框架与视觉系统
↓
Milestone A｜Foundation Ready
```

**任务1.1 未通过前，不应直接进入后续正式业务开发。**

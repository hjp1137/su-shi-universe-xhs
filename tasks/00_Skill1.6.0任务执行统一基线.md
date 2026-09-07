# Skill 1.6.0 任务执行统一基线

> 项目：`su-shi-universe-xhs`  
> 版本：V1.1  
> 日期：2026-09-07  
> 适用：任务1.1及任务2—14，后续新增任务同样继承。

---

## 一、前置阅读

任何任务执行前，除任务书自身要求外，必须额外读取：

1. `docs/05_小红书小工具技术架构与工程规范.md` V1.1；
2. `docs/07_小红书MiniTool_Skill1.6.0工程硬约束摘要.md`；
3. `docs/08_Skill1.6.0集中修订记录与冲突处理说明.md`；
4. 当前工作区实际安装的官方 `SKILL.md`。

冲突时以当前官方 Skill 为最高依据。

---

## 二、统一工程硬约束

所有任务默认：

```text
交付形态：离线 H5 ZIP
入口：ZIP 根 index.html
运行：完全离线
JS：Classic Script / ES2017 / Chrome 61
CSP：禁止内联脚本、onclick、javascript: URI
data/assets：全部本地化
视觉：CSS + SVG + Canvas 2D 优先
平台能力：仅 window.xhs.miniTool.*
包体：≤10 MiB 硬门禁，≤2 MiB 项目推荐目标
```

禁止重新引入：

- `fetch` / XHR / WebSocket 等网络；
- ES Module runtime；
- Worker / ServiceWorker；
- WASM；
- `<a download>`；
- 远程 CDN / 字体 / 图片 / API；
- 未经证明必要的大型运行时依赖。

---

## 三、任务成果说明新增必填项

从任务1.1开始，每份成果说明都必须增加：

```text
## Skill 1.6.0 合规自检
- 是否新增网络调用：否/是（说明）
- 是否新增 ES2018+ 未转译语法：否/是（说明）
- 是否新增 module/import/export：否/是（说明）
- 是否新增内联 JS：否/是（说明）
- 是否新增被禁 Web API：否/是（说明）
- 是否新增本地静态资源：清单与大小
- 当前产物/资源体积变化：...
- Chrome 61 兼容检查：...
- 官方阶段性 audit：PASS/FAIL/未到阶段（说明）
```

---

## 四、历史任务处理

任务1已经执行，不因本文件而改写历史。

所有由任务1落地产生的 Skill 1.6.0 冲突，统一由：

> `任务1.1_Skill1.6.0工程基线纠偏与首次产物审计01.md`

负责修复。

任务1.1通过后，后续任务才允许以该工程作为有效 Foundation。
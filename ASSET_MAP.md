# 苏轼宇宙场景素材包 V1

## 使用原则

- `design-assets/source/scenes/`：原始 PNG，仅供美术裁切/二次处理，**不要进入最终 MiniTool ZIP**。
- `assets/images/scenes/`：已压缩运行时 WebP，可直接交给 Antigravity 接入前端。
- 运行时版本统一为 **720×960 / WebP / quality 74**，10 张合计约 **0.76 MiB**。
- 首页只预加载 `hero-home.webp`；其余站点图按进入页面/站点时加载。
- 同一张站点图应复用于：人生宇宙星球缩略图、站点详情头图、测试结果对应站点背景，避免重复素材。
- 图片上方建议叠加深靛蓝渐变/雾层，文字与按钮使用 DOM，不要把文字烘焙进图片。
- Three.js 只负责星轨、月光、雾、轻视差等氛围，不替代这些主视觉图。

## 文件映射

| 文件名 | 用途 | 运行时路径 | 大小约 |
|---|---|---|---:|
| `hero-home.webp` | 首页主视觉 | `assets/images/scenes/hero-home.webp` | 72.9 KB |
| `station-meishan.webp` | 眉山｜少年启程 | `assets/images/scenes/station-meishan.webp` | 105.5 KB |
| `station-jingshi.webp` | 京师｜意气与入世 | `assets/images/scenes/station-jingshi.webp` | 66.7 KB |
| `station-mizhou.webp` | 密州｜明月与思念 | `assets/images/scenes/station-mizhou.webp` | 55.2 KB |
| `station-wutai.webp` | 乌台｜风雨转折 | `assets/images/scenes/station-wutai.webp` | 57.4 KB |
| `station-huangzhou.webp` | 黄州｜低谷与重生 | `assets/images/scenes/station-huangzhou.webp` | 86.3 KB |
| `station-hangzhou.webp` | 杭州｜湖山与人间 | `assets/images/scenes/station-hangzhou.webp` | 78.3 KB |
| `station-huizhou.webp` | 惠州｜岭南烟火 | `assets/images/scenes/station-huizhou.webp` | 121.0 KB |
| `station-danzhou.webp` | 儋州｜海天与远星 | `assets/images/scenes/station-danzhou.webp` | 80.0 KB |
| `station-changzhou.webp` | 常州｜归于平静 | `assets/images/scenes/station-changzhou.webp` | 58.4 KB |

## 建议数据字段

在站点数据中增加：

```json
{
  "scene_image": "./assets/images/scenes/station-huangzhou.webp"
}
```

首页主视觉固定：

```js
var HOME_HERO_IMAGE = './assets/images/scenes/hero-home.webp';
```

## Antigravity 接入要求

1. 不重新生图。
2. 允许：裁切、压缩、轻微调色、局部遮罩、生成缩略图。
3. 禁止改变整体画风，禁止加入文字、水印、二维码。
4. 保证最终包中只进入 `assets/images/scenes/*.webp`，不复制 `design-assets/source/`。
5. 若重新压缩，优先保持 3:4 构图；常规展示不建议低于 600×800。

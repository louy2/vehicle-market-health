---
toc: false
---

# 出口与竞争格局

```js
const exports_data = FileAttachment("data/exports.csv").csv({typed: true});
const mfShare = FileAttachment("data/manufacturer-share.csv").csv({typed: true});
```

中国商用车出口近年呈爆发式增长，2025年首次突破100万辆（106万辆），从2019年的28.5万辆增长3.7倍。与此同时，国内市场竞争格局正在因新能源化而加速重塑。

---

## 商用车出口趋势（2019–2025）

```js
Plot.plot({
  width,
  height: 380,
  marginLeft: 55,
  marginBottom: 40,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "出口量（万辆）", grid: true, domain: [0, 120]},
  marks: [
    Plot.barY(exports_data, {
      x: "year", y: "cv_exports",
      fill: d => d.year === 2025 ? "#c41e3a" : "#4e79a7",
      tip: true,
      title: d => `${d.year}年: ${d.cv_exports}万辆\n同比: ${d.cv_exports_yoy_pct ?? '—'}%`
    }),
    Plot.line(exports_data, {
      x: "year", y: "cv_exports",
      stroke: "#333", strokeWidth: 1.5, strokeDasharray: "4,3",
      curve: "catmull-rom"
    }),
    Plot.text(exports_data, {
      x: "year", y: "cv_exports",
      text: d => d.cv_exports.toFixed(1),
      dy: -12, fontSize: 11, fontWeight: d => d.year >= 2024 ? 700 : 400
    }),
    Plot.ruleY([0])
  ]
})
```

<div class="note">2021–2022年为出口爆发的起步阶段，此后保持两位数高速增长。2025年出口量突破百万大关，创历史新高。数据来源：中汽协。</div>

---

## 商用车出口在整体汽车出口中的占比

```js
Plot.plot({
  width,
  height: 350,
  marginLeft: 55,
  marginBottom: 40,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "商用车占出口比（%）", grid: true, domain: [0, 30]},
  marks: [
    Plot.areaY(exports_data, {
      x: "year", y: "cv_share_of_exports_pct",
      fill: "#4e79a7", fillOpacity: 0.15,
      curve: "catmull-rom"
    }),
    Plot.line(exports_data, {
      x: "year", y: "cv_share_of_exports_pct",
      stroke: "#4e79a7", strokeWidth: 2.5,
      curve: "catmull-rom"
    }),
    Plot.dot(exports_data, {
      x: "year", y: "cv_share_of_exports_pct",
      fill: "#4e79a7", r: 5,
      tip: true,
      title: d => `${d.year}年\n商用车出口占比: ${d.cv_share_of_exports_pct}%\n商用车出口: ${d.cv_exports}万辆\n汽车总出口: ${d.total_auto_exports}万辆`
    }),
    Plot.text(exports_data, {
      x: "year", y: "cv_share_of_exports_pct",
      text: d => d.cv_share_of_exports_pct + "%",
      dy: -12, fontSize: 10, fontWeight: 600
    }),
    Plot.ruleY([0])
  ]
})
```

<div class="note">商用车占中国汽车总出口的比例约15–16%，低于2019年的23%，反映乘用车（特别是新能源乘用车）出口增速更快。数据来源：中汽协。</div>

---

## 主要出口目的地

<div class="grid-2">
<div class="card-section">
<h3>2024–2025年主要出口市场</h3>

| 排名 | 市场 | 趋势 |
|---:|------|------|
| 1 | 俄罗斯 | 最大单一市场 |
| 2 | 墨西哥 | 2025年份额领先 |
| 3 | 阿联酋 | 同比增长59% |
| 4 | 沙特阿拉伯 | 中东增长引擎 |
| 5 | 巴西 | 南美核心市场 |
| 6 | 菲律宾 | 东南亚增长点 |
| 7 | 比利时 | 欧洲中转港 |
| 8 | 澳大利亚 | 发达市场渗透 |

</div>
<div class="card-section">
<h3>出口结构特征</h3>

- **燃油车为主**：出口以传统燃油商用车为主，目的地集中在发展中国家
- **新兴电动出口**：部分电动客车和轻型电动物流车开始出口欧洲、中东
- **欧盟挑战**：欧盟反补贴调查对乘用车出口形成压力（2024年H1对欧盟乘用车出口同比−11.6%），商用车暂未受直接影响
- **区域多元化**：从过度依赖俄罗斯向中东、东南亚、南美多元化分散

</div>
</div>

---

## 国内竞争格局：牵引车市场份额（2025年）

```js
const tractorShare = mfShare.filter(d => d.segment === "Tractor Truck");
```

```js
Plot.plot({
  width,
  height: 400,
  marginLeft: 100,
  marginRight: 60,
  x: {label: "市场份额（%）", grid: true, domain: [0, 28]},
  marks: [
    Plot.barX(tractorShare, {
      y: "manufacturer", x: "share_pct",
      fill: d => d.manufacturer === "FAW Trucks" ? "#c41e3a" :
                 d.manufacturer === "Sinotruk" ? "#e8834f" :
                 d.manufacturer === "Others" ? "#ccc" : "#4e79a7",
      sort: {y: "-x"},
      tip: true,
      title: d => `${d.manufacturer}: ${d.share_pct}%`
    }),
    Plot.text(tractorShare, {
      y: "manufacturer", x: "share_pct",
      text: d => d.share_pct + "%",
      dx: 4, textAnchor: "start", fontSize: 11, fontWeight: 600
    }),
    Plot.ruleX([0])
  ]
})
```

<div class="note">2025年牵引车市场前十企业合计占比95.5%，集中度极高。一汽解放以22.9%居首，中国重汽18.1%紧随其后。XCMG、SANY等工程机械企业跨界进入并快速扩张。数据来源：中汽协、行业统计。</div>

---

## 中型卡车市场份额（2025年H1）

```js
const mediumShare = mfShare.filter(d => d.segment === "Medium Truck");
```

```js
Plot.plot({
  width,
  height: 380,
  marginLeft: 80,
  marginRight: 60,
  x: {label: "市场份额（%）", grid: true, domain: [0, 38]},
  marks: [
    Plot.barX(mediumShare, {
      y: "manufacturer", x: "share_pct",
      fill: d => d.manufacturer === "FAW Trucks" ? "#c41e3a" :
                 d.manufacturer === "Others" ? "#ccc" : "#4e79a7",
      sort: {y: "-x"},
      tip: true,
      title: d => `${d.manufacturer}: ${d.share_pct}%`
    }),
    Plot.text(mediumShare, {
      y: "manufacturer", x: "share_pct",
      text: d => d.share_pct + "%",
      dx: 4, textAnchor: "start", fontSize: 11, fontWeight: 600
    }),
    Plot.ruleX([0])
  ]
})
```

<div class="note">一汽解放在中型卡车市场份额超过30%，江淮和东风分列二三。中型卡车市场2025年H1总量约5.95万辆。数据来源：中汽协。</div>

---

## 竞争格局变化趋势

<div class="grid-2">
<div class="card-section">
<h3>新能源重塑格局</h3>

- **传统五强**（一汽、中国重汽、福田、东风、陕汽）占据重卡ICE市场80%份额
- **新玩家崛起**：XCMG（徐工）销量同比+148%，SANY（三一）快速扩张
- **新能源份额分散**：新能源赛道上，新锐品牌（北汽、远程汽车）具有先发优势
- **中国重汽**2025年H1市场份额27.6%，目标成为商用车"绝对龙头"

</div>
<div class="card-section">
<h3>重型卡车细分趋势</h3>

- **牵引车**：2025全年销量46万辆（+43%），新能源牵引车份额升至38.5%
- **自卸车**：新能源份额达23%（2025年H1）
- **工程车**：新能源份额约20%，电动搅拌车等增长显著
- **换电模式**：2024年换电重卡销量近3万辆，同比翻倍

</div>
</div>

<span class="source-tag">数据来源：中汽协、ICCT、中国卡车网、盖世汽车</span>

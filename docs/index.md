---
toc: false
---

<div class="hero">
  <h1>中国商用车市场健康度报告</h1>
  <h2>跟踪中国商用车市场产销量、新能源渗透率、出口走势的综合分析仪表盘。数据来源：中汽协（CAAM）、国际清洁交通委员会（ICCT）等权威公开数据。</h2>
</div>

```js
const annualSales = FileAttachment("data/annual-sales.csv").csv({typed: true});
const monthlySales = FileAttachment("data/monthly-sales.csv").csv({typed: true});
const typeBreakdown = FileAttachment("data/type-breakdown.csv").csv({typed: true});
const nevPenetration = FileAttachment("data/nev-penetration.csv").csv({typed: true});
const exports_data = FileAttachment("data/exports.csv").csv({typed: true});
```

## 核心指标（2025全年）

<div class="kpi-grid">
  <div class="kpi-card">
    <div class="label">商用车总销量</div>
    <div class="value">429.6万</div>
    <div class="delta positive">▲ 同比 +10.9%</div>
  </div>
  <div class="kpi-card">
    <div class="label">商用车总产量</div>
    <div class="value">426.1万</div>
    <div class="delta positive">▲ 同比 +12.0%</div>
  </div>
  <div class="kpi-card">
    <div class="label">新能源商用车渗透率</div>
    <div class="value">26.9%</div>
    <div class="delta positive">▲ 较2024年 +9.0个百分点</div>
  </div>
  <div class="kpi-card">
    <div class="label">商用车出口量</div>
    <div class="value">106万</div>
    <div class="delta positive">▲ 同比 +17.2%</div>
  </div>
  <div class="kpi-card">
    <div class="label">新能源商用车国内销量</div>
    <div class="value">87.1万</div>
    <div class="delta positive">▲ 同比 +63.7%</div>
  </div>
  <div class="kpi-card">
    <div class="label">市场判断</div>
    <div class="value" style="font-size:1.25rem;">强劲复苏</div>
    <div class="delta positive">重回400万辆以上</div>
  </div>
</div>

---

## 商用车年度产销趋势（2015–2025）

中国商用车市场于2020年达到513.3万辆的历史峰值，主要受国六排放标准切换前的抢购效应和基建投资刺激推动。2022年因疫情封控大幅下滑至330万辆，此后逐步恢复。2024年受运价低迷、投资减弱影响小幅回落，2025年在以旧换新政策、新能源渗透加速、出口增长带动下强劲反弹。

```js
Plot.plot({
  width,
  height: 400,
  marginLeft: 60,
  marginBottom: 40,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "销量（万辆）", grid: true, domain: [0, 560]},
  marks: [
    Plot.barY(annualSales, {
      x: "year",
      y: "sales",
      fill: d => d.year === 2025 ? "#c41e3a" : d.year === 2024 ? "#e8834f" : "#4e79a7",
      tip: true,
      title: d => `${d.year}年: ${d.sales}万辆\n同比: ${d.yoy_sales_pct ? d.yoy_sales_pct + '%' : '—'}`
    }),
    Plot.ruleY([0]),
    Plot.text(annualSales, {
      x: "year",
      y: "sales",
      text: d => d.sales.toFixed(1),
      dy: -10,
      fontSize: 11,
      fontWeight: d => d.year >= 2024 ? 700 : 400
    })
  ]
})
```

<div class="note">单位：万辆。红色 = 2025年（最新），橙色 = 2024年，蓝色 = 往年。数据来源：中汽协。</div>

---

## 月度销量对比：2024年 vs 2025年

```js
Plot.plot({
  width,
  height: 360,
  marginLeft: 55,
  x: {
    label: "月份",
    domain: [1,2,3,4,5,6,7,8,9,10,11,12],
    tickFormat: d => d + "月"
  },
  y: {label: "销量（万辆）", grid: true, domain: [20, 50]},
  marks: [
    Plot.line(monthlySales.filter(d => d.year === 2024), {
      x: "month", y: "sales", stroke: "#e8834f", strokeWidth: 2, curve: "catmull-rom"
    }),
    Plot.dot(monthlySales.filter(d => d.year === 2024), {
      x: "month", y: "sales", fill: "#e8834f", r: 4,
      tip: true, title: d => `2024年${d.month}月: ${d.sales}万辆`
    }),
    Plot.line(monthlySales.filter(d => d.year === 2025), {
      x: "month", y: "sales", stroke: "#c41e3a", strokeWidth: 2.5, curve: "catmull-rom"
    }),
    Plot.dot(monthlySales.filter(d => d.year === 2025), {
      x: "month", y: "sales", fill: "#c41e3a", r: 4,
      tip: true, title: d => `2025年${d.month}月: ${d.sales}万辆`
    }),
    Plot.text([{x: 8, y: 28, text: "2024年"}], {x: "x", y: "y", text: "text", fill: "#e8834f", fontWeight: 700}),
    Plot.text([{x: 8, y: 37, text: "2025年"}], {x: "x", y: "y", text: "text", fill: "#c41e3a", fontWeight: 700}),
    Plot.ruleY([0])
  ]
})
```

<div class="note">2025年多数月份销量高于2024年同期，尤其3月（季度末冲量）和12月（年底冲刺）表现突出。部分月度数据系根据中汽协累计数据推算。</div>

---

## 货车与客车销量结构

<div class="grid-2">
<div class="card-section">
<h3>货车与客车年度销量（万辆）</h3>

```js
Plot.plot({
  width: Math.min(width, 500),
  height: 320,
  marginLeft: 55,
  marginBottom: 40,
  x: {label: "年份", tickFormat: "d", domain: [2020, 2021, 2022, 2023, 2024, 2025]},
  y: {label: "销量（万辆）", grid: true},
  color: {legend: true, domain: ["Truck", "Bus"], range: ["#4e79a7", "#f28e2c"]},
  marks: [
    Plot.barY(typeBreakdown, {
      x: "year", y: "sales", fill: "type", tip: true,
      title: d => `${d.year}年 ${d.type === 'Truck' ? '货车' : '客车'}: ${d.sales}万辆\n同比: ${d.yoy_pct ?? '—'}%`
    }),
    Plot.ruleY([0])
  ]
})
```

</div>
<div class="card-section">
<h3>2025年货车/客车占比</h3>

```js
Plot.plot({
  width: Math.min(width, 500),
  height: 320,
  marginLeft: 10,
  marks: [
    Plot.barX(
      typeBreakdown.filter(d => d.year === 2025),
      {
        y: d => d.type === 'Truck' ? '货车' : '客车',
        x: "sales",
        fill: "type",
        tip: true,
        title: d => `${d.type === 'Truck' ? '货车' : '客车'}: ${d.sales}万辆 — ${(d.sales / 429.6 * 100).toFixed(1)}%`
      }
    ),
    Plot.text(
      typeBreakdown.filter(d => d.year === 2025),
      {
        y: d => d.type === 'Truck' ? '货车' : '客车',
        x: "sales",
        text: d => `${d.sales}万辆 — ${(d.sales / 429.6 * 100).toFixed(1)}%`,
        dx: 5,
        textAnchor: "start",
        fontWeight: 600
      }
    ),
    Plot.ruleX([0])
  ]
})
```

</div>
</div>

<div class="note">货车占商用车销量约88%，是主要的周期性波动来源。客车销量近年稳定在50万辆左右。数据来源：中汽协。</div>

---

## 商用车出口增长

```js
Plot.plot({
  width,
  height: 350,
  marginLeft: 55,
  marginBottom: 40,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "出口量（万辆）", grid: true},
  marks: [
    Plot.barY(exports_data, {
      x: "year", y: "cv_exports",
      fill: d => d.year === 2025 ? "#c41e3a" : "#4e79a7",
      tip: true,
      title: d => `${d.year}年: ${d.cv_exports}万辆\n同比: ${d.cv_exports_yoy_pct ?? '—'}%`
    }),
    Plot.text(exports_data, {
      x: "year", y: "cv_exports",
      text: d => d.cv_exports.toFixed(1),
      dy: -10, fontSize: 11, fontWeight: d => d.year >= 2024 ? 700 : 400
    }),
    Plot.ruleY([0])
  ]
})
```

<div class="note">2025年中国商用车出口首次突破100万辆大关。主要出口市场包括俄罗斯、墨西哥、阿联酋、东南亚及非洲。数据来源：中汽协。</div>

---

## 形势综述

**2024年**是中国商用车市场承压的一年，全年销量387.3万辆（同比−3.9%），未能达到市场预期的400万辆门槛。主要制约因素：
- 国内基建投资增速放缓
- 公路货运运价持续低迷，车辆换购需求不足
- 房地产行业低迷拖累工程车需求

**2025年**市场明显回暖，全年产销双双实现两位数增长，销量429.6万辆（同比+10.9%）。核心驱动力：
- 政府扩大"以旧换新"补贴政策范围
- 新能源商用车快速渗透（渗透率升至26.9%）
- 出口首次突破百万辆（106万辆，同比+17.2%）
- 牵引车市场大幅回暖（全年+43%），物流需求恢复

**2026年展望：** 中汽协预计2026年汽车总销量约3,475万辆（同比+1%）。商用车市场预计保持稳定，新能源渗透继续深化、基建支出持续、出口保持增长，但部分购置税优惠收窄可能限制上行空间。

<span class="source-tag">数据来源：中汽协、ICCT、中国日报、盖世汽车、IEEFA</span>

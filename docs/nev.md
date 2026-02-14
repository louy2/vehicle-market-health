---
toc: false
---

# 新能源商用车转型

```js
const nevPenetration = FileAttachment("data/nev-penetration.csv").csv({typed: true});
const nevBySegment = FileAttachment("data/nev-by-segment.csv").csv({typed: true});
const hdtPowertrain = FileAttachment("data/hdt-powertrain.csv").csv({typed: true});
```

中国商用车新能源转型正在加速。2025年，新能源商用车国内销量达87.1万辆，同比增长63.7%，渗透率从2024年的17.9%跃升至26.9%。这一转型在城市公交领域已接近完成，重型卡车和物流车领域正快速推进。

---

## 新能源商用车渗透率趋势（2019–2025）

```js
Plot.plot({
  width,
  height: 400,
  marginLeft: 55,
  marginBottom: 40,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "渗透率（%）", grid: true, domain: [0, 32]},
  marks: [
    Plot.areaY(nevPenetration, {
      x: "year", y: "penetration_pct",
      fill: "#c41e3a", fillOpacity: 0.15,
      curve: "catmull-rom"
    }),
    Plot.line(nevPenetration, {
      x: "year", y: "penetration_pct",
      stroke: "#c41e3a", strokeWidth: 2.5,
      curve: "catmull-rom"
    }),
    Plot.dot(nevPenetration, {
      x: "year", y: "penetration_pct",
      fill: "#c41e3a", r: 5,
      tip: true,
      title: d => `${d.year}年\n新能源渗透率: ${d.penetration_pct}%\n新能源销量: ${d.nev_cv_domestic_sales}万辆`
    }),
    Plot.text(nevPenetration, {
      x: "year", y: "penetration_pct",
      text: d => d.penetration_pct + "%",
      dy: -14, fontSize: 11, fontWeight: 600
    }),
    Plot.ruleY([0])
  ]
})
```

<div class="note">渗透率 = 新能源商用车国内销量 / 商用车国内总销量。城市公交已接近100%电动化，此指标反映整体商用车市场。数据来源：中汽协。</div>

---

## 新能源商用车国内销量

```js
Plot.plot({
  width,
  height: 350,
  marginLeft: 55,
  marginBottom: 40,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "销量（万辆）", grid: true},
  marks: [
    Plot.barY(nevPenetration, {
      x: "year", y: "nev_cv_domestic_sales",
      fill: d => d.year === 2025 ? "#22a553" : "#4e9a72",
      tip: true,
      title: d => `${d.year}年: ${d.nev_cv_domestic_sales}万辆\n同比: ${d.nev_yoy_pct ?? '—'}%`
    }),
    Plot.text(nevPenetration, {
      x: "year", y: "nev_cv_domestic_sales",
      text: d => d.nev_cv_domestic_sales.toFixed(1),
      dy: -10, fontSize: 11, fontWeight: d => d.year >= 2024 ? 700 : 400
    }),
    Plot.ruleY([0])
  ]
})
```

---

## 各细分市场新能源渗透率对比（2024 vs 2025）

```js
Plot.plot({
  width,
  height: 380,
  marginLeft: 80,
  marginRight: 60,
  x: {label: "新能源渗透率（%）", grid: true, domain: [0, 105]},
  color: {legend: true, domain: [2024, 2025], range: ["#e8834f", "#22a553"]},
  fy: {label: null},
  marks: [
    Plot.barX(nevBySegment, {
      fy: "segment",
      x: "penetration_pct",
      fill: "year",
      tip: true,
      title: d => `${d.year}年 ${d.segment}\n渗透率: ${d.penetration_pct}%\n新能源销量: ${d.nev_sales_k}千辆`
    }),
    Plot.text(nevBySegment, {
      fy: "segment",
      x: "penetration_pct",
      text: d => d.penetration_pct + "%",
      dx: 3,
      textAnchor: "start",
      fontSize: 10,
      fontWeight: 600
    }),
    Plot.ruleX([0])
  ]
})
```

<div class="note">城市公交（City Bus）电动化率已接近100%。重型卡车（Heavy Truck）渗透率从2024年的9.1%大幅提升至2025年的25%，变化最为显著。轻卡（Light Truck）渗透率提升至28%。数据来源：中汽协、ICCT。</div>

---

## 重型卡车动力类型结构变化

```js
const powertrainData = hdtPowertrain.flatMap(d => [
  {period: `${d.year} ${d.period}`, type: "柴油", pct: d.diesel_pct, order: 1},
  {period: `${d.year} ${d.period}`, type: "天然气", pct: d.natural_gas_pct, order: 2},
  {period: `${d.year} ${d.period}`, type: "纯电动", pct: d.battery_electric_pct, order: 3},
  {period: `${d.year} ${d.period}`, type: "燃料电池/其他", pct: d.fuel_cell_pct + d.other_pct, order: 4}
]);
```

```js
Plot.plot({
  width,
  height: 380,
  marginLeft: 100,
  marginBottom: 40,
  x: {label: "市场份额（%）", domain: [0, 100]},
  y: {label: null},
  color: {
    legend: true,
    domain: ["柴油", "天然气", "纯电动", "燃料电池/其他"],
    range: ["#888", "#f28e2c", "#22a553", "#af7aa1"]
  },
  marks: [
    Plot.barX(powertrainData, {
      y: "period", x: "pct", fill: "type",
      sort: {y: null},
      tip: true,
      title: d => `${d.period}\n${d.type}: ${d.pct}%`
    }),
    Plot.ruleX([0])
  ]
})
```

<div class="note">重型卡车市场正经历深刻的动力结构变革。柴油份额从2023年的73%降至2025年的47%，纯电动从8.5%升至29%。天然气重卡维持在23–25%份额。2025年12月，电动牵引车单月销量首次超过柴油。数据来源：ICCT、IEEFA、中汽协。</div>

---

## 关键趋势

<div class="grid-2">
<div class="card-section">
<h3>电动重卡经济性</h3>

尽管购置成本高出62%–255%，电动重卡的**全生命周期成本（TCO）比柴油重卡低10%–26%**（IEEFA，2025年5月）。换电模式进一步降低初始投入门槛：2024年具备换电功能的重型商用车销量近3万辆，同比翻倍。

</div>
<div class="card-section">
<h3>政策与展望</h3>

- **以旧换新**：扩大补贴范围覆盖更多商用车车型
- **排放标准**：国七标准预研推动提前置换
- **预期**：行业龙头预计2028年电动重卡市场份额达50%–80%
- **风险**：2026年购置税优惠从全免调为减半，可能抑制部分需求

</div>
</div>

<span class="source-tag">数据来源：中汽协、ICCT、IEEFA、CleanTechnica</span>

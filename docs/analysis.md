---
toc: true
---

# 中国商用车市场健康度：形势分析

```js
const annualSales = FileAttachment("data/annual-sales.csv").csv({typed: true});
const nevPenetration = FileAttachment("data/nev-penetration.csv").csv({typed: true});
const exports_data = FileAttachment("data/exports.csv").csv({typed: true});
const hdtPowertrain = FileAttachment("data/hdt-powertrain.csv").csv({typed: true});
const typeBreakdown = FileAttachment("data/type-breakdown.csv").csv({typed: true});
const monthlySales = FileAttachment("data/monthly-sales.csv").csv({typed: true});
const fiscalIndicators = FileAttachment("data/fiscal-indicators.csv").csv({typed: true});
const lgfvDebt = FileAttachment("data/lgfv-debt.csv").csv({typed: true});
const hdtDemand = FileAttachment("data/hdt-demand-structure.csv").csv({typed: true});
```

<div class="hero">
<h2>一个正在被三股力量重塑的市场：周期复苏、能源革命、全球化扩张</h2>
</div>

---

## 一、总体判断：复苏已确认，但尚未回到巅峰

中国商用车市场在经历了2022年的断崖式下跌和2024年的二次探底后，于2025年交出了一份令人欣慰的答卷。全年产销分别达到426.1万辆和429.6万辆，同比增长12.0%和10.9%——这是自2023年以来首次重回400万辆以上的关口。

```js
Plot.plot({
  width,
  height: 340,
  marginLeft: 55,
  marginBottom: 40,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "销量（万辆）", grid: true, domain: [0, 560]},
  marks: [
    Plot.barY(annualSales, {
      x: "year", y: "sales",
      fill: d => d.year === 2025 ? "#c41e3a" : d.year === 2020 ? "#2a6496" : d.sales > 420 ? "#4e79a7" : "#8fafc8",
      tip: true,
      title: d => `${d.year}年: ${d.sales}万辆 (${d.yoy_sales_pct ? (d.yoy_sales_pct > 0 ? '+' : '') + d.yoy_sales_pct + '%' : '—'})`
    }),
    Plot.ruleY([0]),
    Plot.ruleY([400], {stroke: "#c41e3a", strokeDasharray: "4,3", strokeWidth: 1}),
    Plot.text([{x: 2016, y: 410, text: "400万辆线"}], {x: "x", y: "y", text: "text", fill: "#c41e3a", fontSize: 10})
  ]
})
```

但必须冷静地看到：2025年的429.6万辆仍远低于2020年513.3万辆的历史峰值（差距约16%），也未能回到2018年437.1万辆的前疫情高点。换言之，**市场在恢复，但并不算强劲**——中国商用车市场的体量仍然处于2017年的水平。

这个判断隐含一个重要结论：**中国商用车市场的长期增长中枢可能已经下移**。2020年的巅峰是多重一次性因素叠加的结果（国六标准切换前抢购、疫后基建刺激、换电补贴等），并不代表市场的可持续水平。从十年维度来看，年销400–440万辆可能才是中国商用车市场的"新常态"。

---

## 二、周期分析：三次震荡揭示市场本质

回顾2015年以来的十一年数据，中国商用车市场经历了三次明显的大幅波动：

```js
const cycleData = annualSales.map((d, i, arr) => ({
  ...d,
  phase: d.year <= 2016 ? "底部盘整" :
         d.year <= 2018 ? "国六预期上行" :
         d.year <= 2020 ? "政策刺激巅峰" :
         d.year <= 2022 ? "需求塌方" :
         d.year <= 2024 ? "弱复苏" : "新能源驱动回升"
}));
```

```js
Plot.plot({
  width,
  height: 340,
  marginLeft: 55,
  marginBottom: 40,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "同比增速（%）", grid: true},
  marks: [
    Plot.barY(annualSales.filter(d => d.yoy_sales_pct != null), {
      x: "year", y: "yoy_sales_pct",
      fill: d => d.yoy_sales_pct >= 0 ? "#22a553" : "#e8384f",
      tip: true,
      title: d => `${d.year}年: ${d.yoy_sales_pct > 0 ? '+' : ''}${d.yoy_sales_pct}%`
    }),
    Plot.ruleY([0], {strokeWidth: 1.5}),
    Plot.text(annualSales.filter(d => d.yoy_sales_pct != null), {
      x: "year", y: "yoy_sales_pct",
      text: d => (d.yoy_sales_pct > 0 ? "+" : "") + d.yoy_sales_pct + "%",
      dy: d => d.yoy_sales_pct >= 0 ? -10 : 12,
      fontSize: 10, fontWeight: 600
    })
  ]
})
```

**第一次：2020年的"国六泡沫"**（+18.7%）。2020年7月1日国六排放标准全面实施的预期，叠加疫后基建"六稳六保"刺激，造成大量提前购车需求，推动销量至513.3万辆的历史高点。这本质上是"寅吃卯粮"。

**第二次：2022年的"疫情塌方"**（−31.1%）。上海封城等严格防控措施几乎冻结了物流和基建活动。4月单月商用车销量暴跌60.5%至仅约21.6万辆。全年330.0万辆是近十年最低水平。

**第三次：2025年的"结构性反弹"**（+10.9%）。这一次的复苏与前两次有本质不同——不再是单纯的政策刺激和需求透支，而是由新能源替代需求、出口增长、以旧换新补贴三个结构性因素共同驱动。

这三次震荡揭示了中国商用车市场的一个核心特征：**这是一个高度政策敏感、强周期性的市场**。排放标准切换、基建投资节奏、补贴政策窗口期——每一个政策变量都会引发剧烈的需求波动。理解这一点，是判断未来走势的关键前提。

---

## 三、新能源：最重要的结构性变量

如果只能用一个指标来衡量中国商用车市场的健康度，我会选择**新能源渗透率**。它不仅反映了市场的技术升级水平，更折射出产业链的国际竞争力和长期增长潜力。

```js
Plot.plot({
  width,
  height: 320,
  marginLeft: 55,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "渗透率（%）", grid: true, domain: [0, 32]},
  marks: [
    Plot.areaY(nevPenetration, {
      x: "year", y: "penetration_pct",
      fill: "#22a553", fillOpacity: 0.12, curve: "catmull-rom"
    }),
    Plot.line(nevPenetration, {
      x: "year", y: "penetration_pct",
      stroke: "#22a553", strokeWidth: 2.5, curve: "catmull-rom"
    }),
    Plot.dot(nevPenetration, {
      x: "year", y: "penetration_pct",
      fill: "#22a553", r: 5,
      tip: true,
      title: d => `${d.year}年\n渗透率: ${d.penetration_pct}%\n新能源销量: ${d.nev_cv_domestic_sales}万辆`
    }),
    Plot.text(nevPenetration, {
      x: "year", y: "penetration_pct",
      text: d => d.penetration_pct + "%",
      dy: -14, fontSize: 11, fontWeight: 600, fill: "#22a553"
    }),
    Plot.ruleY([0])
  ]
})
```

从1.2%到26.9%——中国商用车新能源渗透率在六年内增长了22倍。但比数字更重要的是三个质变：

### 3.1 城市公交：电动化已接近完成

中国城市公交车的电动化率已达到约99%。深圳、北京、上海等城市的新增公交车几乎100%为纯电动。这个细分市场的转型已不再是"趋势"，而是"既成事实"。它为后续的物流车、重卡电动化提供了示范效应和充换电基础设施。

### 3.2 重型卡车：柴油时代正在终结

这是最引人注目的变化。2025年12月，中国电动牵引车的单月销量**首次超过了柴油牵引车**。虽然这部分受到年底冲量的影响，但趋势已不可逆：

```js
const powertrainNarrative = [
  {period: "2023年", diesel: 73, gas: 18, electric: 8.5, fuelcell: 0.5},
  {period: "2024年", diesel: 64, gas: 23, electric: 12, fuelcell: 1},
  {period: "2025年", diesel: 47, gas: 23, electric: 29, fuelcell: 1}
].flatMap(d => [
  {period: d.period, type: "柴油", pct: d.diesel},
  {period: d.period, type: "天然气", pct: d.gas},
  {period: d.period, type: "纯电动", pct: d.electric},
  {period: d.period, type: "氢燃料/其他", pct: d.fuelcell}
]);
```

```js
Plot.plot({
  width,
  height: 300,
  marginLeft: 80,
  x: {label: "市场份额（%）", domain: [0, 100]},
  color: {
    legend: true,
    domain: ["柴油", "天然气", "纯电动", "氢燃料/其他"],
    range: ["#666", "#f28e2c", "#22a553", "#af7aa1"]
  },
  marks: [
    Plot.barX(powertrainNarrative, {
      y: "period", x: "pct", fill: "type",
      sort: {y: null},
      tip: true,
      title: d => `${d.period} ${d.type}: ${d.pct}%`
    }),
    Plot.ruleX([0])
  ]
})
```

柴油重卡的市场份额从2023年的73%骤降至2025年的47%——两年缩水了26个百分点。**这不是渐进式的替代，而是雪崩式的转换**。背后的经济逻辑很简单：IEEFA的研究显示，尽管电动重卡的购置成本高出62%–255%，但其全生命周期成本（TCO）比柴油重卡低10%–26%。当算经济账的天平倾斜，市场的选择就不再犹豫。

### 3.3 换电模式：破解电动重卡的"最后一道坎"

电动重卡最大的落地障碍是充电时间长和电池成本高。换电模式正在化解这个瓶颈：2024年具备换电功能的重卡销量近3万辆，同比翻倍。宁德时代的"骐骥换电"和协鑫能科的换电网络正在形成可复制的商业模式。如果换电基础设施的覆盖密度达到临界点，电动重卡的渗透将进一步加速。

---

## 四、出口：第二增长曲线已经确立

```js
Plot.plot({
  width,
  height: 300,
  marginLeft: 55,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "出口量（万辆）", grid: true},
  marks: [
    Plot.areaY(exports_data, {
      x: "year", y: "cv_exports",
      fill: "#4e79a7", fillOpacity: 0.12, curve: "catmull-rom"
    }),
    Plot.line(exports_data, {
      x: "year", y: "cv_exports",
      stroke: "#4e79a7", strokeWidth: 2.5, curve: "catmull-rom"
    }),
    Plot.dot(exports_data, {
      x: "year", y: "cv_exports", fill: "#4e79a7", r: 5,
      tip: true,
      title: d => `${d.year}年: ${d.cv_exports}万辆 (${d.cv_exports_yoy_pct ? '+' + d.cv_exports_yoy_pct + '%' : '—'})`
    }),
    Plot.text(exports_data, {
      x: "year", y: "cv_exports",
      text: d => d.cv_exports.toFixed(1),
      dy: -14, fontSize: 11, fontWeight: 600
    }),
    Plot.ruleY([0])
  ]
})
```

2025年中国商用车出口首次突破100万辆（106万辆），是2019年的4.5倍。出口已经从"锦上添花"变成了支撑市场的"关键引擎"——如果剔除出口，2025年的国内销量约为323.6万辆，增长态势远没有总量数据那么亮眼。

这引出一个重要问题：**出口增长是否可持续？**

乐观的一面：
- 中国商用车在性价比上具有强大竞争力，尤其在中低端市场几乎没有对手
- 新能源商用车的出口正在起步，中国在电动客车和物流车领域有技术先发优势
- 一带一路沿线国家的基建需求持续释放

需要警惕的风险：
- **俄罗斯依赖度过高**——作为最大单一出口市场，地缘政治风险不容忽视
- **欧盟反补贴调查的溢出效应**——虽然目前主要针对乘用车，但贸易摩擦有向商用车蔓延的可能
- **目的地国的本地化要求**——部分国家已开始要求CKD（散件组装）模式而非整车出口，挤压出口利润

总体而言，出口增长的大趋势未变，但年增17%的高增速难以长期持续。预计未来3–5年出口增速将逐步回落至个位数。

---

## 五、财政敞口分析：商用车市场的"隐性地基"

在讨论新能源和出口这些令人振奋的结构性亮点之前，有必要正视中国商用车市场最大的系统性风险——**对公共支出的高度依赖**。基建投资、房地产开发、市政采购——这些由财政资金驱动的需求构成了商用车市场的"隐性地基"。而这块地基正在松动。

### 5.1 暴露度测算：多少需求来自"政府的钱"？

中国商用车需求与公共支出的关联比表面数字显示的更深。我们从三个层面量化这一敞口：

**直接敞口（~10–15%）：** 工程类商用车——自卸车、搅拌车、泵车、起重车——几乎完全依赖基建和房地产投资。这部分车型占重卡市场的份额已从2020年峰值的30%萎缩至2024年的约10%。

```js
Plot.plot({
  width,
  height: 300,
  marginLeft: 55,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "占比（%）", grid: true, domain: [0, 65]},
  marks: [
    Plot.areaY(hdtDemand, {
      x: "year", y: "engineering_vehicle_share_pct",
      fill: "#e15759", fillOpacity: 0.12, curve: "catmull-rom"
    }),
    Plot.line(hdtDemand, {
      x: "year", y: "engineering_vehicle_share_pct",
      stroke: "#e15759", strokeWidth: 2.5, curve: "catmull-rom"
    }),
    Plot.dot(hdtDemand, {
      x: "year", y: "engineering_vehicle_share_pct",
      fill: "#e15759", r: 5,
      tip: true,
      title: d => `${d.year}年\n工程车占比: ${d.engineering_vehicle_share_pct}%\n重卡总量: ${d.hdt_total_k_units / 10}万辆`
    }),
    Plot.text(hdtDemand, {
      x: "year", y: "engineering_vehicle_share_pct",
      text: d => d.engineering_vehicle_share_pct + "%",
      dy: -14, fontSize: 11, fontWeight: 600, fill: "#e15759"
    }),
    Plot.line(hdtDemand, {
      x: "year", y: "tractor_share_pct",
      stroke: "#4e79a7", strokeWidth: 2, strokeDasharray: "4,3", curve: "catmull-rom"
    }),
    Plot.dot(hdtDemand, {
      x: "year", y: "tractor_share_pct",
      fill: "#4e79a7", r: 4
    }),
    Plot.text([{x: 2024.5, y: 54, text: "牵引车占比"}], {x: "x", y: "y", text: "text", fill: "#4e79a7", fontSize: 10}),
    Plot.text([{x: 2024.5, y: 13, text: "工程车占比"}], {x: "x", y: "y", text: "text", fill: "#e15759", fontSize: 10}),
    Plot.ruleY([0])
  ]
})
```

**间接敞口（~15–20%）：** 为基建工程运送水泥、钢材、砂石的物流重卡，以及市政环卫车、公交客车等公共采购车辆。这部分需求虽然不直接体现为"工程车"，但其货源高度依赖财政拨款项目。

**二阶效应（难以精确量化）：** 基建投资通过GDP乘数效应拉动整体经济活动，进而带动消费品物流需求。IMF测算中国基建投资的财政乘数约为0.84–2.0（且逐年递减），意味着每1元基建投资可拉动0.84–2.0元的GDP增长，间接支撑货运需求。

**综合评估：中国重卡市场约25–35%的需求直接或间接与公共支出挂钩。** 如果计入二阶效应，这一比例可能接近40%。

### 5.2 财政的"三重困境"

理解商用车的财政风险敞口，需要理解地方政府正面临的三重困境：

#### 困境一：土地财政瓦解

```js
Plot.plot({
  width,
  height: 300,
  marginLeft: 55,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "土地出让收入（万亿元）", grid: true, domain: [0, 10]},
  marks: [
    Plot.barY(lgfvDebt.filter(d => d.year >= 2019), {
      x: "year", y: d => {
        const fiscal = fiscalIndicators.find(f => f.year === d.year);
        return fiscal ? fiscal.land_sales_revenue_cny_t : null;
      },
      fill: d => d.year >= 2022 ? "#e15759" : "#4e79a7",
      tip: true,
      title: d => {
        const fiscal = fiscalIndicators.find(f => f.year === d.year);
        return `${d.year}年: ${fiscal ? fiscal.land_sales_revenue_cny_t : '—'}万亿元`;
      }
    }),
    Plot.ruleY([0]),
    Plot.text([{x: 2021, y: 9.2, text: "▲ 峰值 8.7万亿"}], {x: "x", y: "y", text: "text", fill: "#333", fontSize: 10}),
    Plot.text([{x: 2025, y: 4.7, text: "腰斩"}], {x: "x", y: "y", text: "text", fill: "#e15759", fontSize: 11, fontWeight: 700})
  ]
})
```

地方政府曾经最可靠的收入来源——土地出让金——已从2021年峰值的8.7万亿元暴跌至2025年的约4.15万亿元，累计跌幅超过**52%**。土地相关收入占地方财政收入的比例从2021年的38%降至2025年的约22%。这不是周期性波动，而是**结构性崩塌**——房地产市场的长期调整意味着土地财政模式已不可逆地走向终结。

#### 困境二：隐性债务的"灰犀牛"

```js
Plot.plot({
  width,
  height: 320,
  marginLeft: 55,
  marginRight: 55,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "城投债余额（万亿元）", grid: true, domain: [0, 75]},
  marks: [
    Plot.areaY(lgfvDebt, {
      x: "year", y: "lgfv_debt_cny_t",
      fill: "#e15759", fillOpacity: 0.08, curve: "catmull-rom"
    }),
    Plot.line(lgfvDebt, {
      x: "year", y: "lgfv_debt_cny_t",
      stroke: "#e15759", strokeWidth: 2.5, curve: "catmull-rom"
    }),
    Plot.dot(lgfvDebt, {
      x: "year", y: "lgfv_debt_cny_t",
      fill: "#e15759", r: 5,
      tip: true,
      title: d => `${d.year}年\n城投债: ${d.lgfv_debt_cny_t}万亿元\n占GDP: ${d.lgfv_debt_gdp_pct}%`
    }),
    Plot.line(lgfvDebt, {
      x: "year", y: d => d.govt_debt_gdp_pct * 0.6,
      stroke: "#666", strokeWidth: 1.5, strokeDasharray: "4,3", curve: "catmull-rom"
    }),
    Plot.text(lgfvDebt.filter(d => d.year === 2025), {
      x: "year", y: "lgfv_debt_cny_t",
      text: d => d.lgfv_debt_cny_t + "万亿",
      dx: -40, dy: -12, fontSize: 11, fontWeight: 600, fill: "#e15759"
    }),
    Plot.text([{x: 2024, y: 62, text: "广义政府债务/GDP（右轴概念）"}], {x: "x", y: "y", text: "text", fill: "#666", fontSize: 9}),
    Plot.ruleY([0])
  ]
})
```

地方政府融资平台（LGFV）债务余额已膨胀至约**66万亿元**，相当于GDP的50%。Rhodium Group的研究显示，**超过五分之四的城投平台无法以自身收入覆盖利息支出**——中位数资产回报率仅1%，而平均债务利率高达5.36%。

中央的6万亿元债务置换方案本质上是"借新还旧"——降低利息负担、延长还款期限，但并未消灭债务本身。更令人担忧的是，部分地方政府正在通过新设"文旅投资公司"（CTIC）复制城投的老路，隐性债务有变形再生的风险。

#### 困境三：财政空间的"悖论"

```js
const fiscalDual = fiscalIndicators.filter(d => d.year >= 2019).flatMap(d => [
  {year: d.year, type: "基建投资增速", value: d.infra_investment_growth_pct},
  {year: d.year, type: "房地产投资增速", value: d.property_investment_growth_pct}
]);
```

```js
Plot.plot({
  width,
  height: 300,
  marginLeft: 55,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "同比增速（%）", grid: true},
  color: {legend: true, domain: ["基建投资增速", "房地产投资增速"], range: ["#4e79a7", "#e15759"]},
  marks: [
    Plot.line(fiscalDual, {
      x: "year", y: "value", stroke: "type", strokeWidth: 2.5, curve: "catmull-rom"
    }),
    Plot.dot(fiscalDual, {
      x: "year", y: "value", fill: "type", r: 5,
      tip: true,
      title: d => `${d.year}${d.year.toString().includes('E') ? '（预测）' : ''}年\n${d.type}: ${d.value > 0 ? '+' : ''}${d.value}%`
    }),
    Plot.ruleY([0], {strokeWidth: 1.5}),
    Plot.text([{x: 2026, y: 9.5, text: "2026E"}], {x: "x", y: "y", text: "text", fill: "#4e79a7", fontSize: 10}),
    Plot.text([{x: 2026, y: -6.5, text: "2026E"}], {x: "x", y: "y", text: "text", fill: "#e15759", fontSize: 10})
  ]
})
```

这组数据揭示了一个深层悖论：**需要花钱的地方越来越多，能花的钱却越来越少。**

2025年发生了一件前所未有的事：基建投资全年增速**转负**（−2.2%），而这还是在财政赤字率创历史新高（4%）、专项债发行4.4万亿元的背景下发生的。这意味着**积极的财政政策正在被地方政府的偿债压力所吞噬**——大量新增债务被用来偿还旧债，而非投入新项目。

IMF与多家机构的研究一致发现：中国基建投资的**财政乘数正在递减**——从2005年前后的约3倍降至近年的不到2倍。同样1元的财政支出，对GDP和货运需求的拉动效果越来越弱。

### 5.3 历史相关性正在脱钩——但这不全是好消息

```js
const correlationData = hdtDemand.map(d => {
  const fiscal = fiscalIndicators.find(f => f.year === d.year);
  return {
    year: d.year,
    hdt_total_k: d.hdt_total_k_units,
    infra_growth: fiscal ? fiscal.infra_investment_growth_pct : null,
    export_share: d.hdt_export_share_pct
  };
}).filter(d => d.infra_growth != null);
```

```js
Plot.plot({
  width,
  height: 340,
  marginLeft: 55,
  marginRight: 55,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "重卡销量（千辆）", grid: true, domain: [0, 1800]},
  marks: [
    Plot.barY(correlationData, {
      x: "year", y: "hdt_total_k",
      fill: d => d.year === 2025 ? "#c41e3a" : "#4e79a7",
      fillOpacity: 0.7,
      tip: true,
      title: d => `${d.year}年\n重卡销量: ${(d.hdt_total_k / 10).toFixed(1)}万辆\n基建投资增速: ${d.infra_growth > 0 ? '+' : ''}${d.infra_growth}%\n出口占比: ${d.export_share}%`
    }),
    Plot.line(correlationData, {
      x: "year", y: d => (d.infra_growth + 5) * 80,
      stroke: "#e15759", strokeWidth: 2, strokeDasharray: "6,3", curve: "catmull-rom"
    }),
    Plot.dot(correlationData, {
      x: "year", y: d => (d.infra_growth + 5) * 80,
      fill: "#e15759", r: 4
    }),
    Plot.text([{x: 2022.5, y: 1700, text: "—— 基建投资增速（标准化）"}], {x: "x", y: "y", text: "text", fill: "#e15759", fontSize: 10}),
    Plot.ruleY([0])
  ]
})
```

2025年的数据揭示了一个重要转折：**重卡销量与基建投资增速出现了显著脱钩。** 基建投资负增长（−2.2%），但重卡销量反而大涨27%至114.5万辆。

这种脱钩的驱动力主要来自：
- **出口激增**：2025年重卡出口约33万辆，占总销量的28.8%（2019年仅6.8%）
- **国六替换周期**：排放标准执法趋严驱动的被动换车需求
- **新能源替代**：电动重卡带来的置换需求与传统燃油车的生命周期无关

**但脱钩的另一面是：工程车细分市场依然与基建高度相关，且已经在萎缩。** 工程车占重卡的比例从2020年的30%降至2025年的约10%。这不是因为工程车变得不重要了，而是因为**这个细分市场正在被财政紧缩扼杀**，其萎缩掩盖在物流和出口的增长之下。

### 5.4 2026年财政展望：投入加大，但边际效应递减

2026年的财政安排在数字上看起来很积极：

```js
const bondData = [
  {year: 2024, type: "专项债", value: 3.90},
  {year: 2024, type: "超长期特别国债", value: 1.00},
  {year: 2025, type: "专项债", value: 4.40},
  {year: 2025, type: "超长期特别国债", value: 1.30},
  {year: 2026, type: "专项债", value: 5.00},
  {year: 2026, type: "超长期特别国债", value: 2.00}
];
```

```js
Plot.plot({
  width,
  height: 280,
  marginLeft: 55,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "额度（万亿元）", grid: true, domain: [0, 8]},
  color: {legend: true, domain: ["专项债", "超长期特别国债"], range: ["#4e79a7", "#c41e3a"]},
  marks: [
    Plot.barY(bondData, Plot.stackY({
      x: "year", y: "value", fill: "type",
      tip: true,
      title: d => `${d.year}${d.year === 2026 ? '（预计）' : ''}年\n${d.type}: ${d.value}万亿元`
    })),
    Plot.text([
      {x: 2024, y: 5.2, text: "4.9万亿"},
      {x: 2025, y: 6.0, text: "5.7万亿"},
      {x: 2026, y: 7.3, text: "7.0万亿"}
    ], {x: "x", y: "y", text: "text", fontSize: 11, fontWeight: 700}),
    Plot.ruleY([0])
  ]
})
```

- **专项债额度**提升至约5万亿元（较2025年增加6,000亿）
- **超长期特别国债**预计达2万亿元（较2025年增加7,000亿，较2024年翻倍）
- **财政赤字率**维持在~4%，广义赤字率可能达到9–10%
- 2026年是"十五五"规划开局之年，历史上五年规划开局年往往财政支出力度较大

市场普遍预期2026年基建投资增速将**反弹至+8%左右**。如果兑现，这对商用车市场意味着什么？

**工程车：有望回暖但幅度有限。** 基建投资回正将直接带动自卸车、搅拌车等工程车需求，预计相关细分市场增速在+15–25%之间。但由于工程车在重卡中的占比已降至约10%，即使工程车增长20%，对重卡总量的拉动也仅约2个百分点。

**物流重卡：间接受益。** 基建工程产生的原材料运输需求（水泥、钢材、砂石）将支撑物流重卡需求，但这属于二阶效应，传导链条较长，边际效应也在递减。

**关键风险：增量债务多大比例真正转化为实物工作量？** 历史经验表明，地方政府在偿债压力下，可能将相当比例的新增债务用于借新还旧和利息支出，而非真正的基建投资。2025年基建投资在赤字创新高的情况下仍然转负，就是前车之鉴。

### 5.5 财政风险的压力测试

我们对商用车市场进行两个极端情景的财政压力测试：

| 情景 | 基建投资增速 | 房地产投资 | 工程车需求 | 重卡总量影响 | 概率 |
|------|:---:|:---:|:---:|:---:|:---:|
| **财政发力** | +10% | 企稳（−5%） | +25% | +3–4% | 20% |
| **财政中性** | +5–8% | 继续下行（−10%） | +10% | +1–2% | 50% |
| **财政紧缩** | 0–2% | 深度下行（−15%） | −10% | −2–3% | 20% |
| **债务危机** | −5%以下 | 崩盘（−20%+） | −25%以上 | −5–8% | 10% |

**核心结论：** 即使在"财政发力"情景下，基建对重卡总量的拉动也不超过4个百分点——因为工程车占比已经太小。**中国重卡市场已经从一个"基建驱动型"市场转变为一个"物流+出口+新能源驱动型"市场。** 基建的影响仍然存在，但已不再是决定性因素。

然而，"债务危机"情景虽然概率低（~10%），但一旦发生，其冲击将远超工程车范畴——地方政府偿债违约引发的信用紧缩可能冻结整个经济活动，物流需求也将受到严重打击。这才是真正需要警惕的"尾部风险"。

---

## 六、其他隐忧与风险

市场的复苏不应掩盖以下深层问题：

### 6.1 货车主体市场并不健康

```js
const truckData = typeBreakdown.filter(d => d.type === "Truck");
```

```js
Plot.plot({
  width,
  height: 280,
  marginLeft: 55,
  x: {label: "年份", tickFormat: "d"},
  y: {label: "货车销量（万辆）", grid: true, domain: [200, 500]},
  marks: [
    Plot.line(truckData, {
      x: "year", y: "sales", stroke: "#4e79a7", strokeWidth: 2.5, curve: "catmull-rom"
    }),
    Plot.dot(truckData, {
      x: "year", y: "sales", fill: "#4e79a7", r: 5,
      tip: true,
      title: d => `${d.year}年: ${d.sales}万辆 (${d.yoy_pct ? (d.yoy_pct > 0 ? '+' : '') + d.yoy_pct + '%' : '—'})`
    }),
    Plot.ruleY([0])
  ]
})
```

货车占商用车销量约88%，是市场的绝对主体。2025年货车销量378.5万辆虽较2024年的336.2万辆有明显回升，但仍低于2023年的353.9万辆（如果考虑到出口增量，国内货车需求更为疲弱）。

根源在于：中国公路货运市场长期处于**供过于求**的状态，运价持续低迷。散户卡车司机的收入被平台经济（如满帮集团）压缩，更新换购意愿不强。这不是短期的周期问题，而是行业结构性过剩的表现。

### 6.2 以旧换新政策的"药效"正在减退

2025年的强劲增长相当程度上得益于中央和地方的以旧换新补贴政策。但政策刺激的本质是把未来需求提前释放。2026年购置税优惠从全免调为减半，可能导致部分需求在2025年底提前透支。与2020年国六抢购后2021年的回落类似，2026年市场增速放缓是大概率事件。

### 6.3 房地产拖累工程车需求

中国房地产行业的持续调整对工程类商用车（自卸车、搅拌车、泵车等）构成持续压力。虽然新基建（新能源电站、数据中心等）和城市更新项目提供了部分替代需求，但不足以完全弥补房地产投资下降的缺口。

### 6.4 氢燃料电池路线的进展缓慢

尽管国家层面持续推动氢能发展，氢燃料电池商用车的销量仍然微乎其微——2024年全年氢燃料重卡仅售出约4,421辆，市场份额不到0.5%。氢能产业链的高成本和基础设施不足，使得该路线在中短期内难以形成对纯电动的有效补充。

---

## 七、竞争格局：旧秩序正在瓦解

新能源转型正在重塑商用车行业的竞争版图。传统"五强"（一汽解放、中国重汽、福田、东风、陕汽）在燃油重卡时代的垄断地位正受到两类新进入者的挑战：

- **工程机械跨界者**：徐工（XCMG）2025年销量同比暴增148%，三一重工（SANY）也在快速扩张。它们在新能源工程车领域具有制造和渠道优势。
- **新能源先行者**：远程汽车（吉利商用车）、北汽福田新能源等在电动物流车和轻卡领域占据先机。

这意味着：**行业集中度可能先降后升**。短期内新玩家的涌入分散份额，但中长期看，当新能源渗透率越过50%大关，缺乏电动化产品力的传统车企将被加速淘汰，幸存者将获得更大的市场份额。

---

## 八、综合评估：市场健康度评分

基于上述分析，我们从五个维度对中国商用车市场的健康度进行评估：

| 维度 | 评分 | 评价 |
|------|:----:|------|
| **总量恢复** | 7/10 | 回到400万辆以上，但距峰值仍有16%差距；增长中枢下移 |
| **结构升级** | 9/10 | 新能源渗透率6年增长22倍，重卡电动化加速突破 |
| **出口竞争力** | 8/10 | 出口破百万辆，性价比优势突出；但市场集中度风险存在 |
| **财政韧性** | 4/10 | 土地财政瓦解、城投债66万亿、基建乘数递减；工程车已边缘化但尾部风险仍大 |
| **盈利能力** | 5/10 | 运价低迷、价格战激烈、补贴依赖度高，行业整体利润承压 |
| **政策可持续性** | 6/10 | 以旧换新红利递减、购置税优惠收窄，政策刺激空间缩小 |

**综合评分：6.5/10——"温和健康，结构性亮点突出，财政风险不容忽视"**

中国商用车市场正处于一个关键的转型窗口期。总量上看，市场已走出2022年的低谷，重回相对稳定的运行区间。但真正定义这个市场未来十年面貌的，不是总量的增减，而是**新能源渗透率的爬升速度**和**出口市场的开拓深度**。

如果这两个结构性引擎持续发力，中国商用车行业将从一个周期波动剧烈的传统制造业，进化为一个具有全球竞争力的高端制造业。反之，如果新能源渗透遇阻、出口增长见顶，市场可能再次陷入存量竞争的"内卷"困局。

---

## 九、2026年展望

**基准情景（概率55%）：** 总销量420–440万辆，同比−2%至+2%。以旧换新政策效应减弱，出口增速放缓至10%以内，新能源渗透率突破32%。市场总量走平，结构持续升级。

**乐观情景（概率25%）：** 总销量450万辆以上，同比+5%以上。基建投资超预期发力，房地产企稳带动工程车需求回升，新能源商用车出口打开欧洲市场。

**悲观情景（概率20%）：** 总销量低于400万辆。全球贸易摩擦升级导致出口受阻，国内经济复苏乏力，政策补贴完全退坡，需求断层式下滑。

无论哪种情景，有一个确定性极高的趋势：**到2026年底，中国新能源商用车渗透率将超过30%，柴油重卡的市场份额将跌破45%。** 这场能源革命，已经没有回头路。

<span class="source-tag">分析基于中汽协、ICCT、IEEFA等公开数据，观点仅供参考 | 数据截至2026年1月</span>

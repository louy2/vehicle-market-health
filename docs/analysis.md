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

## 五、隐忧与风险

市场的复苏不应掩盖以下深层问题：

### 5.1 货车主体市场并不健康

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

### 5.2 以旧换新政策的"药效"正在减退

2025年的强劲增长相当程度上得益于中央和地方的以旧换新补贴政策。但政策刺激的本质是把未来需求提前释放。2026年购置税优惠从全免调为减半，可能导致部分需求在2025年底提前透支。与2020年国六抢购后2021年的回落类似，2026年市场增速放缓是大概率事件。

### 5.3 房地产拖累工程车需求

中国房地产行业的持续调整对工程类商用车（自卸车、搅拌车、泵车等）构成持续压力。虽然新基建（新能源电站、数据中心等）和城市更新项目提供了部分替代需求，但不足以完全弥补房地产投资下降的缺口。

### 5.4 氢燃料电池路线的进展缓慢

尽管国家层面持续推动氢能发展，氢燃料电池商用车的销量仍然微乎其微——2024年全年氢燃料重卡仅售出约4,421辆，市场份额不到0.5%。氢能产业链的高成本和基础设施不足，使得该路线在中短期内难以形成对纯电动的有效补充。

---

## 六、竞争格局：旧秩序正在瓦解

新能源转型正在重塑商用车行业的竞争版图。传统"五强"（一汽解放、中国重汽、福田、东风、陕汽）在燃油重卡时代的垄断地位正受到两类新进入者的挑战：

- **工程机械跨界者**：徐工（XCMG）2025年销量同比暴增148%，三一重工（SANY）也在快速扩张。它们在新能源工程车领域具有制造和渠道优势。
- **新能源先行者**：远程汽车（吉利商用车）、北汽福田新能源等在电动物流车和轻卡领域占据先机。

这意味着：**行业集中度可能先降后升**。短期内新玩家的涌入分散份额，但中长期看，当新能源渗透率越过50%大关，缺乏电动化产品力的传统车企将被加速淘汰，幸存者将获得更大的市场份额。

---

## 七、综合评估：市场健康度评分

基于上述分析，我们从五个维度对中国商用车市场的健康度进行评估：

| 维度 | 评分 | 评价 |
|------|:----:|------|
| **总量恢复** | 7/10 | 回到400万辆以上，但距峰值仍有16%差距；增长中枢下移 |
| **结构升级** | 9/10 | 新能源渗透率6年增长22倍，重卡电动化加速突破 |
| **出口竞争力** | 8/10 | 出口破百万辆，性价比优势突出；但市场集中度风险存在 |
| **盈利能力** | 5/10 | 运价低迷、价格战激烈、补贴依赖度高，行业整体利润承压 |
| **政策可持续性** | 6/10 | 以旧换新红利递减、购置税优惠收窄，政策刺激空间缩小 |

**综合评分：7.0/10——"温和健康，结构性亮点突出"**

中国商用车市场正处于一个关键的转型窗口期。总量上看，市场已走出2022年的低谷，重回相对稳定的运行区间。但真正定义这个市场未来十年面貌的，不是总量的增减，而是**新能源渗透率的爬升速度**和**出口市场的开拓深度**。

如果这两个结构性引擎持续发力，中国商用车行业将从一个周期波动剧烈的传统制造业，进化为一个具有全球竞争力的高端制造业。反之，如果新能源渗透遇阻、出口增长见顶，市场可能再次陷入存量竞争的"内卷"困局。

---

## 八、2026年展望

**基准情景（概率55%）：** 总销量420–440万辆，同比−2%至+2%。以旧换新政策效应减弱，出口增速放缓至10%以内，新能源渗透率突破32%。市场总量走平，结构持续升级。

**乐观情景（概率25%）：** 总销量450万辆以上，同比+5%以上。基建投资超预期发力，房地产企稳带动工程车需求回升，新能源商用车出口打开欧洲市场。

**悲观情景（概率20%）：** 总销量低于400万辆。全球贸易摩擦升级导致出口受阻，国内经济复苏乏力，政策补贴完全退坡，需求断层式下滑。

无论哪种情景，有一个确定性极高的趋势：**到2026年底，中国新能源商用车渗透率将超过30%，柴油重卡的市场份额将跌破45%。** 这场能源革命，已经没有回头路。

<span class="source-tag">分析基于中汽协、ICCT、IEEFA等公开数据，观点仅供参考 | 数据截至2026年1月</span>

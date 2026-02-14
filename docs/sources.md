---
toc: false
---

# 数据来源与方法说明

## 主要数据来源

本仪表盘数据来源于以下权威公开渠道：

### 一、中国汽车工业协会（CAAM）

- **网站**：[caam.org.cn](http://www.caam.org.cn) / [en.caam.org.cn](http://en.caam.org.cn)
- **数据类型**：月度/年度商用车产销量、分车型统计、出口量
- **覆盖范围**：基于会员企业自愿上报的批发口径数据（wholesale）
- **使用数据**：年度总销量、月度销量、货车/客车分类、新能源商用车销量、出口量

### 二、国际清洁交通委员会（ICCT）

- **网站**：[theicct.org](https://theicct.org)
- **报告**：
  - [零排放中重型车市场（中国，2025年H1）](https://theicct.org/publication/ze-mhdv-market-in-china-h1-2025-sept25/)
  - [零排放中重型车市场（中国，2024年H1）](https://theicct.org/publication/ze-mhdv-market-china-january-june-2024-nov24/)
  - [中国新能源商用车领先城市（2024）](https://theicct.org/publication/leading-cities-for-necvs-in-china-2024-jul25/)
- **数据类型**：重型卡车/客车新能源渗透率、动力结构分析

### 三、能源经济与金融分析研究所（IEEFA）

- **网站**：[ieefa.org](https://ieefa.org)
- **报告**：[电动卡车销量激增减缓中国LNG卡车增长](https://ieefa.org/resources/surging-electric-truck-sales-stall-chinas-lng-trucking-boom-0)
- **数据类型**：电动重卡TCO分析、动力类型市场份额

### 四、新闻与行业媒体

| 来源 | 网址 | 用途 |
|------|------|------|
| 中国日报 | [chinadaily.com.cn](https://www.chinadaily.com.cn) | CAAM发布会报道 |
| 盖世汽车 | [gasgoo.com](https://autonews.gasgoo.com) | 月度产销数据速报 |
| 中国卡车网 | [chinatrucks.org](https://www.chinatrucks.org) | 细分车型销量与市场份额 |
| electrive | [electrive.com](https://www.electrive.com) | 新能源商用车全球动态 |
| CleanTechnica | [cleantechnica.com](https://cleantechnica.com) | 中国商用车电动化分析 |
| SteelOrbis | [steelorbis.com](https://www.steelorbis.com) | CAAM数据引用 |

### 五、数据库与统计平台

| 来源 | 网址 | 说明 |
|------|------|------|
| CEIC Data | [ceicdata.com](https://www.ceicdata.com) | 历史月度数据（付费） |
| MacroMicro | [en.macromicro.me](https://en.macromicro.me/charts/339/cn-china-commercial-vehicle-sales) | CAAM批发数据图表 |
| MarkLines | [marklines.com](https://www.marklines.com) | 分品牌月度数据（付费） |

---

## 数据说明与局限

### 统计口径
- **中汽协数据**为批发口径（manufacturer wholesale），即整车企业出厂/发往经销商的数量，非终端零售销量
- **出口数据**包含整车出口（CBU），不含CKD散件出口
- **新能源渗透率**按国内销量口径计算（排除出口），分母为商用车国内总销量

### 月度数据说明
- 2024年和2025年的月度数据中，部分月份为已确认的中汽协官方数据，部分月份系根据累计数据和季节性规律推算
- 数据集中已标注每个月度数据点的来源（`source_note`字段）

### 年度历史数据
- 2015–2019年的年度数据为近似值，综合自多个公开来源。2020年以后的数据来自中汽协官方发布
- 货车/客车分类数据中，2025年客车销量为估计值（与2024年持平），全年精确数据待中汽协发布

### 厂商市场份额
- 牵引车市场份额为2025全年数据，中型卡车市场份额为2025年H1数据
- 数据来自行业统计和企业公告

---

## 数据更新日期

本仪表盘数据截至 **2026年1月**（含2025全年数据及2026年1月初步数据）。

<span class="source-tag">最后更新：2026年2月</span>

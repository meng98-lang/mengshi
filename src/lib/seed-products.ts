// 产品种子数据 —— 名贵滋补中药材（三语）
// 首次运行时写入数据库
import type { Locale } from "@/lib/i18n/config";

type L3 = Record<Locale, string>;
type L3Arr = Record<Locale, string[]>;

export interface SeedProduct {
  slug: string;
  category: string;
  name: L3;
  subtitle: L3;
  description: L3;
  origin: L3;
  unit: L3;
  price: number;
  comparePrice: number;
  image: string;
  highlights: L3Arr;
  rating: number;
  reviews: number;
  sort: number;
}

export const seedProducts: SeedProduct[] = [
  {
    slug: "dong-e-ejiao",
    category: "ejiao",
    name: {
      "zh-CN": "东阿阿胶",
      "zh-TW": "東阿阿膠",
      en: "Dong'e Ejiao (Donkey-Hide Gelatin)",
    },
    subtitle: {
      "zh-CN": "补血滋阴 · 润燥止血",
      "zh-TW": "補血滋陰 · 潤燥止血",
      en: "Nourishes Blood & Yin, Moistens Dryness",
    },
    description: {
      "zh-CN": "产自山东东阿，选用上等黑驴皮，以传统工艺熬制九十九道工序而成。阿胶自古为补血圣品，滋阴润燥、养血止血，尤宜气血两虚、面色萎黄、心烦不眠者。秋冬进补之佳品，女性调养之臻选。",
      "zh-TW": "產自山東東阿，選用上等黑驢皮，以傳統工藝熬製九十九道工序而成。阿膠自古為補血聖品，滋陰潤燥、養血止血，尤宜氣血兩虛、面色萎黃、心煩不眠者。秋冬進補之佳品，女性調養之臻選。",
      en: "Produced in Dong'e, Shandong, made from premium black donkey hide through 99 traditional processing steps. Ejiao has been treasured since ancient times as a supreme blood tonic—nourishing Yin, moistening dryness, and supporting vitality. Especially valued for autumn and winter supplementation and women's wellness.",
    },
    origin: {
      "zh-CN": "山东 · 东阿",
      "zh-TW": "山東 · 東阿",
      en: "Dong'e, Shandong, China",
    },
    unit: {
      "zh-CN": "250g / 盒",
      "zh-TW": "250g / 盒",
      en: "250g / box",
    },
    price: 89,
    comparePrice: 119,
    image: "/images/ejiao.jpg",
    highlights: {
      "zh-CN": ["正宗东阿原产", "补血滋阴", "传统古法熬制", "秋冬进补佳品"],
      "zh-TW": ["正宗東阿原產", "補血滋陰", "傳統古法熬製", "秋冬進補佳品"],
      en: ["Authentic Dong'e origin", "Nourishes blood & Yin", "Traditional craft", "Ideal for autumn/winter"],
    },
    rating: 4.9,
    reviews: 326,
    sort: 1,
  },
  {
    slug: "cordyceps-sinensis",
    category: "cordyceps",
    name: {
      "zh-CN": "冬虫夏草",
      "zh-TW": "冬蟲夏草",
      en: "Cordyceps Sinensis",
    },
    subtitle: {
      "zh-CN": "那曲野生 · 补肺益肾",
      "zh-TW": "那曲野生 · 補肺益腎",
      en: "Wild Nagqu Cordyceps · Tonifies Lung & Kidney",
    },
    description: {
      "zh-CN": "采自西藏那曲海拔4500米以上雪域高原，野生冬虫夏草，条大饱满、色泽金黄。冬虫夏草补肺益肾、止咳化痰、强身固本，被誉为『软黄金』，是体虚乏力、术后调理、养生延年的名贵滋补珍品。",
      "zh-TW": "採自西藏那曲海拔4500米以上雪域高原，野生冬蟲夏草，條大飽滿、色澤金黃。冬蟲夏草補肺益腎、止咳化痰、強身固本，被譽為『軟黃金』，是體虛乏力、術後調理、養生延年的名貴滋補珍品。",
      en: "Wild-harvested from the snow highlands of Nagqu, Tibet, above 4,500 meters—large, plump caterpillars with golden color. Known as 'soft gold,' Cordyceps tonifies the lung and kidney, supports vitality and recovery, and is a prized tonic for fatigue, post-surgery recuperation, and longevity.",
    },
    origin: {
      "zh-CN": "西藏 · 那曲",
      "zh-TW": "西藏 · 那曲",
      en: "Nagqu, Tibet, China",
    },
    unit: {
      "zh-CN": "10g / 盒",
      "zh-TW": "10g / 盒",
      en: "10g / box",
    },
    price: 199,
    comparePrice: 259,
    image: "/images/cordyceps.jpg",
    highlights: {
      "zh-CN": ["西藏那曲野生", "补肺益肾", "条大饱满", "『软黄金』珍品"],
      "zh-TW": ["西藏那曲野生", "補肺益腎", "條大飽滿", "『軟黃金』珍品"],
      en: ["Wild Nagqu, Tibet", "Tonifies lung & kidney", "Large & plump", "The 'soft gold' tonic"],
    },
    rating: 5.0,
    reviews: 218,
    sort: 2,
  },
  {
    slug: "saffron",
    category: "saffron",
    name: {
      "zh-CN": "藏红花",
      "zh-TW": "藏紅花",
      en: "Saffron (Tibetan Crocus)",
    },
    subtitle: {
      "zh-CN": "伊朗极品 · 活血养颜",
      "zh-TW": "伊朗極品 · 活血養顏",
      en: "Premium Saffron · Invigorates Blood & Beauty",
    },
    description: {
      "zh-CN": "精选伊朗极品藏红花（番红花），全红长丝、无黄根，香气浓郁。藏红花活血化瘀、凉血解毒、解郁安神、美容养颜，女性泡水饮用可调理气色、舒缓情绪，被誉为『红色黄金』，珍贵稀有。",
      "zh-TW": "精選伊朗極品藏紅花（番紅花），全紅長絲、無黃根，香氣濃郁。藏紅花活血化瘀、涼血解毒、解鬱安神、美容養顏，女性泡水飲用可調理氣色、舒緩情緒，被譽為『紅色黃金』，珍貴稀有。",
      en: "Premium Iranian saffron—full red long threads, no yellow roots, rich aroma. Saffron invigorates blood, calms the spirit, and supports beauty and complexion. Steeped in tea, it helps balance mood and complexion for women. Known as 'red gold,' it is precious and rare.",
    },
    origin: {
      "zh-CN": "伊朗（经藏区传入）",
      "zh-TW": "伊朗（經藏區傳入）",
      en: "Iran",
    },
    unit: {
      "zh-CN": "1g / 瓶",
      "zh-TW": "1g / 瓶",
      en: "1g / jar",
    },
    price: 59,
    comparePrice: 79,
    image: "/images/saffron.jpg",
    highlights: {
      "zh-CN": ["伊朗极品全红花丝", "活血养颜", "解郁安神", "『红色黄金』"],
      "zh-TW": ["伊朗極品全紅花絲", "活血養顏", "解鬱安神", "『紅色黃金』"],
      en: ["Premium full-red threads", "Beauty & complexion", "Calms the spirit", "The 'red gold'"],
    },
    rating: 4.9,
    reviews: 412,
    sort: 3,
  },
  {
    slug: "wild-ginseng",
    category: "ginseng",
    name: {
      "zh-CN": "长白山野山参",
      "zh-TW": "長白山野山參",
      en: "Changbai Mountain Wild Ginseng",
    },
    subtitle: {
      "zh-CN": "长白山野生 · 大补元气",
      "zh-TW": "長白山野生 · 大補元氣",
      en: "Wild Changbai Ginseng · Replenishes Vital Qi",
    },
    description: {
      "zh-CN": "采自东北长白山原始森林，多年生野山参，芦长体灵、皮老纹深、须清珍珠点明显。野山参大补元气、复脉固脱、补脾益肺、生津安神，为参中极品，年节送礼、长辈滋补、大病初愈调理之上选。",
      "zh-TW": "採自東北長白山原始森林，多年生野山參，蘆長體靈、皮老紋深、鬚清珍珠點明顯。野山參大補元氣、復脈固脫、補脾益肺、生津安神，為參中極品，年節送禮、長輩滋補、大病初癒調理之上選。",
      en: "Wild-harvested from the primeval forests of Changbai Mountain in Northeast China—perennial wild ginseng with long necks, aged skin, deep wrinkles, and clear pearl points. Wild ginseng powerfully replenishes vital Qi, strengthens the spleen and lung, and calms the spirit. The finest grade—ideal for gifts, elders, and recovery.",
    },
    origin: {
      "zh-CN": "吉林 · 长白山",
      "zh-TW": "吉林 · 長白山",
      en: "Changbai Mountain, Jilin, China",
    },
    unit: {
      "zh-CN": "15g / 礼盒",
      "zh-TW": "15g / 禮盒",
      en: "15g / gift box",
    },
    price: 289,
    comparePrice: 369,
    image: "/images/ginseng.jpg",
    highlights: {
      "zh-CN": ["长白山原始森林野生", "大补元气", "参中极品", "尊贵礼盒装"],
      "zh-TW": ["長白山原始森林野生", "大補元氣", "參中極品", "尊貴禮盒裝"],
      en: ["Wild, Changbai forest", "Replenishes vital Qi", "Top-grade ginseng", "Prestigious gift box"],
    },
    rating: 5.0,
    reviews: 174,
    sort: 4,
  },
  {
    slug: "lingzhi",
    category: "lingzhi",
    name: {
      "zh-CN": "野生灵芝",
      "zh-TW": "野生靈芝",
      en: "Wild Lingzhi (Reishi Mushroom)",
    },
    subtitle: {
      "zh-CN": "紫灵芝 · 安神扶正",
      "zh-TW": "紫靈芝 · 安神扶正",
      en: "Purple Reishi · Calms & Strengthens",
    },
    description: {
      "zh-CN": "精选深山野生紫灵芝，朵大肉厚、孢子粉饱满。灵芝自古称『仙草』，扶正固本、安神益精气、滋补强壮，久食轻身延年。适合日常泡水、煲汤、泡酒，增强体质、改善睡眠，是全家四季养生之佳品。",
      "zh-TW": "精選深山野生紫靈芝，朵大肉厚、孢子粉飽滿。靈芝自古稱『仙草』，扶正固本、安神益精氣、滋補強壯，久食輕身延年。適合日常泡水、煲湯、泡酒，增強體質、改善睡眠，是全家四季養生之佳品。",
      en: "Wild purple Reishi harvested deep in the mountains—large, thick caps with abundant spores. Known since antiquity as the 'spirit mushroom,' Reishi strengthens the body's foundation, calms the spirit, and supports longevity. Brew it in tea, soup, or wine to boost immunity and improve sleep for the whole family year-round.",
    },
    origin: {
      "zh-CN": "云南 · 深山",
      "zh-TW": "雲南 · 深山",
      en: "Deep Mountains, Yunnan, China",
    },
    unit: {
      "zh-CN": "250g / 袋",
      "zh-TW": "250g / 袋",
      en: "250g / bag",
    },
    price: 69,
    comparePrice: 99,
    image: "/images/lingzhi.jpg",
    highlights: {
      "zh-CN": ["深山野生紫灵芝", "扶正安神", "仙草养生", "四季宜食"],
      "zh-TW": ["深山野生紫靈芝", "扶正安神", "仙草養生", "四季宜食"],
      en: ["Wild purple Reishi", "Strengthens & calms", "The 'spirit mushroom'", "Year-round wellness"],
    },
    rating: 4.8,
    reviews: 263,
    sort: 5,
  },
  {
    slug: "deer-antler-velvet",
    category: "antler",
    name: {
      "zh-CN": "鹿茸",
      "zh-TW": "鹿茸",
      en: "Deer Antler Velvet",
    },
    subtitle: {
      "zh-CN": "梅花鹿茸片 · 温肾壮阳",
      "zh-TW": "梅花鹿茸片 · 溫腎壯陽",
      en: "Sika Deer Velvet · Warms Kidney & Strengthens Yang",
    },
    description: {
      "zh-CN": "精选东北梅花鹿头茬二杠鹿茸，蜡片、粉片质地细嫩，含血充足。鹿茸壮肾阳、益精血、强筋骨、调冲任，为温补肾阳之名贵药材，适合畏寒乏力、腰膝酸软者，泡酒、煲汤、研粉皆宜。",
      "zh-TW": "精選東北梅花鹿頭茬二杠鹿茸，蠟片、粉片質地細嫩，含血充足。鹿茸壯腎陽、益精血、強筋骨、調衝任，為溫補腎陽之名貴藥材，適合畏寒乏力、腰膝酸軟者，泡酒、煲湯、研粉皆宜。",
      en: "Premium first-cut Sika deer antler velvet from Northeast China—tender wax and powder slices, rich in blood. Deer antler velvet warms kidney Yang, nourishes essence and blood, and strengthens bones and tendons. A prized tonic for those feeling cold, fatigued, or weak—suitable in wine, soup, or as powder.",
    },
    origin: {
      "zh-CN": "吉林 · 梅花鹿之乡",
      "zh-TW": "吉林 · 梅花鹿之鄉",
      en: "Sika Deer Region, Jilin, China",
    },
    unit: {
      "zh-CN": "20g / 盒",
      "zh-TW": "20g / 盒",
      en: "20g / box",
    },
    price: 159,
    comparePrice: 209,
    image: "/images/antler.jpg",
    highlights: {
      "zh-CN": ["梅花鹿头茬鹿茸", "温肾壮阳", "益精强骨", "含血充足"],
      "zh-TW": ["梅花鹿頭茬鹿茸", "溫腎壯陽", "益精強骨", "含血充足"],
      en: ["First-cut Sika velvet", "Warms kidney Yang", "Nourishes essence", "Rich in blood"],
    },
    rating: 4.9,
    reviews: 187,
    sort: 6,
  },
  {
    slug: "tianshan-snow-lotus",
    category: "snowlotus",
    name: {
      "zh-CN": "天山雪莲",
      "zh-TW": "天山雪蓮",
      en: "Tianshan Snow Lotus",
    },
    subtitle: {
      "zh-CN": "雪线之上 · 温肾驱寒",
      "zh-TW": "雪線之上 · 溫腎驅寒",
      en: "Above the Snowline · Warms & Dispels Cold",
    },
    description: {
      "zh-CN": "采自新疆天山海拔雪线之上，珍稀野生雪莲，花形完整、香气清雅。天山雪莲温肾助阳、祛风除湿、通经活血、散寒止痛，被誉为『雪山仙草』，高寒之地孕育，尤为珍贵，适合寒湿体质、关节不利者调理。",
      "zh-TW": "採自新疆天山海拔雪線之上，珍稀野生雪蓮，花形完整、香氣清雅。天山雪蓮溫腎助陽、祛風除濕、通經活血、散寒止痛，被譽為『雪山仙草』，高寒之地孕育，尤為珍貴，適合寒濕體質、關節不利者調理。",
      en: "Rare wild snow lotus harvested above the snowline of the Tianshan Mountains in Xinjiang—whole flowers with a delicate fragrance. Tianshan snow lotus warms kidney Yang, dispels wind-damp, invigorates blood, and eases cold pain. Known as the 'snow mountain spirit herb,' it is especially precious—ideal for those with cold-damp constitution and joint discomfort.",
    },
    origin: {
      "zh-CN": "新疆 · 天山",
      "zh-TW": "新疆 · 天山",
      en: "Tianshan, Xinjiang, China",
    },
    unit: {
      "zh-CN": "2朵 / 盒",
      "zh-TW": "2朵 / 盒",
      en: "2 flowers / box",
    },
    price: 129,
    comparePrice: 169,
    image: "/images/snowlotus.jpg",
    highlights: {
      "zh-CN": ["天山雪线野生", "温肾驱寒", "祛风除湿", "珍稀『雪山仙草』"],
      "zh-TW": ["天山雪線野生", "溫腎驅寒", "祛風除濕", "珍稀『雪山仙草』"],
      en: ["Wild above Tianshan snowline", "Warms & dispels cold", "Dispels wind-damp", "Rare 'snow spirit herb'"],
    },
    rating: 4.8,
    reviews: 142,
    sort: 7,
  },
  {
    slug: "tiepi-shihu",
    category: "herb",
    name: {
      "zh-CN": "铁皮石斛",
      "zh-TW": "鐵皮石斛",
      en: "Tiepi Dendrobium (Shihu)",
    },
    subtitle: {
      "zh-CN": "雁荡山野生 · 滋阴生津",
      "zh-TW": "雁蕩山野生 · 滋陰生津",
      en: "Wild Yandang · Nourishes Yin & Fluids",
    },
    description: {
      "zh-CN": "精选浙江雁荡山仿野生铁皮石斛，茎壮肉厚、胶质丰富。铁皮石斛滋阴清热、益胃生津、护肝明目，位列『中华九大仙草』之首，被誉为『药中黄金』，适合熬夜阴虚、口干舌燥、长期用嗓者日常调理。",
      "zh-TW": "精選浙江雁蕩山仿野生鐵皮石斛，莖壯肉厚、膠質豐富。鐵皮石斛滋陰清熱、益胃生津、護肝明目，位列『中華九大仙草』之首，被譽為『藥中黃金』，適合熬夜陰虛、口乾舌燥、長期用嗓者日常調理。",
      en: "Premium semi-wild Tiepi Dendrobium from Yandang Mountain, Zhejiang—thick stems rich in gelatin. Ranked first among the 'Nine Great Spirit Herbs of China,' it nourishes Yin, promotes fluids, and supports stomach and liver. Known as 'gold among medicines,' it is ideal for late nights, dry mouth, and those who use their voice often.",
    },
    origin: {
      "zh-CN": "浙江 · 雁荡山",
      "zh-TW": "浙江 · 雁蕩山",
      en: "Yandang Mountain, Zhejiang, China",
    },
    unit: {
      "zh-CN": "100g / 盒",
      "zh-TW": "100g / 盒",
      en: "100g / box",
    },
    price: 159,
    comparePrice: 219,
    image: "/images/shihu.jpg",
    highlights: {
      "zh-CN": ["雁荡山仿野生", "滋阴生津", "九大仙草之首", "胶质丰富"],
      "zh-TW": ["雁蕩山仿野生", "滋陰生津", "九大仙草之首", "膠質豐富"],
      en: ["Semi-wild Yandang", "Nourishes Yin & fluids", "First of nine spirit herbs", "Rich in gelatin"],
    },
    rating: 4.9,
    reviews: 188,
    sort: 8,
  },
  {
    slug: "birds-nest",
    category: "herb",
    name: {
      "zh-CN": "印尼燕窝",
      "zh-TW": "印尼燕窩",
      en: "Indonesian Bird's Nest",
    },
    subtitle: {
      "zh-CN": "金丝燕盏 · 养颜润燥",
      "zh-TW": "金絲燕盞 · 養顏潤燥",
      en: "Swiftlet Nest · Beauty & Nourishing",
    },
    description: {
      "zh-CN": "精选印尼进口金丝燕窝盏，盏型完整、纤维细腻、洁净度高，干挑轻毛、天然无添加。燕窝滋阴润燥、养颜美容、补肺化痰，含丰富唾液酸，是孕期滋补、产后调理、女性养颜的传统名贵珍品。",
      "zh-TW": "精選印尼進口金絲燕窩盞，盞型完整、纖維細膩、潔淨度高，乾挑輕毛、天然無添加。燕窩滋陰潤燥、養顏美容、補肺化痰，含豐富唾液酸，是孕期滋補、產後調理、女性養顏的傳統名貴珍品。",
      en: "Premium imported Indonesian swiftlet bird's nest—whole cups with fine fibers and high purity, naturally cleaned without additives. Rich in sialic acid, bird's nest nourishes Yin, moisturizes the lungs, and supports beauty. A treasured tonic for pregnancy, postpartum recovery, and women's skincare.",
    },
    origin: {
      "zh-CN": "印度尼西亚",
      "zh-TW": "印度尼西亞",
      en: "Indonesia",
    },
    unit: {
      "zh-CN": "50g / 盒",
      "zh-TW": "50g / 盒",
      en: "50g / box",
    },
    price: 239,
    comparePrice: 299,
    image: "/images/birdnest.jpg",
    highlights: {
      "zh-CN": ["印尼原装进口", "干挑轻毛盏", "富含唾液酸", "养颜润燥"],
      "zh-TW": ["印尼原裝進口", "乾挑輕毛盞", "富含唾液酸", "養顏潤燥"],
      en: ["Imported from Indonesia", "Naturally cleaned cups", "Rich in sialic acid", "Beauty & moisturizing"],
    },
    rating: 5.0,
    reviews: 165,
    sort: 9,
  },
  {
    slug: "sea-cucumber",
    category: "herb",
    name: {
      "zh-CN": "淡干海参",
      "zh-TW": "淡乾海參",
      en: "Dried Sea Cucumber",
    },
    subtitle: {
      "zh-CN": "辽刺参 · 补肾益精",
      "zh-TW": "遼刺參 · 補腎益精",
      en: "Liao Spiky Sea Cucumber · Kidney Tonic",
    },
    description: {
      "zh-CN": "精选大连渤海辽刺参，淡干工艺、无盐无糖，刺挺肉厚、泡发率高。海参补肾益精、养血润燥、增强免疫，富含胶原蛋白与海参皂苷，是术后恢复、中老年滋补、日常调养的名贵海味珍品。",
      "zh-TW": "精選大連渤海遼刺參，淡乾工藝、無鹽無糖，刺挺肉厚、泡發率高。海參補腎益精、養血潤燥、增強免疫，富含膠原蛋白與海參皂苷，是術後恢復、中老年滋補、日常調養的名貴海味珍品。",
      en: "Premium Liao spiky sea cucumber from Dalian's Bohai Sea—naturally dried without salt or sugar, with firm spikes and high rehydration yield. Rich in collagen and saponins, it tonifies the kidney, nourishes blood, and boosts immunity—prized for post-surgery recovery and senior wellness.",
    },
    origin: {
      "zh-CN": "辽宁 · 大连",
      "zh-TW": "遼寧 · 大連",
      en: "Dalian, Liaoning, China",
    },
    unit: {
      "zh-CN": "250g / 盒",
      "zh-TW": "250g / 盒",
      en: "250g / box",
    },
    price: 219,
    comparePrice: 279,
    image: "/images/seacucumber.jpg",
    highlights: {
      "zh-CN": ["大连辽刺参", "淡干无盐无糖", "富含胶原蛋白", "补肾益精"],
      "zh-TW": ["大連遼刺參", "淡乾無鹽無糖", "富含膠原蛋白", "補腎益精"],
      en: ["Dalian Liao spiky", "Naturally dried, no salt", "Rich in collagen", "Tonifies kidney"],
    },
    rating: 4.9,
    reviews: 174,
    sort: 10,
  },
  {
    slug: "goji-berry",
    category: "herb",
    name: {
      "zh-CN": "宁夏枸杞",
      "zh-TW": "寧夏枸杞",
      en: "Ningxia Goji Berry",
    },
    subtitle: {
      "zh-CN": "中宁头茬 · 滋补肝肾",
      "zh-TW": "中寧頭茬 · 滋補肝腎",
      en: "Zhongning First-Harvest · Liver & Kidney Tonic",
    },
    description: {
      "zh-CN": "精选宁夏中宁头茬红枸杞，粒大肉厚、籽少味甘、色泽暗红。枸杞滋补肝肾、益精明目、养血安神，泡水、煮粥、煲汤皆宜，是日常养生、电脑族护眼、全家进补的平价滋补佳品。",
      "zh-TW": "精選寧夏中寧頭茬紅枸杞，粒大肉厚、籽少味甘、色澤暗紅。枸杞滋補肝腎、益精明目、養血安神，泡水、煮粥、煲湯皆宜，是日常養生、電腦族護眼、全家進補的平價滋補佳品。",
      en: "Premium first-harvest red goji berries from Zhongning, Ningxia—large, plump, sweet, and dark red. Goji tonifies the liver and kidney, nourishes essence, and brightens the eyes. Perfect in tea, congee, or soup—an everyday wellness staple for screen users and the whole family.",
    },
    origin: {
      "zh-CN": "宁夏 · 中宁",
      "zh-TW": "寧夏 · 中寧",
      en: "Zhongning, Ningxia, China",
    },
    unit: {
      "zh-CN": "500g / 袋",
      "zh-TW": "500g / 袋",
      en: "500g / bag",
    },
    price: 39,
    comparePrice: 59,
    image: "/images/goji.jpg",
    highlights: {
      "zh-CN": ["宁夏中宁头茬", "粒大肉厚", "滋补肝肾", "日常养生"],
      "zh-TW": ["寧夏中寧頭茬", "粒大肉厚", "滋補肝腎", "日常養生"],
      en: ["Zhongning first-harvest", "Large & plump", "Liver & kidney tonic", "Everyday wellness"],
    },
    rating: 4.8,
    reviews: 412,
    sort: 11,
  },
  {
    slug: "huangqi",
    category: "herb",
    name: {
      "zh-CN": "黄芪",
      "zh-TW": "黃芪",
      en: "Astragalus Root",
    },
    subtitle: {
      "zh-CN": "内蒙古正北芪 · 补气固表",
      "zh-TW": "內蒙古正北芪 · 補氣固表",
      en: "Inner Mongolia Astragalus · Tonifies Qi",
    },
    description: {
      "zh-CN": "精选内蒙古正北芪，豆香浓郁、断面纤维明显、金盏银盘。黄芪补气固表、利水消肿、托毒生肌，是『补气之长』，适合气虚乏力、易感冒、自汗水肿者，煲汤泡水皆为经典养生搭配。",
      "zh-TW": "精選內蒙古正北芪，豆香濃郁、斷面纖維明顯、金盞銀盤。黃芪補氣固表、利水消腫、托毒生肌，是『補氣之長』，適合氣虛乏力、易感冒、自汗水腫者，煲湯泡水皆為經典養生搭配。",
      en: "Premium 'True North' Astragalus from Inner Mongolia—rich beany aroma with visible fibrous cross-section. The 'master of Qi tonics,' it strengthens Qi, consolidates the exterior, and supports immunity. Ideal for fatigue and susceptibility to colds—classic in soups and teas.",
    },
    origin: {
      "zh-CN": "内蒙古",
      "zh-TW": "內蒙古",
      en: "Inner Mongolia, China",
    },
    unit: {
      "zh-CN": "250g / 袋",
      "zh-TW": "250g / 袋",
      en: "250g / bag",
    },
    price: 49,
    comparePrice: 69,
    image: "/images/huangqi.jpg",
    highlights: {
      "zh-CN": ["内蒙古正北芪", "补气固表", "增强免疫", "煲汤佳品"],
      "zh-TW": ["內蒙古正北芪", "補氣固表", "增強免疫", "煲湯佳品"],
      en: ["Inner Mongolia origin", "Tonifies Qi", "Boosts immunity", "Great for soups"],
    },
    rating: 4.8,
    reviews: 276,
    sort: 12,
  },
  {
    slug: "red-dates",
    category: "herb",
    name: {
      "zh-CN": "新疆红枣",
      "zh-TW": "新疆紅棗",
      en: "Xinjiang Red Dates (Jujube)",
    },
    subtitle: {
      "zh-CN": "和田骏枣 · 补血养颜",
      "zh-TW": "和田駿棗 · 補血養顏",
      en: "Hotan Jujube · Nourishes Blood",
    },
    description: {
      "zh-CN": "精选新疆和田骏枣，个大核小、肉厚饱满、甘甜醇香。红枣补中益气、养血安神、健脾养胃，有『天然维生素丸』之称，适合气血不足、面色萎黄者，生食、煲汤、泡茶皆宜，全家秋冬滋补必备。",
      "zh-TW": "精選新疆和田駿棗，個大核小、肉厚飽滿、甘甜醇香。紅棗補中益氣、養血安神、健脾養胃，有『天然維生素丸』之稱，適合氣血不足、面色萎黃者，生食、煲湯、泡茶皆宜，全家秋冬滋補必備。",
      en: "Premium Hotan jujube from Xinjiang—extra-large, small-pitted, thick-fleshed, and sweet. Red dates tonify Qi and blood, calm the spirit, and support digestion. Called 'nature's vitamin pill,' they suit those with blood deficiency—great eaten raw, in soups, or tea.",
    },
    origin: {
      "zh-CN": "新疆 · 和田",
      "zh-TW": "新疆 · 和田",
      en: "Hotan, Xinjiang, China",
    },
    unit: {
      "zh-CN": "500g / 袋",
      "zh-TW": "500g / 袋",
      en: "500g / bag",
    },
    price: 35,
    comparePrice: 49,
    image: "/images/hongzao.jpg",
    highlights: {
      "zh-CN": ["新疆和田骏枣", "个大肉厚", "养血安神", "天然维生素丸"],
      "zh-TW": ["新疆和田駿棗", "個大肉厚", "養血安神", "天然維生素丸"],
      en: ["Hotan, Xinjiang", "Large & thick-fleshed", "Nourishes blood", "Nature's vitamin pill"],
    },
    rating: 4.9,
    reviews: 358,
    sort: 13,
  },
  {
    slug: "dried-longan",
    category: "herb",
    name: {
      "zh-CN": "桂圆干",
      "zh-TW": "桂圓乾",
      en: "Dried Longan",
    },
    subtitle: {
      "zh-CN": "莆田桂圆 · 补益心脾",
      "zh-TW": "莆田桂圓 · 補益心脾",
      en: "Putian Longan · Tonifies Heart & Spleen",
    },
    description: {
      "zh-CN": "精选福建莆田桂圆干，肉厚核小、色泽金黄、甘甜如蜜。桂圆补益心脾、养血安神，对心脾两虚、失眠健忘、气血不足尤为适宜，与红枣、枸杞同煮为经典养生甜汤，女性经期后调养尤佳。",
      "zh-TW": "精選福建莆田桂圓乾，肉厚核小、色澤金黃、甘甜如蜜。桂圓補益心脾、養血安神，對心脾兩虛、失眠健忘、氣血不足尤為適宜，與紅棗、枸杞同煮為經典養生甜湯，女性經期後調養尤佳。",
      en: "Premium dried longan from Putian, Fujian—thick flesh, small pit, golden color, honey-sweet. Longan tonifies the heart and spleen, nourishes blood, and calms the spirit—ideal for insomnia, forgetfulness, and blood deficiency. A classic with red dates and goji in sweet tonic soups.",
    },
    origin: {
      "zh-CN": "福建 · 莆田",
      "zh-TW": "福建 · 莆田",
      en: "Putian, Fujian, China",
    },
    unit: {
      "zh-CN": "500g / 袋",
      "zh-TW": "500g / 袋",
      en: "500g / bag",
    },
    price: 42,
    comparePrice: 59,
    image: "/images/longan.jpg",
    highlights: {
      "zh-CN": ["福建莆田原产", "肉厚核小", "补益心脾", "养血安神"],
      "zh-TW": ["福建莆田原產", "肉厚核小", "補益心脾", "養血安神"],
      en: ["Putian, Fujian origin", "Thick flesh, small pit", "Tonifies heart & spleen", "Nourishes blood"],
    },
    rating: 4.8,
    reviews: 233,
    sort: 14,
  },
  {
    slug: "american-ginseng",
    category: "ginseng",
    name: {
      "zh-CN": "西洋参",
      "zh-TW": "西洋參",
      en: "American Ginseng",
    },
    subtitle: {
      "zh-CN": "花旗参 · 清热补气",
      "zh-TW": "花旗參 · 清熱補氣",
      en: "American Ginseng · Clears Heat & Tonifies Qi",
    },
    description: {
      "zh-CN": "精选进口西洋参（花旗参），纹理清晰、参香浓郁、质地坚实。西洋参补气养阴、清热生津，性凉而不燥，适合熬夜上火、口干咽燥、气阴两虚者，与红参温性互补，四季清补皆宜，含片、泡水、煲汤均可。",
      "zh-TW": "精選進口西洋參（花旗參），紋理清晰、參香濃郁、質地堅實。西洋參補氣養陰、清熱生津，性涼而不燥，適合熬夜上火、口乾咽燥、氣陰兩虛者，與紅參溫性互補，四季清補皆宜，含片、泡水、煲湯均可。",
      en: "Premium imported American ginseng—clear grain, rich aroma, firm texture. It tonifies Qi and nourishes Yin while clearing heat—cool in nature and not drying. Ideal for late nights, heat signs, and dry mouth. Complementary to red ginseng; suitable year-round—lozenges, tea, or soup.",
    },
    origin: {
      "zh-CN": "美国 / 加拿大进口",
      "zh-TW": "美國 / 加拿大進口",
      en: "USA / Canada",
    },
    unit: {
      "zh-CN": "100g / 盒",
      "zh-TW": "100g / 盒",
      en: "100g / box",
    },
    price: 129,
    comparePrice: 169,
    image: "/images/xiyangshen.jpg",
    highlights: {
      "zh-CN": ["进口花旗参", "补气养阴", "清热不燥", "四季清补"],
      "zh-TW": ["進口花旗參", "補氣養陰", "清熱不燥", "四季清補"],
      en: ["Imported quality", "Tonifies Qi & Yin", "Clears heat, not drying", "Year-round tonic"],
    },
    rating: 4.9,
    reviews: 197,
    sort: 15,
  },
];

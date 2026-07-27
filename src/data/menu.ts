import type { Bilingual } from "@/lib/i18n";

export type MenuCategory = "milk" | "pearl" | "fruit" | "collagen";

export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: Bilingual;
  desc: Bilingual;
  price: number;
  icon: string;
  isNew?: boolean;
};

export const categories: { id: MenuCategory; label: Bilingual; icon: string }[] = [
  { id: "milk", label: { en: "Milk Tea", ar: "شاي الحليب" }, icon: "/images/milk_tea.jpg" },
  { id: "pearl", label: { en: "Pearl Boba", ar: "بوبا اللؤلؤ" }, icon: "/images/boba_pearl.jpg" },
  { id: "fruit", label: { en: "Fruit Tea", ar: "شاي الفواكه" }, icon: "/images/fruit_tea.jpg" },
  { id: "collagen", label: { en: "Collagen Tea", ar: "كولاجين الشاي" }, icon: "/images/collagen_tea.jpg" },
];

export const menuItems: MenuItem[] = [
  {
    id: "classic-milk",
    category: "milk",
    name: { en: "Classic Milk Tea", ar: "شاي الحليب الكلاسيكي" },
    desc: {
      en: "Black tea brewed fresh daily with silky farm milk.",
      ar: "شاي أسود محضر طازجاً مع الحليب الحريري — المذاق الكلاسيكي الأصيل.",
    },
    price: 22,
    icon: "🍵",
  },
  {
    id: "brown-sugar-milk",
    category: "milk",
    name: { en: "Brown Sugar Milk Tea", ar: "شاي الحليب بالسكر البني" },
    desc: {
      en: "Rich caramelised brown sugar swirls with fresh milk.",
      ar: "دوامات السكر البني المكرمل الغنية مع الحليب الصافي الطازج.",
    },
    price: 26,
    icon: "🍯",
  },
  {
    id: "oolong-milk",
    category: "milk",
    name: { en: "Oolong Milk Tea", ar: "شاي الأولونغ بالحليب" },
    desc: {
      en: "Slow-roasted Formosa oolong leaves with silky milk.",
      ar: "أوراق أولونغ جبلية محمصة بعناية مع الحليب الناعم.",
    },
    price: 24,
    icon: "🌿",
  },
  {
    id: "matcha-milk",
    category: "milk",
    name: { en: "Matcha Milk Tea", ar: "شاي الماتشا الياباني" },
    desc: {
      en: "Ceremonial-grade Japanese matcha whisked to order.",
      ar: "ماتشا يابانية فاخرة تُخفق طازجة مع الحليب الصافي.",
    },
    price: 27,
    icon: "🍃",
  },
  {
    id: "classic-pearl",
    category: "pearl",
    name: { en: "Classic Pearl Milk Tea", ar: "شاي اللؤلؤ الكلاسيكي" },
    desc: {
      en: "Our signature — chewy tapioca pearls in rich milk tea.",
      ar: "المشروب الأيقوني — لؤلؤ تابيوكا طري في شاي الحليب الأسود.",
    },
    price: 24,
    icon: "🧋",
  },
  {
    id: "brown-sugar-pearl",
    category: "pearl",
    name: { en: "Brown Sugar Pearl Delight", ar: "بوبا السكر البني الفاخرة" },
    desc: {
      en: "Warm hand-cooked pearls steeped in caramel syrup.",
      ar: "لؤلؤ دافئ مطهو ببطء في شراب السكر البني المكرمل.",
    },
    price: 28,
    icon: "🫧",
    isNew: true,
  },
  {
    id: "taro-pearl",
    category: "pearl",
    name: { en: "Taro Pearl Cream", ar: "كريم التارو باللؤلؤ" },
    desc: {
      en: "Creamy purple taro tea with soft tapioca pearls.",
      ar: "شاي التارو البنفسجي الكريمي المخفوق مع البوبا الطرية.",
    },
    price: 27,
    icon: "💜",
  },
  {
    id: "coconut-pearl",
    category: "pearl",
    name: { en: "Tropical Coconut Pearl", ar: "بوبا جوز الهند الاستوائية" },
    desc: {
      en: "Pure coconut milk tea layered with chewy boba pearls.",
      ar: "حليب جوز الهند الاستوائي المنعش مع لؤلؤ التابيوكا.",
    },
    price: 26,
    icon: "🥥",
  },
  {
    id: "passionfruit-green",
    category: "fruit",
    name: { en: "Passionfruit Green Tea", ar: "شاي أخضر بالباشن فروت" },
    desc: {
      en: "High-mountain jasmine green tea with tart passionfruit.",
      ar: "شاي ياسمين أخضر منعش مع نكهة الباشن فروت الحامضة.",
    },
    price: 24,
    icon: "🍈",
  },
  {
    id: "strawberry-yakult",
    category: "fruit",
    name: { en: "Strawberry Yakult Elixir", ar: "إكسير الفراولة بالياكولت" },
    desc: {
      en: "Real crushed strawberries blended with probiotic Yakult.",
      ar: "قطع فراولة طازجة مهروسة مع مشروب الياكولت الصحي.",
    },
    price: 27,
    icon: "🍓",
  },
  {
    id: "peach-oolong",
    category: "fruit",
    name: { en: "Peach Oolong Nectar", ar: "رحيق الخوخ بالأولونغ" },
    desc: {
      en: "Roasted oolong infused with sweet orchard peaches.",
      ar: "شاي أولونغ محمص منسجم مع عصارة الخوخ الطبيعية.",
    },
    price: 25,
    icon: "🍑",
  },
  {
    id: "lychee-rose",
    category: "fruit",
    name: { en: "Lychee Rose Bloom", ar: "زهرة الليتشي والورد" },
    desc: {
      en: "Aromatic Damask rose & sweet iced lychee infusion.",
      ar: "خلاصة الورد العطري مع فاكهة الليتشي الحلوة المثلجة.",
    },
    price: 26,
    icon: "🌹",
  },
  {
    id: "rose-collagen",
    category: "collagen",
    name: { en: "Rose Marine Collagen", ar: "كولاجين الورد البحري" },
    desc: {
      en: "Pure marine collagen peptides in rose oolong tea.",
      ar: "ببتيدات كولاجين بحري نقي ممزوج مع شاي أولونغ الورد.",
    },
    price: 30,
    icon: "🌷",
    isNew: true,
  },
  {
    id: "peach-collagen",
    category: "collagen",
    name: { en: "Peach Sparkle Collagen", ar: "فوران الخوخ بالكولاجين" },
    desc: {
      en: "Sparkling organic peach tea enriched with collagen.",
      ar: "شاي الخوخ الفوار المنعش المشرّب بالكولاجين المغربي.",
    },
    price: 30,
    icon: "🍑",
    isNew: true,
  },
  {
    id: "berry-collagen",
    category: "collagen",
    name: { en: "Wild Berry Collagen", ar: "كولاجين التوت البري" },
    desc: {
      en: "Crushed forest berries, green tea and collagen.",
      ar: "توت بري طازج مع شاي أخضر جبيلي وكولاجين نقي.",
    },
    price: 32,
    icon: "🫐",
    isNew: true,
  },
  {
    id: "pastel-glow-collagen",
    category: "collagen",
    name: { en: "Pastel Glow Signature", ar: "إكسير الباستيل بالكولاجين" },
    desc: {
      en: "Our flagship pink-lavender collagen beauty blend.",
      ar: "خلاصة الجمال الخاصة بنا — مزيج الكولاجين بالوردي واللافندر.",
    },
    price: 32,
    icon: "✨",
    isNew: true,
  },
];

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
  { id: "milk", label: { en: "Milk Tea", ar: "شاي الحليب" }, icon: "🍵" },
  { id: "pearl", label: { en: "Pearl Boba", ar: "بوبا اللؤلؤ" }, icon: "🧋" },
  { id: "fruit", label: { en: "Fruit Tea", ar: "شاي الفواكه" }, icon: "🍓" },
  { id: "collagen", label: { en: "Collagen Tea", ar: "كولاجين الشاي" }, icon: "✨" },
];

export const menuItems: MenuItem[] = [
  {
    id: "classic-milk",
    category: "milk",
    name: { en: "Classic Milk Tea", ar: "شاي الحليب الكلاسيكي" },
    desc: {
      en: "Black tea, fresh milk, a timeless favourite.",
      ar: "شاي أسود مع حليب طازج، الطعم الكلاسيكي الذي لا يمل.",
    },
    price: 22,
    icon: "🍵",
  },
  {
    id: "brown-sugar-milk",
    category: "milk",
    name: { en: "Brown Sugar Milk Tea", ar: "شاي الحليب بالسكر البني" },
    desc: {
      en: "Caramelised brown sugar swirls with fresh milk.",
      ar: "شاي الحليب مع دوامات السكر البني المكرمل.",
    },
    price: 26,
    icon: "🍯",
  },
  {
    id: "oolong-milk",
    category: "milk",
    name: { en: "Oolong Milk Tea", ar: "شاي الأولونغ بالحليب" },
    desc: {
      en: "Roasted oolong leaves, silky and aromatic.",
      ar: "أوراق أولونغ محمصة بنكهة حريرية وعطرية.",
    },
    price: 24,
    icon: "🌿",
  },
  {
    id: "matcha-milk",
    category: "milk",
    name: { en: "Matcha Milk Tea", ar: "شاي الماتشا بالحليب" },
    desc: {
      en: "Ceremonial-grade matcha whisked with fresh milk.",
      ar: "ماتشا فاخرة تُخفق مع الحليب الطازج.",
    },
    price: 27,
    icon: "🍃",
  },
  {
    id: "classic-pearl",
    category: "pearl",
    name: { en: "Classic Pearl Milk Tea", ar: "شاي اللؤلؤ الكلاسيكي" },
    desc: {
      en: "Our signature — chewy pearls in black milk tea.",
      ar: "طبقنا المميز — لؤلؤ طري في شاي الحليب الأسود.",
    },
    price: 24,
    icon: "🧋",
  },
  {
    id: "brown-sugar-pearl",
    category: "pearl",
    name: { en: "Brown Sugar Pearl", ar: "لؤلؤ السكر البني" },
    desc: {
      en: "Hand-cooked pearls in warm brown sugar syrup.",
      ar: "لؤلؤ مطهو يدويًا مع شراب السكر البني الدافئ.",
    },
    price: 28,
    icon: "🫧",
    isNew: true,
  },
  {
    id: "taro-pearl",
    category: "pearl",
    name: { en: "Taro Pearl Delight", ar: "متعة القلقاس باللؤلؤ" },
    desc: {
      en: "Creamy taro tea topped with soft pearls.",
      ar: "شاي القلقاس الكريمي مع لؤلؤ طري.",
    },
    price: 27,
    icon: "💜",
  },
  {
    id: "coconut-pearl",
    category: "pearl",
    name: { en: "Coconut Pearl Tea", ar: "شاي اللؤلؤ بجوز الهند" },
    desc: {
      en: "Tropical coconut milk tea with pearls.",
      ar: "شاي حليب جوز الهند الاستوائي مع اللؤلؤ.",
    },
    price: 26,
    icon: "🥥",
  },
  {
    id: "passionfruit-green",
    category: "fruit",
    name: { en: "Passionfruit Green Tea", ar: "شاي أخضر بفاكهة الباشن" },
    desc: {
      en: "Green tea brightened with tart passionfruit.",
      ar: "شاي أخضر منعش بنكهة فاكهة الباشن الحامضة.",
    },
    price: 24,
    icon: "🍈",
  },
  {
    id: "strawberry-yakult",
    category: "fruit",
    name: { en: "Strawberry Yakult Tea", ar: "شاي الفراولة بالياكولت" },
    desc: {
      en: "Fresh strawberry meets probiotic Yakult.",
      ar: "فراولة طازجة تلتقي بمشروب الياكولت البروبيوتيك.",
    },
    price: 27,
    icon: "🍓",
  },
  {
    id: "peach-oolong",
    category: "fruit",
    name: { en: "Peach Oolong", ar: "شاي الأولونغ بالخوخ" },
    desc: {
      en: "Roasted oolong with juicy peach notes.",
      ar: "أولونغ محمص مع نكهة الخوخ العصيرية.",
    },
    price: 25,
    icon: "🍑",
  },
  {
    id: "lychee-rose",
    category: "fruit",
    name: { en: "Lychee Rose Tea", ar: "شاي الليتشي بالورد" },
    desc: {
      en: "Floral rose and sweet lychee, iced.",
      ar: "ورد عطري مع ليتشي حلو، يُقدَّم مثلجًا.",
    },
    price: 26,
    icon: "🌹",
  },
  {
    id: "rose-collagen",
    category: "collagen",
    name: { en: "Rose Collagen Tea", ar: "شاي الكولاجين بالورد" },
    desc: {
      en: "Marine collagen meets rose oolong tea.",
      ar: "كولاجين بحري مع شاي الأولونغ بالورد.",
    },
    price: 30,
    icon: "🌷",
    isNew: true,
  },
  {
    id: "peach-collagen",
    category: "collagen",
    name: { en: "Peach Collagen Fizz", ar: "فوران الخوخ بالكولاجين" },
    desc: {
      en: "Sparkling peach tea infused with collagen.",
      ar: "شاي الخوخ الفوار مغذى بالكولاجين.",
    },
    price: 30,
    icon: "🍑",
    isNew: true,
  },
  {
    id: "berry-collagen",
    category: "collagen",
    name: { en: "Berry Collagen Bliss", ar: "نشوة التوت بالكولاجين" },
    desc: {
      en: "Mixed berries, green tea and collagen.",
      ar: "توت مشكل مع شاي أخضر وكولاجين.",
    },
    price: 32,
    icon: "🫐",
    isNew: true,
  },
  {
    id: "pastel-glow-collagen",
    category: "collagen",
    name: { en: "Pastel Glow Collagen", ar: "توهج الباستيل بالكولاجين" },
    desc: {
      en: "Our signature pink-lavender collagen blend.",
      ar: "مزيجنا المميز من الكولاجين بالوردي والبنفسجي.",
    },
    price: 32,
    icon: "✨",
    isNew: true,
  },
];

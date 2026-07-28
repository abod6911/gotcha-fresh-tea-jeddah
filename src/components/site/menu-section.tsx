import { useEffect, useMemo, useRef, useState } from "react";
import { Minus, Plus, Search, ShoppingBag } from "lucide-react";
import { categories, menuItems, type MenuCategory, type MenuItem } from "@/data/menu";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import {
  SIZE_EXTRA,
  TOPPINGS,
  toppingPrice,
  useCart,
  type IceLevel,
  type Size,
  type SugarLevel,
} from "@/lib/cart";

const SUGARS: SugarLevel[] = [0, 30, 50, 70, 100];
const ICES: { id: IceLevel; label: { en: string; ar: string } }[] = [
  { id: "no", label: { en: "No ice", ar: "بدون ثلج" } },
  { id: "less", label: { en: "Less ice", ar: "ثلج قليل" } },
  { id: "regular", label: { en: "Regular", ar: "عادي" } },
  { id: "extra", label: { en: "Extra ice", ar: "ثلج إضافي" } },
];

function OrderPanel({ item, onDone }: { item: MenuItem; onDone: () => void }) {
  const { t } = useLang();
  const { add } = useCart();
  const [size, setSize] = useState<Size>("regular");
  const [sugar, setSugar] = useState<SugarLevel>(50);
  const [ice, setIce] = useState<IceLevel>("regular");
  const [toppings, setToppings] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  const unit = item.price + SIZE_EXTRA[size] + toppingPrice(toppings);

  return (
    <div className="mt-4 space-y-4 rounded-2xl bg-cream-2 p-4">
      <div>
        <p className="mb-2 text-xs font-semibold text-plum">{t({ en: "Size", ar: "الحجم" })}</p>
        <div className="flex gap-2">
          {(["regular", "large"] as Size[]).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                size === s
                  ? "bg-gradient-neon text-primary-foreground"
                  : "border border-border bg-card text-plum-soft hover:text-plum"
              }`}
            >
              {s === "regular"
                ? t({ en: "Regular", ar: "وسط" })
                : `${t({ en: "Large", ar: "كبير" })} +5`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-plum">{t({ en: "Sugar level", ar: "نسبة السكر" })}</p>
        <div className="flex flex-wrap gap-2">
          {SUGARS.map((s) => (
            <button
              key={s}
              onClick={() => setSugar(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                sugar === s
                  ? "bg-gradient-neon text-primary-foreground"
                  : "border border-border bg-card text-plum-soft hover:text-plum"
              }`}
            >
              {s}%
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-plum">{t({ en: "Ice level", ar: "نسبة الثلج" })}</p>
        <div className="flex flex-wrap gap-2">
          {ICES.map((i) => (
            <button
              key={i.id}
              onClick={() => setIce(i.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                ice === i.id
                  ? "bg-gradient-neon text-primary-foreground"
                  : "border border-border bg-card text-plum-soft hover:text-plum"
              }`}
            >
              {t(i.label)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-plum">{t({ en: "Toppings", ar: "الإضافات" })}</p>
        <div className="flex flex-wrap gap-2">
          {TOPPINGS.map((top) => {
            const on = toppings.includes(top.id);
            return (
              <button
                key={top.id}
                onClick={() =>
                  setToppings((prev) =>
                    on ? prev.filter((x) => x !== top.id) : [...prev, top.id],
                  )
                }
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  on
                    ? "bg-gradient-neon text-primary-foreground"
                    : "border border-border bg-card text-plum-soft hover:text-plum"
                }`}
              >
                {t(top.label)} +{top.price}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label={t({ en: "Decrease", ar: "إنقاص" })}
            className="rounded-full p-1 text-plum-soft hover:text-plum"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-5 text-center text-sm font-bold text-plum">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label={t({ en: "Increase", ar: "زيادة" })}
            className="rounded-full p-1 text-plum-soft hover:text-plum"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <button
          onClick={() => {
            add(item, { size, sugar, ice, toppings, qty });
            onDone();
          }}
          className="bg-gradient-neon inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          <ShoppingBag className="h-4 w-4" />
          {t({ en: "Add", ar: "أضف" })} · {unit * qty} {t({ en: "SAR", ar: "ر.س" })}
        </button>
      </div>
    </div>
  );
}

function MenuCard({ item, index, isSearching }: { item: MenuItem; index: number; isSearching: boolean }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`product-card group relative ${!isSearching ? 'animate-card-in' : ''}`}
      style={{ animationDelay: !isSearching ? `${Math.min(index, 8) * 0.05}s` : '0s' }}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Item Icon / Image Container */}
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-soft/80 via-cream-2 to-lav-soft/60 p-2 shadow-inner border border-white/60 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
          <img 
            src={categories.find(c => c.id === item.category)?.icon || item.icon} 
            alt="" 
            className="w-full h-full object-cover rounded-xl" 
            aria-hidden="true" 
          />
        </div>

        {/* Item Content */}
        <div className="min-w-0 flex-1 w-full">
          <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
            <h3 className="text-base sm:text-lg font-bold text-plum font-display leading-snug flex items-center flex-wrap gap-2">
              <span>{t(item.name)}</span>
              {item.isNew && (
                <span className="badge-pastel shadow-sm">
                  ✨ {t({ en: "NEW", ar: "جديد" })}
                </span>
              )}
              {item.popular && (
                <span className="badge-pastel shadow-sm">
                  🔥 {t({ en: "Best Seller", ar: "الأكثر مبيعاً" })}
                </span>
              )}
            </h3>

            {/* Glowing Price Tag */}
            <span className="shrink-0 bg-pink-soft/80 border border-pink-deep/30 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold text-plum shadow-sm">
              {item.price} {t({ en: "SAR", ar: "ر.س" })}
            </span>
          </div>

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-plum-soft font-medium">
            {t(item.desc)}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-pink-deep/15 pt-3">
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-plum-soft">
              Gotcha Signature
            </span>
            <button
              onClick={() => setOpen((v) => !v)}
              className="bg-gradient-neon px-4 sm:px-5 py-2 text-xs font-bold text-white shadow-glow hover:scale-105 active:scale-95 transition-all"
            >
              {open ? t({ en: "Close Panel", ar: "إغلاق النافذة" }) : t({ en: "Customise & Order", ar: "خصّص واطلب" })}
            </button>
          </div>
        </div>
      </div>

      {open && <OrderPanel item={item} onDone={() => setOpen(false)} />}
    </article>
  );
}

export function MenuSection() {
  const { t, dir } = useLang();
  const head = useReveal();
  const tabsReveal = useReveal();
  const [cat, setCat] = useState<MenuCategory>("milk");
  const [query, setQuery] = useState("");
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [indicator, setIndicator] = useState({ width: 0, offset: 0 });

  const position = () => {
    const container = tabsRef.current;
    if (!container) return;
    const active = container.querySelector<HTMLButtonElement>("[data-active='true']");
    if (!active) return;
    const cRect = container.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();
    const offset =
      dir === "rtl" ? cRect.right - aRect.right : aRect.left - cRect.left;
    setIndicator({ width: aRect.width, offset });
  };

  useEffect(() => {
    position();
    const onResize = () => position();
    window.addEventListener("resize", onResize);
    const timer = window.setTimeout(position, 80);
    if (document.fonts?.ready) void document.fonts.ready.then(position);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
    };
  }, [cat, dir]);

  const isSearching = useMemo(() => query.trim().length > 0, [query]);

  const items = useMemo(() => {
    const raw = query.trim();
    if (!raw) {
      return menuItems.filter((i) => i.category === cat);
    }
    const q = raw.toLowerCase();
    return menuItems.filter((i) => {
      const nameEn = i.name.en?.toLowerCase() || "";
      const nameAr = i.name.ar || "";
      const descEn = i.desc.en?.toLowerCase() || "";
      const descAr = i.desc.ar || "";
      const category = i.category?.toLowerCase() || "";

      return (
        nameEn.includes(q) ||
        nameAr.toLowerCase().includes(q) ||
        nameAr.includes(raw) ||
        descEn.includes(q) ||
        descAr.includes(raw) ||
        category.includes(q)
      );
    });
  }, [cat, query]);

  return (
    <section id="menu" className="relative bg-gradient-to-b from-cream to-pink-soft/60 py-16 lg:py-24">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div ref={head.ref} className={`${head.className} mx-auto max-w-2xl text-center`}>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink">
            {t({ en: "Our Menu", ar: "قائمتنا" })}
          </span>
          <h2 className="mt-3 text-3xl text-plum sm:text-4xl">
            {t({ en: "Something fresh for every mood", ar: "مشروب طازج يناسب كل مزاج" })}
          </h2>
          <p className="mt-3 text-plum-soft">
            {t({
              en: "Four signature families, all brewed fresh — never from powder.",
              ar: "أربع عائلات مشروبات مميزة، جميعها تُحضّر طازجة دون أي مسحوق.",
            })}
          </p>
        </div>

        <div
          ref={tabsReveal.ref}
          className={`${tabsReveal.className} mt-10 flex flex-col items-center gap-4`}
        >
          {/* Category Tabs */}
          <div className="w-full max-w-full overflow-x-auto no-scrollbar pb-1">
            <div
              ref={tabsRef}
              className="relative flex w-max mx-auto justify-start gap-1 rounded-full border border-border bg-card p-1.5"
            >
              <span
                className="bg-gradient-neon absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300"
                style={{
                  width: indicator.width,
                  insetInlineStart: indicator.offset,
                  opacity: indicator.width ? 1 : 0,
                }}
                aria-hidden="true"
              />
              {categories.map((c) => (
                <button
                  key={c.id}
                  data-active={cat === c.id}
                  onClick={() => setCat(c.id)}
                  className={`relative z-10 flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    cat === c.id ? "text-primary-foreground" : "text-plum-soft hover:text-plum"
                  }`}
                >
                  <img src={c.icon} alt="" className="w-5 h-5 rounded-full object-cover border border-white/20" aria-hidden="true" />
                  {t(c.label)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} isSearching={isSearching} />
          ))}
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center bg-card/60 rounded-3xl border border-pink-deep/20 p-8 shadow-sm">
              <span className="text-4xl">🍵</span>
              <h4 className="mt-3 font-bold text-plum text-lg">
                {t({ en: "No drinks match your search", ar: "لم نجد مشروباً بهذا الاسم" })}
              </h4>
              <p className="mt-1 text-sm text-plum-soft">
                {t({ en: "Try searching for Matcha, Collagen, or Boba Pearl", ar: "جرّب البحث عن: ماتشا، بوبا، شاي الفواكه، أو الكولاجين" })}
              </p>
              <button
                onClick={() => setQuery("")}
                className="mt-4 rounded-full bg-pink-soft px-5 py-2 text-xs font-bold text-plum hover:bg-pink-deep hover:text-white transition-colors"
              >
                {t({ en: "Show all drinks", ar: "عرض جميع المشروبات" })}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

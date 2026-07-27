import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <article
      className="animate-card-in rounded-[1.75rem] border border-border bg-card p-5 shadow-soft transition-transform duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-soft to-lav-soft overflow-hidden relative self-start">
          <img src={categories.find(c => c.id === item.category)?.icon || item.icon} alt="" className="w-full h-full object-cover mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-plum">
              {t(item.name)}
              {item.isNew && (
                <span className="bg-gradient-neon ms-2 rounded-full px-2 py-0.5 align-middle text-[0.6rem] font-bold text-primary-foreground">
                  {t({ en: "NEW", ar: "جديد" })}
                </span>
              )}
            </h3>
            <span className="whitespace-nowrap text-sm font-bold text-ink">
              {item.price} {t({ en: "SAR", ar: "ر.س" })}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-plum-soft">{t(item.desc)}</p>
          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-3 rounded-full border-[1.5px] border-pink-deep px-4 py-1.5 text-xs font-semibold text-plum transition-colors hover:bg-pink-soft"
          >
            {open ? t({ en: "Close", ar: "إغلاق" }) : t({ en: "Customise & order", ar: "خصّص واطلب" })}
          </button>
        </div>
      </div>
      {open && <OrderPanel item={item} onDone={() => setOpen(false)} />}
    </article>
  );
}

export function MenuSection() {
  const { t } = useLang();
  const head = useReveal();
  const tabsReveal = useReveal();
  const [cat, setCat] = useState<MenuCategory>("milk");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menuItems.filter(
      (i) =>
        i.category === cat &&
        (!q ||
          i.name.en.toLowerCase().includes(q) ||
          i.name.ar.includes(query.trim()) ||
          i.desc.en.toLowerCase().includes(q)),
    );
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
          <div
            className="relative flex w-full max-w-full overflow-x-auto no-scrollbar justify-start sm:justify-center gap-1 rounded-full border border-border bg-card p-1.5"
          >
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`relative z-10 flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  cat === c.id ? "text-primary-foreground" : "text-plum-soft hover:text-plum"
                }`}
              >
                {cat === c.id && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="bg-gradient-neon absolute inset-0 rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <img src={c.icon} alt="" className="w-5 h-5 rounded-full object-cover border border-white/20" aria-hidden="true" />
                {t(c.label)}
              </button>
            ))}
          </div>

          <label className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute inset-y-0 start-4 my-auto h-4 w-4 text-plum-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t({ en: "Search drinks...", ar: "ابحث عن مشروب..." })}
              className="w-full rounded-full border border-border bg-card py-2.5 ps-11 pe-4 text-sm text-plum outline-none transition-colors placeholder:text-plum-soft focus:border-pink-deep"
            />
          </label>
        </div>

        <div key={cat} className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
          {items.length === 0 && (
            <p className="col-span-full text-center text-plum-soft">
              {t({ en: "No drinks match your search.", ar: "لا توجد مشروبات مطابقة لبحثك." })}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

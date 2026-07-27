import { Minus, Plus, ShoppingBag, Trash2, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { TOPPINGS, useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

type OrderType = "pickup" | "delivery";

export function CartDrawer() {
  const { t, lang } = useLang();
  const { lines, isOpen, setOpen, total, updateQty, remove, clear, count } = useCart();
  const { user, addPoints, setAuthOpen } = useAuth();
  const [orderType, setOrderType] = useState<OrderType>("pickup");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const sugarIce = (sugar: number, ice: string) =>
    `${t({ en: "Sugar", ar: "سكر" })} ${sugar}% · ${t({ en: "Ice", ar: "ثلج" })}: ${
      { no: t({ en: "none", ar: "بدون" }), less: t({ en: "less", ar: "قليل" }), regular: t({ en: "regular", ar: "عادي" }), extra: t({ en: "extra", ar: "إضافي" }) }[
        ice as "no" | "less" | "regular" | "extra"
      ]
    }`;

  const buildMessage = () => {
    const header =
      lang === "ar"
        ? `طلب جديد من موقع قوتشا فريش تي (${orderType === "pickup" ? "استلام من الفرع" : "توصيل"})`
        : `New Gotcha Fresh Tea order (${orderType === "pickup" ? "Pickup" : "Delivery"})`;
    const body = lines
      .map((l) => {
        const tops = l.toppings
          .map((id) => t(TOPPINGS.find((x) => x.id === id)!.label))
          .join(", ");
        return `• ${l.qty}x ${t(l.name)} — ${
          l.size === "large" ? t({ en: "Large", ar: "كبير" }) : t({ en: "Regular", ar: "وسط" })
        } — ${sugarIce(l.sugar, l.ice)}${tops ? ` — ${tops}` : ""} = ${l.qty * l.unitPrice} ${t({ en: "SAR", ar: "ر.س" })}`;
      })
      .join("\n");
    const footer = `${t({ en: "Total", ar: "الإجمالي" })}: ${total} ${t({ en: "SAR", ar: "ر.س" })}`;
    const who = name || (user ? user.name : "");
    const nameLine = who ? `\n${t({ en: "Name", ar: "الاسم" })}: ${who}` : "";
    const extra = note ? `\n${t({ en: "Notes", ar: "ملاحظات" })}: ${note}` : "";
    return `${header}\n\n${body}\n\n${footer}${nameLine}${extra}`;
  };

  const handleCheckout = () => {
    if (user) {
      // Automatically calculate and add loyalty points (10 pts per SAR)
      const earned = Math.round(total * 10);
      addPoints(earned, total);
    }
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/966500000000?text=${msg}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        aria-label={t({ en: "Close cart", ar: "إغلاق السلة" })}
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-plum/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />
      <aside className="absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-card shadow-2xl transition-all animate-in slide-in-from-end duration-300">
        <header className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-plum">
            <ShoppingBag className="h-5 w-5 text-ink" />
            {t({ en: "Your order", ar: "طلبك" })} ({count})
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label={t({ en: "Close", ar: "إغلاق" })}
            className="rounded-full p-2 text-plum-soft hover:bg-pink-soft hover:text-plum transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
          {lines.length === 0 && (
            <div className="py-12 text-center">
              <span className="text-4xl">🧋</span>
              <p className="mt-3 text-sm text-plum-soft font-medium">
                {t({ en: "Your cart is still empty 🌸", ar: "سلتك فارغة حتى الآن 🌸" })}
              </p>
            </div>
          )}
          {lines.map((l) => (
            <div key={l.key} className="rounded-2xl border border-border bg-cream-2 p-4 transition-all hover:border-pink-deep/40">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-plum">
                    <span aria-hidden="true" className="me-1.5">
                      {l.icon}
                    </span>
                    {t(l.name)}
                  </p>
                  <p className="mt-1 text-xs text-plum-soft">
                    {l.size === "large" ? t({ en: "Large", ar: "كبير" }) : t({ en: "Regular", ar: "وسط" })} ·{" "}
                    {sugarIce(l.sugar, l.ice)}
                  </p>
                  {l.toppings.length > 0 && (
                    <p className="mt-1 text-xs text-plum-soft">
                      {l.toppings.map((id) => t(TOPPINGS.find((x) => x.id === id)!.label)).join(" · ")}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => remove(l.key)}
                  aria-label={t({ en: "Remove", ar: "حذف" })}
                  className="rounded-full p-1.5 text-plum-soft hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1">
                  <button
                    onClick={() => updateQty(l.key, -1)}
                    aria-label={t({ en: "Decrease", ar: "إنقاص" })}
                    className="rounded-full p-1 text-plum-soft hover:text-plum"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-5 text-center text-sm font-bold text-plum">{l.qty}</span>
                  <button
                    onClick={() => updateQty(l.key, 1)}
                    aria-label={t({ en: "Increase", ar: "زيادة" })}
                    className="rounded-full p-1 text-plum-soft hover:text-plum"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="text-sm font-bold text-ink">
                  {l.qty * l.unitPrice} {t({ en: "SAR", ar: "ر.س" })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {lines.length > 0 && (
          <footer className="space-y-3 border-t border-border px-6 py-4 bg-card">
            {/* Loyalty points notification bar */}
            <div className="flex items-center justify-between rounded-xl bg-pink-soft/70 px-3.5 py-2 text-xs text-plum border border-pink-deep/30">
              <span className="flex items-center gap-1.5 font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-neon" />
                {user
                  ? t({ en: `Earn +${total * 10} loyalty points`, ar: `ستكسب +${total * 10} نقطة ولاء` })
                  : t({ en: "Sign in to earn loyalty points!", ar: "سجل الدخول لكسب نقاط الولاء!" })}
              </span>
              {!user && (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="font-bold underline text-plum hover:text-neon"
                >
                  {t({ en: "Login", ar: "دخول" })}
                </button>
              )}
            </div>

            <div className="flex gap-2">
              {(["pickup", "delivery"] as OrderType[]).map((o) => (
                <button
                  key={o}
                  onClick={() => setOrderType(o)}
                  className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    orderType === o
                      ? "bg-gradient-neon text-primary-foreground shadow-sm"
                      : "border border-border text-plum-soft hover:text-plum"
                  }`}
                >
                  {o === "pickup"
                    ? t({ en: "Pickup", ar: "استلام من الفرع" })
                    : t({ en: "Delivery", ar: "توصيل" })}
                </button>
              ))}
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={user ? user.name : t({ en: "Your name", ar: "اسمك" })}
              className="w-full rounded-2xl border border-border bg-cream-2 px-4 py-2.5 text-sm text-plum outline-none placeholder:text-plum-soft focus:border-pink-deep transition-colors"
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder={t({ en: "Notes (optional)", ar: "ملاحظات (اختياري)" })}
              className="w-full resize-none rounded-2xl border border-border bg-cream-2 px-4 py-2.5 text-sm text-plum outline-none placeholder:text-plum-soft focus:border-pink-deep transition-colors"
            />
            <div className="flex items-center justify-between text-sm font-bold text-plum pt-1">
              <span>{t({ en: "Total", ar: "الإجمالي" })}</span>
              <span className="text-ink text-base">
                {total} {t({ en: "SAR", ar: "ر.س" })}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-gradient-neon flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              {t({ en: "Confirm & Send order", ar: "تأكيد وإرسال الطلب" })}
            </button>
            <button
              onClick={clear}
              className="w-full rounded-full py-1.5 text-xs font-semibold text-plum-soft hover:text-plum transition-colors"
            >
              {t({ en: "Clear cart", ar: "إفراغ السلة" })}
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}

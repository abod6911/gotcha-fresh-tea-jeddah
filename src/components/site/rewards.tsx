import { Award, Gift, Sparkles, CheckCircle2, LogIn } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { useAuth } from "@/lib/auth";

export function Rewards() {
  const { t } = useLang();
  const card = useReveal();
  const { user, setAuthOpen, redeemBlossom } = useAuth();

  const steps = [
    { n: "1", label: { en: "Scan your code at checkout", ar: "امسح رمزك عند الدفع" } },
    { n: "2", label: { en: "Collect 1 blossom per order", ar: "اجمع زهرة واحدة مع كل طلب" } },
    { n: "3", label: { en: "Redeem for a free drink", ar: "استبدلها بمشروب طازج مجاني" } },
  ];

  const rewardsList = [
    { id: "r1", cost: 5, title: { en: "Free Topping Choice", ar: "إضافة مجانية من إختيارك" }, icon: "🧋" },
    { id: "r2", cost: 10, title: { en: "Free Any Medium Fresh Tea", ar: "مشروب شاي طازج وسط مجاناً" }, icon: "🍵" },
    { id: "r3", cost: 15, title: { en: "Free Signature Collagen Drink", ar: "مشروب الكولاجين الفاخر مجاناً" }, icon: "✨" },
  ];

  const currentBlossoms = user ? user.blossoms : 0;
  const targetBlossoms = 10;
  const progressPercent = Math.min(100, Math.round((currentBlossoms / targetBlossoms) * 100));

  return (
    <section id="rewards" className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-6">
        <div
          ref={card.ref}
          className={`${card.className} grid gap-10 rounded-[2.5rem] bg-plum p-8 shadow-soft md:grid-cols-2 md:p-14 border border-pink/20 relative overflow-hidden`}
        >
          {/* Glow effects */}
          <div className="pointer-events-none absolute -top-32 -start-32 h-64 w-64 rounded-full bg-neon/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -end-32 h-64 w-64 rounded-full bg-pink-deep/20 blur-3xl" />

          {/* Left Column: Loyalty Info & User Status */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink/30 bg-pink/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-pink">
              <Sparkles className="h-3.5 w-3.5" />
              {t({ en: "Gotcha Loyalty Society", ar: "برنامج ولاء قوتشا فريش تي" })}
            </div>

            <h2 className="mt-4 text-3xl font-bold leading-snug text-cream md:text-4xl">
              {t({
                en: "Every handcrafted sip earns you complimentary rewards",
                ar: "كل كوب يقربك خطوة من كوب طازج مجاني",
              })}
            </h2>

            <p className="mt-4 leading-relaxed text-pink-soft/90 text-sm md:text-base">
              {t({
                en: "Authenticate effortlessly with Google or Apple. Collect blossoms automatically on every purchase and redeem complimentary signature teas!",
                ar: "سجّل دخولك بواسطة حساب جوجل أو أبل، واجمع الأزهار والنقاط تلقائياً مع كل طلب، واستبدلها بمشروبات مجانية وإضافات مميزة!",
              })}
            </p>

            {/* Interactive User Loyalty Status Card */}
            {user ? (
              <div className="mt-6 rounded-2xl border border-pink/30 bg-cream/10 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-neon" />
                    <div>
                      <h4 className="text-base font-bold text-cream">{user.name}</h4>
                      <p className="text-xs text-pink-soft">{user.tier} Member · {user.points} Points</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="text-2xl font-black text-pink">🌸 {user.blossoms}</span>
                    <p className="text-[0.7rem] text-pink-soft/80">{t({ en: "Blossoms", ar: "أزهار الولاء" })}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-pink-soft mb-1.5 font-medium">
                    <span>{t({ en: "Progress to free drink", ar: "التقدم نحو الكوب المجاني" })}</span>
                    <span>{user.blossoms} / {targetBlossoms} 🌸</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-plum/60 p-0.5 border border-pink/20">
                    <div
                      className="h-full rounded-full bg-gradient-neon transition-all duration-700 ease-out shadow-glow"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setAuthOpen(true)}
                  className="bg-gradient-neon inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg active:scale-95"
                >
                  <LogIn className="h-4 w-4" />
                  {t({ en: "Sign in with Google / Apple", ar: "تسجيل الدخول لجوجل / أبل" })}
                </button>
              </div>
            )}

            {/* How it works steps */}
            <div className="mt-8 grid gap-3">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="flex items-center gap-4 rounded-2xl border border-pink/15 bg-cream/5 p-3.5 transition-colors hover:bg-cream/10"
                >
                  <b className="bg-gradient-neon flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-base text-primary-foreground shadow-sm">
                    {s.n}
                  </b>
                  <span className="text-xs md:text-sm text-cream font-medium">{t(s.label)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Redeemable Rewards Grid */}
          <div className="relative z-10 flex flex-col justify-between rounded-2xl border border-pink/20 bg-cream/5 p-6 backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between border-b border-pink/20 pb-4">
                <h3 className="flex items-center gap-2 text-lg font-bold text-cream">
                  <Gift className="h-5 w-5 text-pink" />
                  {t({ en: "Redeemable Rewards", ar: "قائمة المكافآت المتاحة" })}
                </h3>
                <span className="text-xs font-semibold text-pink">
                  {user ? `${user.blossoms} 🌸` : t({ en: "Sign in to redeem", ar: "سجل لاستبدالها" })}
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {rewardsList.map((rw) => {
                  const canAfford = user && user.blossoms >= rw.cost;
                  return (
                    <div
                      key={rw.id}
                      className={`flex items-center justify-between rounded-2xl border p-4 transition-all duration-300 ${
                        canAfford
                          ? "border-pink/50 bg-cream/15 shadow-glow"
                          : "border-pink/10 bg-cream/5 opacity-85"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink/20 text-2xl">
                          {rw.icon}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-cream">{t(rw.title)}</h4>
                          <p className="text-xs text-pink-soft">{rw.cost} {t({ en: "Blossoms required", ar: "أزهار مطلوبة" })}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => redeemBlossom(rw.cost, t(rw.title))}
                        className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                          canAfford
                            ? "bg-gradient-neon text-primary-foreground shadow-glow hover:scale-105"
                            : "border border-pink/30 text-pink-soft hover:bg-pink/10"
                        }`}
                      >
                        {canAfford ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {t({ en: "Redeem", ar: "استبدل الآن" })}
                          </span>
                        ) : (
                          t({ en: "Redeem", ar: "استبدال" })
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-pink/10 p-3.5 text-center text-xs text-pink-soft border border-pink/20">
              <span className="font-semibold text-cream">💡 {t({ en: "Pro tip:", ar: "نصيحة:" })}</span>{" "}
              {t({
                en: "Every WhatsApp order automatically credits points & blossoms to your active profile!",
                ar: "كل طلب عبر الواتساب يحسب النقاط والأزهار تلقائياً لحسابك المسجّل!",
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

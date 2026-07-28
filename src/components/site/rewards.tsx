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

  const currentBlossoms = user ? (user.blossoms ?? 1) : 0;
  const targetBlossoms = 10;
  const progressPercent = Math.min(100, Math.round((currentBlossoms / targetBlossoms) * 100));

  return (
    <section id="rewards" className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-pink-soft/30 via-cream to-cream-2">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div
          ref={card.ref}
          className={`${card.className} grid gap-8 lg:grid-cols-2 rounded-[2.5rem] bg-gradient-to-br from-card via-cream-2/90 to-pink-soft/50 p-5 sm:p-8 lg:p-12 shadow-2xl border border-pink-deep/30 relative overflow-hidden backdrop-blur-md`}
        >
          {/* Background Ambient Glows */}
          <div className="pointer-events-none absolute -top-24 -start-24 h-48 w-48 rounded-full bg-pink-soft/30 blur-2xl opacity-50" />
          <div className="pointer-events-none absolute -bottom-24 -end-24 h-48 w-48 rounded-full bg-lav-soft/30 blur-2xl opacity-50" />

          {/* Left Column: Loyalty Info & User Status */}
          <div className="relative z-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-pink-deep/30 bg-pink-soft/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-plum shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-neon" />
                {t({ en: "Gotcha Loyalty Society", ar: "برنامج ولاء قوتشا فريش تي" })}
              </div>

              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-plum font-display">
                {t({
                  en: "Every handcrafted sip earns you complimentary rewards",
                  ar: "كل كوب يقربك خطوة من كوب طازج مجاني",
                })}
              </h2>

              <p className="mt-3 leading-relaxed text-plum-soft text-xs sm:text-sm lg:text-base font-medium">
                {t({
                  en: "Authenticate effortlessly with Google. Collect blossoms automatically on every purchase and redeem complimentary signature teas!",
                  ar: "سجّل دخولك بواسطة حساب Google، واجمع الأزهار والنقاط تلقائياً مع كل طلب، واستبدلها بمشروبات مجانية وإضافات مميزة!",
                })}
              </p>

              {/* Interactive User Loyalty Status Card or Sign-in CTA */}
              {user ? (
                <div className="mt-6 rounded-3xl border-2 border-pink-deep/30 bg-white/95 p-5 shadow-xl backdrop-blur-md transition-all hover:border-pink-deep/50">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-pink-deep shrink-0 bg-white shadow-md" />
                      <div className="min-w-0">
                        <h4 className="text-sm sm:text-base font-bold text-plum truncate">{user.name}</h4>
                        <p className="text-xs text-plum-soft font-semibold">{user.tier || "Bronze"} Member · {user.points ?? 50} pts</p>
                      </div>
                    </div>
                    <div className="text-end shrink-0 bg-gradient-to-r from-pink-soft to-cream-2 border-2 border-pink-deep/40 px-4 py-2 rounded-2xl shadow-sm">
                      <span className="text-xl sm:text-2xl font-black text-plum font-display">🌸 {user.blossoms ?? 1}</span>
                      <p className="text-[0.65rem] font-bold text-plum-soft">{t({ en: "Blossoms", ar: "أزهار الولاء" })}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-plum-soft mb-1.5 font-bold">
                      <span>{t({ en: "Progress to free drink", ar: "التقدم نحو الكوب المجاني" })}</span>
                      <span className="text-plum">{user.blossoms ?? 1} / {targetBlossoms} 🌸</span>
                    </div>
                    <div className="h-3.5 w-full overflow-hidden rounded-full bg-cream-2 p-0.5 border border-pink-deep/30 shadow-inner">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 transition-all duration-700 ease-out shadow-md"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <button
                    onClick={() => setAuthOpen(true)}
                    className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 border-2 border-white/40 text-white shadow-[0_10px_25px_-5px_rgba(255,20,147,0.45)] inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_14px_30px_-4px_rgba(255,20,147,0.6)] active:scale-95 w-full sm:w-auto cursor-pointer"
                  >
                    <LogIn className="h-4 w-4" />
                    {t({ en: "Sign in with Google", ar: "تسجيل الدخول بواسطة Google" })}
                  </button>
                </div>
              )}

              {/* How it works steps */}
              <div className="mt-6 grid gap-3">
                {steps.map((s) => (
                  <div
                    key={s.n}
                    className="group flex items-center gap-3.5 rounded-2xl border-2 border-pink-deep/20 bg-white/90 p-3.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-pink-deep/50 hover:bg-white hover:scale-[1.02] hover:shadow-md"
                  >
                    <b className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-black text-white shadow-md border border-white/40">
                      {s.n}
                    </b>
                    <span className="text-xs sm:text-sm text-plum font-bold font-display">{t(s.label)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Redeemable Rewards Grid */}
          <div className="relative z-10 flex flex-col justify-between rounded-[2rem] border-2 border-pink-deep/30 bg-white/95 p-5 sm:p-7 backdrop-blur-md shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-pink-deep/20 pb-4">
                <h3 className="flex items-center gap-2 text-base sm:text-lg font-bold text-plum font-display">
                  <Gift className="h-5 w-5 text-neon" />
                  {t({ en: "Redeemable Rewards", ar: "قائمة المكافآت المتاحة" })}
                </h3>
                <span className="text-xs font-bold text-plum bg-pink-soft/90 px-3.5 py-1.5 rounded-full border border-pink-deep/30 shadow-xs">
                  {user ? `🌸 ${user.blossoms ?? 1}` : t({ en: "Sign in to redeem", ar: "سجل للاستبدال" })}
                </span>
              </div>

              <div className="mt-5 space-y-3.5">
                {rewardsList.map((rw) => {
                  const canAfford = user && (user.blossoms ?? 1) >= rw.cost;
                  return (
                    <div
                      key={rw.id}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 rounded-2xl border-2 p-4 transition-all duration-300 ${
                        canAfford
                          ? "border-pink-deep/40 bg-gradient-to-r from-pink-soft/70 via-cream-2 to-white shadow-md hover:scale-[1.02]"
                          : "border-pink-deep/20 bg-white/90 shadow-sm hover:border-pink-deep/40"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-soft to-cream-2 text-2xl border border-pink-deep/30 shadow-inner">
                          {rw.icon}
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-plum leading-snug font-display">{t(rw.title)}</h4>
                          <p className="text-[0.72rem] text-plum-soft font-semibold mt-0.5">{rw.cost} {t({ en: "Blossoms required", ar: "أزهار مطلوبة" })}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => redeemBlossom(rw.cost, t(rw.title))}
                        className={`w-full sm:w-auto rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 shrink-0 cursor-pointer ${
                          canAfford
                            ? "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 border-2 border-white/40 text-white shadow-md hover:scale-105 active:scale-95"
                            : "border-2 border-pink-deep/30 bg-card text-plum font-bold hover:bg-pink-soft hover:border-pink-deep shadow-xs"
                        }`}
                      >
                        {canAfford ? (
                          <span className="flex items-center justify-center gap-1">
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

            <div className="mt-6 rounded-2xl bg-gradient-to-r from-pink-soft/80 via-cream-2 to-pink-soft/80 p-4 text-center text-xs text-plum font-semibold border-2 border-pink-deep/25 shadow-xs">
              <span className="font-bold text-plum">💡 {t({ en: "Pro tip:", ar: "نصيحة:" })}</span>{" "}
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

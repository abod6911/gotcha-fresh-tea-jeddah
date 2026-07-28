import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { TabebuiaTree } from "./decor";
import { Sparkles, Mountain, Leaf, ShieldCheck, Sun } from "lucide-react";

export function Farms() {
  const { t } = useLang();
  const copy = useReveal();
  const art = useReveal();

  const stats = [
    { value: "1,200m", label: { en: "Average farm elevation", ar: "متوسط ارتفاع المزارع الجبلية" }, icon: <Mountain className="h-5 w-5 text-neon shrink-0" /> },
    { value: "100%", label: { en: "Hand-picked leaves", ar: "قطف يدوي بالكامل ورقة بورقة" }, icon: <Leaf className="h-5 w-5 text-emerald-500 shrink-0" /> },
    { value: "24h", label: { en: "Farm to store, fresh", ar: "من المزرعة للمحل خلال 24 ساعة" }, icon: <Sparkles className="h-5 w-5 text-amber-500 shrink-0" /> },
    { value: "0%", label: { en: "Powder or concentrate", ar: "مسحوق أو مركزات صناعية" }, icon: <ShieldCheck className="h-5 w-5 text-pink-deep shrink-0" /> },
  ];

  return (
    <section id="farms" className="relative overflow-hidden py-16 lg:py-24 max-w-full">
      <TabebuiaTree
        className="hidden h-[460px] w-[340px] opacity-25 lg:block"
        style={{ top: -30, insetInlineEnd: -80 }}
      />
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:gap-14 px-4 sm:px-6 lg:grid-cols-2">
        
        {/* Text & Stats */}
        <div ref={copy.ref} className={copy.className}>
          <span className="badge-pastel shadow-sm">
            <Leaf className="h-3.5 w-3.5 text-[#FF1493] shrink-0" />
            {t({ en: "Single-Origin Farming", ar: "مصدر نُقدّر عنايته" })}
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-snug sm:leading-tight text-plum sm:text-4xl lg:text-5xl font-display">
            {t({ en: "Pristine High-Altitude Taiwanese Tea Gardens", ar: "من مزارعنا الخاصة في تايوان" })}
          </h2>

          <p className="mt-5 text-base sm:text-lg leading-relaxed text-plum/90 font-medium">
            {t({
              en: "Nestled in the misty high mountain ridges of Taiwan, our leaves are cultivated at 1,200m elevation. Each bud is hand-harvested at peak bloom and rigorously inspected to ensure uncompromised purity. That is why Gotcha tea tastes genuinely fresh, botanical, and pure — never artificial.",
              ar: "في التلال الضبابية المرتفعة بتايوان، تُزرع أوراق شاينا على ارتفاعات مثالية (1,200 متر فوق سطح البحر)، وتُقطف يدويًا في أوج نضجها، وتُفحص ورقة تلو الأخرى قبل أن تصل إلى الكوب. لهذا السبب يبقى طعم شاينا حقيقي، طازج، وصافي.",
            })}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3.5 sm:gap-4">
            {stats.map((s) => (
              <div 
                key={s.value} 
                className="group rounded-2xl border border-pink-deep/25 bg-card/90 p-4 sm:p-5 shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-glow hover:border-neon"
              >
                <div className="flex items-center justify-between mb-2">
                  <b className="font-display text-2xl sm:text-3xl text-plum group-hover:text-neon transition-colors">{s.value}</b>
                  {s.icon}
                </div>
                <span className="text-xs sm:text-sm font-bold text-plum/80 leading-snug block">{t(s.label)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Taiwan Tea Farm Mountain Illustration Card */}
        <div
          ref={art.ref}
          className={`${art.className} relative h-[360px] sm:h-[420px] w-full overflow-hidden rounded-[2.5rem] border border-pink-deep/30 bg-gradient-to-br from-emerald-950/20 via-pink-soft/40 to-lav-soft/60 p-6 shadow-glow-lg flex flex-col justify-between`}
        >
          {/* Ambient Glows & Sun */}
          <div className="pointer-events-none absolute top-8 end-8 h-24 w-24 rounded-full bg-amber-200/50 blur-xl flex items-center justify-center">
            <Sun className="h-12 w-12 text-amber-400 opacity-60 animate-pulse" />
          </div>
          
          {/* Mountain Silhouettes */}
          <div className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none opacity-80 z-0">
            <svg viewBox="0 0 500 300" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0 300 L0 180 Q 120 100 250 190 T 500 120 L 500 300 Z" fill="oklch(0.85 0.05 320)" opacity="0.6" />
              <path d="M0 300 L0 220 Q 180 120 350 240 T 500 180 L 500 300 Z" fill="oklch(0.79 0.08 340)" opacity="0.8" />
              <path d="M0 300 L0 250 Q 150 180 300 270 T 500 220 L 500 300 Z" fill="oklch(0.67 0.12 30)" opacity="0.9" />
            </svg>
          </div>

          {/* Floating Glass Badges */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-card/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-[#1A1A1A] shadow-sm">
              <Leaf className="h-3.5 w-3.5 text-emerald-600" />
              {t({ en: "Formosa Estate · Taiwan", ar: "مزارع فوروسا · تايوان" })}
            </span>
            <span className="rounded-full bg-[#1A1A1A] text-white px-3.5 py-1 text-xs font-bold shadow-md">
              1,200m Altitude
            </span>
          </div>

          {/* Center Card Caption */}
          <div className="relative z-10 max-w-xs rounded-2xl border border-white/80 bg-card/90 backdrop-blur-md p-4 shadow-soft">
            <b className="block text-sm font-bold text-[#1A1A1A] font-display">
              {t({ en: "Pure Botanical Integrity", ar: "نقاء وطزاجة من أصل الطبيعة" })}
            </b>
            <p className="mt-1 text-xs font-medium text-plum-soft">
              {t({
                en: "Every leaf is sun-dried and slow-roasted by master tea artisans.",
                ar: "تُجفف أوراق الشاي شمسياً وتُحمّص ببطء بأيدي خبراء الشاي."
              })}
            </p>
          </div>

          {/* High-Contrast Footer Pills */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/50 pt-3 text-xs font-bold">
            <span className="rounded-full bg-white/95 px-3 py-1 text-[#1A1A1A] shadow-sm">🌱 {t({ en: "100% Single-Origin", ar: "100% شاي صافي" })}</span>
            <span className="rounded-full bg-white/95 px-3 py-1 text-[#FF1493] shadow-sm">✨ {t({ en: "Hand-Picked Daily", ar: "قطف يدوي يومياً" })}</span>
          </div>

        </div>

      </div>
    </section>
  );
}

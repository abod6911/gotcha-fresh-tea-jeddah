import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { MapPin, Sparkles, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export function Story() {
  const { t } = useLang();
  const art = useReveal();
  const copy = useReveal();

  const features = [
    { icon: "🍃", label: { en: "Own farms in Taiwan", ar: "مزارعنا الخاصة في تايوان" } },
    { icon: "🫧", label: { en: "Handcrafted daily", ar: "تحضير يدوي طازج يومياً" } },
    { icon: "🌸", label: { en: "Pastel, chic interiors", ar: "أجواء باستيل راقية وأنيقة" } },
    { icon: "🇦🇺", label: { en: "Melbourne origin", ar: "أصل وتأسيس في ملبورن" } },
  ];

  const locations = [
    {
      id: "melbourne",
      city: { en: "Melbourne", ar: "ملبورن" },
      subtitle: { en: "2013 · The Origin", ar: "2013 · انطلاقة الحرفة" },
      flag: "🇦🇺",
      pos: "top-[12%] start-[10%]",
      accent: "from-amber-400 to-orange-500",
    },
    {
      id: "taiwan",
      city: { en: "Taiwan", ar: "تايوان" },
      subtitle: { en: "1,200m · Tea Estates", ar: "1,200م · مزارع الشاي الجبلية" },
      flag: "🍃",
      pos: "top-[42%] start-[48%]",
      accent: "from-emerald-400 to-teal-500",
    },
    {
      id: "jeddah",
      city: { en: "Jeddah", ar: "جدة" },
      subtitle: { en: "Now Blooming", ar: "الفرع الحالي يزهر بك" },
      flag: "🇸🇦",
      pos: "bottom-[12%] end-[10%]",
      accent: "from-pink-500 to-neon",
    },
  ];

  return (
    <section id="story" className="relative py-16 lg:py-24 overflow-hidden max-w-full">
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:gap-14 px-4 sm:px-6 lg:grid-cols-2">
        
        {/* Left Column: Text & Features */}
        <div ref={copy.ref} className={copy.className}>
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-deep/20 bg-pink-soft/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ink shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-neon shrink-0" />
            {t({ en: "Our Story", ar: "قصتنا ورحلتنا" })}
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-snug sm:leading-tight text-plum sm:text-4xl lg:text-5xl font-display">
            {t({
              en: "From a Melbourne Dream to Taiwan's Mountain Orchards",
              ar: "من فكرة في ملبورن إلى مزرعة شاي في تايوان",
            })}
          </h2>

          <p className="mt-5 text-base sm:text-lg leading-relaxed text-plum/90 font-medium">
            {t({
              en: "Born in Australia's cultural capital, Gotcha Fresh Tea was founded on a singular philosophy: tea is an artisan craft, never a shortcut. We cultivate our own tea leaves on high-altitude family estates in Taiwan, harvesting every flush at peak aroma and hand-steeping each batch fresh in-store daily.",
              ar: "بدأت قوتشا فريش تي في ملبورن، أستراليا، من فكرة بسيطة: الشاي يستحق أن يُعامل كحرفة أصيلة لا كحل سريع. كل كوب يبدأ رحلته من مزارعنا الخاصة في تايوان، حيث تُقطف الأوراق يدويًا في أوج نضجها وتُحضّر طازجة داخل المحل.",
            })}
          </p>

          <p className="mt-3.5 text-base sm:text-lg leading-relaxed text-plum/90 font-medium">
            {t({
              en: "What began as a boutique tea house now blooms globally — welcoming you to our pastel sanctuary in Jeddah, where every sip carries pure aesthetic joy & uncompromising quality.",
              ar: "وما بدأ فكرة صغيرة أصبح اليوم يتفتّح في مدن حول العالم، وها هو يزهر هنا في جدة، حيث يحمل كل فرع دفء الباستيل الذي يميزنا.",
            })}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {features.map((f) => (
              <span
                key={f.icon}
                className="inline-flex items-center gap-2.5 rounded-full border border-pink-deep/30 bg-card px-4 py-2.5 text-sm font-bold text-plum shadow-soft transition-all duration-300 hover:scale-105 hover:border-neon hover:bg-pink-soft"
              >
                <span className="text-base" aria-hidden="true">{f.icon}</span>
                {t(f.label)}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Luxury Interactive Journey Card */}
        <div 
          ref={art.ref} 
          className={`${art.className} relative h-[380px] sm:h-[440px] w-full overflow-hidden rounded-[2.5rem] border border-pink-deep/30 bg-gradient-to-br from-cream via-cream-2/90 to-pink-soft/40 p-6 shadow-glow-lg flex flex-col justify-between`}
        >
          {/* Subtle Ambient Background Grids & Glows */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.8),transparent_60%)]" />
          <div className="pointer-events-none absolute -bottom-20 -end-20 h-56 w-56 rounded-full bg-pink-deep/20 blur-3xl" />
          <div className="pointer-events-none absolute -top-20 -start-20 h-56 w-56 rounded-full bg-lav-deep/20 blur-3xl" />

          {/* Top Header inside Map Card */}
          <div className="relative z-10 flex items-center justify-between border-b border-pink-deep/15 pb-4">
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-neon" />
              <span className="text-xs font-bold uppercase tracking-wider text-plum">
                {t({ en: "Global Tea Journey", ar: "مسار الرحلة العالمية للشاي" })}
              </span>
            </div>
            <span className="rounded-full bg-card px-3 py-1 text-[0.7rem] font-bold text-plum border border-pink-deep/20 shadow-sm">
              Melbourne • Taiwan • Jeddah
            </span>
          </div>

          {/* SVG Animated Route Lines */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none z-0" viewBox="0 0 400 400" preserveAspectRatio="none">
            <motion.path
              d="M 60 80 Q 200 150 200 200 T 340 340"
              fill="none"
              stroke="url(#route-gradient)"
              strokeWidth="4"
              strokeDasharray="8 8"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            />
            <defs>
              <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.62 0.15 35)" />
                <stop offset="50%" stopColor="oklch(0.79 0.04 310)" />
                <stop offset="100%" stopColor="oklch(0.67 0.12 30)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Location Nodes */}
          <div className="relative z-10 h-full w-full">
            {locations.map((loc) => (
              <motion.div
                key={loc.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className={`absolute ${loc.pos} flex items-center gap-3`}
              >
                {/* Pulsing Node Marker */}
                <div className="relative flex h-6 w-6 items-center justify-center shrink-0">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r ${loc.accent} opacity-75`} />
                  <span className={`relative inline-flex h-4 w-4 rounded-full bg-gradient-to-r ${loc.accent} shadow-glow ring-2 ring-white`} />
                </div>

                {/* Glassmorphic Info Badge */}
                <div className="rounded-2xl border border-white/80 bg-card/90 backdrop-blur-md px-3.5 py-2 shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-glow">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{loc.flag}</span>
                    <b className="font-display text-sm text-plum">{t(loc.city)}</b>
                  </div>
                  <span className="block text-[0.65rem] font-medium text-plum-soft">
                    {t(loc.subtitle)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Card Footer */}
          <div className="relative z-10 flex items-center justify-between border-t border-pink-deep/15 pt-3.5 text-xs text-plum-soft">
            <span className="flex items-center gap-1 font-semibold text-plum">
              <MapPin className="h-3.5 w-3.5 text-neon" />
              {t({ en: "Direct Farm to Cup", ar: "من المزرعة مباشرة إلى كوبك" })}
            </span>
            <span className="font-bold text-neon">100% Organic</span>
          </div>

        </div>

      </div>
    </section>
  );
}


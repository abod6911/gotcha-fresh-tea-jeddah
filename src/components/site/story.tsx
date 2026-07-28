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
      posRtl: "top-[14%] right-[4%] sm:right-[6%]",
      posLtr: "top-[14%] left-[4%] sm:left-[6%]",
      accent: "from-amber-400 to-orange-500",
    },
    {
      id: "taiwan",
      city: { en: "Taiwan", ar: "تايوان" },
      subtitle: { en: "1,200m · Tea Estates", ar: "1,200م · مزارع الشاي الجبلية" },
      flag: "🍃",
      posRtl: "top-[44%] right-[32%] sm:right-[38%]",
      posLtr: "top-[44%] left-[32%] sm:left-[38%]",
      accent: "from-emerald-400 to-teal-500",
    },
    {
      id: "jeddah",
      city: { en: "Jeddah", ar: "جدة" },
      subtitle: { en: "Now Blooming", ar: "الفرع الحالي يزهر بك" },
      flag: "🇸🇦",
      posRtl: "bottom-[14%] left-[4%] sm:left-[6%]",
      posLtr: "bottom-[14%] right-[4%] sm:right-[6%]",
      accent: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section id="story" className="relative py-16 lg:py-24 overflow-hidden max-w-full">
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:gap-14 px-4 sm:px-6 lg:grid-cols-2">
        
        {/* Left Column: Text & Features */}
        <div ref={copy.ref} className={copy.className}>
          <span className="badge-pastel shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#FF1493] shrink-0" />
            {t({ en: "Our Story", ar: "قصتنا ورحلتنا" })}
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-snug sm:leading-tight text-plum sm:text-4xl lg:text-5xl font-display">
            {t({
              en: "From a Melbourne Dream to Taiwan's Mountain Orchards",
              ar: "من فكرة في ملبورن إلى مزرعة شاي في تايوان",
            })}
          </h2>

          <div className="mt-5 rounded-3xl border border-pink-deep/25 bg-white/90 p-5 sm:p-6 shadow-soft backdrop-blur-md space-y-4">
            <p className="text-base sm:text-lg leading-relaxed sm:leading-loose text-[#1A1A1A] font-bold">
              {t({
                en: "Born in Australia's cultural capital, Gotcha Fresh Tea was founded on a singular philosophy: tea is an artisan craft, never a shortcut. We cultivate our own tea leaves on high-altitude family estates in Taiwan, harvesting every flush at peak aroma and hand-steeping each batch fresh in-store daily.",
                ar: "بدأت قوتشا فريش تي في ملبورن، أستراليا، من فكرة بسيطة: الشاي يستحق أن يُعامل كحرفة أصيلة لا كحل سريع. كل كوب يبدأ رحلته من مزارعنا الخاصة في تايوان، حيث تُقطف الأوراق يدويًا في أوج نضجها وتُحضّر طازجة داخل المحل.",
              })}
            </p>

            <p className="text-base sm:text-lg leading-relaxed sm:leading-loose text-[#1A1A1A] font-bold border-t border-pink-deep/15 pt-4">
              {t({
                en: "What began as a boutique tea house now blooms globally — welcoming you to our pastel sanctuary in Jeddah, where every sip carries pure aesthetic joy & uncompromising quality.",
                ar: "وما بدأ فكرة صغيرة أصبح اليوم يتفتّح في مدن حول العالم، وها هو يزهر هنا في جدة، حيث يحمل كل فرع دفء الباستيل الذي يميزنا.",
              })}
            </p>
          </div>

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
          className={`${art.className} relative h-[380px] sm:h-[440px] w-full overflow-hidden rounded-[2.5rem] border border-pink-deep/20 bg-gradient-to-br from-cream via-cream-2/90 to-pink-soft/30 p-5 sm:p-6 shadow-xl flex flex-col justify-between`}
        >
          {/* Subtle Ambient Background Grids & Soft Glows */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-12 -end-12 h-32 w-32 sm:h-48 sm:w-48 rounded-full bg-pink-soft/40 blur-xl opacity-50" />
          <div className="pointer-events-none absolute -top-12 -start-12 h-32 w-32 sm:h-48 sm:w-48 rounded-full bg-lav-soft/40 blur-xl opacity-50" />

          {/* Top Header inside Map Card */}
          <div className="relative z-10 flex items-center justify-between border-b border-pink-deep/15 pb-4">
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-[#FF1493]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                {t({ en: "Global Tea Journey", ar: "مسار الرحلة العالمية للشاي" })}
              </span>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-[0.75rem] font-bold text-[#1A1A1A] border border-pink-deep/25 shadow-sm">
              Melbourne • Taiwan • Jeddah
            </span>
          </div>

          {/* SVG Animated Route Lines */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none z-0" viewBox="0 0 400 400" preserveAspectRatio="none">
            <motion.path
              d={isRtl ? "M 340 80 Q 200 160 200 200 T 60 330" : "M 60 80 Q 200 160 200 200 T 340 330"}
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
                <stop offset="0%" stopColor="#FF69B4" />
                <stop offset="50%" stopColor="#FF1493" />
                <stop offset="100%" stopColor="#C5A059" />
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
                className={`absolute ${isRtl ? loc.posRtl : loc.posLtr} flex items-center gap-2 sm:gap-2.5`}
              >
                <div className={`h-4 w-4 rounded-full bg-gradient-to-r ${loc.accent} shadow-glow animate-pulse shrink-0 ring-4 ring-white/60`} />
                <div className="flex items-center gap-2 rounded-2xl border border-pink-deep/20 bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 shadow-md hover:scale-105 transition-transform duration-300">
                  <span className="text-sm sm:text-base">{loc.flag}</span>
                  <div className="flex flex-col leading-tight">
                    <b className="text-xs sm:text-sm font-extrabold text-[#1A1A1A]">{t(loc.city)}</b>
                    <span className="text-[0.6rem] sm:text-[0.68rem] font-bold text-plum/75">{t(loc.subtitle)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* High-Contrast Footer Badge inside Map Card */}
          <div className="relative z-10 flex items-center justify-between border-t border-pink-deep/15 pt-3">
            <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#1A1A1A] shadow-sm">
              <MapPin className="h-3.5 w-3.5 text-[#FF1493]" />
              {t({ en: "Direct From Farm To Cup", ar: "من المزرعة مباشرة إلى كوبك" })}
            </span>
            <span className="rounded-full bg-[#FF1493] text-white px-3 py-1 text-xs font-bold shadow-sm">
              🌱 Organic 100%
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}


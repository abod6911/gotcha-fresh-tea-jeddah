import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";

export function Story() {
  const { t } = useLang();
  const art = useReveal();
  const copy = useReveal();

  const features = [
    { icon: "🍃", label: { en: "Own farms in Taiwan", ar: "مزارع خاصة في تايوان" } },
    { icon: "🫧", label: { en: "Handcrafted daily", ar: "تحضير يدوي يوميًا" } },
    { icon: "🌸", label: { en: "Pastel, chic interiors", ar: "أجواء باستيل أنيقة" } },
    { icon: "🇦🇺", label: { en: "Melbourne origin", ar: "أصل ملبورني" } },
  ];

  return (
    <section id="story" className="relative py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div ref={art.ref} className={`${art.className} rounded-[2rem] bg-cream-2 p-5 sm:p-8 shadow-soft`}>
          <svg viewBox="0 0 300 220" className="w-full" role="img" aria-label="Melbourne to Taiwan to Jeddah">
            <path
              d="M45 55 C 100 90, 140 60, 170 110"
              fill="none"
              stroke="var(--lav-deep)"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
            />
            <path
              d="M180 120 C 200 160, 230 150, 250 190"
              fill="none"
              stroke="var(--pink-deep)"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
            />
            <circle cx="40" cy="50" r="7" fill="var(--neon)" />
            <circle cx="175" cy="115" r="7" fill="var(--neon-2)" />
            <circle cx="255" cy="192" r="7" fill="var(--neon)" />
            <text x="55" y="55" fontSize="13" fill="var(--plum)">Melbourne</text>
            <text x="188" y="120" fontSize="13" fill="var(--plum)">Taiwan</text>
            <text x="196" y="212" fontSize="13" fill="var(--plum)">Jeddah</text>
          </svg>
        </div>

        <div ref={copy.ref} className={copy.className}>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink">
            {t({ en: "Our Story", ar: "قصتنا" })}
          </span>
          <h2 className="mt-3 text-3xl text-plum sm:text-4xl">
            {t({
              en: "From a Melbourne Dream to Taiwan's Mountain Orchards",
              ar: "من فكرة في ملبورن إلى مزرعة شاي في تايوان",
            })}
          </h2>
          <p className="mt-4 leading-relaxed text-plum-soft">
            {t({
              en: "Born in Australia's cultural capital, Gotcha Fresh Tea was founded on a singular philosophy: tea is an artisan craft, never a shortcut. We cultivate our own tea leaves on high-altitude family estates in Taiwan, harvesting every flush at peak aroma and hand-steeping each batch fresh in-store daily.",
              ar: "بدأت قوتشا فريش تي في ملبورن، أستراليا، من فكرة بسيطة: الشاي يستحق أن يُعامل كحرفة أصيلة لا كحل سريع. كل كوب يبدأ رحلته من مزارعنا الخاصة في تايوان، حيث تُقطف الأوراق يدويًا في أوج نضجها وتُحضّر طازجة داخل المحل.",
            })}
          </p>
          <p className="mt-3 leading-relaxed text-plum-soft">
            {t({
              en: "What began as a boutique tea house now blooms globally — welcoming you to our pastel sanctuary in Jeddah, where every sip carries pure aesthetic joy & uncompromising quality.",
              ar: "وما بدأ فكرة صغيرة أصبح اليوم يتفتّح في مدن حول العالم، وها هو يزهر هنا في جدة، حيث يحمل كل فرع دفء الباستيل الذي يميزنا.",
            })}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {features.map((f) => (
              <span
                key={f.icon}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-plum"
              >
                <span aria-hidden="true">{f.icon}</span>
                {t(f.label)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

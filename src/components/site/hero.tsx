import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { FlowerDeco, Petals, TabebuiaTree } from "./decor";

function CupVisual() {
  return (
    <div className="relative mx-auto h-[340px] w-[220px] animate-float-cup sm:h-[400px] sm:w-[260px]">
      <div className="absolute inset-x-3 top-4 h-6 rounded-t-[2rem] bg-lav-soft shadow-soft" />
      <div className="absolute inset-x-0 top-8 bottom-0 overflow-hidden rounded-b-[3rem] rounded-t-[1.5rem] border border-border bg-card/70 shadow-soft backdrop-blur">
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-pink-deep via-pink to-lav" />
        <div className="absolute inset-x-0 bottom-0 h-[24%] bg-plum/80" />
        <div className="absolute inset-y-0 start-4 w-6 animate-shine rounded-full bg-white/50 blur-[2px]" />
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="animate-pearl h-4 w-4 rounded-full bg-plum"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </div>
      </div>
      <div className="absolute -top-10 end-10 h-24 w-3 rotate-12 rounded-full bg-lav-deep" />
    </div>
  );
}

export function Hero() {
  const { t } = useLang();
  const left = useReveal();
  const right = useReveal();

  const stats = [
    { value: "100%", label: { en: "Fresh leaves, daily", ar: "أوراق طازجة يوميًا" } },
    { value: "2013", label: { en: "Founded in Melbourne", ar: "تأسست في ملبورن" } },
    { value: "0", label: { en: "Powder used, ever", ar: "مسحوق مستخدم" } },
  ];

  return (
    <section
      id="top"
      className="bg-gradient-pastel relative flex min-h-screen items-center overflow-hidden pb-16 pt-32"
    >
      <TabebuiaTree
        className="hidden h-[520px] w-[400px] opacity-45 sm:block"
        style={{ bottom: -40, insetInlineStart: -70 }}
      />
      <TabebuiaTree
        flip
        className="h-[420px] w-[320px] opacity-35"
        style={{ bottom: -60, insetInlineEnd: -90 }}
      />
      <Petals />
      <FlowerDeco className="w-[220px] opacity-55" style={{ top: 80, insetInlineStart: -60 }} />


      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div ref={left.ref} className={left.className}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-ink">
            {t({ en: "Melbourne born · Taiwan grown", ar: "وُلدت في ملبورن · نمت في تايوان" })}
          </span>
          <h1 className="mt-5 text-4xl leading-tight text-plum sm:text-5xl lg:text-6xl">
            {t({ en: "Handcrafted fresh tea, ", ar: "شاي طازج بلمسة يدوية، " })}
            <span className="text-gradient-neon">
              {t({ en: "poured with pastel joy", ar: "تُقدَّم بفرحة الباستيل" })}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-plum-soft">
            {t({
              en: "Every cup starts on our own tea farms in Taiwan and is brewed fresh in-store — never from powder. Now blooming in Jeddah.",
              ar: "كل كوب يبدأ رحلته من مزارعنا الخاصة في تايوان، ويُحضّر طازجًا داخل المحل دون أي مسحوق أو اختصارات. واليوم نزهر هنا في جدة.",
            })}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="bg-gradient-neon inline-flex rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg"
            >
              {t({ en: "View Menu", ar: "استعرض القائمة" })}
            </a>
            <a
              href="#locations"
              className="inline-flex rounded-full border-[1.5px] border-pink-deep px-7 py-3.5 text-sm font-semibold text-plum transition-colors hover:bg-pink-soft"
            >
              {t({ en: "Find a Branch", ar: "أقرب فرع" })}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-8">
            {stats.map((s) => (
              <div key={s.value} className="flex flex-col">
                <b className="font-display text-2xl text-plum">{s.value}</b>
                <span className="text-xs text-plum-soft">{t(s.label)}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={right.ref} className={`relative ${right.className}`}>
          <CupVisual />
          <div className="animate-badge absolute bottom-6 end-0 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-plum shadow-soft sm:end-2">
            <span className="h-2.5 w-2.5 rounded-full bg-neon" />
            {t({ en: "New: Collagen Tea line", ar: "جديد: تشكيلة كولاجين الشاي" })}
          </div>
        </div>
      </div>
    </section>
  );
}

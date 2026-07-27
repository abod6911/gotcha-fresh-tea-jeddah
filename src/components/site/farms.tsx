import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { FlowerDeco, TabebuiaTree } from "./decor";

export function Farms() {
  const { t } = useLang();
  const copy = useReveal();
  const art = useReveal();

  const stats = [
    { value: "1,200m", label: { en: "Average farm elevation", ar: "متوسط ارتفاع المزارع" } },
    { value: "100%", label: { en: "Hand-picked leaves", ar: "قطف يدوي بالكامل" } },
    { value: "24h", label: { en: "Farm to store, fresh", ar: "من المزرعة للمحل خلال" } },
    { value: "0%", label: { en: "Powder or concentrate", ar: "مسحوق أو مركزات" } },
  ];

  return (
    <section id="farms" className="relative overflow-hidden py-24">
      <TabebuiaTree
        className="hidden h-[460px] w-[340px] opacity-25 lg:block"
        style={{ top: -30, insetInlineEnd: -80 }}
      />
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 lg:grid-cols-2">
        <div ref={copy.ref} className={copy.className}>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink">
            {t({ en: "Single-Origin Farming", ar: "مصدر تُقدَّر عنايته" })}
          </span>
          <h2 className="mt-3 text-3xl text-plum sm:text-4xl">
            {t({ en: "Pristine High-Altitude Taiwanese Tea Gardens", ar: "من مزارعنا في تايوان" })}
          </h2>
          <p className="mt-4 leading-relaxed text-plum-soft">
            {t({
              en: "Nestled in the misty high mountain ridges of Taiwan, our leaves are cultivated at 1,200m elevation. Each bud is hand-harvested at peak bloom and rigorously inspected to ensure uncompromised purity. That is why Gotcha tea tastes genuinely fresh, botanical, and pure — never artificial.",
              ar: "في التلال الضبابية المرتفعة بتايوان، تُزرع أوراق شاينا على ارتفاعات مثالية، وتُقطف يدويًا في أوج نضجها، وتُفحص ورقة تلو الأخرى قبل أن تصل إلى الكوب. لهذا السبب يبقى طعم شاينا شاي حقيقي، لا مجرد خليط جاهز.",
            })}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.value} className="rounded-2xl border border-border bg-cream-2 p-5">
                <b className="font-display block text-2xl text-ink">{s.value}</b>
                <span className="text-sm text-plum-soft">{t(s.label)}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={art.ref}
          className={`${art.className} relative h-[340px] overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-lav-soft to-pink-soft shadow-soft`}
        >
          <div className="absolute -bottom-24 -start-10 h-64 w-[130%] rounded-[50%] bg-lav-deep/60" />
          <div className="absolute -bottom-28 start-16 h-64 w-[120%] rounded-[50%] bg-pink-deep/60" />
          <FlowerDeco className="w-[120px]" style={{ top: 20, insetInlineEnd: 20 }} />
        </div>
      </div>
    </section>
  );
}

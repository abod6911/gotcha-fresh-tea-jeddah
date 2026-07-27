import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";

const CARDS = [
  { emoji: "🌸", label: { en: "Peony corner", ar: "ركن الفاوانيا" }, tone: "from-pink to-lav" },
  { emoji: "🧋", label: { en: "Pearl pour", ar: "سكب اللؤلؤ" }, tone: "from-lav to-pink-deep" },
  { emoji: "🌷", label: { en: "Rose collagen", ar: "كولاجين الورد" }, tone: "from-pink-soft to-pink-deep" },
  { emoji: "✨", label: { en: "Neon evenings", ar: "أمسيات نيون" }, tone: "from-lav-deep to-pink" },
  { emoji: "🍑", label: { en: "Peach oolong", ar: "أولونغ الخوخ" }, tone: "from-pink to-lav-soft" },
  { emoji: "💜", label: { en: "Taro delight", ar: "متعة القلقاس" }, tone: "from-lav to-lav-deep" },
  { emoji: "🌼", label: { en: "Bloom wall", ar: "جدار الأزهار" }, tone: "from-pink-soft to-lav" },
  { emoji: "🍵", label: { en: "Fresh pour", ar: "تحضير طازج" }, tone: "from-lav-soft to-pink-deep" },
];

export function Gallery() {
  const { t } = useLang();
  const head = useReveal();
  const grid = useReveal();

  return (
    <section id="gallery" className="bg-gradient-to-b from-lav-soft to-cream py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <div ref={head.ref} className={`${head.className} mx-auto max-w-2xl text-center`}>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink">
            {t({ en: "Pastel Moments", ar: "لحظات باستيل" })}
          </span>
          <h2 className="mt-3 text-3xl text-plum sm:text-4xl">
            {t({ en: "Made for the feed, made for you", ar: "صُنعت لتُصوَّر، وصُنعت من أجلك" })}
          </h2>
        </div>

        <div
          ref={grid.ref}
          className={`${grid.className} mt-10 grid grid-cols-2 gap-4 md:grid-cols-4`}
        >
          {CARDS.map((card) => (
            <figure
              key={card.emoji + card.label.en}
              className={`group relative aspect-square overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${card.tone} shadow-soft`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center text-5xl transition-transform duration-500 group-hover:scale-110"
              >
                {card.emoji}
              </span>
              <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-plum/85 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold text-cream">
                {t(card.label)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";

const CARDS = [
  { imgSrc: "/images/gallery/peony_corner.jpg", label: { en: "Peony corner", ar: "ركن الفاوانيا" } },
  { imgSrc: "/images/gallery/rose_collagen.jpg", label: { en: "Rose collagen", ar: "كولاجين الورد" } },
  { imgSrc: "/images/gallery/pearl_pour.jpg", label: { en: "Pearl pour", ar: "سكب اللؤلؤ" } },
  { imgSrc: "/images/gallery/neon_evening.jpg", label: { en: "Neon evenings", ar: "أمسيات نيون" } },
  { imgSrc: "/images/gallery/fresh_pour.jpg", label: { en: "Fresh pour", ar: "تحضير طازج" } },
  { imgSrc: "/images/gallery/bloom_wall.jpg", label: { en: "Bloom wall", ar: "جدار الأزهار" } },
  { imgSrc: "/images/gallery/taro_delight.jpg", label: { en: "Taro delight", ar: "متعة القلقاس" } },
  { imgSrc: "/images/gallery/peach_oolong.jpg", label: { en: "Peach oolong", ar: "أولونغ الخوخ" } },
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
              key={card.label.en}
              className="group relative aspect-square overflow-hidden rounded-[1.5rem] shadow-soft"
            >
              <img
                src={card.imgSrc}
                alt={t(card.label)}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:rotate-1"
              />
              <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-plum/90 via-plum/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-bold text-white z-10 drop-shadow-md translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
                {t(card.label)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

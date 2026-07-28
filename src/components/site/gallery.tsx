import { useState } from "react";
import { X, ZoomIn, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";

const CARDS = [
  {
    id: 1,
    imgSrc: "./images/gallery/pearl_pour.jpg",
    label: { en: "Handcrafted Boba Pearl Pour", ar: "سكب بوبا اللؤلؤ الطازجة" },
    tag: { en: "Boba Milk Tea", ar: "شاي الحليب بالبوبا" },
  },
  {
    id: 2,
    imgSrc: "./images/gallery/rose_collagen.jpg",
    label: { en: "Rose Collagen Tea with Petals", ar: "شاي كولاجين الورد الفاخر" },
    tag: { en: "Collagen Series", ar: "سلسلة الكولاجين" },
  },
  {
    id: 3,
    imgSrc: "./images/gallery/fresh_pour.jpg",
    label: { en: "Fresh Taiwanese Oolong Brew", ar: "تحضير أوراق الشاي طازجة" },
    tag: { en: "Tea Craft", ar: "شاي يدوي" },
  },
  {
    id: 4,
    imgSrc: "./images/gallery/neon_evening.jpg",
    label: { en: "Gotcha Store Neon Ambience", ar: "أجواء مقهى قوتشا جدة" },
    tag: { en: "Jeddah Lounge", ar: "فرع جدة" },
  },
  {
    id: 5,
    imgSrc: "./images/gallery/peach_oolong.jpg",
    label: { en: "Fresh Summer Peach Oolong", ar: "شاي أولونغ الخوخ المنعش" },
    tag: { en: "Fruit Tea", ar: "شاي الفواكه" },
  },
  {
    id: 6,
    imgSrc: "./images/gallery/taro_delight.jpg",
    label: { en: "Creamy Purple Taro Boba", ar: "مشروب القلقاس البنفسجي" },
    tag: { en: "Taro Series", ar: "مشروبات تارو" },
  },
  {
    id: 7,
    imgSrc: "./images/gallery/bloom_wall.jpg",
    label: { en: "Peony Bloom Photo Wall", ar: "جدار أزهار الورد الطبيعي" },
    tag: { en: "Photo Spot", ar: "ركن التصوير" },
  },
  {
    id: 8,
    imgSrc: "./images/gallery/peony_corner.jpg",
    label: { en: "Gotcha Tea at Jeddah Sunset", ar: "تجربة قوتشا بكورنيش جدة" },
    tag: { en: "Jeddah Vibe", ar: "لحظات جدة" },
  },
];

export function Gallery() {
  const { t } = useLang();
  const head = useReveal();
  const grid = useReveal();
  const [selectedImg, setSelectedImg] = useState<{ src: string; title: string; tag: string } | null>(null);

  return (
    <section id="gallery" className="bg-gradient-to-b from-lav-soft/40 via-cream to-pink-soft/30 py-16 lg:py-24 overflow-hidden max-w-full">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div ref={head.ref} className={`${head.className} mx-auto max-w-2xl text-center`}>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-plum bg-pink-soft/80 border border-pink-deep/30 px-3.5 py-1 rounded-full shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-neon" />
            {t({ en: "Pastel Moments", ar: "لحظات وتصوير قوتشا" })}
          </span>
          <h2 className="mt-3 text-2xl font-bold text-plum sm:text-4xl font-display">
            {t({ en: "Made for the feed, made for you", ar: "صُنعت لتُصوَّر، وصُنعت من أجلك" })}
          </h2>
          <p className="mt-2 text-sm text-plum-soft font-medium">
            {t({
              en: "Real snapshots from our Jeddah tea lounge and handcrafted drinks.",
              ar: "لقطات واقعية من فرعنا بجدة ومشروباتنا الطازجة يومياً.",
            })}
          </p>
        </div>

        <div
          ref={grid.ref}
          className={`${grid.className} mt-10 grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-4`}
        >
          {CARDS.map((card) => (
            <figure
              key={card.id}
              onClick={() => setSelectedImg({ src: card.imgSrc, title: t(card.label), tag: t(card.tag) })}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-3xl border border-pink-deep/30 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-pink-deep hover:shadow-xl"
            >
              <img
                src={card.imgSrc}
                alt={t(card.label)}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              {/* High contrast dark gradient overlay */}
              <span className="absolute inset-0 bg-gradient-to-t from-plum/95 via-plum/50 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />
              
              {/* Floating Category Tag */}
              <span className="absolute top-2.5 start-2.5 z-10 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-[0.65rem] font-bold text-plum border border-pink-deep/30 shadow-sm">
                {t(card.tag)}
              </span>

              {/* Zoom Icon Hint */}
              <div className="absolute top-2.5 end-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-plum/60 backdrop-blur-md text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-md">
                <ZoomIn className="h-4 w-4" />
              </div>

              {/* High-contrast Caption Badge Pill */}
              <figcaption className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 text-end z-10">
                <span className="inline-block rounded-xl border border-white/20 bg-plum/90 backdrop-blur-md px-2.5 sm:px-3 py-1 text-[0.72rem] sm:text-xs font-bold text-white shadow-lg drop-shadow-md leading-relaxed">
                  {t(card.label)}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-plum/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-3xl overflow-hidden bg-card border border-pink-deep/30 p-3 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-5 end-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-plum/70 text-white hover:bg-plum transition-colors shadow-md"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={selectedImg.src}
              alt={selectedImg.title}
              className="w-full aspect-square object-cover rounded-2xl shadow-inner"
            />
            <div className="p-4 text-start">
              <span className="badge-pastel font-bold text-xs">{selectedImg.tag}</span>
              <h3 className="mt-2 text-lg font-bold text-plum font-display">{selectedImg.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

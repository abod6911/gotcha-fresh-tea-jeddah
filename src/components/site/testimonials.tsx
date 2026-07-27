import { useLang } from "@/lib/i18n";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    ar: "أفضل بوبا شاي في جدة بلا منازع! الكولاجين عندهم رائع جداً.",
    en: "Best boba tea in Jeddah hands down! Their collagen drinks are amazing.",
    rating: 5,
  },
  {
    name: "Ahmed K.",
    ar: "تغليف ممتاز وطعم فريش فعلاً. أنصح بشاي الفواكه.",
    en: "Excellent packaging and truly fresh taste. I highly recommend the fruit tea.",
    rating: 5,
  },
  {
    name: "Lina R.",
    ar: "المكان يجنن والمشروبات ولا أروع، الكوب نفسه يفتح النفس 🌸",
    en: "The place is gorgeous and the drinks are out of this world, even the cup is beautiful 🌸",
    rating: 5,
  },
  {
    name: "Omar T.",
    ar: "خدمة سريعة وموظفين ودودين. البوبا طرية وحلاها موزون.",
    en: "Fast service and friendly staff. The boba is soft and perfectly sweetened.",
    rating: 4,
  },
  {
    name: "Nora F.",
    ar: "إدماني الجديد! ماتشا مع لؤلؤ التابيوكا شيء خيالي.",
    en: "My new addiction! Matcha with tapioca pearls is unreal.",
    rating: 5,
  },
];

export function Testimonials() {
  const { t, dir, lang } = useLang();

  // Duplicate for seamless infinite scrolling
  const items = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative overflow-hidden bg-cream-2 py-16 border-y border-border">
      <div className="absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-cream-2 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-cream-2 to-transparent pointer-events-none" />
      
      <div className="mx-auto mb-10 max-w-xl text-center px-6">
        <h2 className="text-2xl font-bold text-plum sm:text-3xl">
          {t({ en: "Loved by our community", ar: "محبوب من مجتمعنا" })}
        </h2>
      </div>

      <div className="flex w-full group overflow-hidden py-2">
        <div
          dir="ltr"
          className={`flex w-max shrink-0 items-stretch gap-6 ps-6 group-hover:[animation-play-state:paused] animate-marquee ${
            dir === "rtl" ? "[animation-direction:reverse]" : ""
          }`}
        >

          {items.map((item, i) => (
            <div 
              key={i} 
              className="w-[300px] shrink-0 rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default"
            >
              <div className="flex items-center gap-1 mb-3 text-neon">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < item.rating ? "fill-current" : "text-border"}`} />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-plum-soft mb-4">
                "{lang === "ar" ? item.ar : item.en}"
              </p>
              <p className="text-xs font-bold text-plum">— {item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

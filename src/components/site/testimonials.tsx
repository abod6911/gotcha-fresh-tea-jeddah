import { useLang } from "@/lib/i18n";
import { Star, Sparkles, CheckCircle2 } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "سارة م.",
    enName: "Sarah M.",
    ar: "أفضل بوبا شاي في جدة بلا منازع! الكولاجين عندهم رائع جداً ولذيذ.",
    en: "Best boba tea in Jeddah hands down! Their collagen drinks are amazing.",
    rating: 5,
    tag: "مشروبات الكولاجين",
    initials: "س م",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    name: "أحمد ك.",
    enName: "Ahmed K.",
    ar: "تغليف ممتاز وطعم فريش فعلاً. أنصح بشاي الفواكه الطازج.",
    en: "Excellent packaging and truly fresh taste. I highly recommend the fruit tea.",
    rating: 5,
    tag: "شاي الفواكه",
    initials: "أ ك",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    name: "لينا ر.",
    enName: "Lina R.",
    ar: "المكان يجنن والمشروبات ولا أروع، الكوب نفسه يفتح النفس للأخير! 🌸",
    en: "The place is gorgeous and drinks are out of this world, even the cup is beautiful! 🌸",
    rating: 5,
    tag: "تجربة باستيل",
    initials: "ل ر",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    name: "عمر ت.",
    enName: "Omar T.",
    ar: "خدمة سريعة وموظفين ودودين. البوبا طرية وسكرها متوازن للغاية.",
    en: "Fast service and friendly staff. The boba is soft and perfectly sweetened.",
    rating: 5,
    tag: "بوبا السكر البني",
    initials: "ع ت",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    name: "نورة ف.",
    enName: "Nora F.",
    ar: "إدماني الجديد! ماتشا مع لؤلؤ التابيوكا شيء خيالي وطبيعي.",
    en: "My new addiction! Matcha with tapioca pearls is unreal and authentic.",
    rating: 5,
    tag: "الماتشا اليابانية",
    initials: "ن ف",
    gradient: "from-lime-400 to-emerald-500",
  },
];

export function Testimonials() {
  const { t, dir, lang } = useLang();

  // Duplicate 3x for endless 100% seamless infinite marquee scrolling
  const items = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-gradient-to-b from-cream via-cream-2/80 to-cream py-16 lg:py-24 border-y border-pink-deep/15 max-w-full">
      {/* Side Fade Gradients (Dynamically flipped for RTL/LTR) */}
      <div className={`absolute inset-y-0 start-0 z-20 w-16 sm:w-32 pointer-events-none ${
        dir === "rtl" 
          ? "bg-gradient-to-l from-cream via-cream/90 to-transparent" 
          : "bg-gradient-to-r from-cream via-cream/90 to-transparent"
      }`} />
      <div className={`absolute inset-y-0 end-0 z-20 w-16 sm:w-32 pointer-events-none ${
        dir === "rtl" 
          ? "bg-gradient-to-r from-cream via-cream/90 to-transparent" 
          : "bg-gradient-to-l from-cream via-cream/90 to-transparent"
      }`} />
      
      {/* Section Header */}
      <div className="mx-auto mb-10 sm:mb-12 max-w-xl text-center px-4 sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-pink-deep/20 bg-pink-soft/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ink shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-neon shrink-0" />
          {t({ en: "Community Reviews", ar: "آراء مجتمعنا وتجاربهم" })}
        </span>
        <h2 className="mt-3 text-3xl font-bold text-plum sm:text-4xl lg:text-5xl font-display">
          {t({ en: "Loved by our community", ar: "محبوب من مجتمعنا في جدة" })}
        </h2>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full overflow-hidden py-4">
        <div className={dir === "rtl" ? "marquee-track-rtl" : "marquee-track-ltr"}>
          {items.map((item, i) => (
            <div
              key={i}
              className="mx-3 w-[310px] sm:w-[340px] shrink-0 rounded-[2rem] border border-pink-deep/20 bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow hover:border-neon/50 cursor-default flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars & Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, starIdx) => (
                      <Star key={starIdx} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="rounded-full bg-pink-soft/70 px-2.5 py-0.5 text-[0.65rem] font-bold text-plum border border-pink-deep/15">
                    {item.tag}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base leading-relaxed text-plum/90 font-medium mb-5">
                  "{lang === "ar" ? item.ar : item.en}"
                </p>
              </div>

              {/* Reviewer Info with Avatar */}
              <div className="flex items-center gap-3 border-t border-pink-deep/10 pt-3.5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} text-white font-bold text-xs shadow-sm`}>
                  {item.initials}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <b className="text-sm font-bold text-plum">{lang === "ar" ? item.name : item.enName}</b>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <span className="text-[0.65rem] font-semibold text-plum-soft">
                    {t({ en: "Verified Customer · Jeddah", ar: "عميل موثّق · فرع جدة" })}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Clock, MapPin, Truck, Navigation, Sparkles, ExternalLink, Coffee, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { useState } from "react";
import { toast } from "sonner";
import { GotchaLogo } from "./logo";

export function Locations() {
  const { t } = useLang();
  const head = useReveal();
  const card = useReveal();
  const map = useReveal();
  const [isLocating, setIsLocating] = useState(false);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error(t({ en: "Geolocation is not supported by your browser", ar: "متصفحك لا يدعم تحديد الموقع" }));
      return;
    }

    setIsLocating(true);
    toast.info(t({ en: "Detecting your location...", ar: "جاري تحديد موقعك..." }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        const branchLat = 21.5657162;
        const branchLng = 39.153269;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${branchLat},${branchLng}`;
        
        toast.success(t({ en: "Location found! Opening directions...", ar: "تم تحديد الموقع! سيتم فتح المسار..." }));
        setTimeout(() => window.open(url, "_blank"), 1000);
      },
      () => {
        setIsLocating(false);
        toast.error(t({ en: "Unable to retrieve your location", ar: "تعذر الحصول على موقعك الحالي" }));
      }
    );
  };

  const rows = [
    {
      Icon: MapPin,
      title: { en: "Main Address", ar: "العنوان الرئيسي" },
      value: {
        en: "Jeddah, Al-Rawdah District, Abdul Maqsood Khoja St., Saudi Arabia",
        ar: "جدة، حي الروضة — شارع عبدالمقصود خوجه، المملكة العربية السعودية",
      },
    },
    {
      Icon: Clock,
      title: { en: "Working Hours", ar: "ساعات العمل" },
      value: { en: "Daily, 10:00 AM – 1:00 AM (Late Night)", ar: "يوميًا، من 10:00 صباحًا حتى 1:00 بعد منتصف الليل" },
    },
    {
      Icon: Truck,
      title: { en: "Delivery & Pick-up", ar: "التوصيل والاستلام" },
      value: {
        en: "Available via HungerStation, Jahez & Direct Store Pick-up",
        ar: "متوفر عبر هنقرستيشن، جاهز، والاستلام المباشر من الفرع",
      },
    },
    {
      Icon: Coffee,
      title: { en: "Store Vibe & Amenities", ar: "أجواء ومميزات الفرع" },
      value: {
        en: "Luxury Pastel Seating, Drive-thru / Takeaway, Free Wi-Fi",
        ar: "جلسات باستيل فاخرة، خدمة طلبات السيارات Takeaway، وواي فاي مجاني",
      },
    },
  ];

  return (
    <section id="locations" className="bg-gradient-to-b from-cream-2 via-pink-soft/20 to-white py-20 sm:py-28 relative z-10 overflow-hidden max-w-full">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/3 start-10 w-60 h-60 rounded-full bg-pink-soft/30 blur-2xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-10 end-10 w-64 h-64 rounded-full bg-lav-soft/30 blur-2xl opacity-50 pointer-events-none" />

      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div ref={head.ref} className={`${head.className} mx-auto max-w-2xl text-center flex flex-col items-center`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-deep/30 bg-card px-4 py-1.5 text-xs font-bold text-plum shadow-sm mb-4">
            <Sparkles className="h-3.5 w-3.5 text-neon shrink-0 animate-pulse" />
            {t({ en: "Jeddah Flagship Branch", ar: "فرع جدة الرئيسي الفاخر" })}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-plum drop-shadow-xs">
            {t({ en: "Visit Us in ", ar: "زورونا في " })}
            <span className="text-gradient-neon">{t({ en: "Jeddah", ar: "عروس البحر — جدة" })}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base font-medium text-plum/80 leading-relaxed max-w-lg">
            {t({
              en: "Experience authentic boba, fresh brewed collagen teas, and relaxing pastel vibes in the heart of Jeddah.",
              ar: "استمتع بأجواء الباستيل الساحرة ومشروبات البوبا والكولاجين المحضرة طازجاً يومياً في قلب جدة.",
            })}
          </p>
        </div>

        {/* Branch Showcase Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
          
          {/* Left Column: Glassmorphism Branch Info Card */}
          <div
            ref={card.ref}
            className={`${card.className} rounded-[2.5rem] border-2 border-pink-deep/30 bg-card/95 p-6 sm:p-9 shadow-2xl backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:border-pink-deep/50`}
          >
            <div>
              {/* Header Badge & Title */}
              <div className="flex items-center justify-between gap-3 border-b border-pink-deep/20 pb-5 mb-6 flex-wrap">
                <div className="flex items-center gap-3">
                  <GotchaLogo className="h-12 w-12 rounded-full shadow-md shrink-0 ring-2 ring-pink-deep/40" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-plum">
                      {t({ en: "Gotcha Fresh Tea — Jeddah", ar: "قوتشا فريش تي — فرع جدة" })}
                    </h3>
                    <p className="text-xs font-semibold text-plum-soft mt-0.5 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      {t({ en: "Official Verified Branch", ar: "الفرع الرسمي المعتمد" })}
                    </p>
                  </div>
                </div>

                {/* Open Status Indicator */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-300/80 px-3 py-1 text-xs font-bold text-emerald-700 shadow-xs">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  {t({ en: "Open Now", ar: "مفتوح الآن" })}
                </span>
              </div>

              {/* Rows List */}
              <div className="space-y-5">
                {rows.map(({ Icon, title, value }) => (
                  <div key={title.en} className="flex gap-4 items-start group">
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-pink-soft to-cream-2 flex items-center justify-center text-neon border border-pink-deep/25 shadow-xs shrink-0 transition-transform group-hover:scale-105">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col pt-0.5">
                      <b className="text-sm font-bold text-plum">{t(title)}</b>
                      <span className="text-xs sm:text-sm text-plum-soft/90 font-medium mt-0.5 leading-snug">{t(value)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Actions & Delivery Apps Direct Links */}
            <div className="mt-8 pt-6 border-t border-pink-deep/20 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDetectLocation}
                  disabled={isLocating}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full border-2 border-pink-deep/40 bg-pink-soft/30 px-6 py-3.5 text-xs sm:text-sm font-bold text-plum transition-all duration-300 hover:bg-pink-soft hover:border-pink-deep shadow-xs disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLocating ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-plum border-t-transparent" />
                  ) : (
                    <Navigation className="h-4 w-4 text-neon" />
                  )}
                  {t({ en: "Detect Location & Navigate", ar: "حدد موقعي للفرع" })}
                </button>

                <a
                  href="https://maps.app.goo.gl/5exbgHM7cp2edcAJ7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-neon flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <MapPin className="h-4 w-4" />
                  {t({ en: "Open Google Maps", ar: "عرض على الخريطة" })}
                </a>
              </div>

              {/* Delivery Direct Badges */}
              <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                <span className="text-[0.7rem] font-bold text-plum-soft uppercase tracking-wider">
                  {t({ en: "Order Delivery:", ar: "اطلب التوصيل المباشر:" })}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://hungerstation.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-pink-deep/30 bg-card px-3 py-1 text-[0.68rem] font-bold text-plum hover:bg-pink-soft transition-colors shadow-xs"
                  >
                    <span>هنقرستيشن</span>
                    <ExternalLink className="h-3 w-3 text-neon" />
                  </a>
                  <a
                    href="https://jahez.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-pink-deep/30 bg-card px-3 py-1 text-[0.68rem] font-bold text-plum hover:bg-pink-soft transition-colors shadow-xs"
                  >
                    <span>جاهز</span>
                    <ExternalLink className="h-3 w-3 text-neon" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps iFrame Container */}
          <div
            ref={map.ref}
            className={`${map.className} min-h-[420px] overflow-hidden rounded-[2.5rem] border-2 border-pink-deep/30 shadow-2xl relative bg-card flex flex-col`}
          >
            {/* Top Floating Branch Overlay Badge */}
            <div className="absolute top-4 start-4 z-20 bg-card/95 backdrop-blur-md border border-pink-deep/30 rounded-2xl px-4 py-2 shadow-lg flex items-center gap-2">
              <MapPin className="h-4 w-4 text-neon animate-bounce" />
              <div>
                <p className="text-xs font-bold text-plum">{t({ en: "Gotcha Jeddah", ar: "فرع قوتشا — جدة" })}</p>
                <p className="text-[0.65rem] text-plum-soft font-semibold">{t({ en: "Al-Rawdah District", ar: "حي الروضة" })}</p>
              </div>
            </div>

            <iframe
              src="https://www.google.com/maps?q=21.5657162,39.153269&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t({ en: "Gotcha Fresh Tea Jeddah Map", ar: "خريطة قوتشا فريش تي جدة" })}
              className="h-full min-h-[420px] w-full border-0 rounded-[2.5rem]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}


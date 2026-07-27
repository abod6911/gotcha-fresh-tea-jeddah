import { Clock, MapPin, Truck, Navigation } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { useState } from "react";
import { toast } from "sonner";

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
      (error) => {
        setIsLocating(false);
        toast.error(t({ en: "Unable to retrieve your location", ar: "تعذر الحصول على موقعك الحالي" }));
      }
    );
  };

  const rows = [
    {
      Icon: MapPin,
      title: { en: "Address", ar: "العنوان" },
      value: {
        en: "Jeddah, Makkah Region, Saudi Arabia",
        ar: "جدة، منطقة مكة المكرمة، المملكة العربية السعودية",
      },
    },
    {
      Icon: Clock,
      title: { en: "Hours", ar: "ساعات العمل" },
      value: { en: "Daily, 10:00 AM – 1:00 AM", ar: "يوميًا، من 10:00 صباحًا حتى 1:00 صباحًا" },
    },
    {
      Icon: Truck,
      title: { en: "Delivery", ar: "التوصيل" },
      value: {
        en: "Available via HungerStation & Jahez",
        ar: "متوفر عبر هنقرستيشن وجاهز",
      },
    },
  ];

  return (
    <section id="locations" className="bg-cream-2 py-24 relative z-10 overflow-hidden max-w-full">
      <div className="mx-auto max-w-[1180px] px-6">
        <div ref={head.ref} className={`${head.className} mx-auto max-w-2xl text-center`}>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink">
            {t({ en: "Visit Us", ar: "زورونا" })}
          </span>
          <h2 className="mt-3 text-3xl text-plum sm:text-4xl">
            {t({ en: "Our Jeddah branch", ar: "فرعنا في جدة" })}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div
            ref={card.ref}
            className={`${card.className} rounded-[2rem] border border-border bg-card p-8 shadow-soft flex flex-col justify-between`}
          >
            <div>
              <h3 className="text-xl font-bold text-plum">
                {t({ en: "Gotcha Fresh Tea — Jeddah", ar: "قوتشا فريش تي — جدة" })}
              </h3>
              <div className="mt-6 space-y-5">
                {rows.map(({ Icon, title, value }) => (
                  <div key={title.en} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
                    <div className="flex flex-col">
                      <b className="text-sm text-plum">{t(title)}</b>
                      <span className="text-sm text-plum-soft">{t(value)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDetectLocation}
                disabled={isLocating}
                className="flex-1 flex items-center justify-center gap-2 rounded-full border border-pink-deep bg-pink-soft/30 px-6 py-3.5 text-sm font-semibold text-plum transition-all duration-300 hover:bg-pink-soft hover:shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLocating ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-plum border-t-transparent" />
                ) : (
                  <Navigation className="h-4 w-4" />
                )}
                {t({ en: "Detect My Location", ar: "حدد موقعي للفرع" })}
              </button>
              
              <a
                href="https://maps.app.goo.gl/5exbgHM7cp2edcAJ7"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-neon flex-1 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg"
              >
                {t({ en: "View on Map", ar: "عرض على الخريطة" })}
              </a>
            </div>
          </div>

          <div
            ref={map.ref}
            className={`${map.className} min-h-[360px] overflow-hidden rounded-[2rem] border border-border shadow-soft`}
          >
            <iframe
              src="https://www.google.com/maps?q=21.5657162,39.153269&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t({ en: "Gotcha Fresh Tea Jeddah Map", ar: "خريطة قوتشا فريش تي جدة" })}
              className="h-full min-h-[360px] w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

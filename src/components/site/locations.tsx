import { Clock, MapPin, Truck, Navigation, Sparkles, ExternalLink, Coffee, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/use-reveal";
import { useState } from "react";
import { toast } from "sonner";
import { GotchaLogo } from "./logo";

export interface Branch {
  id: string;
  name: { en: string; ar: string };
  district: { en: string; ar: string };
  address: { en: string; ar: string };
  lat: number;
  lng: number;
  mapsUrl: string;
  hours: { en: string; ar: string };
  isFlagship?: boolean;
}

export const BRANCHES: Branch[] = [
  {
    id: "al-rawdah",
    name: { en: "Al-Rawdah Flagship Branch", ar: "فرع الروضة الرئيسي" },
    district: { en: "Al-Rawdah District", ar: "حي الروضة — شارع عبدالمقصود خوجه" },
    address: {
      en: "Abdul Maqsood Khoja St., Al-Rawdah District, Jeddah, Saudi Arabia",
      ar: "شارع عبدالمقصود خوجه، حي الروضة، جدة، المملكة العربية السعودية",
    },
    lat: 21.5657162,
    lng: 39.153269,
    mapsUrl: "https://maps.app.goo.gl/5exbgHM7cp2edcAJ7",
    hours: { en: "Daily, 10:00 AM – 1:00 AM", ar: "يوميًا، من 10:00 صباحًا حتى 1:00 بعد منتصف الليل" },
    isFlagship: true,
  },
  {
    id: "ash-shati",
    name: { en: "King Road / Red Sea Mall Branch", ar: "فرع الشاطئ — طريق الملك" },
    district: { en: "Ash-Shati District", ar: "حي الشاطئ — طريق الملك عبد العزيز" },
    address: {
      en: "King Abdul Aziz Rd, Ash-Shati (Near Red Sea Mall), Jeddah, Saudi Arabia",
      ar: "طريق الملك عبد العزيز، حي الشاطئ (بالقرب من رد سي مول)، جدة، السعودية",
    },
    lat: 21.625841,
    lng: 39.110542,
    mapsUrl: "https://maps.google.com/?q=21.625841,39.110542",
    hours: { en: "Daily, 10:00 AM – 1:30 AM", ar: "يوميًا، من 10:00 صباحًا حتى 1:30 بعد منتصف الليل" },
  },
  {
    id: "al-zahra",
    name: { en: "Sultan Street / Al-Zahra Branch", ar: "فرع الزهراء — شارع السلطان" },
    district: { en: "Al-Zahra District", ar: "حي الزهراء — شارع الأمير سلطان" },
    address: {
      en: "Prince Sultan St., Al-Zahra District, Jeddah, Saudi Arabia",
      ar: "شارع الأمير سلطان، حي الزهراء، جدة، المملكة العربية السعودية",
    },
    lat: 21.590112,
    lng: 39.141203,
    mapsUrl: "https://maps.google.com/?q=21.590112,39.141203",
    hours: { en: "Daily, 10:00 AM – 1:00 AM", ar: "يوميًا، من 10:00 صباحًا حتى 1:00 بعد منتصف الليل" },
  },
];

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export function Locations() {
  const { t } = useLang();
  const head = useReveal();
  const card = useReveal();
  const map = useReveal();
  
  const [selectedBranchId, setSelectedBranchId] = useState<string>("al-rawdah");
  const [isLocating, setIsLocating] = useState(false);
  const [branchDistances, setBranchDistances] = useState<Record<string, number>>({});
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  const activeBranch = BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

  const handleDetectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      toast.error(
        t({
          en: "Geolocation is not supported by your device or browser",
          ar: "خدمة تحديد الموقع غير مدعومة في جهازك أو متصفحك",
        })
      );
      return;
    }

    setIsLocating(true);
    toast.info(
      t({
        en: "Detecting your GPS location...",
        ar: "جاري تحديد موقعك الجغرافي عبر الـ GPS...",
      })
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });

        // Calculate distances for all branches using Haversine formula
        let closestBranch = BRANCHES[0];
        let minDistance = Infinity;
        const distances: Record<string, number> = {};

        BRANCHES.forEach((b) => {
          const dist = calculateDistanceKm(latitude, longitude, b.lat, b.lng);
          distances[b.id] = dist;
          if (dist < minDistance) {
            minDistance = dist;
            closestBranch = b;
          }
        });

        setBranchDistances(distances);
        setSelectedBranchId(closestBranch.id);

        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${closestBranch.lat},${closestBranch.lng}`;

        toast.success(
          t({
            en: `📍 Nearest Branch: ${t(closestBranch.name)} (${minDistance} km away)!`,
            ar: `📍 أقرب فرع لك: ${t(closestBranch.name)} (على بعد ${minDistance} كم)!`,
          }),
          {
            description: t({
              en: "Opening Google Maps navigation...",
              ar: "جاري فتح خرائط جوجل للارشاد للمسار...",
            }),
          }
        );

        setTimeout(() => window.open(mapsUrl, "_blank"), 1200);
      },
      (error) => {
        setIsLocating(false);
        console.warn("Geolocation error:", error);
        let errorMsg = t({
          en: "Location access denied or unavailable. Selected main branch.",
          ar: "تعذر الحصول على إذن الموقع الجغرافي. تم اختيار الفرع الرئيسي.",
        });
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = t({
            en: "Location permission denied. Please enable location access in your browser.",
            ar: "تم رفض إذن تحديد الموقع. يرجى تفعيل الإذن من إعدادات المتصفح.",
          });
        }
        toast.error(errorMsg);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 30000,
      }
    );
  };

  const rows = [
    {
      Icon: MapPin,
      title: { en: "Branch Address", ar: "عنوان الفرع" },
      value: activeBranch.address,
    },
    {
      Icon: Clock,
      title: { en: "Working Hours", ar: "ساعات العمل" },
      value: activeBranch.hours,
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
        en: "Luxury Pastel Seating, Takeaway / Drive-thru, Free Wi-Fi",
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
            {t({ en: "Jeddah Fresh Tea Branches", ar: "فروع قوتشا فريش تي — جدة" })}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-plum drop-shadow-xs">
            {t({ en: "Visit Us in ", ar: "زورونا في " })}
            <span className="text-gradient-neon">{t({ en: "Jeddah", ar: "عروس البحر — جدة" })}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base font-medium text-plum/80 leading-relaxed max-w-lg">
            {t({
              en: "Locate your nearest Gotcha branch, get instant GPS directions, and enjoy fresh boba tea brewed daily.",
              ar: "حدد موقع أقرب فرع إليك، واحصل على اتجاهات GPS فورية، واستمتع بأجواء قوتشا الباستيل الساحرة.",
            })}
          </p>
        </div>

        {/* Interactive Branch Selector Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {BRANCHES.map((b) => {
            const isSelected = b.id === selectedBranchId;
            const dist = branchDistances[b.id];
            return (
              <button
                key={b.id}
                onClick={() => setSelectedBranchId(b.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-md scale-105 ring-2 ring-pink-deep/30"
                    : "border-2 border-pink-deep/20 bg-card text-plum hover:bg-pink-soft hover:border-pink-deep/40"
                }`}
              >
                <MapPin className={`h-4 w-4 ${isSelected ? "text-white" : "text-neon"}`} />
                <span>{t(b.name)}</span>
                {dist !== undefined && (
                  <span className={`text-[0.7rem] px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-pink-soft text-plum font-bold"}`}>
                    {dist} كم
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Branch Showcase Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
          
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
                      {t(activeBranch.name)}
                    </h3>
                    <p className="text-xs font-semibold text-plum-soft mt-0.5 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      {t(activeBranch.district)}
                    </p>
                  </div>
                </div>

                {/* Distance or Open Status Indicator */}
                <div className="flex items-center gap-2">
                  {branchDistances[activeBranch.id] !== undefined && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-pink-500 text-white px-3 py-1 text-xs font-bold shadow-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                      {t({ en: `Nearest (${branchDistances[activeBranch.id]} km)`, ar: `الأقرب لك (${branchDistances[activeBranch.id]} كم)` })}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-300/80 px-3 py-1 text-xs font-bold text-emerald-700 shadow-xs">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    {t({ en: "Open Now", ar: "مفتوح الآن" })}
                  </span>
                </div>
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
                  className="flex-1 flex items-center justify-center gap-2 rounded-full border-2 border-pink-deep/40 bg-pink-soft/40 px-6 py-3.5 text-xs sm:text-sm font-bold text-plum transition-all duration-300 hover:bg-pink-soft hover:border-pink-deep shadow-xs disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLocating ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-plum border-t-transparent" />
                  ) : (
                    <Navigation className="h-4 w-4 text-neon animate-pulse" />
                  )}
                  {t({ en: "Detect Nearest Branch (GPS)", ar: "حدد أقرب فرع لي تلقائياً (GPS)" })}
                </button>

                <a
                  href={userCoords ? `https://www.google.com/maps/dir/?api=1&origin=${userCoords.lat},${userCoords.lng}&destination=${activeBranch.lat},${activeBranch.lng}` : activeBranch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-neon flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <MapPin className="h-4 w-4" />
                  {t({ en: "Open Directions on Map", ar: "عرض المسار على الخريطة" })}
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
            className={`${map.className} min-h-[440px] overflow-hidden rounded-[2.5rem] border-2 border-pink-deep/30 shadow-2xl relative bg-card flex flex-col`}
          >
            {/* Top Floating Branch Overlay Badge */}
            <div className="absolute top-4 start-4 z-20 bg-card/95 backdrop-blur-md border border-pink-deep/30 rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-2.5">
              <MapPin className="h-4.5 w-4.5 text-neon animate-bounce" />
              <div>
                <p className="text-xs font-bold text-plum">{t(activeBranch.name)}</p>
                <p className="text-[0.65rem] text-plum-soft font-semibold">{t(activeBranch.district)}</p>
              </div>
            </div>

            <iframe
              key={activeBranch.id}
              src={`https://www.google.com/maps?q=${activeBranch.lat},${activeBranch.lng}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t(activeBranch.name)}
              className="h-full min-h-[440px] w-full border-0 rounded-[2.5rem]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

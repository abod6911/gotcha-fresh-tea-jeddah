import { useLang } from "@/lib/i18n";
import { FlowerDeco, Petals, TabebuiaTree } from "./decor";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { GotchaLogo } from "./logo";
import { scrollToSection } from "@/lib/scroll";

export function Hero() {
  const { t, dir } = useLang();
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play step sequence every 3.5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const steps = [
    {
      badge: { en: "Interactive Experience · Handcrafted", ar: "تجربة تفاعلية · تحضير يدوي فاخر" },
      title: { en: "Sip the ", ar: "تذوّق سحر " },
      highlight: { en: "Magic.", ar: "الباستيل." },
      desc: {
        en: "Tap the cup or click the steps below to watch us brew your fresh boba tea live.",
        ar: "انقر الكوب أو اضغط على الخطوات في الأسفل لمشاهدة تحضير شاي الباستيل مباشرةً."
      }
    },
    {
      badge: { en: "Step 1 · Tapioca Pearls", ar: "الخطوة 1 · لؤلؤ التابيوكا" },
      title: { en: "Add the ", ar: "أضف " },
      highlight: { en: "Boba.", ar: "البوبا." },
      desc: {
        en: "Hand-cooked brown sugar tapioca pearls — warm, chewy, and rich.",
        ar: "لؤلؤ السكر البني المكرمل الدافئ — طري، غني، وذو قوام متناغم رائع."
      }
    },
    {
      badge: { en: "Step 2 · Farm Fresh Brew", ar: "الخطوة 2 · سكب الشاي الطازج" },
      title: { en: "Pour the ", ar: "اسكب " },
      highlight: { en: "Tea.", ar: "الشاي." },
      desc: {
        en: "Single-origin Formosa Oolong & fresh milk poured to silky perfection.",
        ar: "شاي الأولونغ المحمص من مزارعنا الجبلية مع الحليب الطازج المنساب بسلاسة."
      }
    },
    {
      badge: { en: "Step 3 · Ready to Drink", ar: "الخطوة 3 · جاهز للتذوّق" },
      title: { en: "Ready to ", ar: "جاهز " },
      highlight: { en: "Enjoy!", ar: "للتذوّق!" },
      desc: {
        en: "Your fresh boba tea is ready! Taste the authentic freshness of Taiwan & Melbourne in Jeddah.",
        ar: "كوب قوتشا الباستيل جاهز الآن! نضارة تايوان وفخامة ملبورن بين يديك في جدة."
      }
    }
  ];

  const stats = [
    { value: "100%", label: { en: "Farm fresh leaves, daily", ar: "أوراق طازجة يوميًا" } },
    { value: "2013", label: { en: "Founded in Melbourne", ar: "تأسست في ملبورن" } },
    { value: "0", label: { en: "Artificial powders used", ar: "مسحوق مستخدم" } },
  ];

  // Visual parameters derived from activeStep
  const getLiquidHeightPercent = () => {
    if (activeStep === 0) return 78; // Fully poured signature drink preview
    if (activeStep === 1) return 20; // Step 1: Pearls at bottom
    if (activeStep === 2) return 72; // Step 2: Pouring tea liquid
    return 78; // Step 3: Complete drink!
  };

  const isBobaVisible = activeStep === 0 || activeStep >= 1;
  const isIceVisible = activeStep === 0 || activeStep >= 2;
  const isStrawDropped = activeStep === 0 || activeStep >= 3;

  const stepLabels = [
    { en: "Preview", ar: "الظهور" },
    { en: "1. Boba", ar: "1. البوبا" },
    { en: "2. Tea", ar: "2. الشاي" },
    { en: "3. Enjoy", ar: "3. الجاهزية" },
  ];

  const goToStep = (idx: number) => {
    setIsAutoPlaying(false); // Pause auto-play when user clicks
    setActiveStep(idx);
  };

  return (
    <section id="top" className="relative bg-gradient-pastel min-h-screen max-w-full overflow-hidden flex items-center justify-center pt-24 sm:pt-28 pb-12 px-4 sm:px-6">
      {/* Decorative trees & petals — framing the boba cup side & top corner on all devices without overlapping text */}
      <TabebuiaTree
        className="h-[360px] w-[280px] sm:h-[500px] sm:w-[380px] opacity-80 pointer-events-none drop-shadow-sm"
        style={{ bottom: -40, insetInlineEnd: -50 }}
      />
      <TabebuiaTree
        flip
        className="h-[300px] w-[240px] sm:h-[400px] sm:w-[310px] opacity-65 pointer-events-none drop-shadow-sm"
        style={{ top: 10, insetInlineStart: -80 }}
      />
      <Petals count={24} />
      <FlowerDeco className="w-[180px] sm:w-[220px] opacity-50 pointer-events-none" style={{ bottom: 20, insetInlineStart: -50 }} />

      {/* Hero Content Viewport */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] items-center gap-8 lg:gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Left Column: Interactive Dynamic Text */}
          <div className="flex flex-col items-start min-h-[340px] justify-center relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-start"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-pink-deep/30 bg-card/95 backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-wide text-plum shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-neon shrink-0" />
                  {t(steps[activeStep].badge)}
                </span>
                
                <h1 className="mt-4 sm:mt-5 text-4xl sm:text-5xl lg:text-7xl leading-[1.25] sm:leading-[1.18] text-plum font-display font-bold drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)]">
                  {t(steps[activeStep].title)}
                  <span className="text-gradient-neon block mt-1 sm:mt-2 pb-2 drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
                    {t(steps[activeStep].highlight)}
                  </span>
                </h1>
                
                <p className="mt-3 sm:mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-plum/90 font-medium">
                  {t(steps[activeStep].desc)}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Clear Labeled Interactive Step Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur-md p-1.5 border border-pink-deep/30 shadow-soft">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToStep(idx)}
                    aria-label={`Step ${idx + 1}`}
                    className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 ${
                      activeStep === idx
                        ? "bg-gradient-neon text-white shadow-glow scale-105"
                        : "text-plum-soft hover:text-plum hover:bg-pink-soft/50"
                    }`}
                  >
                    {t(stepLabels[idx])}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => goToStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="rounded-full p-2 border border-pink-deep/30 bg-card text-plum disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-soft transition-colors shadow-sm"
                  aria-label="Previous step"
                >
                  {dir === "rtl" ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => goToStep(Math.min(3, activeStep + 1))}
                  disabled={activeStep === 3}
                  className="rounded-full p-2 border border-pink-deep/30 bg-card text-plum disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-soft transition-colors shadow-sm"
                  aria-label="Next step"
                >
                  {dir === "rtl" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#menu"
                onClick={(e) => scrollToSection(e, "#menu")}
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-[0_10px_28px_-6px_rgba(255,20,147,0.55)] border-2 border-white/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-4px_rgba(255,20,147,0.75)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sparkles className="h-5 w-5 text-yellow-200 animate-pulse shrink-0" />
                <span>{t({ en: "Explore Full Menu", ar: "استعرض القائمة الكاملة" })}</span>
                <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1.5 shrink-0 rtl:rotate-0 ltr:rotate-180" />
              </a>

              <button
                onClick={(e) => {
                  setIsAutoPlaying(false);
                  scrollToSection(e, "#locations");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full w-full sm:w-auto px-7 py-4 text-base font-bold text-plum bg-card/95 backdrop-blur-md border-2 border-pink-deep/30 shadow-soft transition-all duration-300 hover:bg-pink-soft/80 hover:border-pink-deep hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{t({ en: "Find Nearby Store", ar: "حدد موقع أقرب فرع" })}</span>
              </button>
            </div>

            {/* Stats Bar */}
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-6 sm:gap-10 border-t border-border/50 pt-5 w-full justify-between sm:justify-start">
              {stats.map((s) => (
                <div key={s.value} className="flex flex-col gap-0.5">
                  <b className="font-display text-2xl sm:text-3xl text-plum">{s.value}</b>
                  <span className="text-xs sm:text-sm font-medium text-plum-soft/80">{t(s.label)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Interactive 3D Boba Cup */}
          <div className="relative w-full flex flex-col justify-center items-center">
            
            <div 
              onClick={() => goToStep((activeStep + 1) % 4)}
              className="relative mx-auto h-[320px] w-[200px] sm:h-[380px] sm:w-[240px] drop-shadow-2xl cursor-pointer group select-none"
              title={t({ en: "Tap cup to brew next step!", ar: "انقر الكوب لتحضير الخطوة التالية!" })}
            >
              
              {/* 3D Animated Straw */}
              <motion.div 
                animate={{
                  y: isStrawDropped ? 0 : -350,
                  rotate: isStrawDropped ? 12 : -15,
                  opacity: isStrawDropped ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                style={{ originY: 1 }}
                className="absolute -top-28 left-1/2 -translate-x-1/2 h-[125%] w-[24px] rounded-full bg-gradient-to-r from-pink-500 via-pink-300 to-pink-600 shadow-[inset_-3px_0_8px_rgba(0,0,0,0.4),2px_2px_10px_rgba(0,0,0,0.2)] z-10"
              />

              {/* Glass Cup Lid */}
              <div className="absolute inset-x-2 -top-3 h-8 rounded-[50%] bg-white/70 shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.9)] border-b-2 border-white/80 backdrop-blur-md z-30 flex justify-center items-center">
                <div className="w-12 h-2 rounded-full bg-plum/20" />
              </div>
              
              {/* Glass Cup Body */}
              <div className="absolute inset-x-0 top-2 bottom-0 overflow-hidden rounded-b-[3.5rem] rounded-t-[1.5rem] border-4 border-white/80 bg-gradient-to-b from-white/40 via-white/20 to-white/10 shadow-[inset_-10px_-10px_20px_rgba(255,255,255,0.6),inset_10px_10px_20px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.18)] backdrop-blur-md z-20">
                
                {/* Dynamic Wavy Tea Liquid */}
                <motion.div 
                  animate={{ height: `${getLiquidHeightPercent()}%` }}
                  transition={{ type: "spring", stiffness: 70, damping: 16 }}
                  className="absolute inset-x-0 bottom-0 origin-bottom"
                >
                  {/* Wavy Surface SVG Animation */}
                  <div className="absolute -top-5 inset-x-0 h-7 w-[200%] animate-[wave-move_3.5s_linear_infinite] pointer-events-none opacity-90">
                    <svg className="w-full h-full" viewBox="0 0 800 50" preserveAspectRatio="none">
                      <path d="M0,25 C100,0 100,50 200,25 C300,0 300,50 400,25 C500,0 500,50 600,25 C700,0 700,50 800,25 L800,50 L0,50 Z" fill="#e88aa7" opacity="0.95" />
                    </svg>
                  </div>
                  
                  {/* Liquid Body Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-deep/95 via-pink/85 to-lav-soft/75 backdrop-blur-sm" />
                  
                  {/* Floating Ice Cubes */}
                  {isIceVisible && (
                    <>
                      <div className="absolute top-2 left-4 w-9 h-9 rounded-xl bg-white/45 border border-white/75 backdrop-blur-sm transform rotate-12 shadow-sm animate-pulse" />
                      <div className="absolute top-4 right-5 w-8 h-8 rounded-xl bg-white/45 border border-white/75 backdrop-blur-sm transform -rotate-12 shadow-sm animate-pulse" />
                    </>
                  )}
                </motion.div>
                
                {/* Organic Natural Boba Pearls */}
                <div className="absolute inset-x-0 bottom-3 flex justify-center items-end h-[50%] pointer-events-none">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const row = Math.floor(i / 6);
                    const col = i % 6;

                    return (
                      <motion.span
                        key={i}
                        initial={false}
                        animate={{
                          y: isBobaVisible ? 0 : -320,
                          opacity: isBobaVisible ? 1 : 0,
                          scale: isBobaVisible ? 1 : 0.3
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 110,
                          damping: 14,
                          delay: (i * 0.02) % 0.3
                        }}
                        className="absolute rounded-full shadow-[inset_-3px_-3px_6px_rgba(0,0,0,0.9),1px_1px_3px_rgba(0,0,0,0.5)] will-change-transform"
                        style={{
                          width: 22,
                          height: 22,
                          left: `calc(15% + ${col * 24}px + ${(row % 2) * 10}px)`,
                          bottom: row * 18 + 6,
                          background: "radial-gradient(circle at 35% 35%, #5d4037 0%, #2c1e16 60%, #100b08 100%)"
                        }}
                      />
                    );
                  })}
                </div>

                {/* Official Brand Logo Emblem on Glass */}
                <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/95 p-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.18)] border-2 border-white backdrop-blur-md flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <GotchaLogo className="w-full h-full object-contain rounded-full" />
                  </div>
                </div>
                
                {/* Glass Glossy Reflections */}
                <div className="absolute inset-y-4 start-3 w-6 rounded-full bg-gradient-to-b from-white/75 via-white/30 to-transparent blur-[2px] opacity-80 z-20 pointer-events-none" />
                <div className="absolute inset-y-12 end-4 w-3 rounded-full bg-gradient-to-b from-white/55 to-transparent blur-[1px] opacity-60 z-20 pointer-events-none" />
              </div>
              
              {/* Floor Shadow */}
              <div className="absolute -bottom-7 inset-x-6 h-6 rounded-[50%] bg-pink-deep/35 blur-xl opacity-75" />
            </div>

            {/* Interactive hint badge */}
            <motion.div 
              onClick={() => goToStep((activeStep + 1) % 4)}
              className="relative mt-7 flex items-center gap-2.5 rounded-full border border-pink-deep/30 bg-card/95 backdrop-blur-md px-5 py-2 text-xs font-bold text-plum shadow-soft z-20 cursor-pointer hover:scale-105 transition-transform"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon"></span>
              </span>
              {t({ en: "Tap cup or scroll to brew", ar: "انقر الكوب أو مرّر للتحضير" })}
            </motion.div>

          </div>

        </div>


    </section>
  );
}


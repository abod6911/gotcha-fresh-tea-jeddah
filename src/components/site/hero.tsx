import { useLang } from "@/lib/i18n";
import { FlowerDeco, Petals, TabebuiaTree } from "./decor";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";

export function Hero() {
  const { t, dir } = useLang();
  const heroRef = useRef<HTMLDivElement | null>(null);
  
  // Interactive Step State (0: Intro, 1: Add Boba, 2: Pour Tea, 3: Straw & Enjoy)
  const [activeStep, setActiveStep] = useState(0);

  // Scroll Progress Hook
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 90 });

  // Update step based on scroll
  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      if (latest < 0.22) setActiveStep(0);
      else if (latest < 0.52) setActiveStep(1);
      else if (latest < 0.82) setActiveStep(2);
      else setActiveStep(3);
    });
  }, [smoothProgress]);

  const steps = [
    {
      badge: { en: "Interactive Menu · Handcrafted", ar: "قائمة تفاعلية · لمسة يدوية" },
      title: { en: "Sip the ", ar: "رشفة من " },
      highlight: { en: "Magic.", ar: "السحر." },
      desc: {
        en: "Scroll down or click the steps to watch us brew your fresh pastel tea live.",
        ar: "مرّر للأسفل أو انقر على الخطوات لمشاهدة تحضير شاي الباستيل الطازج أمامك مباشرةً."
      }
    },
    {
      badge: { en: "Step 1 · Tapioca Pearls", ar: "الخطوة 1 · لؤلؤ التابيوكا" },
      title: { en: "Add the ", ar: "أضف " },
      highlight: { en: "Boba.", ar: "البوبا." },
      desc: {
        en: "Hand-cooked brown sugar tapioca pearls — warm, chewy, and rich.",
        ar: "لؤلؤ السكر البني الدافئ المطهو يدويًا — طري، غني، ومتوازن الحلاوة."
      }
    },
    {
      badge: { en: "Step 2 · Farm Fresh Brew", ar: "الخطوة 2 · شاي طازج من المزرعة" },
      title: { en: "Pour the ", ar: "اسكب " },
      highlight: { en: "Tea.", ar: "الشاي." },
      desc: {
        en: "Single-origin Formosa Oolong & fresh milk poured to silky perfection.",
        ar: "شاي الأولونغ المحمص مع الحليب الطازج المنساب بسلاسة حريرية."
      }
    },
    {
      badge: { en: "Step 3 · Ready to Drink", ar: "الخطوة 3 · جاهز للشرب" },
      title: { en: "Ready to ", ar: "جاهز " },
      highlight: { en: "Enjoy!", ar: "للاستلذاذ!" },
      desc: {
        en: "Your fresh boba tea is ready! Taste the authentic freshness of Taiwan & Melbourne in Jeddah.",
        ar: "كوبك الباستيل جاهز الآن! تذوق نضارة تايوان وفخامة ملبورن في جدة."
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
    if (activeStep === 0 || activeStep === 1) return 0;
    if (activeStep === 2) return 72;
    return 78;
  };

  const isBobaVisible = activeStep >= 1;
  const isIceVisible = activeStep >= 2;
  const isStrawDropped = activeStep >= 3;

  const goToStep = (idx: number) => {
    setActiveStep(idx);
    if (heroRef.current) {
      const sectionHeight = heroRef.current.offsetHeight - window.innerHeight;
      const targetY = heroRef.current.offsetTop + (idx / 3) * sectionHeight;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <section ref={heroRef} id="top" className="relative bg-gradient-pastel min-h-[250vh]">
      {/* Decorative trees & petals */}
      <TabebuiaTree
        className="hidden h-[520px] w-[400px] opacity-40 sm:block mix-blend-multiply pointer-events-none"
        style={{ bottom: -40, insetInlineStart: -70 }}
      />
      <TabebuiaTree
        flip
        className="h-[420px] w-[320px] opacity-30 mix-blend-multiply pointer-events-none"
        style={{ bottom: -60, insetInlineEnd: -90 }}
      />
      <Petals />
      <FlowerDeco className="w-[220px] opacity-45 mix-blend-multiply pointer-events-none" style={{ top: 80, insetInlineStart: -60 }} />

      {/* Sticky Hero Viewport */}
      <div className="sticky top-0 flex min-h-screen items-center justify-center py-12 px-4 sm:px-6">
        <div className="relative z-10 mx-auto grid w-full max-w-[1180px] items-center gap-8 lg:gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Left Column: Interactive Dynamic Text */}
          <div className="flex flex-col items-start min-h-[340px] justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-start"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-md px-4 py-1.5 text-xs font-semibold tracking-wide text-ink shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-neon" />
                  {t(steps[activeStep].badge)}
                </span>
                
                <h1 className="mt-4 sm:mt-5 text-4xl sm:text-5xl lg:text-7xl leading-[1.25] sm:leading-[1.18] text-plum drop-shadow-sm font-display">
                  {t(steps[activeStep].title)}
                  <span className="text-gradient-neon block mt-1 sm:mt-2 pb-2">
                    {t(steps[activeStep].highlight)}
                  </span>
                </h1>
                
                <p className="mt-3 sm:mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-plum-soft">
                  {t(steps[activeStep].desc)}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Step Controls: Next/Prev & Indicators */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-md p-1.5 border border-border shadow-sm">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToStep(idx)}
                    aria-label={`Step ${idx + 1}`}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      activeStep === idx
                        ? "w-8 bg-gradient-neon shadow-glow"
                        : "w-3 bg-plum/20 hover:bg-plum/40"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => goToStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="rounded-full p-2 border border-border bg-card/80 text-plum disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-soft transition-colors"
                  aria-label="Previous step"
                >
                  {dir === "rtl" ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => goToStep(Math.min(3, activeStep + 1))}
                  disabled={activeStep === 3}
                  className="rounded-full p-2 border border-border bg-card/80 text-plum disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-soft transition-colors"
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
                className="bg-gradient-neon inline-flex items-center justify-center rounded-full w-full sm:w-auto px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-lg hover:scale-105 active:scale-95"
              >
                {t({ en: "Explore Full Menu", ar: "استعرض القائمة الكاملة" })}
              </a>
              <a
                href="#locations"
                className="inline-flex items-center justify-center rounded-full w-full sm:w-auto border-2 border-pink-deep/30 bg-card/50 backdrop-blur px-8 py-4 text-base font-semibold text-plum transition-all duration-300 hover:bg-pink-soft hover:border-pink-deep"
              >
                {t({ en: "Find Branch in Jeddah", ar: "فرع جدة" })}
              </a>
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

          {/* Right Column: Visual Interactive Boba Cup */}
          <div className="relative w-full flex flex-col justify-center items-center">
            
            <div 
              onClick={() => goToStep((activeStep + 1) % 4)}
              className="relative mx-auto h-[320px] w-[200px] sm:h-[380px] sm:w-[240px] drop-shadow-2xl cursor-pointer group"
              title={t({ en: "Tap cup to brew next step!", ar: "انقر الكوب لتحضير الخطوة التالية!" })}
            >
              
              {/* Animated Straw */}
              <motion.div 
                animate={{
                  y: isStrawDropped ? 0 : -350,
                  rotate: isStrawDropped ? 12 : -15,
                  opacity: isStrawDropped ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                style={{ originY: 1 }}
                className="absolute -top-28 left-1/2 -translate-x-1/2 h-[125%] w-[24px] rounded-full bg-gradient-to-r from-lav-deep via-lav-soft to-lav-deep shadow-[inset_-3px_0_8px_rgba(0,0,0,0.4),2px_2px_10px_rgba(0,0,0,0.2)] z-10"
              />

              {/* Cup Lid */}
              <div className="absolute inset-x-2 -top-3 h-8 rounded-[50%] bg-white/60 shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.8)] border-b-2 border-white/80 backdrop-blur-md z-30 flex justify-center items-center">
                <div className="w-12 h-2 rounded-full bg-plum/20" />
              </div>
              
              {/* Cup Glass Body */}
              <div className="absolute inset-x-0 top-2 bottom-0 overflow-hidden rounded-b-[3.5rem] rounded-t-[1.5rem] border-4 border-white/70 bg-gradient-to-b from-white/30 to-white/10 shadow-[inset_-10px_-10px_20px_rgba(255,255,255,0.5),inset_10px_10px_20px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-md z-20">
                
                {/* Dynamic Wavy Tea Liquid */}
                <motion.div 
                  animate={{ height: `${getLiquidHeightPercent()}%` }}
                  transition={{ type: "spring", stiffness: 70, damping: 16 }}
                  className="absolute inset-x-0 bottom-0 origin-bottom"
                >
                  {/* Wavy Surface SVG */}
                  <div className="absolute -top-5 inset-x-0 h-7 w-[200%] animate-[wave-move_3s_linear_infinite] pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 800 50" preserveAspectRatio="none">
                      <path d="M0,25 C100,0 100,50 200,25 C300,0 300,50 400,25 C500,0 500,50 600,25 C700,0 700,50 800,25 L800,50 L0,50 Z" fill="oklch(0.79 0.06 35)" opacity="0.9" />
                    </svg>
                  </div>
                  
                  {/* Liquid Body */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-deep/95 via-pink/80 to-lav/70 backdrop-blur-sm" />
                  
                  {/* Floating Ice Cubes */}
                  {isIceVisible && (
                    <>
                      <div className="absolute top-2 left-4 w-9 h-9 rounded-xl bg-white/40 border border-white/60 backdrop-blur-sm animate-pulse transform rotate-12" />
                      <div className="absolute top-4 right-5 w-8 h-8 rounded-xl bg-white/40 border border-white/60 backdrop-blur-sm animate-pulse transform -rotate-12" />
                    </>
                  )}
                </motion.div>
                
                {/* Boba Pearls */}
                <div className="absolute inset-x-0 bottom-3 flex justify-center items-end h-[50%]">
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
                        className="absolute rounded-full shadow-[inset_-3px_-3px_6px_rgba(0,0,0,0.9),1px_1px_3px_rgba(0,0,0,0.5)]"
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
                
                {/* Glass Glossy Reflections */}
                <div className="absolute inset-y-4 start-3 w-6 rounded-full bg-gradient-to-b from-white/70 to-transparent blur-[2px] opacity-80" />
                <div className="absolute inset-y-12 end-4 w-3 rounded-full bg-gradient-to-b from-white/50 to-transparent blur-[1px] opacity-60" />
              </div>
              
              {/* Floor Shadow */}
              <div className="absolute -bottom-8 inset-x-6 h-6 rounded-[50%] bg-pink-deep/30 blur-xl opacity-70" />
            </div>

            {/* Badge pill below cup */}
            <motion.div 
              onClick={() => goToStep((activeStep + 1) % 4)}
              className="relative mt-7 flex items-center gap-2.5 rounded-full border border-border bg-card/90 backdrop-blur-md px-5 py-2 text-xs font-bold text-plum shadow-glow-lg z-20 cursor-pointer hover:scale-105 transition-transform"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon"></span>
              </span>
              {t({ en: "Tap cup or scroll to brew", ar: "انقر الكوب أو مرّر للتحضير" })}
            </motion.div>

          </div>

        </div>
      </div>

      {/* Scroll Prompt indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30 pointer-events-none opacity-80">
        <span className="text-[0.65rem] font-bold text-plum uppercase tracking-widest mb-1.5 font-display">
          {t({ en: "Scroll to Brew", ar: "مرّر للتحضير" })}
        </span>
        <ChevronDown className="h-4 w-4 text-plum animate-bounce" />
      </div>
    </section>
  );
}


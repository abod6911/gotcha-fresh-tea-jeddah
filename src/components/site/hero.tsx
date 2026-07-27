import { useLang } from "@/lib/i18n";
import { FlowerDeco, Petals, TabebuiaTree } from "./decor";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 15,
    },
  },
};

function CupVisual() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoother, easier spring config
  const springConfig = { damping: 40, stiffness: 60, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Calculate parallax offsets (smoother movement)
  const bobaX = useTransform(smoothX, [-500, 500], [20, -20]);
  const bobaY = useTransform(smoothY, [-500, 500], [15, -15]);
  const liquidY = useTransform(smoothY, [-500, 500], [4, -4]);
  const liquidSkew = useTransform(smoothX, [-500, 500], [-3, 3]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const bobaConfigs = Array.from({ length: 30 }).map((_, i) => ({
    s: 14 + Math.random() * 8, // size 14-22
    x: -80 + Math.random() * 160,
    y: Math.random() * -20 - 5,
    d: Math.random() * 1.5,
    floatDuration: 2 + Math.random() * 3,
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
      className="relative mx-auto h-[280px] w-[180px] sm:h-[340px] sm:w-[220px] lg:h-[400px] lg:w-[260px] drop-shadow-2xl"
    >
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="h-full w-full relative z-20"
      >
        {/* Full Length Straw */}
        <motion.div 
          initial={{ scaleY: 0, y: -50 }}
          animate={{ scaleY: 1, y: 0 }}
          transition={{ type: "spring", delay: 1, stiffness: 80 }}
          style={{ originY: 1 }}
          className="absolute -top-24 left-8 h-[125%] w-[22px] rotate-[12deg] rounded-full bg-gradient-to-r from-lav-deep via-lav-soft to-lav-deep shadow-[inset_-3px_0_8px_rgba(0,0,0,0.4),2px_2px_10px_rgba(0,0,0,0.2)] z-10"
        />

        {/* Cup Lid / Rim */}
        <div className="absolute inset-x-2 -top-2 h-8 rounded-[50%] bg-white/40 shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.8)] border-b-2 border-white/60 backdrop-blur-md z-30" />
        
        {/* Main Cup Body (Glassmorphism) */}
        <div className="absolute inset-x-0 top-2 bottom-0 overflow-hidden rounded-b-[3.5rem] rounded-t-[1.5rem] border border-white/40 bg-gradient-to-b from-white/30 to-white/10 shadow-[inset_-10px_-10px_20px_rgba(255,255,255,0.5),inset_10px_10px_20px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-md z-20">
          
          {/* Liquid Container */}
          <motion.div 
            style={{ y: liquidY, skewX: liquidSkew }}
            className="absolute inset-x-0 bottom-0 h-[65%] origin-bottom transition-transform duration-300" 
          >
            {/* Liquid Surface (3D Top) */}
            <div className="absolute inset-x-0 -top-4 h-8 rounded-[50%] bg-pink/80 mix-blend-multiply opacity-80" />
            
            {/* Liquid Body */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-deep/95 via-pink/80 to-lav/70 backdrop-blur-sm" />
            
            {/* Deep Bottom Layer (Syrup/Plum) */}
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-plum/90 to-transparent" />
          </motion.div>
          
          {/* Boba Pearls */}
          <motion.div 
            style={{ x: bobaX, y: bobaY }}
            className="absolute inset-x-0 bottom-6 flex justify-center items-end"
          >
            {bobaConfigs.map((b, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.9),2px_2px_4px_rgba(0,0,0,0.5)]"
                style={{ 
                  width: b.s, 
                  height: b.s, 
                  left: `calc(50% + ${b.x}px)`, 
                  bottom: b.y,
                  background: "radial-gradient(circle at 35% 35%, #4a3b30 0%, #1a1510 60%, #050403 100%)"
                }}
                initial={{ y: -400, opacity: 0, scale: 0.5 }}
                animate={{ 
                  y: [0, -10, 0], 
                  opacity: 1, 
                  scale: 1,
                  rotate: [0, 180, 360]
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: b.floatDuration,
                    ease: "easeInOut",
                    delay: b.d
                  },
                  opacity: { duration: 0.5, delay: b.d },
                  scale: { type: "spring", delay: b.d },
                  rotate: { repeat: Infinity, duration: b.floatDuration * 2, ease: "linear" }
                }}
              />
            ))}
          </motion.div>
          
          {/* Glossy Highlights (Reflections) */}
          <div className="absolute inset-y-4 start-3 w-8 rounded-full bg-gradient-to-b from-white/70 to-transparent blur-[2px] opacity-80" />
          <div className="absolute inset-y-12 end-4 w-4 rounded-full bg-gradient-to-b from-white/50 to-transparent blur-[1px] opacity-60" />
          
        </div>
      </motion.div>
      
      {/* Ambient Floor Shadow */}
      <div className="absolute -bottom-8 inset-x-6 h-6 rounded-[50%] bg-pink-deep/30 blur-xl opacity-70" />
    </motion.div>
  );
}

export function Hero() {
  const { t } = useLang();

  const stats = [
    { value: "100%", label: { en: "Fresh leaves, daily", ar: "أوراق طازجة يوميًا" } },
    { value: "2013", label: { en: "Founded in Melbourne", ar: "تأسست في ملبورن" } },
    { value: "0", label: { en: "Powder used, ever", ar: "مسحوق مستخدم" } },
  ];

  return (
    <section
      id="top"
      className="bg-gradient-pastel relative flex min-h-screen items-center overflow-hidden pb-12 pt-24 sm:pb-16 sm:pt-32"
    >
      <TabebuiaTree
        className="hidden h-[520px] w-[400px] opacity-40 sm:block mix-blend-multiply"
        style={{ bottom: -40, insetInlineStart: -70 }}
      />
      <TabebuiaTree
        flip
        className="h-[420px] w-[320px] opacity-30 mix-blend-multiply"
        style={{ bottom: -60, insetInlineEnd: -90 }}
      />
      <Petals />
      <FlowerDeco className="w-[220px] opacity-45 mix-blend-multiply" style={{ top: 80, insetInlineStart: -60 }} />

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] items-center gap-8 lg:gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.span variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-md px-4 py-1.5 text-xs font-semibold tracking-wide text-ink shadow-sm">
            {t({ en: "Melbourne born · Taiwan grown", ar: "وُلدت في ملبورن · نمت في تايوان" })}
          </motion.span>
          
          <motion.h1 variants={itemVariants} className="mt-5 sm:mt-6 text-4xl sm:text-5xl lg:text-7xl leading-[1.25] sm:leading-[1.18] text-plum drop-shadow-sm">
            {t({ en: "Handcrafted fresh tea, ", ar: "شاي طازج بلمسة يدوية، " })}
            <span className="text-gradient-neon block mt-1 sm:mt-2 pb-2">
              {t({ en: "poured with pastel joy", ar: "تُقدَّم بفرحة الباستيل" })}
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="mt-6 max-w-xl text-lg leading-relaxed text-plum-soft">
            {t({
              en: "Every cup starts on our own tea farms in Taiwan and is brewed fresh in-store — never from powder. Now blooming in Jeddah.",
              ar: "كل كوب يبدأ رحلته من مزارعنا الخاصة في تايوان، ويُحضّر طازجًا داخل المحل دون أي مسحوق أو اختصارات. واليوم نزهر هنا في جدة.",
            })}
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#menu"
              className="bg-gradient-neon inline-flex items-center justify-center rounded-full w-full sm:w-auto px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-lg hover:scale-105"
            >
              {t({ en: "View Menu", ar: "استعرض القائمة" })}
            </a>
            <a
              href="#locations"
              className="inline-flex items-center justify-center rounded-full w-full sm:w-auto border-2 border-pink-deep/30 bg-card/50 backdrop-blur px-8 py-4 text-base font-semibold text-plum transition-all duration-300 hover:bg-pink-soft hover:border-pink-deep"
            >
              {t({ en: "Find a Branch", ar: "أقرب فرع" })}
            </a>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-10 sm:mt-14 flex flex-wrap gap-6 sm:gap-10 border-t border-border/50 pt-6 sm:pt-8 w-full justify-between sm:justify-start">
            {stats.map((s) => (
              <div key={s.value} className="flex flex-col gap-1">
                <b className="font-display text-3xl text-plum">{s.value}</b>
                <span className="text-sm font-medium text-plum-soft/80">{t(s.label)}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative w-full flex flex-col justify-center items-center mt-10 lg:mt-0">
          <CupVisual />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 1.5 }}
            className="relative mt-8 lg:absolute lg:bottom-10 lg:-end-6 flex items-center gap-2.5 rounded-full border border-border bg-card/90 backdrop-blur-md px-5 py-2.5 text-sm font-bold text-plum shadow-glow-lg z-20"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-neon"></span>
            </span>
            {t({ en: "New: Collagen Tea line", ar: "جديد: تشكيلة كولاجين الشاي" })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

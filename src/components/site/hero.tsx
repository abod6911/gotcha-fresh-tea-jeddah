import { useLang } from "@/lib/i18n";
import { FlowerDeco, Petals, TabebuiaTree } from "./decor";
import { motion } from "framer-motion";

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
      type: "spring",
      stiffness: 70,
      damping: 15,
    },
  },
};

function CupVisual() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
      className="relative mx-auto h-[340px] w-[220px] sm:h-[400px] sm:w-[260px]"
    >
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="h-full w-full relative"
      >
        <div className="absolute inset-x-3 top-4 h-6 rounded-t-[2rem] bg-lav-soft shadow-soft" />
        <div className="absolute inset-x-0 top-8 bottom-0 overflow-hidden rounded-b-[3rem] rounded-t-[1.5rem] border border-border bg-card/70 shadow-soft backdrop-blur">
          <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-pink-deep via-pink to-lav opacity-90" />
          <div className="absolute inset-x-0 bottom-0 h-[24%] bg-plum/90" />
          <div className="absolute inset-y-0 start-4 w-6 animate-shine rounded-full bg-white/40 blur-[3px]" />
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-3">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="h-4 w-4 rounded-full bg-plum shadow-md"
                initial={{ y: -250, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                  delay: 0.6 + i * 0.15,
                  mass: 0.8
                }}
              />
            ))}
          </div>
        </div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 1 }}
          className="absolute -top-10 end-10 h-24 w-3 rotate-12 rounded-full bg-lav-deep shadow-lg" 
        />
      </motion.div>
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
      className="bg-gradient-pastel relative flex min-h-screen items-center overflow-hidden pb-16 pt-32"
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

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.span variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-md px-4 py-1.5 text-xs font-semibold tracking-wide text-ink shadow-sm">
            {t({ en: "Melbourne born · Taiwan grown", ar: "وُلدت في ملبورن · نمت في تايوان" })}
          </motion.span>
          
          <motion.h1 variants={itemVariants} className="mt-6 text-5xl leading-[1.1] text-plum sm:text-6xl lg:text-7xl drop-shadow-sm">
            {t({ en: "Handcrafted fresh tea, ", ar: "شاي طازج بلمسة يدوية، " })}
            <span className="text-gradient-neon block mt-2 pb-2">
              {t({ en: "poured with pastel joy", ar: "تُقدَّم بفرحة الباستيل" })}
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="mt-6 max-w-xl text-lg leading-relaxed text-plum-soft">
            {t({
              en: "Every cup starts on our own tea farms in Taiwan and is brewed fresh in-store — never from powder. Now blooming in Jeddah.",
              ar: "كل كوب يبدأ رحلته من مزارعنا الخاصة في تايوان، ويُحضّر طازجًا داخل المحل دون أي مسحوق أو اختصارات. واليوم نزهر هنا في جدة.",
            })}
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#menu"
              className="bg-gradient-neon inline-flex rounded-full px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-lg hover:scale-105"
            >
              {t({ en: "View Menu", ar: "استعرض القائمة" })}
            </a>
            <a
              href="#locations"
              className="inline-flex items-center justify-center rounded-full border-2 border-pink-deep/30 bg-card/50 backdrop-blur px-8 py-4 text-base font-semibold text-plum transition-all duration-300 hover:bg-pink-soft hover:border-pink-deep"
            >
              {t({ en: "Find a Branch", ar: "أقرب فرع" })}
            </a>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-14 flex flex-wrap gap-10 border-t border-border/50 pt-8 w-full">
            {stats.map((s) => (
              <div key={s.value} className="flex flex-col gap-1">
                <b className="font-display text-3xl text-plum">{s.value}</b>
                <span className="text-sm font-medium text-plum-soft/80">{t(s.label)}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative w-full flex justify-center items-center mt-10 lg:mt-0">
          <CupVisual />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 1.5 }}
            className="absolute bottom-6 end-0 sm:end-6 flex items-center gap-2.5 rounded-full border border-border bg-card/90 backdrop-blur-md px-5 py-2.5 text-sm font-bold text-plum shadow-glow-lg z-20"
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

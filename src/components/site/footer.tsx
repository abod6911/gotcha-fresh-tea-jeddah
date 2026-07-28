import { useLang } from "@/lib/i18n";
import { GotchaLogo } from "./logo";
import { Sparkles } from "lucide-react";

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.15 4.38-2.9 5.84-1.74 1.45-4.04 2.15-6.3 1.95-2.25-.19-4.38-1.27-5.83-3.03-1.46-1.75-2.09-4.11-1.77-6.38.31-2.28 1.63-4.35 3.51-5.63 1.88-1.29 4.26-1.69 6.44-1.11V12.7c-1.21-.36-2.55-.3-3.7.3-1.16.6-2.02 1.64-2.3 2.89-.28 1.25-.03 2.6.65 3.65.68 1.05 1.78 1.72 3.03 1.84 1.26.13 2.56-.25 3.53-1.02.97-.77 1.54-1.93 1.54-3.17V.02z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.031 0h-.032C5.385 0 .015 5.37.015 11.984c0 2.656.852 5.132 2.33 7.155L.54 24l5.05-1.326c1.942 1.341 4.238 2.122 6.441 2.122 6.613 0 11.984-5.371 11.984-11.985C24.015 5.371 18.644 0 12.031 0zm0 22.614c-2.203 0-4.35-.591-6.22-1.696l-.447-.264-3.568.937.954-3.48-.29-.462c-1.218-1.936-1.859-4.183-1.859-6.49C.587 6.577 4.215 2.185 8.847 2.185c2.316 0 4.492.903 6.13 2.54 1.638 1.637 2.54 3.813 2.54 6.13 0 4.63-3.626 8.4-8.258 8.411v-.001h-.001-.001c-.004 0-.008 0-.012 0h-.015z" />
  </svg>
);

export function Footer() {
  const { t } = useLang();

  const explore = [
    { href: "#story", label: { en: "Our Story", ar: "قصتنا" } },
    { href: "#menu", label: { en: "Menu", ar: "القائمة" } },
    { href: "#farms", label: { en: "Tea Farms", ar: "مزارعنا" } },
    { href: "#gallery", label: { en: "Gallery", ar: "لحظاتنا" } },
    { href: "#rewards", label: { en: "Rewards", ar: "المكافآت" } },
  ];

  const socialLinks = [
    {
      name: { en: "WhatsApp", ar: "واتساب الخدمة" },
      icon: <WhatsAppIcon />,
      color: "hover:border-emerald-400 hover:text-emerald-500 hover:bg-emerald-50/50",
    },
    {
      name: { en: "Instagram", ar: "إنستغرام قوتشا" },
      icon: <InstagramIcon />,
      color: "hover:border-pink-500 hover:text-pink-600 hover:bg-pink-50/50",
    },
    {
      name: { en: "TikTok", ar: "تيك توك جدة" },
      icon: <TikTokIcon />,
      color: "hover:border-violet-500 hover:text-violet-600 hover:bg-violet-50/50",
    },
    {
      name: { en: "X Platform", ar: "منصة إكس" },
      icon: <XIcon />,
      color: "hover:border-slate-800 hover:text-slate-900 hover:bg-slate-100",
    },
  ];

  return (
    <footer id="contact" className="border-t border-pink-deep/20 bg-gradient-to-b from-cream via-cream-2 to-pink-soft/40 pt-16 pb-8 relative z-10 overflow-hidden max-w-full">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 sm:px-6 md:grid-cols-3">
        {/* Brand & Mission */}
        <div>
          <div className="flex items-center gap-3">
            <GotchaLogo className="h-11 w-11 shadow-sm" />
            <span className="font-display text-2xl font-bold text-plum">
              Gotcha <span className="text-neon">{t({ en: "Fresh Tea", ar: "فريش تي" })}</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm sm:text-base leading-relaxed font-medium text-plum/90">
            {t({
              en: "Handcrafted fresh tea, born in Melbourne, grown on our own farms in Taiwan.",
              ar: "شاي طازج بلمسة يدوية، وُلد في ملبورن، وينمو في مزارعنا الخاصة بتايوان.",
            })}
          </p>

          {/* Luxury Social Pill Cards with Text Labels */}
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-ink mb-3">
              {t({ en: "Official Channels", ar: "قنوات التواصل الرسمية" })}
            </p>
            <div className="grid grid-cols-2 gap-2.5 max-w-sm">
              {socialLinks.map((s) => (
                <div
                  key={s.name.en}
                  className={`flex items-center gap-2.5 rounded-2xl border border-pink-deep/25 bg-card/90 px-3.5 py-2.5 text-xs font-bold text-plum shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft cursor-pointer ${s.color}`}
                >
                  <span className="shrink-0">{s.icon}</span>
                  <span className="truncate">{t(s.name)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-ink">
            {t({ en: "Explore", ar: "استكشف" })}
          </h3>
          <ul className="mt-4 space-y-3">
            {explore.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm sm:text-base font-bold text-plum/80 transition-all hover:text-neon hover:ps-1 inline-block">
                  {t(l.label)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-ink">
            {t({ en: "Get in Touch", ar: "تواصل معنا" })}
          </h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-pink-deep/20 bg-card/80 p-4 shadow-sm">
              <p className="text-xs text-plum-soft font-semibold">{t({ en: "Customer Care", ar: "خدمة العملاء" })}</p>
              <p className="text-sm font-bold text-plum mt-1">hello@gotcha-jeddah.sa</p>
            </div>
            <div className="rounded-2xl border border-pink-deep/20 bg-card/80 p-4 shadow-sm">
              <p className="text-xs text-plum-soft font-semibold">{t({ en: "Main Location", ar: "المقر الرئيسي" })}</p>
              <p className="text-sm font-bold text-plum mt-1">{t({ en: "Jeddah, Saudi Arabia", ar: "جدة، المملكة العربية السعودية" })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar & Signature Developer Credit Badge */}
      <div className="mx-auto mt-12 flex max-w-[1180px] flex-col sm:flex-row items-center justify-between gap-4 border-t border-pink-deep/20 px-4 sm:px-6 pt-6 text-xs sm:text-sm font-semibold text-plum/80">
        <span>
          {t({
            en: "© 2026 Gotcha Fresh Tea, Jeddah. All rights reserved.",
            ar: "© 2026 قوتشا فريش تي، جدة. جميع الحقوق محفوظة.",
          })}
        </span>

        {/* Upgraded Signature Developer Credit Badge */}
        <div className="group relative inline-flex items-center gap-2 rounded-full border border-pink-deep/40 bg-gradient-to-r from-card via-cream-2 to-pink-soft/80 px-5 py-2.5 text-xs font-bold text-plum shadow-soft transition-all duration-300 hover:scale-105 hover:border-pink-deep hover:shadow-glow">
          <Sparkles className="h-4 w-4 text-neon animate-pulse shrink-0" />
          <span>{t({ en: "Developed by", ar: "تم تطوير هذا الموقع بواسطة" })}</span>
          <strong className="text-neon font-display text-sm tracking-wide bg-gradient-neon bg-clip-text text-transparent">abed</strong>
        </div>
      </div>
    </footer>
  );
}

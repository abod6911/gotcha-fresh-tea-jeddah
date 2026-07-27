import { useLang } from "@/lib/i18n";
import { GotchaLogo } from "./logo";

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

  return (
    <footer id="contact" className="border-t border-border bg-cream pt-16 relative z-10">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <GotchaLogo className="h-10 w-10" />
            <span className="font-display text-xl text-plum">
              Gotcha {t({ en: "Fresh Tea", ar: "فريش تي" })}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-plum-soft">
            {t({
              en: "Handcrafted fresh tea, born in Melbourne, grown on our own farms in Taiwan.",
              ar: "شاي طازج بلمسة يدوية، وُلد في ملبورن، وينمو في مزارعنا الخاصة بتايوان.",
            })}
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { label: "WhatsApp", icon: <WhatsAppIcon /> },
              { label: "X", icon: <XIcon /> },
              { label: "TikTok", icon: <TikTokIcon /> },
              { label: "Instagram", icon: <InstagramIcon /> },
            ].map((s) => (
               <a
                key={s.label}
                href="#contact"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-plum transition-all duration-300 hover:bg-pink-soft hover:scale-110 hover:text-pink-deep shadow-sm"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-ink">
            {t({ en: "Explore", ar: "استكشف" })}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {explore.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-plum-soft transition-colors hover:text-plum">
                  {t(l.label)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-ink">
            {t({ en: "Get in Touch", ar: "تواصل معنا" })}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-plum-soft">
            <li>hello@gotcha-jeddah.sa</li>
            <li>{t({ en: "Jeddah, Saudi Arabia", ar: "جدة، المملكة العربية السعودية" })}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1180px] flex-col sm:flex-row items-center justify-between gap-4 border-t border-border px-6 py-6 text-xs text-plum-soft">
        <span>
          {t({
            en: "© 2026 Gotcha Fresh Tea, Jeddah. All rights reserved.",
            ar: "© 2026 قوتشا فريش تي، جدة. جميع الحقوق محفوظة.",
          })}
        </span>

        {/* User requested credit line */}
        <span className="font-bold text-plum bg-card px-5 py-2 rounded-full border border-pink-deep/20 shadow-soft transition-all hover:scale-105 hover:bg-pink-soft">
          تم تطوير هذا الموقع بواسطه abed
        </span>
      </div>
    </footer>
  );
}

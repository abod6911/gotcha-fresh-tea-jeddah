import { useLang } from "@/lib/i18n";
import { GotchaLogo } from "./logo";

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
    <footer id="contact" className="border-t border-border bg-cream pt-16">
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
              { label: "Instagram", icon: "📷" },
              { label: "TikTok", icon: "🎵" },
              { label: "X", icon: "✖️" },
              { label: "WhatsApp", icon: "💬" },
            ].map((s) => (
              <a
                key={s.label}
                href="#contact"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 hover:bg-pink-soft hover:scale-110 shadow-sm"
              >
                <span aria-hidden="true">{s.icon}</span>
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

      <div className="mx-auto mt-12 flex max-w-[1180px] flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-6 text-xs text-plum-soft">
        <span>
          {t({
            en: "© 2026 Gotcha Fresh Tea, Jeddah. All rights reserved.",
            ar: "© 2026 قوتشا فريش تي، جدة. جميع الحقوق محفوظة.",
          })}
        </span>

        {/* User requested credit line */}
        <span className="font-bold text-plum bg-pink-soft/80 px-4 py-1.5 rounded-full border border-pink-deep/30 shadow-sm transition-transform hover:scale-105">
          تم صناعه هذا الموقع بواسطه abed 🌸
        </span>
      </div>
    </footer>
  );
}

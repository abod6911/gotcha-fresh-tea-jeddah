import { useEffect, useState } from "react";
import { Globe, Menu as MenuIcon, ShoppingBag, X, User, LogOut, Award, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { GotchaLogo } from "./logo";

const NAV = [
  { href: "#story", label: { en: "Our Story", ar: "قصتنا" } },
  { href: "#menu", label: { en: "Menu", ar: "القائمة" } },
  { href: "#farms", label: { en: "Tea Farms", ar: "مزارعنا" } },
  { href: "#gallery", label: { en: "Gallery", ar: "لحظاتنا" } },
  { href: "#rewards", label: { en: "Rewards", ar: "المكافآت" } },
  { href: "#locations", label: { en: "Locations", ar: "الفروع" } },
  { href: "#contact", label: { en: "Contact", ar: "تواصل معنا" } },
];

export function Header() {
  const { t, lang, toggle } = useLang();
  const { count, setOpen } = useCart();
  const { user, setAuthOpen, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [active, setActive] = useState("#story");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (userDropdown && !target.closest('.user-dropdown-container')) {
        setUserDropdown(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [userDropdown]);

  useEffect(() => {
    const sections = NAV.map((n) => document.querySelector(n.href)).filter(
      Boolean
    ) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled 
          ? "shadow-soft bg-white/40 backdrop-blur-2xl border-white/40" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3">
        <a href="#top" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <GotchaLogo className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 transition-transform duration-300 group-hover:scale-105" />
          <span className="flex flex-col leading-none">
            <b className="font-display text-xl tracking-wide text-plum">Gotcha</b>
            <span className="text-[0.6rem] uppercase tracking-[0.24em] text-ink">
              {t({ en: "Fresh Tea", ar: "قوتشا فريش تي" })}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              style={{ animationDelay: `${i * 70}ms` }}
              className={`group relative py-1 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                active === item.href ? "text-plum" : "text-plum-soft hover:text-plum"
              }`}
            >
              {t(item.label)}
              <span
                className={`bg-gradient-neon absolute -bottom-0.5 inset-x-0 h-0.5 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  active === item.href
                    ? "origin-center scale-x-100"
                    : "origin-[left] scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={toggle}
            aria-label="Switch language"
            className="flex items-center gap-1 sm:gap-1.5 rounded-full border-[1.5px] border-pink-deep bg-card px-2 sm:px-3.5 py-1.5 text-[0.65rem] sm:text-xs font-semibold text-plum transition-all duration-300 hover:border-neon hover:bg-pink-soft hover:scale-105"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "ar" ? "English" : "العربية"}
          </button>

          {/* User Loyalty / Auth */}
          {user ? (
            <div className="relative user-dropdown-container">
              <button
                onClick={() => setUserDropdown((v) => !v)}
                className="flex items-center gap-1.5 sm:gap-2 rounded-full border-[1.5px] border-pink-deep bg-cream-2 px-2 sm:px-3 py-1 text-xs font-semibold text-plum shadow-sm transition-all hover:bg-pink-soft"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-6 w-6 rounded-full object-cover ring-1 ring-pink-deep"
                />
                <span className="hidden sm:inline-block max-w-[90px] truncate">{user.name}</span>
                <span className="flex items-center gap-1 rounded-full bg-plum/10 px-2 py-0.5 text-[0.65rem] font-bold text-plum">
                  🌸 {user.blossoms}
                </span>
              </button>

              {userDropdown && (
                <div className="absolute end-0 mt-2 w-56 rounded-2xl border border-border bg-card p-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="border-b border-border pb-2.5 mb-2 px-2">
                    <p className="text-xs font-bold text-plum">{user.name}</p>
                    <p className="text-[0.7rem] text-plum-soft truncate">{user.email}</p>
                    <div className="mt-2 flex items-center justify-between rounded-xl bg-pink-soft/60 px-2.5 py-1 text-xs font-semibold text-plum">
                      <span className="flex items-center gap-1">
                        <Award className="h-3.5 w-3.5 text-neon" /> {user.tier}
                      </span>
                      <span>{user.points} pts</span>
                    </div>
                  </div>
                  <a
                    href="#rewards"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium text-plum hover:bg-pink-soft"
                  >
                    <Sparkles className="h-4 w-4 text-neon" />
                    {t({ en: "Loyalty Dashboard", ar: "لوحة تحكم الولاء" })}
                  </a>
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdown(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    {t({ en: "Sign out", ar: "تسجيل الخروج" })}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 rounded-full border-[1.5px] border-pink-deep bg-card px-2 sm:px-3.5 py-1.5 text-[0.65rem] sm:text-xs font-semibold text-plum transition-all duration-300 hover:border-neon hover:bg-pink-soft hover:scale-105"
            >
              <User className="h-3.5 w-3.5 text-ink shrink-0" />
              <span className="hidden xs:inline-block">{t({ en: "Login", ar: "دخول" })}</span>
            </button>
          )}

          {/* Cart button */}
          <button
            onClick={() => setOpen(true)}
            aria-label={t({ en: "Open cart", ar: "فتح السلة" })}
            className="relative rounded-full border-[1.5px] border-pink-deep bg-card p-1.5 sm:p-2 text-plum transition-all duration-300 hover:bg-pink-soft hover:scale-105 shrink-0"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="bg-gradient-neon absolute -top-1.5 -end-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[0.65rem] font-bold text-primary-foreground animate-pulse">
                {count}
              </span>
            )}
          </button>

          {/* Order Now CTA */}
          <a
            href="#menu"
            className="bg-gradient-neon hidden rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg active:scale-95 sm:inline-flex"
          >
            {t({ en: "Order Now", ar: "اطلب الآن" })}
          </a>

          {/* Mobile menu toggle */}
          <button
            className="rounded-full border-[1.5px] border-pink-deep p-1.5 sm:p-2 text-plum lg:hidden shrink-0"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t({ en: "Menu", ar: "القائمة" })}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="min-h-0 overflow-hidden border-t border-border bg-card/95 px-6">
          <ul className="grid gap-1 py-4">
            {NAV.map((item, i) => (
              <li
                key={item.href}
                style={{
                  transitionDelay: mobileOpen ? `${80 + i * 45}ms` : "0ms",
                }}
                className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
              >
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-plum-soft transition-all duration-300 hover:bg-pink-soft hover:ps-5 hover:text-plum"
                >
                  {t(item.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

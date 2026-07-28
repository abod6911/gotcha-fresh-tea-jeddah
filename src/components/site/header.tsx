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
          ? "shadow-soft bg-white/80 backdrop-blur-2xl border-pink-deep/20" 
          : "bg-gradient-to-b from-white/90 via-white/50 to-transparent border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-1.5 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3 flex-nowrap overflow-hidden">
        
        {/* Brand Logo */}
        <a href="#top" className="flex items-center gap-1.5 sm:gap-2.5 group shrink-0 select-none">
          <GotchaLogo className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 transition-transform duration-300 group-hover:scale-105" />
          <span className="flex flex-col leading-none">
            <b className="font-display text-base sm:text-xl tracking-wide text-plum">Gotcha</b>
            <span className="text-[0.5rem] sm:text-[0.6rem] uppercase tracking-wider text-ink font-bold">
              {t({ en: "Fresh Tea", ar: "قوتشا فريش تي" })}
            </span>
          </span>
        </a>

        {/* Desktop Nav Links Pill Container (Only on XL 1280px+) */}
        <nav className="hidden xl:flex items-center gap-1 shrink-0 bg-card/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-deep/25 shadow-soft">
          {NAV.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3 py-1 text-xs xl:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-neon text-white shadow-glow"
                    : "text-plum/80 hover:text-plum hover:bg-pink-soft/60"
                }`}
              >
                {t(item.label)}
              </a>
            );
          })}
        </nav>

        {/* Right/Left Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={toggle}
            aria-label="Switch language"
            className="flex items-center gap-1 rounded-full border border-pink-deep/30 bg-card px-2 sm:px-3 py-1 sm:py-1.5 text-[0.65rem] sm:text-xs font-bold text-plum transition-all duration-300 hover:border-neon hover:bg-pink-soft hover:scale-105 shadow-xs"
          >
            <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-neon shrink-0" />
            <span className="hidden xs:inline">{lang === "ar" ? "English" : "العربية"}</span>
            <span className="xs:hidden">{lang === "ar" ? "EN" : "ع"}</span>
          </button>

          {/* User Loyalty / Auth */}
          {user ? (
            <div className="relative user-dropdown-container">
              <button
                onClick={() => setUserDropdown((v) => !v)}
                className="flex items-center gap-1 sm:gap-2 rounded-full border border-pink-deep/40 bg-gradient-to-r from-card to-pink-soft/60 px-2 sm:px-3 py-1 text-[0.7rem] sm:text-xs font-bold text-plum shadow-sm transition-all hover:scale-105"
                title={user.name}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-5 w-5 sm:h-6 sm:w-6 rounded-full object-cover ring-1 ring-pink-deep shrink-0 bg-white"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/notionists/svg?seed=${user.email || 'gotcha'}`;
                  }}
                />
                <span className="hidden sm:inline-block max-w-[80px] truncate font-bold text-plum">{user.name.split(" ")[0]}</span>
                <span className="flex items-center gap-0.5 rounded-full bg-pink-soft px-1.5 py-0.5 text-[0.6rem] sm:text-[0.65rem] font-bold text-plum border border-pink-deep/30">
                  🌸 {user.blossoms ?? 1}
                </span>
              </button>

              {userDropdown && (
                <div className="absolute end-0 mt-2 w-56 sm:w-60 rounded-2xl border border-pink-deep/30 bg-card/95 p-3 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="border-b border-border pb-2.5 mb-2 px-1 text-start">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={user.avatar} alt="" className="h-8 w-8 rounded-full ring-2 ring-pink-deep object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-plum truncate">{user.name}</p>
                        <p className="text-[0.65rem] text-plum-soft truncate">{user.email || "حساب Google محقق"}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between rounded-xl bg-gradient-to-r from-pink-soft/80 to-cream-2 px-2.5 py-1 text-xs font-semibold text-plum border border-pink-deep/20">
                      <span className="flex items-center gap-1 font-bold text-[0.7rem]">
                        <Award className="h-3.5 w-3.5 text-neon" /> {user.tier || "Bronze"}
                      </span>
                      <span className="font-bold text-[0.7rem]">{user.points ?? 50} pts · 🌸 {user.blossoms ?? 1}</span>
                    </div>
                  </div>
                  <a
                    href="#rewards"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-plum hover:bg-pink-soft transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-neon" />
                    {t({ en: "Loyalty Dashboard", ar: "لوحة تحكم الولاء" })}
                  </a>
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdown(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    {t({ en: "Sign out", ar: "تسجيل الخروج" })}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="flex items-center gap-1 rounded-full border border-pink-deep/30 bg-card px-2.5 sm:px-3 py-1 sm:py-1.5 text-[0.65rem] sm:text-xs font-bold text-plum transition-all duration-300 hover:border-neon hover:bg-pink-soft shadow-xs"
            >
              <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-ink shrink-0" />
              <span>{t({ en: "Login", ar: "تسجيل الدخول" })}</span>
            </button>
          )}

          {/* Cart Button */}
          <button
            onClick={() => setOpen(true)}
            aria-label={t({ en: "Open cart", ar: "فتح السلة" })}
            className="relative rounded-full border border-pink-deep/30 bg-card p-1.5 sm:p-2 text-plum transition-all duration-300 hover:bg-pink-soft shrink-0 shadow-xs"
          >
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {count > 0 && (
              <span className="bg-gradient-neon absolute -top-1 -end-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.6rem] font-bold text-primary-foreground animate-pulse shadow-glow">
                {count}
              </span>
            )}
          </button>

          {/* Order Now CTA Button (Hidden on small mobile screens) */}
          <a
            href="#menu"
            className="bg-gradient-neon hidden sm:inline-flex rounded-full px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
          >
            {t({ en: "Order Now", ar: "اطلب الآن" })}
          </a>

          {/* Mobile Menu Toggle (Visible up to XL) */}
          <button
            className="rounded-full border border-pink-deep/30 p-1.5 sm:p-2 text-plum xl:hidden shrink-0 bg-card hover:bg-pink-soft shadow-xs"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t({ en: "Menu", ar: "القائمة" })}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={`grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:hidden ${
          mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="min-h-0 overflow-hidden border-t border-pink-deep/20 bg-card/95 backdrop-blur-xl px-4 sm:px-6">
          <ul className="grid gap-1 py-3">
            {NAV.map((item, i) => (
              <li
                key={item.href}
                style={{
                  transitionDelay: mobileOpen ? `${60 + i * 40}ms` : "0ms",
                }}
                className={`transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
              >
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-bold text-plum transition-all duration-300 hover:bg-pink-soft hover:ps-5"
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

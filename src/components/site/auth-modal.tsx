import { useEffect, useState } from "react";
import { X, Sparkles, Award } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";

import { GOTCHA_LOGO_DATA_URL } from "@/lib/logo-data-url";

export function AuthModal() {
  const { t } = useLang();
  const { user, isAuthOpen, isAuthenticating, setAuthOpen, loginWithGoogle, loginWithApple, saveProfile } = useAuth();
  
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthOpen) {
        setAuthOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthOpen, setAuthOpen]);

  if (!isAuthOpen) return null;

  const handleSaveProfile = () => {
    if (!nameInput.trim() || !ageInput) return;
    saveProfile(nameInput, parseInt(ageInput, 10));
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Overlay Backdrop */}
      <div
        className="absolute inset-0 bg-plum/50 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={() => setAuthOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border bg-card p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-300 sm:p-8">
        {/* Background glow decoration */}
        <div className="pointer-events-none absolute -top-20 -end-20 h-44 w-44 rounded-full bg-pink-deep/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -start-20 h-44 w-44 rounded-full bg-lav-deep/20 blur-3xl" />

        {/* Close button */}
        <button
          onClick={() => setAuthOpen(false)}
          className="absolute top-5 end-5 rounded-full p-2 text-plum-soft transition-colors hover:bg-pink-soft hover:text-plum"
          aria-label={t({ en: "Close modal", ar: "إغلاق النافذة" })}
        >
          <X className="h-5 w-5" />
        </button>

        {user?.needsProfile ? (
          /* Profile Setup Screen */
          <div className="relative z-10 text-center animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="mt-4 font-display text-2xl font-bold text-plum">
              {t({ en: "Complete your profile", ar: "أكمل ملفك الشخصي" })}
            </h3>
            <p className="mt-2 text-sm text-plum-soft leading-relaxed">
              {t({
                en: "Please enter your name and age to finish setting up your account.",
                ar: "يرجى إدخال اسمك وعمرك لإكمال إعداد حسابك.",
              })}
            </p>
            
            <div className="mt-6 space-y-4">
              <input 
                type="text" 
                placeholder={t({ en: "Your Name", ar: "الاسم الكريم" })}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full rounded-2xl border border-border bg-cream-2 px-4 py-3 text-sm text-plum outline-none placeholder:text-plum-soft focus:border-pink-deep transition-colors"
              />
              <input 
                type="number" 
                placeholder={t({ en: "Your Age", ar: "العمر" })}
                value={ageInput}
                onChange={(e) => setAgeInput(e.target.value)}
                className="w-full rounded-2xl border border-border bg-cream-2 px-4 py-3 text-sm text-plum outline-none placeholder:text-plum-soft focus:border-pink-deep transition-colors"
              />
              <button
                onClick={handleSaveProfile}
                disabled={!nameInput.trim() || !ageInput}
                className="bg-gradient-neon mt-2 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t({ en: "Save Profile", ar: "حفظ ومتابعة" })}
              </button>
            </div>
          </div>
        ) : (
          /* Initial Auth Screen */
          <div className="relative z-10 text-center animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-glow border border-pink-deep/20 overflow-hidden">
              <img src={GOTCHA_LOGO_DATA_URL} alt="Gotcha Logo" className="h-10 w-10 object-cover rounded-full" />
            </div>

            <h3 className="mt-4 font-display text-2xl font-bold text-plum">
              {t({ en: "Join Gotcha Rewards", ar: "تسجيل الدخول لنظام نقاط الولاء" })}
            </h3>
            <p className="mt-2 text-sm text-plum-soft leading-relaxed">
              {t({
                en: "Sign in with Google to track your blossoms, calculate loyalty points, and redeem free drinks!",
                ar: "سجّل دخولك الآن بواسطة حساب Google لحساب نقاط الولاء وتجميع أزهار قوتشا والحصول على مشروبات مجانية!",
              })}
            </p>

            {/* Loyalty Perks preview */}
            <div className="mt-6 rounded-2xl border border-pink/30 bg-cream-2/80 p-4 backdrop-blur-sm text-start">
              <div className="flex items-center gap-2 text-xs font-semibold text-plum mb-2">
                <Sparkles className="h-4 w-4 text-neon" />
                <span>{t({ en: "Loyalty Perks", ar: "مميزات حساب الولاء" })}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-plum-soft">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon" />
                  {t({ en: "1 Blossom per drink ordered", ar: "زهرة واحدة مع كل كوب تطلبه" })}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon" />
                  {t({ en: "10 Points for every SAR 1 spent", ar: "10 نقاط ولاء مقابل كل ريال تسدده" })}
                </li>
              </ul>
            </div>

            {/* Auth Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={loginWithGoogle}
                disabled={isAuthenticating}
                className="group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-plum shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-deep hover:bg-pink-soft/50 hover:shadow-soft disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isAuthenticating ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-plum border-t-transparent" />
                ) : (
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                )}
                <span>
                  {isAuthenticating
                    ? t({ en: "Connecting securely...", ar: "جاري الاتصال الآمن..." })
                    : t({ en: "Continue with Google", ar: "متابعة بواسطة حساب Google" })}
                </span>
              </button>
            </div>
            
            <p className="mt-5 text-center text-[0.7rem] text-plum-soft">
              {t({
                en: "By logging in, you agree to Gotcha Tea Loyalty terms and conditions.",
                ar: "تسجيل الدخول يمنحك التمتع بالمكافآت التلقائية وسجل النقاط الخاص بك.",
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

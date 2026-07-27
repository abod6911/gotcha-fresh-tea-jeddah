import { X, Sparkles, Award } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";

export function AuthModal() {
  const { t } = useLang();
  const { isAuthOpen, setAuthOpen, loginWithGoogle, loginWithApple } = useAuth();

  if (!isAuthOpen) return null;

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

        {/* Header content */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink to-lav shadow-glow">
            <Award className="h-7 w-7 text-plum" />
          </div>

          <h3 className="mt-4 font-display text-2xl font-bold text-plum">
            {t({ en: "Join Gotcha Rewards", ar: "تسجيل الدخول لنظام نقاط الولاء" })}
          </h3>
          <p className="mt-2 text-sm text-plum-soft leading-relaxed">
            {t({
              en: "Sign in with Google or Apple to track your blossoms, calculate loyalty points, and redeem free drinks!",
              ar: "سجّل دخولك الآن بواسطة جوجل أو أبل لحساب نقاط الولاء وتجميع أزهار قوتشا والحصول على مشروبات مجانية!",
            })}
          </p>
        </div>

        {/* Loyalty Perks preview */}
        <div className="mt-6 rounded-2xl border border-pink/30 bg-cream-2/80 p-4 backdrop-blur-sm">
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
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neon" />
              {t({ en: "Free drink voucher at 10 Blossoms", ar: "قسيمة مشروب مجاني عند تجميع 10 أزهار" })}
            </li>
          </ul>
        </div>

        {/* Auth Action Buttons */}
        <div className="mt-6 space-y-3">
          {/* Google Sign In */}
          <button
            onClick={loginWithGoogle}
            className="group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-plum shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-deep hover:bg-pink-soft/50 hover:shadow-soft"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{t({ en: "Continue with Google", ar: "متابعة بواسطة حساب Google" })}</span>
          </button>

          {/* Apple Sign In */}
          <button
            onClick={loginWithApple}
            className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-plum px-5 py-3.5 text-sm font-semibold text-cream shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum/90 hover:shadow-soft"
          >
            <svg className="h-5 w-5 fill-current shrink-0 text-cream" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.16-1.9-14.49-6.06-3.18-2.58-7.07-7.23-11.68-13.95-6.53-9.48-11.68-20.15-15.46-32.01-3.78-11.86-5.67-23.2-5.67-34.02 0-15.46 3.99-28.53 11.96-39.2 7.98-10.67 18.1-16.12 30.38-16.36 4.79 0 9.99 1.18 15.6 3.54 5.61 2.36 9.61 3.54 12.01 3.54 2.11 0 6.24-1.25 12.39-3.75 6.15-2.5 11.51-3.61 16.08-3.33 11.97.98 21.6 5.48 28.89 13.5-10.62 6.42-15.82 15.46-15.6 27.13.22 9.14 3.73 16.8 10.53 22.98 6.8 6.18 14.97 9.87 24.51 11.07-2.39 7.08-5.66 14.28-9.8 21.6zm-27.17-107.5c0 7.39-2.67 14.37-8.01 20.94-5.34 6.57-11.94 10.45-19.8 11.64-.22-.87-.33-1.85-.33-2.94 0-7.29 2.78-14.36 8.34-21.2 5.56-6.84 12.3-10.74 20.22-11.7.11.87.16 1.77.16 2.71z" />
            </svg>
            <span>{t({ en: "Continue with Apple", ar: "متابعة بواسطة حساب Apple" })}</span>
          </button>
        </div>

        {/* Footer info */}
        <p className="mt-5 text-center text-[0.7rem] text-plum-soft">
          {t({
            en: "By logging in, you agree to Gotcha Tea Loyalty terms and conditions.",
            ar: "تسجيل الدخول يمنحك التمتع بالمكافآت التلقائية وسجل النقاط الخاص بك.",
          })}
        </p>
      </div>
    </div>
  );
}

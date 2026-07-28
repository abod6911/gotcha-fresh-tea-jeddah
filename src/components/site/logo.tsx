import { GOTCHA_LOGO_DATA_URL } from "@/lib/logo-data-url";

export function GotchaLogo({ className }: { className?: string; showText?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center select-none shrink-0 ${className ?? ""}`}>
      <img
        src={GOTCHA_LOGO_DATA_URL}
        alt="Gotcha Fresh Tea Logo"
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover rounded-full bg-white p-0.5 shadow-sm ring-1 ring-pink-deep/20 transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

export function GotchaFarmerVector({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center p-2 text-center select-none ${className ?? ""}`}>
      <img
        src={GOTCHA_LOGO_DATA_URL}
        alt="Gotcha Fresh Tea Logo"
        loading="eager"
        decoding="async"
        className="h-28 w-28 sm:h-36 sm:w-36 rounded-full object-cover bg-white p-1 shadow-md ring-2 ring-pink-deep/30 transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

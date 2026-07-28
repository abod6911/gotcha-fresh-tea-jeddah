import { GOTCHA_LOGO_DATA_URL } from "@/lib/logo-data-url";

export function GotchaLogo({ className }: { className?: string; showText?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center select-none shrink-0 ${className ?? ""}`}>
      <img
        src="https://images.deliveryhero.io/image/hungerstation/restaurant/logo_ar/5c7a782c67c18cf33d9508f533b51a89.jpg"
        onError={(e) => {
          (e.target as HTMLImageElement).src = GOTCHA_LOGO_DATA_URL;
        }}
        alt="Gotcha Fresh Tea Official Logo"
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover rounded-full bg-white p-0.5 shadow-md ring-2 ring-pink-deep/40 border border-white transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

export function GotchaFarmerVector({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center p-2 text-center select-none ${className ?? ""}`}>
      <img
        src="https://images.deliveryhero.io/image/hungerstation/restaurant/logo_ar/5c7a782c67c18cf33d9508f533b51a89.jpg"
        onError={(e) => {
          (e.target as HTMLImageElement).src = GOTCHA_LOGO_DATA_URL;
        }}
        alt="Gotcha Fresh Tea Official Logo"
        loading="eager"
        decoding="async"
        className="h-28 w-28 sm:h-36 sm:w-36 rounded-full object-cover bg-white p-1 shadow-md ring-4 ring-pink-deep/40 border-2 border-white transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}




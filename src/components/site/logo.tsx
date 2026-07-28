import { GOTCHA_LOGO_DATA_URL } from "@/lib/logo-data-url";

export function GotchaLogo({ className }: { className?: string; showText?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center select-none shrink-0 ${className ?? ""}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full rounded-full shadow-sm ring-2 ring-pink-deep/40 border border-white bg-white p-0.5 transition-transform duration-300 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft pastel circular background */}
        <circle cx="50" cy="50" r="48" fill="url(#gotcha-logo-grad)" stroke="#e88aa7" strokeWidth="2" />
        <defs>
          <radialGradient id="gotcha-logo-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8fa" />
            <stop offset="100%" stopColor="#ffe4ed" />
          </radialGradient>
          <linearGradient id="gotcha-tea-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e88aa7" />
            <stop offset="100%" stopColor="#8d2b59" />
          </linearGradient>
          <linearGradient id="gotcha-leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#81c784" />
            <stop offset="100%" stopColor="#388e3c" />
          </linearGradient>
        </defs>

        {/* Tea Leaves at top */}
        <path d="M50 18 C56 12, 62 18, 56 25 C52 23, 50 20, 50 18 Z" fill="url(#gotcha-leaf-grad)" />
        <path d="M48 20 C42 14, 36 20, 42 27 C46 25, 48 22, 48 20 Z" fill="url(#gotcha-leaf-grad)" opacity="0.85" />

        {/* Stylized Gotcha Cup */}
        <path d="M36 30 L64 30 L60 62 C59 67 55 70 50 70 C45 70 41 67 40 62 Z" fill="url(#gotcha-tea-grad)" />
        {/* Boba pearls in cup */}
        <circle cx="44" cy="58" r="3" fill="#2c1e16" />
        <circle cx="50" cy="62" r="3" fill="#100b08" />
        <circle cx="56" cy="58" r="3" fill="#2c1e16" />
        <circle cx="47" cy="52" r="2.5" fill="#2c1e16" />
        <circle cx="53" cy="52" r="2.5" fill="#3e2723" />

        {/* Straw */}
        <rect x="53" y="16" width="3.5" height="18" rx="1.5" transform="rotate(15 53 16)" fill="#d81b60" />

        {/* GOTCHA Text Label */}
        <text x="50" y="82" textAnchor="middle" fill="#581c38" fontSize="11" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">
          GOTCHA
        </text>
      </svg>
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
        className="h-28 w-28 sm:h-36 sm:w-36 rounded-full object-cover bg-white p-1 shadow-md ring-4 ring-pink-deep/40 border-2 border-white transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}



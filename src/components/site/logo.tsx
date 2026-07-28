import { GOTCHA_LOGO_DATA_URL } from "@/lib/logo-data-url";

export function GotchaLogo({ className }: { className?: string; showText?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center select-none shrink-0 ${className ?? ""}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full rounded-full shadow-md border-2 border-white bg-white transition-transform duration-300 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Ring */}
        <circle cx="100" cy="100" r="95" stroke="#F497B6" strokeWidth="6" fill="#FFFFFF" />
        <circle cx="100" cy="100" r="88" stroke="#E5BA6A" strokeWidth="2" strokeDasharray="4 2" fill="none" />

        {/* Farmer Boy Silhouette holding Tea Cup */}
        <g transform="translate(100, 75) scale(0.85)">
          {/* Hat / Hair */}
          <path d="M-22,-35 C-15,-48 15,-48 22,-35 C28,-22 24,-12 20,-5 C12,-8 -12,-8 -20,-5 C-24,-12 -28,-22 -22,-35 Z" fill="#C59B4E" />
          <path d="M-18,-30 C-10,-40 10,-40 18,-30" stroke="#8C6721" strokeWidth="2" fill="none" />
          
          {/* Face */}
          <circle cx="0" cy="-12" r="14" fill="#FFE5C4" />
          {/* Eyes */}
          <circle cx="-5" cy="-14" r="2" fill="#4A3515" />
          <circle cx="5" cy="-14" r="2" fill="#4A3515" />
          {/* Smile */}
          <path d="M-4,-8 Q0,-4 4,-8" stroke="#4A3515" strokeWidth="1.5" fill="none" />

          {/* Hands holding Cup */}
          <path d="M-15,5 Q0,15 15,5" stroke="#C59B4E" strokeWidth="4" strokeLinecap="round" fill="none" />
          <rect x="-8" y="0" width="16" height="22" rx="4" fill="#66BB6A" stroke="#2E7D32" strokeWidth="2" />
          <path d="M-5,4 L5,4 L3,18 L-3,18 Z" fill="#40C4FF" />
          {/* Straw */}
          <line x1="2" y1="-5" x2="6" y2="4" stroke="#E91E63" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Floating Tea Leaves & Sparkles */}
        <path d="M55,35 Q65,25 70,35 Q60,45 55,35 Z" fill="#66BB6A" />
        <path d="M145,40 Q135,30 130,40 Q140,50 145,40 Z" fill="#81C784" />
        <circle cx="60" cy="55" r="2.5" fill="#E5BA6A" />
        <circle cx="140" cy="60" r="3" fill="#E5BA6A" />
        <circle cx="148" cy="75" r="2" fill="#F497B6" />
        <circle cx="52" cy="70" r="2" fill="#F497B6" />

        {/* GOTCHA Bold Typography */}
        <g transform="translate(100, 152)">
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill="#2D5A27"
            fontSize="32"
            fontWeight="900"
            fontFamily="Arial, Helvetica, sans-serif"
            letterSpacing="2"
          >
            GOTCHA
          </text>
          {/* Accent Straw G letter icon */}
          <rect x="-72" y="-24" width="6" height="26" rx="3" fill="#66BB6A" transform="rotate(-10 -72 -24)" />
        </g>

        {/* Subtitle */}
        <text
          x="100"
          y="172"
          textAnchor="middle"
          fill="#8C6721"
          fontSize="13"
          fontWeight="700"
          fontFamily="Arial, Helvetica, sans-serif"
          letterSpacing="3"
        >
          FRESH TEA
        </text>
      </svg>
    </div>
  );
}

export function GotchaFarmerVector({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center p-2 text-center select-none ${className ?? ""}`}>
      <GotchaLogo className="h-28 w-28 sm:h-36 sm:w-36 drop-shadow-md" />
    </div>
  );
}





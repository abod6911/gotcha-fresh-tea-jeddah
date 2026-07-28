import logoAsset from "@/assets/gotcha-logo.jpg.asset.json";

export function GotchaLogo({ className, showText = false }: { className?: string; showText?: boolean }) {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className ?? ""}`}>
      {/* High-Resolution Crisp Logo Image with Image-Rendering Smoothness */}
      <img
        src={logoAsset.url}
        alt="Gotcha Fresh Tea Logo"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain rounded-full bg-white p-1 ring-2 ring-[#C5A059]/30 shadow-sm transition-transform duration-300"
        style={{
          imageRendering: "crisp-edges",
          WebkitBackfaceVisibility: "hidden",
        }}
      />
    </div>
  );
}

export function GotchaFarmerVector({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center p-2 text-center ${className ?? ""}`}>
      {/* Ultra HD Sharp Vector Emblem of Gotcha Farmer & Brand */}
      <svg viewBox="0 0 300 320" className="w-full h-full max-h-[140px] drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Leaves */}
        <path d="M195 32 C190 22 205 18 208 28 Z" fill="#84B036" />
        <path d="M92 48 C85 40 96 36 100 44 Z" fill="#C5A059" />
        <path d="M68 95 C60 88 72 82 76 90 Z" fill="#C5A059" />
        <path d="M228 128 C220 120 234 116 238 124 Z" fill="#C5A059" />
        <path d="M232 148 C226 142 236 138 240 144 Z" fill="#C5A059" />

        {/* Farmer Straw Hat */}
        <path d="M150 20 C185 20 215 35 235 55 C215 50 185 45 150 45 C115 45 85 50 65 55 C85 35 115 20 150 20 Z" stroke="#C5A059" strokeWidth="4" fill="white" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="150" cy="85" rx="100" ry="45" stroke="#C5A059" strokeWidth="4" fill="white" />

        {/* Hair & Head */}
        <path d="M118 68 C118 50 182 50 182 68 V82 H118 Z" fill="#C5A059" />
        <path d="M118 82 H182 C182 110 118 110 118 82 Z" stroke="#C5A059" strokeWidth="4" fill="white" />
        <ellipse cx="118" cy="90" rx="5" ry="8" stroke="#C5A059" strokeWidth="3" fill="white" />
        <ellipse cx="182" cy="90" rx="5" ry="8" stroke="#C5A059" strokeWidth="3" fill="white" />

        {/* Face Expression */}
        <path d="M136 86 Q142 82 148 86" stroke="#C5A059" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M152 86 Q158 82 164 86" stroke="#C5A059" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M147 100 Q150 103 153 100" stroke="#C5A059" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Body & Shirt Stripes */}
        <path d="M106 122 C106 118 194 118 194 122 L198 165 C198 175 102 175 102 165 Z" stroke="#C5A059" strokeWidth="4" fill="white" />
        <line x1="110" y1="130" x2="190" y2="130" stroke="#C5A059" strokeWidth="3" />
        <line x1="112" y1="140" x2="188" y2="140" stroke="#C5A059" strokeWidth="3" />
        <line x1="114" y1="150" x2="186" y2="150" stroke="#C5A059" strokeWidth="3" />
        <line x1="116" y1="160" x2="184" y2="160" stroke="#C5A059" strokeWidth="3" />

        {/* Overalls & Rake */}
        <path d="M122 122 L124 165 M178 122 L176 165" stroke="#C5A059" strokeWidth="4" />
        <path d="M178 98 L215 155" stroke="#C5A059" strokeWidth="4" strokeLinecap="round" />
        <path d="M200 95 L220 102 M204 90 L224 97 M208 85 L228 92 M212 80 L232 87" stroke="#C5A059" strokeWidth="3.5" strokeLinecap="round" />

        {/* Hand holding Boba Cup */}
        <path d="M125 130 C120 145 130 155 142 155 H154 C162 155 168 145 162 130 Z" stroke="#C5A059" strokeWidth="3.5" fill="white" />
        <rect x="135" y="132" width="18" height="26" rx="3" stroke="#C5A059" strokeWidth="3" fill="white" />
        <line x1="144" y1="120" x2="144" y2="132" stroke="#C5A059" strokeWidth="3" />
      </svg>

      {/* Sharp GOTCHA Brand Typography */}
      <div className="mt-1 flex items-baseline justify-center gap-1 font-bold tracking-[0.18em] text-[#1A1A1A] font-display text-2xl sm:text-3xl select-none">
        <span>G</span>
        {/* Tea Tube 'O' */}
        <span className="relative inline-flex flex-col items-center justify-center w-5 h-7 border-2 border-[#1A1A1A] rounded-full overflow-hidden mx-0.5 align-middle bg-white">
          <span className="absolute bottom-0 inset-x-0 h-[60%] bg-[#84B036]" />
        </span>
        <span>T C H A</span>
      </div>
    </div>
  );
}

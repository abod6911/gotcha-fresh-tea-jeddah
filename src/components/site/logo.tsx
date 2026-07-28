export function GotchaLogo({ className }: { className?: string; showText?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center select-none shrink-0 ${className ?? ""}`}>
      <img
        src="./images/gotcha_logo.png"
        alt="Gotcha Fresh Tea Logo"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain transition-transform duration-300"
      />
    </div>
  );
}

export function GotchaFarmerVector({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center p-2 text-center select-none ${className ?? ""}`}>
      <img
        src="./images/gotcha_logo.png"
        alt="Gotcha Fresh Tea Logo"
        loading="eager"
        decoding="async"
        className="max-h-[180px] sm:max-h-[220px] w-auto object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

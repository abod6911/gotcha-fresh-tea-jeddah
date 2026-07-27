import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";

export function FloatingActions() {
  const { t } = useLang();
  const { setOpen } = useCart();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 end-6 z-40 flex flex-col items-center gap-3">
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t({ en: "Back to top", ar: "العودة للأعلى" })}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-plum shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={() => setOpen(true)}
        aria-label={t({ en: "Quick Cart & Order", ar: "الطلب السريع" })}
        className="bg-gradient-neon flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-lg active:scale-95 animate-pulse"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}

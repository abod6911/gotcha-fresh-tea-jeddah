import { useEffect, useRef } from "react";

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - 150;
      targetY = e.clientY - 150;
      if (glowRef.current) {
        glowRef.current.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="hidden md:block pointer-events-none fixed top-0 start-0 h-[300px] w-[300px] rounded-full bg-pink-soft/25 blur-[90px] transition-opacity duration-300 z-0 opacity-0 will-change-transform"
      style={{ transform: "translate3d(-500px, -500px, 0)" }}
    />
  );
}


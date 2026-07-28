import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function MouseGlow() {
  const [isVisible, setIsVisible] = useState(false);

  // Use springs for smooth follower physics
  const cursorX = useSpring(0, { stiffness: 100, damping: 25, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 100, damping: 25, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 200); // 200 is half the width to center it
      cursorY.set(e.clientY - 200);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
      className="hidden md:block pointer-events-none fixed inset-0 h-[400px] w-[400px] rounded-full bg-pink-soft/20 blur-[100px] mix-blend-screen transition-opacity duration-500 z-0"
    />
  );
}

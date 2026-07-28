import type { SyntheticEvent } from "react";

export function scrollToSection(e: SyntheticEvent | null, href: string) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const targetId = href.startsWith("#") ? href : `#${href}`;
  const targetEl = document.querySelector(targetId);

  if (targetEl) {
    const headerOffset = 85;
    const elementPosition = targetEl.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth",
    });
  }
}

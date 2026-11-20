"use client";

import { useEffect } from "react";

/**
 * Prvky s `[data-play]` dostanou třídu `isPlaying`, jakmile jsou z části
 * vidět, a už si ji nechají. Animace samotné jsou čisté CSS (ukázky produktu
 * na homepage), tohle je jen spustí ve chvíli, kdy je člověk vidí.
 * Bez IntersectionObserveru se spustí hned. Reduced motion řeší CSS.
 */
export function PlayOnView() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-play]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("isPlaying"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("isPlaying");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.3 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}

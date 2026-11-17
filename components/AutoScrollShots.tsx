"use client";

import { useEffect } from "react";

/**
 * Screenshots marked `[data-autoscroll]` start scrolling through the whole
 * page once they are on screen (class `isPlaying`), and stop when they leave.
 * The animation itself is pure CSS; this only toggles the class, so nothing
 * runs off-screen. With prefers-reduced-motion the CSS keeps them still.
 */
export function AutoScrollShots() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-autoscroll]"));
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("isPlaying", entry.isIntersecting);
        }
      },
      { threshold: 0.35 },
    );
    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return null;
}

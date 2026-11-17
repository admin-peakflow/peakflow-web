"use client";

import { useEffect, useRef, useState } from "react";

const PLAIN_NUMBER = /^\d[\d\s ]*$/;
const fmt = (n: number) => n.toLocaleString("cs-CZ");

/**
 * Animated stat value. Three shapes:
 * - plain integer ("545 112", "220")  → counts up from 0 when scrolled into view
 * - "before → after" ("4 → 209")      → shows "before", then slides in "→ after"
 * - anything else                     → rendered as is
 *
 * Server-rendered HTML always contains the final text, so crawlers and
 * no-JS visitors see the real number. Reduced motion skips the animation.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<"idle" | "running" | "done">("done");
  const [shown, setShown] = useState(value);

  const isNumber = PLAIN_NUMBER.test(value);
  const arrow = value.includes("→") ? value.split("→").map((s) => s.trim()) : null;

  useEffect(() => {
    const el = ref.current;
    if (!el || (!isNumber && !arrow)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = isNumber ? Number(value.replace(/\D/g, "")) : 0;
    if (isNumber) setShown("0");
    setState("idle");

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setState("running");
        if (!isNumber) return;
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(fmt(Math.round(target * eased)));
          if (t < 1) raf = requestAnimationFrame(tick);
          else setState("done");
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
    // value is static per render; arrow/isNumber derive from it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (arrow && arrow.length === 2) {
    return (
      <span ref={ref} className="countArrow" data-state={state}>
        <span className="countFrom">{arrow[0]}</span>{" "}
        <span className="countTo">→ {arrow[1]}</span>
      </span>
    );
  }

  return (
    <span ref={ref} aria-label={isNumber ? value : undefined}>
      {isNumber ? shown : value}
    </span>
  );
}

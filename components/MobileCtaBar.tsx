"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MAIN_CTA, contact } from "@/lib/site";
import styles from "./MobileCtaBar.module.css";

/** Stránky, které mají vlastní formulář. Lišta by tam jen překážela. */
const HIDDEN_ON = ["/kontakt", "/katalog"];

/**
 * Spodní lišta s hlavní výzvou, jen na mobilu (CSS ji nad 760 px schová).
 * Na mobilu má homepage přes 15 000 px a tlačítko v hlavičce je schované
 * v menu, takže bez lišty je výzva vidět jen v hero a na konci.
 *
 * Objeví se po odscrollování pod první obrazovku. Schová se, když je vidět
 * prvek s `data-hide-cta-bar` (hero, závěrečná výzva, formulář katalogu)
 * nebo patička, aby se tlačítka nezdvojovala.
 */
export function MobileCtaBar() {
  const pathname = usePathname() || "/";
  const off = HIDDEN_ON.some((p) => pathname.startsWith(p));
  const [scrolled, setScrolled] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (off) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setBlocked(visible.size > 0);
    });
    document.querySelectorAll("[data-hide-cta-bar], footer").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [off, pathname]);

  if (off) return null;
  const shown = scrolled && !blocked;

  return (
    <div
      className={`${styles.bar} ${shown ? styles.shown : ""}`}
      data-track-location="sticky_bar"
      aria-hidden={!shown}
      inert={!shown}
    >
      <Link href="/kontakt/" className={styles.cta} data-cta>
        {MAIN_CTA}
      </Link>
      <a
        href={`tel:${contact.phone.replace(/\s/g, "")}`}
        className={styles.phone}
        aria-label={`Zavolat na ${contact.phone}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}

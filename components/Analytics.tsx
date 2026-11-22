"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { REFERENCES, SERVICES, getItem, pageType, track, trackItems } from "@/lib/analytics";

/**
 * Měření interakcí přes jeden posluchač na `document`. Komponenty nic
 * neimportují, stačí atributy v HTML:
 *
 * | atribut                    | co udělá                                              |
 * |----------------------------|-------------------------------------------------------|
 * | `data-cta`                 | klik = `cta_click` (automaticky i u třídy `.btn`)     |
 * | `data-track-item="<id>"`   | prvek vidět z 50 % = `view_item`; u tlačítka klik = `view_item` |
 * | `data-track-select="<id>"` | klik na odkaz = `select_item` (z výpisu na detail)    |
 * | `data-track-location="x"`  | přepíše odvozené umístění kliku (header/footer/sekce) |
 * | `data-track-form="<name>"` | první interakce s formulářem = `contact_form_start`   |
 * | `data-track-calculator`    | první změna posuvníku = `roi_calculator_use`          |
 * | `data-contact-method="x"`  | klik na odkaz = `contact_click` s `contact_method: x` (rezervace v kalendáři) |
 *
 * Bez atributů se měří: `mailto:` / `tel:` (`contact_click`), odkazy ven
 * (`outbound_click`), navigace v hlavičce a patičce (`nav_click`), otevření
 * otázky v FAQ (`faq_open`) a přechod mezi stránkami bez reloadu
 * (`virtual_page_view`).
 */

function locationOf(el: Element): string {
  const explicit = el.closest<HTMLElement>("[data-track-location]")?.dataset.trackLocation;
  if (explicit) return explicit;
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  const section = el.closest("section[id]");
  if (section) return section.id;
  return "main";
}

/** Viditelný text prvku bez dekorací (šipky a ikony s aria-hidden). */
function labelOf(el: Element): string {
  const explicit = (el as HTMLElement).dataset?.trackLabel;
  let text = explicit ?? "";
  if (!text) {
    const clone = el.cloneNode(true) as Element;
    clone.querySelectorAll("[aria-hidden='true']").forEach((n) => n.remove());
    text = clone.textContent || el.getAttribute("aria-label") || "";
  }
  return text.replace(/\s+/g, " ").trim().slice(0, 100);
}

function onClick(event: MouseEvent) {
  const target = event.target as Element | null;
  const el = target?.closest?.("a, button");
  if (!el) return;
  const loc = locationOf(el);
  const text = labelOf(el);

  if (el instanceof HTMLButtonElement) {
    if (el.hasAttribute("data-cc") || el.type === "submit") return; // lišta cookies, odeslání formuláře
    const itemId = el.dataset.trackItem;
    if (itemId) {
      const item = getItem(itemId);
      if (item) trackItems("view_item", [item]);
      return;
    }
    if (el.classList.contains("btn") || el.hasAttribute("data-cta")) {
      track("cta_click", { cta_text: text, cta_location: loc, cta_url: "", cta_type: "button" });
    }
    return;
  }

  const a = el as HTMLAnchorElement;
  const href = a.getAttribute("href") || "";
  if (href.startsWith("mailto:")) {
    track("contact_click", { contact_method: "email", contact_location: loc });
    return;
  }
  if (href.startsWith("tel:")) {
    track("contact_click", { contact_method: "phone", contact_location: loc });
    return;
  }
  // Rezervace termínu vede ven (Google Kalendář), ale je to kontakt, ne odchod z webu.
  if (a.dataset.contactMethod) {
    track("contact_click", { contact_method: a.dataset.contactMethod, contact_location: loc });
    return;
  }

  let url: URL;
  try {
    url = new URL(a.href, window.location.href);
  } catch {
    return;
  }
  if (!/^https?:$/.test(url.protocol)) return;

  if (url.host !== window.location.host) {
    track("outbound_click", {
      link_url: url.href,
      link_domain: url.hostname.replace(/^www\./, ""),
      link_text: text,
      link_location: loc,
    });
    return;
  }

  const path = url.pathname + url.hash;
  const selectId = a.dataset.trackSelect;
  if (selectId) {
    const item = getItem(selectId);
    if (item) trackItems("select_item", [item], loc);
  }
  if (a.classList.contains("btn") || a.hasAttribute("data-cta")) {
    track("cta_click", {
      cta_text: text,
      cta_location: loc,
      cta_url: path,
      cta_type: url.pathname.startsWith("/kontakt") ? "discovery_call" : "internal",
    });
    return;
  }
  if (!selectId && (a.closest("header, footer, nav") || url.pathname === window.location.pathname)) {
    track("nav_click", { link_text: text, link_url: path, link_location: loc });
  }
}

/** FAQ: jen otevření otázky v sekci #faq (mobilní menu je taky `<details>`). */
function onToggle(event: Event) {
  const d = event.target;
  if (!(d instanceof HTMLDetailsElement) || !d.open || !d.closest("#faq")) return;
  track("faq_open", { faq_question: labelOf(d.querySelector("summary") ?? d) });
}

export function Analytics() {
  const pathname = usePathname();
  const firstPath = useRef<string | null>(null);
  const once = useRef(new Set<string>());

  // Globální posluchače — jednou za život stránky.
  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      const form = (e.target as Element | null)?.closest?.<HTMLFormElement>("form[data-track-form]");
      const name = form?.dataset.trackForm;
      if (!name || once.current.has(`form:${name}`)) return;
      once.current.add(`form:${name}`);
      track("contact_form_start", { form_name: name, lead_source: name });
    };
    const onChange = (e: Event) => {
      const calc = (e.target as Element | null)?.closest?.("[data-track-calculator]");
      if (!calc || once.current.has("calc")) return;
      once.current.add("calc");
      track("roi_calculator_use", { calculator: calc.getAttribute("data-track-calculator") || "roi" });
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("toggle", onToggle, true);
    document.addEventListener("focusin", onFocus, true);
    document.addEventListener("change", onChange, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("toggle", onToggle, true);
      document.removeEventListener("focusin", onFocus, true);
      document.removeEventListener("change", onChange, true);
    };
  }, []);

  // Každá stránka (první načtení i přechod bez reloadu).
  useEffect(() => {
    // Jednorázové věci (formulář, kalkulačka) se počítají znovu na každé stránce.
    once.current.clear();

    // První načtení měří GTM sám (All Pages). Přechody bez reloadu ne → virtual_page_view.
    if (firstPath.current === null) {
      firstPath.current = pathname;
    } else {
      // Titulek se po přechodu mění až po vykreslení, proto až v dalším snímku.
      requestAnimationFrame(() =>
        track("virtual_page_view", {
          page_path: pathname,
          page_title: document.title,
          page_type: pageType(pathname),
          page_location: window.location.href,
        }),
      );
    }

    // „Produkty“ podle stránky.
    const type = pageType(pathname);
    if (type === "sluzby")
      trackItems("view_item_list", SERVICES.filter((s) => s.item_id !== "sluzba-weby"), "Služby");
    if (type === "weby") {
      trackItems("view_item", SERVICES.filter((s) => s.item_id === "sluzba-weby"));
      trackItems("view_item_list", REFERENCES, "Weby — reference");
    }
    if (type === "reference_detail") {
      const slug = pathname.split("/").filter(Boolean)[1];
      const item = getItem(`reference-${slug}`);
      if (item) trackItems("view_item", [item]);
    }

    // Prvky s data-track-item: view_item, když je vidět aspoň z poloviny (1× za stránku).
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.trackItem;
          // Vysoká sekce nikdy nebude vidět z 50 %, stačí, když zabere půlku obrazovky.
          const visible =
            entry.intersectionRatio >= 0.5 ||
            entry.intersectionRect.height >= window.innerHeight * 0.5;
          if (!entry.isIntersecting || !visible || !id || seen.has(id)) continue;
          seen.add(id);
          const item = getItem(id);
          if (item) trackItems("view_item", [item]);
          observer.unobserve(entry.target);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    const t = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>("[data-track-item]:not(button)")
        .forEach((el) => observer.observe(el));
    }, 0);
    return () => {
      window.clearTimeout(t);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

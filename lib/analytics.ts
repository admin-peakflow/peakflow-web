/**
 * Jednotný dataLayer pro peakflow.cz. Jediné místo, kudy web posílá události
 * do GTM. Z GTM se rozdělují do GA4, Skliku (SEM), Meta a TikToku.
 * Přehled událostí a mapování na pixely je v `docs/gtm/README.md`.
 *
 * Pravidla:
 * - Žádné osobní údaje (jméno, e-mail, telefon, text zprávy) do dataLayer nikdy.
 * - Názvy událostí a parametrů podle GA4 (snake_case, doporučené názvy, kde existují).
 * - Kdo chce nový klik měřit, přidá do HTML atribut, ne nový kód. Viz
 *   `components/Analytics.tsx` a sekci „Atributy“ v README.
 */
import { CASES } from "@/lib/cases";

export type Item = {
  item_id: string;
  item_name: string;
  item_category: "Služba" | "Reference";
  item_category2?: string;
  item_list_name?: string;
  index?: number;
};

/** Služby jako „produkty“ pro ecommerce události (view_item, select_item…). */
export const SERVICES: Item[] = [
  { item_id: "sluzba-erp", item_name: "ERP a systémy na míru", item_category: "Služba" },
  { item_id: "sluzba-automatizace", item_name: "Raynet CRM a automatizace obchodu", item_category: "Služba" },
  { item_id: "sluzba-asistenti", item_name: "AI asistenti a boti", item_category: "Služba" },
  { item_id: "sluzba-data", item_name: "Data a reporting", item_category: "Služba" },
  { item_id: "sluzba-weby", item_name: "Weby na míru", item_category: "Služba" },
];

/** Reference (case studies z /weby) jako „produkty“. */
export const REFERENCES: Item[] = CASES.map((c) => ({
  item_id: `reference-${c.slug}`,
  item_name: c.name,
  item_category: "Reference",
  item_category2: c.field,
}));

const ALL_ITEMS = [...SERVICES, ...REFERENCES];

export const getItem = (id: string) => ALL_ITEMS.find((i) => i.item_id === id);

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

/**
 * Všechny parametry událostí. GTM si hodnoty z dataLayer pamatuje napříč
 * událostmi, takže by `cta_text` z minulého kliku odešel i s dalším
 * `nav_click`. Každý push je proto nejdřív vynuluje (undefined GTM neposílá).
 * Nový parametr = přidat ho sem i do GTM (proměnná DLV + tag).
 */
const PARAM_KEYS = [
  "cta_text", "cta_location", "cta_url", "cta_type",
  "contact_method", "contact_location",
  "link_url", "link_domain", "link_text", "link_location",
  "faq_question", "form_name", "calculator",
  "page_path", "page_title", "page_type", "page_location",
  "lead_source", "lead_topic",
] as const;
const RESET = Object.fromEntries(PARAM_KEYS.map((k) => [k, undefined]));

/** Pošle událost do dataLayer. Na serveru (build) nedělá nic. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ ...RESET, event, ...params });
}

/**
 * Ecommerce událost (GA4 formát). Předchozí `ecommerce` se nejdřív vynuluje,
 * jinak by GTM slil položky z minulé události do nové.
 */
export function trackItems(
  event: "view_item" | "view_item_list" | "select_item",
  items: Item[],
  listName?: string,
) {
  if (!items.length || typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ ecommerce: null });
  track(event, {
    ecommerce: {
      currency: "CZK",
      ...(listName ? { item_list_name: listName } : {}),
      items: items.map((item, index) => ({ ...item, index, ...(listName ? { item_list_name: listName } : {}) })),
    },
  });
}

/** Typ stránky podle cesty. Jde do virtual_page_view a pomáhá segmentovat. */
export function pageType(path: string): string {
  if (path === "/") return "home";
  if (path.startsWith("/sluzby")) return "sluzby";
  if (path.startsWith("/kontakt")) return "kontakt";
  if (path.startsWith("/reference")) return "reference";
  if (path.startsWith("/o-nas")) return "o_nas";
  if (/^\/weby\/[^/]+\/?$/.test(path)) return "reference_detail";
  if (path.startsWith("/weby")) return "weby";
  return "other";
}

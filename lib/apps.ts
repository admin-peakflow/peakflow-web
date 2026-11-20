/**
 * Aplikace, které jsme postavili a které běží v provozu. Sdílí homepage
 * (components/home/Apps.tsx) a /reference/.
 *
 * Pravidla: jen ověřené funkce a stav. Screenshoty jen z ukázkové verze
 * s vymyšlenými daty, nikdy z ostrého provozu (osobní údaje zaměstnanců
 * a zákazníků). Žádná provozní čísla klienta.
 * Zdroje: PackLabs vault 18 - ERP/(C) PackLabsApp - Manuál (2026-11-08),
 * Dreamy vault 15 - Logistika/(C) Předání dokumentace DreamyApp (2026-10-30).
 */
export type App = {
  id: string;
  name: string;
  client: string;
  title: string;
  points: string[];
  status: string;
  stack: string;
  /** Odkaz na související case study (např. web stejného klienta). */
  caseLink?: { href: string; text: string };
};

export const APPS: App[] = [
  {
    id: "packlabsapp",
    name: "PackLabsApp",
    client: "PackLabs · balení a kompletace",
    title: "Provoz skladu a výroby v telefonu",
    points: [
      "Docházka a zápis hotové práce z telefonu, průvodce po jednom kroku",
      "Směny, hygienické kontroly (HACCP) a školení s podpisem prstem",
      "Výkon každého pracovníka vůči normě produktu",
      "Česky i ukrajinsky, instaluje se na plochu jako aplikace",
    ],
    status: "V pilotním provozu",
    stack: "Cloudflare Workers + D1",
  },
  {
    id: "dreamyapp",
    name: "DreamyApp",
    client: "Dreamy · matrace a postele",
    title: "Logistika, CRM a reklamace v jedné aplikaci",
    points: [
      "Požadavky na přepravu a týdenní plán závozů místo Excelu",
      "Optimalizace trasy, přepravní štítky a listy s QR navigací pro řidiče",
      "Klienti, nabídky, objednávky a reklamace na jednom místě",
      "Napojení na ABRU a Shoptet, obchodník může pracovat i přes AI asistenta",
    ],
    status: "V ostrém provozu",
    stack: "Node.js, React, SQLite",
    caseLink: {
      href: "/weby/dreamy/",
      text: "Pro Dreamy jsme předělali i celý e-shop na Shoptetu.",
    },
  },
];

/**
 * „Co právě běží“: projekty, které stavíme nebo provozujeme. Sdílí homepage
 * a /reference/.
 *
 * Pravidla:
 * - Stav psát poctivě („připraveno k nasazení“, ne „nasazeno“).
 * - Klienty anonymně, dokud písemně neschválí jméno. Žádná čísla bez podkladu.
 * - Až bude case study s čísly, přidat sem odkaz `href` na detail.
 */
export type Running = {
  title: string;
  body: string;
  status: string;
  tone: "live" | "ready" | "next";
  href?: string;
};

export const RUNNING: Running[] = [
  {
    title: "Raynet CRM pro ECOTERM s.r.o.",
    body: "Zavedení Raynetu a automatický zápis e‑mailové komunikace z obchodní schránky k obchodním případům. Běží každý den a výpadky se samy dohánějí.",
    status: "Běží od října 2026",
    tone: "live",
  },
  {
    title: "ERP pro montážní firmu",
    body: "Obchod, montáže, odečty a správa v jednom systému místo tabulek. Provoz vyjde na jednotky dolarů měsíčně.",
    status: "Připraveno k nasazení",
    tone: "ready",
  },
  {
    title: "Automatizace obchodu pro poradenskou firmu",
    body: "Asistent obchodníka a automatické doplňování dat do Raynetu pro celý obchodní tým.",
    status: "Před startem realizace",
    tone: "next",
  },
  {
    title: "Firemní AI asistent v PackLabs",
    body: "Zná firemní dokumenty a postupy a odpovídá týmu. Nové znalosti navrhuje sám, do paměti je pustí až člověk.",
    status: "Běží ve vlastní firmě",
    tone: "live",
  },
  {
    title: "Weby a produktový poradce",
    body: "Šest webů naostro. Mezi nimi poradce pro Dreamy, který z 34 matrací a 21 řad polštářů doporučí kombinaci.",
    status: "Běží",
    tone: "live",
    href: "/weby/",
  },
];

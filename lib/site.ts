/**
 * Jedno místo pro identitu webu, kontakty a nastavení formuláře.
 */

export const site = {
  name: "PeakFlow",
  legalName: "PackLabs Moravia s.r.o.",
  ico: "23903554",
  dic: "CZ23903554",
  address: "Albrechtická 2160/39, 794 01 Krnov",
  register: "Zapsáno v OR u KS v Ostravě, oddíl C, vložka 101292",
  domain: "peakflow.cz",
  url: "https://peakflow.cz",
  description:
    "AI-first tým pro firmy. Stavíme ERP na míru a AI asistenty, zavádíme Raynet CRM a automatizujeme obchod a back-office. Napojíme se na to, co už máte.",
} as const;

export const contact: {
  email: string;
  phone: string;
  /** Calendly / Cal.com / Google rezervace — zobrazí se jako tlačítko na Kontaktu. */
  bookingUrl: string | null;
} = {
  email: "info@peakflow.cz",
  phone: "+420 732 854 316",
  // Rezervační stránka z Google Kalendáře (Plán schůzek). Až bude, doplnit sem,
  // nebo nastavit NEXT_PUBLIC_BOOKING_URL a nasadit. Na /kontakt/ se pak
  // rezervace ukáže jako hlavní cesta a formulář jako záloha.
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || null,
};

/**
 * Hlavní výzva webu. Jeden text v první osobě, opakovaný na stránce víckrát
 * (vzor inizio.cz, 2026-11-22). Hlavička má kvůli místu kratší „Domluvit 30 minut“.
 */
export const MAIN_CTA = "Chci vědět, co jde zautomatizovat";

/**
 * Lákadlo za e-mail pro ty, kdo ještě nechtějí volat: katalog v PDF.
 * Zdroj textu je ve vaultu: 03 Projects/03-07 - Peakflow Blog/Lákadla/.
 * Formulář (components/LeadMagnetForm.tsx) pošle e-mail přes Web3Forms
 * na info@peakflow.cz a hned nabídne PDF ke stažení.
 */
export const magnet = {
  title: "15 automatizací, které firmě vrátí nejvíc času",
  subtitle:
    "Katalog pro firmy s obchodním týmem, zakázkami a back-office. Co každá automatizace dělá, kdy se vyplatí a co k ní potřebujete.",
  pdf: "/ke-stazeni/peakflow-katalog-automatizaci.pdf",
} as const;

/**
 * Kontaktní formulář jede přes Web3Forms (https://web3forms.com).
 *
 * `access_key` je *publishable* klíč: je navázaný na jednu e-mailovou adresu
 * (info@peakflow.cz) a umí jen jedno — poslat na ni zprávu. Web3Forms s tím
 * počítá, klíč je vidět ve zdrojovém kódu každé nasazené stránky, takže ho
 * nemá smysl tajit v repozitáři.
 *
 * Jde přebít proměnnou `NEXT_PUBLIC_WEB3FORMS_KEY` (Workers & Pages →
 * peakflow-web → Settings → Variables and Secrets), aby šel klíč vyměnit bez
 * zásahu do kódu. Protože je to `NEXT_PUBLIC_*` proměnná, zapeče se do buildu
 * — po změně je vždy potřeba nový deploy, restart nestačí.
 *
 * Kdyby na klíč někdo poslal spam, zneplatněte ho na web3forms.com, vygenerujte
 * nový a přepište ho tady (nebo v proměnné).
 */
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const web3formsKey =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "0704ad42-9561-46ee-b379-c581b45ed4e6";

/**
 * Google Tag Manager — ID kontejneru.
 *
 * Jde přebít proměnnou `NEXT_PUBLIC_GTM_ID` (Workers & Pages → peakflow-web →
 * Settings → Variables and Secrets). Prázdná hodnota měření úplně vypne.
 * Protože je to `NEXT_PUBLIC_*` proměnná, zapeče se do buildu — po změně je
 * vždy potřeba nový deploy.
 *
 * V `npm run dev` se GTM záměrně nenačítá, ať lokální klikání nešpiní data.
 * Preview/debug režim GTM se dělá na nasazeném webu.
 */
const gtmIdFromEnv = process.env.NEXT_PUBLIC_GTM_ID;

export const gtmId =
  process.env.NODE_ENV === "production"
    ? (gtmIdFromEnv === undefined ? "GTM-T4RFMPPX" : gtmIdFromEnv).trim()
    : "";

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Služby",
  description:
    "ERP na míru, automatizace obchodu a back-office nad Raynetem, AI asistenti a boti a datový reporting. Napojíme se na to, co máte, a předáváme až po kontrole.",
};

type Card = [title: string, body: string];

type Service = {
  id: string;
  track: string;
  title: string;
  body: string;
  audience: string;
  cards: Card[];
  flow?: Card[];
  white?: boolean;
};

/* Texty služeb. Pravidlo: jen to, co umíme doložit projektem nebo stackem. */
const SERVICES: Service[] = [
  {
    id: "erp",
    track: "sluzba-erp",
    title: "ERP a systémy na míru",
    body: "Jeden systém pro obchod, sklad, výrobu, montáže a fakturaci. Stavíme ho podle toho, jak vaše firma opravdu funguje, a po etapách. První část tak používáte dřív, než je hotový celý.",
    audience:
      "provozní a výrobní firmy, kterým krabicové ERP nesedí a které jedou na tabulkách, telefonu a papíře.",
    cards: [
      ["Zakázka od poptávky po fakturu", "Obchod, plánování, realizace a vyúčtování v jednom toku, bez přepisování."],
      ["Montáže a technici v terénu", "Plán, podklady a protokoly v mobilu. Zákazník dostane oznámení sám."],
      ["Napojení na to, co máte", "Raynet, účetnictví, e‑shop i starší systémy bez API."],
      ["Bez licencí za uživatele", "Provoz v cloudu za jednotky dolarů měsíčně. Kód a data patří vám."],
    ],
  },
  {
    id: "automatizace",
    track: "sluzba-automatizace",
    title: "Automatizace obchodu a back‑office",
    body: "AI převezme rutinu konkrétní pozice. Zapíše komunikaci do CRM, připomene další krok, zpracuje objednávku nebo fakturu. Člověk jen schvaluje výjimky.",
    audience:
      "obchodní týmy v Raynetu nebo jiném CRM a back‑office, které tráví hodiny přepisováním.",
    white: true,
    flow: [
      ["1 · Obchodník komunikuje", "e‑mail, telefon, schůzka"],
      ["2 · AI rozpozná údaje", "případ, kontakt, fáze, hodnota"],
      ["3 · Systém je zapíše", "do Raynetu, ke správnému případu"],
      ["4 · Obchodník potvrdí", "jedním klikem, výjimky řeší on"],
    ],
    cards: [
      ["Asistent obchodníka", "Připraví podklady před schůzkou, shrne hovor a navrhne další krok."],
      ["Doplnění dat do CRM", "Údaje o firmách a kontaktech se doplní samy z veřejných zdrojů."],
      ["Faktury a objednávky", "Vytěžení z PDF a e‑mailů, spárování s objednávkou, kontrola rozdílů."],
      ["Raynet bez dražšího tarifu", "Co Raynet nabízí až ve vyšším tarifu, často doplníme automatizací."],
    ],
  },
  {
    id: "asistenti",
    track: "sluzba-asistenti",
    title: "AI asistenti a boti",
    body: "Chatbot na webu, který odpoví zákazníkovi a rovnou založí poptávku do CRM. Interní asistent, který zná vaše dokumenty, ceníky a postupy a odpovídá týmu. Zlepšuje se s každou opravou: co člověk opraví, asistent si zapamatuje, jakmile to někdo schválí.",
    audience:
      "firmy, kde se stejné otázky opakují: zákazníci na webu, noví kolegové, obchodníci v terénu.",
    cards: [
      ["Chatbot na web", "Odpovídá z vašich podkladů a poptávku předá do CRM."],
      ["Firemní mozek", "Interní asistent nad dokumenty a postupy. Ve vlastní firmě PackLabs ho používáme denně."],
      ["Produktový poradce", "Provede zákazníka výběrem a doporučí kombinaci produktů."],
      ["Učí se pod dohledem", "Nové znalosti navrhuje sám, do paměti je pustí až člověk."],
    ],
  },
  {
    id: "data",
    track: "sluzba-data",
    title: "Data a reporting",
    body: "Spojíme data z ERP, e‑shopu, CRM a účetnictví na jedno místo, vyčistíme je a postavíme přehledy, kterým vedení věří. Každé ráno aktuální, bez ruční práce.",
    audience:
      "firmy, které skládají reporty ručně v Excelu nebo mají data v několika systémech, které spolu nemluví.",
    white: true,
    cards: [
      ["Napojení na zdroje", "Databáze, ERP, e‑shopy a CRM, i starší systémy bez moderního API."],
      ["Čištění a sjednocení", "Duplicity, chybějící údaje a různé formáty srovnáme, aby číslům šlo věřit."],
      ["Datový sklad", "Google BigQuery: škálovatelně a s kontrolou nad náklady."],
      ["Přehledy pro vedení", "Looker Studio: marže, obchod a provoz v jednom pohledu."],
    ],
  },
];

const STACK: Card[] = [
  ["AI modely", "Claude, GPT a Gemini podle úlohy, kdykoli vyměnitelné"],
  ["CRM a ERP", "Raynet, vlastní ERP, napojení na účetnictví a e‑shopy"],
  ["Data", "Python, SQL, Google BigQuery, Looker Studio"],
  ["Automatizace", "Make, n8n, Google Apps Script, Cloudflare Workers"],
  ["Aplikace a hosting", "Cloudflare, Supabase, Vercel"],
];

export default function SluzbyPage() {
  return (
    <>
      <SiteHeader active="sluzby" />

      <main>
        <section className={styles.hero} data-track-location="hero">
          <div className={styles.heroInner}>
            <div>
              <h1 className={styles.h1}>Co pro firmy stavíme</h1>
              <p className={styles.heroLead}>
                Čtyři služby, které se v praxi kombinují. Vždycky se napojíme na to, co už
                máte, a začneme tím, co vám vrátí nejvíc času.
              </p>
            </div>
            <nav className={styles.jump} aria-label="Přehled služeb">
              {SERVICES.map((s) => (
                <a key={s.id} href={`#${s.id}`} className={styles.jumpLink}>
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {SERVICES.map((s) => {
          const content = (
            <div className={styles.pillar}>
              <div>
                <h2 className={styles.pillarTitle}>{s.title}</h2>
                <p className={styles.pillarBody}>{s.body}</p>
                <p className={styles.audience}>
                  <strong>Pro koho:</strong> {s.audience}
                </p>
              </div>
              <div>
                {s.flow && (
                  <div className={styles.flowPanel}>
                    <p className={styles.flowLabel}>Jak to funguje</p>
                    <div className={styles.flowGrid}>
                      {s.flow.map(([title, body], i) => (
                        <div
                          key={title}
                          className={`${styles.flowStep} ${
                            i === s.flow!.length - 1 ? styles.flowStepFinal : ""
                          }`}
                        >
                          <strong>{title}</strong>
                          <span>{body}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className={`${styles.cards} ${s.flow ? styles.cardsAfterFlow : ""}`}>
                  {s.cards.map(([title, body]) => (
                    <div
                      key={title}
                      className={`${styles.card} ${s.white ? styles.cardOutlined : ""}`}
                    >
                      <strong>{title}</strong>
                      <span>{body}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
          return (
            <section
              key={s.id}
              id={s.id}
              className={s.white ? "surfaceWhite" : undefined}
              data-track-item={s.track}
            >
              {content}
            </section>
          );
        })}

        <section className="wrap wrapTight">
          <div className={styles.stackHead}>
            <h2 className={styles.stackTitle}>Nástroje vybíráme podle úlohy</h2>
          </div>
          <div className={styles.stack}>
            {STACK.map(([label, body]) => (
              <div key={label} className={styles.stackCard}>
                <span>{label}</span>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap wrapTight" style={{ paddingBottom: 112 }} data-track-location="final_cta">
          <div className="ctaBand">
            <div>
              <h2 className="ctaTitle">Nevíte, čím začít?</h2>
              <p className="ctaBody">
                Ukažte nám jeden proces. Za 30 minut řekneme, jestli se vyplatí ho
                automatizovat a kterou službou začít.
              </p>
            </div>
            <div className="ctaActions">
              <Link href="/kontakt/" className="btn btnDark">
                Domluvit 30 minut
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

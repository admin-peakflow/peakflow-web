import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { AutoScrollShots } from "@/components/AutoScrollShots";
import { ScrollReveal } from "@/components/ScrollReveal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Weby na míru",
  description:
    "Weby, které najde Google i ChatGPT a poptávky z nich jdou rovnou do CRM. Šest case studies: výrobci strojů a kompozitů, e-shopy, B2B služby i fotografka.",
  alternates: { canonical: "/weby/" },
};

type Project = {
  id: string;
  name: string;
  field: string;
  domains: string[];
  /** První věta se tiskne plnou barvou, zbytek šedě (dvoutónový odstavec). */
  lead: string;
  body: string;
  facts: [string, string][];
  shot: { src: string; width: number; height: number };
};

/*
 * Screenshoty jsou celé stránky (1440 px viewport, zmenšené na 960 px šířky,
 * oříznuté na max. 4800 px výšky). V rámečku je vidět horní část a po najetí
 * myší se stránka projede až dolů. Pořízené 2026-11-17 skriptem
 * vault/06 Knowledge/Web reference/(C) web-study.js (shots-weby.js).
 * Dreamy má v hlavičce Black Friday banner — po 30. 11. přefotit.
 */
const PROJECTS: Project[] = [
  {
    id: "dreamy",
    name: "Dreamy",
    field: "E-shop s matracemi a postelemi",
    domains: ["dreamy.cz"],
    lead: "E-shop se spánkem a nábytkem, který jsme kompletně předělali na Shoptetu.",
    body: "Nové menu a kategorie s filtry podle toho, co zákazník řeší, produktový detail, košík, prodejny, značky i Poradna. K tomu poradce výběru matrace a příprava na AI vyhledávání.",
    facts: [
      ["Pro koho", "Koncoví zákazníci"],
      ["Hlavní akce", "Nákup nebo návštěva prodejny"],
      ["Jazyky", "Čeština"],
    ],
    shot: { src: "/weby/dreamy-full.webp", width: 960, height: 3200 },
  },
  {
    id: "tereza-nosskova",
    name: "Tereza Nossková",
    field: "Svatební a portrétní fotografka",
    domains: ["terezasdiary.cz"],
    lead: "U fotografky mluví fotky, web jim má jen uhnout z cesty.",
    body: "Fotka přes celou obrazovku, jemné serifové písmo a portfolio rozdělené na svatby, portréty, páry a módu. Na konci krátký formulář pro poptávku focení.",
    facts: [
      ["Pro koho", "Snoubenci, modelky, značky"],
      ["Hlavní akce", "Poptat focení"],
      ["Jazyky", "Čeština"],
    ],
    shot: { src: "/weby/tereza-full.webp", width: 960, height: 3200 },
  },
  {
    id: "packlabs",
    name: "PackLabs",
    field: "Balení, kompletace a automatizace",
    domains: ["packlabs.cz"],
    lead: "Jedna firma, dvě služby: fyzická práce kolem produktu a ruční agenda kolem systémů.",
    body: "Web rozděluje návštěvníky hned v první obrazovce. Kdo potřebuje zabalit a dovézt zboží do řetězců, jde jinam než ten, kdo chce propojit účetnictví, sklad a e-shop.",
    facts: [
      ["Pro koho", "Výrobci a e-shopy"],
      ["Hlavní akce", "Konzultace zdarma"],
      ["Jazyky", "Čeština, angličtina"],
    ],
    shot: { src: "/weby/packlabs-full.webp", width: 960, height: 3200 },
  },
  {
    id: "fs-composites",
    name: "FS Composites",
    field: "Sklolaminátové profily a rošty",
    domains: ["fscomposites.com"],
    lead: "Pultrudované GFRP profily, rošty a kabelové žlaby pro stavby a průmysl.",
    body: "Zákazník přichází s konkrétním problémem, ne s názvem produktu. Proto web začíná odvětvími, ukazuje normy, které materiál splňuje, a hlavní tlačítko vede rovnou k inženýrovi.",
    facts: [
      ["Pro koho", "Projektanti, stavby, průmysl"],
      ["Hlavní akce", "Spojit se s inženýrem"],
      ["Jazyky", "CZ, EN, DE, FR, ES"],
    ],
    shot: { src: "/weby/fscomposites-full.webp", width: 960, height: 1947 },
  },
  {
    id: "foller",
    name: "Foller",
    field: "Výroba pultruzních strojů",
    domains: ["foller.eu"],
    lead: "Brněnský výrobce, který od roku 1998 dodává pultruzní stroje a průmyslové míchačky do celého světa.",
    body: "Web musí obstát před technologem i nákupčím v zahraničí. Tmavý technický vzhled, stroje na čistém pozadí a obsah členěný podle produktových řad a odvětví, kam Foller dodává.",
    facts: [
      ["Pro koho", "Výrobci kompozitů, B2B export"],
      ["Hlavní akce", "Domluvit konzultaci"],
      ["Jazyky", "CZ, EN, DE, FR, ES"],
    ],
    shot: { src: "/weby/foller-full.webp", width: 960, height: 3200 },
  },
  {
    id: "grig",
    name: "Grig",
    field: "E-shop s jedlým hmyzem",
    domains: ["grig.cz", "grig.sk"],
    lead: "Parta z Brna, která od roku 2015 učí lidi jíst hmyz.",
    body: "Produkt, který lidi spíš odrazuje, potřebuje odvážný tón. Velké nadpisy, výrazná zelená a výběr podle příchuti. Česká a slovenská verze běží jako dva samostatné e-shopy.",
    facts: [
      ["Pro koho", "Koncoví zákazníci CZ a SK"],
      ["Hlavní akce", "Vybrat příchuť"],
      ["Jazyky", "Čeština, slovenština"],
    ],
    shot: { src: "/weby/grig-sk-full.webp", width: 960, height: 3200 },
  },
];

const PRINCIPLES = [
  [
    "Design z oboru klienta",
    "Stroje vypadají jinak než matrace a jinak než svatební fotky. Začínáme tím, co firma vyrábí a kdo od ní kupuje, ne šablonou.",
  ],
  [
    "Jeden hlavní úkol stránky",
    "Konzultace, poptávka, nákup. Každý web má jedno tlačítko, ke kterému všechno vede.",
  ],
  [
    "Rychlost a SEO od začátku",
    "Optimalizované obrázky, čisté HTML a provoz na Cloudflare tam, kde nejde o e-shop.",
  ],
  [
    "Napojení na vaše systémy",
    "Formulář může rovnou založit lead v CRM, poslat data do tabulky nebo spustit automatizaci. To je náš hlavní obor.",
  ],
];

export default function WebyPage() {
  return (
    <>
      <SiteHeader active="weby" />

      <section className={styles.hero} data-track-location="hero">
        <div className={styles.heroInner}>
          <div>
            <h1 className={styles.h1}>Weby, které najde Google i ChatGPT.</h1>
            <p className={styles.heroLead}>
              A poptávky z nich jdou rovnou do e-mailu nebo CRM. Šest webů, které
              jsme postavili, od výrobce strojů po svatební fotografku. U každého je
              case study: co jsme udělali a jaká čísla to přineslo.
            </p>
          </div>
          <nav className={styles.jump} aria-label="Přehled webů">
            {PROJECTS.map((p) => (
              <a key={p.id} href={`#${p.id}`} className={styles.jumpLink}>
                <strong>{p.name}</strong>
                <span>{p.field}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <main>
        {PROJECTS.map((p, i) => (
          <section
            key={p.id}
            id={p.id}
            className={`${styles.project} ${i % 2 === 1 ? styles.projectAlt : ""}`}
            aria-labelledby={`${p.id}-title`}
          >
            <div className={styles.projectInner}>
              <a
                href={`https://${p.domains[0]}/`}
                className={styles.browser}
                data-autoscroll
                target="_blank"
                rel="noopener"
                aria-label={`Otevřít web ${p.domains[0]} v novém okně`}
              >
                <span className={styles.browserBar} aria-hidden="true">
                  <span className={styles.dots}>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.url}>{p.domains[0]}</span>
                </span>
                <span className={styles.viewport}>
                  <img
                    src={p.shot.src}
                    width={p.shot.width}
                    height={p.shot.height}
                    alt={`Úvodní stránka webu ${p.domains[0]}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={styles.shot}
                  />
                </span>
              </a>

              <div className={styles.copy} data-reveal>
                <p className={styles.field}>{p.field}</p>
                <h2 id={`${p.id}-title`} className={styles.name}>
                  {p.name}
                </h2>
                <p className={styles.text}>
                  <span className={styles.textStrong}>{p.lead}</span> {p.body}
                </p>
                <dl className={styles.facts}>
                  {p.facts.map(([k, v]) => (
                    <div key={k} className={styles.fact}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className={styles.links}>
                  <Link href={`/weby/${p.id}/`} className={styles.caseLink} data-track-select={`reference-${p.id}`}>
                    Celá case study <span aria-hidden="true">→</span>
                  </Link>
                  {p.domains.map((d) => (
                    <a
                      key={d}
                      href={`https://${d}/`}
                      target="_blank"
                      rel="noopener"
                      className={styles.visit}
                    >
                      {d} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </p>
              </div>
            </div>
          </section>
        ))}

        <section className={styles.principles} aria-labelledby="principy">
          <div className={styles.principlesInner} data-reveal>
            <h2 id="principy" className={styles.principlesTitle}>
              Co platí pro každý web, který stavíme
            </h2>
            <ul className={styles.principleList}>
              {PRINCIPLES.map(([title, body]) => (
                <li key={title} className={styles.principle}>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="poptavka" className={styles.inquiry} aria-labelledby="poptavka-title">
          <div className={styles.inquiryInner} data-reveal>
            <div>
              <h2 id="poptavka-title" className={styles.inquiryTitle}>
                Poptejte web
              </h2>
              <p className={styles.inquiryLead}>
                Napište, co děláte a co má web umět. Ozveme se do 2 pracovních dnů
                a domluvíme krátký hovor. Pak dostanete návrh a cenu.
              </p>
              <ul className={styles.inquiryPoints}>
                <li>Design podle vašeho oboru, ne šablona</li>
                <li>SEO, Search Console a příprava na AI vyhledávání</li>
                <li>Poptávky rovnou do e-mailu nebo CRM</li>
              </ul>
            </div>
            <ContactForm
              source="weby"
              topics={[
                "Nový web",
                "Redesign stávajícího webu",
                "SEO a AI vyhledávání",
                "Napojení webu na CRM nebo automatizace",
                "Nevím, poradíte",
              ]}
              messageLabel="Co děláte a co má web umět"
              messagePlaceholder="Obor, pro koho web je, odkaz na současný web, termín…"
            />
          </div>
        </section>
      </main>

      <SiteFooter />
      <AutoScrollShots />
      <ScrollReveal />
    </>
  );
}

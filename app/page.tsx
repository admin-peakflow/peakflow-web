import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RoiCalculator } from "@/components/home/RoiCalculator";
import { Bento } from "@/components/home/Bento";
import { Apps } from "@/components/home/Apps";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { PlayOnView } from "@/components/PlayOnView";
import { AutoScrollShots } from "@/components/AutoScrollShots";
import { CASES } from "@/lib/cases";
import { RUNNING } from "@/lib/running";
import { contact } from "@/lib/site";
import styles from "./page.module.css";

/*
 * Všechny texty homepage jsou v konstantách tady nahoře. Kdo chce upravit
 * text, nemusí do JSX níž. Služby (dlaždice s ukázkami) jsou
 * v components/home/Bento.tsx, „Co právě běží“ v lib/running.ts.
 *
 * Pravidlo pro reference: na web jen to, co běží a je doložené. Žádné citace,
 * hvězdičky ani čísla bez podkladu. Jména klientů až s jejich souhlasem.
 * Ukázky produktu jsou na fiktivních datech a jsou tak označené.
 */

/** Ukázka v hero: jedno dopoledne ve firmě, fiktivní data, viditelně označená. */
const MORNING = [
  { time: "06:00", area: "Data", text: "Ranní přehled zakázek a tržeb odešel vedení" },
  { time: "06:40", area: "ERP", text: "Montáže na příští týden rozplánované, technici mají podklady v mobilu" },
  { time: "07:15", area: "Raynet", text: "14 e‑mailů a 3 hovory zapsané k obchodním případům" },
  { time: "08:02", area: "Web", text: "Dotaz na cenu zodpovězený, poptávka založená v CRM" },
  { time: "08:30", area: "Faktury", text: "9 přijatých faktur vytěžených a spárovaných s objednávkami" },
];

const PAINS = [
  {
    role: "Majitel",
    text: "Čísla vidí až na konci měsíce. Někdo je musí ručně poskládat z Excelu a stejně jim úplně nevěří.",
    tools: ["Excel", "e‑mail", "účetní"],
  },
  {
    role: "Obchodník",
    text: "Půl dne přepisuje e‑maily a hovory do CRM a hlídá, komu má zavolat. Na prodej zbývá zbytek.",
    tools: ["Outlook", "CRM", "telefon"],
  },
  {
    role: "Provoz a back‑office",
    text: "Objednávky, montáže a faktury běží přes tabulky, telefon a papír. Každá chyba se hledá ručně.",
    tools: ["tabulky", "telefon", "papír"],
  },
];

const STEPS = [
  {
    title: "Mapa příležitostí",
    time: "1–2 týdny",
    body: "Projdeme procesy, spočítáme hodiny a vybereme, co se vyplatí zautomatizovat jako první.",
  },
  {
    title: "První kolo",
    time: "2–6 týdnů",
    body: "Postavíme 2–3 věci s největším přínosem. Předem sepíšeme, co přesně musí fungovat.",
  },
  {
    title: "Provoz a další kola",
    time: "průběžně",
    body: "Hlídáme, opravujeme a přidáváme další automatizace podle toho, co se osvědčilo.",
  },
];

/**
 * Veřejné ceny jsou skryté (Tomáš, 2026-11-20). Zpátky je zapne `true`.
 * Sekce #cena pak ukáže ceník nad kalkulačkou úspor.
 */
const SHOW_PRICES = false;

const PRICES = [
  {
    name: "Úvodní hovor",
    price: "Zdarma",
    note: "30 minut",
    body: "Projdeme jeden proces a řekneme vám, jestli se vyplatí ho automatizovat.",
  },
  {
    name: "Mapa příležitostí",
    price: "25 000 Kč",
    note: "odečte se z realizace",
    body: "Seznam automatizací s cenou a návratností. Víte, co dává smysl, ještě než cokoli objednáte.",
  },
  {
    name: "První kolo automatizací",
    price: "od 90 000 Kč",
    note: "2–3 automatizace",
    body: "Věci s největším přínosem, postavené, otestované a předané do provozu.",
  },
  {
    name: "ERP / systém na míru",
    price: "od 600 000 Kč",
    note: "po etapách",
    body: "Systém podle toho, jak firma funguje. Každá etapa má vlastní cenu a termín.",
  },
];

const TEAM = [
  {
    name: "Tomáš Andrlík",
    role: "Obchod, procesy a buildy",
    body: "Zjistí, kde ve firmě utíká čas, a postaví systém, který ho vrátí.",
    photo: "/podpis/tomas-andrlik-panel.jpg",
    initials: "TA",
  },
  {
    name: "Jirka Brtník",
    role: "Data a reporting",
    body: "Datový analytik. Python, SQL, BigQuery a Looker dělá na denní bázi.",
    photo: null,
    initials: "JB",
  },
];

const FAQS = [
  {
    q: "Kde budou naše data a kdo k nim má přístup?",
    a: "Systémy stavíme tak, aby běžely v účtech, které patří vám (Cloudflare, Google, váš server). Přístupy, data i kód zůstávají vaše. AI modelům posíláme jen to, co daná úloha potřebuje.",
  },
  {
    q: "Nahradí to naše lidi?",
    a: "Ne. Převezme rutinu pozice, ne pozici. Lidé schvalují výjimky a dělají práci, kterou za ně systém neudělá: obchod, vztahy s klienty a rozhodování.",
  },
  {
    q: "Co když se AI modely změní nebo zdraží?",
    a: "Nejsme vázaní na jednoho dodavatele. Používáme modely od Anthropicu, OpenAI i Googlu a vybíráme podle úlohy. Když se něco změní, model vyměníme.",
  },
  {
    q: "Jak dlouho to trvá?",
    a: "Mapa příležitostí 1–2 týdny, první kolo automatizací 2–6 týdnů. ERP stavíme po etapách a termín každé etapy dostanete v nabídce.",
  },
];

/** Weby, které jsme postavili: skutečné screenshoty a čísla z case studies (lib/cases.ts). */
const SHOWCASE = [
  { slug: "fs-composites", number: 0 },
  { slug: "dreamy", number: 0 },
  { slug: "grig", number: 1 }, // screenshot je grig.sk, tak i číslo za grig.sk
].flatMap(({ slug, number }) => {
  const c = CASES.find((x) => x.slug === slug);
  if (!c) return [];
  const domain = c.domains.find((d) => c.shot.src.includes(`-${d.split(".").pop()}-`)) ?? c.domains[0];
  return [{ ...c, domain, stat: c.numbers[number] ?? c.numbers[0] }];
});

/** Rozpracované systémy (bez webů, ty jsou ve SHOWCASE). */
const SYSTEMS = RUNNING.filter((r) => !r.href);

export default function HomePage() {
  return (
    <>
      <SiteHeader active="home" />

      <main>
        {/* ===== HERO ===== */}
        <section className={styles.hero} data-track-location="hero">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <h1 className={styles.h1}>Administrativa, která se dělá sama.</h1>
              <p className={styles.heroLead}>
                <span className={styles.leadStrong}>Jsme AI‑first tým.</span> Stavíme ERP
                na míru a AI asistenty, kteří ve firmě opravdu pracují, zavádíme Raynet
                CRM a automatizujeme obchod. Napojíme se na to, co už máte, a nepředáme nic, co
                neprošlo kontrolou.
              </p>
              <div className={styles.heroActions}>
                <Link href="/kontakt/" className="btn btnAccent">
                  Domluvit 30 minut
                </Link>
                <Link href="/#sluzby" className="btn btnOnDark">
                  Co stavíme
                </Link>
              </div>
              <ul className={styles.heroChecks}>
                <li>Napojíme se na to, co máte</li>
                <li>Předáváme až po kontrole</li>
                <li>Kód a data patří vám</li>
              </ul>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.chip} aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/raynet.svg" alt="" width={64} height={18} />
                <span>17 záznamů zapsáno</span>
              </div>

              <figure className={styles.morning} aria-label="Ukázka: co systém udělá za jedno dopoledne">
                <figcaption className={styles.morningHead}>
                  <span>Dnes ráno ve firmě</span>
                  <span className={styles.sample}>Ukázka · fiktivní data</span>
                </figcaption>
                <ol className={styles.morningList}>
                  {MORNING.map((row, i) => (
                    <li key={row.time} className={styles.morningRow} style={{ animationDelay: `${0.35 + i * 0.22}s` }}>
                      <span className={styles.morningTime}>{row.time}</span>
                      <span className={styles.morningArea}>{row.area}</span>
                      <span className={styles.morningText}>{row.text}</span>
                      <span className={styles.morningDone} aria-label="hotovo">✓</span>
                    </li>
                  ))}
                </ol>
                <div className={styles.morningFoot} style={{ animationDelay: `${0.35 + MORNING.length * 0.22}s` }}>
                  <span>
                    <strong>Čeká na vás:</strong> 2 výjimky ke schválení
                  </span>
                  <span className={styles.approve} aria-hidden="true">
                    Schválit
                  </span>
                </div>
              </figure>

              <div className={styles.bubble} aria-hidden="true">
                <span className={styles.bubbleWho}>Asistent</span>
                Montáž v Žabovřeskách je potvrzená na čtvrtek 8:00. Obyvatelé dostali
                oznámení.
              </div>
            </div>
          </div>
        </section>

        <LogoMarquee />

        {/* ===== KDE TO DRHNE ===== */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Kde firmám utíká čas</h2>
            <div className={styles.pains}>
              {PAINS.map((pain) => (
                <div key={pain.role} className={styles.pain}>
                  <span className={styles.painRole}>{pain.role}</span>
                  <p>{pain.text}</p>
                  <ul className={styles.painTools} aria-label="Dnes to řeší přes">
                    {pain.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SLUŽBY (bento s ukázkami) ===== */}
        <section id="sluzby" className={`${styles.section} ${styles.sectionTint}`}>
          <div className={styles.inner}>
            <div className={styles.head}>
              <h2 className={styles.h2}>Co stavíme</h2>
              <p className={styles.lead}>
                <span className={styles.leadStrong}>Čtyři věci, které se v praxi kombinují.</span>{" "}
                Začínáme tou, která vám vrátí nejvíc času.
              </p>
            </div>
            <Bento />
          </div>
        </section>

        {/* ===== APLIKACE V PROVOZU ===== */}
        <section id="aplikace" className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.inner}>
            <div className={styles.head}>
              <h2 className={`${styles.h2} ${styles.h2Light}`}>Aplikace, které už běží v provozu</h2>
              <p className={`${styles.lead} ${styles.leadLight}`}>
                <span className={styles.leadStrong}>Žádné prototypy.</span> Systémy, které
                denně používají lidé ve skladu, v obchodě a v logistice.
              </p>
            </div>
            <Apps />
          </div>
        </section>

        {/* ===== WEBY A ROZPRACOVANÉ SYSTÉMY ===== */}
        <section id="reference" className={`${styles.section} ${styles.sectionWhite}`}>
          <div className={styles.inner}>
            <div className={styles.head}>
              <h2 className={styles.h2}>Weby, které jsme postavili</h2>
              <p className={styles.lead}>
                <span className={styles.leadStrong}>Žádné vymyšlené reference.</span> Weby
                běží naostro a čísla jsou z jejich case studies. Jména klientů u
                rozpracovaných systémů uvádíme až s jejich souhlasem.
              </p>
            </div>

            <div className={styles.showcase}>
              {SHOWCASE.map((c) => (
                <article key={c.slug} className={styles.shotCard}>
                  <a
                    href={`https://${c.domain}/`}
                    className={styles.browser}
                    data-autoscroll
                    target="_blank"
                    rel="noopener"
                    aria-label={`Otevřít web ${c.domain} v novém okně`}
                  >
                    <span className={styles.browserBar} aria-hidden="true">
                      <span className={styles.dots}>
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className={styles.url}>{c.domain}</span>
                    </span>
                    <span className={styles.viewport}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.shot.src}
                        width={c.shot.width}
                        height={c.shot.height}
                        alt={`Úvodní stránka webu ${c.domain}`}
                        loading="lazy"
                        decoding="async"
                        className={styles.shot}
                      />
                    </span>
                  </a>
                  <div className={styles.shotMeta}>
                    <strong className={styles.shotNumber}>{c.stat.value}</strong>
                    <span className={styles.shotLabel}>{c.stat.label}</span>
                    <Link
                      href={`/weby/${c.slug}/`}
                      className={styles.shotLink}
                      data-track-select={`reference-${c.slug}`}
                    >
                      {c.name}: celá case study
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <h3 className={styles.subhead}>Systémy, které právě stavíme</h3>
            <ul className={styles.running}>
              {SYSTEMS.map((item) => (
                <li key={item.title} className={styles.runningRow}>
                  <div>
                    <h4 className={styles.runningTitle}>{item.title}</h4>
                    <p className={styles.runningBody}>{item.body}</p>
                  </div>
                  <span className={`${styles.status} ${styles[`status_${item.tone}`]}`}>
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
            <p className={styles.more}>
              <Link href="/reference/">Všechny reference</Link>
              <Link href="/weby/">Všech 6 webů</Link>
            </p>
          </div>
        </section>

        {/* ===== POSTUP ===== */}
        <section id="postup" className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Jak pracujeme</h2>
            <ol className={styles.steps}>
              {STEPS.map((step, i) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <span className={styles.stepTime}>{step.time}</span>
                  <p className={styles.stepBody}>{step.body}</p>
                </li>
              ))}
            </ol>
            <div className={styles.proof} data-play>
              <div>
                <h3 className={styles.proofTitle}>Hotovo znamená důkaz, ne slib.</h3>
                <p className={styles.proofBody}>
                  Než cokoli předáme, projde to automatickou kontrolou. Co přesně má
                  fungovat, sepíšeme s vámi předem. Když kontrola neprojde, nepředáváme.
                </p>
              </div>
              <div className={styles.terminal} role="img" aria-label="Ukázka výstupu kontroly: všechny kroky ok, GATE: PASS">
                <div className={styles.terminalBar} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <pre className={styles.gate} aria-hidden="true">
                  <span className={`${styles.gl} ${styles.gateDim}`}>$ npm run gate</span>
                  <span className={styles.gl}>ok   typy</span>
                  <span className={styles.gl}>ok   testy</span>
                  <span className={styles.gl}>ok   build</span>
                  <span className={styles.gl}>ok   odkazy a stránky</span>
                  <span className={`${styles.gl} ${styles.gatePass}`}>GATE: PASS</span>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CENY ===== */}
        <section id="cena" className={`${styles.section} ${styles.sectionWhite}`}>
          <div className={styles.inner}>
            {SHOW_PRICES ? (
              <>
                <div className={styles.head}>
                  <h2 className={styles.h2}>Kolik to stojí</h2>
                  <p className={styles.lead}>
                    <span className={styles.leadStrong}>Ceny jsou bez DPH.</span> Přesnou nabídku
                    dostanete po mapě příležitostí, provoz a další rozvoj podle rozsahu.
                  </p>
                </div>
                <div className={styles.prices}>
                  {PRICES.map((p, i) => (
                    <div key={p.name} className={`${styles.price} ${i === 1 ? styles.priceStart : ""}`}>
                      {i === 1 && <span className={styles.priceBadge}>Doporučený začátek</span>}
                      <span className={styles.priceName}>{p.name}</span>
                      <strong className={styles.priceValue}>{p.price}</strong>
                      <span className={styles.priceNote}>{p.note}</span>
                      <p className={styles.priceBody}>{p.body}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.head}>
                <h2 className={styles.h2}>Vyplatí se to?</h2>
                <p className={styles.lead}>
                  <span className={styles.leadStrong}>Spočítejte si, kolik vás dnes stojí ruční práce.</span>{" "}
                  Cenu řešení vám řekneme po úvodním hovoru.
                </p>
              </div>
            )}
            <div className={SHOW_PRICES ? styles.roi : undefined}>
              <RoiCalculator />
            </div>
          </div>
        </section>

        {/* ===== TÝM + FAQ ===== */}
        <section id="faq" className={styles.section}>
          <div className={`${styles.inner} ${styles.split}`}>
            <div>
              <h2 className={styles.h2}>Kdo za tím je</h2>
              <p className={styles.lead}>
                <span className={styles.leadStrong}>Dva lidi a AI agenti.</span> Každý
                projekt stavíme s AI, proto zvládneme to, na co jinde potřebují celý tým.
              </p>
              <ul className={styles.team}>
                {TEAM.map((person) => (
                  <li key={person.name} className={styles.person}>
                    {person.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={person.photo} alt={person.name} width={80} height={80} className={styles.avatar} />
                    ) : (
                      <span className={styles.avatar} aria-hidden="true">
                        {person.initials}
                      </span>
                    )}
                    <div>
                      <strong className={styles.personName}>{person.name}</strong>
                      <span className={styles.personRole}>{person.role}</span>
                      <p className={styles.personBody}>{person.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/o-nas/" className={styles.textLink}>
                Víc o nás
              </Link>
            </div>
            <div>
              <h2 className={styles.h2}>Časté otázky</h2>
              <div className={styles.faqList}>
                {FAQS.map((item) => (
                  <details key={item.q} className={styles.faq}>
                    <summary className={styles.faqSummary}>
                      {item.q}
                      <span className={styles.faqChevron} aria-hidden="true">⌄</span>
                    </summary>
                    <p className={styles.faqBody}>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className={styles.ctaSection} data-track-location="final_cta">
          <div className={styles.inner}>
            <div className={styles.cta}>
              <div>
                <h2 className={styles.ctaTitle}>Ukažte nám jeden proces, který vás zdržuje.</h2>
                <p className={styles.ctaBody}>
                  Za 30 minut vám řekneme, jestli a jak ho zautomatizovat. Bez prezentace
                  a bez závazku.
                </p>
              </div>
              <div className={styles.ctaCard}>
                <div className={styles.ctaPerson}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/podpis/tomas-andrlik-panel.jpg" alt="Tomáš Andrlík" width={72} height={72} />
                  <div>
                    <strong>Ozve se vám Tomáš</strong>
                    <span>Obchod a návrh řešení</span>
                  </div>
                </div>
                <Link href="/kontakt/" className={`btn btnDark ${styles.ctaButton}`}>
                  Domluvit 30 minut
                </Link>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={styles.ctaPhone}>
                  nebo volejte {contact.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="full" />
      <PlayOnView />
      <AutoScrollShots />
    </>
  );
}

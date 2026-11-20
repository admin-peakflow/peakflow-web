import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RoiCalculator } from "@/components/home/RoiCalculator";
import { RUNNING } from "@/lib/running";
import styles from "./page.module.css";

/*
 * Všechny texty homepage jsou v konstantách tady nahoře. Kdo chce upravit
 * text, nemusí do JSX níž.
 *
 * Pravidlo pro reference: na web jen to, co běží a je doložené. Žádné citace,
 * hvězdičky ani čísla bez podkladu. Jména klientů až s jejich souhlasem.
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
  },
  {
    role: "Obchodník",
    text: "Půl dne přepisuje e‑maily a hovory do CRM a hlídá, komu má zavolat. Na prodej zbývá zbytek.",
  },
  {
    role: "Provoz a back‑office",
    text: "Objednávky, montáže a faktury běží přes tabulky, telefon a papír. Každá chyba se hledá ručně.",
  },
];

const SERVICES = [
  {
    id: "erp",
    track: "sluzba-erp",
    title: "ERP a systémy na míru",
    body: "Obchod, sklad, výroba, montáže a fakturace v jednom systému. Postavený podle toho, jak vaše firma opravdu funguje, ne podle krabice.",
    example: "Zakázka od poptávky po fakturu bez přepisování mezi tabulkami.",
  },
  {
    id: "automatizace",
    track: "sluzba-automatizace",
    title: "Automatizace obchodu a back‑office",
    body: "AI převezme rutinu pozice: zápisy do CRM, připomínky, zpracování objednávek a faktur. Člověk schvaluje jen výjimky.",
    example: "Komunikace s klientem se sama zapíše k případu v Raynetu.",
  },
  {
    id: "asistenti",
    track: "sluzba-asistenti",
    title: "AI asistenti a boti",
    body: "Chatbot na webu, který odpoví a rovnou založí poptávku. Interní asistent, který zná vaše dokumenty a postupy a zlepšuje se s každou opravou.",
    example: "Nový kolega se zeptá asistenta, ne tří lidí z týmu.",
  },
  {
    id: "data",
    track: "sluzba-data",
    title: "Data a reporting",
    body: "Jedno místo pravdy z ERP, e‑shopu a CRM. Přehledy, kterým vedení věří, každé ráno bez ruční práce.",
    example: "Marže po zakázkách a obchodnících v jednom pohledu.",
  },
];

/* „Co právě běží“ je v lib/running.ts (sdílí ho i /reference/). */

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
    photo: "/podpis/tomas-andrlik-v3.png",
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
                na míru, automatizace obchodu nad Raynetem a AI asistenty, kteří ve firmě
                opravdu pracují. Napojíme se na to, co už máte, a nepředáme nic, co
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
          </div>
        </section>

        {/* ===== KDE TO DRHNE ===== */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Kde firmám utíká čas</h2>
            <div className={styles.pains}>
              {PAINS.map((pain) => (
                <div key={pain.role} className={styles.pain}>
                  <span className={styles.painRole}>{pain.role}</span>
                  <p>{pain.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SLUŽBY ===== */}
        <section id="sluzby" className={`${styles.section} ${styles.sectionWhite}`}>
          <div className={styles.inner}>
            <div className={styles.head}>
              <h2 className={styles.h2}>Co stavíme</h2>
              <p className={styles.lead}>
                <span className={styles.leadStrong}>Čtyři věci, které se v praxi kombinují.</span>{" "}
                Začínáme tou, která vám vrátí nejvíc času.
              </p>
            </div>
            <div className={styles.services}>
              {SERVICES.map((s) => (
                <article key={s.id} className={styles.service} data-track-item={s.track}>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceBody}>{s.body}</p>
                  <p className={styles.serviceExample}>
                    <span>Například:</span> {s.example}
                  </p>
                  <Link href={`/sluzby/#${s.id}`} className={styles.serviceLink}>
                    Víc o službě
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CO PRÁVĚ BĚŽÍ ===== */}
        <section id="reference" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.head}>
              <h2 className={styles.h2}>Co právě běží</h2>
              <p className={styles.lead}>
                <span className={styles.leadStrong}>Žádné vymyšlené reference.</span> Tohle
                stavíme nebo provozujeme teď. Jména klientů uvádíme až s jejich souhlasem.
              </p>
            </div>
            <ul className={styles.running}>
              {RUNNING.map((item) => (
                <li key={item.title} className={styles.runningRow}>
                  <div>
                    <h3 className={styles.runningTitle}>
                      {item.href ? <Link href={item.href}>{item.title}</Link> : item.title}
                    </h3>
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
            </p>
          </div>
        </section>

        {/* ===== POSTUP ===== */}
        <section id="postup" className={`${styles.section} ${styles.sectionWhite}`}>
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
            <div className={styles.proof}>
              <div>
                <h3 className={styles.proofTitle}>Hotovo znamená důkaz, ne slib.</h3>
                <p className={styles.proofBody}>
                  Než cokoli předáme, projde to automatickou kontrolou. Co přesně má
                  fungovat, sepíšeme s vámi předem. Když kontrola neprojde, nepředáváme.
                </p>
              </div>
              <pre className={styles.gate} aria-label="Výstup kontroly">
                <span className={styles.gateDim}>$ npm run gate</span>
                {"\n"}ok   typy{"\n"}ok   testy{"\n"}ok   build{"\n"}
                <span className={styles.gatePass}>GATE: PASS</span>
              </pre>
            </div>
          </div>
        </section>

        {/* ===== CENY ===== */}
        <section id="cena" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.head}>
              <h2 className={styles.h2}>Kolik to stojí</h2>
              <p className={styles.lead}>
                <span className={styles.leadStrong}>Ceny jsou bez DPH.</span> Přesnou nabídku
                dostanete po mapě příležitostí, provoz a další rozvoj podle rozsahu.
              </p>
            </div>
            <div className={styles.prices}>
              {PRICES.map((p) => (
                <div key={p.name} className={styles.price}>
                  <span className={styles.priceName}>{p.name}</span>
                  <strong className={styles.priceValue}>{p.price}</strong>
                  <span className={styles.priceNote}>{p.note}</span>
                  <p className={styles.priceBody}>{p.body}</p>
                </div>
              ))}
            </div>
            <div className={styles.roi}>
              <RoiCalculator />
            </div>
          </div>
        </section>

        {/* ===== TÝM + FAQ ===== */}
        <section id="faq" className={`${styles.section} ${styles.sectionWhite}`}>
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
                      <img src={person.photo} alt={person.name} width={72} height={72} className={styles.avatar} />
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
              <Link href="/o-nas/" className={styles.serviceLink}>
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
        <section className={styles.section} data-track-location="final_cta">
          <div className={styles.inner}>
            <div className="ctaBand">
              <div>
                <h2 className="ctaTitle">Ukažte nám jeden proces, který vás zdržuje.</h2>
                <p className="ctaBody">
                  Za 30 minut vám řekneme, jestli a jak ho zautomatizovat. Bez prezentace
                  a bez závazku.
                </p>
              </div>
              <div className="ctaActions">
                <Link href="/kontakt/" className="btn btnDark">
                  Domluvit 30 minut
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="full" />
    </>
  );
}

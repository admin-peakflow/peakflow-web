import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";
import styles from "../subpage.module.css";

export const metadata: Metadata = {
  title: "O nás",
  description:
    "PeakFlow jsou Tomáš Andrlík a Jirka Brtník. AI-first tým, který do firem staví ERP, automatizace a AI asistenty a předává je až po kontrole.",
};

const PEOPLE = [
  {
    name: "Tomáš Andrlík",
    role: "Obchod, procesy a buildy",
    body: "Zjistí, kde ve firmě utíká čas, navrhne, co se vyplatí změnit, a postaví to. Vede PackLabs, kde řadu věcí, které prodáváme, nejdřív zkoušíme na sobě.",
    photo: "/podpis/tomas-andrlik-v3.png",
    initials: "TA",
  },
  {
    name: "Jirka Brtník",
    role: "Data a reporting",
    body: "Datový analytik. Python, SQL, BigQuery a Looker dělá na denní bázi. U nás má na starosti datovou vrstvu: napojení, čištění a přehledy pro vedení.",
    photo: null,
    initials: "JB",
  },
];

const PRINCIPLES = [
  {
    title: "AI‑first, i uvnitř",
    body: "Každý projekt stavíme s AI agenty: od analýzy přes kód po kontrolu. Proto dva lidi zvládnou to, na co jinde potřebují celý tým.",
  },
  {
    title: "Hotovo znamená důkaz",
    body: "Co má fungovat, sepíšeme s vámi předem. Každé řešení má automatickou kontrolu a dokud neprojde, nepředáváme.",
  },
  {
    title: "Řešení patří vám",
    body: "Kód, data i přístupy zůstávají u vás. Na jednom AI dodavateli vás nenecháme závislé.",
  },
];

export default function ONasPage() {
  return (
    <>
      <SiteHeader active="o-nas" />

      <main>
        <section className={styles.hero} data-track-location="hero">
          <div className={styles.heroInner}>
            <h1 className={styles.h1}>Dva lidi a AI agenti</h1>
            <p className={styles.heroLead}>
              <strong>Jsme AI‑first tým.</strong> Do firem stavíme ERP, automatizace
              a AI asistenty, kteří opravdu pracují. Neradíme do šuplíku a neškolíme,
              stavíme a provozujeme.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Kdo za tím je</h2>
            <ul className={styles.people}>
              {PEOPLE.map((p) => (
                <li key={p.name} className={styles.person}>
                  {p.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.photo} alt={p.name} width={96} height={96} className={styles.avatar} />
                  ) : (
                    <span className={styles.avatar} aria-hidden="true">
                      {p.initials}
                    </span>
                  )}
                  <div>
                    <strong className={styles.personName}>{p.name}</strong>
                    <span className={styles.personRole}>{p.role}</span>
                    <p className={styles.personBody}>{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionWhite}`}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Jak pracujeme</h2>
            <ul className={styles.principles}>
              {PRINCIPLES.map((p) => (
                <li key={p.title}>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                  <p className={styles.principleBody}>{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section} style={{ padding: "72px 0 56px" }}>
          <div className={styles.inner}>
            <p className={styles.company}>
              <strong>{site.name}</strong> provozuje {site.legalName}, {site.address}.
              <br />
              IČO {site.ico}, DIČ {site.dic}. {site.register}.
            </p>
          </div>
        </section>

        <section className="wrap wrapTight" style={{ paddingBottom: 112, paddingTop: 0 }} data-track-location="final_cta">
          <div className="ctaBand">
            <div>
              <h2 className="ctaTitle">Ukažte nám jeden proces.</h2>
              <p className="ctaBody">
                Za 30 minut řekneme, jestli a jak ho zautomatizovat. Bez prezentace a bez
                závazku.
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

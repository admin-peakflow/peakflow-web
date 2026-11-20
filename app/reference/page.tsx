import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CASES } from "@/lib/cases";
import { RUNNING } from "@/lib/running";
import { APPS } from "@/lib/apps";
import styles from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Reference",
  description:
    "Aplikace v provozu (PackLabsApp, DreamyApp), rozpracované systémy (ERP, automatizace nad Raynetem) a šest webů naostro. Bez vymyšlených referencí.",
};

export default function ReferencePage() {
  return (
    <>
      <SiteHeader active="reference" />

      <main>
        <section className={styles.hero} data-track-location="hero">
          <div className={styles.heroInner}>
            <h1 className={styles.h1}>Co právě běží</h1>
            <p className={styles.heroLead}>
              <strong>Žádné vymyšlené reference a čísla bez podkladu.</strong> Tohle
              stavíme nebo provozujeme teď. Jména klientů uvádíme až s jejich souhlasem
              a case studies s čísly přidáme, jakmile budou změřené.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Aplikace v provozu</h2>
            <ul className={styles.rows}>
              {APPS.map((app) => (
                <li key={app.id} className={styles.row}>
                  <div>
                    <h3 className={styles.rowTitle}>
                      <Link href={`/#${app.id}`}>{app.name}</Link>: {app.title.toLowerCase()}
                    </h3>
                    <p className={styles.rowBody}>
                      {app.client}. {app.points.slice(0, 2).join(". ")}.
                    </p>
                  </div>
                  <span className={`${styles.status} ${styles.status_live}`}>{app.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Rozpracované projekty</h2>
            <ul className={styles.rows}>
              {RUNNING.map((item) => (
                <li key={item.title} className={styles.row}>
                  <div>
                    <h3 className={styles.rowTitle}>
                      {item.href ? <Link href={item.href}>{item.title}</Link> : item.title}
                    </h3>
                    <p className={styles.rowBody}>{item.body}</p>
                  </div>
                  <span className={`${styles.status} ${styles[`status_${item.tone}`]}`}>
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionWhite}`} id="weby">
          <div className={styles.inner}>
            <h2 className={styles.h2}>Weby, které jsme postavili</h2>
            <p className={styles.lead}>
              Web je u nás vstupní brána do systému: poptávka z formuláře jde rovnou do
              CRM, obsah se dá měřit a rozšiřovat. Všechny běží naostro.
            </p>
            <ul className={styles.rows}>
              {CASES.map((c) => (
                <li key={c.slug} className={styles.row}>
                  <div>
                    <h3 className={styles.rowTitle}>
                      <Link href={`/weby/${c.slug}/`} data-track-select={`reference-${c.slug}`}>
                        {c.name}
                      </Link>
                    </h3>
                    <p className={styles.rowBody}>{c.headline}</p>
                  </div>
                  <span className={styles.rowMeta}>{c.field}</span>
                </li>
              ))}
            </ul>
            <p className={styles.more}>
              <Link href="/weby/">Všechny weby s ukázkami</Link>
            </p>
          </div>
        </section>

        <section className="wrap wrapTight" style={{ paddingBottom: 112 }} data-track-location="final_cta">
          <div className="ctaBand">
            <div>
              <h2 className="ctaTitle">Chcete být na tomhle seznamu?</h2>
              <p className="ctaBody">
                Ukažte nám jeden proces, který vás zdržuje. Za 30 minut řekneme, jestli
                a jak ho zautomatizovat.
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

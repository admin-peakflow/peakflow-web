import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import { contact, site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Ukažte nám jeden proces, který vás zdržuje. Za 30 minut řekneme, jestli a jak ho zautomatizovat. Bez prezentace a bez závazku.",
};

const TIMELINE = [
  ["Do 3 dnů", "Shrnutí hovoru a hrubý návrh, co dává smysl."],
  ["Do 1 týdne", "Nabídka s cenou: mapa příležitostí, nebo rovnou první kolo."],
  ["Do 2 týdnů", "Start práce."],
];

export default function KontaktPage() {
  return (
    <div className={styles.page}>
      <SiteHeader active="kontakt" />

      <section className={styles.main}>
        <div className={styles.intro}>
          <p className="eyebrow">Kontakt</p>
          <h1 className={styles.h1}>Ukažte nám jeden proces.</h1>
          <p className={styles.lead}>
            30 minut online nebo u vás. Projdeme, co vás zdržuje, a řekneme, jestli se vyplatí
            to automatizovat a čím začít. Bez prezentace a bez závazku.
          </p>

          {/* Rezervace je hlavní cesta, jakmile je odkaz v lib/site.ts. Formulář zůstává jako záloha. */}
          {contact.bookingUrl && (
            <div className={styles.bookingCard}>
              <strong className={styles.bookingTitle}>Vyberte si termín rovnou</strong>
              <span className={styles.bookingBody}>
                30 minut online. Potvrzení i odkaz na hovor vám přijdou e‑mailem.
              </span>
              <a
                href={contact.bookingUrl}
                className={`btn btnPrimary ${styles.booking}`}
                target="_blank"
                rel="noopener"
                data-contact-method="booking"
              >
                Vybrat termín v kalendáři →
              </a>
            </div>
          )}
        </div>

        <div className={styles.formCol}>
          {contact.bookingUrl && (
            <p className={styles.formAlt}>Raději napíšete? Ozveme se do 2 pracovních dnů.</p>
          )}
          <ContactForm />
        </div>

        <div className={styles.details}>
          <ol className={styles.timeline}>
            {TIMELINE.map(([title, body], i) => (
              <li key={title} className={styles.timelineItem}>
                <span
                  className={`${styles.timelineNum} ${
                    i === TIMELINE.length - 1 ? styles.timelineNumFinal : ""
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <strong className={styles.timelineTitle}>{title}</strong>
                  <span className={styles.timelineBody}>{body}</span>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.vcard}>
            <strong>{site.legalName}</strong>
            <span>{site.address}</span>
            <span>
              IČO {site.ico} · DIČ {site.dic}
            </span>
            <span>{site.register}</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
            <a href={site.url}>PeakFlow.cz</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

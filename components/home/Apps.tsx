import Link from "next/link";
import { APPS } from "@/lib/apps";
import styles from "./Apps.module.css";

/*
 * Aplikace v provozu. Obě ukazují skutečné obrazovky z ukázkové verze
 * s vymyšlenými daty: PackLabsApp z manuálu pro zaměstnance, DreamyApp
 * z lokálního dema se seed daty aplikace (2026-11-20). Nikdy ne z ostrého
 * provozu, tam jsou údaje zaměstnanců a zákazníků.
 */

const PHONES = [
  { src: "/aplikace/packlabsapp-dnes.webp", alt: "PackLabsApp: obrazovka Dnes s docházkou, školením a kontrolami" },
  { src: "/aplikace/packlabsapp-zapis.webp", alt: "PackLabsApp: souhrn zápisu práce před uložením" },
  { src: "/aplikace/packlabsapp-vykon.webp", alt: "PackLabsApp: výkon pracovníka za 30 dní vůči normě" },
];

const SCREENS = [
  { src: "/aplikace/dreamyapp-prehled.webp", alt: "DreamyApp: přehled logistiky s požadavky na dnes a zítra" },
  { src: "/aplikace/dreamyapp-plan.webp", alt: "DreamyApp: týdenní plán přeprav s kartami požadavků" },
  { src: "/aplikace/dreamyapp-crm.webp", alt: "DreamyApp: CRM, můj den obchodníka s úkoly a schůzkami" },
];

function Phones() {
  return (
    <div className={styles.phones}>
      {PHONES.map((p, i) => (
        <div key={p.src} className={`${styles.phone} ${i === 1 ? styles.phoneMid : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.alt} width={440} height={880} loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
}

function DreamyScreens() {
  return (
    <div className={styles.screens}>
      {SCREENS.map((sc, i) => (
        <div key={sc.src} className={`${styles.screen} ${styles[`screen${i}`]}`}>
          <span className={styles.screenBar} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sc.src} alt={sc.alt} width={1200} height={750} loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
}

export function Apps() {
  return (
    <div className={styles.list}>
      {APPS.map((app, i) => (
        <article key={app.id} id={app.id} className={`${styles.app} ${i % 2 ? styles.appAlt : ""}`}>
          <div className={styles.copy}>
            <div className={styles.meta}>
              <span className={styles.name}>{app.name}</span>
              <span className={styles.status}>
                <i aria-hidden="true" />
                {app.status}
              </span>
            </div>
            <h3 className={styles.title}>{app.title}</h3>
            <p className={styles.client}>{app.client}</p>
            <ul className={styles.points}>
              {app.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className={styles.stack}>{app.stack}</p>
            {app.caseLink && (
              <Link href={app.caseLink.href} className={styles.caseLink} data-track-select="reference-dreamy">
                {app.caseLink.text}
                <span>Case study →</span>
              </Link>
            )}
          </div>
          <div className={styles.visual}>
            {app.id === "packlabsapp" ? (
              <>
                <Phones />
                <p className={styles.caption}>Skutečné obrazovky z ukázkové verze s vymyšlenými daty.</p>
              </>
            ) : (
              <>
                <DreamyScreens />
                <p className={styles.caption}>Skutečné obrazovky z ukázkové verze s vymyšlenými daty.</p>
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

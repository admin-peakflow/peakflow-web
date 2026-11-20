import styles from "./LogoMarquee.module.css";

/**
 * Nástroje, se kterými stavíme. Loga jsou z Simple Icons (CC0), Raynet z jeho
 * webu. Je to výčet nástrojů, ne partnerství: text tomu musí odpovídat.
 */
const LOGOS: Array<{ file: string; name: string; wordmark?: boolean }> = [
  { file: "raynet.svg", name: "Raynet CRM", wordmark: true },
  { file: "claude.svg", name: "Claude" },
  { file: "openai.svg", name: "OpenAI" },
  { file: "googlegemini.svg", name: "Gemini" },
  { file: "googlebigquery.svg", name: "BigQuery" },
  { file: "looker.svg", name: "Looker Studio" },
  { file: "cloudflare.svg", name: "Cloudflare" },
  { file: "make.svg", name: "Make" },
  { file: "n8n.svg", name: "n8n" },
  { file: "supabase.svg", name: "Supabase" },
  { file: "python.svg", name: "Python" },
  { file: "googleappsscript.svg", name: "Apps Script" },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {LOGOS.map((logo) => (
        <li key={logo.file} className={styles.item}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logos/${logo.file}`}
            alt={hidden ? "" : logo.name}
            className={logo.wordmark ? styles.wordmark : styles.icon}
            width={logo.wordmark ? 96 : 22}
            height={logo.wordmark ? 26 : 22}
            loading="lazy"
            decoding="async"
          />
          {!logo.wordmark && <span className={styles.name}>{logo.name}</span>}
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee() {
  return (
    <section className={styles.strip} aria-label="Nástroje, se kterými stavíme">
      <p className={styles.label}>Stavíme na nástrojích, které znáte</p>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}

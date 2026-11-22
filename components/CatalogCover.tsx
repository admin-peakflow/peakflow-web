import { magnet } from "@/lib/site";
import styles from "./CatalogCover.module.css";

/**
 * Náhled obálky katalogu jako HTML (žádný obrázek, který by šel zastarat).
 * Barvy a písmo odpovídají PDF.
 */
export function CatalogCover({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={`${styles.cover} ${compact ? styles.compact : ""}`} aria-label={`Obálka katalogu: ${magnet.title}`}>
      <div className={styles.sheetBack} aria-hidden="true" />
      <div className={styles.sheet} aria-hidden="true">
        <div className={styles.brand}>
          <span className={styles.mark}>P</span>
          PeakFlow
        </div>
        <span className={styles.number}>15</span>
        <span className={styles.title}>automatizací, které firmě vrátí nejvíc času</span>
        <span className={styles.tag}>Katalog · PDF</span>
      </div>
    </figure>
  );
}

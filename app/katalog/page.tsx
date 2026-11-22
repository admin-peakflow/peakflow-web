import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadMagnetForm } from "@/components/LeadMagnetForm";
import { CatalogCover } from "@/components/CatalogCover";
import { MAIN_CTA, magnet } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Katalog: 15 automatizací, které firmě vrátí nejvíc času",
  description:
    "Katalog zdarma v PDF. 15 automatizací pro obchod, back-office, provoz a reporting: co každá dělá, kdy se vyplatí a co k ní potřebujete.",
};

/** Oblasti katalogu. Musí sedět s PDF (zdroj ve vaultu, Lákadla). */
const AREAS = [
  { name: "Obchod a CRM", body: "Poptávky rovnou do CRM, e‑maily u obchodních případů, zápis po schůzce hlasem a follow‑upy." },
  { name: "Back‑office", body: "Přijaté faktury, objednávky z e‑mailu, nabídky a smlouvy ze šablony, údaje z rejstříků." },
  { name: "Provoz a zakázky", body: "Plán montáží a výjezdů, závozy a trasy pro řidiče, docházka a hotová práce z telefonu." },
  { name: "Data, reporting a AI asistenti", body: "Ranní přehled pro vedení, report, který se poskládá sám, a AI asistenti pro tým i web." },
];

const INSIDE = [
  "Co každá automatizace dělá a komu ušetří práci",
  "Podle jakého signálu poznáte, že se vám vyplatí",
  "Co k ní potřebujete a jak je náročná",
  "Jak si spočítat úsporu ve vaší firmě",
];

export default function KatalogPage() {
  return (
    <div className={styles.page}>
      <SiteHeader />

      <main className={styles.main}>
        <div className={styles.head}>
          <p className="eyebrow">Zdarma ke stažení</p>
          <h1 className={styles.h1}>{magnet.title}</h1>
          <p className={styles.lead}>{magnet.subtitle}</p>
        </div>

        <div className={styles.details}>
          <h2 className={styles.h2}>Co v katalogu najdete</h2>
          <ul className={styles.inside}>
            {INSIDE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <ul className={styles.areas}>
            {AREAS.map((area) => (
              <li key={area.name}>
                <strong>{area.name}</strong>
                <span>{area.body}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.side}>
          <CatalogCover compact />
          <div className={styles.formCard}>
            <LeadMagnetForm location="katalog" />
          </div>
          <p className={styles.alt}>
            Raději to proberete rovnou?{" "}
            <Link href="/kontakt/" data-cta>
              {MAIN_CTA}
            </Link>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

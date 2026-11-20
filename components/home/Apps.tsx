import { APPS } from "@/lib/apps";
import styles from "./Apps.module.css";

/*
 * Aplikace v provozu: PackLabsApp (skutečné screenshoty z ukázkové verze
 * s vymyšlenými daty) a DreamyApp (ukázka plánu závozu na fiktivních datech,
 * skutečné obrazovky obsahují údaje zákazníků).
 */

const PHONES = [
  { src: "/aplikace/packlabsapp-dnes.webp", alt: "PackLabsApp: obrazovka Dnes s docházkou, školením a kontrolami" },
  { src: "/aplikace/packlabsapp-zapis.webp", alt: "PackLabsApp: souhrn zápisu práce před uložením" },
  { src: "/aplikace/packlabsapp-vykon.webp", alt: "PackLabsApp: výkon pracovníka za 30 dní vůči normě" },
];

const STOPS = [
  { time: "08:40", place: "Brno‑Líšeň", what: "matrace 160 × 200, postel", note: "SMS klientovi 08:10" },
  { time: "10:15", place: "Blansko", what: "2× topper", note: "dobírka 12 400 Kč" },
  { time: "11:50", place: "Boskovice", what: "rošty + matrace", note: "výnos do 2. patra" },
  { time: "14:05", place: "Kuřim", what: "reklamace, odvoz", note: "protokol k podpisu" },
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

function RoutePlan() {
  return (
    <div className={styles.route} aria-hidden="true">
      <div className={styles.routeHead}>
        <div>
          <strong>Závoz čt 26. 11.</strong>
          <span>4 zastávky · 186 km · návrat 16:40</span>
        </div>
        <span className={styles.sample}>Ukázka · fiktivní data</span>
      </div>
      <ol className={styles.stops}>
        {STOPS.map((s, i) => (
          <li key={s.time} className={styles.stop}>
            <span className={styles.stopNum}>{i + 1}</span>
            <div>
              <strong>
                {s.time} · {s.place}
              </strong>
              <span>{s.what}</span>
            </div>
            <em>{s.note}</em>
          </li>
        ))}
      </ol>
      <div className={styles.routeFoot}>
        <span className={styles.qr} />
        <span>
          <strong>Trasa optimalizovaná.</strong> Řidič má QR s navigací, zápis je
          v Google Kalendáři.
        </span>
      </div>
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
          </div>
          <div className={styles.visual}>
            {app.id === "packlabsapp" ? (
              <>
                <Phones />
                <p className={styles.caption}>Skutečné obrazovky z ukázkové verze s vymyšlenými daty.</p>
              </>
            ) : (
              <RoutePlan />
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

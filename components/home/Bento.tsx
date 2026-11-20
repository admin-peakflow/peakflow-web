import Link from "next/link";
import styles from "./Bento.module.css";

/*
 * Čtyři služby jako „bento“ s živými ukázkami produktu. Ukázky jsou HTML na
 * fiktivních datech a jsou tak i označené. Animace se spustí, když je dlaždice
 * vidět (`data-play` → třída `isPlaying` z components/PlayOnView.tsx).
 */

function Sample() {
  return <span className={styles.sample}>Ukázka</span>;
}

function ErpMock() {
  return (
    <div className={`${styles.mock} ${styles.erp}`} aria-hidden="true">
      <div className={styles.mockBar}>
        <span>Zakázky · listopad</span>
        <Sample />
      </div>
      <div className={styles.kanban}>
        <div className={`${styles.col} ${styles.colHideSm}`}>
          <span className={styles.colHead}>Poptávka <b>2</b></span>
          <div className={styles.card}><strong>SVJ Lesná</strong><span>14 bytů · odečty</span></div>
          <div className={styles.card}><strong>RD Kuřim</strong><span>tepelné čerpadlo</span></div>
        </div>
        <div className={`${styles.col} ${styles.colHideXs}`}>
          <span className={styles.colHead}>Nabídka <b>1</b></span>
          <div className={styles.card}><strong>Novák s.r.o.</strong><span>servis · 48 000 Kč</span></div>
        </div>
        <div className={styles.col}>
          <span className={styles.colHead}>Realizace <b>1</b></span>
          <div className={`${styles.card} ${styles.cardActive}`}>
            <strong>BD Žabovřesky</strong>
            <span>montáž · 2 technici</span>
            <span className={styles.progress}><i /></span>
          </div>
        </div>
        <div className={styles.col}>
          <span className={styles.colHead}>Fakturace <b>2</b></span>
          <div className={`${styles.card} ${styles.cardNew}`}><strong>BD Žabovřesky</strong><span>FV‑2026‑118</span></div>
          <div className={styles.card}><strong>Pekárna Horák</strong><span>zaplaceno</span></div>
        </div>
      </div>
      <div className={styles.toast}>
        <span className={styles.tick}>✓</span> Montáž hotová, faktura vystavená a odeslaná
      </div>
    </div>
  );
}

function FlowMock() {
  return (
    <div className={`${styles.mock} ${styles.flow}`} aria-hidden="true">
      <div className={styles.mockBar}>
        <span>Nový e‑mail → Raynet</span>
        <Sample />
      </div>
      <div className={styles.nodes}>
        <span className={styles.node}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          E‑mail
        </span>
        <span className={styles.wire}><i /></span>
        <span className={`${styles.node} ${styles.nodeAi}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/claude.svg" alt="" width={16} height={16} />
          AI
        </span>
        <span className={styles.wire}><i /></span>
        <span className={styles.node}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/raynet.svg" alt="" width={58} height={16} className={styles.raynet} />
        </span>
      </div>
      <ul className={styles.fields}>
        <li><span>Klient</span><strong>Novák s.r.o.</strong><b>✓</b></li>
        <li><span>Případ</span><strong>Rekonstrukce kotelny</strong><b>✓</b></li>
        <li><span>Fáze</span><strong>Nabídka · 180 000 Kč</strong><b>✓</b></li>
      </ul>
      <div className={styles.confirm}>Obchodník potvrdil jedním klikem</div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className={`${styles.mock} ${styles.chat}`} aria-hidden="true">
      <div className={styles.mockBar}>
        <span>Firemní asistent</span>
        <Sample />
      </div>
      <div className={styles.thread}>
        <p className={`${styles.msg} ${styles.me} ${styles.m1}`}>Kolik stojí servis kotle pro SVJ?</p>
        <div className={styles.slot}>
          <p className={`${styles.typing} ${styles.t1}`}><i /><i /><i /></p>
          <p className={`${styles.msg} ${styles.bot} ${styles.m2}`}>
            Podle ceníku 2 400 Kč bez DPH za kotel. Mám připravit nabídku?
            <span className={styles.source}>Ceník 2026.pdf · str. 3</span>
          </p>
        </div>
        <p className={`${styles.msg} ${styles.me} ${styles.m3}`}>Ano, pro SVJ Lesná.</p>
        <p className={`${styles.msg} ${styles.bot} ${styles.m4}`}>Hotovo. Nabídka čeká v Raynetu na kontrolu.</p>
      </div>
    </div>
  );
}

const BARS = [42, 55, 48, 63, 58, 71, 66, 84, 79, 92];

function DataMock() {
  return (
    <div className={`${styles.mock} ${styles.data}`} aria-hidden="true">
      <div className={styles.mockBar}>
        <span>Přehled pro vedení · 06:00</span>
        <Sample />
      </div>
      <div className={styles.kpis}>
        <div><span>Tržby</span><strong>4,82 mil.</strong><em>+18 %</em></div>
        <div><span>Marže</span><strong>31,4 %</strong><em>+2,1 b.</em></div>
      </div>
      <div className={styles.bars}>
        {BARS.map((h, i) => (
          <i key={i} style={{ height: `${h}%`, animationDelay: `${0.2 + i * 0.07}s` }} />
        ))}
      </div>
      <div className={styles.sent}>
        <span className={styles.tick}>✓</span> Report odešel vedení e‑mailem
      </div>
    </div>
  );
}

const TILES = [
  {
    id: "erp",
    track: "sluzba-erp",
    title: "ERP a systémy na míru",
    body: "Obchod, sklad, montáže a fakturace v jednom systému, postaveném podle toho, jak vaše firma opravdu funguje.",
    mock: <ErpMock />,
    wide: true,
  },
  {
    id: "asistenti",
    track: "sluzba-asistenti",
    title: "AI asistenti a boti",
    body: "Odpovídají z vašich podkladů, zákazníkům na webu i týmu uvnitř. Zlepšují se s každou opravou.",
    mock: <ChatMock />,
  },
  {
    id: "data",
    track: "sluzba-data",
    title: "Data a reporting",
    body: "Jedno místo pravdy z ERP, e‑shopu a CRM. Přehled pro vedení každé ráno, bez ruční práce.",
    mock: <DataMock />,
  },
  {
    id: "automatizace",
    track: "sluzba-automatizace",
    title: "Automatizace obchodu a back‑office",
    body: "AI převezme rutinu pozice: zápisy do CRM, připomínky, objednávky a faktury. Člověk schvaluje jen výjimky.",
    mock: <FlowMock />,
    wide: true,
  },
];

export function Bento() {
  return (
    <div className={styles.grid}>
      {TILES.map((t) => (
        <article
          key={t.id}
          className={`${styles.tile} ${t.wide ? styles.wide : ""}`}
          data-play
          data-track-item={t.track}
        >
          <div className={styles.copy}>
            <h3 className={styles.title}>{t.title}</h3>
            <p className={styles.body}>{t.body}</p>
            <Link href={`/sluzby/#${t.id}`} className={styles.link}>
              Víc o službě
            </Link>
          </div>
          {t.mock}
        </article>
      ))}
    </div>
  );
}

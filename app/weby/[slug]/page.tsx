import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CASES, getCase } from "@/lib/cases";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCase((await params).slug);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/weby/${c.slug}/` },
    openGraph: {
      title: `${c.metaTitle} | ${site.name}`,
      description: c.metaDescription,
      url: `${site.url}/weby/${c.slug}/`,
      images: [{ url: c.shot.src }],
    },
  };
}

export default async function CasePage({ params }: Props) {
  const c = getCase((await params).slug);
  if (!c) notFound();

  const i = CASES.findIndex((x) => x.slug === c.slug);
  const next = CASES[(i + 1) % CASES.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.name}: ${c.headline}`,
    description: c.metaDescription,
    url: `${site.url}/weby/${c.slug}/`,
    image: `${site.url}${c.shot.src}`,
    author: { "@type": "Organization", name: site.legalName, url: site.url },
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
    about: { "@type": "Organization", name: c.name, url: `https://${c.domains[0]}/` },
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Weby", item: `${site.url}/weby/` },
      { "@type": "ListItem", position: 2, name: c.name, item: `${site.url}/weby/${c.slug}/` },
    ],
  };

  return (
    <>
      <SiteHeader active="weby" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbs]) }}
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <nav aria-label="Drobečková navigace" className={styles.crumbs}>
            <Link href="/weby/">Weby</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{c.name}</span>
          </nav>
          <p className={styles.field}>{c.field}</p>
          <h1 className={styles.h1}>
            {c.name}
            <span className={styles.h1Sub}>{c.headline}</span>
          </h1>
          <p className={styles.heroLinks}>
            {c.domains.map((d) => (
              <a key={d} href={`https://${d}/`} target="_blank" rel="noopener">
                {d} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </p>
        </div>
      </section>

      <main>
        <div className={styles.shotWrap}>
          <a
            href={`https://${c.domains[0]}/`}
            className={styles.browser}
            target="_blank"
            rel="noopener"
            aria-label={`Otevřít web ${c.domains[0]} v novém okně`}
          >
            <span className={styles.browserBar} aria-hidden="true">
              <span className={styles.dots}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.url}>{c.domains[0]}</span>
            </span>
            <span className={styles.viewport}>
              <img
                src={c.shot.src}
                width={c.shot.width}
                height={c.shot.height}
                alt={`Úvodní stránka webu ${c.domains[0]}`}
                className={styles.shot}
                decoding="async"
              />
            </span>
          </a>
        </div>

        {c.numbers.length > 0 && (
          <section className={styles.numbers} aria-label="Čísla projektu">
            <dl className={styles.numbersGrid}>
              {c.numbers.map((n) => (
                <div key={n.label} className={styles.number}>
                  <dt>{n.label}</dt>
                  <dd>{n.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section className={styles.block} aria-labelledby="situace">
          <h2 id="situace" className={styles.blockTitle}>
            Výchozí situace
          </h2>
          <div className={styles.prose}>
            {c.situation.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>

        <section className={`${styles.block} ${styles.blockWork}`} aria-labelledby="prace">
          <h2 id="prace" className={styles.blockTitle}>
            Co jsme udělali
          </h2>
          <div className={styles.work}>
            {c.work.map((w) => (
              <div key={w.area} className={styles.workArea}>
                <h3>{w.area}</h3>
                <ul>
                  {w.items.map((it) => (
                    <li key={it.slice(0, 40)}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.block} aria-labelledby="stack">
          <h2 id="stack" className={styles.blockTitle}>
            Technologie
          </h2>
          <ul className={styles.stack}>
            {c.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="wrap wrapTight" style={{ paddingBottom: 48 }}>
          <div className="ctaBand" style={{ padding: "56px 48px" }}>
            <div>
              <h2 className="ctaTitle">Chcete podobný výsledek?</h2>
              <p className="ctaBody">
                Na úvodním hovoru probereme, komu váš web prodává a co má dělat. Pak
                dostanete návrh a cenu.
              </p>
            </div>
            <Link href="/kontakt/" className="btn btnDark">
              Domluvit discovery call →
            </Link>
          </div>
        </section>

        <nav className={styles.nextWrap} aria-label="Další projekt">
          <Link href={`/weby/${next.slug}/`} className={styles.next}>
            <span>Další projekt</span>
            <strong>
              {next.name} <span aria-hidden="true">→</span>
            </strong>
          </Link>
          <Link href="/weby/" className={styles.back}>
            Všechny weby
          </Link>
        </nav>
      </main>

      <SiteFooter />
    </>
  );
}

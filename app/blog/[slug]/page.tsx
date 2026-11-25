import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { MAIN_CTA, magnet, site } from "@/lib/site";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: {
      type: "article",
      title: `${p.title} | ${site.name}`,
      description: p.description,
      url: `${site.url}/blog/${p.slug}/`,
      publishedTime: p.date,
      authors: [p.author],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();

  const others = getAllPosts().filter((x) => x.slug !== p.slug).slice(0, 3);

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${site.url}/blog/${p.slug}/`,
      inLanguage: "cs",
      author: { "@type": "Person", name: p.author },
      publisher: { "@type": "Organization", name: site.legalName, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${site.url}/blog/` },
        { "@type": "ListItem", position: 2, name: p.title, item: `${site.url}/blog/${p.slug}/` },
      ],
    },
  ];
  if (p.faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <nav aria-label="Drobečková navigace" className={styles.crumbs}>
            <Link href="/blog/">Blog</Link>
            <span aria-hidden="true">/</span>
            <span>{p.category}</span>
          </nav>
          <h1 className={styles.h1}>{p.title}</h1>
          <p className={styles.meta}>
            {p.author} · <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readingMinutes} min čtení
          </p>
        </div>
      </section>

      <main className={styles.layout}>
        {p.headings.length > 2 && (
          <aside className={styles.toc} aria-label="Obsah článku">
            <strong>Obsah</strong>
            <ol>
              {p.headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ol>
          </aside>
        )}

        <article className={styles.prose} dangerouslySetInnerHTML={{ __html: p.html }} />
      </main>

      <section className="wrap wrapTight" style={{ paddingBottom: 48 }}>
        <div className="ctaBand" style={{ padding: "56px 48px" }}>
          <div>
            <h2 className="ctaTitle">Kolik času by šlo vrátit u vás?</h2>
            <p className="ctaBody">
              Za 30 minut projdeme, kde ve vašem obchodu a back-office utíká čas a co
              z toho se vyplatí zautomatizovat. Nebo si nejdřív přečtěte katalog{" "}
              <Link href="/katalog/">{magnet.title.toLowerCase()}</Link>.
            </p>
          </div>
          <Link href="/kontakt/" className="btn btnDark" data-cta>
            {MAIN_CTA}
          </Link>
        </div>
      </section>

      {others.length > 0 && (
        <nav className={styles.more} aria-label="Další články">
          <strong className={styles.moreTitle}>Další články</strong>
          <ul>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/blog/${o.slug}/`}>
                  {o.title} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <SiteFooter />
    </>
  );
}

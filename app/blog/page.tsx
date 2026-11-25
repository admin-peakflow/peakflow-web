import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { formatDate, getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";
import styles from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Jak firmy ztrácí čas v obchodu a back-office a co se s tím dá dělat. Praxe z automatizací, Raynetu, ERP na míru a reportingu.",
  alternates: { canonical: "/blog/" },
  openGraph: { url: `${site.url}/blog/` },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <SiteHeader />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <h1 className={styles.h1}>Blog</h1>
            <p className={styles.heroLead}>
              <strong>Co vidíme ve firmách.</strong> Kde obchod a back-office ztrácí čas,
              kolik to stojí a co se s tím dá dělat. Píšeme z vlastních projektů.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ul className={styles.rows}>
              {posts.map((p) => (
                <li key={p.slug} className={styles.row}>
                  <div>
                    <h2 className={styles.rowTitle}>
                      <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
                    </h2>
                    <p className={styles.rowBody}>{p.description}</p>
                  </div>
                  <span className={styles.rowMeta}>
                    {formatDate(p.date)} · {p.readingMinutes} min
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

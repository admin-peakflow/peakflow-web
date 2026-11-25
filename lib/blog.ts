/**
 * Blog: články jsou markdown soubory v content/blog/<slug>.md.
 * Čtou se při buildu (statický export), za běhu se nic nenačítá.
 *
 * Frontmatter (jednoduché `klíč: hodnota`, bez vnořování):
 *   title, description, date (RRRR-MM-DD), author, category
 *   draft: true  → článek se nevykreslí ani neobjeví v sitemapě
 *                  (náhled konceptů: BLOG_DRAFTS=1 npm run build — nikdy nenasazovat)
 *
 * Zdroj a review článků je ve vaultu: 03 Projects/03-07 - Peakflow Blog/.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { Marked } from "marked";

const DIR = join(process.cwd(), "content", "blog");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  readingMinutes: number;
  html: string;
  headings: { id: string; text: string }[];
  /** Otázky ze sekce „## Časté otázky“ (### otázka + odpověď) pro FAQPage schema. */
  faq: { q: string; a: string }[];
};

function extractFaq(body: string): Post["faq"] {
  const lines = body.split(/\r?\n/);
  const start = lines.findIndex((l) => /^## Časté otázky/.test(l));
  if (start === -1) return [];
  const faq: Post["faq"] = [];
  for (const line of lines.slice(start + 1)) {
    if (/^## /.test(line)) break;
    if (/^### /.test(line)) faq.push({ q: line.slice(4).trim(), a: "" });
    else if (faq.length) faq[faq.length - 1].a += " " + line;
  }
  return faq
    .map((f) => ({
      q: f.q,
      a: f.a
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`>]/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    }))
    .filter((f) => f.q && f.a);
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error("Článek nemá frontmatter");
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!kv) continue;
    data[kv[1]] = kv[2].trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
  }
  return { data, body: m[2] };
}

/** Česky čitelné kotvy: „Co s tím udělat“ → co-s-tim-udelat. */
function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Bloky článku (knihovna je popsaná ve vaultu:
 * 06 Knowledge/(C) PeakFlow Blog — knihovna bloků a pravidla psaní.md).
 *
 *   :::kostka            V kostce (shrnutí hned pod perexem)
 *   :::tip Z praxe       postřeh z našich projektů
 *   :::pozor             na co si dát pozor
 *   :::kroky             očíslovaný postup (uvnitř seznam 1. 2. 3.)
 *   :::vypocet           výpočet s předpoklady
 *   :::
 *
 * Text za názvem bloku je vlastní nadpis boxu, jinak se použije výchozí.
 */
const BLOCKS: Record<string, string> = {
  kostka: "V kostce",
  tip: "Z praxe",
  pozor: "Pozor",
  kroky: "Postup",
  vypocet: "Výpočet",
};

function render(body: string) {
  const headings: Post["headings"] = [];
  const used = new Set<string>();
  const marked = new Marked({ gfm: true });
  marked.use({
    extensions: [
      {
        name: "box",
        level: "block",
        start: (src: string) => src.match(/^:::/m)?.index,
        tokenizer(src: string) {
          const m = src.match(/^:::([a-z]+)[ \t]*([^\n]*)\n([\s\S]*?)\n:::[ \t]*(?:\n|$)/);
          if (!m || !BLOCKS[m[1]]) return undefined;
          return {
            type: "box",
            raw: m[0],
            kind: m[1],
            title: m[2].trim() || BLOCKS[m[1]],
            tokens: this.lexer.blockTokens(m[3], []),
          };
        },
        renderer(token) {
          const inner = this.parser.parse(token.tokens ?? []);
          return `<aside class="box box-${token.kind}"><p class="boxTitle">${token.title}</p>${inner}</aside>\n`;
        },
      },
    ],
  });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        let id = slugify(text);
        while (used.has(id)) id += "-";
        used.add(id);
        if (depth === 2) headings.push({ id, text: text.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href) && !href.includes("peakflow.cz");
        // [text](url "affiliate") = partnerský odkaz: rel="sponsored" podle Googlu, title se nevypisuje.
        const sponsored = title === "affiliate";
        const t = title && !sponsored ? ` title="${title}"` : "";
        const rel = sponsored ? "sponsored noopener" : "noopener";
        return external
          ? `<a href="${href}"${t} target="_blank" rel="${rel}">${text}</a>`
          : `<a href="${href}"${t}>${text}</a>`;
      },
    },
  });
  // Tabulky na mobilu jen posouváme do strany, nerozbíjíme layout.
  const html = (marked.parse(body, { async: false }) as string)
    .replace(/<table>/g, '<div class="tableWrap"><table>')
    .replace(/<\/table>/g, "</table></div>");
  return { html, headings };
}

const SHOW_DRAFTS = process.env.BLOG_DRAFTS === "1";

function load(slug: string): (Post & { draft: boolean }) | null {
  const file = join(DIR, `${slug}.md`);
  if (!existsSync(file)) return null;
  const { data, body } = parseFrontmatter(readFileSync(file, "utf8"));
  for (const key of ["title", "description", "date"]) {
    if (!data[key]) throw new Error(`${slug}.md: chybí ${key}`);
  }
  const words = body.split(/\s+/).filter(Boolean).length;
  const { html, headings } = render(body);
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    author: data.author || "PeakFlow",
    category: data.category || "Blog",
    readingMinutes: Math.max(1, Math.round(words / 200)),
    html,
    headings,
    faq: extractFaq(body),
    draft: data.draft === "true",
  };
}

export function getAllPosts(): Post[] {
  if (!existsSync(DIR)) return [];
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => load(f.replace(/\.md$/, "")))
    .filter((p): p is Post & { draft: boolean } => !!p && (!p.draft || SHOW_DRAFTS))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title, "cs")));
}

export function getPost(slug: string): Post | null {
  const p = load(slug);
  return p && (!p.draft || SHOW_DRAFTS) ? p : null;
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${m}. ${y}`;
}

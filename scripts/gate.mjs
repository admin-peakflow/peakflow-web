// Kontrolní brána před nasazením: `npm run gate`.
// Končí řádkem `GATE: PASS` nebo `GATE: FAIL`. Bez PASS se nenasazuje.
//
// 1. typecheck (tsc --noEmit)
// 2. build (statický export do out/)
// 3. každá route ze sitemapy existuje v out/ jako index.html
// 4. každý lokální <img src> / href na /… v out/**/*.html míří na existující soubor
// 5. každá stránka má <title>, meta description a právě jeden <h1>
// 6. výchozí Consent Mode v2 je na každé stránce a v <head> před GTM
//
// Lint zatím není: `next lint` v projektu nemá ESLint konfiguraci.
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const failures = [];
const step = (name, fn) => {
  try {
    fn();
    console.log(`ok   ${name}`);
  } catch (e) {
    failures.push(`${name}: ${e.message.split("\n")[0]}`);
    console.log(`FAIL ${name}`);
  }
};
const run = (cmd) => execSync(cmd, { stdio: "inherit" });

step("typecheck", () => run("npx tsc --noEmit"));
step("build", () => run("npx next build"));

const OUT = "out";
const htmlFiles = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) htmlFiles.push(p);
  }
};

step("sitemap routes exist", () => {
  const xml = readFileSync(join(OUT, "sitemap.xml"), "utf8");
  const routes = [...xml.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
  if (!routes.length) throw new Error("sitemap.xml has no routes");
  const missing = routes.filter((r) => !existsSync(join(OUT, r, "index.html")));
  if (missing.length) throw new Error(`missing: ${missing.join(", ")}`);
});

step("local links and images resolve", () => {
  walk(OUT);
  const broken = new Set();
  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    for (const m of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)) {
      const url = decodeURI(m[1]);
      if (url.startsWith("//")) continue;
      const target = join(OUT, url);
      const ok =
        existsSync(target) &&
        (statSync(target).isFile() || existsSync(join(target, "index.html")));
      if (!ok) broken.add(`${url} (in ${file})`);
    }
  }
  if (broken.size) throw new Error([...broken].slice(0, 10).join(", "));
});

step("every page has title, description, one h1", () => {
  const bad = [];
  for (const file of htmlFiles) {
    if (file.includes("404") || file.includes("_not-found")) continue;
    const html = readFileSync(file, "utf8");
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    if (!/<title>[^<]+<\/title>/.test(html)) bad.push(`${file}: no <title>`);
    if (!/<meta name="description" content="[^"]+"/.test(html)) bad.push(`${file}: no description`);
    if (h1 !== 1) bad.push(`${file}: ${h1}× <h1>`);
  }
  if (bad.length) throw new Error(bad.join("; "));
});

step("consent default runs before GTM on every page", () => {
  const bad = [];
  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const consent = html.indexOf('<script id="consent-default">');
    const gtm = html.indexOf("googletagmanager.com/gtm.js");
    if (consent === -1) bad.push(`${file}: no consent default`);
    else if (gtm !== -1 && gtm < consent) bad.push(`${file}: GTM before consent default`);
    if (!html.includes("'consent','default'")) bad.push(`${file}: consent default not set`);
  }
  if (bad.length) throw new Error(bad.join("; "));
});

if (failures.length) {
  console.log("\n" + failures.map((f) => `- ${f}`).join("\n"));
  console.log("GATE: FAIL");
  process.exit(1);
}
console.log("GATE: PASS");

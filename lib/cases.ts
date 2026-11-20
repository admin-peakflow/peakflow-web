/**
 * Case studies pro /weby/<slug>/.
 *
 * Pravidlo: každé tvrzení tady musí jít doložit (repo, commit, živý web,
 * poznámka ve vaultu). Čísla jen ověřená. Prototypy, které neběží naostro,
 * a interní čísla klientů sem nepatří. Podklady: rešerše 2026-11-17
 * (vault PeakFlow, 06 Knowledge / (C) Case studies webů — podklady.md).
 */

export type CaseArea = {
  /** Např. „Web“, „SEO a Search Console“, „AI vyhledávání“, „Automatizace“. */
  area: string;
  items: string[];
};

export type CaseStudy = {
  slug: string;
  name: string;
  field: string;
  domains: string[];
  shot: { src: string; width: number; height: number };
  metaTitle: string;
  metaDescription: string;
  /** Jedna věta pod jménem klienta v hero. */
  headline: string;
  /** Výchozí situace — 1–3 krátké odstavce. */
  situation: string[];
  work: CaseArea[];
  numbers: { value: string; label: string }[];
  /** Skutečné screenshoty stránek webu (živé, bez osobních údajů). */
  gallery?: { src: string; url: string; caption: string }[];
  stack: string[];
};

export const CASES: CaseStudy[] = [
  {
    slug: "dreamy",
    name: "Dreamy",
    field: "E-shop s matracemi a postelemi",
    domains: ["dreamy.cz"],
    shot: { src: "/weby/dreamy-full.webp", width: 960, height: 3200 },
    metaTitle: "Dreamy — předělaný e-shop na Shoptetu a poradce výběru matrace",
    metaDescription:
      "Case study: kompletní předělání e-shopu Dreamy na Shoptetu (menu, kategorie, produkty, košík, prodejny, značky, Poradna), poradce výběru matrace a příprava na AI vyhledávání.",
    headline: "Kompletně předělaný e-shop na Shoptetu, poradce výběru matrace a web připravený na AI vyhledávání.",
    situation: [
      "Dreamy prodává matrace, postele, polštáře a křesla La-Z-Boy na e-shopu a ve čtyřech kamenných prodejnách.",
      "E-shop na Shoptetu léta rostl po kouscích: vlastní kód od několika dodavatelů a popisky produktů v externím editoru s obrázky o velikosti 1,4 až 7,1 MB za kus.",
      "A matrace za desítky tisíc se online kupuje těžko. Zákazník neví, jakou tuhost a materiál chce, a čím dál víc lidí se místo Googlu ptá ChatGPT.",
    ],
    work: [
      {
        area: "Předělání e-shopu",
        items: [
          "Přes 30 nasazených úprav za tři měsíce (srpen až listopad 2026), postupně a po částech. Začali jsme analýzou celého vlastního kódu webu.",
          "Nové menu a výpis kategorií s filtry podle toho, co zákazník řeší: spí na boku, bolí ho záda, je mu v noci teplo.",
          "Produktový detail: nové popisky u 102 produktů, hodnocení, lepivá lišta s datem doručení a sjednocené tuhosti matrací.",
          "Nový košík a odznak košíku v hlavičce.",
          "Popisky, kategorie a články převedené z externího editoru přímo do Shoptetu: 67 produktů, 15 kategorií a 5 článků.",
        ],
      },
      {
        area: "Stránky a obsah",
        items: [
          "Nová homepage, stránka prodejen s fotkami, mapou a otevírací dobou, 6 stránek značek a jejich přehled.",
          "Poradna s novým výpisem i šablonou článku a desítky nových článků provázaných vnitřními odkazy.",
          "Stránky O nás a Doprava a montáž, nové obchodní podmínky a garance, automatický přehled nejnižších cen za 30 dní.",
        ],
      },
      {
        area: "Poradce výběru",
        items: [
          "Interaktivní poradce na dreamy.cz/poradce: pár otázek a doporučení jedné matrace nebo polštáře plus dvou alternativ, s odkazem přímo na správnou variantu.",
          "Pokrývá 34 matrací a 21 řad polštářů. Před spuštěním automaticky otestovaný na všech 545 112 kombinacích odpovědí.",
          "Neukládá osobní údaje, do měření posílá jen anonymní události.",
        ],
      },
      {
        area: "AI vyhledávání",
        items: [
          "Soubor llms.txt, který AI asistentům stručně popisuje e-shop.",
          "Strukturovaná data na stránkách prodejen včetně otevírací doby o svátcích a sekce častých otázek jako FAQPage.",
          "Úprava článků pro AI odpovědi (GEO) a pravidelné měření, jestli Dreamy zmiňuje ChatGPT a Google AI Mode.",
        ],
      },
      {
        area: "SEO a Search Console",
        items: [
          "SEO audit e-shopu, mapa přesměrování pro adresy, které vracely chybu 404, a meta popisky na 54 stránkách.",
          "Opakovatelný postup pro obsah: návrh článku, kontrola, fact-check, publikace a žádost o indexaci v Search Console.",
          "Nové texty kategorií matrací podle tuhosti.",
        ],
      },
      {
        area: "Formuláře a interní aplikace",
        items: [
          "Formuláře z webu se ukládají rovnou do Google Sheetu.",
          "Pro logistiku a obchod jsme postavili i interní aplikaci DreamyApp: přepravy, plán závozů, CRM a reklamace.",
        ],
      },
    ],
    numbers: [
      { value: "30+", label: "nasazených úprav e-shopu za 3 měsíce" },
      { value: "102", label: "nových popisků produktů" },
      { value: "545 112", label: "otestovaných kombinací odpovědí poradce" },
      { value: "6", label: "nových stránek značek" },
    ],
    gallery: [
      {
        src: "/weby/dreamy/kategorie.webp",
        url: "https://www.dreamy.cz/matrace/",
        caption: "Kategorie s filtry podle toho, co zákazník řeší",
      },
      {
        src: "/weby/dreamy/produkt.webp",
        url: "https://www.dreamy.cz/dreamy-procomfort-ultimate/",
        caption: "Produktový detail s variantami a hodnocením",
      },
      {
        src: "/weby/dreamy/poradna.webp",
        url: "https://www.dreamy.cz/blog/",
        caption: "Poradna s novým výpisem článků",
      },
      {
        src: "/weby/dreamy/prodejny.webp",
        url: "https://www.dreamy.cz/nase-prodejny/",
        caption: "Prodejny s fotkami, mapou a otevírací dobou",
      },
    ],
    stack: ["Shoptet", "vlastní JavaScript a CSS", "Google Tag Manager", "Search Console", "Google Sheets", "llms.txt", "Schema.org"],
  },
  {
    slug: "tereza-nosskova",
    name: "Tereza Nossková",
    field: "Svatební a portrétní fotografka",
    domains: ["terezasdiary.cz"],
    shot: { src: "/weby/tereza-full.webp", width: 960, height: 3200 },
    metaTitle: "Tereza Nossková — portfolio fotografky s lokálním SEO",
    metaDescription:
      "Case study: web brněnské fotografky. Fotky přes celou obrazovku, čtyři stránky pro lokální vyhledávání, deník s příběhy z focení, strukturovaná data a poptávkový formulář.",
    headline: "Portfolio, které nechá mluvit fotky, a čtyři stránky, které ji najdou v Googlu podle typu focení.",
    situation: [
      "Tereza je fotografka z Brna. Fotí svatby, páry, portréty, módu a testshooty pro modelky a agentury.",
      "Fotograf potřebuje dvě věci: aby fotky vypadaly co nejlíp a aby ho lidé našli, když hledají „svatební fotograf Brno“. Instagram stačí na to první, na to druhé ne.",
    ],
    work: [
      {
        area: "Web",
        items: [
          "Fotka přes celou obrazovku, jemné serifové písmo a portfolio rozdělené na svatby, portréty, páry a módu.",
          "Stránky O mně, Ceník a Kontakt. Obrázky ve formátu WebP, aby se fotky načítaly rychle.",
        ],
      },
      {
        area: "Lokální SEO",
        items: [
          "Čtyři stránky na konkrétní hledání: svatební, portrétní, párový a těhotenský, módní a produktový fotograf v Brně.",
          "Deník s osmi příběhy z focení (svatba na Pálavě, ve stodole v Rudici, párové focení u moře…). Každý je samostatná stránka, kterou Google může najít.",
          "Web ověřený v Google Search Console, sitemapa s 18 adresami.",
        ],
      },
      {
        area: "AI vyhledávání",
        items: [
          "Strukturovaná data LocalBusiness a Person: kdo je Tereza, co fotí, kde působí a jak ji kontaktovat. Z toho čerpají Google i AI asistenti.",
        ],
      },
      {
        area: "Poptávkový formulář",
        items: [
          "Krátký formulář s výběrem typu focení. Poptávka přijde rovnou e-mailem.",
        ],
      },
    ],
    numbers: [
      { value: "18", label: "stránek v sitemapě" },
      { value: "4", label: "lokální SEO stránky" },
      { value: "8", label: "příběhů v deníku" },
    ],
    stack: ["statický web", "Cloudflare", "Web3Forms", "Schema.org", "Search Console"],
  },
  {
    slug: "packlabs",
    name: "PackLabs",
    field: "Balení, kompletace a automatizace",
    domains: ["packlabs.cz", "baleni.packlabs.cz", "automation.packlabs.cz"],
    shot: { src: "/weby/packlabs-full.webp", width: 960, height: 3200 },
    metaTitle: "PackLabs — tři weby, 168 URL a provozní aplikace",
    metaDescription:
      "Case study: místo šablony e-shopu tři weby pro skupinu a dvě divize, CZ i EN, 56 článků, kalkulačka balení, bezplatné nástroje a interní aplikace pro provoz.",
    headline:
      "Ze šablony e-shopu tři weby pro skupinu a dvě divize, kalkulačka, nástroje zdarma a aplikace pro provoz.",
    situation: [
      "PackLabs balí, kompletuje a vozí zboží do obchodních řetězců a zároveň automatizuje firemní agendu kolem účetnictví, skladu a e-shopu.",
      "Původní web byl šablona e-shopu na Shoptetu s prázdnými stránkami služeb a titulkem „Můj e-shop“. Dvě velmi odlišné služby se na něm nedaly vysvětlit.",
    ],
    work: [
      {
        area: "Web",
        items: [
          "Tři weby z jednoho kódu: skupina na www.packlabs.cz, divize Balení a logistika a divize Automatizace na vlastních subdoménách.",
          "Celý web česky i anglicky, s hreflang na každé stránce.",
          "Stránky automatizací pro konkrétní systémy: POHODA, ABRA Flexi, ABRA Gen, Shoptet, Raynet a další.",
        ],
      },
      {
        area: "Formuláře, kalkulačka a nástroje",
        items: [
          "Poptávkový formulář ve čtyřech variantách podle stránky, odesílání bez přenačtení a děkovací stránka.",
          "Kalkulačka balení doypacků. Cenu ukáže po zadání e-mailu, takže z ní vzniká poptávka.",
          "Tři bezplatné nástroje: kontrola EAN, kalkulačka úroků z prodlení a hromadné ověření IČO (nespolehlivý plátce, zveřejněné účty).",
        ],
      },
      {
        area: "SEO a Search Console",
        items: [
          "Doménová služba v Search Console pro všechny subdomény a odeslaná sitemapa.",
          "Strukturovaná data LocalBusiness, Article, Service, FAQPage a WebApplication.",
          "Kontrolní skript před každým nasazením: rozbité odkazy, titulky a popisy, jeden H1, platná strukturovaná data.",
          "DNS a pošta převedené na Cloudflare, měření návštěvnosti bez cookies.",
        ],
      },
      {
        area: "Obsah a AI vyhledávání",
        items: [
          "Blog s 28 články v každém jazyce, rozdělený podle divizí.",
          "Sekce častých otázek se strukturovanými daty FAQPage na stránkách služeb a nástrojů.",
          "Firemní znalostní báze pro AI asistenty („mozek“) s MCP konektorem. Změny schvaluje správce.",
        ],
      },
      {
        area: "Automatizace provozu",
        items: [
          "Interní webová aplikace pro tým v provozu, česky i ukrajinsky: docházka, zápis práce, šarže a expedice s dodacím listem.",
          "Příjem materiálu s fotkou dodacího listu, směny, které si lidé sami zabírají, kontroly HACCP a školení s podpisem prstem.",
          "Nábor s automaticky vygenerovanou dohodou o provedení práce.",
        ],
      },
    ],
    numbers: [
      { value: "168", label: "URL ve třech sitemapách" },
      { value: "2", label: "jazyky na celém webu" },
      { value: "56", label: "článků (28 CZ + 28 EN)" },
      { value: "3", label: "bezplatné online nástroje" },
    ],
    stack: ["Astro", "Tailwind", "Cloudflare Pages", "Cloudflare Workers + D1", "Web3Forms", "Google Apps Script", "MCP"],
  },
  {
    slug: "fs-composites",
    name: "FS Composites",
    field: "Sklolaminátové profily a rošty",
    domains: ["fscomposites.com"],
    shot: { src: "/weby/fscomposites-full.webp", width: 960, height: 1947 },
    metaTitle: "FS Composites — z 4 na 209 indexovaných stránek",
    metaDescription:
      "Case study: web výrobce pultrudovaných GFRP profilů a roštů. Pět jazyků, 220 URL, blog s fact-checkem, poptávky rovnou do CRM a technické SEO.",
    headline: "Web v pěti jazycích, blog o reálných aplikacích a z 4 na 209 stránek v indexu Googlu.",
    situation: [
      "FS Composites vyrábí pultrudované sklolaminátové profily, rošty a kabelové žlaby pro stavby a průmysl.",
      "Web běžel jako aplikace, kterou Google špatně četl. V září byly v indexu 4 stránky. Zákazníci přitom hledají konkrétní řešení podle oboru a norem, často německy.",
    ],
    work: [
      {
        area: "Web",
        items: [
          "Web postavený kolem oborů, ne kolem katalogu. Hlavní tlačítko vede rovnou k inženýrovi.",
          "Pět jazykových verzí: čeština, angličtina, němčina, francouzština, španělština.",
          "Staré adresy z předchozího webu přesměrované na nové stránky, aby se neztratily odkazy ani pozice.",
        ],
      },
      {
        area: "SEO a Search Console",
        items: [
          "Každá stránka a jazyk má vlastní předgenerované HTML s titulkem, popisem, canonical a hreflang. Dřív Google viděl jednu prázdnou stránku.",
          "Vyřešená duplicita domény s www a bez www, sitemapa odeslaná do Search Console, žádosti o indexaci.",
          "Automatická SEO kontrola a test před každým nasazením.",
        ],
      },
      {
        area: "Obsah",
        items: [
          "Blog „Reálné aplikace GFRP“: 16 článků v pěti jazycích, provázaných s produkty a obory.",
          "Na web projde jen článek, který prošel fact-checkem. Importní skript to hlídá sám.",
          "Nejvíc neznačkových zobrazení přichází z německých dotazů na normy a pultruzi.",
        ],
      },
      {
        area: "AI vyhledávání",
        items: [
          "Strukturovaná data Organization, Article, BreadcrumbList a FAQPage na všech stránkách s otázkami.",
          "Statické HTML, které umí přečíst i AI crawlery bez spouštění JavaScriptu.",
        ],
      },
      {
        area: "Automatizace poptávek",
        items: [
          "Poptávka z webu přijde e-mailem obchodníkovi a zároveň se založí jako lead v CRM (Raynet), označený podle zdroje.",
          "Ochrana proti botům a záchranný zápis: když CRM odmítne celý záznam, uloží se aspoň základní údaje.",
        ],
      },
    ],
    numbers: [
      { value: "4 → 209", label: "stránek v indexu Google (září → listopad)" },
      { value: "220", label: "URL v sitemapě" },
      { value: "5", label: "jazykových verzí" },
      { value: "16", label: "článků v každém jazyce" },
    ],
    stack: ["React", "Vite", "vlastní prerender", "Cloudflare Workers", "Web3Forms", "Raynet API", "Search Console"],
  },
  {
    slug: "foller",
    name: "Foller",
    field: "Výroba pultruzních strojů",
    domains: ["foller.eu"],
    shot: { src: "/weby/foller-full.webp", width: 960, height: 3200 },
    metaTitle: "Foller — web v 5 jazycích a poptávky rovnou do CRM",
    metaDescription:
      "Case study: web pro brněnského výrobce pultruzních strojů. Pět jazyků, technický poptávkový dotazník s přílohami, napojení na CRM, strukturovaná data a Search Console.",
    headline:
      "Web v pěti jazycích, technický poptávkový dotazník a každá poptávka rovnou v CRM.",
    situation: [
      "Foller od roku 1998 vyrábí v Brně servoelektrické pultruzní stroje a průmyslové míchačky a prodává je výrobcům kompozitů po celém světě.",
      "Zákazník je technolog nebo nákupčí v zahraničí. Potřebuje rychle najít správný model, porovnat parametry a poslat poptávku s výkresem. A Google o webu skoro nevěděl: v září měl v indexu 4 stránky z 56.",
    ],
    work: [
      {
        area: "Web",
        items: [
          "Nový web ve vlastní „strojírenské“ identitě: tmavý technický vzhled, stroje na čistém pozadí.",
          "Pět jazykových verzí (čeština, angličtina, francouzština, španělština, němčina) včetně přeložených adres stránek.",
          "Stránka pro každý stroj (řada R 40 až R 240) a míchačky, srovnávací tabulka všech modelů a stránka výzkumu s publikacemi zakladatele.",
        ],
      },
      {
        area: "Poptávkový dotazník",
        items: [
          "Krátká poptávka pro rychlý dotaz a přepínač „komplexní poptávka“, který otevře technický dotazník: výztuž, pryskyřice, typ a rozměr profilu, výkon, rozpočet.",
          "Přílohy až 10 souborů včetně výkresů DWG, DXF a STEP. Soubory se po 90 dnech samy smažou.",
          "Každá poptávka přijde e-mailem a zároveň se založí jako lead v CRM (Raynet), s přílohami jako odkazy.",
        ],
      },
      {
        area: "SEO a Search Console",
        items: [
          "Technický audit a opravy: canonical, hreflang pro všech 5 jazyků, skutečné stránky 404, přesměrování www.",
          "Sitemapa odeslaná do Google Search Console a žádosti o indexaci klíčových stránek.",
          "V listopadu se objevila první zobrazení z neznačkových dotazů ve francouzštině a španělštině.",
        ],
      },
      {
        area: "AI vyhledávání",
        items: [
          "Strukturovaná data Organization, Product a BreadcrumbList, aby vyhledávače i AI asistenti věděli, co je výrobce a co produkt.",
          "Deset častých otázek v každém jazyce jako FAQPage. Odpovědi tak můžou přebírat AI odpovědi Googlu i chatboti.",
        ],
      },
    ],
    numbers: [
      { value: "5", label: "jazykových verzí" },
      { value: "65", label: "URL v sitemapě" },
      { value: "4 → 21", label: "stránek v indexu Google (září → listopad)" },
      { value: "100", label: "Lighthouse SEO (mobil)" },
    ],
    stack: ["Astro", "Tailwind", "Cloudflare Workers", "Workers KV", "Web3Forms", "Raynet API", "Search Console"],
  },
  {
    slug: "grig",
    name: "Grig",
    field: "E-shop s jedlým hmyzem",
    domains: ["grig.cz", "grig.sk"],
    shot: { src: "/weby/grig-sk-full.webp", width: 960, height: 3200 },
    metaTitle: "Grig — nový vzhled e-shopu a skoro 2× rychlejší načtení",
    metaDescription:
      "Case study: nový vzhled e-shopů grig.cz a grig.sk bez zásahu do košíku, slovenská verze generovaná z české, skoro dvojnásobná rychlost a vyčištěné přesměrování.",
    headline: "Nový vzhled dvou e-shopů bez zásahu do košíku a skoro dvakrát rychlejší načtení na mobilu.",
    situation: [
      "Grig je parta z Brna, která od roku 2015 prodává pochoutky z jedlého hmyzu na e-shopech v Česku a na Slovensku a ve stáncích v obchodních centrech.",
      "Web na šabloně neodpovídal odvážné značce, v testu na mobilu se homepage načítala přes 8 sekund a na slovenské verzi chyběly zákonné formuláře.",
    ],
    work: [
      {
        area: "Web",
        items: [
          "Nový vzhled celého e-shopu jako vrstva nad šablonou: homepage, kategorie, detail produktu, hlavička, dárkové balíčky a Náš příběh. Košík a objednávky zůstaly netknuté.",
          "Stránka prodejen s mapou všech 13 stánků a nová stránka Kontakty.",
          "Rychlé načítání: nový vzhled naběhne hned a starý web už neproblikne.",
        ],
      },
      {
        area: "Slovenská verze",
        items: [
          "Slovenský e-shop se generuje z české verze skriptem: přepočte měnu, upraví adresy a sortiment, přeloží texty podle slovníku a zkontroluje, že nezůstala čeština.",
          "Vygenerované chybějící formuláře pro odstoupení od smlouvy a reklamaci.",
        ],
      },
      {
        area: "SEO a kvalita",
        items: [
          "41 přesměrování starých a nefunkčních adres na obou e-shopech.",
          "Oprava titulků, drobečkové navigace a patičky s mrtvými odkazy.",
          "Automatické testy vykreslení a odkazů na obou verzích před každým nasazením.",
        ],
      },
    ],
    numbers: [
      { value: "8,0 → 4,3 s", label: "načtení homepage grig.cz na mobilu" },
      { value: "4,9 → 2,6 s", label: "načtení homepage grig.sk na mobilu" },
      { value: "2", label: "e-shopy z jednoho zdroje" },
      { value: "41", label: "opravených přesměrování" },
    ],
    stack: ["Shoptet", "vlastní JavaScript", "Node build skripty", "Leaflet + OpenStreetMap"],
  },
];

export const getCase = (slug: string) => CASES.find((c) => c.slug === slug);

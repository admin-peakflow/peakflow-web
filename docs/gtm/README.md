# Měření peakflow.cz: dataLayer → GA4, Sklik, Meta, TikTok (GTM-T4RFMPPX)

Web posílá všechny události do `dataLayer` (`lib/analytics.ts`,
`components/Analytics.tsx`). GTM je podle importu `peakflow-gtm-import.json`
rozdělí do GA4, Skliku (šablona **Seznam SEM** od Pavla Šabatky,
[GitHub](https://github.com/pavelsabatka/gtm-seznam-sem), v2.9), Meta Pixelu
a TikTok Pixelu. Marketingové pixely běží jen se souhlasem z cookie lišty
(Consent Mode v2, viz hlavní README).

## Události v dataLayer

| Událost | Kdy | Parametry |
|---|---|---|
| `virtual_page_view` | přechod mezi stránkami bez reloadu (Next.js). První načtení měří GTM sám | `page_path`, `page_title`, `page_type`, `page_location` |
| `view_item_list` | načtení /sluzby/ (3 služby), /weby/ (reference) | `ecommerce.items[]`, `ecommerce.item_list_name` |
| `view_item` | sekce služby na /sluzby/ je vidět; přepnutí pilíře na home; načtení /weby/ (služba Weby); reference na /weby/ je vidět; detail case study | `ecommerce.items[]` |
| `select_item` | klik „Celá case study“ na /weby/ | `ecommerce.items[]`, `item_list_name` = umístění |
| `cta_click` | klik na tlačítko (`.btn`, `data-cta`, „Discovery call“ v hlavičce) | `cta_text`, `cta_location`, `cta_url`, `cta_type` (`discovery_call` / `internal` / `button`) |
| `contact_click` | klik na e-mail / telefon | `contact_method` (`email` / `phone`), `contact_location` |
| `outbound_click` | odkaz ven (weby klientů na /weby/) | `link_url`, `link_domain`, `link_text`, `link_location` |
| `nav_click` | navigace v hlavičce, patičce, kotvy na stránce | `link_text`, `link_url`, `link_location` |
| `faq_open` | otevření otázky v FAQ | `faq_question` |
| `contact_form_start` | první interakce s formulářem (1× za stránku) | `form_name`, `lead_source` |
| `roi_calculator_use` | první posun ROI kalkulačky (1× za stránku) | `calculator` |
| `generate_lead` | formulář úspěšně odeslán | `form_name`, `lead_source`, `lead_topic` |
| `cookie_consent_update` | volba v cookie liště | `consent_analytics`, `consent_marketing` |

**„Produkty“** jsou služby (`sluzba-automatizace`, `sluzba-analytika`,
`sluzba-crm`, `sluzba-weby`) a reference (`reference-<slug>` z `lib/cases.ts`).
Formát je GA4 ecommerce: `item_id`, `item_name`, `item_category`
(Služba / Reference), u referencí `item_category2` = obor. Bez ceny.

**Umístění** (`*_location`): `header`, `footer`, `hero`, `final_cta`, nebo `id`
sekce (`cena`, `faq`, `dreamy`…), jinak `main`.

**Žádné osobní údaje.** Jméno, e-mail, telefon ani text zprávy do dataLayer nejdou.

### Atributy (nový klik bez psaní kódu)

| Atribut | Efekt |
|---|---|
| `data-cta` | klik = `cta_click` (u třídy `.btn` automaticky) |
| `data-track-item="<id>"` | prvek je vidět = `view_item`. U `<button>` klik = `view_item` |
| `data-track-select="<id>"` | klik = `select_item` |
| `data-track-location="<název>"` | přepíše umístění kliku |
| `data-track-label="<text>"` | přepíše text kliku |
| `data-track-form="<název>"` | formulář: `contact_form_start` |
| `data-track-calculator="<název>"` | `roi_calculator_use` |

Nový parametr: přidat do `PARAM_KEYS` v `lib/analytics.ts` a do GTM (proměnná
`DLV – <název>` + tag). Gate zkontroluje, že proměnná v importu existuje.

## Rozdělení do pixelů

| Událost | GA4 | Sklik (SEM) | Meta | TikTok |
|---|---|---|---|---|
| první načtení | Google tag (už v kontejneru) | PageView | PageView | page |
| `virtual_page_view` | **sám** (rozšířené měření, history) | **PageView** | **sama** (history) | **sám** (history) |
| `view_item` | view_item (ecommerce) | ViewContent | ViewContent | ViewContent |
| `view_item_list` | view_item_list | — | — | — |
| `select_item` | select_item | — | — | — |
| `cta_click` | cta_click | — | `CTAClick` (vlastní) | ClickButton |
| `contact_click` | contact_click | Contact | Contact | Contact |
| `outbound_click` | outbound_click | — | — | — |
| `nav_click` | nav_click | — | — | — |
| `faq_open` | faq_open | — | — | — |
| `contact_form_start` | contact_form_start | — | `ContactFormStart` (vlastní) | — |
| `roi_calculator_use` | roi_calculator_use | — | `RoiCalculatorUse` (vlastní) | — |
| `generate_lead` | generate_lead | Lead | Lead | SubmitForm |

Přechody bez reloadu GA4, Meta a TikTok zachytí samy (ověřeno na živém webu
2026-11-19), proto jim `virtual_page_view` neposíláme, jinak by pageviewy byly
dvakrát. Sklik je sám nevidí, proto ho dostává.

Souhlas: Meta a TikTok tagy vyžadují `ad_storage`. Sklik a GA4 čtou Consent
Mode samy (bez souhlasu měří bez cookies).

> [!warning] Základní tagy Meta a TikTok: spouštění „Neomezeně“
> GTM do „Jednou na stránku“ započítá i pokus zablokovaný souhlasem. Po
> „Přijmout vše“ by se pak tag na té stránce nespustil a lead z landing page by
> se ztratil (ověřeno 2026-11-18). Dvojí inicializaci hlídá kód tagu.

## Import (aktualizace kontejneru)

1. GTM → Správce → **Importovat kontejner** → `peakflow-gtm-import.json` →
   nový pracovní prostor → **Sloučit** → **Přepsat konfliktní tagy, triggery
   a proměnné**. Stávající tagy se stejným názvem se tím aktualizují, mimo jiné
   oprava „Neomezeně“. GA4 Google tag a nic dalšího, co v importu není,
   zůstane beze změny.
2. Náhled (Preview) na https://peakflow.cz s „Přijmout vše“: projít home →
   přepnout pilíř → Služby → e-mail na Kontaktu → odeslat formulář. U každé
   události zkontrolovat tagy podle tabulky výše.
3. **Odeslat → Publikovat.**
4. **GA4 → Správce → Vlastní definice:** zaregistrovat jako dimenze ve
   výchozím rozsahu události `cta_text`, `cta_location`, `cta_type`,
   `contact_method`, `link_domain`, `link_location`, `faq_question`,
   `form_name`, `lead_source`, `lead_topic`. Bez toho je v reportech neuvidíte.
5. **Konverze:** GA4 `generate_lead` jako klíčová událost (volitelně
   `contact_click`). Sklik: Lead a Contact. Meta: Lead, Contact. TikTok:
   SubmitForm, Contact.

ID v importu: Sklik SEM `hoa69hytujbepm722vt0lhbi`, Meta `2260552841175444`,
TikTok `DBUUD7RC77UCDH70SM80`. Nejsou tajná, každý je vidí ve zdrojovém kódu
stránky. Když ID obsahuje `DOPLNIT` nebo nemá správný tvar, tagy nic nepošlou.

## Když import šablonu nevezme

Šablona je v importu jako vlastní (bez vazby na galerii). Když import u Sklik
tagů hlásí chybu: Šablony → Hledat v galerii → „Seznam SEM“ (pavelsabatka) →
Přidat a Sklik tagy založit ručně: Seznam ID = `{{Sklik SEM ID}}`, „I use
Consent Mode v2“ zapnuto, blokovací trigger „Blokace – chybí Sklik ID“.
ViewContent: Content Type `product`, Products `{{DLV – ecommerce.items}}`.

## CSP

Web dnes Content-Security-Policy nemá. Kdyby se přidávala, je potřeba povolit
`l.seznam.cz`, `*.seznam.cz`, `connect.facebook.net`, `*.facebook.com`,
`analytics.tiktok.com` a domény Googlu.

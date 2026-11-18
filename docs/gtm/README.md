# GTM — Sklik, Meta Pixel, TikTok Pixel (kontejner GTM-T4RFMPPX)

`peakflow-gtm-import.json` je import pro Google Tag Manager. Přidá tagy,
triggery, proměnné a šablonu **Seznam SEM** od Pavla Šabatky
([GitHub](https://github.com/pavelsabatka/gtm-seznam-sem), v2.9, commit
`598f87a`). Na webu musí běžet lišta a Consent Mode v2 z tohohle repa, jinak
marketingové tagy nedostanou souhlas.

## Co je v importu

| Tag | Typ | Spouští se | Souhlas |
|---|---|---|---|
| Sklik – SEM – PageView | šablona Seznam SEM | All Pages | šablona čte Consent Mode v2 sama (i jeho pozdější změnu) |
| Sklik – SEM – Lead | šablona Seznam SEM | `generate_lead` | dtto |
| Meta Pixel – základ + PageView | Custom HTML | All Pages + `cookie_consent_update`, max. 1× za stránku | `ad_storage` |
| Meta Pixel – Lead | Custom HTML | `generate_lead` | `ad_storage` |
| TikTok Pixel – základ + page | Custom HTML | All Pages + `cookie_consent_update`, max. 1× za stránku | `ad_storage` |
| TikTok Pixel – SubmitForm | Custom HTML | `generate_lead` | `ad_storage` |
| GA4 – generate_lead | GA4 event (`G-87RT5RRBRR`) | `generate_lead` | Consent Mode (vestavěný) |

Proměnné (konstanty, vyplněné 2026-11-18):

| Proměnná | Hodnota |
|---|---|
| `Sklik SEM ID` | `hoa69hytujbepm722vt0lhbi` |
| `Meta Pixel ID` | `2260552841175444` |
| `TikTok Pixel ID` | `DBUUD7RC77UCDH70SM80` |

Dál `DLV – lead_source` a `DLV – lead_topic`. ID pixelů nejsou tajná, každý je
uvidí ve zdrojovém kódu stránky.

**Pojistka:** když ID obsahuje `DOPLNIT` nebo nemá správný tvar, tag nic
nepošle. Meta a TikTok tag ID kontrolují samy, Sklik blokuje trigger „Blokace –
chybí Sklik ID“.

## Postup

1. GTM → Správce → **Importovat kontejner** → soubor `peakflow-gtm-import.json`
   → pracovní prostor *nový* („Sklik Meta TikTok“) → **Sloučit** → **Přejmenovat
   konfliktní** (nic stávajícího se nepřepíše).
2. Zkontrolovat, že tři ID v proměnných odpovídají tabulce výše. Kde je najít:
   - **Sklik SEM ID:** Sklik → Nastavení účtu → *Zobrazit SEM kód*.
   - **Meta Pixel ID:** Meta Events Manager → Datové zdroje → číselné ID.
   - **TikTok Pixel ID:** TikTok Ads Manager → Events → Web Events → ID pixelu.
3. **Náhled (Preview)** na https://peakflow.cz:
   - před souhlasem: Sklik PageView běží (bez souhlasu, jen se `sid` neukládá),
     Meta a TikTok jsou „Blocked by consent“,
   - po „Přijmout vše“: event `cookie_consent_update` → Meta a TikTok se spustí,
   - po odeslání formuláře: `generate_lead` → Sklik Lead, Meta Lead, TikTok
     SubmitForm, GA4 generate_lead.
4. **Odeslat → Publikovat.**
5. V GA4 označit `generate_lead` jako klíčovou událost. Ve Sklik, Meta a TikTok
   z eventu Lead / SubmitForm udělat konverzi.

## Když import šablonu nevezme

Šablona je v importu jako vlastní šablona (bez vazby na galerii, takže se
sama neaktualizuje). Když import u Sklik tagů hlásí chybu: Šablony → Hledat
v galerii → „Seznam SEM“ (autor pavelsabatka) → Přidat. Pak oba Sklik tagy
založit ručně podle tabulky výše: Seznam ID = `{{Sklik SEM ID}}`, Event Name
PageView / Lead, „I use Consent Mode v2“ zapnuto, blokovací trigger
„Blokace – chybí Sklik ID“.

## CSP

Web dnes Content-Security-Policy nemá. Kdyby se přidávala, je potřeba povolit
`l.seznam.cz`, `*.seznam.cz`, `connect.facebook.net`, `*.facebook.com`,
`analytics.tiktok.com` a domény Googlu.

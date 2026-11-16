import { gtmId } from "@/lib/site";

/**
 * Google Tag Manager — oficiální snippet, vložený jako inline `<script>`
 * v `<head>`.
 *
 * Proč ne `<script async src=".../gtm.js?id=...">` natvrdo: samotné načtení
 * kontejneru nestačí. GTM spouští triggery „Initialization", „Consent
 * Initialization" a „All Pages" na základě eventu `gtm.js` v `dataLayer`.
 * Když se ten event nepushne, kontejner se načte, ale nic nespustí. Proto ten
 * `w[l].push({'gtm.start': ..., event: 'gtm.js'})` před vložením scriptu.
 *
 * `gtag()` z gtag.js snippetu tu schválně není — to je přímá instalace GA4
 * *místo* GTM, ne doplněk k němu. Když jde měření přes kontejner, GA4 se
 * konfiguruje tagem v GTM, ne druhým skriptem na stránce.
 *
 * Proč `dangerouslySetInnerHTML` a ne `next/script`: tenhle web je statický
 * export. `next/script` se `strategy="afterInteractive"` se do HTML nedostane
 * jako `<script>` tag — skončí jen v React payloadu a spustí se až po
 * hydrataci, tedy zbytečně pozdě a závisle na JS bundlu. Inline tag v `<head>`
 * je v HTML hned a GTM naběhne nejdřív, jak může.
 */
export function GoogleTagManager() {
  if (!gtmId) return null;

  const snippet =
    `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});` +
    `var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';` +
    `j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;` +
    `f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`;

  return <script dangerouslySetInnerHTML={{ __html: snippet }} />;
}

/**
 * Fallback pro prohlížeče s vypnutým JavaScriptem. Patří na začátek `<body>`.
 * Bez JS neumí GTM spouštět tagy, iframe jen zaznamená zobrazení stránky.
 */
export function GoogleTagManagerNoScript() {
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

import { CONSENT_COOKIE } from "@/lib/consent";

/**
 * Výchozí stav Google Consent Mode v2 — musí být v `<head>` PŘED GTM.
 *
 * Nový návštěvník: všechno kromě nezbytného je `denied`. GA4 pak posílá jen
 * anonymní pingy bez cookies, marketingové tagy (Sklik, Meta, TikTok) v GTM
 * čekají na souhlas.
 *
 * Vracející se návštěvník: skript si přečte uloženou volbu z cookie lišty
 * (`cc_cookie`) a výchozí stav nastaví rovnou podle ní. Jinak by se lišta
 * (React komponenta) načetla až po hydrataci, GTM by mezitím spustil
 * „All Pages" s `denied` a první pageview by se ztratil.
 *
 * `gtag()` tady jen zapisuje příkazy do `dataLayer` (tak to Consent Mode
 * vyžaduje). Nenačítá gtag.js, takže to není druhá instalace GA4.
 *
 * Inline přes `dangerouslySetInnerHTML` ze stejného důvodu jako GTM snippet:
 * u statického exportu se `next/script` do HTML jako `<script>` nedostane.
 */
export function ConsentModeDefault() {
  const snippet =
    `(function(){window.dataLayer=window.dataLayer||[];` +
    `function gtag(){window.dataLayer.push(arguments);}window.gtag=window.gtag||gtag;` +
    `var c=[];try{var m=document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/);` +
    `if(m){var v=JSON.parse(decodeURIComponent(m[1]));if(v&&v.categories)c=v.categories;}}catch(e){}` +
    `var a=c.indexOf('analytics')>-1?'granted':'denied',k=c.indexOf('marketing')>-1?'granted':'denied';` +
    `gtag('consent','default',{ad_storage:k,ad_user_data:k,ad_personalization:k,analytics_storage:a,` +
    `functionality_storage:'granted',security_storage:'granted',wait_for_update:500});` +
    `gtag('set','ads_data_redaction',k==='denied');})();`;

  return <script id="consent-default" dangerouslySetInnerHTML={{ __html: snippet }} />;
}

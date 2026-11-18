/**
 * Souhlas s cookies — sdílená nastavení pro inline výchozí stav
 * (`ConsentModeDefault`) a pro lištu (`CookieConsentBanner`).
 *
 * Kategorie lišty → signály Google Consent Mode v2:
 *
 * | kategorie   | Consent Mode                                       | co se tím spouští v GTM        |
 * |-------------|----------------------------------------------------|--------------------------------|
 * | necessary   | functionality_storage, security_storage (vždy)     | —                              |
 * | analytics   | analytics_storage                                  | GA4                            |
 * | marketing   | ad_storage, ad_user_data, ad_personalization       | Sklik (SEM), Meta Pixel, TikTok |
 *
 * Když se tu změní název kategorie nebo cookie, musí se změnit i v GTM
 * (event `cookie_consent_update`) — viz `docs/gtm/README.md`.
 */

/** Cookie, do které vanilla-cookieconsent ukládá volbu návštěvníka. */
export const CONSENT_COOKIE = "cc_cookie";

/** Event v `dataLayer` po každé změně souhlasu. Na něj čekají tagy v GTM. */
export const CONSENT_EVENT = "cookie_consent_update";

export type ConsentState = "granted" | "denied";

export function consentModeFor(analytics: boolean, marketing: boolean) {
  const a: ConsentState = analytics ? "granted" : "denied";
  const m: ConsentState = marketing ? "granted" : "denied";
  return {
    ad_storage: m,
    ad_user_data: m,
    ad_personalization: m,
    analytics_storage: a,
  };
}

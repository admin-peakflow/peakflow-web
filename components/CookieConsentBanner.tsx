"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "./CookieConsentBanner.css";
import { CONSENT_COOKIE, CONSENT_EVENT, consentModeFor } from "@/lib/consent";

/**
 * Cookie lišta — open-source vanilla-cookieconsent v3 (MIT, orestbida).
 * Žádná placená CMP, žádný externí skript, všechno jde z našeho buildu.
 *
 * Co dělá:
 * 1. Při první volbě a při každé změně pošle `gtag('consent', 'update', …)`
 *    a do `dataLayer` event `cookie_consent_update`. Na ten event v GTM čekají
 *    marketingové tagy, aby naběhly hned po souhlasu, bez reloadu.
 * 2. Při odvolání souhlasu smaže cookies dané kategorie a obnoví stránku
 *    (už načtený pixel jinak nejde „vypnout").
 *
 * Výchozí stav pro GTM nastavuje `ConsentModeDefault` v `<head>`, ne tahle
 * komponenta — ta se načte až po hydrataci.
 *
 * Odkaz „Nastavení cookies" v patičce otevírá předvolby přes atribut
 * `data-cc="show-preferencesModal"`, knihovna ho naváže sama.
 */
export function CookieConsentBanner() {
  useEffect(() => {
    const push = () => {
      const analytics = CookieConsent.acceptedCategory("analytics");
      const marketing = CookieConsent.acceptedCategory("marketing");
      const w = window as unknown as {
        dataLayer: unknown[];
        gtag?: (...args: unknown[]) => void;
      };
      w.dataLayer = w.dataLayer || [];
      w.gtag?.("consent", "update", consentModeFor(analytics, marketing));
      w.gtag?.("set", "ads_data_redaction", !marketing);
      w.dataLayer.push({
        event: CONSENT_EVENT,
        consent_analytics: analytics,
        consent_marketing: marketing,
      });
    };

    CookieConsent.run({
      cookie: { name: CONSENT_COOKIE, expiresAfterDays: 182 },
      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom left",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: { layout: "box", equalWeightButtons: true },
      },
      onFirstConsent: push,
      onChange: push,
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {
          autoClear: { cookies: [{ name: /^_ga/ }], reloadPage: true },
        },
        marketing: {
          autoClear: {
            cookies: [
              { name: /^_gcl/ },
              { name: "_fbp" },
              { name: "_fbc" },
              { name: "_ttp" },
              { name: "_tt_enable_cookie" },
            ],
            reloadPage: true,
          },
        },
      },
      language: {
        default: "cs",
        translations: {
          cs: {
            consentModal: {
              title: "Cookies na PeakFlow.cz",
              description:
                "Nezbytné cookies web potřebuje, aby fungoval. S vaším souhlasem použijeme i analytické cookies (zjistíme, co na webu funguje) a marketingové cookies (Sklik, Meta, TikTok — abychom vám ukazovali relevantní reklamu). Volbu můžete kdykoli změnit v patičce webu.",
              acceptAllBtn: "Přijmout vše",
              acceptNecessaryBtn: "Jen nezbytné",
              showPreferencesBtn: "Nastavení",
            },
            preferencesModal: {
              title: "Nastavení cookies",
              acceptAllBtn: "Přijmout vše",
              acceptNecessaryBtn: "Jen nezbytné",
              savePreferencesBtn: "Uložit volbu",
              closeIconLabel: "Zavřít",
              sections: [
                {
                  description:
                    "Vyberte, které cookies smíme použít. Nezbytné jsou zapnuté vždy, ostatní jen s vaším souhlasem. Souhlas můžete kdykoli odvolat přes „Nastavení cookies“ v patičce.",
                },
                {
                  title: "Nezbytné",
                  description: "Bez nich web nefunguje. Ukládají například vaši volbu cookies.",
                  linkedCategory: "necessary",
                  cookieTable: {
                    headers: { name: "Cookie", provider: "Poskytovatel", purpose: "Účel" },
                    body: [
                      {
                        name: CONSENT_COOKIE,
                        provider: "PeakFlow",
                        purpose: "Uloží vaši volbu cookies (6 měsíců)",
                      },
                    ],
                  },
                },
                {
                  title: "Analytické",
                  description:
                    "Anonymní statistiky návštěvnosti, abychom věděli, které stránky jsou užitečné a co vylepšit.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    headers: { name: "Cookie", provider: "Poskytovatel", purpose: "Účel" },
                    body: [
                      {
                        name: "_ga, _ga_*",
                        provider: "Google Analytics",
                        purpose: "Rozlišení návštěvníků a relací",
                      },
                    ],
                  },
                },
                {
                  title: "Marketingové",
                  description:
                    "Měření výkonu reklam a zobrazování relevantní reklamy na jiných webech a sítích.",
                  linkedCategory: "marketing",
                  cookieTable: {
                    headers: { name: "Cookie", provider: "Poskytovatel", purpose: "Účel" },
                    body: [
                      {
                        name: "cookies Seznamu",
                        provider: "Seznam.cz (Sklik)",
                        purpose: "Měření konverzí a retargeting",
                      },
                      {
                        name: "_fbp, _fbc",
                        provider: "Meta (Facebook, Instagram)",
                        purpose: "Měření konverzí a retargeting",
                      },
                      {
                        name: "_ttp",
                        provider: "TikTok",
                        purpose: "Měření konverzí a retargeting",
                      },
                      {
                        name: "_gcl_*",
                        provider: "Google Ads",
                        purpose: "Měření konverzí",
                      },
                    ],
                  },
                },
                {
                  title: "Dotazy",
                  description:
                    'Ke zpracování cookies a osobních údajů nám napište na <a href="mailto:info@peakflow.cz">info@peakflow.cz</a>.',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}

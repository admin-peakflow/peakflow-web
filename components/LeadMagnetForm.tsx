"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { MAIN_CTA, WEB3FORMS_ENDPOINT, magnet, web3formsKey } from "@/lib/site";
import styles from "./LeadMagnetForm.module.css";

type Status = "idle" | "sending" | "sent" | "error";

type Props = {
  /** Kde formulář je (homepage, /katalog/). Jde do předmětu e-mailu a do měření. */
  location: string;
  /** Tmavé pozadí kolem formuláře. */
  onDark?: boolean;
};

/**
 * Lákadlo za e-mail (vzor 500leadu.cz: jen jedno pole). Po odeslání se hned
 * ukáže odkaz na PDF. Když se e-mail nepodaří uložit, PDF dostane návštěvník
 * stejně, jen o kontakt přijdeme.
 *
 * E-mail jde přes Web3Forms na info@peakflow.cz. Navazující e-maily (texty ve
 * vaultu) jen těm, kdo zaškrtli souhlas (zákon 480/2004 Sb., výchozí stav
 * nezaškrtnuto). Posílá je zatím člověk, dokud nebude e-mailový nástroj.
 * Měření: `generate_lead` s `form_name: "katalog"`, takže se v GA4 dá oddělit
 * od poptávek z kontaktního formuláře.
 */
export function LeadMagnetForm({ location, onDark = false }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("botcheck")) {
      setStatus("sent");
      return;
    }

    const email = String(data.get("email") ?? "").trim();
    const consent = data.get("consent") === "on";
    setStatus("sending");
    try {
      if (!web3formsKey) throw new Error("Chybí NEXT_PUBLIC_WEB3FORMS_KEY");
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Stažení katalogu automatizací${consent ? " + souhlas s e-maily" : ""} — ${email}`,
          from_name: "PeakFlow.cz",
          replyto: email,
          email,
          message: consent
            ? `Stáhl(a) si katalog „${magnet.title}“ (${location}) a SOUHLASÍ s e-maily. Za 2 dny poslat 1. navazující e-mail.`
            : `Stáhl(a) si katalog „${magnet.title}“ (${location}). Souhlas s e-maily NEDAL(A), navazující e-maily neposílat.`,
          consent: consent ? "ano" : "ne",
          source: `katalog-${location}`,
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;
      if (!response.ok || !result?.success) {
        throw new Error(result?.message ?? `HTTP ${response.status}`);
      }

      track("generate_lead", {
        form_name: "katalog",
        lead_source: `katalog-${location}`,
        lead_topic: "Katalog automatizací",
      });
      setStatus("sent");
    } catch (error) {
      console.error("[PeakFlow] Uložení e-mailu ke katalogu selhalo:", error);
      setStatus("error");
    }
  }

  const tone = onDark ? styles.onDark : "";

  if (status === "sent" || status === "error") {
    return (
      <div className={`${styles.done} ${tone}`} role="status">
        <strong className={styles.doneTitle}>
          {status === "sent" ? "Hotovo, katalog je váš." : "E‑mail se nepodařilo uložit, katalog si ale stáhněte."}
        </strong>
        <a href={magnet.pdf} className={`btn btnPrimary ${styles.download}`} target="_blank" rel="noopener">
          Stáhnout katalog (PDF)
        </a>
        <p className={styles.next}>
          Chcete to probrat rovnou na vašich procesech?{" "}
          <Link href="/kontakt/" data-cta>
            {MAIN_CTA}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form className={`${styles.form} ${tone}`} onSubmit={handleSubmit} data-track-form="katalog">
      <label className={styles.label} htmlFor={`magnet-email-${location}`}>
        Váš e‑mail
      </label>
      <div className={styles.row}>
        <input
          id={`magnet-email-${location}`}
          className={styles.input}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jan@firma.cz"
        />
        <button type="submit" className={styles.submit} disabled={status === "sending"}>
          {status === "sending" ? "Odesílám…" : "Chci katalog zdarma"}
        </button>
      </div>
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="srOnly"
      />
      <label className={styles.consent}>
        <input type="checkbox" name="consent" />
        <span>Pošlete mi i 3 krátké e‑maily s příklady z praxe. Odhlásit se můžu kdykoli.</span>
      </label>
      <p className={styles.legal}>PDF si stáhnete hned po odeslání. E‑mail nikomu nepředáme.</p>
    </form>
  );
}

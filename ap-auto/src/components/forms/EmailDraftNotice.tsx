"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site-config";

export function EmailDraftNotice({ subject, body }: { subject: string; body: string }) {
  const [copyMessage, setCopyMessage] = useState("");

  async function copyDetails() {
    try {
      await navigator.clipboard.writeText(`Subject: ${subject}\r\n\r\n${body}`);
      setCopyMessage("Subject and message details copied. Use the subject line and paste the message into your email.");
    } catch {
      setCopyMessage("Copy was unavailable. Select and copy the form details manually, then paste them into your email.");
    }
  }

  return (
    <div className="note" role="status">
      <p>
        Your default email application should open with a draft. If it does not, start a message to{" "}
        {siteConfig.email.confirmed && siteConfig.email.value
          ? <><a href={`mailto:${siteConfig.email.value}`}>{siteConfig.email.value}</a> and paste the details below.</>
          : "the company email address (not configured on this website yet)"}{" "}
        This website does not send or store your message.
      </p>
      <button type="button" className="btn btn--outline" onClick={copyDetails}>Copy email details</button>
      {copyMessage && <p aria-live="polite">{copyMessage}</p>}
      <details>
        <summary>View email details to copy manually</summary>
        <p><strong>Subject:</strong> {subject}</p>
        <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{body}</pre>
      </details>
    </div>
  );
}

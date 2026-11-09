"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site-config";
import { buildMailtoHref } from "@/lib/mailto";
import { validateContact } from "@/lib/validation";
import { EmailDraftNotice } from "@/components/forms/EmailDraftNotice";

const initial = {
  name: "",
  company: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  privacyConsent: false,
};

export function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draftBody, setDraftBody] = useState("");
  const [draftSubject, setDraftSubject] = useState("");

  const update = (key: keyof typeof initial) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = key === "privacyConsent" ? (event.target as HTMLInputElement).checked : event.target.value;
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    const body = [
      "Contact message for A.P. Auto Components",
      "",
      `Name: ${values.name}`,
      `Company: ${values.company || "Not provided"}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || "Not provided"}`,
      `Subject: ${values.subject}`,
      "",
      "Message:",
      values.message,
      "",
      `Privacy consent: ${values.privacyConsent ? "Yes" : "No"}`,
    ].join("\n");
    const subject = `Website contact: ${values.subject}`;
    setDraftSubject(subject);
    setDraftBody(body);
    if (siteConfig.email.confirmed && siteConfig.email.value) {
      window.location.href = buildMailtoHref(siteConfig.email.value, subject, body);
    }
  };
  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 720 }}>
      {draftBody && <EmailDraftNotice subject={draftSubject} body={draftBody} />}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" className="field" value={values.name} onChange={update("name")} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "contact-name-error" : undefined} />
        {errors.name && <p id="contact-name-error" role="alert" style={{ color: "#B42318" }}>{errors.name}</p>}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" className="field" value={values.company} onChange={update("company")} />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" type="email" className="field" value={values.email} onChange={update("email")} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "contact-email-error" : undefined} />
        {errors.email && <p id="contact-email-error" role="alert" style={{ color: "#B42318" }}>{errors.email}</p>}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="contact-phone">Phone</label>
        <input id="contact-phone" type="tel" autoComplete="tel" inputMode="tel" className="field" value={values.phone} onChange={update("phone")} aria-invalid={errors.phone ? true : undefined} aria-describedby={errors.phone ? "contact-phone-error" : undefined} />
        {errors.phone && <p id="contact-phone-error" role="alert" style={{ color: "#B42318" }}>{errors.phone}</p>}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="contact-subject">Subject</label>
        <input id="contact-subject" className="field" value={values.subject} onChange={update("subject")} aria-invalid={errors.subject ? true : undefined} aria-describedby={errors.subject ? "contact-subject-error" : undefined} />
        {errors.subject && <p id="contact-subject-error" role="alert" style={{ color: "#B42318" }}>{errors.subject}</p>}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" className="field" rows={6} value={values.message} onChange={update("message")} aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? "contact-message-error" : undefined} />
        {errors.message && <p id="contact-message-error" role="alert" style={{ color: "#B42318" }}>{errors.message}</p>}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input id="contact-privacyConsent" type="checkbox" checked={values.privacyConsent} onChange={update("privacyConsent")} aria-invalid={errors.privacyConsent ? true : undefined} aria-describedby={errors.privacyConsent ? "contact-privacy-error" : undefined} /> I agree to A.P. Auto Components using these details to respond to my enquiry.
        </label>
        {errors.privacyConsent && <p id="contact-privacy-error" role="alert" style={{ color: "#B42318" }}>{errors.privacyConsent}</p>}
      </div>
      <p className="note">Selecting “Open email draft” asks your default email application to open. Review and send the message there; this website does not submit or store your message.</p>
      <button type="submit" className="btn btn--primary">Open email draft</button>
    </form>
  );
}

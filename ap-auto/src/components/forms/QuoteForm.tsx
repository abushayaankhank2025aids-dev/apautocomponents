"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site-config";
import { MAX_UPLOAD_SIZE_MB } from "@/config/upload-limits";
import { EmailDraftNotice } from "@/components/forms/EmailDraftNotice";
import { buildMailtoHref } from "@/lib/mailto";
import { validateEnquiry, validateFile, type FormErrors, type FormValues } from "@/lib/validation";

const FILE_ACCEPT = ".pdf,.jpg,.jpeg,.png";
const SERVICES = [
  { value: "cnc-turning", label: "CNC Turning Job Work" },
  { value: "cnc-machining", label: "CNC Machining Service" },
  { value: "other", label: "Other / Custom Requirement" },
];
const empty: FormValues = { fullName: "", companyName: "", email: "", phone: "", country: "", serviceType: "", productName: "",
  quantity: "", material: "", dimensions: "", description: "", preferredContactMethod: "", privacyConsent: false };

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {children}
      {error && <p id={`${id}-err`} role="alert" style={{ color: "#B42318", margin: ".25rem 0 0" }}>{error}</p>}
    </div>
  );
}

export function QuoteForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") ?? "";
  const initialProduct = searchParams.get("product") ?? "";
  const [v, setV] = useState<FormValues>({
    ...empty,
    serviceType: SERVICES.some((s) => s.value === initialService) ? initialService : "",
    productName: initialProduct,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [file, setFile] = useState<File | null>(null);
  const [draftBody, setDraftBody] = useState("");
  const [draftSubject, setDraftSubject] = useState("");

  const set = (k: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV({ ...v, [k]: e.target.value });
  const props = (k: keyof FormValues, _label = "", required = false) => ({
    id: k, "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined,
    "aria-required": required || undefined, className: "field", value: v[k] as string, onChange: set(k),
  });

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f) { const msg = validateFile(f); if (msg) { setErrors({ ...errors, file: msg }); setFile(null); e.target.value = ""; return; } }
    setErrors({ ...errors, file: undefined }); setFile(f);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateEnquiry(v);
    setErrors(found);
    if (Object.keys(found).length) { document.getElementById(Object.keys(found)[0])?.focus(); return; }
    const serviceLabel = SERVICES.find((service) => service.value === v.serviceType)?.label ?? v.serviceType;
    const body = [
      "Quotation request for A.P. Auto Components",
      "",
      `Full name: ${v.fullName}`,
      `Company name: ${v.companyName}`,
      `Business email: ${v.email || "Not provided"}`,
      `Phone number: ${v.phone}`,
      `Country: ${v.country || "Not provided"}`,
      `Service required: ${serviceLabel}`,
      `Component or product name: ${v.productName || "Not provided"}`,
      `Required quantity: ${v.quantity || "Not provided"}`,
      `Material: ${v.material || "Not provided"}`,
      `Component dimensions: ${v.dimensions || "Not provided"}`,
      "",
      "Technical description:",
      v.description,
      "",
      `Preferred contact method: ${v.preferredContactMethod}`,
      `Privacy consent: ${v.privacyConsent ? "Yes" : "No"}`,
      `Drawing or document: ${file ? `${file.name} (please attach manually in your email application)` : "None selected"}`,
    ].join("\n");
    const subject = `Quotation request: ${serviceLabel} — ${v.companyName}`;
    setDraftSubject(subject);
    setDraftBody(body);
    if (siteConfig.email.confirmed && siteConfig.email.value) {
      window.location.href = buildMailtoHref(siteConfig.email.value, subject, body);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{ maxWidth: 720 }}>
      {draftBody && <EmailDraftNotice subject={draftSubject} body={draftBody} />}
      <Field id="fullName" label="Full name" required error={errors.fullName}><input {...props("fullName", "", true)} autoComplete="name" /></Field>
      <Field id="companyName" label="Company name" required error={errors.companyName}><input {...props("companyName", "", true)} autoComplete="organization" /></Field>
      <Field id="phone" label="Phone number" required error={errors.phone}><input {...props("phone", "", true)} type="tel" autoComplete="tel" inputMode="tel" /></Field>
      <Field id="email" label="Business email" error={errors.email}><input {...props("email")} type="email" autoComplete="email" /></Field>
      <Field id="country" label="Country" error={errors.country}><input {...props("country")} autoComplete="country-name" /></Field>
      <Field id="serviceType" label="Service required" required error={errors.serviceType}>
        <select {...props("serviceType", "", true)}><option value="">Select a service</option>
          {SERVICES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}</select></Field>
      <Field id="productName" label="Component or product name"><input {...props("productName")} /></Field>
      <Field id="quantity" label="Required quantity"><input {...props("quantity")} /></Field>
      <Field id="material" label="Material"><input {...props("material")} /></Field>
      <Field id="dimensions" label="Component dimensions"><input {...props("dimensions")} /></Field>
      <Field id="description" label="Technical description" required error={errors.description}><textarea {...props("description", "", true)} rows={5} /></Field>
      <Field id="file" label={`Drawing or sample (PDF, JPG, PNG, up to ${MAX_UPLOAD_SIZE_MB} MB)`} error={errors.file}>
        <input id="file" type="file" accept={FILE_ACCEPT} onChange={onFile} className="field"
          aria-invalid={errors.file ? true : undefined} aria-describedby={errors.file ? "file-err" : undefined} /></Field>
      <p className="note">Files are not uploaded by this website. Attach any drawing or document manually after your email application opens{file ? ` (${file.name} is selected)` : ""}.</p>
      <Field id="preferredContactMethod" label="Preferred contact method" required error={errors.preferredContactMethod}>
        <select {...props("preferredContactMethod", "", true)}><option value="">Select one</option>
          <option value="phone">Phone call</option><option value="email">Email</option></select></Field>
      <div style={{ marginBottom: "1rem" }}>
        <label><input id="privacyConsent" type="checkbox" checked={v.privacyConsent}
          aria-invalid={errors.privacyConsent ? true : undefined} aria-describedby={errors.privacyConsent ? "privacyConsent-err" : undefined}
          onChange={(e) => setV({ ...v, privacyConsent: e.target.checked })} /> I agree to A.P. Auto Components using these details to respond to my enquiry. <span aria-hidden="true">*</span></label>
        {errors.privacyConsent && <p id="privacyConsent-err" role="alert" style={{ color: "#B42318", margin: ".25rem 0 0" }}>{errors.privacyConsent}</p>}
      </div>
      <p className="note">Selecting “Open email draft” asks your default email application to open. Review and send the message there; this website does not submit or store your enquiry.</p>
      <button type="submit" className="btn btn--primary">Open email draft</button>
    </form>
  );
}

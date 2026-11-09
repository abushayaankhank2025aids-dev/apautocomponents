import { MAX_UPLOAD_SIZE_MB } from "@/config/upload-limits";

export type FormValues = {
  fullName: string; companyName: string; email: string; phone: string; country: string; serviceType: string;
  productName: string; quantity: string; material: string; dimensions: string; description: string;
  preferredContactMethod: string; privacyConsent: boolean;
};
export type FormErrors = Partial<Record<keyof FormValues | "file", string>>;

const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

export function validateFile(file: File): string | undefined {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) return "Upload a PDF, JPG or PNG file.";
  if (file.size > MAX_UPLOAD_SIZE_MB * 1024 * 1024) return `File must be ${MAX_UPLOAD_SIZE_MB} MB or smaller.`;
}

export type ContactValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacyConsent: boolean;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

function phoneError(phone: string): string | undefined {
  const trimmed = phone.trim();
  if (!trimmed) return undefined;
  const digits = trimmed.replace(/\D/g, "");
  if (!/^[+\d][\d\s()-]*$/.test(trimmed) || digits.length < 7 || digits.length > 15) {
    return "Enter a valid phone number.";
  }
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  const phoneMessage = phoneError(values.phone);
  if (phoneMessage) errors.phone = phoneMessage;
  if (values.subject.trim().length < 2) errors.subject = "Enter a subject.";
  if (values.message.trim().length < 10) errors.message = "Enter a message with at least 10 characters.";
  if (!values.privacyConsent) errors.privacyConsent = "You must agree before submitting.";
  return errors;
}

export function validateEnquiry(v: FormValues): FormErrors {
  const e: FormErrors = {};
  if (v.fullName.trim().length < 2) e.fullName = "Enter your full name.";
  if (v.companyName.trim().length < 2) e.companyName = "Enter your company name.";
  if (!v.phone.trim()) e.phone = "Enter your phone number.";
  else {
    const phoneMessage = phoneError(v.phone);
    if (phoneMessage) e.phone = phoneMessage;
  }
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.preferredContactMethod === "email" && !v.email.trim()) e.email = "Enter your email, since you prefer to be contacted by email.";
  if (!v.serviceType) e.serviceType = "Select the service you need.";
  if (v.description.trim().length < 10) e.description = "Describe your requirement (at least 10 characters).";
  if (!v.preferredContactMethod) e.preferredContactMethod = "Select how you would like to be contacted.";
  if (!v.privacyConsent) e.privacyConsent = "You must agree before submitting.";
  return e;
}

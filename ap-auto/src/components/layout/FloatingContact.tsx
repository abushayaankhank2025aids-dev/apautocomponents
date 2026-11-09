import { siteConfig } from "@/config/site-config";
/** Renders only confirmed contact methods, so there are no dead buttons. */
export function FloatingContact() {
  const { phone, whatsapp } = siteConfig;
  const msg = encodeURIComponent("Hello A.P. Auto Components, I would like to enquire about your CNC machining and automotive component manufacturing services.");
  if (!phone.confirmed && !whatsapp.confirmed) return null;
  return (
    <div className="floating">
      {whatsapp.confirmed && <a className="btn btn--primary" href={`https://wa.me/${whatsapp.value.replace(/\D/g, "")}?text=${msg}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">WhatsApp</a>}
      {phone.confirmed && <a className="btn btn--outline" href={`tel:${phone.value.replace(/\s/g, "")}`} aria-label={`Call ${phone.value}`}>Call</a>}
    </div>
  );
}

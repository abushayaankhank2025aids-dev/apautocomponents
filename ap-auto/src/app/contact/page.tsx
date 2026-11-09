import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig, mapsSearchUrl, mapsDirectionsUrl } from "@/config/site-config";
export const metadata: Metadata = { title: "Contact", description: "Contact A.P. Auto Components in Chennai for CNC turning and machining enquiries.", alternates: { canonical: "/contact" }, openGraph: { title: "Contact", description: "Contact A.P. Auto Components in Chennai for CNC turning and machining enquiries." } };
export default function Page() {
  return (
    <>
      <PageHero title="Contact" intro="Talk to our team about your component." crumbs={[{ label: "Contact" }]} />
      <section className="section"><div className="container">
<div className="grid grid--3">
<div className="card"><h2 style={{ fontSize: "1.2rem" }}>Phone</h2><p><a href={`tel:${siteConfig.phone.value.replace(/\s/g, "")}`}>{siteConfig.phone.value}</a></p></div>
<div className="card"><h2 style={{ fontSize: "1.2rem" }}>Email</h2><p><a href={`mailto:${siteConfig.email.value}`}>{siteConfig.email.value}</a></p></div>
<div className="card"><h2 style={{ fontSize: "1.2rem" }}>Address</h2><address style={{ fontStyle: "normal" }}>{siteConfig.address}</address>
<p><a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer">View on Google Maps</a><br /><a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">Get directions</a></p></div></div>
<p style={{ marginTop: "2rem" }}><ButtonLink href="/request-quote">Request a Quote</ButtonLink></p>
<div style={{ marginTop: "2rem" }}>
  <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Send a message</h2>
  <ContactForm />
</div>
      </div></section>
    </>
  );
}

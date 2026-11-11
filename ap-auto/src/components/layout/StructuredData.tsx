import { siteConfig } from "@/config/site-config";
/** Only confirmed company facts. No geo coordinates, ratings, founding date or opening hours. */
export function StructuredData() {
  const { phone, email, addressParts: a, businessProfiles } = siteConfig;
  const data = {
    "@context": "https://schema.org", "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description,
    address: { "@type": "PostalAddress", streetAddress: a.street, addressLocality: a.locality, addressRegion: a.region, postalCode: a.postalCode, addressCountry: a.country },
    sameAs: [businessProfiles.indiaMART, businessProfiles.justdial],
    knowsAbout: ["Automotive component manufacturing", "CNC turning services", "CNC machining services", "CNC job work"],
    ...(phone.confirmed && { telephone: phone.value }), ...(email.confirmed && { email: email.value }),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

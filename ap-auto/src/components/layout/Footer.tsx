import Link from "next/link";
import { navLinks, publishedServices } from "@/config/content";
import { siteConfig, mapsSearchUrl, mapsDirectionsUrl } from "@/config/site-config";

export function Footer() {
  const { phone, email, businessProfiles } = siteConfig;
  return (
    <footer className="footer">
      <div className="container grid footer__grid">
        <div><h3>{siteConfig.name}</h3><p>{siteConfig.description}</p></div>
        <div><h3>Company</h3><ul>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/services">Services</Link></li>
          {navLinks.filter((l) => l.href !== "/about").map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
          <li><Link href="/request-quote">Request a Quote</Link></li>
        </ul></div>
        <div><h3>Services</h3><ul>{publishedServices.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>)}</ul></div>
        <div>
          <h3>Contact</h3>
          <address style={{ fontStyle: "normal" }}>{siteConfig.address}</address>
          {phone.confirmed && <p><a href={`tel:${phone.value.replace(/\s/g, "")}`}>{phone.value}</a></p>}
          {email.confirmed && <p><a href={`mailto:${email.value}`}>{email.value}</a></p>}
          <p><a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer">View on Google Maps</a><br />
          <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">Get directions</a></p>
        </div>
        <div><h3>Business Profiles</h3><ul>
          <li><a href={businessProfiles.indiaMART} target="_blank" rel="noopener noreferrer">IndiaMART <span aria-hidden="true">↗</span></a></li>
          <li><a href={businessProfiles.justdial} target="_blank" rel="noopener noreferrer">Justdial <span aria-hidden="true">↗</span></a></li>
        </ul></div>
      </div>
      <div className="container"><p style={{ marginTop: "2rem", fontSize: ".85rem", maxWidth: "none" }}>
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. · <Link href="/privacy-policy">Privacy policy</Link> · <Link href="/terms">Terms of use</Link></p></div>
    </footer>
  );
}

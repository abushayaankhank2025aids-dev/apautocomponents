import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
// Awaiting owner clarification. Not linked anywhere, excluded from sitemap, noindex.
export const metadata: Metadata = { title: "SOCO Machining Service", robots: { index: false, follow: false } };
export default function Page() {
  return (<><PageHero title="SOCO Machining Service" crumbs={[{ label: "Services", href: "/services" }, { label: "SOCO Machining Service" }]} />
    <section className="section"><div className="container"><p>This page is not available yet.</p>
      <ButtonLink href="/services">View our services</ButtonLink></div></section></>);
}

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import Link from "next/link";
import { publishedServices } from "@/config/content";
export const metadata: Metadata = { title: "Services", description: "CNC turning job work and CNC machining services in Chennai from A.P. Auto Components.", alternates: { canonical: "/services" }, openGraph: { title: "Services", description: "CNC turning job work and CNC machining services in Chennai from A.P. Auto Components." } };
export default function Page() {
  return (
    <>
      <PageHero title="Services" intro="Manufacturing services built around your drawings and requirements." crumbs={[{ label: "Services" }]} />
      <section className="section"><div className="container">
<div className="grid grid--3">{publishedServices.length > 0 ? publishedServices.map((s) => (
  <article key={s.slug} className="card"><h2 style={{ fontSize: "1.3rem" }}>{s.name}</h2><p>{s.summary}</p>
  <p><Link href={`/services/${s.slug}`}>View details</Link></p>
  <ButtonLink href={`/request-quote?service=${s.slug}`} variant="outline">Enquire now</ButtonLink></article>)) : (
    <div className="note" role="status"><p>Our service catalogue is updating. Please contact us directly about your requirement.</p></div>
  )}</div>
      </div></section>
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CompanyPhoto } from "@/components/sections/CompanyPhoto";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "CNC Machining Services", description: "CNC machining services in Chennai built around customer requirements.", alternates: { canonical: "/services/cnc-machining" }, openGraph: { title: "CNC Machining Services", description: "CNC machining services in Chennai built around customer requirements." } };
export default function Page() {
  return (
    <>
      <PageHero title="CNC Machining Services" intro="Machined components built around your requirements." crumbs={[{ label: "Services", href: "/services" }, { label: "CNC Machining Services" }]} />
      <section className="section"><div className="container">
<h2>What is CNC machining?</h2>
<p>CNC machining uses computer-controlled machines to cut metal components to the shape and dimensions given in a drawing.</p>
<CompanyPhoto
  src="/images/illustrative/cnc-milling-illustrative.webp"
  alt="Illustrative stock close-up of a CNC milling tool cutting metal; not a photograph of A.P. Auto Components."
  caption="Illustrative CNC milling image — not our equipment."
  width={1280}
  height={853}
  credit={<><a href="https://commons.wikimedia.org/wiki/File:CNC_milling_machine.jpg" target="_blank" rel="noreferrer">Photo: Impressionmanufacturer</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a> · converted to WebP</>}
/>
<h2>Share your requirement</h2>
<p>Tell us the component, material, quantity and any drawings you have. We will get back to you to discuss the job.</p>
<div className="note"><p>We review each requirement individually. Operations, materials and machine details are shared on enquiry.</p></div>
<p><ButtonLink href="/request-quote">Request a Quote</ButtonLink></p>
      </div></section>
    </>
  );
}

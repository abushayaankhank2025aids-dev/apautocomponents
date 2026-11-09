import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CompanyPhoto } from "@/components/sections/CompanyPhoto";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Industries", description: "Automotive and industrial machining requirements supported by A.P. Auto Components, Chennai.", alternates: { canonical: "/industries" }, openGraph: { title: "Industries", description: "Automotive and industrial machining requirements supported by A.P. Auto Components, Chennai." } };
export default function Page() {
  return (
    <>
      <PageHero title="Industries" intro="Machining support for automotive and industrial requirements." crumbs={[{ label: "Industries" }]} />
      <section className="section"><div className="container">
<p>A.P. Auto Components focuses on CNC turning and CNC machining requirements for automotive and industrial applications. We aim to support businesses that need components made to customer drawings, samples, and project specifications.</p>
<CompanyPhoto
  src="/images/illustrative/automotive-assembly-illustrative.webp"
  alt="Illustrative stock photograph of cars on an automotive factory production line; not an A.P. Auto Components facility or customer."
  caption="Illustrative automotive production image — not our facility or a customer."
  width={1280}
  height={853}
  credit={<><a href="https://commons.wikimedia.org/wiki/File:002_Production_line_-_car_assembly_line_in_General_Motors_Manufacturing_Poland_-_Gliwice,_Poland.jpg" target="_blank" rel="noreferrer">Photo: Marek Ślusarczyk</a> · <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY 3.0</a> · converted to WebP</>}
/>
<h2>Industries we aim to support</h2>
<div className="grid grid--3">
  <article className="card">
    <h3>Automotive</h3>
    <p>Automotive businesses seeking turned or machined components for their applications.</p>
  </article>
  <article className="card">
    <h3>Industrial manufacturing</h3>
    <p>Manufacturers with component requirements based on their drawings, samples, or project specifications.</p>
  </article>
  <article className="card">
    <h3>Engineering businesses</h3>
    <p>Engineering teams looking to discuss customer-specific machining requirements.</p>
  </article>
</div>
<p>Specific customer company names are not listed because none have been confirmed for publication. Share your drawing or sample to discuss your requirement with our team.</p>
<p><ButtonLink href="/request-quote">Request a Quote</ButtonLink></p>
      </div></section>
    </>
  );
}

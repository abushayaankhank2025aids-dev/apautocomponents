import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CompanyPhoto } from "@/components/sections/CompanyPhoto";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "About Us", description: "About A.P. Auto Components, a family-origin manufacturer of CNC turned and machined components in Chennai.", alternates: { canonical: "/about" }, openGraph: { title: "About Us", description: "About A.P. Auto Components, a family-origin manufacturer of CNC turned and machined components in Chennai." } };
export default function Page() {
  return (
    <>
      <PageHero title="About Us" intro="A manufacturing business that began as a family enterprise." crumbs={[{ label: "About Us" }]} />
      <section className="section"><div className="container">
<h2>Company overview</h2>
<p>A.P. Auto Components is a manufacturing business in Chennai offering CNC turning job work and CNC machining services. It began as a family business, founded by the parents of the current owner, A. Palanimurugan.</p>
<h2>Manufacturing focus</h2>
<p>We work from customer drawings and samples, and discuss each requirement directly with the customer before quoting.</p>
<CompanyPhoto
  src="/images/illustrative/cnc-lathe-illustrative.webp"
  alt="Illustrative stock photograph of a CNC lathe in operation; not a photograph of A.P. Auto Components."
  caption="Illustrative stock image — not our facility."
  width={1280}
  height={960}
  credit={<><a href="https://commons.wikimedia.org/wiki/File:Tsugami_CNC_Lathe.jpg" target="_blank" rel="noreferrer">Photo: Whoisjohngalt</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a> · converted to WebP</>}
/>
<div className="note"><p>Our company history and milestones will be added here.</p></div>
<p><ButtonLink href="/request-quote">Request a Quote</ButtonLink></p>
      </div></section>
    </>
  );
}

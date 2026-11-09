import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CompanyPhoto } from "@/components/sections/CompanyPhoto";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Infrastructure", description: "Illustrative industrial machining images and manufacturing information for A.P. Auto Components, Chennai.", alternates: { canonical: "/infrastructure" }, openGraph: { title: "Infrastructure", description: "Illustrative industrial machining images and manufacturing information for A.P. Auto Components, Chennai." } };
export default function Page() {
  return (
    <>
      <PageHero title="Infrastructure" intro="Illustrative industrial machining and manufacturing imagery." crumbs={[{ label: "Infrastructure" }]} />
      <section className="section"><div className="container">
<p>These stock photographs illustrate machining processes and are not photographs of our facility or equipment.</p>
<div className="company-photos">
  <CompanyPhoto
    src="/images/illustrative/cnc-lathe-illustrative.webp"
    alt="Illustrative stock photograph of a CNC lathe in operation; not a photograph of A.P. Auto Components."
    caption="Illustrative CNC lathe image — not our equipment."
    width={1280}
    height={960}
    credit={<><a href="https://commons.wikimedia.org/wiki/File:Tsugami_CNC_Lathe.jpg" target="_blank" rel="noreferrer">Photo: Whoisjohngalt</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a> · converted to WebP</>}
  />
  <CompanyPhoto
    src="/images/illustrative/cnc-milling-illustrative.webp"
    alt="Illustrative stock close-up of a CNC milling tool cutting metal; not a photograph of A.P. Auto Components."
    caption="Illustrative CNC milling image — not our equipment."
    width={1280}
    height={853}
    credit={<><a href="https://commons.wikimedia.org/wiki/File:CNC_milling_machine.jpg" target="_blank" rel="noreferrer">Photo: Impressionmanufacturer</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a> · converted to WebP</>}
  />
</div>
<p>Contact us to discuss whether we can handle your component.</p>
<p><ButtonLink href="/request-quote">Request a Quote</ButtonLink></p>
      </div></section>
    </>
  );
}

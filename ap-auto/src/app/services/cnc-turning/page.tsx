import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CompanyPhoto } from "@/components/sections/CompanyPhoto";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "CNC Turning Job Work", description: "CNC turning job work in Chennai for components made to customer drawings or samples.", alternates: { canonical: "/services/cnc-turning" }, openGraph: { title: "CNC Turning Job Work", description: "CNC turning job work in Chennai for components made to customer drawings or samples." } };
export default function Page() {
  return (
    <>
      <PageHero title="CNC Turning Job Work" intro="Turned components made to your drawing or sample." crumbs={[{ label: "Services", href: "/services" }, { label: "CNC Turning Job Work" }]} />
      <section className="section"><div className="container">
<h2>What is CNC turning?</h2>
<p>In CNC turning, a computer-controlled machine rotates a workpiece while a cutting tool removes material to produce round (cylindrical) shapes such as shafts, pins and bushes.</p>
<CompanyPhoto
  src="/images/illustrative/cnc-lathe-illustrative.webp"
  alt="Illustrative stock photograph of a CNC lathe in operation; not a photograph of A.P. Auto Components."
  caption="Illustrative CNC lathe image — not our equipment."
  width={1280}
  height={960}
  credit={<><a href="https://commons.wikimedia.org/wiki/File:Tsugami_CNC_Lathe.jpg" target="_blank" rel="noreferrer">Photo: Whoisjohngalt</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a> · converted to WebP</>}
/>
<h2>How to enquire</h2>
<ol className="prose-list"><li>Send your drawing or a sample of the component.</li><li>Tell us the material and quantity you need.</li><li>Our team reviews it and contacts you to discuss feasibility and a quotation.</li></ol>
<div className="note"><p>We review each requirement individually. Please share your drawing so we can confirm whether we can make it. Operations, materials and machine details are shared on enquiry.</p></div>
<p><ButtonLink href="/request-quote">Request a Quote</ButtonLink></p>
      </div></section>
    </>
  );
}

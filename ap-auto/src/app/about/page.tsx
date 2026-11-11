import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CompanyPhoto } from "@/components/sections/CompanyPhoto";
import { ButtonLink } from "@/components/ui/Button";
import { CompanyCredentials } from "@/components/sections/CompanyCredentials";

const description = "Learn about A.P. Auto Components, an automotive components and machining business in Padi, Chennai, offering CNC turning and CNC machining services.";
export const metadata: Metadata = { title: "About A.P. Auto Components Chennai", description, alternates: { canonical: "/about" }, openGraph: { title: "About A.P. Auto Components Chennai", description } };
export default function Page() {
  return (
    <>
      <PageHero title="About Us" intro="Automotive components and machining services, built around clear communication and customer requirements." crumbs={[{ label: "About Us" }]} />
      <section className="section"><div className="container">
        <p className="section-kicker">Company overview</p>
        <h2>A.P. Auto Components Chennai</h2>
        <p>A.P. Auto Components is an automotive components and machining business based in Padi, Chennai. The business provides CNC turning job work and CNC machining services for automotive component manufacturing applications.</p>
        <h2>Manufacturing focus</h2>
        <p>Work can be discussed against customer drawings or samples. Each enquiry is an opportunity to clarify the component requirement, application and details needed for a quotation.</p>
        <p>We value professional, responsive customer relationships and clear communication throughout the enquiry process.</p>
        <CompanyPhoto
          src="/images/illustrative/cnc-lathe-illustrative.webp"
          alt="Illustrative stock photograph of a CNC lathe in operation; not a photograph of A.P. Auto Components."
          caption="Illustrative stock image — not our facility."
          width={1280}
          height={960}
          credit={<><a href="https://commons.wikimedia.org/wiki/File:Tsugami_CNC_Lathe.jpg" target="_blank" rel="noreferrer">Photo: Whoisjohngalt</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a> · converted to WebP</>}
        />
        <p><ButtonLink href="/request-quote">Request a Quote</ButtonLink></p>
      </div></section>
      <CompanyCredentials />
    </>
  );
}

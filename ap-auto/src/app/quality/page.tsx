import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Quality", description: "A.P. Auto Components' commitment to understanding customer specifications, consistent manufacturing, and continued improvement.", alternates: { canonical: "/quality" }, openGraph: { title: "Quality", description: "A.P. Auto Components' commitment to understanding customer specifications, consistent manufacturing, and continued improvement." } };
export default function Page() {
  return (
    <>
      <PageHero title="Quality" intro="Our Commitment to Quality" crumbs={[{ label: "Quality" }]} />
      <section className="section"><div className="container">
<p>At A.P. Auto Components, we understand that component quality plays an important role in manufacturing. We are committed to understanding customer specifications and treating each requirement with care.</p>
<h2>Quality in every requirement</h2>
<ul className="prose-list">
  <li><strong>Attention to specifications:</strong> We review the drawings, samples, and requirements shared by the customer before discussing a job.</li>
  <li><strong>Consistency in manufacturing:</strong> We focus on following the agreed component requirements throughout the work.</li>
  <li><strong>Careful communication:</strong> We aim to clarify requirements and discuss questions with the customer before proceeding.</li>
  <li><strong>Customer satisfaction:</strong> We value customer feedback and use it to guide our work and service.</li>
  <li><strong>Continuous improvement:</strong> We are committed to learning from each requirement and improving our manufacturing work over time.</li>
</ul>
<div className="note"><p>Inspection methods, measurement equipment, certifications, and quality documentation have not been specified here. Please contact us to discuss the requirements for your component.</p></div>
<p><ButtonLink href="/request-quote">Request a Quote</ButtonLink></p>
      </div></section>
    </>
  );
}

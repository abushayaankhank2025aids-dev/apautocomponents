import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCatalogue } from "@/components/sections/ProductCatalogue";
import { products } from "@/config/products";
import { ButtonLink } from "@/components/ui/Button";
export const metadata: Metadata = { title: "Products", description: "CNC turning, CNC machining, and customer-specific component manufacturing for automotive and industrial requirements at A.P. Auto Components, Chennai.", alternates: { canonical: "/products" } };
export default function Page() {
  return (
    <>
      <PageHero title="Products" intro="Machining solutions for automotive and industrial component requirements." crumbs={[{ label: "Products" }]} />
      <section className="section"><div className="container">
        <p>A.P. Auto Components focuses on machining solutions for automotive and industrial component requirements. We aim to support businesses with components manufactured according to their project requirements and specifications.</p>
        <h2>General product categories</h2>
        <p>The categories below describe the kinds of machining requirements we discuss. They are not a published list of specific products or technical specifications.</p>
        <div className="grid grid--3">
          <article className="card">
            <h3>CNC-turned components</h3>
            <p>Turned component requirements discussed against customer drawings or samples.</p>
          </article>
          <article className="card">
            <h3>CNC-machined components</h3>
            <p>Machined metal component requirements based on the details provided for each project.</p>
          </article>
          <article className="card">
            <h3>Customer-specific machining</h3>
            <p>Automotive and industrial applications considered according to individual customer requirements.</p>
          </article>
        </div>
        <p>Product names, materials, dimensions, tolerances, and other specifications are not listed until confirmed for publication. Contact us to discuss your component requirement.</p>
        <p><ButtonLink href="/request-quote">Discuss Your Requirement</ButtonLink></p>
        <ProductCatalogue products={products} />
      </div></section>
    </>
  );
}

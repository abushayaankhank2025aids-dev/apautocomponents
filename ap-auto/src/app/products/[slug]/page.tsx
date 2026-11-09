import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { products } from "@/config/products";

type Params = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return products.length ? products.map(({ slug }) => ({ slug })) : [{ slug: "catalogue-placeholder" }];
}
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return product ? { title: product.name, description: product.description, alternates: { canonical: `/products/${product.slug}` } } : {};
}
export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const p = products.find((item) => item.slug === slug);
  if (!p && slug !== "catalogue-placeholder") notFound();
  if (!p) {
    return (
      <>
        <PageHero title="Product catalogue" intro="Product details are not available yet." crumbs={[{ label: "Products", href: "/products" }, { label: "Product catalogue" }]} />
        <section className="section"><div className="container">
          <div className="note" role="status"><p>Our product catalogue is being updated. Contact us to discuss your component requirements.</p>
            <Link className="btn btn--primary" href="/request-quote">Request a Quote</Link></div>
        </div></section>
      </>
    );
  }
  return (
    <>
      <PageHero title={p.name} intro={p.description} crumbs={[{ label: "Products", href: "/products" }, { label: p.name }]} />
      <section className="section"><div className="container">
        {p.specs.length > 0 && <table className="spec"><caption className="sr-only">Technical specifications</caption>
          <tbody>{p.specs.map((s) => <tr key={s.label}><th scope="row">{s.label}</th><td>{s.value}</td></tr>)}</tbody></table>}
        <p style={{ marginTop: "1.5rem" }}><Link className="btn btn--primary" href={`/request-quote?product=${p.slug}`}>Enquire about this product</Link></p>
      </div></section>
    </>
  );
}

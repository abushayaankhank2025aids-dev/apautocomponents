import Link from "next/link";
import { products } from "@/config/products";
import { InfoBand } from "./InfoBand";
import { MetallicShowcase } from "./MetallicShowcase";

export function ProductShowcase() {
  const featured = products.slice(0, 3);
  return (
    <InfoBand id="prod-title" title="Machined component categories" href="/products" cta="View product catalogue" alt>
      <p className="section-kicker">03 — Product possibilities</p>
      <p>Explore general machining categories. Individual product details are shared as customer requirements are confirmed.</p>
      {featured.length === 0 ? (
        <div className="grid grid--3 showcase-cards">
          <article className="card"><span className="card__number">01</span><h3>CNC-turned components</h3><p>Turned component requirements for automotive and industrial applications.</p></article>
          <article className="card"><span className="card__number">02</span><h3>CNC-machined components</h3><p>Machined components developed around customer drawings and specifications.</p></article>
          <article className="card"><span className="card__number">03</span><h3>Custom requirements</h3><p>Discuss project-specific component needs with the A.P. Auto Components team.</p></article>
        </div>
      ) : (
        <div className="grid grid--3 showcase-cards">
          {featured.map((p) => <article key={p.slug} className="card"><span className="card__number">0{featured.indexOf(p) + 1}</span><h3>{p.name}</h3><p>{p.description}</p><Link href={`/products/${p.slug}`}>View details</Link></article>)}
        </div>
      )}
      <MetallicShowcase />
    </InfoBand>
  );
}
export const InfrastructureBand = () => (
  <InfoBand id="infra-title" title="Manufacturing infrastructure" href="/infrastructure" cta="See our infrastructure">
    <p className="section-kicker">04 — Manufacturing environment</p>
    <p>Factory, machine and process details are being compiled. Contact us to discuss whether we can handle your component.</p>
  </InfoBand>);
export const QualityBand = () => (
  <InfoBand id="quality-title" title="Our Commitment to Quality" href="/quality" cta="Our quality approach" alt>
    <p className="section-kicker">05 — Quality commitment</p>
    <p>We focus on understanding customer specifications, consistent manufacturing work, clear communication and continuous improvement. Share your quality requirements with us when you enquire.</p>
  </InfoBand>);
export const IndustriesBand = () => (
  <InfoBand id="ind-title" title="Industries served" href="/industries" cta="View industries">
    <p className="section-kicker">06 — Industries we can discuss</p>
    <p>We aim to support automotive, industrial manufacturing and engineering businesses with turned and machined component requirements.</p>
  </InfoBand>);

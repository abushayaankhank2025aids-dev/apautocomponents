"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/types/product";

export function ProductCatalogue({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const cats = useMemo(() => Array.from(new Set(products.map((p) => p.category))), [products]);
  const shown = products.filter((p) =>
    (cat === "all" || p.category === cat) && `${p.name} ${p.description} ${p.material ?? ""}`.toLowerCase().includes(q.toLowerCase()));
  if (products.length === 0) {
    return (
      <div className="note" role="status">
        <p>Our product catalogue is being updated. Contact us to discuss your component requirements.</p>
        <Link className="btn btn--primary" href="/request-quote">Request a Quote</Link>
      </div>
    );
  }
  return (
    <>
      <div className="toolbar">
        <div><label htmlFor="pq">Search products</label><input id="pq" className="field" type="search" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div><label htmlFor="pc">Category</label>
          <select id="pc" className="field" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="all">All categories</option>{cats.map((c) => <option key={c}>{c}</option>)}
          </select></div>
      </div>
      {shown.length === 0 ? <p role="status">No products match your search.</p> : (
        <div className="grid grid--3">
          {shown.map((p) => (
            <article key={p.slug} className="card"><h2 style={{ fontSize: "1.2rem" }}>{p.name}</h2><p>{p.description}</p>
              <Link href={`/products/${p.slug}`}>View details</Link></article>
          ))}
        </div>
      )}
    </>
  );
}

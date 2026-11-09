import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
export const metadata: Metadata = {
  title: "Request a Quote", description: "Request a quotation for CNC turning or CNC machining from A.P. Auto Components, Chennai.",
  alternates: { canonical: "/request-quote" },
};
export default function Page() {
  return (
    <>
      <PageHero title="Request a Quote" intro="Share your component requirements and our team will contact you." crumbs={[{ label: "Request a Quote" }]} />
      <section className="section"><div className="container"><Suspense fallback={<p>Loading form…</p>}><QuoteForm /></Suspense></div></section>
    </>
  );
}

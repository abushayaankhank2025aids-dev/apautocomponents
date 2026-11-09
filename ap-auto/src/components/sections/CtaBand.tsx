import { ButtonLink } from "@/components/ui/Button";
export function CtaBand() {
  return (
    <section className="section cta-band" aria-labelledby="cta-title">
      <div className="container">
        <p className="section-kicker">07 — Start a conversation</p>
        <h2 id="cta-title">LET’S BUILD SOMETHING PRECISE.</h2>
        <p>Share your manufacturing requirements with A.P. Auto Components and connect with our team to discuss your project.</p>
        <ButtonLink href="/request-quote">Request a Quote</ButtonLink>
      </div>
    </section>
  );
}

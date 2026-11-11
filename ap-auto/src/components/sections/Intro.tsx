import { ButtonLink } from "@/components/ui/Button";
export function Intro() {
  return (
    <section className="section intro-scene" id="introduction" aria-labelledby="intro-title">
      <div className="container">
        <p className="section-kicker">01 — Introduction</p>
        <h2 id="intro-title">Automotive manufacturing, focused on precision</h2>
        <p>A.P. Auto Components is a manufacturing business based in Padi, Chennai, offering CNC turning job work and CNC machining services to industrial customers.</p>
        <ButtonLink href="/about" variant="outline">Discover Our Company</ButtonLink>
      </div>
    </section>
  );
}

import { whyChooseUs } from "@/config/content";
export function WhyChooseUs() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container">
        <h2 id="why-title">Why choose A.P. Auto Components</h2>
        <div className="grid grid--3">
          {whyChooseUs.map((w) => <div key={w.title} className="card"><h3>{w.title}</h3><p>{w.text}</p></div>)}
        </div>
      </div>
    </section>
  );
}

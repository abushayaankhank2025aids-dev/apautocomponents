import { ButtonLink } from "@/components/ui/Button";
export function StubPage({ title, note }: { title: string; note?: string }) {
  return (
    <section className="section"><div className="container">
      <h1>{title}</h1><p>{note ?? "This page is being prepared."}</p>
      <ButtonLink href="/request-quote">Request a Quote</ButtonLink>
    </div></section>
  );
}

import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
export function InfoBand({ id, title, children, href, cta, alt }: { id: string; title: string; children: ReactNode; href: string; cta: string; alt?: boolean }) {
  return (
    <section className={`section${alt ? " section--alt" : ""}`} aria-labelledby={id}>
      <div className="container"><h2 id={id}>{title}</h2>{children}<ButtonLink href={href} variant="outline">{cta}</ButtonLink></div>
    </section>
  );
}

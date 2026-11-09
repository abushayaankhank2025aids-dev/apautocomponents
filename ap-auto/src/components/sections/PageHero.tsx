import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
export function PageHero({ title, intro, crumbs }: { title: string; intro?: string; crumbs: { label: string; href?: string }[] }) {
  return (
    <section className="page-hero"><div className="container">
      <Breadcrumbs items={crumbs} /><h1>{title}</h1>{intro && <p>{intro}</p>}
    </div></section>
  );
}

import Link from "next/link";
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <ol>
        <li><Link href="/">Home</Link></li>
        {items.map((i, n) => (
          <li key={i.label}>{i.href && n < items.length - 1 ? <Link href={i.href}>{i.label}</Link> : <span aria-current="page">{i.label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks, publishedServices } from "@/config/content";
import { siteConfig } from "@/config/site-config";

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { setOpen(false); setSub(false); }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setSub(false); setOpen(false); } };
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setSub(false); };
    document.addEventListener("keydown", onKey); document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, []);
  const cur = (href: string) => (path === href || path.startsWith(href + "/") ? "page" : undefined);
  return (
    <header className="header">
      <div className="container header__bar">
        <Link href="/" className="logo" aria-label={`${siteConfig.name} – home`}>
          {siteConfig.name}
        </Link>
        <button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
        <nav id="main-nav" aria-label="Main" className={`nav${open ? " nav--open" : ""}`}>
          <Link href="/" aria-current={path === "/" ? "page" : undefined}>Home</Link>
          <Link href="/about" aria-current={cur("/about")}>About Us</Link>
          <div className="dropdown" ref={ref}>
            <button aria-expanded={sub} aria-haspopup="true" aria-current={cur("/services")} onClick={() => setSub(!sub)}>Services ▾</button>
            {sub && (
              <div className="dropdown__menu">
                <Link href="/services">All services</Link>
                {publishedServices.map((s) => <Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}
              </div>
            )}
          </div>
          {navLinks.slice(1).map((l) => <Link key={l.href} href={l.href} aria-current={cur(l.href)}>{l.label}</Link>)}
          <Link href="/request-quote" className="btn btn--primary">Request a Quote</Link>
        </nav>
      </div>
    </header>
  );
}

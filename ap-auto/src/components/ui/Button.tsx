import Link from "next/link";
import type { ReactNode } from "react";
export function ButtonLink({ href, variant = "primary", children }: { href: string; variant?: "primary" | "outline" | "light"; children: ReactNode }) {
  return <Link href={href} className={`btn btn--${variant}`}>{children}</Link>;
}

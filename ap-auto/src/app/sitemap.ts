import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site-config";
import { publishedServices } from "@/config/content";
import { products } from "@/config/products";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/services", "/products", "/infrastructure", "/quality", "/industries", "/contact", "/request-quote",
    ...publishedServices.map((s) => `/services/${s.slug}`), ...products.map((p) => `/products/${p.slug}`)];
  return paths.map((p) => ({ url: `${siteConfig.url}${p}`, lastModified: new Date() }));
}

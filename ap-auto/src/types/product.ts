export interface ProductSpec { label: string; value: string }
export interface Product {
  slug: string; name: string; category: string; description: string;
  material?: string; application?: string; images: { src: string; alt: string }[];
  specs: ProductSpec[]; relatedSlugs?: string[];
}

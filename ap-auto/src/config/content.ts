export type Service = { slug: string; name: string; summary: string; confirmed: boolean };
export const services: Service[] = [
  { slug: "cnc-turning", name: "CNC Turning Job Work", confirmed: true, summary: "CNC turning job work for components made to your drawings or samples." },
  { slug: "cnc-machining", name: "CNC Machining Services", confirmed: true, summary: "CNC machining services built around your component requirements." },
  // Awaiting owner clarification of SOCO. Hidden from nav, cards and sitemap.
  { slug: "soco-machining", name: "SOCO Machining Service", confirmed: false, summary: "" },
];
export const publishedServices = services.filter((s) => s.confirmed);
export const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/infrastructure", label: "Infrastructure" },
  { href: "/quality", label: "Quality" },
  { href: "/contact", label: "Contact" },
];
export const whyChooseUs = [
  { title: "Automotive manufacturing focus", text: "Automotive components and machining services from Padi, Chennai." },
  { title: "A clear manufacturing process", text: "Discuss your drawings, samples and component requirements directly with our team." },
  { title: "Built around your requirement", text: "Share your drawing or sample and discuss the job directly with our team." },
  { title: "CNC turning and machining", text: "Job work services for turned and machined components." },
];

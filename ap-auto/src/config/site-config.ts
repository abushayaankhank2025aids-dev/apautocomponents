/** Single source of truth. Anything with confirmed:false is NEVER rendered publicly. */
export const siteConfig = {
  name: "A.P. Auto Components",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  tagline: "Precision Engineering. Reliable Manufacturing.",
  description: "Automotive component manufacturing and CNC machining solutions designed around customer requirements.",
  addressParts: { street: "34, Near Sivan Temple, Thiruvallivar Street, Padi", locality: "Chennai", region: "Tamil Nadu", postalCode: "600050", country: "IN" },
  address: "34, Near Sivan Temple, Thiruvallivar Street, Padi, Chennai – 600050, Tamil Nadu, India",
  phone: { value: "+91 80 4731 1048", confirmed: true },
  whatsapp: { value: "", confirmed: false },
  email: { value: "a.palanimurugan79@gmail.com", confirmed: true },
  established: { value: "", confirmed: false }, // unresolved 1998 / 2006 discrepancy
};
export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("A.P. Auto Components, " + siteConfig.address)}`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.address)}`;

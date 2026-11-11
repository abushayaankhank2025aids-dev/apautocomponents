/** Single source of truth. Anything with confirmed:false is NEVER rendered publicly. */
export const siteConfig = {
  name: "A.P. Auto Components",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://apautocomponents.netlify.app").replace(/\/$/, ""),
  tagline: "Precision Engineering. Reliable Manufacturing.",
  description: "A.P. Auto Components provides automotive component manufacturing, CNC turning services, CNC machining services and CNC job work in Chennai, Tamil Nadu.",
  addressParts: { street: "34, Near Sivan Temple, Thiruvallivar Street, Padi", locality: "Chennai", region: "Tamil Nadu", postalCode: "600050", country: "IN" },
  address: "34, Near Sivan Temple, Thiruvallivar Street, Padi, Chennai – 600050, Tamil Nadu, India",
  phone: { value: "+91 80 4731 1048", confirmed: true },
  whatsapp: { value: "", confirmed: false },
  email: { value: "a.palanimurugan79@gmail.com", confirmed: true },
  established: { value: "", confirmed: false }, // unresolved 1998 / 2006 discrepancy
  credentials: {
    industry: "Automotive Components and Manufacturing",
    legalStatus: "Proprietorship",
    gstRegistrationYear: 2017,
  },
  businessProfiles: {
    indiaMART: "https://www.indiamart.com/ap-auto-components",
    justdial: "https://www.justdial.com/Chennai/Ap-Auto-Components-Pothur/044PXX44-XX44-220811075849-R7T2_BZDET",
  },
};
export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("A.P. Auto Components, " + siteConfig.address)}`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.address)}`;

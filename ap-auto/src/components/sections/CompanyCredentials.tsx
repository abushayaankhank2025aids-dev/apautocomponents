import { siteConfig } from "@/config/site-config";
import { privateBusinessConfig } from "@/config/private-business-config";

const credentials = [
  { label: "Business identity", value: siteConfig.name },
  { label: "Industry", value: siteConfig.credentials.industry },
  { label: "Legal structure", value: siteConfig.credentials.legalStatus },
  { label: "GST registration", value: `Registered in ${siteConfig.credentials.gstRegistrationYear}` },
  { label: "Business location", value: "Padi, Chennai, Tamil Nadu, India" },
  ...(privateBusinessConfig.gst.publicDisclosureApproved
    ? [{ label: "GSTIN", value: privateBusinessConfig.gst.number }]
    : []),
];

export function CompanyCredentials() {
  const { businessProfiles } = siteConfig;

  return (
    <section className="section section--alt" aria-labelledby="company-credentials-title">
      <div className="container">
        <p className="section-kicker">Business profile</p>
        <h2 id="company-credentials-title">Company Credentials</h2>
        <p className="company-credentials__lead">Built on Manufacturing Experience. Focused on Precision.</p>
        <dl className="company-credentials__grid">
          {credentials.map(({ label, value }) => (
            <div className="company-credentials__item" key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="company-credentials__note">These business details are provided by A.P. Auto Components and are not presented as independent or government verification.</p>
        <div className="company-profiles">
          <h3>Business Profiles</h3>
          <ul>
            <li><a href={businessProfiles.indiaMART} target="_blank" rel="noopener noreferrer">View our IndiaMART profile <span aria-hidden="true">↗</span></a></li>
            <li><a href={businessProfiles.justdial} target="_blank" rel="noopener noreferrer">View our Justdial business listing <span aria-hidden="true">↗</span></a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

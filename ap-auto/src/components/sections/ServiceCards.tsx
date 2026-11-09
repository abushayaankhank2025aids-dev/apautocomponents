import Link from "next/link";
import Image from "next/image";
import { publishedServices } from "@/config/content";
import { publicAssetPath } from "@/lib/public-asset";

const serviceVisuals: Record<string, {
  image: string;
  alt: string;
  source: string;
  sourceUrl: string;
  licenseUrl: string;
}> = {
  "cnc-turning": {
    image: "/images/illustrative/cnc-lathe-illustrative.webp",
    alt: "Illustrative stock photograph of a CNC lathe; not A.P. Auto Components' equipment.",
    source: "Whoisjohngalt",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tsugami_CNC_Lathe.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "cnc-machining": {
    image: "/images/illustrative/cnc-milling-illustrative.webp",
    alt: "Illustrative stock photograph of CNC milling; not A.P. Auto Components' equipment.",
    source: "Impressionmanufacturer",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:CNC_milling_machine.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
} as const;

export function ServiceCards() {
  return (
    <section className="section section--alt" id="capabilities" aria-labelledby="svc-title">
      <div className="container">
        <p className="section-kicker">02 — Our capabilities</p>
        <h2 id="svc-title">Manufacturing services</h2>
        <div className="capability-scenes">
          {publishedServices.map((s) => {
            const visual = serviceVisuals[s.slug];
            return (
              <article key={s.slug} className={`capability-scene capability-scene--${s.slug}`}>
                {visual && (
                  <figure className="capability-scene__visual">
                    <Image
                      src={publicAssetPath(visual.image)}
                      alt={visual.alt}
                      fill
                      sizes="(max-width: 760px) 100vw, 50vw"
                      className="capability-scene__image"
                    />
                    <figcaption>
                      <span>Illustrative image — not our equipment.</span>
                      <span>
                        <a href={visual.sourceUrl} target="_blank" rel="noreferrer">Photo: {visual.source}</a>
                        {" · "}
                        <a href={visual.licenseUrl} target="_blank" rel="noreferrer">CC BY-SA 4.0</a>
                      </span>
                    </figcaption>
                  </figure>
                )}
                <div className="capability-scene__content">
                  <p className="capability-scene__index">{s.slug === "cnc-turning" ? "02A" : "02B"} / CAPABILITY</p>
                  <h3>{s.name}</h3>
                  <p>{s.summary}</p>
                  <div className="capability-scene__actions">
                    <Link href={`/services/${s.slug}`}>Explore service <span aria-hidden="true">↗</span></Link>
                    <Link className="btn btn--outline" href={`/request-quote?service=${s.slug}`}>Request a Quote</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

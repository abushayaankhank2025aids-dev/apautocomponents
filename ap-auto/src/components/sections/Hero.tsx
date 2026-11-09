import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site-config";
import { publicAssetPath } from "@/lib/public-asset";
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        src={publicAssetPath("/images/illustrative/cnc-lathe-illustrative.webp")}
        alt="Illustrative stock image of a CNC lathe in operation; this is not A.P. Auto Components' facility."
        fill
        priority
        sizes="100vw"
        className="hero__image"
      />
      <div className="hero__grain" aria-hidden="true" />
      <span className="hero__image-caption">
        Illustrative stock image — not our facility. Photo:{" "}
        <a href="https://commons.wikimedia.org/wiki/File:Tsugami_CNC_Lathe.jpg" target="_blank" rel="noreferrer">Whoisjohngalt</a>,{" "}
        <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>; converted to WebP.
      </span>
      <div className="container">
        <p className="hero__eyebrow">{siteConfig.name}<span aria-hidden="true" /></p>
        <h1 id="hero-title">ENGINEERING PRECISION.<br /><span>POWERING INDUSTRY.</span></h1>
        <p className="hero__description">Precision-focused CNC turning and machining services for varied industrial requirements.</p>
        <div className="hero__cta">
          <ButtonLink href="#capabilities" variant="primary">Explore Our Capabilities</ButtonLink>
          <ButtonLink href="/request-quote" variant="light">Request a Quote</ButtonLink>
        </div>
        <p className="hero__loc">Padi, Chennai, Tamil Nadu.</p>
      </div>
      <a className="hero__scroll" href="#introduction"><span aria-hidden="true" />Scroll to explore</a>
    </section>
  );
}

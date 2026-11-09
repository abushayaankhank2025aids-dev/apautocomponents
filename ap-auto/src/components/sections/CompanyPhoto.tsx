import Image from "next/image";
import type { ReactNode } from "react";
import { publicAssetPath } from "@/lib/public-asset";

export function CompanyPhoto({
  src,
  alt,
  caption,
  credit,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  credit: ReactNode;
  width: number;
  height: number;
}) {
  return (
    <figure className="company-photo">
      <Image
        src={publicAssetPath(src)}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
      />
      <figcaption>
        {caption}
        <span className="company-photo__credit">{credit}</span>
      </figcaption>
    </figure>
  );
}

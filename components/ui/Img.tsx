import NextImage, { type ImageProps } from "next/image";
import { asset } from "@/lib/asset";
import { isVector } from "@/lib/media";

/**
 * next/image everywhere on the site.
 *
 * Two things it adds. It prefixes local sources with the deployment base path —
 * next/image only does that for sources it routes through the optimizer, so an
 * unoptimized image 404s under a GitHub Pages subpath without this. And it
 * defaults vector art to unoptimized, since the optimizer cannot improve an SVG.
 *
 * Assumes base path and the optimizer are never both in play, which holds for
 * this project's two targets: Pages exports statically, Vercel serves at root.
 */
export function Img({ src, unoptimized, ...rest }: ImageProps) {
  const local = typeof src === "string" && src.startsWith("/");

  return (
    <NextImage
      {...rest}
      src={local ? asset(src) : src}
      unoptimized={unoptimized ?? (local && isVector(src))}
    />
  );
}

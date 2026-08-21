import type { NextConfig } from "next";

/**
 * One config, two targets.
 *
 * Vercel (default): a normal Next build at the domain root, image optimizer on.
 * GitHub Pages (STATIC_EXPORT=true): a fully static export served from a
 * repository subpath, so basePath/assetPrefix are set and the optimizer — which
 * needs a server — is turned off.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] as const },
      }),
};

export default nextConfig;

/**
 * Prefixes a /public path with the deployment's base path.
 *
 * next/image and next/link do this on their own; a raw <img> or a CSS url()
 * does not, so anything hand-written goes through here. Empty on Vercel,
 * "/<repo>" on GitHub Pages.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${base}${path}`;

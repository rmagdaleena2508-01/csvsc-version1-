import type { SVGProps } from "react";

/**
 * Brand marks are no longer shipped by lucide-react, so the two we need live
 * here — same 24px stroke grid and props as every other icon on the site.
 */
type IconProps = Omit<SVGProps<SVGSVGElement>, "size"> & {
  size?: number;
  strokeWidth?: number;
};

const base = (size: number, strokeWidth: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor" as const,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function LinkedinIcon({
  size = 24,
  strokeWidth = 1.6,
  ...rest
}: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} {...rest}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function InstagramIcon({
  size = 24,
  strokeWidth = 1.6,
  ...rest
}: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} {...rest}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

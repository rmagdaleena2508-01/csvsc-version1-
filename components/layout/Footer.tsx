import Link from "next/link";
import { Img as Image } from "@/components/ui/Img";
import { site } from "@/data/site";

const columns = [
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
  { label: "About", href: "/about" },
];

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-cream">
      <div className="container-editorial flex flex-col gap-12 py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-start">
          <div className="flex items-start gap-3">
            <Image
              src="/images/brand/csi-emblem.png"
              alt=""
              width={40}
              height={40}
              className="mt-0.5"
            />
            <div>
              <p className="text-title font-normal tracking-[-0.025em] text-navy">
                CSI Student Chapter
              </p>
              <p className="text-lead text-slate-blue">SRMIST Vadapalani</p>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem]"
          >
            {columns.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="link-underline text-navy/80 hover:text-navy"
              >
                {c.label}
              </Link>
            ))}
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-navy/80 hover:text-navy"
            >
              LinkedIn
            </a>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-navy/80 hover:text-navy"
            >
              Instagram
            </a>
          </nav>
        </div>

        <p className="border-t border-navy/10 pt-8 text-[0.8125rem] tracking-[-0.005em] text-slate-blue">
          {site.legalName}
        </p>
      </div>
    </footer>
  );
}

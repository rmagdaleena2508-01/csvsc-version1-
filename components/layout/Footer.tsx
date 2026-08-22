import Link from "next/link";
import { Img as Image } from "@/components/ui/Img";
import { site } from "@/data/site";

const columns = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
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

        <div className="flex flex-col gap-8 border-t border-navy/10 pt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <p className="text-[0.8125rem] tracking-[-0.005em] text-slate-blue">
            {site.legalName}
          </p>
          {/* Handwritten credit, paper knocked out so only the ink sits on the
              footer. Wording repeats in alt text, since an image of text is
              invisible to screen readers and search engines alike. */}
          <Image
            src="/images/brand/credit.png"
            alt="Designed and developed by R. Magdaleena, Vice President at CSI SRMIST VDP"
            width={1400}
            height={259}
            className="w-full max-w-[22rem] sm:max-w-[26rem]"
          />
        </div>
      </div>
    </footer>
  );
}

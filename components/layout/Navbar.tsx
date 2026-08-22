"use client";

import Link from "next/link";
import { Img as Image } from "@/components/ui/Img";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/ui/icons";
import { navigation, site } from "@/data/site";
import { SCROLL_DURATION, scrollToId } from "@/lib/scroll";
import { CollegeCard } from "./CollegeCard";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [inInsights, setInInsights] = useState(false);
  // Held true from the moment a section link is clicked until the scroll lands,
  // so the pill darkens on click instead of when the section finally arrives.
  const [pinned, setPinned] = useState(false);
  const [collegeOpen, setCollegeOpen] = useState(false);
  const frame = useRef(0);
  const pinTimer = useRef(0);
  const pathname = usePathname();

  // One passive listener, coalesced into a frame, state written only on cross.
  useEffect(() => {
    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        setScrolled((prev) => {
          const next = window.scrollY > 24;
          return next === prev ? prev : next;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  // Insights is a section, not a route, so its nav pill lights up while that
  // section holds the viewport rather than on a path match.
  useEffect(() => {
    if (pathname !== "/") return;
    const section = document.getElementById("insights");
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => setInInsights(entry.isIntersecting),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [pathname]);

  const onInsights = pathname === "/" && (pinned || inInsights);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return onInsights;
    if (href === "/") return pathname === "/" && !onInsights;
    return pathname.startsWith(href);
  };

  const goToSection = (event: React.MouseEvent, href: string) => {
    if (!href.startsWith("/#") || event.metaKey || event.ctrlKey) return;
    setPinned(true);
    window.clearTimeout(pinTimer.current);
    pinTimer.current = window.setTimeout(
      () => setPinned(false),
      SCROLL_DURATION + 160
    );
    if (pathname === "/" && scrollToId(href.slice(2))) {
      event.preventDefault();
      history.replaceState(null, "", href);
    }
  };

  useEffect(() => () => window.clearTimeout(pinTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const socialLinks = [
    { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-editorial flex items-center justify-between gap-4 py-4 sm:py-5">
        {/* Wordmark. The seal is its own control, so it sits beside the home
            link rather than inside it — a button nested in an anchor is invalid
            and swallows one of the two actions. */}
        <div
          className={`glass flex items-center gap-2.5 rounded-full p-1.5 backdrop-blur-2xl backdrop-saturate-150 sm:pr-4 ${
            scrolled ? "glass-solid" : ""
          }`}
        >
          <button
            type="button"
            onClick={() => setCollegeOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={collegeOpen}
            aria-label={`About ${site.institution}`}
            className="grid size-9 place-items-center rounded-full bg-white/90 ring-1 ring-navy/8 transition-transform duration-300 ease-[var(--ease-editorial)] hover:scale-105"
          >
            <Image
              src="/images/brand/srmist-seal.png"
              alt=""
              width={244}
              height={238}
              priority
              className="size-7 object-contain"
            />
          </button>

          <Link
            href="/"
            className="hidden text-[0.9375rem] leading-tight font-medium tracking-[-0.02em] text-navy sm:block"
            aria-label={`${site.name}, ${site.institution} — home`}
          >
            CSI Student Chapter
            <span className="block text-[0.6875rem] font-normal tracking-[0.08em] text-slate-blue uppercase">
              SRMIST Vadapalani
            </span>
          </Link>
        </div>

        {/* Desktop pill navigation */}
        <nav
          aria-label="Primary"
          className={`glass hidden items-center gap-1 rounded-full p-1 backdrop-blur-2xl backdrop-saturate-150 lg:flex ${
            scrolled ? "glass-solid" : ""
          }`}
        >
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => goToSection(e, item.href)}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[0.875rem] tracking-[-0.01em] transition-colors duration-300 ${
                  active
                    ? "bg-navy text-cream"
                    : "text-navy/80 hover:bg-navy/6 hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Socials + mobile trigger */}
        <div className="flex items-center gap-1.5">
          <div
            className={`glass hidden items-center gap-0.5 rounded-full p-1 backdrop-blur-2xl backdrop-saturate-150 sm:flex ${
              scrolled ? "glass-solid" : ""
            }`}
          >
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full text-navy/75 transition-colors duration-300 hover:bg-navy/6 hover:text-navy"
              >
                <Icon size={17} strokeWidth={1.6} />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`glass glass-orb grid size-11 place-items-center rounded-full text-navy backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-300 ease-[var(--ease-editorial)] active:scale-95 lg:hidden ${
              scrolled ? "glass-solid" : ""
            }`}
          >
            {open ? (
              <X size={19} strokeWidth={1.6} aria-hidden />
            ) : (
              <Menu size={19} strokeWidth={1.6} aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="container-editorial lg:hidden"
      >
        <nav
          aria-label="Primary mobile"
          className="glass-panel mt-1 flex flex-col rounded-3xl p-3 backdrop-blur-3xl backdrop-saturate-[180%]"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => {
                setOpen(false);
                goToSection(e, item.href);
              }}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-2xl px-4 py-3.5 text-title font-normal tracking-[-0.02em] transition-colors ${
                isActive(item.href)
                  ? "bg-navy text-cream"
                  : "text-navy hover:bg-white/45"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t border-white/50 pt-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white/45 px-4 py-3 text-[0.9375rem] text-navy ring-1 ring-white/60 transition-colors hover:bg-white/70"
              >
                <Icon size={16} strokeWidth={1.6} />
                {label}
              </a>
            ))}
          </div>
        </nav>
      </div>
      <CollegeCard open={collegeOpen} onClose={() => setCollegeOpen(false)} />
    </header>
  );
}

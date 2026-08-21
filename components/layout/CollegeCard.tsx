"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Img as Image } from "@/components/ui/Img";

const COLLEGE_URL = "https://srmistvdp.edu.in/";

/**
 * The college seal in the navigation opens this. Closing it shrinks and fades
 * the card away rather than cutting it, which reads as the card being put back
 * where it came from.
 */
export function CollegeCard({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  const motionProps = reduced
    ? {}
    : {
        initial: { opacity: 0, scale: 0.94, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.88, y: 14, filter: "blur(3px)" },
        transition: { duration: 0.26, ease: [0.22, 0.61, 0.36, 1] as const },
      };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-100 grid place-items-center px-5"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <div
            className="absolute inset-0 bg-navy/45 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="SRMIST Vadapalani"
            className="relative w-full max-w-sm rounded-[1.75rem] p-[5px] shadow-[0_44px_90px_-34px_rgba(10,26,64,0.7),0_0_0_1px_rgba(18,38,92,0.14)]"
            style={{
              // Brushed-metal rim: a conic sweep so the light appears to travel
              // around the edge instead of running flat across it.
              background:
                "conic-gradient(from 210deg at 50% 50%, #f8fbff 0deg, #2b52a8 38deg, #d8e9fa 76deg, #12265c 128deg, #9fd0f5 172deg, #1b3a86 218deg, #eaf4ff 262deg, #2b52a8 308deg, #f8fbff 360deg)",
            }}
            {...motionProps}
          >
            <div className="relative overflow-hidden rounded-[1.4rem] bg-cream px-8 pt-10 pb-9 ring-1 ring-white/70">
              {/* specular sheen across the top of the card face */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/85 to-transparent"
              />

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 grid size-8 place-items-center rounded-full bg-navy/6 text-navy/70 transition-colors duration-300 hover:bg-navy/12 hover:text-navy"
              >
                <X size={16} strokeWidth={1.8} aria-hidden />
              </button>

              <div className="relative flex flex-col items-center gap-7 text-center">
                <Image
                  src="/images/brand/srmist-seal.png"
                  alt="SRM Institute of Science and Technology"
                  width={244}
                  height={238}
                  className="size-28 object-contain drop-shadow-[0_10px_24px_rgba(18,38,92,0.22)]"
                />

                <a
                  href={COLLEGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-[1.0625rem] tracking-[-0.015em] text-navy"
                >
                  <span className="link-underline">Visit our College site</span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.7}
                    aria-hidden
                    className="transition-transform duration-300 ease-[var(--ease-editorial)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

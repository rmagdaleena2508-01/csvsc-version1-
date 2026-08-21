const DURATION = 520;
/** Nav pill height plus breathing room, so a section never lands under it. */
const OFFSET = 88;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Scrolls to a section on a fixed, short timeline. The browser's own smooth
 * scroll stretches its duration with distance, which makes a jump to a section
 * far down the page feel sluggish; this always takes the same half second.
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;

  const start = window.scrollY;
  const target = Math.max(
    0,
    Math.round(el.getBoundingClientRect().top + start - OFFSET)
  );

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    Math.abs(target - start) < 2
  ) {
    window.scrollTo({ top: target, behavior: "instant" });
    return true;
  }

  const began = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - began) / DURATION);
    window.scrollTo({
      top: start + (target - start) * easeInOutCubic(p),
      behavior: "instant",
    });
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  return true;
}

export const SCROLL_DURATION = DURATION;

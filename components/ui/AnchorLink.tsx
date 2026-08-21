"use client";

import type { ReactNode } from "react";
import { scrollToId } from "@/lib/scroll";

/**
 * Same-page link that hands scrolling to the shared timeline rather than the
 * browser's distance-dependent one.
 */
export function AnchorLink({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        if (scrollToId(id)) {
          e.preventDefault();
          history.replaceState(null, "", `#${id}`);
        }
      }}
    >
      {children}
    </a>
  );
}

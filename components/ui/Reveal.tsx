"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger index — adds 60ms per step. */
  index?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
};

/**
 * Single shared scroll-reveal: 20px translate + fade, once, and a no-op when
 * the visitor has asked for reduced motion.
 */
export function Reveal({ children, index = 0, className, as = "div" }: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.7,
        delay: Math.min(index, 5) * 0.06,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      {children}
    </Tag>
  );
}

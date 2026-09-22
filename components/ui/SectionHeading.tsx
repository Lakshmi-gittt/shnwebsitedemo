"use client";

import { ElementType, useRef } from "react";
import { motion, useScroll, useTransform } from "@/lib/motion";

const ACCENTS = {
  green: { outline: "rgba(57,255,140,0.5)" },
  pink: { outline: "rgba(255,62,200,0.5)" },
  violet: { outline: "rgba(62,142,255,0.5)" },
} as const;

interface SectionHeadingProps {
  children: React.ReactNode;
  accent?: keyof typeof ACCENTS;
  as?: ElementType;
  className?: string;
}

/**
 * SectionHeading
 *
 * A single heading element, styled as large transparent/outlined
 * typography (stroke only, no fill) — no solid box, no border, no
 * background, no glow, and no separate duplicate copy. This IS the
 * section's real heading tag (h1/h2/etc, set via `as`), so it stays fully
 * readable to screen readers regardless of its visual (transparent) fill.
 *
 * Its position is driven directly by scroll progress through its own
 * bounding box (useScroll + useTransform) rather than a one-shot
 * whileInView trigger, so it "falls" into place in sync with the
 * scrollbar and reverses naturally when scrolling back up.
 */
export default function SectionHeading({
  children,
  accent = "green",
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  const { outline } = ACCENTS[accent];
  const wrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "start 0.45"],
  });

  const fallY = useTransform(scrollYProgress, [0, 1], [-56, 0]);
  const fadeIn = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={wrapRef} className="relative">
      <motion.div style={{ y: fallY, opacity: fadeIn }}>
        <Tag
          className={`font-display font-bold uppercase tracking-tight leading-[0.95] text-4xl sm:text-6xl lg:text-7xl ${className}`}
          style={{ WebkitTextStroke: `1.5px ${outline}`, color: "transparent" }}
        >
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}

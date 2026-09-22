"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "@/lib/motion";
import type { LucideIcon } from "lucide-react";

export interface Step {
  icon?: LucideIcon;
  step: string;
  title: string;
  description: string;
  bg?: string;
  rotation?: string;
}

interface ProcessCardsProps {
  steps: Step[];
  /* Header content shown alongside the cards while pinned */
  badge?: string;
  heading?: React.ReactNode;
  subtext?: string;
}

const defaultPalettes = [
  { bg: "bg-[#ff3ec8]" },
  { bg: "bg-[#70d6ff]" },
  { bg: "bg-[#39ff8c]" },
  { bg: "bg-[#ffd166]" },
];

const cardOffsets = [
  { y: 0,  x: 0,  rotate: -1,   zIndex: 10 },
  { y: 12, x: 5,  rotate: 1,    zIndex: 20 },
  { y: 24, x: -3, rotate: -0.5, zIndex: 30 },
  { y: 36, x: 4,  rotate: 1.5,  zIndex: 40 },
];

const TOTAL_STEPS = 4;
const SCROLL_PER_STEP = 300;
const TOTAL_SCROLL = SCROLL_PER_STEP * (TOTAL_STEPS - 1); // 900 px

export default function ProcessCards({ steps, badge, heading, subtext }: ProcessCardsProps) {
  const [revealedCount, setRevealedCount] = useState<number>(1);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onScroll = () => {
      const containerTop = el.getBoundingClientRect().top + window.scrollY;
      const scrolled = window.scrollY - containerTop;
      if (scrolled < 0) { setRevealedCount(1); return; }
      const step = Math.min(TOTAL_STEPS, Math.floor(scrolled / SCROLL_PER_STEP) + 1);
      setRevealedCount(step);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{ height: `calc(100vh + ${TOTAL_SCROLL}px)` }}
      className="relative w-full"
    >
      {/* Sticky frame — fills the viewport, splits into left text + right cards */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">

          {/* ── Two-column grid ────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT: section heading (always visible while pinned) */}
            <div className="flex flex-col gap-5">
              {badge && (
                <p className="font-mono text-xs font-black text-black uppercase tracking-widest bg-[#ff3ec8] inline-block self-start px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
                  {badge}
                </p>
              )}
              {heading && (
                <h2 className="font-display font-black uppercase tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-black leading-[0.95]">
                  {heading}
                </h2>
              )}
              {subtext && (
                <p className="text-neutral-700 font-medium text-base sm:text-lg leading-relaxed max-w-md">
                  {subtext}
                </p>
              )}

              {/* Progress dots — live in the left column on desktop */}
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setRevealedCount(num)}
                      className={`px-3 py-1 rounded-lg border-2 border-black font-mono text-xs font-black transition-all ${
                        revealedCount >= num
                          ? "bg-black text-white shadow-[2px_2px_0px_0px_#000] -translate-y-0.5"
                          : "bg-white text-black/40 hover:text-black hover:bg-neutral-100"
                      }`}
                      aria-label={`Deal to card ${num}`}
                    >
                      0{num}
                    </button>
                  ))}
                </div>
                <p className="font-mono text-xs font-bold text-black/60">
                  {revealedCount < 4 ? (
                    <span>↓ Scroll to reveal card 0{revealedCount + 1}</span>
                  ) : (
                    <span className="text-black font-black">✓ All 4 cards revealed · Keep scrolling</span>
                  )}
                </p>
              </div>
            </div>

            {/* RIGHT: stacked card deck */}
            <div className="relative h-[260px] sm:h-[300px] lg:h-[340px] w-full">
              {steps.map((step, i) => {
                const isRevealed = revealedCount >= i + 1;
                const offset = cardOffsets[i];
                const Icon = step.icon;
                const bg = step.bg || defaultPalettes[i].bg;

                return (
                  <motion.div
                    key={step.step}
                    initial={false}
                    animate={
                      isRevealed
                        ? { y: offset.y, x: offset.x, rotate: offset.rotate, scale: 1, opacity: 1 }
                        : { y: -140, x: 0, rotate: -5, scale: 1.04, opacity: 0 }
                    }
                    transition={
                      isReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                    }
                    style={{ zIndex: offset.zIndex, pointerEvents: isRevealed ? "auto" : "none" }}
                    className={`absolute inset-0 rounded-2xl border-[3px] sm:border-[4px] border-black ${bg} text-black p-6 sm:p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_#000] cursor-pointer select-none hover:shadow-[8px_8px_0px_0px_#000] transition-shadow`}
                    onClick={() => setRevealedCount((prev) => (prev < 4 ? prev + 1 : 1))}
                    title="Click or scroll to deal cards"
                  >
                    {/* Step number + icon */}
                    <div className="flex items-start justify-between border-b-2 border-black pb-4">
                      <span className="font-mono text-6xl sm:text-7xl lg:text-8xl font-black text-black leading-none tracking-tighter">
                        {step.step}
                      </span>
                      {Icon && (
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-black text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                          <Icon size={22} strokeWidth={2.5} />
                        </div>
                      )}
                    </div>

                    {/* Title + description */}
                    <div className="mt-4 sm:mt-6">
                      <h3 className="font-display text-2xl sm:text-3xl font-black text-black mb-1.5 sm:mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-black font-medium text-xs sm:text-sm md:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

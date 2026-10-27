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
  badge?: string;
  heading?: React.ReactNode;
  subtext?: string;
}

const defaultPalettes = [
  { cardBg: "bg-[#fae4f2]", accent: "bg-[#f5d6ed]" },
  { cardBg: "bg-[#e0f4fb]", accent: "bg-[#aeeaf5]" },
  { cardBg: "bg-[#e6f7e2]", accent: "bg-[#d4f5e0]" },
  { cardBg: "bg-[#fde4cf]", accent: "bg-[#ffd34e]" },
];

const cardOffsets = [
  { y: 0,  x: 0, zIndex: 10 },
  { y: 10, x: 0, zIndex: 20 },
  { y: 20, x: 0, zIndex: 30 },
  { y: 30, x: 0, zIndex: 40 },
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
      {/* Sticky frame */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT: section heading */}
            <div className="flex flex-col gap-5">
              {badge && (
                <p className="font-mono text-xs font-bold text-black uppercase tracking-wider bg-[#f5d6ed] inline-block self-start px-3 py-1 border border-black rounded shadow-sm">
                  {badge}
                </p>
              )}
              {heading && (
                <h2 className="font-display font-bold uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl text-black leading-[1.05]">
                  {heading}
                </h2>
              )}
              {subtext && (
                <p className="text-black/75 font-normal text-base sm:text-lg leading-relaxed max-w-md">
                  {subtext}
                </p>
              )}

              {/* Progress dots */}
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setRevealedCount(num)}
                      className={`px-3 py-1 rounded-md border border-black font-mono text-xs font-bold transition-all ${
                        revealedCount >= num
                          ? "bg-black text-white shadow-sm -translate-y-0.5"
                          : "bg-[#fde4cf] text-black/50 hover:text-black hover:bg-neutral-100"
                      }`}
                      aria-label={`Deal to card ${num}`}
                    >
                      0{num}
                    </button>
                  ))}
                </div>
                <p className="font-mono text-xs font-medium text-black/60">
                  {revealedCount < 4 ? (
                    <span>↓ Scroll to reveal step 0{revealedCount + 1}</span>
                  ) : (
                    <span className="text-black font-bold">✓ All 4 steps revealed · Keep scrolling</span>
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
                const palette = defaultPalettes[i % defaultPalettes.length];

                return (
                  <motion.div
                    key={step.step}
                    initial={false}
                    animate={
                      isRevealed
                        ? { y: offset.y, x: 0, rotate: 0, scale: 1, opacity: 1 }
                        : { y: -120, x: 0, rotate: 0, scale: 1.02, opacity: 0 }
                    }
                    transition={
                      isReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
                    }
                    style={{ zIndex: offset.zIndex, pointerEvents: isRevealed ? "auto" : "none" }}
                    className={`absolute inset-0 rounded-xl border-2 border-black ${palette.cardBg} text-black p-6 sm:p-7 flex flex-col justify-between shadow-md cursor-pointer select-none hover:shadow-lg transition-shadow relative overflow-hidden`}
                    onClick={() => setRevealedCount((prev) => (prev < 4 ? prev + 1 : 1))}
                    title="Click or scroll to proceed"
                  >
                    <div className={`absolute top-0 inset-x-0 h-1.5 ${palette.accent}`} />

                    {/* Step number + icon */}
                    <div className="flex items-start justify-between border-b border-black/15 pb-4 pt-1">
                      <span className="font-mono text-5xl sm:text-6xl font-bold text-black/30 leading-none">
                        {step.step}
                      </span>
                      {Icon && (
                        <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center border border-black shadow-sm">
                          <Icon size={18} strokeWidth={2} />
                        </div>
                      )}
                    </div>

                    {/* Title + description */}
                    <div className="mt-3 sm:mt-4">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-black mb-1.5 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-black/75 font-normal text-xs sm:text-sm md:text-base leading-relaxed">
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





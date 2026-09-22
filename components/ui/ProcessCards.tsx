"use client";

import { useState, useEffect, useRef } from "react";
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
}

const defaultPalettes = [
  { bg: "bg-[#ff3ec8]" },
  { bg: "bg-[#70d6ff]" },
  { bg: "bg-[#39ff8c]" },
  { bg: "bg-[#ffd166]" },
];

const cardOffsets = [
  { y: 0, x: 0, rotate: -1, zIndex: 10 },
  { y: 12, x: 5, rotate: 1, zIndex: 20 },
  { y: 24, x: -3, rotate: -0.5, zIndex: 30 },
  { y: 36, x: 4, rotate: 1.5, zIndex: 40 },
];

export default function ProcessCards({ steps }: ProcessCardsProps) {
  const [revealedCount, setRevealedCount] = useState<number>(1);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const revealedCountRef = useRef<number>(1);

  // Sync ref with state
  useEffect(() => {
    revealedCountRef.current = revealedCount;
  }, [revealedCount]);

  // Reduced motion preference check
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll gesture listener (Wheel + Touch)
  useEffect(() => {
    let lastTime = 0;
    const COOLDOWN = 450; // ms debounce per intentional scroll gesture

    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Section is active when its vertical center is near the viewport center
      const isCentered = rect.top < windowHeight * 0.45 && rect.bottom > windowHeight * 0.45;
      if (!isCentered) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 15) return;

      if (delta > 0) {
        // DOWNWARD SCROLL
        if (revealedCountRef.current < 4) {
          e.preventDefault();
          const now = Date.now();
          if (now - lastTime > COOLDOWN) {
            lastTime = now;
            setRevealedCount((prev) => Math.min(4, prev + 1));
          }
        }
        // When revealedCount === 4, don't preventDefault: allow page to continue down
      } else {
        // UPWARD SCROLL
        if (revealedCountRef.current > 1) {
          e.preventDefault();
          const now = Date.now();
          if (now - lastTime > COOLDOWN) {
            lastTime = now;
            setRevealedCount((prev) => Math.max(1, prev - 1));
          }
        }
        // When revealedCount === 1, don't preventDefault: allow page to continue up
      }
    };

    // Mobile touch gestures
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isCentered = rect.top < windowHeight * 0.45 && rect.bottom > windowHeight * 0.45;
      if (!isCentered) return;

      const currentY = e.touches[0].clientY;
      const diff = touchStartY - currentY; // positive = swipe up = scroll down

      if (Math.abs(diff) < 30) return;

      if (diff > 0) {
        // Swipe up / scroll down
        if (revealedCountRef.current < 4) {
          e.preventDefault();
          const now = Date.now();
          if (now - lastTime > COOLDOWN) {
            lastTime = now;
            touchStartY = currentY;
            setRevealedCount((prev) => Math.min(4, prev + 1));
          }
        }
      } else {
        // Swipe down / scroll up
        if (revealedCountRef.current > 1) {
          e.preventDefault();
          const now = Date.now();
          if (now - lastTime > COOLDOWN) {
            lastTime = now;
            touchStartY = currentY;
            setRevealedCount((prev) => Math.max(1, prev - 1));
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto pt-4 pb-8">
      {/* Playing-Card Deck Area */}
      <div className="relative h-[280px] sm:h-[310px] md:h-[330px] w-full">
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
                  ? {
                      y: offset.y,
                      x: offset.x,
                      rotate: offset.rotate,
                      scale: 1,
                      opacity: 1,
                    }
                  : {
                      y: -100,
                      x: 0,
                      rotate: -4,
                      scale: 1.03,
                      opacity: 0,
                    }
              }
              transition={
                isReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              style={{
                zIndex: offset.zIndex,
                pointerEvents: isRevealed ? "auto" : "none",
              }}
              className={`absolute inset-0 rounded-2xl border-[3px] sm:border-[4px] border-black ${bg} text-black p-6 sm:p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_#000] cursor-pointer select-none transition-shadow hover:shadow-[8px_8px_0px_0px_#000]`}
              onClick={() => {
                // Tap/click to advance card
                setRevealedCount((prev) => (prev < 4 ? prev + 1 : 1));
              }}
              title="Click or scroll to deal cards"
            >
              {/* Top row: Giant Step Number + Icon Badge */}
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

              {/* Middle: Title + Description */}
              <div className="mt-4 sm:mt-6">
                <h3 className="font-display text-2xl sm:text-3xl font-black text-black mb-1.5 sm:mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-black font-medium text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Deck Controls & Progress Indicator */}
      <div className="flex flex-col items-center justify-center gap-2.5 mt-16 sm:mt-20">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setRevealedCount(num)}
              className={`px-3 py-1 rounded-lg border-2 border-black font-mono text-xs font-black transition-all ${
                revealedCount >= num
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_#000] -translate-y-0.5"
                  : "bg-white text-black/50 hover:text-black hover:bg-neutral-100"
              }`}
              aria-label={`Deal to card ${num}`}
            >
              0{num}
            </button>
          ))}
        </div>

        <p className="font-mono text-xs font-bold text-black/70 mt-1">
          {revealedCount < 4 ? (
            <span>↓ Scroll down or tap to deal card 0{revealedCount + 1}</span>
          ) : (
            <span className="text-black font-black">✓ All 4 cards dealt · Scroll down to continue</span>
          )}
        </p>
      </div>
    </div>
  );
}

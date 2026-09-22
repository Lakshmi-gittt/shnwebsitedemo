"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "@/lib/motion";
import { Mail, MessageSquare, Lightbulb, Github, Moon, Trophy } from "lucide-react";

const steps = [
  {
    stepNum: "01",
    time: "Immediately",
    title: "Confirmation email",
    description:
      "You'll get a confirmation from hub.tinkerhub.org. Check spam if not seen within 5 minutes.",
    icon: Mail,
    color: "#F28AD8",
  },
  {
    stepNum: "02",
    time: "Day before",
    title: "Discord invite + theme preview",
    description:
      "Join the SHN Discord. The Saturday theme is announced 24 hours in advance.",
    icon: MessageSquare,
    color: "#AEEAF5",
  },
  {
    stepNum: "03",
    time: "Saturday 6:00 PM IST",
    title: "Theme drops. Hacking starts.",
    description:
      "Full challenge brief goes live. Mentors come online. Build — no check-ins, no progress reports.",
    icon: Lightbulb,
    color: "#91E47A",
  },
  {
    stepNum: "04",
    time: "Saturday by midnight",
    title: "Push and submit",
    description:
      "Push to a public GitHub repo and submit via hub.app. A working prototype is enough.",
    icon: Github,
    color: "#FFD34E",
  },
  {
    stepNum: "05",
    time: "Sunday",
    title: "Projects reviewed",
    description:
      "The TinkerHub team reviews all submissions. Standout projects featured in Discord and the archive.",
    icon: Moon,
    color: "#F28AD8",
  },
  {
    stepNum: "06",
    time: "After all 5 nights",
    title: "Finale invitations sent",
    description:
      "Top teams receive direct invitations to the 24-hour offline hackathon at TinkerSpace Kochi.",
    icon: Trophy,
    color: "#AEEAF5",
  },
];

function StepCard({
  step,
  isActive,
}: {
  step: (typeof steps)[0];
  isActive: boolean;
}) {
  const Icon = step.icon;
  return (
    <div
      style={{ backgroundColor: step.color }}
      className={`w-full max-w-md p-5 sm:p-6 rounded-xl border-black text-black transition-all duration-200 ${
        isActive
          ? "scale-[1.02] border-[3.5px] shadow-[6px_6px_0px_0px_#000]"
          : "border-[2.5px] shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000]"
      }`}
    >
      {/* Header: step number + time label + icon */}
      <div className="flex items-center justify-between gap-3 border-b-2 border-black/80 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-black px-2 py-0.5 bg-black text-white rounded border border-black uppercase tracking-wider">
            {step.stepNum}
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
            {step.time}
          </span>
        </div>
        <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center border border-black shrink-0">
          <Icon size={14} strokeWidth={2.5} />
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display font-black text-lg sm:text-xl text-black leading-snug mb-1.5">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-black font-medium text-xs sm:text-sm leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}

export default function AfterRegister() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [ballY, setBallY] = useState<number>(0);
  const [showBall, setShowBall] = useState<boolean>(true);
  const [lineTop, setLineTop] = useState<number>(24);
  const [lineHeight, setLineHeight] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Accessibility: check for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setShowBall(false);
      return;
    }

    const getDotPositions = () => {
      if (!containerRef.current) return [];
      const containerRect = containerRef.current.getBoundingClientRect();
      return dotRefs.current.map((dot) => {
        if (!dot) return 0;
        const dotRect = dot.getBoundingClientRect();
        return dotRect.top - containerRect.top + dotRect.height / 2;
      });
    };

    let animationFrameId: number;
    let lastTimestamp: number | null = null;
    let state: "PAUSED" | "MOVING" = "PAUSED";
    let stateTime = 0;
    let currentStep = 0;

    const SPEED = 200; // constant uniform speed: 200 pixels per second
    const PAUSE_DURATION = 500; // ms brief stop at each step
    const FINAL_PAUSE_DURATION = 900; // ms stop at final step

    const tick = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const positions = getDotPositions();
      if (positions.length >= 6 && positions[0] > 0) {
        setLineTop(positions[0]);
        setLineHeight(positions[5] - positions[0]);

        if (state === "PAUSED") {
          stateTime += delta;
          const targetY = positions[currentStep];
          setBallY(targetY);
          setActiveStep(currentStep);

          const limit = currentStep === 5 ? FINAL_PAUSE_DURATION : PAUSE_DURATION;
          if (stateTime >= limit) {
            if (currentStep < 5) {
              state = "MOVING";
              stateTime = 0;
            } else {
              // Reached final point, loop back to step 0
              currentStep = 0;
              state = "PAUSED";
              stateTime = 0;
            }
          }
        } else if (state === "MOVING") {
          const nextStep = currentStep + 1;
          const startY = positions[currentStep];
          const endY = positions[nextStep];
          const dist = endY - startY;
          const duration = (dist / SPEED) * 1000;

          stateTime += delta;
          const progress = Math.min(stateTime / duration, 1);
          setBallY(startY + progress * (endY - startY));

          if (progress >= 1) {
            currentStep = nextStep;
            state = "PAUSED";
            stateTime = 0;
            setActiveStep(currentStep);
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    const handleResize = () => {
      const pos = getDotPositions();
      if (pos.length >= 6 && pos[0] > 0) {
        setLineTop(pos[0]);
        setLineHeight(pos[5] - pos[0]);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="after-register" className="py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs font-black text-black uppercase tracking-widest mb-3 bg-[#91E47A] inline-block px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
            What Happens Next
          </p>
          <h2 className="font-display font-black uppercase tracking-tight text-4xl sm:text-6xl lg:text-7xl text-black leading-[0.95]">
            After You <span className="text-[#F28AD8]">Register</span>
          </h2>
        </motion.div>

        {/* Timeline Track & Cards */}
        <div ref={containerRef} className="relative">
          {/* The Single Continuous Straight Vertical Line */}
          <div
            className="absolute left-5 md:left-1/2 -translate-x-1/2 w-[3px] bg-black z-0"
            style={{
              top: `${lineTop}px`,
              height: lineHeight > 0 ? `${lineHeight}px` : "100%",
            }}
          />

          {/* Animated Falling Ball traveling down the track */}
          {showBall && (
            <div
              className="absolute left-5 md:left-1/2 -translate-x-1/2 z-20 w-5 h-5 rounded-full bg-[#F28AD8] border-[2.5px] border-black shadow-[1.5px_1.5px_0px_0px_#000] pointer-events-none transition-transform"
              style={{
                top: `${ballY}px`,
                transform: "translate(-50%, -50%)",
              }}
              aria-hidden="true"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white mx-auto mt-0.5" />
            </div>
          )}

          {/* 6 Steps */}
          <div className="space-y-8 md:space-y-12 relative z-10">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0; // 0, 2, 4 -> steps 01, 03, 05 (Left on desktop)
              const isOdd = i % 2 === 1; // 1, 3, 5 -> steps 02, 04, 06 (Right on desktop)
              const isCurrent = activeStep === i;

              return (
                <div key={step.stepNum} className="relative">
                  {/* Stationary Circular Point sitting directly on the line */}
                  <div
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    className={`absolute left-5 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full border-2 border-black transition-all duration-200 flex items-center justify-center ${
                      isCurrent ? "bg-black scale-125" : "bg-white"
                    }`}
                  >
                    {!isCurrent && (
                      <div className="w-1.5 h-1.5 rounded-full bg-black" />
                    )}
                  </div>

                  {/* Desktop Layout (Alternating Left / Right) & Mobile Layout (Right of line) */}
                  <div className="flex flex-col md:flex-row items-start md:items-center pl-12 md:pl-0">
                    {/* Left Slot (Desktop steps 01, 03, 05) */}
                    <div
                      className={`hidden md:flex flex-1 justify-end items-center ${
                        isEven ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      {isEven && (
                        <div className="flex items-center w-full justify-end">
                          <StepCard step={step} isActive={isCurrent} />
                          {/* Horizontal connector to central line */}
                          <div className="w-8 lg:w-12 h-[2.5px] bg-black shrink-0" />
                        </div>
                      )}
                    </div>

                    {/* Center Spacer on Desktop around the line & point */}
                    <div className="hidden md:block w-12 shrink-0" />

                    {/* Right Slot (Desktop steps 02, 04, 06 + Mobile all steps) */}
                    <div
                      className={`flex-1 flex items-center w-full ${
                        isOdd
                          ? "md:opacity-100"
                          : "md:opacity-0 md:pointer-events-none md:hidden"
                      }`}
                    >
                      {/* Mobile horizontal connector */}
                      <div className="md:hidden w-5 h-[2.5px] bg-black shrink-0 -ml-5 mr-2" />
                      {/* Desktop horizontal connector */}
                      <div className="hidden md:block w-8 lg:w-12 h-[2.5px] bg-black shrink-0" />
                      {/* Card */}
                      <StepCard step={step} isActive={isCurrent} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

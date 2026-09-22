"use client";

import { motion } from "@/lib/motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import LiveCountdown from "@/components/ui/LiveCountdown";
import { REGISTER_URL, getNextNight } from "@/lib/data";

const firstWords = ["STOP", "WATCHING."];
const secondWords = ["START", "BUILDING."];

export default function Hero() {
  const nextNight = getNextNight();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 pt-24 pb-16 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center flex flex-col items-center">
        {/* COMPACT MINIMAL HEADLINE WITH FALLING-LETTER ENTRANCE ANIMATION + POST-FALL HIGHLIGHT */}
        <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-8 max-w-5xl flex flex-wrap lg:flex-nowrap justify-center items-center gap-x-2.5 sm:gap-x-3.5 lg:whitespace-nowrap">
          {/* First part: STOP WATCHING. */}
          <span className="inline-flex gap-x-2.5 sm:gap-x-3.5">
            {firstWords.map((word, wordIdx) => {
              const wordChars = word.split("");
              const wordStartIndex = wordIdx === 0 ? 0 : 4;

              return (
                <span key={word} className="inline-flex whitespace-nowrap">
                  {wordChars.map((char, charIdx) => {
                    const letterIndex = wordStartIndex + charIdx;
                    return (
                      <motion.span
                        key={charIdx}
                        initial={{ opacity: 0, y: -80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: letterIndex * 0.11,
                          ease: [0.25, 0.1, 0.25, 1.0],
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </span>

          {/* Second part: START BUILDING. with pink highlight appearing after falling */}
          <span className="relative inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1">
            {/* Pink Highlight Box — sweeps in right after the last letter finishes falling */}
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.35,
                delay: 3.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0 bg-[#F28AD8] -z-0 origin-left rounded-[2px]"
              aria-hidden="true"
            />

            {/* Falling letters for START BUILDING. */}
            <span className="relative z-10 inline-flex gap-x-2.5 sm:gap-x-3.5">
              {secondWords.map((word, wordIdx) => {
                const wordChars = word.split("");
                const wordStartIndex = wordIdx === 0 ? 13 : 18;

                return (
                  <span key={word} className="inline-flex whitespace-nowrap">
                    {wordChars.map((char, charIdx) => {
                      const letterIndex = wordStartIndex + charIdx;
                      return (
                        <motion.span
                          key={charIdx}
                          initial={{ opacity: 0, y: -80 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.45,
                            delay: letterIndex * 0.11,
                            ease: [0.25, 0.1, 0.25, 1.0],
                          }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </span>
                );
              })}
            </span>
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl font-medium text-neutral-800 max-w-2xl leading-relaxed mb-10"
        >
          5 consecutive online build nights. Top builders get invited to a
          24-hour in-person hackathon at TinkerSpace Kochi. Free. No experience needed.
        </motion.p>

        {/* COUNTDOWN SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full mb-10 flex flex-col items-center"
        >
          <LiveCountdown />
        </motion.div>

        {/* NEXT HACK NIGHT DETAIL BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="bg-white border-[3px] border-black rounded-2xl p-4 sm:p-6 shadow-[5px_5px_0px_0px_#000] max-w-xl w-full mb-10 text-left relative"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3 mb-3">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                NEXT HACK NIGHT
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-black">{nextNight.theme}</h2>
            </div>
            <span className="bg-[#39ff8c] text-black font-mono text-xs font-extrabold px-3 py-1 border-2 border-black rounded-lg">
              {nextNight.date} · 6 PM
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
            <div className="bg-neutral-100 p-2 border border-black rounded-lg">
              <span className="text-neutral-500 text-[9px] block uppercase font-bold">Stack</span>
              <span className="font-extrabold text-black">{nextNight.stack}</span>
            </div>
            <div className="bg-neutral-100 p-2 border border-black rounded-lg">
              <span className="text-neutral-500 text-[9px] block uppercase font-bold">Difficulty</span>
              <span className="font-extrabold text-black">{nextNight.difficulty}</span>
            </div>
            <div className="bg-neutral-100 p-2 border border-black rounded-lg">
              <span className="text-neutral-500 text-[9px] block uppercase font-bold">Format</span>
              <span className="font-extrabold text-black">Solo / Team</span>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#39ff8c] text-black font-extrabold text-lg px-8 py-4 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200"
          >
            Join Hack Night
            <ArrowRight size={20} strokeWidth={3} />
          </a>
          <a
            href="#get-selected"
            className="inline-flex items-center justify-center gap-2 bg-white text-black font-extrabold text-lg px-8 py-4 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_#000] hover:bg-neutral-100 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200"
          >
            How it works
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#philosophy"
        className="mt-12 text-black/40 hover:text-black transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={26} strokeWidth={3} />
      </motion.a>
    </section>
  );
}

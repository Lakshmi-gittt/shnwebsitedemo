"use client";

import { motion } from "@/lib/motion";
import type { Testimonial } from "@/lib/data";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  className?: string;
}

const posterPalettes = [
  { bg: "bg-[#ff3ec8]", rotation: "transform -rotate-1" },
  { bg: "bg-[#39ff8c]", rotation: "transform rotate-1" },
  { bg: "bg-[#70d6ff]", rotation: "transform -rotate-0.5" },
  { bg: "bg-[#ffd166]", rotation: "transform rotate-1.5" },
  { bg: "bg-white", rotation: "transform -rotate-1" },
];

export default function TestimonialCard({
  testimonial,
  index,
  className,
}: TestimonialCardProps) {
  const palette = posterPalettes[index % posterPalettes.length];

  return (
    <motion.div
      className={cn(
        `rounded-xl sm:rounded-2xl border-[3px] sm:border-[4px] border-black ${palette.bg} text-black p-6 sm:p-8 shadow-[5px_5px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_#000] transition-all duration-200 ${palette.rotation} break-inside-avoid`,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <span className="font-display font-black text-5xl sm:text-6xl text-black leading-none block mb-2 opacity-80">
        &ldquo;
      </span>
      <p className="font-display text-lg sm:text-xl font-black text-black leading-snug mb-5">
        {testimonial.quote}
      </p>
      <div className="pt-3 border-t-2 border-black inline-block">
        <span className="font-mono text-xs font-black uppercase tracking-wider bg-black text-white px-3 py-1 rounded border border-black inline-block shadow-[2px_2px_0px_0px_#000]">
          — {testimonial.name}
        </span>
      </div>
    </motion.div>
  );
}

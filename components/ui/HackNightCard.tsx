"use client";

import { motion } from "@/lib/motion";
import { CalendarDays, Code2, ArrowRight } from "lucide-react";
import type { HackNight } from "@/lib/data";
import { REGISTER_URL } from "@/lib/data";

interface HackNightCardProps { event: HackNight; index: number; }

const posterPalettes = [
  { bg: "bg-[#ff3ec8]", tagBg: "bg-black text-white", btnBg: "bg-black text-white" },
  { bg: "bg-[#39ff8c]", tagBg: "bg-black text-white", btnBg: "bg-black text-white" },
  { bg: "bg-[#70d6ff]", tagBg: "bg-black text-white", btnBg: "bg-black text-white" },
  { bg: "bg-[#ffd166]", tagBg: "bg-black text-white", btnBg: "bg-black text-white" },
  { bg: "bg-[#ffffff]", tagBg: "bg-[#ff3ec8] text-black", btnBg: "bg-black text-white" },
];

const cardRotations = [
  "transform -rotate-1",
  "transform rotate-1",
  "transform -rotate-0.5",
  "transform rotate-1.5",
];

export default function HackNightCard({ event, index }: HackNightCardProps) {
  const palette = posterPalettes[index % posterPalettes.length];
  const rotation = cardRotations[index % cardRotations.length];
  const stacks = event.stack.split(", ");

  return (
    <motion.div
      className={`relative rounded-xl border-[3px] border-black ${palette.bg} text-black flex flex-col overflow-hidden shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-200 ${rotation}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Top row */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <span className={`font-mono text-xs px-2.5 py-1 rounded font-black uppercase tracking-wider border border-black ${palette.tagBg}`}>
            {event.difficulty}
          </span>
          <span className="font-mono text-xs font-black text-black/70">#{String(event.id).padStart(2, "0")}</span>
        </div>

        {/* Theme */}
        <div>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-black leading-tight mb-2">
            {event.theme}
          </h3>
          <p className="text-black/80 text-sm font-medium leading-relaxed line-clamp-2">{event.about}</p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-black font-mono font-bold text-xs">
          <CalendarDays size={14} className="stroke-[2.5]" />
          <span>{event.date} · 6:00 PM IST</span>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <Code2 size={14} className="stroke-[2.5] text-black shrink-0" />
          {stacks.map((s) => (
            <span key={s} className="font-mono text-xs bg-white text-black font-extrabold border border-black rounded px-2 py-0.5">
              {s.trim()}
            </span>
          ))}
        </div>

        {/* Mentors */}
        {event.mentors.length > 0 && (
          <p className="font-mono text-xs font-bold text-black/70 line-clamp-1">
            Mentors: {event.mentors.map((m) => m.name).join(", ")}
          </p>
        )}

        {/* CTAs */}
        <div className="mt-auto pt-4 flex items-center gap-3 border-t-2 border-black">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 text-center font-extrabold text-sm py-2.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150 ${palette.btnBg}`}
          >
            Register
          </a>
          <a
            href={`/saturday-hack-night/events/${event.slug}/`}
            className="flex items-center gap-1 font-mono text-xs font-extrabold text-black hover:underline"
          >
            Details
            <ArrowRight size={13} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

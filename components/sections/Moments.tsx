"use client";

import { motion } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import { moments } from "@/lib/data";
import MomentsScroller from "@/components/ui/MomentsScroller";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Moments() {
  return (
    <section id="moments" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 mb-14">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="font-mono text-xs text-black font-extrabold uppercase tracking-widest mb-3 bg-[#39ff8c] inline-block px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
              Event Archive
            </p>
            <SectionHeading accent="violet" className="mb-2">Moments</SectionHeading>
            <p className="text-neutral-800 font-medium text-lg max-w-xl">
              Photographic memory of Saturday nights, build sprints, and TinkerSpace Kochi.
            </p>
          </div>
          <a
            href="/saturday-hack-night/moments/"
            className="inline-flex items-center gap-2 font-mono text-sm font-extrabold text-black bg-white border-[3px] border-black px-6 py-3.5 rounded-xl shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] transition-all shrink-0"
          >
            View all moments
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
        </motion.div>
      </div>

      <MomentsScroller photos={moments} />
    </section>
  );
}

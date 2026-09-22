"use client";

import { motion } from "@/lib/motion";
import HackNightCard from "@/components/ui/HackNightCard";
import { upcomingNights } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Timeline() {
  return (
    <section id="timeline" className="py-32 px-5 sm:px-8 relative dark-grid-bg">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="font-mono text-xs text-[#39ff8c] uppercase tracking-widest mb-4">Season 02 · 2026</p>
            <SectionHeading accent="green">Upcoming Hack Nights</SectionHeading>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <div className="flex flex-wrap gap-2 justify-end">
              {["Free", "Solo or 2", "Any stack", "Push by midnight"].map((t) => (
                <span key={t} className="font-mono text-[10px] border border-white/[0.08] text-white/30 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cards — mobile: horizontal scroll, md+: grid */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-5 px-5">
          {upcomingNights.map((event, i) => (
            <div key={event.id} className="min-w-[80vw] snap-start shrink-0">
              <HackNightCard event={event} index={i} />
            </div>
          ))}
        </div>
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {upcomingNights.map((event, i) => (
            <HackNightCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "@/lib/motion";
import { ArrowRight, Star, Users, FolderGit2, ExternalLink } from "lucide-react";
import { pastHackNights } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const posterConfigs = [
  {
    colSpan: "lg:col-span-7",
    bg: "bg-[#ff3ec8]",
    rotation: "transform -rotate-1.5",
    badgeBg: "bg-white text-black",
  },
  {
    colSpan: "lg:col-span-5",
    bg: "bg-[#70d6ff]",
    rotation: "transform rotate-2",
    badgeBg: "bg-white text-black",
  },
  {
    colSpan: "lg:col-span-12",
    bg: "bg-[#39ff8c]",
    rotation: "transform -rotate-1",
    badgeBg: "bg-white text-black",
  },
];

export default function PreviousNights() {
  const recent = pastHackNights.slice(0, 3);

  return (
    <section id="past-nights" className="py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="font-mono text-xs text-black font-extrabold uppercase tracking-widest mb-3 bg-[#ff3ec8] inline-block px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
              Season 01 · 2025
            </p>
            <SectionHeading accent="green" className="mb-2">What Was Built</SectionHeading>
            <p className="text-neutral-800 font-medium text-lg max-w-xl">
              Physical event poster archive of past build sprints.
            </p>
          </div>
          <a
            href="/saturday-hack-night/archive/"
            className="inline-flex items-center gap-2 font-mono text-sm font-extrabold text-black bg-white border-[3px] border-black px-6 py-3.5 rounded-xl shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] transition-all shrink-0"
          >
            View all archives
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
        </motion.div>

        {/* Asymmetric Physical Event Poster Wall */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {recent.map((night, i) => {
            const config = posterConfigs[i % posterConfigs.length];
            return (
              <motion.a
                key={night.slug}
                href={`/saturday-hack-night/archive/${night.slug}/`}
                className={`group ${config.colSpan} block rounded-2xl border-[3px] sm:border-[4px] border-black ${config.bg} text-black p-6 sm:p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200 ${config.rotation}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div>
                  {/* Top Poster Header */}
                  <div className="flex items-start justify-between border-b-2 border-black pb-4 mb-6">
                    <div>
                      <span className="font-mono text-xs font-black uppercase tracking-wider bg-black text-white px-2.5 py-1 rounded border border-black inline-block mb-1">
                        POSTER ARCHIVE
                      </span>
                      <div className="font-mono text-xs font-bold text-black/80">{night.date}</div>
                    </div>
                    <div className="font-mono text-5xl sm:text-6xl lg:text-7xl font-black text-black leading-none tracking-tighter">
                      #{String(night.id).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Main Event Title */}
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-[0.98] mb-3">
                    {night.theme}
                  </h3>

                  <p className="font-mono text-xs sm:text-sm font-extrabold text-black/80 bg-white/70 px-3 py-1 border border-black rounded inline-block mb-6">
                    STACK: {night.stack}
                  </p>

                  {/* Best Project Card */}
                  <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_#000] mb-6">
                    <div className="flex items-center gap-2 font-mono text-[10px] font-black text-black uppercase tracking-widest mb-1">
                      <Star size={14} className="text-black stroke-[2.5]" />
                      <span>BEST PROJECT</span>
                    </div>
                    <p className="text-base sm:text-lg font-black text-black">{night.bestProject.name}</p>
                    <p className="font-mono text-xs font-bold text-black/70">built by {night.bestProject.creator}</p>
                  </div>
                </div>

                {/* Bottom Footer Stats & Action */}
                <div className="pt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 bg-white border border-black px-2.5 py-1 rounded text-black font-mono text-xs font-bold">
                      <Users size={13} strokeWidth={2.5} />
                      <span>{night.participants} builders</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white border border-black px-2.5 py-1 rounded text-black font-mono text-xs font-bold">
                      <FolderGit2 size={13} strokeWidth={2.5} />
                      <span>{night.submittedCount} projects</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-black text-white font-mono text-xs font-black px-4 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] group-hover:translate-x-0.5 transition-all">
                    <span>Explore Event</span>
                    <ExternalLink size={13} strokeWidth={2.5} />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

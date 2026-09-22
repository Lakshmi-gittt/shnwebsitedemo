"use client";

import { motion } from "@/lib/motion";
import { ArrowRight, Star, Users, FolderGit2, ArrowLeft } from "lucide-react";
import { pastHackNights } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const archivePalettes = [
  { bg: "bg-[#ff3ec8]", badgeBg: "bg-white text-black" },
  { bg: "bg-[#39ff8c]", badgeBg: "bg-white text-black" },
  { bg: "bg-[#70d6ff]", badgeBg: "bg-white text-black" },
  { bg: "bg-[#ffd166]", badgeBg: "bg-white text-black" },
];

const archiveRotations = [
  "transform -rotate-1",
  "transform rotate-1",
  "transform -rotate-0.5",
  "transform rotate-1.5",
];

export default function ArchivePage() {
  const totalParticipants = pastHackNights.reduce(
    (sum, n) => sum + n.participants,
    0
  );
  const totalProjects = pastHackNights.reduce(
    (sum, n) => sum + n.submittedCount,
    0
  );

  return (
    <main
      className="min-h-screen pb-20"
      style={{ backgroundColor: "#f5f4ee", color: "#000000" }}
    >
      {/* Nav back */}
      <div className="sticky top-0 z-50 border-b-2 border-black bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <a
            href="/saturday-hack-night/"
            className="flex items-center gap-2 font-mono text-sm font-bold text-black hover:underline"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            Back to SHN
          </a>
          <span className="text-black/30">/</span>
          <span className="font-mono text-sm font-extrabold text-black">Archive</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Page header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs font-extrabold uppercase tracking-widest mb-3 bg-[#ff3ec8] text-black inline-block px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
            Every Night. Every Project.
          </p>
          <SectionHeading accent="pink" as="h1" className="mb-4">Past Hack Nights</SectionHeading>
          <p className="text-neutral-800 font-medium text-lg max-w-xl">
            A record of every Saturday, every theme, and every project shipped
            by the SHN community.
          </p>

          {/* Aggregate stats */}
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-8">
            {[
              {
                value: pastHackNights.length,
                label: "Hack Nights",
                bg: "bg-[#ff3ec8]",
              },
              {
                value: totalParticipants + "+",
                label: "Builders",
                bg: "bg-[#39ff8c]",
              },
              {
                value: totalProjects + "+",
                label: "Projects Shipped",
                bg: "bg-[#70d6ff]",
              },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} text-black border-[3px] border-black rounded-xl p-4 min-w-[140px] shadow-[3px_3px_0px_0px_#000]`}>
                <div className="font-mono text-3xl font-black">
                  {stat.value}
                </div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hack night cards */}
        <div className="space-y-6">
          {pastHackNights.map((night, i) => {
            const palette = archivePalettes[i % archivePalettes.length];
            const rotation = archiveRotations[i % archiveRotations.length];
            return (
              <motion.a
                key={night.slug}
                href={`/saturday-hack-night/archive/${night.slug}/`}
                className={`rounded-2xl border-[3px] border-black ${palette.bg} text-black p-6 sm:p-8 flex flex-col sm:flex-row gap-6 group shadow-[5px_5px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_#000] transition-all duration-200 block ${rotation}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                {/* Left: Number */}
                <div className="shrink-0">
                  <div className="font-mono text-4xl sm:text-5xl font-black text-black leading-none w-20">
                    #{String(night.id).padStart(3, "0")}
                  </div>
                </div>

                {/* Center: Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-black">
                      {night.theme}
                    </h2>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded font-black uppercase tracking-wider bg-black text-white border border-black">
                      {night.difficulty}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4 font-mono text-xs font-bold text-black/80">
                    <span className="bg-white/70 px-2 py-0.5 rounded border border-black">{night.date}</span>
                    <span className="bg-white/70 px-2 py-0.5 rounded border border-black">{night.stack}</span>
                  </div>

                  {/* Best project preview */}
                  <div className={`flex items-start gap-2.5 p-3.5 rounded-xl border-2 border-black mb-4 max-w-lg shadow-[2px_2px_0px_0px_#000] ${palette.badgeBg}`}>
                    <Star size={14} className="text-black mt-0.5 shrink-0 stroke-[2.5]" />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] font-black text-black mb-0.5 uppercase tracking-widest">
                        Best Project
                      </p>
                      <p className="font-extrabold text-black text-sm truncate">
                        {night.bestProject.name}
                      </p>
                      <p className="font-mono text-xs font-bold text-black/70">
                        {night.bestProject.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-white border border-black px-2 py-1 rounded text-black font-mono text-xs font-bold">
                      <Users size={13} strokeWidth={2.5} />
                      <span>{night.participants} builders</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white border border-black px-2 py-1 rounded text-black font-mono text-xs font-bold">
                      <FolderGit2 size={13} strokeWidth={2.5} />
                      <span>{night.submittedCount} projects submitted</span>
                    </div>
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="shrink-0 flex items-center">
                  <div className="flex items-center gap-2 font-mono text-xs font-black bg-black text-white px-4 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] group-hover:translate-x-0.5 transition-all">
                    <span>View projects</span>
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </main>
  );
}

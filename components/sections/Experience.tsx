"use client";

import { motion } from "@/lib/motion";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { testimonials } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = [
  { value: "5", label: "Online Sprints", bg: "bg-[#39ff8c]", rotation: "transform -rotate-1" },
  { value: "24h", label: "Grand Finale", bg: "bg-[#ff3ec8]", rotation: "transform rotate-1.5" },
  { value: "∞", label: "Things to Build", bg: "bg-[#70d6ff]", rotation: "transform -rotate-0.5" },
  { value: "0", label: "Prior XP Needed", bg: "bg-[#ffd166]", rotation: "transform rotate-1" },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* By The Numbers — Poster Blocks */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs font-black text-black uppercase tracking-widest mb-4 bg-[#ffd166] inline-block px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] transform -rotate-1">
            By The Numbers
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`rounded-xl sm:rounded-2xl border-[3px] sm:border-[4px] border-black ${stat.bg} text-black p-6 sm:p-8 flex flex-col justify-between shadow-[5px_5px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_#000] transition-all duration-200 ${stat.rotation}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="font-mono text-5xl sm:text-6xl lg:text-7xl font-black text-black mb-3 leading-none tracking-tighter">
                  {stat.value}
                </div>
                <div className="pt-3 border-t-2 border-black inline-block">
                  <span className="font-mono text-xs font-black text-black uppercase tracking-widest bg-white/80 px-2.5 py-1 rounded border border-black inline-block shadow-[1px_1px_0px_0px_#000]">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Builders Speak / Testimonials */}
        <div>
          <div className="mb-10 text-center sm:text-left">
            <p className="font-mono text-xs font-black text-black uppercase tracking-widest mb-3 bg-[#ff3ec8] inline-block px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] transform rotate-1">
              Builders Speak
            </p>
            <SectionHeading accent="violet" className="mb-2">The Vibe</SectionHeading>
            <p className="text-neutral-800 font-medium text-lg max-w-xl">
              Quotes and feedback from makers who shipped at Saturday Hack Night.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

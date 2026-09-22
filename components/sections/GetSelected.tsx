"use client";

import { motion } from "@/lib/motion";
import { Github, Users, Code2, Trophy } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessCards from "@/components/ui/ProcessCards";

const steps = [
  {
    icon: Github,
    step: "01",
    title: "Register & Attend",
    description: "Show up on Saturday at 6 PM IST — online, no travel needed. Free and open to all builders.",
    bg: "bg-[#ff3ec8]",
    rotation: "transform -rotate-1",
  },
  {
    icon: Users,
    step: "02",
    title: "Build Solo or in Pair",
    description: "Max 2 per team. Any language, framework, hardware, or API. Stack suggestions are starting points.",
    bg: "bg-[#70d6ff]",
    rotation: "transform rotate-1",
  },
  {
    icon: Code2,
    step: "03",
    title: "Ship & Push Code",
    description: "Build something real, push code to GitHub before midnight, and submit your project proof.",
    bg: "bg-[#39ff8c]",
    rotation: "transform -rotate-0.5",
  },
  {
    icon: Trophy,
    step: "04",
    title: "Get Invited to Finale",
    description: "Top teams from the 5 online build sprints get direct invitations to the 24-hour in-person hackathon at TinkerSpace Kochi.",
    bg: "bg-[#ffd166]",
    rotation: "transform rotate-1.5",
  },
];

export default function GetSelected() {
  return (
    <section id="get-selected" className="py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14 text-center sm:text-left"
        >
          <p className="font-mono text-xs font-black text-black uppercase tracking-widest mb-3 bg-[#ff3ec8] inline-block px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
            Your Path to the Finale
          </p>
          <h2 className="font-display font-black uppercase tracking-tight text-4xl sm:text-6xl lg:text-7xl text-black leading-[0.95] mb-4">
            Build. Ship. <span className="text-[#ff3ec8]">Get Invited.</span>
          </h2>
          <p className="text-neutral-800 font-medium text-lg sm:text-xl max-w-2xl leading-relaxed">
            There is no jury during the hack night. Just build something real, push it to GitHub, and let your project speak for itself.
          </p>
        </motion.div>

        {/* 4 Poster Step Blocks */}
        <ProcessCards steps={steps} />
      </div>
    </section>
  );
}

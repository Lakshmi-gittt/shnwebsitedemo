"use client";

import { motion } from "@/lib/motion";
import { ArrowRight, Package } from "lucide-react";
import { DISCORD_URL, STICKERS_URL } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Community() {
  return (
    <section id="community" className="py-32 px-5 sm:px-8 relative dark-grid-bg">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-[#39ff8c] uppercase tracking-widest mb-4">Join the Network</p>
          <SectionHeading accent="green" className="mb-4">2,400+ Builders</SectionHeading>
          <p className="text-white font-bold text-xl mb-6">Zero gatekeeping.</p>
          <p className="text-white/40 text-lg leading-relaxed mb-10">
            Real-time help, build logs, and event announcements. Jump in, ask questions, show your work.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#5865f2] text-white font-bold text-base px-7 py-4 rounded-xl hover:bg-[#4752c4] transition-colors"
            >
              Join Discord
              <ArrowRight size={18} />
            </a>
            <a
              href={STICKERS_URL}
              className="inline-flex items-center justify-center gap-2 border border-[#39ff8c]/20 text-[#39ff8c] font-semibold text-base px-7 py-4 rounded-xl hover:bg-[#39ff8c]/[0.06] transition-colors"
            >
              <Package size={18} />
              Claim Sticker Pack
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

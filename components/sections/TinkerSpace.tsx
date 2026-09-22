"use client";

import { motion } from "@/lib/motion";
import { MapPin, Navigation, Clock } from "lucide-react";
import { TINKERSPACE_MAPS_URL } from "@/lib/data";

export default function TinkerSpace() {
  return (
    <section id="tinkerspace" className="py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center sm:text-left"
        >
          <p className="font-mono text-xs font-black text-black uppercase tracking-widest mb-3 bg-[#ffd166] inline-block px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] transform -rotate-1">
            The Offline Finale Venue
          </p>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-black tracking-tight leading-[0.95] mb-4">
            TINKERSPACE:{" "}
            <span className="inline-block bg-[#ff3ec8] text-black px-3 sm:px-4 py-1 border-[3px] sm:border-[4px] border-black shadow-[4px_4px_0px_0px_#000] rounded-xl transform rotate-1 mt-2 sm:mt-0">
              THE FINAL 24-HOUR BUILD
            </span>
          </h2>

          <p className="text-neutral-800 font-medium text-lg sm:text-xl max-w-2xl leading-relaxed mt-4">
            TinkerHub Foundation&apos;s physical maker lab. Where hardware meets software. Where ideas become prototypes overnight.
          </p>
        </motion.div>

        {/* Editorial Poster Layout: Hero Image + Info Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left / Top: Major Visual Hero Image Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative group transform -rotate-1"
          >
            {/* Overlapping Venue Tag Badge */}
            <div className="absolute -top-4 left-4 sm:left-6 z-20">
              <div className="flex items-center gap-2 bg-[#39ff8c] text-black font-mono text-xs font-black px-4 py-2 border-[3px] border-black rounded-lg shadow-[3px_3px_0px_0px_#000]">
                <MapPin size={16} strokeWidth={2.5} className="text-black shrink-0" />
                <span>FINALE LOCATION: KOCHI, KERALA</span>
              </div>
            </div>

            {/* Poster Frame Container */}
            <div className="relative w-full border-[3px] sm:border-[4px] border-black bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200 p-2 sm:p-3">
              <div className="rounded-lg overflow-hidden aspect-[16/10] bg-[#f5f4ee]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/saturday-hack-night/tinkerspace/tinkerspace-kochi.webp"
                  alt="TinkerSpace Kochi — venue for the SHN offline finale"
                  loading="lazy"
                  className="w-full h-full object-cover block"
                />
              </div>

              <div className="p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 border-t-2 border-black mt-2">
                <span className="font-mono text-xs font-black text-black uppercase tracking-wider">
                  TINKERSPACE • MAKER LAB & FINALE VENUE
                </span>
                <span className="font-mono text-xs font-extrabold bg-[#70d6ff] text-black px-2.5 py-0.5 border border-black rounded">
                  24 HOURS IN PERSON
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right / Side: Solid Poster Info Blocks */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Solid Pink Poster Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#ff3ec8] text-black border-[3px] sm:border-[4px] border-black rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-[5px_5px_0px_0px_#000] transform rotate-1 flex-1 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-wider bg-black text-white px-3 py-1 rounded border border-black inline-block mb-3">
                  THE FINALE EXPERIENCE
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-black mb-3 leading-tight">
                  OVERNIGHT SPRINT IN KOCHI
                </h3>
                <p className="text-black font-medium text-base sm:text-lg leading-relaxed">
                  The SHN finale is a 24-hour hackathon held at TinkerSpace — selected teams arrive in the evening, hack through the night, and present in the morning.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-black flex items-center gap-2 font-mono text-xs font-black">
                <Clock size={16} strokeWidth={2.5} />
                <span>24-HOUR NON-STOP BUILD</span>
              </div>
            </motion.div>

            {/* Solid Blue Poster Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#70d6ff] text-black border-[3px] sm:border-[4px] border-black rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-[5px_5px_0px_0px_#000] transform -rotate-1 flex-1 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-wider bg-black text-white px-3 py-1 rounded border border-black inline-block mb-3">
                  VENUE LOCATION
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-black mb-2 leading-tight">
                  TINKERSPACE, KOCHI
                </h3>
                <p className="text-black font-medium text-base leading-relaxed">
                  TinkerSpace, Kochi, Kerala, India — ~30 min from Kochi Central Railway Station.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-black flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-black">
                  Kochi, Kerala
                </span>
                <a
                  href={TINKERSPACE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-black text-white font-mono text-xs font-black px-3.5 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-0.5 transition-all"
                >
                  <Navigation size={13} strokeWidth={2.5} />
                  <span>Open Maps</span>
                </a>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}

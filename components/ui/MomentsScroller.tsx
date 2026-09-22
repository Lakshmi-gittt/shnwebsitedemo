"use client";

import { motion } from "@/lib/motion";
import { Camera } from "lucide-react";

interface MomentsScrollerProps {
  photos: string[];
  slotCount?: number;
  vhPerSlot?: number;
  className?: string;
}

const collageItems = [
  {
    tag: "MOMENT #01",
    tagBg: "bg-[#ff3ec8]",
    colSpan: "lg:col-span-8",
    aspect: "aspect-[16/10]",
    rotation: "transform -rotate-1.5",
  },
  {
    tag: "MOMENT #02",
    tagBg: "bg-[#70d6ff]",
    colSpan: "lg:col-span-4",
    aspect: "aspect-[4/5]",
    rotation: "transform rotate-2.5",
  },
  {
    tag: "MOMENT #03",
    tagBg: "bg-[#39ff8c]",
    colSpan: "lg:col-span-5",
    aspect: "aspect-[4/3]",
    rotation: "transform -rotate-2",
  },
  {
    tag: "MOMENT #04",
    tagBg: "bg-[#ffd166]",
    colSpan: "lg:col-span-7",
    aspect: "aspect-[16/9]",
    rotation: "transform rotate-1",
  },
];

export default function MomentsScroller({
  photos,
  className = "",
}: MomentsScrollerProps) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-8 ${className}`}>
      {/* Asymmetric Scrapbook Photo Collage Wall */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {collageItems.map((item, i) => {
          const photo = photos[i % photos.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${item.colSpan} ${item.rotation} group`}
            >
              {/* Overlapping Solid Color Label Badge */}
              <div className="absolute -top-4 -left-3 z-20">
                <span className={`font-mono text-xs font-black text-black uppercase tracking-wider px-3.5 py-1.5 border-[3px] border-black shadow-[3px_3px_0px_0px_#000] rounded-md inline-block ${item.tagBg}`}>
                  {item.tag}
                </span>
              </div>

              {/* Photo Card Container */}
              <div className={`relative ${item.aspect} w-full border-[3px] sm:border-[4px] border-black bg-white rounded-xl overflow-hidden shadow-[6px_6px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200`}>
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo}
                    alt={item.tag}
                    loading="lazy"
                    className="w-full h-full object-cover block"
                  />
                ) : (
                  <div className="w-full h-full bg-[#f5f4ee] flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-black/30">
                    <Camera size={36} className="text-black/40 mb-3 stroke-[2]" />
                    <span className="font-mono text-xs font-black text-black/60 uppercase tracking-widest">
                      {item.tag}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

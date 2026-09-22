"use client";

import { ArrowLeft } from "lucide-react";
import { moments, MOMENTS_PLACEHOLDER_COUNT } from "@/lib/data";
import MomentsScroller from "@/components/ui/MomentsScroller";
import SectionHeading from "@/components/ui/SectionHeading";

export default function MomentsPage() {
  return (
    <main
      className="min-h-screen dark-grid-bg"
      style={{ color: "#ffffff" }}
    >
      {/* Nav back */}
      <div className="sticky top-0 z-50 border-b border-white/8 bg-[#000000]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <a
            href="/saturday-hack-night/"
            className="flex items-center gap-2 font-mono text-sm text-[#9a90b8] hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to SHN
          </a>
          <span className="text-white/20">/</span>
          <span className="font-mono text-sm text-white">Moments</span>
        </div>
      </div>

      <div className="px-4 sm:px-6 pt-16 pb-10 max-w-6xl mx-auto">
        <SectionHeading accent="green" as="h1">Moments</SectionHeading>
      </div>

      <MomentsScroller
        photos={moments}
        slotCount={MOMENTS_PLACEHOLDER_COUNT}
        vhPerSlot={70}
      />
    </main>
  );
}

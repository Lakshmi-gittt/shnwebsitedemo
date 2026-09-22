"use client";

import { useEffect, useState } from "react";
import { getNextNightDate } from "@/lib/data";

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) { return String(n).padStart(2, "0"); }

function DigitBlock({ value, label, bgColor }: { value: number; label: string; bgColor: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`${bgColor} text-black border-[3px] sm:border-[4px] border-black rounded-xl sm:rounded-2xl w-16 h-20 sm:w-24 sm:h-28 md:w-28 md:h-32 flex items-center justify-center shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000]`}>
        <span className="font-mono text-3xl sm:text-5xl md:text-6xl font-black tracking-tight tabular-nums text-black">
          {pad(value)}
        </span>
      </div>
      <span className="font-mono text-[10px] sm:text-xs md:text-sm font-bold text-black uppercase tracking-widest mt-2.5 px-2 py-0.5 border border-black bg-white rounded">
        {label}
      </span>
    </div>
  );
}

export default function LiveCountdown() {
  const [target] = useState(() => getNextNightDate());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div
      className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`}
    >
      <DigitBlock value={timeLeft.days} label="DAYS" bgColor="bg-[#70d6ff]" />
      <DigitBlock value={timeLeft.hours} label="HOURS" bgColor="bg-[#39ff8c]" />
      <DigitBlock value={timeLeft.minutes} label="MINUTES" bgColor="bg-[#ff3ec8]" />
      <DigitBlock value={timeLeft.seconds} label="SECONDS" bgColor="bg-[#ffd166]" />
    </div>
  );
}

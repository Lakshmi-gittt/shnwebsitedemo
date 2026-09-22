"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { Plus, Minus } from "lucide-react";
import { faq } from "@/lib/data";

const faqStyles = [
  { bg: "bg-[#ff3ec8]", rotation: "transform -rotate-1" },
  { bg: "bg-[#70d6ff]", rotation: "transform rotate-1" },
  { bg: "bg-[#39ff8c]", rotation: "" },
  { bg: "bg-[#ffd166]", rotation: "transform -rotate-0.5" },
  { bg: "bg-[#ff3ec8]", rotation: "transform rotate-1" },
  { bg: "bg-[#70d6ff]", rotation: "" },
  { bg: "bg-[#39ff8c]", rotation: "transform -rotate-1" },
  { bg: "bg-[#ffd166]", rotation: "transform rotate-0.5" },
  { bg: "bg-[#ff3ec8]", rotation: "" },
  { bg: "bg-[#70d6ff]", rotation: "transform rotate-1" },
];

function FAQCard({
  item,
  index,
}: {
  item: { question: string; answer: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const style = faqStyles[index % faqStyles.length];
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-btn-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`rounded-xl border-[3px] border-black ${style.bg} text-black p-5 sm:p-6 shadow-[5px_5px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_#000] transition-all duration-200 ${style.rotation}`}
    >
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-display font-black text-lg sm:text-xl text-black leading-snug">
          {item.question}
        </span>
        <span
          className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg border-2 border-black bg-white/40 flex items-center justify-center text-black transition-transform duration-150"
          aria-hidden="true"
        >
          {open ? (
            <Minus size={20} strokeWidth={3} />
          ) : (
            <Plus size={20} strokeWidth={3} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t-2 border-black mt-4 pt-4">
              <p className="text-black font-medium text-sm sm:text-base leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="mb-14 text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs font-black text-black uppercase tracking-widest mb-3 bg-[#ffd166] inline-block px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">
            Common Questions
          </p>
          <h2 className="font-display font-black uppercase tracking-tight text-4xl sm:text-6xl lg:text-7xl text-black leading-[0.95]">
            Everything You Need to Know
          </h2>
        </motion.div>

        {/* 2-Column Responsive Neo-Brutalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
          {faq.map((item, i) => (
            <FAQCard key={item.question} item={item} index={i} />
          ))}
        </div>

        {/* Neo-Brutalist Discord CTA */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_#000]">
            <span className="text-black font-bold text-base sm:text-lg">
              Still have questions?
            </span>
            <a
              href="https://discord.gg/tinkerhub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff3ec8] text-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] transition-all"
            >
              Ask in Discord
            </a>
            <span className="text-neutral-800 text-sm font-semibold">
              — someone answers within hours.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

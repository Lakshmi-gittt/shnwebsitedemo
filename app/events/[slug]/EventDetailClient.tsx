"use client";

import { motion } from "@/lib/motion";
import {
  ArrowLeft,
  CalendarDays,
  Code2,
  Users,
  Github,
  Twitter,
  BookOpen,
  FileText,
  Video,
  Link as LinkIcon,
  ArrowRight,
  Target,
} from "lucide-react";
import type { HackNight, Resource } from "@/lib/data";
import { REGISTER_URL } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const difficultyConfig = {
  Beginner: { color: "#39ff8c", bg: "rgba(57,255,140,0.1)" },
  Intermediate: { color: "#ff3ec8", bg: "rgba(255,62,200,0.1)" },
  Advanced: { color: "#ff8fe0", bg: "rgba(255,143,224,0.1)" },
};

const resourceIcons = {
  docs: BookOpen,
  article: FileText,
  video: Video,
  repo: Github,
};

export default function EventDetailClient({ night }: { night: HackNight }) {
  const diff = difficultyConfig[night.difficulty];

  return (
    <main
      className="min-h-screen dark-grid-bg"
      style={{ color: "#ffffff" }}
    >
      {/* Breadcrumb nav */}
      <div className="sticky top-0 z-50 border-b border-white/8 bg-[#000000]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4 font-mono text-sm text-[#9a90b8]">
          <a href="/saturday-hack-night/" className="hover:text-white transition-colors">
            SHN
          </a>
          <span className="text-white/20">/</span>
          <a href="/saturday-hack-night/#timeline" className="hover:text-white transition-colors">
            Events
          </a>
          <span className="text-white/20">/</span>
          <span className="text-white truncate">{night.theme}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Back */}
        <motion.a
          href="/saturday-hack-night/#timeline"
          className="inline-flex items-center gap-2 font-mono text-sm text-[#9a90b8] hover:text-white transition-colors mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ArrowLeft size={14} />
          All upcoming nights
        </motion.a>

        {/* Hero */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-sm text-[#9a90b8]">
              SHN #{String(night.id).padStart(2, "0")}
            </span>
            <span
              className="font-mono text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ color: diff.color, backgroundColor: diff.bg }}
            >
              {night.difficulty}
            </span>
            <span className="font-mono text-xs border border-white/10 text-[#9a90b8] px-2 py-0.5 rounded-full">
              Free · Solo or team of 2
            </span>
          </div>

          <SectionHeading accent="pink" as="h1" className="mb-5">{night.theme}</SectionHeading>

          <div className="flex flex-wrap gap-5 text-[#9a90b8] mb-6">
            <div className="flex items-center gap-2">
              <CalendarDays size={14} />
              <span className="font-mono text-sm">{night.date} · 6:00 PM IST</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 size={14} />
              <span className="font-mono text-sm">{night.stack}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span className="font-mono text-sm">Solo or team of 2</span>
            </div>
          </div>

          {/* Register CTA */}
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#39ff8c] text-black font-bold text-base px-8 py-4 rounded-lg hover:shadow-[0_0_24px_rgba(57,255,140,0.4)] transition-all duration-300"
          >
            Register for this night
            <ArrowRight size={18} />
          </a>
        </motion.div>

        {/* About */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold mb-3">About This Theme</h2>
          <p className="text-[#9a90b8] leading-relaxed text-base">{night.about}</p>
        </motion.div>

        {/* The Challenge */}
        <motion.div
          className="mb-12 rounded-xl border border-[#39ff8c]/20 bg-[#39ff8c]/5 p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Target size={16} className="text-[#39ff8c]" />
            <h2 className="font-bold text-[#39ff8c] text-sm uppercase tracking-wider font-mono">
              The Challenge
            </h2>
          </div>
          <p className="text-white text-base leading-relaxed">{night.challenge}</p>
          <p className="font-mono text-xs text-[#9a90b8] mt-3">
            Push to a public GitHub repo · Submit before midnight · Solo or team of 2
          </p>
        </motion.div>

        {/* Mentors */}
        {night.mentors.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold mb-6">Mentors for this Night</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {night.mentors.map((mentor) => (
                <div
                  key={mentor.name}
                  className="glass-card rounded-xl p-5 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#39ff8c]/10 border border-[#39ff8c]/20 flex items-center justify-center font-mono font-bold text-[#39ff8c] text-lg shrink-0">
                    {mentor.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-white">{mentor.name}</div>
                    <div className="text-sm text-[#9a90b8] mb-2">{mentor.role}</div>
                    <div className="flex items-center gap-3">
                      {mentor.github && (
                        <a
                          href={`https://github.com/${mentor.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 font-mono text-xs text-[#9a90b8] hover:text-white transition-colors"
                        >
                          <Github size={12} />
                          {mentor.github}
                        </a>
                      )}
                      {mentor.twitter && (
                        <a
                          href={`https://twitter.com/${mentor.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 font-mono text-xs text-[#9a90b8] hover:text-[#ff3ec8] transition-colors"
                        >
                          <Twitter size={12} />@{mentor.twitter}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-mono text-xs text-[#9a90b8] mt-4">
              Mentors are available in the SHN Discord throughout the night.
            </p>
          </motion.div>
        )}

        {/* Starter Resources */}
        {night.starterResources.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold mb-3">Start Here</h2>
            <p className="text-[#9a90b8] text-sm mb-6">
              Not familiar with the stack? These resources will get you up to speed
              before Saturday.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {night.starterResources.map((resource: Resource) => {
                const Icon = resourceIcons[resource.type];
                return (
                  <a
                    key={resource.title}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card rounded-xl p-4 flex items-center gap-3 group hover:border-white/20 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      <Icon
                        size={15}
                        className="text-[#9a90b8] group-hover:text-[#39ff8c] transition-colors"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-white truncate group-hover:text-[#39ff8c] transition-colors">
                        {resource.title}
                      </div>
                      <div className="font-mono text-xs text-[#9a90b8] capitalize">
                        {resource.type}
                      </div>
                    </div>
                    <LinkIcon
                      size={12}
                      className="text-[#9a90b8] group-hover:text-[#39ff8c] shrink-0 transition-colors"
                    />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="glass-card rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-2">Ready to build?</h3>
          <p className="text-[#9a90b8] text-sm mb-6">
            Free to join. No prior experience needed. Push to GitHub by midnight.
          </p>
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#39ff8c] text-black font-bold text-base px-8 py-4 rounded-lg hover:shadow-[0_0_24px_rgba(57,255,140,0.4)] transition-all duration-300"
          >
            Register Now — It&apos;s Free
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </main>
  );
}

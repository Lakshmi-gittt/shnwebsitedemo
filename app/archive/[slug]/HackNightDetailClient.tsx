"use client";

import { motion } from "@/lib/motion";
import {
  ArrowLeft,
  Star,
  Github,
  Users,
  ExternalLink,
  Code2,
  CalendarDays,
  FolderGit2,
  BookOpen,
  FileText,
  Video,
  Link as LinkIcon,
  Twitter,
} from "lucide-react";
import type { PastHackNight, Project, Resource } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const resourceIcons = {
  docs: BookOpen,
  article: FileText,
  video: Video,
  repo: Github,
};

const difficultyColors = {
  Beginner: { color: "#39ff8c", bg: "rgba(57,255,140,0.1)" },
  Intermediate: { color: "#ff3ec8", bg: "rgba(255,62,200,0.1)" },
  Advanced: { color: "#ff8fe0", bg: "rgba(255,143,224,0.1)" },
};

function ProjectCard({
  project,
  index,
  isBest = false,
}: {
  project: Project;
  index: number;
  isBest?: boolean;
}) {
  return (
    <motion.div
      className={`glass-card rounded-xl p-5 group relative overflow-hidden ${
        isBest ? "border-[#39ff8c]/30 bg-[#39ff8c]/3" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      viewport={{ once: true }}
    >
      {isBest && (
        <div className="flex items-center gap-1.5 mb-3">
          <Star size={12} className="text-[#39ff8c]" />
          <span className="font-mono text-xs text-[#39ff8c] uppercase tracking-wider">
            Best Project
          </span>
        </div>
      )}

      <h3 className="font-bold text-white text-lg mb-1 leading-tight">
        {project.name}
      </h3>

      {/* Creator / team */}
      <div className="flex items-center gap-1.5 text-[#9a90b8] mb-3">
        <Users size={12} />
        <span className="font-mono text-xs">
          {project.team && project.team.length > 1
            ? project.team.join(", ")
            : `by ${project.creator}`}
        </span>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-sm text-[#9a90b8] leading-relaxed mb-4">
          {project.description}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs bg-white/5 border border-white/8 rounded px-2 py-0.5 text-[#ff3ec8]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-xs text-[#9a90b8] hover:text-white transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Github size={13} />
          GitHub
        </a>
        {project.liveUrl && project.liveUrl !== "#" && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-[#9a90b8] hover:text-[#39ff8c] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={13} />
            Live
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function HackNightDetailClient({
  night,
}: {
  night: PastHackNight;
}) {
  const diff = difficultyColors[night.difficulty];
  const otherProjects = night.allProjects.filter(
    (p) => p.name !== night.bestProject.name
  );

  return (
    <main
      className="min-h-screen dark-grid-bg"
      style={{ color: "#ffffff" }}
    >
      {/* Top nav */}
      <div className="sticky top-0 z-50 border-b border-white/8 bg-[#000000]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4 font-mono text-sm text-[#9a90b8]">
          <a
            href="/saturday-hack-night/"
            className="hover:text-white transition-colors"
          >
            SHN
          </a>
          <span className="text-white/20">/</span>
          <a
            href="/saturday-hack-night/archive/"
            className="hover:text-white transition-colors"
          >
            Archive
          </a>
          <span className="text-white/20">/</span>
          <span className="text-white truncate">{night.theme}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Back */}
        <motion.a
          href="/saturday-hack-night/archive/"
          className="inline-flex items-center gap-2 font-mono text-sm text-[#9a90b8] hover:text-white transition-colors mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ArrowLeft size={14} />
          All hack nights
        </motion.a>

        {/* Hero header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-sm text-[#9a90b8]">
              SHN #{String(night.id).padStart(3, "0")}
            </span>
            <span
              className="font-mono text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ color: diff.color, backgroundColor: diff.bg }}
            >
              {night.difficulty}
            </span>
          </div>

          <SectionHeading accent="green" as="h1" className="mb-4">{night.theme}</SectionHeading>

          <div className="flex flex-wrap gap-5 text-[#9a90b8]">
            <div className="flex items-center gap-2">
              <CalendarDays size={14} />
              <span className="font-mono text-sm">{night.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 size={14} />
              <span className="font-mono text-sm">{night.stack}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span className="font-mono text-sm">
                {night.participants} builders
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FolderGit2 size={14} />
              <span className="font-mono text-sm">
                {night.submittedCount} projects submitted
              </span>
            </div>
          </div>
        </motion.div>

        {/* Best project — full width highlight */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Star size={18} className="text-[#39ff8c]" />
            Best Project of the Night
          </h2>
          <ProjectCard project={night.bestProject} index={0} isBest />
        </motion.div>

        {/* About the theme */}
        {night.about && (
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold mb-4">About This Theme</h2>
            <p className="text-[#9a90b8] leading-relaxed text-base max-w-3xl">
              {night.about}
            </p>
          </motion.div>
        )}

        {/* Mentors */}
        {night.mentors.length > 0 && (
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold mb-6">Mentors</h2>
            <div className="flex flex-wrap gap-4">
              {night.mentors.map((mentor) => (
                <div
                  key={mentor.name}
                  className="glass-card rounded-xl p-4 flex items-center gap-4 min-w-[200px]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#39ff8c]/10 border border-[#39ff8c]/20 flex items-center justify-center font-mono font-bold text-[#39ff8c]">
                    {mentor.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">
                      {mentor.name}
                    </div>
                    <div className="text-xs text-[#9a90b8]">{mentor.role}</div>
                    <div className="flex items-center gap-3 mt-1.5">
                      {mentor.github && (
                        <a
                          href={`https://github.com/${mentor.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#9a90b8] hover:text-white transition-colors"
                        >
                          <Github size={12} />
                        </a>
                      )}
                      {mentor.twitter && (
                        <a
                          href={`https://twitter.com/${mentor.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#9a90b8] hover:text-[#ff3ec8] transition-colors"
                        >
                          <Twitter size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Resources */}
        {night.resources.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold mb-6">Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {night.resources.map((resource: Resource) => {
                const Icon = resourceIcons[resource.type];
                return (
                  <a
                    key={resource.title}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card rounded-xl p-4 flex items-center gap-3 group hover:border-white/20 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-[#9a90b8] group-hover:text-[#39ff8c] transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-white truncate group-hover:text-[#39ff8c] transition-colors">
                        {resource.title}
                      </div>
                      <div className="font-mono text-xs text-[#9a90b8] capitalize">
                        {resource.type}
                      </div>
                    </div>
                    <LinkIcon size={12} className="text-[#9a90b8] group-hover:text-[#39ff8c] shrink-0 transition-colors" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* All other submitted projects */}
        <div>
          <motion.h2
            className="text-xl font-bold mb-6 text-[#9a90b8]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            All Submitted Projects ({night.allProjects.length})
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherProjects.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

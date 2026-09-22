"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import {
  ArrowLeft,
  Twitter,
  Instagram,
  Linkedin,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Send,
  Star,
  Package,
  Gift,
} from "lucide-react";
import { socialShares, DISCORD_URL } from "@/lib/data";
import type { SocialShare } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const platformConfig = {
  twitter: { label: "Twitter / X", icon: Twitter, color: "#1d9bf0" },
  instagram: { label: "Instagram", icon: Instagram, color: "#e1306c" },
  linkedin: { label: "LinkedIn", icon: Linkedin, color: "#0a66c2" },
  blog: { label: "Blog / Article", icon: BookOpen, color: "#39ff8c" },
};

function StickerSVG({ index }: { index: number }) {
  const designs = [
    // SHN logo sticker
    <svg key="logo" viewBox="0 0 120 120" className="w-full h-full">
      <circle cx="60" cy="60" r="58" fill="#000000" stroke="#39ff8c" strokeWidth="2" />
      <text x="60" y="52" textAnchor="middle" fill="#39ff8c" fontSize="22" fontFamily="monospace" fontWeight="bold">SHN</text>
      <text x="60" y="70" textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="monospace">Saturday Hack Night</text>
      <text x="60" y="82" textAnchor="middle" fill="#9a90b8" fontSize="7" fontFamily="monospace">by TinkerHub</text>
    </svg>,
    // "I Shipped" sticker
    <svg key="shipped" viewBox="0 0 120 120" className="w-full h-full">
      <rect width="120" height="120" rx="16" fill="#39ff8c" />
      <text x="60" y="42" textAnchor="middle" fill="#000000" fontSize="28" fontFamily="monospace">🚀</text>
      <text x="60" y="68" textAnchor="middle" fill="#000000" fontSize="16" fontFamily="monospace" fontWeight="bold">I SHIPPED</text>
      <text x="60" y="84" textAnchor="middle" fill="#000000" fontSize="9" fontFamily="monospace">Saturday Hack Night</text>
    </svg>,
    // Neon "Builder" sticker
    <svg key="builder" viewBox="0 0 120 120" className="w-full h-full">
      <circle cx="60" cy="60" r="58" fill="#000000" stroke="#ff3ec8" strokeWidth="2" />
      <text x="60" y="55" textAnchor="middle" fill="#ff3ec8" fontSize="13" fontFamily="monospace" fontWeight="bold">MAKER</text>
      <text x="60" y="72" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace">BUILDER</text>
      <text x="60" y="89" textAnchor="middle" fill="#9a90b8" fontSize="7" fontFamily="monospace">TINKERHUB SHN</text>
    </svg>,
    // Hexagon "6HRS" sticker
    <svg key="6hrs" viewBox="0 0 120 120" className="w-full h-full">
      <polygon points="60,8 106,34 106,86 60,112 14,86 14,34" fill="#000000" stroke="#ff8fe0" strokeWidth="2" />
      <text x="60" y="52" textAnchor="middle" fill="#ff8fe0" fontSize="20" fontFamily="monospace" fontWeight="bold">6 HRS</text>
      <text x="60" y="68" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace">TO BUILD IT</text>
      <text x="60" y="84" textAnchor="middle" fill="#9a90b8" fontSize="7" fontFamily="monospace">SHN SEASON 02</text>
    </svg>,
  ];
  return designs[index % designs.length];
}

function PlatformIcon({ platform }: { platform: SocialShare["platform"] }) {
  const config = platformConfig[platform];
  const Icon = config.icon;
  return (
    <span
      className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-full"
      style={{ color: config.color, backgroundColor: `${config.color}18` }}
    >
      <Icon size={10} />
      {config.label}
    </span>
  );
}

function ShareCard({ share, index }: { share: SocialShare; index: number }) {
  return (
    <motion.div
      className="glass-card rounded-xl p-5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="font-semibold text-white text-sm">{share.name}</div>
          <div className="font-mono text-xs text-[#9a90b8]">{share.handle}</div>
        </div>
        <PlatformIcon platform={share.platform} />
      </div>
      <p className="text-sm text-[#9a90b8] leading-relaxed mb-3">
        &ldquo;{share.content}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-[#9a90b8]">{share.night}</span>
        <a
          href={share.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-mono text-xs text-[#9a90b8] hover:text-[#39ff8c] transition-colors"
        >
          <ExternalLink size={11} />
          View post
        </a>
      </div>
    </motion.div>
  );
}

function ClaimForm() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState<SocialShare["platform"]>("twitter");
  const [name, setName] = useState("");
  const [night, setNight] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !name) return;
    // In production this would POST to a backend/form service.
    // For now, open a pre-filled Discord message or mailto.
    const msg = encodeURIComponent(
      `Hi! I want to claim my SHN sticker pack.\nName: ${name}\nNight: ${night}\nPlatform: ${platform}\nLink: ${url}`
    );
    window.open(`${DISCORD_URL}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle2 size={40} className="text-[#39ff8c] mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">You&apos;re on the list!</h3>
        <p className="text-[#9a90b8] text-sm max-w-sm mx-auto">
          Join our Discord and drop your submission link in the{" "}
          <span className="text-[#39ff8c] font-mono">#shn-stickers</span>{" "}
          channel. We&apos;ll verify and send your sticker pack within 48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="claim-name"
          className="block font-mono text-xs text-[#9a90b8] mb-1.5"
        >
          Your name
        </label>
        <input
          id="claim-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Abhijith P"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#9a90b8] focus:outline-none focus:border-[#39ff8c]/50 transition-colors"
        />
      </div>
      <div>
        <label
          htmlFor="claim-url"
          className="block font-mono text-xs text-[#9a90b8] mb-1.5"
        >
          Link to your post / blog / reel
        </label>
        <input
          id="claim-url"
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://twitter.com/you/status/..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#9a90b8] focus:outline-none focus:border-[#39ff8c]/50 transition-colors"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="claim-platform"
            className="block font-mono text-xs text-[#9a90b8] mb-1.5"
          >
            Platform
          </label>
          <select
            id="claim-platform"
            value={platform}
            onChange={(e) =>
              setPlatform(e.target.value as SocialShare["platform"])
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39ff8c]/50 transition-colors"
          >
            <option value="twitter">Twitter / X</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="blog">Blog</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="claim-night"
            className="block font-mono text-xs text-[#9a90b8] mb-1.5"
          >
            Which hack night?
          </label>
          <input
            id="claim-night"
            type="text"
            value={night}
            onChange={(e) => setNight(e.target.value)}
            placeholder="SHN #01"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#9a90b8] focus:outline-none focus:border-[#39ff8c]/50 transition-colors"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-[#39ff8c] text-black font-bold text-base py-4 rounded-lg hover:shadow-[0_0_20px_rgba(57,255,140,0.4)] transition-all duration-300 touch-target"
      >
        <Send size={16} />
        Submit &amp; Claim My Sticker Pack
      </button>
      <p className="text-center font-mono text-xs text-[#9a90b8]">
        We manually verify each submission. Sticker packs shipped within 5–7 days.
      </p>
    </form>
  );
}

export default function StickersPage() {
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
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to SHN
          </a>
          <span className="text-white/20">/</span>
          <span className="text-white">Stickers</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {/* Hero */}
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs text-[#39ff8c] uppercase tracking-widest mb-4">
            Share · Claim · Ship
          </p>
          <SectionHeading accent="green" as="h1" className="mb-5">Claim Your Sticker Pack</SectionHeading>
          <p className="text-[#9a90b8] text-lg leading-relaxed">
            Did you build something at Saturday Hack Night? Tell the world about
            it — write a blog post, share a reel, post a thread. Then submit
            your link here and we&apos;ll mail you an exclusive SHN sticker pack.
          </p>
        </motion.div>

        {/* How it works — 3 steps */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            {
              step: "01",
              title: "Build & Share",
              desc: "Participate in any SHN. Then share your experience — a tweet, a reel, a blog post, a LinkedIn article. Tell people what you built and what you learned.",
            },
            {
              step: "02",
              title: "Submit Your Link",
              desc: "Fill in the form below with your content link. We verify that it's about your SHN experience and that you actually participated.",
            },
            {
              step: "03",
              title: "Get Your Stickers",
              desc: "Once verified, we ship your exclusive SHN sticker pack to your doorstep. Free. Because builders who share deserve something tangible.",
            },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              className="glass-card rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
            >
              <span className="font-mono text-2xl font-bold text-[#39ff8c]/30 block mb-3">
                {s.step}
              </span>
              <h3 className="font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-[#9a90b8] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Sticker preview */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-xs text-[#39ff8c] uppercase tracking-widest mb-2">
                The Goods
              </p>
              <SectionHeading accent="pink">Your Sticker Pack</SectionHeading>
            </div>
            <p className="font-mono text-sm text-[#9a90b8]">
              Pack of 4 · Shipped to your door
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="glass-card rounded-2xl p-6 aspect-square flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-full">
                  <StickerSVG index={i} />
                </div>
              </motion.div>
            ))}
          </div>

          <p className="font-mono text-xs text-[#9a90b8] text-center mt-6">
            Designs may vary · Physical stickers · High-quality vinyl
          </p>
        </motion.div>

        {/* Claim form */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="font-mono text-xs text-[#39ff8c] uppercase tracking-widest mb-3">
              Claim Yours
            </p>
            <SectionHeading accent="violet" className="mb-4">Submit Your Content</SectionHeading>
            <p className="text-[#9a90b8] text-base leading-relaxed mb-6">
              Shared your hack night story anywhere online? Drop the link below.
              We&apos;ll review it and ship your sticker pack within 5–7 days.
            </p>
            <div className="space-y-3">
              {[
                "A tweet / X thread about what you built",
                "An Instagram post or reel of your hack night",
                "A LinkedIn post about what you learned",
                "A blog post or dev.to article",
                "A YouTube short or reel of your project",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-[#39ff8c] shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-[#9a90b8]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <ClaimForm />
          </div>
        </motion.div>

        {/* Social wall */}
        <div>
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="font-mono text-xs text-[#39ff8c] uppercase tracking-widest mb-2">
                From the Community
              </p>
              <SectionHeading accent="green">Builders Who Shared</SectionHeading>
            </div>
            <p className="font-mono text-sm text-[#9a90b8]">
              Sticker pack claimed ✓
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialShares.map((share, i) => (
              <ShareCard key={`${share.name}-${i}`} share={share} index={i} />
            ))}
          </div>

          <motion.p
            className="text-center font-mono text-sm text-[#9a90b8] mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Your post could be here.{" "}
            <a
              href="#claim-name"
              className="text-[#39ff8c] hover:underline"
            >
              Submit yours above →
            </a>
          </motion.p>
        </div>
      </div>
    </main>
  );
}

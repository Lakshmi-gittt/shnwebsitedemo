import { Github, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-0">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#39ff8c]/40 to-transparent" />

      <div className="dark-grid-bg px-5 sm:px-8 py-16 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">

            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#39ff8c] shrink-0" />
                <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  SATURDAY HACK NIGHT
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs mb-4">
                Saturday Hack Night is a TinkerHub Foundation initiative. Free, open to all, no experience needed. 5 online build nights + 1 offline finale.
              </p>
              <a
                href="https://tinkerhub.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#39ff8c] hover:text-[#22d16f] transition-colors"
              >
                TinkerHub Foundation
                <ArrowUpRight size={11} />
              </a>
            </div>

            {/* Navigate links */}
            <div>
              <p className="font-mono text-xs text-white/50 uppercase tracking-widest mb-5">Navigate</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "How It Works", href: "#get-selected" },
                  { label: "Upcoming Nights", href: "#timeline" },
                  { label: "Past Nights", href: "/saturday-hack-night/archive/" },
                  { label: "Moments", href: "/saturday-hack-night/moments/" },
                  { label: "Hall of Fame", href: "#hall-of-fame" },
                  { label: "Campus Program", href: "/saturday-hack-night/campus/" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Community links */}
            <div>
              <p className="font-mono text-xs text-white/50 uppercase tracking-widest mb-5">Community</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Discord", href: "https://discord.gg/tinkerhub" },
                  { label: "TinkerSpace", href: "#tinkerspace" },
                  { label: "Sticker Pack", href: "/saturday-hack-night/stickers/" },
                  { label: "GitHub", href: "https://github.com/appukurian/saturday-hack-night" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    {link.label}
                    {link.href.startsWith("http") && (
                      <ArrowUpRight size={10} className="text-white/40" />
                    )}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono text-xs text-white/50">© 2026 TinkerHub Foundation. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/appukurian/saturday-hack-night"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-white/50 hover:text-white/80 transition-colors"
              >
                <Github size={13} />
                Open Source
              </a>
              <span className="font-mono text-xs text-white/50">Built with Next.js + ♥</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

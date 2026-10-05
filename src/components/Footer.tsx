"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" style={{ position: "relative", borderTop: "1px solid rgba(255, 255, 255, 0.08)", padding: "80px 2rem 40px", background: "rgba(3, 4, 7, 0.95)" }}>
      {/* Subtle top glow */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 600,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.5), transparent)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 56 }}>
          {/* Brand Column */}
          <div>
            <div className="font-display" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(59, 130, 246, 0.5)",
              }}>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>⚡</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>
                <span style={{ color: "#fff" }}>Pulse</span>
                <span style={{ color: "#94a3b8" }}>Ops</span>
                <span style={{ color: "#38bdf8", marginLeft: 6, fontSize: 14 }}>AI</span>
              </div>
            </div>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              The flagship global conference for India's vanguard of artificial intelligence architects, operators, and bold founders.
            </p>
          </div>

          {[
            {
              title: "Conference",
              links: [
                { label: "About Summit", href: "#about" },
                { label: "Keynote Speakers", href: "#speakers" },
                { label: "Event Tracks", href: "#events" },
                { label: "Full Schedule", href: "#schedule" },
              ],
            },
            {
              title: "Participate",
              links: [
                { label: "Claim Pass", href: "#register" },
                { label: "Pitch at IdeaForge", href: "#events" },
                { label: "Partner & Sponsor", href: "#sponsors" },
                { label: "Volunteer Program", href: "#" },
              ],
            },
            {
              title: "Connect",
              links: [
                { label: "contact@pulseops.dev", href: "mailto:contact@pulseops.dev" },
                { label: "X / Twitter (@PulseOpsAI)", href: "https://twitter.com" },
                { label: "LinkedIn / PulseOps", href: "https://linkedin.com" },
                { label: "Discord Community", href: "#" },
              ],
            },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 13, color: "#f8fafc", fontWeight: 700, marginBottom: 20, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    style={{
                      color: "#94a3b8",
                      textDecoration: "none",
                      fontSize: 14,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#38bdf8";
                      e.currentTarget.style.paddingLeft = "4px";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.paddingLeft = "0px";
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <span style={{ fontSize: 13, color: "#64748b" }}>
            © 2025 PulseOps AI Summit. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#64748b" }}>
            <span>Mumbai, India</span>
            <span>·</span>
            <span>March 14–16, 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" style={{ position: "relative", borderTop: "1px solid rgba(101, 163, 13, 0.12)", padding: "80px 2rem 40px", background: "rgba(238, 241, 235, 0.98)" }}>
      {/* Subtle top glow */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50)",
        width: 600,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(101, 163, 13, 0.3), transparent)",
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
                background: "linear-gradient(135deg, #65a30d, #a3e635)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(101, 163, 13, 0.45)",
              }}>
                <span style={{ color: "#ffffff", fontWeight: 800, fontSize: 16 }}>âš¡</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>
                <span style={{ color: "#1a2e12" }}>Pulse</span>
                <span style={{ color: "#6b8560" }}>Ops</span>
                <span style={{ color: "#4d7c0f", marginLeft: 6, fontSize: 16 }}>AI</span>
              </div>
            </div>
            <p style={{ color: "#6b8560", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
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
              <div style={{ fontSize: 13, color: "#1a2e12", fontWeight: 700, marginBottom: 20, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    style={{
                      color: "#6b8560",
                      textDecoration: "none",
                      fontSize: 14,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#4d7c0f";
                      e.currentTarget.style.paddingLeft = "4px";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "#6b8560";
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
          borderTop: "1px solid rgba(0, 0, 0, 0.06)",
          paddingTop: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <span style={{ fontSize: 13, color: "#6b8560" }}>
            Â© 2025 PulseOps AI Summit. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#6b8560" }}>
            <span>Mumbai, India</span>
            <span>Â·</span>
            <span>March 14â€“16, 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

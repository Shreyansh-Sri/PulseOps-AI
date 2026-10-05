"use client";

const speakers = [
  { name: "Kunal Kumar", role: "Co-founder, PulseOps", topic: "Building for Bharat", initials: "KK", hue: 215, tag: "Founder Keynote" },
  { name: "Shreyansh Srivastava", role: "Co-founder, PulseOps", topic: "Scaling to 10M users", initials: "SS", hue: 260, tag: "Architecture" },
  { name: "Shraddha Tiwari", role: "Partner, Manager", topic: "What investors miss", initials: "ST", hue: 190, tag: "Venture Capital" },
  { name: "Avni", role: "CTO, Meesho", topic: "Tech debt is a feature", initials: "AV", hue: 170, tag: "Engineering" },
  { name: "Priya", role: "Founder, Nua", topic: "D2C playbook 2025", initials: "PR", hue: 280, tag: "Growth Loop" },
  { name: "Manya Kumari", role: "CEO, PhysicsWallah", topic: "EdTech at scale", initials: "MK", hue: 230, tag: "Operations" },
];

export default function Speakers() {
  return (
    <section id="speakers" style={{ position: "relative", padding: "120px 2rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
      {/* Background glow behind speakers */}
      <div className="ambient-glow glow-cyan" style={{ top: "30%", right: "-100px", width: 500, height: 500, opacity: 0.15 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "#38bdf8",
              letterSpacing: "0.12em",
              marginBottom: 14,
              textTransform: "uppercase",
              fontWeight: 700,
              background: "rgba(56, 189, 248, 0.08)",
              padding: "4px 12px",
              borderRadius: 100,
              border: "1px solid rgba(56, 189, 248, 0.2)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#38bdf8" }} />
              Keynote Lineup
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Voices shaping <br />
              <span className="text-gradient">the next frontier.</span>
            </h2>
          </div>
          <a href="#" style={{
            color: "#94a3b8",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 18px",
            borderRadius: 8,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s ease",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "#94a3b8";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            Full 80+ Lineup
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

        {/* Speaker grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
          gap: 24,
        }}>
          {speakers.map((s) => (
            <div
              key={s.name}
              className="glass-panel"
              style={{
                borderRadius: 16,
                padding: "36px 30px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {/* Subtle top indicator bar */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, hsl(${s.hue}, 85%, 60%), transparent)`,
              }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                {/* Avatar with cyber neon border */}
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, hsl(${s.hue}, 70%, 18%), hsl(${s.hue}, 70%, 10%))`,
                  border: `1.5px solid hsl(${s.hue}, 80%, 45%)`,
                  boxShadow: `0 0 24px hsl(${s.hue}, 80%, 30%, 0.35)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  color: `hsl(${s.hue}, 95%, 85%)`,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {s.initials}
                </div>

                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: `hsl(${s.hue}, 85%, 75%)`,
                  background: `hsl(${s.hue}, 70%, 12%, 0.8)`,
                  border: `1px solid hsl(${s.hue}, 70%, 30%, 0.5)`,
                  padding: "4px 10px",
                  borderRadius: 100,
                  letterSpacing: "0.04em",
                }}>
                  {s.tag}
                </span>
              </div>

              <div style={{ fontSize: 18, fontWeight: 700, color: "#f8fafc", marginBottom: 4, letterSpacing: "-0.01em" }}>
                {s.name}
              </div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20, fontWeight: 500 }}>
                {s.role}
              </div>

              <div style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                paddingTop: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 12, color: "#64748b" }}>Topic:</span>
                <span style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#e2e8f0",
                }}>
                  {s.topic}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

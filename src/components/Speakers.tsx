"use client";

const speakers = [
  { name: "Kunal Kumar", role: "Co-founder,PulseOps", topic: "Building for Bharat", initials: "KK", hue: 220 },
  { name: "Shreyansh Srivastava", role: "Co-founder,PulseOps", topic: "Scaling to 10M users", initials: "SS", hue: 260 },
  { name: "Shraddha Tiwari", role: "Partner, Manager", topic: "What investors miss", initials: "RS", hue: 200 },
  { name: "Avni", role: "CTO, Meesho", topic: "Tech debt is a feature", initials: "KD", hue: 180 },
  { name: "Priya", role: "Founder, Nua", topic: "D2C playbook 2025", initials: "AR", hue: 240 },
  { name: "Manya Kumari", role: "CEO, PhysicsWallah", topic: "EdTech at scale", initials: "VP", hue: 210 },
];

export default function Speakers() {
  return (
    <section id="speakers" style={{ padding: "100px 2rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--blue)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase", fontWeight: 600 }}>
              Speakers
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Voices worth <br />listening to.
            </h2>
          </div>
          <a href="#" style={{
            color: "var(--muted)",
            textDecoration: "none",
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 6,
            borderBottom: "1px solid var(--border)",
            paddingBottom: 2,
          }}>
            Full lineup
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

        {/* Speaker grid — asymmetric */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--border)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
        }}>
          {speakers.map((s, i) => (
            <div
              key={s.name}
              style={{
                background: "var(--surface)",
                padding: "32px 28px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--surface)")}
            >
              {/* Avatar */}
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: `hsl(${s.hue}, 60%, 22%)`,
                border: `1px solid hsl(${s.hue}, 60%, 30%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                fontSize: 16,
                fontWeight: 700,
                color: `hsl(${s.hue}, 80%, 75%)`,
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                {s.initials}
              </div>

              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>{s.role}</div>

              <div style={{
                fontSize: 12,
                color: `hsl(${s.hue}, 70%, 65%)`,
                background: `hsl(${s.hue}, 60%, 10%)`,
                border: `1px solid hsl(${s.hue}, 60%, 20%)`,
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: 4,
              }}>
                {s.topic}
              </div>

              {/* Subtle corner accent */}
              <div style={{
                position: "absolute",
                bottom: -20,
                right: -20,
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: `hsl(${s.hue}, 60%, 15%)`,
                opacity: 0.5,
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

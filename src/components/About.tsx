"use client";

const highlights = [
  {
    step: "01",
    title: "Unfiltered Keynotes",
    desc: "Zero scripted marketing decks. Only battle-tested post-mortems, hard metrics, and raw architecture lessons.",
    tag: "Engineering & Scale",
  },
  {
    step: "02",
    title: "Deep-Tech Workshops",
    desc: "Hands-on sessions on distributed infrastructure, autonomous agent loops, and sovereign AI compute pipelines.",
    tag: "Hands-On Builds",
  },
  {
    step: "03",
    title: "IdeaForge 72H Pitch",
    desc: "72-hour product sprint and live demos evaluated directly by tier-1 angels and venture partners.",
    tag: "₹5L Grant Pool",
  },
  {
    step: "04",
    title: "Curated High-Signal Network",
    desc: "Connect with 5,000+ ambitious founders, principal engineers, and active capital allocators in one room.",
    tag: "VIP After Dark",
  },
];

export default function About() {
  return (
    <section id="about-highlights" style={{ position: "relative", padding: "100px 2rem 80px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "#bef264",
              letterSpacing: "0.12em",
              marginBottom: 14,
              textTransform: "uppercase",
              fontWeight: 700,
              background: "rgba(163, 230, 53, 0.08)",
              padding: "4px 12px",
              borderRadius: 100,
              border: "1px solid rgba(163, 230, 53, 0.2)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a3e635" }} />
              The PulseOps Experience
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(34px, 5vw, 54px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Why builders choose <br /><span className="text-gradient">PulseOps Summit.</span>
            </h2>
          </div>
          <p style={{ color: "#8d9e8b", fontSize: 15, maxWidth: 440, lineHeight: 1.7 }}>
            Designed from first principles to maximize peer collisions, high-speed learning, and tangible funding opportunities.
          </p>
        </div>

        {/* 4 Pillar Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
        }}>
          {highlights.map((h) => (
            <div
              key={h.step}
              className="glass-panel"
              style={{
                borderRadius: 16,
                padding: "32px 26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span className="font-display" style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#a3e635",
                    letterSpacing: "-0.02em",
                  }}>
                    {h.step}
                  </span>
                  <span style={{
                    fontSize: 11,
                    color: "#94a3b8",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    padding: "3px 10px",
                    borderRadius: 100,
                    fontWeight: 600,
                  }}>
                    {h.tag}
                  </span>
                </div>

                <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#f8fafc", marginBottom: 10 }}>
                  {h.title}
                </h3>
                <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.65 }}>
                  {h.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

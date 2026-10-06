"use client";

const events = [
  {
    tag: "Keynote",
    title: "The State of Indian Tech",
    desc: "An honest look at where Indian startups stand globally — hype stripped, fundamentals examined.",
    time: "Day 1 · 10:00 AM",
    seats: "Main Stage",
    accent: "#3b82f6",
  },
  {
    tag: "Workshop",
    title: "Zero to Production in 48 Hours",
    desc: "Hands-on session building a real product from scratch using modern AI tooling and agents.",
    time: "Day 1 · 2:00 PM",
    seats: "Hall B · 120 seats",
    accent: "#8b5cf6",
  },
  {
    tag: "Panel",
    title: "Fundraising Without the BS",
    desc: "Four founders who said no to bad money, and one who regrets saying yes.",
    time: "Day 2 · 11:30 AM",
    seats: "Main Stage",
    accent: "#06b6d4",
  },
  {
    tag: "Competition",
    title: "IdeaForge — Startup Pitch",
    desc: "72-hour startup challenge culminating in a live pitch to a tier-1 panel of venture capitalists.",
    time: "Day 2–3",
    seats: "₹5L Prize Pool",
    accent: "#10b981",
  },
  {
    tag: "Networking",
    title: "Founders After Dark",
    desc: "Curated networking dinner with VIP access. No pitches, no decks. Just high-trust conversations.",
    time: "Day 2 · 7:30 PM",
    seats: "By Invite Only",
    accent: "#f59e0b",
  },
  {
    tag: "Deep Dive",
    title: "ML in Production — War Stories",
    desc: "Real engineers discussing real architectural breakdowns. What actually breaks when models scale.",
    time: "Day 3 · 10:00 AM",
    seats: "Hall A · 200 seats",
    accent: "#ec4899",
  },
];

export default function Events() {
  return (
    <section id="events" style={{ position: "relative", padding: "120px 2rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
      {/* Background glow */}
      <div className="ambient-glow glow-blue" style={{ top: "40%", left: "-150px", width: 550, height: 550, opacity: 0.2 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
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
          Curated Agenda
        </div>
        <h2 className="font-display" style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 52, lineHeight: 1.1 }}>
          Three days of <span className="text-gradient">pure signal.</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {events.map((ev) => (
            <div
              key={ev.title}
              className="glass-panel"
              style={{
                borderRadius: 14,
                padding: "24px 30px",
                display: "grid",
                gridTemplateColumns: "130px 1fr auto",
                gap: "28px",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {/* Left neon border indicator */}
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 4,
                background: ev.accent,
                boxShadow: `0 0 12px ${ev.accent}`,
              }} />

              {/* Tag */}
              <div>
                <span style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: ev.accent,
                  background: `${ev.accent}16`,
                  border: `1px solid ${ev.accent}3d`,
                  padding: "5px 12px",
                  borderRadius: 100,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.03em",
                  boxShadow: `0 0 12px ${ev.accent}22`,
                }}>
                  {ev.tag}
                </span>
              </div>

              {/* Content */}
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, color: "#f8fafc", marginBottom: 6, letterSpacing: "-0.01em" }}>
                  {ev.title}
                </div>
                <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{ev.desc}</div>
              </div>

              {/* Meta info */}
              <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                <div style={{ fontSize: 14, color: "#f1f5f9", fontWeight: 600 }}>{ev.time}</div>
                <div style={{
                  fontSize: 12,
                  color: "#cbd5e1",
                  marginTop: 4,
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "2px 8px",
                  borderRadius: 6,
                  display: "inline-block",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}>
                  {ev.seats}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

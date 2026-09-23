"use client";

const events = [
  {
    tag: "Keynote",
    title: "The State of Indian Tech",
    desc: "An honest look at where Indian startups stand globally — hype stripped, fundamentals examined.",
    time: "Day 1 · 10:00 AM",
    seats: "Main Stage",
    accent: "#2c6bed",
  },
  {
    tag: "Workshop",
    title: "Zero to Production in 48 Hours",
    desc: "Hands-on session building a real product from scratch using modern AI tooling.",
    time: "Day 1 · 2:00 PM",
    seats: "Hall B · 120 seats",
    accent: "#7c3aed",
  },
  {
    tag: "Panel",
    title: "Fundraising Without the BS",
    desc: "Four founders who said no to bad money, and one who regrets saying yes.",
    time: "Day 2 · 11:30 AM",
    seats: "Main Stage",
    accent: "#0891b2",
  },
  {
    tag: "Competition",
    title: "IdeaForge — Startup Pitch",
    desc: "72-hour startup challenge culminating in a live pitch to a panel of investors.",
    time: "Day 2–3",
    seats: "₹5L prize pool",
    accent: "#059669",
  },
  {
    tag: "Networking",
    title: "Founders After Dark",
    desc: "Curated networking dinner. No pitches, no decks. Just good conversation.",
    time: "Day 2 · 7:30 PM",
    seats: "By invite",
    accent: "#d97706",
  },
  {
    tag: "Workshop",
    title: "ML in Production — War Stories",
    desc: "Real engineers talking about real failures. What actually breaks when you scale.",
    time: "Day 3 · 10:00 AM",
    seats: "Hall A · 200 seats",
    accent: "#dc2626",
  },
];

export default function Events() {
  return (
    <section id="events" style={{ padding: "100px 2rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontSize: 12, color: "var(--blue)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase", fontWeight: 600 }}>
          Events
        </p>
        <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 56, lineHeight: 1.1 }}>
          Three days, no filler.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          {events.map((ev, i) => (
            <div
              key={ev.title}
              style={{
                background: "var(--surface)",
                padding: "24px 28px",
                display: "grid",
                gridTemplateColumns: "120px 1fr auto",
                gap: "24px",
                alignItems: "center",
                borderLeft: `3px solid ${ev.accent}`,
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--surface)")}
            >
              {/* Tag */}
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: ev.accent,
                background: `${ev.accent}18`,
                border: `1px solid ${ev.accent}33`,
                padding: "4px 10px",
                borderRadius: 4,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}>
                {ev.tag}
              </span>

              {/* Content */}
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, color: "var(--text)", marginBottom: 4 }}>{ev.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{ev.desc}</div>
              </div>

              {/* Meta */}
              <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{ev.time}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{ev.seats}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

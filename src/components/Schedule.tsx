"use client";
import { useState } from "react";

const days = [
  {
    label: "Day 1",
    date: "March 14",
    theme: "Foundation & Indian Tech Momentum",
    slots: [
      { time: "09:00", title: "Registration & Welcome Kit", type: "logistics" },
      { time: "10:00", title: "Opening Keynote — The State of Indian Tech", type: "keynote" },
      { time: "11:30", title: "Fireside: Building for Tier 2 India", type: "fireside" },
      { time: "13:00", title: "Lunch & Expo Hall Open", type: "break" },
      { time: "14:00", title: "Workshop: Zero to Production in 48 Hours", type: "workshop" },
      { time: "16:00", title: "Panel: AI Infrastructure & Sovereign Compute", type: "panel" },
      { time: "18:00", title: "Startup Expo & Networking Mixer", type: "networking" },
    ],
  },
  {
    label: "Day 2",
    date: "March 15",
    theme: "Scale, Capital & Autonomous Systems",
    slots: [
      { time: "09:30", title: "Morning Run with Founders (Optional)", type: "logistics" },
      { time: "11:00", title: "Fundraising Without the BS — Cap Tables & Growth", type: "panel" },
      { time: "12:30", title: "Lunch & IdeaForge Mentorship Sprint", type: "break" },
      { time: "14:00", title: "Workshop: Agentic Workflows & Multi-Agent Systems", type: "workshop" },
      { time: "16:00", title: "Keynote: AI in India — Where We Really Stand", type: "keynote" },
      { time: "19:30", title: "Founders After Dark VIP Dinner", type: "networking" },
    ],
  },
  {
    label: "Day 3",
    date: "March 16",
    theme: "Production Engineering & Live Pitches",
    slots: [
      { time: "10:00", title: "ML in Production — Architectural War Stories", type: "workshop" },
      { time: "12:00", title: "IdeaForge Finals: Live Demo & Pitch to Tier 1 VCs", type: "keynote" },
      { time: "13:30", title: "Lunch & Final Demo Expo", type: "break" },
      { time: "15:00", title: "Closing Panel: What We Get Wrong About Failure", type: "panel" },
      { time: "16:30", title: "Prize Ceremony, Fellowships & Closing Remarks", type: "keynote" },
    ],
  },
];

const typeColors: Record<string, { color: string; bg: string }> = {
  keynote: { color: "#38bdf8", bg: "rgba(56, 189, 248, 0.12)" },
  fireside: { color: "#818cf8", bg: "rgba(129, 140, 248, 0.12)" },
  panel: { color: "#34d399", bg: "rgba(52, 211, 153, 0.12)" },
  workshop: { color: "#fbbf24", bg: "rgba(251, 191, 36, 0.12)" },
  networking: { color: "#f472b6", bg: "rgba(244, 114, 182, 0.12)" },
  break: { color: "#94a3b8", bg: "rgba(148, 163, 184, 0.12)" },
  logistics: { color: "#64748b", bg: "rgba(100, 116, 139, 0.12)" },
};

export default function Schedule() {
  const [active, setActive] = useState(0);

  return (
    <section id="schedule" style={{ position: "relative", padding: "120px 2rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
      {/* Ambient background glow */}
      <div className="ambient-glow glow-purple" style={{ top: "35%", right: "-100px", width: 550, height: 550, opacity: 0.18 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 50, flexWrap: "wrap", gap: 24 }}>
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
              Summit Program
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Engineered for <br /><span className="text-gradient">maximum impact.</span>
            </h2>
          </div>

          {/* Day switch tabs */}
          <div style={{
            display: "flex",
            gap: 6,
            background: "rgba(14, 20, 36, 0.75)",
            backdropFilter: "blur(14px)",
            padding: 5,
            borderRadius: 12,
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}>
            {days.map((d, i) => (
              <button
                key={d.label}
                onClick={() => setActive(i)}
                style={{
                  padding: "10px 22px",
                  background: active === i ? "linear-gradient(135deg, #2563eb, #0ea5e9)" : "transparent",
                  color: active === i ? "#fff" : "#94a3b8",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                  transition: "all 0.25s ease",
                  boxShadow: active === i ? "0 4px 20px rgba(37, 99, 235, 0.45)" : "none",
                }}
              >
                {d.label}
                <span style={{ display: "block", fontSize: 11, fontWeight: 400, opacity: active === i ? 0.9 : 0.6, marginTop: 2 }}>{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Day Theme Indicator */}
        <div style={{
          marginBottom: 36,
          padding: "14px 22px",
          background: "rgba(56, 189, 248, 0.05)",
          border: "1px solid rgba(56, 189, 248, 0.15)",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <span style={{ fontSize: 13, color: "#38bdf8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Track Focus:
          </span>
          <span style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 500 }}>
            {days[active].theme}
          </span>
        </div>

        {/* Timeline Items */}
        <div style={{ position: "relative" }}>
          {/* Vertical connecting neon guideline */}
          <div style={{
            position: "absolute",
            left: 78,
            top: 15,
            bottom: 15,
            width: 2,
            background: "linear-gradient(180deg, rgba(56, 189, 248, 0.4), rgba(129, 140, 248, 0.1) 90%, transparent)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {days[active].slots.map((slot, i) => {
              const meta = typeColors[slot.type] || { color: "#38bdf8", bg: "rgba(56, 189, 248, 0.1)" };
              return (
                <div key={i} style={{ display: "flex", gap: 24, alignItems: "center" }}>
                  {/* Time label */}
                  <div style={{
                    width: 60,
                    flexShrink: 0,
                    fontSize: 14,
                    color: "#94a3b8",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    textAlign: "right",
                  }}>
                    {slot.time}
                  </div>

                  {/* Pulsing indicator node */}
                  <div style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: meta.color,
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 2,
                    boxShadow: `0 0 12px ${meta.color}`,
                    border: "2px solid #06080e",
                  }} />

                  {/* Glass row card */}
                  <div
                    className="glass-panel"
                    style={{
                      flex: 1,
                      borderRadius: 12,
                      padding: "16px 22px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                      cursor: "default",
                    }}
                  >
                    <span style={{ fontSize: 15, color: "#f8fafc", fontWeight: 600 }}>
                      {slot.title}
                    </span>
                    <span style={{
                      fontSize: 12,
                      color: meta.color,
                      background: meta.bg,
                      border: `1px solid ${meta.color}33`,
                      padding: "4px 12px",
                      borderRadius: 100,
                      whiteSpace: "nowrap",
                      textTransform: "capitalize",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                    }}>
                      {slot.type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

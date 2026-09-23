"use client";
import { useState } from "react";

const days = [
  {
    label: "Day 1",
    date: "March 14",
    slots: [
      { time: "09:00", title: "Registration & Welcome Kit", type: "logistics" },
      { time: "10:00", title: "Opening Keynote — The State of Indian Tech", type: "keynote" },
      { time: "11:30", title: "Fireside: Building for Tier 2 India", type: "fireside" },
      { time: "13:00", title: "Lunch & Expo Hall Open", type: "break" },
      { time: "14:00", title: "Workshop: Zero to Production in 48 Hours", type: "workshop" },
      { time: "16:00", title: "Panel: Climate Tech — Real or Hype?", type: "panel" },
      { time: "18:00", title: "Startup Expo & Networking", type: "networking" },
    ],
  },
  {
    label: "Day 2",
    date: "March 15",
    slots: [
      { time: "09:30", title: "Morning Run with Founders (Optional)", type: "logistics" },
      { time: "11:00", title: "Fundraising Without the BS", type: "panel" },
      { time: "12:30", title: "Lunch & IdeaForge Check-in", type: "break" },
      { time: "14:00", title: "Workshop: Growth Loops That Actually Work", type: "workshop" },
      { time: "16:00", title: "Keynote: AI in India — Where We Really Are", type: "keynote" },
      { time: "19:30", title: "Founders After Dark Dinner", type: "networking" },
    ],
  },
  {
    label: "Day 3",
    date: "March 16",
    slots: [
      { time: "10:00", title: "ML in Production — War Stories", type: "workshop" },
      { time: "12:00", title: "IdeaForge Finals: Live Pitches", type: "keynote" },
      { time: "13:30", title: "Lunch & Last Expo Hours", type: "break" },
      { time: "15:00", title: "Closing Panel: What We Get Wrong About Failure", type: "panel" },
      { time: "16:30", title: "Prize Ceremony & Closing", type: "keynote" },
    ],
  },
];

const typeColors: Record<string, string> = {
  keynote: "#2c6bed",
  fireside: "#7c3aed",
  panel: "#0891b2",
  workshop: "#059669",
  networking: "#d97706",
  break: "#374151",
  logistics: "#4b5563",
};

export default function Schedule() {
  const [active, setActive] = useState(0);

  return (
    <section id="schedule" style={{ padding: "100px 2rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontSize: 12, color: "var(--blue)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase", fontWeight: 600 }}>
          Schedule
        </p>
        <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 48, lineHeight: 1.1 }}>
          Three days, planned tight.
        </h2>

        {/* Day tabs */}
        <div style={{
          display: "flex",
          gap: "1px",
          background: "var(--border)",
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 32,
          width: "fit-content",
        }}>
          {days.map((d, i) => (
            <button
              key={d.label}
              onClick={() => setActive(i)}
              style={{
                padding: "10px 24px",
                background: active === i ? "var(--blue)" : "var(--surface)",
                color: active === i ? "#fff" : "var(--muted)",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              {d.label}
              <span style={{ display: "block", fontSize: 11, fontWeight: 400, opacity: 0.7 }}>{d.date}</span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: 60,
            top: 0,
            bottom: 0,
            width: 1,
            background: "var(--border)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {days[active].slots.map((slot, i) => (
              <div key={i} style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "12px 0" }}>
                {/* Time */}
                <div style={{
                  width: 52,
                  flexShrink: 0,
                  fontSize: 12,
                  color: "var(--muted)",
                  fontWeight: 500,
                  paddingTop: 2,
                  textAlign: "right",
                }}>{slot.time}</div>

                {/* Dot */}
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: typeColors[slot.type] || "var(--border)",
                  flexShrink: 0,
                  marginTop: 4,
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 0 8px ${typeColors[slot.type] || "transparent"}66`,
                }} />

                {/* Content */}
                <div style={{
                  flex: 1,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}>
                  <span style={{ fontSize: 14, color: "var(--text)", fontWeight: 500 }}>{slot.title}</span>
                  <span style={{
                    fontSize: 11,
                    color: typeColors[slot.type],
                    background: `${typeColors[slot.type]}18`,
                    padding: "2px 8px",
                    borderRadius: 4,
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                  }}>{slot.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

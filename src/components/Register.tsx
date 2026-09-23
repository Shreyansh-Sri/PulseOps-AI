"use client";
import { useState } from "react";

const tiers = [
  {
    name: "Student",
    price: "₹499",
    perks: ["All keynotes", "Expo hall access", "Lunch (Day 2)", "Digital swag kit"],
    highlight: false,
  },
  {
    name: "Builder",
    price: "₹1,499",
    perks: ["Everything in Student", "Workshop access", "Networking dinner (Day 2)", "IdeaForge participation", "1-on-1 mentor slots"],
    highlight: true,
  },
  {
    name: "Investor",
    price: "By invite",
    perks: ["VIP lounge access", "All sessions", "Curated startup intros", "Dinner all 3 days", "Deal room access"],
    highlight: false,
  },
];

export default function Register() {
  const [selected, setSelected] = useState(1);

  return (
    <section id="register" style={{ padding: "100px 2rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 12, color: "var(--blue)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase", fontWeight: 600 }}>
            Register
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Pick your pass.
          </h2>
          <p style={{ color: "var(--muted)", marginTop: 16, fontSize: 15 }}>Early bird pricing ends Feb 28.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48 }}>
          {tiers.map((t, i) => (
            <div
              key={t.name}
              onClick={() => setSelected(i)}
              style={{
                background: t.highlight ? "var(--blue-dim)" : "var(--surface)",
                border: selected === i ? `2px solid var(--blue)` : `2px solid ${t.highlight ? "var(--blue-dim)" : "var(--border)"}`,
                borderRadius: 12,
                padding: "32px 28px",
                cursor: "pointer",
                transition: "all 0.2s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {t.highlight && (
                <div style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "var(--blue)",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: 100,
                  letterSpacing: "0.06em",
                }}>POPULAR</div>
              )}

              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>{t.name}</div>
              <div className="font-display" style={{ fontSize: 36, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 24 }}>{t.price}</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {t.perks.map(p => (
                  <div key={p} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                      <circle cx="8" cy="8" r="7" stroke="#2c6bed" strokeWidth="1.2" />
                      <path d="M5 8l2 2 4-4" stroke="#2c6bed" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.4 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <button style={{
            background: "var(--blue)",
            color: "#fff",
            padding: "16px 48px",
            borderRadius: 8,
            border: "none",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Register as {tiers[selected].name}
          </button>
          <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 12 }}>Secure checkout. Refundable until Feb 15.</p>
        </div>
      </div>
    </section>
  );
}

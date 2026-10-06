"use client";
import { useState } from "react";

const tiers = [
  {
    name: "Student & Apprentice",
    price: "₹499",
    desc: "For aspiring builders enrolled in higher education or self-directed bootcamps.",
    perks: ["All keynotes & main stage talks", "Full expo hall access", "Lunch on Day 2", "Digital swag kit & certificate"],
    highlight: false,
    gradient: "linear-gradient(135deg, #0284c7, #2563eb)",
  },
  {
    name: "Builder & Founder",
    price: "₹1,499",
    desc: "For active software engineers, tech leads, and venture-backed founders.",
    perks: ["Everything in Student", "Exclusive deep-dive workshops", "Networking Dinner (Day 2)", "IdeaForge pitch participation", "1-on-1 VC & mentor breakout slots"],
    highlight: true,
    gradient: "linear-gradient(135deg, #2563eb, #06b6d4)",
  },
  {
    name: "Investor & Executive",
    price: "By Invite",
    desc: "For general partners, angel investors, and enterprise tech executives.",
    perks: ["VIP lounge access", "Fast-track access to all sessions", "Curated deal flow directory", "Private dinner across all 3 nights", "Dedicated meeting suites & deal rooms"],
    highlight: false,
    gradient: "linear-gradient(135deg, #7c3aed, #2563eb)",
  },
];

export default function Register() {
  const [selected, setSelected] = useState(1);

  return (
    <section id="register" style={{ position: "relative", padding: "120px 2rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
      {/* Ambient glow behind pricing */}
      <div className="ambient-glow glow-cyan" style={{ top: "25%", left: "50%", transform: "translateX(-50%)", width: 700, height: 450, opacity: 0.15 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
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
            padding: "4px 14px",
            borderRadius: 100,
            border: "1px solid rgba(163, 230, 53, 0.2)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a3e635" }} />
            Passes & Registration
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Choose your <span className="text-gradient">summit experience.</span>
          </h2>
          <p style={{ color: "#8d9e8b", marginTop: 16, fontSize: 16 }}>
            Early bird access active · Limited passes available per track
          </p>
        </div>

        {/* Pricing Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 52 }}>
          {tiers.map((t, i) => {
            const isSelected = selected === i;
            return (
              <div
                key={t.name}
                onClick={() => setSelected(i)}
                className="glass-panel"
                style={{
                  borderRadius: 18,
                  padding: "36px 30px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  borderColor: isSelected ? "rgba(56, 189, 248, 0.7)" : t.highlight ? "rgba(59, 130, 246, 0.35)" : "rgba(255, 255, 255, 0.08)",
                  boxShadow: isSelected ? "0 0 35px rgba(56, 189, 248, 0.25)" : t.highlight ? "0 0 25px rgba(37, 99, 235, 0.15)" : "none",
                  transform: isSelected ? "translateY(-4px)" : "none",
                }}
              >
                {t.highlight && (
                  <div style={{
                    position: "absolute",
                    top: 18,
                    right: 18,
                    background: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 800,
                    padding: "4px 12px",
                    borderRadius: 100,
                    letterSpacing: "0.08em",
                    boxShadow: "0 0 15px rgba(14, 165, 233, 0.5)",
                  }}>
                    MOST POPULAR
                  </div>
                )}

                <div style={{ fontSize: 14, color: "#94a3b8", fontWeight: 600, marginBottom: 8 }}>
                  {t.name}
                </div>
                <div className="font-display" style={{ fontSize: 44, fontWeight: 800, color: "#f8fafc", letterSpacing: "-0.03em", marginBottom: 12 }}>
                  {t.price}
                </div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, marginBottom: 28, minHeight: 40 }}>
                  {t.desc}
                </p>

                <div style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  paddingTop: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}>
                  {t.perks.map((p) => (
                    <div key={p} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "rgba(56, 189, 248, 0.15)",
                        border: "1px solid rgba(56, 189, 248, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2,
                      }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.45 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div style={{ textAlign: "center" }}>
          <button style={{
            background: "linear-gradient(135deg, #65a30d, #84cc16)",
            color: "#050705",
            padding: "18px 56px",
            borderRadius: 12,
            border: "none",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.02em",
            boxShadow: "0 0 35px rgba(101, 163, 13, 0.4)",
            transition: "all 0.25s ease",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 0 50px rgba(163, 230, 53, 0.65)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 35px rgba(101, 163, 13, 0.4)";
            }}
          >
            Claim {tiers[selected].name} Pass →
          </button>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, color: "#8d9e8b", fontSize: 13, marginTop: 16 }}>
            <span>🔒 Encrypted checkout</span>
            <span>⚡ Instant digital badge</span>
            <span>🛡️ Refundable until Feb 28</span>
          </div>
        </div>
      </div>
    </section>
  );
}

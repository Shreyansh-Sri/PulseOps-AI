"use client";
import { useEffect, useRef, useState } from "react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Hero() {
  return (
    <section id="about" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
      {/* Grid bg & Lines */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.55 }} />
      <div className="grid-lines-bg" style={{ position: "absolute", inset: 0, opacity: 0.35 }} />

      {/* Cyber/Neon ambient glows */}
      <div className="ambient-glow glow-blue animate-pulse-glow" style={{
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 700,
        height: 380,
      }} />
      <div className="ambient-glow glow-cyan" style={{
        top: "25%",
        left: "15%",
        width: 450,
        height: 350,
      }} />
      <div className="ambient-glow glow-purple" style={{
        top: "30%",
        right: "10%",
        width: 500,
        height: 400,
      }} />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "140px 2rem 90px", width: "100%", zIndex: 1 }}>
        {/* Eyebrow badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(14, 20, 36, 0.75)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(56, 189, 248, 0.25)",
          borderRadius: 100,
          padding: "7px 18px",
          marginBottom: 36,
          boxShadow: "0 0 25px rgba(56, 189, 248, 0.15)",
        }}>
          <span style={{ position: "relative", display: "flex", height: 8, width: 8 }}>
            <span style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#38bdf8",
              opacity: 0.75,
              animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
            }} />
            <span style={{
              borderRadius: "50%",
              height: 8,
              width: 8,
              background: "#0ea5e9",
              boxShadow: "0 0 10px #38bdf8",
            }} />
          </span>
          <span style={{ fontSize: 13, color: "#cbd5e1", letterSpacing: "0.04em", fontWeight: 500 }}>
            March 14–16, 2025 · Mumbai, India
          </span>
          <span style={{
            fontSize: 11,
            color: "#38bdf8",
            background: "rgba(56, 189, 248, 0.12)",
            padding: "2px 8px",
            borderRadius: 100,
            fontWeight: 600,
          }}>
            Registrations Live
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-display" style={{
          fontSize: "clamp(52px, 8.5vw, 102px)",
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: "-0.035em",
          marginBottom: 28,
          maxWidth: 960,
        }}>
          <span className="text-gradient">Where Builders</span>
          <br />
          <span className="text-gradient-cyan">Shape Tomorrow.</span>
        </h1>

        <p style={{
          fontSize: "clamp(17px, 2.1vw, 21px)",
          color: "#94a3b8",
          lineHeight: 1.75,
          maxWidth: 580,
          marginBottom: 44,
          fontWeight: 400,
        }}>
          PulseOps AI Summit unites 5,000+ pioneering founders, AI engineers, and visionary investors for three transformative days of deep-tech talks, live builds, and career-defining breakthroughs.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <a href="#register" style={{
            background: "linear-gradient(135deg, #2563eb, #06b6d4)",
            color: "#fff",
            padding: "16px 36px",
            borderRadius: 10,
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 0 35px rgba(37, 99, 235, 0.45)",
            transition: "all 0.25s ease",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 45px rgba(6, 182, 212, 0.65)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 0 35px rgba(37, 99, 235, 0.45)";
            }}
          >
            <span>Claim Your Summit Pass</span>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="#speakers" style={{
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#e2e8f0",
            padding: "16px 34px",
            borderRadius: 10,
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 600,
            transition: "all 0.25s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.5)";
              e.currentTarget.style.background = "rgba(56, 189, 248, 0.08)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
              e.currentTarget.style.transform = "none";
            }}
          >
            Explore Speakers
          </a>
        </div>

        {/* Stats strip */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginTop: 76,
        }}>
          {[
            { value: 5000, suffix: "+", label: "Attendees & Builders", glow: "#3b82f6" },
            { value: 80, suffix: "+", label: "World-Class Speakers", glow: "#06b6d4" },
            { value: 40, suffix: "+", label: "Funded Startups", glow: "#8b5cf6" },
            { value: 3, suffix: " Days", label: "Intensive Programming", glow: "#10b981" },
          ].map(stat => (
            <div key={stat.label} className="glass-panel" style={{
              borderRadius: 14,
              padding: "28px 24px",
              textAlign: "left",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${stat.glow}, transparent)`,
              }} />
              <div className="font-display" style={{
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 800,
                color: "#f8fafc",
                letterSpacing: "-0.03em",
              }}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

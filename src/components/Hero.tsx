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
      {/* Grid bg */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

      {/* Blue radial glow */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 800,
        height: 400,
        background: "radial-gradient(ellipse, rgba(44,107,237,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "120px 2rem 80px", width: "100%" }}>
        {/* Eyebrow */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 100,
          padding: "6px 16px",
          marginBottom: 40,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue)", boxShadow: "0 0 8px var(--blue)" }} />
          <span style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.06em" }}>
            March 14–16, 2025 · Mumbai, India
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-display" style={{
          fontSize: "clamp(48px, 8vw, 96px)",
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
          marginBottom: 24,
          maxWidth: 900,
        }}>
          <span style={{ color: "var(--text)" }}>Where Builders</span>
          <br />
          <span style={{ color: "var(--blue)" }}>Shape Tomorrow.</span>
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "var(--muted)",
          lineHeight: 1.7,
          maxWidth: 520,
          marginBottom: 48,
        }}>
          PulseOps Summit brings together 5,000+ founders, engineers, and investors for three days of talks, workshops, and collisions that matter.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="#register" style={{
            background: "var(--blue)",
            color: "#fff",
            padding: "14px 32px",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Apply to Attend
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="#speakers" style={{
            border: "1px solid var(--border)",
            color: "var(--text)",
            padding: "14px 32px",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 500,
            transition: "border-color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--muted)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            View Speakers
          </a>
        </div>

        {/* Stats strip */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "var(--border)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
          marginTop: 80,
        }}>
          {[
            { value: 5000, suffix: "+", label: "Attendees" },
            { value: 80, suffix: "+", label: "Speakers" },
            { value: 40, suffix: "+", label: "Startups" },
            { value: 3, suffix: " Days", label: "of Programming" },
          ].map(stat => (
            <div key={stat.label} style={{
              background: "var(--surface)",
              padding: "28px 24px",
              textAlign: "center",
            }}>
              <div className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

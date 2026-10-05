"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = ["About", "Speakers", "Events", "Schedule", "Sponsors", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        background: scrolled ? "rgba(6, 8, 14, 0.82)" : "rgba(6, 8, 14, 0.3)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        padding: "0 2rem",
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 68,
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className="font-display" style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(59, 130, 246, 0.5)",
            }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>⚡</span>
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em" }}>
              <span style={{ color: "#fff" }}>Pulse</span>
              <span style={{ color: "#94a3b8" }}>Ops</span>
            </div>
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              background: "linear-gradient(90deg, #38bdf8, #818cf8)",
              color: "#fff",
              padding: "2px 8px",
              borderRadius: 20,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow: "0 0 12px rgba(56, 189, 248, 0.35)",
            }}>AI 2025</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              transition: "all 0.2s",
              position: "relative",
              padding: "4px 0",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.textShadow = "0 0 8px rgba(255,255,255,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.textShadow = "none";
              }}
            >{l}</a>
          ))}
          <a href="#register" style={{
            background: "linear-gradient(135deg, #2563eb, #06b6d4)",
            color: "#fff",
            padding: "8px 22px",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.02em",
            boxShadow: "0 0 20px rgba(37, 99, 235, 0.45)",
            transition: "all 0.25s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-1px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 0 28px rgba(6, 182, 212, 0.6)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(37, 99, 235, 0.45)";
            }}
          >
            <span>Register Now</span>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", display: "none" }}
          className="mobile-menu-btn"
        >
          <div style={{ width: 22, height: 2, background: "currentColor", marginBottom: 5, transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <div style={{ width: 22, height: 2, background: "currentColor", marginBottom: 5, opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: 22, height: 2, background: "currentColor", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "1.25rem 0",
          background: "rgba(6, 8, 14, 0.98)",
          backdropFilter: "blur(20px)",
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "10px 0",
                color: "var(--muted)",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 500,
              }}
            >{l}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

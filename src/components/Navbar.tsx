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
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(5,6,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        padding: "0 2rem",
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
      }}>
        {/* Logo */}
        <div className="font-display" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>
          <span style={{ color: "var(--blue)" }}>Pulse</span>
          <span style={{ color: "var(--text)" }}>Ops</span>
          <span style={{
            fontSize: 18,
            color: "var(--blue)",
            marginLeft: 8,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>AI</span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >{l}</a>
          ))}
          <a href="#register" style={{
            background: "var(--blue)",
            color: "#fff",
            padding: "8px 20px",
            borderRadius: 6,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}>Register</a>
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
          borderTop: "1px solid var(--border)",
          padding: "1rem 0",
          background: "rgba(5,6,10,0.98)",
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                color: "var(--muted)",
                textDecoration: "none",
                fontSize: 15,
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

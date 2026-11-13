"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { label: "Pipelines", href: "/#pipeline" },
  { label: "Kubernetes", href: "/#kubernetes" },
  { label: "Cost Tracking", href: "/#cost" },
  { label: "Postmortems", href: "/#postmortem" },
  { label: "Alerts", href: "/#notifications" },
];

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
        borderBottom: scrolled ? "1px solid rgba(101, 163, 13, 0.15)" : "1px solid transparent",
        background: scrolled ? "rgba(246, 248, 244, 0.92)" : "rgba(246, 248, 244, 0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        padding: "0 2rem",
        boxShadow: scrolled ? "0 1px 8px rgba(0, 0, 0, 0.05)" : "none",
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
              background: "linear-gradient(135deg, #65a30d, #a3e635)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(101, 163, 13, 0.45)",
            }}>
              <span style={{ color: "#ffffff", fontWeight: 800, fontSize: 16 }}>⚡</span>
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em" }}>
              <span style={{ color: "#1a2e12" }}>Pulse</span>
              <span style={{ color: "#2d521dff" }}>Ops</span>
              <span style={{ color: "#4d7c0f", marginLeft: 6 }}>AI</span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.label} href={l.href} style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              transition: "all 0.2s",
              position: "relative",
              padding: "4px 0",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#1a2e12";
                e.currentTarget.style.textShadow = "0 0 8px rgba(77,124,15,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.textShadow = "none";
              }}
            >{l.label}</Link>
          ))}

          <Link
            href="/signup"
            style={{
              padding: "7px 18px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #4d7c0f, #65a30d)",
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 2px 10px rgba(101, 163, 13, 0.25)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(101, 163, 13, 0.35)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(101, 163, 13, 0.25)";
            }}
          >
            Get Started
          </Link>
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
          borderTop: "1px solid rgba(0,0,0,0.06)",
          padding: "1.25rem 0",
          background: "rgba(246, 248, 244, 0.98)",
          backdropFilter: "blur(20px)",
        }}>
          {links.map(l => (
            <Link key={l.label} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "10px 0",
                color: "var(--muted)",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 500,
              }}
            >{l.label}</Link>
          ))}
          <div style={{ paddingTop: "12px" }}>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "inline-block",
                padding: "8px 20px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #4d7c0f, #65a30d)",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Get Started
            </Link>
          </div>
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

"use client";
export default function Footer() {
  return (
    <footer id="contact" style={{ borderTop: "1px solid var(--border)", padding: "60px 2rem 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div className="font-display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
              <span style={{ color: "var(--blue)" }}>Pulse</span>Ops
            </div>
            <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.7, maxWidth: 200 }}>
              The annual summit for India's next wave of builders.
            </p>
          </div>

          {[
            {
              title: "About", links: ["About", "Speakers", "Schedule", "Events"]
            },
            {
              title: "Participate", links: ["Register", "IdeaForge", "Volunteer", "Sponsor"]
            },
            {
              title: "Connect", links: ["contact@pulseops.dev", "Twitter", "LinkedIn", "Instagram"]
            },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 12, color: "var(--text)", fontWeight: 600, marginBottom: 16, letterSpacing: "0.04em" }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <a key={l} href="#" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                  >{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>© 2025 PulseOps Summit. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Mumbai, India · March 14–16, 2025</span>
        </div>
      </div>
    </footer>
  );
}

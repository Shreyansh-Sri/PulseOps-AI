"use client";

const tiers = [
  {
    name: "Title Sponsors",
    sponsors: ["TechCorp", "Nexus Ventures", "Zepto", "Groww"],
    size: 28,
  },
  {
    name: "Gold",
    sponsors: ["Postman", "Razorpay", "Setu", "AWS", "Browserstack"],
    size: 20,
  },
  {
    name: "Community",
    sponsors: ["Dev.to", "PH", "GDSC", "ACM", "MLH", "GitHub Education"],
    size: 15,
  },
];

export default function Sponsors() {
  return (
    <section id="sponsors" style={{ padding: "100px 2rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 12, color: "var(--blue)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase", fontWeight: 600 }}>
            Sponsors
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Backed by the best.
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {tiers.map(tier => (
            <div key={tier.name}>
              <div style={{
                fontSize: 11,
                color: "var(--muted)",
                textAlign: "center",
                marginBottom: 20,
                letterSpacing: "0.08em",
              }}>
                {tier.name}
              </div>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 12,
              }}>
                {tier.sponsors.map(s => (
                  <div key={s} style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "16px 28px",
                    fontSize: tier.size,
                    fontWeight: 700,
                    color: "var(--muted)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: "-0.01em",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "var(--blue-dim)";
                      e.currentTarget.style.color = "var(--text)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--muted)";
                    }}
                  >{s}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 64,
          textAlign: "center",
          padding: "40px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
        }}>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Become a Sponsor</div>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>Reach 5,000+ builders, founders, and investors in one room.</p>
          <a href="mailto:sponsors@pulseops.dev" style={{
            background: "var(--blue)",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}>Get Sponsorship Deck</a>
        </div>
      </div>
    </section>
  );
}

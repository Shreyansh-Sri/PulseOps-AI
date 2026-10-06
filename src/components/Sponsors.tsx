"use client";

const tiers = [
  {
    name: "Strategic Partners",
    sponsors: ["Google Cloud", "NVIDIA", "Microsoft Azure", "AWS"],
    size: 24,
    color: "#38bdf8",
  },
  {
    name: "Growth & Ecosystem Leaders",
    sponsors: ["Postman", "Razorpay", "Zepto", "Groww", "BrowserStack"],
    size: 18,
    color: "#818cf8",
  },
  {
    name: "Developer & Community Backers",
    sponsors: ["Dev.to", "Product Hunt", "Hugging Face", "MLH", "GitHub Education"],
    size: 14,
    color: "#94a3b8",
  },
];

export default function Sponsors() {
  return (
    <section id="sponsors" style={{ position: "relative", padding: "120px 2rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
      {/* Background glow */}
      <div className="ambient-glow glow-blue" style={{ bottom: "15%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, opacity: 0.12 }} />

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
            Industry Support
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            Backed by <span className="text-gradient">the world's best.</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {tiers.map(tier => (
            <div key={tier.name}>
              <div style={{
                fontSize: 12,
                color: "#64748b",
                textAlign: "center",
                marginBottom: 20,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}>
                {tier.name}
              </div>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 16,
              }}>
                {tier.sponsors.map(s => (
                  <div
                    key={s}
                    className="glass-panel"
                    style={{
                      borderRadius: 12,
                      padding: "18px 32px",
                      fontSize: tier.size,
                      fontWeight: 700,
                      color: "#cbd5e1",
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: "-0.02em",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)";
                      e.currentTarget.style.boxShadow = "0 0 25px rgba(56, 189, 248, 0.2)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "#cbd5e1";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sponsorship CTA Card */}
        <div
          className="glass-panel"
          style={{
            marginTop: 72,
            textAlign: "center",
            padding: "50px 32px",
            borderRadius: 18,
            border: "1px solid rgba(56, 189, 248, 0.25)",
            background: "linear-gradient(180deg, rgba(14, 20, 36, 0.75) 0%, rgba(6, 10, 20, 0.85) 100%)",
            boxShadow: "0 10px 40px -10px rgba(59, 130, 246, 0.2)",
          }}
        >
          <h3 className="font-display" style={{ fontSize: 26, fontWeight: 700, marginBottom: 12, color: "#f8fafc" }}>
            Partner with PulseOps AI 2025
          </h3>
          <p style={{ color: "#94a3b8", fontSize: 15, maxWidth: 540, margin: "0 auto 28px", lineHeight: 1.6 }}>
            Showcase your infrastructure, recruit top builders, and position your brand directly in front of 5,000+ engineers and venture capital partners.
          </p>
          <a
            href="mailto:sponsors@pulseops.dev"
            style={{
              background: "linear-gradient(135deg, #65a30d, #84cc16)",
              color: "#050705",
              padding: "14px 34px",
              borderRadius: 10,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.02em",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 0 25px rgba(101, 163, 13, 0.4)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 0 35px rgba(163, 230, 53, 0.6)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(101, 163, 13, 0.4)";
            }}
          >
            <span>Request Sponsorship Prospectus</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

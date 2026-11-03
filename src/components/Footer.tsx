"use client";

export default function Footer() {
  return (
    <footer id="contact" style={{ position: "relative", borderTop: "1px solid rgba(101, 163, 13, 0.12)", padding: "80px 2rem 40px", background: "rgba(238, 241, 235, 0.98)" }}>
      {/* Subtle top glow */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 600,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(101, 163, 13, 0.3), transparent)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 56 }}>
          {/* Brand Column */}
          <div>
            <div className="font-display" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
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
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>
                <span style={{ color: "#1a2e12" }}>Pulse</span>
                <span style={{ color: "#6b8560" }}>Ops</span>
                <span style={{ color: "#4d7c0f", marginLeft: 6, fontSize: 16 }}>AI</span>
              </div>
            </div>
            <p style={{ color: "#6b8560", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              AI-Powered DevOps Copilot. Detect broken CI/CD pipelines, debug Kubernetes crashes, and track cost overruns in real time.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: [
                { label: "CI/CD Pipeline Analysis", href: "#" },
                { label: "Kubernetes Root Cause", href: "#" },
                { label: "Cost Anomaly Detection", href: "#" },
                { label: "Automated Postmortems", href: "#" },
              ],
            },
            {
              title: "Integrations",
              links: [
                { label: "GitLab CI/CD", href: "#" },
                { label: "Kubernetes Clusters", href: "#" },
                { label: "Slack Webhooks", href: "#" },
                { label: "AWS / GCP Billing", href: "#" },
              ],
            },
            {
              title: "Connect",
              links: [
                { label: "contact@pulseops.dev", href: "mailto:contact@pulseops.dev" },
                { label: "X / Twitter (@PulseOpsAI)", href: "https://twitter.com" },
                { label: "GitHub Repository", href: "https://github.com/Shreyansh-Sri/PulseOps-AI" },
                { label: "Discord Community", href: "#" },
              ],
            },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 13, color: "#1a2e12", fontWeight: 700, marginBottom: 20, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    style={{
                      color: "#6b8560",
                      textDecoration: "none",
                      fontSize: 14,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#4d7c0f";
                      e.currentTarget.style.paddingLeft = "4px";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "#6b8560";
                      e.currentTarget.style.paddingLeft = "0px";
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid rgba(0, 0, 0, 0.06)",
          paddingTop: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <span style={{ fontSize: 13, color: "#6b8560" }}>
            © {new Date().getFullYear()} PulseOps AI. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#6b8560" }}>
            <span>Real-time Incident & Cost Intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

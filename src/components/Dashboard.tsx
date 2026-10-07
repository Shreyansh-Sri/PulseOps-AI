"use client";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type Severity = "critical" | "high" | "medium" | "low";
type Status = "open" | "investigating" | "resolved";
type Tab = "pipeline" | "kubernetes" | "cost" | "postmortem";

// ── Seed data — reflects synopsis exactly ─────────────────────────────────
const pipelineEvents = [
  {
    id: "INC-041", time: "12 min ago", project: "lexcortex-backend",
    stage: "Docker build", severity: "critical" as Severity, status: "open" as Status,
    root_cause: "Missing environment variable DATABASE_URL in the Docker build stage. The container cannot resolve the connection string at build time.",
    fix: "Add DATABASE_URL to CI/CD → Settings → Variables. Mark as masked. Re-trigger the pipeline.",
    log: `Step 4/9 : RUN npm run build\nERROR: Environment variable DATABASE_URL is not set.\n> next build failed\nError: Process completed with exit code 1.`,
  },
  {
    id: "INC-037", time: "Yesterday", project: "lexcortex-api",
    stage: "Test suite", severity: "low" as Severity, status: "resolved" as Status,
    root_cause: "Jest ran sequentially on a 4-core runner with no node_modules cache. Test time inflated 4.2× baseline.",
    fix: "Enable --runInBand=false. Add node_modules to GitLab CI cache stanza. Cuts test time ~68%.",
    log: `Job duration: 18m 42s  (baseline: 4m 20s)\nCache hit: MISS\nTests: 847 passed\nSlowest: auth.test.ts  3m 12s`,
  },
];

const k8sEvents = [
  {
    id: "INC-040", time: "38 min ago", pod: "api-gateway-7f9b", namespace: "production",
    state: "OOMKilled", severity: "high" as Severity, status: "open" as Status,
    root_cause: "Container exceeded its 256Mi memory limit. Node memory pressure caused kubelet to terminate the pod immediately.",
    fix: "Raise memory limit to 512Mi in the deployment manifest. Check /metrics for leak patterns before rollout.",
    log: `Warning  OOMKilling  kubelet\nMemory cgroup out of memory: Kill process 3821\nLimits:   memory: 256Mi\nLast State: Terminated  Reason: OOMKilled  Exit Code: 137`,
  },
  {
    id: "INC-038", time: "5 hr ago", pod: "worker-queue-5d8c", namespace: "production",
    state: "CrashLoopBackOff", severity: "high" as Severity, status: "resolved" as Status,
    root_cause: "REDIS_URL absent from pod environment. Process exits immediately on startup when the Redis client cannot connect.",
    fix: "Create a Kubernetes secret for REDIS_URL and reference it in the deployment env block. kubectl rollout restart.",
    log: `Back-off restarting failed container\nError: connect ECONNREFUSED redis:6379\nRestarts: 8\nState: CrashLoopBackOff`,
  },
];

const costEvents = [
  {
    id: "COST-009", time: "2 hr ago", resource: "lexcortex-dev-cicd",
    type: "e2-standard-4", overage: "14 hr", overbill: "₹1,840",
    severity: "medium" as Severity, status: "investigating" as Status,
    root_cause: "Dev VM ran 14 hours past its scheduled shutdown window. Probable link: INC-041 pipeline retries blocked the auto-shutdown hook from completing.",
    fix: "Stop the VM manually now. Fix the shutdown hook to be independent of pipeline exit status.",
    baseline: "Shut down at 18:00 IST", observed: "Still running at 08:14 IST (next day)",
  },
];

const postmortems = [
  {
    id: "PM-014", incident: "INC-036", title: "DB replica failover — stale reads",
    closed: "2 days ago", severity: "medium" as Severity,
    impact: "~340 users received stale data for 6 minutes during peak traffic.",
    root_cause: "Primary replica fell 43 s behind during a high-write batch job. Failover threshold was too high.",
    timeline: "14:22 detected → 14:24 paged → 14:28 failover complete → 14:31 confirmed clean",
    actions: ["Reduce replica lag alert threshold to 5 s", "Add batch job rate limiting", "DR runbook updated ✓"],
    status: "resolved" as Status,
  },
];

// ── Style tokens ───────────────────────────────────────────────────────────
const SEV: Record<Severity, { dot: string; badge: string; bar: string }> = {
  critical: { dot: "#ef4444", badge: "rgba(239,68,68,0.1)", bar: "#ef4444" },
  high: { dot: "#f97316", badge: "rgba(249,115,22,0.1)", bar: "#f97316" },
  medium: { dot: "#eab308", badge: "rgba(234,179,8,0.1)", bar: "#eab308" },
  low: { dot: "#65a30d", badge: "rgba(101,163,13,0.1)", bar: "#65a30d" },
};

const STA: Record<Status, { label: string; color: string }> = {
  open: { label: "Open", color: "#ef4444" },
  investigating: { label: "Investigating", color: "#eab308" },
  resolved: { label: "Resolved", color: "#65a30d" },
};

// ── Sub-components ─────────────────────────────────────────────────────────
function StatusDot({ status }: { status: Status }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 12, color: STA[status].color,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: STA[status].color, display: "inline-block", flexShrink: 0 }} />
      {STA[status].label}
    </span>
  );
}

function SevBadge({ sev }: { sev: Severity }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 4,
      background: SEV[sev].badge, color: SEV[sev].dot,
      border: `1px solid ${SEV[sev].dot}33`,
      textTransform: "capitalize",
    }}>{sev}</span>
  );
}

function LogBox({ text }: { text: string }) {
  return (
    <pre style={{
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: 12, color: "#a3e635",
      background: "var(--bg-darker, #050705)",
      border: "1px solid var(--border)",
      borderRadius: 6, padding: "12px 16px",
      overflowX: "auto", lineHeight: 1.75,
      whiteSpace: "pre-wrap", margin: 0,
    }}>{text}</pre>
  );
}

function DiagnosisBlock({ root_cause, fix }: { root_cause: string; fix: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
      <div style={{ background: "var(--bg-darker, #050705)", border: "1px solid var(--border)", borderRadius: 6, padding: "14px 16px" }}>
        <p style={{ fontSize: 11, color: "var(--primary, #65a30d)", fontWeight: 600, marginBottom: 8, letterSpacing: "0.04em" }}>Root cause</p>
        <p style={{ fontSize: 13, color: "var(--text-secondary, #d1dbcd)", lineHeight: 1.65 }}>{root_cause}</p>
      </div>
      <div style={{ background: "var(--bg-darker, #050705)", border: "1px solid var(--border)", borderRadius: 6, padding: "14px 16px" }}>
        <p style={{ fontSize: 11, color: "#10b981", fontWeight: 600, marginBottom: 8, letterSpacing: "0.04em" }}>Suggested fix</p>
        <p style={{ fontSize: 13, color: "var(--text-secondary, #d1dbcd)", lineHeight: 1.65 }}>{fix}</p>
      </div>
    </div>
  );
}

// ── Row component ──────────────────────────────────────────────────────────
function Row({
  id, severity, status, title, meta, expanded, onClick,
  children,
}: {
  id: string; severity: Severity; status: Status;
  title: string; meta: string; expanded: boolean;
  onClick: () => void; children: React.ReactNode;
}) {
  const sev = SEV[severity];
  return (
    <div style={{ borderLeft: `3px solid ${sev.bar}`, background: expanded ? "var(--surface2, #131a14)" : "var(--bg, #090c09)", transition: "background 0.15s" }}>
      <div
        onClick={onClick}
        style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--surface, rgba(16,22,17,0.72))")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        <span style={{ fontFamily: "monospace", fontSize: 11, color: sev.dot, fontWeight: 700, flexShrink: 0, width: 60 }}>{id}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text, #f0f4ee)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
          <div style={{ fontSize: 12, color: "var(--muted, #8d9e8b)", marginTop: 2 }}>{meta}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <SevBadge sev={severity} />
          <StatusDot status={status} />
          <span style={{ fontSize: 16, color: "var(--muted, #8d9e8b)", marginLeft: 4, transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>›</span>
        </div>
      </div>
      {expanded && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Tab: Pipeline ──────────────────────────────────────────────────────────
function PipelineTab() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
        GitLab CI failures — webhook ingested, LLM-diagnosed, ranked by severity.
      </p>
      <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
        {pipelineEvents.map(ev => (
          <Row key={ev.id} id={ev.id} severity={ev.severity} status={ev.status}
            title={ev.project} meta={`${ev.stage} · ${ev.time}`}
            expanded={open === ev.id} onClick={() => setOpen(open === ev.id ? null : ev.id)}
          >
            <DiagnosisBlock root_cause={ev.root_cause} fix={ev.fix} />
            <div style={{ marginTop: 12 }}>
              <p style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, marginBottom: 8, letterSpacing: "0.04em" }}>Log excerpt</p>
              <LogBox text={ev.log} />
            </div>
          </Row>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Kubernetes ────────────────────────────────────────────────────────
function KubernetesTab() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
        Pod crash states — read via Kubernetes API, translated to plain English.
      </p>
      <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
        {k8sEvents.map(ev => (
          <Row key={ev.id} id={ev.id} severity={ev.severity} status={ev.status}
            title={ev.pod} meta={`${ev.state} · ${ev.namespace} · ${ev.time}`}
            expanded={open === ev.id} onClick={() => setOpen(open === ev.id ? null : ev.id)}
          >
            <DiagnosisBlock root_cause={ev.root_cause} fix={ev.fix} />
            <div style={{ marginTop: 12 }}>
              <p style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, marginBottom: 8, letterSpacing: "0.04em" }}>kubectl output</p>
              <LogBox text={ev.log} />
            </div>
          </Row>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Cost ──────────────────────────────────────────────────────────────
function CostTab() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
        Cloud cost anomalies — polled daily from GCP/AWS billing APIs, compared against baseline.
      </p>
      <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
        {costEvents.map(ev => (
          <Row key={ev.id} id={ev.id} severity={ev.severity} status={ev.status}
            title={ev.resource} meta={`${ev.type} · ${ev.overage} overage · ${ev.time}`}
            expanded={open === ev.id} onClick={() => setOpen(open === ev.id ? null : ev.id)}
          >
            <DiagnosisBlock root_cause={ev.root_cause} fix={ev.fix} />
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "var(--bg-darker, #050705)", border: "1px solid var(--border)", borderRadius: 6, padding: "12px 16px" }}>
                <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>Baseline</p>
                <p style={{ fontSize: 13, color: "var(--text)" }}>{ev.baseline}</p>
              </div>
              <div style={{ background: "var(--bg-darker, #050705)", border: "1px solid var(--border)", borderRadius: 6, padding: "12px 16px" }}>
                <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>Observed</p>
                <p style={{ fontSize: 13, color: "#ef4444" }}>{ev.observed}</p>
              </div>
            </div>
            <div style={{ marginTop: 12, background: "var(--bg-darker, #050705)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 6, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Estimated overbill</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#ef4444", fontFamily: "'Space Grotesk', sans-serif" }}>{ev.overbill}</span>
            </div>
          </Row>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Postmortem ────────────────────────────────────────────────────────
function PostmortemTab() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
        Structured postmortems — auto-generated from closed incidents. Impact · Root Cause · Timeline · Action Items.
      </p>
      <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
        {postmortems.map(pm => (
          <Row key={pm.id} id={pm.id} severity={pm.severity} status={pm.status}
            title={pm.title} meta={`${pm.incident} · closed ${pm.closed}`}
            expanded={open === pm.id} onClick={() => setOpen(open === pm.id ? null : pm.id)}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
              {[
                { label: "Impact", text: pm.impact },
                { label: "Root cause", text: pm.root_cause },
                { label: "Timeline", text: pm.timeline },
              ].map(block => (
                <div key={block.label} style={{ background: "var(--bg-darker, #050705)", border: "1px solid var(--border)", borderRadius: 6, padding: "14px 16px" }}>
                  <p style={{ fontSize: 11, color: "var(--primary, #65a30d)", fontWeight: 600, marginBottom: 8, letterSpacing: "0.04em" }}>{block.label}</p>
                  <p style={{ fontSize: 13, color: "var(--text-secondary, #d1dbcd)", lineHeight: 1.65 }}>{block.text}</p>
                </div>
              ))}
              <div style={{ background: "var(--bg-darker, #050705)", border: "1px solid var(--border)", borderRadius: 6, padding: "14px 16px" }}>
                <p style={{ fontSize: 11, color: "var(--primary, #65a30d)", fontWeight: 600, marginBottom: 10, letterSpacing: "0.04em" }}>Action items</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {pm.actions.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ width: 16, height: 16, borderRadius: "50%", background: a.includes("✓") ? "rgba(101,163,13,0.15)" : "var(--border)", border: `1px solid ${a.includes("✓") ? "#65a30d" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        {a.includes("✓") && <span style={{ fontSize: 8, color: "#65a30d" }}>✓</span>}
                      </span>
                      <span style={{ fontSize: 13, color: a.includes("✓") ? "var(--muted)" : "var(--text-secondary)", lineHeight: 1.5, textDecoration: a.includes("✓") ? "line-through" : "none" }}>{a.replace(" ✓", "")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Row>
        ))}
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string; desc: string; count: number; alert: boolean }[] = [
  { id: "pipeline", label: "CI/CD Pipeline", desc: "Phase 1", count: 2, alert: true },
  { id: "kubernetes", label: "Kubernetes", desc: "Phase 2", count: 2, alert: true },
  { id: "cost", label: "Cost Anomalies", desc: "Phase 3", count: 1, alert: true },
  { id: "postmortem", label: "Postmortems", desc: "Phase 3", count: 1, alert: false },
];

const SUMMARY = [
  { label: "Open", value: "3", color: "#ef4444" },
  { label: "Investigating", value: "1", color: "#eab308" },
  { label: "Resolved", value: "2", color: "#65a30d" },
  { label: "Cost overbill", value: "₹1.8k", color: "#f97316" },
];

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("pipeline");

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64, background: "var(--bg, #090c09)" }}>

      {/* Top summary strip */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "var(--border)" }}>
            {SUMMARY.map(s => (
              <div key={s.label} style={{ background: "var(--bg)", padding: "18px 20px" }}>
                <div className="font-display" style={{ fontSize: 26, fontWeight: 700, color: s.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>

        {/* Page title */}
        <div style={{ marginBottom: 28 }}>
          <h1 className="font-display" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)" }}>
            PulseOps AI — Incident Dashboard
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
            Detect → Store → Diagnose → Correlate → Alert → Document
          </p>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid var(--border)", paddingBottom: 0 }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "10px 18px",
                background: "none",
                border: "none",
                borderBottom: tab === t.id ? "2px solid var(--olive, #84cc16)" : "2px solid transparent",
                color: tab === t.id ? "var(--text)" : "var(--muted)",
                fontSize: 14,
                fontWeight: tab === t.id ? 600 : 400,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: -1,
                transition: "color 0.15s",
              }}
            >
              {t.label}
              {t.alert && (
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  background: tab === t.id ? "rgba(132,204,22,0.15)" : "rgba(255,255,255,0.06)",
                  color: tab === t.id ? "var(--olive, #84cc16)" : "var(--muted)",
                  border: `1px solid ${tab === t.id ? "rgba(132,204,22,0.3)" : "var(--border)"}`,
                  padding: "1px 7px", borderRadius: 100,
                }}>{t.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "pipeline" && <PipelineTab />}
        {tab === "kubernetes" && <KubernetesTab />}
        {tab === "cost" && <CostTab />}
        {tab === "postmortem" && <PostmortemTab />}

        {/* Cross-module correlation note — key synopsis concept */}
        {(tab === "cost" || tab === "pipeline") && (
          <div style={{
            marginTop: 20,
            background: "rgba(234,179,8,0.04)",
            border: "1px solid rgba(234,179,8,0.2)",
            borderRadius: 8,
            padding: "14px 18px",
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
          }}>
            <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>⚠</span>
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#eab308" }}>Cross-module correlation detected — </span>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>
                INC-041 pipeline retries may be blocking the lexcortex-dev-cicd VM auto-shutdown hook (COST-009). Probable link, not confirmed.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
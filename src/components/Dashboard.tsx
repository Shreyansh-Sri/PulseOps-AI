"use client";
import { useState, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type Severity = "critical" | "high" | "medium" | "low";
type Status = "open" | "investigating" | "resolved";
type Tab = "pipeline" | "kubernetes" | "cost" | "postmortem" | "notifications";

interface Toast {
  id: number;
  incidentId: string;
  project: string;
  severity: Severity;
  channel: string;
}

interface NotifLog {
  id: number;
  incidentId: string;
  project: string;
  severity: Severity;
  channel: string;
  sentAt: string;
}

// ── Seed data ─────────────────────────────────────────────────────────────
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
  high:     { dot: "#f97316", badge: "rgba(249,115,22,0.1)", bar: "#f97316" },
  medium:   { dot: "#eab308", badge: "rgba(234,179,8,0.1)",  bar: "#eab308" },
  low:      { dot: "#65a30d", badge: "rgba(101,163,13,0.1)", bar: "#65a30d" },
};

const STA: Record<Status, { label: string; color: string }> = {
  open:          { label: "Open",          color: "#ef4444" },
  investigating: { label: "Investigating", color: "#eab308" },
  resolved:      { label: "Resolved",      color: "#65a30d" },
};

// ── Notification channels config ──────────────────────────────────────────
const CHANNELS = [
  { id: "slack",    label: "Slack",    icon: "💬", color: "#4A154B", connected: true  },
  { id: "email",    label: "Email",    icon: "✉️",  color: "#2563eb", connected: false },
  { id: "telegram", label: "Telegram", icon: "✈️",  color: "#229ED9", connected: false },
];

// ── How it works steps ────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  { icon: "🔍", title: "Detect",    desc: "GitLab CI/CD webhooks & Kubernetes API stream pipeline and pod events in real time." },
  { icon: "🧠", title: "Diagnose",  desc: "LLM analysis identifies root cause, severity level, and a concrete fix suggestion." },
  { icon: "🔗", title: "Correlate", desc: "Cross-module engine links pipeline failures to cost anomalies (e.g. INC-041 → COST-009)." },
  { icon: "🔔", title: "Alert",     desc: "Critical & High incidents instantly notify your team via Slack before credits are wasted." },
  { icon: "📄", title: "Document",  desc: "Closed incidents are auto-converted into structured postmortems with action items." },
];

// ── Sub-components ─────────────────────────────────────────────────────────
function StatusDot({ status }: { status: Status }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: STA[status].color }}>
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

// ── Notify button ──────────────────────────────────────────────────────────
function NotifyBtn({
  incidentId, project, severity,
  onNotify,
}: {
  incidentId: string; project: string; severity: Severity;
  onNotify: (incidentId: string, project: string, severity: Severity) => void;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const canNotify = severity === "critical" || severity === "high";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canNotify || state !== "idle") return;
    setState("sending");
    setTimeout(() => {
      setState("sent");
      onNotify(incidentId, project, severity);
      setTimeout(() => setState("idle"), 3000);
    }, 900);
  };

  if (!canNotify) return null;

  const styles: Record<string, React.CSSProperties> = {
    idle: {
      background: "rgba(239,68,68,0.08)", color: "#ef4444",
      border: "1px solid rgba(239,68,68,0.25)",
    },
    sending: {
      background: "rgba(234,179,8,0.08)", color: "#eab308",
      border: "1px solid rgba(234,179,8,0.25)",
    },
    sent: {
      background: "rgba(101,163,13,0.1)", color: "#65a30d",
      border: "1px solid rgba(101,163,13,0.3)",
    },
  };

  const labels: Record<string, string> = {
    idle: "🔔 Notify Team",
    sending: "⏳ Sending…",
    sent: "✅ Notified",
  };

  return (
    <button
      onClick={handleClick}
      style={{
        ...styles[state],
        fontSize: 11, fontWeight: 600,
        padding: "4px 12px", borderRadius: 6,
        cursor: state === "idle" ? "pointer" : "default",
        transition: "all 0.2s",
        flexShrink: 0,
        fontFamily: "inherit",
      }}
    >
      {labels[state]}
    </button>
  );
}

// ── Row component ──────────────────────────────────────────────────────────
function Row({
  id, severity, status, title, meta, expanded, onClick,
  onNotify, children,
}: {
  id: string; severity: Severity; status: Status;
  title: string; meta: string; expanded: boolean;
  onClick: () => void;
  onNotify: (incidentId: string, project: string, severity: Severity) => void;
  children: React.ReactNode;
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
          <NotifyBtn incidentId={id} project={title} severity={severity} onNotify={onNotify} />
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

// ── Toast system ───────────────────────────────────────────────────────────
function ToastStack({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, display: "flex", flexDirection: "column", gap: 10, zIndex: 999 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: "var(--surface2, #131a14)",
          border: "1px solid rgba(239,68,68,0.3)",
          borderLeft: "3px solid #ef4444",
          borderRadius: 8, padding: "14px 18px",
          minWidth: 300, maxWidth: 380,
          display: "flex", gap: 12, alignItems: "flex-start",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          animation: "slideIn 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>🔔</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>
              Team notified via Slack
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>
              <span style={{ color: SEV[t.severity].dot, fontWeight: 600 }}>{t.incidentId}</span>
              {" "}·{" "}{t.project}
            </div>
          </div>
          <button
            onClick={() => onDismiss(t.id)}
            style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 14, padding: 0, flexShrink: 0 }}
          >✕</button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ── Tab: Pipeline ──────────────────────────────────────────────────────────
function PipelineTab({ onNotify }: { onNotify: (id: string, project: string, sev: Severity) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
        GitLab CI failures — webhook ingested, LLM-diagnosed, ranked by severity.
        <span style={{ marginLeft: 8, fontSize: 11, color: "#ef4444", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 4, padding: "2px 8px" }}>
          🔔 Critical/High incidents auto-alert via Slack
        </span>
      </p>
      <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
        {pipelineEvents.map(ev => (
          <Row key={ev.id} id={ev.id} severity={ev.severity} status={ev.status}
            title={ev.project} meta={`${ev.stage} · ${ev.time}`}
            expanded={open === ev.id} onClick={() => setOpen(open === ev.id ? null : ev.id)}
            onNotify={onNotify}
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
function KubernetesTab({ onNotify }: { onNotify: (id: string, project: string, sev: Severity) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
        Pod crash states — read via Kubernetes API, translated to plain English.
        <span style={{ marginLeft: 8, fontSize: 11, color: "#f97316", background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 4, padding: "2px 8px" }}>
          🔔 High severity pods alert via Slack
        </span>
      </p>
      <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
        {k8sEvents.map(ev => (
          <Row key={ev.id} id={ev.id} severity={ev.severity} status={ev.status}
            title={ev.pod} meta={`${ev.state} · ${ev.namespace} · ${ev.time}`}
            expanded={open === ev.id} onClick={() => setOpen(open === ev.id ? null : ev.id)}
            onNotify={onNotify}
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
function CostTab({ onNotify }: { onNotify: (id: string, project: string, sev: Severity) => void }) {
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
            onNotify={onNotify}
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
  const noop = () => {};
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
            onNotify={noop}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
              {[
                { label: "Impact",     text: pm.impact },
                { label: "Root cause", text: pm.root_cause },
                { label: "Timeline",   text: pm.timeline },
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

// ── Tab: Notifications ─────────────────────────────────────────────────────
function NotificationsTab({ log }: { log: NotifLog[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* How it works */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
          How PulseOps AI Notifications Work
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.title} style={{ background: "var(--bg-darker, #050705)", border: "1px solid var(--border)", borderRadius: 8, padding: "16px 14px", position: "relative" }}>
              {i < HOW_IT_WORKS.length - 1 && (
                <span style={{ position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "var(--border)", zIndex: 1 }}>→</span>
              )}
              <div style={{ fontSize: 22, marginBottom: 8 }}>{step.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{step.title}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert rules */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
          Active Alert Rules
        </p>
        <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
          {[
            { trigger: "Pipeline failure — Critical", condition: "severity = critical AND status = open", channel: "💬 Slack #pipeline-alerts", action: "Instant alert + credit waste warning", active: true },
            { trigger: "Pipeline failure — High",     condition: "severity = high AND status = open",     channel: "💬 Slack #pipeline-alerts", action: "Instant alert",                       active: true },
            { trigger: "Pod OOMKilled or CrashLoop",  condition: "k8s state ∈ {OOMKilled, CrashLoopBackOff}", channel: "💬 Slack #infra-alerts",     action: "Instant alert",                       active: true },
            { trigger: "Cost anomaly > ₹500",         condition: "overbill > ₹500",                      channel: "💬 Slack #cost-alerts",      action: "Daily digest",                        active: true },
            { trigger: "Medium/Low severity",         condition: "severity ∈ {medium, low}",             channel: "Dashboard only",             action: "No external alert",                   active: false },
          ].map((rule, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 60px",
              gap: 12, padding: "14px 18px", borderBottom: i < 4 ? "1px solid var(--border)" : "none",
              background: i % 2 === 0 ? "var(--bg)" : "var(--bg-darker, #050705)",
              alignItems: "center",
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: rule.active ? "var(--text)" : "var(--muted)" }}>{rule.trigger}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "monospace" }}>{rule.condition}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{rule.channel}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{rule.action}</div>
              <div style={{ textAlign: "center" }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 100,
                  background: rule.active ? "rgba(101,163,13,0.12)" : "rgba(255,255,255,0.04)",
                  color: rule.active ? "#65a30d" : "var(--muted)",
                  border: `1px solid ${rule.active ? "rgba(101,163,13,0.3)" : "var(--border)"}`,
                }}>
                  {rule.active ? "ON" : "OFF"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connected channels */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
          Notification Channels
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {CHANNELS.map(ch => (
            <div key={ch.id} style={{
              background: "var(--bg-darker, #050705)",
              border: `1px solid ${ch.connected ? "rgba(101,163,13,0.25)" : "var(--border)"}`,
              borderRadius: 10, padding: "18px 20px",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <span style={{ fontSize: 24 }}>{ch.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{ch.label}</div>
                <div style={{ fontSize: 11, color: ch.connected ? "#65a30d" : "var(--muted)", marginTop: 2 }}>
                  {ch.connected ? "● Connected" : "○ Not configured"}
                </div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 100,
                background: ch.connected ? "rgba(101,163,13,0.12)" : "rgba(255,255,255,0.04)",
                color: ch.connected ? "#65a30d" : "var(--muted)",
                border: `1px solid ${ch.connected ? "rgba(101,163,13,0.3)" : "var(--border)"}`,
              }}>
                {ch.connected ? "LIVE" : "SETUP"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notification log */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
          Notification Log — This Session
        </p>
        {log.length === 0 ? (
          <div style={{
            background: "var(--bg-darker, #050705)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "32px 20px", textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>🔕</div>
            <div style={{ fontSize: 14, color: "var(--muted)" }}>No notifications sent yet this session.</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, opacity: 0.7 }}>
              Click "🔔 Notify Team" on a Critical or High incident to send a Slack alert.
            </div>
          </div>
        ) : (
          <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
            {log.map((entry, i) => (
              <div key={entry.id} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "14px 18px", borderBottom: i < log.length - 1 ? "1px solid var(--border)" : "none",
                background: i % 2 === 0 ? "var(--bg)" : "var(--bg-darker, #050705)",
              }}>
                <span style={{ fontSize: 16 }}>🔔</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: SEV[entry.severity].dot }}>{entry.incidentId}</span>
                  <span style={{ fontSize: 13, color: "var(--text)", marginLeft: 8 }}>{entry.project}</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>{entry.channel}</span>
                <SevBadge sev={entry.severity} />
                <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "monospace" }}>{entry.sentAt}</span>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: "rgba(101,163,13,0.12)", color: "#65a30d", border: "1px solid rgba(101,163,13,0.3)" }}>SENT</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slack setup guide */}
      <div style={{
        background: "rgba(74,21,75,0.08)",
        border: "1px solid rgba(74,21,75,0.3)",
        borderRadius: 10, padding: "20px 22px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 20 }}>💬</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>Slack Setup Guide</span>
          <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: "rgba(101,163,13,0.12)", color: "#65a30d", border: "1px solid rgba(101,163,13,0.3)", marginLeft: "auto" }}>ACTIVE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { step: "1", text: "Go to api.slack.com/apps → Create New App → From scratch" },
            { step: "2", text: "Features → Incoming Webhooks → Activate → Add New Webhook to Workspace" },
            { step: "3", text: "Choose channel (e.g. #pipeline-alerts) → Copy the Webhook URL" },
            { step: "4", text: "Add to .env.local: SLACK_WEBHOOK_URL=https://hooks.slack.com/services/…" },
            { step: "5", text: "PulseOps AI will auto-alert on every Critical / High pipeline failure 🎉" },
          ].map(s => (
            <div key={s.step} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                background: "rgba(132,204,22,0.12)", border: "1px solid rgba(132,204,22,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: "#84cc16",
              }}>{s.step}</span>
              <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{s.text}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string; desc: string; count: number; alert: boolean }[] = [
  { id: "pipeline",      label: "CI/CD Pipeline", desc: "Phase 1", count: 2, alert: true  },
  { id: "kubernetes",    label: "Kubernetes",      desc: "Phase 2", count: 2, alert: true  },
  { id: "cost",          label: "Cost Anomalies",  desc: "Phase 3", count: 1, alert: true  },
  { id: "postmortem",    label: "Postmortems",     desc: "Phase 3", count: 1, alert: false },
  { id: "notifications", label: "Notifications",   desc: "Alerts",  count: 0, alert: false },
];

const SUMMARY = [
  { label: "Open",         value: "3",      color: "#ef4444" },
  { label: "Investigating", value: "1",     color: "#eab308" },
  { label: "Resolved",     value: "2",      color: "#65a30d" },
  { label: "Cost overbill", value: "₹1.8k", color: "#f97316" },
];

let toastCounter = 0;
let logCounter = 0;

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("pipeline");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [notifLog, setNotifLog] = useState<NotifLog[]>([]);

  const handleNotify = useCallback((incidentId: string, project: string, severity: Severity) => {
    const now = new Date();
    const sentAt = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    const toast: Toast = { id: ++toastCounter, incidentId, project, severity, channel: "Slack" };
    setToasts(prev => [...prev, toast]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toast.id)), 5000);

    setNotifLog(prev => [{
      id: ++logCounter, incidentId, project, severity, channel: "💬 Slack #pipeline-alerts", sentAt,
    }, ...prev]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

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
        <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h1 className="font-display" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)" }}>
              PulseOps AI — Incident Dashboard
            </h1>
            <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
              Detect → Store → Diagnose → Correlate → Alert → Document
            </p>
          </div>
          {/* Notification status badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(101,163,13,0.08)", border: "1px solid rgba(101,163,13,0.25)",
            borderRadius: 8, padding: "8px 14px", flexShrink: 0,
          }}>
            <span style={{ fontSize: 14 }}>🔔</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#65a30d" }}>Slack Alerts Active</div>
              <div style={{ fontSize: 10, color: "var(--muted)" }}>Critical &amp; High → #pipeline-alerts</div>
            </div>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", background: "#65a30d",
              boxShadow: "0 0 6px #65a30d", animation: "pulseGlow 2s ease-in-out infinite",
            }} />
          </div>
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
              {t.id === "notifications" && <span>🔔</span>}
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
              {t.id === "notifications" && notifLog.length > 0 && (
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  background: "rgba(239,68,68,0.12)", color: "#ef4444",
                  border: "1px solid rgba(239,68,68,0.3)",
                  padding: "1px 7px", borderRadius: 100,
                }}>{notifLog.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "pipeline"      && <PipelineTab      onNotify={handleNotify} />}
        {tab === "kubernetes"    && <KubernetesTab    onNotify={handleNotify} />}
        {tab === "cost"          && <CostTab          onNotify={handleNotify} />}
        {tab === "postmortem"    && <PostmortemTab />}
        {tab === "notifications" && <NotificationsTab log={notifLog} />}

        {/* Cross-module correlation note */}
        {(tab === "cost" || tab === "pipeline") && (
          <div style={{
            marginTop: 20,
            background: "rgba(234,179,8,0.04)",
            border: "1px solid rgba(234,179,8,0.2)",
            borderRadius: 8, padding: "14px 18px",
            display: "flex", gap: 12, alignItems: "flex-start",
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

      {/* Toast notifications */}
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
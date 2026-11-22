// POST /api/notify
// Sends Slack and/or Email alerts for broken pipelines, Kubernetes crashes, and cost spikes.
// Body: { id, project, stage, severity, status, root_cause, fix, time, channel?: 'all' | 'slack' | 'email', email?: string }

import { sendIncidentEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  let body: {
    id: string;
    project: string;
    stage: string;
    severity: "critical" | "high" | "medium" | "low";
    status: string;
    root_cause: string;
    fix: string;
    time: string;
    channel?: "all" | "slack" | "email";
    email?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const results: Record<string, unknown> = {};
  const channel = body.channel || "all";

  // ── 1. Dispatch Email Alert ─────────────────────────────────────────────
  if (channel === "all" || channel === "email") {
    try {
      const emailResult = await sendIncidentEmail({
        to: body.email,
        incidentId: body.id,
        project: body.project,
        stage: body.stage,
        severity: body.severity,
        status: body.status,
        root_cause: body.root_cause,
        fix: body.fix,
        time: body.time,
      });
      results.email = emailResult;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      results.email = { ok: false, error: msg };
    }
  }

  // ── 2. Dispatch Slack Webhook Alert ─────────────────────────────────────
  if (channel === "all" || channel === "slack") {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith("http") && !webhookUrl.includes("YOUR/WEBHOOK")) {
      const severityEmoji: Record<string, string> = {
        critical: "🔴",
        high: "🟠",
        medium: "🟡",
        low: "🟢",
      };

      const emoji = severityEmoji[body.severity] ?? "⚪";

      const slackPayload = {
        text: `${emoji} *Pipeline Broken — ${body.project}* (${body.id})`,
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: `${emoji} Incident Alert — ${body.project}`,
              emoji: true,
            },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Incident ID*\n\`${body.id}\`` },
              { type: "mrkdwn", text: `*Stage*\n${body.stage}` },
              { type: "mrkdwn", text: `*Severity*\n${body.severity.toUpperCase()}` },
              { type: "mrkdwn", text: `*Status*\n${body.status}` },
              { type: "mrkdwn", text: `*Detected*\n${body.time}` },
            ],
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Root Cause*\n${body.root_cause}`,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Suggested Fix*\n${body.fix}`,
            },
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: "⚡ Sent by *PulseOps AI* Telemetry Alert Dispatcher.",
              },
            ],
          },
        ],
      };

      try {
        const slackRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slackPayload),
        });
        results.slack = { ok: slackRes.ok, status: slackRes.status };
      } catch (err: unknown) {
        results.slack = { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    } else {
      results.slack = { ok: true, provider: "simulated", note: "SLACK_WEBHOOK_URL unconfigured" };
    }
  }

  return Response.json({
    ok: true,
    message: "Alert dispatched successfully.",
    dispatched_at: new Date().toISOString(),
    results,
  });
}

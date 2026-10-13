// POST /api/notify
// Sends a Slack notification for a broken pipeline incident.
// Body: { id, project, stage, severity, status, root_cause, fix, time }

export async function POST(request: Request) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      { error: "SLACK_WEBHOOK_URL is not configured in environment variables." },
      { status: 500 }
    );
  }

  let body: {
    id: string;
    project: string;
    stage: string;
    severity: string;
    status: string;
    root_cause: string;
    fix: string;
    time: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const severityEmoji: Record<string, string> = {
    critical: "🔴",
    high: "🟠",
    medium: "🟡",
    low: "🟢",
  };

  const emoji = severityEmoji[body.severity] ?? "⚪";

  // Slack Block Kit message — rich, structured notification
  const slackPayload = {
    text: `${emoji} *Pipeline Broken — ${body.project}* (${body.id})`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `${emoji} Pipeline Broken — ${body.project}`,
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
        type: "divider",
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "⚡ Sent by *PulseOps AI* — Pipeline failure detection to prevent extra credit charges.",
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

    if (!slackRes.ok) {
      const errText = await slackRes.text();
      return Response.json(
        { error: `Slack returned ${slackRes.status}: ${errText}` },
        { status: 502 }
      );
    }

    return Response.json({ ok: true, message: "Slack notification sent." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: `Failed to reach Slack: ${message}` }, { status: 502 });
  }
}

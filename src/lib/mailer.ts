import nodemailer from "nodemailer";
import { Resend } from "resend";

export interface IncidentEmailPayload {
  to?: string;
  incidentId: string;
  project: string;
  stage: string;
  severity: "critical" | "high" | "medium" | "low";
  status: string;
  root_cause: string;
  fix: string;
  time: string;
}

export async function sendIncidentEmail(payload: IncidentEmailPayload) {
  const recipient = payload.to || process.env.ALERT_EMAIL_RECIPIENT || process.env.SMTP_TO;
  const resendApiKey = process.env.RESEND_API_KEY;

  const severityColors: Record<string, string> = {
    critical: "#ef4444",
    high: "#f97316",
    medium: "#eab308",
    low: "#65a30d",
  };

  const color = severityColors[payload.severity] || "#65a30d";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f8f4; margin: 0; padding: 24px; color: #1a2e12; }
          .card { background: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #13230d; color: #ffffff; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
          .header h1 { margin: 0; font-size: 18px; font-weight: 700; }
          .badge { background: ${color}20; color: ${color}; border: 1px solid ${color}40; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
          .content { padding: 24px; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; background: #f8faf7; padding: 14px; border-radius: 8px; border: 1px solid #e9eee6; font-size: 13px; }
          .meta-item { display: flex; flex-direction: column; }
          .meta-label { color: #6b8560; font-size: 11px; text-transform: uppercase; margin-bottom: 2px; }
          .meta-value { font-weight: 600; color: #1a2e12; }
          .section { margin-bottom: 18px; }
          .section-title { font-size: 12px; font-weight: 700; color: #4d7c0f; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
          .section-box { background: #f6f8f4; border: 1px solid #e2ebd8; border-radius: 8px; padding: 12px 14px; font-size: 13px; line-height: 1.6; color: #2d4123; }
          .footer { padding: 16px 24px; background: #f8faf7; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #6b8560; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div>
              <h1>⚡ PulseOps AI Incident Alert</h1>
              <div style="font-size: 12px; opacity: 0.8; margin-top: 4px;">Project: ${payload.project}</div>
            </div>
            <span class="badge">${payload.severity}</span>
          </div>

          <div class="content">
            <div class="meta-grid">
              <div class="meta-item">
                <span class="meta-label">Incident ID</span>
                <span class="meta-value">${payload.incidentId}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Stage / Component</span>
                <span class="meta-value">${payload.stage}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Detected Time</span>
                <span class="meta-value">${payload.time}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Status</span>
                <span class="meta-value">${payload.status}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Root Cause (AI Diagnosed)</div>
              <div class="section-box">${payload.root_cause}</div>
            </div>

            <div class="section">
              <div class="section-title">Suggested Action / Remediation</div>
              <div class="section-box" style="border-left: 3px solid #10b981;">${payload.fix}</div>
            </div>
          </div>

          <div class="footer">
            Automated alert sent by <strong>PulseOps AI</strong> &middot; Stop reading raw logs by hand.
          </div>
        </div>
      </body>
    </html>
  `;

  // 1. If Resend API key is configured
  if (resendApiKey && resendApiKey.trim() !== "") {
    const resend = new Resend(resendApiKey);
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "alerts@pulseops.dev",
      to: recipient || "operator@company.com",
      subject: `[PulseOps AI] ${payload.severity.toUpperCase()} Incident Alert: ${payload.project} (${payload.incidentId})`,
      html: htmlContent,
    });
    return { ok: true, provider: "resend", details: data };
  }

  // 2. If SMTP is configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"PulseOps Alerts" <${smtpUser}>`,
      to: recipient || smtpUser,
      subject: `[PulseOps AI] ${payload.severity.toUpperCase()} Incident: ${payload.project} (${payload.incidentId})`,
      html: htmlContent,
    });

    return { ok: true, provider: "smtp", messageId: info.messageId };
  }

  // 3. Fallback / Dev mode: Log to console and return simulated delivery
  console.log(`[PulseOps Email Alert Simulated] To: ${recipient || "default"} | Subject: ${payload.project} - ${payload.incidentId}`);
  return {
    ok: true,
    provider: "simulated",
    message: "Email queued (Add RESEND_API_KEY or SMTP credentials to .env.local to send live emails).",
  };
}

# ⚡ PulseOps AI — Autonomous Incident Intelligence & SRE Copilot

> **Stop sifting through terminal logs manually.** Let PulseOps AI monitor system health, detect critical incidents in real time, pinpoint root causes with Google Gemini, and dispatch automated alerts across Slack and Email.

---

## 🌟 Key Features

- **🚨 Live Incident Monitoring & Telemetry**: Real-time pipeline health tracking with latency percentiles, error rates, MTTR metrics, and active service status.
- **🧠 Google Gemini Root-Cause Diagnostics**: Powered by Google's Gemini models to analyze logs, isolate failures, evaluate blast radius, and generate suggested fixes.
- **🔍 Interactive Log Inspector & AI Drawer**: In-dashboard drawer to inspect raw container logs, chat with the AI troubleshooter, and execute recommended remediation patches.
- **🔔 Multi-Channel Alert Dispatch**: Automated notifications via **Slack Webhooks** and **Email (Resend & SMTP)** when incidents escalate or resolve.
- **🎨 Dark Cyber-Ops Theme**: Modern glassmorphic terminal styling built with Tailwind CSS, custom design tokens, and optimized contrast.
- **🛡️ Custom Resiliency**: Dedicated Next.js error boundaries (`error.tsx`) and 404 handler (`not-found.tsx`) preserving application state.

---

## 🏗️ Architecture & Tech Stack

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons
- **AI Engine**: Google Gemini API via `@google/genai`
- **Notifications**: Resend API, Nodemailer (SMTP), Slack Incoming Webhooks

```
PulseOps AI
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── diagnose/       # Gemini AI incident diagnostic endpoint
│   │   │   ├── troubleshoot/   # Interactive AI log troubleshooting agent
│   │   │   ├── incidents/      # Real-time incident retrieval and state
│   │   │   └── notify/         # Multi-channel notification pipeline (Slack & Email)
│   │   ├── signup/             # User registration and workspace onboarding
│   │   ├── error.tsx           # Global runtime error boundary
│   │   ├── not-found.tsx       # Custom 404 page
│   │   └── page.tsx            # Main operational dashboard entrypoint
│   ├── components/
│   │   ├── Dashboard.tsx       # SRE Command Center & metrics overview
│   │   ├── LogInspectorDrawer.tsx # Drawer for terminal logs & AI chat
│   │   ├── GeminiDiagnoseModal.tsx # Full AI incident breakdown modal
│   │   ├── Navbar.tsx          # Navigation header with system health indicators
│   │   └── Footer.tsx          # System status footer
│   └── lib/
│       └── mailer.ts           # Email dispatch engine (Resend & SMTP)
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **Google Gemini API Key**: [Get your key at Google AI Studio](https://aistudio.google.com/app/apikey)

### 2. Installation & Setup

Clone the repository and install dependencies:
```bash
git clone https://github.com/Shreyansh-Sri/PulseOps-AI.git
cd "PulseOps AI"
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Gemini API (Required for AI Diagnostics)
GEMINI_API_KEY=your_gemini_api_key_here

# Slack Notifications (Optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Email Notifications - Option 1: Resend (Optional)
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=alerts@pulseops.dev
ALERT_EMAIL_RECIPIENT=your-team@pulseops.dev

# Email Notifications - Option 2: Standard SMTP (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_TO=your-team@pulseops.dev
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

Run the TypeScript typechecker:
```bash
npx tsc --noEmit
```

Build for production:
```bash
npm run build
```

---

## 📄 License

This project is licensed under the MIT License.

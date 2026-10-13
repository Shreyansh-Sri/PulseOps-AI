// GET /api/incidents
// Returns the current incident feed (pipeline events).
// In production this would proxy a real GitLab/GitHub webhook store or DB.
// The `since` query param (ISO timestamp) allows the dashboard to poll for NEW incidents only.

export const dynamic = "force-dynamic"; // never cache — always fresh

type Severity = "critical" | "high" | "medium" | "low";
type Status = "open" | "investigating" | "resolved";

interface PipelineIncident {
  id: string;
  time: string;
  timestamp: string; // ISO — used for polling comparison
  project: string;
  stage: string;
  severity: Severity;
  status: Status;
  root_cause: string;
  fix: string;
  log: string;
}

// Static seed — replace with a real DB/cache query in production
const incidents: PipelineIncident[] = [
  {
    id: "INC-041",
    time: "12 min ago",
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    project: "lexcortex-backend",
    stage: "Docker build",
    severity: "critical",
    status: "open",
    root_cause:
      "Missing environment variable DATABASE_URL in the Docker build stage. The container cannot resolve the connection string at build time.",
    fix: "Add DATABASE_URL to CI/CD → Settings → Variables. Mark as masked. Re-trigger the pipeline.",
    log: `Step 4/9 : RUN npm run build\nERROR: Environment variable DATABASE_URL is not set.\n> next build failed\nError: Process completed with exit code 1.`,
  },
  {
    id: "INC-037",
    time: "Yesterday",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    project: "lexcortex-api",
    stage: "Test suite",
    severity: "low",
    status: "resolved",
    root_cause:
      "Jest ran sequentially on a 4-core runner with no node_modules cache. Test time inflated 4.2× baseline.",
    fix: "Enable --runInBand=false. Add node_modules to GitLab CI cache stanza. Cuts test time ~68%.",
    log: `Job duration: 18m 42s  (baseline: 4m 20s)\nCache hit: MISS\nTests: 847 passed\nSlowest: auth.test.ts  3m 12s`,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const since = searchParams.get("since");

  let result = incidents;

  if (since) {
    const sinceDate = new Date(since);
    result = incidents.filter((inc) => new Date(inc.timestamp) > sinceDate);
  }

  return Response.json({ incidents: result, fetchedAt: new Date().toISOString() });
}

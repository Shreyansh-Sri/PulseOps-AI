import { GoogleGenAI } from "@google/genai";

export const dynamic = "force-dynamic";

interface DiagnoseRequest {
  log: string;
  context?: string;
  project?: string;
  stage?: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  let body: DiagnoseRequest;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { log, context = "CI/CD Pipeline Failure", project = "Unknown Service", stage = "Build" } = body;

  if (!log || typeof log !== "string" || log.trim().length === 0) {
    return Response.json({ error: "Log content is required for diagnosis." }, { status: 400 });
  }

  // If GEMINI_API_KEY is not yet provided, return a fallback with helpful instructions
  if (!apiKey || apiKey.trim() === "") {
    return Response.json({
      configured: false,
      root_cause: "Gemini API key is not configured in .env.local (GEMINI_API_KEY).",
      fix: "Add your free Gemini API key to .env.local to enable real-time LLM telemetry root cause diagnosis.",
      severity: "medium",
      analysis_time_ms: 10,
      model: "offline-fallback",
    });
  }

  try {
    const startTime = Date.now();
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are PulseOps AI, an expert Principal SRE and DevOps telemetry diagnostic copilot.
Analyze the following error log and context, then return a deterministic JSON object with exact technical root cause and remediation.

Context: ${context}
Project: ${project}
Stage/Component: ${stage}

Raw Log:
\`\`\`
${log.slice(0, 15000)}
\`\`\`

You MUST respond strictly with valid JSON conforming to this schema (do NOT wrap in markdown backticks or explanation):
{
  "root_cause": "A concise, technical 1-2 sentence explanation of why the build/pod failed.",
  "fix": "Actionable, step-by-step remediation commands or instructions to resolve this failure.",
  "severity": "critical" | "high" | "medium" | "low",
  "affected_component": "Name of the failing container, tool, or library",
  "preventative_tip": "How to prevent this incident from recurring in CI/CD or production"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const elapsed = Date.now() - startTime;
    const responseText = response.text || "{}";
    
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      parsedData = {
        root_cause: responseText,
        fix: "Review log output and verify environment configurations.",
        severity: "medium",
      };
    }

    return Response.json({
      configured: true,
      root_cause: parsedData.root_cause || "No root cause identified.",
      fix: parsedData.fix || "Check configuration and retry.",
      severity: parsedData.severity || "high",
      affected_component: parsedData.affected_component || stage,
      preventative_tip: parsedData.preventative_tip,
      analysis_time_ms: elapsed,
      model: "gemini-2.5-flash",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Gemini diagnosis error:", err);
    return Response.json(
      {
        error: "Gemini diagnosis failed.",
        details: err.message,
      },
      { status: 500 }
    );
  }
}

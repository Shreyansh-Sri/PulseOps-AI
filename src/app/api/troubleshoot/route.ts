import { GoogleGenAI } from "@google/genai";

export const dynamic = "force-dynamic";

interface Message {
  role: "user" | "model";
  content: string;
}

interface ChatRequest {
  incident: {
    id: string;
    project: string;
    stage: string;
    severity: string;
    status: string;
    root_cause: string;
    fix: string;
    log: string;
  };
  messages: Message[];
  query: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  let body: ChatRequest;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { incident, messages = [], query } = body;

  if (!query || typeof query !== "string") {
    return Response.json({ error: "Query is required." }, { status: 400 });
  }

  // Fallback response if Gemini API key isn't set yet
  if (!apiKey || apiKey.trim() === "") {
    let mockReply = "";
    const lower = query.toLowerCase();

    if (lower.includes("local") || lower.includes("test") || lower.includes("reproduce")) {
      mockReply = `To test or reproduce this fix locally:
1. Export the missing variable:
\`\`\`bash
export DATABASE_URL="postgresql://postgres:password@localhost:5432/test_db"
\`\`\`
2. Run the build command inside Docker:
\`\`\`bash
docker build --build-arg DATABASE_URL=$DATABASE_URL -t ${incident.project}:test .
\`\`\`
3. Verify exit code is 0.`;
    } else if (lower.includes("why") || lower.includes("cause") || lower.includes("reason")) {
      mockReply = `Root cause breakdown for ${incident.id}:
• ${incident.root_cause}
• The container failed at stage: **${incident.stage}**.
• Immediate recommended action: **${incident.fix}**.`;
    } else if (lower.includes("rollback") || lower.includes("safe")) {
      mockReply = `To safely roll back or bypass:
\`\`\`bash
kubectl rollout undo deployment/${incident.project}
# Or cherry-pick previous green CI commit
git revert HEAD && git push
\`\`\``;
    } else {
      mockReply = `PulseOps Assistant:
For incident **${incident.id}** (${incident.project}):
Recommended fix:
${incident.fix}

*(Note: Add GEMINI_API_KEY in .env.local for full multi-turn live AI reasoning).*`;
    }

    return Response.json({ reply: mockReply, model: "simulated-sre" });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are PulseOps AI, a senior SRE and DevOps telemetry copilot embedded in the incident investigation terminal.
Incident Context:
- Incident ID: ${incident.id}
- Project: ${incident.project}
- Stage: ${incident.stage}
- Severity: ${incident.severity}
- Known Root Cause: ${incident.root_cause}
- Proposed Fix: ${incident.fix}

Raw Terminal Log:
\`\`\`
${incident.log.slice(0, 8000)}
\`\`\`

Instructions:
- Provide clear, pragmatic, production-grade terminal commands, configuration snippets, and explanations.
- Be concise and direct. Format code commands with appropriate markdown backticks.`;

    // Construct conversation history
    const conversation = messages.map(m => `${m.role === "user" ? "User" : "SRE Copilot"}: ${m.content}`).join("\n\n");
    const fullPrompt = `${systemPrompt}\n\nConversation History:\n${conversation}\n\nUser: ${query}\nSRE Copilot:`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    });

    return Response.json({
      reply: response.text || "Unable to generate troubleshooting recommendation.",
      model: "gemini-2.5-flash",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Gemini chat error:", err);
    return Response.json({ error: "Failed to generate troubleshooting response", details: err.message }, { status: 500 });
  }
}

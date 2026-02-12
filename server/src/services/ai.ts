import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface ComplianceAnalysis {
  summary: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  findings: Array<{
    issue: string;
    severity: string;
    recommendation: string;
  }>;
  overallCompliant: boolean;
}

export async function analyzeCompliance(
  documentText: string,
  rules: string[]
): Promise<ComplianceAnalysis> {
  const rulesContext = rules.length
    ? `\n\nApplicable compliance rules:\n${rules.map((r, i) => `${i + 1}. ${r}`).join("\n")}`
    : "";

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `You are a regulatory compliance analyst. Analyze the following document for compliance issues and provide your assessment in JSON format.

Document:
${documentText}
${rulesContext}

Respond with a JSON object containing:
- "summary": A brief summary of the compliance analysis
- "riskLevel": One of "LOW", "MEDIUM", "HIGH", or "CRITICAL"
- "findings": An array of objects with "issue", "severity", and "recommendation" fields
- "overallCompliant": boolean indicating overall compliance status

Return only valid JSON, no additional text.`,
      },
    ],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  try {
    return JSON.parse(responseText) as ComplianceAnalysis;
  } catch {
    return {
      summary: responseText,
      riskLevel: "MEDIUM",
      findings: [],
      overallCompliant: false,
    };
  }
}

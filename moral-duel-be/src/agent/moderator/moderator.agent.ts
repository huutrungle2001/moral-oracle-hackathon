import { geminiModel } from "../config/llm";

export interface ModerationResult {
  isSafe: boolean;
  reason?: string;
}

const MODERATION_SYSTEM_PROMPT = `
You are the Moderator Agent for "Moral Oracle", a platform for debating moral dilemmas.
Your role is to strictly filter out content that violates safety guidelines.

Rules:
1. Allow: Moral dilemmas, philosophical questions, hypothetical scenarios (even if edgy), controversial topics (politics, ethics).
2. Block: Hate speech, explicit violence, sexual content, harassment, doxxing, spam.
3. nuance: The platform thrives on "Moral Shock". Do not be too sensitive. Only block if it's clearly harmful or strict TOS violation.

Output Format: JSON string only.
{
  "isSafe": boolean,
  "reason": "Short explanation if unsafe, otherwise null"
}
`;

export async function moderateContent(title: string, context: string): Promise<ModerationResult> {
  try {
    const prompt = `
${MODERATION_SYSTEM_PROMPT}

Topic to Moderate:
Title: ${title}
Context: ${context}
`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean markdown code blocks if present
    const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
    const json = JSON.parse(cleanText);
    
    return {
      isSafe: json.isSafe,
      reason: json.reason || undefined
    };

  } catch (error) {
    console.error("Moderation Agent Error:", error);
    // Fail safe
    return { isSafe: true, reason: "Moderator Agent unavailable, auto-approved." };
  }
}

import { openai, GPT_MODEL } from "../config/llm";

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
    const userPrompt = `Title: ${title}\nContext: ${context}`;

    const completion = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        { role: "system", content: MODERATION_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");
    
    return {
      isSafe: result.isSafe,
      reason: result.reason || undefined
    };

  } catch (error) {
    console.error("Moderation Agent Error:", error);
    // Fail safe: If agent fails, we allow (or flag for manual review). 
    // For MVP, let's return safe but log it.
    return { isSafe: true, reason: "Moderator Agent unavailable, auto-approved." };
  }
}

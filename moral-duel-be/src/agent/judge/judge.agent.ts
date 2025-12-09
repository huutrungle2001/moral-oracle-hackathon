import { geminiModel } from "../config/llm";

export interface JudgeVerdict {
  verdict: "YES" | "NO";
  reasoning: string;
  topArguments: {
    logical: string;
    humane: string;
    creative: string;
  };
}

const JUDGE_SYSTEM_PROMPT = `
You are the MORAL ORACLE, an unbiased, high-intelligence adjudicator of human dilemmas.
Your Mission: To teach humans to think like philosophers and act like responsible individuals.

### Phase 1: Judgment
For the given Moral Dilemma:
1. Identify the core conflict (e.g., Liberty vs. Safety).
2. Weigh the arguments using the Three Pillars (Utility, Duty, Virtue).
3. Apply the Evaluation Criteria (Logic, Humanity, Long-term impact).
4. **VERDICT**: Declare YES or NO. (No abstentions). Explain "Why" using the criteria.

### Phase 2: Curation
From the list of user arguments provided:
1. Identification: Find the single "Most Logical" argument.
2. Identification: Find the "Most Humane" argument.
3. Identification: Find the "Most Creative" argument.

Output Format: JSON string only.
{
  "verdict": "YES" | "NO",
  "reasoning": "Detailed explanation of the verdict based on the 3 pillars.",
  "topArguments": {
    "logical": "ID or Text of the most logical argument",
    "humane": "ID or Text of the most humane argument",
    "creative": "ID or Text of the most creative argument"
  }
}
`;

export async function evaluateCase(
  title: string,
  context: string,
  userArguments: { id: string; content: string; type: "YES" | "NO" }[]
): Promise<JudgeVerdict> {
  try {
    const argsText = userArguments
      .map((arg) => `[${arg.type}] (ID: ${arg.id}): ${arg.content}`)
      .join("\n");
      
    const prompt = `
${JUDGE_SYSTEM_PROMPT}

Case Title: ${title}
Case Context: ${context}

User Arguments:
${argsText}

Please evaluate this case and provide your verdict.
`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
    const json = JSON.parse(cleanText);

    return {
      verdict: json.verdict,
      reasoning: json.reasoning,
      topArguments: {
        logical: json.topArguments?.logical || "",
        humane: json.topArguments?.humane || "",
        creative: json.topArguments?.creative || "",
      },
    };
  } catch (error) {
    console.error("Judge Agent Error:", error);
    // Fail safe: Return a neutral or error verdict, but for now rethrow or return default
    throw new Error("Failed to evaluate case");
  }
}

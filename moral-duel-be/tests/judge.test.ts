import { evaluateCase } from "../src/agent/judge/judge.agent";

// Mock Gemini
const mockGenerateContent = jest.fn();

jest.mock("../src/agent/config/llm", () => ({
  geminiModel: {
    generateContent: (...args: any[]) => mockGenerateContent(...args),
  },
  GPT_MODEL: "gemini-mock",
}));

describe("Judge Agent", () => {
  beforeEach(() => {
    mockGenerateContent.mockClear();
  });

  it("should evaluate a case and return a verdict", async () => {
    // Mock response
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => JSON.stringify({
          verdict: "YES",
          reasoning: "The utility of saving 5 lives outweighs 1.",
          topArguments: {
            logical: "arg1",
            humane: "arg2",
            creative: "arg3",
          },
        })
      }
    });

    const result = await evaluateCase("Trolley Problem", "Context...", [
      { id: "arg1", content: "Logic", type: "YES" },
      { id: "arg2", content: "Humanity", type: "NO" },
      { id: "arg3", content: "Creative", type: "YES" },
    ]);

    expect(result.verdict).toBe("YES");
    expect(result.topArguments.logical).toBe("arg1");
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
    
    // Check prompt structure
    const promptArg = mockGenerateContent.mock.calls[0][0];
    expect(promptArg).toContain("MORAL ORACLE");
    expect(promptArg).toContain("Trolley Problem");
  });

  it("should handle invalid JSON from LLM gracefully or fail", async () => {
     mockGenerateContent.mockResolvedValue({
       response: {
         text: () => "Not JSON"
       }
    });

    await expect(evaluateCase("Title", "Context", [])).rejects.toThrow();
  });
});

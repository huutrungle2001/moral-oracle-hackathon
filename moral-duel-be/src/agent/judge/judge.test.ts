import { evaluateCase } from "./judge.agent";

// Mock OpenAI
const mockCreate = jest.fn();

jest.mock("../config/llm", () => ({
  openai: {
    chat: {
      completions: {
        create: (...args: any[]) => mockCreate(...args),
      },
    },
  },
  GPT_MODEL: "gpt-mock",
}));

describe("Judge Agent", () => {
  beforeEach(() => {
    mockCreate.mockClear();
  });

  it("should evaluate a case and return a verdict", async () => {
    // Mock response
    mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify({
              verdict: "YES",
              reasoning: "The utility of saving 5 lives outweighs 1.",
              topArguments: {
                logical: "arg1",
                humane: "arg2",
                creative: "arg3",
              },
            }),
          },
        },
      ],
    });

    const result = await evaluateCase("Trolley Problem", "Context...", [
      { id: "arg1", content: "Logic", type: "YES" },
      { id: "arg2", content: "Humanity", type: "NO" },
      { id: "arg3", content: "Creative", type: "YES" },
    ]);

    expect(result.verdict).toBe("YES");
    expect(result.topArguments.logical).toBe("arg1");
    expect(mockCreate).toHaveBeenCalledTimes(1);
    
    // Check prompt structure
    const callArgs = mockCreate.mock.calls[0][0];
    expect(callArgs.messages[0].role).toBe("system");
    expect(callArgs.messages[0].content).toContain("MORAL ORACLE");
    expect(callArgs.messages[1].content).toContain("Trolley Problem");
  });

  it("should handle invalid JSON from LLM gracefully or fail", async () => {
     mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: "Not JSON",
          },
        },
      ],
    });

    await expect(evaluateCase("Title", "Context", [])).rejects.toThrow();
  });
});

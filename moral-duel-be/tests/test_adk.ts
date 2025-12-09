import { AgentBuilder } from "@iqai/adk";
import * as dotenv from "dotenv";

dotenv.config();

// ADK requires GOOGLE_API_KEY, but project uses GEMINI_API_KEY
if (process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
  process.env.GOOGLE_API_KEY = process.env.GEMINI_API_KEY;
}

export async function agent() {
  return await AgentBuilder.create("assistant")
    .withModel("gemini-pro-latest") // requested by user
    .withInstruction("You are a helpful assistant.")
    .build();
}

async function main() {
  const { runner } = await agent();
  const response = await runner.ask("What is the capital of France?");
  console.log("🤖 Response:", response);
}

main().catch(console.error);
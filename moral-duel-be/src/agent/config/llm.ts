import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn("OPENAI_API_KEY is not set. Agents will fail if called.");
}

export const openai = new OpenAI({
  apiKey: apiKey || "dummy-key", // Prevent crash on init, fail on call
});

export const GPT_MODEL = process.env.GPT_MODEL || "gpt-4-turbo-preview";

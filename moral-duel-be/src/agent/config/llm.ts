import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

// ADK Compatibility: ADK requires GOOGLE_API_KEY
if (process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
  process.env.GOOGLE_API_KEY = process.env.GEMINI_API_KEY;
}

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. Agents will fail if called.");
}

const genAI = new GoogleGenerativeAI(apiKey || "dummy-key");

// Use the latest Gemini model
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro-latest" });
export const GPT_MODEL = "gemini-pro-latest"; // Keep alias for compatibility or remove


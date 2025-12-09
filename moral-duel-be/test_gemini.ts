import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

// Load env from current directory
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is not set!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
// Using the model that we think works
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function testConnection() {
  try {
    console.log("Testing connection with model: gemini-flash-latest");
    const prompt = "Hello! Are you working? Reply with 'Yes, I am online.'";
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ API Response:", text);
  } catch (error) {
    console.error("❌ Error connecting to Gemini:", error);
  }
}

testConnection();

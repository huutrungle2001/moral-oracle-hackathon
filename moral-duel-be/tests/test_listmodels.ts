import * as dotenv from "dotenv";
import path from "path";

// Load env from root directory (assuming script is in tests/)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("❌ No GEMINI_API_KEY or GOOGLE_API_KEY found in .env");
  process.exit(1);
}

async function listModels() {
  console.log("🔍 Fetching available models...");
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const res = await fetch(url);
    
    if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    
    if (json.models) {
        console.log(`✅ Found ${json.models.length} models:`);
        json.models.forEach((model: any) => {
            console.log(`- ${model.name} (${model.displayName})`);
        });
    } else {
        console.log("⚠️ No models found in response:", json);
    }

  } catch (error) {
    console.error("❌ Error fetching models:", error);
  }
}

listModels();

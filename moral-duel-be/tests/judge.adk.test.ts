import { evaluateCase } from "../src/agent/judge/judge.agent";
import * as dotenv from "dotenv";
import path from "path";

// Load env from root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function testJudge() {
  console.log("⚖️  Testing Judge Agent (ADK Integration)...");

  const title = "The Trolley Problem";
  const context = "A runaway trolley is heading down the tracks. On the main track, there are 5 people tied up. On the side track, there is 1 person. You can pull a lever to switch tracks.";
  
  const args = [
    { id: "1", content: "Pulling the lever minimizes loss of life (Utilitarianism). Saving 5 is better than saving 1.", type: "YES" as const },
    { id: "2", content: "Active killing is wrong. By pulling the lever, I become responsible for the death of the one person (Deontology).", type: "NO" as const }
  ];

  try {
    const verdict = await evaluateCase(title, context, args);
    console.log("✅ Verdict Received:");
    console.log(JSON.stringify(verdict, null, 2));

    if (verdict.verdict && verdict.reasoning && verdict.topArguments) {
        console.log("✅ Structure Valid");
    } else {
        console.error("❌ Invalid Response Structure");
        process.exit(1);
    }

  } catch (error) {
    console.error("❌ Judge Agent Failed:", error);
    process.exit(1);
  }
}

testJudge();

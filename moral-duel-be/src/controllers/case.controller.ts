import { Request, Response } from "express";
import { mockDb } from "../utils/mockDb";
import { z } from "zod";
import { moderateContent } from "../agent/moderator/moderator.agent";
import { evaluateCase } from "../agent/judge";
import { atpService } from "../services/atp.service";

// Validation Schemas
const CreateCaseSchema = z.object({
  title: z.string().min(10).max(100),
  context: z.string().min(50).max(2000),
  creator_wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

export class CaseController {

  // POST /case/judge-mock
  static async judgeMock(req: Request, res: Response) {
    const { title, context, arguments: args } = req.body;

    try {
      // Normalize arguments for the judge agent
      const agentArgs = args.map((arg: any) => ({
        id: arg.id || "0",
        content: arg.content,
        type: arg.side as "YES" | "NO"
      }));

      const verdict = await evaluateCase(title, context, agentArgs);

      res.json({
        verdict
      });
    } catch (error) {
      console.error("Mock Judge Error:", error);
      res.status(500).json({ error: "Failed to generate verdict" });
    }
  }

  // POST /cases/:id/verdict (Manual Trigger)
  static async triggerVerdict(req: Request, res: Response) {
    const { id } = req.params;

    const caseItem = mockDb.findCaseById(Number(id));

    if (!caseItem) {
      res.status(404).json({ error: "Case not found" });
      return;
    }

    if (caseItem.status !== "active") {
      res.status(400).json({ error: "Case is not active" });
      return;
    }

    // Call Judge Agent
    // Map arguments to the expected format
    const agentArgs = caseItem.arguments.map((arg: any) => ({
      id: String(arg.id),
      content: arg.content,
      type: arg.side as "YES" | "NO"
    }));

    try {
      const verdict = await evaluateCase(caseItem.title, caseItem.context, agentArgs);

      // Update Case in DB (Mock)
      caseItem.status = "closed";
      caseItem.ai_verdict = verdict.verdict;
      caseItem.ai_verdict = verdict.verdict;
      caseItem.ai_verdict_reasoning = verdict.reasoning;

      // Trigger ATP Settlement
      // For hacked demo: Settle 100 tokens to the case creator as a reward for resolving the dispute
      const settlementTx = await atpService.settleCase(
        String(id),
        caseItem.creator_wallet,
        BigInt(100)
      );

      console.log(`Settlement Result: ${settlementTx || "Failed"}`);

      res.json({
        message: "Verdict reached",
        verdict,
        case: caseItem
      });

    } catch (error) {
      console.error("Verdict Trigger Error:", error);
      res.status(500).json({ error: "Failed to generate verdict" });
    }
  }

  // POST /cases/create
  static async create(req: Request, res: Response) {
    const { title, context, creator_wallet } = CreateCaseSchema.parse(req.body);

    // Find User
    const user = mockDb.findUserByWallet(creator_wallet);
    if (!user) {
      // Auto-create for demo flow ease if not exists? Or strict? 
      // Let's be strict to follow auth flow, or simpler: just create if missing for hackathon speed?
      // Strict is safer for consistency.
       res.status(404).json({ error: "User not found. Please connect wallet first." });
       return;
    }

    // Create Case (Pending Moderation initially)
    // For MVP, we auto-approve to 'active' or set to 'pending_moderation' if agent is ready.
    // Let's set 'active' for immediate feedback loop in manual testing, or 'pending' if we really simulate the agent.
    // Plan says "Trigger Moderator Agent". So 'pending_moderation' is correct.
    // Create case with initial status
    let caseStatus = "pending_moderation";

    // For MPV: Await moderation directly (Simpler than async queue)
    const moderation = await moderateContent(title, context);
    console.log("DEBUG: Moderation Result:", JSON.stringify(moderation));

    if (!moderation.isSafe) {
      res.status(400).json({
        error: "Moral Oracle rejected this case due to safety guidelines.",
        reason: moderation.reason
      });
      return;
    }

    caseStatus = "active";

    const newCase = mockDb.createCase({
        title,
        context,
        status: caseStatus,
      creator_wallet: user.wallet_address,
      ai_verdict: undefined,
      ai_verdict_reasoning: undefined
    });

    res.status(201).json(newCase);
  }

  // GET /cases (Discovery)
  // Query: ?sort=trending|newest
  static async list(req: Request, res: Response) {
    const { sort = "trending" } = req.query;

    // Filter active
    let cases = mockDb.cases.filter(c => c.status === "active" || c.status === "closed");

    // Sort
    if (sort === "newest") {
      cases.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
    } else {
      // Trending: total_participants
      cases.sort((a, b) => b.total_participants - a.total_participants);
    }

    // Take 20
    cases = cases.slice(0, 20);

    // Enrich with creator name (mock join)
    const enrichedCases = cases.map(c => {
      const creator = mockDb.findUserByWallet(c.creator_wallet);
      return {
        ...c,
        _count: { arguments: c.arguments.length },
        creator: { name: creator?.name || "Unknown", wallet_address: c.creator_wallet }
      };
    });

    res.json(enrichedCases);
  }

  // GET /cases/:id
  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    
    const caseItem = mockDb.findCaseById(Number(id));

    if (!caseItem) {
      res.status(404).json({ error: "Case not found" });
      return;
    }

    // Sort arguments by votes
    const sortedArgs = [...caseItem.arguments].sort((a, b) => b.votes - a.votes);

    // Enrich
    const creator = mockDb.findUserByWallet(caseItem.creator_wallet);
    const enrichedCase = {
      ...caseItem,
      creator: { name: creator?.name || "Unknown", wallet_address: caseItem.creator_wallet },
      arguments: sortedArgs.map(arg => {
        const author = mockDb.findUserByWallet(arg.user_wallet);
        return {
          ...arg,
          user: { name: author?.name || "Unknown" }
        }
      })
    };

    res.json(enrichedCase);
  }
}

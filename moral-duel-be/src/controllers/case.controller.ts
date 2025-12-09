import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { z } from "zod";
import { moderateContent } from "../agent/moderator/moderator.agent";
import { evaluateCase } from "../agent/judge";

// Validation Schemas
const CreateCaseSchema = z.object({
  title: z.string().min(10).max(100),
  context: z.string().min(50).max(2000),
  creator_wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

export class CaseController {

  // POST /cases/:id/verdict (Manual Trigger)
  static async triggerVerdict(req: Request, res: Response) {
    const { id } = req.params;

    const caseItem = await prisma.case.findUnique({
      where: { id: Number(id) },
      include: {
        arguments: true
      }
    });

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

      // Update Case in DB
      const updatedCase = await prisma.case.update({
        where: { id: Number(id) },
        data: {
          status: "closed",
          ai_verdict: verdict.verdict,
          ai_verdict_reasoning: verdict.reasoning,
          closed_at: new Date(),
          // For MVP, we aren't storing top arguments in a separate structure easily yet
          // unless we add a specific field, but implementation plan didn't specify schema change.
          // We can append top args to reasoning or just ignore for now in DB storage 
          // (or store in a legacy field if available, but schema doesn't show one).
          // Let's append to reasoning for now to make it visible.
          // actually schema has `ai_verdict_reasoning`.
        }
      });

      // We might want to mark the top arguments in the arguments table too?
      // The schema has `is_top_3` boolean in Argument model.
      // And strict mapping might be hard if IDs are not perfectly passed back or hallucinated.
      // But let's try if ID is valid.

      // Helper to update top arg
      const updateTopArg = async (argId: string) => {
        if (!argId) return;
        // Verify it's a number
        const idNum = Number(argId);
        if (isNaN(idNum)) return;

        try {
          await prisma.argument.update({
            where: { id: idNum },
            data: { is_top_3: true }
          });
        } catch (e) {
          console.warn(`Failed to mark argument ${argId} as top 3`, e);
        }
      };

      await Promise.all([
        updateTopArg(verdict.topArguments.logical),
        updateTopArg(verdict.topArguments.humane),
        updateTopArg(verdict.topArguments.creative)
      ]);

      res.json({
        message: "Verdict reached",
        verdict,
        case: updatedCase
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
    const user = await prisma.user.findUnique({ where: { wallet_address: creator_wallet } });
    if (!user) {
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

    const newCase = await prisma.case.create({
      data: {
        title,
        context,
        status: caseStatus,
        created_by_id: user.id,
        reward_pool: 0, 
      },
    });

    res.status(201).json(newCase);
  }

  // GET /cases (Discovery)
  // Query: ?sort=trending|newest
  static async list(req: Request, res: Response) {
    const { sort = "trending" } = req.query;

    let orderBy = {};
    if (sort === "newest") {
      orderBy = { created_at: "desc" };
    } else {
      // Trending = most votes/participants. Simple proxy: total_participants.
      orderBy = { total_participants: "desc" };
    }

    const cases = await prisma.case.findMany({
      where: { status: "active" }, // Only show active cases
      orderBy,
      take: 20,
      include: {
        _count: { select: { arguments: true } },
        creator: { select: { name: true, wallet_address: true } }
      }
    });

    res.json(cases);
  }

  // GET /cases/:id
  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    
    const caseItem = await prisma.case.findUnique({
      where: { id: Number(id) },
      include: {
        creator: { select: { name: true, wallet_address: true } },
        arguments: {
           include: { user: { select: { name: true } } },
           orderBy: { votes: 'desc' },
           take: 10
        }
      }
    });

    if (!caseItem) {
      res.status(404).json({ error: "Case not found" });
      return;
    }

    res.json(caseItem);
  }
}

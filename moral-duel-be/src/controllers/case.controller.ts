import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { z } from "zod";

// Validation Schemas
const CreateCaseSchema = z.object({
  title: z.string().min(10).max(100),
  context: z.string().min(50).max(2000),
  creator_wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

export class CaseController {

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
    const newCase = await prisma.case.create({
      data: {
        title,
        context,
        status: "pending_moderation",
        created_by_id: user.id,
        reward_pool: 0, // Initial pool
      },
    });

    // TODO: Trigger ADK Moderator Agent here (EventEmitter or Queue)

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

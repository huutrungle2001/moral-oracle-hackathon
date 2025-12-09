import { Request, Response } from "express";
import { mockDb } from "../utils/mockDb";
import { z } from "zod";

const VoteSchema = z.object({
  case_id: z.number(),
  user_wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  side: z.enum(["YES", "NO"]),
  amount: z.number().min(0).optional(), // Staking amount (mock for now)
});

const ArgumentSchema = z.object({
  case_id: z.number(),
  user_wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  content: z.string().min(20).max(500),
  side: z.enum(["YES", "NO"]), // Argument must align with vote? not necessarily but usually.
});

export class VoteController {

  // POST /vote/cast
  static async castVote(req: Request, res: Response) {
    const { case_id, user_wallet, side, amount } = VoteSchema.parse(req.body);

    const user = mockDb.findUserByWallet(user_wallet);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    // Check if already voted (We need a user_votes store? MockDb doesn't have it explicitly yet)
    // Hackathon speed: Just let them vote or implement a simple set?
    // Let's skip duplicate check for simplicity or add to mockDB later if critical.
    // Assume 1 vote per user per case.

    const caseItem = mockDb.findCaseById(case_id);
    if (!caseItem) {
      res.status(404).json({ error: "Case not found" });
      return;
    }

    // Update Case Counters
    if (side === "YES") {
      caseItem.yes_votes++;
    } else {
      caseItem.no_votes++;
    }
    caseItem.total_participants++;

    if (amount && amount > 0) {
      caseItem.reward_pool += amount;
    }

    res.status(200).json({ message: "Vote cast successfully", side });
  }

  // POST /vote/argument
  static async submitArgument(req: Request, res: Response) {
    const { case_id, user_wallet, content, side } = ArgumentSchema.parse(req.body);

    const user = mockDb.findUserByWallet(user_wallet);
    if (!user) { 
      res.status(404).json({ error: "User not found" });
        return;
    }

    const argument = mockDb.addArgument(case_id, {
        case_id,
      user_wallet: user.wallet_address, // store wallet in arg for join
        content,
      side,
    });
    
    if (!argument) {
      res.status(404).json({ error: "Case not found" });
      return;
    }

    // Mark user as having submitted argument? (Skip for mock)

    res.status(201).json(argument);
  }
}

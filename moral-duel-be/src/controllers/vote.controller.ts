import { Request, Response } from "express";
import prisma from "../utils/prisma";
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

    const user = await prisma.user.findUnique({ where: { wallet_address: user_wallet } });
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    // Check if already voted
    const existingVote = await prisma.userVote.findUnique({
      where: { user_id_case_id: { user_id: user.id, case_id } }
    });

    if (existingVote) {
       res.status(400).json({ error: "User has already voted on this case" });
       return;
    }

    // Transaction: Record Vote + Update Case stats
    await prisma.$transaction(async (tx) => {
      // 1. Create Vote
      await tx.userVote.create({
        data: {
          user_id: user.id,
          case_id,
          side,
        }
      });

      // 2. Update Case Counters
      const updateData = side === "YES" 
        ? { yes_votes: { increment: 1 }, total_participants: { increment: 1 } }
        : { no_votes: { increment: 1 }, total_participants: { increment: 1 } };
      
      if (amount && amount > 0) {
        // @ts-ignore
        updateData.reward_pool = { increment: amount };
      }

      await tx.case.update({
        where: { id: case_id },
        data: updateData
      });
    });

    res.status(200).json({ message: "Vote cast successfully", side });
  }

  // POST /vote/argument
  static async submitArgument(req: Request, res: Response) {
    const { case_id, user_wallet, content, side } = ArgumentSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { wallet_address: user_wallet } });
    if (!user) { 
        res. status(404).json({ error: "User not found" });
        return;
    }

    const argument = await prisma.argument.create({
      data: {
        case_id,
        user_id: user.id,
        content,
        side,
      }
    });
    
    // Mark user as having submitted argument
    // Use upsert or updateMany to handle if they haven't voted yet? 
    // Usually they vote first. Let's assume they might not have voted yet? 
    // Plan: "Vote -> Stake -> Judge". Usually voting is the entry.
    // Let's just create the argument.
    
    // Update UserVote if exists to reflected "has_submitted_arg"
    await prisma.userVote.updateMany({
        where: { user_id: user.id, case_id },
        data: { has_submitted_arg: true }
    });

    res.status(201).json(argument);
  }
}

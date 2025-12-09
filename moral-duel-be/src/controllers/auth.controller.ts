import { Request, Response } from "express";
import { mockDb } from "../utils/mockDb";
import { z } from "zod";

// Validation Schema
const ConnectWalletSchema = z.object({
  wallet_address: z.string().min(40).regex(/^0x[a-fA-F0-9]{40}$/, "Invalid EVM address format"),
});

export class AuthController {
  
  // POST /auth/connect
  static async connect(req: Request, res: Response) {
    try {
      const { wallet_address } = ConnectWalletSchema.parse(req.body);

      // Find or Create User (Mock In-Memory)
      let user = mockDb.findUserByWallet(wallet_address);
      
      if (!user) {
        user = mockDb.createUser(wallet_address);
      }

      res.status(200).json({
        message: "Wallet connected successfully",
        user: {
          id: user.id,
          wallet_address: user.wallet_address,
          name: user.name,
          total_points: user.total_points,
          badges: [], // Placeholder
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.issues }); 
      } else {
        console.error("Auth Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
}

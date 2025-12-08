import { Request, Response } from "express";
import prisma from "../utils/prisma";
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

      // Find or Create User
      // Note: In a real "Login", we would verify a cryptographic signature here.
      // For Scaffolding/MVP, we implicitly trust the connection for now, 
      // but should implement SIWE (Sign-In with Ethereum) later for security.
      
      const user = await prisma.user.upsert({
        where: { wallet_address },
        update: {}, // No updates on login
        create: {
          wallet_address,
          name: `User ${wallet_address.slice(0, 6)}`, // Default name
          total_points: 0,
        },
      });

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

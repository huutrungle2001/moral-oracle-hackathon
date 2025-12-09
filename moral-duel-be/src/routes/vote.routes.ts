import { Router } from "express";
import { VoteController } from "../controllers/vote.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

/**
 * @swagger
 * /vote/cast:
 *   post:
 *     summary: Cast a vote
 *     tags: [Votes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - case_id
 *               - user_wallet
 *               - side
 *             properties:
 *               case_id:
 *                 type: integer
 *               user_wallet:
 *                 type: string
 *               side:
 *                 type: string
 *                 enum: [YES, NO]
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Vote cast successfully
 * 
 * /vote/argument:
 *   post:
 *     summary: Submit an argument
 *     tags: [Votes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - case_id
 *               - user_wallet
 *               - content
 *               - side
 *             properties:
 *               case_id:
 *                 type: integer
 *               user_wallet:
 *                 type: string
 *               content:
 *                 type: string
 *               side:
 *                 type: string
 *                 enum: [YES, NO]
 *     responses:
 *       201:
 *         description: Argument submitted
 */
router.post("/cast", asyncHandler(VoteController.castVote));
router.post("/argument", asyncHandler(VoteController.submitArgument));

export default router;

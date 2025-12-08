import { Router } from "express";
import { VoteController } from "../controllers/vote.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/cast", asyncHandler(VoteController.castVote));
router.post("/argument", asyncHandler(VoteController.submitArgument));

export default router;

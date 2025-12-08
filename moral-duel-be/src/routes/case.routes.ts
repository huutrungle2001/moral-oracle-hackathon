import { Router } from "express";
import { CaseController } from "../controllers/case.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/create", asyncHandler(CaseController.create));
router.get("/", asyncHandler(CaseController.list));
router.get("/:id", asyncHandler(CaseController.getById));

export default router;

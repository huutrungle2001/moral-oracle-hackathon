import { Router } from "express";
import { CaseController } from "../controllers/case.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

/**
 * @swagger
 * /case/create:
 *   post:
 *     summary: Create a new moral case
 *     tags: [Cases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - context
 *               - creator_wallet
 *             properties:
 *               title:
 *                 type: string
 *               context:
 *                 type: string
 *               creator_wallet:
 *                 type: string
 *     responses:
 *       201:
 *         description: Case created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       400:
 *         description: Validation error or unsafe content
 * 
 * /case/{id}/verdict:
 *   post:
 *     summary: Trigger AI Verdict
 *     tags: [Cases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Verdict generated
 * 
 * /case:
 *   get:
 *     summary: List cases
 *     tags: [Cases]
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [trending, newest]
 *     responses:
 *       200:
 *         description: List of cases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Case'
 * 
 * /case/{id}:
 *   get:
 *     summary: Get case details
 *     tags: [Cases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Case details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       404:
 *         description: Case not found
 */
router.post("/create", asyncHandler(CaseController.create));
router.post("/judge-mock", asyncHandler(CaseController.judgeMock)); // New stateless endpoint
router.post("/:id/verdict", asyncHandler(CaseController.triggerVerdict));
router.get("/", asyncHandler(CaseController.list));
router.get("/:id", asyncHandler(CaseController.getById));

export default router;

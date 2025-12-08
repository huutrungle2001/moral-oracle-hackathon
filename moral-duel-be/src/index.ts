import express, { Request, Response } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid'; // need to install uuid or just use random string for hackathon
import { Case, Vote, JudgeResponse } from './types';
import { MoralJudgeAgent } from './judge';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// In-memory storage for Hackathon MVP
const cases: Case[] = [];
const votes: Vote[] = [];

const judge = new MoralJudgeAgent();

// Routes
app.get('/health', (req, res) => {
    res.send('Moral Duel API is running');
});

// Create a new Duel Case
app.post('/duel/create', (req: Request, res: Response) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description required' });
    }

    const newCase: Case = {
        id: Math.random().toString(36).substring(7),
        title,
        description,
        status: 'ACTIVE',
        createdAt: new Date(),
        yesVotes: 0,
        noVotes: 0,
        hashtags: ['moral', 'dilemma'],
        context: "A controversial case submitted by a user.",
        rewardPool: 1000 + Math.floor(Math.random() * 5000),
        timeRemaining: "24h"
    };

    cases.push(newCase);
    res.json(newCase);
});

// Get all cases
app.get('/duel/cases', (req, res) => {
    // Sort by newest first
    res.json(cases.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
});

// Cast a vote
app.post('/duel/:id/vote', (req: Request, res: Response) => {
    const { id } = req.params;
    const { user, vote, argument, stake } = req.body;

    const duelCase = cases.find(c => c.id === id);
    if (!duelCase) {
        return res.status(404).json({ error: 'Case not found' });
    }
    if (duelCase.status !== 'ACTIVE') {
        return res.status(400).json({ error: 'Case is already judged' });
    }

    const newVote: Vote = {
        id: Math.random().toString(36).substring(7),
        caseId: id,
        user,
        vote,
        argument,
        stake: stake || 0
    };

    votes.push(newVote);
    res.json(newVote);
});

// Get votes for a case
app.get('/duel/:id/votes', (req, res) => {
    const { id } = req.params;
    const caseVotes = votes.filter(v => v.caseId === id);
    res.json(caseVotes);
});

// Trigger Judgment
app.post('/duel/:id/judge', async (req: Request, res: Response) => {
    const { id } = req.params;
    const duelCase = cases.find(c => c.id === id);
    
    if (!duelCase) {
        return res.status(404).json({ error: 'Case not found' });
    }

    if (duelCase.status === 'JUDGED') {
        // Return existing result
        return res.json({
            verdict: duelCase.verdict,
            reasoning: duelCase.judgeReasoning
        });
    }

    const caseVotes = votes.filter(v => v.caseId === id);
    
    try {
        const result: JudgeResponse = await judge.judgeCase(duelCase, caseVotes);
        
        // Update case
        duelCase.status = 'JUDGED';
        duelCase.verdict = result.verdict;
        duelCase.judgeReasoning = result.reasoning;

        res.json(result);
    } catch (error) {
        console.error("Error judging case:", error);
        res.status(500).json({ error: 'Failed to judge case' });
    }
});

app.listen(port, () => {
    console.log(`Moral Duel API listening at http://localhost:${port}`);
});

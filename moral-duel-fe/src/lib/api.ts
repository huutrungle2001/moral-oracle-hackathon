export interface Case {
    id: string;
    title: string;
    description: string;
    status: 'ACTIVE' | 'JUDGED';
    createdAt: string;
    yesVotes: number;
    noVotes: number;
    hashtags: string[];
    context: string;
    rewardPool: number;
    timeRemaining: string;
    isTrending?: boolean;
    topComments: any[];
    yesArgument: string;
    noArgument: string;
    aiVerdict?: string;
    aiReasoning?: string;
}

// Backend URL for AI Verdict only
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

import { mockCases, mockArguments } from "./mockData";

// --- LocalStorage Helpers ---
const USER_KEY = 'moral_oracle_user';
const CASES_KEY = 'moral_oracle_cases_v2';
const VOTES_KEY = 'moral_oracle_votes';

export const getStoredUser = () => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
};

// Seed initial mock data if empty
const seedData = () => {
    if (!localStorage.getItem(CASES_KEY)) {
        // Transform mockCases to match API Case interface if needed
        // The interfaces are very similar, just ensure status is set
        const formattedCases = mockCases.map(c => ({
            ...c,
            status: 'ACTIVE' as const, // Default to ACTIVE
            description: c.context, // Map context to description if needed
            aiVerdict: undefined,
            aiReasoning: undefined
        }));
        localStorage.setItem(CASES_KEY, JSON.stringify(formattedCases));
    }
};

seedData();

export const api = {
    // --- Auth (Mocked on Frontend) ---
    connectWallet: async (walletAddress: string) => {
        const user = {
            wallet_address: walletAddress,
            name: `User ${walletAddress.slice(0, 6)}`,
            id: Date.now()
        };
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return user;
    },

    getCurrentUser: () => getStoredUser(),

    logout: () => {
        localStorage.removeItem(USER_KEY);
    },

    // --- Cases (Frontend Mock) ---
    getCases: async (): Promise<Case[]> => {
        const stored = localStorage.getItem(CASES_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    createCase: async (title: string, description: string): Promise<Case> => {
        const user = getStoredUser();
        if (!user) throw new Error("User not connected");

        const cases = await api.getCases();
        const newCase: Case = {
            id: String(Date.now()),
            title,
            description,
            context: description,
            status: 'ACTIVE',
            createdAt: new Date().toISOString(),
            yesVotes: 0,
            noVotes: 0,
            yesArgument: "",
            noArgument: "",
            hashtags: ["new"],
            rewardPool: 100,
            timeRemaining: "24h",
            topComments: []
        };

        cases.push(newCase);
        localStorage.setItem(CASES_KEY, JSON.stringify(cases));
        return newCase;
    },

    getVotes: async (caseId: string) => {
        const stored = localStorage.getItem(VOTES_KEY);
        const userVotes = stored ? JSON.parse(stored) : [];
        const caseUserVotes = userVotes.filter((v: any) => v.caseId === caseId);

        // Merge with static mock arguments
        // We need to map mockArguments to the Vote-like structure needed by the backend
        // Backend expects: { id, content, side } (mapped in triggerVerdict)
        const staticArgsRaw = mockArguments[caseId as keyof typeof mockArguments] || { yes: [], no: [] };

        const staticArgs = [
            ...staticArgsRaw.yes.map((a: any) => ({
                id: a.id,
                content: a.content,
                side: 'YES',
                caseId
            })),
            ...staticArgsRaw.no.map((a: any) => ({
                id: a.id,
                content: a.content,
                side: 'NO',
                caseId
            }))
        ];

        return [...caseUserVotes, ...staticArgs];
    },

    getCaseDetail: async (caseId: string) => {
        const cases = await api.getCases();
        const found = cases.find(c => c.id === caseId);
        if (!found) throw new Error("Case not found");
        return found;
    },

    // --- AI Verdict (Backend Integration) ---
    // Only this function calls the real backend logic
    triggerVerdict: async (caseId: string) => {
        // Find case locally to send context to backend
        const caseDetail = await api.getCaseDetail(caseId);
        const votes = await api.getVotes(caseId);

        // Call Backend to judge based on local data
        const response = await fetch(`${API_URL}/case/judge-mock`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: caseDetail.title,
                context: caseDetail.context,
                arguments: votes.map((v: any) => ({
                    id: String(v.id),
                    content: v.argument,
                    side: v.side
                }))
            })
        });

        if (!response.ok) throw new Error("AI Judge failed");
        const result = await response.json();

        // Update Local State with Verdict
        const cases = await api.getCases();
        const idx = cases.findIndex(c => c.id === caseId);
        if (idx !== -1) {
            cases[idx].status = 'JUDGED';
            cases[idx].aiVerdict = result.verdict.verdict;
            cases[idx].aiReasoning = result.verdict.reasoning;
            localStorage.setItem(CASES_KEY, JSON.stringify(cases));
        }

        return result.verdict;
    },

    // Kept for compatibility but returns local data
    getVerdict: async (caseId: string) => {
        const c = await api.getCaseDetail(caseId);
        if (c.status === 'JUDGED') {
            return {
                verdict: c.aiVerdict,
                reasoning: c.aiReasoning,
                bestArguments: [] // Ensure property exists for UI
            };
        }
        return null;
    },

    vote: async (caseId: string, side: 'YES' | 'NO', argument: string) => {
        const user = getStoredUser();
        if (!user) throw new Error("User not connected");

        const stored = localStorage.getItem(VOTES_KEY);
        const allVotes = stored ? JSON.parse(stored) : [];

        const newVote = {
            id: Date.now(),
            caseId,
            userWallet: user.wallet_address,
            side,
            argument,
            timestamp: new Date().toISOString()
        };

        allVotes.push(newVote);
        localStorage.setItem(VOTES_KEY, JSON.stringify(allVotes));

        // Update vote counts
        const cases = await api.getCases();
        const idx = cases.findIndex(c => c.id === caseId);
        if (idx !== -1) {
            if (side === 'YES') cases[idx].yesVotes++;
            else cases[idx].noVotes++;
            localStorage.setItem(CASES_KEY, JSON.stringify(cases));
        }

        return newVote;
    }
};

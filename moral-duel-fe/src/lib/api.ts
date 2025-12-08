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
    isTrending?: boolean; // mocked in frontend if not in backend
    topComments: any[]; // mocked for now
    yesArgument: string;
    noArgument: string;
}

const API_URL = 'http://localhost:3001';

export const api = {
    getCases: async (): Promise<Case[]> => {
        const response = await fetch(`${API_URL}/duel/cases`);
        if (!response.ok) throw new Error('Failed to fetch cases');
        const data = await response.json();
        
        // Enhance with mock data for UI that is missing in backend
        return data.map((c: any) => ({
            ...c,
            isTrending: Math.random() > 0.7,
            topComments: [],
            hashtags: c.hashtags || ['moral', 'debate'],
            yesArgument: "Supportive argument placeholder.",
            noArgument: "Opposing argument placeholder."
        }));
    },

    createCase: async (title: string, description: string): Promise<Case> => {
        const response = await fetch(`${API_URL}/duel/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        if (!response.ok) throw new Error('Failed to create case');
        return response.json();
    }
};

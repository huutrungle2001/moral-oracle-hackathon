export interface Case {
    id: string;
    title: string;
    description: string;
    status: 'ACTIVE' | 'JUDGED';
    createdAt: Date;
    verdict?: 'YES' | 'NO';
    judgeReasoning?: string;
    // New fields for UI
    yesVotes: number;
    noVotes: number;
    hashtags: string[];
    context: string;
    rewardPool: number;
    timeRemaining: string;
}

export interface Vote {
    id: string;
    caseId: string;
    user: string;
    vote: 'YES' | 'NO';
    argument: string;
    stake: number;
}

export interface JudgeResponse {
    verdict: 'YES' | 'NO';
    reasoning: string;
    winningSide: 'YES' | 'NO';
}

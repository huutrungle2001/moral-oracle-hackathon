export interface MockUser {
  id: number;
  wallet_address: string;
  name: string;
  total_points: number;
}

export interface MockCase {
  id: number;
  title: string;
  context: string;
  status: string;
  creator_wallet: string;
  created_at: Date;
  yes_votes: number;
  no_votes: number;
  total_participants: number;
  reward_pool: number;
  arguments: MockArgument[];
  ai_verdict?: string;
  ai_verdict_reasoning?: string;
}

export interface MockArgument {
  id: number;
  case_id: number;
  user_wallet: string;
  content: string;
  side: "YES" | "NO";
  votes: number;
  is_top_3: boolean;
}

// Global In-Memory Store
export const mockDb = {
  users: [] as MockUser[],
  cases: [] as MockCase[],
  
  // Helpers
  findUserByWallet: (wallet: string) => mockDb.users.find(u => u.wallet_address === wallet),
  createUser: (wallet: string) => {
    const newUser = { 
        id: mockDb.users.length + 1, 
        wallet_address: wallet, 
        name: `User ${wallet.slice(0,6)}`, 
        total_points: 0 
    };
    mockDb.users.push(newUser);
    return newUser;
  },
  
  findCaseById: (id: number) => mockDb.cases.find(c => c.id === id),
  createCase: (data: Omit<MockCase, 'id' | 'created_at' | 'yes_votes' | 'no_votes' | 'total_participants' | 'reward_pool' | 'arguments'>) => {
    const newCase: MockCase = {
        ...data,
        id: mockDb.cases.length + 1,
        created_at: new Date(),
        yes_votes: 0,
        no_votes: 0,
        total_participants: 0,
        reward_pool: 100, // Initial pool
        arguments: []
    };
    mockDb.cases.push(newCase);
    return newCase;
  },

  addArgument: (caseId: number, data: Omit<MockArgument, 'id' | 'votes' | 'is_top_3'>) => {
    const caseItem = mockDb.findCaseById(caseId);
    if (!caseItem) return null;
    
    const newArg: MockArgument = {
        ...data,
        id: Math.floor(Math.random() * 10000), // Simple random ID
        votes: 0,
        is_top_3: false
    };
    caseItem.arguments.push(newArg);
    return newArg;
  },

  seed: () => {
      if (mockDb.cases.length > 0) return;
      
      console.log("Seeding Mock DB...");
      const user = mockDb.createUser("0x1234567890123456789012345678901234567890");
      
      mockDb.createCase({
          title: "The Trolley Problem: AI Edition",
          context: "An AI must choose between saving 5 pedestrians or 1 Nobel prize scientist. The scientist is on the brink of curing cancer. The 5 pedestrians are average citizens. What should the AI do? Switch tracks to kill the scientist?",
          status: "active",
          creator_wallet: user.wallet_address,
      });

      mockDb.createCase({
          title: "Is it wrong to steal bread to feed a starving family?",
          context: "A parent has no money and their children are starving. They steal a loaf of bread from a large chain supermarket. Is this morally permissible given the context of survival vs property rights?",
          status: "active",
          creator_wallet: user.wallet_address,
      });
      console.log("Mock DB Seeded.");
  }
};

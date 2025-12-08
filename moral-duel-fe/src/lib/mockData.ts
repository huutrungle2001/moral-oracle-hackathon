export interface Case {
  id: string;
  title: string;
  context: string;
  hashtags: string[];
  yesArgument: string;
  noArgument: string;
  yesVotes: number;
  noVotes: number;
  rewardPool: number;
  timeRemaining: string;
  topComments: Comment[];
  isTrending?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  votes: number;
  side: "yes" | "no";
}

export const mockCases: Case[] = [
  {
    id: "1",
    title: "Installing GPS Tracker on Partner's Phone?",
    context: "You suspect your partner of being unfaithful and secretly install a GPS tracker to monitor them. Is this wrong?",
    hashtags: ["#Trending", "#Love"],
    yesArgument: "",
    noArgument: "",
    yesVotes: 234,
    noVotes: 456,
    rewardPool: 1250,
    timeRemaining: "12h 34m",
    isTrending: true,
    topComments: [
      {
        id: "c1",
        author: "Tribatko",
        content: "If there's no trust, don't be in a relationship. Tracking only creates more cracks.",
        votes: 89,
        side: "no",
      },
      {
        id: "c2",
        author: "Harithng",
        content: "Sometimes the truth needs to be verified. If they're innocent, they'll understand.",
        votes: 67,
        side: "yes",
      },
    ],
  },
  {
    id: "2",
    title: "Firing an Elderly Employee?",
    context: "Mr. A's performance is only 50% compared to younger staff, but he is dedicated and nearing retirement. Should he be fired?",
    hashtags: ["#Workplace", "#Ethics"],
    yesArgument: "A company cannot run on compassion alone.",
    noArgument: "Keeping Mr. A demonstrates social responsibility.",
    yesVotes: 178,
    noVotes: 389,
    rewardPool: 980,
    timeRemaining: "8h 12m",
    isTrending: true,
    topComments: [
      {
        id: "c3",
        author: "LittleMaster",
        content: "Business is business. Feelings don't pay salaries.",
        votes: 54,
        side: "yes",
      },
      {
        id: "c4",
        author: "BritishShorthair",
        content: "He has dedicated years to this place. This is a chance for the company to show humanity.",
        votes: 92,
        side: "no",
      },
    ],
  },
  {
    id: "3",
    title: "Dating While Separated but Not Divorced?",
    context: "You start dating someone new while you are separated but your divorce is not yet finalized.",
    hashtags: ["#Love", "#Ethics"],
    yesArgument: "Separation means it's over.",
    noArgument: "It's still a moral commitment until the divorce is final.",
    yesVotes: 312,
    noVotes: 267,
    rewardPool: 1450,
    timeRemaining: "18h 45m",
    isTrending: false,
    topComments: [
      {
        id: "c5",
        author: "Mle",
        content: "Separation is already the end. Everyone deserves new happiness.",
        votes: 78,
        side: "yes",
      },
      {
        id: "c6",
        author: "BeardSea",
        content: "Paperwork not done means responsibility remains. Respect the commitment.",
        votes: 71,
        side: "no",
      },
    ],
  },
  {
    id: "4",
    title: "Using AI Art for Commercial Projects?",
    context: "An artist uses AI to generate base assets for a client project to save time, without explicitly disclosing it. The result is good, but is it ethical?",
    hashtags: ["#AI", "#CreativeRights"],
    yesArgument: "Efficiency matters. If the output is good, the tool doesn't matter.",
    noArgument: "It devalues human skill and potentially infringes on other artists' styles.",
    yesVotes: 512,
    noVotes: 489,
    rewardPool: 2100,
    timeRemaining: "5h 20m",
    isTrending: true,
    topComments: [
      {
        id: "c7",
        author: "TechOptimist",
        content: "AI is just a tool like a camera was to painters. Adapt or perish.",
        votes: 120,
        side: "yes",
      },
      {
        id: "c8",
        author: "Traditionalist",
        content: "It feels like cheating. The client pays for your vision, not a machine's average.",
        votes: 115,
        side: "no",
      },
    ],
  },
  {
    id: "5",
    title: "The Triage Algorithm",
    context: "A hospital uses an AI to prioritize emergency patients. It suggests treating a younger patient with higher survival odds over an elderly philanthropist.",
    hashtags: ["#Bioethics", "#AI"],
    yesArgument: "Maximizing total life years saved is the most logical metric.",
    noArgument: "Social contribution and 'fairness' should count, not just raw biology.",
    yesVotes: 890,
    noVotes: 910,
    rewardPool: 5000,
    timeRemaining: "2h 10m",
    isTrending: true,
    topComments: [
      {
        id: "c9",
        author: "LogicBot",
        content: "Cold logic saves more lives in the long run. The algorithm is unbiased.",
        votes: 230,
        side: "yes",
      },
      {
        id: "c10",
        author: "Humanist",
        content: "A society that ignores the value of past contributions ironically has no future.",
        votes: 245,
        side: "no",
      },
    ],
  },
];

export const mockArguments = {
  "1": {
    yes: [
      {
        id: "a1",
        author: "Mrs. Fatty",
        content:
          "In an era where infidelity is too easy, verification is reasonable. If your partner is innocent, they won't mind sharing their location.",
        votes: 145,
        potentialReward: 75,
      },
      {
        id: "a2",
        author: "Tribatko",
        content: "Sometimes trust needs to be reinforced with evidence. Tracking is just a tool, not a crime.",
        votes: 98,
        potentialReward: 50,
      },
      {
        id: "a3",
        author: "Harithng",
        content: "Better to know the painful truth than to live in an illusion forever.",
        votes: 67,
        potentialReward: 35,
      },
    ],
    no: [
      {
        id: "a4",
        author: "LittleMaster",
        content: "Love cannot be built on surveillance. Tracking is an act of betraying trust.",
        votes: 189,
        potentialReward: 95,
      },
      {
        id: "a5",
        author: "BritishShorthair",
        content: "If you need to control your partner to this extent, the relationship has been dead for a long time.",
        votes: 156,
        potentialReward: 80,
      },
      {
        id: "a6",
        author: "Mle",
        content: "Privacy is a fundamental right. Violating it is a serious ethical breach.",
        votes: 134,
        potentialReward: 65,
      },
    ],
  },
  "2": {
    yes: [
      {
        id: "a7",
        author: "BeardSea",
        content:
          "Companies need to optimize performance to compete. Keeping unproductive employees is unfair to hardworking colleagues.",
        votes: 112,
        potentialReward: 60,
      },
      {
        id: "a8",
        author: "Mrs. Fatty",
        content: "Business is about results. Sentiment cannot replace performance.",
        votes: 89,
        potentialReward: 45,
      },
      {
        id: "a8b",
        author: "SouthernGuy",
        content: "Younger people work faster, so it's better.",
        votes: 18,
        potentialReward: 10,
      },
    ],
    no: [
      {
        id: "a9",
        author: "Tribatko",
        content: "He demonstrated loyalty for years. This is the moment for the company to repay that loyalty.",
        votes: 201,
        potentialReward: 100,
      },
      {
        id: "a10",
        author: "Harithng",
        content: "Firing him sends a terrible message to all staff: loyalty has no value here.",
        votes: 178,
        potentialReward: 90,
      },
      {
        id: "a10b",
        author: "JessicaMeow",
        content: "He is a good person, I feel bad for him.",
        votes: 22,
        potentialReward: 12,
      },
    ],
  },
  "3": {
    yes: [
      {
        id: "a11",
        author: "LittleMaster",
        content: "Separation is the final decision. No one should have to wait for paperwork to live their life.",
        votes: 167,
        potentialReward: 85,
      },
    ],
    no: [
      {
        id: "a12",
        author: "BritishShorthair",
        content: "Commitment isn't just paper. Respect your partner until everything is officially over.",
        votes: 143,
        potentialReward: 70,
      },
    ],
  },
  "4": {
    yes: [
      { id: "a13", author: "TechOptimist", content: "Tools evolve. We used to mix paints, now we use pixels. AI is just the next step.", votes: 85, potentialReward: 40 },
      { id: "a14", author: "EfficiencyPro", content: "Client budgets are tight. If I can deliver quality faster, everyone wins.", votes: 72, potentialReward: 35 }
    ],
    no: [
      { id: "a15", author: "Traditionalist", content: "Art is expression, not just production. You are robbing the process of its soul.", votes: 95, potentialReward: 48 },
      { id: "a16", author: "LegalEagle", content: "The training data is stolen. You are profiting from theft.", votes: 110, potentialReward: 55 }
    ]
  },
  "5": {
    yes: [
      { id: "a17", author: "Utilitarian_One", content: "QALY (Quality Adjusted Life Years) is the standard. Save the most life-time possible.", votes: 210, potentialReward: 105 },
    ],
    no: [
      { id: "a18", author: "VirtueEthicsFan", content: "We cannot reduce humans to numbers. We owe a debt of gratitude to our elders.", votes: 195, potentialReward: 98 },
      { id: "a19", author: "SlipperySlope", content: "If we kill the 'less useful', who decides usefulness tomorrow?", votes: 180, potentialReward: 90 }
    ]
  }
};

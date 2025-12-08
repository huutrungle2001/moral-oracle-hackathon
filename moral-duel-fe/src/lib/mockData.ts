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
    title: "Sa thải nhân viên lớn tuổi?",
    context: "Hiệu suất của ông A chỉ bằng 50% người trẻ, nhưng ông ấy tận tâm và sắp nghỉ hưu. Có nên sa thải không?",
    hashtags: ["#Workplace", "#Ethics"],
    yesArgument: "Công ty không thể vận hành bằng lòng trắc ẩn.",
    noArgument: "Giữ ông A lại thể hiện trách nhiệm xã hội.",
    yesVotes: 178,
    noVotes: 389,
    rewardPool: 980,
    timeRemaining: "8h 12m",
    isTrending: true,
    topComments: [
      {
        id: "c3",
        author: "Thạc sĩ bé iu",
        content: "Kinh doanh là kinh doanh. Cảm xúc không trả lương nhân viên.",
        votes: 54,
        side: "yes",
      },
      {
        id: "c4",
        author: "Mèo anh lông ngắn",
        content: "Ông ấy đã cống hiến nhiều năm. Đây là cơ hội cho công ty thể hiện nhân văn.",
        votes: 92,
        side: "no",
      },
    ],
  },
  {
    id: "3",
    title: "Tìm hiểu người mới khi ly thân?",
    context: "Bạn bắt đầu quen người mới khi vẫn chưa ly hôn.",
    hashtags: ["#Love", "#Ethics"],
    yesArgument: "Ly thân nghĩa là đã kết thúc.",
    noArgument: "Đó vẫn là cam kết đạo đức cho đến khi ly hôn hoàn tất.",
    yesVotes: 312,
    noVotes: 267,
    rewardPool: 1450,
    timeRemaining: "18h 45m",
    isTrending: false,
    topComments: [
      {
        id: "c5",
        author: "Mle",
        content: "Ly thân đã là dấu chấm hết. Mọi người xứng đáng có hạnh phúc mới.",
        votes: 78,
        side: "yes",
      },
      {
        id: "c6",
        author: "Hải Râu",
        content: "Giấy tờ chưa xong nghĩa là vẫn còn trách nhiệm. Hãy tôn trọng cam kết.",
        votes: 71,
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
        author: "Bà béo",
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
        author: "Thạc sĩ bé iu",
        content: "Love cannot be built on surveillance. Tracking is an act of betraying trust.",
        votes: 189,
        potentialReward: 95,
      },
      {
        id: "a5",
        author: "Mèo anh lông ngắn",
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
        author: "Hải Râu",
        content:
          "Công ty cần tối ưu hiệu suất để cạnh tranh. Giữ nhân viên kém năng suất là không công bằng với đồng nghiệp.",
        votes: 112,
        potentialReward: 60,
      },
      {
        id: "a8",
        author: "Bà béo",
        content: "Kinh doanh là về kết quả. Tình cảm không thể thay thế hiệu suất.",
        votes: 89,
        potentialReward: 45,
      },
      {
        id: "a8b",
        author: "Hung_nam_ky",
        content: "Người trẻ làm việc nhanh hơn thì tốt hơn rồi.",
        votes: 18,
        potentialReward: 10,
      },
    ],
    no: [
      {
        id: "a9",
        author: "Tribatko",
        content: "Ông ấy đã cống hiến cả thanh xuân. Đây là lúc công ty đền đáp lòng trung thành.",
        votes: 201,
        potentialReward: 100,
      },
      {
        id: "a10",
        author: "Harithng",
        content: "Sa thải ông ấy sẽ gửi thông điệp tồi đến toàn bộ nhân viên: lòng trung thành không có giá trị.",
        votes: 178,
        potentialReward: 90,
      },
      {
        id: "a10b",
        author: "Jessica meo meo",
        content: "Ông ấy là người tốt, thấy tội nghiệp.",
        votes: 22,
        potentialReward: 12,
      },
    ],
  },
  "3": {
    yes: [
      {
        id: "a11",
        author: "Thạc sĩ bé iu",
        content: "Ly thân là quyết định cuối cùng. Không ai nên phải đợi giấy tờ mới được sống tiếp.",
        votes: 167,
        potentialReward: 85,
      },
    ],
    no: [
      {
        id: "a12",
        author: "Mèo anh lông ngắn",
        content: "Cam kết không chỉ là giấy tờ. Hãy tôn trọng người còn lại cho đến khi mọi thứ chính thức kết thúc.",
        votes: 143,
        potentialReward: 70,
      },
    ],
  },
};

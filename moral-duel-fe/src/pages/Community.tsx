import { Sparkles, Award, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Community = () => {
  const mockPosts = [
    {
      id: 1,
      author: "Big Mama",
      avatar: "BM",
      content: "Debated with my husband today about buying iPhone vs Samsung, earned 340 tokens. Now I can buy both! 😂💰",
      type: "reward",
      time: "30 minutes ago"
    },
    {
      id: 2,
      author: "Thacsibeiu",
      avatar: "MB",
      content: "This app is heaven for argumentative people! Get paid to argue, go home and argue with wife to gain more experience. Win-win! 🤣",
      type: "shoutout",
      time: "1 hour ago"
    },
    {
      id: 3,
      author: "Short Hair Cat",
      avatar: "SC",
      content: "After debating 'Tracking Lover's Phone', crush asked why I'm always online. Now it's a new case: 'Should you tell the truth about being addicted to debate apps?' 😅",
      type: "trending",
      time: "2 hours ago"
    },
    {
      id: 4,
      author: "CryptoPhilosopher420",
      avatar: "CP",
      content: "Today I earned 240 tokens by defending the importance of privacy in relationships. Logic wins! 🧠",
      type: "reward",
      time: "2 hours ago"
    },
    {
      id: 5,
      author: "DebatePro",
      avatar: "DP",
      content: "Just unlocked 'Master of Reasoning' badge! Secret: 70% logic, 30% emotion, 100% patience reading others' opinions 🏆",
      type: "achievement",
      time: "3 hours ago"
    },
    {
      id: 6,
      author: "DebateLordSupreme",
      avatar: "DL",
      content: "This app is absolutely brilliant! Finally a place where I can argue with strangers AND get paid for it. My therapist says I'm making progress. 😂",
      type: "shoutout",
      time: "4 hours ago"
    },
    {
      id: 7,
      author: "MoralGamer",
      avatar: "MG",
      content: "Mini moral game: If you knew you were going to lose an argument, should you quit early to save tokens? 🤔",
      type: "game",
      time: "5 hours ago"
    },
    {
      id: 8,
      author: "MindReaderRefuser",
      avatar: "MR",
      content: "Mini moral game: If you could read your partner's mind for one day, would you? The Oracle says NO. Privacy is sacred.",
      type: "game",
      time: "5 hours ago"
    },
    {
      id: 9,
      author: "Bearded Hai",
      avatar: "BH",
      content: "Created a case about 'Firing Older Employees' thinking of my old toxic boss. Now 200+ participants, bonus tokens flooding in. Thanks toxic boss! 😎",
      type: "trending",
      time: "8 hours ago"
    },
    {
      id: 10,
      author: "EthicsNinja42",
      avatar: "EN",
      content: "Just unlocked 'Master of Logic' badge! My arguments on workplace ethics resonated with the community 💬",
      type: "achievement",
      time: "1 day ago"
    },
    {
      id: 11,
      author: "Philosopher Girl",
      avatar: "PG",
      content: "\"Life isn't black and white, it's 50 shades of grey. But in debate, you must pick YES or NO.\" - Survival philosophy 2025 🧘‍♀️",
      type: "quote",
      time: "1 day ago"
    },
    {
      id: 12,
      author: "SocratesReborn",
      avatar: "SR",
      content: "\"The unexamined life is not worth living, but the over-examined life leads to analysis paralysis. Balance is wisdom.\" — Real moral reflection",
      type: "quote",
      time: "1 day ago"
    },
    {
      id: 13,
      author: "Poor Husband",
      avatar: "PH",
      content: "Wife asked 'What do you think about the phone tracking case?'. I answered NO side. Now sleeping on the sofa. Earned tokens but lost the bed. Painful trade-off! 🛋️😭",
      type: "shoutout",
      time: "1 day ago"
    },
    {
      id: 14,
      author: "Jessica Meow",
      avatar: "JM",
      content: "Mini game: Win the argument but lose friends vs Lose the argument but keep friendship - what do you choose? I choose... block everyone to avoid choosing 🙈",
      type: "game",
      time: "2 days ago"
    },
    {
      id: 15,
      author: "TokenHunterPro",
      avatar: "TH",
      content: "Created a case about elderly employment rights that got 150+ participants! Bonus rewards incoming",
      type: "trending",
      time: "2 days ago"
    },
    {
      id: 16,
      author: "ProfitVsCompassion",
      avatar: "PC",
      content: "Mini moral game: Should companies prioritize profit over employee wellbeing? Cast your vote in Discover!",
      type: "game",
      time: "2 days ago"
    }
  ];

  const getPostIcon = (type: string) => {
    switch (type) {
      case "reward":
        return <Award className="w-5 h-5 text-accent" />;
      case "achievement":
        return <Sparkles className="w-5 h-5 text-primary" />;
      case "game":
        return <Sparkles className="w-5 h-5 text-primary-glow" />;
      case "trending":
        return <Heart className="w-5 h-5 text-destructive" />;
      default:
        return <Sparkles className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getPostBadge = (type: string) => {
    const badges: Record<string, { label: string; className: string }> = {
      reward: { label: "Reward", className: "bg-accent/20 text-accent-foreground border-accent" },
      achievement: { label: "Achievement", className: "bg-primary/20 text-primary-foreground border-primary" },
      game: { label: "Game", className: "bg-primary-glow/20 text-primary border-primary-glow" },
      trending: { label: "Trending", className: "bg-destructive/20 text-destructive-foreground border-destructive" },
      quote: { label: "Reflection", className: "bg-muted text-muted-foreground border-border" },
      shoutout: { label: "Shoutout", className: "bg-primary/20 text-primary-foreground border-primary" }
    };
    return badges[type] || badges.quote;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">Community</h1>
          <p className="text-lg text-muted-foreground">
            A positive space for sharing insights, mini games, and celebrating achievements
          </p>
        </div>

        {/* Info Banner */}
        <Card className="p-6 mb-8 bg-background/95 backdrop-blur-sm
          border-2 border-primary/30
          dark:border-primary/40
          shadow-[0_4px_20px_rgba(92,189,185,0.15),0_2px_8px_rgba(0,0,0,0.05)]
          dark:shadow-[0_6px_25px_rgba(225,179,130,0.15),0_3px_10px_rgba(225,179,130,0.1)]">
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Welcome to the Community Feed</h3>
              <p className="text-muted-foreground leading-relaxed">
                This is a reply-free showcase area where members share their earnings, moral reflections, 
                mini games, and achievements. No debates here—just inspiration and celebration!
              </p>
            </div>
          </div>
        </Card>

        {/* Posts Feed */}
        <div className="max-w-3xl mx-auto space-y-4">
          {mockPosts.map((post) => {
            const badge = getPostBadge(post.type);
            return (
              <Card key={post.id} className="p-6 bg-background/95 backdrop-blur-sm
                border-2 border-border/60 hover:border-primary/50
                dark:border-primary/30 dark:hover:border-primary/50
                shadow-[0_4px_20px_rgba(92,189,185,0.15),0_2px_8px_rgba(0,0,0,0.05)]
                hover:shadow-[0_8px_30px_rgba(92,189,185,0.25),0_4px_12px_rgba(0,0,0,0.08)]
                dark:shadow-[0_6px_25px_rgba(225,179,130,0.15),0_3px_10px_rgba(225,179,130,0.1)]
                dark:hover:shadow-[0_12px_40px_rgba(225,179,130,0.25),0_6px_16px_rgba(225,179,130,0.15)]
                transition-all duration-300">
                <div className="flex gap-4">
                  <Avatar className="w-12 h-12 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-semibold">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium text-foreground">
                          {post.author}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{post.time}</span>
                      </div>
                      {getPostIcon(post.type)}
                    </div>

                    <p className="text-foreground leading-relaxed">{post.content}</p>

                    <Badge variant="outline" className={badge.className}>
                      {badge.label}
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State Message */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            More posts coming soon! Keep participating in duels to see your achievements here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Community;

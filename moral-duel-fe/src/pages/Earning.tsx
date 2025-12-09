import { Award, Trophy, TrendingUp, Coins } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Earning = () => {
  const badges = [
    {
      icon: "🧠",
      name: "The Sage",
      desc: "Win 5 consecutive duels",
      reward: "500 bonus tokens"
    },
    {
      icon: "📝",
      name: "Master of Reasoning",
      desc: "Get top argument 3 times",
      reward: "300 bonus tokens"
    },
    {
      icon: "🌟",
      name: "Trendsetter",
      desc: "Create a case with ≥100 participants",
      reward: "1000 bonus tokens"
    }
  ];

  const rewardBreakdown = [
    { category: "Winning Side Vote", reward: "40% of pool", desc: "Split among voters on the winning side" },
    { category: "Top 3 Arguments", reward: "30% of pool", desc: "Divided by argument votes received" },
    { category: "Participation", reward: "20% of pool", desc: "For submitting any argument" },
    { category: "Case Creator", reward: "10% of pool", desc: "Bonus for viral cases (≥100 votes)" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-4">
            <Coins className="w-4 h-4" />
            <span className="text-sm font-medium">Transparent Reward System</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">How to Earn Tokens</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every debate has a reward pool. The more thoughtful your arguments, the more you earn.
          </p>
        </div>

        {/* Reward Breakdown */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Trophy className="w-7 h-7 text-accent" />
            Reward Distribution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rewardBreakdown.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-foreground">{item.category}</h3>
                    <Badge className="bg-accent text-accent-foreground text-base px-3 py-1">
                      {item.reward}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-primary" />
            How It Works
          </h2>
          <Card className="p-8">
            <ol className="space-y-6">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Choose a Side & Submit Argument</h4>
                  <p className="text-muted-foreground">Pick YES or NO and write a compelling argument (max 300 chars)</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Vote for Top 3 Arguments</h4>
                  <p className="text-muted-foreground">Read all arguments and vote for the 3 most convincing ones</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">AI Oracle Decides the Winner</h4>
                  <p className="text-muted-foreground">After 24h, AI analyzes logic, empathy, and consequences to pick the winning side</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Claim Your Rewards</h4>
                  <p className="text-muted-foreground">Tokens are distributed based on voting results and argument quality</p>
                </div>
              </li>
            </ol>
          </Card>
        </div>

        {/* Badges & Achievements */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Award className="w-7 h-7 text-primary-glow" />
            Badges & Bonus Rewards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-primary/5">
                <div className="text-5xl mb-4">{badge.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{badge.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{badge.desc}</p>
                <Badge className="bg-accent text-accent-foreground">
                  {badge.reward}
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Content Creator Rewards */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-10 h-10 text-primary" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Create Viral Cases & Earn More</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a case creator, you earn 10% of the reward pool when your case goes viral (≥100 participants). 
                  The more engaging your dilemma, the higher your earnings!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-background/50 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-1">100 participants</p>
                    <p className="text-2xl font-bold text-accent">~150 tokens</p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-1">500 participants</p>
                    <p className="text-2xl font-bold text-accent">~750 tokens</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Earning;

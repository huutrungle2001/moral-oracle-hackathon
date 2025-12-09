import { useEffect } from "react";
import { Trophy, Medal, Award, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import confetti from "canvas-confetti";

interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  wins: number;
  badge: string;
}

const leaderboardData: LeaderboardUser[] = [
  { rank: 1, name: "Thacsibeiu", points: 15240, wins: 127, badge: "The Sage" },
  { rank: 2, name: "Trung Le Huu", points: 14890, wins: 115, badge: "Master of Reasoning" },
  { rank: 3, name: "MoralGuru", points: 13650, wins: 98, badge: "Trendsetter" },
  { rank: 4, name: "DebateChamp", points: 12340, wins: 89, badge: "Master of Reasoning" },
  { rank: 5, name: "ThinkTankPro", points: 11890, wins: 82, badge: "The Sage" },
  { rank: 6, name: "EthicsExpert", points: 10560, wins: 76, badge: "Master of Reasoning" },
  { rank: 7, name: "WisdomSeeker", points: 9870, wins: 71, badge: "Trendsetter" },
  { rank: 8, name: "TruthFinder", points: 8920, wins: 65, badge: "The Sage" },
  { rank: 9, name: "ReasonWarrior", points: 8340, wins: 58, badge: "Master of Reasoning" },
  { rank: 10, name: "JusticeSeeker", points: 7650, wins: 52, badge: "Trendsetter" },
];

const Leaderboard = () => {
  useEffect(() => {
    // Trigger sparkle fireworks on page load
    const duration = 5000;
    const animationEnd = Date.now() + duration;

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 3;

      // Sparkle bursts from multiple points
      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ["#FFD700", "#FFA500", "#FF6347", "#87CEEB", "#9370DB"],
        shapes: ["star"],
        scalar: 1.2,
        drift: 0,
        gravity: 0.8,
        ticks: 400,
        startVelocity: 45,
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ["#FFD700", "#FFA500", "#FF6347", "#87CEEB", "#9370DB"],
        shapes: ["star"],
        scalar: 1.2,
        drift: 0,
        gravity: 0.8,
        ticks: 400,
        startVelocity: 45,
      });

      // Center burst
      if (Math.random() < 0.3) {
        confetti({
          particleCount: 5,
          angle: 90,
          spread: 360,
          origin: { x: 0.5, y: 0.5 },
          colors: ["#FFD700", "#FFA500", "#FF6347"],
          shapes: ["star", "circle"],
          scalar: 1.5,
          drift: randomInRange(-0.5, 0.5),
          gravity: 0.6,
          ticks: 500,
          startVelocity: 35,
        });
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-white drop-shadow-lg" />;
      case 2:
        return <Trophy className="w-7 h-7 text-white drop-shadow-lg" />;
      case 3:
        return <Medal className="w-7 h-7 text-white drop-shadow-lg" />;
      default:
        return <Award className="w-6 h-6 text-primary" />;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 dark:from-amber-600 dark:via-yellow-600 dark:to-amber-700 border-yellow-500 dark:border-amber-600 shadow-xl shadow-yellow-500/20 dark:shadow-amber-600/30";
      case 2:
        return "bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 dark:from-slate-600 dark:via-slate-700 dark:to-slate-800 border-slate-400 dark:border-slate-600 shadow-xl shadow-slate-400/20 dark:shadow-slate-600/30";
      case 3:
        return "bg-gradient-to-r from-orange-400 via-amber-600 to-orange-600 dark:from-orange-600 dark:via-amber-700 dark:to-orange-700 border-amber-600 dark:border-orange-600 shadow-xl shadow-amber-600/20 dark:shadow-orange-600/30";
      default:
        return "bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover:border-primary/50 transition-all";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Hall of Champions</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-foreground dark:bg-gradient-to-r dark:from-primary dark:to-primary-glow dark:bg-clip-text dark:text-transparent">
                Leaderboard
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Celebrate the brightest minds who dominate the moral arena with logic, empathy, and wisdom.
            </p>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {leaderboardData.map((user) => (
              <Card
                key={user.rank}
                className={`${getRankBg(user.rank)} border-2 transition-all hover:shadow-2xl hover:scale-[1.02]`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    {/* Rank Icon */}
                    <div className="flex-shrink-0">{getRankIcon(user.rank)}</div>

                    {/* User Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="w-12 h-12 border-2 border-white/30">
                        <AvatarFallback
                          className={`${user.rank <= 3 ? "bg-white/90 text-gray-900" : "bg-primary/10 text-primary"} font-bold`}
                        >
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-bold text-lg ${user.rank <= 3 ? "text-white drop-shadow-md" : "text-foreground"}`}
                          >
                            {user.name}
                          </h3>
                          <span className="text-sm">{user.badge}</span>
                        </div>
                        <p className={`text-sm ${user.rank <= 3 ? "text-white/90" : "text-foreground/60"}`}>
                          {user.wins} victories • Rank #{user.rank}
                        </p>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <div
                        className={`text-3xl font-bold ${user.rank <= 3 ? "text-white drop-shadow-lg" : "text-primary"}`}
                      >
                        {user.points.toLocaleString()}
                      </div>
                      <div className={`text-sm font-medium ${user.rank <= 3 ? "text-white/90" : "text-foreground/70"}`}>
                        moral points
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Want to see your name here?</p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-primary-foreground"
            >
              Start Competing Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;

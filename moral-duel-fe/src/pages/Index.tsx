import { Link } from "react-router-dom";
import { Sparkles, Plus, TrendingUp, Coins, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import CaseCard from "@/components/CaseCard";
import logicEmotionLight from "@/assets/logic-emotion-light.png";
import logicEmotionDark from "@/assets/logic-emotion-dark.png";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const Index = () => {
  const { data: cases, isLoading } = useQuery({
    queryKey: ['cases'],
    queryFn: api.getCases
  });

  const trendingCases = cases?.filter(c => c.isTrending) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Where Logic Meets Morality</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.3] tracking-tight mb-8">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-accent dark:from-primary dark:via-primary-glow dark:to-accent bg-clip-text text-transparent drop-shadow-lg">
                Play to Think,
              </span>
              <br />
              <span className="block mt-4 text-foreground drop-shadow-sm">Think to Earn</span>
            </h1>
            
            <p className="text-xl max-w-2xl mx-auto leading-[1.9] font-serif italic text-foreground/90">
              Explore moral dilemmas, vote on arguments, and earn rewards.
              <br />
              Your voice shapes the future of moral discourse.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/discover">
                <Button size="lg" variant="gradientAccent" className="text-lg px-8 gap-2">
                  <Brain className="w-5 h-5" />
                  Join the debate, shape the outcome
                </Button>
              </Link>
              <Link to="/create">
                <Button size="lg" variant="gradientAccent" className="text-lg px-8 gap-2">
                  <Plus className="w-5 h-5" />
                  Create the trend, claim big reward
                </Button>
              </Link>
            </div>

            {/* Temporary AI Verdict Demo Link */}
            <div className="pt-4">
              <Link to="/ai-verdict">
                <Button size="sm" variant="outline" className="gap-2">
                  <Brain className="w-4 h-4" />
                  View AI Verdict Demo
                </Button>
              </Link>
            </div>

            <div className="pt-6 space-y-3">
              <div className="relative inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/40 dark:via-orange-950/40 dark:to-amber-950/40 border border-amber-200/60 dark:border-amber-800/60 shadow-[0_8px_30px_rgb(251,146,60,0.12)] dark:shadow-[0_8px_30px_rgb(251,146,60,0.25)] hover:shadow-[0_12px_40px_rgb(251,146,60,0.2)] dark:hover:shadow-[0_12px_40px_rgb(251,146,60,0.35)] transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 dark:via-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                
                <div className="relative z-10">
                  <Coins className="w-7 h-7 text-amber-600 dark:text-amber-400 transition-transform duration-500 group-hover:rotate-12" />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 relative z-10">
                  <p className="text-foreground font-semibold text-base sm:text-lg">
                    Earn up to
                  </p>
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 dark:from-amber-400 dark:via-orange-400 dark:to-amber-500 bg-clip-text text-transparent [text-shadow:_0_2px_20px_rgb(251_146_60_/_0.3)]">
                    100,000 tokens
                  </span>
                  <p className="text-foreground font-semibold text-base sm:text-lg">
                    by choosing the winning side!
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Create trending cases to earn <span className="font-semibold text-primary">massive bonus rewards</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Cases */}
      <section className="py-10 bg-muted/30 dark:bg-gradient-to-b dark:from-background dark:via-muted/10 dark:to-background relative overflow-hidden">
        <div className="absolute inset-0 dark:opacity-100 opacity-0" style={{ background: 'var(--gradient-galaxy)' }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-accent" />
              <h2 className="text-3xl font-bold text-foreground">Trending Duels</h2>
            </div>
            <Link to="/discover">
              <Button variant="ghost" className="gap-2">
                View More
                <span className="text-lg">→</span>
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {trendingCases.map((caseData) => (
                <div key={caseData.id} className="w-full">
                  <CaseCard caseData={caseData} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Banner */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Gradient transition from previous section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-muted/30 dark:from-background to-transparent z-0" />
        
        {/* Gradient Background - Light Mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-pink-100/50 to-primary/10 dark:hidden" />
        
        {/* Gradient Background - Dark Mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-background to-amber-950/30 hidden dark:block" />
        
        {/* Gradient transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 dark:from-primary/5 to-transparent z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Left side - Logo Symbol */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <img 
                src={logicEmotionLight} 
                alt="Logic meets Emotion" 
                className="w-full max-w-[280px] md:max-w-[350px] lg:max-w-[400px] h-auto object-contain dark:hidden drop-shadow-[0_0_40px_rgba(92,189,185,0.4)] hover:drop-shadow-[0_0_60px_rgba(92,189,185,0.6)] transition-all duration-500"
              />
              <img 
                src={logicEmotionDark} 
                alt="Logic meets Emotion" 
                className="w-full max-w-[280px] md:max-w-[350px] lg:max-w-[400px] h-auto object-contain hidden dark:block drop-shadow-[0_0_40px_rgba(92,189,185,0.5)] hover:drop-shadow-[0_0_60px_rgba(251,146,60,0.6)] transition-all duration-500"
              />
            </div>
            
            {/* Right side - Text Content */}
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold tracking-wide uppercase
                text-primary dark:text-primary-glow
                drop-shadow-[0_2px_20px_rgba(92,189,185,0.6)]">
                Our Mission
              </h2>
              
              <h3 className="text-4xl md:text-6xl font-bold leading-[1.2]">
                <span className="bg-gradient-to-r from-primary via-primary-glow to-accent dark:from-primary dark:via-primary-glow dark:to-accent bg-clip-text text-transparent drop-shadow-lg">
                  Where LOGIC
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary-glow to-accent dark:from-primary dark:via-primary-glow dark:to-accent bg-clip-text text-transparent drop-shadow-lg">
                  meets EMOTION
                </span>
              </h3>
              
              <p className="text-xl md:text-2xl font-semibold leading-relaxed text-foreground/90">
                Where reasoning confronts empathy, and every voice shapes moral truth.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed text-foreground/80 italic font-serif">
                Think deeper. Debate smarter. Earn your influence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary-glow/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground drop-shadow-sm mb-6">Ready to Challenge Your Thinking?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            Join thousands of thinkers debating the toughest moral questions. Your brilliant perspective could earn you massive rewards!
          </p>
          <Link to="/discover">
            <Button size="lg" variant="gradientAccent" className="text-lg px-10 py-6 shadow-xl gap-2">
              <Sparkles className="w-5 h-5" />
              Start Your First Duel & Earn Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;

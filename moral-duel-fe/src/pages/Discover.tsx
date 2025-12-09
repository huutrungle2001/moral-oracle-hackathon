import { useState } from "react";
import { TrendingUp, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import CaseCard from "@/components/CaseCard";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const Discover = () => {
  const [sortBy, setSortBy] = useState<"trending" | "newest">("trending");

  const { data: cases = [], isLoading } = useQuery({
    queryKey: ['cases'],
    queryFn: api.getCases
  });

  const sortedCases = [...cases].sort((a, b) => {
    if (sortBy === "trending") {
      // Mock logic for trending if not available
      const participantsA = (a as any).totalParticipants || (a.yesVotes + a.noVotes);
      const participantsB = (b as any).totalParticipants || (b.yesVotes + b.noVotes);
      return participantsB - participantsA;
    }
    // Newest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Discover Cases</h1>
          <p className="text-lg text-muted-foreground">
            Explore moral dilemmas, vote on arguments, and earn rewards
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-3 mb-8">
          <Button
            variant={sortBy === "trending" ? "default" : "outline"}
            onClick={() => setSortBy("trending")}
            className="gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Trending
          </Button>
          <Button
            variant={sortBy === "newest" ? "default" : "outline"}
            onClick={() => setSortBy("newest")}
            className="gap-2"
          >
            <Clock className="w-4 h-4" />
            Newest
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}

        {/* Cases Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {sortedCases.map((caseData) => (
              <div key={caseData.id} className="h-full">
                <CaseCard caseData={caseData} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && sortedCases.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No cases found</p>
            <p className="text-sm text-muted-foreground mt-2">Be the first to create one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;

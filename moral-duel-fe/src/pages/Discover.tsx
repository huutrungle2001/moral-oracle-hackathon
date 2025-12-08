import { useState } from "react";
import { TrendingUp, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import CaseCard from "@/components/CaseCard";
import { Button } from "@/components/ui/button";
import { mockCases } from "@/lib/mockData";

const Discover = () => {
  const [sortBy, setSortBy] = useState<"trending" | "newest">("trending");

  const sortedCases = [...mockCases].sort((a, b) => {
    if (sortBy === "trending") {
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    }
    return 0; // For "newest", maintain current order
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

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {sortedCases.map((caseData) => (
            <div key={caseData.id} className="h-full">
              <CaseCard caseData={caseData} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedCases.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No cases found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;

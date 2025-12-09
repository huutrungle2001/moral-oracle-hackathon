import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, ArrowLeft, ThumbsUp, Scale, MessageSquare, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { mockArguments } from "@/lib/mockData";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const CaseDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  
  // Use API to fetch case data (so it persists and uses the rich seed)
  const { data: caseData, isLoading } = useQuery({
    queryKey: ['case', id],
    queryFn: () => api.getCaseDetail(id!),
    enabled: !!id
  });

  const [userArgument, setUserArgument] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedSide, setSelectedSide] = useState<"yes" | "no" | null>(null);
  const [votedArguments, setVotedArguments] = useState<string[]>([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasWrittenArgument, setHasWrittenArgument] = useState(false);

  // Verdict Mutation
  const verdictMutation = useMutation({
    mutationFn: () => api.triggerVerdict(id!),
    onSuccess: () => {
      toast.success("The Oracle has spoken!");
      queryClient.invalidateQueries({ queryKey: ['case', id] });
      setTimeout(() => window.location.reload(), 1000);
    },
    onError: () => toast.error("The Oracle is silent (Error triggering verdict)")
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Case not found</h1>
          <Link to="/discover">
            <Button>Back to Discover</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Use mockArguments for the static list, or we could store these in LS too. 
  // For now, static list + dynamic voting is fine for MVP.
  // We need to cast id to keyof mockArguments to be safe
  const caseArguments = mockArguments[id as keyof typeof mockArguments] || { yes: [], no: [] };

  const totalVotes = caseData.yesVotes + caseData.noVotes;
  const yesPercentage = totalVotes > 0 ? (caseData.yesVotes / totalVotes) * 100 : 50;
  const noPercentage = totalVotes > 0 ? (caseData.noVotes / totalVotes) * 100 : 50;

  const isJudged = caseData.status === 'JUDGED';

  const handleVoteSelection = (side: "yes" | "no") => {
    const user = api.getCurrentUser();
    if (!user) {
      toast.error("Please connect wallet first");
      return;
    }
    setSelectedSide(side);
    toast.success(`You voted ${side.toUpperCase()}! Now like 3 arguments to continue.`);
  };

  const handleVoteForArgument = (argId: string) => {
    if (!selectedSide) {
      toast.error("Step 1: Please vote YES or NO first!");
      return;
    }

    if (votedArguments.includes(argId)) {
      setVotedArguments(votedArguments.filter(id => id !== argId));
      toast.info("Like removed");
      if (votedArguments.length - 1 < 3) {
        setHasLiked(false);
      }
    } else if (votedArguments.length < 3) {
      const newVotedArgs = [...votedArguments, argId];
      setVotedArguments(newVotedArgs);
      if (newVotedArgs.length === 3) {
        setHasLiked(true);
        toast.success("Great! Now write your argument to complete your vote.");
      } else {
        toast.success(`Liked! (${newVotedArgs.length}/3)`);
      }
    } else {
      toast.error("You can only like 3 arguments");
    }
  };

  const handleSubmitArgument = async () => {
    if (!selectedSide) {
      toast.error("Step 1: Please vote YES or NO first!");
      return;
    }
    // Validation relaxed for testing
    // if (!hasLiked) { toast.error("Step 2: Please like 3 arguments first!"); return; }
    if (userArgument.trim().length < 5) {
      toast.error("Argument is too short");
      return;
    }

    try {
      await api.vote(id!, selectedSide === 'yes' ? 'YES' : 'NO', userArgument);
      setHasWrittenArgument(true);
      setHasVoted(true);
      toast.success("Vote complete! Your argument has been submitted successfully!");
      setUserArgument("");
      queryClient.invalidateQueries({ queryKey: ['case', id] });
    } catch (e) {
      toast.error("Failed to submit vote");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/discover">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Discover
          </Button>
        </Link>

        {/* Case Header */}
        <Card className="p-8 mb-8 bg-background/95 backdrop-blur-sm
          border-2 border-border/60
          dark:border-primary/30
          shadow-[0_4px_20px_rgba(92,189,185,0.2),0_2px_8px_rgba(0,0,0,0.08)]
          dark:shadow-[0_6px_25px_rgba(225,179,130,0.2),0_3px_10px_rgba(225,179,130,0.15)]">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {caseData.hashtags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="bg-muted text-foreground border border-border/30">{tag}</Badge>
              ))}
              {isJudged && <Badge className="bg-primary text-primary-foreground">VERDICT ANNOUNCED</Badge>}
            </div>
            
            <h1 className="text-4xl font-bold text-foreground font-serif">{caseData.title}</h1>

            <p className="text-lg text-foreground/80 leading-relaxed">
              {caseData.context}
            </p>

            <div className="flex flex-wrap items-center justify-between pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                  <span className="text-3xl">{caseData.rewardPool}</span>
                  <span className="text-sm">tokens</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{isJudged ? "Ended" : caseData.timeRemaining}</span>
                </div>
              </div>

              {!isJudged && (
                <Button
                  variant="destructive"
                  size="lg"
                  className="gap-2"
                  onClick={() => verdictMutation.mutate()}
                  disabled={verdictMutation.isPending}
                >
                  <Scale className="w-5 h-5" />
                  {verdictMutation.isPending ? "consulting..." : "Trigger Verdict (AI)"}
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* VERDICT DISPLAY */}
        {isJudged && (
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Card className="p-8 border-primary/50 bg-card/95">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Scale className="w-8 h-8" />
                    <h2 className="text-2xl font-bold">Oracle Verdict</h2>
                  </div>
                  <h3 className="text-4xl font-black uppercase text-foreground">
                    {caseData.aiVerdict || "UNDECIDED"}
                  </h3>
                  <p className="text-lg leading-relaxed italic border-l-4 border-primary pl-4 py-2 bg-muted/30">
                    "{caseData.aiReasoning || "No reasoning provided."}"
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Main Duel Layout - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: YES Side */}
          <div className="space-y-4">
            <Button
              variant={selectedSide === "yes" ? "default" : "outline"}
              onClick={() => handleVoteSelection("yes")}
              disabled={hasVoted || isJudged}
              className="w-full bg-yes hover:bg-yes/90 text-yes-foreground py-6 text-lg font-bold disabled:opacity-50"
            >
              {selectedSide === "yes" ? "✓ I Voted YES" : "I Vote YES"}
            </Button>

            {/* Comment Section - Appears after completing steps 1 & 2 */}
            {selectedSide === "yes" && !hasVoted && !isJudged && (
              <Card className="p-4 bg-background/95 backdrop-blur-sm border-2 border-yes/30">
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  Share Your Reasoning
                </h4>
                <Textarea
                  placeholder="Explain why you voted YES (min 5 characters)..."
                  value={userArgument}
                  onChange={(e) => setUserArgument(e.target.value.slice(0, 300))}
                  className="min-h-[100px] mb-2 bg-background border-border"
                />
                <Button
                  onClick={handleSubmitArgument}
                  size="sm"
                  className="w-full bg-yes hover:bg-yes/90"
                  disabled={userArgument.length < 5}
                >
                  Submit Vote
                </Button>
              </Card>
            )}

            <div className="bg-muted/30 border border-border/50 rounded-xl p-4">
              <p className="text-sm font-semibold text-primary">
                Reward: Up to {Math.floor(caseData.rewardPool * 0.4)} tokens
              </p>
            </div>

            {caseArguments && caseArguments.yes && caseArguments.yes.slice(0, 3).map((arg: any) => (
              <Card key={arg.id} className="p-4 bg-background/95 backdrop-blur-sm border-2 border-border/60">
                <div className="space-y-3">
                  <p className="text-sm text-foreground leading-relaxed">{arg.content}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{arg.author}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={votedArguments.includes(arg.id) ? "default" : "outline"}
                        onClick={() => handleVoteForArgument(arg.id)}
                        className="gap-1 h-7 text-xs"
                        disabled={hasVoted || isJudged}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        {arg.votes}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* MIDDLE: Battle Stats */}
          <div className="flex flex-col justify-center">
            <Card className="p-8 relative overflow-hidden bg-background/95 backdrop-blur-sm
              border-2 border-primary/70 dark:border-destructive/70
              shadow-[0_8px_30px_rgba(92,189,185,0.5),0_4px_15px_rgba(239,68,68,0.35),0_0_80px_rgba(251,191,36,0.3),0_0_120px_rgba(239,68,68,0.25),0_0_160px_rgba(92,189,185,0.2)]
              dark:shadow-[0_12px_50px_rgba(255,100,0,0.65),0_8px_30px_rgba(255,69,0,0.5),0_0_120px_rgba(255,165,0,0.45),0_0_180px_rgba(255,69,0,0.35),0_0_220px_rgba(255,100,0,0.25)]">

              {/* Layered gradient effect backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 via-transparent to-amber-300/15 dark:from-orange-600/35 dark:via-transparent dark:to-yellow-500/25 animate-[pulse_3s_ease-in-out_infinite]" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/18 via-transparent to-transparent dark:from-red-500/30 dark:via-transparent dark:to-transparent animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
              <div className="absolute inset-0 bg-gradient-to-tl from-amber-500/15 via-transparent to-yellow-300/12 dark:from-orange-500/28 dark:via-transparent dark:to-red-600/25 animate-[pulse_5s_ease-in-out_infinite_1s]" />

              {/* Intense glow edges */}
              <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-amber-300/40 dark:from-orange-500/55 to-transparent blur-3xl" />
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-rose-300/40 dark:from-red-500/55 to-transparent blur-3xl" />
              <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-teal-300/35 dark:from-orange-500/50 to-transparent blur-3xl" />
              <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-pink-300/35 dark:from-red-500/50 to-transparent blur-3xl" />

              {/* Extra outer glow layers */}
              <div className="absolute -inset-4 bg-gradient-radial from-orange-400/18 via-red-400/10 to-transparent dark:from-orange-500/35 dark:via-red-500/25 dark:to-transparent blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
              <div className="absolute -inset-6 bg-gradient-radial from-yellow-400/15 via-rose-400/8 to-transparent dark:from-yellow-500/30 dark:via-rose-500/20 dark:to-transparent blur-3xl animate-[pulse_5s_ease-in-out_infinite_1.5s]" />
              <div className="absolute -inset-8 bg-gradient-radial from-cyan-400/12 via-amber-400/6 to-transparent dark:from-orange-400/25 dark:via-red-500/18 dark:to-transparent blur-3xl animate-[pulse_6s_ease-in-out_infinite_2s]" />

              <div className="relative z-10 space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-foreground font-serif mb-1 
                    drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)]
                    dark:drop-shadow-[0_2px_10px_rgba(239,68,68,0.6)]">
                    Battle Arena
                  </h2>
                  <p className="text-sm text-muted-foreground font-semibold">Live debate intensity</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-foreground">YES</span>
                      <span className="text-3xl font-bold text-yes-foreground drop-shadow-[0_2px_4px_rgba(92,189,185,0.5)]">
                        {yesPercentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-4 rounded-full overflow-hidden bg-muted border border-border/50 shadow-inner">
                      <div className="h-full bg-gradient-to-r from-yes to-yes/80 transition-all duration-500 shadow-lg"
                        style={{ width: `${yesPercentage}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground">{caseData.yesVotes} votes</p>
                  </div>

                  <div className="text-center py-2">
                    <span className="text-3xl font-bold text-foreground drop-shadow-lg">VS</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-foreground">NO</span>
                      <span className="text-3xl font-bold text-no-foreground drop-shadow-[0_2px_4px_rgba(239,68,68,0.5)]">
                        {noPercentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-4 rounded-full overflow-hidden bg-muted border border-border/50 shadow-inner">
                      <div className="h-full bg-gradient-to-l from-no to-no/80 transition-all duration-500 shadow-lg"
                        style={{ width: `${noPercentage}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground">{caseData.noVotes} votes</p>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground font-semibold">🎯 Total Warriors</p>
                  <p className="text-3xl font-bold text-foreground">{totalVotes}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT: NO Side */}
          <div className="space-y-4">
            <Button
              variant={selectedSide === "no" ? "default" : "outline"}
              onClick={() => handleVoteSelection("no")}
              disabled={hasVoted || isJudged}
              className="w-full bg-no hover:bg-no/90 text-no-foreground py-6 text-lg font-bold disabled:opacity-50"
            >
              {selectedSide === "no" ? "✓ I Voted NO" : "I Vote NO"}
            </Button>

            {selectedSide === "no" && !hasVoted && !isJudged && (
              <Card className="p-4 bg-background/95 backdrop-blur-sm border-2 border-no/30">
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  Share Your Reasoning
                </h4>
                <Textarea
                  placeholder="Explain why you voted NO (min 5 characters)..."
                  value={userArgument}
                  onChange={(e) => setUserArgument(e.target.value.slice(0, 300))}
                  className="min-h-[100px] mb-2 bg-background border-border"
                />
                <Button
                  onClick={handleSubmitArgument}
                  size="sm"
                  className="w-full bg-no hover:bg-no/90"
                  disabled={userArgument.length < 5}
                >
                  Submit Vote
                </Button>
              </Card>
            )}

            <div className="bg-muted/30 border border-border/50 rounded-xl p-4">
              <p className="text-sm font-semibold text-primary">
                Reward: Up to {Math.floor(caseData.rewardPool * 0.4)} tokens
              </p>
            </div>

            {caseArguments && caseArguments.no && caseArguments.no.slice(0, 3).map((arg: any) => (
              <Card key={arg.id} className="p-4 bg-background/95 backdrop-blur-sm border-2 border-border/60">
                <div className="space-y-3">
                  <p className="text-sm text-foreground leading-relaxed">{arg.content}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{arg.author}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={votedArguments.includes(arg.id) ? "default" : "outline"}
                        onClick={() => handleVoteForArgument(arg.id)}
                        className="gap-1 h-7 text-xs"
                        disabled={hasVoted || isJudged}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        {arg.votes}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;

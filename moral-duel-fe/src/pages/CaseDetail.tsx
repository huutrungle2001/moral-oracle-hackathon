import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, ArrowLeft, ThumbsUp, Sparkles, Scale, Trophy, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

const CaseDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  
  const [userArgument, setUserArgument] = useState("");
  const [selectedSide, setSelectedSide] = useState<"yes" | "no" | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  
  // Fetch Case Data
  const { data: cases } = useQuery({ queryKey: ['cases'], queryFn: api.getCases });
  const caseData = cases?.find(c => c.id === id);

  // Fetch Verdict (if judged)
  const { data: verdict } = useQuery({
    queryKey: ['verdict', id],
    queryFn: () => api.getVerdict(id!),
    enabled: !!caseData && caseData.status === 'JUDGED'
  });

  // Fetch Votes/Arguments
  const { data: votes } = useQuery({
    queryKey: ['votes', id],
    queryFn: () => api.getVotes(id!),
    enabled: !!id
  });

  const voteMutation = useMutation({
    mutationFn: (data: { side: 'YES' | 'NO', arg: string }) => api.vote(id!, data.side, data.arg),
    onSuccess: () => {
      toast.success("Vote cast successfully!");
      queryClient.invalidateQueries({ queryKey: ['votes', id] });
    }
  });

  const handleVoteSelection = (side: "yes" | "no") => {
    setSelectedSide(side);
    toast.success(`You selected ${side.toUpperCase()}! Now like 3 arguments to continue.`);
  };

  const handleSubmitArgument = () => {
    if (!selectedSide) return;
    if (userArgument.length < 20) {
        toast.error("Argument too short");
        return;
    }
    voteMutation.mutate({ side: selectedSide === 'yes' ? 'YES' : 'NO', arg: userArgument });
  };

  if (!caseData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading Case...</p>
        </div>
      </div>
    );
  }

  const isJudged = caseData.status === 'JUDGED';

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/discover">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Discover
          </Button>
        </Link>

        {/* Case Header */}
        <Card className="p-8 mb-8 bg-background/95 backdrop-blur-sm border-2 border-border/60">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    {caseData.hashtags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
                {isJudged && <Badge className="bg-primary text-primary-foreground">VERDICT ANNOUNCED</Badge>}
            </div>
            
            <h1 className="text-4xl font-bold font-serif">{caseData.title}</h1>
            <p className="text-lg text-muted-foreground">{caseData.context}</p>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-primary font-bold text-xl">
                <span className="text-3xl">{caseData.rewardPool}</span>
                <span className="text-sm">tokens</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{isJudged ? "Ended" : caseData.timeRemaining}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* VERDICT SECTION */}
        {isJudged && verdict && (
            <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 p-1 rounded-2xl">
                    <Card className="p-8 border-primary/50 bg-card/95">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <Scale className="w-8 h-8" />
                                    <h2 className="text-2xl font-bold">Oracle Verdict</h2>
                                </div>
                                <h3 className="text-4xl font-black uppercase text-foreground">
                                    {verdict.verdict}
                                </h3>
                                <p className="text-lg leading-relaxed italic border-l-4 border-primary pl-4 py-2 bg-muted/30">
                                    "{verdict.reasoning}"
                                </p>
                                <div className="flex gap-4 pt-4">
                                     <Button variant="outline" className="gap-2">
                                        <MessageSquare className="w-4 h-4" />
                                        View My Feedback
                                     </Button>
                                </div>
                            </div>
                            
                            <div className="w-full md:w-1/3 bg-muted/50 rounded-xl p-6">
                                <h4 className="font-bold flex items-center gap-2 mb-4">
                                    <Trophy className="w-5 h-5 text-amber-500" />
                                    Best Arguments
                                </h4>
                                <div className="space-y-4">
                                    {verdict.bestArguments.map((arg: any) => (
                                        <div key={arg.id} className="text-sm bg-background p-3 rounded border border-border/50">
                                            <p className="mb-2">"{arg.content}"</p>
                                            <div className="flex justify-between text-muted-foreground text-xs">
                                                <span>{arg.author}</span>
                                                <Badge variant="outline" className="text-[10px] h-5">Score: {arg.score}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )}

        {/* VOTING SECTION (Hidden if judged, or shown as read-only) */}
        {!isJudged && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* YES Side */}
                <Card className={`p-6 border-2 transition-all ${selectedSide === 'yes' ? 'border-yes ring-2 ring-yes/20' : 'border-dashed border-border'}`}>
                    <Button 
                        className={`w-full py-8 text-xl font-bold mb-6 ${selectedSide === 'yes' ? 'bg-yes hover:bg-yes/90' : 'bg-muted hover:bg-muted/80 text-foreground'}`}
                        onClick={() => handleVoteSelection('yes')}
                    >
                        Vote YES
                    </Button>
                    {selectedSide === 'yes' && (
                        <div className="space-y-4 animate-in fade-in">
                            <p className="text-sm text-center text-muted-foreground">Why do you agree?</p>
                            <Textarea 
                                placeholder="State your reasoning..." 
                                value={userArgument}
                                onChange={e => setUserArgument(e.target.value)}
                            />
                            <Button className="w-full" onClick={handleSubmitArgument}>Submit Staked Vote</Button>
                        </div>
                    )}
                </Card>

                {/* NO Side */}
                <Card className={`p-6 border-2 transition-all ${selectedSide === 'no' ? 'border-no ring-2 ring-no/20' : 'border-dashed border-border'}`}>
                    <Button 
                        className={`w-full py-8 text-xl font-bold mb-6 ${selectedSide === 'no' ? 'bg-no hover:bg-no/90' : 'bg-muted hover:bg-muted/80 text-foreground'}`}
                        onClick={() => handleVoteSelection('no')}
                    >
                        Vote NO
                    </Button>
                    {selectedSide === 'no' && (
                        <div className="space-y-4 animate-in fade-in">
                            <p className="text-sm text-center text-muted-foreground">Why do you disagree?</p>
                            <Textarea 
                                placeholder="State your reasoning..." 
                                value={userArgument}
                                onChange={e => setUserArgument(e.target.value)}
                            />
                            <Button className="w-full" onClick={handleSubmitArgument}>Submit Staked Vote</Button>
                        </div>
                    )}
                </Card>
            </div>
        )}
      </div>
    </div>
  );
};

export default CaseDetail;

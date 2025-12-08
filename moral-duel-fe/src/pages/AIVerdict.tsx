import { Link } from "react-router-dom";
import { ArrowLeft, Brain, Scale, TrendingUp, CheckCircle2, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const AIVerdict = () => {
  // Mock data for demonstration
  const verdict = {
    caseTitle: "Should social media companies be held liable for user-generated content?",
    decision: "yes", // "yes" or "no"
    confidence: 87,
    reasoning: [
      {
        title: "Legal Precedent",
        content: "Recent court rulings have established a pattern of holding platforms accountable when they fail to moderate harmful content effectively.",
        strength: 92
      },
      {
        title: "Ethical Considerations",
        content: "Companies profit from user engagement and thus bear responsibility for maintaining safe platforms. The harm from unchecked content outweighs freedom concerns.",
        strength: 85
      },
      {
        title: "Practical Implementation",
        content: "Modern AI and content moderation tools make it feasible for platforms to identify and remove harmful content at scale.",
        strength: 78
      }
    ],
    counterarguments: [
      {
        title: "Free Speech Concerns",
        content: "Imposing strict liability could lead to over-censorship as platforms err on the side of caution.",
        impact: "Medium"
      }
    ],
    summary: "Based on comprehensive analysis of legal precedents, ethical frameworks, and practical considerations, the evidence strongly supports holding social media companies liable for user-generated content. The combination of their profit model, available moderation technology, and social responsibility creates a clear case for accountability."
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <Link to="/discover">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Cases
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">AI Verdict Analysis</h1>
          </div>
          <p className="text-muted-foreground">Comprehensive AI-powered decision analysis</p>
        </div>

        {/* Case Title */}
        <Card className="p-6 mb-6 bg-background/95 backdrop-blur-sm border-2">
          <h2 className="text-xl font-semibold text-foreground mb-2">Case:</h2>
          <p className="text-lg text-foreground/90">{verdict.caseTitle}</p>
        </Card>

        {/* Verdict Decision */}
        <Card className={`p-8 mb-6 border-2 ${
          verdict.decision === "yes" 
            ? "bg-gradient-to-br from-yes/10 to-yes/5 border-yes/40" 
            : "bg-gradient-to-br from-no/10 to-no/5 border-no/40"
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {verdict.decision === "yes" ? (
                <CheckCircle2 className="w-12 h-12 text-yes" />
              ) : (
                <XCircle className="w-12 h-12 text-no" />
              )}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  Final Verdict: {verdict.decision.toUpperCase()}
                </h3>
                <p className="text-muted-foreground">AI Decision Confidence</p>
              </div>
            </div>
            <Badge variant="outline" className="text-2xl px-6 py-3 font-bold">
              {verdict.confidence}%
            </Badge>
          </div>
          <Progress value={verdict.confidence} className="h-3" />
        </Card>

        {/* Reasoning Analysis */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Supporting Analysis</h3>
          </div>
          <div className="space-y-4">
            {verdict.reasoning.map((reason, index) => (
              <Card key={index} className="p-6 bg-background/95 backdrop-blur-sm border">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-foreground">{reason.title}</h4>
                  <Badge variant="secondary" className="ml-4">
                    Strength: {reason.strength}%
                  </Badge>
                </div>
                <p className="text-foreground/80 mb-3">{reason.content}</p>
                <Progress value={reason.strength} className="h-2" />
              </Card>
            ))}
          </div>
        </div>

        {/* Counter Arguments */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Considered Counter-Arguments</h3>
          </div>
          <div className="space-y-4">
            {verdict.counterarguments.map((counter, index) => (
              <Card key={index} className="p-6 bg-muted/50 border">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-semibold text-foreground">{counter.title}</h4>
                  <Badge variant="outline">{counter.impact} Impact</Badge>
                </div>
                <p className="text-foreground/70">{counter.content}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="text-xl font-semibold text-foreground mb-3">Summary</h3>
          <p className="text-foreground/90 leading-relaxed">{verdict.summary}</p>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/discover">
            <Button size="lg" variant="outline">View More Cases</Button>
          </Link>
          <Button size="lg">Share Verdict</Button>
        </div>
      </div>
    </div>
  );
};

export default AIVerdict;

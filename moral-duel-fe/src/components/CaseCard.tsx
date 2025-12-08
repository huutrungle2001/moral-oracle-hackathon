import { Link } from "react-router-dom";
import { Clock, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Case } from "@/lib/api";

interface CaseCardProps {
  caseData: Case;
}

const CaseCard = ({ caseData }: CaseCardProps) => {
  const totalVotes = caseData.yesVotes + caseData.noVotes;
  const yesPercentage = totalVotes > 0 ? (caseData.yesVotes / totalVotes) * 100 : 50;
  const noPercentage = totalVotes > 0 ? (caseData.noVotes / totalVotes) * 100 : 50;

  return (
    <Link to={`/case/${caseData.id}`}>
      <Card className="p-4 h-full transition-all duration-300 hover:-translate-y-2 
        bg-background/95 backdrop-blur-sm
        border-2 border-border/60 hover:border-primary/50
        dark:border-primary/30 dark:hover:border-primary/50
        shadow-[0_4px_20px_rgba(92,189,185,0.2),0_2px_8px_rgba(0,0,0,0.08)]
        hover:shadow-[0_8px_30px_rgba(92,189,185,0.3),0_4px_12px_rgba(0,0,0,0.12)]
        dark:shadow-[0_6px_25px_rgba(225,179,130,0.2),0_3px_10px_rgba(225,179,130,0.15)]
        dark:hover:shadow-[0_12px_40px_rgba(225,179,130,0.3),0_6px_16px_rgba(225,179,130,0.2)]
        flex flex-col">
        <div className="space-y-3 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-foreground flex-1 leading-tight line-clamp-2">
              {caseData.title}
            </h3>
            {caseData.isTrending && (
              <Badge className="bg-primary/20 text-primary border border-primary/30 gap-1 whitespace-nowrap font-semibold text-xs">
                <TrendingUp className="w-3 h-3" />
                Trending
              </Badge>
            )}
          </div>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1.5">
            {caseData.hashtags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-muted text-foreground border border-border/30">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Context */}
          <p className="text-xs text-foreground/80 line-clamp-2 leading-relaxed flex-1">
            {caseData.context}
          </p>

          {/* Vote Stats */}
          <div className="space-y-1.5 bg-muted/30 p-2.5 rounded-lg">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-yes flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-yes" />
                YES {yesPercentage.toFixed(0)}%
              </span>
              <span className="text-no flex items-center gap-1">
                NO {noPercentage.toFixed(0)}%
                <span className="w-1.5 h-1.5 rounded-full bg-no" />
              </span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden bg-background border border-border/20 shadow-inner">
              <div
                className="bg-gradient-to-r from-yes to-yes/80 transition-all duration-500"
                style={{ width: `${yesPercentage}%` }}
              />
              <div
                className="bg-gradient-to-l from-no to-no/80 transition-all duration-500"
                style={{ width: `${noPercentage}%` }}
              />
            </div>
          </div>

          {/* Top Comments */}
          {caseData.topComments.length > 0 && (
            <div className="pt-2 border-t border-border/50 space-y-1.5 bg-card/30 -mx-1 px-1 py-1.5 rounded">
              {caseData.topComments.slice(0, 1).map((comment) => (
                <div key={comment.id} className="text-xs">
                  <p className="text-foreground italic line-clamp-2 leading-relaxed">
                    "{comment.content}"
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-xs text-muted-foreground font-medium">
                      — {comment.author}
                    </p>
                    <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                      👍 {comment.votes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50 mt-auto">
            <div className="flex items-center gap-1.5 text-primary font-bold">
              <span className="text-lg">{caseData.rewardPool}</span>
              <span className="text-xs">tokens</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{caseData.timeRemaining}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CaseCard;

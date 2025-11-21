import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar } from "lucide-react";

interface BizScoreEvolutionProps {
  currentScore: number;
  score6M: number;
  score12M: number;
  rating: string;
  color: string;
}

const BizScoreEvolution = ({ 
  currentScore, 
  score6M, 
  score12M, 
  rating,
  color 
}: BizScoreEvolutionProps) => {
  const getScoreChange = (futureScore: number) => {
    const diff = futureScore - currentScore;
    const sign = diff > 0 ? "+" : "";
    return `${sign}${diff}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 65) return "text-primary";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          BizScore Evolution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Current Score</span>
            <span className={`text-3xl font-bold ${getScoreColor(currentScore)}`}>
              {currentScore}
            </span>
          </div>
          <Progress value={currentScore} className="h-3" />
          <p className="text-xs text-muted-foreground text-center">
            Rating: <span className="font-semibold text-foreground">{rating}</span>
          </p>
        </div>

        {/* 6 Month Projection */}
        <div className="space-y-2 p-4 bg-card/50 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">6 Months</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${getScoreColor(score6M)}`}>
                {score6M}
              </span>
              <span className={`text-sm ${score6M > currentScore ? 'text-success' : 'text-destructive'}`}>
                ({getScoreChange(score6M)})
              </span>
            </div>
          </div>
          <Progress value={score6M} className="h-2" />
        </div>

        {/* 12 Month Projection */}
        <div className="space-y-2 p-4 bg-card/50 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">12 Months</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${getScoreColor(score12M)}`}>
                {score12M}
              </span>
              <span className={`text-sm ${score12M > currentScore ? 'text-success' : 'text-destructive'}`}>
                ({getScoreChange(score12M)})
              </span>
            </div>
          </div>
          <Progress value={score12M} className="h-2" />
        </div>

        {/* Projection Summary */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-center text-muted-foreground">
            {score12M > currentScore + 10 ? (
              <span className="text-success font-semibold">Strong upward trajectory expected</span>
            ) : score12M < currentScore - 10 ? (
              <span className="text-destructive font-semibold">Declining trend projected</span>
            ) : (
              <span className="text-warning font-semibold">Relatively stable outlook</span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BizScoreEvolution;

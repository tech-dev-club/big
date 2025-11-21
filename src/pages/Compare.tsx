import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { ArrowLeft, Trophy } from "lucide-react";
import { calculateDecisionMatrix } from "@/lib/decisionMatrix";
import { FeasibilityReport } from "@/lib/reportBuilder";

const Compare = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [reports, setReports] = useState<FeasibilityReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [comparisonResult, setComparisonResult] = useState<any>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadComparison();
    }
  }, [user, searchParams]);

  const loadComparison = async () => {
    const ids = searchParams.get("ids")?.split(",") || [];
    if (ids.length < 2) {
      toast.error("Select at least 2 ideas to compare");
      navigate("/saved");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("saved_ideas")
        .select("*")
        .in("id", ids);

      if (error) throw error;

      // Convert saved ideas to FeasibilityReport format for decision matrix
      const reportsData: FeasibilityReport[] = (data || []).map((idea: any) => ({
        id: idea.id,
        timestamp: new Date(idea.created_at).getTime(),
        location: idea.location,
        coordinates: idea.coordinates,
        category: idea.category,
        demandIndex: idea.demand_index,
        competitionIndex: 100 - idea.demand_index,
        competitionDensity: idea.competition_density,
        populationDensity: 3000,
        categoryDifficulty: "Moderate",
        bizScoreToday: idea.biz_score_today,
        bizScore6M: (idea.biz_score_today + idea.biz_score_12m) / 2,
        bizScore12M: idea.biz_score_12m,
        forecastGrowth: idea.forecast_growth,
        trendDirection: idea.forecast_growth > 1.1 ? "growing" : "stable",
        strategicOpportunityIndex: 70,
        nearestCompetitors: [],
        swot: idea.swot || { strengths: [], weaknesses: [], opportunities: [], threats: [] },
        financials: idea.financials,
        recommendation: idea.recommendation || { type: "start-caution", label: "Start with Caution" },
      }));

      setReports(reportsData);

      if (reportsData.length >= 2) {
        const result = calculateDecisionMatrix(reportsData);
        setComparisonResult(result);
      }
    } catch (error: any) {
      toast.error("Failed to load comparison: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => navigate("/saved")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Saved Ideas
        </Button>

        <h1 className="text-4xl font-bold mb-8">Comparison Dashboard</h1>

        {comparisonResult && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  Top Choice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold">{comparisonResult.topChoice.location}</h3>
                    <p className="text-muted-foreground">{comparisonResult.topChoice.category}</p>
                  </div>
                  <Badge className="text-lg px-4 py-2">
                    Score: {comparisonResult.topChoice.score}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisonResult.ranking.map((item: any, index: number) => (
                <Card key={item.id} className={index === 0 ? "border-primary" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>#{item.rank} {item.location}</CardTitle>
                      <Badge>{item.score}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium text-sm mb-1">Strengths:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {item.strengths.map((s: string, i: number) => (
                          <li key={i}>• {s}</li>
                        ))}
                      </ul>
                    </div>
                    {item.concerns.length > 0 && (
                      <div>
                        <p className="font-medium text-sm mb-1">Concerns:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {item.concerns.map((c: string, i: number) => (
                            <li key={i}>• {c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  MapPin, 
  Users, 
  DollarSign, 
  Target,
  Sparkles,
  ChevronRight 
} from "lucide-react";
import { OpportunityData } from "@/services/marketData";
import ForecastPanel from "./ForecastPanel";
import TrendCharts from "./TrendCharts";
import BizScoreEvolution from "./BizScoreEvolution";
import CompetitorPanel from "./CompetitorPanel";
import CategoryIntelligenceCard from "./CategoryIntelligenceCard";
import { ForecastData } from "@/services/forecastEngine";
import { TrendData } from "@/services/trendSimulator";
import { CompetitionAnalysis } from "@/services/competitionScanner";
import { CategoryIntelligence } from "@/lib/categoryEngine";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OpportunityCardEnhancedProps {
  opportunity: OpportunityData;
  location: string;
  forecast: ForecastData;
  trendData: TrendData;
  scoreRating: {
    rating: string;
    color: string;
    description: string;
  };
  category: string;
  populationDensity: number;
  competitionAnalysis: CompetitionAnalysis;
  categoryIntelligence: CategoryIntelligence;
  opportunityType: string;
  index: number; // Add index for staggered loading
}

const OpportunityCardEnhanced = ({ 
  opportunity, 
  location, 
  forecast,
  trendData,
  scoreRating,
  category,
  populationDensity,
  competitionAnalysis,
  categoryIntelligence,
  opportunityType,
  index
}: OpportunityCardEnhancedProps) => {
  const [aiInsight, setAiInsight] = useState<string>("");
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Add staggered delay to prevent all opportunities from loading insights simultaneously
    // This helps avoid rate limiting issues
    const delay = index * 800; // 800ms between each request
    const timer = setTimeout(() => {
      loadAiInsights();
    }, delay);

    return () => clearTimeout(timer);
  }, [opportunity.id, index]);

  const loadAiInsights = async () => {
    setIsLoadingInsight(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-insights', {
        body: {
          demandIndex: opportunity.demandIndex,
          competitionIndex: opportunity.competitionCount,
          forecastGrowth: forecast.growthRate,
          populationDensity,
          bizScoreToday: opportunity.bizScore,
          bizScore12M: forecast.bizScore12M,
          trendDirection: forecast.trendDirection,
          category,
          title: opportunity.title,
          competitionDensity: competitionAnalysis.competitionDensity,
          competitorCount: competitionAnalysis.totalCount,
          categoryDifficulty: categoryIntelligence.difficulty,
          opportunityType
        }
      });

      if (error) throw error;
      
      // Check if the response contains user-friendly error message
      if (data?.userFriendly && data?.error) {
        setAiInsight(data.insight);
      } else {
        setAiInsight(data.insight);
      }
    } catch (error) {
      console.error("Failed to load AI insights:", error);
      
      // More specific error messages
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      let userMessage = "AI insights temporarily unavailable. Please check the metrics above for detailed analysis.";
      let toastTitle = "Insight Generation Failed";
      
      if (errorMessage.includes("429") || errorMessage.includes("rate limit")) {
        userMessage = "⏳ Too many requests. The AI service is rate limited. Please wait a moment and refresh to try again.";
        toastTitle = "Rate Limit Reached";
      } else if (errorMessage.includes("402") || errorMessage.includes("credit")) {
        userMessage = "💳 AI credits exhausted. Please add credits to your workspace to continue.";
        toastTitle = "Credits Required";
      }
      
      toast({
        title: toastTitle,
        description: userMessage,
        variant: "destructive"
      });
      setAiInsight(userMessage);
    } finally {
      setIsLoadingInsight(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 65) return "text-primary";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getDemandVariant = (competition: string) => {
    if (competition === "High") return "destructive";
    if (competition === "Medium") return "secondary";
    return "default";
  };

  return (
    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
            {opportunity.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant={getDemandVariant(opportunity.competition)}>
              Competition: {opportunity.competition}
            </Badge>
            <Badge variant="outline">
              {opportunity.competitionCount} competitors
            </Badge>
            <Badge variant="secondary" className="bg-success/20 text-success border-success/50">
              <TrendingUp className="w-3 h-3 mr-1" />
              {opportunity.growthRate}
            </Badge>
          </div>
        </div>
        <div className="text-right ml-4">
          <div className={`text-4xl font-bold ${getScoreColor(opportunity.bizScore)}`}>
            {opportunity.bizScore}
          </div>
          <div className="text-xs text-muted-foreground mb-1">BizScore</div>
          <Badge variant="outline">{scoreRating.rating}</Badge>
        </div>
      </div>

      {/* Tabs for Different Views */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="competition">Competition</TabsTrigger>
          <TabsTrigger value="category">Category</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Investment</span>
              </div>
              <p className="text-lg font-semibold">{opportunity.investmentRange}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">Profit Potential</span>
              </div>
              <Badge variant={opportunity.profitPotential === "High" ? "default" : "secondary"}>
                {opportunity.profitPotential}
              </Badge>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Demand Index</span>
              </div>
              <p className="text-lg font-semibold">{opportunity.demandIndex}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">Category</span>
              </div>
              <p className="text-sm font-semibold">{opportunity.category}</p>
            </div>
          </div>
          
          <BizScoreEvolution 
            currentScore={opportunity.bizScore}
            score6M={forecast.bizScore6M}
            score12M={forecast.bizScore12M}
            rating={scoreRating.rating}
            color={scoreRating.color}
          />
        </TabsContent>

        {/* Forecast Tab */}
        <TabsContent value="forecast">
          <ForecastPanel 
            forecast={forecast}
            currentBizScore={opportunity.bizScore}
          />
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends">
          <TrendCharts trendData={trendData} />
        </TabsContent>

        {/* Competition Tab */}
        <TabsContent value="competition">
          <CompetitorPanel analysis={competitionAnalysis} />
        </TabsContent>

        {/* Category Tab */}
        <TabsContent value="category">
          <CategoryIntelligenceCard intelligence={categoryIntelligence} />
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI-Powered Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingInsight ? (
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded"></div>
                  <div className="h-4 bg-muted animate-pulse rounded w-5/6"></div>
                  <div className="h-4 bg-muted animate-pulse rounded w-4/6"></div>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-foreground whitespace-pre-line">
                    {aiInsight}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Button */}
      <div className="mt-6">
        <Link 
          to={`/feasibility-report?city=${encodeURIComponent(location)}&title=${encodeURIComponent(opportunity.title)}&category=${category}&score=${opportunity.bizScore}`}
        >
          <Button 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            View Complete Feasibility Report
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default OpportunityCardEnhanced;

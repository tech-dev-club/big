import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import MapView from "@/components/MapView";
import { 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Clock,
  ArrowLeft,
  Download,
  CheckCircle2,
  XCircle,
  Target,
  BarChart3,
} from "lucide-react";
import { generateMarketData, OpportunityData } from "@/services/marketData";
import { calculateBizScore, getScoreRating } from "@/services/scoring";
import { generateFeasibilitySummary } from "@/services/ai";
import { getCityCoordinates } from "@/services/geocoding";

const FeasibilityReport = () => {
  const [searchParams] = useSearchParams();
  const [opportunity, setOpportunity] = useState<OpportunityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Parse URL parameters
    const city = searchParams.get("city") || "Mumbai";
    const title = searchParams.get("title") || "Business Opportunity";
    const category = searchParams.get("category") || "technology";
    const score = parseInt(searchParams.get("score") || "75");

    // Generate detailed analysis
    const cityData = getCityCoordinates(city);
    const marketData = generateMarketData(city, cityData?.population);
    
    // Calculate BizScore with proper parameters
    const scoreBreakdown = calculateBizScore(
      marketData,
      category,
      0.12, // Default forecast growth
      50,   // Default competition density
      65    // Default category ease
    );
    
    const feasibility = generateFeasibilitySummary(title, city, marketData, scoreBreakdown);

    setOpportunity({
      id: "1",
      title,
      category,
      demandIndex: marketData.demandIndex,
      competition: marketData.competitionIndex > 70 ? "High" : marketData.competitionIndex > 40 ? "Medium" : "Low",
      competitionCount: marketData.competitionCount,
      growthRate: "+32%",
      investmentRange: "₹15L - ₹40L",
      bizScore: score,
      profitPotential: score > 75 ? "High" : "Medium",
    });

    setLoading(false);
  }, [searchParams]);

  if (loading || !opportunity) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading report...</div>
        </div>
      </div>
    );
  }

  const city = searchParams.get("city") || "Mumbai";
  const category = searchParams.get("category") || "technology";
  const cityData = getCityCoordinates(city);
  const marketData = generateMarketData(city, cityData?.population);
  
  // Calculate BizScore with proper parameters
  const scoreBreakdown = calculateBizScore(
    marketData,
    category,
    0.12, // Default forecast growth
    50,   // Default competition density
    65    // Default category ease
  );
  
  const feasibility = generateFeasibilitySummary(opportunity.title, city, marketData, scoreBreakdown);
  const scoreRating = getScoreRating(opportunity.bizScore);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link to="/opportunities">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Opportunities
              </Button>
            </Link>
            
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {opportunity.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  Feasibility Report for {city}, India
                </p>
              </div>
              <Button variant="outline" className="hidden md:flex">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* BizScore Hero Card */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="text-6xl font-bold mb-2" style={{ color: `hsl(var(--${scoreRating.color}))` }}>
                  {opportunity.bizScore}
                </div>
                <div className="text-sm text-muted-foreground mb-1">BizScore</div>
                <Badge variant="outline" className="text-base">
                  {scoreRating.rating}
                </Badge>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Demand</span>
                    <span className="font-semibold">{scoreBreakdown.demandScore}/100</span>
                  </div>
                  <Progress value={scoreBreakdown.demandScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Competition</span>
                    <span className="font-semibold">{scoreBreakdown.competitionScore}/100</span>
                  </div>
                  <Progress value={scoreBreakdown.competitionScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Location</span>
                    <span className="font-semibold">{scoreBreakdown.locationScore}/100</span>
                  </div>
                  <Progress value={scoreBreakdown.locationScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Economic</span>
                    <span className="font-semibold">{scoreBreakdown.economicScore}/100</span>
                  </div>
                  <Progress value={scoreBreakdown.economicScore} className="h-2" />
                </div>
              </div>
            </div>
          </Card>

          {/* AI Summary */}
          <Card className="p-6 mb-8 bg-card border-border">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">AI Feasibility Assessment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {feasibility.shortSummary}
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Key Insights */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Key Market Insights</h3>
              </div>
              <ul className="space-y-3">
                {feasibility.keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{insight}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Recommendations */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-5 h-5 text-warning" />
                <h3 className="text-lg font-semibold">Recommendations</h3>
              </div>
              <ul className="space-y-3">
                {feasibility.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Risks & Timeline */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <h3 className="text-lg font-semibold">Potential Risks</h3>
              </div>
              <ul className="space-y-3">
                {feasibility.risks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{risk}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-semibold">Timeline Estimate</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                {feasibility.timeline}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investment Range:</span>
                  <span className="font-semibold">{opportunity.investmentRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit Potential:</span>
                  <Badge variant={opportunity.profitPotential === "High" ? "default" : "secondary"}>
                    {opportunity.profitPotential}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Growth Rate:</span>
                  <span className="font-semibold text-success">{opportunity.growthRate}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Location Map */}
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">Location Analysis</h3>
            {cityData && (
              <MapView 
                center={[cityData.lng, cityData.lat]} 
                zoom={12}
                demandIndex={marketData.demandIndex}
              />
            )}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Population Density</div>
                <div className="font-semibold">{marketData.populationDensity.toLocaleString()}/km²</div>
              </div>
              <div>
                <div className="text-muted-foreground">Avg. Income</div>
                <div className="font-semibold">₹{marketData.avgIncome}L</div>
              </div>
              <div>
                <div className="text-muted-foreground">Internet Penetration</div>
                <div className="font-semibold">{marketData.internetPenetration}%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Literacy Rate</div>
                <div className="font-semibold">{marketData.literacyRate}%</div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FeasibilityReport;

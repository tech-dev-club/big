import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DollarSign,
  TrendingDown,
  Shield,
  Zap
} from "lucide-react";
import { generateMarketData, OpportunityData } from "@/services/marketData";
import { calculateBizScore, getScoreRating } from "@/services/scoring";
import { generateFeasibilitySummary } from "@/services/ai";
import { getCityCoordinates } from "@/services/geocoding";
import { generateSWOT } from "@/lib/swotEngine";
import { generateFinancialProjection, formatCurrency } from "@/lib/financeEngine";
import { generateRecommendation } from "@/lib/recommendationEngine";
import { getCategoryIntelligence } from "@/lib/categoryEngine";

const FeasibilityReport = () => {
  const [searchParams] = useSearchParams();
  const [opportunity, setOpportunity] = useState<OpportunityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Parse URL parameters
    const city = searchParams.get("city") || "Mumbai";
    const title = searchParams.get("title") || "Business Opportunity";
    const category = searchParams.get("category") || "Cafe";
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
  const category = searchParams.get("category") || "Cafe";
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

  // V4 Engine Integration
  const categoryIntel = getCategoryIntelligence(category);
  const competitionDensity = opportunity.competition === "High" ? "High" : 
                            opportunity.competition === "Medium" ? "Balanced" : "Low";
  
  const swotAnalysis = generateSWOT({
    demandIndex: opportunity.demandIndex,
    competitionDensity: competitionDensity as any,
    categoryDifficulty: categoryIntel.difficulty as any,
    forecastGrowth: 1.12,
    populationDensity: marketData.populationDensity,
    bizScoreToday: opportunity.bizScore,
    bizScore12M: opportunity.bizScore + 8,
    strategicOpportunityIndex: 65,
  });

  const financialProjection = generateFinancialProjection({
    category,
    demandIndex: opportunity.demandIndex,
    competitionDensity: competitionDensity as any,
    populationDensity: marketData.populationDensity,
    forecastGrowth: 1.12,
  });

  const recommendation = generateRecommendation({
    bizScoreToday: opportunity.bizScore,
    bizScore12M: opportunity.bizScore + 8,
    competitionDensity: competitionDensity as any,
    categoryDifficulty: categoryIntel.difficulty as any,
    swot: swotAnalysis,
    financials: financialProjection,
    forecastGrowth: 1.12,
  });

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

          {/* Recommendation Card */}
          <Card className={`p-6 mb-8 border-2 ${
            recommendation.type === 'start-now' ? 'border-success bg-success/5' :
            recommendation.type === 'start-caution' ? 'border-warning bg-warning/5' :
            recommendation.type === 'wait-monitor' ? 'border-secondary bg-secondary/5' :
            'border-destructive bg-destructive/5'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                recommendation.type === 'start-now' ? 'bg-success/20' :
                recommendation.type === 'start-caution' ? 'bg-warning/20' :
                recommendation.type === 'wait-monitor' ? 'bg-secondary/20' :
                'bg-destructive/20'
              }`}>
                {recommendation.type === 'start-now' ? <CheckCircle2 className="w-6 h-6 text-success" /> :
                 recommendation.type === 'start-caution' ? <Shield className="w-6 h-6 text-warning" /> :
                 recommendation.type === 'wait-monitor' ? <Clock className="w-6 h-6 text-secondary" /> :
                 <XCircle className="w-6 h-6 text-destructive" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{recommendation.label}</h3>
                  <Badge variant="outline">{recommendation.confidence}% Confidence</Badge>
                  <Badge variant={
                    recommendation.riskLevel === 'Low' ? 'default' :
                    recommendation.riskLevel === 'Medium' ? 'secondary' : 'destructive'
                  }>
                    {recommendation.riskLevel} Risk
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{recommendation.timeframe}</p>
                <div className="space-y-2">
                  {recommendation.reasoning.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="financial" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="swot">SWOT</TabsTrigger>
              <TabsTrigger value="actions">Action Plan</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
            </TabsList>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Setup Cost</h4>
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    {formatCurrency(financialProjection.setupCost.min)} - {formatCurrency(financialProjection.setupCost.max)}
                  </div>
                  <p className="text-xs text-muted-foreground">Initial investment required</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-success" />
                    <h4 className="font-semibold">Monthly Revenue</h4>
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    {formatCurrency(financialProjection.expectedMonthlyRevenue.min)} - {formatCurrency(financialProjection.expectedMonthlyRevenue.max)}
                  </div>
                  <p className="text-xs text-muted-foreground">Expected monthly income</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-secondary" />
                    <h4 className="font-semibold">Break-Even</h4>
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    {financialProjection.breakEvenMonths} months
                  </div>
                  <p className="text-xs text-muted-foreground">Time to profitability</p>
                </Card>
              </div>

              <Card className="p-6">
                <h4 className="font-semibold mb-4">Financial Projections</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Year 1</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Revenue:</span>
                        <span className="font-semibold">
                          {formatCurrency(financialProjection.projections.year1.revenue.min)} - {formatCurrency(financialProjection.projections.year1.revenue.max)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Profit:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(financialProjection.projections.year1.profit.min)} - {formatCurrency(financialProjection.projections.year1.profit.max)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Year 3</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Revenue:</span>
                        <span className="font-semibold">
                          {formatCurrency(financialProjection.projections.year3.revenue.min)} - {formatCurrency(financialProjection.projections.year3.revenue.max)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Profit:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(financialProjection.projections.year3.profit.min)} - {formatCurrency(financialProjection.projections.year3.profit.max)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Profit Margin</span>
                    <span className="font-semibold">{financialProjection.profitMargin.min}% - {financialProjection.profitMargin.max}%</span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* SWOT Tab */}
            <TabsContent value="swot" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-success/5 border-success/20">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <h4 className="font-semibold">Strengths</h4>
                  </div>
                  <ul className="space-y-2">
                    {swotAnalysis.strengths.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-success mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6 bg-destructive/5 border-destructive/20">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                    <h4 className="font-semibold">Weaknesses</h4>
                  </div>
                  <ul className="space-y-2">
                    {swotAnalysis.weaknesses.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-destructive mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">Opportunities</h4>
                  </div>
                  <ul className="space-y-2">
                    {swotAnalysis.opportunities.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6 bg-warning/5 border-warning/20">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <h4 className="font-semibold">Threats</h4>
                  </div>
                  <ul className="space-y-2">
                    {swotAnalysis.threats.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-warning mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </TabsContent>

            {/* Action Plan Tab */}
            <TabsContent value="actions">
              <Card className="p-6">
                <h4 className="font-semibold mb-4">Recommended Action Steps</h4>
                <div className="space-y-3">
                  {recommendation.actionSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Market Tab */}
            <TabsContent value="market" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default FeasibilityReport;

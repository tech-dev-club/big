import { MarketData } from "./marketData";
import { BizScoreBreakdown } from "./scoring";

export interface FeasibilitySummary {
  shortSummary: string;
  keyInsights: string[];
  recommendations: string[];
  risks: string[];
  timeline: string;
}

/**
 * Generate AI-powered feasibility summary
 * In production, this would call an LLM API (OpenAI, Anthropic, etc.)
 * For now, using template-based intelligent generation
 */
export const generateFeasibilitySummary = (
  businessTitle: string,
  cityName: string,
  marketData: MarketData,
  scoreBreakdown: BizScoreBreakdown
): FeasibilitySummary => {
  const { overall, demandScore, competitionScore, economicScore } = scoreBreakdown;
  
  // Determine market condition
  const demandLevel = demandScore > 70 ? "high" : demandScore > 50 ? "moderate" : "low";
  const competitionLevel = competitionScore > 70 ? "favorable" : competitionScore > 50 ? "moderate" : "challenging";
  const economicLevel = economicScore > 70 ? "strong" : economicScore > 50 ? "adequate" : "limited";
  
  // Generate short summary
  const summaryTemplates = {
    high: `The ${businessTitle} opportunity in ${cityName} shows strong potential with ${demandLevel} demand and ${competitionLevel} competitive landscape. Market conditions are ${overall > 70 ? "highly favorable" : "promising"} for entry.`,
    moderate: `${businessTitle} in ${cityName} presents a viable opportunity with ${demandLevel} demand. The ${competitionLevel} competition requires strategic differentiation to succeed.`,
    low: `${businessTitle} in ${cityName} faces challenges with ${demandLevel} demand and ${competitionLevel} competitive environment. Success would require innovative approaches and strong execution.`,
  };
  
  const shortSummary = overall > 65 ? summaryTemplates.high : overall > 50 ? summaryTemplates.moderate : summaryTemplates.low;
  
  // Generate key insights
  const keyInsights = [];
  
  if (demandScore > 65) {
    keyInsights.push(`Market demand is strong at ${demandScore}/100, indicating healthy consumer interest`);
  } else if (demandScore < 50) {
    keyInsights.push(`Lower demand score (${demandScore}/100) suggests need for aggressive marketing`);
  }
  
  if (competitionScore > 65) {
    keyInsights.push(`Competition is manageable with entry opportunities available`);
  } else if (competitionScore < 50) {
    keyInsights.push(`High competition (${marketData.competitionCount}+ players) requires unique positioning`);
  }
  
  if (marketData.populationDensity > 8000) {
    keyInsights.push(`Dense urban setting with population density of ${marketData.populationDensity.toLocaleString()}/km² provides good foot traffic`);
  }
  
  if (marketData.avgIncome > 5) {
    keyInsights.push(`Above-average income levels (₹${marketData.avgIncome}L) support premium offerings`);
  }
  
  if (marketData.internetPenetration > 70) {
    keyInsights.push(`Strong digital infrastructure (${marketData.internetPenetration}% internet penetration) enables online growth`);
  }
  
  // Generate recommendations
  const recommendations = [];
  
  if (overall > 70) {
    recommendations.push("Fast-track market entry to capitalize on strong opportunity");
    recommendations.push("Focus on quality and customer experience to build brand loyalty");
  } else if (overall > 50) {
    recommendations.push("Conduct detailed competitor analysis before launch");
    recommendations.push("Start with MVP approach to test market response");
  } else {
    recommendations.push("Consider pivoting to underserved niche within this category");
    recommendations.push("Build strong online presence to differentiate from competitors");
  }
  
  if (competitionScore < 60) {
    recommendations.push("Develop unique value proposition to stand out from competitors");
  }
  
  if (marketData.internetPenetration > 70) {
    recommendations.push("Leverage digital marketing and online channels for customer acquisition");
  }
  
  recommendations.push("Network with local business community and chambers of commerce");
  
  // Identify risks
  const risks = [];
  
  if (competitionScore < 50) {
    risks.push(`Market saturation: ${marketData.competitionCount}+ existing competitors`);
  }
  
  if (demandScore < 50) {
    risks.push("Low demand may result in longer customer acquisition cycle");
  }
  
  if (marketData.avgIncome < 4) {
    risks.push("Price sensitivity due to moderate income levels");
  }
  
  if (economicScore < 50) {
    risks.push("Economic conditions may limit spending on non-essential categories");
  }
  
  risks.push("Regulatory compliance and local business licensing requirements");
  risks.push("Initial customer acquisition costs in competitive market");
  
  // Estimate timeline
  const timeline = overall > 70 
    ? "3-6 months to launch, 6-12 months to profitability"
    : overall > 50
    ? "4-8 months to launch, 12-18 months to profitability"
    : "6-12 months to launch, 18-24 months to profitability";
  
  return {
    shortSummary,
    keyInsights: keyInsights.slice(0, 5),
    recommendations: recommendations.slice(0, 5),
    risks: risks.slice(0, 5),
    timeline,
  };
};

/**
 * Generate market analysis prompt for LLM
 * Use this to call actual LLM API in production
 */
export const generateLLMPrompt = (
  businessTitle: string,
  cityName: string,
  marketData: MarketData,
  scoreBreakdown: BizScoreBreakdown
): string => {
  return `Analyze the business opportunity for "${businessTitle}" in ${cityName}, India.

Market Data:
- Demand Index: ${marketData.demandIndex}/100
- Competition: ${marketData.competitionCount} existing businesses
- Competition Index: ${marketData.competitionIndex}/100
- Population Density: ${marketData.populationDensity}/km²
- Average Income: ₹${marketData.avgIncome} Lakhs
- Internet Penetration: ${marketData.internetPenetration}%
- Literacy Rate: ${marketData.literacyRate}%

BizScore Analysis:
- Overall Score: ${scoreBreakdown.overall}/100
- Demand Score: ${scoreBreakdown.demandScore}/100
- Competition Score: ${scoreBreakdown.competitionScore}/100
- Location Score: ${scoreBreakdown.locationScore}/100
- Economic Score: ${scoreBreakdown.economicScore}/100

Provide:
1. A concise feasibility assessment (2-3 sentences)
2. 3-5 key insights about market conditions
3. 3-5 actionable recommendations
4. 3-5 potential risks
5. Estimated timeline to launch and profitability

Focus on practical, India-specific insights considering local market dynamics.`;
};

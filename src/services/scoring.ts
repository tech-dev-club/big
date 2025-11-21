/**
 * BizScore 3.0 - Competition-Aware Scoring System
 * Enhanced scoring model with category intelligence and strategic opportunity analysis
 */

import { MarketData } from "./marketData";
import { BUSINESS_CATEGORIES } from "@/lib/constants";

export interface BizScoreBreakdown {
  overall: number;
  demandScore: number;
  competitionScore: number;
  locationScore: number;
  economicScore: number;
  categoryEaseScore: number;
  strategicOpportunityScore: number;
  opportunityType: "Blue Ocean" | "Moderate Opportunity" | "Competitive but Doable" | "Avoid Zone";
  factors: Array<{
    name: string;
    impact: "positive" | "negative" | "neutral";
    description: string;
  }>;
}

/**
 * Get annual growth rate for category
 */
function getAnnualGrowthRate(category: string): number {
  const growthRates: Record<string, number> = {
    "food-beverage": 0.15,
    "retail": 0.10,
    "technology": 0.25,
    "education": 0.18,
    "health-wellness": 0.20,
    "services": 0.12,
    "entertainment": 0.14,
    "hospitality": 0.16,
  };
  return growthRates[category] || 0.12;
}

/**
 * Calculate BizScore 3.0 using competition-aware formula:
 * 35% demand + 20% forecast growth + 15% population density + 
 * 10% competition penalty + 10% category ease + 10% strategic opportunity
 */
export const calculateBizScore = (
  marketData: MarketData,
  category: string = "general",
  forecastGrowth: number = 0,
  competitionDensityScore: number = 50, // 0-100, higher = more saturated
  categoryEaseScore: number = 65 // 0-100, higher = easier
): BizScoreBreakdown => {
  // Normalize population density (assume max 20000/sq km for scaling)
  const normalizedDensity = Math.min(100, (marketData.populationDensity / 20000) * 100);
  
  // Get category-specific growth rate
  const growthRate = getAnnualGrowthRate(category);
  const growthPercentage = (forecastGrowth || growthRate) * 100;
  
  // Competition penalty (inverse of density score)
  const competitionPenalty = Math.max(0, 100 - competitionDensityScore);
  
  // Strategic opportunity index (high demand - low competition = high opportunity)
  const strategicOpportunityIndex = Math.max(0, marketData.demandIndex - competitionDensityScore);
  
  // BizScore 3.0 Components
  const demandComponent = marketData.demandIndex * 0.35;
  const growthComponent = growthPercentage * 0.20;
  const densityComponent = normalizedDensity * 0.15;
  const competitionComponent = competitionPenalty * 0.10;
  const categoryComponent = categoryEaseScore * 0.10;
  const strategicComponent = strategicOpportunityIndex * 0.10;
  
  // Total score (BizScore 3.0)
  const overall = Math.round(
    Math.min(100, Math.max(0,
      demandComponent + growthComponent + densityComponent + 
      competitionComponent + categoryComponent + strategicComponent
    ))
  );
  
  // Calculate individual scores
  const demandScore = Math.round(marketData.demandIndex);
  const competitionScore = Math.round(competitionPenalty);
  const locationScore = Math.round(normalizedDensity);
  const economicScore = Math.round(
    (marketData.avgIncome / 10) * 33 + 
    (marketData.internetPenetration) * 0.33 + 
    (marketData.literacyRate) * 0.33
  );
  
  // Determine opportunity type
  const opportunityType = determineOpportunityType(
    overall,
    competitionDensityScore,
    marketData.demandIndex
  );
  
  // Determine impact factors
  const factors = generateImpactFactors(
    marketData,
    competitionDensityScore,
    categoryEaseScore,
    strategicOpportunityIndex
  );
  
  return {
    overall,
    demandScore,
    competitionScore,
    locationScore,
    economicScore,
    categoryEaseScore: Math.round(categoryEaseScore),
    strategicOpportunityScore: Math.round(strategicOpportunityIndex),
    opportunityType,
    factors,
  };
};

/**
 * Determine opportunity type based on score, competition, and demand
 */
function determineOpportunityType(
  bizScore: number,
  competitionDensity: number,
  demandIndex: number
): "Blue Ocean" | "Moderate Opportunity" | "Competitive but Doable" | "Avoid Zone" {
  // Blue Ocean: High demand, low competition, high score
  if (demandIndex > 65 && competitionDensity < 40 && bizScore > 70) {
    return "Blue Ocean";
  }
  
  // Avoid Zone: Low score or oversaturated
  if (bizScore < 45 || (competitionDensity > 75 && demandIndex < 60)) {
    return "Avoid Zone";
  }
  
  // Competitive but Doable: Decent score despite competition
  if (competitionDensity > 60 && bizScore >= 55) {
    return "Competitive but Doable";
  }
  
  // Moderate Opportunity: Everything else
  return "Moderate Opportunity";
}

/**
 * Generate impact factors for the opportunity
 */
function generateImpactFactors(
  marketData: MarketData,
  competitionDensity: number,
  categoryEase: number,
  strategicOpportunity: number
): Array<{ name: string; impact: "positive" | "negative" | "neutral"; description: string }> {
  const factors = [];
  
  // Demand factors
  if (marketData.demandIndex > 70) {
    factors.push({
      name: "High Market Demand",
      impact: "positive" as const,
      description: "Strong consumer interest in this business category",
    });
  } else if (marketData.demandIndex < 40) {
    factors.push({
      name: "Low Market Demand",
      impact: "negative" as const,
      description: "Limited consumer interest may affect revenue",
    });
  }
  
  // Competition factors
  if (competitionDensity < 30) {
    factors.push({
      name: "Low Competition",
      impact: "positive" as const,
      description: "Excellent market entry opportunity with minimal competitive pressure",
    });
  } else if (competitionDensity > 70) {
    factors.push({
      name: "High Competition",
      impact: "negative" as const,
      description: "Saturated market requires strong differentiation strategy",
    });
  }
  
  // Strategic opportunity
  if (strategicOpportunity > 40) {
    factors.push({
      name: "Strategic Opportunity",
      impact: "positive" as const,
      description: "Demand significantly exceeds competition - ideal market conditions",
    });
  }
  
  // Category ease
  if (categoryEase > 70) {
    factors.push({
      name: "Business-Friendly Category",
      impact: "positive" as const,
      description: "Category has lower barriers to entry and operational complexity",
    });
  } else if (categoryEase < 50) {
    factors.push({
      name: "Complex Category",
      impact: "negative" as const,
      description: "High barriers to entry and operational challenges",
    });
  }
  
  // Population density
  if (marketData.populationDensity > 10000) {
    factors.push({
      name: "High Population Density",
      impact: "positive" as const,
      description: "Dense population provides larger customer base",
    });
  }
  
  // Income level
  if (marketData.avgIncome > 6) {
    factors.push({
      name: "High Income Area",
      impact: "positive" as const,
      description: "Above-average income supports premium pricing",
    });
  }
  
  // Digital infrastructure
  if (marketData.internetPenetration > 75) {
    factors.push({
      name: "Strong Digital Infrastructure",
      impact: "positive" as const,
      description: "High internet penetration enables online channels",
    });
  }
  
  return factors;
}

/**
 * Get verbal rating based on BizScore 3.0
 */
export const getScoreRating = (score: number): {
  rating: string;
  color: string;
  description: string;
} => {
  if (score >= 80) {
    return {
      rating: "Excellent",
      color: "success",
      description: "Highly promising opportunity with strong market potential",
    };
  } else if (score >= 65) {
    return {
      rating: "Good",
      color: "primary",
      description: "Solid business opportunity worth serious consideration",
    };
  } else if (score >= 50) {
    return {
      rating: "Moderate",
      color: "warning",
      description: "Viable but requires careful planning and differentiation",
    };
  } else {
    return {
      rating: "Challenging",
      color: "destructive",
      description: "Significant challenges present, consider alternatives",
    };
  }
};

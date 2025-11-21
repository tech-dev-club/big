/**
 * Trend Simulator - Generates historical trend data
 * Returns simulated time series for demand, competition, and growth
 */

export interface TrendData {
  demandTrend: number[];
  competitionTrend: number[];
  growthTrend: number[];
  months: string[];
}

/**
 * Generate historical trend data for the past 6 months
 */
export const generateHistoricalTrends = (
  currentDemand: number,
  currentCompetition: number,
  category: string
): TrendData => {
  const months = ["6mo ago", "5mo ago", "4mo ago", "3mo ago", "2mo ago", "1mo ago", "Now"];
  
  // Category volatility factors
  const volatility: Record<string, number> = {
    "food-beverage": 0.08,
    "retail": 0.12,
    "technology": 0.15,
    "education": 0.06,
    "health-wellness": 0.10,
  };

  const vol = volatility[category] || 0.10;

  // Generate demand trend (generally upward with some noise)
  const demandTrend: number[] = [];
  let demand = currentDemand * 0.75; // Start 25% lower 6 months ago
  
  for (let i = 0; i < 7; i++) {
    const noise = (Math.random() - 0.5) * vol * 100;
    demand = Math.max(10, Math.min(100, demand + noise + 3)); // Gradual upward trend
    demandTrend.push(Math.round(demand));
  }
  demandTrend[6] = currentDemand; // Ensure current value is accurate

  // Generate competition trend (slower growth than demand)
  const competitionTrend: number[] = [];
  let competition = currentCompetition * 0.85; // Start 15% lower
  
  for (let i = 0; i < 7; i++) {
    const noise = (Math.random() - 0.5) * vol * 50;
    competition = Math.max(5, Math.min(100, competition + noise + 2));
    competitionTrend.push(Math.round(competition));
  }
  competitionTrend[6] = currentCompetition;

  // Generate growth trend (combination of demand and inverse competition)
  const growthTrend = demandTrend.map((d, idx) => 
    Math.round((d - competitionTrend[idx] * 0.5) * 0.8)
  );

  return {
    demandTrend,
    competitionTrend,
    growthTrend,
    months,
  };
};

/**
 * Get trend badge based on direction
 */
export const getTrendBadge = (direction: "growing" | "flat" | "declining") => {
  switch (direction) {
    case "growing":
      return { label: "Growing", icon: "↑", color: "success" };
    case "declining":
      return { label: "Declining", icon: "↓", color: "destructive" };
    default:
      return { label: "Stable", icon: "→", color: "warning" };
  }
};

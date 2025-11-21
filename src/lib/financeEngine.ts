/**
 * Financial Projection Engine - BizRadar V4
 * Generates realistic financial estimates and projections
 * Based on category, demand, competition, and location factors
 */

export interface FinancialProjection {
  setupCost: {
    min: number;
    max: number;
    currency: string;
  };
  monthlyOperatingCost: {
    min: number;
    max: number;
    currency: string;
  };
  expectedMonthlyRevenue: {
    min: number;
    max: number;
    currency: string;
  };
  breakEvenMonths: number;
  profitMargin: {
    min: number;
    max: number;
    unit: string;
  };
  projections: {
    year1: {
      revenue: { min: number; max: number };
      profit: { min: number; max: number };
    };
    year3: {
      revenue: { min: number; max: number };
      profit: { min: number; max: number };
    };
  };
}

export interface FinancialInputs {
  category: string;
  demandIndex: number;
  competitionDensity: "Low" | "Balanced" | "High" | "Oversaturated";
  populationDensity: number;
  forecastGrowth: number;
}

// Base setup costs by category (in INR)
const BASE_SETUP_COSTS: Record<string, { min: number; max: number }> = {
  "Cafe": { min: 800000, max: 2000000 },
  "Restaurant": { min: 1500000, max: 5000000 },
  "Gym": { min: 1000000, max: 3000000 },
  "Salon": { min: 500000, max: 1500000 },
  "Grocery Store": { min: 1000000, max: 2500000 },
  "Pharmacy": { min: 800000, max: 2000000 },
  "Tech Support": { min: 300000, max: 800000 },
  "Tutoring Center": { min: 400000, max: 1000000 },
};

// Default costs for unknown categories
const DEFAULT_COSTS = { min: 500000, max: 1500000 };

// Revenue multipliers by category (monthly per demand point)
const REVENUE_MULTIPLIERS: Record<string, number> = {
  "Cafe": 1200,
  "Restaurant": 2000,
  "Gym": 1500,
  "Salon": 1000,
  "Grocery Store": 1800,
  "Pharmacy": 1600,
  "Tech Support": 800,
  "Tutoring Center": 1000,
};

const DEFAULT_REVENUE_MULTIPLIER = 1000;

export function generateFinancialProjection(inputs: FinancialInputs): FinancialProjection {
  // Get base costs for category
  const baseCosts = BASE_SETUP_COSTS[inputs.category] || DEFAULT_COSTS;
  
  // Location multiplier based on population density
  const locationMultiplier = inputs.populationDensity >= 5000 ? 1.3 :
                             inputs.populationDensity >= 3000 ? 1.15 :
                             inputs.populationDensity >= 1000 ? 1.0 : 0.85;

  // Calculate setup costs
  const setupCostMin = Math.round(baseCosts.min * locationMultiplier);
  const setupCostMax = Math.round(baseCosts.max * locationMultiplier);

  // Operating costs (typically 12-18% of setup cost per month)
  const operatingCostMin = Math.round(setupCostMin * 0.12);
  const operatingCostMax = Math.round(setupCostMax * 0.16);

  // Revenue calculation
  const revenueMultiplier = REVENUE_MULTIPLIERS[inputs.category] || DEFAULT_REVENUE_MULTIPLIER;
  
  // Competition penalty
  const competitionPenalty = 
    inputs.competitionDensity === "Oversaturated" ? 0.5 :
    inputs.competitionDensity === "High" ? 0.7 :
    inputs.competitionDensity === "Balanced" ? 0.85 : 1.0;

  // Base monthly revenue
  const baseRevenueMin = Math.round(
    inputs.demandIndex * revenueMultiplier * competitionPenalty * 0.8
  );
  const baseRevenueMax = Math.round(
    inputs.demandIndex * revenueMultiplier * competitionPenalty * 1.2
  );

  // Break-even calculation (average values)
  const avgSetupCost = (setupCostMin + setupCostMax) / 2;
  const avgRevenue = (baseRevenueMin + baseRevenueMax) / 2;
  const avgOperatingCost = (operatingCostMin + operatingCostMax) / 2;
  const monthlyProfit = avgRevenue - avgOperatingCost;
  
  const breakEvenMonths = monthlyProfit > 0 
    ? Math.ceil(avgSetupCost / monthlyProfit)
    : 36; // Cap at 3 years if not profitable

  // Profit margin calculation
  const profitMarginMin = Math.max(5, Math.round(((baseRevenueMin - operatingCostMax) / baseRevenueMin) * 100));
  const profitMarginMax = Math.min(45, Math.round(((baseRevenueMax - operatingCostMin) / baseRevenueMax) * 100));

  // Year 1 and Year 3 projections
  const year1GrowthFactor = Math.min(inputs.forecastGrowth, 1.3);
  const year3GrowthFactor = Math.pow(inputs.forecastGrowth, 3);

  const year1RevenueMin = Math.round(baseRevenueMin * 12 * year1GrowthFactor);
  const year1RevenueMax = Math.round(baseRevenueMax * 12 * year1GrowthFactor);
  const year1CostTotal = (operatingCostMin + operatingCostMax) / 2 * 12;
  const year1ProfitMin = Math.round(year1RevenueMin - year1CostTotal);
  const year1ProfitMax = Math.round(year1RevenueMax - year1CostTotal);

  const year3RevenueMin = Math.round(baseRevenueMin * 12 * year3GrowthFactor);
  const year3RevenueMax = Math.round(baseRevenueMax * 12 * year3GrowthFactor);
  const year3CostTotal = year1CostTotal * 1.15; // Assume 15% cost increase
  const year3ProfitMin = Math.round(year3RevenueMin - year3CostTotal);
  const year3ProfitMax = Math.round(year3RevenueMax - year3CostTotal);

  return {
    setupCost: {
      min: setupCostMin,
      max: setupCostMax,
      currency: "INR",
    },
    monthlyOperatingCost: {
      min: operatingCostMin,
      max: operatingCostMax,
      currency: "INR",
    },
    expectedMonthlyRevenue: {
      min: baseRevenueMin,
      max: baseRevenueMax,
      currency: "INR",
    },
    breakEvenMonths,
    profitMargin: {
      min: profitMarginMin,
      max: profitMarginMax,
      unit: "%",
    },
    projections: {
      year1: {
        revenue: { min: year1RevenueMin, max: year1RevenueMax },
        profit: { min: year1ProfitMin, max: year1ProfitMax },
      },
      year3: {
        revenue: { min: year3RevenueMin, max: year3RevenueMax },
        profit: { min: year3ProfitMin, max: year3ProfitMax },
      },
    },
  };
}

// Utility function to format currency
export function formatCurrency(amount: number, currency: string = "INR"): string {
  if (amount >= 10000000) {
    return `${currency} ${(amount / 10000000).toFixed(2)}Cr`;
  } else if (amount >= 100000) {
    return `${currency} ${(amount / 100000).toFixed(2)}L`;
  } else if (amount >= 1000) {
    return `${currency} ${(amount / 1000).toFixed(0)}K`;
  }
  return `${currency} ${amount.toLocaleString()}`;
}

// TODO V5: Add seasonality factors for revenue projections
// TODO V5: Include location-specific cost variations (rent, labor)
// TODO V5: Integrate real market data for more accurate projections

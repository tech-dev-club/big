/**
 * SWOT Engine - BizRadar V4
 * Generates Strengths, Weaknesses, Opportunities, and Threats analysis
 * Based on market metrics and competitive landscape
 */

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface SWOTInputs {
  demandIndex: number;
  competitionDensity: "Low" | "Balanced" | "High" | "Oversaturated";
  categoryDifficulty: "Easy" | "Moderate" | "Difficult" | "Very Difficult";
  forecastGrowth: number;
  strategicOpportunityIndex: number;
  bizScoreToday: number;
  bizScore12M: number;
  populationDensity: number;
}

export function generateSWOT(inputs: SWOTInputs): SWOTAnalysis {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const opportunities: string[] = [];
  const threats: string[] = [];

  // STRENGTHS ANALYSIS
  if (inputs.demandIndex >= 80) {
    strengths.push("High market demand with strong customer base");
  } else if (inputs.demandIndex >= 60) {
    strengths.push("Solid market demand showing consistent interest");
  }

  if (inputs.forecastGrowth >= 1.3) {
    strengths.push("Excellent growth trajectory and positive market momentum");
  } else if (inputs.forecastGrowth >= 1.15) {
    strengths.push("Healthy growth potential with expanding market");
  }

  if (inputs.populationDensity >= 5000) {
    strengths.push("Dense population providing large customer pool");
  }

  if (inputs.competitionDensity === "Low" || inputs.competitionDensity === "Balanced") {
    strengths.push("Favorable competitive landscape with room for entry");
  }

  if (inputs.strategicOpportunityIndex >= 75) {
    strengths.push("Strong strategic positioning and market gaps identified");
  }

  // WEAKNESSES ANALYSIS
  if (inputs.categoryDifficulty === "Difficult" || inputs.categoryDifficulty === "Very Difficult") {
    weaknesses.push("High operational complexity requiring specialized expertise");
  } else if (inputs.categoryDifficulty === "Moderate") {
    weaknesses.push("Moderate entry barriers and operational requirements");
  }

  if (inputs.demandIndex < 50) {
    weaknesses.push("Limited market demand may impact revenue potential");
  }

  if (inputs.competitionDensity === "High" || inputs.competitionDensity === "Oversaturated") {
    weaknesses.push("Saturated market with intense competitive pressure");
  }

  if (inputs.forecastGrowth < 1.05) {
    weaknesses.push("Stagnant or declining market growth prospects");
  }

  if (inputs.bizScoreToday < 60) {
    weaknesses.push("Below-average market conditions requiring careful strategy");
  }

  // OPPORTUNITIES ANALYSIS
  if (inputs.forecastGrowth >= 1.2) {
    opportunities.push("Capitalize on rapidly expanding market demand");
  }

  if (inputs.competitionDensity === "Low") {
    opportunities.push("First-mover advantage in underserved market");
  }

  if (inputs.strategicOpportunityIndex >= 70) {
    opportunities.push("Niche differentiation strategies available");
  }

  if (inputs.bizScore12M > inputs.bizScoreToday + 5) {
    opportunities.push("Strong future outlook with improving conditions");
  }

  if (inputs.categoryDifficulty === "Easy" || inputs.categoryDifficulty === "Moderate") {
    opportunities.push("Accessible entry with manageable operational complexity");
  }

  if (inputs.populationDensity >= 3000 && inputs.demandIndex >= 60) {
    opportunities.push("Large addressable market with proven demand");
  }

  // THREATS ANALYSIS
  if (inputs.competitionDensity === "Oversaturated") {
    threats.push("Severe market saturation leading to price wars");
  } else if (inputs.competitionDensity === "High") {
    threats.push("Aggressive competitors with established market presence");
  }

  if (inputs.forecastGrowth < 1.0) {
    threats.push("Market contraction and declining customer base");
  }

  if (inputs.bizScore12M < inputs.bizScoreToday - 5) {
    threats.push("Deteriorating market conditions over time");
  }

  if (inputs.categoryDifficulty === "Very Difficult") {
    threats.push("High failure risk due to operational challenges");
  }

  if (inputs.demandIndex < 40) {
    threats.push("Insufficient demand may not sustain business operations");
  }

  if (inputs.competitionDensity !== "Low" && inputs.forecastGrowth < 1.1) {
    threats.push("New market entrants may intensify competition");
  }

  // Ensure minimum entries per category
  if (strengths.length === 0) strengths.push("Location-specific advantages to be leveraged");
  if (weaknesses.length === 0) weaknesses.push("Standard market entry challenges expected");
  if (opportunities.length === 0) opportunities.push("Potential for strategic positioning exists");
  if (threats.length === 0) threats.push("Monitor market dynamics and competitor activity");

  return {
    strengths,
    weaknesses,
    opportunities,
    threats,
  };
}

// TODO V5: Add AI enhancement layer for more nuanced SWOT analysis
// TODO V5: Consider location-specific factors (regulations, demographics)
// TODO V5: Integrate real competitor data for threat analysis

/**
 * Recommendation Engine - BizRadar V4
 * Generates strategic recommendations based on comprehensive analysis
 * Considers BizScore, SWOT, Financials, and Market Conditions
 */

import { SWOTAnalysis } from "./swotEngine";
import { FinancialProjection } from "./financeEngine";

export type RecommendationType = "start-now" | "start-caution" | "wait-monitor" | "avoid";

export interface Recommendation {
  type: RecommendationType;
  label: string;
  confidence: number; // 0-100
  reasoning: string[];
  actionSteps: string[];
  riskLevel: "Low" | "Medium" | "High" | "Very High";
  timeframe: string;
}

export interface RecommendationInputs {
  bizScoreToday: number;
  bizScore12M: number;
  competitionDensity: "Low" | "Balanced" | "High" | "Oversaturated";
  categoryDifficulty: "Easy" | "Moderate" | "Difficult" | "Very Difficult";
  swot: SWOTAnalysis;
  financials: FinancialProjection;
  forecastGrowth: number;
}

export function generateRecommendation(inputs: RecommendationInputs): Recommendation {
  let score = 0;
  const reasoning: string[] = [];
  const actionSteps: string[] = [];

  // Factor 1: BizScore Analysis (30 points)
  if (inputs.bizScoreToday >= 80) {
    score += 30;
    reasoning.push("Excellent current market conditions with high BizScore");
  } else if (inputs.bizScoreToday >= 65) {
    score += 20;
    reasoning.push("Solid market conditions showing good potential");
  } else if (inputs.bizScoreToday >= 50) {
    score += 10;
    reasoning.push("Moderate market conditions requiring careful approach");
  } else {
    reasoning.push("Challenging market conditions with below-average scores");
  }

  // Factor 2: Growth Trajectory (25 points)
  const scoreChange = inputs.bizScore12M - inputs.bizScoreToday;
  if (scoreChange >= 10) {
    score += 25;
    reasoning.push("Strong positive growth trajectory over next 12 months");
  } else if (scoreChange >= 5) {
    score += 18;
    reasoning.push("Improving market outlook with steady growth");
  } else if (scoreChange >= 0) {
    score += 10;
    reasoning.push("Stable market with consistent performance expected");
  } else {
    reasoning.push("Declining market conditions anticipated");
  }

  // Factor 3: SWOT Balance (20 points)
  const swotScore = inputs.swot.strengths.length + inputs.swot.opportunities.length - 
                    inputs.swot.weaknesses.length - inputs.swot.threats.length;
  if (swotScore >= 3) {
    score += 20;
    reasoning.push("SWOT analysis reveals strong competitive positioning");
  } else if (swotScore >= 0) {
    score += 12;
    reasoning.push("Balanced SWOT with manageable risks");
  } else if (swotScore >= -2) {
    score += 5;
    reasoning.push("SWOT shows challenges that require mitigation strategies");
  } else {
    reasoning.push("SWOT analysis indicates significant challenges ahead");
  }

  // Factor 4: Financial Viability (15 points)
  if (inputs.financials.breakEvenMonths <= 12 && inputs.financials.profitMargin.min >= 15) {
    score += 15;
    reasoning.push("Strong financial viability with quick break-even");
  } else if (inputs.financials.breakEvenMonths <= 18 && inputs.financials.profitMargin.min >= 10) {
    score += 10;
    reasoning.push("Acceptable financial projections with reasonable timeline");
  } else if (inputs.financials.breakEvenMonths <= 24) {
    score += 5;
    reasoning.push("Extended break-even period requires patience");
  } else {
    reasoning.push("Financial projections show challenging profitability timeline");
  }

  // Factor 5: Competition & Category (10 points)
  if (inputs.competitionDensity === "Low" && 
      (inputs.categoryDifficulty === "Easy" || inputs.categoryDifficulty === "Moderate")) {
    score += 10;
    reasoning.push("Favorable competition and manageable operational complexity");
  } else if (inputs.competitionDensity === "Balanced") {
    score += 6;
    reasoning.push("Competitive but accessible market environment");
  } else if (inputs.competitionDensity === "Oversaturated") {
    reasoning.push("Highly saturated market with intense competition");
  }

  // Determine recommendation type and risk level
  let type: RecommendationType;
  let label: string;
  let riskLevel: "Low" | "Medium" | "High" | "Very High";
  let timeframe: string;
  let confidence: number;

  if (score >= 75) {
    type = "start-now";
    label = "Start Now";
    riskLevel = "Low";
    timeframe = "Launch within 2-3 months";
    confidence = Math.min(95, score + 10);
    
    actionSteps.push("Secure location and finalize business plan immediately");
    actionSteps.push("Complete legal registrations and obtain necessary licenses");
    actionSteps.push("Begin vendor negotiations and supply chain setup");
    actionSteps.push("Launch marketing campaign to build pre-opening buzz");
    actionSteps.push("Hire and train core team members");
  } else if (score >= 55) {
    type = "start-caution";
    label = "Start with Caution";
    riskLevel = inputs.categoryDifficulty === "Very Difficult" ? "High" : "Medium";
    timeframe = "Launch within 4-6 months after preparation";
    confidence = Math.min(85, score + 15);
    
    actionSteps.push("Conduct detailed competitive analysis and positioning study");
    actionSteps.push("Develop robust differentiation strategy to stand out");
    actionSteps.push("Create conservative financial projections with contingency plans");
    actionSteps.push("Test market with soft launch or pilot program if possible");
    actionSteps.push("Build strong supplier relationships and negotiate favorable terms");
    if (inputs.competitionDensity === "High") {
      actionSteps.push("Identify unique value proposition to compete effectively");
    }
  } else if (score >= 35) {
    type = "wait-monitor";
    label = "Wait & Monitor";
    riskLevel = "High";
    timeframe = "Monitor for 3-6 months before deciding";
    confidence = Math.min(75, score + 20);
    
    actionSteps.push("Track market trends and competitor movements closely");
    actionSteps.push("Wait for more favorable conditions or improved indicators");
    actionSteps.push("Explore alternative locations or adjacent categories");
    actionSteps.push("Build financial reserves and improve preparation");
    actionSteps.push("Network with industry experts and potential mentors");
    if (scoreChange > 0) {
      actionSteps.push("Re-evaluate in 6 months as growth trajectory improves");
    }
  } else {
    type = "avoid";
    label = "Avoid This Location";
    riskLevel = "Very High";
    timeframe = "Consider different location or category";
    confidence = Math.min(90, 100 - score);
    
    actionSteps.push("Explore alternative locations with better market conditions");
    actionSteps.push("Consider different business categories with higher potential");
    actionSteps.push("Conduct deeper market research before any investment");
    actionSteps.push("Consult with industry veterans about viability concerns");
    if (inputs.financials.breakEvenMonths > 24) {
      actionSteps.push("Re-evaluate business model for better financial efficiency");
    }
  }

  // Add category-specific action steps
  if (inputs.categoryDifficulty === "Difficult" || inputs.categoryDifficulty === "Very Difficult") {
    actionSteps.push("Secure expert consultation for operational complexity");
  }

  return {
    type,
    label,
    confidence,
    reasoning,
    actionSteps,
    riskLevel,
    timeframe,
  };
}

// TODO V5: Add machine learning for pattern recognition in successful launches
// TODO V5: Integrate user feedback on recommendation accuracy
// TODO V5: Create personalized recommendations based on user profile and capital

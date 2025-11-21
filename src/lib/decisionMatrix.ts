/**
 * Decision Matrix Engine - BizRadar V5
 * Ranks and compares multiple business opportunities
 * Uses weighted scoring across key metrics
 */

import { FeasibilityReport } from "./reportBuilder";

export interface DecisionMatrixResult {
  ranking: RankedOpportunity[];
  topChoice: RankedOpportunity;
  insights: string[];
}

export interface RankedOpportunity {
  id: string;
  location: string;
  category: string;
  score: number;
  rank: number;
  label: string;
  strengths: string[];
  concerns: string[];
}

// Configurable weights (must sum to 1.0)
const WEIGHTS = {
  bizScore: 0.30,
  forecast: 0.20,
  competition: 0.15,
  financial: 0.20,
  swotOpportunity: 0.15,
};

export function calculateDecisionMatrix(reports: FeasibilityReport[]): DecisionMatrixResult {
  if (reports.length === 0) {
    throw new Error("No reports provided for decision matrix");
  }

  // Calculate scores for each report
  const scored = reports.map((report) => {
    const scores = {
      bizScore: normalizeBizScore(report.bizScoreToday, report.bizScore12M),
      forecast: normalizeForecast(report.forecastGrowth),
      competition: normalizeCompetition(report.competitionDensity),
      financial: normalizeFinancials(report.financials),
      swotOpportunity: normalizeSWOT(report.swot),
    };

    const totalScore = Math.round(
      scores.bizScore * WEIGHTS.bizScore +
      scores.forecast * WEIGHTS.forecast +
      scores.competition * WEIGHTS.competition +
      scores.financial * WEIGHTS.financial +
      scores.swotOpportunity * WEIGHTS.swotOpportunity
    );

    return {
      report,
      score: totalScore,
      componentScores: scores,
    };
  });

  // Sort by score (highest first)
  scored.sort((a, b) => b.score - a.score);

  // Create ranked opportunities
  const ranking: RankedOpportunity[] = scored.map((item, index) => {
    const label = getLabel(index, scored.length);
    const strengths = getStrengths(item.report, item.componentScores);
    const concerns = getConcerns(item.report, item.componentScores);

    return {
      id: item.report.id,
      location: item.report.location,
      category: item.report.category,
      score: item.score,
      rank: index + 1,
      label,
      strengths,
      concerns,
    };
  });

  // Generate insights
  const insights = generateInsights(ranking, scored);

  return {
    ranking,
    topChoice: ranking[0],
    insights,
  };
}

// Normalize BizScore (0-100)
function normalizeBizScore(today: number, future: number): number {
  // Weight current score 60%, future 40%
  return (today * 0.6 + future * 0.4);
}

// Normalize Forecast Growth (typically 0.8 - 1.5)
function normalizeForecast(growth: number): number {
  if (growth >= 1.3) return 100;
  if (growth >= 1.2) return 85;
  if (growth >= 1.1) return 70;
  if (growth >= 1.0) return 50;
  if (growth >= 0.95) return 30;
  return 15;
}

// Normalize Competition Density
function normalizeCompetition(density: string): number {
  switch (density) {
    case "Low": return 100;
    case "Balanced": return 75;
    case "High": return 45;
    case "Oversaturated": return 20;
    default: return 50;
  }
}

// Normalize Financial Viability
function normalizeFinancials(financials: any): number {
  let score = 0;
  
  // Break-even months (max 50 points)
  if (financials.breakEvenMonths <= 12) score += 50;
  else if (financials.breakEvenMonths <= 18) score += 35;
  else if (financials.breakEvenMonths <= 24) score += 20;
  else score += 10;

  // Profit margin (max 50 points)
  const avgMargin = (financials.profitMargin.min + financials.profitMargin.max) / 2;
  if (avgMargin >= 25) score += 50;
  else if (avgMargin >= 18) score += 35;
  else if (avgMargin >= 12) score += 20;
  else score += 10;

  return score;
}

// Normalize SWOT (opportunities vs threats)
function normalizeSWOT(swot: any): number {
  const opportunityCount = swot.opportunities.length;
  const threatCount = swot.threats.length;
  const strengthCount = swot.strengths.length;
  const weaknessCount = swot.weaknesses.length;

  const positiveScore = (strengthCount * 10) + (opportunityCount * 12);
  const negativeScore = (weaknessCount * 8) + (threatCount * 10);

  const netScore = positiveScore - negativeScore;

  // Normalize to 0-100
  return Math.max(0, Math.min(100, 50 + netScore));
}

// Get label based on rank
function getLabel(index: number, total: number): string {
  if (index === 0) return "Top Choice";
  if (index === 1 && total > 2) return "Strong Alternative";
  if (index === total - 1) return "Least Favorable";
  return "Consider with Caution";
}

// Get key strengths
function getStrengths(report: FeasibilityReport, scores: any): string[] {
  const strengths: string[] = [];

  if (scores.bizScore >= 75) {
    strengths.push(`Excellent BizScore: ${report.bizScoreToday}`);
  }
  if (scores.forecast >= 80) {
    strengths.push(`Strong growth forecast: ${(report.forecastGrowth * 100 - 100).toFixed(0)}%`);
  }
  if (scores.competition >= 80) {
    strengths.push(`Favorable competition: ${report.competitionDensity}`);
  }
  if (scores.financial >= 70) {
    strengths.push(`Quick break-even: ${report.financials.breakEvenMonths} months`);
  }
  if (report.swot.opportunities.length >= 4) {
    strengths.push(`Multiple market opportunities identified`);
  }

  return strengths.slice(0, 3); // Return top 3
}

// Get key concerns
function getConcerns(report: FeasibilityReport, scores: any): string[] {
  const concerns: string[] = [];

  if (scores.bizScore < 60) {
    concerns.push(`Below-average BizScore: ${report.bizScoreToday}`);
  }
  if (scores.competition < 50) {
    concerns.push(`High competition: ${report.competitionDensity}`);
  }
  if (report.financials.breakEvenMonths > 24) {
    concerns.push(`Extended break-even: ${report.financials.breakEvenMonths} months`);
  }
  if (report.swot.threats.length >= 4) {
    concerns.push(`Multiple market threats identified`);
  }
  if (scores.forecast < 50) {
    concerns.push(`Weak growth outlook`);
  }

  return concerns.slice(0, 3); // Return top 3
}

// Generate comparative insights
function generateInsights(ranking: RankedOpportunity[], scored: any[]): string[] {
  const insights: string[] = [];

  if (ranking.length >= 2) {
    const scoreDiff = ranking[0].score - ranking[1].score;
    if (scoreDiff > 15) {
      insights.push(`Clear winner: ${ranking[0].location} (${ranking[0].category}) leads by ${scoreDiff} points`);
    } else {
      insights.push(`Close competition: Top 2 options are within ${scoreDiff} points of each other`);
    }
  }

  // Financial comparison
  const bestFinancial = scored.reduce((best, curr) => 
    curr.componentScores.financial > best.componentScores.financial ? curr : best
  );
  if (bestFinancial.report.id !== ranking[0].id) {
    insights.push(`Best financial outlook: ${bestFinancial.report.location} has strongest profit potential`);
  }

  // Growth comparison
  const bestGrowth = scored.reduce((best, curr) => 
    curr.componentScores.forecast > best.componentScores.forecast ? curr : best
  );
  if (bestGrowth.report.id !== ranking[0].id) {
    insights.push(`Highest growth potential: ${bestGrowth.report.location} shows best market expansion`);
  }

  // Competition advantage
  const leastCompetition = scored.reduce((best, curr) => 
    curr.componentScores.competition > best.componentScores.competition ? curr : best
  );
  if (leastCompetition.report.id !== ranking[0].id) {
    insights.push(`Least competitive: ${leastCompetition.report.location} has most favorable market density`);
  }

  return insights;
}

// TODO V6: Add multi-criteria decision analysis (MCDA) methods
// TODO V6: Allow users to customize weight preferences
// TODO V6: Add risk-adjusted scoring options

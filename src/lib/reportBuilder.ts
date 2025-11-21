/**
 * Report Builder - BizRadar V4
 * Combines all analysis engines into comprehensive feasibility reports
 * Generates structured data for UI display and export
 */

import { generateSWOT, SWOTAnalysis, SWOTInputs } from "./swotEngine";
import { generateFinancialProjection, FinancialProjection, FinancialInputs } from "./financeEngine";
import { generateRecommendation, Recommendation, RecommendationInputs } from "./recommendationEngine";

export interface FeasibilityReport {
  id: string;
  timestamp: number;
  
  // Basic Info
  location: string;
  coordinates: { lat: number; lng: number };
  category: string;
  
  // Core Metrics
  demandIndex: number;
  competitionIndex: number;
  competitionDensity: "Low" | "Balanced" | "High" | "Oversaturated";
  populationDensity: number;
  categoryDifficulty: "Easy" | "Moderate" | "Difficult" | "Very Difficult";
  
  // BizScore
  bizScoreToday: number;
  bizScore6M: number;
  bizScore12M: number;
  
  // Forecast
  forecastGrowth: number;
  trendDirection: "growing" | "stable" | "declining";
  strategicOpportunityIndex: number;
  
  // Competition
  nearestCompetitors: Array<{
    name: string;
    distance: number;
    rating: number;
  }>;
  
  // Analysis Results
  swot: SWOTAnalysis;
  financials: FinancialProjection;
  recommendation: Recommendation;
  
  // AI Summary (optional)
  aiInsights?: {
    summary: string;
    marketOutlook: string;
    riskReward: string;
    keyTakeaways: string[];
  };
}

export interface ReportInputs {
  location: string;
  coordinates: { lat: number; lng: number };
  category: string;
  demandIndex: number;
  competitionIndex: number;
  competitionDensity: "Low" | "Balanced" | "High" | "Oversaturated";
  populationDensity: number;
  categoryDifficulty: "Easy" | "Moderate" | "Difficult" | "Very Difficult";
  bizScoreToday: number;
  bizScore6M: number;
  bizScore12M: number;
  forecastGrowth: number;
  trendDirection: "growing" | "stable" | "declining";
  strategicOpportunityIndex: number;
  nearestCompetitors: Array<{
    name: string;
    distance: number;
    rating: number;
  }>;
}

export function buildFeasibilityReport(inputs: ReportInputs): FeasibilityReport {
  // Generate SWOT Analysis
  const swotInputs: SWOTInputs = {
    demandIndex: inputs.demandIndex,
    competitionDensity: inputs.competitionDensity,
    categoryDifficulty: inputs.categoryDifficulty,
    forecastGrowth: inputs.forecastGrowth,
    strategicOpportunityIndex: inputs.strategicOpportunityIndex,
    bizScoreToday: inputs.bizScoreToday,
    bizScore12M: inputs.bizScore12M,
    populationDensity: inputs.populationDensity,
  };
  const swot = generateSWOT(swotInputs);

  // Generate Financial Projections
  const financialInputs: FinancialInputs = {
    category: inputs.category,
    demandIndex: inputs.demandIndex,
    competitionDensity: inputs.competitionDensity,
    populationDensity: inputs.populationDensity,
    forecastGrowth: inputs.forecastGrowth,
  };
  const financials = generateFinancialProjection(financialInputs);

  // Generate Recommendation
  const recommendationInputs: RecommendationInputs = {
    bizScoreToday: inputs.bizScoreToday,
    bizScore12M: inputs.bizScore12M,
    competitionDensity: inputs.competitionDensity,
    categoryDifficulty: inputs.categoryDifficulty,
    swot,
    financials,
    forecastGrowth: inputs.forecastGrowth,
  };
  const recommendation = generateRecommendation(recommendationInputs);

  // Build complete report
  const report: FeasibilityReport = {
    id: generateReportId(),
    timestamp: Date.now(),
    location: inputs.location,
    coordinates: inputs.coordinates,
    category: inputs.category,
    demandIndex: inputs.demandIndex,
    competitionIndex: inputs.competitionIndex,
    competitionDensity: inputs.competitionDensity,
    populationDensity: inputs.populationDensity,
    categoryDifficulty: inputs.categoryDifficulty,
    bizScoreToday: inputs.bizScoreToday,
    bizScore6M: inputs.bizScore6M,
    bizScore12M: inputs.bizScore12M,
    forecastGrowth: inputs.forecastGrowth,
    trendDirection: inputs.trendDirection,
    strategicOpportunityIndex: inputs.strategicOpportunityIndex,
    nearestCompetitors: inputs.nearestCompetitors,
    swot,
    financials,
    recommendation,
  };

  return report;
}

// Generate unique report ID
function generateReportId(): string {
  return `report-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Export report as JSON
export function exportReportJSON(report: FeasibilityReport): string {
  return JSON.stringify(report, null, 2);
}

// Create shareable report summary
export function createReportSummary(report: FeasibilityReport): string {
  return `
BizRadar Feasibility Report
===========================
Location: ${report.location}
Category: ${report.category}
Generated: ${new Date(report.timestamp).toLocaleString()}

BizScore: ${report.bizScoreToday} (Today) → ${report.bizScore12M} (12M)
Recommendation: ${report.recommendation.label}
Risk Level: ${report.recommendation.riskLevel}

Financial Highlights:
- Setup Cost: ${report.financials.setupCost.min.toLocaleString()} - ${report.financials.setupCost.max.toLocaleString()} ${report.financials.setupCost.currency}
- Break-even: ${report.financials.breakEvenMonths} months
- Profit Margin: ${report.financials.profitMargin.min}-${report.financials.profitMargin.max}%

Key Strengths (${report.swot.strengths.length}):
${report.swot.strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Key Threats (${report.swot.threats.length}):
${report.swot.threats.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Action Steps:
${report.recommendation.actionSteps.map((a, i) => `${i + 1}. ${a}`).join('\n')}
`.trim();
}

// TODO V5: Add PDF export functionality using pdfmake or similar
// TODO V5: Create comparison report builder for multi-location analysis
// TODO V5: Add report versioning and update tracking

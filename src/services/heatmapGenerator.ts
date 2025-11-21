/**
 * Heatmap Generator
 * Generates heatmap data for demand and competition visualization
 */

import { type Coordinates } from "@/lib/distanceCalc";
import { type Competitor, getCompetitionDensityAtPoint } from "./competitionScanner";

export interface HeatmapPoint {
  coordinates: Coordinates;
  intensity: number; // 0-1
  type: "demand" | "competition";
}

export interface HeatmapData {
  points: HeatmapPoint[];
  maxIntensity: number;
  minIntensity: number;
}

/**
 * Generate demand heatmap data based on market metrics
 */
export function generateDemandHeatmap(
  centerPoint: Coordinates,
  demandIndex: number,
  populationDensity: number,
  radiusKm: number = 3,
  gridSize: number = 20
): HeatmapData {
  const points: HeatmapPoint[] = [];
  const step = (radiusKm * 2) / gridSize;
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const lat = centerPoint.lat - radiusKm / 111 + (i * step / 111);
      const lng = centerPoint.lng - radiusKm / (111 * Math.cos(centerPoint.lat * Math.PI / 180)) 
                   + (j * step / (111 * Math.cos(centerPoint.lat * Math.PI / 180)));
      
      // Calculate distance from center
      const distanceFromCenter = Math.sqrt(
        Math.pow((lat - centerPoint.lat) * 111, 2) + 
        Math.pow((lng - centerPoint.lng) * 111 * Math.cos(centerPoint.lat * Math.PI / 180), 2)
      );
      
      if (distanceFromCenter <= radiusKm) {
        // Intensity decreases with distance from center
        const distanceFactor = 1 - (distanceFromCenter / radiusKm);
        
        // Add random variation for realistic heatmap
        const randomVariation = 0.8 + Math.random() * 0.4;
        
        // Calculate intensity based on demand index and population density
        const baseIntensity = (demandIndex / 100) * 0.7 + (populationDensity / 10000) * 0.3;
        const intensity = Math.min(1, baseIntensity * distanceFactor * randomVariation);
        
        points.push({
          coordinates: { lat, lng },
          intensity,
          type: "demand"
        });
      }
    }
  }
  
  const intensities = points.map(p => p.intensity);
  
  return {
    points,
    maxIntensity: Math.max(...intensities),
    minIntensity: Math.min(...intensities)
  };
}

/**
 * Generate competition heatmap data based on competitor locations
 */
export function generateCompetitionHeatmap(
  centerPoint: Coordinates,
  competitors: Competitor[],
  radiusKm: number = 3,
  gridSize: number = 20
): HeatmapData {
  const points: HeatmapPoint[] = [];
  const step = (radiusKm * 2) / gridSize;
  const influenceRadius = 0.5; // km - how far a competitor's influence extends
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const lat = centerPoint.lat - radiusKm / 111 + (i * step / 111);
      const lng = centerPoint.lng - radiusKm / (111 * Math.cos(centerPoint.lat * Math.PI / 180)) 
                   + (j * step / (111 * Math.cos(centerPoint.lat * Math.PI / 180)));
      
      const point = { lat, lng };
      
      // Calculate competition density at this point
      const density = getCompetitionDensityAtPoint(point, competitors, influenceRadius);
      const intensity = density / 100; // Convert to 0-1 scale
      
      if (intensity > 0.05) { // Only add points with meaningful intensity
        points.push({
          coordinates: point,
          intensity,
          type: "competition"
        });
      }
    }
  }
  
  const intensities = points.map(p => p.intensity);
  
  return {
    points,
    maxIntensity: Math.max(...intensities, 0.1),
    minIntensity: Math.min(...intensities, 0)
  };
}

/**
 * Generate combined heatmap showing opportunity zones
 * High demand + low competition = high opportunity
 */
export function generateOpportunityHeatmap(
  demandHeatmap: HeatmapData,
  competitionHeatmap: HeatmapData
): HeatmapData {
  const points: HeatmapPoint[] = [];
  
  // Match points from both heatmaps
  demandHeatmap.points.forEach(demandPoint => {
    // Find closest competition point
    const compPoint = competitionHeatmap.points.find(cp => 
      Math.abs(cp.coordinates.lat - demandPoint.coordinates.lat) < 0.001 &&
      Math.abs(cp.coordinates.lng - demandPoint.coordinates.lng) < 0.001
    );
    
    // Opportunity = high demand, low competition
    const competitionIntensity = compPoint?.intensity || 0;
    const opportunityIntensity = demandPoint.intensity * (1 - competitionIntensity * 0.5);
    
    points.push({
      coordinates: demandPoint.coordinates,
      intensity: Math.max(0, opportunityIntensity),
      type: "demand" // Type represents the color scheme to use
    });
  });
  
  const intensities = points.map(p => p.intensity);
  
  return {
    points,
    maxIntensity: Math.max(...intensities, 0.1),
    minIntensity: Math.min(...intensities, 0)
  };
}

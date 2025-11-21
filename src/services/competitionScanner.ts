/**
 * Competition Scanner
 * Identifies and analyzes nearby competing businesses
 * TODO V4: Replace with real data from Google Places API / OpenStreetMap
 */

import { calculateDistance, type Coordinates } from "@/lib/distanceCalc";

export interface Competitor {
  id: string;
  name: string;
  category: string;
  coordinates: Coordinates;
  distance: number; // in km
  rating: number; // 1-5
  priceLevel: "₹" | "₹₹" | "₹₹₹" | "₹₹₹₹";
  reviewCount: number;
}

export interface CompetitionAnalysis {
  totalCount: number;
  nearestCompetitors: Competitor[];
  competitionDensity: "Low" | "Balanced" | "High" | "Oversaturated";
  densityScore: number; // 0-100, higher = more saturated
  averageDistance: number;
  averageRating: number;
  recommendations: string[];
}

/**
 * Scan for competing businesses near a location
 * Currently uses mock data - will be replaced with real API in V4
 */
export function scanCompetition(
  location: Coordinates,
  category: string,
  radiusKm: number = 3
): CompetitionAnalysis {
  // Generate mock competitors based on category and location
  const competitors = generateMockCompetitors(location, category, radiusKm);
  
  // Sort by distance
  const sortedCompetitors = competitors.sort((a, b) => a.distance - b.distance);
  
  // Calculate metrics
  const totalCount = competitors.length;
  const nearestCompetitors = sortedCompetitors.slice(0, 5);
  const averageDistance = competitors.reduce((sum, c) => sum + c.distance, 0) / totalCount || 0;
  const averageRating = competitors.reduce((sum, c) => sum + c.rating, 0) / totalCount || 0;
  
  // Determine competition density
  const { density, densityScore } = calculateCompetitionDensity(totalCount, radiusKm);
  
  // Generate recommendations
  const recommendations = generateRecommendations(density, averageRating, averageDistance);
  
  return {
    totalCount,
    nearestCompetitors,
    competitionDensity: density,
    densityScore,
    averageDistance,
    averageRating,
    recommendations
  };
}

/**
 * Generate mock competitors for simulation
 * TODO V4: Replace with real API data
 */
function generateMockCompetitors(
  location: Coordinates,
  category: string,
  radiusKm: number
): Competitor[] {
  const categoryCompetitorCount: Record<string, number> = {
    "food-beverage": 18,
    "retail": 15,
    "technology": 8,
    "education": 12,
    "health-wellness": 10,
    "services": 20,
    "entertainment": 7,
    "hospitality": 9
  };
  
  const count = categoryCompetitorCount[category] || 12;
  const competitors: Competitor[] = [];
  
  const categoryNames: Record<string, string[]> = {
    "food-beverage": [
      "Café Aroma", "Spice Kitchen", "Green Leaf Restaurant", "Urban Bites",
      "Coffee House", "Tandoor Express", "Fusion Grill", "Sweet Treats",
      "Bistro 21", "Quick Bites", "Food Court Central", "Royal Dine"
    ],
    "retail": [
      "Fashion Hub", "Smart Mart", "Style Avenue", "Trends Boutique",
      "Urban Store", "Elite Fashion", "Comfort Zone", "Lifestyle Plaza",
      "Quick Shop", "Daily Needs", "Premium Retail", "Value Store"
    ],
    "technology": [
      "Tech Solutions", "Digital Hub", "Smart Systems", "Innovation Lab",
      "Code Factory", "IT Services Pro", "Cyber Solutions", "Tech Valley"
    ],
    "education": [
      "Bright Academy", "Knowledge Hub", "Smart Learning", "Excellence Institute",
      "Future School", "Skill Development Center", "Study Circle", "Coaching Plus"
    ],
    "health-wellness": [
      "Care Clinic", "Wellness Center", "Fit Life Gym", "Health Plus",
      "Yoga Studio", "Medical Care", "Fitness Point", "Wellness Spa"
    ]
  };
  
  const names = categoryNames[category] || ["Business A", "Business B", "Business C"];
  
  for (let i = 0; i < count; i++) {
    // Generate random coordinates within radius
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radiusKm;
    
    const lat = location.lat + (distance / 111) * Math.cos(angle);
    const lng = location.lng + (distance / (111 * Math.cos(location.lat * Math.PI / 180))) * Math.sin(angle);
    
    const coordinates = { lat, lng };
    const actualDistance = calculateDistance(location, coordinates);
    
    competitors.push({
      id: `comp-${i}`,
      name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ""),
      category,
      coordinates,
      distance: actualDistance,
      rating: 3 + Math.random() * 2, // 3-5 stars
      priceLevel: (["₹", "₹₹", "₹₹₹"] as const)[Math.floor(Math.random() * 3)],
      reviewCount: Math.floor(Math.random() * 500) + 50
    });
  }
  
  return competitors;
}

/**
 * Calculate competition density level and score
 */
function calculateCompetitionDensity(
  competitorCount: number,
  radiusKm: number
): { density: "Low" | "Balanced" | "High" | "Oversaturated"; densityScore: number } {
  // Calculate competitors per square km
  const area = Math.PI * radiusKm * radiusKm;
  const density = competitorCount / area;
  
  // Calculate density score (0-100)
  let densityScore = Math.min(100, (density / 5) * 100); // 5 competitors per sq km = 100 score
  
  // Determine density category
  let densityCategory: "Low" | "Balanced" | "High" | "Oversaturated";
  if (densityScore < 25) {
    densityCategory = "Low";
  } else if (densityScore < 50) {
    densityCategory = "Balanced";
  } else if (densityScore < 75) {
    densityCategory = "High";
  } else {
    densityCategory = "Oversaturated";
  }
  
  return { density: densityCategory, densityScore };
}

/**
 * Generate strategic recommendations based on competition analysis
 */
function generateRecommendations(
  density: string,
  averageRating: number,
  averageDistance: number
): string[] {
  const recommendations: string[] = [];
  
  // Density-based recommendations
  if (density === "Low") {
    recommendations.push("Excellent opportunity with minimal competition");
    recommendations.push("Focus on establishing strong brand presence");
  } else if (density === "Balanced") {
    recommendations.push("Healthy competitive environment");
    recommendations.push("Differentiation strategy recommended");
  } else if (density === "High") {
    recommendations.push("High competition - strong differentiation required");
    recommendations.push("Consider niche targeting or premium positioning");
  } else {
    recommendations.push("Oversaturated market - proceed with caution");
    recommendations.push("Requires unique value proposition and excellent execution");
  }
  
  // Rating-based recommendations
  if (averageRating < 3.5) {
    recommendations.push("Competitors have low ratings - opportunity to excel with quality");
  } else if (averageRating > 4.2) {
    recommendations.push("High competitor standards - ensure top-tier quality");
  }
  
  // Distance-based recommendations
  if (averageDistance > 1.5) {
    recommendations.push("Competitors are spread out - good location potential");
  } else {
    recommendations.push("Dense competitor clustering - strategic location critical");
  }
  
  return recommendations;
}

/**
 * Get competition density for specific coordinates
 * Used for heatmap generation
 */
export function getCompetitionDensityAtPoint(
  point: Coordinates,
  allCompetitors: Competitor[],
  influenceRadius: number = 0.5 // km
): number {
  const nearbyCompetitors = allCompetitors.filter(
    comp => calculateDistance(point, comp.coordinates) <= influenceRadius
  );
  
  // Return density score (0-100)
  return Math.min(100, nearbyCompetitors.length * 20);
}

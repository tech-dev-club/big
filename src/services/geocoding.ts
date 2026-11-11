import { INDIAN_CITIES } from "@/lib/constants";

export interface LocationData {
  name: string;
  state?: string;
  lat: number;
  lng: number;
  population?: number;
  formattedAddress: string;
}

/**
 * Search for Indian cities by name
 * Returns matching cities from our database
 */
export const searchIndianCities = (query: string): LocationData[] => {
  if (!query || query.length < 2) return [];
  
  const searchTerm = query.toLowerCase();
  return INDIAN_CITIES
    .filter(city => 
      city.name.toLowerCase().includes(searchTerm) || 
      city.state.toLowerCase().includes(searchTerm)
    )
    .slice(0, 5)
    .map(city => ({
      name: city.name,
      state: city.state,
      lat: city.lat,
      lng: city.lng,
      population: city.population,
      formattedAddress: `${city.name}, ${city.state}, India`,
    }));
};

/**
 * Get coordinates for a specific city
 * Handles both simple city names and formatted addresses
 */
export const getCityCoordinates = (cityNameOrAddress: string): LocationData | null => {
  // Extract city name from formatted address (e.g., "Mumbai, Maharashtra, India" -> "Mumbai")
  const cityName = cityNameOrAddress.split(',')[0].trim();
  
  const city = INDIAN_CITIES.find(
    c => c.name.toLowerCase() === cityName.toLowerCase()
  );
  
  if (!city) {
    console.warn(`City not found: ${cityName}`);
    return null;
  }
  
  return {
    name: city.name,
    state: city.state,
    lat: city.lat,
    lng: city.lng,
    population: city.population,
    formattedAddress: `${city.name}, ${city.state}, India`,
  };
};

/**
 * Parse PIN code format (basic validation)
 * Note: Real PIN code to location would require external API
 */
export const parsePinCode = (pinCode: string): boolean => {
  const pinRegex = /^[1-9][0-9]{5}$/;
  return pinRegex.test(pinCode);
};

/**
 * Resolve a PIN code to a city.
 *
 * PIN-code format validation alone cannot identify a location. Return null
 * until an authoritative PIN-code lookup provider is configured.
 */
export const getCityByPinCode = async (pinCode: string): Promise<LocationData | null> => {
  if (!parsePinCode(pinCode)) return null;

  return null;
};

/**
 * Geocode using Mapbox API (for production use)
 * Requires MAPBOX_API_KEY
 */
export const geocodeLocation = async (
  query: string,
  mapboxToken?: string
): Promise<LocationData | null> => {
  if (!mapboxToken) {
    // Fallback to local search
    const results = searchIndianCities(query);
    return results[0] || null;
  }
  
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?country=IN&access_token=${mapboxToken}`
    );
    
    if (!response.ok) throw new Error("Geocoding failed");
    
    const data = await response.json();
    if (!data.features || data.features.length === 0) return null;
    
    const feature = data.features[0];
    const center = feature?.center;
    if (
      !Array.isArray(center) ||
      center.length < 2 ||
      !Number.isFinite(center[0]) ||
      !Number.isFinite(center[1])
    ) {
      return null;
    }

    return {
      name: feature.text,
      lat: center[1],
      lng: center[0],
      formattedAddress: feature.place_name,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface MapViewProps {
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  demandIndex?: number; // For heatmap coloring
  onMapboxTokenSet?: (token: string) => void;
}

const MapView = ({ 
  center = [78.9629, 20.5937], // Center of India
  zoom = 4.5,
  demandIndex = 50,
  onMapboxTokenSet,
}: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [tokenError, setTokenError] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize map when token is available
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || isInitialized) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: center,
        zoom: zoom,
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        "top-right"
      );

      // Add marker at center
      new mapboxgl.Marker({ color: "#06b6d4" })
        .setLngLat(center)
        .addTo(map.current);

      // Add heatmap effect based on demand
      map.current.on("load", () => {
        if (!map.current) return;

        // Create circle layer for demand visualization
        const heatColor = 
          demandIndex > 70 ? "#10b981" : // Green for high demand
          demandIndex > 40 ? "#f59e0b" : // Orange for medium
          "#ef4444"; // Red for low

        map.current.addLayer({
          id: "demand-zone",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: center,
              },
              properties: {},
            },
          },
          paint: {
            "circle-radius": 80,
            "circle-color": heatColor,
            "circle-opacity": 0.3,
            "circle-blur": 1,
          },
        });
      });

      setIsInitialized(true);
      setTokenError(false);
      
      if (onMapboxTokenSet) {
        onMapboxTokenSet(mapboxToken);
      }
    } catch (error) {
      console.error("Map initialization error:", error);
      setTokenError(true);
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, isInitialized]);

  // Update map center when props change
  useEffect(() => {
    if (map.current && isInitialized) {
      map.current.flyTo({
        center: center,
        zoom: zoom,
        duration: 2000,
      });

      // Update marker
      const markers = document.getElementsByClassName("mapboxgl-marker");
      while (markers[0]) {
        markers[0].remove();
      }
      
      new mapboxgl.Marker({ color: "#06b6d4" })
        .setLngLat(center)
        .addTo(map.current);
    }
  }, [center, zoom, isInitialized]);

  if (!mapboxToken) {
    return (
      <div className="w-full h-[400px] bg-card border border-border rounded-lg p-8 flex flex-col items-center justify-center gap-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-warning mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Mapbox Token Required</h3>
          <p className="text-sm text-muted-foreground mb-4">
            To display the interactive map, please enter your Mapbox public token.
            Get yours free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
          </p>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="pk.eyJ1IjoiZXhhbXBsZS..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="font-mono text-xs"
            />
            <Button
              onClick={() => {
                if (mapboxToken.startsWith("pk.")) {
                  setTokenError(false);
                } else {
                  setTokenError(true);
                }
              }}
            >
              Load Map
            </Button>
          </div>
          {tokenError && (
            <p className="text-destructive text-xs mt-2">
              Invalid token format. Token should start with "pk."
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-4">
            💡 Tip: For production, add MAPBOX_PUBLIC_TOKEN to environment variables
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 text-xs">
        <div className="font-semibold mb-2">Demand Heat Zone</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-success"></div>
          <span>High Demand (&gt;70)</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <span>Medium Demand (40-70)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <span>Low Demand (&lt;40)</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;

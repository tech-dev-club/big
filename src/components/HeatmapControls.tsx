import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map, Users, Zap } from "lucide-react";

interface HeatmapControlsProps {
  activeHeatmap: "demand" | "competition" | "opportunity";
  onHeatmapChange: (type: "demand" | "competition" | "opportunity") => void;
}

const HeatmapControls = ({ activeHeatmap, onHeatmapChange }: HeatmapControlsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={activeHeatmap === "demand" ? "default" : "outline"}
        size="sm"
        onClick={() => onHeatmapChange("demand")}
        className="gap-2"
      >
        <Map className="w-4 h-4" />
        Demand Heatmap
        {activeHeatmap === "demand" && (
          <Badge variant="secondary" className="ml-1 text-xs">Active</Badge>
        )}
      </Button>

      <Button
        variant={activeHeatmap === "competition" ? "default" : "outline"}
        size="sm"
        onClick={() => onHeatmapChange("competition")}
        className="gap-2"
      >
        <Users className="w-4 h-4" />
        Competition Heatmap
        {activeHeatmap === "competition" && (
          <Badge variant="secondary" className="ml-1 text-xs">Active</Badge>
        )}
      </Button>

      <Button
        variant={activeHeatmap === "opportunity" ? "default" : "outline"}
        size="sm"
        onClick={() => onHeatmapChange("opportunity")}
        className="gap-2"
      >
        <Zap className="w-4 h-4" />
        Opportunity Zones
        {activeHeatmap === "opportunity" && (
          <Badge variant="secondary" className="ml-1 text-xs">Active</Badge>
        )}
      </Button>
    </div>
  );
};

export default HeatmapControls;

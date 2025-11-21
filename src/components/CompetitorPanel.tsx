import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  TrendingUp, 
  MapPin, 
  Star, 
  AlertTriangle,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { type CompetitionAnalysis } from "@/services/competitionScanner";
import { formatDistance } from "@/lib/distanceCalc";

interface CompetitorPanelProps {
  analysis: CompetitionAnalysis;
}

const CompetitorPanel = ({ analysis }: CompetitorPanelProps) => {
  const getDensityColor = (density: string) => {
    switch (density) {
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      case "Balanced": return "text-blue-600 bg-blue-50 border-blue-200";
      case "High": return "text-orange-600 bg-orange-50 border-orange-200";
      case "Oversaturated": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getDensityIcon = (density: string) => {
    switch (density) {
      case "Low": return <CheckCircle2 className="w-5 h-5" />;
      case "Balanced": return <TrendingUp className="w-5 h-5" />;
      case "High": return <AlertCircle className="w-5 h-5" />;
      case "Oversaturated": return <AlertTriangle className="w-5 h-5" />;
      default: return <Users className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Competition Overview */}
      <Card className="p-4 bg-card border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Competition Analysis
          </h3>
          <Badge variant="outline" className="text-sm">
            {analysis.totalCount} Competitors
          </Badge>
        </div>

        {/* Density Indicator */}
        <div className={`p-4 rounded-lg border-2 mb-4 ${getDensityColor(analysis.competitionDensity)}`}>
          <div className="flex items-center gap-3 mb-2">
            {getDensityIcon(analysis.competitionDensity)}
            <div>
              <div className="font-semibold text-lg">{analysis.competitionDensity}</div>
              <div className="text-sm opacity-80">Competition Density</div>
            </div>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2 mt-2">
            <div 
              className="h-2 rounded-full bg-current transition-all"
              style={{ width: `${analysis.densityScore}%` }}
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Avg Distance</div>
            <div className="text-lg font-semibold">
              {formatDistance(analysis.averageDistance)}
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Avg Rating</div>
            <div className="text-lg font-semibold flex items-center gap-1">
              {analysis.averageRating.toFixed(1)}
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Strategic Recommendations:
          </div>
          {analysis.recommendations.map((rec, index) => (
            <div 
              key={index}
              className="flex items-start gap-2 text-sm p-2 bg-muted/50 rounded"
            >
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Nearest Competitors */}
      <Card className="p-4 bg-card border-border">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Top 5 Nearest Competitors
        </h4>
        <ScrollArea className="h-[240px]">
          <div className="space-y-3">
            {analysis.nearestCompetitors.map((competitor, index) => (
              <div 
                key={competitor.id}
                className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      {competitor.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatDistance(competitor.distance)} away
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{competitor.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {competitor.priceLevel}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {competitor.reviewCount} reviews
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default CompetitorPanel;

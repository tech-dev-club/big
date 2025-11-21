import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  DollarSign, 
  Target, 
  Users, 
  TrendingUp,
  Wrench,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { type CategoryIntelligence } from "@/lib/categoryEngine";

interface CategoryIntelligenceCardProps {
  intelligence: CategoryIntelligence;
}

const CategoryIntelligenceCard = ({ intelligence }: CategoryIntelligenceCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Low": return "bg-green-100 text-green-700 border-green-300";
      case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "High": return "bg-orange-100 text-orange-700 border-orange-300";
      case "Very High": return "bg-red-100 text-red-700 border-red-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getCapitalColor = (capital: string) => {
    switch (capital) {
      case "Low": return "text-green-600";
      case "Medium": return "text-yellow-600";
      case "High": return "text-orange-600";
      case "Very High": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted/30 border-border">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold">Category Intelligence</h3>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Difficulty */}
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Target className="w-4 h-4" />
            Difficulty Level
          </div>
          <Badge className={`${getDifficultyColor(intelligence.difficulty)} text-sm px-3 py-1`}>
            {intelligence.difficulty}
          </Badge>
          <div className="text-xs text-muted-foreground">
            Ease Score: {intelligence.categoryEaseScore}/100
          </div>
        </div>

        {/* Capital Need */}
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Capital Requirement
          </div>
          <div className={`text-lg font-bold ${getCapitalColor(intelligence.capitalNeed)}`}>
            {intelligence.capitalNeed}
          </div>
        </div>

        {/* Operational Complexity */}
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Operations
          </div>
          <div className="text-lg font-semibold">
            {intelligence.operationalComplexity}
          </div>
        </div>

        {/* Footfall */}
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Users className="w-4 h-4" />
            Required Footfall
          </div>
          <div className="text-lg font-semibold">
            {intelligence.requiredFootfall}
          </div>
        </div>
      </div>

      {/* Customer Profile */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          Target Customer Profile
        </div>
        <p className="text-sm">{intelligence.customerProfile}</p>
      </div>

      {/* Pricing Segment */}
      <div className="mb-6">
        <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          Recommended Pricing Segment
        </div>
        <Badge variant="outline" className="text-sm">
          {intelligence.pricingSegment}
        </Badge>
      </div>

      {/* Growth Bias */}
      <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-medium">Growth Multiplier</span>
          </div>
          <div className="text-2xl font-bold text-primary">
            {intelligence.growthBias}x
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Category-specific growth acceleration factor
        </div>
      </div>

      {/* Success Factors */}
      <div className="mb-4">
        <div className="text-sm font-medium mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          Key Success Factors
        </div>
        <div className="space-y-2">
          {intelligence.keySuccessFactors.map((factor, index) => (
            <div 
              key={index}
              className="flex items-start gap-2 text-sm p-2 bg-green-50 text-green-700 rounded border border-green-200"
            >
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{factor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Common Challenges */}
      <div>
        <div className="text-sm font-medium mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-600" />
          Common Challenges
        </div>
        <div className="space-y-2">
          {intelligence.commonChallenges.map((challenge, index) => (
            <div 
              key={index}
              className="flex items-start gap-2 text-sm p-2 bg-orange-50 text-orange-700 rounded border border-orange-200"
            >
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{challenge}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CategoryIntelligenceCard;

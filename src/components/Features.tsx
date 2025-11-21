import { Map, Brain, BarChart3, Target, Zap, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Map,
      title: "Location Intelligence",
      description: "Transform any location into actionable market insights with real-time geo-analysis.",
      color: "primary",
    },
    {
      icon: Brain,
      title: "AI Opportunity Scoring",
      description: "Scientific BizScore algorithm evaluates demand, competition, and profitability instantly.",
      color: "secondary",
    },
    {
      icon: BarChart3,
      title: "Predictive Forecasting",
      description: "See the future with growth predictions, saturation alerts, and market trend analysis.",
      color: "success",
    },
    {
      icon: Target,
      title: "Feasibility Reports",
      description: "Get instant MBA-level business analysis with risk assessment and strategy guidance.",
      color: "primary",
    },
    {
      icon: Zap,
      title: "Real-Time Analytics",
      description: "Live market data streams and competitive density mapping for up-to-the-minute insights.",
      color: "secondary",
    },
    {
      icon: Shield,
      title: "Risk Intelligence",
      description: "Identify regulatory friction, market barriers, and hidden challenges before you start.",
      color: "success",
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Complete Entrepreneurial{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Intelligence System
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every tool you need to make confident, data-driven business decisions in one unified platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-4 relative">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

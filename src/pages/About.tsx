import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Radar, Target, Zap, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Data-Driven Decisions",
      description: "We eliminate guesswork by providing scientific, evidence-based business intelligence.",
    },
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description: "What takes weeks of research, we deliver in seconds with AI-powered analysis.",
    },
    {
      icon: Shield,
      title: "Risk Reduction",
      description: "Identify challenges and barriers before you invest time and money.",
    },
    {
      icon: Radar,
      title: "Future-Focused",
      description: "Predictive modeling helps you see opportunities before the market saturates.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <Radar className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                BizRadar
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              The entrepreneurial intelligence platform that transforms how you discover and evaluate business opportunities.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="p-8 mb-12 bg-card border-border">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              BizRadar exists to democratize entrepreneurial intelligence. We believe that anyone, anywhere should be able to discover the best business opportunities with the same level of insight that large corporations have access to.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              By combining location science, AI analysis, predictive forecasting, and real-time market data, we've created the world's first complete entrepreneurial intelligence system - your startup GPS.
            </p>
          </Card>

          {/* What Makes Us Different */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">What Makes BizRadar Different</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* The BizRadar System */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-6">The BizRadar Intelligence System</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location Intelligence</h3>
                  <p className="text-muted-foreground">Transform any location into actionable market insights with real-time geo-analysis and demand mapping.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">AI Opportunity Scoring</h3>
                  <p className="text-muted-foreground">Our proprietary BizScore algorithm evaluates demand, competition, growth potential, and profitability.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Predictive Forecasting</h3>
                  <p className="text-muted-foreground">See the future with growth predictions, saturation alerts, and market trend analysis.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Instant Feasibility</h3>
                  <p className="text-muted-foreground">Receive MBA-level business analysis with risk assessment and strategic guidance in seconds.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;

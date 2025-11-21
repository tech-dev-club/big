import { TrendingUp, Users, MapPin, Sparkles } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: MapPin,
      value: "500+",
      label: "Cities Analyzed",
      color: "primary",
    },
    {
      icon: TrendingUp,
      value: "10K+",
      label: "Opportunities Found",
      color: "success",
    },
    {
      icon: Users,
      value: "5K+",
      label: "Entrepreneurs Guided",
      color: "secondary",
    },
    {
      icon: Sparkles,
      value: "95%",
      label: "Accuracy Rate",
      color: "primary",
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="mb-4 inline-flex items-center justify-center">
                  <div className="relative">
                    <Icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;

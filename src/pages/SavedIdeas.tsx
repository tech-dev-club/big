import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Bookmark, MapPin, TrendingUp, DollarSign, Trash2, Eye, BarChart3, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/financeEngine";

interface SavedIdea {
  id: string;
  location: string;
  category: string;
  biz_score_today: number;
  biz_score_12m: number;
  competition_density: string;
  forecast_growth: number;
  demand_index: number;
  financials: any;
  created_at: string;
}

const SavedIdeas = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadSavedIdeas();
    }
  }, [user]);

  const loadSavedIdeas = async () => {
    try {
      const { data, error } = await supabase
        .from("saved_ideas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSavedIdeas(data || []);
    } catch (error: any) {
      toast.error("Failed to load saved ideas: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("saved_ideas")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setSavedIdeas(savedIdeas.filter(idea => idea.id !== id));
      setSelectedForComparison(selectedForComparison.filter(selectedId => selectedId !== id));
      toast.success("Idea removed from saved list");
    } catch (error: any) {
      toast.error("Failed to delete: " + error.message);
    }
  };

  const toggleSelection = (id: string) => {
    if (selectedForComparison.includes(id)) {
      setSelectedForComparison(selectedForComparison.filter(selectedId => selectedId !== id));
    } else {
      if (selectedForComparison.length >= 5) {
        toast.error("You can compare up to 5 ideas at once");
        return;
      }
      setSelectedForComparison([...selectedForComparison, id]);
    }
  };

  const handleCompare = () => {
    if (selectedForComparison.length < 2) {
      toast.error("Select at least 2 ideas to compare");
      return;
    }
    
    // Navigate to compare page with selected IDs
    navigate(`/compare?ids=${selectedForComparison.join(",")}`);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Saved Ideas</h1>
            <p className="text-muted-foreground">
              Your shortlisted business opportunities ({savedIdeas.length})
            </p>
          </div>
          
          {selectedForComparison.length > 0 && (
            <Button onClick={handleCompare} size="lg">
              <BarChart3 className="mr-2 h-5 w-5" />
              Compare {selectedForComparison.length} Ideas
            </Button>
          )}
        </div>

        {savedIdeas.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <Bookmark className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No saved ideas yet</h3>
              <p className="text-muted-foreground mb-6">
                Start exploring opportunities and save your favorites to compare them later
              </p>
              <Button onClick={() => navigate("/opportunities")}>
                Explore Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedIdeas.map((idea) => (
              <Card 
                key={idea.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedForComparison.includes(idea.id) ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => toggleSelection(idea.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{idea.category}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {idea.location}
                      </CardDescription>
                    </div>
                    <Badge variant={getBadgeVariant(idea.biz_score_today)}>
                      {Math.round(idea.biz_score_today)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">BizScore Today</p>
                      <p className="font-semibold text-lg">{Math.round(idea.biz_score_today)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">12M Forecast</p>
                      <div className="flex items-center gap-1">
                        <p className="font-semibold text-lg">{Math.round(idea.biz_score_12m)}</p>
                        {idea.biz_score_12m > idea.biz_score_today && (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Competition:</span>
                      <span className="font-medium">{idea.competition_density}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Growth:</span>
                      <span className="font-medium">
                        {((idea.forecast_growth - 1) * 100).toFixed(0)}%
                      </span>
                    </div>
                    {idea.financials && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Break-even:</span>
                        <span className="font-medium">
                          {idea.financials.breakEvenMonths} months
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(idea.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 text-center">
                    {selectedForComparison.includes(idea.id) && (
                      <Badge variant="secondary">Selected</Badge>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Floating comparison bar */}
      {selectedForComparison.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg flex items-center gap-4 z-50">
          <span className="font-medium">
            {selectedForComparison.length} idea{selectedForComparison.length > 1 ? "s" : ""} selected
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSelectedForComparison([])}
          >
            Clear
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCompare}
          >
            Compare Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedIdeas;
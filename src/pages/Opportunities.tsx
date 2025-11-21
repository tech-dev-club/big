import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, TrendingUp, Sparkles, Target } from "lucide-react";
import { searchIndianCities, LocationData } from "@/services/geocoding";
import { generateMarketData, generateOpportunities } from "@/services/marketData";
import { calculateBizScore, getScoreRating } from "@/services/scoring";
import { generateForecast } from "@/services/forecastEngine";
import { generateHistoricalTrends } from "@/services/trendSimulator";
import { scanCompetition } from "@/services/competitionScanner";
import { getCategoryIntelligence } from "@/lib/categoryEngine";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import MapView from "@/components/MapView";
import OpportunityCardEnhanced from "@/components/OpportunityCardEnhanced";

const Opportunities = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [marketData, setMarketData] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  // Handle location search
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (value.length >= 2) {
      const results = searchIndianCities(value);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Handle location selection
  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    setSearchInput(location.formattedAddress);
    setSearchResults([]);
  };

  // Handle opportunity search
  const handleAnalyze = () => {
    if (!selectedLocation || !selectedCategory) return;

    const market = generateMarketData(selectedLocation.name, selectedLocation.population);
    setMarketData(market);
    
    const opps = generateOpportunities(selectedLocation.name, selectedCategory, market);
    setOpportunities(opps);
    setShowResults(true);
  };


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Powered by AI Market Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Perfect Business Opportunity
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your location and category to discover AI-analyzed opportunities with real market data
            </p>
          </div>

          {/* Search Section */}
          <Card className="p-6 mb-8 bg-card border-border">
            <div className="grid md:grid-cols-12 gap-4">
              {/* Location Search */}
              <div className="md:col-span-5">
                <label className="text-sm font-medium mb-2 block">Location in India</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter city, PIN code, or address..."
                    value={searchInput}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 bg-background border-border"
                  />
                  
                  {/* Search Results Dropdown */}
                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => handleLocationSelect(result)}
                          className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-start gap-3"
                        >
                          <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <div className="font-medium">{result.name}</div>
                            <div className="text-sm text-muted-foreground">{result.state}, India</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Category Selection */}
              <div className="md:col-span-5">
                <label className="text-sm font-medium mb-2 block">Business Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select a category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Analyze Button */}
              <div className="md:col-span-2 flex items-end">
                <Button
                  onClick={handleAnalyze}
                  disabled={!selectedLocation || !selectedCategory}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Analyze
                </Button>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          {showResults && (
            <>
              {/* Map View */}
              {selectedLocation && (
                <Card className="p-6 mb-8 bg-card border-border">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-primary" />
                    Market Heatmap - {selectedLocation.name}
                  </h2>
                  <MapView 
                    center={[selectedLocation.lng, selectedLocation.lat]}
                    zoom={12}
                    demandIndex={opportunities[0]?.demandIndex || 50}
                  />
                </Card>
              )}

              {/* Opportunities Grid */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Top Opportunities</h2>
                  <Badge variant="outline" className="text-sm">
                    {opportunities.length} opportunities found
                  </Badge>
                </div>
                
                <div className="grid gap-8">
                  {opportunities.map((opp, index) => {
                    const competitionAnalysis = scanCompetition(
                      { lat: selectedLocation!.lat, lng: selectedLocation!.lng },
                      selectedCategory,
                      3
                    );
                    const categoryIntelligence = getCategoryIntelligence(selectedCategory);
                    const bizScoreData = calculateBizScore(
                      marketData, 
                      selectedCategory, 
                      0,
                      competitionAnalysis.densityScore,
                      categoryIntelligence.categoryEaseScore
                    );
                    const forecast = generateForecast(marketData, selectedCategory, opp.bizScore);
                    const trendData = generateHistoricalTrends(
                      marketData.demandIndex,
                      marketData.competitionIndex,
                      selectedCategory
                    );
                    const scoreRating = getScoreRating(opp.bizScore);

                    return (
                      <OpportunityCardEnhanced
                        key={opp.id}
                        opportunity={opp}
                        location={selectedLocation?.formattedAddress || ""}
                        forecast={forecast}
                        trendData={trendData}
                        scoreRating={scoreRating}
                        category={selectedCategory}
                        populationDensity={marketData.populationDensity}
                        competitionAnalysis={competitionAnalysis}
                        categoryIntelligence={categoryIntelligence}
                        opportunityType={bizScoreData.opportunityType}
                        index={index}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Info Banner */}
          {!showResults && (
            <Card className="p-6 bg-primary/5 border-primary/20 text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-lg">How BizRadar Works</h3>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Select your target location and business category. Our AI analyzes real-time market data, 
                competition density, demand patterns, and economic indicators to generate personalized 
                business opportunities with actionable BizScores.
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Opportunities;

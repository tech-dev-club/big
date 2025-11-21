import { getCityTier, TECH_HUB_CITIES } from "@/lib/constants";

export interface MarketData {
  demandIndex: number; // 0-100
  competitionCount: number;
  competitionIndex: number; // 0-100
  populationDensity: number; // per sq km
  avgIncome: number; // in lakhs
  internetPenetration: number; // percentage
  literacyRate: number; // percentage
}

export interface OpportunityData {
  id: string;
  title: string;
  category: string;
  demandIndex: number;
  competition: "Low" | "Medium" | "High";
  competitionCount: number;
  growthRate: string;
  investmentRange: string;
  bizScore: number;
  profitPotential: "Low" | "Medium" | "High";
}

/**
 * Generate mock market data for Indian cities
 * Based on city tier and characteristics
 */
export const generateMarketData = (
  cityName: string,
  population: number = 1000000
): MarketData => {
  const tier = getCityTier(cityName);
  
  // Base values adjusted by tier
  const tierMultipliers = {
    1: { demand: 1.3, competition: 1.5, density: 1.8, income: 1.4 },
    2: { demand: 1.0, competition: 1.0, density: 1.0, income: 1.0 },
    3: { demand: 0.7, competition: 0.6, density: 0.5, income: 0.7 },
  };
  
  const multiplier = tierMultipliers[tier];
  
  // Generate realistic data with some randomness
  const randomFactor = () => 0.85 + Math.random() * 0.3;
  
  return {
    demandIndex: Math.min(100, Math.round(65 * multiplier.demand * randomFactor())),
    competitionCount: Math.round(150 * multiplier.competition * randomFactor()),
    competitionIndex: Math.min(100, Math.round(55 * multiplier.competition * randomFactor())),
    populationDensity: Math.round(8000 * multiplier.density * randomFactor()),
    avgIncome: parseFloat((4.5 * multiplier.income * randomFactor()).toFixed(1)),
    internetPenetration: Math.min(100, Math.round(68 * multiplier.demand * randomFactor())),
    literacyRate: Math.min(100, Math.round(75 + tier * 5 * randomFactor())),
  };
};

/**
 * Generate business opportunities for a location and category
 */
export const generateOpportunities = (
  cityName: string,
  category: string,
  marketData: MarketData
): OpportunityData[] => {
  const tier = getCityTier(cityName);
  const isTechHub = TECH_HUB_CITIES.includes(cityName);
  
  // Comprehensive opportunity templates based on category
  const opportunityTemplates: Record<string, Array<{ title: string; baseScore: number }>> = {
    "food-beverage": [
      { title: "Cloud Kitchen - Multi-Cuisine", baseScore: 82 },
      { title: "Healthy Food Café", baseScore: 78 },
      { title: "Regional Cuisine Restaurant", baseScore: 75 },
      { title: "Dessert & Ice Cream Parlor", baseScore: 72 },
      { title: "Food Delivery Hub", baseScore: 80 },
      { title: "Artisan Bakery & Patisserie", baseScore: 76 },
      { title: "Juice Bar & Smoothie Shop", baseScore: 74 },
      { title: "Biryani Specialty Restaurant", baseScore: 79 },
      { title: "Street Food Chain Outlet", baseScore: 77 },
      { title: "Vegan & Plant-Based Café", baseScore: 81 },
    ],
    "retail": [
      { title: "Organic Grocery Store", baseScore: 76 },
      { title: "Fashion Boutique - Ethnic Wear", baseScore: 74 },
      { title: "Electronics & Gadgets Shop", baseScore: 79 },
      { title: "Kids Products Store", baseScore: 73 },
      { title: "Home Décor & Furnishing", baseScore: 71 },
      { title: "Sports & Fitness Equipment", baseScore: 77 },
      { title: "Premium Cosmetics & Beauty Store", baseScore: 80 },
      { title: "Jewelry & Accessories Boutique", baseScore: 75 },
      { title: "Pet Supplies & Care Store", baseScore: 78 },
      { title: "Stationery & Office Supplies", baseScore: 72 },
    ],
    "technology": [
      { title: "Digital Marketing Agency", baseScore: 85 },
      { title: "Mobile App Development Studio", baseScore: 83 },
      { title: "Web Design & Development", baseScore: 81 },
      { title: "IT Training Institute", baseScore: 77 },
      { title: "Software Consulting Firm", baseScore: 82 },
      { title: "Cybersecurity Services", baseScore: 86 },
      { title: "E-commerce Solutions Provider", baseScore: 84 },
      { title: "Cloud Migration Services", baseScore: 80 },
      { title: "Data Analytics Consulting", baseScore: 83 },
      { title: "IT Support & Managed Services", baseScore: 78 },
    ],
    "tech-ai-ml": [
      { title: "AI Chatbot Development Agency", baseScore: 88 },
      { title: "Computer Vision Solutions", baseScore: 89 },
      { title: "NLP Services & Text Analytics", baseScore: 87 },
      { title: "Predictive Analytics Platform", baseScore: 86 },
      { title: "ML Model Training Services", baseScore: 85 },
      { title: "AI Consulting for Enterprises", baseScore: 90 },
      { title: "Deep Learning Research Lab", baseScore: 84 },
      { title: "AutoML Platform Development", baseScore: 87 },
    ],
    "tech-fintech": [
      { title: "Digital Payment Solutions", baseScore: 89 },
      { title: "P2P Lending Platform", baseScore: 87 },
      { title: "InsurTech Solutions", baseScore: 85 },
      { title: "Personal Finance Management App", baseScore: 84 },
      { title: "Blockchain Payment Gateway", baseScore: 88 },
      { title: "Wealth Management Platform", baseScore: 86 },
      { title: "RegTech Compliance Tools", baseScore: 83 },
      { title: "Robo-Advisory Services", baseScore: 85 },
    ],
    "tech-edtech": [
      { title: "Online Learning Platform - K-12", baseScore: 86 },
      { title: "Skill-Based Micro-Learning App", baseScore: 85 },
      { title: "Virtual Classroom Solutions", baseScore: 84 },
      { title: "Corporate Training Platform", baseScore: 87 },
      { title: "Test Prep & Assessment Tools", baseScore: 83 },
      { title: "Coding Bootcamp Platform", baseScore: 88 },
      { title: "Language Learning App", baseScore: 82 },
      { title: "Higher Education SaaS", baseScore: 85 },
    ],
    "tech-healthtech": [
      { title: "Telemedicine Platform", baseScore: 88 },
      { title: "Health Records Management System", baseScore: 86 },
      { title: "Fitness Tracking App", baseScore: 84 },
      { title: "Mental Health & Therapy App", baseScore: 87 },
      { title: "Diagnostic AI Solutions", baseScore: 89 },
      { title: "Pharmacy Tech Platform", baseScore: 85 },
      { title: "Patient Management System", baseScore: 83 },
      { title: "Healthcare Analytics Platform", baseScore: 86 },
    ],
    "education": [
      { title: "Competitive Exam Coaching", baseScore: 84 },
      { title: "Skill Development Center", baseScore: 79 },
      { title: "Online Learning Platform", baseScore: 81 },
      { title: "Language Institute", baseScore: 75 },
      { title: "Pre-School & Daycare", baseScore: 78 },
      { title: "Professional Certification Courses", baseScore: 82 },
      { title: "Music & Arts Academy", baseScore: 76 },
      { title: "Computer Training Institute", baseScore: 80 },
      { title: "MBA/CAT Coaching Center", baseScore: 85 },
      { title: "Study Abroad Consultancy", baseScore: 83 },
    ],
    "health-wellness": [
      { title: "Boutique Gym & Fitness Studio", baseScore: 80 },
      { title: "Yoga & Meditation Center", baseScore: 76 },
      { title: "Physiotherapy Clinic", baseScore: 78 },
      { title: "Unisex Salon & Spa", baseScore: 74 },
      { title: "Mental Wellness Counseling", baseScore: 82 },
      { title: "Dental Care Clinic", baseScore: 81 },
      { title: "Ayurveda & Wellness Center", baseScore: 77 },
      { title: "Nutrition & Diet Counseling", baseScore: 79 },
      { title: "CrossFit Training Studio", baseScore: 83 },
      { title: "Rehabilitation Center", baseScore: 80 },
    ],
    "services": [
      { title: "Real Estate Consultancy", baseScore: 80 },
      { title: "Event Management Company", baseScore: 78 },
      { title: "Photography & Videography Studio", baseScore: 76 },
      { title: "Interior Design Services", baseScore: 81 },
      { title: "Wedding Planning Services", baseScore: 79 },
      { title: "HR & Recruitment Agency", baseScore: 82 },
      { title: "Legal Documentation Services", baseScore: 77 },
      { title: "Accounting & Tax Advisory", baseScore: 83 },
      { title: "Travel & Tour Services", baseScore: 75 },
      { title: "Home Cleaning Services", baseScore: 74 },
    ],
    "manufacturing": [
      { title: "Textile & Garment Manufacturing", baseScore: 76 },
      { title: "Food Processing Unit", baseScore: 78 },
      { title: "Packaging Solutions", baseScore: 75 },
      { title: "Handicrafts Production", baseScore: 72 },
      { title: "Electronics Assembly Unit", baseScore: 79 },
      { title: "Leather Goods Manufacturing", baseScore: 74 },
      { title: "Furniture Manufacturing", baseScore: 77 },
      { title: "Plastic Products Manufacturing", baseScore: 73 },
      { title: "Metal Fabrication Unit", baseScore: 76 },
      { title: "Automobile Parts Manufacturing", baseScore: 80 },
    ],
    "logistics": [
      { title: "Last-Mile Delivery Service", baseScore: 82 },
      { title: "Warehouse & Storage Solutions", baseScore: 78 },
      { title: "Freight Forwarding Services", baseScore: 80 },
      { title: "Express Courier Service", baseScore: 81 },
      { title: "Cab & Taxi Service", baseScore: 76 },
      { title: "Moving & Relocation Services", baseScore: 75 },
      { title: "Cold Storage Facility", baseScore: 79 },
      { title: "3PL Logistics Provider", baseScore: 83 },
      { title: "Fleet Management Services", baseScore: 77 },
      { title: "Cargo Transport Services", baseScore: 78 },
    ],
    "hospitality": [
      { title: "Budget Hotel", baseScore: 78 },
      { title: "Boutique Resort", baseScore: 82 },
      { title: "Homestay & B&B", baseScore: 75 },
      { title: "Serviced Apartments", baseScore: 80 },
      { title: "Hostel for Backpackers", baseScore: 74 },
      { title: "Luxury Guest House", baseScore: 81 },
      { title: "Adventure Tourism Services", baseScore: 79 },
      { title: "Eco-Tourism Retreat", baseScore: 83 },
      { title: "Heritage Tourism", baseScore: 77 },
      { title: "Corporate Travel Solutions", baseScore: 80 },
    ],
    "automotive": [
      { title: "Multi-Brand Car Service Center", baseScore: 79 },
      { title: "Two-Wheeler Repair Shop", baseScore: 75 },
      { title: "Auto Parts & Accessories Store", baseScore: 77 },
      { title: "Car Wash & Detailing", baseScore: 76 },
      { title: "EV Charging Station", baseScore: 85 },
      { title: "Tire Shop & Service", baseScore: 74 },
      { title: "Auto Body Repair Shop", baseScore: 78 },
      { title: "Car Rental Services", baseScore: 81 },
      { title: "Bike Rental & Sharing", baseScore: 80 },
      { title: "Vehicle Insurance Brokerage", baseScore: 82 },
    ],
    "agriculture": [
      { title: "Organic Farming Consultancy", baseScore: 78 },
      { title: "Agri-Input Supply Store", baseScore: 74 },
      { title: "Cold Storage for Produce", baseScore: 80 },
      { title: "Agri-Tech Solutions Provider", baseScore: 83 },
      { title: "Dairy Farming Operations", baseScore: 76 },
      { title: "Poultry Farm Setup", baseScore: 75 },
      { title: "Seed & Fertilizer Store", baseScore: 73 },
      { title: "Farm Equipment Rental", baseScore: 77 },
      { title: "Hydroponics Farming", baseScore: 82 },
      { title: "Food Processing from Farm", baseScore: 79 },
    ],
    "finance": [
      { title: "Microfinance Services", baseScore: 81 },
      { title: "Investment Advisory", baseScore: 84 },
      { title: "Mutual Fund Distribution", baseScore: 82 },
      { title: "Stock Broking Services", baseScore: 85 },
      { title: "Insurance Agency", baseScore: 80 },
      { title: "Financial Planning Services", baseScore: 83 },
      { title: "Loan & Credit Services", baseScore: 79 },
      { title: "Gold Loan Services", baseScore: 78 },
      { title: "Wealth Management", baseScore: 86 },
      { title: "Tax Filing & Consulting", baseScore: 81 },
    ],
    "media-entertainment": [
      { title: "Content Production House", baseScore: 82 },
      { title: "Recording Studio", baseScore: 78 },
      { title: "Event Management Agency", baseScore: 80 },
      { title: "Artist Management Services", baseScore: 79 },
      { title: "YouTube Content Studio", baseScore: 83 },
      { title: "Podcast Production Studio", baseScore: 81 },
      { title: "Gaming Lounge & Esports", baseScore: 84 },
      { title: "Digital Marketing for Artists", baseScore: 85 },
      { title: "Film Distribution Services", baseScore: 77 },
      { title: "Theatre & Performance Arts", baseScore: 76 },
    ],
    "beauty-personal-care": [
      { title: "Premium Beauty Salon", baseScore: 79 },
      { title: "Men's Grooming Lounge", baseScore: 81 },
      { title: "Luxury Spa Services", baseScore: 82 },
      { title: "Makeup Studio & Academy", baseScore: 80 },
      { title: "Nail Art & Care Salon", baseScore: 76 },
      { title: "Hair Transplant Clinic", baseScore: 85 },
      { title: "Laser Treatment Center", baseScore: 84 },
      { title: "Tattoo & Body Art Studio", baseScore: 78 },
      { title: "Skin Care Clinic", baseScore: 83 },
      { title: "Bridal Makeup Services", baseScore: 77 },
    ],
    "real-estate": [
      { title: "Real Estate Brokerage", baseScore: 82 },
      { title: "Property Management Services", baseScore: 80 },
      { title: "Construction & Builders", baseScore: 78 },
      { title: "Interior Design Consultancy", baseScore: 81 },
      { title: "Architecture Firm", baseScore: 83 },
      { title: "Home Renovation Services", baseScore: 79 },
      { title: "Property Consulting", baseScore: 84 },
      { title: "Real Estate Investment Advisory", baseScore: 85 },
      { title: "Modular Kitchen Solutions", baseScore: 77 },
      { title: "Civil Engineering Services", baseScore: 80 },
    ],
    "sports-fitness": [
      { title: "Sports Academy - Multi-Sport", baseScore: 80 },
      { title: "Cricket Coaching Center", baseScore: 82 },
      { title: "Football Training Academy", baseScore: 81 },
      { title: "Badminton Court & Coaching", baseScore: 79 },
      { title: "Swimming Academy", baseScore: 83 },
      { title: "Sports Equipment Store", baseScore: 76 },
      { title: "CrossFit & Functional Training", baseScore: 84 },
      { title: "Boxing & MMA Academy", baseScore: 78 },
      { title: "Martial Arts Training", baseScore: 77 },
      { title: "Dance & Fitness Studio", baseScore: 80 },
    ],
    "home-lifestyle": [
      { title: "Premium Furniture Store", baseScore: 78 },
      { title: "Home Decor Boutique", baseScore: 76 },
      { title: "Kitchenware & Cookware Store", baseScore: 74 },
      { title: "Bedding & Linen Shop", baseScore: 73 },
      { title: "Garden & Landscaping Store", baseScore: 77 },
      { title: "Pet Shop & Supplies", baseScore: 79 },
      { title: "Aquarium & Fish Store", baseScore: 75 },
      { title: "Plants Nursery", baseScore: 76 },
      { title: "Gift & Souvenir Shop", baseScore: 74 },
      { title: "Home Automation Products", baseScore: 82 },
    ],
    "legal-compliance": [
      { title: "Corporate Law Firm", baseScore: 85 },
      { title: "Legal Documentation Services", baseScore: 79 },
      { title: "Property Law Consultancy", baseScore: 81 },
      { title: "Tax Law Advisory", baseScore: 83 },
      { title: "Immigration Consultancy", baseScore: 82 },
      { title: "Patent & Trademark Services", baseScore: 86 },
      { title: "Compliance Advisory", baseScore: 84 },
      { title: "Arbitration Services", baseScore: 80 },
      { title: "Criminal Law Practice", baseScore: 78 },
      { title: "Legal Tech Solutions", baseScore: 87 },
    ],
  };
  
  // Get templates for the category, fallback to technology if not found
  let templates = opportunityTemplates[category] || opportunityTemplates["technology"];
  
  // For tech hub cities, boost tech-related scores
  const techBoost = isTechHub && category.startsWith("tech") ? 5 : 0;
  
  // Tier adjustment
  const tierAdjustment = tier === 1 ? 5 : tier === 2 ? 0 : -5;
  
  return templates.slice(0, 5).map((template, index) => {
    const adjustedScore = Math.min(95, Math.max(50, template.baseScore + tierAdjustment + techBoost + (Math.random() * 10 - 5)));
    const bizScore = Math.round(adjustedScore);
    
    // Competition logic
    const competitionLevel = 
      marketData.competitionIndex > 70 ? "High" : 
      marketData.competitionIndex > 40 ? "Medium" : 
      "Low";
    
    // Investment ranges based on tier
    const investmentRanges = {
      1: ["₹15L - ₹40L", "₹20L - ₹50L", "₹25L - ₹60L"],
      2: ["₹10L - ₹30L", "₹12L - ₹35L", "₹15L - ₹40L"],
      3: ["₹5L - ₹20L", "₹7L - ₹25L", "₹10L - ₹30L"],
    };
    
    return {
      id: `opp-${category}-${index}`,
      title: template.title,
      category: category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      demandIndex: marketData.demandIndex,
      competition: competitionLevel,
      competitionCount: marketData.competitionCount + Math.round(Math.random() * 50 - 25),
      growthRate: `+${Math.round(15 + Math.random() * 30)}%`,
      investmentRange: investmentRanges[tier][Math.floor(Math.random() * 3)],
      bizScore,
      profitPotential: bizScore > 75 ? "High" : bizScore > 60 ? "Medium" : "Low",
    };
  });
};

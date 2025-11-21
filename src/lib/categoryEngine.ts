/**
 * Category Intelligence Engine
 * Analyzes business categories to provide strategic insights
 */

export interface CategoryIntelligence {
  difficulty: "Low" | "Medium" | "High" | "Very High";
  capitalNeed: "Low" | "Medium" | "High" | "Very High";
  operationalComplexity: "Low" | "Medium" | "High" | "Very High";
  customerProfile: string;
  requiredFootfall: "Low" | "Moderate" | "High" | "Very High";
  growthBias: number; // Multiplier for growth calculations (0.8 - 1.5)
  categoryEaseScore: number; // 0-100, inverse of difficulty
  pricingSegment: "Budget" | "Mid-Range" | "Premium" | "Luxury";
  keySuccessFactors: string[];
  commonChallenges: string[];
}

/**
 * Get comprehensive category intelligence for a business category
 */
export function getCategoryIntelligence(categoryId: string): CategoryIntelligence {
  const categoryMap: Record<string, CategoryIntelligence> = {
    "food-beverage": {
      difficulty: "Medium",
      capitalNeed: "Medium",
      operationalComplexity: "High",
      customerProfile: "Diverse demographics, youth + working professionals",
      requiredFootfall: "High",
      growthBias: 1.15,
      categoryEaseScore: 65,
      pricingSegment: "Mid-Range",
      keySuccessFactors: [
        "Prime location with high footfall",
        "Quality & consistency",
        "Hygiene standards",
        "Quick service"
      ],
      commonChallenges: [
        "High operational costs",
        "Food safety compliance",
        "Staff management",
        "Inventory wastage"
      ]
    },
    "retail": {
      difficulty: "Medium",
      capitalNeed: "High",
      operationalComplexity: "Medium",
      customerProfile: "General consumers, families, working professionals",
      requiredFootfall: "Moderate",
      growthBias: 1.0,
      categoryEaseScore: 70,
      pricingSegment: "Mid-Range",
      keySuccessFactors: [
        "Product variety",
        "Inventory management",
        "Customer service",
        "Competitive pricing"
      ],
      commonChallenges: [
        "High initial inventory investment",
        "Managing stock turnover",
        "Competition from e-commerce",
        "Seasonal demand fluctuations"
      ]
    },
    "technology": {
      difficulty: "High",
      capitalNeed: "High",
      operationalComplexity: "Very High",
      customerProfile: "Tech-savvy professionals, businesses, students",
      requiredFootfall: "Low",
      growthBias: 1.25,
      categoryEaseScore: 55,
      pricingSegment: "Premium",
      keySuccessFactors: [
        "Technical expertise",
        "Innovation & adaptation",
        "After-sales support",
        "Strategic partnerships"
      ],
      commonChallenges: [
        "Rapid technology changes",
        "High skill requirements",
        "Intense competition",
        "High R&D costs"
      ]
    },
    "tech-ai-ml": {
      difficulty: "Very High",
      capitalNeed: "Very High",
      operationalComplexity: "Very High",
      customerProfile: "Enterprises, tech companies, research institutions",
      requiredFootfall: "Low",
      growthBias: 1.35,
      categoryEaseScore: 40,
      pricingSegment: "Luxury",
      keySuccessFactors: [
        "Deep technical expertise in AI/ML",
        "Research & development capability",
        "High-quality data access",
        "Computing infrastructure"
      ],
      commonChallenges: [
        "Extremely high skill requirements",
        "Expensive compute resources",
        "Rapidly evolving field",
        "Talent acquisition & retention"
      ]
    },
    "tech-fintech": {
      difficulty: "Very High",
      capitalNeed: "Very High",
      operationalComplexity: "Very High",
      customerProfile: "Banks, financial institutions, consumers",
      requiredFootfall: "Low",
      growthBias: 1.40,
      categoryEaseScore: 35,
      pricingSegment: "Premium",
      keySuccessFactors: [
        "Regulatory compliance expertise",
        "Security & data protection",
        "Financial domain knowledge",
        "Trust & credibility"
      ],
      commonChallenges: [
        "Complex regulatory environment",
        "High compliance costs",
        "Security risks & fraud prevention",
        "Building user trust"
      ]
    },
    "tech-edtech": {
      difficulty: "High",
      capitalNeed: "High",
      operationalComplexity: "High",
      customerProfile: "Students, educational institutions, professionals",
      requiredFootfall: "Low",
      growthBias: 1.30,
      categoryEaseScore: 50,
      pricingSegment: "Mid-Range",
      keySuccessFactors: [
        "Quality content creation",
        "User engagement & retention",
        "Measurable learning outcomes",
        "Scalable platform"
      ],
      commonChallenges: [
        "Content development costs",
        "Competition from free resources",
        "User engagement challenges",
        "Market saturation"
      ]
    },
    "tech-healthtech": {
      difficulty: "Very High",
      capitalNeed: "Very High",
      operationalComplexity: "Very High",
      customerProfile: "Healthcare providers, patients, hospitals",
      requiredFootfall: "Low",
      growthBias: 1.32,
      categoryEaseScore: 38,
      pricingSegment: "Premium",
      keySuccessFactors: [
        "Healthcare regulatory compliance",
        "Data privacy & HIPAA standards",
        "Clinical validation",
        "Medical expertise partnerships"
      ],
      commonChallenges: [
        "Strict regulatory approvals",
        "Patient data security",
        "Medical liability concerns",
        "Long sales cycles"
      ]
    },
    "education": {
      difficulty: "Medium",
      capitalNeed: "Medium",
      operationalComplexity: "High",
      customerProfile: "Students, parents, working professionals seeking upskilling",
      requiredFootfall: "Moderate",
      growthBias: 1.18,
      categoryEaseScore: 60,
      pricingSegment: "Mid-Range",
      keySuccessFactors: [
        "Quality instructors",
        "Proven curriculum",
        "Certifications & outcomes",
        "Infrastructure & facilities"
      ],
      commonChallenges: [
        "Regulatory compliance",
        "Teacher retention",
        "Seasonal enrollment patterns",
        "Building reputation"
      ]
    },
    "health-wellness": {
      difficulty: "High",
      capitalNeed: "Very High",
      operationalComplexity: "Very High",
      customerProfile: "Health-conscious individuals, families, elderly",
      requiredFootfall: "Moderate",
      growthBias: 1.20,
      categoryEaseScore: 50,
      pricingSegment: "Premium",
      keySuccessFactors: [
        "Qualified professionals",
        "Certifications & licenses",
        "Hygiene & safety",
        "Trust & reputation"
      ],
      commonChallenges: [
        "Strict regulatory requirements",
        "High liability risks",
        "Equipment & maintenance costs",
        "Insurance complexities"
      ]
    },
    "services": {
      difficulty: "Low",
      capitalNeed: "Low",
      operationalComplexity: "Low",
      customerProfile: "General consumers, households, businesses",
      requiredFootfall: "Low",
      growthBias: 1.08,
      categoryEaseScore: 80,
      pricingSegment: "Budget",
      keySuccessFactors: [
        "Skill & expertise",
        "Customer satisfaction",
        "Flexible scheduling",
        "Word-of-mouth referrals"
      ],
      commonChallenges: [
        "Building initial client base",
        "Managing appointments",
        "Pricing competition",
        "Scaling operations"
      ]
    },
    "manufacturing": {
      difficulty: "High",
      capitalNeed: "Very High",
      operationalComplexity: "High",
      customerProfile: "Wholesalers, retailers, B2B clients, exporters",
      requiredFootfall: "Low",
      growthBias: 1.10,
      categoryEaseScore: 48,
      pricingSegment: "Mid-Range",
      keySuccessFactors: [
        "Production capacity",
        "Quality control",
        "Supply chain efficiency",
        "Cost management"
      ],
      commonChallenges: [
        "High capital investment",
        "Raw material price volatility",
        "Labor management",
        "Environmental regulations"
      ]
    },
    "logistics": {
      difficulty: "Medium",
      capitalNeed: "High",
      operationalComplexity: "High",
      customerProfile: "E-commerce, businesses, individuals, corporates",
      requiredFootfall: "Low",
      growthBias: 1.22,
      categoryEaseScore: 58,
      pricingSegment: "Mid-Range",
      keySuccessFactors: [
        "Fleet management",
        "Technology integration",
        "Timely deliveries",
        "Cost optimization"
      ],
      commonChallenges: [
        "Fuel cost fluctuations",
        "Vehicle maintenance",
        "Route optimization",
        "Competition pricing"
      ]
    },
    "hospitality": {
      difficulty: "High",
      capitalNeed: "Very High",
      operationalComplexity: "High",
      customerProfile: "Travelers, tourists, business professionals, event planners",
      requiredFootfall: "Moderate",
      growthBias: 1.15,
      categoryEaseScore: 55,
      pricingSegment: "Premium",
      keySuccessFactors: [
        "Service excellence",
        "Cleanliness & hygiene",
        "Location & accessibility",
        "Online reputation"
      ],
      commonChallenges: [
        "High fixed costs",
        "Staff training & retention",
        "Seasonal fluctuations",
        "Regulatory compliance"
      ]
    },
    "automotive": {
      difficulty: "Medium",
      capitalNeed: "High",
      operationalComplexity: "Medium",
      customerProfile: "Vehicle owners, fleet operators, corporates",
      requiredFootfall: "Moderate",
      growthBias: 1.12,
      categoryEaseScore: 62,
      pricingSegment: "Mid-Range",
      keySuccessFactors: [
        "Technical expertise",
        "Genuine parts availability",
        "Quick turnaround time",
        "Warranty & guarantees"
      ],
      commonChallenges: [
        "Skilled technician shortage",
        "Parts inventory management",
        "Technology upgrades",
        "Customer trust building"
      ]
    },
    "agriculture": {
      difficulty: "High",
      capitalNeed: "High",
      operationalComplexity: "Very High",
      customerProfile: "Farmers, agri-businesses, food processors",
      requiredFootfall: "Low",
      growthBias: 1.08,
      categoryEaseScore: 45,
      pricingSegment: "Budget",
      keySuccessFactors: [
        "Agricultural knowledge",
        "Weather management",
        "Market linkages",
        "Government schemes access"
      ],
      commonChallenges: [
        "Weather dependency",
        "Market price fluctuations",
        "Storage & wastage",
        "Working capital needs"
      ]
    },
    "finance": {
      difficulty: "Very High",
      capitalNeed: "High",
      operationalComplexity: "Very High",
      customerProfile: "Individuals, businesses, HNIs, institutions",
      requiredFootfall: "Low",
      growthBias: 1.28,
      categoryEaseScore: 42,
      pricingSegment: "Premium",
      keySuccessFactors: [
        "Regulatory compliance",
        "Trust & credibility",
        "Financial expertise",
        "Risk management"
      ],
      commonChallenges: [
        "Strict RBI/SEBI regulations",
        "Capital adequacy requirements",
        "NPA management",
        "Compliance costs"
      ]
    },
    "media-entertainment": {
      difficulty: "Medium",
      capitalNeed: "High",
      operationalComplexity: "Medium",
      customerProfile: "Youth, content consumers, advertisers, brands",
      requiredFootfall: "Low",
      growthBias: 1.18,
      categoryEaseScore: 65,
      pricingSegment: "Mid-Range",
      keySuccessFactors: [
        "Creative talent",
        "Content quality",
        "Audience engagement",
        "Distribution channels"
      ],
      commonChallenges: [
        "Content production costs",
        "Copyright & licensing",
        "Monetization challenges",
        "Audience retention"
      ]
    },
    "beauty-personal-care": {
      difficulty: "Medium",
      capitalNeed: "Medium",
      operationalComplexity: "Medium",
      customerProfile: "Men, women, professionals, social events attendees",
      requiredFootfall: "Moderate",
      growthBias: 1.14,
      categoryEaseScore: 68,
      pricingSegment: "Mid-Range",
      keySuccessFactors: [
        "Skilled professionals",
        "Hygiene standards",
        "Product quality",
        "Customer experience"
      ],
      commonChallenges: [
        "Staff training & retention",
        "Competition saturation",
        "Trend changes",
        "Client loyalty building"
      ]
    },
    "real-estate": {
      difficulty: "High",
      capitalNeed: "Very High",
      operationalComplexity: "High",
      customerProfile: "Property buyers, investors, corporates, NRIs",
      requiredFootfall: "Low",
      growthBias: 1.16,
      categoryEaseScore: 52,
      pricingSegment: "Premium",
      keySuccessFactors: [
        "Market knowledge",
        "Trust & transparency",
        "Legal expertise",
        "Network & connections"
      ],
      commonChallenges: [
        "RERA compliance",
        "High transaction values",
        "Market cyclicality",
        "Payment collection"
      ]
    },
    "sports-fitness": {
      difficulty: "Medium",
      capitalNeed: "High",
      operationalComplexity: "Medium",
      customerProfile: "Youth, fitness enthusiasts, athletes, parents",
      requiredFootfall: "Moderate",
      growthBias: 1.20,
      categoryEaseScore: 64,
      pricingSegment: "Mid-Range",
      keySuccessFactors: [
        "Qualified trainers",
        "Quality equipment",
        "Result-oriented programs",
        "Safety protocols"
      ],
      commonChallenges: [
        "Equipment costs",
        "Trainer retention",
        "Membership churn",
        "Space requirements"
      ]
    },
    "home-lifestyle": {
      difficulty: "Medium",
      capitalNeed: "High",
      operationalComplexity: "Medium",
      customerProfile: "Homeowners, interior designers, newlyweds",
      requiredFootfall: "Moderate",
      growthBias: 1.10,
      categoryEaseScore: 66,
      pricingSegment: "Mid-Range",
      keySuccessFactors: [
        "Product variety",
        "Design aesthetics",
        "Quality & durability",
        "After-sales service"
      ],
      commonChallenges: [
        "Inventory costs",
        "Trend sensitivity",
        "E-commerce competition",
        "Logistics management"
      ]
    },
    "legal-compliance": {
      difficulty: "Very High",
      capitalNeed: "Medium",
      operationalComplexity: "Very High",
      customerProfile: "Businesses, individuals, corporates, startups",
      requiredFootfall: "Low",
      growthBias: 1.12,
      categoryEaseScore: 44,
      pricingSegment: "Premium",
      keySuccessFactors: [
        "Legal expertise",
        "Professional reputation",
        "Client confidentiality",
        "Case success rate"
      ],
      commonChallenges: [
        "Long qualification period",
        "Building reputation",
        "Client acquisition costs",
        "Professional indemnity"
      ]
    },
    "entertainment": {
      difficulty: "Medium",
      capitalNeed: "High",
      operationalComplexity: "Medium",
      customerProfile: "Youth, families, tourists, event organizers",
      requiredFootfall: "High",
      growthBias: 1.12,
      categoryEaseScore: 65,
      pricingSegment: "Mid-Range",
      keySuccessFactors: [
        "Unique experience",
        "Marketing & promotions",
        "Location accessibility",
        "Safety & comfort"
      ],
      commonChallenges: [
        "Seasonal demand",
        "High operational costs",
        "Entertainment licenses",
        "Trend sensitivity"
      ]
    }
  };

  // Return category intelligence or default for unknown categories
  return categoryMap[categoryId] || {
    difficulty: "Medium",
    capitalNeed: "Medium",
    operationalComplexity: "Medium",
    customerProfile: "General consumers",
    requiredFootfall: "Moderate",
    growthBias: 1.0,
    categoryEaseScore: 65,
    pricingSegment: "Mid-Range",
    keySuccessFactors: [
      "Quality products/services",
      "Customer satisfaction",
      "Competitive pricing",
      "Strategic location"
    ],
    commonChallenges: [
      "Competition",
      "Market volatility",
      "Customer acquisition",
      "Operational efficiency"
    ]
  };
}

/**
 * Calculate category ease score (0-100)
 * Inverse of difficulty - easier categories score higher
 */
export function calculateCategoryEaseScore(difficulty: string): number {
  const difficultyMap: Record<string, number> = {
    "Low": 85,
    "Medium": 65,
    "High": 45,
    "Very High": 25
  };
  return difficultyMap[difficulty] || 65;
}

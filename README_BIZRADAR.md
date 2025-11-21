# BizRadar - AI-Powered Entrepreneurial Intelligence Platform

## 🚀 Overview

BizRadar is a complete entrepreneurial intelligence system designed for the Indian market. It helps entrepreneurs discover, analyze, and validate business opportunities using AI-powered market analysis, location intelligence, and predictive forecasting.

## 📁 Project Structure

```
src/
├── components/          # UI Components
│   ├── Navigation.tsx   # Main navigation bar
│   ├── Hero.tsx         # Landing page hero section
│   ├── Features.tsx     # Features showcase
│   ├── Stats.tsx        # Statistics display
│   └── MapView.tsx      # Interactive Mapbox integration
│
├── pages/               # Application Pages
│   ├── Index.tsx        # Home/Landing page
│   ├── Opportunities.tsx # Main search & analysis page
│   ├── FeasibilityReport.tsx # Detailed opportunity report
│   ├── About.tsx        # About BizRadar
│   └── Contact.tsx      # Contact form
│
├── services/            # Business Logic Services
│   ├── geocoding.ts     # Location search & geocoding (Indian cities)
│   ├── marketData.ts    # Market data generation & opportunity finder
│   ├── scoring.ts       # BizScore calculation engine
│   └── ai.ts            # AI feasibility summary generator
│
└── lib/                 # Utilities & Constants
    └── constants.ts     # Indian cities database & business categories
```

## 🎯 Core Features

### 1. **Location Intelligence**
- Search by city name, PIN code, or address
- 25+ major Indian cities pre-configured
- Auto-complete with city search
- Coordinate conversion (lat/lng)
- Real-time map visualization with heatmaps

### 2. **Market Data Engine**
- **Mock data generation** based on city tier (Tier 1, 2, 3)
- Key metrics:
  - Demand Index (0-100)
  - Competition Count & Index
  - Population Density
  - Average Income
  - Internet Penetration
  - Literacy Rate

### 3. **BizScore Calculator**
Formula: `Score = (demandIndex * 0.5) + (competitionIndex * -0.3) + (populationDensity * 0.2) + economicFactors`

Components:
- Demand Score
- Competition Score
- Location Score
- Economic Score

### 4. **Opportunity Discovery**
- 8 business categories (Food & Beverage, Retail, Technology, Education, Health, etc.)
- 5 opportunities per category
- Tier-adjusted scoring
- Investment range estimates
- Growth rate predictions

### 5. **AI Feasibility Reports**
Generates comprehensive reports with:
- Executive summary
- Key market insights (5 points)
- Actionable recommendations (5 points)
- Risk analysis (5 points)
- Timeline estimates

### 6. **Interactive Heatmap**
- Mapbox integration
- Color-coded demand zones (green/yellow/red)
- Location markers
- Navigation controls
- Demand visualization overlay

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS + Shadcn UI
- **Maps**: Mapbox GL JS
- **Routing**: React Router v6
- **State**: React hooks
- **Build**: Vite

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Mapbox account (free tier) for maps

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project
cd bizradar

# Install dependencies
npm install

# Start development server
npm run dev
```

### Mapbox Setup

1. Create free account at https://mapbox.com
2. Get your public token from the dashboard
3. Enter token in the MapView component when prompted

**For production:**
Add to environment variables:
```bash
VITE_MAPBOX_PUBLIC_TOKEN=pk.your_token_here
```

## 📊 Data Sources

### Current Implementation (Mock Data)
- City coordinates: Hardcoded in `lib/constants.ts`
- Market data: Generated algorithmically in `services/marketData.ts`
- Opportunities: Template-based with tier adjustments

### Future Upgrades (Placeholders Ready)
- Real geocoding: Mapbox Geocoding API
- Live market data: External APIs (Google Places, Census data)
- Competition data: Web scraping or business directories
- Economic data: Government APIs (RBI, MOSPI)

## 🎨 Key Workflows

### 1. Opportunity Search Flow
```
User Input (City + Category)
    ↓
Geocoding Service → Get coordinates
    ↓
Market Data Service → Generate metrics
    ↓
Scoring Service → Calculate BizScore
    ↓
Display Opportunities + Map
```

### 2. Feasibility Report Flow
```
Select Opportunity
    ↓
Load Market Data
    ↓
Calculate Score Breakdown
    ↓
AI Service → Generate Summary
    ↓
Display Comprehensive Report
```

## 🔧 Extensibility

### Adding New Cities
Edit `src/lib/constants.ts`:
```typescript
export const INDIAN_CITIES = [
  { name: "YourCity", state: "State", lat: XX.XXXX, lng: YY.YYYY, population: XXXXXX },
  // ... more cities
];
```

### Adding Business Categories
Edit `src/lib/constants.ts`:
```typescript
export const BUSINESS_CATEGORIES = [
  {
    id: "your-category",
    name: "Your Category",
    subcategories: ["Sub1", "Sub2", "Sub3"],
  },
  // ... more categories
];
```

### Adding Real APIs

**For Geocoding:**
```typescript
// src/services/geocoding.ts
export const geocodeLocation = async (query: string, apiKey: string) => {
  // Add your API call here
};
```

**For Market Data:**
```typescript
// src/services/marketData.ts
export const fetchRealMarketData = async (cityName: string) => {
  // Integrate with real data sources
};
```

**For AI Summaries:**
```typescript
// src/services/ai.ts
export const callLLMAPI = async (prompt: string) => {
  // Call OpenAI, Anthropic, or other LLM
  const response = await fetch('https://api.openai.com/v1/completions', {
    // API configuration
  });
  return response;
};
```

## 📈 Future Enhancements

### High Priority
- [ ] User authentication & saved opportunities
- [ ] Real-time data integration
- [ ] Comparison tool (side-by-side analysis)
- [ ] PDF report export
- [ ] Mobile responsive improvements

### Medium Priority
- [ ] Predictive forecasting module
- [ ] Competitor analysis tool
- [ ] Investment calculator
- [ ] Franchise listing marketplace
- [ ] Multi-language support (Hindi, regional languages)

### Low Priority
- [ ] Social sharing
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Blog/resources section

## 🐛 Known Limitations

1. **Mock Data**: All market data is algorithmically generated, not real-time
2. **PIN Code**: PIN code lookup is mocked (needs India Post API)
3. **Map Token**: Requires manual Mapbox token input in development
4. **AI Summaries**: Template-based, not using actual LLM APIs yet
5. **Limited Cities**: Only 25 major cities pre-configured

## 📝 Code Quality

- **Modular Architecture**: Separation of concerns (services/components/pages)
- **TypeScript**: Full type safety
- **Clean Code**: Comments and documentation
- **Extensible**: Easy to plug in real APIs
- **Responsive**: Mobile-first design

## 🤝 Contributing

To extend BizRadar:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Follow existing code structure
4. Add comments for complex logic
5. Test thoroughly
6. Submit pull request

## 📄 License

This project is part of a learning/portfolio demonstration. Adjust licensing as needed.

## 🙏 Acknowledgments

- Shadcn UI for component library
- Mapbox for mapping solution
- Indian government data sources for city information
- React and TypeScript communities

---

**Built with ❤️ for Indian entrepreneurs**

For questions or support, visit the Contact page or open an issue.

# BizRadar

BizRadar is a React and TypeScript application for exploring business opportunities in India. It combines location search, market indicators, opportunity scoring, competitor context, forecasting, and feasibility reports in one interface.

> **Data note:** Several market and opportunity metrics are currently generated from local/mock data. They are exploratory estimates, not verified live market research or investment advice.

## Features

- Search Indian cities and explore location-based opportunities.
- Review demand, competition, population, and economic indicators.
- Compare business opportunities and view BizScore breakdowns.
- Explore forecasts, competitor context, and feasibility reports.
- Visualize locations with Mapbox GL JS.
- Sign in and manage saved data through Supabase integration.

## Tech stack

- React 18, TypeScript, and Vite
- React Router
- Tailwind CSS and shadcn/ui
- Supabase JavaScript client
- Mapbox GL JS
- Recharts

## Requirements

- Node.js 18 or newer
- npm

## Setup

1. Clone the repository and enter the project directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a local `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

4. Add the Supabase project URL and publishable key supplied by the project maintainer.
5. Start the development server:

   ```bash
   npm run dev
   ```

The app uses these Vite environment variables:

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable/anon key |
| `VITE_SUPABASE_PROJECT_ID` | Project identifier used by project tooling |

Do not put Supabase service-role keys, database passwords, or other server secrets in `VITE_*` variables. Vite exposes those values to browser code. The interactive map currently asks for a Mapbox public token in the map UI.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Create a production build |
| `npm run build:dev` | Create a development-mode build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Project layout

```text
src/
  components/       Reusable UI and feature components
  contexts/         React context providers, including authentication
  hooks/            Reusable React hooks
  integrations/     Supabase client and generated database types
  lib/              Domain logic, scoring, calculations, and constants
  pages/            Route-level application pages
  services/         Geocoding, market data, forecasting, and AI helpers
supabase/
  functions/        Supabase Edge Functions
  migrations/       Database migrations
```

## Data and limitations

- Market indicators and many opportunity metrics are simulated or locally generated.
- PIN-code lookup is not connected to an authoritative postal database. It returns no location until a real provider is integrated.
- Map rendering requires a Mapbox public token.
- AI insight generation depends on the configured Supabase Edge Function and its server-side provider secret.
- Always validate assumptions with current local research before making business or financial decisions.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Keep changes focused, explain how they were validated, and never commit local environment files or credentials.

## License

No license is currently declared in this repository. Contact the repository maintainers before reusing or distributing the code.

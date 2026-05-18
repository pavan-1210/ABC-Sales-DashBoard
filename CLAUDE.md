# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands
- Develop: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Architecture & Structure
The project is a Next.js (App Router) application that simulates a corporate sales and profit tracking system.

### Data Flow
- **Storage**: Data is stored as static files in `/data` (`sales_data.csv` and `products.json`).
- **Loading**: `lib/data-loader.ts` handles reading these files from the filesystem and parsing CSVs via `papaparse`.
- **Business Logic**: `lib/calculations.ts` provides utilities for aggregating sales and computing KPIs (Revenue, Profit, Margin, Growth).
- **API**: Next.js Route Handlers in `app/api/` act as the backend, consuming the `lib` utilities and serving JSON to the frontend.
- **Frontend**: React components in `app/` and `components/` fetch data from these API routes.

### Directory Overview
- `app/`: Pages and API routes.
- `components/`: UI components split into `/ui` (primitives), `/charts` (Recharts visualizations), and `/layout` (Shell).
- `lib/`: Core logic for data processing and calculations.
- `data/`: Raw data files (simulated database).
- `types/`: Global TypeScript interfaces for the domain models.

## Technical Constraints
- All data access must go through `lib/data-loader.ts`.
- Use the corporate color palette: Deep Navy Blue (`slate-900`), Professional Blue (`blue-600/500`), and Slate grays for the background.
- `lucide-react` is used for all iconography.

# NOVACLARYS Brand Intelligence Dashboard

A portfolio-grade rare disease brand analytics dashboard built for the **Biogen Customer Data & Insights (CD&I)** internship application. Modeled on SKYCLARYS/Friedreich's ataxia brand performance analytics.

## What This Is

An interactive monthly business review tool that mirrors the actual deliverables a CD&I intern would produce for Biogen's US Rare Disease brand team. Four analytical views:

1. **Executive Summary** — Patient growth, market share, new starts, key insights with actionable recommendations
2. **Patient Journey** — Rx-to-therapy conversion funnel, TTFF distribution, persistence curves, PDC analysis
3. **Payer & Access** — PA approval/denial rates by payer, TTFF benchmarking, denial root cause analysis
4. **HCP Segmentation** — Prescriber tiering, geographic distribution, adherence gaps by tier

All data is synthetic — no proprietary information used.

## Deploy to Vercel

```bash
cd biogen-dashboard
npm install
npm run dev        # local dev
npx vercel         # deploy
```

Or connect the GitHub repo to Vercel — it auto-detects Vite and deploys.

## Tech Stack

React + Vite + Recharts + Lucide Icons. Custom CSS.

## Author

Parva Raval · MEM Candidate, Duke University (Fuqua)

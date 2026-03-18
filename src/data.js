// Synthetic data modeled on SKYCLARYS/Friedreich's ataxia brand analytics
// All data is illustrative — no proprietary information

export const BRAND_NAME = "NOVACLARYS";
export const DISEASE = "Friedreich's Ataxia";
export const PROGRAM_NAME = "ACCESS360";

// Monthly brand performance (trailing 12 months)
// Realistic: seasonality dips (Dec holiday, Jul summer), Jan formulary reset spike,
// irregular new starts, PDC fluctuation, market share plateau, 1 month of patient dip
export const monthlyPerformance = [
  { month: "Apr '25", newStarts: 38, totalPatients: 812, pdcAvg: 0.82, marketShare: 0.620, revenue: 14.2 },
  { month: "May '25", newStarts: 44, totalPatients: 833, pdcAvg: 0.81, marketShare: 0.628, revenue: 14.8 },
  { month: "Jun '25", newStarts: 40, totalPatients: 848, pdcAvg: 0.80, marketShare: 0.635, revenue: 15.1 },
  { month: "Jul '25", newStarts: 32, totalPatients: 851, pdcAvg: 0.79, marketShare: 0.637, revenue: 14.9 },  // summer dip, flat patients
  { month: "Aug '25", newStarts: 46, totalPatients: 872, pdcAvg: 0.83, marketShare: 0.648, revenue: 15.6 },
  { month: "Sep '25", newStarts: 42, totalPatients: 889, pdcAvg: 0.82, marketShare: 0.655, revenue: 15.9 },
  { month: "Oct '25", newStarts: 51, totalPatients: 916, pdcAvg: 0.84, marketShare: 0.662, revenue: 16.5 },
  { month: "Nov '25", newStarts: 47, totalPatients: 936, pdcAvg: 0.83, marketShare: 0.668, revenue: 16.8 },
  { month: "Dec '25", newStarts: 29, totalPatients: 931, pdcAvg: 0.80, marketShare: 0.665, revenue: 16.2 },  // holiday dip, patient count dips (discontinuations > starts)
  { month: "Jan '26", newStarts: 56, totalPatients: 964, pdcAvg: 0.84, marketShare: 0.672, revenue: 17.3 },  // formulary reset spike
  { month: "Feb '26", newStarts: 48, totalPatients: 992, pdcAvg: 0.84, marketShare: 0.690, revenue: 17.8 },
  { month: "Mar '26", newStarts: 58, totalPatients: 1024, pdcAvg: 0.83, marketShare: 0.700, revenue: 18.4 },
];

// Patient journey funnel — current quarter snapshot
export const patientFunnel = [
  { stage: "Rx Written", count: 165, pct: 100 },
  { stage: "Enrolled in Hub", count: 152, pct: 92.1 },
  { stage: "Benefits Verified", count: 143, pct: 86.7 },
  { stage: "PA Submitted", count: 138, pct: 83.6 },
  { stage: "PA Approved", count: 112, pct: 67.9 },
  { stage: "First Fill", count: 98, pct: 59.4 },
  { stage: "Active at 90d", count: 82, pct: 49.7 },
];

// Prior quarter funnel for comparison
export const priorQuarterFunnel = [
  { stage: "Rx Written", count: 148, pct: 100 },
  { stage: "Enrolled in Hub", count: 134, pct: 90.5 },
  { stage: "Benefits Verified", count: 124, pct: 83.8 },
  { stage: "PA Submitted", count: 118, pct: 79.7 },
  { stage: "PA Approved", count: 95, pct: 64.2 },
  { stage: "First Fill", count: 80, pct: 54.1 },
  { stage: "Active at 90d", count: 64, pct: 43.2 },
];

// Payer mix and PA analytics
export const payerMix = [
  { payer: "Commercial", patients: 584, share: 0.57, approvalRate: 0.78, avgTTFF: 18, appealSuccess: 0.72 },
  { payer: "Medicare Part D", patients: 287, share: 0.28, approvalRate: 0.84, avgTTFF: 22, appealSuccess: 0.65 },
  { payer: "Medicaid", patients: 102, share: 0.10, approvalRate: 0.61, avgTTFF: 31, appealSuccess: 0.48 },
  { payer: "Other/VA/Tricare", patients: 51, share: 0.05, approvalRate: 0.73, avgTTFF: 25, appealSuccess: 0.58 },
];

// Top denial reasons
export const denialReasons = [
  { reason: "Missing clinical documentation", count: 42, pct: 0.32 },
  { reason: "Step therapy not met", count: 28, pct: 0.22 },
  { reason: "Not medically necessary", count: 24, pct: 0.18 },
  { reason: "Formulary exclusion", count: 18, pct: 0.14 },
  { reason: "Genetic test not confirmed", count: 11, pct: 0.08 },
  { reason: "Other", count: 8, pct: 0.06 },
];

// TTFF distribution (days to first fill)
export const ttffDistribution = [
  { range: "0–7d", count: 12, pct: 0.12 },
  { range: "8–14d", count: 28, pct: 0.29 },
  { range: "15–21d", count: 24, pct: 0.24 },
  { range: "22–30d", count: 18, pct: 0.18 },
  { range: "31–45d", count: 10, pct: 0.10 },
  { range: "46–60d", count: 4, pct: 0.04 },
  { range: "60d+", count: 2, pct: 0.02 },
];

// Persistence curve (Kaplan-Meier style)
// Realistic: steep early drop months 0-3 (~15% loss), then attrition slows significantly
// months 6-12 lose only ~1-2% per month. Final 12-month value ~72%
export const persistenceCurve = [
  { month: 0, pct: 1.00 },
  { month: 1, pct: 0.93 },
  { month: 2, pct: 0.87 },
  { month: 3, pct: 0.84 },
  { month: 4, pct: 0.81 },
  { month: 5, pct: 0.79 },
  { month: 6, pct: 0.78 },
  { month: 7, pct: 0.77 },
  { month: 8, pct: 0.76 },
  { month: 9, pct: 0.75 },
  { month: 10, pct: 0.74 },
  { month: 11, pct: 0.73 },
  { month: 12, pct: 0.72 },
];

// PDC distribution
export const pdcDistribution = [
  { range: "<50%", count: 62, segment: "Non-adherent" },
  { range: "50–59%", count: 48, segment: "Non-adherent" },
  { range: "60–69%", count: 71, segment: "Partially adherent" },
  { range: "70–79%", count: 118, segment: "Partially adherent" },
  { range: "80–89%", count: 342, segment: "Adherent" },
  { range: "90–100%", count: 383, segment: "Adherent" },
];

// HCP segmentation — power-law distribution reflecting rare disease prescribing
export const hcpSegments = [
  { tier: "Tier 1 — KOLs", hcpCount: 15, patientsManaged: 461, avgNewStarts: 4.8, avgPDC: 0.89, description: "Academic medical centers, FA specialists, clinical trial investigators" },
  { tier: "Tier 2 — Active", hcpCount: 52, patientsManaged: 298, avgNewStarts: 1.6, avgPDC: 0.84, description: "Community neurologists with rare disease experience" },
  { tier: "Tier 3 — Occasional", hcpCount: 108, patientsManaged: 183, avgNewStarts: 0.4, avgPDC: 0.78, description: "General neurologists, occasional prescribers" },
  { tier: "Tier 4 — Long Tail", hcpCount: 214, patientsManaged: 82, avgNewStarts: 0.1, avgPDC: 0.74, description: "One-patient prescribers, PCPs with rare FA cases" },
];

// Top prescribers (anonymized)
export const topPrescribers = [
  { id: "HCP-001", region: "Northeast", tier: 1, patients: 52, newStarts: 7, avgPDC: 0.93 },
  { id: "HCP-002", region: "Southeast", tier: 1, patients: 44, newStarts: 5, avgPDC: 0.90 },
  { id: "HCP-003", region: "West", tier: 1, patients: 41, newStarts: 6, avgPDC: 0.91 },
  { id: "HCP-004", region: "Midwest", tier: 1, patients: 36, newStarts: 4, avgPDC: 0.88 },
  { id: "HCP-005", region: "Northeast", tier: 1, patients: 33, newStarts: 5, avgPDC: 0.92 },
  { id: "HCP-006", region: "Southeast", tier: 2, patients: 22, newStarts: 2, avgPDC: 0.84 },
  { id: "HCP-007", region: "West", tier: 2, patients: 19, newStarts: 3, avgPDC: 0.82 },
  { id: "HCP-008", region: "Midwest", tier: 2, patients: 17, newStarts: 2, avgPDC: 0.85 },
];

// Geographic distribution (enhanced with scatter plot data)
export const regionData = [
  { region: "Northeast", patients: 312, hcps: 72, avgTTFF: 16, newStartsPerMo: 5.2, color: "#00c2b8" },
  { region: "Southeast", patients: 278, hcps: 58, avgTTFF: 20, newStartsPerMo: 4.1, color: "#818cf8" },
  { region: "Midwest", patients: 194, hcps: 44, avgTTFF: 27, newStartsPerMo: 2.8, color: "#f59e0b" },
  { region: "West", patients: 240, hcps: 65, avgTTFF: 19, newStartsPerMo: 3.7, color: "#f43f5e" },
];

// Key insights for the executive summary
export const keyInsights = [
  {
    title: "30% Patient Growth YoY",
    detail: "Active patients crossed 1,000 in March '26, driven by increased Tier 1 HCP engagement and expanded FAM coverage.",
    impact: "positive",
    metric: "+26%",
  },
  {
    title: "PA Denial Bottleneck in Medicaid",
    detail: "Medicaid PA approval rate (61%) lags 17+ pts behind Commercial (78%). Missing documentation accounts for 32% of all denials — recommend enhanced Start Form pre-check workflow.",
    impact: "negative",
    metric: "61%",
  },
  {
    title: "TTFF Improving but Still Elevated",
    detail: "Median TTFF decreased from 24d to 21d QoQ. Patients with FAM engagement reach first fill 6 days faster on average.",
    impact: "positive",
    metric: "21d",
  },
  {
    title: "Tier 3 HCP Adherence Gap",
    detail: "Patients managed by Tier 3 prescribers show 9 pts lower avg PDC vs. Tier 1 (78% vs. 89%). Opportunity for targeted medical education outreach.",
    impact: "negative",
    metric: "78%",
  },
];

// Competitive context (with QoQ change)
export const competitiveLandscape = [
  { therapy: "NOVACLARYS (Brand)", share: 0.70, trend: "growing", patients: 1024, qoqChange: "+2pts" },
  { therapy: "Supportive Care Only", share: 0.18, trend: "declining", patients: 263, qoqChange: "-1pt" },
  { therapy: "Clinical Trial Enrollment", share: 0.08, trend: "stable", patients: 117, qoqChange: "0pts" },
  { therapy: "Off-label Therapies", share: 0.04, trend: "declining", patients: 59, qoqChange: "-1pt" },
];

// Financial assistance data
export const financialAssistance = {
  copayCardEnrollment: 0.82,      // 82% of eligible commercial patients enrolled
  avgPatientOOP: 12,              // $12 avg out-of-pocket after assistance
  freeDrugUtilization: 47,        // 47 patients on free drug program
  foundationReferrals: 31,        // 31 foundation referrals this quarter
  // Monthly copay utilization trend (trailing 6 months)
  copayTrend: [
    { month: "Oct '25", enrolled: 214, eligible: 272, rate: 0.79 },
    { month: "Nov '25", enrolled: 226, eligible: 280, rate: 0.81 },
    { month: "Dec '25", enrolled: 221, eligible: 276, rate: 0.80 },
    { month: "Jan '26", enrolled: 238, eligible: 288, rate: 0.83 },
    { month: "Feb '26", enrolled: 242, eligible: 294, rate: 0.82 },
    { month: "Mar '26", enrolled: 251, eligible: 306, rate: 0.82 },
  ],
  // OOP distribution after assistance
  oopDistribution: [
    { range: "$0", patients: 89, pct: 0.17 },
    { range: "$1–$10", patients: 186, pct: 0.36 },
    { range: "$11–$25", patients: 142, pct: 0.28 },
    { range: "$26–$50", patients: 61, pct: 0.12 },
    { range: "$51–$100", patients: 24, pct: 0.05 },
    { range: "$100+", patients: 12, pct: 0.02 },
  ],
};

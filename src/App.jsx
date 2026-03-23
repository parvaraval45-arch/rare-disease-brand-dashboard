import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, Legend, ReferenceLine,
  ScatterChart, Scatter, ZAxis
} from "recharts";
import {
  Activity, Users, TrendingUp, Clock,
  BarChart3, GitBranch, Shield, Stethoscope, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Minus, Info, X,
  DollarSign, Heart
} from "lucide-react";
import * as data from "./data";

const TABS = [
  { id: "overview", label: "Executive Summary", icon: Activity },
  { id: "journey", label: "Patient Journey", icon: GitBranch },
  { id: "access", label: "Payer & Access", icon: Shield },
  { id: "hcp", label: "HCP Segmentation", icon: Stethoscope },
];

const TEAL = "#0097a7";
const INDIGO = "#6366f1";
const AMBER = "#d97706";
const ROSE = "#e11d48";
const EMERALD = "#059669";
const SLATE = "#64748b";

// Chart styling constants for light theme
const AXIS_LABEL_FILL = "#64748b";
const GRID_STROKE = "rgba(0,0,0,0.06)";
const TICK_STYLE = { fill: AXIS_LABEL_FILL, fontSize: 11 };
const TICK_LABEL = { fill: "#475569", fontSize: 12 };
const CHART_COLORS = [TEAL, INDIGO, AMBER, ROSE, EMERALD, SLATE];

function MetricCard({ label, value, subtext, trend, icon: Icon }) {
  const trendColor = trend === "up" ? EMERALD : trend === "down" ? ROSE : trend === "caution" ? AMBER : SLATE;
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" || trend === "caution" ? ArrowDownRight : Minus;
  return (
    <div className={`metric-card ${trend === "caution" ? "metric-card--caution" : ""}`}>
      <div className="metric-header">
        <span className="metric-label">{label}</span>
        {Icon && <Icon size={16} className="metric-icon" />}
      </div>
      <div className="metric-value">{value}</div>
      {subtext && (
        <div className="metric-subtext" style={{ color: trendColor }}>
          <TrendIcon size={14} />
          <span>{subtext}</span>
        </div>
      )}
    </div>
  );
}

function InsightCard({ insight }) {
  const isPositive = insight.impact === "positive";
  return (
    <div className={`insight-card ${isPositive ? "positive" : "negative"}`}>
      <div className="insight-badge">
        <span className="insight-metric">{insight.metric}</span>
      </div>
      <div className="insight-content">
        <h4>{insight.title}</h4>
        <p>{insight.detail}</p>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((entry, i) => (
        <div key={i} className="tooltip-row">
          <span className="tooltip-dot" style={{ background: entry.color || entry.fill }} />
          <span className="tooltip-name">{entry.name || entry.dataKey}</span>
          <span className="tooltip-value">
            {formatter ? formatter(entry.value) : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

function DataTimestamp() {
  return (
    <div className="data-timestamp">
      Data as of March 2026 &middot; Sources: Hub CRM, Specialty Pharmacy Dispensing, Claims Data (Synthetic)
    </div>
  );
}

function KeyFindingBanner({ icon: Icon, children, variant = "amber" }) {
  return (
    <div className={`key-finding-banner key-finding-banner--${variant}`}>
      {Icon && <Icon size={15} />}
      <span><strong>Key Finding:</strong> {children}</span>
    </div>
  );
}

function MethodologyModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>About This Dashboard</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <p>This dashboard uses synthetic data modeled on rare disease brand analytics for a Friedreich&rsquo;s ataxia therapy. Data sources simulated:</p>
          <ul>
            <li>Hub CRM enrollment and case management data</li>
            <li>Specialty pharmacy dispensing records</li>
            <li>Medical and pharmacy claims</li>
            <li>Prior authorization tracking</li>
          </ul>
          <p>No proprietary data from any company was used.</p>
          <p>Metrics follow industry-standard definitions (PDC per PQA methodology, TTFF measured from Start Form receipt to first SP dispense).</p>
          <p className="modal-author">Built by Parva Raval.</p>
        </div>
      </div>
    </div>
  );
}

// ── OVERVIEW TAB ──
function OverviewTab() {
  const latest = data.monthlyPerformance[data.monthlyPerformance.length - 1];
  const prev = data.monthlyPerformance[data.monthlyPerformance.length - 2];
  const pdcDelta = ((latest.pdcAvg - prev.pdcAvg) * 100).toFixed(1);
  const pdcTrend = pdcDelta > 0 ? "up" : pdcDelta < 0 ? "caution" : "neutral";
  const pdcSubtext = pdcDelta > 0 ? `+${pdcDelta}pts vs. prior month` : pdcDelta < 0 ? `${pdcDelta}pts vs. prior month` : "Flat vs. prior month";

  return (
    <div className="tab-content">
      <SectionHeader
        title="Monthly Business Review"
        subtitle={`${data.BRAND_NAME} for ${data.DISEASE} \u00b7 ${latest.month} Snapshot`}
      />
      <div className="metrics-row">
        <MetricCard label="Active Patients" value={latest.totalPatients.toLocaleString()} subtext={`+${latest.totalPatients - prev.totalPatients} vs. prior month`} trend="up" icon={Users} />
        <MetricCard label="New Starts (Month)" value={latest.newStarts} subtext={`+${((latest.newStarts / prev.newStarts - 1) * 100).toFixed(1)}% MoM`} trend="up" icon={TrendingUp} />
        <MetricCard label="Avg PDC" value={`${(latest.pdcAvg * 100).toFixed(0)}%`} subtext={pdcSubtext} trend={pdcTrend} icon={Activity} />
        <MetricCard label="Market Share" value={`${(latest.marketShare * 100).toFixed(0)}%`} subtext="+1pt QoQ" trend="up" icon={BarChart3} />
      </div>
      <div className="grid-2">
        <div className="card">
          <h3>Patient Growth &amp; New Starts</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data.monthlyPerformance}>
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={TEAL} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={TEAL} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis dataKey="month" tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area yAxisId="left" type="monotone" dataKey="totalPatients" stroke={TEAL} fill="url(#tealGrad)" name="Total Patients" strokeWidth={2} />
              <Bar yAxisId="right" dataKey="newStarts" fill={INDIGO} name="New Starts" radius={[3, 3, 0, 0]} barSize={20} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3>Market Share Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis dataKey="month" tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis domain={[0.55, 0.75]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip formatter={(v) => `${(v * 100).toFixed(1)}%`} />} />
              <Line type="monotone" dataKey="marketShare" stroke={TEAL} strokeWidth={2.5} dot={{ r: 3, fill: TEAL }} name="Market Share" />
              <ReferenceLine y={0.70} stroke={EMERALD} strokeDasharray="6 4" label={{ value: "Target: 70%", fill: EMERALD, fontSize: 11, position: "insideTopLeft" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <SectionHeader title="Key Insights &amp; Recommendations" />
      <div className="insights-grid">
        {data.keyInsights.map((insight, i) => (
          <InsightCard key={i} insight={insight} />
        ))}
      </div>
      <div className="card">
        <h3>Competitive Landscape</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Therapy</th><th>Market Share</th><th>Est. Patients</th><th>QoQ Chg</th><th>Trend</th></tr>
            </thead>
            <tbody>
              {data.competitiveLandscape.map((c, i) => (
                <tr key={i}>
                  <td className="font-medium">{c.therapy}</td>
                  <td>
                    <div className="share-bar-wrap">
                      <div className="share-bar" style={{ width: `${c.share * 100}%`, background: CHART_COLORS[i] }} />
                      <span>{(c.share * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td>{c.patients.toLocaleString()}</td>
                  <td><span className={`qoq-change ${c.qoqChange.startsWith("+") ? "positive" : c.qoqChange.startsWith("-") ? "negative" : ""}`}>{c.qoqChange}</span></td>
                  <td><span className={`trend-pill ${c.trend}`}>{c.trend}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── PATIENT JOURNEY TAB ──
function JourneyTab() {
  return (
    <div className="tab-content">
      <SectionHeader title="Patient Journey Analytics" subtitle="Prescription-to-therapy conversion funnel and adherence metrics \u00b7 Q1 2026" />
      <div className="card">
        <h3>Conversion Funnel — Rx to Active Therapy</h3>
        <p className="card-subtitle">Current quarter vs. prior quarter, all payers. {((1 - data.patientFunnel[data.patientFunnel.length - 1].pct / 100) * 100).toFixed(1)}% drop-off from Rx written to 90-day active.</p>
        <div className="funnel-container">
          {data.patientFunnel.map((stage, i) => {
            const dropoff = i > 0 ? data.patientFunnel[i - 1].count - stage.count : 0;
            const dropPct = i > 0 ? ((dropoff / data.patientFunnel[i - 1].count) * 100).toFixed(1) : null;
            const priorStage = data.priorQuarterFunnel[i];
            const pctDelta = (stage.pct - priorStage.pct).toFixed(1);
            const deltaPositive = parseFloat(pctDelta) >= 0;
            return (
              <div key={i} className="funnel-row">
                <div className="funnel-label">
                  <span className="funnel-stage">{stage.stage}</span>
                  <span className="funnel-count">{stage.count}</span>
                </div>
                <div className="funnel-bar-track">
                  <div className="funnel-bar" style={{ width: `${stage.pct}%`, background: `linear-gradient(90deg, ${TEAL}, ${stage.pct < 60 ? AMBER : TEAL})`, opacity: 0.15 + (stage.pct / 100) * 0.85 }} />
                </div>
                <div className="funnel-pct-group">
                  <span className="funnel-pct">{stage.pct.toFixed(1)}%</span>
                  <span className={`funnel-delta ${deltaPositive ? "positive" : "negative"}`}>
                    {deltaPositive ? "\u2191" : "\u2193"} {deltaPositive ? "+" : ""}{pctDelta}pts
                  </span>
                </div>
                {dropPct && (
                  <div className="funnel-drop">
                    <AlertTriangle size={12} />
                    <span>-{dropoff} ({dropPct}%)</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="funnel-callout">
          <AlertTriangle size={16} color={AMBER} />
          <span>Largest absolute drop: <strong>PA Submitted → PA Approved</strong> (-26 patients, 18.8% loss). Recommend: enhanced clinical documentation support at Start Form stage.</span>
        </div>
      </div>
      <div className="grid-2">
        <div className="card">
          <h3>Time to First Fill Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.ttffDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis dataKey="range" tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Patients" radius={[4, 4, 0, 0]}>
                {data.ttffDistribution.map((_, i) => (
                  <Cell key={i} fill={i < 3 ? TEAL : i < 5 ? AMBER : ROSE} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="card-footnote">Target: ≤14 days. 41% of patients achieve target TTFF.</p>
        </div>
        <div className="card">
          <h3>Therapy Persistence Curve</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data.persistenceCurve}>
              <defs>
                <linearGradient id="persistGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={INDIGO} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={INDIGO} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis dataKey="month" tick={TICK_STYLE} axisLine={false} tickLine={false} label={{ value: "Months on Therapy", position: "insideBottom", offset: -5, fill: AXIS_LABEL_FILL, fontSize: 11 }} />
              <YAxis domain={[0.5, 1.05]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip formatter={(v) => `${(v * 100).toFixed(1)}%`} />} />
              <Area type="monotone" dataKey="pct" stroke={INDIGO} fill="url(#persistGrad)" strokeWidth={2.5} name="Persistence %" />
              <ReferenceLine y={0.80} stroke={AMBER} strokeDasharray="6 4" label={{ value: "80% threshold", fill: AMBER, fontSize: 11, position: "insideTopLeft" }} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="card-footnote">12-month persistence: 72%. Steepest drop: months 0-3 (16% loss), then plateau.</p>
        </div>
      </div>
      <div className="card">
        <h3>PDC Distribution — Active Patient Population</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data.pdcDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="range" tick={TICK_STYLE} axisLine={false} tickLine={false} />
            <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" name="Patients" radius={[4, 4, 0, 0]}>
              {data.pdcDistribution.map((entry, i) => (
                <Cell key={i} fill={entry.segment === "Adherent" ? EMERALD : entry.segment === "Partially adherent" ? AMBER : ROSE} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="pdc-legend">
          <span><span className="dot" style={{ background: EMERALD }} /> Adherent (PDC ≥80%): 71%</span>
          <span><span className="dot" style={{ background: AMBER }} /> Partially Adherent: 18%</span>
          <span><span className="dot" style={{ background: ROSE }} /> Non-Adherent: 11%</span>
        </div>
      </div>
    </div>
  );
}

// ── PAYER & ACCESS TAB ──
function AccessTab() {
  const payerChartData = data.payerMix.map((p) => ({
    name: p.payer, approval: +(p.approvalRate * 100).toFixed(0), appeal: +(p.appealSuccess * 100).toFixed(0), ttff: p.avgTTFF,
  }));
  const fa = data.financialAssistance;
  return (
    <div className="tab-content">
      <SectionHeader title="Payer &amp; Access Analytics" subtitle="Prior authorization performance, denial analysis, and time-to-therapy by payer segment" />
      <div className="metrics-row">
        <MetricCard label="Overall PA Approval" value="76%" subtext="+2pts vs. prior Q" trend="up" icon={Shield} />
        <MetricCard label="Appeal Success Rate" value="67%" subtext="-3pts vs. prior Q" trend="down" icon={Activity} />
        <MetricCard label="Median TTFF" value="21 days" subtext="-3d vs. prior Q" trend="up" icon={Clock} />
        <MetricCard label="PA Abandonment" value="19%" subtext="Stable" trend="neutral" icon={AlertTriangle} />
      </div>
      <KeyFindingBanner icon={AlertTriangle} variant="amber">
        Medicaid TTFF (31d) is 72% longer than Commercial (18d). Missing documentation drives 32% of all denials — pre-submission checklist recommended.
      </KeyFindingBanner>
      <div className="grid-2">
        <div className="card">
          <h3>PA Approval &amp; Appeal Success by Payer</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={payerChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" width={110} tick={TICK_LABEL} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip formatter={(v) => `${v}%`} />} />
              <Bar dataKey="approval" name="PA Approval %" fill={TEAL} radius={[0, 4, 4, 0]} barSize={16} />
              <Bar dataKey="appeal" name="Appeal Success %" fill={INDIGO} radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3>Avg TTFF by Payer (Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={payerChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis type="number" domain={[0, 40]} tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" width={110} tick={TICK_LABEL} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip formatter={(v) => `${v} days`} />} />
              <Bar dataKey="ttff" name="Avg TTFF" radius={[0, 4, 4, 0]} barSize={20}>
                {payerChartData.map((entry, i) => (
                  <Cell key={i} fill={entry.ttff <= 20 ? EMERALD : entry.ttff <= 25 ? AMBER : ROSE} />
                ))}
              </Bar>
              <ReferenceLine x={14} stroke={TEAL} strokeDasharray="6 4" label={{ value: "14d target", fill: TEAL, fontSize: 11, position: "top" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid-2">
        <div className="card">
          <h3>Top Denial Reasons</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.denialReasons} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis type="number" tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis dataKey="reason" type="category" width={180} tick={TICK_LABEL} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Denials" fill={ROSE} radius={[0, 4, 4, 0]} barSize={18}>
                {data.denialReasons.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? ROSE : `rgba(244,63,94,${0.8 - i * 0.12})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3>Payer Mix — Patient Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.payerMix} dataKey="patients" nameKey="payer" cx="50%" cy="50%" innerRadius={60} outerRadius={110} paddingAngle={3} strokeWidth={0}>
                {data.payerMix.map((_, i) => (<Cell key={i} fill={CHART_COLORS[i]} />))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12, color: "#64748b" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial Assistance Section */}
      <SectionHeader title="Financial Assistance" subtitle={`${data.PROGRAM_NAME} copay support, free drug program, and foundation referral metrics`} />
      <div className="metrics-row">
        <MetricCard label="Copay Card Enrollment" value={`${(fa.copayCardEnrollment * 100).toFixed(0)}%`} subtext="of eligible commercial pts" trend="up" icon={DollarSign} />
        <MetricCard label="Avg Patient OOP" value={`$${fa.avgPatientOOP}`} subtext="after copay assistance" trend="up" icon={Heart} />
        <MetricCard label="Free Drug Program" value={fa.freeDrugUtilization} subtext="patients this quarter" trend="neutral" icon={Shield} />
        <MetricCard label="Foundation Referrals" value={fa.foundationReferrals} subtext="Q1 2026" trend="neutral" icon={Users} />
      </div>
      <div className="grid-2">
        <div className="card">
          <h3>Copay Card Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={fa.copayTrend}>
              <defs>
                <linearGradient id="copayGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={EMERALD} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={EMERALD} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis dataKey="month" tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis domain={[0.70, 0.90]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip formatter={(v) => `${(v * 100).toFixed(0)}%`} />} />
              <Area type="monotone" dataKey="rate" stroke={EMERALD} fill="url(#copayGrad)" strokeWidth={2.5} name="Enrollment Rate" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3>Patient OOP Distribution (After Assistance)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={fa.oopDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis dataKey="range" tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="patients" name="Patients" radius={[4, 4, 0, 0]}>
                {fa.oopDistribution.map((_, i) => (
                  <Cell key={i} fill={i < 2 ? EMERALD : i < 4 ? AMBER : ROSE} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="card-footnote">53% of assisted patients pay ≤$10/month. Target: minimize OOP above $50.</p>
        </div>
      </div>

      <div className="card callout-card">
        <h3>Recommendation</h3>
        <p>Medicaid TTFF (31d) is 72% longer than Commercial (18d). Root cause: <strong>missing clinical documentation</strong> drives 32% of all denials. Recommended action: implement a pre-submission documentation checklist within the {data.PROGRAM_NAME} hub and deploy targeted FAM training for Medicaid-heavy geographies. Projected impact: reduce Medicaid TTFF by 8-10 days and recover ~15 additional patient starts per quarter.</p>
      </div>
    </div>
  );
}

// Custom scatter tooltip for HCP tab
function ScatterTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div className="chart-tooltip">
      <div className="tooltip-label">{d.region}</div>
      <div className="tooltip-row">
        <span className="tooltip-dot" style={{ background: d.color }} />
        <span className="tooltip-name">Avg TTFF</span>
        <span className="tooltip-value">{d.avgTTFF}d</span>
      </div>
      <div className="tooltip-row">
        <span className="tooltip-dot" style={{ background: d.color }} />
        <span className="tooltip-name">New Starts/Mo</span>
        <span className="tooltip-value">{d.newStartsPerMo}</span>
      </div>
      <div className="tooltip-row">
        <span className="tooltip-dot" style={{ background: d.color }} />
        <span className="tooltip-name">Total Patients</span>
        <span className="tooltip-value">{d.patients}</span>
      </div>
    </div>
  );
}

// ── HCP SEGMENTATION TAB ──
function HCPTab() {
  return (
    <div className="tab-content">
      <SectionHeader title="HCP Segmentation &amp; Prescriber Analytics" subtitle="Prescriber tiering, geographic distribution, and engagement opportunities" />
      <div className="card">
        <h3>Prescriber Tier Overview</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Segment</th><th>HCPs</th><th>Patients</th><th>Avg Starts/Mo</th><th>Avg PDC</th><th>Profile</th></tr>
            </thead>
            <tbody>
              {data.hcpSegments.map((seg, i) => (
                <tr key={i}>
                  <td><span className="tier-badge" style={{ background: CHART_COLORS[i] }}>{seg.tier.split(" — ")[0]}</span></td>
                  <td>{seg.hcpCount}</td>
                  <td>{seg.patientsManaged}</td>
                  <td>{seg.avgNewStarts}</td>
                  <td><span style={{ color: seg.avgPDC >= 0.85 ? EMERALD : seg.avgPDC >= 0.80 ? AMBER : ROSE }}>{(seg.avgPDC * 100).toFixed(0)}%</span></td>
                  <td className="text-muted">{seg.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <KeyFindingBanner icon={AlertTriangle} variant="amber">
        15 Tier 1 KOLs manage 45% of all patients. 214 long-tail prescribers average &lt;1 patient each — targeted engagement could consolidate care.
      </KeyFindingBanner>
      <div className="grid-2">
        <div className="card">
          <h3>Patient Distribution by Tier</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={data.hcpSegments.map((s) => ({ name: s.tier.split(" — ")[0], value: s.patientsManaged }))} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={100} paddingAngle={3} strokeWidth={0}>
                {data.hcpSegments.map((_, i) => (<Cell key={i} fill={CHART_COLORS[i]} />))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12, color: "#64748b" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3>Avg PDC by Tier</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.hcpSegments.map((s) => ({ name: s.tier.split(" — ")[0], pdc: +(s.avgPDC * 100).toFixed(0) }))}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis dataKey="name" tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis domain={[65, 95]} tickFormatter={(v) => `${v}%`} tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip formatter={(v) => `${v}%`} />} />
              <Bar dataKey="pdc" name="Avg PDC" radius={[4, 4, 0, 0]} barSize={40}>
                {data.hcpSegments.map((s, i) => (<Cell key={i} fill={s.avgPDC >= 0.85 ? EMERALD : s.avgPDC >= 0.80 ? AMBER : ROSE} />))}
              </Bar>
              <ReferenceLine y={80} stroke={AMBER} strokeDasharray="6 4" label={{ value: "PDC \u226580%", fill: AMBER, fontSize: 11, position: "insideTopLeft" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <h3>Top Prescribers</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Prescriber</th><th>Region</th><th>Tier</th><th>Patients</th><th>New Starts (Q)</th><th>Avg PDC</th></tr>
            </thead>
            <tbody>
              {data.topPrescribers.map((hcp, i) => (
                <tr key={i}>
                  <td className="font-medium">{hcp.id}</td>
                  <td>{hcp.region}</td>
                  <td><span className="tier-badge small" style={{ background: CHART_COLORS[hcp.tier - 1] }}>Tier {hcp.tier}</span></td>
                  <td>{hcp.patients}</td>
                  <td>{hcp.newStarts}</td>
                  <td style={{ color: hcp.avgPDC >= 0.88 ? EMERALD : AMBER }}>{(hcp.avgPDC * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <h3>Regional Access &amp; Growth — TTFF vs. New Starts</h3>
        <p className="card-subtitle">Bubble size = total patients. Midwest shows high TTFF with low new starts — potential access barrier.</p>
        <ResponsiveContainer width="100%" height={340}>
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis
              type="number" dataKey="avgTTFF" name="Avg TTFF (days)"
              domain={[12, 32]}
              tick={TICK_STYLE} axisLine={false} tickLine={false}
              label={{ value: "Avg TTFF (days) →", position: "insideBottom", offset: -10, fill: AXIS_LABEL_FILL, fontSize: 11 }}
            />
            <YAxis
              type="number" dataKey="newStartsPerMo" name="New Starts/Mo"
              domain={[1.5, 6.5]}
              tick={TICK_STYLE} axisLine={false} tickLine={false}
              label={{ value: "New Starts/Mo →", angle: -90, position: "insideLeft", offset: 10, fill: AXIS_LABEL_FILL, fontSize: 11 }}
            />
            <ZAxis type="number" dataKey="patients" range={[200, 800]} name="Patients" />
            <Tooltip content={<ScatterTooltip />} />
            <Scatter data={data.regionData} name="Regions">
              {data.regionData.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.75} stroke={entry.color} strokeWidth={2} />
              ))}
            </Scatter>
            {/* quadrant guide lines */}
            <ReferenceLine x={21} stroke="rgba(0,0,0,0.08)" strokeDasharray="4 4" />
            <ReferenceLine y={3.8} stroke="rgba(0,0,0,0.08)" strokeDasharray="4 4" />
          </ScatterChart>
        </ResponsiveContainer>
        {/* Region labels below chart */}
        <div className="scatter-legend">
          {data.regionData.map((r, i) => (
            <span key={i} className="scatter-legend-item">
              <span className="dot" style={{ background: r.color }} />
              {r.region} ({r.patients} pts)
            </span>
          ))}
        </div>
      </div>
      <div className="card callout-card">
        <h3>Opportunity</h3>
        <p>Tier 3 &amp; 4 prescribers manage 26% of patients but show a 15-pt PDC gap vs. Tier 1 (74–78% vs. 89%). The 214 long-tail prescribers represent the largest untapped consolidation opportunity. Recommended action: deploy targeted medical education outreach and assign dedicated FAM support for Tier 3+ prescribers in the <strong>Midwest</strong> (highest TTFF at 27d) and <strong>Southeast</strong> regions.</p>
      </div>
    </div>
  );
}

// ── MAIN APP ──
export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showMethodology, setShowMethodology] = useState(false);
  const TabComponent = { overview: OverviewTab, journey: JourneyTab, access: AccessTab, hcp: HCPTab }[activeTab];

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-left">
          <div className="logo">
            <div className="logo-mark" />
            <div>
              <span className="logo-text">{data.BRAND_NAME}</span>
              <span className="logo-sub">Brand Intelligence Dashboard</span>
            </div>
          </div>
        </div>
        <div className="topbar-right">
          <span className="topbar-badge">Rare Disease &middot; {data.DISEASE}</span>
          <span className="topbar-badge accent">CD&amp;I &middot; Decision Sciences</span>
          <button className="methodology-btn" onClick={() => setShowMethodology(true)} title="About this dashboard">
            <Info size={15} />
          </button>
        </div>
      </header>
      <nav className="tab-nav">
        <div className="tab-nav-tabs">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}>
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <DataTimestamp />
      </nav>
      <main className="main"><TabComponent /></main>
      <footer className="footer">
        <p>
          Portfolio project by Parva Raval &middot; Built with synthetic data modeled on rare disease brand analytics. No proprietary data used.
          <button className="footer-link" onClick={() => setShowMethodology(true)}>Methodology</button>
        </p>
      </footer>
      {showMethodology && <MethodologyModal onClose={() => setShowMethodology(false)} />}
    </div>
  );
}

import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function GrowthPercentileChart({

  title,
  curveData,
  childData,
  dataKey,
  unit,

}) {

const percentileData = curveData.map((p) => ({
  ageMonths: p.ageMonths,
  ...p,
}));


/* --- smooth rendering -------------------------------------------------------
   The reference tables are ANCHOR points (monthly WHO, half-yearly IAP).
   Printed growth charts are splines through those anchors, so we resample
   every centile curve on a dense grid (natural cubic spline) before drawing.
   Anchors are honoured exactly; only the in-between rendering is smoothed. */
function splineEval (xs, ys, x) {
  const n = xs.length - 1
  if (n < 1) return ys[0]
  if (n === 1) {
    const t = (x - xs[0]) / (xs[1] - xs[0])
    return ys[0] + t * (ys[1] - ys[0])
  }
  const h = []
  for (let i = 0; i < n; i++) h.push(xs[i + 1] - xs[i])
  const A = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0))
  const b = new Array(n + 1).fill(0)
  A[0][0] = 1; A[n][n] = 1
  for (let i = 1; i < n; i++) {
    A[i][i - 1] = h[i - 1]
    A[i][i] = 2 * (h[i - 1] + h[i])
    A[i][i + 1] = h[i]
    b[i] = 3 * ((ys[i + 1] - ys[i]) / h[i] - (ys[i] - ys[i - 1]) / h[i - 1])
  }
  for (let i = 1; i <= n; i++) {
    const f = A[i][i - 1] / A[i - 1][i - 1]
    for (let j = i - 1; j <= n; j++) A[i][j] -= f * A[i - 1][j]
    b[i] -= f * b[i - 1]
  }
  const c = new Array(n + 1).fill(0)
  for (let i = n; i >= 0; i--) {
    let s = b[i]
    for (let j = i + 1; j <= n; j++) s -= A[i][j] * c[j]
    c[i] = s / A[i][i]
  }
  const a = ys.slice(0, n)
  const bd = [], dd = []
  for (let i = 0; i < n; i++) {
    bd.push((ys[i + 1] - ys[i]) / h[i] - (h[i] * (2 * c[i] + c[i + 1])) / 3)
    dd.push((c[i + 1] - c[i]) / (3 * h[i]))
  }
  let seg = n - 1
  for (let k = 0; k < n; k++) { if (x <= xs[k + 1] + 1e-9) { seg = k; break } }
  const dx = x - xs[seg]
  return a[seg] + bd[seg] * dx + c[seg] * dx * dx + dd[seg] * dx * dx * dx
}

const DENSE_SAMPLES = 720   // ~1 point per 3.6 months across 0-18 y

function buildDenseRows (rows, total = DENSE_SAMPLES) {
  if (!rows.length) return rows
  const keys = Object.keys(rows[0]).filter((k) => k !== 'ageMonths')
  const x0 = rows[0].ageMonths
  const x1 = rows[rows.length - 1].ageMonths
  const dense = []
  for (let i = 0; i <= total; i++) {
    dense.push({ ageMonths: x0 + ((x1 - x0) * i) / total })
  }
  for (const key of keys) {
    const pts = rows.filter((r) => r[key] !== undefined)
    if (pts.length < 2) continue
    const xs = pts.map((r) => r.ageMonths)
    const ys = pts.map((r) => r[key])
    const last = xs[xs.length - 1]
    for (const row of dense) {
      if (row.ageMonths <= last + 1e-9) {
        row[key] = Number(splineEval(xs, ys, Math.min(row.ageMonths, last)).toFixed(2))
      }
    }
  }
  return dense
}

const sortedPercentileData = [...percentileData].sort(
  (a, b) => a.ageMonths - b.ageMonths
);

/* Only centile lines present in the data are drawn. WHO 0-5y publishes
   p3-p97; IAP 2015 publishes p3/p5/p10/p25/p50 for BMI plus the 23/27
   adult-equivalent overweight and obesity cut-off lines. */
const CENTILE_LINES = [
  { key: "p3",  stroke: "#EF4444" },
  { key: "p5",  stroke: "#F97316" },
  { key: "p10", stroke: "#F97316" },
  { key: "p25", stroke: "#EAB308" },
  { key: "p50", stroke: "#22C55E" },
  { key: "p75", stroke: "#3B82F6" },
  { key: "p90", stroke: "#8B5CF6" },
  { key: "p97", stroke: "#EC4899" },
  { key: "ow",  stroke: "#F59E0B", name: "Overweight (BMI 23)", dash: "6 4" },
  { key: "ob",  stroke: "#DC2626", name: "Obesity (BMI 27)",    dash: "6 4" },
];

const renderRows = useMemo(
  () => buildDenseRows(sortedPercentileData, DENSE_SAMPLES),
  [sortedPercentileData]
)

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white border rounded-xl shadow-lg p-3">
      {payload.map((entry, index) => (
        <div key={index}>
          <strong>{entry.name}</strong>:{" "}
          {Number(entry.value).toFixed(2)}
        </div>
      ))}
    </div>
  );
};


  return (

    <div
      className="
        bg-white
        rounded-[32px]
        shadow-soft
        p-8
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          text-secondary
          mb-8
        "
      >

        {title}

      </h2>

      <div
        className="
          h-[500px]
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={renderRows}>
  <CartesianGrid strokeDasharray="3 3" />

  <XAxis
    dataKey="ageMonths"
    type="number"
    scale="linear"
    domain={[0, 216]}
    ticks={[0, 24, 48, 72, 96, 120, 144, 168, 192, 216]}
    tickFormatter={(value) => Math.round(value / 12)}
  />

  <YAxis />

  <Legend />

  {CENTILE_LINES.map((l) =>
    percentileData.some((r) => r[l.key] !== undefined) ? (
      <Line
        key={l.key}
        type="linear"
        dataKey={l.key}
        name={l.name || l.key}
        stroke={l.stroke}
        strokeWidth={l.key === "p50" ? 4 : 2}
        strokeDasharray={l.dash}
        dot={false}
      />
    ) : null
  )}

  <Line
    data={childData}
    dataKey={dataKey}
    stroke="#111827"
    strokeWidth={6}
    dot={{
      r: 7,
      fill: "#111827",
    }}
    connectNulls
    name="Patient"
  />
</LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default GrowthPercentileChart;
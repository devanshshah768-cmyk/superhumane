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
  p3: p.p3,
  p10: p.p10,
  p25: p.p25,
  p50: p.p50,
  p75: p.p75,
  p90: p.p90,
  p97: p.p97,
}));

const sortedPercentileData = [...percentileData].sort(
  (a, b) => a.ageMonths - b.ageMonths
);

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
          <LineChart data={sortedPercentileData}>
  <CartesianGrid strokeDasharray="3 3" />

  <XAxis
    dataKey="ageMonths"
    type="number"
    scale="linear"
    domain={[0, 216]}
    tickFormatter={(value) => value / 12}
  />

  <YAxis />

  <Legend />

  <Line type="monotone" dataKey="p3" stroke="#EF4444" strokeWidth={2} dot={false} />
  <Line type="monotone" dataKey="p10" stroke="#F97316" strokeWidth={2} dot={false} />
  <Line type="monotone" dataKey="p25" stroke="#EAB308" strokeWidth={2} dot={false} />
  <Line type="monotone" dataKey="p50" stroke="#22C55E" strokeWidth={4} dot={false} />
  <Line type="monotone" dataKey="p75" stroke="#3B82F6" strokeWidth={2} dot={false} />
  <Line type="monotone" dataKey="p90" stroke="#8B5CF6" strokeWidth={2} dot={false} />
  <Line type="monotone" dataKey="p97" stroke="#EC4899" strokeWidth={2} dot={false} />

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
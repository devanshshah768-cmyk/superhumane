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

  const chartData =
    curveData.map(
      (curvePoint) => {

        const childPoint =
          childData.find(

            (item) =>

              Math.round(
                item.ageMonths
              ) ===

              Math.round(
                curvePoint.ageMonths
              )

          );

        return {

          ...curvePoint,

          child:
            childPoint?.[
              dataKey
            ] || null,

        };

      }
    );

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

          <LineChart
            data={chartData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="ageMonths"
              label={{
                value:
                  "Age (Months)",
                position:
                  "insideBottom",
                offset:
                  -5,
              }}
            />

            <YAxis
              label={{
                value:
                  unit,
                angle:
                  -90,
                position:
                  "insideLeft",
              }}
            />

            <Tooltip />

            <Legend />

            {/* PERCENTILES */}

            <Line
              type="monotone"
              dataKey="p3"
              stroke="#D1D5DB"
              dot={false}
              name="P3"
            />

            <Line
              type="monotone"
              dataKey="p10"
              stroke="#CBD5E1"
              dot={false}
              name="P10"
            />

            <Line
              type="monotone"
              dataKey="p25"
              stroke="#94A3B8"
              dot={false}
              name="P25"
            />

            <Line
              type="monotone"
              dataKey="p50"
              stroke="#2563EB"
              strokeWidth={3}
              dot={false}
              name="P50"
            />

            <Line
              type="monotone"
              dataKey="p75"
              stroke="#94A3B8"
              dot={false}
              name="P75"
            />

            <Line
              type="monotone"
              dataKey="p90"
              stroke="#CBD5E1"
              dot={false}
              name="P90"
            />

            <Line
              type="monotone"
              dataKey="p97"
              stroke="#D1D5DB"
              dot={false}
              name="P97"
            />

            {/* CHILD */}

            <Line
              type="monotone"
              dataKey="child"
              stroke="#EF4444"
              strokeWidth={4}
              activeDot={{
                r: 8,
              }}
              name="Child"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default GrowthPercentileChart;
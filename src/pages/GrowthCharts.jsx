import MainLayout from "../layouts/MainLayout";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { age: 0, p3: 2.5, p50: 3.3, p97: 4.2, child: 3.1 },
  { age: 2, p3: 4.5, p50: 5.6, p97: 7.1, child: 5.4 },
  { age: 4, p3: 5.5, p50: 6.8, p97: 8.5, child: 6.7 },
  { age: 6, p3: 6.3, p50: 7.9, p97: 9.8, child: 7.8 },
  { age: 9, p3: 7.2, p50: 8.9, p97: 11.2, child: 8.7 },
  { age: 12, p3: 7.8, p50: 9.6, p97: 12.0, child: 9.4 },
];

function GrowthCharts() {
  return (
    <MainLayout>

      <div className="min-h-screen bg-background px-6 lg:px-12 py-16">

        {/* PAGE HEADER */}
        <div className="max-w-7xl mx-auto mb-14">

          <h1 className="text-5xl font-bold text-secondary mb-4">
            Growth Charts
          </h1>

          <p className="text-lg text-gray-600">
            Live pediatric growth monitoring based on
            standardized percentile curves.
          </p>

        </div>

        {/* MAIN GRID */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[350px_1fr] gap-10">

          {/* LEFT PANEL */}
          <div className="space-y-8">

            {/* CHILD CARD */}
            <div className="bg-white rounded-[32px] shadow-soft p-8">

              <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-4xl">
                  👶
                </div>

                <div>

                  <h2 className="text-2xl font-bold text-secondary">
                    Aarav Shah
                  </h2>

                  <p className="text-gray-500">
                    Male • 12 Months
                  </p>

                </div>

              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-4 mt-8">

                <div className="bg-primary/10 rounded-2xl p-5 text-center">

                  <h3 className="text-3xl font-bold text-primary">
                    75%
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Height
                  </p>

                </div>

                <div className="bg-accent/10 rounded-2xl p-5 text-center">

                  <h3 className="text-3xl font-bold text-accent">
                    68%
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Weight
                  </p>

                </div>

              </div>

            </div>

            {/* ADD ENTRY */}
            <div className="bg-white rounded-[32px] shadow-soft p-8">

              <h2 className="text-2xl font-bold text-secondary mb-6">
                Add New Entry
              </h2>

              <div className="space-y-5">

                <input
                  type="date"
                  className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-primary"
                />

                <input
                  type="number"
                  placeholder="Height (cm)"
                  className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-primary"
                />

                <input
                  type="number"
                  placeholder="Weight (kg)"
                  className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-primary"
                />

                <button className="w-full py-4 rounded-2xl bg-primary text-white font-semibold hover:scale-[1.02] transition duration-300">
                  Save Entry
                </button>

              </div>

            </div>

          </div>

          {/* CHART AREA */}
          <div className="bg-white rounded-[32px] shadow-soft p-8">

            <div className="flex justify-between items-center mb-10">

              <div>

                <h2 className="text-3xl font-bold text-secondary">
                  Weight-for-Age
                </h2>

                <p className="text-gray-500 mt-2">
                  Based on IAP percentile standards
                </p>

              </div>

              <div className="px-5 py-3 rounded-2xl bg-primary/10 text-primary font-semibold">
                Healthy Trend
              </div>

            </div>

            {/* CHART */}
            <div className="w-full h-[500px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={data}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="age"
                    label={{
                      value: "Age (Months)",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />

                  <YAxis
                    label={{
                      value: "Weight (kg)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />

                  <Tooltip />
                  <Legend />

                  {/* PERCENTILE CURVES */}
                  <Line
                    type="monotone"
                    dataKey="p3"
                    stroke="#D1D5DB"
                    strokeWidth={2}
                    dot={false}
                    name="3rd Percentile"
                  />

                  <Line
                    type="monotone"
                    dataKey="p50"
                    stroke="#5C8D89"
                    strokeWidth={3}
                    dot={false}
                    name="50th Percentile"
                  />

                  <Line
                    type="monotone"
                    dataKey="p97"
                    stroke="#D1D5DB"
                    strokeWidth={2}
                    dot={false}
                    name="97th Percentile"
                  />

                  {/* CHILD LINE */}
                  <Line
                    type="monotone"
                    dataKey="child"
                    stroke="#E07A5F"
                    strokeWidth={4}
                    activeDot={{ r: 8 }}
                    name="Child Growth"
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default GrowthCharts;
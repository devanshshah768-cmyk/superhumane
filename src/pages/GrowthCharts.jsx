import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getChild } from "../services/childService";
import { getGrowthEntries } from "../services/growthService";
import GrowthForm from "../components/GrowthForm";
import GrowthTable from "../components/GrowthTable";

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

import boysWeight from "../data/growth/boysWeight.json";
import girlsWeight from "../data/growth/girlsWeight.json";
import boysHeight from "../data/growth/boysHeight.json";
import girlsHeight from "../data/growth/girlsHeight.json";
import boysBMI from "../data/growth/boysBMI.json";
import girlsBMI from "../data/growth/girlsBMI.json";

function GrowthCharts() {
  const { childId } = useParams();

  const [child, setChild] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState("weight");

  async function loadData() {
    try {
      setLoading(true);
      const childData = await getChild(childId);
      setChild(childData);

      const growthData = await getGrowthEntries(childId);
      setRecords(growthData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [childId]);

  function getAgeMonths(dob) {
    if (!dob) return 0;
    const birth = new Date(dob);
    const today = new Date();

    return Math.floor(
      (today - birth) / (1000 * 60 * 60 * 24 * 30.44)
    );
  }

  function getAgeYears(dob, measurementDate) {
    if (!dob || !measurementDate) return 0;

    const birth = new Date(dob);
    const measure = new Date(measurementDate);

    return Number(
      (
        (measure - birth) /
        (1000 * 60 * 60 * 24 * 365.25)
      ).toFixed(2)
    );
  }

  const latestRecord =
    records.length > 0
      ? records[records.length - 1]
      : null;

  const gender = (child?.gender || "").toLowerCase();

  const weightPercentiles =
    gender === "male"
      ? boysWeight
      : girlsWeight;

  const heightPercentiles =
    gender === "male"
      ? boysHeight
      : girlsHeight;

  const bmiPercentiles =
    gender === "male"
      ? boysBMI
      : girlsBMI;

  const patientData = useMemo(() => {
    if (!child) return [];

    return records.map((record) => ({
      age: getAgeYears(
        child.dob,
        record.measurementDate
      ),
      weight: Number(record.weight || 0),
      height: Number(record.height || 0),
      bmi: Number(record.bmi || 0),
    }));
  }, [records, child]);
const weightPatientData = patientData.map((p) => ({
  age: p.age,
  value: p.weight,
}));

const heightPatientData = patientData.map((p) => ({
  age: p.age,
  value: p.height,
}));

const bmiPatientData = patientData.map((p) => ({
  age: p.age,
  value: p.bmi,
}));
function buildChartData(percentiles, patientData, key) {
  return percentiles.map((p) => {
    const patientPoint = patientData.find(
      (r) => Math.abs(r.age - p.ageYears) < 0.25
    );

    return {
      age: p.ageYears,
      p3: p.p3,
      p10: p.p10,
      p25: p.p25,
      p50: p.p50,
      p75: p.p75,
      p90: p.p90,
      p97: p.p97,
      patient: patientPoint ? patientPoint[key] : null,
    };
  });
}

const weightData = buildChartData(
  weightPercentiles,
  patientData,
  "weight"
);

const heightData = buildChartData(
  heightPercentiles,
  patientData,
  "height"
);

const bmiData = buildChartData(
  bmiPercentiles,
  patientData,
  "bmi"
);

  const chartConfig = {
  weight: {
    title: "Weight For Age Percentiles",
    data: weightData,
    patientLabel: "Weight (kg)",
  },

  height: {
    title: "Height For Age Percentiles",
    data: heightData,
    patientLabel: "Height (cm)",
  },

  bmi: {
    title: "BMI For Age Percentiles",
    data: bmiData,
    patientLabel: "BMI",
  },
};

  const activeChart = chartConfig[selectedChart];
  function PercentileChart({ title, data, patientLabel }) {
    return (
      <div>

        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line data={data} dataKey="p3" stroke="#ef4444" dot={false} />
              <Line data={data} dataKey="p10" stroke="#f97316" dot={false} />
              <Line data={data} dataKey="p25" stroke="#eab308" dot={false} />
              <Line data={data} dataKey="p50" stroke="#22c55e" strokeWidth={3} dot={false} />
              <Line data={data} dataKey="p75" stroke="#3b82f6" dot={false} />
              <Line data={data} dataKey="p90" stroke="#8b5cf6" dot={false} />
              <Line data={data} dataKey="p97" stroke="#ec4899" dot={false} />

<Line
  dataKey="value"
  data={activeChart.patientData}
  name={activeChart.patientLabel}
  stroke="#111827"
  strokeWidth={5}
  dot={{ r: 7 }}
  activeDot={{ r: 9 }}
  connectNulls
/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  if (loading) {
    return <MainLayout><div className="p-10">Loading...</div></MainLayout>;
  }

  if (!child) {
    return <MainLayout><div className="p-10">Child not found</div></MainLayout>;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-background px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-secondary">Growth Tracker</h1>
          </div>

          <div className="grid lg:grid-cols-[350px_1fr] gap-10">
            <div className="space-y-8">
              <div className="bg-white rounded-[32px] shadow-soft p-8">
                <h2 className="text-2xl font-bold">{child.childName}</h2>
                <p>{child.gender} • {getAgeMonths(child.dob)} Months</p>
              </div>

              <GrowthForm childId={childId} onSaved={loadData} />
            </div>

            <div className="space-y-8">
              <GrowthTable records={records} />

<div className="bg-white rounded-[32px] shadow-soft p-8">

  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold text-secondary">
      Growth Charts
    </h2>

    <div className="flex gap-2">
      <button
        onClick={() => setSelectedChart("weight")}
        className={`px-4 py-2 rounded-xl font-medium transition-all ${
          selectedChart === "weight"
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Weight
      </button>

      <button
        onClick={() => setSelectedChart("height")}
        className={`px-4 py-2 rounded-xl font-medium transition-all ${
          selectedChart === "height"
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Height
      </button>

      <button
        onClick={() => setSelectedChart("bmi")}
        className={`px-4 py-2 rounded-xl font-medium transition-all ${
          selectedChart === "bmi"
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        BMI
      </button>
    </div>
  </div>

  <PercentileChart
    title={activeChart.title}
    data={activeChart.data}
    patientLabel={activeChart.patientLabel}
  />

</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default GrowthCharts;
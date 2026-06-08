import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getChild } from "../services/childService";
import { getGrowthEntries } from "../services/growthService";
import GrowthForm from "../components/GrowthForm";
import GrowthTable from "../components/GrowthTable";
import GrowthPercentileChart from "../components/GrowthPercentileChart";

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

const childChartData = useMemo(() => {
  if (!child) return [];

  return records.map((record) => ({
    ageMonths:
      getAgeYears(
        child.dob,
        record.measurementDate
      ) * 12,

    weight: Number(record.weight || 0),
    height: Number(record.height || 0),
    bmi: Number(record.bmi || 0),
  }));
}, [records, child]);

const weightCurveData = weightPercentiles.map((p) => ({
  ...p,
  ageMonths: p.ageYears * 12,
}));

const heightCurveData =
  heightPercentiles.map((p) => ({
    ageMonths: p.ageYears * 12,
    ...p,
  }));

const bmiCurveData =
  bmiPercentiles.map((p) => ({
    ageMonths: p.ageYears * 12,
    ...p,
  }));

const chartConfig = {
  weight: {
    title: "Weight For Age Percentiles",
    curveData: weightCurveData,
    dataKey: "weight",
    unit: "Weight (kg)",
  },

  height: {
    title: "Height For Age Percentiles",
    curveData: heightCurveData,
    dataKey: "height",
    unit: "Height (cm)",
  },

  bmi: {
    title: "BMI For Age Percentiles",
    curveData: bmiCurveData,
    dataKey: "bmi",
    unit: "BMI",
  },
};

const activeChart = chartConfig[selectedChart];

<GrowthPercentileChart
  title={activeChart.title}
  curveData={activeChart.curveData}
  childData={childChartData}
  dataKey={activeChart.dataKey}
  unit={activeChart.unit}
/>

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

<GrowthPercentileChart
  title={activeChart.title}
  curveData={activeChart.curveData}
  childData={childChartData}
  dataKey={activeChart.dataKey}
  unit={activeChart.unit}
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
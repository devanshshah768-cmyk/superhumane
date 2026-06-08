import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { getChild } from "../services/childService";

import {
  getGrowthEntries,
} from "../services/growthService.js";

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

  const { childId } =
    useParams();

  const [child, setChild] =
    useState(null);

  const [records, setRecords] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  async function loadData() {

    try {

      setLoading(true);

      console.log("childId =", childId);

      const childData =
        await getChild(childId);

      console.log(
        "childData =",
        childData
      );

      setChild(childData);

      const growthData =
        await getGrowthEntries(
          childId
        );

      console.log(
        "growthData =",
        growthData
      );

      setRecords(growthData);

    } catch (error) {

      console.error(
        error
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadData();

  }, [childId]);

  function getAgeMonths(
    dob
  ) {

    if (!dob)
      return 0;

    const birth =
      new Date(dob);

    const today =
      new Date();

    return Math.floor(

      (
        today -
        birth
      ) /

      (
        1000 *
        60 *
        60 *
        24 *
        30.44
      )

    );

  }

  const latestRecord =
    records.length
      ? records[
          records.length - 1
        ]
      : null;
  const chartData = records.map(
  (record) => ({

    age:
      record.measurementDate,

    weight:
      Number(
        record.weight || 0
      ),

    height:
      Number(
        record.height || 0
      ),

    bmi:
      Number(
        record.bmi || 0
      ),

  })
);

const weightPercentiles =
  child.gender === "male"
    ? boysWeight
    : girlsWeight;

const heightPercentiles =
  child.gender === "male"
    ? boysHeight
    : girlsHeight;

const bmiPercentiles =
  child.gender === "male"
    ? boysBMI
    : girlsBMI;

const weightChartData =
  weightPercentiles.map(
    (point) => ({

      age: point.ageYears,

      p3: point.p3,
      p10: point.p10,
      p25: point.p25,
      p50: point.p50,
      p75: point.p75,
      p90: point.p90,
      p97: point.p97,

    })
  );

  if (loading) {

    return (

      <MainLayout>

        <div className="min-h-screen flex items-center justify-center">

          Loading...

        </div>

      </MainLayout>

    );

  }

  if (!child) {

    return (

      <MainLayout>

        <div className="min-h-screen flex items-center justify-center">

          Child not found

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="min-h-screen bg-background px-6 lg:px-12 py-16">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-10">

            <h1 className="text-5xl font-bold text-secondary">

              Growth Tracker

            </h1>

            <p className="text-gray-500 mt-3">

              Monitor growth,
              BMI and nutritional
              status.

            </p>

          </div>

          <div className="grid lg:grid-cols-[350px_1fr] gap-10">

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

                      {
                        child.childName
                      }

                    </h2>

                    <p className="text-gray-500">

                      {
                        child.gender
                      } • {

                        getAgeMonths(
                          child.dob
                        )

                      } Months

                    </p>

                  </div>

                </div>

              </div>

              {/* LATEST STATUS */}

              {

                latestRecord && (

                  <div className="bg-white rounded-[32px] shadow-soft p-8">

                    <h2 className="text-2xl font-bold mb-6">

                      Latest Status

                    </h2>

                    <div className="space-y-4">

                      <div>

                        <span className="text-gray-500">

                          Weight

                        </span>

                        <p className="font-bold text-xl">

                          {
                            latestRecord.weight
                          } kg

                        </p>

                      </div>

                      <div>

                        <span className="text-gray-500">

                          Height

                        </span>

                        <p className="font-bold text-xl">

                          {
                            latestRecord.height
                          } cm

                        </p>

                      </div>

                      <div>

                        <span className="text-gray-500">

                          BMI

                        </span>

                        <p className="font-bold text-xl">

                          {
                            latestRecord.bmi
                          }

                        </p>

                      </div>

                      <div>

                        <span className="text-gray-500">

                          Outcome

                        </span>

                        <p className="font-bold text-xl">

                          {
                            latestRecord.status
                          }

                        </p>

                      </div>

                    </div>

                  </div>

                )

              }

              {/* FORM */}

              <GrowthForm

                childId={childId}

                onSaved={
                  loadData
                }

              />

            </div>

{/* RIGHT PANEL */}

<div className="space-y-8">

  <GrowthTable
    records={records}
  />

  {/* WEIGHT CHART */}

  <div className="bg-white rounded-[32px] shadow-soft p-8">

    <h2 className="text-2xl font-bold text-secondary mb-6">

      Weight Trend

    </h2>

    <div className="h-[400px]">

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
            dataKey="age"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="weight"
            stroke="#5C8D89"
            strokeWidth={4}
            name="Weight (kg)"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </div>

  {/* HEIGHT CHART */}

  <div className="bg-white rounded-[32px] shadow-soft p-8">

    <h2 className="text-2xl font-bold text-secondary mb-6">

      Height Trend

    </h2>

    <div className="h-[400px]">

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
            dataKey="age"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="height"
            stroke="#E07A5F"
            strokeWidth={4}
            name="Height (cm)"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </div>

  {/* BMI CHART */}

  <div className="bg-white rounded-[32px] shadow-soft p-8">

    <h2 className="text-2xl font-bold text-secondary mb-6">

      BMI Trend

    </h2>

    <div className="h-[400px]">

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
            dataKey="age"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="bmi"
            stroke="#F2CC8F"
            strokeWidth={4}
            name="BMI"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </div>

</div>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default GrowthCharts;
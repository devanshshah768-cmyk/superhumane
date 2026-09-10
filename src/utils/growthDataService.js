import boysHeight from "../data/growth/boysHeight.json";
import boysWeight from "../data/growth/boysWeight.json";
import boysBMI from "../data/growth/boysBMI.json";

import girlsHeight from "../data/growth/girlsHeight.json";
import girlsWeight from "../data/growth/girlsWeight.json";
import girlsBMI from "../data/growth/girlsBMI.json";

/* SELECT DATASET */

export function getDataset(
  gender,
  type
) {

  const isMale =
    gender?.toLowerCase() ===
    "male";

  if (type === "height") {

    return isMale
      ? boysHeight
      : girlsHeight;

  }

  if (type === "weight") {

    return isMale
      ? boysWeight
      : girlsWeight;

  }

  if (type === "bmi") {

    return isMale
      ? boysBMI
      : girlsBMI;

  }

  return [];

}

/* YEARS -> MONTHS */

export function convertToMonthly(
  data
) {

  return data.map(
    (item) => ({

      ageMonths:
        item.ageYears * 12,

      p3:
        item.p3,

      p10:
        item.p10,

      p25:
        item.p25,

      p50:
        item.p50,

      p75:
        item.p75,

      p90:
        item.p90,

      p97:
        item.p97,

    })
  );

}

/* INTERPOLATION */

export function interpolateDataset(
  data
) {

  const result = [];

  for (
    let i = 0;
    i < data.length - 1;
    i++
  ) {

    const start =
      data[i];

    const end =
      data[i + 1];

    const monthsBetween =
      end.ageMonths -
      start.ageMonths;

    for (
      let month = 0;
      month < monthsBetween;
      month++
    ) {

      const ratio =
        month /
        monthsBetween;

      result.push({

        ageMonths:
          start.ageMonths +
          month,

        p3:
          interpolate(
            start.p3,
            end.p3,
            ratio
          ),

        p10:
          interpolate(
            start.p10,
            end.p10,
            ratio
          ),

        p25:
          interpolate(
            start.p25,
            end.p25,
            ratio
          ),

        p50:
          interpolate(
            start.p50,
            end.p50,
            ratio
          ),

        p75:
          interpolate(
            start.p75,
            end.p75,
            ratio
          ),

        p90:
          interpolate(
            start.p90,
            end.p90,
            ratio
          ),

        p97:
          interpolate(
            start.p97,
            end.p97,
            ratio
          ),

      });

    }

  }

  result.push(
    data[
      data.length - 1
    ]
  );

  return result;

}

/* HELPER */

function interpolate(
  start,
  end,
  ratio
) {

  return Number(

    (
      start +
      (
        end -
        start
      ) *
      ratio

    ).toFixed(2)

  );

}

/* GET CURVE */

export function getGrowthCurve(
  gender,
  type
) {

  const dataset =
    getDataset(
      gender,
      type
    );

  const monthly =
    convertToMonthly(
      dataset
    );

  return interpolateDataset(
    monthly
  );

}

/* FIND PERCENTILE */

export function getPercentile(
  value,
  ageMonths,
  curve
) {

  const row =
    curve.find(
      (item) =>

        Math.round(
          item.ageMonths
        ) ===

        Math.round(
          ageMonths
        )
    );

  if (!row)
    return "Unknown";

  if (
    value <= row.p3
  )
    return "P3";

  if (
    value <= row.p10
  )
    return "P10";

  if (
    value <= row.p25
  )
    return "P25";

  if (
    value <= row.p50
  )
    return "P50";

  if (
    value <= row.p75
  )
    return "P75";

  if (
    value <= row.p90
  )
    return "P90";

  if (
    value <= row.p97
  )
    return "P97";

  return ">P97";

}
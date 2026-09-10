import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firestore";
import { getChild } from "./childService";

/* BMI */

export function calculateBMI(
  weight,
  heightCm
) {

  const heightM =
    Number(heightCm) / 100;

  if (!heightM)
    return 0;

  return Number(

    (
      Number(weight) /

      (
        heightM *
        heightM
      )

    ).toFixed(2)

  );

}

/* NUTRITION STATUS
   The old version compared a child's BMI against ADULT cut-offs
   (13 / 14.5 / 18 / 20) — meaningless at any pediatric age. Status is now
   decided from BMI-FOR-AGE percentile on the real references:
   WHO 2006 (0-5 y) and IAP 2015 (5-18 y, where overweight/obesity are the
   published 23/27 adult-equivalent BMI lines). */

import boysWeightRef from "../data/growth/boysWeight.json";
import girlsWeightRef from "../data/growth/girlsWeight.json";
import boysHeightRef from "../data/growth/boysHeight.json";
import girlsHeightRef from "../data/growth/girlsHeight.json";
import boysBMIRef from "../data/growth/boysBMI.json";
import girlsBMIRef from "../data/growth/girlsBMI.json";

const CENTILE_PCTS = { p3: 3, p5: 5, p10: 10, p25: 25, p50: 50, p75: 75, p90: 90, p97: 97 };

/* value's percentile (0-100) on a curve of {ageYears, p3..p97(, ow, ob)} rows.
   Linear interpolation between ages, then between adjacent centiles. */
export function percentileFor(rows, ageYears, value) {

  if (!rows?.length || !Number.isFinite(Number(value)) || !Number.isFinite(Number(ageYears)))
    return null;

  value = Number(value);
  ageYears = Number(ageYears);

  if (ageYears < rows[0].ageYears || ageYears > rows[rows.length - 1].ageYears)
    return null;

  // bracket the age
  let lo = rows[0], hi = rows[rows.length - 1];
  for (let i = 0; i < rows.length - 1; i++) {
    if (ageYears >= rows[i].ageYears && ageYears <= rows[i + 1].ageYears) {
      lo = rows[i]; hi = rows[i + 1];
      break;
    }
  }
  const t = hi.ageYears === lo.ageYears ? 0 : (ageYears - lo.ageYears) / (hi.ageYears - lo.ageYears);
  const at = (k) => (lo[k] != null && hi[k] != null ? lo[k] + t * (hi[k] - lo[k]) : null);

  // special IAP 5-18y cut-offs first
  const ow = at("ow"), ob = at("ob");
  if (ob != null && value >= ob) return 99.5;
  if (ow != null && value >= ow) return 96;

  // bracket the value between adjacent published centiles
  const keys = Object.keys(CENTILE_PCTS).filter((k) => lo[k] != null && hi[k] != null);
  if (!keys.length) return null;

  if (value < at(keys[0])) return 1;

  // Above the top standard centile: on IAP BMI curves (no p75/p90/p97) the
  // published anchors above p50 are the ow/ob lines themselves, so stretch
  // p50 -> ow across percentiles 50..95 rather than shouting "99th".
  const topKey = keys[keys.length - 1];
  const p50v = at('p50');
  if (value > at(topKey)) {
    if (topKey !== 'p50' || ow == null || p50v == null) return 99;
    if (ow > p50v && value <= ow)
      return 50 + ((value - p50v) / (ow - p50v)) * 45;
    return 95.9;
  }

  for (let i = 0; i < keys.length - 1; i++) {
    const v1 = at(keys[i]), v2 = at(keys[i + 1]);
    if (value >= v1 && value <= v2) {
      const u = v2 === v1 ? 0 : (value - v1) / (v2 - v1);
      return CENTILE_PCTS[keys[i]] + u * (CENTILE_PCTS[keys[i + 1]] - CENTILE_PCTS[keys[i]]);
    }
  }
  return null;
}

function refFor(refs, gender) {
  return String(gender).toLowerCase() === "male" ? refs[0] : refs[1];
}

/* Public helper: full assessment of one measurement.
   Works without Firestore — used at save time. */
export function assessMeasurement({ gender, dob, measurementDate, weight, height, bmi }) {

  const birth = new Date(dob);
  const measure = new Date(measurementDate || Date.now());
  if (isNaN(birth)) return null;
  const ageYears = Math.max(0, (measure - birth) / (1000 * 60 * 60 * 24 * 365.25));
  if (ageYears > 18) return null;

  const under5 = ageYears < 5;
  const bmiRef = refFor([boysBMIRef, girlsBMIRef], gender);
  const wtRef = refFor([boysWeightRef, girlsWeightRef], gender);
  const htRef = refFor([boysHeightRef, girlsHeightRef], gender);

  const bmiPct = bmi != null ? percentileFor(bmiRef, ageYears, bmi) : null;
  const weightPct = weight != null ? percentileFor(wtRef, ageYears, weight) : null;
  const heightPct = height != null ? percentileFor(htRef, ageYears, height) : null;

  /* percentileFor() returns the sentinel 99.5 when BMI crosses the IAP
     obesity line (27 adult-equivalent) and 96 for the overweight line (23).
     WHO under-5: >=p97 overweight risk flag, >=p85 "possible risk". */
  let status = "Normal", color = "green";

  if (bmiPct != null) {
    if (bmiPct === 99.5) { status = "Obese"; color = "red"; }
    else if (bmiPct === 96) { status = "Overweight"; color = "orange"; }
    else if (under5 && bmiPct >= 97.7) { status = "Overweight"; color = "orange"; }   // WHO >+2SD
    else if (bmiPct < 3) { status = "Underweight"; color = "red"; }
    else if (under5 && bmiPct >= 85) { status = "Possible risk of overweight"; color = "yellow"; }
  }

  return { ageYears, bmiPct, weightPct, heightPct, status, color };
}

export function calculateNutritionStatus(bmi, { gender, dob, measurementDate } = {}) {

  bmi = Number(bmi);

  if (!gender || !dob) {
    // no context available — neutral, don't guess
    return { status: "Normal", color: "green" };
  }

  const r = assessMeasurement({ gender, dob, measurementDate, bmi });
  return r ? { status: r.status, color: r.color } : { status: "Normal", color: "green" };
}

/* SAVE ENTRY */

export async function saveGrowthEntry(
  childId,
  entry
) {

  const bmi =
    calculateBMI(

      entry.weight,

      entry.height

    );

  /* age & sex aware status: pull the child for dob/gender */
  let nutrition = { status: "Normal", color: "green" };
  try {
    const child = await getChild(childId);
    if (child) {
      nutrition = calculateNutritionStatus(bmi, {
        gender: child.gender,
        dob: child.dob,
        measurementDate: entry.measurementDate,
      });
    }
  } catch (e) {
    console.error("status fallback:", e);
  }

  await addDoc(

    collection(

      db,

      "children",

      childId,

      "growthRecords"

    ),

    {

      ...entry,

      bmi,

      status:
        nutrition.status,

      statusColor:
        nutrition.color,

      createdAt:
        serverTimestamp(),

    }

  );

}

/* DELETE ENTRY — for fixing typos (e.g. weight typed as 85 instead of 8.5) */

export async function deleteGrowthEntry(
  childId,
  entryId
) {

  await deleteDoc(
    doc(
      db,
      "children",
      childId,
      "growthRecords",
      entryId
    )
  );

}

/* FETCH ENTRIES */

export async function getGrowthEntries(
  childId
) {

  const q = query(

    collection(

      db,

      "children",

      childId,

      "growthRecords"

    ),

    orderBy(
      "measurementDate",
      "asc"
    )

  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(

    (doc) => ({

      id:
        doc.id,

      ...doc.data(),

    })

  );

}
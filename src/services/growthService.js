import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

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

/* NUTRITION STATUS */

export function calculateNutritionStatus(
  bmi
) {

  bmi = Number(bmi);

  if (bmi < 13) {

    return {

      status:
        "Malnourished",

      color:
        "red",

    };

  }

  if (bmi < 14.5) {

    return {

      status:
        "Underweight",

      color:
        "orange",

    };

  }

  if (bmi <= 18) {

    return {

      status:
        "Normal",

      color:
        "green",

    };

  }

  if (bmi <= 20) {

    return {

      status:
        "Overweight",

      color:
        "yellow",

    };

  }

  return {

    status:
      "Obese",

    color:
      "red",

  };

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

  const nutrition =
    calculateNutritionStatus(
      bmi
    );

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
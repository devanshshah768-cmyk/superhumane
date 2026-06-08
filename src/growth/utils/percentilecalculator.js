import boysWeight from "../data/boysWeight.json";

export function getWeightPercentile(age, weight) {

  const entry = boysWeight.find(
    (item) => item.age === age
  );

  if (!entry) {
    return {
      percentile: "No Data",
      category: "Unavailable",
    };
  }

  if (weight < entry.p3) {
    return {
      percentile: "<3rd",
      category: "Underweight",
    };
  }

  if (weight >= entry.p3 && weight < entry.p50) {
    return {
      percentile: "3rd - 50th",
      category: "Normal",
    };
  }

  if (weight === entry.p50) {
    return {
      percentile: "50th",
      category: "Normal",
    };
  }

  if (weight > entry.p50 && weight <= entry.p97) {
    return {
      percentile: "50th - 97th",
      category: "Normal",
    };
  }

  return {
    percentile: ">97th",
    category: "High Weight",
  };
}
export function interpolateCurve(points) {

  if (!points || points.length < 2)
    return [];

  const result = [];

  for (let i = 0; i < points.length - 1; i++) {

    const start = points[i];
    const end = points[i + 1];

    const monthsBetween =
      (end.age - start.age) * 12;

    for (
      let month = 0;
      month <= monthsBetween;
      month++
    ) {

      const ratio =
        month / monthsBetween;

      const value =
        start.value +
        (end.value - start.value) *
        ratio;

      result.push({

        age:
          start.age +
          month / 12,

        value:
          Number(
            value.toFixed(2)
          ),

      });

    }

  }

  return result;

}
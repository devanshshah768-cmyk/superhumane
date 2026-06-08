function GrowthTable({ records = [] }) {

  if (!records.length) {

    return (

      <div
        className="
          bg-white
          rounded-3xl
          p-8
          shadow-lg
          text-center
          text-gray-500
        "
      >

        No growth records available.

      </div>

    );

  }

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-lg
        overflow-hidden
      "
    >

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              className="
                bg-primary
                text-white
              "
            >

              <th className="px-5 py-4 text-left">
                Date
              </th>

              <th className="px-5 py-4 text-left">
                Weight (kg)
              </th>

              <th className="px-5 py-4 text-left">
                Height (cm)
              </th>

              <th className="px-5 py-4 text-left">
                HC (cm)
              </th>

              <th className="px-5 py-4 text-left">
                BMI
              </th>

              <th className="px-5 py-4 text-left">
                Outcome
              </th>

            </tr>

          </thead>

          <tbody>

            {

              records.map(

                (record) => (

                  <tr
                    key={record.id}
                    className="
                      border-b
                      hover:bg-gray-50
                    "
                  >

                    <td className="px-5 py-4">

                      {
                        record.measurementDate
                      }

                    </td>

                    <td className="px-5 py-4">

                      {
                        record.weight
                      }

                    </td>

                    <td className="px-5 py-4">

                      {
                        record.height
                      }

                    </td>

                    <td className="px-5 py-4">

                      {
                        record.headCircumference || "-"
                      }

                    </td>

                    <td className="px-5 py-4">

                      {
                        record.bmi
                      }

                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-semibold

                          ${
                            record.status === "Normal"
                              ? "bg-green-100 text-green-700"
                              : record.status === "Underweight"
                              ? "bg-yellow-100 text-yellow-700"
                              : record.status === "Overweight"
                              ? "bg-orange-100 text-orange-700"
                              : record.status === "Obese"
                              ? "bg-red-100 text-red-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >

                        {record.status}

                      </span>

                    </td>

                  </tr>

                )

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default GrowthTable;
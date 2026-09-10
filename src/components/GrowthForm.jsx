import { useState } from "react";

import {
  saveGrowthEntry,
} from "../services/growthService.js";

function GrowthForm({
  childId,
  onSaved,
}) {

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      measurementDate:
        new Date()
          .toISOString()
          .split("T")[0],

      weight: "",

      height: "",

      headCircumference: "",

    });

  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setLoading(true);

      await saveGrowthEntry(
        childId,
        form
      );

      setForm({

        measurementDate:
          new Date()
            .toISOString()
            .split("T")[0],

        weight: "",

        height: "",

        headCircumference: "",

      });

      if (onSaved)
        onSaved();

      alert(
        "Growth entry saved successfully"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to save entry"
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        rounded-3xl
        p-6
        shadow-lg
        space-y-5
      "
    >

      <h2 className="text-2xl font-bold">

        Add Growth Record

      </h2>

      <div>

        <label className="font-medium">

          Measurement Date

        </label>

        <input
          type="date"
          name="measurementDate"
          value={form.measurementDate}
          onChange={handleChange}
          className="
            mt-2
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />

      </div>

      <div>

        <label className="font-medium">

          Weight (kg)

        </label>

        <input
          type="number"
          step="0.01"
          name="weight"
          value={form.weight}
          onChange={handleChange}
          className="
            mt-2
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
          required
        />

      </div>

      <div>

        <label className="font-medium">

          Height (cm)

        </label>

        <input
          type="number"
          step="0.01"
          name="height"
          value={form.height}
          onChange={handleChange}
          className="
            mt-2
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
          required
        />

      </div>

      <div>

        <label className="font-medium">

          Head Circumference (cm)

        </label>

        <input
          type="number"
          step="0.01"
          name="headCircumference"
          value={form.headCircumference}
          onChange={handleChange}
          className="
            mt-2
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />

      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          bg-primary
          text-white
          py-4
          rounded-2xl
          font-semibold
        "
      >

        {
          loading
            ? "Saving..."
            : "Save Record"
        }

      </button>

    </form>

  );

}

export default GrowthForm;
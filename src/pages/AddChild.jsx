import { useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { useAuth } from "../context/AuthContext";

import {
  addChild,
} from "../services/childService";

function AddChild() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      /* BASIC */
      childName: "",
      gender: "male",
      dob: "",
      bloodGroup: "",

      /* BIRTH DETAILS */
      birthWeight: "",
      birthHeight: "",
      headCircumference: "",
      gestationalAge: "",
      deliveryType: "normal",
      nicuAdmission: "no",

      /* FAMILY */
      motherName: "",
      fatherName: "",

      /* FLAGS */
      prematurity: "no",
      congenitalConditions: "",

    });

  function handleChange(e) {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setLoading(true);

      await addChild({

        parentId: user.uid,

        ...formData,

      });

      alert(
        "Child registered successfully ✅"
      );

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setLoading(false);

    }

  }

  return (

    <MainLayout>

      <div className="min-h-screen bg-background px-6 py-16">

        <div className="max-w-5xl mx-auto">

          <div className="bg-white rounded-[40px] shadow-soft p-10 lg:p-14">

            {/* HEADER */}
            <div className="mb-14">

              <div className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-5">

                Pediatric Registration

              </div>

              <h1 className="text-5xl font-bold text-secondary mb-5">

                Add Child 👶

              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">

                Register your child to begin growth tracking,
                developmental milestone monitoring,
                and pediatric health documentation.

              </p>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-16"
            >

              {/* BASIC DETAILS */}
              <div>

                <h2 className="text-3xl font-bold text-secondary mb-8">

                  Basic Information

                </h2>

                <div className="grid lg:grid-cols-2 gap-6">

                  {/* CHILD NAME */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      Child Name

                    </label>

                    <input
                      type="text"
                      required
                      name="childName"
                      value={formData.childName}
                      onChange={handleChange}
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                      "
                    />

                  </div>

                  {/* GENDER */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      Gender

                    </label>

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                        bg-white
                      "
                    >

                      <option value="male">
                        Male
                      </option>

                      <option value="female">
                        Female
                      </option>

                    </select>

                  </div>

                  {/* DOB */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      Date of Birth

                    </label>

                    <input
                      type="date"
                      required
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                      "
                    />

                  </div>

                  {/* BLOOD GROUP */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      Blood Group

                    </label>

                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                        bg-white
                      "
                    >

                      <option value="">
                        Select
                      </option>

                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>

                    </select>

                  </div>

                </div>

              </div>

              {/* BIRTH DETAILS */}
              <div>

                <h2 className="text-3xl font-bold text-secondary mb-8">

                  Birth Details

                </h2>

                <div className="grid lg:grid-cols-2 gap-6">

                  {/* WEIGHT */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      Birth Weight (kg)

                    </label>

                    <input
                      type="number"
                      step="0.1"
                      name="birthWeight"
                      value={formData.birthWeight}
                      onChange={handleChange}
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                      "
                    />

                  </div>

                  {/* HEIGHT */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      Birth Height (cm)

                    </label>

                    <input
                      type="number"
                      step="0.1"
                      name="birthHeight"
                      value={formData.birthHeight}
                      onChange={handleChange}
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                      "
                    />

                  </div>

                  {/* HC */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      Head Circumference (cm)

                    </label>

                    <input
                      type="number"
                      step="0.1"
                      name="headCircumference"
                      value={formData.headCircumference}
                      onChange={handleChange}
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                      "
                    />

                  </div>

                  {/* GA */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      Gestational Age (weeks)

                    </label>

                    <input
                      type="number"
                      name="gestationalAge"
                      value={formData.gestationalAge}
                      onChange={handleChange}
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                      "
                    />

                  </div>

                  {/* DELIVERY */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      Delivery Type

                    </label>

                    <select
                      name="deliveryType"
                      value={formData.deliveryType}
                      onChange={handleChange}
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                        bg-white
                      "
                    >

                      <option value="normal">
                        Normal Vaginal Delivery
                      </option>

                      <option value="c-section">
                        Caesarean Section
                      </option>

                    </select>

                  </div>

                  {/* NICU */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      NICU Admission

                    </label>

                    <select
                      name="nicuAdmission"
                      value={formData.nicuAdmission}
                      onChange={handleChange}
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                        bg-white
                      "
                    >

                      <option value="no">
                        No
                      </option>

                      <option value="yes">
                        Yes
                      </option>

                    </select>

                  </div>

                </div>

              </div>

              {/* FAMILY */}
              <div>

                <h2 className="text-3xl font-bold text-secondary mb-8">

                  Parent Details

                </h2>

                <div className="grid lg:grid-cols-2 gap-6">

                  {/* MOTHER */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      Mother Name

                    </label>

                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                      "
                    />

                  </div>

                  {/* FATHER */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      Father Name

                    </label>

                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                      "
                    />

                  </div>

                </div>

              </div>

              {/* MEDICAL FLAGS */}
              <div>

                <h2 className="text-3xl font-bold text-secondary mb-8">

                  Medical Flags

                </h2>

                <div className="grid lg:grid-cols-2 gap-6">

                  {/* PREMATURITY */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      Prematurity

                    </label>

                    <select
                      name="prematurity"
                      value={formData.prematurity}
                      onChange={handleChange}
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                        bg-white
                      "
                    >

                      <option value="no">
                        No
                      </option>

                      <option value="yes">
                        Yes
                      </option>

                    </select>

                  </div>

                  {/* CONDITIONS */}
                  <div>

                    <label className="block font-semibold text-secondary mb-3">

                      Congenital Conditions

                    </label>

                    <input
                      type="text"
                      name="congenitalConditions"
                      value={formData.congenitalConditions}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="
                        w-full
                        p-4
                        rounded-2xl
                        border
                        border-gray-200
                        outline-none
                        focus:border-primary
                      "
                    />

                  </div>

                </div>

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  py-5
                  rounded-2xl
                  bg-primary
                  text-white
                  font-semibold
                  text-lg
                  hover:scale-[1.01]
                  transition
                  duration-300
                  shadow-xl
                "
              >

                {
                  loading
                    ? "Registering Child..."
                    : "Register Child"
                }

              </button>

            </form>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default AddChild;
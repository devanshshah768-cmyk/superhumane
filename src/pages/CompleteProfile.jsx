import { useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { useAuth } from "../context/AuthContext";

import {
  completeProfile,
} from "../services/authService";

function CompleteProfile() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    phone: "",

    role: "parent",

  });

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setLoading(true);

      await completeProfile({

        uid: user.uid,

        phone: formData.phone,

        role: formData.role,

      });

      alert(
        "Profile completed successfully ✅"
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

      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-xl bg-white rounded-[36px] shadow-soft p-10">

          {/* HEADER */}
          <div className="mb-10">

            <div className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-5">

              Complete Your Profile

            </div>

            <h1 className="text-4xl font-bold text-secondary mb-4">

              Almost There 👋

            </h1>

            <p className="text-gray-600 leading-relaxed">

              Help us personalize your experience by
              completing your account details.

            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* PHONE */}
            <div>

              <label className="block text-secondary font-semibold mb-3">

                Phone Number

              </label>

              <input
                type="tel"
                required
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
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

            {/* ROLE */}
            <div>

              <label className="block text-secondary font-semibold mb-3">

                Select Role

              </label>

              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
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

                <option value="parent">
                  Parent
                </option>

                <option value="doctor">
                  Doctor
                </option>

              </select>

            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-4
                rounded-2xl
                bg-primary
                text-white
                font-semibold
                hover:scale-[1.02]
                transition
                duration-300
                shadow-xl
              "
            >

              {
                loading
                  ? "Saving..."
                  : "Continue To Dashboard"
              }

            </button>

          </form>

        </div>

      </div>

    </MainLayout>

  );
}

export default CompleteProfile;
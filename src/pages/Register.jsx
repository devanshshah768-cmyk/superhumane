import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  registerUser,
} from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setLoading(true);

      await registerUser(formData);

      alert("Registration Successful ✅");

      navigate("/login");

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

        <div className="w-full max-w-lg bg-white rounded-[32px] shadow-soft p-10">

          <h1 className="text-4xl font-bold text-secondary mb-3">
            Create Account
          </h1>

          <p className="text-gray-500 mb-10">
            Start tracking pediatric growth & milestones.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-primary"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-primary"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              required
              className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-primary"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-primary text-white font-semibold hover:scale-[1.02] transition duration-300"
            >

              {
                loading
                  ? "Creating Account..."
                  : "Register"
              }

            </button>

          </form>

        </div>

      </div>

    </MainLayout>
  );
}

export default Register;
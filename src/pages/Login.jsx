import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  loginUser,
  loginWithGoogle,
} from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setLoading(true);

      await loginUser(formData);

      alert("Login Successful ✅");

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert(error.message);

    } finally {

      setLoading(false);

    }
  }

  async function handleGoogleLogin() {

    try {

      await loginWithGoogle();

      alert("Google Login Successful ✅");

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert(error.message);

    }
  }

  return (
    <MainLayout>

      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-lg bg-white rounded-[32px] shadow-soft p-10">

          <h1 className="text-4xl font-bold text-secondary mb-3">
            Welcome Back
          </h1>

          <p className="text-gray-500 mb-10">
            Login to continue your pediatric tracking journey.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

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

            <div className="flex justify-end">

              <Link
                to="/forgot-password"
                className="text-primary font-medium hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-primary text-white font-semibold hover:scale-[1.02] transition duration-300"
            >

              {
                loading
                  ? "Logging In..."
                  : "Login"
              }

            </button>

          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-8">

            <div className="flex-1 h-[1px] bg-gray-200"></div>

            <span className="text-gray-400 text-sm">
              OR
            </span>

            <div className="flex-1 h-[1px] bg-gray-200"></div>

          </div>

          {/* GOOGLE LOGIN */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-4 rounded-2xl border border-gray-200 hover:bg-gray-50 transition duration-300 font-semibold"
          >
            Continue with Google
          </button>

        </div>

      </div>

    </MainLayout>
  );
}

export default Login;
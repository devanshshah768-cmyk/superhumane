import {
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import {
  resetPassword,
} from "../services/authService";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setLoading(true);

      await resetPassword(email);

      alert(
        "Password reset email sent ✅"
      );

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
            Reset Password
          </h1>

          <p className="text-gray-500 mb-10">
            Enter your email to receive a password reset link.
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
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-primary text-white font-semibold hover:scale-[1.02] transition duration-300"
            >

              {
                loading
                  ? "Sending..."
                  : "Send Reset Link"
              }

            </button>

          </form>

        </div>

      </div>

    </MainLayout>
  );
}

export default ForgotPassword;
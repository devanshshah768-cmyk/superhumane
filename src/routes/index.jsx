import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import CompleteProfile from "../pages/CompleteProfile";
import GrowthCharts from "../pages/GrowthCharts";
import AddChild from "../pages/AddChild";

import Dev from "../pages/Dev";
import AboutDr from "../pages/AboutDr";

import ProtectedRoute from "./ProtectedRoute";
import ProfileProtectedRoute from "./ProfileProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/growth"
          element={<GrowthCharts />}
        />

        <Route
          path="/dev"
          element={<Dev />}
        />

        <Route
          path="/aboutdr"
          element={<AboutDr />}
        />

        {/* PROTECTED ROUTES */}

        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProfileProtectedRoute>
              <Dashboard />
            </ProfileProtectedRoute>
          }
        />

        <Route
          path="/add-child"
          element={
            <ProfileProtectedRoute>
              <AddChild />
            </ProfileProtectedRoute>
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-5xl font-bold">
              404 Not Found 😭
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
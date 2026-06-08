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

import ProtectedRoute from "./ProtectedRoute";
import AddChild from "../pages/AddChild";
import ProfileProtectedRoute from "./ProfileProtectedRoute";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          path="/add-child"
          element={
            <ProfileProtectedRoute>

              <AddChild />

            </ProfileProtectedRoute>
          }
        />
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

        {/* PROFILE COMPLETION */}

        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute>

              <CompleteProfile />

            </ProtectedRoute>
          }
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProfileProtectedRoute>

              <Dashboard />

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
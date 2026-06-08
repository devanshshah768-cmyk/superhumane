import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

function ProtectedRoute({
  children,
}) {

  const {
    user,
    loading,
  } = useAuth();

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">

        Loading...

      </div>

    );

  }

  if (!user) {

    return (
      <Navigate to="/login" />
    );

  }

  return children;

}

export default ProtectedRoute;
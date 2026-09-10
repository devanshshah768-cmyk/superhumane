import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

function ProfileProtectedRoute({
  children,
}) {

  const {
    user,
    userData,
    loading,
  } = useAuth();

  /* LOADING */
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">

        Loading...

      </div>

    );

  }

  /* NOT LOGGED IN */
  if (!user) {

    return (
      <Navigate to="/login" />
    );

  }

  /* WAIT FOR FIRESTORE */
  if (!userData) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">

        Fetching profile...

      </div>

    );

  }

  /* PROFILE INCOMPLETE */
  if (
    !userData.profileCompleted
  ) {

    return (
      <Navigate to="/complete-profile" />
    );

  }

  /* ALLOW ACCESS */
  return children;

}

export default ProfileProtectedRoute;
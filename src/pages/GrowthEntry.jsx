import { useEffect, useMemo, useState } from "react";
import { Navigate, Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import { subscribeToChildren } from "../services/childService";

/* /growth — the navbar's "Growth Charts" entry point.

   Charts are unique per child (/growth/:childId — the child id in the link IS
   the page). With several children we open the OLDEST one by default, the one
   whose growth curve matters most; the dashboard cards open any sibling. */
function GrowthEntry() {

  const { user } = useAuth();
  const [children, setChildren] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToChildren(
      user.uid,
      (list) => setChildren(list),
      (e) => { console.error(e); setError(e.message); }
    );
    return unsub;
  }, [user]);

  const oldest = useMemo(() => {
    if (!children?.length) return null;
    const withDob = children.filter((c) => c.dob);
    withDob.sort((a, b) => new Date(a.dob) - new Date(b.dob));
    return withDob[0] ?? null;
  }, [children]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-background px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-secondary mb-4">Something went wrong</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </MainLayout>
    );
  }

  if (children === null) {
    return (
      <MainLayout>
        <div className="p-10 text-center text-gray-500">Loading…</div>
      </MainLayout>
    );
  }

  if (oldest) {
    return <Navigate to={`/growth/${oldest.id}`} replace />;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-background px-6 py-24">
        <div className="max-w-2xl mx-auto bg-white rounded-[32px] shadow-soft p-12 text-center">
          <div className="text-7xl mb-8">📈</div>
          <h1 className="text-4xl font-bold text-secondary mb-5">No growth data yet</h1>
          <p className="text-gray-600 text-lg mb-10">
            Growth charts are unique for every child. Add your child first, log a
            measurement, and the curves appear here automatically.
          </p>
          <Link
            to="/add-child"
            className="inline-block px-8 py-4 rounded-2xl bg-primary text-white font-semibold shadow-soft hover:scale-105 transition duration-300"
          >
            Add a Child
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default GrowthEntry;

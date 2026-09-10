import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import { subscribeToChildren } from "../services/childService";
import MilestoneModal from "../components/MilestoneModal";

/* /milestones — the navbar's "Milestones" entry point.

   Milestones belong to a child, so this page opens the OLDEST child's
   milestone tracker (switch children from the dropdown). The tracker itself is
   the full-screen MilestoneModal used on the dashboard cards. */
function Milestones() {

  const { user } = useAuth();
  const [children, setChildren] = useState(null);
  const [childId, setChildId] = useState("");
  const [open, setOpen] = useState(true);
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

  const sorted = useMemo(() => {
    if (!children) return [];
    const withDob = children.filter((c) => c.dob);
    withDob.sort((a, b) => new Date(a.dob) - new Date(b.dob));
    return withDob;
  }, [children]);

  useEffect(() => {
    if (!childId && sorted.length) setChildId(sorted[0].id);
  }, [sorted, childId]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const child = sorted.find((c) => c.id === childId) ?? null;

  return (
    <MainLayout>
      <div className="min-h-screen bg-background px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-secondary">Milestones</h1>
            <p className="mt-4 text-lg text-gray-600">
              Tick off the moments as they happen — dates are saved automatically.
            </p>
          </div>

          {error && (
            <div className="bg-white rounded-[32px] shadow-soft p-10 text-center text-gray-600">
              Something went wrong: {error}
            </div>
          )}

          {!error && children === null && (
            <div className="p-10 text-center text-gray-500">Loading…</div>
          )}

          {!error && children !== null && sorted.length === 0 && (
            <div className="bg-white rounded-[32px] shadow-soft p-12 text-center">
              <div className="text-7xl mb-8">🌟</div>
              <h2 className="text-3xl font-bold text-secondary mb-5">No children yet</h2>
              <p className="text-gray-600 text-lg mb-8">
                Add your child first — milestone checklists from 2 months to 5 years are ready and waiting.
              </p>
              <a
                href="/add-child"
                className="inline-block px-8 py-4 rounded-2xl bg-primary text-white font-semibold shadow-soft hover:scale-105 transition duration-300"
              >
                Add a Child
              </a>
            </div>
          )}

          {!error && child && (
            <>
              <div className="bg-white rounded-[32px] shadow-soft p-8 mb-10 flex flex-wrap items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-bold text-secondary">{child.childName}</h2>
                  <p className="text-gray-500 mt-2">
                    {child.gender ? `${child.gender} • ` : ""}
                    {child.dob ? `Born ${new Date(child.dob).toLocaleDateString()}` : ""}
                  </p>
                </div>

                {sorted.length > 1 && (
                  <label className="flex items-center gap-3 text-gray-600 font-medium">
                    Child
                    <select
                      value={childId}
                      onChange={(e) => { setChildId(e.target.value); setOpen(true); }}
                      className="px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:border-primary outline-none"
                    >
                      {sorted.map((c) => (
                        <option key={c.id} value={c.id}>{c.childName}</option>
                      ))}
                    </select>
                  </label>
                )}

                <button
                  onClick={() => setOpen(true)}
                  className="px-8 py-4 rounded-2xl bg-primary text-white font-semibold shadow-soft hover:scale-105 transition duration-300"
                >
                  {open ? "Tracker is open" : "Open milestone tracker"}
                </button>
              </div>

              <MilestoneModal child={child} isOpen={open} onClose={() => setOpen(false)} />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Milestones;

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  useAuth,
} from "../context/AuthContext";

import {
  logoutUser,
} from "../services/authService";

import {
  subscribeToChildren,
} from "../services/childService";

import ChildCard from "../components/ChildCard";

function Dashboard() {

  const navigate =
    useNavigate();

  const {
    user,
    userData,
  } = useAuth();

  const [
    children,
    setChildren,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* REALTIME CHILDREN */
  useEffect(() => {

    if (!user?.uid)
      return;

    const unsubscribe =
      subscribeToChildren(

        user.uid,

        (
          realtimeChildren
        ) => {

          setChildren(
            realtimeChildren
          );

          setLoading(
            false
          );

        }

      );

    return () =>
      unsubscribe();

  }, [user]);

  async function handleLogout() {

    try {

      await logoutUser();

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  }

  return (

    <MainLayout>

      <div className="min-h-screen bg-background px-6 py-12">

        <div className="max-w-7xl mx-auto">

          {/* TOP HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-14">

            {/* LEFT */}
            <div>

              <div className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-5">

                Dashboard

              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-secondary">

                Welcome,
                <span className="text-primary">
                  {" "}{userData?.name}
                </span>

              </h1>

              <p className="mt-5 text-lg text-gray-600 leading-relaxed">

                Manage developmental milestones,
                growth tracking, and pediatric insights.

              </p>

            </div>

            {/* RIGHT */}
            <div className="flex gap-4 flex-wrap">

            </div>

          </div>

          {/* PROFILE CARD */}
          <div
            className="
              bg-white
              rounded-[36px]
              shadow-soft
              p-10
              border
              border-gray-100
              mb-12
            "
          >

            <div className="grid md:grid-cols-3 gap-8">

              {/* CARD */}
              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Full Name
                </p>

                <h3 className="text-2xl font-bold text-secondary">

                  {userData?.name}

                </h3>

              </div>

              {/* CARD */}
              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Phone Number
                </p>

                <h3 className="text-2xl font-bold text-secondary">

                  {userData?.phone}

                </h3>

              </div>

              {/* CARD */}
              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Role
                </p>

                <h3 className="text-2xl font-bold text-secondary capitalize">

                  {userData?.role}

                </h3>

              </div>

            </div>

          </div>

          {/* PARENT DASHBOARD */}
          {
            userData?.role === "parent" && (

              <>

                {/* SECTION HEADER */}
                <div className="flex items-center justify-between mb-10">

                  <div>

                    <h2 className="text-4xl font-bold text-secondary mb-3">

                      Your Children

                    </h2>

                    <p className="text-gray-600 text-lg">

                      Monitor developmental milestones
                      and growth tracking.

                    </p>

                  </div>

                </div>

                {/* LOADING */}
                {
                  loading && (

                    <div className="text-xl font-semibold text-secondary">

                      Loading children...

                    </div>

                  )
                }

                {/* EMPTY STATE */}
                {
                  !loading &&
                  children.length === 0 && (

                    <div
                      className="
                        bg-white
                        rounded-[36px]
                        p-16
                        shadow-soft
                        text-center
                      "
                    >

                      <div className="text-7xl mb-8">
                        👶
                      </div>

                      <h2 className="text-4xl font-bold text-secondary mb-5">

                        No Children Added Yet

                      </h2>

                      <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">

                        Start tracking your child’s
                        developmental milestones and
                        growth journey by adding a child profile.

                      </p>

                      <button
                        onClick={() =>
                          navigate("/add-child")
                        }
                        className="
                          px-8
                          py-4
                          rounded-2xl
                          bg-primary
                          text-white
                          font-semibold
                          hover:scale-105
                          transition
                          duration-300
                          shadow-xl
                        "
                      >

                        + Add Child

                      </button>

                    </div>

                  )
                }

                {/* CHILD GRID */}
                {
                  !loading &&
                  children.length > 0 && (

                    <div className="grid lg:grid-cols-2 gap-8">

                      {
                        children.map((child) => (

                          <ChildCard
                            key={child.id}
                            child={child}
                          />

                        ))
                      }

                    </div>

                  )
                }

              </>

            )
          }

          {/* DOCTOR DASHBOARD */}
          {
            userData?.role === "doctor" && (

              <div className="grid lg:grid-cols-3 gap-8">

                {/* CARD */}
                <div
                  className="
                    bg-white
                    rounded-[32px]
                    p-8
                    shadow-soft
                  "
                >

                  <div className="text-5xl mb-6">
                    🩺
                  </div>

                  <h3 className="text-2xl font-bold text-secondary mb-4">

                    Patients

                  </h3>

                  <p className="text-gray-600 leading-relaxed">

                    Manage pediatric patient
                    developmental records.

                  </p>

                </div>

                {/* CARD */}
                <div
                  className="
                    bg-primary/10
                    rounded-[32px]
                    p-8
                  "
                >

                  <div className="text-5xl mb-6">
                    📊
                  </div>

                  <h3 className="text-2xl font-bold text-secondary mb-4">

                    Analytics

                  </h3>

                  <p className="text-gray-700 leading-relaxed">

                    Review growth trends and
                    developmental summaries.

                  </p>

                </div>

                {/* CARD */}
                <div
                  className="
                    bg-accent/10
                    rounded-[32px]
                    p-8
                  "
                >

                  <div className="text-5xl mb-6">
                    🤖
                  </div>

                  <h3 className="text-2xl font-bold text-secondary mb-4">

                    AI Assistance

                  </h3>

                  <p className="text-gray-700 leading-relaxed">

                    Intelligent developmental
                    interpretation tools.

                  </p>

                </div>

              </div>

            )
          }

        </div>

      </div>

    </MainLayout>

  );

}

export default Dashboard;
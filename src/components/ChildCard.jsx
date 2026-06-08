import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

import MilestoneModal from "./MilestoneModal";

function ChildCard({
  child,
}) {

  const navigate =
    useNavigate();

  const [
    showMilestones,
    setShowMilestones,
  ] = useState(false);

  const [
    showEditModal,
    setShowEditModal,
  ] = useState(false);

  const [
    editData,
    setEditData,
  ] = useState({

    childName:
      child.childName || "",

    gender:
      child.gender || "",

    dob:
      child.dob || "",

    birthWeight:
      child.birthWeight || "",

    birthHeight:
      child.birthHeight || "",

  });

  /* REALTIME SYNC */
  useEffect(() => {

    setEditData({

      childName:
        child.childName || "",

      gender:
        child.gender || "",

      dob:
        child.dob || "",

      birthWeight:
        child.birthWeight || "",

      birthHeight:
        child.birthHeight || "",

    });

  }, [child]);

  /* DELETE CHILD */
  async function handleDeleteChild() {

    const confirmDelete =
      window.confirm(

        `Delete ${child.childName}?`

      );

    if (!confirmDelete)
      return;

    try {

      await deleteDoc(

        doc(
          db,
          "children",
          child.id
        )

      );

      alert(
        "Child deleted successfully 🗑️"
      );

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  }

  /* UPDATE CHILD */
  async function handleUpdateChild() {

    try {

      await updateDoc(

        doc(
          db,
          "children",
          child.id
        ),

        {

          ...editData,

        }

      );

      setShowEditModal(false);

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  }

  /* AGE CALCULATOR */
  function calculateAge(
    dob
  ) {

    const birthDate =
      new Date(dob);

    const today =
      new Date();

    let months =
      (
        today.getFullYear()
        -
        birthDate.getFullYear()
      ) * 12;

    months +=
      today.getMonth()
      -
      birthDate.getMonth();

    if (
      today.getDate()
      <
      birthDate.getDate()
    ) {

      months--;

    }

    const years =
      Math.floor(
        months / 12
      );

    const remainingMonths =
      months % 12;

    if (
      years <= 0
    ) {

      return `${remainingMonths} months`;

    }

    return `${years}y ${remainingMonths}m`;

  }

  return (

    <>

      {/* CARD */}
      <motion.div
        whileHover={{
          y: -6,
        }}
        className="
          bg-white
          rounded-[36px]
          shadow-xl
          overflow-hidden
          border
          border-gray-100
        "
      >

        {/* TOP */}
        <div
          className="
            bg-primary
            px-8
            py-6
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h2 className="text-3xl font-bold text-white">

              {child.childName}

            </h2>

            <p className="text-white/80 mt-2">

              {
                calculateAge(
                  child.dob
                )
              }

            </p>

          </div>

          <div className="text-6xl">

            {
              child.gender ===
              "male"

                ? "👦"

                : "👧"
            }

          </div>

        </div>

        {/* BODY */}
        <div className="p-8">

          {/* DETAILS */}
          <div className="grid grid-cols-2 gap-5">

            {/* DOB */}
            <div
              className="
                bg-background
                rounded-3xl
                p-5
              "
            >

              <p className="text-gray-500 text-sm mb-2">

                Date of Birth

              </p>

              <h3 className="font-bold text-secondary text-lg">

                {child.dob}

              </h3>

            </div>

            {/* GENDER */}
            <div
              className="
                bg-background
                rounded-3xl
                p-5
              "
            >

              <p className="text-gray-500 text-sm mb-2">

                Gender

              </p>

              <h3 className="font-bold text-secondary text-lg capitalize">

                {child.gender}

              </h3>

            </div>

            {/* WEIGHT */}
            <div
              className="
                bg-accent/10
                rounded-3xl
                p-5
              "
            >

              <p className="text-gray-500 text-sm mb-2">

                Birth Weight

              </p>

              <h3 className="font-bold text-secondary text-lg">

                {
                  child.birthWeight
                    || "--"
                } kg

              </h3>

            </div>

            {/* HEIGHT */}
            <div
              className="
                bg-secondary/10
                rounded-3xl
                p-5
              "
            >

              <p className="text-gray-500 text-sm mb-2">

                Birth Height

              </p>

              <h3 className="font-bold text-secondary text-lg">

                {
                  child.birthHeight
                    || "--"
                } cm

              </h3>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-4 gap-5 mt-8">

            {/* MILESTONES */}
            <button
              onClick={() =>
                setShowMilestones(
                  true
                )
              }
              className="
                py-4
                rounded-2xl
                bg-primary
                text-white
                font-semibold
                hover:scale-[1.02]
                transition
                duration-300
                shadow-lg
              "
            >

              Track Milestones

            </button>

            {/* GROWTH */}
            <button
              onClick={() =>
                navigate(
                  `/growth/${child.id}`
                )
              }
              className="
                py-4
                rounded-2xl
                bg-accent
                text-white
                font-semibold
                hover:scale-[1.02]
                transition
                duration-300
                shadow-lg
              "
            >
              Track Growth
            </button>

            {/* EDIT */}
            <button
              onClick={() =>
                setShowEditModal(true)
              }
              className="
                py-4
                rounded-2xl
                bg-secondary
                text-white
                font-semibold
                hover:scale-[1.02]
                transition
                duration-300
                shadow-lg
              "
            >

              Edit Details

            </button>

            {/* DELETE */}
            <button
              onClick={
                handleDeleteChild
              }
              className="
                py-4
                rounded-2xl
                bg-red-500
                text-white
                font-semibold
                hover:scale-[1.02]
                transition
                duration-300
                shadow-lg
              "
            >

              Delete Child

            </button>

          </div>

        </div>

      </motion.div>

      {/* EDIT MODAL */}
      {
        showEditModal && (

          <div
            className="
              fixed
              inset-0
              bg-black/50
              backdrop-blur-sm
              flex
              items-center
              justify-center
              z-50
              p-6
            "
          >

            <div
              className="
                bg-white
                rounded-[36px]
                p-10
                w-full
                max-w-2xl
                shadow-2xl
              "
            >

              {/* HEADER */}
              <div className="flex items-center justify-between mb-10">

                <div>

                  <h2 className="text-4xl font-bold text-secondary">

                    Edit Child

                  </h2>

                  <p className="text-gray-500 mt-2">

                    Update child details

                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowEditModal(false)
                  }
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-gray-100
                    text-2xl
                  "
                >

                  ×

                </button>

              </div>

              {/* FORM */}
              <div className="space-y-6">

                {/* NAME */}
                <input
                  type="text"
                  value={editData.childName}
                  onChange={(e) =>
                    setEditData({

                      ...editData,

                      childName:
                        e.target.value,

                    })
                  }
                  placeholder="Child Name"
                  className="
                    w-full
                    p-4
                    rounded-2xl
                    border
                    border-gray-200
                  "
                />

                {/* GENDER */}
                <select
                  value={editData.gender}
                  onChange={(e) =>
                    setEditData({

                      ...editData,

                      gender:
                        e.target.value,

                    })
                  }
                  className="
                    w-full
                    p-4
                    rounded-2xl
                    border
                    border-gray-200
                  "
                >

                  <option value="male">

                    Male

                  </option>

                  <option value="female">

                    Female

                  </option>

                </select>

                {/* DOB */}
                <input
                  type="date"
                  value={editData.dob}
                  onChange={(e) =>
                    setEditData({

                      ...editData,

                      dob:
                        e.target.value,

                    })
                  }
                  className="
                    w-full
                    p-4
                    rounded-2xl
                    border
                    border-gray-200
                  "
                />

                {/* WEIGHT */}
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    value={editData.birthWeight}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        birthWeight: e.target.value,
                      })
                    }
                    className="
                      flex-1
                      p-4
                      rounded-2xl
                      border
                      border-gray-200
                    "
                  />

                  <span
                    className="
                      px-4
                      py-3
                      bg-gray-100
                      rounded-2xl
                      font-semibold
                      text-gray-600
                    "
                  >
                    kg
                  </span>

                </div>

                {/* HEIGHT */}
                <div className="flex gap-3 items-center">

                  <input
                    type="number"
                    value={editData.birthHeight}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        birthHeight: e.target.value,
                      })
                    }
                    className="
                      flex-1
                      p-4
                      rounded-2xl
                      border
                      border-gray-200
                    "
                  />

                  <span
                    className="
                      px-4
                      py-3
                      bg-gray-100
                      rounded-2xl
                      font-semibold
                      text-gray-600
                    "
                  >
                    cm
                  </span>

                </div>

                {/* SAVE */}
                <button
                  onClick={
                    handleUpdateChild
                  }
                  className="
                    w-full
                    py-4
                    rounded-2xl
                    bg-primary
                    text-white
                    font-semibold
                    hover:scale-[1.01]
                    transition
                    duration-300
                    shadow-xl
                  "
                >

                  Save Changes

                </button>

              </div>

            </div>

          </div>

        )
      }

      {/* MILESTONE MODAL */}
      <MilestoneModal
        child={child}
        isOpen={
          showMilestones
        }
        onClose={() =>
          setShowMilestones(
            false
          )
        }
      />

    </>

  );

}

export default ChildCard;
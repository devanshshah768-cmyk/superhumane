import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  orderBy,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { db } from "../firebase/firestore";

const ALL_MILESTONES = [

  /* 2 MONTHS */
  {
    description: "Starts to smile at people",
    age: 2,
  },

  {
    description: "Coos and makes sounds",
    age: 2,
  },

  {
    description: "Can hold head briefly",
    age: 2,
  },

  {
    description: "Brings hands to mouth",
    age: 2,
  },

  /* 4 MONTHS */
  {
    description: "Babbles with expression",
    age: 4,
  },

  {
    description: "Holds head steady",
    age: 4,
  },

  {
    description: "Pushes up on elbows",
    age: 4,
  },

  {
    description: "Reaches for toys",
    age: 4,
  },

  /* 6 MONTHS */
  {
    description: "Responds to own name",
    age: 6,
  },

  {
    description: "Rolls over",
    age: 6,
  },

  {
    description: "Sits without support",
    age: 6,
  },

  {
    description: "Transfers objects",
    age: 6,
  },

  /* 9 MONTHS */
  {
    description: "Crawls",
    age: 9,
  },

  {
    description: "Pulls to stand",
    age: 9,
  },

  {
    description: "Pincer grasp develops",
    age: 9,
  },

  {
    description: "Waves bye-bye",
    age: 9,
  },

  /* 12 MONTHS */
  {
    description: "Says mama/dada",
    age: 12,
  },

  {
    description: "Cruises along furniture",
    age: 12,
  },

  {
    description: "Stands alone",
    age: 12,
  },

  {
    description: "Points to things",
    age: 12,
  },

  /* 18 MONTHS */
  {
    description: "Walks alone",
    age: 18,
  },

  {
    description: "Says several single words",
    age: 18,
  },

  {
    description: "Points to body parts",
    age: 18,
  },

  {
    description: "Scribbles spontaneously",
    age: 18,
  },

  /* 24 MONTHS */
  {
    description: "Uses 2-word phrases",
    age: 24,
  },

  {
    description: "Begins to run",
    age: 24,
  },

  {
    description: "Builds block tower",
    age: 24,
  },

  {
    description: "Follows simple instructions",
    age: 24,
  },

];

function getAgeInMonths(
  dobString,
  compareDateString
) {

  const dob =
    new Date(dobString);

  const compareDate =
    new Date(compareDateString);

  let months =
    (
      compareDate.getFullYear()
      -
      dob.getFullYear()
    ) * 12;

  months +=
    compareDate.getMonth()
    -
    dob.getMonth();

  if (
    compareDate.getDate()
    <
    dob.getDate()
  ) {

    months--;

  }

  return Math.max(
    0,
    months
  );

}

function getCurrentChildAge(
  dobString
) {

  const dob =
    new Date(dobString);

  const today =
    new Date();

  let months =
    (
      today.getFullYear()
      -
      dob.getFullYear()
    ) * 12;

  months +=
    today.getMonth()
    -
    dob.getMonth();

  if (
    today.getDate()
    <
    dob.getDate()
  ) {

    months--;

  }

  return Math.max(
    0,
    months
  );

}

function MilestoneModal({

  child,
  isOpen,
  onClose,

}) {

  const [
    milestones,
    setMilestones,
  ] = useState([]);

  const [
    attainmentInputs,
    setAttainmentInputs,
  ] = useState({});

  const [
    editingMilestoneId,
    setEditingMilestoneId,
  ] = useState(null);

  const [
    editAge,
    setEditAge,
  ] = useState("");

    const [
    editUnit,
    setEditUnit,
    ] = useState("months");

  const currentChildAge =
    getCurrentChildAge(
      child.dob
    );

  /* REALTIME */
  useEffect(() => {

    if (
      !child?.id ||
      !isOpen
    ) return;

    const q = query(

      collection(
        db,
        "milestones"
      ),

      where(
        "childId",
        "==",
        child.id
      ),

      orderBy(
        "expectedAge",
        "asc"
      )

    );

    const unsubscribe =
      onSnapshot(

        q,

        (
          snapshot
        ) => {

          setMilestones(

            snapshot.docs.map(
              (
                doc
              ) => ({

                id:
                  doc.id,

                ...doc.data(),

              })
            )

          );

        }

      );

    return () =>
      unsubscribe();

  }, [
    child?.id,
    isOpen,
  ]);

  /* COMPLETE */
  async function completeMilestone(
    milestone
  ) {

    try {

      const input =
        attainmentInputs[
          milestone.description
        ] || {};

      let attainedAge =
        null;

      let attainedAt =
        null;

      if (
        input.date
      ) {

        attainedAt =
          input.date;

        attainedAge =
          getAgeInMonths(
            child.dob,
            input.date
          );

      }

      else {

        attainedAge =
          Number(

            input.value ||

            Math.min(
              currentChildAge,
              milestone.age
            )

          );

        if (
          input.unit ===
          "years"
        ) {

          attainedAge *= 12;

        }

        const pseudoDate =
          new Date(
            child.dob
          );

        pseudoDate.setMonth(
          pseudoDate.getMonth()
          +
          attainedAge
        );

        attainedAt =
          pseudoDate
            .toISOString()
            .split("T")[0];

      }

      let status =
        "on-time";

      if (
        attainedAge >
        milestone.age
      ) {

        status =
          "delayed";

      }

      if (
        attainedAge <
        milestone.age
      ) {

        status =
          "advanced";

      }

      await addDoc(

        collection(
          db,
          "milestones"
        ),

        {

          childId:
            child.id,

          parentId:
            child.parentId,

          description:
            milestone.description,

          expectedAge:
            milestone.age,

          attainedAge,

          attainedAt,

          status,

          createdAt:
            serverTimestamp(),

        }

      );

    } catch (error) {

      console.error(error);

    }

  }

  /* DELETE */
  async function deleteMilestone(
    milestoneId
  ) {

    if (
      !window.confirm(
        "Delete this milestone?"
      )
    ) return;

    try {

      await deleteDoc(

        doc(
          db,
          "milestones",
          milestoneId
        )

      );

    } catch (error) {

      console.error(error);

    }

  }

  /* EDIT */
  async function saveEditedMilestone(
    milestone
  ) {

    try {

        let attainedAge =
        Number(editAge);

        if (
        editUnit === "years"
        ) {

        attainedAge *= 12;

        }

      let status =
        "on-time";

      if (
        attainedAge >
        milestone.expectedAge
      ) {

        status =
          "delayed";

      }

      if (
        attainedAge <
        milestone.expectedAge
      ) {

        status =
          "advanced";

      }

      await updateDoc(

        doc(
          db,
          "milestones",
          milestone.id
        ),

        {

          attainedAge,

          status,

        }

      );

      setEditingMilestoneId(
        null
      );

    } catch (error) {

      console.error(error);

    }

  }

  const mergedMilestones =
    ALL_MILESTONES.map(
      (
        milestone
      ) => ({

        ...milestone,

        completed:
          milestones.find(

            (
              item
            ) =>

              item.description
              ===
              milestone.description

          ),

      })
    );

  const completedCount =
    milestones.length;

  const delayedCount =
    milestones.filter(

      (
        item
      ) =>

        item.status ===
        "delayed"

    ).length;

  const pendingCount =
    ALL_MILESTONES.length
    -
    completedCount;

  return (

    <AnimatePresence>

      {
        isOpen && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
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

            <motion.div
              initial={{
                y: 40,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 40,
                opacity: 0,
              }}
              className="
                bg-white
                w-full
                max-w-7xl
                rounded-[36px]
                shadow-2xl
                overflow-hidden
                max-h-[92vh]
                flex
                flex-col
              "
            >

              {/* HEADER */}
              <div
                className="
                  px-8
                  py-6
                  border-b
                  border-gray-100
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <h2 className="text-3xl font-bold text-secondary">

                    Milestone Tracker

                  </h2>

                  <p className="text-primary font-semibold mt-2">

                    {child.childName}

                  </p>

                </div>

                <button
                  onClick={onClose}
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

              {/* BODY */}
              <div
                className="
                  overflow-y-auto
                  p-8
                  space-y-8
                "
              >

                {/* STATS */}
                <div className="grid grid-cols-3 gap-4">

                  <div className="bg-green-50 rounded-3xl p-5">

                    <p className="text-gray-500">

                      Completed

                    </p>

                    <h2 className="text-4xl font-bold text-green-600">

                      {completedCount}

                    </h2>

                  </div>

                  <div className="bg-gray-50 rounded-3xl p-5">

                    <p className="text-gray-500">

                      Pending

                    </p>

                    <h2 className="text-4xl font-bold text-secondary">

                      {pendingCount}

                    </h2>

                  </div>

                  <div className="bg-red-50 rounded-3xl p-5">

                    <p className="text-gray-500">

                      Delayed

                    </p>

                    <h2 className="text-4xl font-bold text-red-500">

                      {delayedCount}

                    </h2>

                  </div>

                </div>

                {/* LIST */}
                <div
                  className="
                    grid
                    grid-cols-1
                    xl:grid-cols-2
                    gap-5
                    items-start
                  "
                >

                  {
                    mergedMilestones.map(

                      (
                        item,
                        index
                      ) => {

                        const completed =
                          item.completed;

                        return (

                          <div
                            key={index}
                            className={`
                              p-5
                              rounded-3xl
                              border-l-[8px]
                              ${
                                completed

                                  ? completed.status === "delayed"

                                    ? "bg-red-50 border-red-500"

                                    : completed.status === "advanced"

                                    ? "bg-yellow-50 border-yellow-500"

                                    : "bg-green-50 border-green-500"

                                  : "bg-gray-50 border-gray-300"
                              }
                            `}
                          >

                            {/* TOP */}
                            <div className="flex justify-between gap-4">

                              <div>

                                <h3 className="text-xl font-bold text-secondary">

                                  {item.description}

                                </h3>

                                <p className="text-gray-500 mt-1">

                                  Expected by {item.age} months

                                </p>

                              </div>

                              <div
                                className={`
                                  px-4
                                  py-2
                                  rounded-full
                                  text-xs
                                  font-bold
                                  whitespace-nowrap
                                  ${
                                    completed

                                      ? completed.status === "delayed"

                                        ? "bg-red-500 text-white"

                                        : completed.status === "advanced"

                                        ? "bg-yellow-400 text-black"

                                        : "bg-green-500 text-white"

                                      : "bg-gray-300 text-black"
                                  }
                                `}
                              >

                                {
                                  completed

                                    ? completed.status === "delayed"

                                      ? "🔴 Delayed"

                                      : completed.status === "advanced"

                                      ? "🟡 Advanced"

                                      : "🟢 On Time"

                                    : "⚪ Pending"
                                }

                              </div>

                            </div>

                            {/* COMPLETED */}
                            {
                              completed ? (

                                <div className="mt-5 space-y-4">

                                  
                                    {
                                        editingMilestoneId ===
                                        completed.id ? (

                                            <div className="flex gap-3 items-center">

                                            <input
                                                type="number"
                                                value={editAge}
                                                onChange={(e) =>
                                                setEditAge(
                                                    e.target.value
                                                )
                                                }
                                                className="
                                                flex-1
                                                px-4
                                                py-3
                                                rounded-2xl
                                                border
                                                border-gray-200
                                                "
                                            />

                                            {/* UNIT */}
                                            <select
                                            value={editUnit}
                                            onChange={(e) =>
                                                setEditUnit(
                                                e.target.value
                                                )
                                            }
                                            className="
                                                px-4
                                                py-3
                                                rounded-2xl
                                                border
                                                border-gray-200
                                            "
                                            >

                                            <option value="months">

                                                Months

                                            </option>

                                            <option value="years">

                                                Years

                                            </option>

                                            </select>

                                            {/* SAVE */}
                                            <button
                                                onClick={() =>
                                                saveEditedMilestone(
                                                    completed
                                                )
                                                }
                                                className="
                                                px-5
                                                py-3
                                                rounded-2xl
                                                bg-primary
                                                text-white
                                                font-semibold
                                                "
                                            >

                                                Save

                                            </button>

                                            </div>


                                        ) : (
                                    
                                      <p className="text-gray-600">

                                        Attained at
                                        {" "}
                                        <span className="font-semibold">

                                          {
                                            completed.attainedAge
                                          } months

                                        </span>

                                      </p>

                                    )
                                  }

                                  <div className="flex gap-3">

                                    <button
                                      onClick={() => {

                                        setEditingMilestoneId(
                                          completed.id
                                        );

                                        if (
                                            completed.attainedAge >= 12
                                            ) {

                                            setEditAge(
                                                completed.attainedAge / 12
                                            );

                                            setEditUnit(
                                                "years"
                                            );

                                            }

                                            else {

                                            setEditAge(
                                                completed.attainedAge
                                            );

                                            setEditUnit(
                                                "months"
                                            );

                                            }

                                      }}
                                      className="
                                        px-4
                                        py-2
                                        rounded-2xl
                                        bg-secondary
                                        text-white
                                        text-sm
                                        font-semibold
                                      "
                                    >

                                      Edit

                                    </button>

                                    <button
                                      onClick={() =>
                                        deleteMilestone(
                                          completed.id
                                        )
                                      }
                                      className="
                                        px-4
                                        py-2
                                        rounded-2xl
                                        bg-red-500
                                        text-white
                                        text-sm
                                        font-semibold
                                      "
                                    >

                                      Delete

                                    </button>

                                  </div>

                                </div>

                              ) : (

                                <div className="mt-5 space-y-3">

                                  <input
                                    type="date"
                                    value={
                                      attainmentInputs[
                                        item.description
                                      ]?.date || ""
                                    }
                                    onChange={(e) =>

                                      setAttainmentInputs({

                                        ...attainmentInputs,

                                        [item.description]: {

                                          ...attainmentInputs[
                                            item.description
                                          ],

                                          date:
                                            e.target.value,

                                        },

                                      })

                                    }
                                    className="
                                      w-full
                                      px-4
                                      py-3
                                      rounded-2xl
                                      border
                                      border-gray-200
                                    "
                                  />

                                  <div className="flex gap-3">

                                    <input
                                      type="number"
                                      value={
                                        attainmentInputs[
                                          item.description
                                        ]?.value

                                        ||

                                        Math.min(
                                          currentChildAge,
                                          item.age
                                        )
                                      }
                                      onChange={(e) =>

                                        setAttainmentInputs({

                                          ...attainmentInputs,

                                          [item.description]: {

                                            ...attainmentInputs[
                                              item.description
                                            ],

                                            value:
                                              e.target.value,

                                          },

                                        })

                                      }
                                      className="
                                        flex-1
                                        px-4
                                        py-3
                                        rounded-2xl
                                        border
                                        border-gray-200
                                      "
                                    />

                                    <select
                                      value={
                                        attainmentInputs[
                                          item.description
                                        ]?.unit || "months"
                                      }
                                      onChange={(e) =>

                                        setAttainmentInputs({

                                          ...attainmentInputs,

                                          [item.description]: {

                                            ...attainmentInputs[
                                              item.description
                                            ],

                                            unit:
                                              e.target.value,

                                          },

                                        })

                                      }
                                      className="
                                        px-4
                                        py-3
                                        rounded-2xl
                                        border
                                        border-gray-200
                                      "
                                    >

                                      <option value="months">

                                        Months

                                      </option>

                                      <option value="years">

                                        Years

                                      </option>

                                    </select>

                                  </div>

                                  <button
                                    onClick={() =>
                                      completeMilestone(
                                        item
                                      )
                                    }
                                    className="
                                      w-full
                                      py-3
                                      rounded-2xl
                                      bg-primary
                                      text-white
                                      font-semibold
                                    "
                                  >

                                    Save Milestone

                                  </button>

                                </div>

                              )
                            }

                          </div>

                        );

                      }

                    )
                  }

                </div>

              </div>

            </motion.div>

          </motion.div>

        )
      }

    </AnimatePresence>

  );

}

export default MilestoneModal;
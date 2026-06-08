import {

  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,

} from "firebase/firestore";

import { db }
from "../firebase/firestore";

/* ADD CHILD */
export async function addChild(
  childData
) {

  return await addDoc(

    collection(
      db,
      "children"
    ),

    {

      ...childData,

      createdAt:
        new Date(),

    }

  );

}

/* REALTIME CHILDREN */
export function subscribeToChildren(

  parentId,
  callback

) {

  const q = query(

    collection(
      db,
      "children"
    ),

    where(
      "parentId",
      "==",
      parentId
    )

  );

  return onSnapshot(

    q,

    (
      snapshot
    ) => {

      const children =
        snapshot.docs.map(
          (
            doc
          ) => ({

            id:
              doc.id,

            ...doc.data(),

          })
        );

      callback(
        children
      );

    }

  );

}

/* GET SINGLE CHILD */
export async function getChild(
  childId
) {

  const snapshot =
    await getDoc(

      doc(
        db,
        "children",
        childId
      )

    );

  if (
    !snapshot.exists()
  ) {

    return null;

  }

  return {

    id:
      snapshot.id,

    ...snapshot.data(),

  };

}

/* UPDATE CHILD */
export async function updateChild(
  childId,
  updatedData
) {

  await updateDoc(

    doc(
      db,
      "children",
      childId
    ),

    updatedData

  );

}

/* DELETE CHILD */
export async function deleteChild(
  childId
) {

  await deleteDoc(

    doc(
      db,
      "children",
      childId
    )

  );

}
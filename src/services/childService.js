import {

  collection,
  query,
  where,
  onSnapshot,
  addDoc,

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
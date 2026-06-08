import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import app from "./firebase";

export const auth =
  getAuth(app);

/* KEEP USER LOGGED IN */
setPersistence(
  auth,
  browserLocalPersistence
)
  .then(() => {

    console.log(
      "Auth persistence enabled ✅"
    );

  })
  .catch((error) => {

    console.error(error);

  });
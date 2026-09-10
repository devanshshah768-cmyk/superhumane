import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { auth } from "../firebase/auth";
import { db } from "../firebase/firestore";

/* REGISTER USER */
export async function registerUser({
  name,
  email,
  password,
}) {

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = userCredential.user;

  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      name,
      email,

      phone: "",

      role: "",

      provider: "email",

      profileCompleted: false,

      createdAt: new Date(),
    }
  );

  return user;
}

/* LOGIN USER */
export async function loginUser({
  email,
  password,
}) {

  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return userCredential.user;
}

/* GOOGLE LOGIN */
export async function loginWithGoogle() {

  const provider = new GoogleAuthProvider();

  const result =
    await signInWithPopup(auth, provider);

  const user = result.user;

  const userRef =
    doc(db, "users", user.uid);

  const userSnap =
    await getDoc(userRef);

  if (!userSnap.exists()) {

    await setDoc(userRef, {

      uid: user.uid,

      name: user.displayName,

      email: user.email,

      phone: "",

      role: "",

      provider: "google",

      profileCompleted: false,

      createdAt: new Date(),

    });

  }

  return user;
}

/* COMPLETE PROFILE */
export async function completeProfile({
  uid,
  phone,
  role,
}) {

  const userRef =
    doc(db, "users", uid);

  await updateDoc(userRef, {

    phone,
    role,

    profileCompleted: true,

  });

}

/* GET USER DATA */
export async function getUserData(uid) {

  const userRef =
    doc(db, "users", uid);

  const snapshot =
    await getDoc(userRef);

  return snapshot.data();
}

/* RESET PASSWORD */
export async function resetPassword(email) {

  await sendPasswordResetEmail(
    auth,
    email
  );

}

/* LOGOUT */
export async function logoutUser() {

  await signOut(auth);

}
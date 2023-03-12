import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase";
import { IAuthOutData } from "../types/authOutData";

export const auth = getAuth(app);

// Google singIn with Popup
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// Facebook signIn with Popup
const facebookProvider = new FacebookAuthProvider();
export const signInWithFaceBook = () => {
  return signInWithPopup(auth, facebookProvider);
};

// Email/Password signUp(registration new user)
export const signUpWithEmail = (authData: IAuthOutData) => {
  return createUserWithEmailAndPassword(
    auth,
    authData.email,
    authData.password
  );
};

// Email/Password signIn
export const signInWithEmail = (authData: IAuthOutData) => {
  return signInWithEmailAndPassword(auth, authData.email, authData.password);
};

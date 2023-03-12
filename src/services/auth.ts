import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GithubAuthProvider,
} from "firebase/auth";
import { app } from "../firebase";
import { IAuthOutData } from "../types/authOutData";

export const auth = getAuth(app);

// Google singIn with Popup
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// GitHub signIn with Popup
const githubProvider = new GithubAuthProvider();
export const signInWithGitHub = () => {
  return signInWithPopup(auth, githubProvider);
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

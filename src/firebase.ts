import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8MPPggAUfT-0qPVjFEBuMGmfBo2gc5eY",
  authDomain: "rickandmortyauth.firebaseapp.com",
  projectId: "rickandmortyauth",
  storageBucket: "rickandmortyauth.appspot.com",
  messagingSenderId: "1059177780762",
  appId: "1:1059177780762:web:4e3970fb8c33d2b15d63a3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const signInWithFaceBook = () => {
  return signInWithPopup(auth, facebookProvider);
};

export const signUpWithEmail = (authData: {
  email: string;
  password: string;
}) => {
  return createUserWithEmailAndPassword(
    auth,
    authData.email,
    authData.password
  );
};

export const signInWithEmail = (authData: {
  email: string;
  password: string;
}) => {
  return signInWithEmailAndPassword(
    auth,
    authData.email,
    authData.password
  );
};

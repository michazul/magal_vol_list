// src/Auth.js
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";

const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

const Auth = ({ children }) => {
  const [user] = useAuthState(auth);
  return user ? children : <SignIn />;
};

export default Auth;

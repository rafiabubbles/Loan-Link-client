import React, { useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider, // 1. Added GoogleAuthProvider
  signInWithPopup,
  signOut,
  deleteUser,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";

const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider(); // 2. Initialized Google Provider

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateCurrentUser = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  };

  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // 3. Added Google Login Function
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const deleteCurrentUser = () => {
    setLoading(true);
    return deleteUser(auth.currentUser);
  };

  const userInfo = {
    registerUser,
    loginUser,
    googleLogin, // 4. Exported googleLogin
    loading,
    setLoading,
    githubLogin,
    currentUser,
    logOutUser,
    deleteCurrentUser,
    updateCurrentUser,
    setCurrentUser,
  };

  // Make sure your Context.Provider name is correct (usually AuthContext.Provider)
  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
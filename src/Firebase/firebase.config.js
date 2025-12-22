import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBo3aTSVkbU9Ymc6KM3nlz6ihV8409s8M0",
  authDomain: "loan-link-481a6.firebaseapp.com",
  projectId: "loan-link-481a6",
  storageBucket: "loan-link-481a6.firebasestorage.app",
  messagingSenderId: "329932740300",
  appId: "1:329932740300:web:8845a690d42e261276d469"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
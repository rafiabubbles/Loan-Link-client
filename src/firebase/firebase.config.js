import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";


// Firebase configuration using environment variables (VITE_ prefix required for Vite)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


// Initialize Firebase App (prevents re-initialization error during hot-reloading)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];


// Get Authentication Service
export const auth = getAuth(app);


export default app;
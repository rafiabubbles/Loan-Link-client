import { createContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    getAuth,
} from 'firebase/auth';

// ⚠️ নিশ্চিত করুন যে এই পাথটি আপনার ফায়ারবেস কনফিগ ফাইলের সঠিক পাথ।
import { app } from '../firebase/firebase.config';
// ⚠️ নিশ্চিত করুন যে এই পাথটি আপনার axios ইনস্ট্যান্সের সঠিক পাথ।
import api from '../api/axios';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Auth এবং Provider তৈরি করুন
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSyncUser = async (user) => {
        try {
            // নতুন রুট /api/user/sync এ পোস্ট করা হচ্ছে
            const syncRes = await api.post('/api/user/sync', {
                email: user.email,
                name: user.displayName, // বা অন্য কোনো নাম
            });
            // console.log("User Synced to MongoDB:", syncRes.data);
            return syncRes.data; // MongoDB ডেটা (রোল সহ) রিটার্ন করবে
        } catch (error) {
            console.error("Error during user sync/creation:", error);
            return null;
        }
    };
    // বাস্তব Firebase Listener: Auth স্টেট পরিবর্তন পর্যবেক্ষণ করে এবং রোল ফেচ করে
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true); // প্রতিবার স্টেট পরিবর্তন হলে লোডিং শুরু করুন

            if (currentUser) {
                // 1. প্রাথমিক Firebase ডেটা
                const baseUser = {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName || 'User',
                    email: currentUser.email,
                    photoURL: currentUser.photoURL || 'https://via.placeholder.com/40'
                };

                // 2. 🚀 ব্যাকএন্ড থেকে ইউজারের রোল ফেচ করা 🚀
                try {
                    // সাধারণত, API কল করার জন্য Firebase ID Token ব্যবহার করা হয়।
                    // এই উদাহরণের জন্য, আমরা ইমেইল ব্যবহার করে প্রোফাইল ফেচ করছি।
                    // যদি আপনার API এ Auth Header প্রয়োজন হয়, তবে আপনাকে currentUser.getIdToken() ব্যবহার করতে হবে।

                    const res = await api.get(`/api/user/profile/${currentUser.email}`);
                    const backendData = res.data;

                    // 3. রোল সহ চূড়ান্ত ইউজার অবজেক্ট সেট করা
                    setUser({
                        ...baseUser,
                        role: backendData.role || 'borrower', // ডিফল্ট রোল 'borrower' ধরে নিলাম
                        // ... অন্যান্য প্রয়োজনীয় ডেটা
                    });

                } catch (error) {
                    console.error("Failed to fetch user role/profile:", error);
                    // রোল ফেচ করতে ব্যর্থ হলেও অন্তত বেসিক ডেটা এবং ডিফল্ট রোল সেট করুন
                    setUser({ ...baseUser, role: 'borrower' });
                }

            } else {
                setUser(null);
            }

            setLoading(false);
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    // 1. Email/Password Login Function (Firebase ব্যবহার করে)
    const login = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await handleSyncUser(userCredential.user)
            // onAuthStateChanged listener স্বয়ংক্রিয়ভাবে ইউজার এবং রোল আপডেট করবে
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error("Firebase Login Error:", error.message);
            setLoading(false);
            return { success: false, message: error.message };
        }
    };

    // 2. Google Login Function (Firebase ব্যবহার করে)
    const googleLogin = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await handleSyncUser(result.user);
            // onAuthStateChanged listener স্বয়ংক্রিয়ভাবে ইউজার এবং রোল আপডেট করবে
            return { success: true, user: result.user };
        } catch (error) {
            console.error("Google Sign-in Error:", error.message);
            setLoading(false);
            let message = error.message;
            if (error.code === 'auth/popup-closed-by-user') {
                message = "Sign-in cancelled by user.";
            }
            return { success: false, message: message };
        }
    };

    // 3. Register Function (যদি প্রয়োজন হয়)
    const register = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await handleSyncUser(result.user);
            // onAuthStateChanged listener স্বয়ংক্রিয়ভাবে ইউজার এবং রোল আপডেট করবে
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error("Firebase Register Error:", error.message);
            setLoading(false);
            return { success: false, message: error.message };
        }
    };

    // 4. Logout Function (Firebase ব্যবহার করে)
    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            setLoading(false);
            return { success: true };
        } catch (error) {
            console.error("Firebase Logout Error:", error.message);
            setLoading(false);
            return { success: false, message: error.message };
        }
    };

    // The value that will be exposed to consumers
    const value = {
        user,
        loading,
        login,
        logout,
        googleLogin,
        register,
    };

    // Show a loading screen while checking auth state
    if (loading) {
        return <div className="text-center p-8 text-xl font-semibold text-blue-600">Checking Authentication Status...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Export the Context
export default AuthContext;
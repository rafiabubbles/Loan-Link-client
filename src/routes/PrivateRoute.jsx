// src/components/auth/PrivateRoute.jsx

import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// ⚠️ নিশ্চিত করুন যে নিচের পাথটি আপনার AuthContext ফাইলের সঠিক পাথ।
import AuthContext from '../context/AuthContext';

/**
 * এটি একটি Protected Route কম্পোনেন্ট।
 * * এটি চেক করে:
 * 1. ইউজার লগইন করা আছে কিনা।
 * 2. ইউজারের রোল, allowedRoles অ্যারেতে আছে কিনা।
 * * @param {object} props 
 * @param {string[]} [props.allowedRoles=['borrower']] - অনুমোদিত রোলের অ্যারে।
 * @returns {JSX.Element}
 */
export default function PrivateRoute({ allowedRoles = ['borrower'] }) {
    // AuthContext থেকে ইউজার ডেটা এবং লোডিং স্টেট নিন
    const { user, loading } = useContext(AuthContext);

    // 1. লোডিং স্টেট: যতক্ষণ না অথেন্টিকেশন চেক শেষ হচ্ছে
    if (loading) {
        // লোডিং স্পিনার বা সাধারণ মেসেজ দেখান
        return (
            <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-blue-600">
                Checking Authentication Status...
            </div>
        );
    }

    // 2. লগইন চেক: ইউজার লগইন না করে থাকলে /login পেজে রিডাইরেক্ট
    if (!user) {
        // replace prop ব্যবহার করা হয়েছে যাতে ইউজার back বাটনে ক্লিক করে আবার সংরক্ষিত পেজে ফিরে না আসে।
        return <Navigate to="/login" replace />;
    }

    // 3. রোল চেক (RBAC): যদি ইউজার লগইন করে থাকে, কিন্তু রোল অনুমোদিত না হয়
    if (user.role && !allowedRoles.includes(user.role)) {

        // লগইন করা আছে কিন্তু রোল অনুমোদিত নয়, তাই /home বা অন্য কোনো অ্যাক্সেস ডিনাই পেজে রিডাইরেক্ট
        console.warn(`Access Denied: User role (${user.role}) not allowed.`);
        return <Navigate to="/" replace />;
    }

    // 4. অনুমোদিত অ্যাক্সেস: যদি সব চেক পাস করে
    // 💡 Outlet ব্যবহার করা হয়েছে কারণ এই কম্পোনেন্টটি নেস্টেড রুটের লেআউট হিসেবে ব্যবহৃত হবে।
    return <Outlet />;
}
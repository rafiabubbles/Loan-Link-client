// routes/AdminRoute.jsx

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // আপনার Auth Context এর সঠিক পাথ দিন
import LoadingSpinner from '../components/shared/LoadingSpinner'; // আপনার লোডিং স্পিনারের সঠিক পাথ দিন

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // 1. লোডিং স্টেট চেক
    if (loading) {
        return <LoadingSpinner />;
    }

    // 2. রোলের অনুমতি চেক
    // 💡 শুধুমাত্র 'admin' রোলকে অনুমতি দেওয়া হচ্ছে
    if (user && user.role === 'admin') {
        return children;
    }

    // 3. অনুমতি না থাকলে হোমে বা লগইন পেজে রিডাইরেক্ট
    // Note: If the user is logged in but not an admin, we redirect them home.
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
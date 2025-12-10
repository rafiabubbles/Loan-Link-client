import React, { useContext } from "react";
import AuthContext from '/src/context/AuthContext.jsx';
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div>Loading...</div>;
    if (!user || user.role !== "admin") return <Navigate to="/" replace />;
    return children;
}

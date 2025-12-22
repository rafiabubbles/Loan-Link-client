import React from "react";
import useAuth from "../../Hooks/useAuth";
import { Navigate } from "react-router";
import Loading from "../../Pages/Loading/Loading";
const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;

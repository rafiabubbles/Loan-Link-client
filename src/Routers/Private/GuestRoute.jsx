import React from "react";
import useAuth from "../../Hooks/useAuth";
import { Navigate } from "react-router";
import Loading from "../../Pages/Loading/Loading";

const GuestRoute = ({ children }) => {

  const { currentUser, loading } = useAuth();
  

  if (loading) {
    return <Loading></Loading>;
  }

  if (currentUser) {
    return <Navigate to="/"></Navigate>;
  }
  return children;
};

export default GuestRoute;

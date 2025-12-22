import React from "react";
import useRole from "../../Hooks/useRole";
import Loading from "../Loading/Loading";
import AdminDashboard from "./Admin/AdminDashboard";
import ManagerDashboard from "./Manager/ManagerDashboard";
import UserDashboard from "./Users/UserDashboard";

const Dashboard = () => {
  const { role, isLoading } = useRole();

  // Show loading state while fetching role
  if (isLoading) {
    return <Loading />;
  }

  // Render appropriate dashboard based on user role
  if (role?.role === "admin") {
    return <AdminDashboard />;
  }

  if (role?.role === "manager") {
    return <ManagerDashboard />;
  }

  // Default to user dashboard
  return <UserDashboard />;
};

export default Dashboard;

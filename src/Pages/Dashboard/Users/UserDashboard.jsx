import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {
  FaFileContract,
  FaMoneyCheckAlt,
  FaHourglassStart,
  FaCheckDouble,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "motion/react";
import Loading from "../../Loading/Loading";

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch User's Applications
  const { data: myApplications = [], isLoading } = useQuery({
    queryKey: ["user-dashboard-stats", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/loanApplication?email=${currentUser?.email}`
      );
      return res.data;
    },
    enabled: !!currentUser?.email,
  });

  if (isLoading) {
    return <Loading />;
  }

  // --- Statistics Calculation ---
  const totalApplications = myApplications.length;

  const pendingCount = myApplications.filter(
    (app) => app.status === "pending"
  ).length;
  const approvedCount = myApplications.filter(
    (app) => app.status === "approved"
  ).length;
  const rejectedCount = myApplications.filter(
    (app) => app.status === "rejected"
  ).length;

  // Calculate Total Debt (Sum of amounts for approved loans)
  const totalDebt = myApplications
    .filter((app) => app.status === "approved")
    .reduce((sum, app) => sum + (parseFloat(app.loanAmount) || 0), 0);

  // Chart Data: Status Distribution
  const statusData = [
    { name: "Pending", value: pendingCount },
    { name: "Approved", value: approvedCount },
    { name: "Rejected", value: rejectedCount },
  ];

  // Filter out zero values for cleaner chart
  const activeStatusData = statusData.filter((item) => item.value > 0);

  const COLORS = ["#FFBB28", "#00C49F", "#FF8042"];

  return (
    <div className="min-h-screen relative overflow-hidden py-10 rounded-3xl bg-accent/5 font-jost text-base-content jost">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            My Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-primary">
            Financial Overview
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg">
            Track your loan applications and financial status
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Applications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-accent shadow-xl rounded-2xl p-6 flex items-center gap-4 hover:shadow-2xl transition-all border-l-4 border-primary"
          >
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <FaFileContract size={24} />
            </div>
            <div>
              <p className="text-sm opacity-70 font-semibold">Total Requests</p>
              <h2 className="text-2xl font-bold">{totalApplications}</h2>
            </div>
          </motion.div>

          {/* Pending Requests */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-accent shadow-xl rounded-2xl p-6 flex items-center gap-4 hover:shadow-2xl transition-all border-l-4 border-warning"
          >
            <div className="p-4 bg-warning/10 rounded-full text-warning">
              <FaHourglassStart size={24} />
            </div>
            <div>
              <p className="text-sm opacity-70 font-semibold">Pending Review</p>
              <h2 className="text-2xl font-bold">{pendingCount}</h2>
            </div>
          </motion.div>

          {/* Approved Loans */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-accent shadow-xl rounded-2xl p-6 flex items-center gap-4 hover:shadow-2xl transition-all border-l-4 border-success"
          >
            <div className="p-4 bg-success/10 rounded-full text-success">
              <FaCheckDouble size={24} />
            </div>
            <div>
              <p className="text-sm opacity-70 font-semibold">Active Loans</p>
              <h2 className="text-2xl font-bold">{approvedCount}</h2>
            </div>
          </motion.div>

          {/* Total Debt */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-accent shadow-xl rounded-2xl p-6 flex items-center gap-4 hover:shadow-2xl transition-all border-l-4 border-info"
          >
            <div className="p-4 bg-info/10 rounded-full text-info">
              <FaMoneyCheckAlt size={24} />
            </div>
            <div>
              <p className="text-sm opacity-70 font-semibold">Total Borrowed</p>
              <h2 className="text-2xl font-bold">
                ${totalDebt.toLocaleString()}
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Charts Section (One Centered Chart) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center">
          {/* Chart 1: Application Status Distribution */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-accent p-6 rounded-2xl shadow-xl lg:col-span-2 lg:w-1/2 lg:mx-auto"
          >
            <h3 className="text-xl font-bold mb-6 text-center">
              My Application Status
            </h3>
            <div className="h-80 w-full">
              {activeStatusData.length > 0 ? (
                <ResponsiveContainer width="99%" height="100%">
                  <PieChart>
                    <Pie
                      data={activeStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {activeStatusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-base-content/50">
                  No application data to display yet.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

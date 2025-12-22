import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaUsers,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaChartPie,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import { motion } from "motion/react";
import useAuth from "../../../Hooks/useAuth";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();
  // Fetch Users Data
  // ... (Keep existing queries)
  const { data: users = [] } = useQuery({
    queryKey: ["users-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
    enabled: !!currentUser?.email,
  });

  // Fetch Loan Products Data
  const { data: loans = [] } = useQuery({
    queryKey: ["loans-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
    enabled: !!currentUser?.email,
  });

  // Fetch All Applications
  const { data: applications = [] } = useQuery({
    queryKey: ["applications-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loanApplication");
      return res.data;
    },
    enabled: !!currentUser?.email,
  });

  // --- Statistics Calculation ---
  // ... (Keep existing calculations)

  // 1. User Stats
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const managerCount = users.filter((u) => u.role === "manager").length;
  const userCount = users.filter((u) => u.role === "user").length;

  const userRoleData = [
    { name: "Admins", value: adminCount },
    { name: "Managers", value: managerCount },
    { name: "Users", value: userCount },
  ];

  // 2. Financial Stats (from Applications)
  const totalFunding = applications.reduce(
    (sum, app) => sum + (parseFloat(app.loanAmount) || 0),
    0
  );
  const totalApplications = applications.length;

  // 3. Application Status Stats
  const pendingApps = applications.filter(
    (app) => app.status === "pending"
  ).length;
  const approvedApps = applications.filter(
    (app) => app.status === "approved"
  ).length;
  const rejectedApps = applications.filter(
    (app) => app.status === "rejected"
  ).length;

  const statusData = [
    { name: "Pending", value: pendingApps },
    { name: "Approved", value: approvedApps },
    { name: "Rejected", value: rejectedApps },
  ];

  // 4. Loan Categories (from Products)
  const categoryCounts = loans.reduce((acc, loan) => {
    const cat = loan.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.keys(categoryCounts).map((key) => ({
    name: key,
    value: categoryCounts[key],
  }));

  // Colors for Charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

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
            Admin Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-primary">
            Overview & Analytics
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg">
            System performance statistics and loan application insights
          </p>
        </motion.div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Total Users */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-accent shadow-xl rounded-2xl p-6 flex items-center gap-4 hover:shadow-2xl transition-all border-l-4 border-primary"
          >
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <FaUsers size={24} />
            </div>
            <div>
              <p className="text-sm opacity-70 font-semibold">Total Users</p>
              <h2 className="text-3xl font-bold">{totalUsers}</h2>
            </div>
          </motion.div>

          {/* Total Applications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-accent shadow-xl rounded-2xl p-6 flex items-center gap-4 hover:shadow-2xl transition-all border-l-4 border-primary"
          >
            <div className="p-4 rounded-full text-primary bg-primary/10">
              <FaHandHoldingUsd size={24} />
            </div>
            <div>
              <p className="text-sm opacity-70 font-semibold">
                Total Applications
              </p>
              <h2 className="text-3xl font-bold">{totalApplications}</h2>
            </div>
          </motion.div>

          {/* Total Loan Products */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-accent shadow-xl rounded-2xl p-6 flex items-center gap-4 hover:shadow-2xl transition-all border-l-4 border-info"
          >
            <div className="p-4 bg-info/10 rounded-full text-info">
              <FaChartPie size={24} />
            </div>
            <div>
              <p className="text-sm opacity-70 font-semibold">
                Active Products
              </p>
              <h2 className="text-3xl font-bold">{loans.length}</h2>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: User Role Distribution */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-accent p-6 rounded-2xl shadow-xl"
          >
            <h3 className="text-xl font-bold mb-6 text-center">
              User Roles Distribution
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="99%" height="100%">
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {userRoleData.map((entry, index) => (
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
            </div>
          </motion.div>

          {/* Chart 2: Application Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-accent p-6 rounded-2xl shadow-xl"
          >
            <h3 className="text-xl font-bold mb-6 text-center">
              Application Status Overview
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="99%" height="100%">
                <BarChart
                  data={statusData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8">
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

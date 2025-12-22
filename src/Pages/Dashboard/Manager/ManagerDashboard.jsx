import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
  FaClipboardList,
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
} from "recharts";
import { motion } from "motion/react";
import Loading from "../../Loading/Loading";

const ManagerDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["application", currentUser.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loanApplications`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  // --- Statistics Calculation ---
  const totalApplications = applications?.length;

  const pendingApps = applications.filter(
    (app) => app.status === "pending"
  ).length;

  const approvedApps = applications.filter(
    (app) => app.status === "approved"
  ).length;

  const rejectedApps = applications.filter(
    (app) => app.status === "rejected"
  ).length;

  const totalFunding = applications
    .filter((app) => app.status === "approved")
    .reduce((sum, app) => sum + (parseFloat(app.loanAmount) || 0), 0);

  // Chart Data 1: Status Distribution
  const statusData = [
    { name: "Pending", value: pendingApps },
    { name: "Approved", value: approvedApps },
    { name: "Rejected", value: rejectedApps },
  ];

  // Chart Data 2: Loans by Category (Top 5)
  const categoryCounts = applications.reduce((acc, app) => {
    const cat = app.loanTitle || "Other"; // Using loanTitle as Category
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.keys(categoryCounts)
    .map((key) => ({
      name: key,
      value: categoryCounts[key],
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const COLORS = ["#FFBB28", "#00C49F", "#FF8042", "#0088FE", "#8884d8"];

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
            Manager Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-primary">
            Loan Operations
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg">
            Manage loan requests and track approval performance
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Total Applications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-accent shadow-xl rounded-2xl p-6 flex items-center gap-4 hover:shadow-2xl transition-all border-l-4 border-primary"
          >
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <FaClipboardList size={24} />
            </div>
            <div>
              <p className="text-sm opacity-70 font-semibold">
                Total Applications
              </p>
              <h2 className="text-2xl font-bold">{totalApplications}</h2>
            </div>
          </motion.div>

          {/* Pending */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-accent shadow-xl rounded-2xl p-6 flex items-center gap-4 hover:shadow-2xl transition-all border-l-4 border-warning"
          >
            <div className="p-4 bg-warning/10 rounded-full text-warning">
              <FaHourglassHalf size={24} />
            </div>
            <div>
              <p className="text-sm opacity-70 font-semibold">Pending Review</p>
              <h2 className="text-2xl font-bold">{pendingApps}</h2>
            </div>
          </motion.div>

          {/* Approved */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-accent shadow-xl rounded-2xl p-6 flex items-center gap-4 hover:shadow-2xl transition-all border-l-4 border-success"
          >
            <div className="p-4 bg-success/10 rounded-full text-success">
              <FaCheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm opacity-70 font-semibold">Approved Loans</p>
              <h2 className="text-2xl font-bold">{approvedApps}</h2>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Status Distribution */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-accent p-6 rounded-2xl shadow-xl"
          >
            <h3 className="text-xl font-bold mb-6 text-center">
              Application Status Distribution
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="99%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {statusData.map((entry, index) => (
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

          {/* Chart 2: Top Categories */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-accent p-6 rounded-2xl shadow-xl"
          >
            <h3 className="text-xl font-bold mb-6 text-center">
              Top Loan Categories
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="99%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8">
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[(index + 3) % COLORS.length]}
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

export default ManagerDashboard;

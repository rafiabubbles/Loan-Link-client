import React, { useState } from "react";
import { motion } from "motion/react";
import {
  FaEdit,
  FaSearch,
  FaUserShield,
  FaUserTie,
  FaUser,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const ManageUser = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userData = [] } = useQuery({
    queryKey: ["users", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filtering Logic
  const filteredUsers = userData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "badge-error";
      case "manager":
        return "badge-warning";
      default:
        return "badge-info";
    }
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FaUserShield className="inline mr-1" />;
      case "manager":
        return <FaUserTie className="inline mr-1" />;
      default:
        return <FaUser className="inline mr-1" />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-10 rounded-3xl">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-2 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 jost"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            Admin Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-base-content">
            Manage Users
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg">
            View and manage user roles and permissions
          </p>
        </motion.div>

        {/* User Statistics & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-base-100 p-6 rounded-4xl shadow-xl mb-8 border border-primary/20 relative overflow-hidden"
        >
          {/* Decorative Gradient Background */}
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-end justify-between">
            {/* Search Input */}
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text font-bold text-primary pl-1">
                  Search Users
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="input input-bordered input-primary w-full pl-12 rounded-full shadow-sm bg-base-100/50 backdrop-blur-sm focus:shadow-md transition-all font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary" />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 w-full md:w-auto overflow-x-auto ">
              <div className="flex-1">
                <label className="label">
                  <span className="label-text font-bold text-primary pl-1">
                    Filter Role
                  </span>
                </label>
                <select
                  className="select select-primary rounded-full shadow-sm w-full bg-base-100/50 focus:shadow-md font-medium"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="label">
                  <span className="label-text font-bold text-primary pl-1">
                    Filter Status
                  </span>
                </label>
                <select
                  className="select select-primary rounded-full shadow-sm w-full bg-base-100/50 focus:shadow-md font-medium"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-base-100 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-base-200 relative overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-primary/20 to-transparent rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

          <div className="overflow-x-auto relative z-10">
            <table className="table w-full align-middle">
              {/* head */}
              <thead className="bg-primary/5 text-primary text-lg font-bold">
                <tr>
                  <th className="py-4 rounded-l-xl">Avatar</th>
                  <th className="py-4">Name</th>
                  <th className="py-4">Email</th>
                  <th className="py-4">Role</th>
                  <th className="py-4">Requested Role</th>
                  <th className="py-4">Status</th>
                  <th className="py-4 text-center rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="text-base">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-base-content/50 text-xl font-medium"
                    >
                      {userData.length === 0
                        ? "No users found in the database."
                        : "No users match your search criteria."}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-base-200/50 transition-colors border-b border-base-200"
                    >
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={user.photoURL || "https://i.pravatar.cc/150"}
                              alt={user.name}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="font-bold text-lg text-base-content">
                          {user.name}
                        </div>
                      </td>
                      <td className="text-base-content/70">{user.email}</td>
                      <td>
                        <div
                          className={`badge badge-lg p-3 ${getRoleBadgeColor(
                            user.role
                          )}`}
                        >
                          {getRoleIcon(user.role)}
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </div>
                      </td>
                      <td>
                        <div className="badge badge-error">
                          {user.requestedRole}
                        </div>
                      </td>
                      <td>
                        <div
                          className={`badge ${
                            user.status === "active"
                              ? "badge-success"
                              : "badge-error"
                          }`}
                        >
                          {user.status}
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center gap-3">
                          {/* Update/Edit Button */}
                          <Link
                            to={`/dashboard/update-user/${user._id}`}
                            className="btn rounded-full bg-blue-500 text-white hover:bg-blue-600 border-none shadow-md"
                            title="Update Role"
                          >
                            <FaEdit /> Update
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageUser;

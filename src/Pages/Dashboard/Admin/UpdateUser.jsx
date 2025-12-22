import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import {
  FaUserShield,
  FaUserTie,
  FaUser,
  FaCheckCircle,
  FaBan,
  FaSave,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Loading from "../../Loading/Loading";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");
  const [suspendFeedback, setSuspendFeedback] = useState("");
  // Fetch user data
  const {
    data: user = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${id}`);
      return res.data;
    },
  });

  const { _id, email, name, role, status, requestedRole, photoURL, createdAt } =
    user;

  // Pre-populate role when user data loads
  useEffect(() => {
    if (role) {
      setValue("role", role);
    }
  }, [role, setValue]);

  // Handle role update
  const onSubmit = async (data) => {
    try {
      const updatedData = {
        role: data.role,
        updatedAt: new Date().toLocaleString(),
      };

      await axiosSecure.patch(`/users/${id}`, updatedData);
      toast.success("User role updated successfully!");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user role");
    }
  };

  // Handle approve action
  const handleApprove = async () => {
    try {
      const updatedData = {
        status: "active",
        activatedAt: new Date().toLocaleString(),
      };

      await axiosSecure.patch(`/users/${id}`, updatedData);
      toast.success("User approved and activated!");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve user");
    }
  };

  // Handle suspend action
  const handleSuspend = () => {
    setShowSuspendModal(true);
  };

  // Confirm suspend
  const confirmSuspend = async () => {
    if (!suspendReason.trim()) {
      toast.error("Please provide a reason for suspension");
      return;
    }

    try {
      const updatedData = {
        status: "suspended",
        rejectedAt: new Date().toLocaleString(),
        suspendReason,
        suspendFeedback,
      };

      await axiosSecure.patch(`/users/${id}`, updatedData);
      toast.success("User suspended successfully");
      setShowSuspendModal(false);
      setSuspendReason("");
      setSuspendFeedback("");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to suspend user");
    }
  };

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

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "badge-success";
      case "suspended":
        return "badge-error";
      default:
        return "badge-warning";
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen jost relative overflow-hidden py-10 rounded-3xl">
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
            Update User
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg">
            Manage user role and account status
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* User Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-base-100 p-8 rounded-4xl shadow-2xl border border-base-200">
              <h3 className="text-2xl font-bold mb-6 text-center">
                User Information
              </h3>

              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="avatar">
                  <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={photoURL || "https://i.pravatar.cc/150"}
                      alt={name}
                    />
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-base-content/60">
                    Name
                  </label>
                  <p className="text-lg font-bold">{name}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-base-content/60">
                    Email
                  </label>
                  <p className="text-base text-base-content/80">{email}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-base-content/60">
                    Current Role
                  </label>
                  <div className="mt-1">
                    <span
                      className={`badge badge-lg ${getRoleBadgeColor(role)}`}
                    >
                      {getRoleIcon(role)}
                      {role?.charAt(0).toUpperCase() + role?.slice(1)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-base-content/60">
                    Status
                  </label>
                  <div className="mt-1">
                    <span
                      className={`badge badge-lg ${getStatusBadgeColor(
                        status
                      )}`}
                    >
                      {status?.charAt(0).toUpperCase() + status?.slice(1)}
                    </span>
                  </div>
                </div>

                {requestedRole && (
                  <div>
                    <label className="text-sm font-semibold text-base-content/60">
                      Requested Role
                    </label>
                    <p className="text-base font-semibold text-warning">
                      {requestedRole.charAt(0).toUpperCase() +
                        requestedRole.slice(1)}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-base-content/60">
                    Member Since
                  </label>
                  <p className="text-sm text-base-content/70">
                    {new Date(createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-base-100 p-8 rounded-4xl shadow-2xl border border-base-200">
              <h3 className="text-2xl font-bold mb-6">Manage User</h3>

              {/* Role Update Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-lg">
                      Update Role
                    </span>
                  </label>
                  <div className="flex gap-4">
                    <select
                      className="select select-bordered flex-1 focus:border-primary focus:ring-2 focus:ring-primary/50 rounded-full h-12"
                      {...register("role", { required: "Role is required" })}
                    >
                      <option value="">Select Role</option>
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      type="submit"
                      className="btn-main px-6 shadow-lg shadow-primary/20 gap-2 group"
                    >
                      <FaSave className="group-hover:rotate-12 transition-transform" />
                      Update Role
                    </button>
                  </div>
                  {errors.role && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.role.message}
                      </span>
                    </label>
                  )}
                </div>
              </form>

              <div className="divider"></div>

              {/* Status Actions */}
              <div>
                <h4 className="text-xl font-semibold mb-4">Account Status</h4>
                <p className="text-base-content/60 mb-6">
                  Approve to activate the user account or suspend to restrict
                  access.
                </p>

                <div className="flex flex-wrap gap-4">
                  {/* Approve Button */}
                  <button
                    onClick={handleApprove}
                    className="btn rounded-full bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-none shadow-lg shadow-green-500/30 gap-2 flex-1 py-3 group"
                    disabled={status === "active"}
                  >
                    <FaCheckCircle className="group-hover:scale-110 transition-transform" />
                    Approve & Activate
                  </button>

                  {/* Suspend Button */}
                  <button
                    onClick={handleSuspend}
                    className="btn rounded-full bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white border-none shadow-lg shadow-red-500/30 gap-2 flex-1 py-3 group"
                    disabled={status === "suspended"}
                  >
                    <FaBan className="group-hover:rotate-12 transition-transform" />
                    Suspend Account
                  </button>
                </div>
              </div>
            </div>
            <div className="flex py-10  justify-center">
              <Link
                to="/dashboard/manage-user"
                className="btn rounded-full bg-primary text-secondary border-none "
              >
                <FaArrowAltCircleLeft></FaArrowAltCircleLeft> Back to Manage
                User
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Suspend Modal */}
      {showSuspendModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md  rounded-4xl">
            <h3 className="font-bold text-2xl mb-4 text-error">
              Suspend User Account
            </h3>
            <p className="text-base-content/70 mb-6">
              Please provide a reason for suspending this user's account.
            </p>

            <div className="space-y-4">
              {/* Suspend Reason */}
              <div className="form-control">
                <label className="label w-full">
                  <span className="label-text font-medium">
                    Reason <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Violation of terms"
                  className="input input-bordered focus:border-primary focus:ring-2 focus:ring-primary/50 w-full rounded-full"
                  value={suspendReason}
                  onChange={(e) => setSuspendReason(e.target.value)}
                  required
                />
              </div>

              {/* Suspend Feedback */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Additional Feedback
                  </span>
                </label>
                <textarea
                  placeholder="Provide detailed explanation (optional)"
                  className="textarea textarea-bordered h-24 focus:border-primary focus:ring-2 focus:ring-primary/50 resize-none w-full rounded-2xl"
                  value={suspendFeedback}
                  onChange={(e) => setSuspendFeedback(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-action">
              <button
                onClick={() => {
                  setShowSuspendModal(false);
                  setSuspendReason("");
                  setSuspendFeedback("");
                }}
                className="btn btn-ghost hover:bg-base-200 px-6"
              >
                Cancel
              </button>
              <button
                onClick={confirmSuspend}
                className="btn rounded-full bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white border-none shadow-lg shadow-red-500/30 px-6"
              >
                Confirm Suspend
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowSuspendModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;

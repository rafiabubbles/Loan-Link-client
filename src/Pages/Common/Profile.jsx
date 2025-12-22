/* eslint-disable no-unused-vars */
import React from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "motion/react";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaTrashAlt,
  FaUserShield,
  FaUserTie,
  FaCalendarAlt,
  FaCheckCircle,
  FaBan,
  FaSignOutAlt,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const Profile = () => {
  const { currentUser, logOutUser, deleteCurrentUser, setLoading } = useAuth();
  // console.log(currentUser.email);

  const axiosSecure = useAxiosSecure();
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${currentUser?.email}`);
      return res.data;
    },
  });

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCurrentUser()
          .then(() => {
            setLoading(false);
            Swal.fire({
              title: "Deleted!",
              text: "Your account has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            setLoading(false);
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
            });
          });
      }
    });
  };

  // Handle logout
  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logOutUser()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have been successfully logged out.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
            });
          });
      }
    });
  };

  // Get role badge color and icon
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
    <div className="min-h-screen px-4  flex justify-center items-start bg-base-100 jost">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-accent shadow-2xl rounded-3xl overflow-hidden border border-base-200 mt-10"
      >
        {/* Header / Banner */}
        <div className="h-48 bg-linear-180 from-primary to-black relative ">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 left-0 w-full h-full opacity-80 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 ">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-primary  ring-offset-4 shadow-xl">
                <img
                  src={
                    userData?.photoURL ||
                    currentUser?.photoURL ||
                    "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                  }
                  alt="Profile"
                  className="bg-base-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 pb-12 px-8 text-center">
          <h1 className="text-3xl font-bold text-base-content">
            {userData?.name || currentUser?.displayName || "User Name"}
          </h1>
          <p className="text-base-content/60 font-medium mt-1">
            {userData?.email || currentUser?.email || "user@example.com"}
          </p>

          {/* Badges Row */}
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            {/* Role Badge */}
            <div
              className={`badge badge-lg ${getRoleBadgeColor(
                userData?.role
              )} px-4 py-3`}
            >
              {getRoleIcon(userData?.role)}
              {userData?.role?.charAt(0).toUpperCase() +
                userData?.role?.slice(1)}
            </div>

            {/* Status Badge */}
            <div
              className={`badge badge-lg ${getStatusBadgeColor(
                userData?.status
              )} px-4 py-3`}
            >
              {userData?.status === "active" ? (
                <FaCheckCircle className="inline mr-1" />
              ) : (
                <FaBan className="inline mr-1" />
              )}
              {userData?.status?.charAt(0).toUpperCase() +
                userData?.status?.slice(1)}
            </div>

            {/* Requested Role Badge (if exists) */}
            {userData?.requestedRole && (
              <div className="badge badge-lg badge-error px-4 py-3">
                <VscGitPullRequestGoToChanges /> Requested :{" "}
                {userData?.requestedRole}
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left max-w-2xl mx-auto">
            {/* Full Name */}
            <div className="p-4 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FaUser size={20} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-base-content/50 tracking-wider">
                  Full Name
                </p>
                <p className="font-semibold text-lg">
                  {userData?.name || currentUser?.displayName || "N/A"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="p-4 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary ">
                <FaEnvelope size={20} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-base-content/50 tracking-wider">
                  Email Address
                </p>
                <p className="font-semibold text-lg truncate">
                  {userData?.email || currentUser?.email || "N/A"}
                </p>
              </div>
            </div>

            {/* Account Role */}
            <div className="p-4 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FaShieldAlt size={20} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-base-content/50 tracking-wider">
                  Account Role
                </p>
                <p className="font-semibold text-lg">
                  {userData?.role?.charAt(0).toUpperCase() +
                    userData?.role?.slice(1) || "N/A"}
                </p>
              </div>
            </div>

            {/* Member Since */}
            <div className="p-4 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FaCalendarAlt size={20} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-base-content/50 tracking-wider">
                  Member Since
                </p>
                <p className="font-semibold text-base">
                  {userData?.createdAt
                    ? new Date(userData.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className=" flex flex-col items-center gap-4 pt-8 w-full max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-error">Danger Zone</h3>
            <p className="text-sm text-base-content/60 max-w-md">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            {/* Logout and Delete Account */}
            <div className="flex md:flex-row flex-col justify-center gap-4">
              <button
                onClick={handleLogout}
                className="btn btn-error btn-wide btn-outline rounded-full px-8 gap-2 mt-2 hover:bg-error hover:text-white transition-all"
              >
                <FaSignOutAlt />
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="btn btn-error btn-wide btn-outline rounded-full px-8 gap-2 mt-2 hover:bg-error hover:text-white transition-all"
              >
                <FaTrashAlt />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;

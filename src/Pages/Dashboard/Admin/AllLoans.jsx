import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const AllLoans = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: allLoans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-loans", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/loans/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Loan has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  // Handle 'Show on Home' Toggle
  const handleShowOnHome = async (id, currentShowOnHome) => {
    // Optimistic update could be used, but standard wait is safer for now
    try {
      const res = await axiosSecure.patch(`/loans/${id}`, {
        showOnHome: !currentShowOnHome,
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Visibility updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update visibility");
    }
  };

  const filteredLoans = allLoans.filter(
    (loan) =>
      loan.loanTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loading />;

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
          className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-center md:text-left jost md:pl-6">
            <span className="text-primary font-bold tracking-widest uppercase text-sm block mb-2">
              Admin Dashboard
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-base-content">
              All Loans
            </h1>
            <p className="text-base-content/60 mt-2 text-lg">
              Manage and oversee all loan products
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by title or category..."
              className="input  w-full pl-12 rounded-xl shadow-sm h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Search Icon */}
            <FaSearch className="absolute top-4 left-4  text-base-content/40" />
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
            <table className="table w-full">
              {/* Head */}
              <thead className="bg-primary/5 text-primary text-lg font-bold">
                <tr>
                  <th className="py-4 rounded-l-xl pl-8">Loan Info</th>
                  <th className="py-4">Category</th>
                  <th className="py-4">Interest</th>
                  <th className="py-4">Created By</th>
                  <th className="py-4 text-center">Show on Home</th>
                  <th className="py-4 text-center rounded-r-xl pr-8">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-base">
                {filteredLoans.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-20 text-base-content/40 text-lg font-medium"
                    >
                      No loans found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan) => (
                    <tr
                      key={loan._id}
                      className="hover:bg-primary/10 transition-colors border-b border-base-200 last:border-none"
                    >
                      <td className="pl-8 py-4">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12 bg-base-300">
                              <img src={loan.image} alt={loan.loanTitle} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-lg text-base-content">
                              {loan.loanTitle}
                            </div>
                            <div className="text-sm opacity-60">
                              Max: ${loan.maxLoanLimit}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="badge badge-outline badge-primary font-medium p-3">
                          {loan.category}
                        </div>
                      </td>
                      <td>
                        <div className="font-bold text-base-content">
                          {loan.interestRate}%
                        </div>
                      </td>
                      <td>
                        <div className="">
                          {/* Assuming loan object has user details or just email */}
                          <p className="badge badge-outline badge-primary font-medium p-3">
                            {loan.createdBy}
                          </p>
                          <p className="text-xs text-base-content/60 mt-1">
                            {loan.managerEmail}
                          </p>
                        </div>
                      </td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          className="toggle toggle-success"
                          checked={loan.showOnHome}
                          onChange={() =>
                            handleShowOnHome(loan._id, loan.showOnHome)
                          }
                        />
                      </td>
                      <td className="text-right pr-8">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/dashboard/edit-loan/${loan._id}`}
                            className="btn btn-ghost btn-sm btn-circle text-primary hover:bg-primary/10 tooltip tooltip-left"
                            data-tip="Update"
                          >
                            <FaEdit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(loan._id)}
                            className="btn btn-ghost btn-sm btn-circle text-error hover:bg-error/10 tooltip tooltip-left"
                            data-tip="Delete"
                          >
                            <FaTrash size={18} />
                          </button>
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

export default AllLoans;

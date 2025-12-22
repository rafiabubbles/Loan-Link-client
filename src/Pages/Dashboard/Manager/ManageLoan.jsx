import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router";

const ManageLoan = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: allLoans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["loans", "manager"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans`);
      return res.data;
    },
  });

  // Client-side filtering based on search query
  const filteredLoans = allLoans.filter((loan) => {
    const query = searchQuery.toLowerCase();
    return (
      loan.title?.toLowerCase().includes(query) ||
      loan.category?.toLowerCase().includes(query)
    );
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/loans/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Loan has been deleted.", "success");
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

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
            Manager Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-base-content">
            Manage Loan Products
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg">
            Update, delete, or search for loan packages.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto mb-10"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Title or Category..."
              className="input input-bordered w-full pl-12 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
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
                  <th className="py-4 rounded-l-xl">Product ID</th>
                  <th className="py-4">Image</th>
                  <th className="py-4">Title</th>
                  <th className="py-4">Interest</th>
                  <th className="py-4">Category</th>
                  <th className="py-4 text-center rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="text-base">
                {filteredLoans.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500 text-lg"
                    >
                      {allLoans.length === 0
                        ? "No loan products found."
                        : "No loans match your search."}
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan) => (
                    <tr
                      key={loan._id}
                      className="hover:bg-base-200/50 transition-colors border-b border-base-200"
                    >
                      <td>{loan._id.slice(-6)}</td>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={loan.image || "https://placehold.co/100"}
                              alt={loan.loanTitle}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="font-bold text-lg text-base-content">
                          {loan.loanTitle}
                        </div>
                      </td>
                      <td className="font-bold text-primary text-lg">
                        {loan.interestRate}%
                      </td>
                      <td>
                        <div className="badge badge-ghost badge-lg p-3">
                          {loan.category}
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center gap-3">
                          {/* Update Button */}
                          <Link
                            to={`/dashboard/edit-loan/${loan._id}`}
                            className="btn btn-circle bg-blue-500 text-white hover:bg-blue-600 border-none shadow-md"
                            title="Update"
                          >
                            <FaEdit />
                          </Link>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(loan._id)}
                            className="btn btn-circle bg-rose-500 text-white hover:bg-rose-600 border-none shadow-md"
                            title="Delete"
                          >
                            <FaTrash />
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

export default ManageLoan;

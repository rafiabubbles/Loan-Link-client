import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "motion/react";
import { FaEye, FaSearch } from "react-icons/fa";
import Loading from "../../Loading/Loading";
import useAuth from "../../../Hooks/useAuth";

const LoanApplication = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { data: loanApplications = [], isLoading } = useQuery({
    queryKey: ["loanApplication", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/loanApplication?email=${currentUser?.email}`
      );
      return res.data;
    },
  });
  // console.log(loanApplications);

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    document.getElementById("admin_loan_details_modal").showModal();
  };

  if (isLoading) {
    return <Loading />;
  }

  // Filter loans based on search and status
  const filteredLoans = loanApplications.filter((loan) => {
    const matchesSearch =
      loan.loanTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (loan.firstName + " " + loan.lastName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      loan.status?.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

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
            All Loan Applications
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg">
            Manage and view all loan requests from users.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-10 flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by User or Loan Title..."
              className="input input-bordered w-full pl-12 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <select
            className="select select-bordered rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-48 capitalize"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
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
                  <th className="py-4 rounded-l-xl">Loan ID</th>
                  <th className="py-4">User</th>
                  <th className="py-4">Loan Category</th>
                  <th className="py-4">Amount</th>
                  <th className="py-4">Status</th>
                  <th className="py-4 text-center rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="text-base">
                {filteredLoans.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-10 text-gray-400 text-3xl font-medium"
                    >
                      No loan applications found.
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan) => (
                    <tr
                      key={loan._id}
                      className="hover:bg-primary/5 transition-colors border-b border-base-200"
                    >
                      <td className="font-mono text-sm opacity-70">
                        {loan._id.slice(-6)}
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold text-base-content">
                              {loan.firstName} {loan.lastName}
                            </div>
                            <div className="text-sm text-base-content/60">
                              {loan.userEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{loan.loanTitle}</td>
                      <td className="font-bold text-primary">
                        ${loan.loanAmount}
                      </td>
                      <td>
                        <div
                          className={`badge ${
                            loan.status === "approved"
                              ? "badge-success text-white"
                              : loan.status === "rejected"
                              ? "badge-error text-white"
                              : loan.status === "cancelled"
                              ? "badge-ghost"
                              : "badge-warning text-white"
                          } p-3 font-medium capitalize shadow-sm`}
                        >
                          {loan.status || "pending"}
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center gap-3">
                          {/* View Button */}
                          <button
                            onClick={() => handleViewDetails(loan)}
                            className="btn btn-sm btn-circle bg-primary text-secondary border-none hover:bg-primary/80 shadow-md tooltip tooltip-left"
                            data-tip="View Details"
                          >
                            <FaEye />
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

      {/* Modal for Viewing Loan Details */}
      <dialog id="admin_loan_details_modal" className="modal">
        <div className="modal-box max-w-4xl bg-base-100">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl mb-6 text-primary">
            Loan Application Details
          </h3>

          {selectedLoan && (
            <div className="space-y-6">
              {/* Applicant Information */}
              <div className="bg-base-200/50 p-6 rounded-2xl">
                <h4 className="font-bold text-lg mb-4 text-base-content border-b border-base-content/10 pb-2">
                  Applicant Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-base-content/60">Full Name</p>
                    <p className="font-semibold text-lg">
                      {selectedLoan.firstName} {selectedLoan.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Email</p>
                    <p className="font-semibold">{selectedLoan.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">
                      Contact Number
                    </p>
                    <p className="font-semibold">
                      {selectedLoan.contactNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">National ID</p>
                    <p className="font-semibold">{selectedLoan.nationalId}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-base-content/60">Address</p>
                    <p className="font-semibold">{selectedLoan.address}</p>
                  </div>
                </div>
              </div>

              {/* Financial & Loan Details */}
              <div className="bg-base-200/50 p-6 rounded-2xl">
                <h4 className="font-bold text-lg mb-4 text-base-content border-b border-base-content/10 pb-2">
                  Loan & Financial Info
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-base-content/60">Loan Title</p>
                    <p className="font-semibold">{selectedLoan.loanTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">
                      Requested Amount
                    </p>
                    <p className="font-bold text-xl text-primary">
                      ${selectedLoan.loanAmount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">
                      Interest Rate
                    </p>
                    <p className="font-semibold">
                      {selectedLoan.interestRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">
                      Monthly Income
                    </p>
                    <p className="font-semibold">
                      ${selectedLoan.monthlyIncome}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-base-content/60">
                      Income Source
                    </p>
                    <p className="font-semibold">{selectedLoan.incomeSource}</p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-sm text-base-content/60">
                      Reason for Loan
                    </p>
                    <p className="font-semibold">{selectedLoan.reason}</p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-sm text-base-content/60">Extra Notes</p>
                    <p className="text-sm italic text-base-content/80 whitespace-pre-wrap rounded-lg bg-base-100 p-3 mt-1">
                      {selectedLoan.extraNotes ||
                        "No additional notes provided."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status & Payment Information */}
              <div className="bg-base-200/50 p-6 rounded-2xl">
                <h4 className="font-bold text-lg mb-4 text-base-content border-b border-base-content/10 pb-2">
                  Status & Timeline
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-base-content/60">
                      Application Date
                    </p>
                    <p className="font-semibold">
                      {selectedLoan.applicationDate || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">
                      Current Status
                    </p>
                    <div className="font-semibold">
                      <span
                        className={`badge ${
                          selectedLoan.status === "approved"
                            ? "badge-success text-white"
                            : selectedLoan.status === "rejected"
                            ? "badge-error text-white"
                            : selectedLoan.status === "cancelled"
                            ? "badge-ghost"
                            : "badge-warning text-white"
                        }`}
                      >
                        {selectedLoan.status}
                      </span>
                    </div>
                  </div>

                  {selectedLoan.approvedAt && (
                    <div>
                      <p className="text-sm text-base-content/60">
                        Approved At
                      </p>
                      <p className="font-semibold text-success">
                        {selectedLoan.approvedAt}
                      </p>
                    </div>
                  )}
                  {selectedLoan.cancelledAt && (
                    <div>
                      <p className="text-sm text-base-content/60">
                        Cancelled At
                      </p>
                      <p className="font-semibold text-error">
                        {selectedLoan.cancelledAt}
                      </p>
                    </div>
                  )}

                  <div className="md:col-span-2 mt-2 pt-2 border-t border-base-300/50">
                    <p className="text-sm text-base-content/50 uppercase font-bold mb-2">
                      Application Fee Payment
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div>
                        <p className="text-xs text-base-content/60">
                          Payment Status
                        </p>
                        <p
                          className={`font-bold ${
                            selectedLoan.paymentStatus === "paid"
                              ? "text-success"
                              : "text-warning"
                          }`}
                        >
                          {selectedLoan.paymentStatus}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-base-content/60">
                          Fee Amount
                        </p>
                        <p className="font-bold">
                          ${selectedLoan.applicationFee}
                        </p>
                      </div>
                      {selectedLoan.paymentStatus === "paid" && (
                        <div>
                          <p className="text-xs text-base-content/60">
                            Transaction ID
                          </p>
                          <p className="font-mono text-sm bg-base-100 px-2 py-0.5 rounded border border-base-300">
                            {selectedLoan.transactionId}
                          </p>
                        </div>
                      )}
                      {selectedLoan.paymentStatus === "paid" &&
                        selectedLoan.paidAt && (
                          <div>
                            <p className="text-xs text-base-content/60">
                              Paid At
                            </p>
                            <p className="font-semibold text-sm">
                              {selectedLoan.paidAt}
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default LoanApplication;

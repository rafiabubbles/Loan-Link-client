import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Loading from "../../Loading/Loading";
import toast from "react-hot-toast";

const ApprovedLoan = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedLoan, setSelectedLoan] = useState(null);

  const {
    data: approvedLoans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["loans", "manager"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loanApplication?status=approved");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    document.getElementById("approved_loan_details_modal").showModal();
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
            Manager Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-base-content">
            Approved Loan Applications
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg">
            Displays all approved loans.
          </p>
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
              {/* head */}
              <thead className="bg-primary/5 text-primary text-lg font-bold">
                <tr>
                  <th className="py-4 rounded-l-xl">Loan ID</th>
                  <th className="py-4">User Info</th>
                  <th className="py-4">Amount</th>
                  <th className="py-4">Approved Date</th>
                  <th className="py-4 text-center">Payment Status</th>
                  <th className="py-4">Status</th>
                  <th className="py-4 text-center rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="text-base">
                {approvedLoans.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-300 text-3xl font-bold"
                    >
                      No approved loan applications.
                    </td>
                  </tr>
                ) : (
                  approvedLoans.map((loan) => (
                    <tr
                      key={loan._id}
                      className="hover:bg-base-200/50 transition-colors border-b border-base-200"
                    >
                      <td className="font-mono text-sm opacity-70">
                        {loan._id.slice(-6)}
                      </td>
                      <td>
                        <div className="font-bold text-lg text-base-content">
                          {loan.firstName} {loan.lastName}
                        </div>
                        <div className="text-sm text-base-content/60">
                          {loan.userEmail}
                        </div>
                      </td>
                      <td className="font-bold text-primary text-lg">
                        ${loan.loanAmount}
                      </td>
                      <td className="text-base-content/80">
                        {loan.approvedAt || "N/A"}
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge badge-${
                            loan.paymentStatus === "paid"
                              ? "success"
                              : "warning"
                          }`}
                        >
                          {loan.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-success">
                          {loan.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex justify-center gap-3">
                          {/* View Button */}
                          <button
                            onClick={() => handleViewDetails(loan)}
                            className="btn bg-primary rounded-full text-secondary gap-2"
                            title="View Details"
                          >
                            <FaEye /> View
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
      <dialog id="approved_loan_details_modal" className="modal">
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
              {/* Personal Information */}
              <div className="bg-base-200/50 p-6 rounded-2xl">
                <h4 className="font-bold text-lg mb-4 text-base-content">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-base-content/60">Full Name</p>
                    <p className="font-semibold">
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

              {/* Loan Details */}
              <div className="bg-base-200/50 p-6 rounded-2xl">
                <h4 className="font-bold text-lg mb-4 text-base-content">
                  Loan Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-base-content/60">Loan Title</p>
                    <p className="font-semibold">{selectedLoan.loanTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Loan Amount</p>
                    <p className="font-semibold text-primary">
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
                      Payment Status
                    </p>
                    <p className="font-semibold">
                      {selectedLoan.paymentStatus}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-base-content/60">Reason</p>
                    <p className="font-semibold">{selectedLoan.reason}</p>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="bg-base-200/50 p-6 rounded-2xl">
                <h4 className="font-bold text-lg mb-4 text-base-content">
                  Financial Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-base-content/60">
                      Monthly Income
                    </p>
                    <p className="font-semibold">
                      ${selectedLoan.monthlyIncome}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">
                      Income Source
                    </p>
                    <p className="font-semibold">{selectedLoan.incomeSource}</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {selectedLoan.extraNotes && (
                <div className="bg-base-200/50 p-6 rounded-2xl">
                  <h4 className="font-bold text-lg mb-4 text-base-content">
                    Additional Notes
                  </h4>
                  <p className="text-base-content/80">
                    {selectedLoan.extraNotes}
                  </p>
                </div>
              )}

              {/* Application Date */}
              <div className="bg-base-200/50 p-6 rounded-2xl">
                <h4 className="font-bold text-lg mb-4 text-base-content">
                  Application Information
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
                    <p className="text-sm text-base-content/60">Status</p>
                    <p className="font-semibold">
                      <span className="badge badge-success text-white">
                        {selectedLoan.status}
                      </span>
                    </p>
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

export default ApprovedLoan;

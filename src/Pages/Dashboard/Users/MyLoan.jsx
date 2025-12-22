import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { motion } from "motion/react";
import {
  FaEye,
  FaMoneyBillWave,
  FaPlusCircle,
  FaTimesCircle,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import Loading from "../../Loading/Loading";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const MyLoan = () => {
  const { currentUser, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const { data: myLoan = [], refetch } = useQuery({
    queryKey: ["userEmail", currentUser?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/loanApplication?email=${currentUser?.email}`
      );
      return response.data;
    },
  });
  // console.log(myLoan);

  if (loading) {
    return <Loading></Loading>;
  }
  // cancel loan application
  const handleCancelLoan = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/loanApplication/${id}`, {
            currentStatus: "cancelled",
          })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Cancelled!",
                text: "Your Loan Application has been Cancelled.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            toast.error(err?.message);
          });
      }
    });
  };
  // apply loan application again

  const handleApplyLoan = async (id) => {
    try {
      const res = await axiosSecure.patch(`/loanApplication/${id}`, {
        currentStatus: "pending",
      });
      if (res.data.modifiedCount) {
        // console.log(res.data);
        toast.success("Loan Application Re-Submitted");
        refetch();
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    document.getElementById("my_loan_details_modal").showModal();
  };

  const handleViewPaymentDetails = (loan) => {
    axiosSecure
      .get(`/payment-info?transactionId=${loan.transactionId}`)
      .then((res) => {
        // console.log(res.data);
        setSelectedPayment(res.data);
        document.getElementById("payment_details_modal").showModal();
      })
      .catch((err) => {
        toast.error(err?.message);
        console.log(err);
      });
  };

  const handlePayLoan = async (loan) => {
    const paymentInfo = {
      loanId: loan._id,
      loanTitle: loan.loanTitle,
      amount: loan.applicationFee,
      customerEmail: loan.userEmail,
      paymentDate: new Date().toLocaleString(),
    };
    // console.log(paymentInfo);
    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );
      // console.log(res.data);
      window.location.assign(res.data.url);
    } catch (error) {
      console.log(error);
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
            Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-base-content">
            My Loan Applications
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg">
            Track the status of your loan requests and manage payments easily.
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
                  <th className="py-4">Loan Info</th>
                  <th className="py-4">Amount</th>
                  <th className="py-4 text-center">Status</th>
                  <th className="py-4 text-center">Payment status</th>
                  <th className="py-4 text-center rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="text-base">
                {myLoan.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-300 text-3xl font-bold"
                    >
                      You have no loan applications yet.
                    </td>
                  </tr>
                ) : (
                  myLoan.map((loan) => (
                    <tr
                      key={loan._id}
                      className="hover:bg-primary/10 transition-colors border-b border-base-200"
                    >
                      <td className="font-mono text-sm opacity-70">
                        {loan._id.slice(-6)}
                      </td>
                      <td>
                        <div className="font-bold text-lg text-base-content">
                          {loan.loanTitle || "General Loan"}
                        </div>
                        <div className="text-sm text-base-content/60">
                          {loan.applicationDate || "N/A"}
                        </div>
                      </td>
                      <td className="font-bold text-primary text-lg">
                        ${loan.loanAmount}
                      </td>
                      <td className="text-center">
                        <div
                          className={`badge  ${
                            loan.status === "approved"
                              ? "badge-success "
                              : loan.status === "rejected"
                              ? "badge-error"
                              : "badge-warning"
                          } gap-2 text-black px-4 py-3 font-medium`}
                        >
                          {loan.status || "pending"}
                        </div>
                      </td>
                      <td className="text-center">
                        <div
                          onClick={() =>
                            loan.paymentStatus === "paid" &&
                            handleViewPaymentDetails(loan)
                          }
                        >
                          <p
                            className={`badge text-secondary rounded-full ${
                              loan.paymentStatus === "paid"
                                ? "badge-success cursor-pointer hover:scale-105 transition-transform"
                                : "badge-error"
                            }`}
                          >
                            {loan.paymentStatus}
                          </p>
                          <p className="text-gray-400 text-sm cursor-pointer">
                            {loan.paymentStatus === "paid" && "View Details"}
                          </p>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {loan.status === "approved" &&
                            loan.paymentStatus === "unpaid" &&
                            "Pay you processing fee"}
                        </p>
                      </td>
                      <td>
                        <div className="flex justify-center gap-3">
                          {/* View Button */}
                          <button
                            onClick={() => handleViewDetails(loan)}
                            className="btn bg-primary text-secondary rounded-full gap-2"
                            title="View Details"
                          >
                            <FaEye /> View
                          </button>

                          {/* Pay Button - Only enabled if Approved and Unpaid */}
                          <button
                            onClick={() => handlePayLoan(loan)}
                            className={`btn ${
                              loan.status !== "approved" ||
                              loan.paymentStatus === "paid"
                                ? "bg-gray-400"
                                : "bg-green-600"
                            } rounded-full text-white gap-2`}
                            disabled={
                              loan.status !== "approved" ||
                              loan.paymentStatus === "paid"
                            }
                            title="Pay Loan"
                          >
                            <FaMoneyBillWave /> Pay
                          </button>

                          {/* Cancel Button - Only enabled if Pending */}
                          <button
                            onClick={() => handleCancelLoan(loan._id)}
                            className="btn bg-rose-500 rounded-full text-white gap-2"
                            disabled={loan.status === "pending"}
                            title="Cancel Application"
                          >
                            <FaTimesCircle /> Cancel
                          </button>
                          <button
                            onClick={() => handleApplyLoan(loan._id)}
                            className="btn bg-primary text-secondary rounded-full disabled:bg-gray-400 gap-2"
                            disabled={loan.status === "approved"}
                            title="Apply Application"
                          >
                            <FaPlusCircle /> Apply again
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
      <dialog id="my_loan_details_modal" className="modal">
        <div className="modal-box max-w-4xl bg-base-100">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl mb-6 text-primary">
            My Loan Application Details
          </h3>

          {selectedLoan && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-primary/10 p-6 rounded-2xl">
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
              <div className="bg-primary/10 p-6 rounded-2xl">
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
                      Application Fee
                    </p>
                    <p className="font-semibold">
                      ${selectedLoan.applicationFee}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-base-content/60">Reason</p>
                    <p className="font-semibold">{selectedLoan.reason}</p>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="bg-primary/10 p-6 rounded-2xl">
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
                <div className="bg-primary/10 p-6 rounded-2xl">
                  <h4 className="font-bold text-lg mb-4 text-base-content">
                    Additional Notes
                  </h4>
                  <p className="text-base-content/80 whitespace-pre-wrap">
                    {selectedLoan.extraNotes}
                  </p>
                </div>
              )}

              {/* Application Information */}
              <div className="bg-primary/10 p-6 rounded-2xl">
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
                    <p className="text-sm text-base-content/60">
                      Payment Status
                    </p>
                    <p className="font-semibold">
                      <span
                        className={`badge ${
                          selectedLoan.paymentStatus === "paid"
                            ? "badge-success"
                            : "badge-warning"
                        } text-secondary`}
                      >
                        {selectedLoan.paymentStatus}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Status</p>
                    <p className="font-semibold">
                      <span
                        className={`badge ${
                          selectedLoan.status === "Approved"
                            ? "badge-success"
                            : selectedLoan.status === "Rejected"
                            ? "badge-error"
                            : "badge-warning"
                        } text-white`}
                      >
                        {selectedLoan.status}
                      </span>
                    </p>
                  </div>
                  {/* if application status is approved and payment status is not paid */}
                  <div>
                    <p className="text-sm text-base-content/60">
                      Approved Date
                    </p>
                    {selectedLoan?.status === "approved" &&
                      selectedLoan?.approvedAt}
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

      {/* Modal for Payment Details */}
      <dialog id="payment_details_modal" className="modal">
        <div className="modal-box bg-accent">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl mb-6 text-primary flex items-center gap-2">
            <FaFileInvoiceDollar /> Payment Details
          </h3>

          {selectedPayment && (
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-xl">
                <p className="text-sm text-base-content/60">Transaction ID</p>
                <p className="font-mono font-bold break-all text-sm">
                  {selectedPayment.transactionId}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 p-4 rounded-xl">
                  <p className="text-sm text-base-content/60">Amount Paid</p>
                  <p className="font-bold text-xl text-primary">
                    ${selectedPayment.amount}{" "}
                    <span className="text-sm uppercase">
                      {selectedPayment.currency}
                    </span>
                  </p>
                </div>
                <div className="bg-primary/10 p-4 rounded-xl">
                  <p className="text-sm text-base-content/60">Payment Date</p>
                  <p className="font-bold text-sm">{selectedPayment.paidAt}</p>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-xl">
                <p className="text-sm text-base-content/60">Loan Title</p>
                <p className="font-bold">{selectedPayment.loanTitle}</p>
                <p className="text-xs text-base-content/40 mt-1">
                  Loan ID: {selectedPayment.loanId}
                </p>
              </div>

              <div className="bg-primary/10 p-4 rounded-xl">
                <p className="text-sm text-base-content/60">Customer Email</p>
                <p className="font-bold">{selectedPayment.customerEmail}</p>
              </div>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyLoan;

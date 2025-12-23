import React from "react";
import { motion } from "framer-motion"; // motion/react change kore framer-motion use kora safe
import { FaCheckCircle, FaPercentage, FaDollarSign, FaRegCalendarAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

const LoanDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: loanData = {}, isLoading } = useQuery({
    queryKey: ["loanData", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/loans/all-loans/${id}`);
      return response.data;
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen py-20 flex items-center justify-center jost px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-accent rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2"
      >
        {/* Left Side - Image with Navy Blue & Light Green Badge */}
        <div className="relative flex flex-col justify-center items-center bg-slate-900 p-8 lg:p-12 overflow-hidden min-h-[400px]">
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="z-10 w-full relative"
          >
            <img
              src={loanData.image || (loanData.images && loanData.images[0])}
              alt={loanData.loanTitle}
              className="w-full h-[350px] object-cover rounded-2xl border-4 border-white/10 shadow-2xl"
            />

            {/* Navy Blue & Light Green Title Badge (Requested) */}
            <div className="absolute -bottom-4 -left-4 -right-4 bg-[#001f3f] border-l-8 border-[#90EE90] p-6 shadow-2xl rounded-xl">
              <h2 className="text-[#90EE90] text-2xl md:text-3xl font-bold uppercase tracking-wide">
                {loanData.loanTitle || loanData.title}
              </h2>
              <p className="text-white/60 text-sm mt-1">Premium Financial Product</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Loan Details */}
        <div className="p-10 md:p-14 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-primary bg-primary/10 w-fit px-4 py-1 rounded-full mb-3">
              <BiCategory className="text-lg" />
              <span className="font-bold text-sm uppercase">{loanData.category || "Loan Service"}</span>
            </div>
            <h1 className="text-4xl font-black text-slate-800 leading-tight">
              Get {loanData.loanTitle || loanData.title} Today
            </h1>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8 text-lg">
            {loanData.description}
          </p>

          {/* Key Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Interest Rate */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-2 text-slate-500">
                <FaPercentage className="text-primary" />
                <span className="font-bold text-xs uppercase tracking-wider">Interest Rate</span>
              </div>
              <p className="text-3xl font-black text-primary">
                {loanData.interestRate || loanData.interest}%
              </p>
            </div>

            {/* Max Limit */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-2 text-slate-500">
                <FaDollarSign className="text-secondary" />
                <span className="font-bold text-xs uppercase tracking-wider">Max Credit Limit</span>
              </div>
              <p className="text-3xl font-black text-slate-800">
                ${(loanData.maxLoanLimit || loanData.maxLimit)?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* EMI Plans Section */}
          <div className="mb-8">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FaRegCalendarAlt className="text-primary" />
              Available Repayment Plans
            </h3>
            <div className="flex flex-wrap gap-2">
              {/* Checking if emiPlans is string or array */}
              {Array.isArray(loanData.emiPlans) ? (
                loanData.emiPlans.map((plan, index) => (
                  <span key={index} className="bg-primary/5 text-primary border border-primary/20 px-4 py-2 rounded-lg font-bold text-sm">
                    {plan} Months
                  </span>
                ))
              ) : (
                <span className="bg-primary/5 text-primary border border-primary/20 px-4 py-2 rounded-lg font-bold text-sm">
                  {loanData.emiPlans || loanData.duration || "Flexible"} Months
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to={"/loan-form"}
              state={loanData}
              className="btn btn-primary w-full h-16 text-lg font-bold rounded-xl shadow-xl shadow-primary/20"
            >
              Apply for this Loan
            </Link>
            <p className="text-center text-xs text-slate-400 font-medium italic">
              * Subject to terms and conditions based on your credit profile.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoanDetails;
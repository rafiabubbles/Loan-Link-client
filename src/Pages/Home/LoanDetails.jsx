import React, { useEffect } from "react";
import { motion } from "motion/react";
import { FaCheckCircle, FaPercentage, FaDollarSign } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

const LoanDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: loanData = [] } = useQuery({
    queryKey: ["loanData", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/loans/all-loans/${id}`);
      return response.data;
    },
  });

  // console.log(id, loanData);

  return (
    <div className="min-h-screen py-20 flex items-center justify-center jost">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-accent rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2"
      >
        {/* Left Side - Gradient Background with Loan Image */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-linear-to-br from-primary to-black text-white p-12 relative overflow-hidden">
          {/* Abstract Background Shapes - Similar to login page */}
          <div className="absolute top-0 left-0 w-full h-full opacity-70 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

          {/* Loan Image */}
          <div className="z-10 relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
            >
              <img
                src={loanData.image}
                alt={loanData.loanTitle}
                className="w-full h-auto object-cover"
              />
            </motion.div>

            {/* Decorative Badge */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-secondary text-primary px-6 py-3 rounded-full shadow-lg font-bold text-lg"
            >
              Featured Loan
            </motion.div>
          </div>
        </div>

        {/* Right Side - Loan Details */}
        <div className="p-10 md:p-14 flex flex-col justify-center">
          {/* Mobile Image - Shown only on small screens */}
          <div className="lg:hidden mb-8">
            <img
              src={loanData.image}
              alt={loanData.loanTitle}
              className="w-full h-auto object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Loan Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-4xl font-bold text-primary mb-2">
              {loanData.loanTitle}
            </h1>
            <div className="flex items-center gap-2 text-base-content/60">
              <BiCategory className="text-xl" />
              <span className="font-medium">{loanData.category}</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <p className="text-base-content/80 leading-relaxed">
              {loanData.description}
            </p>
          </motion.div>

          {/* Key Information Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          >
            {/* Interest Rate */}
            <div className="bg-base-100 p-5 rounded-2xl border border-base-300 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaPercentage className="text-primary text-lg" />
                </div>
                <h3 className="font-bold text-base-content/70 text-sm">
                  Interest Rate
                </h3>
              </div>
              <p className="text-3xl font-bold text-primary">
                {loanData.interestRate}%
              </p>
            </div>

            {/* Max Limit */}
            <div className="bg-base-100 p-5 rounded-2xl border border-base-300 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <FaDollarSign className=" text-lg" />
                </div>
                <h3 className="font-bold text-base-content/70 text-sm">
                  Max Limit
                </h3>
              </div>
              <p className="text-3xl font-bold">${loanData.maxLoanLimit}</p>
            </div>
          </motion.div>

          {/* EMI Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FaCheckCircle className="text-primary" />
              Available EMI Plans
            </h3>
            <div className="grid grid-cols-2 gap-3">{loanData?.emiPlans}</div>
          </motion.div>

          {/* Apply Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              to={"/loan-form"}
              state={loanData}
              className="btn-main w-full shadow-lg shadow-primary/30 text-lg"
            >
              Apply Now
            </Link>
            <p className="text-center text-sm text-base-content/50 mt-3">
              Quick approval • Flexible terms • No hidden fees
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoanDetails;

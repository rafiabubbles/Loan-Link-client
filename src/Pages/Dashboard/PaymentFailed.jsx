import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  FaTimes,
  FaHome,
  FaRedoAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden rounded-4xl">
      {/* Background Blobs (Red Theme) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-error/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="max-w-md w-full bg-base-100 rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center relative z-10 border border-base-200"
      >
        {/* Animated Error Icon */}
        <div className="mb-8 relative flex justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center shadow-lg shadow-error/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <FaTimes className="text-error text-5xl" />
            </motion.div>
          </motion.div>

          {/* Warning Icon Floating */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-10 text-warning text-3xl"
          >
            <FaExclamationTriangle />
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-error mb-2">Payment Failed</h2>
          <p className="text-base-content/60 mb-8">
            Oops! Something went wrong with your transaction. Please try again
            or contact support.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-3"
        >
          <Link
            to="/dashboard/my-loan"
            className="btn btn-error text-white rounded-full w-full shadow-lg shadow-error/25"
          >
            <FaRedoAlt /> Try Again
          </Link>
          <Link to="/contact" className="btn btn-ghost rounded-full w-full">
            Contact Support
          </Link>
          <Link
            to="/dashboard/home"
            className="btn btn-link text-base-content/50 no-underline hover:text-base-content"
          >
            <FaHome /> Back to Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;

/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 jost p-4">
      <div className="text-center">
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-9xl font-bold text-primary"
        >
          404
        </motion.h1>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-4xl font-semibold mt-4 text-base-content">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-base-content/70 mt-4 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <div className="mt-8">
            <Link to="/" className="btn-main px-8 text-lg">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Error;

import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { FaCheck, FaHome, FaArrowRight } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (sessionId && mounted) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          // console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [sessionId, axiosSecure, mounted]);

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden rounded-4xl arimo">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-success/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        className="max-w-md w-full bg-base-100 rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center relative z-10 border border-base-200"
      >
        {/* Animated Checkmark */}
        <div className="mb-8 relative flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-success rounded-full flex items-center justify-center shadow-lg shadow-success/40"
          >
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <FaCheck className="text-white text-4xl" />
            </motion.div>
          </motion.div>

          {/* Confetti / Sparkles (CSS/Motion based) */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: Math.cos(i * 45 * (Math.PI / 180)) * 60,
                y: Math.sin(i * 45 * (Math.PI / 180)) * 60,
              }}
              transition={{
                delay: 0.4,
                duration: 1,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-warning rounded-full"
            />
          ))}
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-success mb-2">
            Payment Successful!
          </h2>
          <p className="text-base-content/60 mb-6">
            Thank you for your payment. Your transaction has been completed
            successfully.
          </p>
        </motion.div>

        {/* Transaction Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-accent p-4 rounded-xl mb-8 border border-base-200"
        >
          <p className="text-base-content/50 uppercase tracking-widest text-xs font-bold mb-1">
            Transaction ID
          </p>
          <p className="font-mono text-lg font-semibold text-primary">
            {paymentInfo?.transactionId?.slice(-24)}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col gap-3"
        >
          <Link
            to="/dashboard/my-loan"
            className="btn btn-primary rounded-full w-full shadow-lg shadow-primary/25"
          >
            View My Loans <FaArrowRight />
          </Link>
          <Link
            to="/dashboard"
            className="btn btn-ghost rounded-full w-full"
          >
            <FaHome /> Back to Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;

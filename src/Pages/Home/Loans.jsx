import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoanCard from "../../Components/LoanCard";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Loans = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const axiosSecure = useAxiosSecure();

  const {
    data: loansData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loans", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true, // Keep showing old data while fetching new page
  });

  // Handle both array response (old backend) and object response (new backend)
  let loans = [];
  if (Array.isArray(loansData)) {
    // Fallback: Client-side pagination if backend is not updated yet
    const total = loansData.length;
    const calculatedTotalPages = Math.ceil(total / limit);

    // Update total pages only if it changed to avoid infinite loop
    if (totalPages !== calculatedTotalPages && calculatedTotalPages > 0) {
      setTotalPages(calculatedTotalPages);
    }

    // Slice data for current page
    const startIndex = (page - 1) * limit;
    loans = loansData.slice(startIndex, startIndex + limit);
  } else {
    // Server-side pagination (New backend)
    loans = loansData.loans || [];
    if (loansData.totalPages && totalPages !== loansData.totalPages) {
      setTotalPages(loansData.totalPages);
    }
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  // Pagination Handlers
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden jost rounded-4xl">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-primary/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[35%] bg-secondary/50 rounded-full blur-[120px]"></div>
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 pt-10 pb-12 px-6"
      >
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary font-bold tracking-widest uppercase text-sm"
          >
            Explore Opportunities
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mt-4 mb-6 text-primary"
          >
            All Available Loans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base-content/70 text-lg"
          >
            Browse through our comprehensive collection of loan options tailored
            to meet your financial goals and aspirations.
          </motion.p>
        </div>
      </motion.section>

      {/* Loans Grid */}
      <section className="relative pb-15  container mx-auto px-6">
        {loans.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-7xl pt-40 font-bold text-primary/10">
              No loans available
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loans.map((loan) => (
                <LoanCard loan={loan} key={loan._id} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center items-center gap-6 mt-16 pb-10"
              >
                <button
                  onClick={handlePrev}
                  disabled={page === 1}
                  className="btn btn-circle btn-outline border-base-content/20 hover:bg-primary hover:border-primary hover:text-white transition-all disabled:opacity-20 disabled:border-base-content/10"
                  title="Previous Page"
                >
                  <FaChevronLeft />
                </button>

                <div className="join shadow-sm bg-base-100 rounded-full p-1 border border-base-content/5">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`join-item btn ${
                        page === i + 1
                          ? "btn-primary rounded-full"
                          : "btn-ghost rounded-full"
                      } transition-all duration-300 font-medium`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className="btn btn-circle btn-outline border-base-content/20 hover:bg-primary hover:border-primary hover:text-white transition-all disabled:opacity-20 disabled:border-base-content/10"
                  title="Next Page"
                >
                  <FaChevronRight />
                </button>
              </motion.div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Loans;

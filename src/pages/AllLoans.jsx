import React, { useEffect, useState } from "react";
import api from "../api/axios";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AllLoans() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                setLoading(true);
                const res = await api.get("/api/loans");
                // ensure data
                setLoans(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Error fetching loans:", err);
                Swal.fire("Error", "Failed to load loan list. Please try again later.", "error");
                setLoans([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLoans();
    }, []);

    if (loading) return <LoadingSpinner />;

    // if no data load (No Loans Found)
    if (loans.length === 0) {
        return (
            <div className="text-center py-20 bg-white min-h-[50vh]">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6M17 17H7a2 2 0 01-2-2v-4a2 2 0 012-2h4V5a2 2 0 012-2h2a2 2 0 012 2v4h4a2 2 0 012 2v4a2 2 0 01-2 2z" />
                </svg>
                <h2 className="text-3xl font-bold text-gray-700 mt-4 mb-2">No Loan Products Found</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                    We currently do not have any loan products available. Please check back later or contact our support team for assistance.
                </p>
            </div>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <h2 className="text-4xl font-extrabold mb-4 text-center text-gray-800">
                    Explore All Available Loans
                </h2>
                <p className="text-center text-lg text-gray-500 mb-12">
                    Find the perfect loan product that fits your needs. Click "View Details" to learn more.
                </p>

                {/* Grid Layout (Loan Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loans.map(loan => (
                        <div
                            key={loan._id}
                            className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {/* 1. Loan Image */}
                            <figure className="h-48 overflow-hidden">
                                <img
                                    src={loan.images?.[0] || "https://via.placeholder.com/600x400?text=Loan+Product"}
                                    alt={loan.title}
                                    className="w-full h-full object-cover transition duration-500 hover:scale-[1.05]"
                                />
                            </figure>

                            {/* 2. Card Body and Details */}
                            <div className="p-6">
                                {/* Category Tag */}
                                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                                    {loan.category || "General Purpose"}
                                </span>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 truncate">
                                    {loan.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-sm mb-4 min-h-[40px] line-clamp-2">
                                    {loan.description?.slice(0, 100)}...
                                </p>

                                {/* Key Details Grid (Interest & Max Limit) */}
                                <div className="flex justify-between items-center py-3 border-t border-b border-gray-100 mb-4">
                                    <div className="text-center flex-1 border-r border-gray-100">
                                        <p className="text-xl font-extrabold text-red-600">
                                            {loan.interest ? `${loan.interest}%` : 'N/A'}
                                        </p>
                                        <p className="text-xs text-gray-500 font-medium">Interest Rate</p>
                                    </div>

                                    <div className="text-center flex-1">
                                        <p className="text-xl font-extrabold text-green-600">
                                            {typeof loan.maxLimit === 'number' ?
                                                `BDT ${loan.maxLimit.toLocaleString()}` :
                                                'N/A'}
                                        </p>
                                        <p className="text-xs text-gray-500 font-medium">Max Limit</p>
                                    </div>
                                </div>

                                {/* View Details Button */}
                                <div className="text-center">
                                    <Link
                                        to={`/loan/${loan._id}`}
                                        className="w-full inline-block py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 shadow-md text-center"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
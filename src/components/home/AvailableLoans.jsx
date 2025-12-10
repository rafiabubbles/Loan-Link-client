import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../shared/LoadingSpinner";

export default function AvailableLoans() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const res = await api.get("/api/loans");
                setLoans(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (

        <section className="py-12">
            <div className="max-w-6xl mx-auto px-6">


                <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-900">Available Loans</h2>

                {/* Grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loans.slice(0, 6).map((loan) => (
                        // Card styling: added hover effect and slightly refined shadow
                        <div
                            key={loan._id}
                            className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden border border-gray-200"
                        >
                            {/* Figure for Image */}
                            <figure className="h-48 overflow-hidden">
                                <img
                                    src={loan.images?.[0] || "https://via.placeholder.com/600x400?text=Loan+Image"}
                                    alt={loan.title}
                                    className="object-cover h-full w-full transition duration-300 hover:scale-[1.02]"
                                />
                            </figure>

                            {/* Card Body */}
                            <div className="card-body p-5">
                                <h3 className="card-title text-2xl font-bold text-gray-800 mb-2">{loan.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{loan.description?.slice(0, 90)}...</p>

                                <div className="flex justify-between items-end border-t pt-3">
                                    {/* Loan Details */}
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-gray-700">
                                            Interest: <span className="font-semibold text-red-600">{loan.interest}%</span>
                                        </p>
                                        <p className="text-sm font-medium text-gray-700">
                                            Max Limit: <span className="font-semibold text-green-700">{loan.maxLimit}</span>
                                        </p>
                                    </div>

                                    {/* View Details Button */}
                                    <div>
                                        <Link
                                            to={`/loan/${loan._id}`}

                                            className="btn btn-sm bg-green-500 text-white font-semibold py-2 px-4 rounded-lg 
                                                       hover:bg-green-600 transition duration-200 shadow-md"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
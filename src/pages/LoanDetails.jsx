import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import AuthContext from '/src/context/AuthContext.jsx';
import Swal from "sweetalert2";

export default function LoanDetails() {
    const { id } = useParams();
    // লোনের ডেটা স্টেট, EMI প্ল্যান যুক্ত করা হয়েছে
    const [loan, setLoan] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // ডেটা ফেচ করার লজিক
    useEffect(() => {
        const fetchLoanDetails = async () => {
            try {
                setLoading(true);
                // API কল: লোনের ডেটা লোড করা হচ্ছে
                const res = await api.get(`/api/loans/${id}`);
                // ডেটার কাঠামো পরিবর্তন: EMI প্ল্যান ধরে নিচ্ছি res.data.emiPlans এ আছে
                setLoan(res.data);
            } catch (err) {
                console.error("Error fetching loan details:", err);
                Swal.fire("Error", "Could not load loan details.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchLoanDetails();
    }, [id]);

    // Apply Now বাটন ক্লিক হ্যান্ডলার
    const handleApply = () => {
        // 1. অথেন্টিকেশন চেক
        if (!user) {
            Swal.fire({
                title: "Login Required",
                text: "You need to log in to apply for a loan.",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Go to Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
            return;
        }

        // 2. রোল ভিত্তিক সীমাবদ্ধতা
        if (user.role === "admin" || user.role === "manager") {
            return Swal.fire("Access Denied", "Admins and managers cannot apply for loans.", "warning");
        }

        // 3. ড্যাশবোর্ডে নেভিগেট করুন (অ্যাপ্লাই স্ট্যাটাস সহ)
        navigate(`/loan-application`, { state: { applyLoanId: id } });
    };

    // লোডিং স্টেট
    if (loading) return <LoadingSpinner />;

    // লোন খুঁজে না পেলে
    if (!loan) return (
        <div className="container mx-auto p-4 text-center">
            <div className="alert alert-error shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Error! Loan details not found.</span>
                </div>
            </div>
        </div>
    );

    // ✅ মূল ডিজাইন
    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="card lg:card-side bg-base-100 shadow-xl border border-base-200">

                {/* ➡️ লোনের ছবি অংশ */}
                <figure className="lg:w-1/2 w-full">
                    <img
                        src={loan.images?.[0] || "https://via.placeholder.com/800x450?text=Loan+Image+Unavailable"}
                        alt={loan.title}
                        className="w-full h-96 object-cover lg:rounded-l-2xl lg:rounded-tr-none rounded-t-2xl"
                    />
                </figure>

                {/* ➡️ লোনের বিবরণ অংশ */}
                <div className="card-body lg:w-1/2 p-6 md:p-10">

                    {/* শিরোনাম ও বিভাগ */}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">{loan.title}</h1>
                    <div className="badge badge-lg badge-outline badge-secondary font-semibold mb-4">
                        Category: {loan.category || "General"}
                    </div>

                    {/* মূল তথ্য */}
                    <div className="space-y-4">
                        <p className="text-base text-gray-700 leading-relaxed">{loan.description}</p>

                        <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 pt-4 border-t">
                            <div className="stat p-0">
                                <div className="stat-figure text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </div>
                                <div className="stat-title">Interest Rate</div>
                                <div className="stat-value text-secondary">{loan.interest}%</div>
                                <div className="stat-desc">Per Annum</div>
                            </div>

                            <div className="stat p-0">
                                <div className="stat-figure text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 4v4m0 4v2"></path></svg>
                                </div>
                                <div className="stat-title">Maximum Limit</div>
                                <div className="stat-value text-primary">${loan.maxLimit?.toLocaleString() || "N/A"}</div>
                                <div className="stat-desc">The maximum loan amount</div>
                            </div>
                        </div>
                    </div>

                    {/* ➡️ EMI প্ল্যান (যদি ডেটাতে থাকে) */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-3 border-b pb-1">Available EMI Plans</h3>

                        {(loan.emiPlans && loan.emiPlans.length > 0) ? (
                            <ul className="list-disc list-inside space-y-2">
                                {loan.emiPlans.map((plan, index) => (
                                    <li key={index} className="text-sm">
                                        <span className="font-medium text-info">{plan.duration}</span> months with an installment of <span className="font-bold">${plan.installment?.toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="alert alert-info shadow-lg p-3">
                                <span>Contact us for custom EMI plans.</span>
                            </div>
                        )}
                    </div>

                    {/* ➡️ Apply Now বাটন */}
                    <div className="card-actions justify-end mt-8">
                        <button className="btn btn-primary btn-lg w-full" onClick={handleApply}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6M17 17H7a2 2 0 01-2-2v-4a2 2 0 012-2h4V5a2 2 0 012-2h2a2 2 0 012 2v4h4a2 2 0 012 2v4a2 2 0 01-2 2z" /></svg>
                            Apply Now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
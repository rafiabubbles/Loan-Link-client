import React, { useEffect, useState, useContext } from "react"; // 💡 useContext ইমপোর্ট করা হয়েছে
import api from "../../../api/axios";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
// Modal দেখানোর জন্য ইমপোর্ট
import PaymentDetailsModal from "./PaymentDetailsModal";
import AuthContext from '../../../context/AuthContext'; // 💡 AuthContext ইমপোর্ট করা হয়েছে

export default function MyLoans() {
    const { updateLoanCount } = useContext(AuthContext); // 💡 ফাংশনটি নেওয়া হলো
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/loan-applications/my-loans");
            const fetchedApps = res.data;
            setApps(fetchedApps);

            // ✅ MyLoans কম্পোনেন্ট থেকে লোনের সংখ্যা Context এ পাঠানো
            updateLoanCount(fetchedApps.length);

        } catch (err) {
            console.error("Error fetching loan applications:", err);
            updateLoanCount(0); // এরর হলে 0 সেট করুন
        } finally {
            setLoading(false);
        }
    };

    // 💡 ১. বিকাশ ম্যানুয়াল পেমেন্ট এবং TrxID সাবমিশনের ফাংশন
    const handlePayFee = (application) => {
        Swal.fire({
            title: 'Complete Payment via bKash',
            html: `
                <div style="text-align: left; font-size: 0.95rem;">
                    <p>Application Fee: <strong style="color: green;">BDT 100.00</strong> (Fixed)</p>
                    <p>1. Please send <strong style="color: green;">Pending loans with application Fee </strong> to the following bKash Merchant Number (Charge Applicable):</p>
                    <h3 style="color: #E2136E; font-size: 1.5em; font-weight: bold; margin: 10px 0;">01XXXXXXXXX</h3> 
                    <p>2. After successful transfer, enter the **Transaction ID (TrxID)** below for verification:</p>
                    <input id="swal-input-trxid" class="swal2-input" placeholder="Enter bKash TrxID (e.g., 8V5L6ZAB)">
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Verify & Confirm Payment',
            preConfirm: () => {
                const trxId = Swal.getPopup().querySelector('#swal-input-trxid').value;
                if (!trxId || trxId.length < 8) {
                    Swal.showValidationMessage(`Please enter a valid bKash Transaction ID`);
                }
                return trxId;
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const trxId = result.value;
                try {
                    // ব্যাকএন্ডে TrxID সহ রিকোয়েস্ট পাঠানো (রুট: /api/loan-applications/verify-payment)
                    await api.post('/api/loan-applications/verify-payment', {
                        applicationId: application._id,
                        trxId: trxId,
                        amount: 100, // BDT
                    });

                    Swal.fire('Success!', 'Your payment details have been submitted for verification. Fee status will be updated after manual check.', 'success');
                    fetchApplications(); // ডেটা রিফ্রেশ করুন

                } catch (error) {
                    console.error('Payment Verification Error:', error);
                    Swal.fire('Error', 'Failed to submit TrxID. Please try again later.', 'error');
                }
            }
        });
    };

    // 💡 ২. 'Paid' ব্যাজ ক্লিক করলে পেমেন্ট ডিটেইলস দেখানোর ফাংশন (আগের মতোই)
    const handleViewPayment = (application) => {
        // এখানে পেমেন্ট ডিটেইলস দেখানোর জন্য অ্যাপ্লিকেশন অবজেক্ট থেকে ডেটা ব্যবহার করা হচ্ছে।
        // (যদি আপনার মডেলে paymentDetails অবজেক্ট সেভ করা থাকে, তবে সেটি ব্যবহার করুন)

        setSelectedPayment({
            email: application.userEmail,
            transactionId: application.paymentDetails?.transactionId || 'N/A (Demo)', // 💡 বাস্তব ডেটা দিন
            loanId: application.loanId,
            applicationId: application._id,
            amount: application.paymentDetails?.amount || 100, // BDT 100
            date: application.paymentDetails?.submissionDate || new Date().toLocaleDateString(),
        });
        setIsModalOpen(true);
    };

    // 💡 ৩. ক্যানসেল ফাংশন (আগের মতোই)
    const handleCancel = (appId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to cancel this pending application?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.put(`/api/loan-applications/${appId}/status`, { status: "Canceled" });
                    Swal.fire('Canceled!', 'Your application has been canceled.', 'success');
                    fetchApplications();
                } catch (error) {
                    Swal.fire('Error', 'Failed to cancel the application.', 'error');
                }
            }
        });
    };

    // ----------------------------------------------------
    // রেন্ডারিং লজিক
    // ----------------------------------------------------

    useEffect(() => {
        fetchApplications();
    }, []);

    if (loading) return <LoadingSpinner />;

    if (apps.length === 0) {
        return <div className="p-4 text-center text-gray-500">You have no loan applications yet.</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">📋 My Loan Applications</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Loan ID</th>
                            <th className="py-3 px-6 text-left">Loan Info</th>
                            <th className="py-3 px-6 text-left">Amount</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">Fee Status</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {apps.map(a => (
                            <tr key={a._id} className="border-b border-gray-200 hover:bg-gray-50">
                                {/* Loan ID */}
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <span className="font-medium">{a._id.slice(0, 6)}...</span>
                                </td>

                                {/* Loan Info */}
                                <td className="py-3 px-6 text-left">
                                    <div className="font-semibold">{a.loanTitle || "N/A"}</div>
                                    <div className="text-xs text-gray-500">Interest: {a.interestRate}%</div>
                                </td>

                                {/* Amount */}
                                <td className="py-3 px-6 text-left font-medium">
                                    BDT {a.loanAmount?.toLocaleString() || 'N/A'}
                                </td>

                                {/* Status */}
                                <td className="py-3 px-6 text-center">
                                    <span className={`py-1 px-3 rounded-full text-xs font-semibold ${a.status === 'Pending' ? 'bg-yellow-200 text-yellow-700' :
                                        a.status === 'Approved' ? 'bg-green-200 text-green-700' :
                                            'bg-red-200 text-red-700'
                                        }`}>
                                        {a.status}
                                    </span>
                                </td>

                                {/* Fee Status (Paid/Unpaid/Verification Pending) */}
                                <td className="py-3 px-6 text-center">
                                    {a.applicationFeeStatus === 'Paid' ? (
                                        <button
                                            onClick={() => handleViewPayment(a)}
                                            className="bg-green-100 text-green-600 py-1 px-3 rounded-full text-xs font-semibold hover:bg-green-200 transition"
                                        >
                                            Paid (View)
                                        </button>
                                    ) : a.applicationFeeStatus === 'Verification Pending' ? (
                                        <span className="bg-orange-100 text-orange-600 py-1 px-3 rounded-full text-xs font-semibold">
                                            Verifying
                                        </span>
                                    ) : (
                                        <span className="bg-red-100 text-red-600 py-1 px-3 rounded-full text-xs font-semibold">
                                            Unpaid
                                        </span>
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center space-x-2">

                                        <Link to={`/loan/${a.loanId._id}`} className="btn btn-xs btn-info text-white">

                                            View
                                        </Link>

                                        {a.status === "Pending" && (
                                            <button
                                                onClick={() => handleCancel(a._id)}
                                                className="btn btn-xs btn-error text-white"
                                            >
                                                Cancel
                                            </button>
                                        )}

                                        {/* Pay Button (Only if Unpaid) */}
                                        {a.applicationFeeStatus === "Unpaid" && (
                                            <button
                                                onClick={() => handlePayFee(a)}
                                                className="btn btn-xs btn-success text-white"
                                            >
                                                Pay Fee
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Payment Details Modal */}
            <PaymentDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                paymentDetails={selectedPayment}
            />

        </div>
    );
}
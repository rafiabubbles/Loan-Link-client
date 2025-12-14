// src/components/dashboard/Borrower/PaymentDetailsModal.jsx

import React from 'react';

export default function PaymentDetailsModal({ isOpen, onClose, paymentDetails }) {
    // যদি Modal খোলা না থাকে, তবে null রিটার্ন করুন
    if (!isOpen) return null;

    // paymentDetails না থাকলে একটি সতর্কতা দেখান
    if (!paymentDetails) {
        return (
            <div className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-600">Error!</h3>
                    <p className="py-4">No payment details available.</p>
                    <div className="modal-action">
                        <button className="btn" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        );
    }

    // 💡 Modal রেন্ডার করুন
    return (
        // DaisyUI modal ক্লাস
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-2xl text-green-600 mb-4 flex items-center">
                    Payment Receipt Details
                </h3>

                <div className="space-y-3 p-2 border rounded-lg bg-gray-50">

                    {/* Transaction ID */}
                    <p className="text-sm">
                        <span className="font-semibold text-gray-700 w-36 inline-block">Transaction ID:</span>
                        <span className="break-all text-blue-600">{paymentDetails.transactionId}</span>
                    </p>

                    {/* Application ID */}
                    <p className="text-sm">
                        <span className="font-semibold text-gray-700 w-36 inline-block">Application ID:</span>
                        <span className="break-all">{paymentDetails.applicationId}</span>
                    </p>

                    {/* Email */}
                    <p className="text-sm">
                        <span className="font-semibold text-gray-700 w-36 inline-block">Email:</span>
                        {paymentDetails.email}
                    </p>

                    {/* Amount */}
                    <p className="text-sm">
                        <span className="font-semibold text-gray-700 w-36 inline-block">Amount Paid:</span>
                        <span className="text-lg font-bold text-green-700">${paymentDetails.amount.toFixed(2)}</span>
                    </p>

                    {/* Date */}
                    <p className="text-sm">
                        <span className="font-semibold text-gray-700 w-36 inline-block">Payment Date:</span>
                        {paymentDetails.date}
                    </p>

                </div>

                <div className="modal-action">
                    <button className="btn btn-primary" onClick={onClose}>Close</button>
                </div>
            </div>
            {/* Modal এর বাইরে ক্লিক করলে বন্ধ করার জন্য ব্যাকড্রপ */}
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
}
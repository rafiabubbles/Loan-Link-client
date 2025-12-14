import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '/src/context/AuthContext.jsx'; // 💡 AuthContext থেকে loanCount নিতে হবে
import Swal from 'sweetalert2';

export default function MyProfile() {
    // 💡 AuthContext থেকে loanCount স্টেটটি নেওয়া হলো
    const { user, logout, loanCount } = useContext(AuthContext);
    const navigate = useNavigate();

    // 💡 ফাংশন: ইমেইল থেকে প্রথম নামটি বের করা
    const getDefaultName = (email) => {
        if (!email) return "User";
        const localPart = email.split('@')[0];
        return localPart.split(/[\._]/)[0].charAt(0).toUpperCase() + localPart.split(/[\._]/)[0].slice(1);
    };

    // 💡 লোন অ্যাপ্লিকেশনের সংখ্যা গণনা:
    // এখন এই লাইনটির দরকার নেই, কারণ loanCount সরাসরি context থেকে আসছে।
    // const loanCount = user?.loanApplications?.length || 0; 

    // ----------------------------------------------------
    // লগআউট হ্যান্ডলার
    // ----------------------------------------------------
    const handleLogout = () => {
        // ... (SweetAlert লজিক)
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out from your account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, log me out!'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                Swal.fire(
                    'Logged Out!',
                    'You have been successfully logged out.',
                    'success'
                );
                navigate("/login");
            }
        });
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-40">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 max-w-2xl mx-auto">

            <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-primary pb-3">
                    👋 Welcome, {getDefaultName(user.email)}!
                </h2>

                {/* ➡️ প্রোফাইল তথ্য (হরাইজন্টাল লাইন ছাড়া) */}
                <div className="space-y-5 text-gray-700">

                    {/* 1. Default Name */}
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <strong className="font-semibold text-lg text-gray-800">Default Name:</strong>
                        <span className="text-lg font-medium">{getDefaultName(user.email)}</span>
                    </div>

                    {/* 2. Email */}
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <strong className="font-semibold text-lg text-gray-800">Email:</strong>
                        <span className="text-lg font-medium">{user.email}</span>
                    </div>

                    {/* 3. Role */}
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <strong className="font-semibold text-lg text-gray-800">Role:</strong>
                        <span className={`px-3 py-1 rounded-full text-md font-bold ${user.role === 'admin' ? 'bg-red-100 text-red-600' : user.role === 'manager' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                            {user.role}
                        </span>
                    </div>

                    {/* 4. Loan Count (শুধুমাত্র Borrower হলে দেখানো হবে) */}
                    {user.role === 'borrower' && (
                        <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                            <strong className="font-semibold text-lg text-gray-800">Total Loans Applied:</strong>
                            {/* ✅ MyLoans থেকে আসা loanCount দেখানো হচ্ছে */}
                            <span className="text-xl font-extrabold text-indigo-700">{loanCount}</span>
                        </div>
                    )}

                </div>

                {/* ➡️ লগআউট বাটন */}
                <div className="mt-8 pt-4">
                    <button
                        onClick={handleLogout}
                        className="btn btn-error text-white w-full btn-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}
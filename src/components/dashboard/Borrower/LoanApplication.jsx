import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../../api/axios';
import AuthContext from '../../../context/AuthContext';

export default function LoanApplicationForm() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // LoanDetails 
    const applyLoanId = location.state?.applyLoanId;

    // Loan data (from api fetch)
    const [loanData, setLoanData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // form data state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        nationalId: '',
        incomeSource: '',
        monthlyIncome: '',
        loanAmount: '',
        reasonForLoan: '',
        address: '',
        extraNotes: '',
    });

    // 1. loan data fetch and read only
    useEffect(() => {
        // if no id 
        if (!applyLoanId) {
            Swal.fire('Error', 'No loan selected for application.', 'error');
            navigate('/all-loans', { replace: true });
            return;
        }

        const fetchLoanDetails = async () => {
            try {
                const res = await api.get(`/api/loans/${applyLoanId}`);
                setLoanData(res.data);
            } catch (err) {
                console.error("Error fetching loan details:", err);
                Swal.fire('Error', 'Failed to load loan details for the application.', 'error');
                navigate('/all-loans', { replace: true });
            } finally {
                setLoading(false);
            }
        };

        // if no user, back them to log in 
        if (!user) {
            navigate('/login', { state: { from: location } });
        } else {
            fetchLoanDetails();
        }
    }, [applyLoanId, navigate, user, location]);


    // 2.input changing handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 3. form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!loanData) {
            Swal.fire('Error', 'Loan details missing.', 'error');
            setSubmitting(false);
            return;
        }

        // final data package
        const applicationData = {
            ...formData,
            // Auto field and read only data 
            userEmail: user.email,
            loanTitle: loanData.title,
            interestRate: loanData.interest,
            loanId: applyLoanId, // to identify backend

            //default backend 
            status: 'Pending',
            applicationFeeStatus: 'Unpaid',
        };

        try {
            // API call: Loan Application Collection এ ডেটা সংরক্ষণ
            await api.post('/api/loan-applications/apply', applicationData);

            Swal.fire({
                title: 'Success!',
                text: 'Your loan application has been submitted successfully and is now pending review.',
                icon: 'success',
                confirmButtonText: 'View My Loans'
            }).then(() => {
                // after successful submission redirect to my loans page
                navigate('/dashboard/my-loans');
            });

        } catch (error) {
            console.error('Submission Error:', error.response || error.message);
            Swal.fire('Error', error.response?.data?.message || 'Failed to submit application. Please check inputs.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    // লোডিং স্টেট
    if (loading) return <div className="p-8 text-center"><p className="text-lg">Loading loan application details...</p></div>;
    if (!loanData) return <div className="p-8 text-center text-red-500">Could not retrieve necessary loan information.</div>;


    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-2xl border border-blue-100">
            <h1 className="text-3xl font-extrabold text-gray-800 border-b pb-3 mb-6 flex items-center">
                <span className="mr-3 text-blue-600">📝</span> Loan Application Form
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* ➡️ 1. Auto-Filled (Read-Only) Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">User Email (Read-Only)</span>
                        </label>
                        <input
                            type="email"
                            value={user?.email || 'N/A'}
                            readOnly
                            className="input input-bordered w-full bg-gray-200 text-gray-700 font-medium"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Loan Title (Read-Only)</span>
                        </label>
                        <input
                            type="text"
                            value={loanData.title}
                            readOnly
                            className="input input-bordered w-full bg-gray-200 text-gray-700 font-medium"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Interest Rate (Read-Only)</span>
                        </label>
                        <input
                            type="text"
                            value={`${loanData.interest}%`}
                            readOnly
                            className="input input-bordered w-full bg-gray-200 text-gray-700 font-medium"
                        />
                    </div>
                </div>

                {/* ➡️ 2. Personal Information Section */}
                <h2 className="text-xl font-bold text-blue-600 pt-4 border-t">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">First Name *</span></label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Last Name *</span></label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Contact Number *</span></label>
                        <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">National ID / Passport Number *</span></label>
                        <input
                            type="text"
                            name="nationalId"
                            value={formData.nationalId}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* ➡️ 3. Financial and Loan Details Section */}
                <h2 className="text-xl font-bold text-blue-600 pt-4 border-t">Financial & Loan Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Income Source *</span></label>
                        <input
                            type="text"
                            name="incomeSource"
                            value={formData.incomeSource}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Job, Business, Rental"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Monthly Income (USD) *</span></label>
                        <input
                            type="number"
                            name="monthlyIncome"
                            value={formData.monthlyIncome}
                            onChange={handleChange}
                            required
                            min="0"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Loan Amount (USD) *</span></label>
                        <input
                            type="number"
                            name="loanAmount"
                            value={formData.loanAmount}
                            onChange={handleChange}
                            required
                            min="100"
                            max={loanData.maxLimit} // ম্যাক্স লিমিট যোগ করা হলো
                            className="input input-bordered w-full"
                        />
                        <label className="label"><span className="label-text-alt text-red-500">Max Limit: ${loanData.maxLimit?.toLocaleString() || 'N/A'}</span></label>
                    </div>
                </div>

                {/* ➡️ 4. Reason and Address */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Reason for Loan *</span></label>
                    <textarea
                        name="reasonForLoan"
                        value={formData.reasonForLoan}
                        onChange={handleChange}
                        required
                        placeholder="Clearly state why you need the loan..."
                        className="textarea textarea-bordered h-24"
                    />
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text">Full Address *</span></label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Current residential address"
                        className="textarea textarea-bordered h-16"
                    />
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text">Extra Notes (Optional)</span></label>
                    <textarea
                        name="extraNotes"
                        value={formData.extraNotes}
                        onChange={handleChange}
                        placeholder="Any other information you want to share with the loan officer."
                        className="textarea textarea-bordered h-16"
                    />
                </div>

                {/* ➡️ 5. Submit Button */}
                <div className="pt-4 border-t">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary btn-lg w-full transition duration-300"
                    >
                        {submitting ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Submitting...
                            </>
                        ) : (
                            <>
                                Apply and Submit Application
                                <span className="ml-2">🚀</span>
                            </>
                        )}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-2">
                        By clicking "Apply and Submit Application", you agree to our terms and conditions.
                    </p>
                </div>
            </form>
        </div>
    );
}
// components/dashboard/admin/AdminAllLoans.jsx

import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';
import LoadingSpinner from '../../shared/LoadingSpinner';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
// 💡 যদি আপনার কাছে একটি EditLoanModal কম্পোনেন্ট থাকে, তবে এখানে ইমপোর্ট করুন

const AdminAllLoans = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const res = await api.get('/api/admin/loans/all');
            setLoans(res.data);
        } catch (error) {
            console.error('Error fetching loans:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    // 💡 ৮. ডিলিট লজিক
    const handleDelete = (loanId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/api/admin/loans/${loanId}`);
                    Swal.fire('Deleted!', 'The loan has been deleted.', 'success');
                    fetchLoans();
                } catch (error) {
                    Swal.fire('Error', 'Failed to delete the loan.', 'error');
                }
            }
        });
    };

    // 💡 ৮. হোমপেজ টগল লজিক
    const handleToggleHome = async (loanId, currentStatus) => {
        try {
            // 💡 ব্যাকএন্ড API রুট: হোমপেজ স্ট্যাটাস আপডেট করা
            await api.patch(`/api/admin/loans/${loanId}/toggle-home`, {
                showOnHome: !currentStatus
            });
            Swal.fire('Updated!', `Loan visibility updated on Home Page.`, 'success');
            fetchLoans();
        } catch (error) {
            Swal.fire('Error', 'Failed to update visibility.', 'error');
        }
    };

    // 💡 ৮. আপডেট লজিক (সাধারণত এটি একটি মোডাল বা অন্য পেজে নিয়ে যায়)
    const handleUpdate = (loanId) => {
        // এখানে একটি মোডাল ওপেন হবে অথবা একটি এডিট পেজে নিয়ে যাবে
        // যেমন: navigate(`/dashboard/edit-loan/${loanId}`);
        Swal.fire('Feature Demo', `Opening edit modal/page for Loan ID: ${loanId}...`, 'info');
    };


    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">📋 All Loans</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                {/*  */}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Interest</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase">Show on Home</th>
                            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loans.map(loan => (
                            <tr key={loan._id}>
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <img src={loan.imageURL || 'placeholder.jpg'} alt={loan.title} className="h-10 w-10 rounded object-cover" />
                                </td>
                                <td className="py-4 px-4 font-semibold text-gray-900">{loan.title}</td>
                                <td className="py-4 px-4 whitespace-nowrap">{loan.interestRate}%</td>
                                <td className="py-4 px-4 whitespace-nowrap">{loan.category}</td>
                                <td className="py-4 px-4 text-center">
                                    <input
                                        type="checkbox"
                                        checked={loan.showOnHome} // 💡 নিশ্চিত করুন আপনার লোনে showOnHome ফিল্ড আছে
                                        onChange={() => handleToggleHome(loan._id, loan.showOnHome)}
                                        className="toggle toggle-primary"
                                    />
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap text-center space-x-2">
                                    <button onClick={() => handleUpdate(loan._id)} className="btn btn-xs btn-info text-white">Edit</button>
                                    <button onClick={() => handleDelete(loan._id)} className="btn btn-xs btn-error text-white">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAllLoans;
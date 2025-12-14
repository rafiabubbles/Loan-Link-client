// components/dashboard/admin/ManageUsers.jsx

import React, { useEffect, useState } from 'react';
import api from '../../../api/axios'; // আপনার axios ইনস্ট্যান্স
import LoadingSpinner from '../../shared/LoadingSpinner';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            // 💡 নিশ্চিত করুন আপনার ব্যাকএন্ডে এই API রুটটি শুধুমাত্র অ্যাডমিন অ্যাক্সেস করতে পারে।
            const res = await api.get('/api/admin/users');
            setUsers(res.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            Swal.fire('Error', 'Failed to load user data.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // 💡 ৭. ইউজার রোল আপডেট / সাসপেন্ড লজিক
    const handleUpdateRole = async (userId, currentRole) => {
        const { value: newRole } = await Swal.fire({
            title: 'Update User Role',
            input: 'select',
            inputOptions: {
                'borrower': 'Borrower',
                'manager': 'Manager',
                'admin': 'Admin',
                'suspended': 'Suspend Account' // 💡 সাসপেন্ড অপশন
            },
            inputValue: currentRole,
            showCancelButton: true,
            confirmButtonText: 'Update Role',
        });

        if (newRole && newRole !== currentRole) {
            try {
                // 💡 ব্যাকএন্ড API রুট: ইউজার আইডি এবং নতুন রোল পাঠানো
                await api.patch(`/api/admin/users/${userId}/role`, { role: newRole });
                Swal.fire('Success', `User role updated to ${newRole}!`, 'success');
                fetchUsers(); // ডেটা রিফ্রেশ
            } catch (error) {
                console.error('Role update error:', error);
                Swal.fire('Error', 'Failed to update user role.', 'error');
            }
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">🛠️ Manage Users</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="py-4 px-6 whitespace-nowrap">{user.name || 'N/A'}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-800' : user.role === 'manager' ? 'bg-blue-100 text-blue-800' : user.role === 'suspended' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-center text-sm font-medium">
                                    <button
                                        onClick={() => handleUpdateRole(user._id, user.role)}
                                        className="text-indigo-600 hover:text-indigo-900 btn btn-sm btn-outline"
                                    >
                                        Update Role
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
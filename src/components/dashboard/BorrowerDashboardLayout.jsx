// src/components/dashboard/BorrowerDashboardLayout.jsx

import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const navLinks = [
    { to: '/dashboard/my-loans', icon: '💰', label: 'My Loans' },
    { to: '/dashboard/profile', icon: '👤', label: 'My Profile' },
];

export default function BorrowerDashboardLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl p-4">
                <h1 className="text-2xl font-bold mb-6 text-blue-600">Borrower Panel</h1>
                <nav className="space-y-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            // 💡 NavLink active হলে স্টাইল পরিবর্তন হবে
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition duration-150 ${isActive
                                    ? 'bg-blue-500 text-white font-semibold'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`
                            }
                        >
                            <span className="mr-3">{link.icon}</span>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Outlet renders the nested route component (MyLoans or MyProfile) */}
                <Outlet />
            </main>
        </div>
    );
}
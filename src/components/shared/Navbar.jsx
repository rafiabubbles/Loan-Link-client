import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ThemeContext } from "../../context/ThemeContext";
import { Sun, Moon, LogOut } from "lucide-react";
import { Menu } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();
    const [profileOpen, setProfileOpen] = useState(false);

    // Profile dropdown toggle
    const toggleProfile = () => setProfileOpen(!profileOpen);

    const closeAll = () => {
        setProfileOpen(false);
    };

    const { theme, toggleTheme } = useContext(ThemeContext);

    // Common NavLink styling
    const linkClasses = ({ isActive }) =>
        `${isActive ? 'text-lime-400 font-semibold' : 'text-gray-200'} hover:text-lime-400 transition-colors`;

    // ----------------------------------------------------------------------
    // --- Navigation Links for Desktop Center ---
    // ----------------------------------------------------------------------
    const navLinks = (
        <>
            <li><NavLink to="/" className={linkClasses} onClick={closeAll}>Home</NavLink></li>
            <li><NavLink to="/all-loans" className={linkClasses} onClick={closeAll}>All-Loans</NavLink></li>
            {/* Conditional Middle Link */}
            {user ? (
                <li><NavLink to="/dashboard" className={linkClasses} onClick={closeAll}>Dashboard</NavLink></li>
            ) : (
                <>
                    <li><NavLink to="/about-us" className={linkClasses} onClick={closeAll}>About Us</NavLink></li>
                    <li><NavLink to="/contact" className={linkClasses} onClick={closeAll}>Contact</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between">

                {/* ========================================================= */}
                {/* 1. LEFT SECTION (navbar-start): LOGO & MOBILE MENU */}
                {/* ========================================================= */}
                <div className="navbar-start w-1/4 lg:w-auto">
                    {/* Mobile Menu Dropdown */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <Menu size={24} />
                        </div>
                        {/* Mobile Menu List */}
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-50 mt-3 w-52 p-2 shadow-xl border border-gray-700 space-y-1"
                        >
                            {navLinks}
                            {/* Mobile Auth and Theme Toggle (combined) */}
                            <li className="p-2 border-t border-gray-700 mt-2">
                                {/* Theme Toggle */}
                                <button
                                    onClick={toggleTheme}
                                    className="btn btn-ghost btn-sm text-white w-full justify-start mb-1"
                                    title="Toggle theme"
                                >
                                    {theme === "light" ? <Moon size={20} className="mr-2" /> : <Sun size={20} className="mr-2" />}
                                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                                </button>

                                {/* Auth Buttons/Logout */}
                                {!user ? (
                                    <>
                                        <Link to="/login" onClick={closeAll} className="btn btn-sm btn-info text-white w-full mb-1">Login</Link>
                                        <Link to="/register" onClick={closeAll} className="btn btn-sm bg-lime-400 text-gray-900 hover:bg-lime-500 w-full">Register</Link>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => { logout(); closeAll(); }}
                                        className="btn btn-sm btn-error text-white w-full flex items-center justify-start"
                                    >
                                        <LogOut size={16} className="mr-2" /> Logout
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Logo: "Quick Loans" */}
                    <Link to="/" className="text-xl font-bold ml-2 lg:ml-0" onClick={closeAll}>
                        <span className="text-lime-400">Quick</span>
                        <span className="text-blue-900 ml-1">Loans</span>
                    </Link>
                </div>

                {/* ========================================================= */}
                {/* 2. MIDDLE SECTION (navbar-center): DESKTOP LINKS */}
                {/* ========================================================= */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">
                        {navLinks}
                    </ul>
                </div>

                {/* ========================================================= */}
                {/* 3. RIGHT SECTION (navbar-end): THEME, AUTH/PROFILE */}
                {/* ========================================================= */}
                <div className="navbar-end w-3/4 lg:w-auto">
                    {/* Theme Toggling Button (Desktop and Mobile Right Side) */}
                    <button
                        onClick={toggleTheme}
                        className="btn btn-ghost btn-circle text-white hidden lg:inline-flex"
                        title="Toggle theme"
                    >
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    {/* Auth Buttons / Profile Dropdown */}
                    {!user ? (
                        /* BEFORE LOGIN: Login and Register buttons */
                        <div className="hidden lg:flex space-x-3">
                            <NavLink
                                to="/login"
                                className="btn bg-blue-900 text-white hover:bg-blue-700 border-none px-4 py-1.5 font-medium"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="btn bg-lime-400 text-gray-900 hover:bg-lime-500 border-none px-4 py-1.5 font-medium"
                            >
                                Register
                            </NavLink>
                        </div>
                    ) : (
                        /* AFTER LOGIN: Avatar and Logout */
                        <div className="dropdown dropdown-end">
                            {/* Avatar (Click to open dropdown) */}
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-lime-400 p-0 m-0">
                                <div className="w-10 rounded-full">
                                    <img
                                        src={user.photoURL || "https://via.placeholder.com/40"}
                                        alt="Profile"
                                    />
                                </div>
                            </div>
                            {/* Logout Dropdown Content */}
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-50 mt-3 w-52 p-2 shadow-xl border border-gray-700 space-y-1"
                            >
                                <li className="menu-title text-sm text-lime-400 truncate border-b border-gray-700">
                                    {user.displayName || "User"}
                                </li>
                                <li>
                                    <button
                                        onClick={() => { logout(); closeAll(); }}
                                        className="text-gray-300 hover:bg-gray-700 flex items-center"
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const { register: registerUser, googleLogin, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const isPasswordValid = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 6;
        return hasUppercase && hasLowercase && hasMinLength;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordValid(password)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Password ❌",
                text: "Password must have at least 1 uppercase, 1 lowercase letter, and 6+ characters.",
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Passwords do not match ❌",
            });
            return;
        }

        setLoading(true);
        try {
            await registerUser(email, password);

            if (name || photoURL) {
                await updateUserProfile(name, photoURL);
            }

            Swal.fire({
                icon: "success",
                title: "Registration Successful ✅",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/login");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Registration Failed ❌",
                text: error.message,
            });
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await googleLogin();
            Swal.fire({
                icon: "success",
                title: "Login Successful ✅",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Failed ❌",
                text: error.message,
            });
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 pt-20">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-gray-900">

                    <span className="text-lime-400 text-4xl font-bold">Quick</span>
                    <span className="text-blue-900 ml-1 text-4xl font-bold">Loans</span> <br />
                    Portal Register
                </h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />

                <input
                    type="text"
                    placeholder="Photo URL (optional)"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-900 py-3 rounded-xl font-semibold text-white shadow-md hover:bg-green-500 transition"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 border border-blue-900 text-blue-900 py-3 rounded-xl hover:bg-green-500 hover:text-white transition"
                >
                    <span>Register with Google</span>
                    <FcGoogle />
                </button>

                <p className="text-center text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;

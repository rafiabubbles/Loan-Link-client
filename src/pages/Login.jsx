import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(email, password);


        if (result.success) {
            Swal.fire({
                icon: "success",
                title: "Login Successful ✅",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/"); // redirect to Home
        } else {
            Swal.fire({
                icon: "error",
                title: "Login Failed ❌",
                text: result.message,
            });
        }
    };

    const handleGoogleLogin = async () => {

        const result = await googleLogin();


        if (result.success) {
            Swal.fire({
                icon: "success",
                title: "Login Successful ✅",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/");
        } else {
            Swal.fire({
                icon: "error",
                title: "Login Failed ❌",
                text: result.message,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-10 sm:py-20">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-gray-900">

                    <span className="text-lime-400 text-4xl font-bold">Quick</span>
                    <span className="text-blue-900 ml-1 text-4xl font-bold">Loans</span> <br />
                    Portal Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 sm:p-4 p-3 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 sm:p-4 p-3 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                />

                <p className="text-right text-sm mt-2">
                    <button
                        onClick={() => navigate("/forgot-password", { state: { email } })}
                        className="text-green-500 hover:underline"
                    >
                        Forgot Password?
                    </button>
                </p>

                <button
                    type="submit"

                    className="w-full bg-blue-900 py-3 sm:p-4 rounded-xl font-semibold text-white shadow-md hover:bg-green-500 transition"
                >
                    Login
                </button>

                <button
                    type="button"
                    onClick={handleGoogleLogin}

                    className="w-full flex justify-center items-center gap-2 border border-blue-900 text-blue-900 py-3 rounded-xl hover:bg-green-500 hover:text-white transition"
                >
                    <span>Login with Google</span>
                    <FcGoogle />
                </button>

                <p className="text-center text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-green-500 hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaGithub, FaEye, FaGoogle } from "react-icons/fa"; // Added FaGoogle
import { HiEyeOff } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const { googleLogin, githubLogin, loginUser, setLoading } = useAuth(); // Added googleLogin
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPass, setShowPass] = useState(false);

  // Google Login Handler
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        setLoading(false);
        toast.success("Welcome! Google Login Successful");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Google Login Failed");
      });
  };

  const handleGithubLogin = () => {
    githubLogin()
      .then((result) => {
        setLoading(false);
        toast.success("Welcome back with GitHub!");
        navigate("/");
      })
      .catch(() => setLoading(false));
  };

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then(() => {
        setLoading(false);
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Invalid credentials");
      });
  };

  return (
    <div className="py-24 flex items-center justify-center jost bg-secondary/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 border border-primary/10"
      >
        {/* Left Side - Navy Blue Text Area */}
        <div className="hidden md:flex flex-col justify-center items-center bg-primary text-white p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="z-10 relative">
            <h1 className="text-5xl font-black mb-4">HELLO AGAIN!</h1>
            <h2 className="text-xl font-semibold mb-8 text-accent uppercase tracking-widest">
              Access Your Portal
            </h2>
            <p className="opacity-80 leading-relaxed max-w-sm mx-auto font-light">
              Manage your micro-loans and track your financial milestones with our secure system.
            </p>
          </div>
        </div>

        {/* Right Side - Form & Socials */}
        <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-bold text-primary mb-8">Sign In</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered bg-secondary/10 border-none w-full rounded-2xl py-6"
              {...register("email", { required: true })}
            />
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered bg-secondary/10 border-none w-full rounded-2xl py-6"
                {...register("password", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40"
              >
                {showPass ? <HiEyeOff size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            <button className="btn btn-accent w-full rounded-2xl py-4 h-auto text-primary font-bold shadow-lg border-none mt-2">
              Secure Login
            </button>
          </form>

          {/* Social Logins - Side by Side */}
          <div className="mt-8">
            <div className="divider text-xs text-gray-400 font-bold uppercase tracking-widest">Social Connect</div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              {/* Google Button */}
              <button
                onClick={handleGoogleLogin}
                className="btn btn-outline flex-1 border-gray-200 text-primary hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-2xl"
              >
                <FaGoogle className="text-lg" /> Google
              </button>

              {/* GitHub Button */}

            </div>
          </div>

          <p className="text-center mt-8 text-sm text-gray-500 font-medium">
            New here? <Link to="/register" className="text-accent font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
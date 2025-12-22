/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaGoogle, FaGithub, FaEye } from "react-icons/fa";
import { HiEyeOff } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const { googleLogin, githubLogin, registerUser, updateCurrentUser, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPass, setShowPass] = useState(false);

  // Helper for Database saving
  const saveUserToDb = (user, roleRequest, status) => {
    const userInfo = {
      email: user.email.toLowerCase(),
      name: user.displayName || "Anonymous User",
      photoURL: user.photoURL,
      requestedRole: roleRequest,
      role: "user",
      status: status,
      createdAt: new Date().toLocaleString(),
    };
    axiosSecure.post("/users", userInfo).then(() => {
      setLoading(false);
      navigate("/");
    });
  };

  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      toast.success("Welcome to LoanLink!");
      saveUserToDb(result.user, "user", "active");
    });
  };

  const handleGithubLogin = () => {
    githubLogin().then((result) => {
      toast.success("Welcome to LoanLink!");
      saveUserToDb(result.user, "user", "active");
    });
  };

  const onSubmit = (data) => {
    const imageFile = data.photo[0];
    const status = data.role === "manager" ? "pending" : "active";

    registerUser(data.email, data.password)
      .then((result) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api_key}`, formData)
          .then((res) => {
            const updateUser = {
              displayName: data.name,
              photoURL: res.data.data.url,
            };

            updateCurrentUser(updateUser).then(() => {
              toast.success("Account Created Successfully!");
              saveUserToDb(result.user, data.role === "borrower" ? "user" : "manager", status);
            });
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="py-20 flex items-center justify-center jost bg-secondary/10 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] shadow-2xl overflow-hidden max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 border border-primary/5"
      >
        {/* Left Side - Professional Theme */}
        <div className="hidden md:flex flex-col justify-center items-center bg-primary p-12 text-center relative overflow-hidden text-white">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>

          <div className="z-10 relative">
            <h1 className="text-5xl font-black mb-6 leading-tight">START YOUR <br /> SUCCESS STORY</h1>
            <h2 className="text-lg font-bold tracking-[0.3em] mb-8 text-accent uppercase">
              Beyond Banking
            </h2>
            <p className="opacity-70 leading-relaxed max-w-sm mx-auto font-light text-lg">
              Create your account to apply for loans, track approvals, and unlock financial possibilities with LoanLink.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-10 md:p-14 bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary">Create Account</h2>
            <div className="w-12 h-1 bg-accent mt-2 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
            <div className="form-control">
              <label className="label-text font-bold mb-2 text-primary/70 ml-1">Full Name</label>
              <input {...register("name", { required: true })} placeholder="Ex: Alex Morgan" className="input bg-secondary/10 border-none rounded-2xl py-6" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label-text font-bold mb-2 text-primary/70 ml-1">Email</label>
                <input {...register("email", { required: true })} className="input bg-secondary/10 border-none rounded-2xl py-6" placeholder="alex@link.com" />
              </div>
              <div className="form-control">
                <label className="label-text font-bold mb-2 text-primary/70 ml-1">Role</label>
                <select {...register("role")} className="select bg-secondary/10 border-none rounded-2xl">
                  <option value="borrower">Borrower</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label-text font-bold mb-2 text-primary/70 ml-1">Profile Photo</label>
              <input type="file" {...register("photo", { required: true })} className="file-input file-input-bordered border-primary/10 rounded-2xl w-full" />
            </div>

            <div className="form-control relative">
              <label className="label-text font-bold mb-2 text-primary/70 ml-1">Secure Password</label>
              <input type={showPass ? "text" : "password"} {...register("password", { required: true, minLength: 6 })} className="input bg-secondary/10 border-none rounded-2xl py-6" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 bottom-3.5 text-primary/40">
                {showPass ? <HiEyeOff size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <button className="btn btn-accent w-full rounded-2xl py-4 h-auto text-primary font-bold text-lg shadow-lg border-none mt-4">
              Register Now
            </button>
          </form>

          {/* Social Register */}
          <div className="mt-8">
            <div className="divider text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Instant Registration</div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleGoogleLogin} className="btn btn-outline flex-1 rounded-2xl border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100">
                <FaGoogle /> Google
              </button>
              <button onClick={handleGithubLogin} className="btn btn-outline flex-1 rounded-2xl border-gray-200 hover:bg-gray-900 hover:text-white">
                <FaGithub /> GitHub
              </button>
            </div>
          </div>

          <p className="text-center mt-8 text-sm text-gray-500 font-medium">
            Member already? <Link to="/login" className="text-accent font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
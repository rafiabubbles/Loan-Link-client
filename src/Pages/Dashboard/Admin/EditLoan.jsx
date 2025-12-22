import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "motion/react";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const EditLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);

  // Fetch loan data using TanStack Query
  const {
    data: loanData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/loans/all-loans/${id}`);
      return response.data;
    },
  });

  // Pre-populate form fields when loan data is fetched
  useEffect(() => {
    if (loanData) {
      setValue("loanTitle", loanData.loanTitle);
      setValue("description", loanData.description);
      setValue("category", loanData.category);
      setValue("interestRate", loanData.interestRate);
      setValue("maxLoanLimit", loanData.maxLoanLimit);
      setValue("requiredDocuments", loanData.requiredDocuments);
      setValue("emiPlans", loanData.emiPlans);
      setValue("showOnHome", loanData.showOnHome || false);
      setImagePreview(loanData.image);
    }
  }, [loanData, setValue]);

  // Image upload handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      let imageUrl = loanData.image; // Keep existing image by default

      // Upload new image if one was selected
      if (newImageFile) {
        const formData = new FormData();
        formData.append("image", newImageFile);

        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_imgbb_api_key
          }`,
          formData
        );
        imageUrl = imgbbResponse.data.data.url;
      }

      const updatedLoanData = {
        ...data,
        image: imageUrl,
        updatedAt: new Date().toLocaleString(),
      };

      await axiosSecure.patch(`/loans/edit-loan/${id}`, updatedLoanData);
      toast.success("Loan updated successfully");
      navigate("/dashboard/all-loans");
    } catch (error) {
      console.error("Error updating loan:", error);
      toast.error("Failed to update loan. Please try again.");
    }
  };

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center jost">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error">Error Loading Loan</h2>
          <p className="text-base-content/60">
            {error?.message || "Failed to fetch loan data"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden py-10 rounded-3xl">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 jost"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            Loan Management
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-base-content">
            Edit Loan
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg">
            Update the loan details and save changes
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-accent p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-base-200 relative overflow-hidden"
        >
          {/* Decorative Form Background */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-primary/20 to-transparent rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

          <h3 className="text-2xl font-bold mb-8">Loan Details</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Loan Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">
                  Loan Title <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g., Home Improvement Loan"
                className={`input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary ${
                  errors.loanTitle ? "input-error" : ""
                }`}
                {...register("loanTitle", {
                  required: "Loan title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
              />
              {errors.loanTitle && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.loanTitle.message}
                  </span>
                </label>
              )}
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">
                  Description <span className="text-error">*</span>
                </span>
              </label>
              <textarea
                placeholder="Provide detailed information about the loan..."
                className={`textarea textarea-bordered h-32 w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary resize-none ${
                  errors.description ? "textarea-error" : ""
                }`}
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message: "Description must be at least 20 characters",
                  },
                })}
              />
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.description.message}
                  </span>
                </label>
              )}
            </div>

            {/* Category and Interest Rate Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    Category <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.category ? "select-error" : ""
                  }`}
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <option value="">Select a category</option>
                  <option value="personal">Personal Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="education">Education Loan</option>
                  <option value="home">Home Loan</option>
                  <option value="vehicle">Vehicle Loan</option>
                  <option value="medical">Medical Loan</option>
                </select>
                {errors.category && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.category.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Interest Rate */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    Interest Rate (%) <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g., 5.5"
                  className={`input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary  ${
                    errors.interestRate ? "input-error" : ""
                  }`}
                  {...register("interestRate", {
                    required: "Interest rate is required",
                    min: {
                      value: 0.01,
                      message: "Interest rate must be greater than 0",
                    },
                    max: {
                      value: 100,
                      message: "Interest rate cannot exceed 100%",
                    },
                  })}
                />
                {errors.interestRate && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.interestRate.message}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Max Loan Limit */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">
                  Max Loan Limit ($) <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="number"
                placeholder="e.g., 50000"
                className={`input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary  ${
                  errors.maxLoanLimit ? "input-error" : ""
                }`}
                {...register("maxLoanLimit", {
                  required: "Max loan limit is required",
                  min: {
                    value: 100,
                    message: "Loan limit must be at least $100",
                  },
                })}
              />
              {errors.maxLoanLimit && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.maxLoanLimit.message}
                  </span>
                </label>
              )}
            </div>

            {/* Required Documents and EMI Plans Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Required Documents */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    Required Documents <span className="text-error">*</span>
                  </span>
                </label>
                <textarea
                  placeholder="e.g., National ID, Proof of Income"
                  className={`textarea textarea-bordered h-24 w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary  resize-none ${
                    errors.requiredDocuments ? "textarea-error" : ""
                  }`}
                  {...register("requiredDocuments", {
                    required: "Required documents must be specified",
                  })}
                />
                {errors.requiredDocuments && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.requiredDocuments.message}
                    </span>
                  </label>
                )}
              </div>

              {/* EMI Plans */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    EMI Plans <span className="text-error">*</span>
                  </span>
                </label>
                <textarea
                  placeholder="e.g., 6 months, 12 months, 24 months"
                  className={`textarea textarea-bordered h-24 w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary  resize-none ${
                    errors.emiPlans ? "textarea-error" : ""
                  }`}
                  {...register("emiPlans", {
                    required: "EMI plans are required",
                  })}
                />
                {errors.emiPlans && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.emiPlans.message}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">
                  Loan Image
                </span>
              </label>
              <div className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 border-dashed border-base-300 bg-base-200/20 hover:border-primary/50 transition-colors">
                {imagePreview && (
                  <div className="avatar">
                    <div className="w-48 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={imagePreview} alt="Loan preview" />
                    </div>
                  </div>
                )}
                <label className="btn btn-outline btn-primary rounded-xl gap-2 cursor-pointer">
                  <BsCloudUpload size={20} />
                  {imagePreview ? "Change Image" : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="text-sm text-base-content/60">
                  Leave unchanged to keep current image
                </p>
              </div>
            </div>

            {/* Show on Home Toggle */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <span className="label-text font-medium text-base-content/80">
                  Show on Home Page
                </span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  {...register("showOnHome")}
                />
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-main w-full py-4 text-lg shadow-lg shadow-primary/20 gap-3 group"
            >
              Update Loan
              <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditLoan;

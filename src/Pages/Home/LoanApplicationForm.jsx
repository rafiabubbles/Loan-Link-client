import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Loading/Loading";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const LoanApplicationForm = () => {
  const { currentUser, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const today = new Date().toLocaleDateString();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <Loading></Loading>;
  }
  const onSubmit = (data) => {
    const LoanApplicationData = {
      userEmail: currentUser?.email,
      loanTitle: location.state?.loanTitle,
      interestRate: location.state?.interestRate,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      nationalId: data.nationalId,
      incomeSource: data.incomeSource,
      monthlyIncome: data.monthlyIncome,
      loanAmount: data.loanAmount,
      reason: data.reason,
      address: data.address,
      extraNotes: data.extraNotes,
      applicationDate: today,
      status: "pending",
      paymentStatus: "unpaid",
      applicationFee: 10,
    };

    axiosSecure
      .post("/loanApplication", LoanApplicationData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Loan application submitted successfully!");
          reset();
          navigate("/dashboard/my-loan");
        }
      })
      .catch((error) => {
        console.error("Error submitting application:", error);
        toast.error("Failed to submit loan application. Please try again.");
      });
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-10 rounded-3xl">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 jost">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            Loan Application
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-base-content">
            Apply for a Loan
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg">
            Fill in the details below to apply for a loan
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto bg-accent p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-base-200 relative overflow-hidden">
          {/* Decorative Form Background */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-primary/20 to-transparent rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

          <h3 className="text-2xl font-bold mb-8">Application Details</h3>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Auto-filled (read-only) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    User Email
                  </span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full rounded-xl bg-base-200"
                  value={currentUser?.email || ""}
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    Loan Title
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full rounded-xl bg-base-200"
                  defaultValue={location.state?.loanTitle || ""}
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    Interest Rate (%)
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full rounded-xl bg-base-200"
                  defaultValue={location.state?.interestRate || "6.5"}
                  readOnly
                />
              </div>
            </div>

            {/* User Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    First Name <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className={`input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.firstName ? "input-error" : ""
                  }`}
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.firstName.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    Last Name <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className={`input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.lastName ? "input-error" : ""
                  }`}
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.lastName.message}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    Contact Number <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g., +1234567890"
                  className={`input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.contactNumber ? "input-error" : ""
                  }`}
                  {...register("contactNumber", {
                    required: "Contact number is required",
                  })}
                />
                {errors.contactNumber && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.contactNumber.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    National ID / Passport Number{" "}
                    <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="e.g., 1234567890"
                  className={`input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.nationalId ? "input-error" : ""
                  }`}
                  {...register("nationalId", {
                    required: "National ID or Passport is required",
                  })}
                />
                {errors.nationalId && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.nationalId.message}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    Income Source <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Job, Business"
                  className={`input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.incomeSource ? "input-error" : ""
                  }`}
                  {...register("incomeSource", {
                    required: "Income source is required",
                  })}
                />
                {errors.incomeSource && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.incomeSource.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    Monthly Income <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="e.g., 2000"
                  className={`input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.monthlyIncome ? "input-error" : ""
                  }`}
                  {...register("monthlyIncome", {
                    required: "Monthly income is required",
                  })}
                />
                {errors.monthlyIncome && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.monthlyIncome.message}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    Loan Amount <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="e.g., 5000"
                  className={`input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.loanAmount ? "input-error" : ""
                  }`}
                  {...register("loanAmount", {
                    required: "Loan amount is required",
                  })}
                />
                {errors.loanAmount && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.loanAmount.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    Reason for Loan <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Home Renovation"
                  className={`input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary ${
                    errors.reason ? "input-error" : ""
                  }`}
                  {...register("reason", {
                    required: "Reason for loan is required",
                  })}
                />
                {errors.reason && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.reason.message}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">
                  Address <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g., 123 Main St, City"
                className={`input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary ${
                  errors.address ? "input-error" : ""
                }`}
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.address.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">
                  Extra Notes
                </span>
              </label>
              <textarea
                placeholder="Any additional information..."
                className="textarea textarea-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                {...register("extraNotes")}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-main w-full py-4 text-lg shadow-lg shadow-primary/20 gap-3 group"
            >
              Apply Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationForm;

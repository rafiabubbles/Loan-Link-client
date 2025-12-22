import React from "react";
import { Link } from "react-router";
import { FaArrowRight, FaClock, FaPercent, FaDollarSign } from "react-icons/fa";

const LoanCard = ({ loan }) => {
  const {
    _id,
    loanTitle,
    description,
    maxLoanLimit,
    image,
    interestRate,
    duration,
  } = loan;
 

  return (
    <div className="group bg-accent  rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full ">
      {/* Card Image - Styled like a debit/credit card */}
      <div className="relative p-6 ">
        <div className="relative rounded-2xl overflow-hidden shadow-xl transform group-hover:scale-[1.02] transition-transform duration-300">
          <img
            src={image}
            alt={loanTitle}
            className="w-full h-48 object-cover"
          />
          {/* Card overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col grow ">
        {/* Title */}
        <h3 className="text-2xl font-bold text-base-content mb-2">
          {loanTitle}
        </h3>

        {/* Description */}
        <p className="text-sm text-base-content/60 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Loan Details with Icons */}
        <div className="space-y-3 mb-5">
          {/* Duration */}
          {duration && (
            <div className="flex items-center gap-3 text-base-content/80">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <FaClock className="text-sm" />
              </div>
              <span className="text-sm font-medium">Max: {duration}</span>
            </div>
          )}

          {/* Interest Rate */}
          {interestRate && (
            <div className="flex items-center gap-3 text-base-content/80">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <FaPercent className="text-sm" />
              </div>
              <span className="text-sm font-medium">
                Interest rate: {interestRate}%
              </span>
            </div>
          )}

          {/* Max Credit */}
          <div className="flex items-center gap-3 text-base-content/80">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <FaDollarSign className="text-sm" />
            </div>
            <span className="text-sm font-medium">
              Max credit: ${maxLoanLimit}
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <Link to={`/loan-details/${_id}`} className="mt-auto">
          <button className="btn-main w-full group/btn">
            <span className="font-semibold">View Details</span>
            <FaArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoanCard;

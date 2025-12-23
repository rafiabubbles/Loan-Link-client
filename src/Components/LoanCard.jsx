import React from "react";
import { Link } from "react-router"; // Apnar project onujayi "react-router" ba "react-router-dom"
import { FaArrowRight, FaClock, FaPercent, FaDollarSign } from "react-icons/fa";

const LoanCard = ({ loan }) => {
  // Destructuring EXACTLY like your LoanDetails page
  const {
    _id,
    title,          // loanTitle -> title
    description,
    maxLimit,       // maxLoanLimit -> maxLimit
    images,         // image -> images (array)
    interest,       // interestRate -> interest
    duration,
  } = loan;

  return (
    <div className="group bg-accent rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-base-content/5">

      {/* Card Image */}
      <div className="relative p-6">
        <div className="relative rounded-2xl overflow-hidden shadow-xl transform group-hover:scale-[1.02] transition-transform duration-300">
          <img
            // Images array hole prothom ta nibe, na thakle placeholder
            src={images && images[0] ? images[0] : "https://via.placeholder.com/600x400?text=No+Image"}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col grow">
        {/* Title */}
        <h3 className="text-2xl font-bold text-base-content mb-2 line-clamp-1">
          {title}
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
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs">
                <FaClock />
              </div>
              <span className="text-sm font-medium">Max: {duration} Months</span>
            </div>
          )}

          {/* Interest Rate - FIXED FIELD */}
          <div className="flex items-center gap-3 text-base-content/80">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs">
              <FaPercent />
            </div>
            <span className="text-sm font-medium">
              Interest rate: {interest ? `${interest}%` : 'N/A'}
            </span>
          </div>

          {/* Max Credit - FIXED FIELD */}
          <div className="flex items-center gap-3 text-base-content/80">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs">
              <FaDollarSign />
            </div>
            <span className="text-sm font-medium">
              Max credit: {maxLimit ? `BDT ${maxLimit.toLocaleString()}` : 'N/A'}
            </span>
          </div>
        </div>

        {/* View Details Button - Path must match your App.jsx Route */}
        <Link to={`/loan-details/${_id}`} className="mt-auto">
          <button className="btn btn-primary w-full group/btn flex items-center justify-center gap-2">
            <span className="font-semibold">View Details</span>
            <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoanCard;
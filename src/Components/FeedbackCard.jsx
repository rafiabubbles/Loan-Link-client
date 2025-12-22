import React from "react";
import { FaStar } from "react-icons/fa";

const FeedbackCard = ({ feedback }) => {
  const { name, role, message, rating, avatar } = feedback;

  return (
    <div className="bg-accent border border-base-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow min-w-[400px] max-w-[400px] mx-4">
      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < rating ? "text-yellow-400" : "text-base-300"
            }`}
            size={18}
          />
        ))}
      </div>

      {/* Feedback Message */}
      <p className="text-base-content/80 text-lg leading-relaxed mb-6 italic">
        "{message}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
        />
        <div>
          <h4 className="font-bold text-base-content">{name}</h4>
          <p className="text-sm text-base-content/60">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;

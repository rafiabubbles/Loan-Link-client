import React from "react";
import { Link } from "react-router";
import { BiMoney } from "react-icons/bi";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      {/* Icon with Green Accent */}
      <div className="bg-accent p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">

      </div>

      {/* Text with White/Light Color */}
      <span className="text-secondary text-2xl lg:text-3xl font-bold tracking-tight">
        Quick Lon<span className="text-accent">Link</span>
      </span>
    </Link>
  );
};

export default Logo;
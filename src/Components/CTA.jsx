import React from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="py-24 jost">
      <div className="container mx-auto px-6">
        {/* Navy Blue to Deep Green Gradient for a fresh, unique look */}
        <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary via-[#002b59] to-accent text-white p-12 md:p-24 text-center shadow-2xl">

          {/* Abstract Background Overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

          {/* Decorative Glowing Orbs - Greenish Glow */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-accent/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-primary/40 rounded-full blur-[100px]"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
              Fuel Your Dreams with <span className="text-accent">QuickLoanLink</span>
            </h2>
            <p className="text-white/80 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Experience the future of micro-finance. Transparent, fast, and
              designed to empower your financial journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Primary Green Button */}
              <Link to="/register">
                <button className="btn btn-lg bg-accent text-primary hover:bg-white border-none rounded-full px-12 shadow-[0_10px_25px_rgba(74,222,128,0.3)] hover:scale-105 transition-all duration-300 font-bold uppercase tracking-wider">
                  Get Started
                  <FaArrowRight className="ml-2" />
                </button>
              </Link>

              {/* Outline Button */}
              <Link to="/contact">
                <button className="btn btn-lg bg-transparent text-white hover:bg-white/10 border-2 border-white/50 rounded-full px-12 transition-all">
                  Talk to Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
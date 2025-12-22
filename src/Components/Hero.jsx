import React from "react";
import { motion } from "motion/react";
import heroImage from "../assets/hero_bank_cards.avif"; // Importing the generated image
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[750px]  flex items-center justify-center overflow-hidden jost">
      {/* Abstract Background Shapes (Animated) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Circle 1 */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-70 left-80 w-22 h-22 bg-primary rounded-full blur-3xl"
        ></motion.div>
        {/* Circle 2 */}
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-100 w-64 h-64 bg-primary rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="uppercase tracking-widest text-primary font-bold text-sm">
              Simple & Fast Financing
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mt-4 text-base-content">
              Achieve Dreams <br />
              <span className="text-primary">With Our Loans.</span>
            </h1>
            <p className="text-base-content/70 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mt-6 leading-relaxed">
              Get the financial support you need with our transparent, secure,
              and quick loan approval process.
            </p>

            {/* Input & Subscribe/CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <Link
                to="/all-loans"
                className="btn-main text-lg px-8 py-3 h-auto"
              >
                Explore Now
              </Link>
              <Link
                to="/contact"
                className="btn bg-transparent border-none shadow-none text-primary   text-lg h-auto"
              >
                Get Support Now
              </Link>
            </div>

            {/* User Avatars / Social Proof */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-4">
                <img
                  className="w-10 h-10 rounded-full border-2 border-base-100"
                  src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                  alt="User 1"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-base-100"
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="User 2"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-base-100"
                  src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                  alt="User 3"
                />
              </div>
              <div className="text-sm font-medium">
                <span className="font-bold text-primary">5k+</span> Active Users
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <motion.img
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src={heroImage}
            alt="Banking Visual"
            className="w-full max-w-lg mx-auto drop-shadow-2xl rounded-4xl"
          />

          {/* Decorative Stars/Elements */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-10 right-10 text-yellow-400 text-4xl"
          >
            ✦
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-20 -left-10 text-primary text-3xl"
          >
            ★
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

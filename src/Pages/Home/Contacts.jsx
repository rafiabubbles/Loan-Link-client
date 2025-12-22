/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "motion/react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

const Contacts = () => {
  return (
    <div className="min-h-screen jost relative overflow-hidden pt-10 pb-10 rounded-4xl">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-base-content">
            Contact Us
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg">
            Have questions about our loans or services? We're here to help.
            Reach out to us and we'll respond as soon as we can.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="grid gap-6">
              <div className="flex items-start gap-5 p-6 rounded-3xl bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Phone</h3>
                  <p className="text-base-content/70 text-sm mb-1">
                    Mon-Fri from 9am to 6pm
                  </p>
                  <p className="text-lg font-semibold text-primary">
                    +1 (555) 000-0000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-6 rounded-3xl bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-xl shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Email</h3>
                  <p className="text-base-content/70 text-sm mb-1">
                    Our friendly team is here to help.
                  </p>
                  <p className="text-lg font-semibold text-primary">
                    hello@loanlink.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-6 rounded-3xl bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-xl shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Office</h3>
                  <p className="text-base-content/70 text-sm mb-1">
                    Come say hello at our office HQ.
                  </p>
                  <p className="text-lg font-semibold text-primary">
                    123 Finance St, New York, NY
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder or Visual Element */}
            <div className="h-64 w-full rounded-3xl overflow-hidden shadow-lg border border-base-200 relative bg-base-200/50 flex items-center justify-center group">
              {/* This would be an iframe map in production */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/city-map.png')] opacity-20"></div>
              <div className="z-10 text-center p-6">
                <span className="text-primary font-bold text-lg">
                  <FaMapMarkerAlt className="inline mr-2" />
                  View on Map
                </span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-base-100 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-base-200 relative overflow-hidden"
          >
            {/* Decorative Form Background */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-primary/20 to-transparent rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base-content/80">
                      First Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary bg-base-200/30"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base-content/80">
                      Last Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary bg-base-200/30"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="input input-bordered w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary bg-base-200/30"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content/80">
                    Message
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32 w-full rounded-xl focus:border-primary focus:ring-1 focus:ring-primary bg-base-200/30 resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-main w-full py-4 text-lg shadow-lg shadow-primary/20 gap-3 group"
              >
                Send Message
                <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;

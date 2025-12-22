/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "motion/react";
import { FaUsers, FaChartLine, FaHandshake, FaGlobe } from "react-icons/fa";

const stats = [
  { id: 1, label: "Active Users", value: "50K+" },
  { id: 2, label: "Loans Approved", value: "$20M+" },
  { id: 3, label: "Countries", value: "15+" },
  { id: 4, label: "Satisfaction", value: "99%" },
];

const team = [
  {
    id: 1,
    name: "Rafia",
    role: "CEO & Founder",
    image: "https://avatars.githubusercontent.com/u/110360591?v=4",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Head of Finance",
    image: "https://img.daisyui.com/images/profile/demo/2@94.webp",
  },
  {
    id: 3,
    name: "David Chen",
    role: "CTO",
    image: "https://img.daisyui.com/images/profile/demo/2@94.webp",
  },
  {
    id: 4,
    name: "Muhammad",
    role: "Support Lead",
    image: "https://img.daisyui.com/images/profile/demo/2@94.webp",
  },
];

const About = () => {
  return (
    <div className="min-h-screen  jost overflow-hidden pb-20">
      {/* Hero Section */}
      <div className="relative py-20 lg:py-32  overflow-hidden">
        {/* Background Elements */}

        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-base-content max-w-4xl mx-auto leading-tight">
              Empowering Financial Growth for{" "}
              <span className="text-primary">Everyone.</span>
            </h1>
            <p className="text-lg md:text-xl text-base-content/60 max-w-2xl mx-auto leading-relaxed">
              LoanLink is dedicated to making financial resources accessible,
              transparent, and fast. We bridge the gap between dreams and
              reality through innovative lending solutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 rounded-3xl bg-base-100 border border-base-200 shadow-xl p-12 relative overflow-hidden">
          {/* Decorative background for stats */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-secondary"></div>

          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </h3>
              <p className="text-base-content/70 font-medium uppercase tracking-wider text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission & Values */}
      <div className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-secondary/10 rounded-[3rem] -rotate-3 scale-95 z-0"></div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Team working"
              className="rounded-[3rem] shadow-2xl relative z-10 w-full h-auto object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <FaHandshake className="text-primary" /> Our Mission
              </h3>
              <p className="text-base-content/70 text-lg leading-relaxed">
                To provide a seamless, secure, and user-friendly platform that
                simplifies the lending process for everyone. We believe in fair
                access to capital and transparent financial practices.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <FaGlobe className="text-secondary" /> Our Vision
              </h3>
              <p className="text-base-content/70 text-lg leading-relaxed">
                A world where financial barriers are removed, allowing
                individuals and businesses to thrive through accessible and
                ethical lending.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-base-content/60 max-w-2xl mx-auto">
            The passionate people driving the revolution in micro-lending.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-6 rounded-3xl bg-base-100 border border-base-200 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-base-200 group-hover:ring-primary transition-all">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium text-sm uppercase tracking-wide">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

import React from "react";
import { motion } from "motion/react";
import {
  FaUserPlus,
  FaFileSignature,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Register Account",
    description:
      "Sign up in minutes with your basic details to get started on your financial journey.",
    icon: <FaUserPlus />,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Apply for Loan",
    description:
      "Choose your loan type and amount, fill out the simple application form, and submit.",
    icon: <FaFileSignature />,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Fast Approval",
    description:
      "Our system reviews your application quickly. You'll get a decision in no time.",
    icon: <FaCheckCircle />,
    color: "from-green-400 to-emerald-600",
  },
  {
    id: 4,
    title: "Receive Funds",
    description:
      "Once approved, the funds are instantly transferred to your bank account.",
    icon: <FaMoneyBillWave />,
    color: "from-orange-400 to-yellow-500",
  },
];

const HowWorks = () => {
  return (
    <section className="py-20 bg-base-100 jost overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-bold tracking-widest uppercase text-sm"
          >
            Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-2 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base-content/60 text-lg"
          >
            Get your loan approved in four simple steps. We've optimized our
            process to be as fast and hassle-free as possible.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-base-200 -z-10 -translate-y-1/2"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="p-8 h-full rounded-3xl bg-base-100 border border-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden text-center group-hover:-translate-y-2">
                {/* Gradient Blob Background */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${step.color} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 -mr-10 -mt-10`}
                ></div>
                <div
                  className={`absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr ${step.color} rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300 -ml-8 -mb-8`}
                ></div>

                {/* Step Number */}
                <div className="absolute top-4 left-6 text-9xl font-bold text-base-content/5 select-none z-0">
                  {step.id}
                </div>

                {/* Icon */}
                <div
                  className={`relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center text-white text-2xl shadow-lg rotate-3 group-hover:rotate-6 transition-transform duration-300`}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-base-content/60 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWorks;

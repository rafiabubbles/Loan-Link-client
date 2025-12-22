import React from "react";
import { FaShieldAlt, FaBolt, FaHandshake, FaChartLine } from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaShieldAlt />,
    title: "Secure & Safe",
    description: "Bank-level security to protect your data and transactions.",
  },
  {
    id: 2,
    icon: <FaBolt />,
    title: "Fast Approval",
    description:
      "Get approved in minutes, not days. Quick and efficient process.",
  },
  {
    id: 3,
    icon: <FaHandshake />,
    title: "Trusted Partner",
    description: "Join thousands of satisfied customers who trust LoanLink.",
  },
  {
    id: 4,
    icon: <FaChartLine />,
    title: "Competitive Rates",
    description: "Best interest rates in the market with flexible terms.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-base-100 jost">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Your Financial Success is Our Priority
          </h2>
          <p className="text-base-content/60 mt-4 max-w-2xl mx-auto text-lg">
            We combine cutting-edge technology with personalized service to
            deliver the best lending experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="text-center p-8 rounded-3xl bg-accent border border-base-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-base-content/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

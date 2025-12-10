import React from "react";
// Import relevant icons for the loan application steps
import { FaLaptopFile, FaUserCheck, FaMoneyCheckDollar } from 'react-icons/fa6';

export default function HowItWorks() {
    // 1. Data Array combining your original steps with the new design elements
    const steps = [
        {
            Icon: FaLaptopFile, // Icon for 'Apply Online' (File/Application)
            title: "Apply Online",
            desc: "Complete the loan application form and submit it through our secure portal.",
            linkText: "START APPLICATION",
            linkUrl: "/apply/form"
        },
        {
            Icon: FaUserCheck, // Icon for 'Verification' (User Check)
            title: "Verification",
            desc: "Our dedicated manager verifies your application details and required documents.",
            linkText: "CHECK REQUIREMENTS",
            linkUrl: "/process/requirements"
        },
        {
            Icon: FaMoneyCheckDollar, // Icon for 'Approval & Disbursement' (Money/Check)
            title: "Approval & Disbursement",
            desc: "Once approved, the loan funds are immediately disbursed to your designated account.",
            linkText: "VIEW LOAN STATUS",
            linkUrl: "/my/status"
        }
    ];

    // 2. Custom Tailwind Classes for Design Replication (Matching the circular style)
    // Circular icon container styling (light yellow border, shadow, centered)
    const iconContainerClasses =
        "flex justify-center items-center w-24 h-24 rounded-full border-2 border-yellow-300 bg-white shadow-lg mx-auto mb-5";

    // Link styling (small, bold, colored text, hover underline effect)
    const linkClasses =
        "text-sm font-bold text-indigo-700 hover:text-indigo-900 transition duration-150 border-b-2 border-transparent hover:border-indigo-700";

    return (
        // Section Container with padding and white background
        <section className="py-12 bg-white text-center">
            <div className="max-w-6xl mx-auto px-4">

                {/* Heading */}
                <h2 className="text-3xl font-bold mb-10 text-gray-800">How It Works</h2>

                {/* 3-Column Grid for Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((s, i) => (
                        <div key={i} className="flex flex-col items-center">

                            {/* Icon Container (The circular element) */}
                            <div className={iconContainerClasses}>
                                {/* Icon component - adjust the size and color here */}
                                <s.Icon className="text-4xl text-pink-500" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-semibold mb-3 text-gray-800">{s.title}</h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-5 max-w-xs">{s.desc}</p>

                            {/* Action Link */}
                            <a href={s.linkUrl} className={linkClasses}>
                                {s.linkText}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
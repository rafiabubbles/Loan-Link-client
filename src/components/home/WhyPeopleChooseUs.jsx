import React from 'react';

// data for features
const features = [
    {
        title: "Fair Interest Rates",
        description: "Cum sociis natoque penatibus et magnis parturient. Pro val nibh et elit mollis commodo et nec augue tristique sed.",
        icon: (
            // watch icon

            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        iconBgColor: "bg-lime-200/50" //light green background
    },
    {
        title: "Loans up to $5000",
        description: "Cum sociis natoque penatibus et magnis parturient. Pro val nibh et elit mollis commodo et nec augue tristique sed.",
        icon: (
            //rocket icon
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6a2.25 2.25 0 00-4.5 0v4.5M21 15.75c0 3.866-3.447 7-7.75 7a7.747 7.747 0 01-5.138-1.928 2.25 2.25 0 00-.704-.755 1.517 1.517 0 01-1.42.056l-.503.355a2.25 2.25 0 01-1.353-.943C.926 13.96 1.706 10.74 3.75 8.75s5.286-3.957 8.046-3.411A9.761 9.761 0 0013.5 10.5z" />
            </svg>
        ),
        iconBgColor: "bg-lime-200/50"
    },
    {
        title: "Lowest APR available to you",
        description: "Cum sociis natoque penatibus et magnis parturient. Pro val nibh et elit mollis commodo et nec augue tristique sed.",
        icon: (
            // একটি বার গ্রাফ আইকন
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-2v4m-4-2v2m-2-12h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
            </svg>
        ),
        iconBgColor: "bg-lime-200/50"
    },
];

export default function WhyPeopleChooseUs() {
    return (
        // main container
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6 text-center">

                {/* heading*/}
                <h2 className="text-4xl font-extrabold text-gray-800">
                    Why people choose us
                </h2>
                <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-12">
                    WE OFFER A TOTALLY NEW WAY OF BORROWING
                </p>

                {/* feature grid style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            // card style
                            className="p-8 bg-gray-50 rounded-lg shadow-sm text-left"
                        >
                            <div className="flex items-center mb-4">
                                {/* icon container */}
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${feature.iconBgColor} border-2 border-lime-400/80`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 ml-4 hidden">{feature.title}</h3>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {feature.title}
                            </h3>

                            {/* description */}
                            <p className="text-gray-600 mb-6">
                                {feature.description}
                            </p>

                            {/* "HOW IT WORKS */}
                            <a
                                href="./HowItWorks.jsx" // 
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 tracking-wider uppercase transition duration-150"
                            >
                                HOW IT WORKS?
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
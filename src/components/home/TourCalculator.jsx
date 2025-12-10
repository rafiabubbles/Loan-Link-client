import React, { useState, useEffect } from 'react';

const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 5000;
const MIN_MONTHS = 1;
const MAX_MONTHS = 12;


const applicationSteps = [
    {
        id: 1,
        title: "Check your rates",
        description: "It takes just a few minutes to provide us with your information.",
    },
    {
        id: 2,
        title: "Sign your contract online",
        description: "Using our secure application, you can e-sign your contract if pre-approved. Trust & security is our #1 priority.",
    },
    {
        id: 3,
        title: "Funds as soon as tomorrow",
        description: "Money can be directly deposited into your bank account as soon as the next business day.",
    },
];

export default function TourCalculator() {

    const [loanAmount, setLoanAmount] = useState(3500);
    const [loanMonths, setLoanMonths] = useState(9);


    const [borrowing, setBorrowing] = useState(0);
    const [totalPay, setTotalPay] = useState(0);


    const calculateLoan = (amount, months) => {

        const annualRate = 0.15;
        const monthlyRate = annualRate / 12;


        const principal = amount;
        const n = months;

        let monthlyPayment;
        if (monthlyRate === 0) {
            monthlyPayment = principal / n;
        } else {
            monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
        }

        const totalPayable = monthlyPayment * n;
        const totalInterest = totalPayable - principal;

        setBorrowing(Math.round(monthlyPayment));
        setTotalPay(Math.round(totalPayable));
    };

    useEffect(() => {
        calculateLoan(loanAmount, loanMonths);
    }, [loanAmount, loanMonths]);


    const handleAmountChange = (e) => {
        setLoanAmount(Number(e.target.value));
    };

    const handleMonthChange = (e) => {
        setLoanMonths(Number(e.target.value));
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                <div className="lg:pr-16">
                    <p className="text-gray-500 text-sm mb-2">A quick & transparent process</p>
                    <h2 className="text-5xl font-extrabold text-gray-800 mb-10 leading-tight">
                        We have <br />
                        a simple online <br />
                        application:
                    </h2>


                    <div className="space-y-8">
                        {applicationSteps.map((step) => (
                            <div key={step.id} className="flex relative pl-12">

                                <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 border-2 border-yellow-500 text-yellow-800 font-bold text-sm">
                                    {step.id}
                                </div>

                                {step.id < applicationSteps.length && (
                                    <div className="absolute left-4 top-8 bottom-[-16px] w-0.5 bg-gray-200"></div>
                                )}

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ডান দিক: ক্যালকুলেটর সেকশন */}
                <div className="bg-blue-900 p-8 rounded-lg shadow-2xl text-white">
                    <h3 className="text-3xl font-extrabold mb-8 text-white text-center">
                        Calculate Loan Rate
                    </h3>

                    {/* লোনের পরিমাণ (Range Slider) */}
                    <div className="mb-8">
                        <label className="block text-sm font-semibold mb-3">Loan Amount</label>
                        <div className="flex justify-between text-lg font-bold mb-2">
                            <span>${MIN_AMOUNT}</span>
                            <span>${loanAmount}</span> {/* বর্তমান মান */}
                            <span>${MAX_AMOUNT}</span>
                        </div>
                        <input
                            type="range"
                            min={MIN_AMOUNT}
                            max={MAX_AMOUNT}
                            step={500} // $500 স্টেপে বাড়বে
                            value={loanAmount}
                            onChange={handleAmountChange}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                            style={{
                                background: `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${((loanAmount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100}%, #ccc ${((loanAmount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100}%, #ccc 100%)`
                            }}
                        />
                    </div>

                    {/* সময়ের সীমা (Months) */}
                    <div className="mb-10">
                        <label className="block text-sm font-semibold mb-3">Loan Term (Months)</label>
                        <div className="flex justify-between text-lg font-bold mb-2">
                            <span>{MIN_MONTHS} months</span>
                            <span className="text-lime-200">{loanMonths} months</span> {/* বর্তমান সময় */}
                            <span>{MAX_MONTHS} months</span>
                        </div>
                        <input
                            type="range"
                            min={MIN_MONTHS}
                            max={MAX_MONTHS}
                            step={1}
                            value={loanMonths}
                            onChange={handleMonthChange}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                            style={{
                                background: `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${((loanMonths - MIN_MONTHS) / (MAX_MONTHS - MIN_MONTHS)) * 100}%, #ccc ${((loanMonths - MIN_MONTHS) / (MAX_MONTHS - MIN_MONTHS)) * 100}%, #ccc 100%)`
                            }}
                        />
                    </div>

                    {/* ফলাফল ডিসপ্লে */}
                    <div className="space-y-4 mb-8 border-t border-teal-400 pt-6">
                        <div className="flex justify-between items-center text-xl">
                            <span className="font-light">Borrowing:</span>
                            <span className="font-bold text-lime-200">${borrowing.toLocaleString()} / month</span>
                        </div>
                        <div className="flex justify-between items-center text-2xl font-extrabold">
                            <span>Total you will Pay:</span>
                            <span className="text-lime-200">${totalPay.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* বাটন */}
                    <div className="text-center">
                        <button className="w-full py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-green-500 transition duration-200">
                            Apply Now
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
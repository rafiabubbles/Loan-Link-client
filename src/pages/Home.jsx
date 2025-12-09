import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "../services/axios";

const Home = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch 6 loans only
    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const res = await axios.get("/loans?limit=6");
                setLoans(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLoans();
    }, []);

    return (
        <div className="space-y-20">

            {/* 🌟 HERO BANNER */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-28 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className="text-5xl font-bold leading-tight">
                            Your Trusted Partner for Easy & Fast Loans
                        </h1>
                        <p className="mt-5 text-lg">
                            Apply for loans easily with transparent processes, low interest rates,
                            and quick approval.
                        </p>

                        <div className="mt-7 flex gap-5">
                            <Link
                                to="/all-loans"
                                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100"
                            >
                                Explore Loans
                            </Link>

                            <Link
                                to="/apply-loan"
                                className="bg-purple-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-purple-800"
                            >
                                Apply for Loan
                            </Link>
                        </div>
                    </motion.div>

                    <motion.img
                        src="/hero-loan.png"
                        alt="Loan Banner"
                        className="w-full rounded-xl shadow-xl"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    />
                </div>
            </section>

            {/* 🌟 AVAILABLE LOANS (LIMIT 6) */}
            <section className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center">Available Loans</h2>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {loans.map((loan) => (
                            <motion.div
                                key={loan._id}
                                className="bg-white shadow-md rounded-xl overflow-hidden"
                                whileHover={{ scale: 1.03 }}
                            >
                                <img
                                    src={loan.image}
                                    alt={loan.title}
                                    className="h-40 w-full object-cover"
                                />

                                <div className="p-5">
                                    <h3 className="font-bold text-xl">{loan.title}</h3>
                                    <p className="text-gray-600 mt-2">{loan.shortDescription}</p>
                                    <p className="mt-3 font-semibold text-blue-600">
                                        Max Limit: ${loan.maxLimit}
                                    </p>

                                    <Link
                                        to={`/loan-details/${loan._id}`}
                                        className="mt-5 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* 🌟 HOW IT WORKS */}
            <section className="bg-gray-50 py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-10">How It Works</h2>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { step: "1", title: "Choose a Loan", desc: "Browse various loan options based on your needs." },
                            { step: "2", title: "Apply Online", desc: "Fill out a simple form with required information." },
                            { step: "3", title: "Get Approved", desc: "Quick review and instant approval by our team." },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                className="p-8 bg-white shadow rounded-lg"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="text-5xl font-bold text-blue-600">{s.step}</div>
                                <h3 className="text-xl font-semibold mt-4">{s.title}</h3>
                                <p className="mt-3 text-gray-600">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🌟 CUSTOMER FEEDBACK CAROUSEL */}
            <section className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>

                <div className="overflow-hidden w-full">
                    <motion.div
                        className="flex gap-6"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                    >
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="min-w-[280px] bg-white shadow p-6 rounded-lg"
                            >
                                <p className="text-gray-700">
                                    “Very smooth loan process! I got approval in less than 24 hours.”
                                </p>
                                <h4 className="mt-4 font-bold">Customer {i}</h4>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 🌟 EXTRA SECTION 1 */}
            <section className="bg-blue-600 text-white py-20 text-center px-6">
                <h2 className="text-3xl font-bold">Why Choose LoanLink?</h2>
                <p className="mt-4 max-w-3xl mx-auto">
                    Secure, transparent, and fast — we help thousands of people every month
                    achieve their financial goals with ease.
                </p>
            </section>

            {/* 🌟 EXTRA SECTION 2 */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-10 items-center">

                    <motion.img
                        src="/secure-loan.jpg"
                        className="rounded-xl shadow-lg"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    />

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold">Safe & Secure Processing</h2>
                        <p className="mt-5 text-gray-700">
                            Our platform follows advanced security measures to protect your data
                            and ensure a safe loan application process.
                        </p>
                        <Link
                            to="/all-loans"
                            className="mt-7 inline-block bg-blue-600 text-white px-5 py-3 rounded-lg"
                        >
                            Browse Loans
                        </Link>
                    </motion.div>

                </div>
            </section>

        </div>
    );
};

export default Home;

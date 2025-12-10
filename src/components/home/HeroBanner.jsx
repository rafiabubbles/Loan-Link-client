import React from "react";
import { Link } from "react-router-dom";

export default function HeroBanner() {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage:
                    "url('https://plus.unsplash.com/premium_photo-1661749375734-f7b49db5e839?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">

                    <p className="mb-5 text-3xl">
                        15-Minute Transfer
                    </p>
                    <h1 className="mb-5 text-5xl font-bold">Getting Money</h1>
                    <p className="mb-5 text-3xl font-bold text-green-500">
                        is now as easy as spending
                    </p>
                    <div className="flex gap-4 justify-center">

                        {/* Explore Loans Button */}
                        <Link
                            to="/all-loans"
                            className="btn btn-lg font-bold rounded-2xl bg-green-500 text-white btn-glow"
                        >
                            Explore Loans
                        </Link>

                        {/* Apply for Loan Button */}
                        <Link
                            to="/dashboard/my-loans"
                            className="btn btn-lg font-bold rounded-2xl bg-blue-900 text-white btn-glow"
                        >
                            Apply for Loan
                        </Link>

                    </div>



                </div>
            </div>
        </div>

    );
}

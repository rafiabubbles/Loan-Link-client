import React from "react";

export default function Footer() {
    return (
        <footer className="footer sm:footer-horizontal bg-gray-900  p-10 text-white">
            <aside>
                <p>
                    <span className="text-lime-400 text-4xl font-bold">Quick</span>
                    <span className="text-blue-900 ml-1 text-4xl font-bold">Loans</span>
                </p>
                <p className=" text-white">You need an active bank <br />
                    account to allow the money to be <br />
                    transferred to you.</p>
            </aside>
            <nav>
                <h6 className="footer-title">Open Hours</h6>
                <a className="link link-hover">Monday 11am-7pm</a>
                <a className="link link-hover">Tuesday 11am-7pm</a>
                <a className="link link-hover">Wednesday 11am-7pm</a>
                <a className="link link-hover">Thursday 11am-7pm</a>
            </nav>
            <nav>
                <h6 className="footer-title">Extra Links</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Company news</a>
                <a className="link link-hover">Investor relations</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
}

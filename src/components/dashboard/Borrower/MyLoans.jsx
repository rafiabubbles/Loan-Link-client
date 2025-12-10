import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { Link } from "react-router-dom";

export default function MyLoans() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetch = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/loan-applications/my-loans");
            setApps(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetch(); }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h2 className="text-2xl mb-4">My Loans</h2>
            <div className="space-y-4">
                {apps.map(a => (
                    <div key={a._id} className="card p-4">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-bold">{a.loan?.title || a.loanId}</h3>
                                <p className="text-sm">Amount: {a.amount}</p>
                                <p className="text-sm">Status: {a.status}</p>
                            </div>
                            <div>
                                {a.status === "Pending" && <button className="btn btn-sm btn-warning">Cancel</button>}
                                <Link to={`/loan/${a.loanId}`} className="btn btn-sm btn-primary ml-2">View Loan</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

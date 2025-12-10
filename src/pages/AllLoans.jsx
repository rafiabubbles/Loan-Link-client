import React, { useEffect, useState } from "react";
import api from "../api/axios";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { Link } from "react-router-dom";

export default function AllLoans() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const res = await api.get("/api/loans");
                setLoans(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h2 className="text-2xl mb-4">All Loans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {loans.map(l => (
                    <div key={l._id} className="card">
                        <figure className="h-40 bg-base-200"><img src={l.images?.[0] || "https://via.placeholder.com/300"} alt={l.title} className="w-full h-full object-cover" /></figure>
                        <div className="card-body">
                            <h3 className="card-title">{l.title}</h3>
                            <p>{l.description?.slice(0, 100)}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/loan/${l._id}`} className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

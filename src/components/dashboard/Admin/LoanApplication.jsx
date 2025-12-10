import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import LoadingSpinner from "../../shared/LoadingSpinner";
import Swal from "sweetalert2";

export default function LoanApplication() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApps = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/loan-applications");
            setApps(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApps();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/api/loan-applications/${id}/status`, { status });
            Swal.fire("Updated", "", "success");
            fetchApps();
        } catch (err) {
            Swal.fire("Error", "Update failed", "error");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h2 className="text-2xl mb-4">Loan Applications</h2>
            <div className="space-y-4">
                {apps.map(a => (
                    <div key={a._id} className="card p-4">
                        <div className="flex justify-between">
                            <div>
                                <p className="font-bold">{a.loan?.title || a.loanId}</p>
                                <p className="text-sm">{a.firstName} {a.lastName} • {a.amount}</p>
                                <p className="text-sm">Status: {a.status}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="btn btn-sm btn-success" onClick={() => updateStatus(a._id, "Approved")}>Approve</button>
                                <button className="btn btn-sm btn-warning" onClick={() => updateStatus(a._id, "Rejected")}>Reject</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

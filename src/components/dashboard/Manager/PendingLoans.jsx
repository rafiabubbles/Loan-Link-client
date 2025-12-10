import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import LoadingSpinner from "../../shared/LoadingSpinner";
import Swal from "sweetalert2";

export default function PendingLoans() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const res = await api.get("/api/loan-applications?status=Pending");
                setApps(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const update = async (id, status) => {
        try {
            await api.put(`/api/loan-applications/${id}/status`, { status });
            Swal.fire("Updated", "", "success");
            setApps(apps.filter(a => a._id !== id));
        } catch (err) {
            Swal.fire("Error", "Update failed", "error");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h2 className="text-2xl mb-4">Pending Applications</h2>
            <div className="space-y-4">
                {apps.map(a => (
                    <div className="card p-4" key={a._id}>
                        <div className="flex justify-between">
                            <div>
                                <p className="font-bold">{a.loan?.title}</p>
                                <p className="text-sm">{a.firstName} {a.lastName} • {a.amount}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="btn btn-sm btn-success" onClick={() => update(a._id, "Approved")}>Approve</button>
                                <button className="btn btn-sm btn-warning" onClick={() => update(a._id, "Rejected")}>Reject</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

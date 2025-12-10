import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import LoadingSpinner from "../../shared/LoadingSpinner";
import Swal from "sweetalert2";

export default function ManageLoans() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetch = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/loans");
            setLoans(res.data.filter(l => l.createdBy)); // manager-created or all
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetch(); }, []);

    const del = async (id) => {
        const ok = await Swal.fire({ title: "Confirm", showCancelButton: true }).then(r => r.isConfirmed);
        if (!ok) return;
        try {
            await api.delete(`/api/loans/${id}`);
            Swal.fire("Deleted", "", "success");
            setLoans(loans.filter(l => l._id !== id));
        } catch (err) {
            Swal.fire("Error", "Delete failed", "error");
        }
    };

    if (loading) return <LoadingSpinner />;
    return (
        <div>
            <h2 className="text-2xl mb-4">Manage Loans</h2>
            <div className="space-y-4">
                {loans.map(l => (
                    <div className="card p-4" key={l._id}>
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-bold">{l.title}</h3>
                                <p className="text-sm">Interest: {l.interest}</p>
                            </div>
                            <div>
                                <button className="btn btn-sm" onClick={() => {/* edit */ }}>Edit</button>
                                <button className="btn btn-sm btn-error ml-2" onClick={() => del(l._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

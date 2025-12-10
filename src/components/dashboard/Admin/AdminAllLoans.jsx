import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import LoadingSpinner from "../../shared/LoadingSpinner";
import Swal from "sweetalert2";

export default function AdminAllLoans() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLoans = async () => {
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

    useEffect(() => {
        fetchLoans();
    }, []);

    const handleDelete = async (id) => {
        const ok = await Swal.fire({ title: "Confirm", text: "Delete this loan?", showCancelButton: true }).then(r => r.isConfirmed);
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
            <h2 className="text-2xl mb-4">All Loans (Admin)</h2>
            <div className="space-y-4">
                {loans.map(l => (
                    <div key={l._id} className="card p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">{l.title}</h3>
                                <p className="text-sm">Interest: {l.interest} | Category: {l.category}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-sm" onClick={() => {/* open edit modal - implement later */ }}>Edit</button>
                                <button className="btn btn-sm btn-error" onClick={() => handleDelete(l._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

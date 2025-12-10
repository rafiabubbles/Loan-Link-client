import React, { useState } from "react";
import api from "../../../api/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddLoan() {
    const [form, setForm] = useState({ title: "", description: "", category: "", interest: 0, maxLimit: 0, EMI: "", images: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                title: form.title,
                description: form.description,
                category: form.category,
                interest: Number(form.interest),
                maxLimit: Number(form.maxLimit),
                EMI: form.EMI.split(",").map(n => Number(n.trim())),
                images: form.images.split(",").map(s => s.trim()),
            };
            await api.post("/api/loans/add-loan", payload);
            Swal.fire("Added", "Loan created", "success");
            navigate("/dashboard/manage-loans");
        } catch (err) {
            Swal.fire("Error", "Failed to add loan", "error");
        }
    };

    return (
        <div>
            <h2 className="text-2xl mb-4">Add Loan</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input className="input w-full" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                <textarea className="textarea w-full" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                <input className="input w-full" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                <input className="input w-full" placeholder="Interest" value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} />
                <input className="input w-full" placeholder="Max Limit" value={form.maxLimit} onChange={e => setForm({ ...form, maxLimit: e.target.value })} />
                <input className="input w-full" placeholder="EMI (comma separated)" value={form.EMI} onChange={e => setForm({ ...form, EMI: e.target.value })} />
                <input className="input w-full" placeholder="Images (comma sep URLs)" value={form.images} onChange={e => setForm({ ...form, images: e.target.value })} />
                <button className="btn btn-primary">Save Loan</button>
            </form>
        </div>
    );
}

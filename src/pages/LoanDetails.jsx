import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import AuthContext from '/src/context/AuthContext.jsx';
import Swal from "sweetalert2";

export default function LoanDetails() {
    const { id } = useParams();
    const [loan, setLoan] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/api/loans/${id}`);
                setLoan(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    const handleApply = () => {
        if (!user) return navigate("/login");
        if (user.role === "admin" || user.role === "manager") {
            return Swal.fire("Not allowed", "Admins and managers cannot apply", "warning");
        }
        navigate(`/dashboard/my-loans`, { state: { applyLoanId: id } });
    };

    if (loading) return <LoadingSpinner />;
    if (!loan) return <div>Loan not found</div>;

    return (
        <div className="card p-4">
            <h2 className="text-2xl font-bold mb-2">{loan.title}</h2>
            <img src={loan.images?.[0] || "https://via.placeholder.com/600"} alt={loan.title} className="w-full h-60 object-cover mb-4" />
            <p>{loan.description}</p>
            <p className="mt-2">Interest: {loan.interest}%</p>
            <p>Max Limit: {loan.maxLimit}</p>
            <div className="mt-4">
                <button className="btn btn-primary" onClick={handleApply}>Apply Now</button>
            </div>
        </div>
    );
}

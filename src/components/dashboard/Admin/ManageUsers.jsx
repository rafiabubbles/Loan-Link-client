import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import LoadingSpinner from "../../shared/LoadingSpinner";
import Swal from "sweetalert2";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/users"); // implement backend users route
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const updateRole = async (id, role) => {
        try {
            await api.put(`/api/users/${id}/role`, { role });
            Swal.fire("Updated", "", "success");
            fetchUsers();
        } catch (err) {
            Swal.fire("Error", "Update failed", "error");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h2 className="text-2xl mb-4">Manage Users</h2>
            <div className="overflow-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>
                                    <button className="btn btn-xs" onClick={() => updateRole(u._id, "manager")}>Make Manager</button>
                                    <button className="btn btn-xs btn-error" onClick={() => updateRole(u._id, "suspended")}>Suspend</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

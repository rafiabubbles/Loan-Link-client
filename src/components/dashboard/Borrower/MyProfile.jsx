import React, { useContext } from "react";
import AuthContext from '/src/context/AuthContext.jsx';

export default function MyProfile() {
    const { user } = useContext(AuthContext);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="card p-6">
            <h2 className="text-2xl mb-4">My Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    );
}

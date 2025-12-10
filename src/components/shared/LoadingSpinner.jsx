import React from "react";

export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center py-8">
            <div className="radial-progress text-primary" style={{ "--value": 70 }}>Loading</div>
        </div>
    );
}

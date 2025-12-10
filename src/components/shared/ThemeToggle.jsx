import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggle } = useContext(ThemeContext);
    return (
        <button className="btn btn-ghost" onClick={toggle}>
            {theme === "dark" ? "🌙" : "🌤️"}
        </button>
    );
}

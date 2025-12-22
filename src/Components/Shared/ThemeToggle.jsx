import React, { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs"; // Theme toggle

const ThemeToggle = () => {
  // Initialize theme from localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Apply theme to document on mount and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Handle theme toggle
  const handleThemeChange = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div>
      <div className="">
        <label className="toggle toggle-lg  text-primary">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={handleThemeChange}
            className="theme-controller"
          />
          <BsSun size={20}></BsSun>
          <BsMoon size={20}></BsMoon>
        </label>
      </div>
    </div>
  );
};

export default ThemeToggle;

/* ✅ Modified theme-provider.tsx */

"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme);
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="fixed top-4 right-4 z-50 btn btn-primary">
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
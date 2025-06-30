import React, { useState, useEffect } from "react";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Vérifier le thème initial
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-14 items-center rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700"
      aria-label="Basculer le thème"
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
          isDark ? "translate-x-7" : "translate-x-1"
        }`}
      />
      <span className="sr-only">
        {isDark ? "Passer au mode clair" : "Passer au mode sombre"}
      </span>
    </button>
  );
};

export default ThemeToggle;

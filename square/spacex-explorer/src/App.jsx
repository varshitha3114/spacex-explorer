import React, { useState } from "react";
import Launches from "./components/Launches";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen" : "bg-gray-50 text-gray-900 min-h-screen"}>
      <div className="text-center p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-extrabold">🚀 SpaceX Explorer</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
        <p className="mb-8 text-lg">
          Welcome to your SpaceX project built with React, Vite, and Tailwind CSS.
        </p>
        <Launches />
      </div>
    </div>
  );
}

export default App;

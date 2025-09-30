import React from "react";

const Filters = ({ search, setSearch, year, setYear, successOnly, setSuccessOnly, years }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="🔍 Search by mission name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border rounded-lg shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   bg-white text-gray-800 placeholder-gray-500
                   dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400
                   transition duration-300 w-full md:w-1/3"
      />

      {/* 📅 Year dropdown */}
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="px-4 py-2 border rounded-lg shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   bg-white text-gray-800 
                   dark:bg-gray-800 dark:text-gray-200
                   transition duration-300 w-full md:w-1/4"
      >
        <option value="">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* ✅ Success only toggle */}
      <label className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-200">
        <input
          type="checkbox"
          checked={successOnly}
          onChange={(e) => setSuccessOnly(e.target.checked)}
          className="h-4 w-4 text-blue-500 border-gray-300 rounded 
                     focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        Successful only
      </label>
    </div>
  );
};

export default Filters;

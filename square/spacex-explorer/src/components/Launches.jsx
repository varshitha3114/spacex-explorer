import React, { useEffect, useState, useMemo } from "react";
import { getLaunches } from "../api/spacex";
import Filters from "./Filters";
import LaunchModal from "./LaunchModal";

const Launches = () => {
  const [launches, setLaunches] = useState([]);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [successOnly, setSuccessOnly] = useState(false);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10); // 👈 Pagination state
  const [loading, setLoading] = useState(true); // 👈 Spinner state
  const [error, setError] = useState(null); // 👈 Error handling
  const [sortBy, setSortBy] = useState("date"); // 👈 Sorting option

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getLaunches();
        setLaunches(data);
      } catch (err) {
        setError("Failed to fetch launches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const years = useMemo(() => {
    const allYears = launches.map((l) => new Date(l.date_utc).getFullYear());
    return [...new Set(allYears)].sort();
  }, [launches]);

  const filteredLaunches = launches
    .filter((launch) => {
      const matchesSearch = launch.name.toLowerCase().includes(search.toLowerCase());
      const matchesYear = year ? new Date(launch.date_utc).getFullYear().toString() === year : true;
      const matchesSuccess = successOnly ? launch.success === true : true;
      return matchesSearch && matchesYear && matchesSuccess;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date_utc) - new Date(a.date_utc);
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "success") {
        return (b.success === true) - (a.success === true);
      }
      return 0;
    });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-700">🚀 SpaceX Launches</h1>

      {/* Filters */}
      <Filters
        search={search}
        setSearch={setSearch}
        year={year}
        setYear={setYear}
        successOnly={successOnly}
        setSuccessOnly={setSuccessOnly}
        years={years}
      />

      {/* Sorting */}
      <div className="mb-4 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="success">Sort by Success</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {loading && <p className="text-blue-600 font-semibold">⏳ Loading launches...</p>}

      {/* Error Handling */}
      {error && <p className="text-red-600 font-bold">{error}</p>}

      {/* Launch List */}
      {!loading && !error && (
        <div className="grid gap-6">
          {filteredLaunches.slice(0, visibleCount).map((launch) => (
            <div
              key={launch.id}
              onClick={() => setSelectedLaunch(launch)}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{launch.name}</h2>
              <p className="text-gray-600 mb-3">
                📅 {new Date(launch.date_utc).toLocaleDateString()}
              </p>
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                  launch.success === true
                    ? "bg-green-100 text-green-700"
                    : launch.success === false
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {launch.success === true
                  ? "✅ Success"
                  : launch.success === false
                  ? "❌ Failed"
                  : "⏳ Upcoming"}
              </span>
            </div>
          ))}

          {/* Load More button */}
          {visibleCount < filteredLaunches.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 10)}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Load More
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      {selectedLaunch && (
        <LaunchModal launch={selectedLaunch} onClose={() => setSelectedLaunch(null)} />
      )}
    </div>
  );
};

export default Launches;

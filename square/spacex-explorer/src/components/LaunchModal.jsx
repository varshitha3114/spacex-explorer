 
import React from "react";

const LaunchModal = ({ launch, onClose }) => {
  if (!launch) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Mission Patch */}
        {launch.links.patch.small && (
          <img
            src={launch.links.patch.small}
            alt={`${launch.name} patch`}
            className="mx-auto mb-4 w-24 h-24 object-contain"
          />
        )}

        {/* Launch Info */}
        <h2 className="text-2xl font-bold mb-2 text-blue-600">{launch.name}</h2>
        <p className="text-gray-600 mb-2">
          📅 {new Date(launch.date_utc).toLocaleDateString()}
        </p>
        <p className="mb-2">
          <strong>Status:</strong>{" "}
          {launch.success === true
            ? "✅ Success"
            : launch.success === false
            ? "❌ Failed"
            : "⏳ Upcoming"}
        </p>
        <p className="mb-2">
          <strong>Rocket:</strong> {launch.rocket?.name || "N/A"}
        </p>
        <p className="mb-4">
          <strong>Launch Site:</strong> {launch.launchpad?.name || "N/A"}
        </p>

        {/* Links */}
        <div className="flex gap-3">
          {launch.links.wikipedia && (
            <a
              href={launch.links.wikipedia}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              📖 Wikipedia
            </a>
          )}
          {launch.links.webcast && (
            <a
              href={launch.links.webcast}
              target="_blank"
              rel="noreferrer"
              className="text-red-500 underline"
            >
              🎥 Webcast
            </a>
          )}
          {launch.links.article && (
            <a
              href={launch.links.article}
              target="_blank"
              rel="noreferrer"
              className="text-green-600 underline"
            >
              📰 Article
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaunchModal;

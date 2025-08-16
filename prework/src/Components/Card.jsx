import React from "react";
import { Link } from "react-router-dom";

export default function ContentCreatorCard({
  name,
  url,
  description,
  viewLink,
  editLink,
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
      <h2 className="text-xl font-bold">
        <Link to={viewLink} className="hover:underline">
          {name}
        </Link>
      </h2>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline text-sm"
      >
        {url}
      </a>

      <p className="mt-2 text-sm">{description}</p>

      {editLink && (
        <div className="mt-4">
          <Link
            to={editLink}
            className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}

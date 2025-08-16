import React from "react";
import { Link } from "react-router-dom";

export default function ContentCreatorCard({
  id,
  name,
  url,
  description,
  viewLink,
  editLink,
  onDelete,
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition text-center">
      <h2 className="text-xl font-bold">
        <Link to={viewLink} className="hover:underline">
          {name}
        </Link>
      </h2>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline text-sm block mt-1"
      >
        {url}
      </a>

      <p className="mt-2 text-sm">{description}</p>

      <div className="mt-4 flex justify-center gap-2">
        {editLink && (
          <Link
            to={editLink}
            className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Edit
          </Link>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

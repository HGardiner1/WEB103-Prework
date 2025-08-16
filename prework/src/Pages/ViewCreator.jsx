import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import supabase from "../client";

export default function ViewCreator() {
  const { url } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCreator() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("url", url)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
        setError("Creator not found.");
      } else {
        setCreator(data);
      }
      setLoading(false);
    }

    if (url) fetchCreator();
  }, [url]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!creator) return <p className="text-center">No creator found.</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-blue-900 text-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-2">{creator.name}</h1>
      <a
        href={creator.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-300 hover:underline mb-4 block"
      >
        {creator.url}
      </a>
      <p className="text-sm leading-relaxed mb-4">{creator.description}</p>
      <Link
        to={`/edit/${creator.url}`}
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        Edit Creator
      </Link>
    </div>
  );
}

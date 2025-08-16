import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../client";

export default function AddCreator({ onAdd }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { data: existing } = await supabase
      .from("creators")
      .select("*")
      .eq("url", url)
      .single();

    if (existing) {
      setError("A creator with this URL already exists.");
      return;
    }

    const { data, error } = await supabase.from("creators").insert([
      { name, url, description }
    ]);

    if (error) {
      console.error("Error adding creator:", error);
      setError("Failed to add creator.");
    } else {
      if (onAdd) onAdd();
      navigate(`/view/${url}`);
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Content Creator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Creator
        </button>
      </form>
    </div>
  );
}

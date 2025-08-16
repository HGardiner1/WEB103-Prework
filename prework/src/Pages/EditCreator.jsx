import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../client";

export default function EditCreator({ onEdit }) {
  const { url } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [creatorUrl, setCreatorUrl] = useState("");
  const [description, setDescription] = useState("");
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
        setId(data.id);
        setName(data.name);
        setCreatorUrl(data.url);
        setDescription(data.description);
      }

      setLoading(false);
    }

    if (url) fetchCreator();
  }, [url]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { data: existing } = await supabase
      .from("creators")
      .select("*")
      .eq("url", creatorUrl)
      .neq("id", id)
      .single();

    if (existing) {
      setError("Another creator with this URL already exists.");
      return;
    }

    const { error: updateError } = await supabase
      .from("creators")
      .update({ name, url: creatorUrl, description })
      .eq("id", id);

    if (updateError) {
      console.error("Error updating creator:", updateError);
      setError("Failed to update creator.");
    } else {
      if (onEdit) onEdit();
      navigate(`/view/${creatorUrl}`);
    }
  }

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Content Creator</h1>
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
          value={creatorUrl}
          onChange={(e) => setCreatorUrl(e.target.value)}
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
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

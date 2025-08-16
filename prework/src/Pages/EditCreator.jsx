import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../client";

export default function EditCreator() {
  const { url } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [creatorUrl, setCreatorUrl] = useState("");
  const [description, setDescription] = useState("");
  const [originalUrl, setOriginalUrl] = useState(""); // store original URL
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCreator() {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("url", url)
        .single();

      if (error || !data) {
        setError("Creator not found.");
      } else {
        setName(data.name);
        setCreatorUrl(data.url);
        setDescription(data.description);
        setOriginalUrl(data.url); // keep original URL
      }
    }

    if (url) fetchCreator();
  }, [url]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    const { error: updateError } = await supabase
      .from("creators")
      .update({ name, url: creatorUrl, description })
      .eq("url", originalUrl); // use original URL
      navigate(`/view/${creatorUrl}`);
  };

  const handleDelete = async () => {
    const { error: deleteError } = await supabase
      .from("creators")
      .delete()
      .eq("url", originalUrl); // use original URL
      navigate("/"); // go back to home or listing
  };

  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Edit Content Creator</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded text-center"
        />
        <input
          type="text"
          placeholder="URL"
          value={creatorUrl}
          onChange={(e) => setCreatorUrl(e.target.value)}
          required
          className="w-full p-2 border rounded text-center"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded text-center"
        />
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Save Changes
        </button>
      </form>
      <button
        onClick={handleDelete}
        className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete Creator
      </button>
    </div>
  );
}

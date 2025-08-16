import React from "react";
import { Link } from "react-router-dom";
import ContentCreatorCard from "../Components/Card";
import supabase from "../client";

export default function ShowCreators({ creators, loading, onRefresh }) {
  // Delete handler
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this content creator?"
    );
    if (!confirmed) return;

    const { error } = await supabase.from("creators").delete().eq("id", id);

    if (error) {
      console.error("Error deleting creator:", error);
      alert("Failed to delete creator.");
    } else {
      if (onRefresh) onRefresh();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Content Creators</h1>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Content Creator
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && creators.length === 0 && <p>No content creators found.</p>}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {creators.map((creator) => (
        <ContentCreatorCard
            key={creator.url} // Use URL if ID is missing
            name={creator.name}
            url={creator.url}
            description={creator.description}
            viewLink={`/view/${creator.url}`}
            editLink={`/edit/${creator.url}`}
        />
        ))}
      </div>
    </div>
  );
}

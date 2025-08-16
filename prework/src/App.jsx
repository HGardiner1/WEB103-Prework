// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // no Router here
import supabase from "./client";

import ShowCreators from "./Pages/ShowCreators";
import AddCreator from "./Pages/AddCreator";
import EditCreator from "./Pages/EditCreator";
import ViewCreator from "./Pages/ViewCreator";

export default function App() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCreators() {
    setLoading(true);
    const { data, error } = await supabase.from("creators").select("*");

    if (error) {
      console.error("Error fetching creators:", error);
      setCreators([]);
    } else {
      setCreators(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchCreators();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<ShowCreators creators={creators} loading={loading} />}
      />
      <Route path="/add" element={<AddCreator onAdd={fetchCreators} />} />
      <Route path="/edit/:url" element={<EditCreator onEdit={fetchCreators} />} />
      <Route path="/view/:url" element={<ViewCreator />} />
    </Routes>
  );
}

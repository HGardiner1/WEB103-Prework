import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import supabase from "./client";

import ShowCreators from "./pages/ShowCreators";
import AddCreator from "./Pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ViewCreator from "./pages/ViewCreator";

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
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ShowCreators creators={creators} loading={loading} />}
        />
        <Route
          path="/add"
          element={<AddCreator onAdd={fetchCreators} />}
        />
        <Route
          path="/edit/:url"
          element={<EditCreator onEdit={fetchCreators} />}
        />
        <Route path="/view/:url" element={<ViewCreator />} />
      </Routes>
    </Router>
  );
}

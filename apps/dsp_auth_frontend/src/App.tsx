// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
              <div style={{ maxWidth: 460 }}>
                <h1 style={{ fontSize: 24, marginBottom: 12 }}>DSP Auth Demo</h1>
                <p style={{ opacity: 0.8, marginBottom: 12 }}>
                  Use the links below. <code>/dashboard</code> is protected.
                </p>
                <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link to="/signup">Sign up</Link>
                  <Link to="/login">Log in</Link>
                  <Link to="/verify">Verify</Link>
                  <Link to="/dashboard">Dashboard</Link>
                </nav>
              </div>
            </main>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useDispatch } from "react-redux";
import { loadUserFromStorageAsync } from "./redux/authSlice";
import LoadingSpinner from "./components/LoadingSpinner"; // Import the spinner component

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from local storage
    dispatch(loadUserFromStorageAsync());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <LoadingSpinner /> {/* This will handle loading between routes */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/dashboard" element={<Dashboard />} />{" "}
        {/* Dashboard route */}
      </Routes>
    </Router>
  );
};

export default App;

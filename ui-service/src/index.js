// src/index.js
import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import App from "./App";
import authReducer from "./redux/authSlice";
import { LoadingProvider } from "./contexts/LoadingContext";
import "./index.css";

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Get the root DOM element
const container = document.getElementById("root");
const root = createRoot(container); // Create a root

// Render the App using createRoot, wrapped in Router and Redux Provider
root.render(
  <Provider store={store}>
    <LoadingProvider>
      <Router>
        {" "}
        {/* Make sure Router is wrapping the App */}
        <App />
      </Router>
    </LoadingProvider>
  </Provider>
);
